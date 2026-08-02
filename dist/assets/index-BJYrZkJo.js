import{initializeApp as Dt}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";import{getFirestore as Ft,onSnapshot as tt,query as qt,collection as V,orderBy as Rt,doc as B,setDoc as et,addDoc as it,deleteDoc as at,serverTimestamp as ft}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function a(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(s){if(s.ep)return;s.ep=!0;const r=a(s);fetch(s.href,r)}})();const ht=document.createElement("script");ht.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js";document.head.appendChild(ht);const bt=document.createElement("script");bt.src="https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js";document.head.appendChild(bt);const Ot={apiKey:"AIzaSyANpFnEIkyN1XCT6qbtmVR9wx7sQHEsyrE",authDomain:"comprasmercado-23913.firebaseapp.com",projectId:"comprasmercado-23913",storageBucket:"comprasmercado-23913.firebasestorage.app",messagingSenderId:"317518149234",appId:"1:317518149234:web:94f38624d68a2b9a6634eb",measurementId:"G-2XP88EK37S"},Pt=Dt(Ot),y=Ft(Pt),dt="compras",J="entradas",_="faturas",yt="reservas";let A=[],F=[],P=[],rt={metaMensal:0,valorAtualGuardado:0},st=null,q=null,M=[],Z=0,W=!1,O=[];function l(t){return Number(t||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}function I(t){if(typeof t=="number")return t;if(!t)return 0;const e=parseFloat(String(t).replace(/R\$\s?/gi,"").replace(/\s/g,"").replace(/\./g,"").replace(",","."));return isNaN(e)?0:e}function lt(t){if(!t)return"—";try{return new Date(t).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}catch{return t}}function g(t,e=3500){const a=document.getElementById("toast");a.textContent=t,a.classList.add("show"),setTimeout(()=>a.classList.remove("show"),e)}function $(t,e="var(--accent-amber)"){const a=document.getElementById("status-msg");a&&(a.textContent=t,a.style.color=e)}function Nt(t){if(!t)return new Date().toISOString().slice(0,16);try{const e=new Date(t);if(isNaN(e.getTime()))return new Date().toISOString().slice(0,16);const a=o=>String(o).padStart(2,"0");return`${e.getFullYear()}-${a(e.getMonth()+1)}-${a(e.getDate())}T${a(e.getHours())}:${a(e.getMinutes())}`}catch{return new Date().toISOString().slice(0,16)}}function Ut(t,e){let a=0;const o=new Date(t,e+1,0).getDate();for(let s=1;s<=o;s++){const r=new Date(t,e,s).getDay();r!==0&&r!==6&&a++}return a}window.goTab=function(t){document.querySelectorAll(".tab-content").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".desktop-nav .nav-item").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".mobile-nav .mob-btn").forEach(a=>a.classList.remove("active"));const e=document.getElementById("tab-"+t);e&&e.classList.add("active"),document.querySelectorAll(`[data-tab="${t}"]`).forEach(a=>a.classList.add("active"))};document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>goTab(t.getAttribute("data-tab")))});document.querySelectorAll(".sub-item").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".sub-item").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".sub-tab-content").forEach(a=>a.style.display="none"),t.classList.add("active");const e=document.getElementById("sub-"+t.getAttribute("data-sub"));e&&(e.style.display="block")})});function Et(){document.getElementById("modal-add-nota").classList.add("active")}function It(){W&&mt(),document.getElementById("modal-add-nota").classList.remove("active")}var pt;(pt=document.getElementById("btn-open-modal-home"))==null||pt.addEventListener("click",Et);var gt;(gt=document.getElementById("btn-mercado-add-nota"))==null||gt.addEventListener("click",Et);var vt;(vt=document.getElementById("btn-close-modal-add"))==null||vt.addEventListener("click",It);tt(qt(V(y,dt),Rt("dataEmissao","desc")),t=>{A=t.docs.map(e=>({id:e.id,...e.data()})),ot()},t=>console.error("Firestore Mercado:",t));tt(V(y,J),t=>{F=t.docs.map(e=>({id:e.id,...e.data()})),ot()},t=>console.error("Firestore Entradas:",t));tt(V(y,_),t=>{P=t.docs.map(e=>({id:e.id,...e.data()})),ot()},t=>console.error("Firestore Faturas:",t));tt(B(y,yt,"config"),t=>{t.exists()&&(rt=t.data()),ot()},t=>console.error("Firestore Reservas:",t));function ot(){kt(),jt(),Qt(),_t(),te(),ae(),oe(),Zt()}function kt(){let t=F.reduce((i,u)=>i+(u.valor||0),0),e=P.reduce((i,u)=>i+(u.valorTotal!==void 0?u.valorTotal:u.valor||0),0),a=0,o=0,s=0,r=0,n=0;const d={};A.forEach(i=>{const u=i.valorAPagar||0;r+=i.descontoTotal||0,n+=i.qtdTotalItens||0,i.formasPagamento&&(o+=i.formasPagamento.valeAlimentacao||0,s+=i.formasPagamento.cartaoCredito||0,a+=i.formasPagamento.cartaoDebito||0);const p=i.mesAno||"Outros";d[p]=(d[p]||0)+u});let m=t-e-a;document.getElementById("fin-total-entradas").textContent=l(t),document.getElementById("fin-total-cartoes").textContent=l(e),document.getElementById("fin-mercado-debito").textContent=l(a),document.getElementById("fin-saldo-liquido").textContent=l(m),document.getElementById("dash-alimentacao").textContent=l(o),document.getElementById("dash-credito").textContent=l(s),document.getElementById("dash-debito").textContent=l(a),xt(d)}function xt(t){var r;if(typeof Chart>"u")return setTimeout(()=>xt(t),300);const e=(r=document.getElementById("chart-barras"))==null?void 0:r.getContext("2d");if(!e)return;const a=Object.keys(t).sort(),o=a.map(n=>{const[d,m]=n.split("-");return`${m}/${d}`}),s=a.map(n=>t[n]);st&&st.destroy(),st=new Chart(e,{type:"bar",data:{labels:o.length?o:["Sem compras"],datasets:[{label:"Gasto Mercado R$",data:s.length?s:[0],backgroundColor:"rgba(16,185,129,0.78)",borderColor:"#10b981",borderWidth:2,borderRadius:8}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:n=>` ${l(n.raw)}`}}},scales:{y:{beginAtZero:!0,grid:{color:"rgba(255,255,255,.05)"},ticks:{color:"#94a3b8",callback:n=>"R$"+n}},x:{grid:{display:!1},ticks:{color:"#94a3b8"}}}}})}function $t(t){if(!t)return 0;const e=t.match(/L[íi]quido(?:\s*a\s*receber)?\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/TOTAL\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/SAL[ÁA]RIO\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/VALOR\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i);return e?I(e[1]):0}document.getElementById("form-holerite-victor").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-holerite-txt-victor").value;let a=parseFloat(document.getElementById("inp-salario-val-victor").value)||0;if(!a&&e&&(a=$t(e)),!a){g("⚠️ Digite ou cole um holerite válido com valor.");return}await et(B(y,J,"salario_victor"),{pessoa:"Victor",tipo:"holerite",descricao:"Salário Líquido Victor",valor:a,data:new Date().toISOString()}),g("✅ Salário do Victor salvo!")});document.getElementById("form-holerite-maria").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-holerite-txt-maria").value;let a=parseFloat(document.getElementById("inp-salario-val-maria").value)||0;if(!a&&e&&(a=$t(e)),!a){g("⚠️ Digite ou cole um holerite válido com valor.");return}await et(B(y,J,"salario_maria"),{pessoa:"Maria",tipo:"holerite",descricao:"Salário Líquido Maria",valor:a,data:new Date().toISOString()}),g("✅ Salário da Maria salvo!")});document.getElementById("form-entrada-manual").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-ent-desc").value.trim(),a=parseFloat(document.getElementById("inp-ent-val").value)||0,o=document.getElementById("inp-ent-pessoa").value;!e||!a||(await it(V(y,J),{pessoa:o,tipo:"manual",descricao:e,valor:a,data:new Date().toISOString()}),t.target.reset(),g("🎉 Entrada manual registrada!"))});function jt(){var s,r;const t=((s=F.find(n=>n.id==="salario_victor"))==null?void 0:s.valor)||0,e=((r=F.find(n=>n.id==="salario_maria"))==null?void 0:r.valor)||0,a=F.reduce((n,d)=>n+(d.valor||0),0);document.getElementById("val-salario-victor").textContent=l(t),document.getElementById("val-salario-maria").textContent=l(e),document.getElementById("val-entradas-combinado").textContent=l(a);const o=document.getElementById("lista-entradas-registradas");if(!F.length){o.innerHTML='<div class="empty-state">Nenhuma entrada cadastrada ainda.</div>';return}o.innerHTML=`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Descrição</th><th>Pessoa</th><th>Tipo</th><th class="num">Valor</th><th>Ação</th></tr></thead>
    <tbody>${F.map(n=>`<tr>
      <td><strong>${n.descricao}</strong></td>
      <td><span class="badge ${n.pessoa==="Victor"?"green":n.pessoa==="Maria"?"purple":"cyan"}">${n.pessoa}</span></td>
      <td><span class="badge amber">${n.tipo==="holerite"?"Holerite":"Manual"}</span></td>
      <td class="num" style="color:#34d399"><strong>${l(n.valor)}</strong></td>
      <td><button class="btn-danger" onclick="excluirEntrada('${n.id}')">🗑️</button></td>
    </tr>`).join("")}</tbody>
  </table></div>`}window.excluirEntrada=async function(t){confirm("Excluir esta entrada?")&&(await at(B(y,J,t)),g("🗑️ Entrada removida."))};let ct="Nubank",h=null;function Vt(){const t=document.getElementById("inp-fatura-vencimento");if(t&&!t.value){const e=new Date,a=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0");t.value=`${a}-${o}-10`,atualizarMesRefFatura()}}setTimeout(Vt,300);window.atualizarMesRefFatura=function(){const t=document.getElementById("inp-fatura-vencimento"),e=document.getElementById("lbl-fatura-mes-ref");if(!(!t||!e))if(t.value){const[a,o]=t.value.split("-"),r=new Date(parseInt(a),parseInt(o)-1,1).toLocaleString("pt-BR",{month:"long"});e.textContent=`Fatura ${r.charAt(0).toUpperCase()+r.slice(1)}/${a}`}else e.textContent="Mês da Fatura"};window.selecionarCartaoFatura=function(t){ct=t,document.querySelectorAll(".btn-card-select").forEach(a=>a.classList.remove("active"));const e=document.querySelector(`.btn-card-select[data-card="${t}"]`);e&&e.classList.add("active"),g(`Cartão selecionado: ${t}`)};window.handleFileFaturaSelect=async function(t){const e=t.target.files[0];if(!e)return;const a=document.getElementById("txt-file-fatura");a&&(a.textContent=`📄 Arquivo: ${e.name}`),g(`⏳ Lendo arquivo da fatura (${e.name})...`);let o="";if(e.type==="application/pdf"||e.name.endsWith(".pdf"))o=await zt(e);else try{o=await e.text()}catch{o=""}o?(document.getElementById("inp-fatura-txt").value=o,await wt(o,ct)):g("❌ Não foi possível ler o texto do arquivo da fatura.")};async function zt(t){try{const e=await t.arrayBuffer();if(typeof pdfjsLib>"u")return g("⚠️ Aguarde a biblioteca de PDF carregar..."),"";pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";let a=pdfjsLib.getDocument({data:e});a.onPassword=(r,n)=>{let d=prompt(`🔒 Este PDF de fatura está protegido por senha.
Digite a senha para abrir (ex: CPF ou Data de Nascimento):`);d?r(d):g("⚠️ Senha não informada. Leitura do PDF cancelada.")};const o=await a.promise;let s="";for(let r=1;r<=o.numPages;r++){const d=await(await o.getPage(r)).getTextContent();let m=null,i="";for(const u of d.items){if(!u.str)continue;const p=u.transform?u.transform[5]:null;m!==null&&Math.abs(p-m)>3?i+=`
`:i.length>0&&!i.endsWith(`
`)&&!i.endsWith(" ")&&(i+=" "),i+=u.str,m=p}s+=i+`
`}return s}catch(e){return e.name==="PasswordException"?g("🔒 O PDF precisa de senha válida para ser aberto."):console.error("Erro ao ler PDF:",e),""}}function Ht(t){if(!t)return null;const e=t.match(/Data\s*de\s*vencimento\s*[:\s]*(\d{2})\s+([A-Za-z]{3})\s+(\d{4})/i)||t.match(/Vencimento\s*[:\s]*(\d{2}[\/\.-]\d{2}[\/\.-]\d{4})/i)||t.match(/FATURA\s+(\d{2})\s+([A-Za-z]{3})\s+(\d{4})/i);if(e){if(e[2]&&e[3]){const a=e[1],o=e[2].toUpperCase(),s=e[3],n={JAN:"01",FEB:"02",MAR:"03",ABR:"04",APR:"04",MAI:"05",MAY:"05",JUN:"06",JUL:"07",AGO:"08",AUG:"08",SET:"09",SEP:"09",OUT:"10",OCT:"10",NOV:"11",DEZ:"12",DEC:"12"}[o]||"07";return`${s}-${n}-${a.padStart(2,"0")}`}else if(e[1]){const[a,o,s]=e[1].split(/[\/\.-]/);return`${s}-${o.padStart(2,"0")}-${a.padStart(2,"0")}`}}return null}window.importarFaturaManualOuArquivo=async function(){const t=document.getElementById("inp-fatura-txt").value.trim();if(!t){g("⚠️ Selecione o arquivo da fatura (.pdf, .csv) ou cole o texto da fatura.");return}await wt(t,ct)};async function wt(t,e){const a=Ht(t);a&&(document.getElementById("inp-fatura-vencimento").value=a,atualizarMesRefFatura());const o=Gt(t);if(!o.length){g(`⚠️ Nenhuma compra individual identificada na fatura do ${e}.`);return}const s=document.getElementById("inp-fatura-vencimento").value||new Date().toISOString().slice(0,10),r=s.slice(0,7);h={cartao:e,dataVencimento:s,mesAno:r,valorTotal:o.reduce((n,d)=>n+d.valor,0),qtdItens:o.length,itens:o},At(),g(`✅ ${o.length} compras encontradas! Você pode excluir itens indesejados antes de salvar.`)}function At(){if(!h)return;const{valorTotal:t,itens:e}=h;document.getElementById("badge-total-preview-fatura").textContent=l(t);const a=document.getElementById("lista-preview-fatura-itens");e.length?a.innerHTML=e.map((s,r)=>`
      <div style="display:flex; justify-content:space-between; align-items:center; padding:.4rem 0; border-bottom:1px dashed var(--border-color); font-size:.82rem;">
        <span><strong>${s.dataCompra}</strong> — ${s.descricao}</span>
        <div style="display:flex; align-items:center; gap:.75rem;">
          <span style="color:#fb7185; font-weight:700;">${l(s.valor)}</span>
          <button type="button" class="btn-danger" style="padding:.15rem .45rem; font-size:.75rem;" onclick="removerItemRevisaoFatura(${r})">🗑️</button>
        </div>
      </div>
    `).join(""):a.innerHTML='<div class="empty-state">Todos os itens foram removidos.</div>';const o=document.getElementById("box-revisao-fatura");o.style.display="block",o.scrollIntoView({behavior:"smooth"})}window.removerItemRevisaoFatura=function(t){!h||!h.itens||(h.itens.splice(t,1),h.valorTotal=h.itens.reduce((e,a)=>e+a.valor,0),h.qtdItens=h.itens.length,At(),g("🗑️ Item removido da lista de revisão."))};window.confirmarEGravarFaturaDocumento=async function(){if(!h)return;const t=document.getElementById("inp-fatura-vencimento").value||new Date().toISOString().slice(0,10);h.dataVencimento=t,h.mesAno=t.slice(0,7);try{await it(V(y,_),{...h,createdAt:ft()}),document.getElementById("box-revisao-fatura").style.display="none",document.getElementById("inp-fatura-txt").value="";const e=document.getElementById("txt-file-fatura");e&&(e.textContent="Clique para Selecionar o Arquivo da Fatura");const a=l(h.valorTotal);h=null,g(`🎉 Fatura de ${a} salva com sucesso!`)}catch(e){alert("Erro ao salvar fatura: "+e.message)}};function Gt(t){if(!t)return[];const e=[];if(t.split(`
`).forEach(r=>{const n=r.trim();if(!n||/EMISS[ÃA]O|TRANSA[ÇC][ÕO]ES|RESUMO|PAGAMENTO DE FATURA|TOTAL DA FATURA|FATURA ANTERIOR|SALDO ANTERIOR|LIMITE DISPON[ÍI]VEL|OPÇÕES DE PAGAMENTO|ALTERNATIVAS DE PAGAMENTO/i.test(n))return;const d=n.match(/^(?:\d+\s+)?(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+R?\$\s*([\d\.,]+)$/i)||n.match(/(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+R?\$\s*([\d\.,]+)/i);if(d){const m=d[1],i=d[2].trim(),u=I(d[3]);i&&u>0&&i.length>2&&!/fatura|limite|pagamento|saldo|alternativas|opções/i.test(i)&&e.push({dataCompra:m,descricao:i,valor:u})}}),e.length>0)return e;const o=/(\b\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\b\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+R?\$\s*([\d\.,]+)/gi;let s;for(;(s=o.exec(t))!==null;){const r=s[1],n=s[2].trim(),d=I(s[3]);n&&d>0&&n.length>2&&!/fatura|limite|pagamento|saldo|alternativas|opções|período|emissão/i.test(n)&&e.push({dataCompra:r,descricao:n,valor:d})}if(e.length===0){const r=t.match(/no\s*valor\s*de\s*R?\$\s*([\d\.,]+)/i)||t.match(/Valor\s*total\s*da\s*fatura\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/Total\s*da\s*fatura\s*[:\s]*R?\$\s*([\d\.,]+)/i);if(r){const n=I(r[1]);n>0&&e.push({dataCompra:"Fatura Mês",descricao:"Fatura do Cartão (Total Consolidado)",valor:n})}}return e}function Qt(){const t=P.reduce((a,o)=>a+(o.valorTotal!==void 0?o.valorTotal:o.valor||0),0);document.getElementById("badge-total-cartoes").textContent=`${l(t)} total`;const e=document.getElementById("lista-faturas-registradas");if(!P.length){e.innerHTML='<div class="empty-state">Nenhuma fatura cadastrada ainda.</div>';return}e.innerHTML=P.map(a=>{var u;const o=a.valorTotal!==void 0?a.valorTotal:a.valor||0,s=a.cartao||"Cartão",r=s.toLowerCase().includes("nubank"),n=r?"purple":"red",d=r?"🟣":"🔴",m=a.dataVencimento?lt(a.dataVencimento).split(",")[0]:"—",i=a.mesAno||"—";return`
      <div class="purchase-card">
        <div class="purchase-header" onclick="toggleDetail('fat-${a.id}')">
          <div class="purchase-info">
            <h3><span class="badge ${n}">${d} ${s}</span> — Vencimento: ${m}</h3>
            <p>📅 Mês Referência: <strong>${i}</strong> &nbsp;•&nbsp; 🛒 ${a.qtdItens||((u=a.itens)==null?void 0:u.length)||1} itens contemplados</p>
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
          ${Yt(a)}
        </div>
      </div>
    `}).join("")}function Yt(t){return t.itens&&t.itens.length>0?`<div class="table-responsive"><table class="custom-table">
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
  </table></div>`}window.removerItemFaturaCadastrada=async function(t,e){const a=P.find(r=>r.id===t);if(!a||!a.itens||!confirm("Remover este item da fatura?"))return;const o=[...a.itens];o.splice(e,1);const s=o.reduce((r,n)=>r+(n.valor||0),0);o.length===0?(await at(B(y,_,t)),g("🗑️ Fatura excluída pois todos os itens foram removidos.")):(await et(B(y,_,t),{...a,itens:o,valorTotal:s,qtdItens:o.length}),g("🗑️ Item removido da fatura."))};window.excluirFaturaDocumento=async function(t){confirm("Excluir esta fatura e todos os seus lançamentos?")&&(await at(B(y,_,t)),g("🗑️ Fatura removida com sucesso."))};document.getElementById("form-config-reservas").addEventListener("submit",async t=>{t.preventDefault();const e=parseFloat(document.getElementById("inp-meta-mensal").value)||0,a=parseFloat(document.getElementById("inp-saldo-guardado").value)||0;await et(B(y,yt,"config"),{metaMensal:e,valorAtualGuardado:a,dataAtualizacao:new Date().toISOString()}),g("✅ Reservas e economias atualizadas!")});function Zt(){const t=rt.metaMensal||0,e=rt.valorAtualGuardado||0;document.getElementById("val-meta-reserva").textContent=l(t),document.getElementById("val-real-guardado").textContent=l(e);const a=F.reduce((i,u)=>i+(u.valor||0),0),o=P.reduce((i,u)=>i+(u.valorTotal!==void 0?u.valorTotal:u.valor||0),0);let s=0;A.forEach(i=>{i.formasPagamento&&(s+=i.formasPagamento.cartaoDebito||0)});const r=a-o-s,n=r>0?Math.max(r*.5,a*.2):0;document.getElementById("val-recomendacao-reserva").textContent=l(n);const d=document.getElementById("box-analise-reserva-detalhes");if(a===0){d.innerHTML='<p class="empty-state">Cadastre seus salários e entradas na aba "Salários & Entradas" para gerar o diagnóstico inteligente de economias.</p>';return}const m=t>0?Math.min(100,e/t*100).toFixed(1):0;d.innerHTML=`
    <p> Com base nos seus <strong>${l(a)}</strong> de Entradas, <strong>${l(o)}</strong> de Faturas de Cartão e <strong>${l(s)}</strong> de Mercado no Débito:</p>
    <div style="background:rgba(15,23,42,0.6);padding:1rem;border-radius:10px;margin:.75rem 0;border:1px solid var(--border-color)">
      <div style="display:flex;justify-content:space-between;margin-bottom:.4rem">
        <span>💰 Saldo Livre em Conta: <strong>${l(r)}</strong></span>
        <span>💡 Recomendação de Reserva: <strong style="color:#c084fc">${l(n)}/mês</strong></span>
      </div>
      <div class="progress-bar-bg">
        <div class="progress-bar-fill" style="width:${m}%"></div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:.78rem;color:var(--text-muted);margin-top:.4rem">
        <span>Guardado: ${l(e)}</span>
        <span>Meta Pessoal: ${l(t)} (${m}%)</span>
      </div>
    </div>
    <p style="font-size:.84rem;color:var(--text-muted)">
      💡 <strong>Dica de Inteligência Financeira:</strong> Como o Vale Alimentação e o Crédito no Mercado não saem do seu salário em conta, eles protegem sua renda real! O sistema recomenda destinar pelo menos 50% do seu saldo livre líquido (<strong>${l(n)}</strong>) para sua reserva de emergência e investimentos.
    </p>
  `}function _t(){const t=document.getElementById("lista-mensal-container");if(!t)return;const e=new Date,a=new Date(e.getFullYear(),e.getMonth()+1,1),o=a.toLocaleString("pt-BR",{month:"long"}),s=a.getFullYear(),r=`${o.charAt(0).toUpperCase()+o.slice(1)} de ${s}`,n=Ut(a.getFullYear(),a.getMonth()),d=31.8,m=20,i=n*d,u=n*m,p={};let w=0;A.forEach(c=>{const v=c.valorAPagar||0;w+=v;const f=c.mesAno||"Outros";p[f]=(p[f]||0)+v});const E=Math.max(1,Object.keys(p).length),b=w/E,x={};A.forEach(c=>{(c.itens||[]).forEach(v=>{const f=(v.nome||"").toLowerCase().trim();f&&(x[f]||(x[f]={nome:v.nome,marca:v.marca||"Geral",qtdTotal:0,frequenciaNotas:0,valoresUnitarios:[]}),x[f].qtdTotal+=v.quantidade||1,x[f].frequenciaNotas+=1,v.valorUnitario&&x[f].valoresUnitarios.push(v.valorUnitario))})});const L=Object.values(x).map(c=>{const v=c.valoresUnitarios.length>0?c.valoresUnitarios.reduce((Y,X)=>Y+X,0)/c.valoresUnitarios.length:0,f=c.qtdTotal/E,j=E/Math.max(1,c.frequenciaNotas),K=c.frequenciaNotas/E;let T=0;K>=.35||f>=.7?T=Math.ceil(f):T=Math.round(f),T<1&&c.frequenciaNotas>=E&&(T=1);const Q=T*v;return{nome:c.nome,marca:c.marca,frequenciaNotas:c.frequenciaNotas,intervaloMeses:j,qtdMensalTaxa:f,totalEstimadoUnidades:T,valorUnitario:v,subtotalCalculado:Q}}).filter(c=>c.totalEstimadoUnidades>0);L.sort((c,v)=>v.frequenciaNotas-c.frequenciaNotas);const C=L.reduce((c,v)=>c+v.subtotalCalculado,0),z=b>0?b*1.05:C;let H=1;C>z&&b>0&&(H=z/C);const G=L.map(c=>({...c,subtotalFinal:c.subtotalCalculado*H})),N=b>0?Math.min(C,z):C;let S=N;const U=Math.min(S,i);S-=U;const k=Math.min(S,u);S-=k;const R=S>0?S:0;let D=`
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
          <div class="p-val" style="color:#34d399;">${l(U)} <span style="font-size:0.75rem;font-weight:normal;color:var(--text-muted)">/ ${l(i)}</span></div>
        </div>
        <div class="payment-item" style="border-color: rgba(99,102,241,0.4);">
          <div class="p-label">💳 Cartão Crédito (${n}d × R$ 20,00)</div>
          <div class="p-val" style="color:#818cf8;">${l(k)} <span style="font-size:0.75rem;font-weight:normal;color:var(--text-muted)">/ ${l(u)}</span></div>
        </div>
        <div class="payment-item" style="border-color: ${R>0?"rgba(244,63,94,0.5)":"var(--border-color)"};">
          <div class="p-label">💳 Débito Necessário (Excedente)</div>
          <div class="p-val" style="color: ${R>0?"#fb7185":"var(--text-muted)"};">${l(R)}</div>
        </div>
      </div>

      <div style="margin-top:1.25rem; padding-top:1rem; border-top:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
        <div>
          <span style="font-size:0.85rem; color:var(--text-muted);">Total Estimado da Lista de Compras:</span>
          <p style="font-size:0.75rem; color:#60a5fa;">Média Histórica de Gastos: ${l(b)}</p>
        </div>
        <span style="font-size:1.6rem; font-weight:800; color:var(--primary);">${l(N)}</span>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-title">Lista de Itens com Frequência e Total Estimado</span>
        <span class="badge amber">${G.length} itens cadastrados</span>
      </div>
      <p class="card-subtext" style="margin-bottom:1rem;">
        O <strong>Total Estimado</strong> arredonda o consumo médio para cima (unidades inteiras exatas), pois os produtos são comprados por unidade no mercado.
      </p>
  `;window.dadosListaMensalCache={mesAnoStr:r,diasUteis:n,totalGeralEstimado:N,cobertoAlim:U,cobertoCred:k,cobertoDeb:R,alimDisponivel:i,credDisponivel:u,lista:G},G.length===0?D+='<div class="empty-state">Adicione notas fiscais para que o sistema gere automaticamente sua lista mensal de compras.</div></div>':D+=`
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
            ${G.map(c=>{const v=c.intervaloMeses>1.2?`A cada ${c.intervaloMeses.toFixed(1)} meses`:`Todo mês (${c.frequenciaNotas}x)`,f=c.qtdMensalTaxa<1?c.qtdMensalTaxa.toFixed(2):c.qtdMensalTaxa.toFixed(1),j=c.totalEstimadoUnidades.toFixed(1);return`
                <tr>
                  <td><strong>${c.nome}</strong></td>
                  <td><span class="badge amber">${c.marca}</span></td>
                  <td><span class="badge cyan">${v}</span></td>
                  <td class="num">${f} un/mês</td>
                  <td class="num"><span class="badge green" style="font-size:0.82rem;">${j}</span></td>
                  <td class="num">${l(c.valorUnitario)}</td>
                  <td class="num"><strong>${l(c.subtotalFinal)}</strong></td>
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
    </div>`,t.innerHTML=D}window.exportarPDFListaMensal=function(){if(!window.dadosListaMensalCache||!window.dadosListaMensalCache.lista.length){g("⚠️ Nenhuma lista mensal disponível para exportar.");return}const{mesAnoStr:t,diasUteis:e,totalGeralEstimado:a,cobertoAlim:o,cobertoCred:s,cobertoDeb:r,lista:n}=window.dadosListaMensalCache,d=window.open("","_blank","width=900,height=750");if(!d){alert("Permita pop-ups no navegador para gerar o PDF da lista.");return}const m=`
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
          <div class="val">${l(s)}</div>
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
          ${n.map(i=>`
            <tr>
              <td class="check-col"><div class="chk-box"></div></td>
              <td><strong>${i.nome}</strong></td>
              <td>${i.marca}</td>
              <td class="num"><strong>${i.totalEstimadoUnidades.toFixed(1)} un</strong></td>
              <td class="num">${l(i.valorUnitario)}</td>
              <td class="num"><strong>${l(i.subtotalFinal)}</strong></td>
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
  `;d.document.open(),d.document.write(m),d.document.close()};document.getElementById("btn-start-cam").addEventListener("click",Ct);document.getElementById("btn-switch-cam").addEventListener("click",Wt);document.getElementById("btn-stop-cam").addEventListener("click",mt);async function Ct(){if(typeof Html5Qrcode>"u")return $("Carregando biblioteca de câmera, aguarde..."),setTimeout(Ct,600);try{q||(q=new Html5Qrcode("qr-reader")),M=await Html5Qrcode.getCameras();let t;if(M&&M.length>0){const e=M.findIndex(a=>/back|traseira|rear|environment/i.test(a.label));Z=e>=0?e:0,t=M[Z].id}else t={facingMode:"environment"};await q.start(t,{fps:10,qrbox:{width:240,height:240}},Tt,()=>{}),W=!0,document.getElementById("btn-start-cam").style.display="none",document.getElementById("btn-switch-cam").style.display=M.length>1?"inline-flex":"none",document.getElementById("btn-stop-cam").style.display="inline-flex"}catch(t){$("❌ Não foi possível acessar a câmera. Verifique as permissões do navegador."),console.error(t)}}async function Wt(){if(!(!q||!W))try{await q.stop(),M.length>1&&(Z=(Z+1)%M.length,await q.start(M[Z].id,{fps:10,qrbox:{width:240,height:240}},Tt,()=>{}))}catch(t){console.error("switchCam:",t)}}async function mt(){if(q&&W)try{await q.stop()}catch{}W=!1,document.getElementById("btn-start-cam").style.display="inline-flex",document.getElementById("btn-switch-cam").style.display="none",document.getElementById("btn-stop-cam").style.display="none"}async function Tt(t){mt(),document.getElementById("inp-url").value=t,$("✅ QR Code lido! Processando..."),await Bt(t)}document.getElementById("btn-carregar-dados").addEventListener("click",async()=>{const t=document.getElementById("inp-url").value.trim(),e=document.getElementById("inp-html").value.trim();if(!t&&!e){$("⚠️ Cole a URL do QR Code ou o conteúdo da página para ler a nota fiscal.");return}if(t&&!e){$("⏳ Consultando nota fiscal..."),await Bt(t);return}if(e){$("⏳ Processando conteúdo..."),await Lt(e);return}});document.getElementById("btn-preencher-manual").addEventListener("click",()=>{Mt({nomeMercado:"",dataEmissao:new Date().toISOString(),valorTotal:0,descontoTotal:0,valorAPagar:0,qtdTotalItens:0,formasPagamento:{valeAlimentacao:0,cartaoCredito:0,cartaoDebito:0},itens:[]}),$("✍️ Preencha os dados da compra abaixo e clique em Salvar Nota Fiscal.","var(--accent-cyan)")});function Mt(t){var r,n,d;document.getElementById("inp-mercado").value=t.nomeMercado||"",document.getElementById("inp-data").value=Nt(t.dataEmissao),document.getElementById("inp-vtotal").value=t.valorTotal!==void 0?t.valorTotal:0,document.getElementById("inp-desconto").value=t.descontoTotal!==void 0?t.descontoTotal:0,document.getElementById("inp-pagar").value=t.valorAPagar!==void 0?t.valorAPagar:0,document.getElementById("inp-qtd").value=t.qtdTotalItens!==void 0?t.qtdTotalItens:0,document.getElementById("inp-alim").value=((r=t.formasPagamento)==null?void 0:r.valeAlimentacao)||0,document.getElementById("inp-cred").value=((n=t.formasPagamento)==null?void 0:n.cartaoCredito)||0,document.getElementById("inp-deb").value=((d=t.formasPagamento)==null?void 0:d.cartaoDebito)||0,O=t.itens||[];const e=document.getElementById("form-nfce");e.style.display="block";const a=document.getElementById("preview-itens-box"),o=document.getElementById("count-preview-itens"),s=document.getElementById("lista-preview-itens");O.length>0?(a.style.display="block",o.textContent=O.length,s.innerHTML=O.map(m=>`
      <div style="display:flex; justify-content:space-between; padding: 0.35rem 0; border-bottom: 1px dashed var(--border-color);">
        <span><strong>${m.nome}</strong> (${m.quantidade} ${m.unidade||"Un"})</span>
        <span>${l(m.valorUnitario)}/un = <strong>${l(m.valorTotal)}</strong></span>
      </div>
    `).join("")):a.style.display="none",e.scrollIntoView({behavior:"smooth"})}document.getElementById("form-nfce").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-mercado").value.trim()||"Mercado",a=document.getElementById("inp-data").value||new Date().toISOString(),o=parseFloat(document.getElementById("inp-vtotal").value)||0,s=parseFloat(document.getElementById("inp-desconto").value)||0,r=parseFloat(document.getElementById("inp-pagar").value)||0,n=parseInt(document.getElementById("inp-qtd").value)||0,d=parseFloat(document.getElementById("inp-alim").value)||0,m=parseFloat(document.getElementById("inp-cred").value)||0,i=parseFloat(document.getElementById("inp-deb").value)||0,u=new Date(a).toISOString().slice(0,16),p=A.find(b=>{const x=new Date(b.dataEmissao).toISOString().slice(0,16),L=Math.abs((b.valorAPagar||0)-r)<.05,C=(b.nomeMercado||"").toLowerCase().trim()===e.toLowerCase().trim();return x===u&&L&&C});if(p){$(`⚠️ Esta nota fiscal já existe no sistema (Cadastrada em ${lt(p.dataEmissao)} no valor de ${l(p.valorAPagar)}). Nota não adicionada!`,"#fb7185"),g("⚠️ Nota fiscal já cadastrada! Operação cancelada.");return}const w=new Date(a),E=`${w.getFullYear()}-${String(w.getMonth()+1).padStart(2,"0")}`;$("⏳ Salvando nota fiscal no banco...");try{await it(V(y,dt),{nomeMercado:e,dataEmissao:a,mesAno:E,qtdTotalItens:n||O.length,valorTotal:o,descontoTotal:s,valorAPagar:r,formasPagamento:{valeAlimentacao:d,cartaoCredito:m,cartaoDebito:i},itens:O,createdAt:ft()}),$("✅ Nota salva com sucesso!","#34d399"),document.getElementById("form-nfce").style.display="none",document.getElementById("form-nfce").reset(),document.getElementById("inp-url").value="",document.getElementById("inp-html").value="",O=[],It(),goTab("dashboard"),g("🎉 Nota fiscal registrada no Firebase!")}catch(b){$("❌ Erro ao salvar: "+b.message,"#fb7185")}});async function Bt(t){const e=[a=>`https://api.allorigins.win/raw?url=${encodeURIComponent(a)}`,a=>`https://corsproxy.io/?${encodeURIComponent(a)}`];for(const a of e)try{const o=await fetch(a(t),{signal:AbortSignal.timeout(8e3)});if(o.ok){const s=await o.text();if(s&&s.length>200){await Lt(s);return}}}catch{}Jt(t)}function Jt(t){document.getElementById("modal-link").href=t,document.getElementById("modal-cors").classList.add("active"),$("⚠️ Abra o link, copie o conteúdo da página e cole no campo de texto abaixo.")}async function Lt(t){const e=Kt(t);Mt(e),$("✅ Nota lida com sucesso! Confira os valores abaixo e altere se necessário antes de Salvar.","#34d399")}function Kt(t){var U,k,R;const a=new DOMParser().parseFromString(t,"text/html"),o=((U=a.body)==null?void 0:U.textContent)||t;let s=((R=(k=a.querySelector(".txtTopo, .nomeEmit, h1"))==null?void 0:k.textContent)==null?void 0:R.trim())||"Mercado",r=new Date().toISOString();const n=o.match(/Emiss[ãa]o\s*[:\-]?\s*(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})?/i)||o.match(/(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})/);if(n){const[D,c,v]=n[1].split("/");r=`${v}-${c}-${D}T${n[2]||"12:00:00"}`}const d=o.match(/Qtd\.?\s*total\s*de\s*itens\s*[:\s]*([\d,\.]+)/i),m=o.match(/Valor\s*total\s*R\$\s*[:\s]*([\d\.,]+)/i),i=o.match(/Descontos?\s*R\$\s*[:\s]*([\d\.,]+)/i),u=o.match(/Valor\s*a\s*pagar\s*R\$\s*[:\s]*([\d\.,]+)/i)||o.match(/VALOR\s*PAGO\s*R\$\s*[:\s]*([\d\.,]+)/i),p=o.match(/(?:Vale\s*)?Alimenta[çc][ãa]o\s*[:\s]*([\d\.,]+)/i),w=o.match(/(?:Cart[ãa]o\s*de\s*)?Cr[eé]dito\s*[:\s]*([\d\.,]+)/i),E=o.match(/(?:Cart[ãa]o\s*de\s*)?D[eé]bito\s*[:\s]*([\d\.,]+)/i),b=d?I(d[1]):0,x=m?I(m[1]):0,L=i?I(i[1]):0;let C=u?I(u[1]):x-L;const z={valeAlimentacao:p?I(p[1]):0,cartaoCredito:w?I(w[1]):0,cartaoDebito:E?I(E[1]):0},H=[];a.querySelectorAll("tr, .item, .itemNota").forEach(D=>{var ut;const c=D.textContent;if(!/Vl\.\s*Unit|valorUnitario|Qtde?\./i.test(c))return;const v=D.querySelector(".txtTit, .txtTit2, .nomeProd"),f=((ut=v==null?void 0:v.textContent)==null?void 0:ut.trim())||"",j=c.match(/Qtde?\.\s*[:\s]*([\d,\.]+)/i),K=c.match(/Vl\.\s*Unit\.\s*[:\s]*([\d,\.]+)/i),T=c.match(/Vl\.\s*Total\s*([\d,\.]+)/i),Q=c.match(/C[oó]digo\s*[:\s]*(\d+)/i),Y=c.match(/UN\s*[:\s]*([A-Za-z]+)/i),X=j?I(j[1]):1,nt=K?I(K[1]):0,St=T?I(T[1]):nt*X;f&&nt>0&&H.push({codigo:(Q==null?void 0:Q[1])||"",nome:f,marca:Xt(f),quantidade:X,unidade:(Y==null?void 0:Y[1])||"Un",valorUnitario:nt,valorTotal:St})});const N=new Date(r),S=`${N.getFullYear()}-${String(N.getMonth()+1).padStart(2,"0")}`;return{nomeMercado:s,dataEmissao:r,mesAno:S,qtdTotalItens:b,valorTotal:x,descontoTotal:L,valorAPagar:C,formasPagamento:z,itens:H}}function Xt(t){const e=["BAUDUCCO","BAUD","PANCO","DANONE","NESTLE","QUALITA","SADIA","PERDIGAO","SEARA","CAMIL","TIO JOAO","URBANO","LIZA","SOYA","YPE","PILAO","MELITTA","3 CORACOES","VIGOR","PARMALAT","ITALAC","HEINZ","KRAFT"],a=t.toUpperCase();for(const o of e)if(a.includes(o))return o;return a.split(" ")[0]||"Genérica"}function te(){const t=document.getElementById("lista-historico");if(!A.length){t.innerHTML='<div class="empty-state">📭 Nenhuma compra cadastrada ainda.</div>';return}t.innerHTML=A.map(e=>{var a,o,s;return`
    <div class="purchase-card">
      <div class="purchase-header" onclick="toggleDetail('${e.id}')">
        <div class="purchase-info">
          <h3>${e.nomeMercado||"Mercado"}</h3>
          <p>📅 ${lt(e.dataEmissao)} &nbsp;•&nbsp; 🛒 ${e.qtdTotalItens||0} itens</p>
        </div>
        <div class="purchase-values">
          <div class="pv-total">${l(e.valorAPagar)}</div>
          <div class="pv-sub">Desc: ${l(e.descontoTotal)}</div>
        </div>
        <svg class="chevron" id="chev-${e.id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      <div class="purchase-details" id="detail-${e.id}">
        <div class="details-toolbar">
          <span class="card-subtext">Pagamentos: Alimentação ${l((a=e.formasPagamento)==null?void 0:a.valeAlimentacao)} · Crédito ${l((o=e.formasPagamento)==null?void 0:o.cartaoCredito)} · Débito ${l((s=e.formasPagamento)==null?void 0:s.cartaoDebito)}</span>
          <button class="btn-danger" onclick="confirmarExcluirMercado('${e.id}')">🗑️ Excluir</button>
        </div>
        ${ee(e)}
      </div>
    </div>`}).join("")}function ee(t){return!t.itens||!t.itens.length?'<p class="card-subtext">Nenhum item detalhado registrado.</p>':`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Item</th><th>Marca</th><th class="num">Qtd</th><th class="num">Vl. Unit.</th><th class="num">Vl. Total</th></tr></thead>
    <tbody>${t.itens.map(e=>`<tr>
      <td>${e.nome}</td>
      <td><span class="badge amber">${e.marca||"—"}</span></td>
      <td class="num">${e.quantidade} ${e.unidade||"Un"}</td>
      <td class="num">${l(e.valorUnitario)}</td>
      <td class="num"><strong>${l(e.valorTotal)}</strong></td>
    </tr>`).join("")}</tbody>
  </table></div>`}window.toggleDetail=function(t){const e=document.getElementById("detail-"+t),a=document.getElementById("chev-"+t);e&&e.classList.toggle("open"),a&&a.classList.toggle("open")};window.confirmarExcluirMercado=async function(t){if(confirm("Excluir esta compra de mercado?"))try{await at(B(y,dt,t)),g("🗑️ Compra excluída.")}catch(e){alert("Erro: "+e.message)}};function ae(){const t=document.getElementById("lista-comparacao"),e={};A.forEach(o=>{(o.itens||[]).forEach(s=>{var n;const r=((n=s.nome)==null?void 0:n.toLowerCase().trim())||"produto";e[r]||(e[r]={nome:s.nome,marca:s.marca,hist:{}}),e[r].hist[o.mesAno]=s.valorUnitario})});const a=Object.values(e);if(!a.length){t.innerHTML='<div class="empty-state">Adicione notas para ver a comparação de preços unitários.</div>';return}t.innerHTML=`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Produto</th><th>Marca</th><th>Histórico (Unitário)</th><th>Variação</th></tr></thead>
    <tbody>${a.map(o=>{const s=Object.keys(o.hist).sort();let r=s.map(d=>`${d}: <strong>${l(o.hist[d])}</strong>`).join(" → "),n='<span class="badge cyan">Estável</span>';if(s.length>=2){const d=o.hist[s[s.length-2]],i=o.hist[s[s.length-1]]-d,u=(i/d*100).toFixed(1);i>.01?n=`<span class="badge red">+${u}% ↑</span>`:i<-.01&&(n=`<span class="badge green">${u}% ↓</span>`)}return`<tr><td><strong>${o.nome}</strong></td><td><span class="badge amber">${o.marca||"—"}</span></td><td>${r}</td><td>${n}</td></tr>`}).join("")}</tbody>
  </table></div>`}function oe(){const t=document.getElementById("lista-recorrencia"),e=document.getElementById("lista-marcas"),a={},o={};A.forEach(n=>{(n.itens||[]).forEach(d=>{var p;const m=(p=d.nome)==null?void 0:p.toLowerCase().trim();if(!m)return;a[m]||(a[m]={nome:d.nome,marca:d.marca,qtd:0,notas:0,units:[]}),a[m].qtd+=d.quantidade||1,a[m].notas+=1,a[m].units.push(d.valorUnitario||0);const i=(d.nome||"").split(" ")[0].toUpperCase();o[i]||(o[i]={});const u=d.marca||"Genérica";o[i][u]||(o[i][u]=[]),o[i][u].push(d.valorUnitario||0)})});const s=Object.values(a).filter(n=>n.notas>1).sort((n,d)=>d.notas-n.notas);t.innerHTML=s.length?`<div class="table-responsive"><table class="custom-table">
        <thead><tr><th>Item</th><th>Marca</th><th>Compras</th><th class="num">Qtd Total</th><th class="num">Média Unitária</th></tr></thead>
        <tbody>${s.map(n=>{const d=n.units.reduce((m,i)=>m+i,0)/n.units.length;return`<tr>
            <td><strong>${n.nome}</strong></td>
            <td><span class="badge amber">${n.marca||"—"}</span></td>
            <td><span class="badge green">${n.notas}x</span></td>
            <td class="num">${n.qtd}</td>
            <td class="num">${l(d)}</td>
          </tr>`}).join("")}</tbody>
      </table></div>`:'<div class="empty-state">Adicione notas para ver a recorrência de itens.</div>';const r=Object.entries(o).filter(([,n])=>Object.keys(n).length>1).map(([n,d])=>{let m=1/0,i="";const u=Object.entries(d).map(([p,w])=>{const E=w.reduce((b,x)=>b+x,0)/w.length;return E<m&&(m=E,i=p),{marca:p,med:E}});return`<div class="brand-card">
      <div class="brand-card-header">
        <span class="card-title">${n}</span>
        <span class="badge green">🏆 Menor preço: ${i} (${l(m)}/un)</span>
      </div>
      <div class="brands-row">
        ${u.map(p=>`<div class="brand-chip${p.marca===i?" best":""}">
          <div class="bc-name">${p.marca} ${p.marca===i?"✅":""}</div>
          <div class="bc-val">${l(p.med)}<span style="font-size:.7rem;font-weight:400">/un</span></div>
        </div>`).join("")}
      </div>
    </div>`}).join("");e.innerHTML=r||'<div class="empty-state">Ao comprar o mesmo tipo de produto com marcas diferentes, o sistema mostrará qual teve menor preço.</div>'}document.getElementById("btn-modal-close").addEventListener("click",()=>{document.getElementById("modal-cors").classList.remove("active")});
