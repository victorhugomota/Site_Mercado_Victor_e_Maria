import{initializeApp as zt}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";import{getFirestore as Ht,onSnapshot as ot,query as Gt,collection as j,orderBy as Qt,doc as D,setDoc as nt,addDoc as dt,deleteDoc as Z,serverTimestamp as pt}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function a(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(n){if(n.ep)return;n.ep=!0;const r=a(n);fetch(n.href,r)}})();const $t=document.createElement("script");$t.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js";document.head.appendChild($t);const It=document.createElement("script");It.src="https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js";document.head.appendChild(It);const Yt={apiKey:"AIzaSyANpFnEIkyN1XCT6qbtmVR9wx7sQHEsyrE",authDomain:"comprasmercado-23913.firebaseapp.com",projectId:"comprasmercado-23913",storageBucket:"comprasmercado-23913.firebasestorage.app",messagingSenderId:"317518149234",appId:"1:317518149234:web:94f38624d68a2b9a6634eb",measurementId:"G-2XP88EK37S"},_t=zt(Yt),x=Ht(_t),vt="compras",st="entradas",tt="faturas",et="boletos",Bt="reservas";let S=[],T=[],F=[],O=[],ut={metaMensal:0,valorAtualGuardado:0},mt=null,V=null,P=[],X=0,at=!1,G=[];function m(t){return Number(t||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}function C(t){if(typeof t=="number")return t;if(!t)return 0;const e=parseFloat(String(t).replace(/R\$\s?/gi,"").replace(/\s/g,"").replace(/\./g,"").replace(",","."));return isNaN(e)?0:e}function rt(t){if(!t)return"—";try{return new Date(t).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}catch{return t}}function g(t,e=3500){const a=document.getElementById("toast");a.textContent=t,a.classList.add("show"),setTimeout(()=>a.classList.remove("show"),e)}function M(t,e="var(--accent-amber)"){const a=document.getElementById("status-msg");a&&(a.textContent=t,a.style.color=e)}function Zt(t){if(!t)return new Date().toISOString().slice(0,16);try{const e=new Date(t);if(isNaN(e.getTime()))return new Date().toISOString().slice(0,16);const a=o=>String(o).padStart(2,"0");return`${e.getFullYear()}-${a(e.getMonth()+1)}-${a(e.getDate())}T${a(e.getHours())}:${a(e.getMinutes())}`}catch{return new Date().toISOString().slice(0,16)}}function Wt(t,e){let a=0;const o=new Date(t,e+1,0).getDate();for(let n=1;n<=o;n++){const r=new Date(t,e,n).getDay();r!==0&&r!==6&&a++}return a}window.goTab=function(t){document.querySelectorAll(".tab-content").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".desktop-nav .nav-item").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".mobile-nav .mob-btn").forEach(a=>a.classList.remove("active"));const e=document.getElementById("tab-"+t);e&&e.classList.add("active"),document.querySelectorAll(`[data-tab="${t}"]`).forEach(a=>a.classList.add("active"))};document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>goTab(t.getAttribute("data-tab")))});document.querySelectorAll(".sub-item").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".sub-item").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".sub-tab-content").forEach(a=>a.style.display="none"),t.classList.add("active");const e=document.getElementById("sub-"+t.getAttribute("data-sub"));e&&(e.style.display="block")})});function xt(){document.getElementById("modal-add-nota").classList.add("active")}function At(){at&&ft(),document.getElementById("modal-add-nota").classList.remove("active")}var bt;(bt=document.getElementById("btn-open-modal-home"))==null||bt.addEventListener("click",xt);var yt;(yt=document.getElementById("btn-mercado-add-nota"))==null||yt.addEventListener("click",xt);var Et;(Et=document.getElementById("btn-close-modal-add"))==null||Et.addEventListener("click",At);ot(Gt(j(x,vt),Qt("dataEmissao","desc")),t=>{S=t.docs.map(e=>({id:e.id,...e.data()})),W()},t=>console.error("Firestore Mercado:",t));ot(j(x,st),t=>{T=t.docs.map(e=>({id:e.id,...e.data()})),W()},t=>console.error("Firestore Entradas:",t));ot(j(x,tt),t=>{F=t.docs.map(e=>({id:e.id,...e.data()})),W()},t=>console.error("Firestore Faturas:",t));ot(j(x,et),t=>{O=t.docs.map(e=>({id:e.id,...e.data()})),W()},t=>console.error("Firestore Boletos:",t));ot(D(x,Bt,"config"),t=>{t.exists()&&(ut=t.data()),W()},t=>console.error("Firestore Reservas:",t));let w=new Date().toISOString().slice(0,7);function wt(){const t=new Set,e=new Date().toISOString().slice(0,7);return t.add(e),w&&t.add(w),T.forEach(a=>{a.mesAno&&t.add(a.mesAno)}),F.forEach(a=>{a.mesAno&&t.add(a.mesAno)}),O.forEach(a=>{a.mesAno&&t.add(a.mesAno)}),S.forEach(a=>{a.mesAno&&t.add(a.mesAno)}),Array.from(t).sort().reverse()}window.selecionarMesGlobal=function(t){if(!t)return;w=t;const e=document.getElementById("inp-seletor-mes-global");e&&(e.value=t);const a=document.getElementById("inp-entradas-mes-ano");a&&(a.value=t);const o=document.getElementById("inp-fatura-vencimento");o&&(o.value=`${t}-10`,typeof atualizarMesRefFatura=="function"&&atualizarMesRefFatura());const n=document.getElementById("inp-boleto-vencimento");n&&(n.value=`${t}-10`,typeof atualizarMesRefBoleto=="function"&&atualizarMesRefBoleto()),W()};window.verMesEIrParaControle=function(t){selecionarMesGlobal(t),typeof goTab=="function"&&goTab("mensal")};function Jt(){const t=document.getElementById("seletor-meses-bar");if(!t)return;const e=wt();e.includes(w)||(w=e[0]||new Date().toISOString().slice(0,7));const a=document.getElementById("inp-seletor-mes-global");a&&a.value!==w&&(a.value=w),t.innerHTML=e.map(o=>{const[n,r]=o.split("-"),c=new Date(parseInt(n),parseInt(r)-1,1).toLocaleString("pt-BR",{month:"short"}).toUpperCase().replace(".",""),d=o===w;return`
      <button class="sub-item ${d?"active":""}" onclick="selecionarMesGlobal('${o}')" style="${d?"background:var(--secondary);color:#fff;border-color:var(--secondary);box-shadow:0 0 10px rgba(99,102,241,0.4);font-weight:700":"background:rgba(15,23,42,.6);color:var(--text-muted);border:1px solid var(--border-color)"}; display:inline-flex;align-items:center;gap:.35rem">
        📅 ${c}/${n}
      </button>
    `}).join("")}window.switchMensalSub=function(t){document.querySelectorAll("[data-mensal-sub]").forEach(o=>o.classList.remove("active")),document.querySelectorAll(".mensal-sub-content").forEach(o=>o.style.display="none");const e=document.querySelector(`[data-mensal-sub="${t}"]`);e&&e.classList.add("active");const a=document.getElementById(t);a&&(a.style.display="block")};function W(){Jt(),te(),Kt(),ne(),de(),ue(),ve(),ye(),Ee(),$e(),pe()}function Kt(){const t=w,e=T.filter(E=>E.mesAno===t),a=F.filter(E=>E.mesAno===t),o=O.filter(E=>E.mesAno===t),n=S.filter(E=>E.mesAno===t),r=e.reduce((E,A)=>E+(A.valor||0),0),i=a.reduce((E,A)=>E+(A.valorTotal!==void 0?A.valorTotal:A.valor||0),0),c=o.reduce((E,A)=>E+(A.valorTotal!==void 0?A.valorTotal:A.valor||0),0);let d=0;n.forEach(E=>{E.formasPagamento&&(d+=E.formasPagamento.cartaoDebito||0)});const s=r-i-c-d,l=document.getElementById("m-total-entradas");l&&(l.textContent=m(r));const u=document.getElementById("m-total-cartoes");u&&(u.textContent=m(i));const b=document.getElementById("m-total-boletos");b&&(b.textContent=m(c));const f=document.getElementById("m-mercado-debito");f&&(f.textContent=m(d));const v=document.getElementById("m-saldo-liquido");v&&(v.textContent=m(s),v.style.color=s>=0?"#60a5fa":"#fb7185");const[h,L]=t.split("-"),N=new Date(parseInt(h),parseInt(L)-1,1).toLocaleString("pt-BR",{month:"long"}),z=N.charAt(0).toUpperCase()+N.slice(1),k=document.getElementById("m-lbl-saldo-liquido");k&&(k.textContent=`Saldo Líquido (${z}/${h})`),Xt(e,a,o,n)}function Xt(t,e,a,o){const n=document.getElementById("content-salarios-mes");n&&(n.innerHTML=`
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header">
          <span class="card-title">💵 Entradas Registradas em ${w}</span>
          <span class="badge green">Total: ${m(t.reduce((d,s)=>d+(s.valor||0),0))}</span>
        </div>
        ${t.length?`<div class="table-responsive"><table class="custom-table">
              <thead><tr><th>Pessoa</th><th>Descrição</th><th>Tipo</th><th class="num">Valor</th><th>Ação</th></tr></thead>
              <tbody>${t.map(d=>`<tr>
                <td><span class="badge ${d.pessoa==="Victor"?"green":d.pessoa==="Maria"?"purple":"cyan"}">${d.pessoa}</span></td>
                <td><strong>${d.descricao}</strong></td>
                <td><span class="badge amber">${d.tipo==="holerite"?"Holerite":"Manual"}</span></td>
                <td class="num" style="color:#34d399"><strong>${m(d.valor)}</strong></td>
                <td><button class="btn-danger" onclick="excluirEntrada('${d.id}')">🗑️</button></td>
              </tr>`).join("")}</tbody>
            </table></div>`:`<div class="empty-state">Nenhuma entrada cadastrada para ${w}. Use a aba "Salários & Entradas" para cadastrar.</div>`}
      </div>
    `);const r=document.getElementById("content-cartoes-mes");if(r){const d=e.reduce((s,l)=>s+(l.valorTotal||0),0);r.innerHTML=`
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header">
          <span class="card-title">💳 Faturas de Cartão Vencendo em ${w}</span>
          <span class="badge rose">Total: ${m(d)}</span>
        </div>
        ${e.length?e.map(s=>`
              <div class="purchase-card" style="margin-bottom:1rem">
                <div class="purchase-header" onclick="toggleDetail('fat-m-${s.id}')">
                  <div class="purchase-info">
                    <h3>${s.cartao==="Nubank"?"🟣 Nubank":s.cartao==="Santander"?"🔴 Santander":"💳 "+(s.descricao||s.cartao)}</h3>
                    <p>Vencimento: <strong>${s.dataVencimento||"—"}</strong> • ${s.qtdItens||(s.itens?s.itens.length:0)} lançamentos</p>
                  </div>
                  <div class="purchase-values">
                    <div class="pv-total" style="color:#fb7185">${m(s.valorTotal)}</div>
                    <div class="pv-sub">Clique para ver itens <span class="chevron">▼</span></div>
                  </div>
                </div>
                <div id="fat-m-${s.id}" class="purchase-details">
                  <div class="details-toolbar">
                    <span style="font-weight:700;font-size:.9rem;color:var(--text-muted)">Lançamentos da Fatura</span>
                    <button class="btn-danger" onclick="excluirFaturaDocumento('${s.id}')">🗑️ Excluir Fatura</button>
                  </div>
                  ${Lt(s)}
                </div>
              </div>
            `).join(""):`<div class="empty-state">Nenhuma fatura cadastrada com vencimento em ${w}. Use a aba "Cartões de Crédito" para importar.</div>`}
      </div>
    `}const i=document.getElementById("content-boletos-mes");if(i){const d=a.reduce((s,l)=>s+(l.valorTotal||0),0);i.innerHTML=`
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header">
          <span class="card-title">📄 Boletos Vencendo em ${w}</span>
          <span class="badge purple">Total: ${m(d)}</span>
        </div>
        ${a.length?a.map(s=>`
              <div class="purchase-card" style="margin-bottom:1rem">
                <div class="purchase-header" onclick="toggleDetail('bol-m-${s.id}')">
                  <div class="purchase-info">
                    <h3>📄 ${s.descricao||"Boleto / Conta"}</h3>
                    <p>Vencimento: <strong>${s.dataVencimento||"—"}</strong> • ${s.qtdItens||(s.itens?s.itens.length:0)} encargos</p>
                  </div>
                  <div class="purchase-values">
                    <div class="pv-total" style="color:#c084fc">${m(s.valorTotal)}</div>
                    <div class="pv-sub">Clique para ver detalhes <span class="chevron">▼</span></div>
                  </div>
                </div>
                <div id="bol-m-${s.id}" class="purchase-details">
                  <div class="details-toolbar">
                    <span style="font-weight:700;font-size:.9rem;color:var(--text-muted)">Detalhamento do Boleto</span>
                    <button class="btn-danger" onclick="excluirBoletoDocumento('${s.id}')">🗑️ Excluir Boleto</button>
                  </div>
                  ${Ot(s)}
                </div>
              </div>
            `).join(""):`<div class="empty-state">Nenhum boleto cadastrado para ${w}. Use a aba "Boletos" para importar.</div>`}
      </div>
    `}const c=document.getElementById("content-mercado-mes");c&&(c.innerHTML=`
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header">
          <span class="card-title">🛒 Compras de Mercado em ${w}</span>
          <span class="badge amber">${o.length} notas cadastradas</span>
        </div>
        ${o.length?o.map(d=>`
              <div class="purchase-card" style="margin-bottom:1rem">
                <div class="purchase-header" onclick="toggleDetail('mer-m-${d.id}')">
                  <div class="purchase-info">
                    <h3>🛒 ${d.nomeMercado||"Mercado"}</h3>
                    <p>Data: <strong>${rt(d.dataEmissao)}</strong> • ${d.qtdTotalItens||0} itens</p>
                  </div>
                  <div class="purchase-values">
                    <div class="pv-total" style="color:#fbbf24">${m(d.valorAPagar)}</div>
                    <div class="pv-sub">Clique para ver itens <span class="chevron">▼</span></div>
                  </div>
                </div>
                <div id="mer-m-${d.id}" class="purchase-details">
                  <div class="details-toolbar">
                    <span style="font-weight:700;font-size:.9rem;color:var(--text-muted)">Itens da Nota</span>
                    <button class="btn-danger" onclick="excluirCompraDocumento('${d.id}')">🗑️ Excluir Nota</button>
                  </div>
                  ${Vt(d)}
                </div>
              </div>
            `).join(""):`<div class="empty-state">Nenhuma nota de mercado cadastrada para ${w}.</div>`}
      </div>
    `)}function te(){let t=T.reduce((s,l)=>s+(l.valor||0),0),e=F.reduce((s,l)=>s+(l.valorTotal!==void 0?l.valorTotal:l.valor||0),0),a=O.reduce((s,l)=>s+(l.valorTotal!==void 0?l.valorTotal:l.valor||0),0),o=0,n=0,r=0;const i={};S.forEach(s=>{const l=s.valorAPagar||0;s.formasPagamento&&(n+=s.formasPagamento.valeAlimentacao||0,r+=s.formasPagamento.cartaoCredito||0,o+=s.formasPagamento.cartaoDebito||0);const u=s.mesAno||"Outros";i[u]=(i[u]||0)+l});let c=t-e-a-o;document.getElementById("fin-total-entradas").textContent=m(t);const d=document.getElementById("fin-subtext-entradas");d&&(d.textContent="Total de Entradas Cadastradas"),document.getElementById("fin-total-cartoes").textContent=m(e),document.getElementById("fin-total-boletos").textContent=m(a),document.getElementById("fin-mercado-debito").textContent=m(o),document.getElementById("fin-saldo-liquido").textContent=m(c),document.getElementById("dash-alimentacao").textContent=m(n),document.getElementById("dash-credito").textContent=m(r),document.getElementById("dash-debito").textContent=m(o),ee(),Ct(i)}function ee(){const t=document.getElementById("tabela-resumo-mensal");if(!t)return;const e=wt();if(!e.length){t.innerHTML='<div class="empty-state">Nenhum dado cadastrado ainda.</div>';return}const a=e.map(o=>{const n=T.filter(v=>v.mesAno===o).reduce((v,h)=>v+(h.valor||0),0),r=F.filter(v=>v.mesAno===o).reduce((v,h)=>v+(h.valorTotal!==void 0?h.valorTotal:h.valor||0),0),i=O.filter(v=>v.mesAno===o).reduce((v,h)=>v+(h.valorTotal!==void 0?h.valorTotal:h.valor||0),0);let c=0;S.filter(v=>v.mesAno===o).forEach(v=>{v.formasPagamento&&(c+=v.formasPagamento.cartaoDebito||0)});const d=n-r-i-c,[s,l]=o.split("-"),b=new Date(parseInt(s),parseInt(l)-1,1).toLocaleString("pt-BR",{month:"short"}).toUpperCase().replace(".","");return`
      <tr style="${o===w?"background:rgba(99,102,241,0.1)":""}">
        <td><strong>📅 ${b}/${s}</strong></td>
        <td style="color:#34d399"><strong>${m(n)}</strong></td>
        <td style="color:#fb7185">${m(r)}</td>
        <td style="color:#c084fc">${m(i)}</td>
        <td style="color:#fbbf24">${m(c)}</td>
        <td style="color:${d>=0?"#60a5fa":"#fb7185"}; font-weight:800">${m(d)}</td>
        <td>
          <button class="btn-secondary" style="padding:.25rem .65rem; font-size:.78rem" onclick="verMesEIrParaControle('${o}')">
            🔍 Ver Mês
          </button>
        </td>
      </tr>
    `}).join("");t.innerHTML=`
    <div class="table-responsive">
      <table class="custom-table">
        <thead>
          <tr>
            <th>Mês / Ano</th>
            <th>Entradas</th>
            <th>Cartão Crédito</th>
            <th>Boletos</th>
            <th>Mercado (Débito)</th>
            <th>Saldo Líquido</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          ${a}
        </tbody>
      </table>
    </div>
  `}function Ct(t){var r;if(typeof Chart>"u")return setTimeout(()=>Ct(t),300);const e=(r=document.getElementById("chart-barras"))==null?void 0:r.getContext("2d");if(!e)return;const a=Object.keys(t).sort(),o=a.map(i=>{const[c,d]=i.split("-");return`${d}/${c}`}),n=a.map(i=>t[i]);mt&&mt.destroy(),mt=new Chart(e,{type:"bar",data:{labels:o.length?o:["Sem compras"],datasets:[{label:"Gasto Mercado R$",data:n.length?n:[0],backgroundColor:"rgba(16,185,129,0.78)",borderColor:"#10b981",borderWidth:2,borderRadius:8}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:i=>` ${m(i.raw)}`}}},scales:{y:{beginAtZero:!0,grid:{color:"rgba(255,255,255,.05)"},ticks:{color:"#94a3b8",callback:i=>"R$"+i}},x:{grid:{display:!1},ticks:{color:"#94a3b8"}}}}})}function Tt(t){if(!t)return 0;const e=t.match(/L[íi]quido(?:\s*a\s*receber)?\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/TOTAL\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/SAL[ÁA]RIO\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/VALOR\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i);return e?C(e[1]):0}function ae(){const t=document.getElementById("inp-entradas-mes-ano");if(t&&!t.value){const e=new Date,a=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0");t.value=`${a}-${o}`}}setTimeout(ae,300);document.getElementById("form-holerite-victor").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-entradas-mes-ano").value||new Date().toISOString().slice(0,7),a=document.getElementById("inp-holerite-txt-victor").value;let o=parseFloat(document.getElementById("inp-salario-val-victor").value)||0;if(!o&&a&&(o=Tt(a)),!o){g("⚠️ Digite ou cole um holerite válido com valor.");return}const n=`salario_victor_${e}`;await nt(D(x,st,n),{pessoa:"Victor",tipo:"holerite",descricao:`Salário Líquido Victor (${e})`,valor:o,mesAno:e,data:new Date().toISOString()}),g(`✅ Salário do Victor (${e}) salvo!`)});document.getElementById("form-holerite-maria").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-entradas-mes-ano").value||new Date().toISOString().slice(0,7),a=document.getElementById("inp-holerite-txt-maria").value;let o=parseFloat(document.getElementById("inp-salario-val-maria").value)||0;if(!o&&a&&(o=Tt(a)),!o){g("⚠️ Digite ou cole um holerite válido com valor.");return}const n=`salario_maria_${e}`;await nt(D(x,st,n),{pessoa:"Maria",tipo:"holerite",descricao:`Salário Líquido Maria (${e})`,valor:o,mesAno:e,data:new Date().toISOString()}),g(`✅ Salário da Maria (${e}) salvo!`)});document.getElementById("form-entrada-manual").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-entradas-mes-ano").value||new Date().toISOString().slice(0,7),a=document.getElementById("inp-ent-desc").value.trim(),o=parseFloat(document.getElementById("inp-ent-val").value)||0,n=document.getElementById("inp-ent-pessoa").value;!a||!o||(await dt(j(x,st),{pessoa:n,tipo:"manual",descricao:a,valor:o,mesAno:e,data:new Date().toISOString()}),t.target.reset(),g(`🎉 Entrada manual (${e}) registrada!`))});function oe(){if(!T.length)return 0;const t={};T.forEach(o=>{const n=o.mesAno||(o.data?o.data.slice(0,7):"sem-mes");t[n]=(t[n]||0)+(o.valor||0)});const e=Object.keys(t);return e.length?Object.values(t).reduce((o,n)=>o+n,0)/e.length:0}function ne(){var c,d,s;const t=((c=document.getElementById("inp-entradas-mes-ano"))==null?void 0:c.value)||new Date().toISOString().slice(0,7),e=document.getElementById("lbl-entradas-mes-ref");if(e){const[l,u]=t.split("-"),f=new Date(parseInt(l),parseInt(u)-1,1).toLocaleString("pt-BR",{month:"long"});e.textContent=`Referência: ${f.charAt(0).toUpperCase()+f.slice(1)}/${l}`}const a=((d=T.find(l=>l.pessoa==="Victor"&&l.tipo==="holerite"&&(l.mesAno===t||l.id==="salario_victor")))==null?void 0:d.valor)||0,o=((s=T.find(l=>l.pessoa==="Maria"&&l.tipo==="holerite"&&(l.mesAno===t||l.id==="salario_maria")))==null?void 0:s.valor)||0,r=T.filter(l=>l.mesAno===t||!l.mesAno&&(l.id==="salario_victor"||l.id==="salario_maria")).reduce((l,u)=>l+(u.valor||0),0);oe(),document.getElementById("val-salario-victor").textContent=m(a),document.getElementById("val-salario-maria").textContent=m(o),document.getElementById("val-entradas-combinado").textContent=`${m(r)}`;const i=document.getElementById("lista-entradas-registradas");if(!T.length){i.innerHTML='<div class="empty-state">Nenhuma entrada cadastrada ainda.</div>';return}i.innerHTML=`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Mês / Ref</th><th>Descrição</th><th>Pessoa</th><th>Tipo</th><th class="num">Valor</th><th>Ação</th></tr></thead>
    <tbody>${T.map(l=>`<tr>
      <td><span class="badge green">${l.mesAno||"—"}</span></td>
      <td><strong>${l.descricao}</strong></td>
      <td><span class="badge ${l.pessoa==="Victor"?"green":l.pessoa==="Maria"?"purple":"cyan"}">${l.pessoa}</span></td>
      <td><span class="badge amber">${l.tipo==="holerite"?"Holerite":"Manual"}</span></td>
      <td class="num" style="color:#34d399"><strong>${m(l.valor)}</strong></td>
      <td><button class="btn-danger" onclick="excluirEntrada('${l.id}')">🗑️</button></td>
    </tr>`).join("")}</tbody>
  </table></div>`}window.excluirEntrada=async function(t){confirm("Excluir esta entrada?")&&(await Z(D(x,st,t)),g("🗑️ Entrada removida."))};let gt="Nubank",$=null;function se(){const t=document.getElementById("inp-fatura-vencimento");if(t&&!t.value){const e=new Date,a=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0");t.value=`${a}-${o}-10`,atualizarMesRefFatura()}}setTimeout(se,300);window.atualizarMesRefFatura=function(){const t=document.getElementById("inp-fatura-vencimento"),e=document.getElementById("lbl-fatura-mes-ref");if(!(!t||!e))if(t.value){const[a,o]=t.value.split("-"),r=new Date(parseInt(a),parseInt(o)-1,1).toLocaleString("pt-BR",{month:"long"});e.textContent=`Fatura ${r.charAt(0).toUpperCase()+r.slice(1)}/${a}`}else e.textContent="Mês da Fatura"};window.selecionarCartaoFatura=function(t){gt=t,document.querySelectorAll(".btn-card-select").forEach(a=>a.classList.remove("active"));const e=document.querySelector(`.btn-card-select[data-card="${t}"]`);e&&e.classList.add("active"),g(`Cartão selecionado: ${t}`)};window.handleFileFaturaSelect=async function(t){const e=t.target.files[0];if(!e)return;const a=document.getElementById("txt-file-fatura");a&&(a.textContent=`📄 Arquivo: ${e.name}`),g(`⏳ Lendo arquivo da fatura (${e.name})...`);let o="";if(e.type==="application/pdf"||e.name.endsWith(".pdf"))o=await Mt(e);else try{o=await e.text()}catch{o=""}o?(document.getElementById("inp-fatura-txt").value=o,await St(o,gt)):g("❌ Não foi possível ler o texto do arquivo da fatura.")};async function Mt(t){try{const e=await t.arrayBuffer();if(typeof pdfjsLib>"u")return g("⚠️ Aguarde a biblioteca de PDF carregar..."),"";pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";let a=pdfjsLib.getDocument({data:e});a.onPassword=(r,i)=>{let c=prompt(`🔒 Este PDF de fatura está protegido por senha.
Digite a senha para abrir (ex: CPF ou Data de Nascimento):`);c?r(c):g("⚠️ Senha não informada. Leitura do PDF cancelada.")};const o=await a.promise;let n="";for(let r=1;r<=o.numPages;r++){const c=await(await o.getPage(r)).getTextContent();let d=null,s="";for(const l of c.items){if(!l.str)continue;const u=l.transform?l.transform[5]:null;d!==null&&Math.abs(u-d)>3?s+=`
`:s.length>0&&!s.endsWith(`
`)&&!s.endsWith(" ")&&(s+=" "),s+=l.str,d=u}n+=s+`
`}return n}catch(e){return e.name==="PasswordException"?g("🔒 O PDF precisa de senha válida para ser aberto."):console.error("Erro ao ler PDF:",e),""}}function re(t){if(!t)return null;const e=t.match(/Total\s*a\s*Pagar\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/no\s*valor\s*de\s*R?\$\s*([\d\.,]+)/i)||t.match(/Valor\s*total\s*da\s*fatura\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/Total\s*da\s*fatura\s*[:\s]*R?\$\s*([\d\.,]+)/i);if(e){const a=C(e[1]);if(a>0)return a}return null}function ie(t){if(!t)return null;const e=t.match(/Vencimento\s*[:\s]*(\d{2}[\/\.-]\d{2}[\/\.-]\d{4})/i)||t.match(/Data\s*de\s*vencimento\s*[:\s]*(\d{2})\s+([A-Za-z]{3})\s+(\d{4})/i)||t.match(/FATURA\s+(\d{2})\s+([A-Za-z]{3})\s+(\d{4})/i);if(e){if(e[2]&&e[3]){const a=e[1],o=e[2].toUpperCase(),n=e[3],i={JAN:"01",FEB:"02",MAR:"03",ABR:"04",APR:"04",MAI:"05",MAY:"05",JUN:"06",JUL:"07",AGO:"08",AUG:"08",SET:"09",SEP:"09",OUT:"10",OCT:"10",NOV:"11",DEZ:"12",DEC:"12"}[o]||"07";return`${n}-${i}-${a.padStart(2,"0")}`}else if(e[1]){const[a,o,n]=e[1].split(/[\/\.-]/);return`${n}-${o.padStart(2,"0")}-${a.padStart(2,"0")}`}}return null}window.importarFaturaManualOuArquivo=async function(){const t=document.getElementById("inp-fatura-txt").value.trim();if(!t){g("⚠️ Selecione o arquivo da fatura (.pdf, .csv) ou cole o texto da fatura.");return}await St(t,gt)};async function St(t,e){const a=ie(t);a&&(document.getElementById("inp-fatura-vencimento").value=a,atualizarMesRefFatura());const o=re(t),n=le(t),r=document.getElementById("inp-fatura-vencimento").value||new Date().toISOString().slice(0,10),i=r.slice(0,7),c=n.reduce((b,f)=>b+f.valor,0),d=o||c||0,s=e?`Cartão ${e}`:"Fatura Cartão";$={cartao:e||"Nubank",descricao:s,dataVencimento:r,mesAno:i,valorTotal:d,qtdItens:n.length,itens:n};const l=document.getElementById("inp-revisao-fatura-desc");l&&(l.value=s);const u=document.getElementById("inp-revisao-fatura-val");u&&(u.value=d?d.toFixed(2):""),Dt(),n.length>0?g(`✅ ${n.length} compras encontradas! Fatura total: ${m(d)}.`):g("ℹ️ Fatura pronta para revisão. Confirme o valor total e o cartão abaixo.")}window.atualizarValorTotalRevisaoFatura=function(){var e;if(!$)return;const t=parseFloat((e=document.getElementById("inp-revisao-fatura-val"))==null?void 0:e.value)||0;$.valorTotal=t,document.getElementById("badge-total-preview-fatura").textContent=m(t)};function Dt(){if(!$)return;const{valorTotal:t,itens:e,cartao:a,descricao:o}=$;document.getElementById("badge-total-preview-fatura").textContent=m(t);const n=document.getElementById("inp-revisao-fatura-desc");n&&(!n.value||n.value==="Fatura Cartão")&&(n.value=o||`Cartão ${a||"Nubank"}`);const r=document.getElementById("inp-revisao-fatura-val");r&&(!r.value||parseFloat(r.value)===0)&&(r.value=t?t.toFixed(2):"");const i=document.getElementById("lista-preview-fatura-itens");!e||!e.length?i.innerHTML='<div class="empty-state">Nenhum item individual extraído. O valor total acima será considerado.</div>':i.innerHTML=e.map((d,s)=>`
      <div style="display:flex; justify-content:space-between; align-items:center; padding:.4rem 0; border-bottom:1px dashed var(--border-color); font-size:.82rem;">
        <span><strong>${d.dataCompra||"—"}</strong> — ${d.descricao}</span>
        <div style="display:flex; align-items:center; gap:.75rem;">
          <span style="color:#fb7185; font-weight:700;">${m(d.valor)}</span>
          <button type="button" class="btn-danger" style="padding:.15rem .45rem; font-size:.75rem;" onclick="removerItemRevisaoFatura(${s})">🗑️</button>
        </div>
      </div>
    `).join("");const c=document.getElementById("box-revisao-fatura");c.style.display="block",c.scrollIntoView({behavior:"smooth"})}window.removerItemRevisaoFatura=function(t){if(!$||!$.itens)return;$.itens.splice(t,1);const e=$.itens.reduce((a,o)=>a+o.valor,0);if(e>0){$.valorTotal=e;const a=document.getElementById("inp-revisao-fatura-val");a&&(a.value=e.toFixed(2))}$.qtdItens=$.itens.length,Dt(),g("🗑️ Item removido da revisão da fatura.")};window.confirmarEGravarFaturaDocumento=async function(){var o,n;if(!$)return;const t=(o=document.getElementById("inp-revisao-fatura-desc"))==null?void 0:o.value.trim(),e=parseFloat((n=document.getElementById("inp-revisao-fatura-val"))==null?void 0:n.value)||0,a=document.getElementById("inp-fatura-vencimento").value||new Date().toISOString().slice(0,10);if(!e){g("⚠️ Digite ou confirme o valor total da fatura.");return}$.cartao=t||$.cartao||"Cartão",$.valorTotal=e,$.dataVencimento=a,$.mesAno=a.slice(0,7);try{await dt(j(x,tt),{...$,createdAt:pt()}),document.getElementById("box-revisao-fatura").style.display="none",document.getElementById("inp-fatura-txt").value="";const r=document.getElementById("txt-file-fatura");r&&(r.textContent="Clique para Selecionar o Arquivo da Fatura");const i=m($.valorTotal);$=null,g(`🎉 Fatura de ${i} salva com sucesso!`)}catch(r){alert("Erro ao salvar fatura: "+r.message)}};function le(t){if(!t)return[];const e=[],a=/(?:[@\)\(\*•\s]+)?(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+(?:(\d{2}\/\d{2})\s+)?(-?R?\$\s*[\d\.]+,\d{2}|-?[\d\.]+,\d{2})/gi;if(t.split(`
`).forEach(n=>{const r=n.trim();if(!r||/EMISS[ÃA]O|TRANSA[ÇC][ÕO]ES|RESUMO|PAGAMENTO DE FATURA|TOTAL DA FATURA|FATURA ANTERIOR|SALDO ANTERIOR|LIMITE DISPON[ÍI]VEL|OPÇÕES DE PAGAMENTO|ALTERNATIVAS DE PAGAMENTO|PAGAMENTO E DEMAIS|PARCELAMENTOS|DESPESAS|HISTÓRICO DE FATURAS|SUPERCRÉDITO|SAQUE À CRÉDITO|COMPRA DATA DESCRIÇÃO/i.test(r))return;const i=/(?:[@\)\(\*•\s]+)?(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+(?:(\d{2}\/\d{2})\s+)?(-?R?\$\s*[\d\.]+,\d{2}|-?[\d\.]+,\d{2})$/i,c=r.match(i)||r.match(/(?:[@\)\(\*•\s]+)?(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+(?:(\d{2}\/\d{2})\s+)?(-?R?\$\s*[\d\.]+,\d{2}|-?[\d\.]+,\d{2})/i);if(c){const d=c[1];let s=c[2].trim();const l=c[3],u=c[4];if(u.includes("-")||/DEB AUTOM|PAGAMENTO|PAGTO|CR[ÉE]DITO FATURA/i.test(s))return;const b=C(u);l&&(s+=` (${l})`),s&&b>0&&s.length>2&&!/fatura|limite|pagamento|saldo|alternativas|opções|período|emissão|vencimento/i.test(s)&&e.push({dataCompra:d,descricao:s,valor:b})}}),e.length===0){let n;for(;(n=a.exec(t))!==null;){const r=n[1];let i=n[2].trim();const c=n[3],d=n[4];if(d.includes("-")||/DEB AUTOM|PAGAMENTO|PAGTO|CR[ÉE]DITO FATURA/i.test(i))continue;const s=C(d);c&&(i+=` (${c})`),i&&s>0&&i.length>2&&!/fatura|limite|pagamento|saldo|alternativas|opções|período|emissão|vencimento/i.test(i)&&e.push({dataCompra:r,descricao:i,valor:s})}}return e}function de(){const t=F.reduce((a,o)=>a+(o.valorTotal!==void 0?o.valorTotal:o.valor||0),0);document.getElementById("badge-total-cartoes").textContent=`${m(t)} total`;const e=document.getElementById("lista-faturas-registradas");if(!F.length){e.innerHTML='<div class="empty-state">Nenhuma fatura cadastrada ainda.</div>';return}e.innerHTML=F.map(a=>{var l;const o=a.valorTotal!==void 0?a.valorTotal:a.valor||0,n=a.cartao||"Cartão",r=n.toLowerCase().includes("nubank"),i=r?"purple":"red",c=r?"🟣":"🔴",d=a.dataVencimento?rt(a.dataVencimento).split(",")[0]:"—",s=a.mesAno||"—";return`
      <div class="purchase-card">
        <div class="purchase-header" onclick="toggleDetail('fat-${a.id}')">
          <div class="purchase-info">
            <h3><span class="badge ${i}">${c} ${n}</span> — Vencimento: ${d}</h3>
            <p>📅 Mês Referência: <strong>${s}</strong> &nbsp;•&nbsp; 🛒 ${a.qtdItens||((l=a.itens)==null?void 0:l.length)||1} itens contemplados</p>
          </div>
          <div class="purchase-values">
            <div class="pv-total" style="color:#fb7185">${m(o)}</div>
            <div class="pv-sub">Fatura do Mês</div>
          </div>
          <svg class="chevron" id="chev-fat-${a.id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="purchase-details" id="detail-fat-${a.id}">
          <div class="details-toolbar">
            <span class="card-subtext">Detalhamento dos Lançamentos da Fatura</span>
            <button class="btn-danger" onclick="excluirFaturaDocumento('${a.id}')">🗑️ Excluir Fatura</button>
          </div>
          ${Lt(a)}
        </div>
      </div>
    `}).join("")}function Lt(t){return t.itens&&t.itens.length>0?`<div class="table-responsive"><table class="custom-table">
      <thead><tr><th>Data Compra</th><th>Descrição do Lançamento</th><th class="num">Valor</th><th>Ação</th></tr></thead>
      <tbody>${t.itens.map((e,a)=>`<tr>
        <td><strong>${e.dataCompra||"—"}</strong></td>
        <td>${e.descricao}</td>
        <td class="num" style="color:#fb7185"><strong>${m(e.valor)}</strong></td>
        <td><button class="btn-danger" style="padding:.2rem .5rem; font-size:.78rem;" onclick="removerItemFaturaCadastrada('${t.id}', ${a})">🗑️ Excluir</button></td>
      </tr>`).join("")}</tbody>
    </table></div>`:`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Descrição</th><th class="num">Valor</th><th>Ação</th></tr></thead>
    <tbody><tr>
      <td>${t.descricao||"Fatura do Cartão"}</td>
      <td class="num" style="color:#fb7185"><strong>${m(t.valor||t.valorTotal)}</strong></td>
      <td><button class="btn-danger" style="padding:.2rem .5rem; font-size:.78rem;" onclick="excluirFaturaDocumento('${t.id}')">🗑️ Excluir</button></td>
    </tr></tbody>
  </table></div>`}window.removerItemFaturaCadastrada=async function(t,e){const a=F.find(r=>r.id===t);if(!a||!a.itens||!confirm("Remover este item da fatura?"))return;const o=[...a.itens];o.splice(e,1);const n=o.reduce((r,i)=>r+(i.valor||0),0);o.length===0?(await Z(D(x,tt,t)),g("🗑️ Fatura excluída pois todos os itens foram removidos.")):(await nt(D(x,tt,t),{...a,itens:o,valorTotal:n,qtdItens:o.length}),g("🗑️ Item removido da fatura."))};window.excluirFaturaDocumento=async function(t){confirm("Excluir esta fatura e todos os seus lançamentos?")&&(await Z(D(x,tt,t)),g("🗑️ Fatura removida com sucesso."))};let B=null;function ce(){const t=document.getElementById("inp-boleto-vencimento");if(t&&!t.value){const e=new Date,a=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0");t.value=`${a}-${o}-10`,atualizarMesRefBoleto()}}setTimeout(ce,300);window.atualizarMesRefBoleto=function(){const t=document.getElementById("inp-boleto-vencimento"),e=document.getElementById("lbl-boleto-mes-ref");if(!(!t||!e))if(t.value){const[a,o]=t.value.split("-"),r=new Date(parseInt(a),parseInt(o)-1,1).toLocaleString("pt-BR",{month:"long"});e.textContent=`Boleto ${r.charAt(0).toUpperCase()+r.slice(1)}/${a}`}else e.textContent="Mês do Boleto"};window.handleFileBoletoSelect=async function(t){const e=t.target.files[0];if(!e)return;const a=document.getElementById("txt-file-boleto");a&&(a.textContent=`📄 Arquivo: ${e.name}`),g(`⏳ Lendo arquivo do boleto (${e.name})...`);let o="";if(e.type==="application/pdf"||e.name.endsWith(".pdf"))o=await Mt(e);else try{o=await e.text()}catch{o=""}o?(document.getElementById("inp-boleto-txt").value=o,await Rt(o,e.name)):g("❌ Não foi possível ler o texto do arquivo do boleto.")};window.importarBoletoManualOuArquivo=async function(){const t=document.getElementById("inp-boleto-txt").value.trim();if(!t){g("⚠️ Selecione o arquivo do boleto (.pdf, .txt) ou cole o texto do boleto.");return}await Rt(t,"Boleto")};async function Rt(t,e){const a=me(t);a.vencimento&&(document.getElementById("inp-boleto-vencimento").value=a.vencimento,atualizarMesRefBoleto());const o=document.getElementById("inp-boleto-vencimento").value||new Date().toISOString().slice(0,10),n=o.slice(0,7),r=a.beneficiario||e.replace(/\.[^/.]+$/,"")||"Boleto / Conta",i=a.itens.reduce((d,s)=>d+s.valor,0),c=a.valorTotal||i||0;document.getElementById("inp-revisao-boleto-desc").value=r,document.getElementById("inp-revisao-boleto-val").value=c?c.toFixed(2):"",B={descricao:r,dataVencimento:o,mesAno:n,valorTotal:c,qtdItens:a.itens.length,itens:a.itens},Ft(),g("✅ Boleto identificado! Confira a descrição, valor e itens antes de salvar.")}window.atualizarValorTotalRevisaoBoleto=function(){if(!B)return;const t=parseFloat(document.getElementById("inp-revisao-boleto-val").value)||0;B.valorTotal=t,document.getElementById("badge-total-preview-boleto").textContent=m(t)};function Ft(){if(!B)return;const{valorTotal:t,itens:e}=B;document.getElementById("badge-total-preview-boleto").textContent=m(t);const a=document.getElementById("lista-preview-boleto-itens");!e||!e.length?a.innerHTML='<div class="empty-state">Nenhum encargo/item individual extraído. O valor total acima será considerado.</div>':a.innerHTML=e.map((n,r)=>`
      <div style="display:flex; justify-content:space-between; align-items:center; padding:.4rem 0; border-bottom:1px dashed var(--border-color); font-size:.82rem;">
        <span><strong>${n.dataBoleto||"—"}</strong> — ${n.descricao}</span>
        <div style="display:flex; align-items:center; gap:.75rem;">
          <span style="color:#c084fc; font-weight:700;">${m(n.valor)}</span>
          <button type="button" class="btn-danger" style="padding:.15rem .45rem; font-size:.75rem;" onclick="removerItemRevisaoBoleto(${r})">🗑️</button>
        </div>
      </div>
    `).join("");const o=document.getElementById("box-revisao-boleto");o.style.display="block",o.scrollIntoView({behavior:"smooth"})}window.removerItemRevisaoBoleto=function(t){if(!B||!B.itens)return;B.itens.splice(t,1);const e=B.itens.reduce((a,o)=>a+o.valor,0);e>0&&(B.valorTotal=e,document.getElementById("inp-revisao-boleto-val").value=e.toFixed(2)),B.qtdItens=B.itens.length,Ft(),g("🗑️ Item removido da revisão do boleto.")};window.confirmarEGravarBoletoDocumento=async function(){if(!B)return;const t=document.getElementById("inp-revisao-boleto-desc").value.trim(),e=parseFloat(document.getElementById("inp-revisao-boleto-val").value)||0,a=document.getElementById("inp-boleto-vencimento").value||new Date().toISOString().slice(0,10);if(!e){g("⚠️ Digite ou confirme o valor total do boleto.");return}B.descricao=t||"Boleto / Conta",B.valorTotal=e,B.dataVencimento=a,B.mesAno=a.slice(0,7);try{await dt(j(x,et),{...B,createdAt:pt()}),document.getElementById("box-revisao-boleto").style.display="none",document.getElementById("inp-boleto-txt").value="";const o=document.getElementById("txt-file-boleto");o&&(o.textContent="Clique para Selecionar o Arquivo do Boleto");const n=m(B.valorTotal);B=null,g(`🎉 Boleto de ${n} salvo com sucesso!`)}catch(o){alert("Erro ao salvar boleto: "+o.message)}};function me(t){if(!t)return{beneficiario:"",valorTotal:0,vencimento:null,itens:[]};let e="",a=0,o=null;const n=[],r=t.match(/Vencimento\s*[:\s]*(\d{2}[\/\.-]\d{2}[\/\.-]\d{4})/i)||t.match(/Vencimento\s*[:\s]*(\d{2})\s+([A-Za-z]{3})\s+(\d{4})/i)||t.match(/Data\s*de\s*Vencimento\s*[:\s]*(\d{2}[\/\.-]\d{2}[\/\.-]\d{4})/i);if(r){if(r[2]&&r[3]){const s=r[1],l=r[2].toUpperCase();o=`${r[3]}-${{JAN:"01",FEB:"02",MAR:"03",ABR:"04",APR:"04",MAI:"05",MAY:"05",JUN:"06",JUL:"07",AGO:"08",AUG:"08",SET:"09",SEP:"09",OUT:"10",OCT:"10",NOV:"11",DEZ:"12",DEC:"12"}[l]||"07"}-${s.padStart(2,"0")}`}else if(r[1]){const[s,l,u]=r[1].split(/[\/\.-]/);o=`${u}-${l.padStart(2,"0")}-${s.padStart(2,"0")}`}}const i=t.match(/Benefici[áa]rio\s*[:\s]*([^\n\r]+)/i)||t.match(/Nome\s*do\s*Cedente\s*[:\s]*([^\n\r]+)/i)||t.match(/Raz[ãa]o\s*Social\s*[:\s]*([^\n\r]+)/i);i&&(e=i[1].trim().replace(/\s{2,}/g," "));const c=t.match(/Valor\s*do\s*Documento\s*[:\s]*R?\$\s*([\d\.]+,\d{2})/i)||t.match(/\(=\)\s*Valor\s*Cobrado\s*[:\s]*R?\$\s*([\d\.]+,\d{2})/i)||t.match(/Valor\s*Cobrado\s*[:\s]*R?\$\s*([\d\.]+,\d{2})/i)||t.match(/Valor\s*R?\$\s*([\d\.]+,\d{2})/i);return c&&(a=C(c[1])),t.split(`
`).forEach(s=>{const l=s.trim();if(!l||/vencimento|beneficiário|cedente|nosso\s*número|agência|código|autenticação|instruções/i.test(l))return;const u=l.match(/(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\b[A-Za-z]{3}\b)?\s*(.+?)\s+R?\$\s*([\d\.]+,\d{2})$/i);if(u){const b=u[1]||"Boleto",f=u[2].trim(),v=C(u[3]);f&&v>0&&f.length>2&&!/valor|total|documento|cobrado/i.test(f)&&n.push({dataBoleto:b,descricao:f,valor:v})}}),{beneficiario:e,valorTotal:a,vencimento:o,itens:n}}function ue(){const t=O.reduce((a,o)=>a+(o.valorTotal!==void 0?o.valorTotal:o.valor||0),0);document.getElementById("badge-total-boletos").textContent=`${m(t)} total`;const e=document.getElementById("lista-boletos-registrados");if(!O.length){e.innerHTML='<div class="empty-state">Nenhum boleto cadastrado ainda.</div>';return}e.innerHTML=O.map(a=>{var c;const o=a.valorTotal!==void 0?a.valorTotal:a.valor||0,n=a.dataVencimento?rt(a.dataVencimento).split(",")[0]:"—",r=a.mesAno||"—",i=a.descricao||"Boleto / Conta";return`
      <div class="purchase-card">
        <div class="purchase-header" onclick="toggleDetail('bol-${a.id}')">
          <div class="purchase-info">
            <h3><span class="badge purple">📄 ${i}</span> — Vencimento: ${n}</h3>
            <p>📅 Mês Referência: <strong>${r}</strong> &nbsp;•&nbsp; 🛒 ${a.qtdItens||((c=a.itens)==null?void 0:c.length)||1} itens / encargos</p>
          </div>
          <div class="purchase-values">
            <div class="pv-total" style="color:#c084fc">${m(o)}</div>
            <div class="pv-sub">Boleto do Mês</div>
          </div>
          <svg class="chevron" id="chev-bol-${a.id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="purchase-details" id="detail-bol-${a.id}">
          <div class="details-toolbar">
            <span class="card-subtext">Detalhamento dos Itens / Encargos do Boleto</span>
            <button class="btn-danger" onclick="excluirBoletoDocumento('${a.id}')">🗑️ Excluir Boleto</button>
          </div>
          ${Ot(a)}
        </div>
      </div>
    `}).join("")}function Ot(t){return t.itens&&t.itens.length>0?`<div class="table-responsive"><table class="custom-table">
      <thead><tr><th>Data</th><th>Descrição / Item</th><th class="num">Valor</th><th>Ação</th></tr></thead>
      <tbody>${t.itens.map((e,a)=>`<tr>
        <td><strong>${e.dataBoleto||"—"}</strong></td>
        <td>${e.descricao}</td>
        <td class="num" style="color:#c084fc"><strong>${m(e.valor)}</strong></td>
        <td><button class="btn-danger" style="padding:.2rem .5rem; font-size:.78rem;" onclick="removerItemBoletoCadastrado('${t.id}', ${a})">🗑️ Excluir</button></td>
      </tr>`).join("")}</tbody>
    </table></div>`:`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Descrição</th><th class="num">Valor</th><th>Ação</th></tr></thead>
    <tbody><tr>
      <td>${t.descricao||"Boleto"}</td>
      <td class="num" style="color:#c084fc"><strong>${m(t.valor||t.valorTotal)}</strong></td>
      <td><button class="btn-danger" style="padding:.2rem .5rem; font-size:.78rem;" onclick="excluirBoletoDocumento('${t.id}')">🗑️ Excluir</button></td>
    </tr></tbody>
  </table></div>`}window.removerItemBoletoCadastrado=async function(t,e){const a=O.find(r=>r.id===t);if(!a||!a.itens||!confirm("Remover este item do boleto?"))return;const o=[...a.itens];o.splice(e,1);const n=o.reduce((r,i)=>r+(i.valor||0),0);o.length===0?(await Z(D(x,et,t)),g("🗑️ Boleto excluído pois todos os itens foram removidos.")):(await nt(D(x,et,t),{...a,itens:o,valorTotal:n,qtdItens:o.length}),g("🗑️ Item removido do boleto."))};window.excluirBoletoDocumento=async function(t){confirm("Excluir este boleto e todos os seus itens?")&&(await Z(D(x,et,t)),g("🗑️ Boleto removido com sucesso."))};document.getElementById("form-config-reservas").addEventListener("submit",async t=>{t.preventDefault();const e=parseFloat(document.getElementById("inp-meta-mensal").value)||0,a=parseFloat(document.getElementById("inp-saldo-guardado").value)||0;await nt(D(x,Bt,"config"),{metaMensal:e,valorAtualGuardado:a,dataAtualizacao:new Date().toISOString()}),g("✅ Reservas e economias atualizadas!")});function pe(){const t=ut.metaMensal||0,e=ut.valorAtualGuardado||0;document.getElementById("val-meta-reserva").textContent=m(t),document.getElementById("val-real-guardado").textContent=m(e);const a=T.reduce((l,u)=>l+(u.valor||0),0),o=F.reduce((l,u)=>l+(u.valorTotal!==void 0?u.valorTotal:u.valor||0),0),n=O.reduce((l,u)=>l+(u.valorTotal!==void 0?u.valorTotal:u.valor||0),0);let r=0;S.forEach(l=>{l.formasPagamento&&(r+=l.formasPagamento.cartaoDebito||0)});const i=a-o-n-r,c=i>0?Math.max(i*.5,a*.2):0;document.getElementById("val-recomendacao-reserva").textContent=m(c);const d=document.getElementById("box-analise-reserva-detalhes");if(a===0){d.innerHTML='<p class="empty-state">Cadastre seus salários e entradas na aba "Salários & Entradas" para gerar o diagnóstico inteligente de economias.</p>';return}const s=t>0?Math.min(100,e/t*100).toFixed(1):0;d.innerHTML=`
    <p> Com base nos seus <strong>${m(a)}</strong> de Entradas, <strong>${m(o)}</strong> de Faturas de Cartão e <strong>${m(r)}</strong> de Mercado no Débito:</p>
    <div style="background:rgba(15,23,42,0.6);padding:1rem;border-radius:10px;margin:.75rem 0;border:1px solid var(--border-color)">
      <div style="display:flex;justify-content:space-between;margin-bottom:.4rem">
        <span>💰 Saldo Livre em Conta: <strong>${m(i)}</strong></span>
        <span>💡 Recomendação de Reserva: <strong style="color:#c084fc">${m(c)}/mês</strong></span>
      </div>
      <div class="progress-bar-bg">
        <div class="progress-bar-fill" style="width:${s}%"></div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:.78rem;color:var(--text-muted);margin-top:.4rem">
        <span>Guardado: ${m(e)}</span>
        <span>Meta Pessoal: ${m(t)} (${s}%)</span>
      </div>
    </div>
    <p style="font-size:.84rem;color:var(--text-muted)">
      💡 <strong>Dica de Inteligência Financeira:</strong> Como o Vale Alimentação e o Crédito no Mercado não saem do seu salário em conta, eles protegem sua renda real! O sistema recomenda destinar pelo menos 50% do seu saldo livre líquido (<strong>${m(c)}</strong>) para sua reserva de emergência e investimentos.
    </p>
  `}function ve(){const t=document.getElementById("lista-mensal-container");if(!t)return;const e=new Date,a=new Date(e.getFullYear(),e.getMonth()+1,1),o=a.toLocaleString("pt-BR",{month:"long"}),n=a.getFullYear(),r=`${o.charAt(0).toUpperCase()+o.slice(1)} de ${n}`,i=Wt(a.getFullYear(),a.getMonth()),c=31.8,d=20,s=i*c,l=i*d,u={};let b=0;S.forEach(p=>{const y=p.valorAPagar||0;b+=y;const I=p.mesAno||"Outros";u[I]=(u[I]||0)+y});const f=Math.max(1,Object.keys(u).length),v=b/f,h={};S.forEach(p=>{(p.itens||[]).forEach(y=>{const I=(y.nome||"").toLowerCase().trim();I&&(h[I]||(h[I]={nome:y.nome,marca:y.marca||"Geral",qtdTotal:0,frequenciaNotas:0,valoresUnitarios:[]}),h[I].qtdTotal+=y.quantidade||1,h[I].frequenciaNotas+=1,y.valorUnitario&&h[I].valoresUnitarios.push(y.valorUnitario))})});const L=Object.values(h).map(p=>{const y=p.valoresUnitarios.length>0?p.valoresUnitarios.reduce((K,lt)=>K+lt,0)/p.valoresUnitarios.length:0,I=p.qtdTotal/f,_=f/Math.max(1,p.frequenciaNotas),it=p.frequenciaNotas/f;let q=0;it>=.35||I>=.7?q=Math.ceil(I):q=Math.round(I),q<1&&p.frequenciaNotas>=f&&(q=1);const J=q*y;return{nome:p.nome,marca:p.marca,frequenciaNotas:p.frequenciaNotas,intervaloMeses:_,qtdMensalTaxa:I,totalEstimadoUnidades:q,valorUnitario:y,subtotalCalculado:J}}).filter(p=>p.totalEstimadoUnidades>0);L.sort((p,y)=>y.frequenciaNotas-p.frequenciaNotas);const R=L.reduce((p,y)=>p+y.subtotalCalculado,0),N=v>0?v*1.05:R;let z=1;R>N&&v>0&&(z=N/R);const k=L.map(p=>({...p,subtotalFinal:p.subtotalCalculado*z})),E=v>0?Math.min(R,N):R;let A=E;const Q=Math.min(A,s);A-=Q;const Y=Math.min(A,l);A-=Y;const H=A>0?A:0;let U=`
    <div class="card" style="margin-bottom:1.5rem; background: linear-gradient(135deg, rgba(30,41,59,0.9), rgba(15,23,42,0.95)); border: 1px solid #3b82f6;">
      <div class="card-header">
        <div>
          <span class="card-title" style="color:#60a5fa;">📅 Previsão de Compras — ${r}</span>
          <p class="card-subtext" style="color:#cbd5e1; margin-top:0.25rem;">
            Calculado com unidades inteiras exatas (${i} dias úteis em ${o}).
          </p>
        </div>
        <span class="badge green" style="font-size:0.8rem; padding:0.4rem 0.75rem;">${i} Dias Úteis</span>
      </div>

      <div class="payment-grid" style="margin-top:1rem;">
        <div class="payment-item" style="border-color: rgba(16,185,129,0.4);">
          <div class="p-label">🍽️ Vale Alimentação (${i}d × R$ 31,80)</div>
          <div class="p-val" style="color:#34d399;">${m(Q)} <span style="font-size:0.75rem;font-weight:normal;color:var(--text-muted)">/ ${m(s)}</span></div>
        </div>
        <div class="payment-item" style="border-color: rgba(99,102,241,0.4);">
          <div class="p-label">💳 Cartão Crédito (${i}d × R$ 20,00)</div>
          <div class="p-val" style="color:#818cf8;">${m(Y)} <span style="font-size:0.75rem;font-weight:normal;color:var(--text-muted)">/ ${m(l)}</span></div>
        </div>
        <div class="payment-item" style="border-color: ${H>0?"rgba(244,63,94,0.5)":"var(--border-color)"};">
          <div class="p-label">💳 Débito Necessário (Excedente)</div>
          <div class="p-val" style="color: ${H>0?"#fb7185":"var(--text-muted)"};">${m(H)}</div>
        </div>
      </div>

      <div style="margin-top:1.25rem; padding-top:1rem; border-top:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
        <div>
          <span style="font-size:0.85rem; color:var(--text-muted);">Total Estimado da Lista de Compras:</span>
          <p style="font-size:0.75rem; color:#60a5fa;">Média Histórica de Gastos: ${m(v)}</p>
        </div>
        <span style="font-size:1.6rem; font-weight:800; color:var(--primary);">${m(E)}</span>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-title">Lista de Itens com Frequência e Total Estimado</span>
        <span class="badge amber">${k.length} itens cadastrados</span>
      </div>
      <p class="card-subtext" style="margin-bottom:1rem;">
        O <strong>Total Estimado</strong> arredonda o consumo médio para cima (unidades inteiras exatas), pois os produtos são comprados por unidade no mercado.
      </p>
  `;window.dadosListaMensalCache={mesAnoStr:r,diasUteis:i,totalGeralEstimado:E,cobertoAlim:Q,cobertoCred:Y,cobertoDeb:H,alimDisponivel:s,credDisponivel:l,lista:k},k.length===0?U+='<div class="empty-state">Adicione notas fiscais para que o sistema gere automaticamente sua lista mensal de compras.</div></div>':U+=`
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
            ${k.map(p=>{const y=p.intervaloMeses>1.2?`A cada ${p.intervaloMeses.toFixed(1)} meses`:`Todo mês (${p.frequenciaNotas}x)`,I=p.qtdMensalTaxa<1?p.qtdMensalTaxa.toFixed(2):p.qtdMensalTaxa.toFixed(1),_=p.totalEstimadoUnidades.toFixed(1);return`
                <tr>
                  <td><strong>${p.nome}</strong></td>
                  <td><span class="badge amber">${p.marca}</span></td>
                  <td><span class="badge cyan">${y}</span></td>
                  <td class="num">${I} un/mês</td>
                  <td class="num"><span class="badge green" style="font-size:0.82rem;">${_}</span></td>
                  <td class="num">${m(p.valorUnitario)}</td>
                  <td class="num"><strong>${m(p.subtotalFinal)}</strong></td>
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
    </div>`,t.innerHTML=U}window.exportarPDFListaMensal=function(){if(!window.dadosListaMensalCache||!window.dadosListaMensalCache.lista.length){g("⚠️ Nenhuma lista mensal disponível para exportar.");return}const{mesAnoStr:t,diasUteis:e,totalGeralEstimado:a,cobertoAlim:o,cobertoCred:n,cobertoDeb:r,lista:i}=window.dadosListaMensalCache,c=window.open("","_blank","width=900,height=750");if(!c){alert("Permita pop-ups no navegador para gerar o PDF da lista.");return}const d=`
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
          <div class="val">${m(o)}</div>
        </div>
        <div class="res-item">
          <div class="label">💳 Cartão Crédito</div>
          <div class="val">${m(n)}</div>
        </div>
        <div class="res-item">
          <div class="label">💳 Débito (Excedente)</div>
          <div class="val">${m(r)}</div>
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
          ${i.map(s=>`
            <tr>
              <td class="check-col"><div class="chk-box"></div></td>
              <td><strong>${s.nome}</strong></td>
              <td>${s.marca}</td>
              <td class="num"><strong>${s.totalEstimadoUnidades.toFixed(1)} un</strong></td>
              <td class="num">${m(s.valorUnitario)}</td>
              <td class="num"><strong>${m(s.subtotalFinal)}</strong></td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <div class="total-footer">
        <span>Total Estimado da Compra:</span>
        <span style="font-size:18px; color:#059669;">${m(a)}</span>
      </div>

      <script>
        window.onload = function() {
          setTimeout(function() { window.print(); }, 350);
        };
      <\/script>
    </body>
    </html>
  `;c.document.open(),c.document.write(d),c.document.close()};document.getElementById("btn-start-cam").addEventListener("click",qt);document.getElementById("btn-switch-cam").addEventListener("click",ge);document.getElementById("btn-stop-cam").addEventListener("click",ft);async function qt(){if(typeof Html5Qrcode>"u")return M("Carregando biblioteca de câmera, aguarde..."),setTimeout(qt,600);try{V||(V=new Html5Qrcode("qr-reader")),P=await Html5Qrcode.getCameras();let t;if(P&&P.length>0){const e=P.findIndex(a=>/back|traseira|rear|environment/i.test(a.label));X=e>=0?e:0,t=P[X].id}else t={facingMode:"environment"};await V.start(t,{fps:10,qrbox:{width:240,height:240}},Pt,()=>{}),at=!0,document.getElementById("btn-start-cam").style.display="none",document.getElementById("btn-switch-cam").style.display=P.length>1?"inline-flex":"none",document.getElementById("btn-stop-cam").style.display="inline-flex"}catch(t){M("❌ Não foi possível acessar a câmera. Verifique as permissões do navegador."),console.error(t)}}async function ge(){if(!(!V||!at))try{await V.stop(),P.length>1&&(X=(X+1)%P.length,await V.start(P[X].id,{fps:10,qrbox:{width:240,height:240}},Pt,()=>{}))}catch(t){console.error("switchCam:",t)}}async function ft(){if(V&&at)try{await V.stop()}catch{}at=!1,document.getElementById("btn-start-cam").style.display="inline-flex",document.getElementById("btn-switch-cam").style.display="none",document.getElementById("btn-stop-cam").style.display="none"}async function Pt(t){ft(),document.getElementById("inp-url").value=t,M("✅ QR Code lido! Processando..."),await kt(t)}document.getElementById("btn-carregar-dados").addEventListener("click",async()=>{const t=document.getElementById("inp-url").value.trim(),e=document.getElementById("inp-html").value.trim();if(!t&&!e){M("⚠️ Cole a URL do QR Code ou o conteúdo da página para ler a nota fiscal.");return}if(t&&!e){M("⏳ Consultando nota fiscal..."),await kt(t);return}if(e){M("⏳ Processando conteúdo..."),await Ut(e);return}});document.getElementById("btn-preencher-manual").addEventListener("click",()=>{Nt({nomeMercado:"",dataEmissao:new Date().toISOString(),valorTotal:0,descontoTotal:0,valorAPagar:0,qtdTotalItens:0,formasPagamento:{valeAlimentacao:0,cartaoCredito:0,cartaoDebito:0},itens:[]}),M("✍️ Preencha os dados da compra abaixo e clique em Salvar Nota Fiscal.","var(--accent-cyan)")});function Nt(t){var r,i,c;document.getElementById("inp-mercado").value=t.nomeMercado||"",document.getElementById("inp-data").value=Zt(t.dataEmissao),document.getElementById("inp-vtotal").value=t.valorTotal!==void 0?t.valorTotal:0,document.getElementById("inp-desconto").value=t.descontoTotal!==void 0?t.descontoTotal:0,document.getElementById("inp-pagar").value=t.valorAPagar!==void 0?t.valorAPagar:0,document.getElementById("inp-qtd").value=t.qtdTotalItens!==void 0?t.qtdTotalItens:0,document.getElementById("inp-alim").value=((r=t.formasPagamento)==null?void 0:r.valeAlimentacao)||0,document.getElementById("inp-cred").value=((i=t.formasPagamento)==null?void 0:i.cartaoCredito)||0,document.getElementById("inp-deb").value=((c=t.formasPagamento)==null?void 0:c.cartaoDebito)||0,G=t.itens||[];const e=document.getElementById("form-nfce");e.style.display="block";const a=document.getElementById("preview-itens-box"),o=document.getElementById("count-preview-itens"),n=document.getElementById("lista-preview-itens");G.length>0?(a.style.display="block",o.textContent=G.length,n.innerHTML=G.map(d=>`
      <div style="display:flex; justify-content:space-between; padding: 0.35rem 0; border-bottom: 1px dashed var(--border-color);">
        <span><strong>${d.nome}</strong> (${d.quantidade} ${d.unidade||"Un"})</span>
        <span>${m(d.valorUnitario)}/un = <strong>${m(d.valorTotal)}</strong></span>
      </div>
    `).join("")):a.style.display="none",e.scrollIntoView({behavior:"smooth"})}document.getElementById("form-nfce").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-mercado").value.trim()||"Mercado",a=document.getElementById("inp-data").value||new Date().toISOString(),o=parseFloat(document.getElementById("inp-vtotal").value)||0,n=parseFloat(document.getElementById("inp-desconto").value)||0,r=parseFloat(document.getElementById("inp-pagar").value)||0,i=parseInt(document.getElementById("inp-qtd").value)||0,c=parseFloat(document.getElementById("inp-alim").value)||0,d=parseFloat(document.getElementById("inp-cred").value)||0,s=parseFloat(document.getElementById("inp-deb").value)||0,l=new Date(a).toISOString().slice(0,16),u=S.find(v=>{const h=new Date(v.dataEmissao).toISOString().slice(0,16),L=Math.abs((v.valorAPagar||0)-r)<.05,R=(v.nomeMercado||"").toLowerCase().trim()===e.toLowerCase().trim();return h===l&&L&&R});if(u){M(`⚠️ Esta nota fiscal já existe no sistema (Cadastrada em ${rt(u.dataEmissao)} no valor de ${m(u.valorAPagar)}). Nota não adicionada!`,"#fb7185"),g("⚠️ Nota fiscal já cadastrada! Operação cancelada.");return}const b=new Date(a),f=`${b.getFullYear()}-${String(b.getMonth()+1).padStart(2,"0")}`;M("⏳ Salvando nota fiscal no banco...");try{await dt(j(x,vt),{nomeMercado:e,dataEmissao:a,mesAno:f,qtdTotalItens:i||G.length,valorTotal:o,descontoTotal:n,valorAPagar:r,formasPagamento:{valeAlimentacao:c,cartaoCredito:d,cartaoDebito:s},itens:G,createdAt:pt()}),M("✅ Nota salva com sucesso!","#34d399"),document.getElementById("form-nfce").style.display="none",document.getElementById("form-nfce").reset(),document.getElementById("inp-url").value="",document.getElementById("inp-html").value="",G=[],At(),goTab("dashboard"),g("🎉 Nota fiscal registrada no Firebase!")}catch(v){M("❌ Erro ao salvar: "+v.message,"#fb7185")}});async function kt(t){const e=[a=>`https://api.allorigins.win/raw?url=${encodeURIComponent(a)}`,a=>`https://corsproxy.io/?${encodeURIComponent(a)}`];for(const a of e)try{const o=await fetch(a(t),{signal:AbortSignal.timeout(8e3)});if(o.ok){const n=await o.text();if(n&&n.length>200){await Ut(n);return}}}catch{}fe(t)}function fe(t){document.getElementById("modal-link").href=t,document.getElementById("modal-cors").classList.add("active"),M("⚠️ Abra o link, copie o conteúdo da página e cole no campo de texto abaixo.")}async function Ut(t){const e=he(t);Nt(e),M("✅ Nota lida com sucesso! Confira os valores abaixo e altere se necessário antes de Salvar.","#34d399")}function he(t){var Q,Y,H;const a=new DOMParser().parseFromString(t,"text/html"),o=((Q=a.body)==null?void 0:Q.textContent)||t;let n=((H=(Y=a.querySelector(".txtTopo, .nomeEmit, h1"))==null?void 0:Y.textContent)==null?void 0:H.trim())||"Mercado",r=new Date().toISOString();const i=o.match(/Emiss[ãa]o\s*[:\-]?\s*(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})?/i)||o.match(/(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})/);if(i){const[U,p,y]=i[1].split("/");r=`${y}-${p}-${U}T${i[2]||"12:00:00"}`}const c=o.match(/Qtd\.?\s*total\s*de\s*itens\s*[:\s]*([\d,\.]+)/i),d=o.match(/Valor\s*total\s*R\$\s*[:\s]*([\d\.,]+)/i),s=o.match(/Descontos?\s*R\$\s*[:\s]*([\d\.,]+)/i),l=o.match(/Valor\s*a\s*pagar\s*R\$\s*[:\s]*([\d\.,]+)/i)||o.match(/VALOR\s*PAGO\s*R\$\s*[:\s]*([\d\.,]+)/i),u=o.match(/(?:Vale\s*)?Alimenta[çc][ãa]o\s*[:\s]*([\d\.,]+)/i),b=o.match(/(?:Cart[ãa]o\s*de\s*)?Cr[eé]dito\s*[:\s]*([\d\.,]+)/i),f=o.match(/(?:Cart[ãa]o\s*de\s*)?D[eé]bito\s*[:\s]*([\d\.,]+)/i),v=c?C(c[1]):0,h=d?C(d[1]):0,L=s?C(s[1]):0;let R=l?C(l[1]):h-L;const N={valeAlimentacao:u?C(u[1]):0,cartaoCredito:b?C(b[1]):0,cartaoDebito:f?C(f[1]):0},z=[];a.querySelectorAll("tr, .item, .itemNota").forEach(U=>{var ht;const p=U.textContent;if(!/Vl\.\s*Unit|valorUnitario|Qtde?\./i.test(p))return;const y=U.querySelector(".txtTit, .txtTit2, .nomeProd"),I=((ht=y==null?void 0:y.textContent)==null?void 0:ht.trim())||"",_=p.match(/Qtde?\.\s*[:\s]*([\d,\.]+)/i),it=p.match(/Vl\.\s*Unit\.\s*[:\s]*([\d,\.]+)/i),q=p.match(/Vl\.\s*Total\s*([\d,\.]+)/i),J=p.match(/C[oó]digo\s*[:\s]*(\d+)/i),K=p.match(/UN\s*[:\s]*([A-Za-z]+)/i),lt=_?C(_[1]):1,ct=it?C(it[1]):0,jt=q?C(q[1]):ct*lt;I&&ct>0&&z.push({codigo:(J==null?void 0:J[1])||"",nome:I,marca:be(I),quantidade:lt,unidade:(K==null?void 0:K[1])||"Un",valorUnitario:ct,valorTotal:jt})});const E=new Date(r),A=`${E.getFullYear()}-${String(E.getMonth()+1).padStart(2,"0")}`;return{nomeMercado:n,dataEmissao:r,mesAno:A,qtdTotalItens:v,valorTotal:h,descontoTotal:L,valorAPagar:R,formasPagamento:N,itens:z}}function be(t){const e=["BAUDUCCO","BAUD","PANCO","DANONE","NESTLE","QUALITA","SADIA","PERDIGAO","SEARA","CAMIL","TIO JOAO","URBANO","LIZA","SOYA","YPE","PILAO","MELITTA","3 CORACOES","VIGOR","PARMALAT","ITALAC","HEINZ","KRAFT"],a=t.toUpperCase();for(const o of e)if(a.includes(o))return o;return a.split(" ")[0]||"Genérica"}function ye(){const t=document.getElementById("lista-historico");if(!S.length){t.innerHTML='<div class="empty-state">📭 Nenhuma compra cadastrada ainda.</div>';return}t.innerHTML=S.map(e=>{var a,o,n;return`
    <div class="purchase-card">
      <div class="purchase-header" onclick="toggleDetail('${e.id}')">
        <div class="purchase-info">
          <h3>${e.nomeMercado||"Mercado"}</h3>
          <p>📅 ${rt(e.dataEmissao)} &nbsp;•&nbsp; 🛒 ${e.qtdTotalItens||0} itens</p>
        </div>
        <div class="purchase-values">
          <div class="pv-total">${m(e.valorAPagar)}</div>
          <div class="pv-sub">Desc: ${m(e.descontoTotal)}</div>
        </div>
        <svg class="chevron" id="chev-${e.id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      <div class="purchase-details" id="detail-${e.id}">
        <div class="details-toolbar">
          <span class="card-subtext">Pagamentos: Alimentação ${m((a=e.formasPagamento)==null?void 0:a.valeAlimentacao)} · Crédito ${m((o=e.formasPagamento)==null?void 0:o.cartaoCredito)} · Débito ${m((n=e.formasPagamento)==null?void 0:n.cartaoDebito)}</span>
          <button class="btn-danger" onclick="confirmarExcluirMercado('${e.id}')">🗑️ Excluir</button>
        </div>
        ${Vt(e)}
      </div>
    </div>`}).join("")}function Vt(t){return!t.itens||!t.itens.length?'<p class="card-subtext">Nenhum item detalhado registrado.</p>':`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Item</th><th>Marca</th><th class="num">Qtd</th><th class="num">Vl. Unit.</th><th class="num">Vl. Total</th></tr></thead>
    <tbody>${t.itens.map(e=>`<tr>
      <td>${e.nome}</td>
      <td><span class="badge amber">${e.marca||"—"}</span></td>
      <td class="num">${e.quantidade} ${e.unidade||"Un"}</td>
      <td class="num">${m(e.valorUnitario)}</td>
      <td class="num"><strong>${m(e.valorTotal)}</strong></td>
    </tr>`).join("")}</tbody>
  </table></div>`}window.toggleDetail=function(t){const e=document.getElementById("detail-"+t),a=document.getElementById("chev-"+t);e&&e.classList.toggle("open"),a&&a.classList.toggle("open")};window.confirmarExcluirMercado=async function(t){if(confirm("Excluir esta compra de mercado?"))try{await Z(D(x,vt,t)),g("🗑️ Compra excluída.")}catch(e){alert("Erro: "+e.message)}};function Ee(){const t=document.getElementById("lista-comparacao"),e={};S.forEach(o=>{(o.itens||[]).forEach(n=>{var i;const r=((i=n.nome)==null?void 0:i.toLowerCase().trim())||"produto";e[r]||(e[r]={nome:n.nome,marca:n.marca,hist:{}}),e[r].hist[o.mesAno]=n.valorUnitario})});const a=Object.values(e);if(!a.length){t.innerHTML='<div class="empty-state">Adicione notas para ver a comparação de preços unitários.</div>';return}t.innerHTML=`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Produto</th><th>Marca</th><th>Histórico (Unitário)</th><th>Variação</th></tr></thead>
    <tbody>${a.map(o=>{const n=Object.keys(o.hist).sort();let r=n.map(c=>`${c}: <strong>${m(o.hist[c])}</strong>`).join(" → "),i='<span class="badge cyan">Estável</span>';if(n.length>=2){const c=o.hist[n[n.length-2]],s=o.hist[n[n.length-1]]-c,l=(s/c*100).toFixed(1);s>.01?i=`<span class="badge red">+${l}% ↑</span>`:s<-.01&&(i=`<span class="badge green">${l}% ↓</span>`)}return`<tr><td><strong>${o.nome}</strong></td><td><span class="badge amber">${o.marca||"—"}</span></td><td>${r}</td><td>${i}</td></tr>`}).join("")}</tbody>
  </table></div>`}function $e(){const t=document.getElementById("lista-recorrencia"),e=document.getElementById("lista-marcas"),a={},o={};S.forEach(i=>{(i.itens||[]).forEach(c=>{var u;const d=(u=c.nome)==null?void 0:u.toLowerCase().trim();if(!d)return;a[d]||(a[d]={nome:c.nome,marca:c.marca,qtd:0,notas:0,units:[]}),a[d].qtd+=c.quantidade||1,a[d].notas+=1,a[d].units.push(c.valorUnitario||0);const s=(c.nome||"").split(" ")[0].toUpperCase();o[s]||(o[s]={});const l=c.marca||"Genérica";o[s][l]||(o[s][l]=[]),o[s][l].push(c.valorUnitario||0)})});const n=Object.values(a).filter(i=>i.notas>1).sort((i,c)=>c.notas-i.notas);t.innerHTML=n.length?`<div class="table-responsive"><table class="custom-table">
        <thead><tr><th>Item</th><th>Marca</th><th>Compras</th><th class="num">Qtd Total</th><th class="num">Média Unitária</th></tr></thead>
        <tbody>${n.map(i=>{const c=i.units.reduce((d,s)=>d+s,0)/i.units.length;return`<tr>
            <td><strong>${i.nome}</strong></td>
            <td><span class="badge amber">${i.marca||"—"}</span></td>
            <td><span class="badge green">${i.notas}x</span></td>
            <td class="num">${i.qtd}</td>
            <td class="num">${m(c)}</td>
          </tr>`}).join("")}</tbody>
      </table></div>`:'<div class="empty-state">Adicione notas para ver a recorrência de itens.</div>';const r=Object.entries(o).filter(([,i])=>Object.keys(i).length>1).map(([i,c])=>{let d=1/0,s="";const l=Object.entries(c).map(([u,b])=>{const f=b.reduce((v,h)=>v+h,0)/b.length;return f<d&&(d=f,s=u),{marca:u,med:f}});return`<div class="brand-card">
      <div class="brand-card-header">
        <span class="card-title">${i}</span>
        <span class="badge green">🏆 Menor preço: ${s} (${m(d)}/un)</span>
      </div>
      <div class="brands-row">
        ${l.map(u=>`<div class="brand-chip${u.marca===s?" best":""}">
          <div class="bc-name">${u.marca} ${u.marca===s?"✅":""}</div>
          <div class="bc-val">${m(u.med)}<span style="font-size:.7rem;font-weight:400">/un</span></div>
        </div>`).join("")}
      </div>
    </div>`}).join("");e.innerHTML=r||'<div class="empty-state">Ao comprar o mesmo tipo de produto com marcas diferentes, o sistema mostrará qual teve menor preço.</div>'}document.getElementById("btn-modal-close").addEventListener("click",()=>{document.getElementById("modal-cors").classList.remove("active")});
