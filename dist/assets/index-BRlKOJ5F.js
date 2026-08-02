import{initializeApp as St}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";import{getFirestore as Dt,onSnapshot as X,query as Ft,collection as V,orderBy as qt,doc as O,setDoc as nt,addDoc as st,deleteDoc as rt,serverTimestamp as ft}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function a(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(s){if(s.ep)return;s.ep=!0;const i=a(s);fetch(s.href,i)}})();const ht=document.createElement("script");ht.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js";document.head.appendChild(ht);const bt=document.createElement("script");bt.src="https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js";document.head.appendChild(bt);const Rt={apiKey:"AIzaSyANpFnEIkyN1XCT6qbtmVR9wx7sQHEsyrE",authDomain:"comprasmercado-23913.firebaseapp.com",projectId:"comprasmercado-23913",storageBucket:"comprasmercado-23913.firebasestorage.app",messagingSenderId:"317518149234",appId:"1:317518149234:web:94f38624d68a2b9a6634eb",measurementId:"G-2XP88EK37S"},Ot=St(Rt),$=Dt(Ot),it="compras",W="entradas",dt="faturas",yt="reservas";let w=[],S=[],j=[],ot={metaMensal:0,valorAtualGuardado:0},at=null,D=null,M=[],Z=0,_=!1,R=[];function c(t){return Number(t||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}function y(t){if(typeof t=="number")return t;if(!t)return 0;const e=parseFloat(String(t).replace(/R\$\s?/gi,"").replace(/\s/g,"").replace(/\./g,"").replace(",","."));return isNaN(e)?0:e}function ct(t){if(!t)return"—";try{return new Date(t).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}catch{return t}}function f(t,e=3500){const a=document.getElementById("toast");a.textContent=t,a.classList.add("show"),setTimeout(()=>a.classList.remove("show"),e)}function I(t,e="var(--accent-amber)"){const a=document.getElementById("status-msg");a&&(a.textContent=t,a.style.color=e)}function Pt(t){if(!t)return new Date().toISOString().slice(0,16);try{const e=new Date(t);if(isNaN(e.getTime()))return new Date().toISOString().slice(0,16);const a=o=>String(o).padStart(2,"0");return`${e.getFullYear()}-${a(e.getMonth()+1)}-${a(e.getDate())}T${a(e.getHours())}:${a(e.getMinutes())}`}catch{return new Date().toISOString().slice(0,16)}}function Nt(t,e){let a=0;const o=new Date(t,e+1,0).getDate();for(let s=1;s<=o;s++){const i=new Date(t,e,s).getDay();i!==0&&i!==6&&a++}return a}window.goTab=function(t){document.querySelectorAll(".tab-content").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".desktop-nav .nav-item").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".mobile-nav .mob-btn").forEach(a=>a.classList.remove("active"));const e=document.getElementById("tab-"+t);e&&e.classList.add("active"),document.querySelectorAll(`[data-tab="${t}"]`).forEach(a=>a.classList.add("active"))};document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>goTab(t.getAttribute("data-tab")))});document.querySelectorAll(".sub-item").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".sub-item").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".sub-tab-content").forEach(a=>a.style.display="none"),t.classList.add("active");const e=document.getElementById("sub-"+t.getAttribute("data-sub"));e&&(e.style.display="block")})});function Et(){document.getElementById("modal-add-nota").classList.add("active")}function It(){_&&mt(),document.getElementById("modal-add-nota").classList.remove("active")}var pt;(pt=document.getElementById("btn-open-modal-home"))==null||pt.addEventListener("click",Et);var gt;(gt=document.getElementById("btn-mercado-add-nota"))==null||gt.addEventListener("click",Et);var vt;(vt=document.getElementById("btn-close-modal-add"))==null||vt.addEventListener("click",It);X(Ft(V($,it),qt("dataEmissao","desc")),t=>{w=t.docs.map(e=>({id:e.id,...e.data()})),tt()},t=>console.error("Firestore Mercado:",t));X(V($,W),t=>{S=t.docs.map(e=>({id:e.id,...e.data()})),tt()},t=>console.error("Firestore Entradas:",t));X(V($,dt),t=>{j=t.docs.map(e=>({id:e.id,...e.data()})),tt()},t=>console.error("Firestore Faturas:",t));X(O($,yt,"config"),t=>{t.exists()&&(ot=t.data()),tt()},t=>console.error("Firestore Reservas:",t));function tt(){Ut(),kt(),Gt(),Zt(),Xt(),ee(),ae(),Yt()}function Ut(){let t=S.reduce((r,u)=>r+(u.valor||0),0),e=j.reduce((r,u)=>r+(u.valor||0),0),a=0,o=0,s=0,i=0,n=0;const d={};w.forEach(r=>{const u=r.valorAPagar||0;i+=r.descontoTotal||0,n+=r.qtdTotalItens||0,r.formasPagamento&&(o+=r.formasPagamento.valeAlimentacao||0,s+=r.formasPagamento.cartaoCredito||0,a+=r.formasPagamento.cartaoDebito||0);const p=r.mesAno||"Outros";d[p]=(d[p]||0)+u});let l=t-e-a;document.getElementById("fin-total-entradas").textContent=c(t),document.getElementById("fin-total-cartoes").textContent=c(e),document.getElementById("fin-mercado-debito").textContent=c(a),document.getElementById("fin-saldo-liquido").textContent=c(l),document.getElementById("dash-alimentacao").textContent=c(o),document.getElementById("dash-credito").textContent=c(s),document.getElementById("dash-debito").textContent=c(a),$t(d)}function $t(t){var i;if(typeof Chart>"u")return setTimeout(()=>$t(t),300);const e=(i=document.getElementById("chart-barras"))==null?void 0:i.getContext("2d");if(!e)return;const a=Object.keys(t).sort(),o=a.map(n=>{const[d,l]=n.split("-");return`${l}/${d}`}),s=a.map(n=>t[n]);at&&at.destroy(),at=new Chart(e,{type:"bar",data:{labels:o.length?o:["Sem compras"],datasets:[{label:"Gasto Mercado R$",data:s.length?s:[0],backgroundColor:"rgba(16,185,129,0.78)",borderColor:"#10b981",borderWidth:2,borderRadius:8}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:n=>` ${c(n.raw)}`}}},scales:{y:{beginAtZero:!0,grid:{color:"rgba(255,255,255,.05)"},ticks:{color:"#94a3b8",callback:n=>"R$"+n}},x:{grid:{display:!1},ticks:{color:"#94a3b8"}}}}})}function xt(t){if(!t)return 0;const e=t.match(/L[íi]quido(?:\s*a\s*receber)?\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/TOTAL\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/SAL[ÁA]RIO\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/VALOR\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i);return e?y(e[1]):0}document.getElementById("form-holerite-victor").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-holerite-txt-victor").value;let a=parseFloat(document.getElementById("inp-salario-val-victor").value)||0;if(!a&&e&&(a=xt(e)),!a){f("⚠️ Digite ou cole um holerite válido com valor.");return}await nt(O($,W,"salario_victor"),{pessoa:"Victor",tipo:"holerite",descricao:"Salário Líquido Victor",valor:a,data:new Date().toISOString()}),f("✅ Salário do Victor salvo!")});document.getElementById("form-holerite-maria").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-holerite-txt-maria").value;let a=parseFloat(document.getElementById("inp-salario-val-maria").value)||0;if(!a&&e&&(a=xt(e)),!a){f("⚠️ Digite ou cole um holerite válido com valor.");return}await nt(O($,W,"salario_maria"),{pessoa:"Maria",tipo:"holerite",descricao:"Salário Líquido Maria",valor:a,data:new Date().toISOString()}),f("✅ Salário da Maria salvo!")});document.getElementById("form-entrada-manual").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-ent-desc").value.trim(),a=parseFloat(document.getElementById("inp-ent-val").value)||0,o=document.getElementById("inp-ent-pessoa").value;!e||!a||(await st(V($,W),{pessoa:o,tipo:"manual",descricao:e,valor:a,data:new Date().toISOString()}),t.target.reset(),f("🎉 Entrada manual registrada!"))});function kt(){var s,i;const t=((s=S.find(n=>n.id==="salario_victor"))==null?void 0:s.valor)||0,e=((i=S.find(n=>n.id==="salario_maria"))==null?void 0:i.valor)||0,a=S.reduce((n,d)=>n+(d.valor||0),0);document.getElementById("val-salario-victor").textContent=c(t),document.getElementById("val-salario-maria").textContent=c(e),document.getElementById("val-entradas-combinado").textContent=c(a);const o=document.getElementById("lista-entradas-registradas");if(!S.length){o.innerHTML='<div class="empty-state">Nenhuma entrada cadastrada ainda.</div>';return}o.innerHTML=`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Descrição</th><th>Pessoa</th><th>Tipo</th><th class="num">Valor</th><th>Ação</th></tr></thead>
    <tbody>${S.map(n=>`<tr>
      <td><strong>${n.descricao}</strong></td>
      <td><span class="badge ${n.pessoa==="Victor"?"green":n.pessoa==="Maria"?"purple":"cyan"}">${n.pessoa}</span></td>
      <td><span class="badge amber">${n.tipo==="holerite"?"Holerite":"Manual"}</span></td>
      <td class="num" style="color:#34d399"><strong>${c(n.valor)}</strong></td>
      <td><button class="btn-danger" onclick="excluirEntrada('${n.id}')">🗑️</button></td>
    </tr>`).join("")}</tbody>
  </table></div>`}window.excluirEntrada=async function(t){confirm("Excluir esta entrada?")&&(await rt(O($,W,t)),f("🗑️ Entrada removida."))};let lt="Nubank",q=null;function jt(){const t=document.getElementById("inp-fatura-vencimento");if(t&&!t.value){const e=new Date,a=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0");t.value=`${a}-${o}-10`,atualizarMesRefFatura()}}setTimeout(jt,300);window.atualizarMesRefFatura=function(){const t=document.getElementById("inp-fatura-vencimento"),e=document.getElementById("lbl-fatura-mes-ref");if(!(!t||!e))if(t.value){const[a,o]=t.value.split("-"),i=new Date(parseInt(a),parseInt(o)-1,1).toLocaleString("pt-BR",{month:"long"});e.textContent=`Fatura ${i.charAt(0).toUpperCase()+i.slice(1)}/${a}`}else e.textContent="Mês da Fatura"};window.selecionarCartaoFatura=function(t){lt=t,document.querySelectorAll(".btn-card-select").forEach(a=>a.classList.remove("active"));const e=document.querySelector(`.btn-card-select[data-card="${t}"]`);e&&e.classList.add("active"),f(`Cartão selecionado: ${t}`)};window.handleFileFaturaSelect=async function(t){const e=t.target.files[0];if(!e)return;const a=document.getElementById("txt-file-fatura");a&&(a.textContent=`📄 Arquivo: ${e.name}`),f(`⏳ Lendo arquivo da fatura (${e.name})...`);let o="";if(e.type==="application/pdf"||e.name.endsWith(".pdf"))o=await Vt(e);else try{o=await e.text()}catch{o=""}o?(document.getElementById("inp-fatura-txt").value=o,await wt(o,lt)):f("❌ Não foi possível ler o texto do arquivo da fatura.")};async function Vt(t){try{const e=await t.arrayBuffer();if(typeof pdfjsLib>"u")return f("⚠️ Aguarde a biblioteca de PDF carregar..."),"";pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";const a=await pdfjsLib.getDocument({data:e}).promise;let o="";for(let s=1;s<=a.numPages;s++){const n=await(await a.getPage(s)).getTextContent();let d=null,l="";for(const r of n.items){if(!r.str)continue;const u=r.transform?r.transform[5]:null;d!==null&&Math.abs(u-d)>3?l+=`
`:l.length>0&&!l.endsWith(`
`)&&!l.endsWith(" ")&&(l+=" "),l+=r.str,d=u}o+=l+`
`}return o}catch(e){return console.error("Erro ao ler PDF:",e),""}}function zt(t){if(!t)return null;const e=t.match(/Data\s*de\s*vencimento\s*[:\s]*(\d{2})\s+([A-Za-z]{3})\s+(\d{4})/i)||t.match(/Vencimento\s*[:\s]*(\d{2}[\/\.-]\d{2}[\/\.-]\d{4})/i)||t.match(/FATURA\s+(\d{2})\s+([A-Za-z]{3})\s+(\d{4})/i);if(e){if(e[2]&&e[3]){const a=e[1],o=e[2].toUpperCase(),s=e[3],n={JAN:"01",FEB:"02",MAR:"03",ABR:"04",APR:"04",MAI:"05",MAY:"05",JUN:"06",JUL:"07",AGO:"08",AUG:"08",SET:"09",SEP:"09",OUT:"10",OCT:"10",NOV:"11",DEZ:"12",DEC:"12"}[o]||"07";return`${s}-${n}-${a.padStart(2,"0")}`}else if(e[1]){const[a,o,s]=e[1].split(/[\/\.-]/);return`${s}-${o.padStart(2,"0")}-${a.padStart(2,"0")}`}}return null}window.importarFaturaManualOuArquivo=async function(){const t=document.getElementById("inp-fatura-txt").value.trim();if(!t){f("⚠️ Selecione o arquivo da fatura (.pdf, .csv) ou cole o texto da fatura.");return}await wt(t,lt)};async function wt(t,e){const a=zt(t);a&&(document.getElementById("inp-fatura-vencimento").value=a,atualizarMesRefFatura());const o=Ht(t);if(!o.length){f(`⚠️ Nenhuma compra individual identificada na fatura do ${e}.`);return}const s=o.reduce((r,u)=>r+u.valor,0),i=document.getElementById("inp-fatura-vencimento").value||new Date().toISOString().slice(0,10),n=i.slice(0,7);q={cartao:e,dataVencimento:i,mesAno:n,valorTotal:s,qtdItens:o.length,itens:o},document.getElementById("badge-total-preview-fatura").textContent=c(s);const d=document.getElementById("lista-preview-fatura-itens");d.innerHTML=o.map(r=>`
    <div style="display:flex; justify-content:space-between; padding:.35rem 0; border-bottom:1px dashed var(--border-color); font-size:.82rem;">
      <span><strong>${r.dataCompra}</strong> — ${r.descricao}</span>
      <span style="color:#fb7185; font-weight:700;">${c(r.valor)}</span>
    </div>
  `).join("");const l=document.getElementById("box-revisao-fatura");l.style.display="block",l.scrollIntoView({behavior:"smooth"}),f(`✅ ${o.length} compras encontradas na fatura (${c(s)})! Confira e salve.`)}window.confirmarEGravarFaturaDocumento=async function(){if(!q)return;const t=document.getElementById("inp-fatura-vencimento").value||new Date().toISOString().slice(0,10);q.dataVencimento=t,q.mesAno=t.slice(0,7);try{await st(V($,dt),{...q,createdAt:ft()}),document.getElementById("box-revisao-fatura").style.display="none",document.getElementById("inp-fatura-txt").value="";const e=document.getElementById("txt-file-fatura");e&&(e.textContent="Clique para Selecionar o Arquivo da Fatura");const a=c(q.valorTotal);q=null,f(`🎉 Fatura de ${a} salva com sucesso!`)}catch(e){alert("Erro ao salvar fatura: "+e.message)}};function Ht(t){if(!t)return[];const e=[];if(t.split(`
`).forEach(i=>{const n=i.trim();if(!n||/EMISS[ÃA]O|TRANSA[ÇC][ÕO]ES|RESUMO|PAGAMENTO DE FATURA|TOTAL DA FATURA|FATURA ANTERIOR|SALDO ANTERIOR|LIMITE DISPON[ÍI]VEL|OPÇÕES DE PAGAMENTO|ALTERNATIVAS DE PAGAMENTO/i.test(n))return;const d=n.match(/^(?:\d+\s+)?(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+R?\$\s*([\d\.,]+)$/i)||n.match(/(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+R?\$\s*([\d\.,]+)/i);if(d){const l=d[1],r=d[2].trim(),u=y(d[3]);r&&u>0&&r.length>2&&!/fatura|limite|pagamento|saldo|alternativas|opções/i.test(r)&&e.push({dataCompra:l,descricao:r,valor:u})}}),e.length>0)return e;const o=/(\b\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\b\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+R?\$\s*([\d\.,]+)/gi;let s;for(;(s=o.exec(t))!==null;){const i=s[1],n=s[2].trim(),d=y(s[3]);n&&d>0&&n.length>2&&!/fatura|limite|pagamento|saldo|alternativas|opções|período|emissão/i.test(n)&&e.push({dataCompra:i,descricao:n,valor:d})}if(e.length===0){const i=t.match(/no\s*valor\s*de\s*R?\$\s*([\d\.,]+)/i)||t.match(/Valor\s*total\s*da\s*fatura\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/Total\s*da\s*fatura\s*[:\s]*R?\$\s*([\d\.,]+)/i);if(i){const n=y(i[1]);n>0&&e.push({dataCompra:"Fatura Mês",descricao:"Fatura do Cartão (Total Consolidado)",valor:n})}}return e}function Gt(){const t=j.reduce((a,o)=>a+(o.valorTotal!==void 0?o.valorTotal:o.valor||0),0);document.getElementById("badge-total-cartoes").textContent=`${c(t)} total`;const e=document.getElementById("lista-faturas-registradas");if(!j.length){e.innerHTML='<div class="empty-state">Nenhuma fatura cadastrada ainda.</div>';return}e.innerHTML=j.map(a=>{var u;const o=a.valorTotal!==void 0?a.valorTotal:a.valor||0,s=a.cartao||"Cartão",i=s.toLowerCase().includes("nubank"),n=i?"purple":"red",d=i?"🟣":"🔴",l=a.dataVencimento?ct(a.dataVencimento).split(",")[0]:"—",r=a.mesAno||"—";return`
      <div class="purchase-card">
        <div class="purchase-header" onclick="toggleDetail('fat-${a.id}')">
          <div class="purchase-info">
            <h3><span class="badge ${n}">${d} ${s}</span> — Vencimento: ${l}</h3>
            <p>📅 Mês Referência: <strong>${r}</strong> &nbsp;•&nbsp; 🛒 ${a.qtdItens||((u=a.itens)==null?void 0:u.length)||1} itens contemplados</p>
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
      <thead><tr><th>Data Compra</th><th>Descrição do Lançamento</th><th class="num">Valor</th></tr></thead>
      <tbody>${t.itens.map(e=>`<tr>
        <td><strong>${e.dataCompra||"—"}</strong></td>
        <td>${e.descricao}</td>
        <td class="num" style="color:#fb7185"><strong>${c(e.valor)}</strong></td>
      </tr>`).join("")}</tbody>
    </table></div>`:`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Descrição</th><th class="num">Valor</th></tr></thead>
    <tbody><tr>
      <td>${t.descricao||"Fatura do Cartão"}</td>
      <td class="num" style="color:#fb7185"><strong>${c(t.valor||t.valorTotal)}</strong></td>
    </tr></tbody>
  </table></div>`}window.excluirFaturaDocumento=async function(t){confirm("Excluir esta fatura e todos os seus lançamentos?")&&(await rt(O($,dt,t)),f("🗑️ Fatura removida com sucesso."))};document.getElementById("form-config-reservas").addEventListener("submit",async t=>{t.preventDefault();const e=parseFloat(document.getElementById("inp-meta-mensal").value)||0,a=parseFloat(document.getElementById("inp-saldo-guardado").value)||0;await nt(O($,yt,"config"),{metaMensal:e,valorAtualGuardado:a,dataAtualizacao:new Date().toISOString()}),f("✅ Reservas e economias atualizadas!")});function Yt(){const t=ot.metaMensal||0,e=ot.valorAtualGuardado||0;document.getElementById("val-meta-reserva").textContent=c(t),document.getElementById("val-real-guardado").textContent=c(e);const a=S.reduce((r,u)=>r+(u.valor||0),0),o=j.reduce((r,u)=>r+(u.valor||0),0);let s=0;w.forEach(r=>{r.formasPagamento&&(s+=r.formasPagamento.cartaoDebito||0)});const i=a-o-s,n=i>0?Math.max(i*.5,a*.2):0;document.getElementById("val-recomendacao-reserva").textContent=c(n);const d=document.getElementById("box-analise-reserva-detalhes");if(a===0){d.innerHTML='<p class="empty-state">Cadastre seus salários e entradas na aba "Salários & Entradas" para gerar o diagnóstico inteligente de economias.</p>';return}const l=t>0?Math.min(100,e/t*100).toFixed(1):0;d.innerHTML=`
    <p> Com base nos seus <strong>${c(a)}</strong> de Entradas, <strong>${c(o)}</strong> de Faturas de Cartão e <strong>${c(s)}</strong> de Mercado no Débito:</p>
    <div style="background:rgba(15,23,42,0.6);padding:1rem;border-radius:10px;margin:.75rem 0;border:1px solid var(--border-color)">
      <div style="display:flex;justify-content:space-between;margin-bottom:.4rem">
        <span>💰 Saldo Livre em Conta: <strong>${c(i)}</strong></span>
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
  `}function Zt(){const t=document.getElementById("lista-mensal-container");if(!t)return;const e=new Date,a=new Date(e.getFullYear(),e.getMonth()+1,1),o=a.toLocaleString("pt-BR",{month:"long"}),s=a.getFullYear(),i=`${o.charAt(0).toUpperCase()+o.slice(1)} de ${s}`,n=Nt(a.getFullYear(),a.getMonth()),d=31.8,l=20,r=n*d,u=n*l,p={};let x=0;w.forEach(m=>{const g=m.valorAPagar||0;x+=g;const v=m.mesAno||"Outros";p[v]=(p[v]||0)+g});const b=Math.max(1,Object.keys(p).length),h=x/b,E={};w.forEach(m=>{(m.itens||[]).forEach(g=>{const v=(g.nome||"").toLowerCase().trim();v&&(E[v]||(E[v]={nome:g.nome,marca:g.marca||"Geral",qtdTotal:0,frequenciaNotas:0,valoresUnitarios:[]}),E[v].qtdTotal+=g.quantidade||1,E[v].frequenciaNotas+=1,g.valorUnitario&&E[v].valoresUnitarios.push(g.valorUnitario))})});const B=Object.values(E).map(m=>{const g=m.valoresUnitarios.length>0?m.valoresUnitarios.reduce((Y,K)=>Y+K,0)/m.valoresUnitarios.length:0,v=m.qtdTotal/b,k=b/Math.max(1,m.frequenciaNotas),J=m.frequenciaNotas/b;let C=0;J>=.35||v>=.7?C=Math.ceil(v):C=Math.round(v),C<1&&m.frequenciaNotas>=b&&(C=1);const Q=C*g;return{nome:m.nome,marca:m.marca,frequenciaNotas:m.frequenciaNotas,intervaloMeses:k,qtdMensalTaxa:v,totalEstimadoUnidades:C,valorUnitario:g,subtotalCalculado:Q}}).filter(m=>m.totalEstimadoUnidades>0);B.sort((m,g)=>g.frequenciaNotas-m.frequenciaNotas);const A=B.reduce((m,g)=>m+g.subtotalCalculado,0),z=h>0?h*1.05:A;let H=1;A>z&&h>0&&(H=z/A);const G=B.map(m=>({...m,subtotalFinal:m.subtotalCalculado*H})),P=h>0?Math.min(A,z):A;let T=P;const N=Math.min(T,r);T-=N;const U=Math.min(T,u);T-=U;const F=T>0?T:0;let L=`
    <div class="card" style="margin-bottom:1.5rem; background: linear-gradient(135deg, rgba(30,41,59,0.9), rgba(15,23,42,0.95)); border: 1px solid #3b82f6;">
      <div class="card-header">
        <div>
          <span class="card-title" style="color:#60a5fa;">📅 Previsão de Compras — ${i}</span>
          <p class="card-subtext" style="color:#cbd5e1; margin-top:0.25rem;">
            Calculado com unidades inteiras exatas (${n} dias úteis em ${o}).
          </p>
        </div>
        <span class="badge green" style="font-size:0.8rem; padding:0.4rem 0.75rem;">${n} Dias Úteis</span>
      </div>

      <div class="payment-grid" style="margin-top:1rem;">
        <div class="payment-item" style="border-color: rgba(16,185,129,0.4);">
          <div class="p-label">🍽️ Vale Alimentação (${n}d × R$ 31,80)</div>
          <div class="p-val" style="color:#34d399;">${c(N)} <span style="font-size:0.75rem;font-weight:normal;color:var(--text-muted)">/ ${c(r)}</span></div>
        </div>
        <div class="payment-item" style="border-color: rgba(99,102,241,0.4);">
          <div class="p-label">💳 Cartão Crédito (${n}d × R$ 20,00)</div>
          <div class="p-val" style="color:#818cf8;">${c(U)} <span style="font-size:0.75rem;font-weight:normal;color:var(--text-muted)">/ ${c(u)}</span></div>
        </div>
        <div class="payment-item" style="border-color: ${F>0?"rgba(244,63,94,0.5)":"var(--border-color)"};">
          <div class="p-label">💳 Débito Necessário (Excedente)</div>
          <div class="p-val" style="color: ${F>0?"#fb7185":"var(--text-muted)"};">${c(F)}</div>
        </div>
      </div>

      <div style="margin-top:1.25rem; padding-top:1rem; border-top:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
        <div>
          <span style="font-size:0.85rem; color:var(--text-muted);">Total Estimado da Lista de Compras:</span>
          <p style="font-size:0.75rem; color:#60a5fa;">Média Histórica de Gastos: ${c(h)}</p>
        </div>
        <span style="font-size:1.6rem; font-weight:800; color:var(--primary);">${c(P)}</span>
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
  `;window.dadosListaMensalCache={mesAnoStr:i,diasUteis:n,totalGeralEstimado:P,cobertoAlim:N,cobertoCred:U,cobertoDeb:F,alimDisponivel:r,credDisponivel:u,lista:G},G.length===0?L+='<div class="empty-state">Adicione notas fiscais para que o sistema gere automaticamente sua lista mensal de compras.</div></div>':L+=`
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
            ${G.map(m=>{const g=m.intervaloMeses>1.2?`A cada ${m.intervaloMeses.toFixed(1)} meses`:`Todo mês (${m.frequenciaNotas}x)`,v=m.qtdMensalTaxa<1?m.qtdMensalTaxa.toFixed(2):m.qtdMensalTaxa.toFixed(1),k=m.totalEstimadoUnidades.toFixed(1);return`
                <tr>
                  <td><strong>${m.nome}</strong></td>
                  <td><span class="badge amber">${m.marca}</span></td>
                  <td><span class="badge cyan">${g}</span></td>
                  <td class="num">${v} un/mês</td>
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
    </div>`,t.innerHTML=L}window.exportarPDFListaMensal=function(){if(!window.dadosListaMensalCache||!window.dadosListaMensalCache.lista.length){f("⚠️ Nenhuma lista mensal disponível para exportar.");return}const{mesAnoStr:t,diasUteis:e,totalGeralEstimado:a,cobertoAlim:o,cobertoCred:s,cobertoDeb:i,lista:n}=window.dadosListaMensalCache,d=window.open("","_blank","width=900,height=750");if(!d){alert("Permita pop-ups no navegador para gerar o PDF da lista.");return}const l=`
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
          <div class="val">${c(i)}</div>
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
          ${n.map(r=>`
            <tr>
              <td class="check-col"><div class="chk-box"></div></td>
              <td><strong>${r.nome}</strong></td>
              <td>${r.marca}</td>
              <td class="num"><strong>${r.totalEstimadoUnidades.toFixed(1)} un</strong></td>
              <td class="num">${c(r.valorUnitario)}</td>
              <td class="num"><strong>${c(r.subtotalFinal)}</strong></td>
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
  `;d.document.open(),d.document.write(l),d.document.close()};document.getElementById("btn-start-cam").addEventListener("click",At);document.getElementById("btn-switch-cam").addEventListener("click",_t);document.getElementById("btn-stop-cam").addEventListener("click",mt);async function At(){if(typeof Html5Qrcode>"u")return I("Carregando biblioteca de câmera, aguarde..."),setTimeout(At,600);try{D||(D=new Html5Qrcode("qr-reader")),M=await Html5Qrcode.getCameras();let t;if(M&&M.length>0){const e=M.findIndex(a=>/back|traseira|rear|environment/i.test(a.label));Z=e>=0?e:0,t=M[Z].id}else t={facingMode:"environment"};await D.start(t,{fps:10,qrbox:{width:240,height:240}},Ct,()=>{}),_=!0,document.getElementById("btn-start-cam").style.display="none",document.getElementById("btn-switch-cam").style.display=M.length>1?"inline-flex":"none",document.getElementById("btn-stop-cam").style.display="inline-flex"}catch(t){I("❌ Não foi possível acessar a câmera. Verifique as permissões do navegador."),console.error(t)}}async function _t(){if(!(!D||!_))try{await D.stop(),M.length>1&&(Z=(Z+1)%M.length,await D.start(M[Z].id,{fps:10,qrbox:{width:240,height:240}},Ct,()=>{}))}catch(t){console.error("switchCam:",t)}}async function mt(){if(D&&_)try{await D.stop()}catch{}_=!1,document.getElementById("btn-start-cam").style.display="inline-flex",document.getElementById("btn-switch-cam").style.display="none",document.getElementById("btn-stop-cam").style.display="none"}async function Ct(t){mt(),document.getElementById("inp-url").value=t,I("✅ QR Code lido! Processando..."),await Bt(t)}document.getElementById("btn-carregar-dados").addEventListener("click",async()=>{const t=document.getElementById("inp-url").value.trim(),e=document.getElementById("inp-html").value.trim();if(!t&&!e){I("⚠️ Cole a URL do QR Code ou o conteúdo da página para ler a nota fiscal.");return}if(t&&!e){I("⏳ Consultando nota fiscal..."),await Bt(t);return}if(e){I("⏳ Processando conteúdo..."),await Tt(e);return}});document.getElementById("btn-preencher-manual").addEventListener("click",()=>{Mt({nomeMercado:"",dataEmissao:new Date().toISOString(),valorTotal:0,descontoTotal:0,valorAPagar:0,qtdTotalItens:0,formasPagamento:{valeAlimentacao:0,cartaoCredito:0,cartaoDebito:0},itens:[]}),I("✍️ Preencha os dados da compra abaixo e clique em Salvar Nota Fiscal.","var(--accent-cyan)")});function Mt(t){var i,n,d;document.getElementById("inp-mercado").value=t.nomeMercado||"",document.getElementById("inp-data").value=Pt(t.dataEmissao),document.getElementById("inp-vtotal").value=t.valorTotal!==void 0?t.valorTotal:0,document.getElementById("inp-desconto").value=t.descontoTotal!==void 0?t.descontoTotal:0,document.getElementById("inp-pagar").value=t.valorAPagar!==void 0?t.valorAPagar:0,document.getElementById("inp-qtd").value=t.qtdTotalItens!==void 0?t.qtdTotalItens:0,document.getElementById("inp-alim").value=((i=t.formasPagamento)==null?void 0:i.valeAlimentacao)||0,document.getElementById("inp-cred").value=((n=t.formasPagamento)==null?void 0:n.cartaoCredito)||0,document.getElementById("inp-deb").value=((d=t.formasPagamento)==null?void 0:d.cartaoDebito)||0,R=t.itens||[];const e=document.getElementById("form-nfce");e.style.display="block";const a=document.getElementById("preview-itens-box"),o=document.getElementById("count-preview-itens"),s=document.getElementById("lista-preview-itens");R.length>0?(a.style.display="block",o.textContent=R.length,s.innerHTML=R.map(l=>`
      <div style="display:flex; justify-content:space-between; padding: 0.35rem 0; border-bottom: 1px dashed var(--border-color);">
        <span><strong>${l.nome}</strong> (${l.quantidade} ${l.unidade||"Un"})</span>
        <span>${c(l.valorUnitario)}/un = <strong>${c(l.valorTotal)}</strong></span>
      </div>
    `).join("")):a.style.display="none",e.scrollIntoView({behavior:"smooth"})}document.getElementById("form-nfce").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-mercado").value.trim()||"Mercado",a=document.getElementById("inp-data").value||new Date().toISOString(),o=parseFloat(document.getElementById("inp-vtotal").value)||0,s=parseFloat(document.getElementById("inp-desconto").value)||0,i=parseFloat(document.getElementById("inp-pagar").value)||0,n=parseInt(document.getElementById("inp-qtd").value)||0,d=parseFloat(document.getElementById("inp-alim").value)||0,l=parseFloat(document.getElementById("inp-cred").value)||0,r=parseFloat(document.getElementById("inp-deb").value)||0,u=new Date(a).toISOString().slice(0,16),p=w.find(h=>{const E=new Date(h.dataEmissao).toISOString().slice(0,16),B=Math.abs((h.valorAPagar||0)-i)<.05,A=(h.nomeMercado||"").toLowerCase().trim()===e.toLowerCase().trim();return E===u&&B&&A});if(p){I(`⚠️ Esta nota fiscal já existe no sistema (Cadastrada em ${ct(p.dataEmissao)} no valor de ${c(p.valorAPagar)}). Nota não adicionada!`,"#fb7185"),f("⚠️ Nota fiscal já cadastrada! Operação cancelada.");return}const x=new Date(a),b=`${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,"0")}`;I("⏳ Salvando nota fiscal no banco...");try{await st(V($,it),{nomeMercado:e,dataEmissao:a,mesAno:b,qtdTotalItens:n||R.length,valorTotal:o,descontoTotal:s,valorAPagar:i,formasPagamento:{valeAlimentacao:d,cartaoCredito:l,cartaoDebito:r},itens:R,createdAt:ft()}),I("✅ Nota salva com sucesso!","#34d399"),document.getElementById("form-nfce").style.display="none",document.getElementById("form-nfce").reset(),document.getElementById("inp-url").value="",document.getElementById("inp-html").value="",R=[],It(),goTab("dashboard"),f("🎉 Nota fiscal registrada no Firebase!")}catch(h){I("❌ Erro ao salvar: "+h.message,"#fb7185")}});async function Bt(t){const e=[a=>`https://api.allorigins.win/raw?url=${encodeURIComponent(a)}`,a=>`https://corsproxy.io/?${encodeURIComponent(a)}`];for(const a of e)try{const o=await fetch(a(t),{signal:AbortSignal.timeout(8e3)});if(o.ok){const s=await o.text();if(s&&s.length>200){await Tt(s);return}}}catch{}Wt(t)}function Wt(t){document.getElementById("modal-link").href=t,document.getElementById("modal-cors").classList.add("active"),I("⚠️ Abra o link, copie o conteúdo da página e cole no campo de texto abaixo.")}async function Tt(t){const e=Jt(t);Mt(e),I("✅ Nota lida com sucesso! Confira os valores abaixo e altere se necessário antes de Salvar.","#34d399")}function Jt(t){var N,U,F;const a=new DOMParser().parseFromString(t,"text/html"),o=((N=a.body)==null?void 0:N.textContent)||t;let s=((F=(U=a.querySelector(".txtTopo, .nomeEmit, h1"))==null?void 0:U.textContent)==null?void 0:F.trim())||"Mercado",i=new Date().toISOString();const n=o.match(/Emiss[ãa]o\s*[:\-]?\s*(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})?/i)||o.match(/(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})/);if(n){const[L,m,g]=n[1].split("/");i=`${g}-${m}-${L}T${n[2]||"12:00:00"}`}const d=o.match(/Qtd\.?\s*total\s*de\s*itens\s*[:\s]*([\d,\.]+)/i),l=o.match(/Valor\s*total\s*R\$\s*[:\s]*([\d\.,]+)/i),r=o.match(/Descontos?\s*R\$\s*[:\s]*([\d\.,]+)/i),u=o.match(/Valor\s*a\s*pagar\s*R\$\s*[:\s]*([\d\.,]+)/i)||o.match(/VALOR\s*PAGO\s*R\$\s*[:\s]*([\d\.,]+)/i),p=o.match(/(?:Vale\s*)?Alimenta[çc][ãa]o\s*[:\s]*([\d\.,]+)/i),x=o.match(/(?:Cart[ãa]o\s*de\s*)?Cr[eé]dito\s*[:\s]*([\d\.,]+)/i),b=o.match(/(?:Cart[ãa]o\s*de\s*)?D[eé]bito\s*[:\s]*([\d\.,]+)/i),h=d?y(d[1]):0,E=l?y(l[1]):0,B=r?y(r[1]):0;let A=u?y(u[1]):E-B;const z={valeAlimentacao:p?y(p[1]):0,cartaoCredito:x?y(x[1]):0,cartaoDebito:b?y(b[1]):0},H=[];a.querySelectorAll("tr, .item, .itemNota").forEach(L=>{var ut;const m=L.textContent;if(!/Vl\.\s*Unit|valorUnitario|Qtde?\./i.test(m))return;const g=L.querySelector(".txtTit, .txtTit2, .nomeProd"),v=((ut=g==null?void 0:g.textContent)==null?void 0:ut.trim())||"",k=m.match(/Qtde?\.\s*[:\s]*([\d,\.]+)/i),J=m.match(/Vl\.\s*Unit\.\s*[:\s]*([\d,\.]+)/i),C=m.match(/Vl\.\s*Total\s*([\d,\.]+)/i),Q=m.match(/C[oó]digo\s*[:\s]*(\d+)/i),Y=m.match(/UN\s*[:\s]*([A-Za-z]+)/i),K=k?y(k[1]):1,et=J?y(J[1]):0,Lt=C?y(C[1]):et*K;v&&et>0&&H.push({codigo:(Q==null?void 0:Q[1])||"",nome:v,marca:Kt(v),quantidade:K,unidade:(Y==null?void 0:Y[1])||"Un",valorUnitario:et,valorTotal:Lt})});const P=new Date(i),T=`${P.getFullYear()}-${String(P.getMonth()+1).padStart(2,"0")}`;return{nomeMercado:s,dataEmissao:i,mesAno:T,qtdTotalItens:h,valorTotal:E,descontoTotal:B,valorAPagar:A,formasPagamento:z,itens:H}}function Kt(t){const e=["BAUDUCCO","BAUD","PANCO","DANONE","NESTLE","QUALITA","SADIA","PERDIGAO","SEARA","CAMIL","TIO JOAO","URBANO","LIZA","SOYA","YPE","PILAO","MELITTA","3 CORACOES","VIGOR","PARMALAT","ITALAC","HEINZ","KRAFT"],a=t.toUpperCase();for(const o of e)if(a.includes(o))return o;return a.split(" ")[0]||"Genérica"}function Xt(){const t=document.getElementById("lista-historico");if(!w.length){t.innerHTML='<div class="empty-state">📭 Nenhuma compra cadastrada ainda.</div>';return}t.innerHTML=w.map(e=>{var a,o,s;return`
    <div class="purchase-card">
      <div class="purchase-header" onclick="toggleDetail('${e.id}')">
        <div class="purchase-info">
          <h3>${e.nomeMercado||"Mercado"}</h3>
          <p>📅 ${ct(e.dataEmissao)} &nbsp;•&nbsp; 🛒 ${e.qtdTotalItens||0} itens</p>
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
  </table></div>`}window.toggleDetail=function(t){const e=document.getElementById("detail-"+t),a=document.getElementById("chev-"+t);e&&e.classList.toggle("open"),a&&a.classList.toggle("open")};window.confirmarExcluirMercado=async function(t){if(confirm("Excluir esta compra de mercado?"))try{await rt(O($,it,t)),f("🗑️ Compra excluída.")}catch(e){alert("Erro: "+e.message)}};function ee(){const t=document.getElementById("lista-comparacao"),e={};w.forEach(o=>{(o.itens||[]).forEach(s=>{var n;const i=((n=s.nome)==null?void 0:n.toLowerCase().trim())||"produto";e[i]||(e[i]={nome:s.nome,marca:s.marca,hist:{}}),e[i].hist[o.mesAno]=s.valorUnitario})});const a=Object.values(e);if(!a.length){t.innerHTML='<div class="empty-state">Adicione notas para ver a comparação de preços unitários.</div>';return}t.innerHTML=`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Produto</th><th>Marca</th><th>Histórico (Unitário)</th><th>Variação</th></tr></thead>
    <tbody>${a.map(o=>{const s=Object.keys(o.hist).sort();let i=s.map(d=>`${d}: <strong>${c(o.hist[d])}</strong>`).join(" → "),n='<span class="badge cyan">Estável</span>';if(s.length>=2){const d=o.hist[s[s.length-2]],r=o.hist[s[s.length-1]]-d,u=(r/d*100).toFixed(1);r>.01?n=`<span class="badge red">+${u}% ↑</span>`:r<-.01&&(n=`<span class="badge green">${u}% ↓</span>`)}return`<tr><td><strong>${o.nome}</strong></td><td><span class="badge amber">${o.marca||"—"}</span></td><td>${i}</td><td>${n}</td></tr>`}).join("")}</tbody>
  </table></div>`}function ae(){const t=document.getElementById("lista-recorrencia"),e=document.getElementById("lista-marcas"),a={},o={};w.forEach(n=>{(n.itens||[]).forEach(d=>{var p;const l=(p=d.nome)==null?void 0:p.toLowerCase().trim();if(!l)return;a[l]||(a[l]={nome:d.nome,marca:d.marca,qtd:0,notas:0,units:[]}),a[l].qtd+=d.quantidade||1,a[l].notas+=1,a[l].units.push(d.valorUnitario||0);const r=(d.nome||"").split(" ")[0].toUpperCase();o[r]||(o[r]={});const u=d.marca||"Genérica";o[r][u]||(o[r][u]=[]),o[r][u].push(d.valorUnitario||0)})});const s=Object.values(a).filter(n=>n.notas>1).sort((n,d)=>d.notas-n.notas);t.innerHTML=s.length?`<div class="table-responsive"><table class="custom-table">
        <thead><tr><th>Item</th><th>Marca</th><th>Compras</th><th class="num">Qtd Total</th><th class="num">Média Unitária</th></tr></thead>
        <tbody>${s.map(n=>{const d=n.units.reduce((l,r)=>l+r,0)/n.units.length;return`<tr>
            <td><strong>${n.nome}</strong></td>
            <td><span class="badge amber">${n.marca||"—"}</span></td>
            <td><span class="badge green">${n.notas}x</span></td>
            <td class="num">${n.qtd}</td>
            <td class="num">${c(d)}</td>
          </tr>`}).join("")}</tbody>
      </table></div>`:'<div class="empty-state">Adicione notas para ver a recorrência de itens.</div>';const i=Object.entries(o).filter(([,n])=>Object.keys(n).length>1).map(([n,d])=>{let l=1/0,r="";const u=Object.entries(d).map(([p,x])=>{const b=x.reduce((h,E)=>h+E,0)/x.length;return b<l&&(l=b,r=p),{marca:p,med:b}});return`<div class="brand-card">
      <div class="brand-card-header">
        <span class="card-title">${n}</span>
        <span class="badge green">🏆 Menor preço: ${r} (${c(l)}/un)</span>
      </div>
      <div class="brands-row">
        ${u.map(p=>`<div class="brand-chip${p.marca===r?" best":""}">
          <div class="bc-name">${p.marca} ${p.marca===r?"✅":""}</div>
          <div class="bc-val">${c(p.med)}<span style="font-size:.7rem;font-weight:400">/un</span></div>
        </div>`).join("")}
      </div>
    </div>`}).join("");e.innerHTML=i||'<div class="empty-state">Ao comprar o mesmo tipo de produto com marcas diferentes, o sistema mostrará qual teve menor preço.</div>'}document.getElementById("btn-modal-close").addEventListener("click",()=>{document.getElementById("modal-cors").classList.remove("active")});
