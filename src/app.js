import { escutarCompras, salvarCompra, excluirCompra } from './firebase.js';
import { parseHTMLNFCe, buscarHTMLNFCe, parseCurrency, extrairMarcaECategoria } from './nfceParser.js';
import { Chart, registerables } from 'chart.js';
import { Html5Qrcode } from 'html5-qrcode';

Chart.register(...registerables);

// Estado global da aplicação
let todasCompras = [];
let chartInstancia = null;
let html5QrcodeScanner = null;
let cameraDispositivos = [];
let indexCameraAtual = 0;
let escaneando = false;

// Função para mudar de aba exposta globalmente
export function mudarAba(targetId) {
  const allNavBtns = document.querySelectorAll('[data-tab-target]');
  const allTabContents = document.querySelectorAll('.tab-content');

  allNavBtns.forEach(b => {
    if (b.getAttribute('data-tab-target') === targetId) {
      b.classList.add('active');
    } else {
      b.classList.remove('active');
    }
  });

  allTabContents.forEach(content => {
    if (content.id === targetId) {
      content.classList.add('active');
    } else {
      content.classList.remove('active');
    }
  });

  if (targetId !== 'tab-add' && escaneando) {
    pararScanner();
  }
}

window.mudarAba = mudarAba;

// Inicialização da Aplicação
function initApp() {
  configurarNavegacao();
  configurarFormulariosEModais();
  iniciarEscutaFirebase();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Navigation & Tab Switching
function configurarNavegacao() {
  const allNavBtns = document.querySelectorAll('[data-tab-target]');
  allNavBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-tab-target');
      mudarAba(targetId);
    });
  });
}


// Inicia escuta em tempo real do Firebase Firestore
function iniciarEscutaFirebase() {
  escutarCompras((compras) => {
    todasCompras = compras;
    atualizarDashboard();
    atualizarHistorico();
    atualizarComparacaoValores();
    atualizarItensMaisComprados();
  });
}

/* ==========================================================================
   1. DASHBOARD & MÉTRICAS
   ========================================================================== */
function atualizarDashboard() {
  let valorTotalGasto = 0;
  let somaDescontos = 0;
  let totalValeAlimentacao = 0;
  let totalCartaoCredito = 0;
  let totalCartaoDebito = 0;

  const gastosPorMes = {};
  const descontosPorMes = {};
  const totaisSemDescontoPorMes = {};

  todasCompras.forEach(compra => {
    const aPagar = compra.valorAPagar || 0;
    const desc = compra.descontoTotal || 0;
    const mes = compra.mesAno || 'Outros';

    valorTotalGasto += aPagar;
    somaDescontos += desc;

    // Formas de pagamento
    if (compra.formasPagamento) {
      totalValeAlimentacao += compra.formasPagamento.valeAlimentacao || 0;
      totalCartaoCredito += compra.formasPagamento.cartaoCredito || 0;
      totalCartaoDebito += compra.formasPagamento.cartaoDebito || 0;
    }

    // Agrupamento por Mês
    if (!gastosPorMes[mes]) {
      gastosPorMes[mes] = 0;
      descontosPorMes[mes] = 0;
      totaisSemDescontoPorMes[mes] = 0;
    }
    gastosPorMes[mes] += aPagar;
    descontosPorMes[mes] += desc;
    totaisSemDescontoPorMes[mes] += (aPagar + desc);
  });

  // Atualizar cards de valores na tela inicial
  document.getElementById('dash-total-gasto').textContent = formatarMoeda(valorTotalGasto);
  document.getElementById('dash-soma-descontos').textContent = formatarMoeda(somaDescontos);

  // Cálculo da porcentagem economizada no geral
  const totalGeralBruto = valorTotalGasto + somaDescontos;
  const pctEconomizadaGeral = totalGeralBruto > 0 ? ((somaDescontos / totalGeralBruto) * 100).toFixed(1) : 0;
  document.getElementById('dash-pct-desconto').textContent = `${pctEconomizadaGeral}% economizado no geral`;

  // Pagamentos
  document.getElementById('dash-vale-alimentacao').textContent = formatarMoeda(totalValeAlimentacao);
  document.getElementById('dash-cartao-credito').textContent = formatarMoeda(totalCartaoCredito);
  document.getElementById('dash-cartao-debito').textContent = formatarMoeda(totalCartaoDebito);

  // Renderizar Gráfico de Barras Mensal
  renderizarGraficoMensal(gastosPorMes);
}

function renderizarGraficoMensal(gastosPorMes) {
  const ctx = document.getElementById('chart-gastos-mensais')?.getContext('2d');
  if (!ctx) return;

  const mesesOrdenados = Object.keys(gastosPorMes).sort();
  const labels = mesesOrdenados.map(m => {
    const [ano, mes] = m.split('-');
    return `${mes}/${ano}`;
  });
  const dataValues = mesesOrdenados.map(m => gastosPorMes[m]);

  if (chartInstancia) {
    chartInstancia.destroy();
  }

  chartInstancia = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels.length ? labels : ['Sem compras'],
      datasets: [{
        label: 'Gastos R$',
        data: dataValues.length ? dataValues : [0],
        backgroundColor: 'rgba(16, 185, 129, 0.75)',
        borderColor: '#10b981',
        borderWidth: 2,
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => ` Total: ${formatarMoeda(context.raw)}`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#94a3b8' }
        },
        x: {
          grid: { display: false },
          ticks: { color: '#94a3b8' }
        }
      }
    }
  });
}

/* ==========================================================================
   2. SCANNER QR CODE & ADICIONAR COMPRA (Câmera Padrão Traseira + Trocar Câmera)
   ========================================================================== */
function configurarFormulariosEModais() {
  const btnIniciarCam = document.getElementById('btn-iniciar-camera');
  const btnTrocarCam = document.getElementById('btn-trocar-camera');
  const btnPararCam = document.getElementById('btn-parar-camera');
  const formManual = document.getElementById('form-adicionar-url');

  if (btnIniciarCam) btnIniciarCam.addEventListener('click', iniciarScannerCamera);
  if (btnTrocarCam) btnTrocarCam.addEventListener('click', trocarCamera);
  if (btnPararCam) btnPararCam.addEventListener('click', pararScanner);

  if (formManual) {
    formManual.addEventListener('submit', async (e) => {
      e.preventDefault();
      const inputUrl = document.getElementById('input-url-nfce').value.trim();
      const inputHtml = document.getElementById('input-html-nfce').value.trim();

      if (!inputUrl && !inputHtml) {
        alert("Por favor, digite o link do QR Code ou cole o conteúdo da nota fiscal.");
        return;
      }

      await processarEntradaNFCe(inputUrl, inputHtml);
    });
  }
}

async function iniciarScannerCamera() {
  try {
    const qrRegion = document.getElementById('qr-reader');
    if (!qrRegion) return;

    if (!html5QrcodeScanner) {
      html5QrcodeScanner = new Html5Qrcode("qr-reader");
    }

    // Obter todos os dispositivos de câmera disponíveis
    cameraDispositivos = await Html5Qrcode.getCameras();

    let configCamera = { facingMode: "environment" }; // Câmera traseira principal como padrão no mobile!

    if (cameraDispositivos && cameraDispositivos.length > 0) {
      // Procura preferencialmente uma câmera traseira (back / environment)
      const camTraseiraIndex = cameraDispositivos.findIndex(device => 
        device.label.toLowerCase().includes('back') || 
        device.label.toLowerCase().includes('traseira') ||
        device.label.toLowerCase().includes('environment')
      );
      
      if (camTraseiraIndex !== -1) {
        indexCameraAtual = camTraseiraIndex;
        configCamera = cameraDispositivos[indexCameraAtual].id;
      } else {
        indexCameraAtual = 0;
        configCamera = cameraDispositivos[0].id;
      }
    }

    await html5QrcodeScanner.start(
      configCamera,
      {
        fps: 10,
        qrbox: { width: 250, height: 250 }
      },
      onQRCodeSucesso,
      onQRCodeErro
    );

    escaneando = true;
    document.getElementById('btn-iniciar-camera').style.display = 'none';
    document.getElementById('btn-trocar-camera').style.display = 'inline-flex';
    document.getElementById('btn-parar-camera').style.display = 'inline-flex';
  } catch (err) {
    console.error("Erro ao iniciar câmera:", err);
    alert("Não foi possível acessar a câmera do dispositivo. Verifique as permissões de câmera do navegador.");
  }
}

async function trocarCamera() {
  if (!escaneando || !html5QrcodeScanner) return;

  try {
    await html5QrcodeScanner.stop();

    if (cameraDispositivos.length > 1) {
      indexCameraAtual = (indexCameraAtual + 1) % cameraDispositivos.length;
      const proximaCameraId = cameraDispositivos[indexCameraAtual].id;

      await html5QrcodeScanner.start(
        proximaCameraId,
        { fps: 10, qrbox: { width: 250, height: 250 } },
        onQRCodeSucesso,
        onQRCodeErro
      );
    } else {
      // Se não houver IDs enumerados, alterna a preferência de facingMode
      const facing = document.getElementById('qr-reader').getAttribute('data-facing') === 'user' ? 'environment' : 'user';
      document.getElementById('qr-reader').setAttribute('data-facing', facing);

      await html5QrcodeScanner.start(
        { facingMode: facing },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        onQRCodeSucesso,
        onQRCodeErro
      );
    }
  } catch (err) {
    console.error("Erro ao trocar câmera:", err);
  }
}

async function pararScanner() {
  if (html5QrcodeScanner && escaneando) {
    try {
      await html5QrcodeScanner.stop();
    } catch (e) {
      console.warn("Scanner já parado.", e);
    }
  }
  escaneando = false;
  document.getElementById('btn-iniciar-camera').style.display = 'inline-flex';
  document.getElementById('btn-trocar-camera').style.display = 'none';
  document.getElementById('btn-parar-camera').style.display = 'none';
}

async function onQRCodeSucesso(qrCodeMessage) {
  pararScanner();
  document.getElementById('input-url-nfce').value = qrCodeMessage;
  await processarEntradaNFCe(qrCodeMessage, '');
}

function onQRCodeErro(errorMessage) {
  // Ignora erros contínuos de varredura de frames
}

async function processarEntradaNFCe(url, rawHtml) {
  const statusMsg = document.getElementById('status-processamento');
  if (statusMsg) statusMsg.textContent = 'Carregando e processando dados da nota fiscal...';

  try {
    let htmlContent = rawHtml;
    if (url && !htmlContent) {
      try {
        htmlContent = await buscarHTMLNFCe(url);
      } catch (proxyErr) {
        console.warn("Consulta direta blocked por CORS:", proxyErr);
        // Exibe modal para colar o texto se CORS falhar
        abrirModalPasteHTML(url);
        if (statusMsg) statusMsg.textContent = 'Aviso: Cole o texto do resultado da consulta pública abaixo.';
        return;
      }
    }

    const dadosNota = parseHTMLNFCe(htmlContent);
    await salvarCompra(dadosNota);

    if (statusMsg) statusMsg.textContent = 'Nota fiscal adicionada com sucesso!';
    document.getElementById('input-url-nfce').value = '';
    document.getElementById('input-html-nfce').value = '';

    // Redireciona para a aba inicial
    document.querySelector('[data-tab-target="tab-dashboard"]').click();
  } catch (err) {
    console.error("Erro no processamento da NFC-e:", err);
    if (statusMsg) statusMsg.textContent = `Erro: ${err.message}`;
  }
}

function abrirModalPasteHTML(url) {
  const modal = document.getElementById('modal-paste-html');
  if (modal) {
    modal.classList.add('active');
    document.getElementById('btn-abrir-link-nfce').href = url;
  }
}

/* ==========================================================================
   3. COMPARAR VALORES DE PRODUTOS (UNITÁRIO MÊS A MÊS)
   ========================================================================== */
function atualizarComparacaoValores() {
  const container = document.getElementById('lista-comparacao-produtos');
  if (!container) return;

  // Agrupar produtos por nome limpo / código
  const mapaProdutos = {};

  todasCompras.forEach(compra => {
    const mes = compra.mesAno;
    compra.itens.forEach(item => {
      const chave = item.nomeLimpo || item.nome;
      if (!mapaProdutos[chave]) {
        mapaProdutos[chave] = {
          nome: item.nome,
          marca: item.marca || 'Geral',
          historicoMensal: {} // { '2026-05': valorUnitario, '2026-06': valorUnitario }
        };
      }
      // Armazena o valor unitário mais recente do mês
      mapaProdutos[chave].historicoMensal[mes] = item.valorUnitario;
    });
  });

  const produtosArray = Object.keys(mapaProdutos).map(key => ({
    chave: key,
    ...mapaProdutos[key]
  }));

  if (produtosArray.length === 0) {
    container.innerHTML = `<p class="card-subtext" style="text-align:center; padding:2rem;">Nenhum produto cadastrado para comparação ainda.</p>`;
    return;
  }

  let html = `<div class="table-responsive">
    <table class="custom-table">
      <thead>
        <tr>
          <th>Produto</th>
          <th>Marca</th>
          <th>Últimos Meses (Valor Unitário)</th>
          <th>Variação</th>
        </tr>
      </thead>
      <tbody>`;

  produtosArray.forEach(prod => {
    const meses = Object.keys(prod.historicoMensal).sort();
    let comparacaoStr = '';
    let variacaoBadge = `<span class="badge green">Estável</span>`;

    if (meses.length >= 2) {
      const ultimoMes = meses[meses.length - 1];
      const penultimoMes = meses[meses.length - 2];
      const valAtual = prod.historicoMensal[ultimoMes];
      const valAnterior = prod.historicoMensal[penultimoMes];

      const diff = valAtual - valAnterior;
      const pct = ((diff / valAnterior) * 100).toFixed(1);

      if (diff > 0) {
        variacaoBadge = `<span class="badge red">+${pct}% (Aumentou ${formatarMoeda(diff)})</span>`;
      } else if (diff < 0) {
        variacaoBadge = `<span class="badge green">${pct}% (Barateou ${formatarMoeda(Math.abs(diff))})</span>`;
      }

      comparacaoStr = `${penultimoMes}: <strong>${formatarMoeda(valAnterior)}</strong> ➔ ${ultimoMes}: <strong>${formatarMoeda(valAtual)}</strong>`;
    } else {
      const mesUnico = meses[0];
      comparacaoStr = `${mesUnico}: <strong>${formatarMoeda(prod.historicoMensal[mesUnico])}</strong>`;
    }

    html += `<tr>
      <td><strong>${prod.nome}</strong></td>
      <td><span class="badge amber">${prod.marca}</span></td>
      <td>${comparacaoStr}</td>
      <td>${variacaoBadge}</td>
    </tr>`;
  });

  html += `</tbody></table></div>`;
  container.innerHTML = html;
}

/* ==========================================================================
   4. ITENS MAIS COMPRADOS & DISTINÇÃO POR MARCA
   ========================================================================== */
function atualizarItensMaisComprados() {
  const containerRecorrencia = document.getElementById('lista-itens-recorrentes');
  const containerMarcas = document.getElementById('lista-comparacao-marcas');
  if (!containerRecorrencia || !containerMarcas) return;

  const agregador = {}; // Para contagem de recorrência
  const agrupadorPorCategoria = {}; // Para comparar marcas do mesmo tipo de produto

  todasCompras.forEach(compra => {
    compra.itens.forEach(item => {
      const chave = item.nomeLimpo || item.nome;
      if (!agregador[chave]) {
        agregador[chave] = {
          nome: item.nome,
          marca: item.marca,
          qtdTotal: 0,
          recorrenciaNotas: 0,
          ultimosValoresUnitarios: []
        };
      }
      agregador[chave].qtdTotal += item.quantidade;
      agregador[chave].recorrenciaNotas += 1;
      agregador[chave].ultimosValoresUnitarios.push(item.valorUnitario);

      // Agrupamento por marca/tipo para saber qual teve o menor valor
      const categoriaChave = item.nomeLimpo.split(' ')[0] || item.nome;
      if (!agrupadorPorCategoria[categoriaChave]) {
        agrupadorPorCategoria[categoriaChave] = {};
      }
      if (!agrupadorPorCategoria[categoriaChave][item.marca]) {
        agrupadorPorCategoria[categoriaChave][item.marca] = [];
      }
      agrupadorPorCategoria[categoriaChave][item.marca].push(item.valorUnitario);
    });
  });

  // 1. Itens comprados mais de uma vez
  const recorrentes = Object.values(agregador).filter(item => item.recorrenciaNotas > 1);
  recorrentes.sort((a, b) => b.recorrenciaNotas - a.recorrenciaNotas);

  if (recorrentes.length === 0) {
    containerRecorrencia.innerHTML = `<p class="card-subtext" style="text-align:center; padding:1.5rem;">Adicione notas em compras diferentes para calcular a recorrência dos itens.</p>`;
  } else {
    let htmlRec = `<div class="table-responsive"><table class="custom-table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Marca</th>
          <th>Vezes Comprado</th>
          <th>Qtd. Total</th>
          <th>Média R$ Unitário</th>
        </tr>
      </thead>
      <tbody>`;

    recorrentes.forEach(item => {
      const mediaUnit = item.ultimosValoresUnitarios.reduce((a, b) => a + b, 0) / item.ultimosValoresUnitarios.length;
      htmlRec += `<tr>
        <td><strong>${item.nome}</strong></td>
        <td><span class="badge amber">${item.marca}</span></td>
        <td><span class="badge green">${item.recorrenciaNotas} compras</span></td>
        <td>${item.qtdTotal} un</td>
        <td>${formatarMoeda(mediaUnit)}</td>
      </tr>`;
    });

    htmlRec += `</tbody></table></div>`;
    containerRecorrencia.innerHTML = htmlRec;
  }

  // 2. Comparativo de Menor Valor por Marca
  let htmlMarcas = '';
  Object.keys(agrupadorPorCategoria).forEach(cat => {
    const marcasObj = agrupadorPorCategoria[cat];
    const marcasKeys = Object.keys(marcasObj);

    if (marcasKeys.length > 1) { // Só exibe se houver troca de marca para o mesmo produto
      let menorValor = Infinity;
      let marcaMaisBarata = '';

      const listaMarcasInfo = marcasKeys.map(m => {
        const mediaVal = marcasObj[m].reduce((a, b) => a + b, 0) / marcasObj[m].length;
        if (mediaVal < menorValor) {
          menorValor = mediaVal;
          marcaMaisBarata = m;
        }
        return { marca: m, valor: mediaVal };
      });

      htmlMarcas += `<div class="card" style="margin-bottom: 1rem;">
        <div class="card-header">
          <span class="card-title">Comparativo: ${cat}</span>
          <span class="badge green">🏆 Menor Valor: ${marcaMaisBarata} (${formatarMoeda(menorValor)})</span>
        </div>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">`;

      listaMarcasInfo.forEach(info => {
        const eAMaisBarata = info.marca === marcaMaisBarata;
        htmlMarcas += `<div style="background: rgba(15,23,42,0.6); padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid ${eAMaisBarata ? '#10b981' : '#334155'};">
          <p style="font-size: 0.8rem; color: var(--text-muted);">${info.marca}</p>
          <p style="font-size: 1.1rem; font-weight: 700;">${formatarMoeda(info.valor)} <span style="font-size:0.75rem; font-weight:normal;">/unit</span></p>
        </div>`;
      });

      htmlMarcas += `</div></div>`;
    }
  });

  if (!htmlMarcas) {
    containerMarcas.innerHTML = `<p class="card-subtext" style="text-align:center; padding:1.5rem;">Ao comprar produtos do mesmo tipo com marcas diferentes (ex: Arroz Tio João vs Camil), o sistema indicará automaticamente qual marca teve o menor valor unitário.</p>`;
  } else {
    containerMarcas.innerHTML = htmlMarcas;
  }
}

/* ==========================================================================
   5. HISTÓRICO DE COMPRAS (EXPANDIR ITENS & EXCLUIR)
   ========================================================================== */
function atualizarHistorico() {
  const container = document.getElementById('lista-historico-compras');
  if (!container) return;

  if (todasCompras.length === 0) {
    container.innerHTML = `<p class="card-subtext" style="text-align:center; padding:3rem;">Nenhuma compra cadastrada no banco de dados. Adicione sua primeira nota fiscal!</p>`;
    return;
  }

  let html = '';
  todasCompras.forEach(compra => {
    const dataFormatada = formatarData(compra.dataEmissao);
    const id = compra.id;

    html += `<div class="purchase-card" id="card-compra-${id}">
      <div class="purchase-header" onclick="window.toggleDetalhesCompra('${id}')">
        <div class="purchase-info">
          <h3>${compra.nomeMercado || 'Supermercado'}</h3>
          <p>📅 ${dataFormatada} • 🛒 ${compra.qtdTotalItens} itens</p>
        </div>
        <div class="purchase-values">
          <div class="total-val">${formatarMoeda(compra.valorAPagar)}</div>
          <p style="font-size:0.75rem; color: var(--text-muted);">Desc: ${formatarMoeda(compra.descontoTotal)}</p>
        </div>
      </div>
      
      <div class="purchase-details" id="details-${id}">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 0.75rem;">
          <h4 style="font-size: 0.9rem; color: var(--text-muted);">Itens da Nota Fiscal</h4>
          <button class="btn-secondary" style="background: rgba(244,63,94,0.15); color:#fb7185; border-color: rgba(244,63,94,0.3); padding:0.4rem 0.8rem; font-size:0.8rem;" onclick="window.confirmarExcluirCompra('${id}')">
            🗑️ Excluir Compra
          </button>
        </div>
        <div class="table-responsive">
          <table class="custom-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Marca</th>
                <th>Qtd</th>
                <th>Vl. Unit.</th>
                <th>Vl. Total</th>
              </tr>
            </thead>
            <tbody>`;

    if (compra.itens && compra.itens.length > 0) {
      compra.itens.forEach(item => {
        html += `<tr>
          <td>${item.nome}</td>
          <td><span class="badge amber">${item.marca || 'Geral'}</span></td>
          <td>${item.quantidade} ${item.unidade || 'Un'}</td>
          <td>${formatarMoeda(item.valorUnitario)}</td>
          <td><strong>${formatarMoeda(item.valorTotal)}</strong></td>
        </tr>`;
      });
    } else {
      html += `<tr><td colspan="5" style="text-align:center; color: var(--text-muted);">Nenhum detalhe de item encontrado.</td></tr>`;
    }

    html += `</tbody></table></div></div></div>`;
  });

  container.innerHTML = html;
}

// Funções expostas no objeto window para manipuladores onclick
window.toggleDetalhesCompra = function(id) {
  const elem = document.getElementById(`details-${id}`);
  if (elem) {
    elem.classList.toggle('open');
  }
};

window.confirmarExcluirCompra = async function(id) {
  if (confirm("Tem certeza que deseja excluir esta compra? Essa ação não pode ser desfeita.")) {
    try {
      await excluirCompra(id);
    } catch (err) {
      alert("Erro ao excluir compra: " + err.message);
    }
  }
};

/* ==========================================================================
   UTILITÁRIOS
   ========================================================================== */
function formatarMoeda(valor) {
  return (valor || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatarData(dataIso) {
  if (!dataIso) return 'Data N/A';
  try {
    const d = new Date(dataIso);
    return d.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
  } catch (e) {
    return dataIso;
  }
}
