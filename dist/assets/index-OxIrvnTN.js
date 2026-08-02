import{initializeApp as Dt}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";import{getFirestore as St,onSnapshot as X,query as Lt,collection as Z,orderBy as Bt,doc as M,setDoc as tt,addDoc as gt,deleteDoc as et,serverTimestamp as Ft}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function a(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(s){if(s.ep)return;s.ep=!0;const r=a(s);fetch(s.href,r)}})();const vt=document.createElement("script");vt.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js";document.head.appendChild(vt);const ft=document.createElement("script");ft.src="https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js";document.head.appendChild(ft);const Rt={apiKey:"AIzaSyANpFnEIkyN1XCT6qbtmVR9wx7sQHEsyrE",authDomain:"comprasmercado-23913.firebaseapp.com",projectId:"comprasmercado-23913",storageBucket:"comprasmercado-23913.firebasestorage.app",messagingSenderId:"317518149234",appId:"1:317518149234:web:94f38624d68a2b9a6634eb",measurementId:"G-2XP88EK37S"},Ot=Dt(Rt),I=St(Ot),rt="compras",_="entradas",K="faturas",ht="reservas";let x=[],B=[],P=[],st={metaMensal:0,valorAtualGuardado:0},nt=null,F=null,T=[],Q=0,Y=!1,O=[];function c(t){return Number(t||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}function E(t){if(typeof t=="number")return t;if(!t)return 0;const e=parseFloat(String(t).replace(/R\$\s?/gi,"").replace(/\s/g,"").replace(/\./g,"").replace(",","."));return isNaN(e)?0:e}function it(t){if(!t)return"—";try{return new Date(t).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}catch{return t}}function v(t,e=3500){const a=document.getElementById("toast");a.textContent=t,a.classList.add("show"),setTimeout(()=>a.classList.remove("show"),e)}function A(t,e="var(--accent-amber)"){const a=document.getElementById("status-msg");a&&(a.textContent=t,a.style.color=e)}function Pt(t){if(!t)return new Date().toISOString().slice(0,16);try{const e=new Date(t);if(isNaN(e.getTime()))return new Date().toISOString().slice(0,16);const a=o=>String(o).padStart(2,"0");return`${e.getFullYear()}-${a(e.getMonth()+1)}-${a(e.getDate())}T${a(e.getHours())}:${a(e.getMinutes())}`}catch{return new Date().toISOString().slice(0,16)}}function qt(t,e){let a=0;const o=new Date(t,e+1,0).getDate();for(let s=1;s<=o;s++){const r=new Date(t,e,s).getDay();r!==0&&r!==6&&a++}return a}window.goTab=function(t){document.querySelectorAll(".tab-content").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".desktop-nav .nav-item").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".mobile-nav .mob-btn").forEach(a=>a.classList.remove("active"));const e=document.getElementById("tab-"+t);e&&e.classList.add("active"),document.querySelectorAll(`[data-tab="${t}"]`).forEach(a=>a.classList.add("active"))};document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>goTab(t.getAttribute("data-tab")))});document.querySelectorAll(".sub-item").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".sub-item").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".sub-tab-content").forEach(a=>a.style.display="none"),t.classList.add("active");const e=document.getElementById("sub-"+t.getAttribute("data-sub"));e&&(e.style.display="block")})});function bt(){document.getElementById("modal-add-nota").classList.add("active")}function yt(){Y&&ct(),document.getElementById("modal-add-nota").classList.remove("active")}var mt;(mt=document.getElementById("btn-open-modal-home"))==null||mt.addEventListener("click",bt);var ut;(ut=document.getElementById("btn-mercado-add-nota"))==null||ut.addEventListener("click",bt);var pt;(pt=document.getElementById("btn-close-modal-add"))==null||pt.addEventListener("click",yt);X(Lt(Z(I,rt),Bt("dataEmissao","desc")),t=>{x=t.docs.map(e=>({id:e.id,...e.data()})),at()},t=>console.error("Firestore Mercado:",t));X(Z(I,_),t=>{B=t.docs.map(e=>({id:e.id,...e.data()})),at()},t=>console.error("Firestore Entradas:",t));X(Z(I,K),t=>{P=t.docs.map(e=>({id:e.id,...e.data()})),at()},t=>console.error("Firestore Faturas:",t));X(M(I,ht,"config"),t=>{t.exists()&&(st=t.data()),at()},t=>console.error("Firestore Reservas:",t));function at(){Ut(),Nt(),Gt(),Zt(),Xt(),ee(),ae(),Yt()}function Ut(){let t=B.reduce((i,u)=>i+(u.valor||0),0),e=P.reduce((i,u)=>i+(u.valorTotal!==void 0?u.valorTotal:u.valor||0),0),a=0,o=0,s=0,r=0,n=0;const d={};x.forEach(i=>{const u=i.valorAPagar||0;r+=i.descontoTotal||0,n+=i.qtdTotalItens||0,i.formasPagamento&&(o+=i.formasPagamento.valeAlimentacao||0,s+=i.formasPagamento.cartaoCredito||0,a+=i.formasPagamento.cartaoDebito||0);const p=i.mesAno||"Outros";d[p]=(d[p]||0)+u});let l=t-e-a;document.getElementById("fin-total-entradas").textContent=c(t),document.getElementById("fin-total-cartoes").textContent=c(e),document.getElementById("fin-mercado-debito").textContent=c(a),document.getElementById("fin-saldo-liquido").textContent=c(l),document.getElementById("dash-alimentacao").textContent=c(o),document.getElementById("dash-credito").textContent=c(s),document.getElementById("dash-debito").textContent=c(a),Et(d)}function Et(t){var r;if(typeof Chart>"u")return setTimeout(()=>Et(t),300);const e=(r=document.getElementById("chart-barras"))==null?void 0:r.getContext("2d");if(!e)return;const a=Object.keys(t).sort(),o=a.map(n=>{const[d,l]=n.split("-");return`${l}/${d}`}),s=a.map(n=>t[n]);nt&&nt.destroy(),nt=new Chart(e,{type:"bar",data:{labels:o.length?o:["Sem compras"],datasets:[{label:"Gasto Mercado R$",data:s.length?s:[0],backgroundColor:"rgba(16,185,129,0.78)",borderColor:"#10b981",borderWidth:2,borderRadius:8}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:n=>` ${c(n.raw)}`}}},scales:{y:{beginAtZero:!0,grid:{color:"rgba(255,255,255,.05)"},ticks:{color:"#94a3b8",callback:n=>"R$"+n}},x:{grid:{display:!1},ticks:{color:"#94a3b8"}}}}})}function It(t){if(!t)return 0;const e=t.match(/L[íi]quido(?:\s*a\s*receber)?\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/TOTAL\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/SAL[ÁA]RIO\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/VALOR\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i);return e?E(e[1]):0}document.getElementById("form-holerite-victor").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-holerite-txt-victor").value;let a=parseFloat(document.getElementById("inp-salario-val-victor").value)||0;if(!a&&e&&(a=It(e)),!a){v("⚠️ Digite ou cole um holerite válido com valor.");return}await tt(M(I,_,"salario_victor"),{pessoa:"Victor",tipo:"holerite",descricao:"Salário Líquido Victor",valor:a,data:new Date().toISOString()}),v("✅ Salário do Victor salvo!")});document.getElementById("form-holerite-maria").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-holerite-txt-maria").value;let a=parseFloat(document.getElementById("inp-salario-val-maria").value)||0;if(!a&&e&&(a=It(e)),!a){v("⚠️ Digite ou cole um holerite válido com valor.");return}await tt(M(I,_,"salario_maria"),{pessoa:"Maria",tipo:"holerite",descricao:"Salário Líquido Maria",valor:a,data:new Date().toISOString()}),v("✅ Salário da Maria salvo!")});document.getElementById("form-entrada-manual").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-ent-desc").value.trim(),a=parseFloat(document.getElementById("inp-ent-val").value)||0,o=document.getElementById("inp-ent-pessoa").value;!e||!a||(await gt(Z(I,_),{pessoa:o,tipo:"manual",descricao:e,valor:a,data:new Date().toISOString()}),t.target.reset(),v("🎉 Entrada manual registrada!"))});function Nt(){var s,r;const t=((s=B.find(n=>n.id==="salario_victor"))==null?void 0:s.valor)||0,e=((r=B.find(n=>n.id==="salario_maria"))==null?void 0:r.valor)||0,a=B.reduce((n,d)=>n+(d.valor||0),0);document.getElementById("val-salario-victor").textContent=c(t),document.getElementById("val-salario-maria").textContent=c(e),document.getElementById("val-entradas-combinado").textContent=c(a);const o=document.getElementById("lista-entradas-registradas");if(!B.length){o.innerHTML='<div class="empty-state">Nenhuma entrada cadastrada ainda.</div>';return}o.innerHTML=`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Descrição</th><th>Pessoa</th><th>Tipo</th><th class="num">Valor</th><th>Ação</th></tr></thead>
    <tbody>${B.map(n=>`<tr>
      <td><strong>${n.descricao}</strong></td>
      <td><span class="badge ${n.pessoa==="Victor"?"green":n.pessoa==="Maria"?"purple":"cyan"}">${n.pessoa}</span></td>
      <td><span class="badge amber">${n.tipo==="holerite"?"Holerite":"Manual"}</span></td>
      <td class="num" style="color:#34d399"><strong>${c(n.valor)}</strong></td>
      <td><button class="btn-danger" onclick="excluirEntrada('${n.id}')">🗑️</button></td>
    </tr>`).join("")}</tbody>
  </table></div>`}window.excluirEntrada=async function(t){confirm("Excluir esta entrada?")&&(await et(M(I,_,t)),v("🗑️ Entrada removida."))};let dt="Nubank";function kt(){const t=document.getElementById("inp-fatura-vencimento");if(t&&!t.value){const e=new Date,a=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0");t.value=`${a}-${o}-10`,atualizarMesRefFatura()}}setTimeout(kt,300);window.atualizarMesRefFatura=function(){const t=document.getElementById("inp-fatura-vencimento"),e=document.getElementById("lbl-fatura-mes-ref");if(!(!t||!e))if(t.value){const[a,o]=t.value.split("-"),r=new Date(parseInt(a),parseInt(o)-1,1).toLocaleString("pt-BR",{month:"long"});e.textContent=`Fatura ${r.charAt(0).toUpperCase()+r.slice(1)}/${a}`}else e.textContent="Mês da Fatura"};window.selecionarCartaoFatura=function(t){dt=t,document.querySelectorAll(".btn-card-select").forEach(a=>a.classList.remove("active"));const e=document.querySelector(`.btn-card-select[data-card="${t}"]`);e&&e.classList.add("active"),v(`Cartão selecionado: ${t}`)};window.handleFileFaturaSelect=async function(t){const e=t.target.files[0];if(!e)return;const a=document.getElementById("txt-file-fatura");a&&(a.textContent=`📄 Arquivo: ${e.name}`),v(`⏳ Lendo arquivo da fatura (${e.name})...`);let o="";if(e.type==="application/pdf"||e.name.endsWith(".pdf"))o=await jt(e);else try{o=await e.text()}catch{o=""}o?(document.getElementById("inp-fatura-txt").value=o,await $t(o,dt)):v("❌ Não foi possível ler o texto do arquivo da fatura.")};async function jt(t){try{const e=await t.arrayBuffer();if(typeof pdfjsLib>"u")return v("⚠️ Aguarde a biblioteca de PDF carregar..."),"";pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";let a=pdfjsLib.getDocument({data:e});a.onPassword=(r,n)=>{let d=prompt(`🔒 Este PDF de fatura está protegido por senha.
Digite a senha para abrir (ex: CPF ou Data de Nascimento):`);d?r(d):v("⚠️ Senha não informada. Leitura do PDF cancelada.")};const o=await a.promise;let s="";for(let r=1;r<=o.numPages;r++){const d=await(await o.getPage(r)).getTextContent();let l=null,i="";for(const u of d.items){if(!u.str)continue;const p=u.transform?u.transform[5]:null;l!==null&&Math.abs(p-l)>3?i+=`
`:i.length>0&&!i.endsWith(`
`)&&!i.endsWith(" ")&&(i+=" "),i+=u.str,l=p}s+=i+`
`}return s}catch(e){return e.name==="PasswordException"?v("🔒 O PDF precisa de senha válida para ser aberto."):console.error("Erro ao ler PDF:",e),""}}function Vt(t){if(!t)return null;const e=t.match(/Total\s*a\s*Pagar\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/no\s*valor\s*de\s*R?\$\s*([\d\.,]+)/i)||t.match(/Valor\s*total\s*da\s*fatura\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/Total\s*da\s*fatura\s*[:\s]*R?\$\s*([\d\.,]+)/i);if(e){const a=E(e[1]);if(a>0)return a}return null}function zt(t){if(!t)return null;const e=t.match(/Vencimento\s*[:\s]*(\d{2}[\/\.-]\d{2}[\/\.-]\d{4})/i)||t.match(/Data\s*de\s*vencimento\s*[:\s]*(\d{2})\s+([A-Za-z]{3})\s+(\d{4})/i)||t.match(/FATURA\s+(\d{2})\s+([A-Za-z]{3})\s+(\d{4})/i);if(e){if(e[2]&&e[3]){const a=e[1],o=e[2].toUpperCase(),s=e[3],n={JAN:"01",FEB:"02",MAR:"03",ABR:"04",APR:"04",MAI:"05",MAY:"05",JUN:"06",JUL:"07",AGO:"08",AUG:"08",SET:"09",SEP:"09",OUT:"10",OCT:"10",NOV:"11",DEZ:"12",DEC:"12"}[o]||"07";return`${s}-${n}-${a.padStart(2,"0")}`}else if(e[1]){const[a,o,s]=e[1].split(/[\/\.-]/);return`${s}-${o.padStart(2,"0")}-${a.padStart(2,"0")}`}}return null}window.importarFaturaManualOuArquivo=async function(){const t=document.getElementById("inp-fatura-txt").value.trim();if(!t){v("⚠️ Selecione o arquivo da fatura (.pdf, .csv) ou cole o texto da fatura.");return}await $t(t,dt)};async function $t(t,e){const a=zt(t);a&&(document.getElementById("inp-fatura-vencimento").value=a,atualizarMesRefFatura());const o=Vt(t),s=Ht(t);if(!s.length&&!o){v(`⚠️ Nenhuma compra individual identificada na fatura do ${e}.`);return}const r=document.getElementById("inp-fatura-vencimento").value||new Date().toISOString().slice(0,10),n=r.slice(0,7),d=s.reduce((i,u)=>i+u.valor,0),l=o||d;s.length,renderizarRevisaoFaturaUI(),v(`✅ ${s.length} compras encontradas! Fatura total: ${c(l)}.`)}function Ht(t){if(!t)return[];const e=[],a=/(?:[@\)\(\*•\s]+)?(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+(?:(\d{2}\/\d{2})\s+)?(-?R?\$\s*[\d\.]+,\d{2}|-?[\d\.]+,\d{2})/gi;if(t.split(`
`).forEach(s=>{const r=s.trim();if(!r||/EMISS[ÃA]O|TRANSA[ÇC][ÕO]ES|RESUMO|PAGAMENTO DE FATURA|TOTAL DA FATURA|FATURA ANTERIOR|SALDO ANTERIOR|LIMITE DISPON[ÍI]VEL|OPÇÕES DE PAGAMENTO|ALTERNATIVAS DE PAGAMENTO|PAGAMENTO E DEMAIS|PARCELAMENTOS|DESPESAS|HISTÓRICO DE FATURAS|SUPERCRÉDITO|SAQUE À CRÉDITO|COMPRA DATA DESCRIÇÃO/i.test(r))return;const n=/(?:[@\)\(\*•\s]+)?(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+(?:(\d{2}\/\d{2})\s+)?(-?R?\$\s*[\d\.]+,\d{2}|-?[\d\.]+,\d{2})$/i,d=r.match(n)||r.match(/(?:[@\)\(\*•\s]+)?(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+(?:(\d{2}\/\d{2})\s+)?(-?R?\$\s*[\d\.]+,\d{2}|-?[\d\.]+,\d{2})/i);if(d){const l=d[1];let i=d[2].trim();const u=d[3],p=d[4];if(p.includes("-")||/DEB AUTOM|PAGAMENTO|PAGTO|CR[ÉE]DITO FATURA/i.test(i))return;const b=E(p);u&&(i+=` (${u})`),i&&b>0&&i.length>2&&!/fatura|limite|pagamento|saldo|alternativas|opções|período|emissão|vencimento/i.test(i)&&e.push({dataCompra:l,descricao:i,valor:b})}}),e.length===0){let s;for(;(s=a.exec(t))!==null;){const r=s[1];let n=s[2].trim();const d=s[3],l=s[4];if(l.includes("-")||/DEB AUTOM|PAGAMENTO|PAGTO|CR[ÉE]DITO FATURA/i.test(n))continue;const i=E(l);d&&(n+=` (${d})`),n&&i>0&&n.length>2&&!/fatura|limite|pagamento|saldo|alternativas|opções|período|emissão|vencimento/i.test(n)&&e.push({dataCompra:r,descricao:n,valor:i})}}return e}function Gt(){const t=P.reduce((a,o)=>a+(o.valorTotal!==void 0?o.valorTotal:o.valor||0),0);document.getElementById("badge-total-cartoes").textContent=`${c(t)} total`;const e=document.getElementById("lista-faturas-registradas");if(!P.length){e.innerHTML='<div class="empty-state">Nenhuma fatura cadastrada ainda.</div>';return}e.innerHTML=P.map(a=>{var u;const o=a.valorTotal!==void 0?a.valorTotal:a.valor||0,s=a.cartao||"Cartão",r=s.toLowerCase().includes("nubank"),n=r?"purple":"red",d=r?"🟣":"🔴",l=a.dataVencimento?it(a.dataVencimento).split(",")[0]:"—",i=a.mesAno||"—";return`
      <div class="purchase-card">
        <div class="purchase-header" onclick="toggleDetail('fat-${a.id}')">
          <div class="purchase-info">
            <h3><span class="badge ${n}">${d} ${s}</span> — Vencimento: ${l}</h3>
            <p>📅 Mês Referência: <strong>${i}</strong> &nbsp;•&nbsp; 🛒 ${a.qtdItens||((u=a.itens)==null?void 0:u.length)||1} itens contemplados</p>
          </div>
          <div class="purchase-values">
            <div class="pv-total" style="color:#fb7185">${c(o)}</div>
            <div class="pv-sub">Fatura do Mês</div>
          </div>
          <svg class="chevron" id="chev-fat-${a.id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="purchase-details" id="detail-fat-${a.id}">
          <div class="details-toolbar">
            <span class="card-subtext">Detalhamento dos Lançamentos da Fatura</span>
            <button class="btn-danger" onclick="excluirFaturaDocumento('${a.id}')">🗑️ Excluir Fatura</button>
          </div>
          ${Qt(a)}
        </div>
      </div>
    `}).join("")}function Qt(t){return t.itens&&t.itens.length>0?`<div class="table-responsive"><table class="custom-table">
      <thead><tr><th>Data Compra</th><th>Descrição do Lançamento</th><th class="num">Valor</th><th>Ação</th></tr></thead>
      <tbody>${t.itens.map((e,a)=>`<tr>
        <td><strong>${e.dataCompra||"—"}</strong></td>
        <td>${e.descricao}</td>
        <td class="num" style="color:#fb7185"><strong>${c(e.valor)}</strong></td>
        <td><button class="btn-danger" style="padding:.2rem .5rem; font-size:.78rem;" onclick="removerItemFaturaCadastrada('${t.id}', ${a})">🗑️ Excluir</button></td>
      </tr>`).join("")}</tbody>
    </table></div>`:`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Descrição</th><th class="num">Valor</th><th>Ação</th></tr></thead>
    <tbody><tr>
      <td>${t.descricao||"Fatura do Cartão"}</td>
      <td class="num" style="color:#fb7185"><strong>${c(t.valor||t.valorTotal)}</strong></td>
      <td><button class="btn-danger" style="padding:.2rem .5rem; font-size:.78rem;" onclick="excluirFaturaDocumento('${t.id}')">🗑️ Excluir</button></td>
    </tr></tbody>
  </table></div>`}window.removerItemFaturaCadastrada=async function(t,e){const a=P.find(r=>r.id===t);if(!a||!a.itens||!confirm("Remover este item da fatura?"))return;const o=[...a.itens];o.splice(e,1);const s=o.reduce((r,n)=>r+(n.valor||0),0);o.length===0?(await et(M(I,K,t)),v("🗑️ Fatura excluída pois todos os itens foram removidos.")):(await tt(M(I,K,t),{...a,itens:o,valorTotal:s,qtdItens:o.length}),v("🗑️ Item removido da fatura."))};window.excluirFaturaDocumento=async function(t){confirm("Excluir esta fatura e todos os seus lançamentos?")&&(await et(M(I,K,t)),v("🗑️ Fatura removida com sucesso."))};document.getElementById("form-config-reservas").addEventListener("submit",async t=>{t.preventDefault();const e=parseFloat(document.getElementById("inp-meta-mensal").value)||0,a=parseFloat(document.getElementById("inp-saldo-guardado").value)||0;await tt(M(I,ht,"config"),{metaMensal:e,valorAtualGuardado:a,dataAtualizacao:new Date().toISOString()}),v("✅ Reservas e economias atualizadas!")});function Yt(){const t=st.metaMensal||0,e=st.valorAtualGuardado||0;document.getElementById("val-meta-reserva").textContent=c(t),document.getElementById("val-real-guardado").textContent=c(e);const a=B.reduce((i,u)=>i+(u.valor||0),0),o=P.reduce((i,u)=>i+(u.valorTotal!==void 0?u.valorTotal:u.valor||0),0);let s=0;x.forEach(i=>{i.formasPagamento&&(s+=i.formasPagamento.cartaoDebito||0)});const r=a-o-s,n=r>0?Math.max(r*.5,a*.2):0;document.getElementById("val-recomendacao-reserva").textContent=c(n);const d=document.getElementById("box-analise-reserva-detalhes");if(a===0){d.innerHTML='<p class="empty-state">Cadastre seus salários e entradas na aba "Salários & Entradas" para gerar o diagnóstico inteligente de economias.</p>';return}const l=t>0?Math.min(100,e/t*100).toFixed(1):0;d.innerHTML=`
    <p> Com base nos seus <strong>${c(a)}</strong> de Entradas, <strong>${c(o)}</strong> de Faturas de Cartão e <strong>${c(s)}</strong> de Mercado no Débito:</p>
    <div style="background:rgba(15,23,42,0.6);padding:1rem;border-radius:10px;margin:.75rem 0;border:1px solid var(--border-color)">
      <div style="display:flex;justify-content:space-between;margin-bottom:.4rem">
        <span>💰 Saldo Livre em Conta: <strong>${c(r)}</strong></span>
        <span>💡 Recomendação de Reserva: <strong style="color:#c084fc">${c(n)}/mês</strong></span>
      </div>
      <div class="progress-bar-bg">
        <div class="progress-bar-fill" style="width:${l}%"></div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:.78rem;color:var(--text-muted);margin-top:.4rem">
        <span>Guardado: ${c(e)}</span>
        <span>Meta Pessoal: ${c(t)} (${l}%)</span>
      </div>
    </div>
    <p style="font-size:.84rem;color:var(--text-muted)">
      💡 <strong>Dica de Inteligência Financeira:</strong> Como o Vale Alimentação e o Crédito no Mercado não saem do seu salário em conta, eles protegem sua renda real! O sistema recomenda destinar pelo menos 50% do seu saldo livre líquido (<strong>${c(n)}</strong>) para sua reserva de emergência e investimentos.
    </p>
  `}function Zt(){const t=document.getElementById("lista-mensal-container");if(!t)return;const e=new Date,a=new Date(e.getFullYear(),e.getMonth()+1,1),o=a.toLocaleString("pt-BR",{month:"long"}),s=a.getFullYear(),r=`${o.charAt(0).toUpperCase()+o.slice(1)} de ${s}`,n=qt(a.getFullYear(),a.getMonth()),d=31.8,l=20,i=n*d,u=n*l,p={};let b=0;x.forEach(m=>{const g=m.valorAPagar||0;b+=g;const f=m.mesAno||"Outros";p[f]=(p[f]||0)+g});const y=Math.max(1,Object.keys(p).length),h=b/y,$={};x.forEach(m=>{(m.itens||[]).forEach(g=>{const f=(g.nome||"").toLowerCase().trim();f&&($[f]||($[f]={nome:g.nome,marca:g.marca||"Geral",qtdTotal:0,frequenciaNotas:0,valoresUnitarios:[]}),$[f].qtdTotal+=g.quantidade||1,$[f].frequenciaNotas+=1,g.valorUnitario&&$[f].valoresUnitarios.push(g.valorUnitario))})});const D=Object.values($).map(m=>{const g=m.valoresUnitarios.length>0?m.valoresUnitarios.reduce((G,J)=>G+J,0)/m.valoresUnitarios.length:0,f=m.qtdTotal/y,k=y/Math.max(1,m.frequenciaNotas),W=m.frequenciaNotas/y;let C=0;W>=.35||f>=.7?C=Math.ceil(f):C=Math.round(f),C<1&&m.frequenciaNotas>=y&&(C=1);const H=C*g;return{nome:m.nome,marca:m.marca,frequenciaNotas:m.frequenciaNotas,intervaloMeses:k,qtdMensalTaxa:f,totalEstimadoUnidades:C,valorUnitario:g,subtotalCalculado:H}}).filter(m=>m.totalEstimadoUnidades>0);D.sort((m,g)=>g.frequenciaNotas-m.frequenciaNotas);const w=D.reduce((m,g)=>m+g.subtotalCalculado,0),j=h>0?h*1.05:w;let V=1;w>j&&h>0&&(V=j/w);const z=D.map(m=>({...m,subtotalFinal:m.subtotalCalculado*V})),q=h>0?Math.min(w,j):w;let S=q;const U=Math.min(S,i);S-=U;const N=Math.min(S,u);S-=N;const R=S>0?S:0;let L=`
    <div class="card" style="margin-bottom:1.5rem; background: linear-gradient(135deg, rgba(30,41,59,0.9), rgba(15,23,42,0.95)); border: 1px solid #3b82f6;">
      <div class="card-header">
        <div>
          <span class="card-title" style="color:#60a5fa;">📅 Previsão de Compras — ${r}</span>
          <p class="card-subtext" style="color:#cbd5e1; margin-top:0.25rem;">
            Calculado com unidades inteiras exatas (${n} dias úteis em ${o}).
          </p>
        </div>
        <span class="badge green" style="font-size:0.8rem; padding:0.4rem 0.75rem;">${n} Dias Úteis</span>
      </div>

      <div class="payment-grid" style="margin-top:1rem;">
        <div class="payment-item" style="border-color: rgba(16,185,129,0.4);">
          <div class="p-label">🍽️ Vale Alimentação (${n}d × R$ 31,80)</div>
          <div class="p-val" style="color:#34d399;">${c(U)} <span style="font-size:0.75rem;font-weight:normal;color:var(--text-muted)">/ ${c(i)}</span></div>
        </div>
        <div class="payment-item" style="border-color: rgba(99,102,241,0.4);">
          <div class="p-label">💳 Cartão Crédito (${n}d × R$ 20,00)</div>
          <div class="p-val" style="color:#818cf8;">${c(N)} <span style="font-size:0.75rem;font-weight:normal;color:var(--text-muted)">/ ${c(u)}</span></div>
        </div>
        <div class="payment-item" style="border-color: ${R>0?"rgba(244,63,94,0.5)":"var(--border-color)"};">
          <div class="p-label">💳 Débito Necessário (Excedente)</div>
          <div class="p-val" style="color: ${R>0?"#fb7185":"var(--text-muted)"};">${c(R)}</div>
        </div>
      </div>

      <div style="margin-top:1.25rem; padding-top:1rem; border-top:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
        <div>
          <span style="font-size:0.85rem; color:var(--text-muted);">Total Estimado da Lista de Compras:</span>
          <p style="font-size:0.75rem; color:#60a5fa;">Média Histórica de Gastos: ${c(h)}</p>
        </div>
        <span style="font-size:1.6rem; font-weight:800; color:var(--primary);">${c(q)}</span>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-title">Lista de Itens com Frequência e Total Estimado</span>
        <span class="badge amber">${z.length} itens cadastrados</span>
      </div>
      <p class="card-subtext" style="margin-bottom:1rem;">
        O <strong>Total Estimado</strong> arredonda o consumo médio para cima (unidades inteiras exatas), pois os produtos são comprados por unidade no mercado.
      </p>
  `;window.dadosListaMensalCache={mesAnoStr:r,diasUteis:n,totalGeralEstimado:q,cobertoAlim:U,cobertoCred:N,cobertoDeb:R,alimDisponivel:i,credDisponivel:u,lista:z},z.length===0?L+='<div class="empty-state">Adicione notas fiscais para que o sistema gere automaticamente sua lista mensal de compras.</div></div>':L+=`
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
            ${z.map(m=>{const g=m.intervaloMeses>1.2?`A cada ${m.intervaloMeses.toFixed(1)} meses`:`Todo mês (${m.frequenciaNotas}x)`,f=m.qtdMensalTaxa<1?m.qtdMensalTaxa.toFixed(2):m.qtdMensalTaxa.toFixed(1),k=m.totalEstimadoUnidades.toFixed(1);return`
                <tr>
                  <td><strong>${m.nome}</strong></td>
                  <td><span class="badge amber">${m.marca}</span></td>
                  <td><span class="badge cyan">${g}</span></td>
                  <td class="num">${f} un/mês</td>
                  <td class="num"><span class="badge green" style="font-size:0.82rem;">${k}</span></td>
                  <td class="num">${c(m.valorUnitario)}</td>
                  <td class="num"><strong>${c(m.subtotalFinal)}</strong></td>
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
    </div>`,t.innerHTML=L}window.exportarPDFListaMensal=function(){if(!window.dadosListaMensalCache||!window.dadosListaMensalCache.lista.length){v("⚠️ Nenhuma lista mensal disponível para exportar.");return}const{mesAnoStr:t,diasUteis:e,totalGeralEstimado:a,cobertoAlim:o,cobertoCred:s,cobertoDeb:r,lista:n}=window.dadosListaMensalCache,d=window.open("","_blank","width=900,height=750");if(!d){alert("Permita pop-ups no navegador para gerar o PDF da lista.");return}const l=`
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
          <div class="val">${c(o)}</div>
        </div>
        <div class="res-item">
          <div class="label">💳 Cartão Crédito</div>
          <div class="val">${c(s)}</div>
        </div>
        <div class="res-item">
          <div class="label">💳 Débito (Excedente)</div>
          <div class="val">${c(r)}</div>
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
          ${n.map(i=>`
            <tr>
              <td class="check-col"><div class="chk-box"></div></td>
              <td><strong>${i.nome}</strong></td>
              <td>${i.marca}</td>
              <td class="num"><strong>${i.totalEstimadoUnidades.toFixed(1)} un</strong></td>
              <td class="num">${c(i.valorUnitario)}</td>
              <td class="num"><strong>${c(i.subtotalFinal)}</strong></td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <div class="total-footer">
        <span>Total Estimado da Compra:</span>
        <span style="font-size:18px; color:#059669;">${c(a)}</span>
      </div>

      <script>
        window.onload = function() {
          setTimeout(function() { window.print(); }, 350);
        };
      <\/script>
    </body>
    </html>
  `;d.document.open(),d.document.write(l),d.document.close()};document.getElementById("btn-start-cam").addEventListener("click",At);document.getElementById("btn-switch-cam").addEventListener("click",_t);document.getElementById("btn-stop-cam").addEventListener("click",ct);async function At(){if(typeof Html5Qrcode>"u")return A("Carregando biblioteca de câmera, aguarde..."),setTimeout(At,600);try{F||(F=new Html5Qrcode("qr-reader")),T=await Html5Qrcode.getCameras();let t;if(T&&T.length>0){const e=T.findIndex(a=>/back|traseira|rear|environment/i.test(a.label));Q=e>=0?e:0,t=T[Q].id}else t={facingMode:"environment"};await F.start(t,{fps:10,qrbox:{width:240,height:240}},xt,()=>{}),Y=!0,document.getElementById("btn-start-cam").style.display="none",document.getElementById("btn-switch-cam").style.display=T.length>1?"inline-flex":"none",document.getElementById("btn-stop-cam").style.display="inline-flex"}catch(t){A("❌ Não foi possível acessar a câmera. Verifique as permissões do navegador."),console.error(t)}}async function _t(){if(!(!F||!Y))try{await F.stop(),T.length>1&&(Q=(Q+1)%T.length,await F.start(T[Q].id,{fps:10,qrbox:{width:240,height:240}},xt,()=>{}))}catch(t){console.error("switchCam:",t)}}async function ct(){if(F&&Y)try{await F.stop()}catch{}Y=!1,document.getElementById("btn-start-cam").style.display="inline-flex",document.getElementById("btn-switch-cam").style.display="none",document.getElementById("btn-stop-cam").style.display="none"}async function xt(t){ct(),document.getElementById("inp-url").value=t,A("✅ QR Code lido! Processando..."),await Ct(t)}document.getElementById("btn-carregar-dados").addEventListener("click",async()=>{const t=document.getElementById("inp-url").value.trim(),e=document.getElementById("inp-html").value.trim();if(!t&&!e){A("⚠️ Cole a URL do QR Code ou o conteúdo da página para ler a nota fiscal.");return}if(t&&!e){A("⏳ Consultando nota fiscal..."),await Ct(t);return}if(e){A("⏳ Processando conteúdo..."),await Tt(e);return}});document.getElementById("btn-preencher-manual").addEventListener("click",()=>{wt({nomeMercado:"",dataEmissao:new Date().toISOString(),valorTotal:0,descontoTotal:0,valorAPagar:0,qtdTotalItens:0,formasPagamento:{valeAlimentacao:0,cartaoCredito:0,cartaoDebito:0},itens:[]}),A("✍️ Preencha os dados da compra abaixo e clique em Salvar Nota Fiscal.","var(--accent-cyan)")});function wt(t){var r,n,d;document.getElementById("inp-mercado").value=t.nomeMercado||"",document.getElementById("inp-data").value=Pt(t.dataEmissao),document.getElementById("inp-vtotal").value=t.valorTotal!==void 0?t.valorTotal:0,document.getElementById("inp-desconto").value=t.descontoTotal!==void 0?t.descontoTotal:0,document.getElementById("inp-pagar").value=t.valorAPagar!==void 0?t.valorAPagar:0,document.getElementById("inp-qtd").value=t.qtdTotalItens!==void 0?t.qtdTotalItens:0,document.getElementById("inp-alim").value=((r=t.formasPagamento)==null?void 0:r.valeAlimentacao)||0,document.getElementById("inp-cred").value=((n=t.formasPagamento)==null?void 0:n.cartaoCredito)||0,document.getElementById("inp-deb").value=((d=t.formasPagamento)==null?void 0:d.cartaoDebito)||0,O=t.itens||[];const e=document.getElementById("form-nfce");e.style.display="block";const a=document.getElementById("preview-itens-box"),o=document.getElementById("count-preview-itens"),s=document.getElementById("lista-preview-itens");O.length>0?(a.style.display="block",o.textContent=O.length,s.innerHTML=O.map(l=>`
      <div style="display:flex; justify-content:space-between; padding: 0.35rem 0; border-bottom: 1px dashed var(--border-color);">
        <span><strong>${l.nome}</strong> (${l.quantidade} ${l.unidade||"Un"})</span>
        <span>${c(l.valorUnitario)}/un = <strong>${c(l.valorTotal)}</strong></span>
      </div>
    `).join("")):a.style.display="none",e.scrollIntoView({behavior:"smooth"})}document.getElementById("form-nfce").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-mercado").value.trim()||"Mercado",a=document.getElementById("inp-data").value||new Date().toISOString(),o=parseFloat(document.getElementById("inp-vtotal").value)||0,s=parseFloat(document.getElementById("inp-desconto").value)||0,r=parseFloat(document.getElementById("inp-pagar").value)||0,n=parseInt(document.getElementById("inp-qtd").value)||0,d=parseFloat(document.getElementById("inp-alim").value)||0,l=parseFloat(document.getElementById("inp-cred").value)||0,i=parseFloat(document.getElementById("inp-deb").value)||0,u=new Date(a).toISOString().slice(0,16),p=x.find(h=>{const $=new Date(h.dataEmissao).toISOString().slice(0,16),D=Math.abs((h.valorAPagar||0)-r)<.05,w=(h.nomeMercado||"").toLowerCase().trim()===e.toLowerCase().trim();return $===u&&D&&w});if(p){A(`⚠️ Esta nota fiscal já existe no sistema (Cadastrada em ${it(p.dataEmissao)} no valor de ${c(p.valorAPagar)}). Nota não adicionada!`,"#fb7185"),v("⚠️ Nota fiscal já cadastrada! Operação cancelada.");return}const b=new Date(a),y=`${b.getFullYear()}-${String(b.getMonth()+1).padStart(2,"0")}`;A("⏳ Salvando nota fiscal no banco...");try{await gt(Z(I,rt),{nomeMercado:e,dataEmissao:a,mesAno:y,qtdTotalItens:n||O.length,valorTotal:o,descontoTotal:s,valorAPagar:r,formasPagamento:{valeAlimentacao:d,cartaoCredito:l,cartaoDebito:i},itens:O,createdAt:Ft()}),A("✅ Nota salva com sucesso!","#34d399"),document.getElementById("form-nfce").style.display="none",document.getElementById("form-nfce").reset(),document.getElementById("inp-url").value="",document.getElementById("inp-html").value="",O=[],yt(),goTab("dashboard"),v("🎉 Nota fiscal registrada no Firebase!")}catch(h){A("❌ Erro ao salvar: "+h.message,"#fb7185")}});async function Ct(t){const e=[a=>`https://api.allorigins.win/raw?url=${encodeURIComponent(a)}`,a=>`https://corsproxy.io/?${encodeURIComponent(a)}`];for(const a of e)try{const o=await fetch(a(t),{signal:AbortSignal.timeout(8e3)});if(o.ok){const s=await o.text();if(s&&s.length>200){await Tt(s);return}}}catch{}Wt(t)}function Wt(t){document.getElementById("modal-link").href=t,document.getElementById("modal-cors").classList.add("active"),A("⚠️ Abra o link, copie o conteúdo da página e cole no campo de texto abaixo.")}async function Tt(t){const e=Jt(t);wt(e),A("✅ Nota lida com sucesso! Confira os valores abaixo e altere se necessário antes de Salvar.","#34d399")}function Jt(t){var U,N,R;const a=new DOMParser().parseFromString(t,"text/html"),o=((U=a.body)==null?void 0:U.textContent)||t;let s=((R=(N=a.querySelector(".txtTopo, .nomeEmit, h1"))==null?void 0:N.textContent)==null?void 0:R.trim())||"Mercado",r=new Date().toISOString();const n=o.match(/Emiss[ãa]o\s*[:\-]?\s*(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})?/i)||o.match(/(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})/);if(n){const[L,m,g]=n[1].split("/");r=`${g}-${m}-${L}T${n[2]||"12:00:00"}`}const d=o.match(/Qtd\.?\s*total\s*de\s*itens\s*[:\s]*([\d,\.]+)/i),l=o.match(/Valor\s*total\s*R\$\s*[:\s]*([\d\.,]+)/i),i=o.match(/Descontos?\s*R\$\s*[:\s]*([\d\.,]+)/i),u=o.match(/Valor\s*a\s*pagar\s*R\$\s*[:\s]*([\d\.,]+)/i)||o.match(/VALOR\s*PAGO\s*R\$\s*[:\s]*([\d\.,]+)/i),p=o.match(/(?:Vale\s*)?Alimenta[çc][ãa]o\s*[:\s]*([\d\.,]+)/i),b=o.match(/(?:Cart[ãa]o\s*de\s*)?Cr[eé]dito\s*[:\s]*([\d\.,]+)/i),y=o.match(/(?:Cart[ãa]o\s*de\s*)?D[eé]bito\s*[:\s]*([\d\.,]+)/i),h=d?E(d[1]):0,$=l?E(l[1]):0,D=i?E(i[1]):0;let w=u?E(u[1]):$-D;const j={valeAlimentacao:p?E(p[1]):0,cartaoCredito:b?E(b[1]):0,cartaoDebito:y?E(y[1]):0},V=[];a.querySelectorAll("tr, .item, .itemNota").forEach(L=>{var lt;const m=L.textContent;if(!/Vl\.\s*Unit|valorUnitario|Qtde?\./i.test(m))return;const g=L.querySelector(".txtTit, .txtTit2, .nomeProd"),f=((lt=g==null?void 0:g.textContent)==null?void 0:lt.trim())||"",k=m.match(/Qtde?\.\s*[:\s]*([\d,\.]+)/i),W=m.match(/Vl\.\s*Unit\.\s*[:\s]*([\d,\.]+)/i),C=m.match(/Vl\.\s*Total\s*([\d,\.]+)/i),H=m.match(/C[oó]digo\s*[:\s]*(\d+)/i),G=m.match(/UN\s*[:\s]*([A-Za-z]+)/i),J=k?E(k[1]):1,ot=W?E(W[1]):0,Mt=C?E(C[1]):ot*J;f&&ot>0&&V.push({codigo:(H==null?void 0:H[1])||"",nome:f,marca:Kt(f),quantidade:J,unidade:(G==null?void 0:G[1])||"Un",valorUnitario:ot,valorTotal:Mt})});const q=new Date(r),S=`${q.getFullYear()}-${String(q.getMonth()+1).padStart(2,"0")}`;return{nomeMercado:s,dataEmissao:r,mesAno:S,qtdTotalItens:h,valorTotal:$,descontoTotal:D,valorAPagar:w,formasPagamento:j,itens:V}}function Kt(t){const e=["BAUDUCCO","BAUD","PANCO","DANONE","NESTLE","QUALITA","SADIA","PERDIGAO","SEARA","CAMIL","TIO JOAO","URBANO","LIZA","SOYA","YPE","PILAO","MELITTA","3 CORACOES","VIGOR","PARMALAT","ITALAC","HEINZ","KRAFT"],a=t.toUpperCase();for(const o of e)if(a.includes(o))return o;return a.split(" ")[0]||"Genérica"}function Xt(){const t=document.getElementById("lista-historico");if(!x.length){t.innerHTML='<div class="empty-state">📭 Nenhuma compra cadastrada ainda.</div>';return}t.innerHTML=x.map(e=>{var a,o,s;return`
    <div class="purchase-card">
      <div class="purchase-header" onclick="toggleDetail('${e.id}')">
        <div class="purchase-info">
          <h3>${e.nomeMercado||"Mercado"}</h3>
          <p>📅 ${it(e.dataEmissao)} &nbsp;•&nbsp; 🛒 ${e.qtdTotalItens||0} itens</p>
        </div>
        <div class="purchase-values">
          <div class="pv-total">${c(e.valorAPagar)}</div>
          <div class="pv-sub">Desc: ${c(e.descontoTotal)}</div>
        </div>
        <svg class="chevron" id="chev-${e.id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      <div class="purchase-details" id="detail-${e.id}">
        <div class="details-toolbar">
          <span class="card-subtext">Pagamentos: Alimentação ${c((a=e.formasPagamento)==null?void 0:a.valeAlimentacao)} · Crédito ${c((o=e.formasPagamento)==null?void 0:o.cartaoCredito)} · Débito ${c((s=e.formasPagamento)==null?void 0:s.cartaoDebito)}</span>
          <button class="btn-danger" onclick="confirmarExcluirMercado('${e.id}')">🗑️ Excluir</button>
        </div>
        ${te(e)}
      </div>
    </div>`}).join("")}function te(t){return!t.itens||!t.itens.length?'<p class="card-subtext">Nenhum item detalhado registrado.</p>':`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Item</th><th>Marca</th><th class="num">Qtd</th><th class="num">Vl. Unit.</th><th class="num">Vl. Total</th></tr></thead>
    <tbody>${t.itens.map(e=>`<tr>
      <td>${e.nome}</td>
      <td><span class="badge amber">${e.marca||"—"}</span></td>
      <td class="num">${e.quantidade} ${e.unidade||"Un"}</td>
      <td class="num">${c(e.valorUnitario)}</td>
      <td class="num"><strong>${c(e.valorTotal)}</strong></td>
    </tr>`).join("")}</tbody>
  </table></div>`}window.toggleDetail=function(t){const e=document.getElementById("detail-"+t),a=document.getElementById("chev-"+t);e&&e.classList.toggle("open"),a&&a.classList.toggle("open")};window.confirmarExcluirMercado=async function(t){if(confirm("Excluir esta compra de mercado?"))try{await et(M(I,rt,t)),v("🗑️ Compra excluída.")}catch(e){alert("Erro: "+e.message)}};function ee(){const t=document.getElementById("lista-comparacao"),e={};x.forEach(o=>{(o.itens||[]).forEach(s=>{var n;const r=((n=s.nome)==null?void 0:n.toLowerCase().trim())||"produto";e[r]||(e[r]={nome:s.nome,marca:s.marca,hist:{}}),e[r].hist[o.mesAno]=s.valorUnitario})});const a=Object.values(e);if(!a.length){t.innerHTML='<div class="empty-state">Adicione notas para ver a comparação de preços unitários.</div>';return}t.innerHTML=`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Produto</th><th>Marca</th><th>Histórico (Unitário)</th><th>Variação</th></tr></thead>
    <tbody>${a.map(o=>{const s=Object.keys(o.hist).sort();let r=s.map(d=>`${d}: <strong>${c(o.hist[d])}</strong>`).join(" → "),n='<span class="badge cyan">Estável</span>';if(s.length>=2){const d=o.hist[s[s.length-2]],i=o.hist[s[s.length-1]]-d,u=(i/d*100).toFixed(1);i>.01?n=`<span class="badge red">+${u}% ↑</span>`:i<-.01&&(n=`<span class="badge green">${u}% ↓</span>`)}return`<tr><td><strong>${o.nome}</strong></td><td><span class="badge amber">${o.marca||"—"}</span></td><td>${r}</td><td>${n}</td></tr>`}).join("")}</tbody>
  </table></div>`}function ae(){const t=document.getElementById("lista-recorrencia"),e=document.getElementById("lista-marcas"),a={},o={};x.forEach(n=>{(n.itens||[]).forEach(d=>{var p;const l=(p=d.nome)==null?void 0:p.toLowerCase().trim();if(!l)return;a[l]||(a[l]={nome:d.nome,marca:d.marca,qtd:0,notas:0,units:[]}),a[l].qtd+=d.quantidade||1,a[l].notas+=1,a[l].units.push(d.valorUnitario||0);const i=(d.nome||"").split(" ")[0].toUpperCase();o[i]||(o[i]={});const u=d.marca||"Genérica";o[i][u]||(o[i][u]=[]),o[i][u].push(d.valorUnitario||0)})});const s=Object.values(a).filter(n=>n.notas>1).sort((n,d)=>d.notas-n.notas);t.innerHTML=s.length?`<div class="table-responsive"><table class="custom-table">
        <thead><tr><th>Item</th><th>Marca</th><th>Compras</th><th class="num">Qtd Total</th><th class="num">Média Unitária</th></tr></thead>
        <tbody>${s.map(n=>{const d=n.units.reduce((l,i)=>l+i,0)/n.units.length;return`<tr>
            <td><strong>${n.nome}</strong></td>
            <td><span class="badge amber">${n.marca||"—"}</span></td>
            <td><span class="badge green">${n.notas}x</span></td>
            <td class="num">${n.qtd}</td>
            <td class="num">${c(d)}</td>
          </tr>`}).join("")}</tbody>
      </table></div>`:'<div class="empty-state">Adicione notas para ver a recorrência de itens.</div>';const r=Object.entries(o).filter(([,n])=>Object.keys(n).length>1).map(([n,d])=>{let l=1/0,i="";const u=Object.entries(d).map(([p,b])=>{const y=b.reduce((h,$)=>h+$,0)/b.length;return y<l&&(l=y,i=p),{marca:p,med:y}});return`<div class="brand-card">
      <div class="brand-card-header">
        <span class="card-title">${n}</span>
        <span class="badge green">🏆 Menor preço: ${i} (${c(l)}/un)</span>
      </div>
      <div class="brands-row">
        ${u.map(p=>`<div class="brand-chip${p.marca===i?" best":""}">
          <div class="bc-name">${p.marca} ${p.marca===i?"✅":""}</div>
          <div class="bc-val">${c(p.med)}<span style="font-size:.7rem;font-weight:400">/un</span></div>
        </div>`).join("")}
      </div>
    </div>`}).join("");e.innerHTML=r||'<div class="empty-state">Ao comprar o mesmo tipo de produto com marcas diferentes, o sistema mostrará qual teve menor preço.</div>'}document.getElementById("btn-modal-close").addEventListener("click",()=>{document.getElementById("modal-cors").classList.remove("active")});
