import{initializeApp as qt}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";import{getFirestore as Pt,onSnapshot as X,query as Ut,collection as N,orderBy as Nt,doc as B,setDoc as tt,addDoc as ct,deleteDoc as H,serverTimestamp as bt}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function a(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(n){if(n.ep)return;n.ep=!0;const r=a(n);fetch(n.href,r)}})();const yt=document.createElement("script");yt.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js";document.head.appendChild(yt);const Et=document.createElement("script");Et.src="https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js";document.head.appendChild(Et);const kt={apiKey:"AIzaSyANpFnEIkyN1XCT6qbtmVR9wx7sQHEsyrE",authDomain:"comprasmercado-23913.firebaseapp.com",projectId:"comprasmercado-23913",storageBucket:"comprasmercado-23913.firebasestorage.app",messagingSenderId:"317518149234",appId:"1:317518149234:web:94f38624d68a2b9a6634eb",measurementId:"G-2XP88EK37S"},Vt=qt(kt),E=Pt(Vt),mt="compras",et="entradas",st="faturas",J="boletos",It="reservas";let w=[],R=[],P=[],U=[],lt={metaMensal:0,valorAtualGuardado:0},dt=null,F=null,M=[],W=0,K=!1,q=[];function l(t){return Number(t||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}function $(t){if(typeof t=="number")return t;if(!t)return 0;const e=parseFloat(String(t).replace(/R\$\s?/gi,"").replace(/\s/g,"").replace(/\./g,"").replace(",","."));return isNaN(e)?0:e}function rt(t){if(!t)return"—";try{return new Date(t).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}catch{return t}}function v(t,e=3500){const a=document.getElementById("toast");a.textContent=t,a.classList.add("show"),setTimeout(()=>a.classList.remove("show"),e)}function A(t,e="var(--accent-amber)"){const a=document.getElementById("status-msg");a&&(a.textContent=t,a.style.color=e)}function jt(t){if(!t)return new Date().toISOString().slice(0,16);try{const e=new Date(t);if(isNaN(e.getTime()))return new Date().toISOString().slice(0,16);const a=o=>String(o).padStart(2,"0");return`${e.getFullYear()}-${a(e.getMonth()+1)}-${a(e.getDate())}T${a(e.getHours())}:${a(e.getMinutes())}`}catch{return new Date().toISOString().slice(0,16)}}function zt(t,e){let a=0;const o=new Date(t,e+1,0).getDate();for(let n=1;n<=o;n++){const r=new Date(t,e,n).getDay();r!==0&&r!==6&&a++}return a}window.goTab=function(t){document.querySelectorAll(".tab-content").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".desktop-nav .nav-item").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".mobile-nav .mob-btn").forEach(a=>a.classList.remove("active"));const e=document.getElementById("tab-"+t);e&&e.classList.add("active"),document.querySelectorAll(`[data-tab="${t}"]`).forEach(a=>a.classList.add("active"))};document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>goTab(t.getAttribute("data-tab")))});document.querySelectorAll(".sub-item").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".sub-item").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".sub-tab-content").forEach(a=>a.style.display="none"),t.classList.add("active");const e=document.getElementById("sub-"+t.getAttribute("data-sub"));e&&(e.style.display="block")})});function $t(){document.getElementById("modal-add-nota").classList.add("active")}function xt(){K&&pt(),document.getElementById("modal-add-nota").classList.remove("active")}var gt;(gt=document.getElementById("btn-open-modal-home"))==null||gt.addEventListener("click",$t);var ft;(ft=document.getElementById("btn-mercado-add-nota"))==null||ft.addEventListener("click",$t);var ht;(ht=document.getElementById("btn-close-modal-add"))==null||ht.addEventListener("click",xt);X(Ut(N(E,mt),Nt("dataEmissao","desc")),t=>{w=t.docs.map(e=>({id:e.id,...e.data()})),at()},t=>console.error("Firestore Mercado:",t));X(N(E,et),t=>{R=t.docs.map(e=>({id:e.id,...e.data()})),at()},t=>console.error("Firestore Entradas:",t));X(N(E,st),t=>{P=t.docs.map(e=>({id:e.id,...e.data()})),at()},t=>console.error("Firestore Faturas:",t));X(N(E,J),t=>{U=t.docs.map(e=>({id:e.id,...e.data()})),at()},t=>console.error("Firestore Boletos:",t));X(B(E,It,"config"),t=>{t.exists()&&(lt=t.data()),at()},t=>console.error("Firestore Reservas:",t));function at(){Ht(),Gt(),Wt(),te(),oe(),de(),ce(),me(),ae()}function Ht(){let t=R.reduce((c,m)=>c+(m.valor||0),0),e=P.reduce((c,m)=>c+(m.valorTotal!==void 0?m.valorTotal:m.valor||0),0),a=U.reduce((c,m)=>c+(m.valorTotal!==void 0?m.valorTotal:m.valor||0),0),o=0,n=0,r=0,s=0,i=0;const u={};w.forEach(c=>{const m=c.valorAPagar||0;s+=c.descontoTotal||0,i+=c.qtdTotalItens||0,c.formasPagamento&&(n+=c.formasPagamento.valeAlimentacao||0,r+=c.formasPagamento.cartaoCredito||0,o+=c.formasPagamento.cartaoDebito||0);const f=c.mesAno||"Outros";u[f]=(u[f]||0)+m});let d=t-e-a-o;document.getElementById("fin-total-entradas").textContent=l(t),document.getElementById("fin-total-cartoes").textContent=l(e),document.getElementById("fin-total-boletos").textContent=l(a),document.getElementById("fin-mercado-debito").textContent=l(o),document.getElementById("fin-saldo-liquido").textContent=l(d),document.getElementById("dash-alimentacao").textContent=l(n),document.getElementById("dash-credito").textContent=l(r),document.getElementById("dash-debito").textContent=l(o),At(u)}function At(t){var r;if(typeof Chart>"u")return setTimeout(()=>At(t),300);const e=(r=document.getElementById("chart-barras"))==null?void 0:r.getContext("2d");if(!e)return;const a=Object.keys(t).sort(),o=a.map(s=>{const[i,u]=s.split("-");return`${u}/${i}`}),n=a.map(s=>t[s]);dt&&dt.destroy(),dt=new Chart(e,{type:"bar",data:{labels:o.length?o:["Sem compras"],datasets:[{label:"Gasto Mercado R$",data:n.length?n:[0],backgroundColor:"rgba(16,185,129,0.78)",borderColor:"#10b981",borderWidth:2,borderRadius:8}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:s=>` ${l(s.raw)}`}}},scales:{y:{beginAtZero:!0,grid:{color:"rgba(255,255,255,.05)"},ticks:{color:"#94a3b8",callback:s=>"R$"+s}},x:{grid:{display:!1},ticks:{color:"#94a3b8"}}}}})}function Bt(t){if(!t)return 0;const e=t.match(/L[íi]quido(?:\s*a\s*receber)?\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/TOTAL\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/SAL[ÁA]RIO\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/VALOR\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i);return e?$(e[1]):0}document.getElementById("form-holerite-victor").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-holerite-txt-victor").value;let a=parseFloat(document.getElementById("inp-salario-val-victor").value)||0;if(!a&&e&&(a=Bt(e)),!a){v("⚠️ Digite ou cole um holerite válido com valor.");return}await tt(B(E,et,"salario_victor"),{pessoa:"Victor",tipo:"holerite",descricao:"Salário Líquido Victor",valor:a,data:new Date().toISOString()}),v("✅ Salário do Victor salvo!")});document.getElementById("form-holerite-maria").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-holerite-txt-maria").value;let a=parseFloat(document.getElementById("inp-salario-val-maria").value)||0;if(!a&&e&&(a=Bt(e)),!a){v("⚠️ Digite ou cole um holerite válido com valor.");return}await tt(B(E,et,"salario_maria"),{pessoa:"Maria",tipo:"holerite",descricao:"Salário Líquido Maria",valor:a,data:new Date().toISOString()}),v("✅ Salário da Maria salvo!")});document.getElementById("form-entrada-manual").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-ent-desc").value.trim(),a=parseFloat(document.getElementById("inp-ent-val").value)||0,o=document.getElementById("inp-ent-pessoa").value;!e||!a||(await ct(N(E,et),{pessoa:o,tipo:"manual",descricao:e,valor:a,data:new Date().toISOString()}),t.target.reset(),v("🎉 Entrada manual registrada!"))});function Gt(){var n,r;const t=((n=R.find(s=>s.id==="salario_victor"))==null?void 0:n.valor)||0,e=((r=R.find(s=>s.id==="salario_maria"))==null?void 0:r.valor)||0,a=R.reduce((s,i)=>s+(i.valor||0),0);document.getElementById("val-salario-victor").textContent=l(t),document.getElementById("val-salario-maria").textContent=l(e),document.getElementById("val-entradas-combinado").textContent=l(a);const o=document.getElementById("lista-entradas-registradas");if(!R.length){o.innerHTML='<div class="empty-state">Nenhuma entrada cadastrada ainda.</div>';return}o.innerHTML=`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Descrição</th><th>Pessoa</th><th>Tipo</th><th class="num">Valor</th><th>Ação</th></tr></thead>
    <tbody>${R.map(s=>`<tr>
      <td><strong>${s.descricao}</strong></td>
      <td><span class="badge ${s.pessoa==="Victor"?"green":s.pessoa==="Maria"?"purple":"cyan"}">${s.pessoa}</span></td>
      <td><span class="badge amber">${s.tipo==="holerite"?"Holerite":"Manual"}</span></td>
      <td class="num" style="color:#34d399"><strong>${l(s.valor)}</strong></td>
      <td><button class="btn-danger" onclick="excluirEntrada('${s.id}')">🗑️</button></td>
    </tr>`).join("")}</tbody>
  </table></div>`}window.excluirEntrada=async function(t){confirm("Excluir esta entrada?")&&(await H(B(E,et,t)),v("🗑️ Entrada removida."))};let ut="Nubank";function Qt(){const t=document.getElementById("inp-fatura-vencimento");if(t&&!t.value){const e=new Date,a=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0");t.value=`${a}-${o}-10`,atualizarMesRefFatura()}}setTimeout(Qt,300);window.atualizarMesRefFatura=function(){const t=document.getElementById("inp-fatura-vencimento"),e=document.getElementById("lbl-fatura-mes-ref");if(!(!t||!e))if(t.value){const[a,o]=t.value.split("-"),r=new Date(parseInt(a),parseInt(o)-1,1).toLocaleString("pt-BR",{month:"long"});e.textContent=`Fatura ${r.charAt(0).toUpperCase()+r.slice(1)}/${a}`}else e.textContent="Mês da Fatura"};window.selecionarCartaoFatura=function(t){ut=t,document.querySelectorAll(".btn-card-select").forEach(a=>a.classList.remove("active"));const e=document.querySelector(`.btn-card-select[data-card="${t}"]`);e&&e.classList.add("active"),v(`Cartão selecionado: ${t}`)};window.handleFileFaturaSelect=async function(t){const e=t.target.files[0];if(!e)return;const a=document.getElementById("txt-file-fatura");a&&(a.textContent=`📄 Arquivo: ${e.name}`),v(`⏳ Lendo arquivo da fatura (${e.name})...`);let o="";if(e.type==="application/pdf"||e.name.endsWith(".pdf"))o=await wt(e);else try{o=await e.text()}catch{o=""}o?(document.getElementById("inp-fatura-txt").value=o,await Tt(o,ut)):v("❌ Não foi possível ler o texto do arquivo da fatura.")};async function wt(t){try{const e=await t.arrayBuffer();if(typeof pdfjsLib>"u")return v("⚠️ Aguarde a biblioteca de PDF carregar..."),"";pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";let a=pdfjsLib.getDocument({data:e});a.onPassword=(r,s)=>{let i=prompt(`🔒 Este PDF de fatura está protegido por senha.
Digite a senha para abrir (ex: CPF ou Data de Nascimento):`);i?r(i):v("⚠️ Senha não informada. Leitura do PDF cancelada.")};const o=await a.promise;let n="";for(let r=1;r<=o.numPages;r++){const i=await(await o.getPage(r)).getTextContent();let u=null,d="";for(const c of i.items){if(!c.str)continue;const m=c.transform?c.transform[5]:null;u!==null&&Math.abs(m-u)>3?d+=`
`:d.length>0&&!d.endsWith(`
`)&&!d.endsWith(" ")&&(d+=" "),d+=c.str,u=m}n+=d+`
`}return n}catch(e){return e.name==="PasswordException"?v("🔒 O PDF precisa de senha válida para ser aberto."):console.error("Erro ao ler PDF:",e),""}}function Yt(t){if(!t)return null;const e=t.match(/Total\s*a\s*Pagar\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/no\s*valor\s*de\s*R?\$\s*([\d\.,]+)/i)||t.match(/Valor\s*total\s*da\s*fatura\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/Total\s*da\s*fatura\s*[:\s]*R?\$\s*([\d\.,]+)/i);if(e){const a=$(e[1]);if(a>0)return a}return null}function Zt(t){if(!t)return null;const e=t.match(/Vencimento\s*[:\s]*(\d{2}[\/\.-]\d{2}[\/\.-]\d{4})/i)||t.match(/Data\s*de\s*vencimento\s*[:\s]*(\d{2})\s+([A-Za-z]{3})\s+(\d{4})/i)||t.match(/FATURA\s+(\d{2})\s+([A-Za-z]{3})\s+(\d{4})/i);if(e){if(e[2]&&e[3]){const a=e[1],o=e[2].toUpperCase(),n=e[3],s={JAN:"01",FEB:"02",MAR:"03",ABR:"04",APR:"04",MAI:"05",MAY:"05",JUN:"06",JUL:"07",AGO:"08",AUG:"08",SET:"09",SEP:"09",OUT:"10",OCT:"10",NOV:"11",DEZ:"12",DEC:"12"}[o]||"07";return`${n}-${s}-${a.padStart(2,"0")}`}else if(e[1]){const[a,o,n]=e[1].split(/[\/\.-]/);return`${n}-${o.padStart(2,"0")}-${a.padStart(2,"0")}`}}return null}window.importarFaturaManualOuArquivo=async function(){const t=document.getElementById("inp-fatura-txt").value.trim();if(!t){v("⚠️ Selecione o arquivo da fatura (.pdf, .csv) ou cole o texto da fatura.");return}await Tt(t,ut)};async function Tt(t,e){const a=Zt(t);a&&(document.getElementById("inp-fatura-vencimento").value=a,atualizarMesRefFatura());const o=Yt(t),n=_t(t);if(!n.length&&!o){v(`⚠️ Nenhuma compra individual identificada na fatura do ${e}.`);return}const r=document.getElementById("inp-fatura-vencimento").value||new Date().toISOString().slice(0,10),s=r.slice(0,7),i=n.reduce((d,c)=>d+c.valor,0),u=o||i;n.length,renderizarRevisaoFaturaUI(),v(`✅ ${n.length} compras encontradas! Fatura total: ${l(u)}.`)}function _t(t){if(!t)return[];const e=[],a=/(?:[@\)\(\*•\s]+)?(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+(?:(\d{2}\/\d{2})\s+)?(-?R?\$\s*[\d\.]+,\d{2}|-?[\d\.]+,\d{2})/gi;if(t.split(`
`).forEach(n=>{const r=n.trim();if(!r||/EMISS[ÃA]O|TRANSA[ÇC][ÕO]ES|RESUMO|PAGAMENTO DE FATURA|TOTAL DA FATURA|FATURA ANTERIOR|SALDO ANTERIOR|LIMITE DISPON[ÍI]VEL|OPÇÕES DE PAGAMENTO|ALTERNATIVAS DE PAGAMENTO|PAGAMENTO E DEMAIS|PARCELAMENTOS|DESPESAS|HISTÓRICO DE FATURAS|SUPERCRÉDITO|SAQUE À CRÉDITO|COMPRA DATA DESCRIÇÃO/i.test(r))return;const s=/(?:[@\)\(\*•\s]+)?(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+(?:(\d{2}\/\d{2})\s+)?(-?R?\$\s*[\d\.]+,\d{2}|-?[\d\.]+,\d{2})$/i,i=r.match(s)||r.match(/(?:[@\)\(\*•\s]+)?(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+(?:(\d{2}\/\d{2})\s+)?(-?R?\$\s*[\d\.]+,\d{2}|-?[\d\.]+,\d{2})/i);if(i){const u=i[1];let d=i[2].trim();const c=i[3],m=i[4];if(m.includes("-")||/DEB AUTOM|PAGAMENTO|PAGTO|CR[ÉE]DITO FATURA/i.test(d))return;const f=$(m);c&&(d+=` (${c})`),d&&f>0&&d.length>2&&!/fatura|limite|pagamento|saldo|alternativas|opções|período|emissão|vencimento/i.test(d)&&e.push({dataCompra:u,descricao:d,valor:f})}}),e.length===0){let n;for(;(n=a.exec(t))!==null;){const r=n[1];let s=n[2].trim();const i=n[3],u=n[4];if(u.includes("-")||/DEB AUTOM|PAGAMENTO|PAGTO|CR[ÉE]DITO FATURA/i.test(s))continue;const d=$(u);i&&(s+=` (${i})`),s&&d>0&&s.length>2&&!/fatura|limite|pagamento|saldo|alternativas|opções|período|emissão|vencimento/i.test(s)&&e.push({dataCompra:r,descricao:s,valor:d})}}return e}function Wt(){const t=P.reduce((a,o)=>a+(o.valorTotal!==void 0?o.valorTotal:o.valor||0),0);document.getElementById("badge-total-cartoes").textContent=`${l(t)} total`;const e=document.getElementById("lista-faturas-registradas");if(!P.length){e.innerHTML='<div class="empty-state">Nenhuma fatura cadastrada ainda.</div>';return}e.innerHTML=P.map(a=>{var c;const o=a.valorTotal!==void 0?a.valorTotal:a.valor||0,n=a.cartao||"Cartão",r=n.toLowerCase().includes("nubank"),s=r?"purple":"red",i=r?"🟣":"🔴",u=a.dataVencimento?rt(a.dataVencimento).split(",")[0]:"—",d=a.mesAno||"—";return`
      <div class="purchase-card">
        <div class="purchase-header" onclick="toggleDetail('fat-${a.id}')">
          <div class="purchase-info">
            <h3><span class="badge ${s}">${i} ${n}</span> — Vencimento: ${u}</h3>
            <p>📅 Mês Referência: <strong>${d}</strong> &nbsp;•&nbsp; 🛒 ${a.qtdItens||((c=a.itens)==null?void 0:c.length)||1} itens contemplados</p>
          </div>
          <div class="purchase-values">
            <div class="pv-total" style="color:#fb7185">${l(o)}</div>
            <div class="pv-sub">Fatura do Mês</div>
          </div>
          <svg class="chevron" id="chev-fat-${a.id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="purchase-details" id="detail-fat-${a.id}">
          <div class="details-toolbar">
            <span class="card-subtext">Detalhamento dos Lançamentos da Fatura</span>
            <button class="btn-danger" onclick="excluirFaturaDocumento('${a.id}')">🗑️ Excluir Fatura</button>
          </div>
          ${Jt(a)}
        </div>
      </div>
    `}).join("")}function Jt(t){return t.itens&&t.itens.length>0?`<div class="table-responsive"><table class="custom-table">
      <thead><tr><th>Data Compra</th><th>Descrição do Lançamento</th><th class="num">Valor</th><th>Ação</th></tr></thead>
      <tbody>${t.itens.map((e,a)=>`<tr>
        <td><strong>${e.dataCompra||"—"}</strong></td>
        <td>${e.descricao}</td>
        <td class="num" style="color:#fb7185"><strong>${l(e.valor)}</strong></td>
        <td><button class="btn-danger" style="padding:.2rem .5rem; font-size:.78rem;" onclick="removerItemFaturaCadastrada('${t.id}', ${a})">🗑️ Excluir</button></td>
      </tr>`).join("")}</tbody>
    </table></div>`:`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Descrição</th><th class="num">Valor</th><th>Ação</th></tr></thead>
    <tbody><tr>
      <td>${t.descricao||"Fatura do Cartão"}</td>
      <td class="num" style="color:#fb7185"><strong>${l(t.valor||t.valorTotal)}</strong></td>
      <td><button class="btn-danger" style="padding:.2rem .5rem; font-size:.78rem;" onclick="excluirFaturaDocumento('${t.id}')">🗑️ Excluir</button></td>
    </tr></tbody>
  </table></div>`}window.removerItemFaturaCadastrada=async function(t,e){const a=P.find(r=>r.id===t);if(!a||!a.itens||!confirm("Remover este item da fatura?"))return;const o=[...a.itens];o.splice(e,1);const n=o.reduce((r,s)=>r+(s.valor||0),0);o.length===0?(await H(B(E,st,t)),v("🗑️ Fatura excluída pois todos os itens foram removidos.")):(await tt(B(E,st,t),{...a,itens:o,valorTotal:n,qtdItens:o.length}),v("🗑️ Item removido da fatura."))};window.excluirFaturaDocumento=async function(t){confirm("Excluir esta fatura e todos os seus lançamentos?")&&(await H(B(E,st,t)),v("🗑️ Fatura removida com sucesso."))};let b=null;function Kt(){const t=document.getElementById("inp-boleto-vencimento");if(t&&!t.value){const e=new Date,a=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0");t.value=`${a}-${o}-10`,atualizarMesRefBoleto()}}setTimeout(Kt,300);window.atualizarMesRefBoleto=function(){const t=document.getElementById("inp-boleto-vencimento"),e=document.getElementById("lbl-boleto-mes-ref");if(!(!t||!e))if(t.value){const[a,o]=t.value.split("-"),r=new Date(parseInt(a),parseInt(o)-1,1).toLocaleString("pt-BR",{month:"long"});e.textContent=`Boleto ${r.charAt(0).toUpperCase()+r.slice(1)}/${a}`}else e.textContent="Mês do Boleto"};window.handleFileBoletoSelect=async function(t){const e=t.target.files[0];if(!e)return;const a=document.getElementById("txt-file-boleto");a&&(a.textContent=`📄 Arquivo: ${e.name}`),v(`⏳ Lendo arquivo do boleto (${e.name})...`);let o="";if(e.type==="application/pdf"||e.name.endsWith(".pdf"))o=await wt(e);else try{o=await e.text()}catch{o=""}o?(document.getElementById("inp-boleto-txt").value=o,await Ct(o,e.name)):v("❌ Não foi possível ler o texto do arquivo do boleto.")};window.importarBoletoManualOuArquivo=async function(){const t=document.getElementById("inp-boleto-txt").value.trim();if(!t){v("⚠️ Selecione o arquivo do boleto (.pdf, .txt) ou cole o texto do boleto.");return}await Ct(t,"Boleto")};async function Ct(t,e){const a=Xt(t);a.vencimento&&(document.getElementById("inp-boleto-vencimento").value=a.vencimento,atualizarMesRefBoleto());const o=document.getElementById("inp-boleto-vencimento").value||new Date().toISOString().slice(0,10),n=o.slice(0,7),r=a.beneficiario||e.replace(/\.[^/.]+$/,"")||"Boleto / Conta",s=a.itens.reduce((u,d)=>u+d.valor,0),i=a.valorTotal||s||0;document.getElementById("inp-revisao-boleto-desc").value=r,document.getElementById("inp-revisao-boleto-val").value=i?i.toFixed(2):"",b={descricao:r,dataVencimento:o,mesAno:n,valorTotal:i,qtdItens:a.itens.length,itens:a.itens},Mt(),v("✅ Boleto identificado! Confira a descrição, valor e itens antes de salvar.")}window.atualizarValorTotalRevisaoBoleto=function(){if(!b)return;const t=parseFloat(document.getElementById("inp-revisao-boleto-val").value)||0;b.valorTotal=t,document.getElementById("badge-total-preview-boleto").textContent=l(t)};function Mt(){if(!b)return;const{valorTotal:t,itens:e}=b;document.getElementById("badge-total-preview-boleto").textContent=l(t);const a=document.getElementById("lista-preview-boleto-itens");!e||!e.length?a.innerHTML='<div class="empty-state">Nenhum encargo/item individual extraído. O valor total acima será considerado.</div>':a.innerHTML=e.map((n,r)=>`
      <div style="display:flex; justify-content:space-between; align-items:center; padding:.4rem 0; border-bottom:1px dashed var(--border-color); font-size:.82rem;">
        <span><strong>${n.dataBoleto||"—"}</strong> — ${n.descricao}</span>
        <div style="display:flex; align-items:center; gap:.75rem;">
          <span style="color:#c084fc; font-weight:700;">${l(n.valor)}</span>
          <button type="button" class="btn-danger" style="padding:.15rem .45rem; font-size:.75rem;" onclick="removerItemRevisaoBoleto(${r})">🗑️</button>
        </div>
      </div>
    `).join("");const o=document.getElementById("box-revisao-boleto");o.style.display="block",o.scrollIntoView({behavior:"smooth"})}window.removerItemRevisaoBoleto=function(t){if(!b||!b.itens)return;b.itens.splice(t,1);const e=b.itens.reduce((a,o)=>a+o.valor,0);e>0&&(b.valorTotal=e,document.getElementById("inp-revisao-boleto-val").value=e.toFixed(2)),b.qtdItens=b.itens.length,Mt(),v("🗑️ Item removido da revisão do boleto.")};window.confirmarEGravarBoletoDocumento=async function(){if(!b)return;const t=document.getElementById("inp-revisao-boleto-desc").value.trim(),e=parseFloat(document.getElementById("inp-revisao-boleto-val").value)||0,a=document.getElementById("inp-boleto-vencimento").value||new Date().toISOString().slice(0,10);if(!e){v("⚠️ Digite ou confirme o valor total do boleto.");return}b.descricao=t||"Boleto / Conta",b.valorTotal=e,b.dataVencimento=a,b.mesAno=a.slice(0,7);try{await ct(N(E,J),{...b,createdAt:bt()}),document.getElementById("box-revisao-boleto").style.display="none",document.getElementById("inp-boleto-txt").value="";const o=document.getElementById("txt-file-boleto");o&&(o.textContent="Clique para Selecionar o Arquivo do Boleto");const n=l(b.valorTotal);b=null,v(`🎉 Boleto de ${n} salvo com sucesso!`)}catch(o){alert("Erro ao salvar boleto: "+o.message)}};function Xt(t){if(!t)return{beneficiario:"",valorTotal:0,vencimento:null,itens:[]};let e="",a=0,o=null;const n=[],r=t.match(/Vencimento\s*[:\s]*(\d{2}[\/\.-]\d{2}[\/\.-]\d{4})/i)||t.match(/Vencimento\s*[:\s]*(\d{2})\s+([A-Za-z]{3})\s+(\d{4})/i)||t.match(/Data\s*de\s*Vencimento\s*[:\s]*(\d{2}[\/\.-]\d{2}[\/\.-]\d{4})/i);if(r){if(r[2]&&r[3]){const d=r[1],c=r[2].toUpperCase();o=`${r[3]}-${{JAN:"01",FEB:"02",MAR:"03",ABR:"04",APR:"04",MAI:"05",MAY:"05",JUN:"06",JUL:"07",AGO:"08",AUG:"08",SET:"09",SEP:"09",OUT:"10",OCT:"10",NOV:"11",DEZ:"12",DEC:"12"}[c]||"07"}-${d.padStart(2,"0")}`}else if(r[1]){const[d,c,m]=r[1].split(/[\/\.-]/);o=`${m}-${c.padStart(2,"0")}-${d.padStart(2,"0")}`}}const s=t.match(/Benefici[áa]rio\s*[:\s]*([^\n\r]+)/i)||t.match(/Nome\s*do\s*Cedente\s*[:\s]*([^\n\r]+)/i)||t.match(/Raz[ãa]o\s*Social\s*[:\s]*([^\n\r]+)/i);s&&(e=s[1].trim().replace(/\s{2,}/g," "));const i=t.match(/Valor\s*do\s*Documento\s*[:\s]*R?\$\s*([\d\.]+,\d{2})/i)||t.match(/\(=\)\s*Valor\s*Cobrado\s*[:\s]*R?\$\s*([\d\.]+,\d{2})/i)||t.match(/Valor\s*Cobrado\s*[:\s]*R?\$\s*([\d\.]+,\d{2})/i)||t.match(/Valor\s*R?\$\s*([\d\.]+,\d{2})/i);return i&&(a=$(i[1])),t.split(`
`).forEach(d=>{const c=d.trim();if(!c||/vencimento|beneficiário|cedente|nosso\s*número|agência|código|autenticação|instruções/i.test(c))return;const m=c.match(/(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\b[A-Za-z]{3}\b)?\s*(.+?)\s+R?\$\s*([\d\.]+,\d{2})$/i);if(m){const f=m[1]||"Boleto",y=m[2].trim(),I=$(m[3]);y&&I>0&&y.length>2&&!/valor|total|documento|cobrado/i.test(y)&&n.push({dataBoleto:f,descricao:y,valor:I})}}),{beneficiario:e,valorTotal:a,vencimento:o,itens:n}}function te(){const t=U.reduce((a,o)=>a+(o.valorTotal!==void 0?o.valorTotal:o.valor||0),0);document.getElementById("badge-total-boletos").textContent=`${l(t)} total`;const e=document.getElementById("lista-boletos-registrados");if(!U.length){e.innerHTML='<div class="empty-state">Nenhum boleto cadastrado ainda.</div>';return}e.innerHTML=U.map(a=>{var i;const o=a.valorTotal!==void 0?a.valorTotal:a.valor||0,n=a.dataVencimento?rt(a.dataVencimento).split(",")[0]:"—",r=a.mesAno||"—",s=a.descricao||"Boleto / Conta";return`
      <div class="purchase-card">
        <div class="purchase-header" onclick="toggleDetail('bol-${a.id}')">
          <div class="purchase-info">
            <h3><span class="badge purple">📄 ${s}</span> — Vencimento: ${n}</h3>
            <p>📅 Mês Referência: <strong>${r}</strong> &nbsp;•&nbsp; 🛒 ${a.qtdItens||((i=a.itens)==null?void 0:i.length)||1} itens / encargos</p>
          </div>
          <div class="purchase-values">
            <div class="pv-total" style="color:#c084fc">${l(o)}</div>
            <div class="pv-sub">Boleto do Mês</div>
          </div>
          <svg class="chevron" id="chev-bol-${a.id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="purchase-details" id="detail-bol-${a.id}">
          <div class="details-toolbar">
            <span class="card-subtext">Detalhamento dos Itens / Encargos do Boleto</span>
            <button class="btn-danger" onclick="excluirBoletoDocumento('${a.id}')">🗑️ Excluir Boleto</button>
          </div>
          ${ee(a)}
        </div>
      </div>
    `}).join("")}function ee(t){return t.itens&&t.itens.length>0?`<div class="table-responsive"><table class="custom-table">
      <thead><tr><th>Data</th><th>Descrição / Item</th><th class="num">Valor</th><th>Ação</th></tr></thead>
      <tbody>${t.itens.map((e,a)=>`<tr>
        <td><strong>${e.dataBoleto||"—"}</strong></td>
        <td>${e.descricao}</td>
        <td class="num" style="color:#c084fc"><strong>${l(e.valor)}</strong></td>
        <td><button class="btn-danger" style="padding:.2rem .5rem; font-size:.78rem;" onclick="removerItemBoletoCadastrado('${t.id}', ${a})">🗑️ Excluir</button></td>
      </tr>`).join("")}</tbody>
    </table></div>`:`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Descrição</th><th class="num">Valor</th><th>Ação</th></tr></thead>
    <tbody><tr>
      <td>${t.descricao||"Boleto"}</td>
      <td class="num" style="color:#c084fc"><strong>${l(t.valor||t.valorTotal)}</strong></td>
      <td><button class="btn-danger" style="padding:.2rem .5rem; font-size:.78rem;" onclick="excluirBoletoDocumento('${t.id}')">🗑️ Excluir</button></td>
    </tr></tbody>
  </table></div>`}window.removerItemBoletoCadastrado=async function(t,e){const a=U.find(r=>r.id===t);if(!a||!a.itens||!confirm("Remover este item do boleto?"))return;const o=[...a.itens];o.splice(e,1);const n=o.reduce((r,s)=>r+(s.valor||0),0);o.length===0?(await H(B(E,J,t)),v("🗑️ Boleto excluído pois todos os itens foram removidos.")):(await tt(B(E,J,t),{...a,itens:o,valorTotal:n,qtdItens:o.length}),v("🗑️ Item removido do boleto."))};window.excluirBoletoDocumento=async function(t){confirm("Excluir este boleto e todos os seus itens?")&&(await H(B(E,J,t)),v("🗑️ Boleto removido com sucesso."))};document.getElementById("form-config-reservas").addEventListener("submit",async t=>{t.preventDefault();const e=parseFloat(document.getElementById("inp-meta-mensal").value)||0,a=parseFloat(document.getElementById("inp-saldo-guardado").value)||0;await tt(B(E,It,"config"),{metaMensal:e,valorAtualGuardado:a,dataAtualizacao:new Date().toISOString()}),v("✅ Reservas e economias atualizadas!")});function ae(){const t=lt.metaMensal||0,e=lt.valorAtualGuardado||0;document.getElementById("val-meta-reserva").textContent=l(t),document.getElementById("val-real-guardado").textContent=l(e);const a=R.reduce((c,m)=>c+(m.valor||0),0),o=P.reduce((c,m)=>c+(m.valorTotal!==void 0?m.valorTotal:m.valor||0),0),n=U.reduce((c,m)=>c+(m.valorTotal!==void 0?m.valorTotal:m.valor||0),0);let r=0;w.forEach(c=>{c.formasPagamento&&(r+=c.formasPagamento.cartaoDebito||0)});const s=a-o-n-r,i=s>0?Math.max(s*.5,a*.2):0;document.getElementById("val-recomendacao-reserva").textContent=l(i);const u=document.getElementById("box-analise-reserva-detalhes");if(a===0){u.innerHTML='<p class="empty-state">Cadastre seus salários e entradas na aba "Salários & Entradas" para gerar o diagnóstico inteligente de economias.</p>';return}const d=t>0?Math.min(100,e/t*100).toFixed(1):0;u.innerHTML=`
    <p> Com base nos seus <strong>${l(a)}</strong> de Entradas, <strong>${l(o)}</strong> de Faturas de Cartão e <strong>${l(r)}</strong> de Mercado no Débito:</p>
    <div style="background:rgba(15,23,42,0.6);padding:1rem;border-radius:10px;margin:.75rem 0;border:1px solid var(--border-color)">
      <div style="display:flex;justify-content:space-between;margin-bottom:.4rem">
        <span>💰 Saldo Livre em Conta: <strong>${l(s)}</strong></span>
        <span>💡 Recomendação de Reserva: <strong style="color:#c084fc">${l(i)}/mês</strong></span>
      </div>
      <div class="progress-bar-bg">
        <div class="progress-bar-fill" style="width:${d}%"></div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:.78rem;color:var(--text-muted);margin-top:.4rem">
        <span>Guardado: ${l(e)}</span>
        <span>Meta Pessoal: ${l(t)} (${d}%)</span>
      </div>
    </div>
    <p style="font-size:.84rem;color:var(--text-muted)">
      💡 <strong>Dica de Inteligência Financeira:</strong> Como o Vale Alimentação e o Crédito no Mercado não saem do seu salário em conta, eles protegem sua renda real! O sistema recomenda destinar pelo menos 50% do seu saldo livre líquido (<strong>${l(i)}</strong>) para sua reserva de emergência e investimentos.
    </p>
  `}function oe(){const t=document.getElementById("lista-mensal-container");if(!t)return;const e=new Date,a=new Date(e.getFullYear(),e.getMonth()+1,1),o=a.toLocaleString("pt-BR",{month:"long"}),n=a.getFullYear(),r=`${o.charAt(0).toUpperCase()+o.slice(1)} de ${n}`,s=zt(a.getFullYear(),a.getMonth()),i=31.8,u=20,d=s*i,c=s*u,m={};let f=0;w.forEach(p=>{const g=p.valorAPagar||0;f+=g;const h=p.mesAno||"Outros";m[h]=(m[h]||0)+g});const y=Math.max(1,Object.keys(m).length),I=f/y,x={};w.forEach(p=>{(p.itens||[]).forEach(g=>{const h=(g.nome||"").toLowerCase().trim();h&&(x[h]||(x[h]={nome:g.nome,marca:g.marca||"Geral",qtdTotal:0,frequenciaNotas:0,valoresUnitarios:[]}),x[h].qtdTotal+=g.quantidade||1,x[h].frequenciaNotas+=1,g.valorUnitario&&x[h].valoresUnitarios.push(g.valorUnitario))})});const S=Object.values(x).map(p=>{const g=p.valoresUnitarios.length>0?p.valoresUnitarios.reduce((_,nt)=>_+nt,0)/p.valoresUnitarios.length:0,h=p.qtdTotal/y,z=y/Math.max(1,p.frequenciaNotas),ot=p.frequenciaNotas/y;let C=0;ot>=.35||h>=.7?C=Math.ceil(h):C=Math.round(h),C<1&&p.frequenciaNotas>=y&&(C=1);const Z=C*g;return{nome:p.nome,marca:p.marca,frequenciaNotas:p.frequenciaNotas,intervaloMeses:z,qtdMensalTaxa:h,totalEstimadoUnidades:C,valorUnitario:g,subtotalCalculado:Z}}).filter(p=>p.totalEstimadoUnidades>0);S.sort((p,g)=>g.frequenciaNotas-p.frequenciaNotas);const T=S.reduce((p,g)=>p+g.subtotalCalculado,0),G=I>0?I*1.05:T;let Q=1;T>G&&I>0&&(Q=G/T);const Y=S.map(p=>({...p,subtotalFinal:p.subtotalCalculado*Q})),k=I>0?Math.min(T,G):T;let D=k;const V=Math.min(D,d);D-=V;const j=Math.min(D,c);D-=j;const O=D>0?D:0;let L=`
    <div class="card" style="margin-bottom:1.5rem; background: linear-gradient(135deg, rgba(30,41,59,0.9), rgba(15,23,42,0.95)); border: 1px solid #3b82f6;">
      <div class="card-header">
        <div>
          <span class="card-title" style="color:#60a5fa;">📅 Previsão de Compras — ${r}</span>
          <p class="card-subtext" style="color:#cbd5e1; margin-top:0.25rem;">
            Calculado com unidades inteiras exatas (${s} dias úteis em ${o}).
          </p>
        </div>
        <span class="badge green" style="font-size:0.8rem; padding:0.4rem 0.75rem;">${s} Dias Úteis</span>
      </div>

      <div class="payment-grid" style="margin-top:1rem;">
        <div class="payment-item" style="border-color: rgba(16,185,129,0.4);">
          <div class="p-label">🍽️ Vale Alimentação (${s}d × R$ 31,80)</div>
          <div class="p-val" style="color:#34d399;">${l(V)} <span style="font-size:0.75rem;font-weight:normal;color:var(--text-muted)">/ ${l(d)}</span></div>
        </div>
        <div class="payment-item" style="border-color: rgba(99,102,241,0.4);">
          <div class="p-label">💳 Cartão Crédito (${s}d × R$ 20,00)</div>
          <div class="p-val" style="color:#818cf8;">${l(j)} <span style="font-size:0.75rem;font-weight:normal;color:var(--text-muted)">/ ${l(c)}</span></div>
        </div>
        <div class="payment-item" style="border-color: ${O>0?"rgba(244,63,94,0.5)":"var(--border-color)"};">
          <div class="p-label">💳 Débito Necessário (Excedente)</div>
          <div class="p-val" style="color: ${O>0?"#fb7185":"var(--text-muted)"};">${l(O)}</div>
        </div>
      </div>

      <div style="margin-top:1.25rem; padding-top:1rem; border-top:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
        <div>
          <span style="font-size:0.85rem; color:var(--text-muted);">Total Estimado da Lista de Compras:</span>
          <p style="font-size:0.75rem; color:#60a5fa;">Média Histórica de Gastos: ${l(I)}</p>
        </div>
        <span style="font-size:1.6rem; font-weight:800; color:var(--primary);">${l(k)}</span>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-title">Lista de Itens com Frequência e Total Estimado</span>
        <span class="badge amber">${Y.length} itens cadastrados</span>
      </div>
      <p class="card-subtext" style="margin-bottom:1rem;">
        O <strong>Total Estimado</strong> arredonda o consumo médio para cima (unidades inteiras exatas), pois os produtos são comprados por unidade no mercado.
      </p>
  `;window.dadosListaMensalCache={mesAnoStr:r,diasUteis:s,totalGeralEstimado:k,cobertoAlim:V,cobertoCred:j,cobertoDeb:O,alimDisponivel:d,credDisponivel:c,lista:Y},Y.length===0?L+='<div class="empty-state">Adicione notas fiscais para que o sistema gere automaticamente sua lista mensal de compras.</div></div>':L+=`
      <div class="table-responsive">
        <table class="custom-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Marca</th>
              <th>Frequência de Compra</th>
              <th class="num">Consumo Estimado/Mês</th>
              <th class="num">Total Estimado</th>
              <th class="num">Preço Unit. Médio</th>
              <th class="num">Subtotal Mensal</th>
            </tr>
          </thead>
          <tbody>
            ${Y.map(p=>{const g=p.intervaloMeses>1.2?`A cada ${p.intervaloMeses.toFixed(1)} meses`:`Todo mês (${p.frequenciaNotas}x)`,h=p.qtdMensalTaxa<1?p.qtdMensalTaxa.toFixed(2):p.qtdMensalTaxa.toFixed(1),z=p.totalEstimadoUnidades.toFixed(1);return`
                <tr>
                  <td><strong>${p.nome}</strong></td>
                  <td><span class="badge amber">${p.marca}</span></td>
                  <td><span class="badge cyan">${g}</span></td>
                  <td class="num">${h} un/mês</td>
                  <td class="num"><span class="badge green" style="font-size:0.82rem;">${z}</span></td>
                  <td class="num">${l(p.valorUnitario)}</td>
                  <td class="num"><strong>${l(p.subtotalFinal)}</strong></td>
                </tr>
              `}).join("")}
          </tbody>
        </table>
      </div>
    </div>
    
    <div style="margin-top:1.5rem; text-align:center;">
      <button type="button" class="btn-primary" onclick="exportarPDFListaMensal()" style="padding: 0.85rem 1.75rem; font-size: 1rem; box-shadow: 0 4px 15px var(--primary-glow);">
        📄 Exportar Lista em PDF / Imprimir
      </button>
    </div>`,t.innerHTML=L}window.exportarPDFListaMensal=function(){if(!window.dadosListaMensalCache||!window.dadosListaMensalCache.lista.length){v("⚠️ Nenhuma lista mensal disponível para exportar.");return}const{mesAnoStr:t,diasUteis:e,totalGeralEstimado:a,cobertoAlim:o,cobertoCred:n,cobertoDeb:r,lista:s}=window.dadosListaMensalCache,i=window.open("","_blank","width=900,height=750");if(!i){alert("Permita pop-ups no navegador para gerar o PDF da lista.");return}const u=`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>Lista de Compras - ${t}</title>
      <style>
        body { font-family: system-ui, -apple-system, sans-serif; color: #0f172a; padding: 25px; margin: 0; background: #fff; }
        .header-print { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 18px; }
        .header-print h1 { font-size: 20px; margin: 0; color: #0f172a; }
        .header-print p { font-size: 13px; color: #475569; margin: 3px 0 0 0; }
        .box-resumo { border: 1px solid #cbd5e1; background: #f8fafc; border-radius: 8px; padding: 12px 15px; margin-bottom: 20px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
        .res-item .label { font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: bold; }
        .res-item .val { font-size: 15px; font-weight: bold; color: #0f172a; margin-top: 3px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12px; }
        th { background: #f1f5f9; text-align: left; padding: 8px 10px; border-bottom: 2px solid #cbd5e1; font-weight: 700; color: #334155; }
        td { padding: 7px 10px; border-bottom: 1px solid #e2e8f0; vertical-align: middle; }
        .num { text-align: right; }
        .check-col { width: 35px; text-align: center; }
        .chk-box { width: 14px; height: 14px; border: 1.5px solid #64748b; border-radius: 3px; display: inline-block; }
        .total-footer { margin-top: 20px; border-top: 2px solid #0f172a; padding-top: 10px; display: flex; justify-content: space-between; align-items: center; font-size: 15px; font-weight: bold; }
        @media print { body { padding: 0; } }
      </style>
    </head>
    <body>
      <div class="header-print">
        <div>
          <h1>🛒 Controle Mercado — Lista de Compras</h1>
          <p>Previsão para <strong>${t}</strong> (${e} dias úteis)</p>
        </div>
        <div style="text-align:right;">
          <p style="font-size:11px; color:#64748b;">Victor & Maria</p>
        </div>
      </div>

      <div class="box-resumo">
        <div class="res-item">
          <div class="label">🍽️ Vale Alimentação</div>
          <div class="val">${l(o)}</div>
        </div>
        <div class="res-item">
          <div class="label">💳 Cartão Crédito</div>
          <div class="val">${l(n)}</div>
        </div>
        <div class="res-item">
          <div class="label">💳 Débito (Excedente)</div>
          <div class="val">${l(r)}</div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th class="check-col">[  ]</th>
            <th>Item</th>
            <th>Marca</th>
            <th class="num">Qtd. Estimada</th>
            <th class="num">Preço Unit. Médio</th>
            <th class="num">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${s.map(d=>`
            <tr>
              <td class="check-col"><div class="chk-box"></div></td>
              <td><strong>${d.nome}</strong></td>
              <td>${d.marca}</td>
              <td class="num"><strong>${d.totalEstimadoUnidades.toFixed(1)} un</strong></td>
              <td class="num">${l(d.valorUnitario)}</td>
              <td class="num"><strong>${l(d.subtotalFinal)}</strong></td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <div class="total-footer">
        <span>Total Estimado da Compra:</span>
        <span style="font-size:18px; color:#059669;">${l(a)}</span>
      </div>

      <script>
        window.onload = function() {
          setTimeout(function() { window.print(); }, 350);
        };
      <\/script>
    </body>
    </html>
  `;i.document.open(),i.document.write(u),i.document.close()};document.getElementById("btn-start-cam").addEventListener("click",St);document.getElementById("btn-switch-cam").addEventListener("click",ne);document.getElementById("btn-stop-cam").addEventListener("click",pt);async function St(){if(typeof Html5Qrcode>"u")return A("Carregando biblioteca de câmera, aguarde..."),setTimeout(St,600);try{F||(F=new Html5Qrcode("qr-reader")),M=await Html5Qrcode.getCameras();let t;if(M&&M.length>0){const e=M.findIndex(a=>/back|traseira|rear|environment/i.test(a.label));W=e>=0?e:0,t=M[W].id}else t={facingMode:"environment"};await F.start(t,{fps:10,qrbox:{width:240,height:240}},Dt,()=>{}),K=!0,document.getElementById("btn-start-cam").style.display="none",document.getElementById("btn-switch-cam").style.display=M.length>1?"inline-flex":"none",document.getElementById("btn-stop-cam").style.display="inline-flex"}catch(t){A("❌ Não foi possível acessar a câmera. Verifique as permissões do navegador."),console.error(t)}}async function ne(){if(!(!F||!K))try{await F.stop(),M.length>1&&(W=(W+1)%M.length,await F.start(M[W].id,{fps:10,qrbox:{width:240,height:240}},Dt,()=>{}))}catch(t){console.error("switchCam:",t)}}async function pt(){if(F&&K)try{await F.stop()}catch{}K=!1,document.getElementById("btn-start-cam").style.display="inline-flex",document.getElementById("btn-switch-cam").style.display="none",document.getElementById("btn-stop-cam").style.display="none"}async function Dt(t){pt(),document.getElementById("inp-url").value=t,A("✅ QR Code lido! Processando..."),await Rt(t)}document.getElementById("btn-carregar-dados").addEventListener("click",async()=>{const t=document.getElementById("inp-url").value.trim(),e=document.getElementById("inp-html").value.trim();if(!t&&!e){A("⚠️ Cole a URL do QR Code ou o conteúdo da página para ler a nota fiscal.");return}if(t&&!e){A("⏳ Consultando nota fiscal..."),await Rt(t);return}if(e){A("⏳ Processando conteúdo..."),await Ft(e);return}});document.getElementById("btn-preencher-manual").addEventListener("click",()=>{Lt({nomeMercado:"",dataEmissao:new Date().toISOString(),valorTotal:0,descontoTotal:0,valorAPagar:0,qtdTotalItens:0,formasPagamento:{valeAlimentacao:0,cartaoCredito:0,cartaoDebito:0},itens:[]}),A("✍️ Preencha os dados da compra abaixo e clique em Salvar Nota Fiscal.","var(--accent-cyan)")});function Lt(t){var r,s,i;document.getElementById("inp-mercado").value=t.nomeMercado||"",document.getElementById("inp-data").value=jt(t.dataEmissao),document.getElementById("inp-vtotal").value=t.valorTotal!==void 0?t.valorTotal:0,document.getElementById("inp-desconto").value=t.descontoTotal!==void 0?t.descontoTotal:0,document.getElementById("inp-pagar").value=t.valorAPagar!==void 0?t.valorAPagar:0,document.getElementById("inp-qtd").value=t.qtdTotalItens!==void 0?t.qtdTotalItens:0,document.getElementById("inp-alim").value=((r=t.formasPagamento)==null?void 0:r.valeAlimentacao)||0,document.getElementById("inp-cred").value=((s=t.formasPagamento)==null?void 0:s.cartaoCredito)||0,document.getElementById("inp-deb").value=((i=t.formasPagamento)==null?void 0:i.cartaoDebito)||0,q=t.itens||[];const e=document.getElementById("form-nfce");e.style.display="block";const a=document.getElementById("preview-itens-box"),o=document.getElementById("count-preview-itens"),n=document.getElementById("lista-preview-itens");q.length>0?(a.style.display="block",o.textContent=q.length,n.innerHTML=q.map(u=>`
      <div style="display:flex; justify-content:space-between; padding: 0.35rem 0; border-bottom: 1px dashed var(--border-color);">
        <span><strong>${u.nome}</strong> (${u.quantidade} ${u.unidade||"Un"})</span>
        <span>${l(u.valorUnitario)}/un = <strong>${l(u.valorTotal)}</strong></span>
      </div>
    `).join("")):a.style.display="none",e.scrollIntoView({behavior:"smooth"})}document.getElementById("form-nfce").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-mercado").value.trim()||"Mercado",a=document.getElementById("inp-data").value||new Date().toISOString(),o=parseFloat(document.getElementById("inp-vtotal").value)||0,n=parseFloat(document.getElementById("inp-desconto").value)||0,r=parseFloat(document.getElementById("inp-pagar").value)||0,s=parseInt(document.getElementById("inp-qtd").value)||0,i=parseFloat(document.getElementById("inp-alim").value)||0,u=parseFloat(document.getElementById("inp-cred").value)||0,d=parseFloat(document.getElementById("inp-deb").value)||0,c=new Date(a).toISOString().slice(0,16),m=w.find(I=>{const x=new Date(I.dataEmissao).toISOString().slice(0,16),S=Math.abs((I.valorAPagar||0)-r)<.05,T=(I.nomeMercado||"").toLowerCase().trim()===e.toLowerCase().trim();return x===c&&S&&T});if(m){A(`⚠️ Esta nota fiscal já existe no sistema (Cadastrada em ${rt(m.dataEmissao)} no valor de ${l(m.valorAPagar)}). Nota não adicionada!`,"#fb7185"),v("⚠️ Nota fiscal já cadastrada! Operação cancelada.");return}const f=new Date(a),y=`${f.getFullYear()}-${String(f.getMonth()+1).padStart(2,"0")}`;A("⏳ Salvando nota fiscal no banco...");try{await ct(N(E,mt),{nomeMercado:e,dataEmissao:a,mesAno:y,qtdTotalItens:s||q.length,valorTotal:o,descontoTotal:n,valorAPagar:r,formasPagamento:{valeAlimentacao:i,cartaoCredito:u,cartaoDebito:d},itens:q,createdAt:bt()}),A("✅ Nota salva com sucesso!","#34d399"),document.getElementById("form-nfce").style.display="none",document.getElementById("form-nfce").reset(),document.getElementById("inp-url").value="",document.getElementById("inp-html").value="",q=[],xt(),goTab("dashboard"),v("🎉 Nota fiscal registrada no Firebase!")}catch(I){A("❌ Erro ao salvar: "+I.message,"#fb7185")}});async function Rt(t){const e=[a=>`https://api.allorigins.win/raw?url=${encodeURIComponent(a)}`,a=>`https://corsproxy.io/?${encodeURIComponent(a)}`];for(const a of e)try{const o=await fetch(a(t),{signal:AbortSignal.timeout(8e3)});if(o.ok){const n=await o.text();if(n&&n.length>200){await Ft(n);return}}}catch{}se(t)}function se(t){document.getElementById("modal-link").href=t,document.getElementById("modal-cors").classList.add("active"),A("⚠️ Abra o link, copie o conteúdo da página e cole no campo de texto abaixo.")}async function Ft(t){const e=re(t);Lt(e),A("✅ Nota lida com sucesso! Confira os valores abaixo e altere se necessário antes de Salvar.","#34d399")}function re(t){var V,j,O;const a=new DOMParser().parseFromString(t,"text/html"),o=((V=a.body)==null?void 0:V.textContent)||t;let n=((O=(j=a.querySelector(".txtTopo, .nomeEmit, h1"))==null?void 0:j.textContent)==null?void 0:O.trim())||"Mercado",r=new Date().toISOString();const s=o.match(/Emiss[ãa]o\s*[:\-]?\s*(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})?/i)||o.match(/(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})/);if(s){const[L,p,g]=s[1].split("/");r=`${g}-${p}-${L}T${s[2]||"12:00:00"}`}const i=o.match(/Qtd\.?\s*total\s*de\s*itens\s*[:\s]*([\d,\.]+)/i),u=o.match(/Valor\s*total\s*R\$\s*[:\s]*([\d\.,]+)/i),d=o.match(/Descontos?\s*R\$\s*[:\s]*([\d\.,]+)/i),c=o.match(/Valor\s*a\s*pagar\s*R\$\s*[:\s]*([\d\.,]+)/i)||o.match(/VALOR\s*PAGO\s*R\$\s*[:\s]*([\d\.,]+)/i),m=o.match(/(?:Vale\s*)?Alimenta[çc][ãa]o\s*[:\s]*([\d\.,]+)/i),f=o.match(/(?:Cart[ãa]o\s*de\s*)?Cr[eé]dito\s*[:\s]*([\d\.,]+)/i),y=o.match(/(?:Cart[ãa]o\s*de\s*)?D[eé]bito\s*[:\s]*([\d\.,]+)/i),I=i?$(i[1]):0,x=u?$(u[1]):0,S=d?$(d[1]):0;let T=c?$(c[1]):x-S;const G={valeAlimentacao:m?$(m[1]):0,cartaoCredito:f?$(f[1]):0,cartaoDebito:y?$(y[1]):0},Q=[];a.querySelectorAll("tr, .item, .itemNota").forEach(L=>{var vt;const p=L.textContent;if(!/Vl\.\s*Unit|valorUnitario|Qtde?\./i.test(p))return;const g=L.querySelector(".txtTit, .txtTit2, .nomeProd"),h=((vt=g==null?void 0:g.textContent)==null?void 0:vt.trim())||"",z=p.match(/Qtde?\.\s*[:\s]*([\d,\.]+)/i),ot=p.match(/Vl\.\s*Unit\.\s*[:\s]*([\d,\.]+)/i),C=p.match(/Vl\.\s*Total\s*([\d,\.]+)/i),Z=p.match(/C[oó]digo\s*[:\s]*(\d+)/i),_=p.match(/UN\s*[:\s]*([A-Za-z]+)/i),nt=z?$(z[1]):1,it=ot?$(ot[1]):0,Ot=C?$(C[1]):it*nt;h&&it>0&&Q.push({codigo:(Z==null?void 0:Z[1])||"",nome:h,marca:ie(h),quantidade:nt,unidade:(_==null?void 0:_[1])||"Un",valorUnitario:it,valorTotal:Ot})});const k=new Date(r),D=`${k.getFullYear()}-${String(k.getMonth()+1).padStart(2,"0")}`;return{nomeMercado:n,dataEmissao:r,mesAno:D,qtdTotalItens:I,valorTotal:x,descontoTotal:S,valorAPagar:T,formasPagamento:G,itens:Q}}function ie(t){const e=["BAUDUCCO","BAUD","PANCO","DANONE","NESTLE","QUALITA","SADIA","PERDIGAO","SEARA","CAMIL","TIO JOAO","URBANO","LIZA","SOYA","YPE","PILAO","MELITTA","3 CORACOES","VIGOR","PARMALAT","ITALAC","HEINZ","KRAFT"],a=t.toUpperCase();for(const o of e)if(a.includes(o))return o;return a.split(" ")[0]||"Genérica"}function de(){const t=document.getElementById("lista-historico");if(!w.length){t.innerHTML='<div class="empty-state">📭 Nenhuma compra cadastrada ainda.</div>';return}t.innerHTML=w.map(e=>{var a,o,n;return`
    <div class="purchase-card">
      <div class="purchase-header" onclick="toggleDetail('${e.id}')">
        <div class="purchase-info">
          <h3>${e.nomeMercado||"Mercado"}</h3>
          <p>📅 ${rt(e.dataEmissao)} &nbsp;•&nbsp; 🛒 ${e.qtdTotalItens||0} itens</p>
        </div>
        <div class="purchase-values">
          <div class="pv-total">${l(e.valorAPagar)}</div>
          <div class="pv-sub">Desc: ${l(e.descontoTotal)}</div>
        </div>
        <svg class="chevron" id="chev-${e.id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      <div class="purchase-details" id="detail-${e.id}">
        <div class="details-toolbar">
          <span class="card-subtext">Pagamentos: Alimentação ${l((a=e.formasPagamento)==null?void 0:a.valeAlimentacao)} · Crédito ${l((o=e.formasPagamento)==null?void 0:o.cartaoCredito)} · Débito ${l((n=e.formasPagamento)==null?void 0:n.cartaoDebito)}</span>
          <button class="btn-danger" onclick="confirmarExcluirMercado('${e.id}')">🗑️ Excluir</button>
        </div>
        ${le(e)}
      </div>
    </div>`}).join("")}function le(t){return!t.itens||!t.itens.length?'<p class="card-subtext">Nenhum item detalhado registrado.</p>':`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Item</th><th>Marca</th><th class="num">Qtd</th><th class="num">Vl. Unit.</th><th class="num">Vl. Total</th></tr></thead>
    <tbody>${t.itens.map(e=>`<tr>
      <td>${e.nome}</td>
      <td><span class="badge amber">${e.marca||"—"}</span></td>
      <td class="num">${e.quantidade} ${e.unidade||"Un"}</td>
      <td class="num">${l(e.valorUnitario)}</td>
      <td class="num"><strong>${l(e.valorTotal)}</strong></td>
    </tr>`).join("")}</tbody>
  </table></div>`}window.toggleDetail=function(t){const e=document.getElementById("detail-"+t),a=document.getElementById("chev-"+t);e&&e.classList.toggle("open"),a&&a.classList.toggle("open")};window.confirmarExcluirMercado=async function(t){if(confirm("Excluir esta compra de mercado?"))try{await H(B(E,mt,t)),v("🗑️ Compra excluída.")}catch(e){alert("Erro: "+e.message)}};function ce(){const t=document.getElementById("lista-comparacao"),e={};w.forEach(o=>{(o.itens||[]).forEach(n=>{var s;const r=((s=n.nome)==null?void 0:s.toLowerCase().trim())||"produto";e[r]||(e[r]={nome:n.nome,marca:n.marca,hist:{}}),e[r].hist[o.mesAno]=n.valorUnitario})});const a=Object.values(e);if(!a.length){t.innerHTML='<div class="empty-state">Adicione notas para ver a comparação de preços unitários.</div>';return}t.innerHTML=`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Produto</th><th>Marca</th><th>Histórico (Unitário)</th><th>Variação</th></tr></thead>
    <tbody>${a.map(o=>{const n=Object.keys(o.hist).sort();let r=n.map(i=>`${i}: <strong>${l(o.hist[i])}</strong>`).join(" → "),s='<span class="badge cyan">Estável</span>';if(n.length>=2){const i=o.hist[n[n.length-2]],d=o.hist[n[n.length-1]]-i,c=(d/i*100).toFixed(1);d>.01?s=`<span class="badge red">+${c}% ↑</span>`:d<-.01&&(s=`<span class="badge green">${c}% ↓</span>`)}return`<tr><td><strong>${o.nome}</strong></td><td><span class="badge amber">${o.marca||"—"}</span></td><td>${r}</td><td>${s}</td></tr>`}).join("")}</tbody>
  </table></div>`}function me(){const t=document.getElementById("lista-recorrencia"),e=document.getElementById("lista-marcas"),a={},o={};w.forEach(s=>{(s.itens||[]).forEach(i=>{var m;const u=(m=i.nome)==null?void 0:m.toLowerCase().trim();if(!u)return;a[u]||(a[u]={nome:i.nome,marca:i.marca,qtd:0,notas:0,units:[]}),a[u].qtd+=i.quantidade||1,a[u].notas+=1,a[u].units.push(i.valorUnitario||0);const d=(i.nome||"").split(" ")[0].toUpperCase();o[d]||(o[d]={});const c=i.marca||"Genérica";o[d][c]||(o[d][c]=[]),o[d][c].push(i.valorUnitario||0)})});const n=Object.values(a).filter(s=>s.notas>1).sort((s,i)=>i.notas-s.notas);t.innerHTML=n.length?`<div class="table-responsive"><table class="custom-table">
        <thead><tr><th>Item</th><th>Marca</th><th>Compras</th><th class="num">Qtd Total</th><th class="num">Média Unitária</th></tr></thead>
        <tbody>${n.map(s=>{const i=s.units.reduce((u,d)=>u+d,0)/s.units.length;return`<tr>
            <td><strong>${s.nome}</strong></td>
            <td><span class="badge amber">${s.marca||"—"}</span></td>
            <td><span class="badge green">${s.notas}x</span></td>
            <td class="num">${s.qtd}</td>
            <td class="num">${l(i)}</td>
          </tr>`}).join("")}</tbody>
      </table></div>`:'<div class="empty-state">Adicione notas para ver a recorrência de itens.</div>';const r=Object.entries(o).filter(([,s])=>Object.keys(s).length>1).map(([s,i])=>{let u=1/0,d="";const c=Object.entries(i).map(([m,f])=>{const y=f.reduce((I,x)=>I+x,0)/f.length;return y<u&&(u=y,d=m),{marca:m,med:y}});return`<div class="brand-card">
      <div class="brand-card-header">
        <span class="card-title">${s}</span>
        <span class="badge green">🏆 Menor preço: ${d} (${l(u)}/un)</span>
      </div>
      <div class="brands-row">
        ${c.map(m=>`<div class="brand-chip${m.marca===d?" best":""}">
          <div class="bc-name">${m.marca} ${m.marca===d?"✅":""}</div>
          <div class="bc-val">${l(m.med)}<span style="font-size:.7rem;font-weight:400">/un</span></div>
        </div>`).join("")}
      </div>
    </div>`}).join("");e.innerHTML=r||'<div class="empty-state">Ao comprar o mesmo tipo de produto com marcas diferentes, o sistema mostrará qual teve menor preço.</div>'}document.getElementById("btn-modal-close").addEventListener("click",()=>{document.getElementById("modal-cors").classList.remove("active")});
