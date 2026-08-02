/**
 * Módulo para parsing e captura de notas fiscais NFC-e (São Paulo e outros estados)
 */

// Helper para converter string de moeda brasileira (1.016,51) em Number (1016.51)
export function parseCurrency(valStr) {
  if (typeof valStr === 'number') return valStr;
  if (!valStr) return 0;
  // Remove R$, espaços e substitui ponto de milhar por nada e vírgula por ponto
  const cleanStr = String(valStr)
    .replace(/R\$\s?/gi, '')
    .replace(/\s+/g, '')
    .replace(/\./g, '')
    .replace(',', '.');
  const parsed = parseFloat(cleanStr);
  return isNaN(parsed) ? 0 : parsed;
}

// Extrai marca e nome limpo a partir da descrição do item
export function extrairMarcaECategoria(descricao) {
  if (!descricao) return { marca: 'Geral', nomeLimpo: 'Produto' };
  
  const descUpper = descricao.toUpperCase().trim();
  
  // Lista de marcas comuns em supermercados brasileiros
  const marcasConhecidas = [
    'BAUDUCCO', 'BAUD', 'PANCO', 'DANONE', 'DAN', 'NESTLE', 'QUALITA', 'TAEQ',
    'TIO JOAO', 'CAMIL', 'URBANO', 'PRATO FINO', 'SANTA RITA', 'SADIA', 'PERDIGAO',
    'SEARA', 'KRAFT', 'HEINZ', 'HELLMANNS', 'ARISCO', 'COCA COLA', 'COCA-COLA',
    'PEPSI', 'GUARANA', 'ANTARCTICA', 'HEINEKEN', 'AMSTEL', 'BRAHMA', 'SKOL',
    'MELITTA', 'PILAO', '3 CORACOES', 'CABOCLO', 'LIZA', 'SOYA', 'CONCORDIA',
    'YPÊ', 'YPE', 'NIVEA', 'REXONA', 'DOVE', 'COLGATE', 'ORAL-B', 'ORAL B',
    'SNOW', 'MAMMA BISC', 'VIGOR', 'PIRACANJUBA', 'PARMALAT', 'BATAVO', 'ITALAC'
  ];

  let marcaEncontrada = 'Genérica';
  for (const m of marcasConhecidas) {
    if (descUpper.includes(m)) {
      marcaEncontrada = m;
      break;
    }
  }

  // Tenta extrair a primeira palavra se não achou na lista
  if (marcaEncontrada === 'Genérica') {
    const palavras = descUpper.split(' ');
    if (palavras.length > 0 && palavras[0].length >= 3) {
      marcaEncontrada = palavras[0];
    }
  }

  return {
    marca: marcaEncontrada,
    nomeLimpo: descricao
  };
}

/**
 * Tenta buscar o conteúdo HTML de uma URL de NFC-e via proxies CORS.
 * @param {string} url URL completa do QR code da NFC-e
 * @returns {Promise<string>} Conteúdo HTML da página
 */
export async function buscarHTMLNFCe(url) {
  const proxies = [
    (u) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
    (u) => `https://corsproxy.io/?${encodeURIComponent(u)}`
  ];

  for (const proxyFn of proxies) {
    try {
      const proxyUrl = proxyFn(url);
      const res = await fetch(proxyUrl);
      if (res.ok) {
        const text = await res.text();
        if (text && (text.includes('Valor total') || text.includes('NFC-e') || text.includes('Qtde'))) {
          return text;
        }
      }
    } catch (err) {
      console.warn("Proxy falhou para URL:", url, err);
    }
  }
  
  throw new Error("Não foi possível acessar a URL da NFC-e diretamente via CORS. Cole o texto/HTML da nota fiscal.");
}

/**
 * Faz o parse do HTML da NFC-e (Estrutura padrão SP SEFAZ / NFC-e consulta pública)
 * @param {string} htmlContent Conteúdo HTML ou texto copiado da página
 * @returns {Object} Dados estruturados da nota fiscal
 */
export function parseHTMLNFCe(htmlContent) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');

  // Mercado / Estabelecimento
  let nomeMercado = 'Supermercado Mercado';
  const txtTopo = doc.querySelector('.txtTopo, #txtTopo, .txtCenter, h1, h2')?.textContent;
  if (txtTopo) {
    nomeMercado = txtTopo.trim();
  } else {
    const bodyText = doc.body?.textContent || htmlContent;
    const matchMercado = bodyText.match(/(?:CNPJ|EMISSÃO|SUPERMERCADO|MERCADO)\s*:\s*([^\n\r]+)/i);
    if (matchMercado) nomeMercado = matchMercado[1].trim();
  }

  // Data de Emissão
  let dataEmissao = new Date().toISOString();
  const bodyText = doc.body?.textContent || htmlContent;
  const matchData = bodyText.match(/Emissão:\s*(\d{2}\/\d{2}\/\d{4})\s*(\d{2}:\d{2}:\d{2})?/i) ||
                    bodyText.match(/(\d{2}\/\d{2}\/\d{4})/);
  if (matchData) {
    const [_, dStr, tStr] = matchData;
    const parts = dStr.split('/');
    if (parts.length === 3) {
      const dia = parts[0];
      const mes = parts[1];
      const ano = parts[2];
      const hora = tStr || '12:00:00';
      dataEmissao = `${ano}-${mes}-${dia}T${hora}`;
    }
  }

  // Totais
  let qtdTotalItens = 0;
  let valorTotal = 0;
  let descontoTotal = 0;
  let valorAPagar = 0;

  // Busca de totais no HTML
  const txtQtd = bodyText.match(/Qtd\.\s*total\s*de\s*itens\s*:\s*(\d+)/i) ||
                 bodyText.match(/Total\ de\ Itens\s*:\s*(\d+)/i);
  if (txtQtd) qtdTotalItens = parseInt(txtQtd[1], 10);

  const txtValorTotal = bodyText.match(/Valor\s*total\s*R\$\s*:\s*([\d\.,]+)/i);
  if (txtValorTotal) valorTotal = parseCurrency(txtValorTotal[1]);

  const txtDescontos = bodyText.match(/Descontos?\s*R\$\s*:\s*([\d\.,]+)/i);
  if (txtDescontos) descontoTotal = parseCurrency(txtDescontos[1]);

  const txtValorAPagar = bodyText.match(/Valor\s*a\s*pagar\s*R\$\s*:\s*([\d\.,]+)/i) ||
                          bodyText.match(/VALOR\s*PAGO\s*R\$\s*:\s*([\d\.,]+)/i);
  if (txtValorAPagar) valorAPagar = parseCurrency(txtValorAPagar[1]);

  // Formas de Pagamento
  const formasPagamento = {
    valeAlimentacao: 0,
    cartaoCredito: 0,
    cartaoDebito: 0,
    outros: 0
  };

  const matchVale = bodyText.match(/(?:Vale\s*Alimentação|Alimentação|V\.\s*Alimentacao)\s*[\:\s]\s*([\d\.,]+)/i);
  if (matchVale) formasPagamento.valeAlimentacao = parseCurrency(matchVale[1]);

  const matchCredito = bodyText.match(/(?:Cartão\s*de\s*Crédito|Crédito)\s*[\:\s]\s*([\d\.,]+)/i);
  if (matchCredito) formasPagamento.cartaoCredito = parseCurrency(matchCredito[1]);

  const matchDebito = bodyText.match(/(?:Cartão\s*de\s*Débito|Débito)\s*[\:\s]\s*([\d\.,]+)/i);
  if (matchDebito) formasPagamento.cartaoDebito = parseCurrency(matchDebito[1]);

  // Parse dos Itens
  const itens = [];
  const tabelaItens = doc.querySelectorAll('#tabResult tr, table.table tr, .table-striped tr, tr');

  tabelaItens.forEach((row) => {
    const txt = row.textContent;
    if (txt && (txt.includes('Qtde') || txt.includes('Código') || txt.includes('Vl. Unit'))) {
      const nomeElem = row.querySelector('.txtTit, span.txtTit, .txtTit2');
      const nome = nomeElem ? nomeElem.textContent.trim() : '';

      const codElem = row.querySelector('.RCod, .RCod2');
      const codigoMatch = codElem ? codElem.textContent.match(/\d+/) : txt.match(/Código:\s*(\d+)/i);
      const codigo = codigoMatch ? codigoMatch[1] || codigoMatch[0] : Math.random().toString(36).substring(7);

      const qtdMatch = txt.match(/Qtde\.\s*:\s*([\d\.,]+)/i) || txt.match(/Qtd\.\s*:\s*([\d\.,]+)/i);
      const qtd = qtdMatch ? parseCurrency(qtdMatch[1]) : 1;

      const unMatch = txt.match(/UN\s*:\s*([A-Za-z]+)/i);
      const unidade = unMatch ? unMatch[1] : 'Un';

      const unitMatch = txt.match(/Vl\.\s*Unit\.\s*:\s*([\d\.,]+)/i);
      const valorUnitario = unitMatch ? parseCurrency(unitMatch[1]) : 0;

      const totalMatch = row.querySelector('.valor, .vMon, .vTot')?.textContent || txt.match(/Vl\.\s*Total\s*([\d\.,]+)/i)?.[1];
      const valorTotalItem = totalMatch ? parseCurrency(totalMatch) : (valorUnitario * qtd);

      if (nome && valorUnitario > 0) {
        const { marca, nomeLimpo } = extrairMarcaECategoria(nome);
        itens.push({
          codigo,
          nome,
          nomeLimpo,
          marca,
          quantidade: qtd,
          unidade,
          valorUnitario,
          valorTotal: valorTotalItem || (valorUnitario * qtd)
        });
      }
    }
  });

  // Se não foi possível extrair a quantidade total de itens, usa o tamanho da lista de itens
  if (qtdTotalItens === 0 && itens.length > 0) {
    qtdTotalItens = itens.reduce((acc, item) => acc + item.quantidade, 0);
  }
  if (valorTotal === 0 && itens.length > 0) {
    valorTotal = itens.reduce((acc, item) => acc + item.valorTotal, 0);
  }
  if (valorAPagar === 0) {
    valorAPagar = valorTotal - descontoTotal;
  }

  // Extrai ano-mes para agregadores
  const dateObj = new Date(dataEmissao);
  const ano = dateObj.getFullYear();
  const mes = String(dateObj.getMonth() + 1).padStart(2, '0');
  const mesAno = `${ano}-${mes}`;

  return {
    nomeMercado,
    dataEmissao,
    mesAno,
    qtdTotalItens,
    valorTotal,
    descontoTotal,
    valorAPagar,
    formasPagamento,
    itens
  };
}
