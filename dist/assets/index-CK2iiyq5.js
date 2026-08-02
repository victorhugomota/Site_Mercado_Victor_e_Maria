import{initializeApp as Yt}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";import{getFirestore as _t,onSnapshot as nt,query as Zt,collection as z,orderBy as Wt,doc as S,setDoc as st,addDoc as ct,deleteDoc as W,serverTimestamp as vt}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function a(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(n){if(n.ep)return;n.ep=!0;const s=a(n);fetch(n.href,s)}})();const It=document.createElement("script");It.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js";document.head.appendChild(It);const xt=document.createElement("script");xt.src="https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js";document.head.appendChild(xt);const Jt={apiKey:"AIzaSyANpFnEIkyN1XCT6qbtmVR9wx7sQHEsyrE",authDomain:"comprasmercado-23913.firebaseapp.com",projectId:"comprasmercado-23913",storageBucket:"comprasmercado-23913.firebasestorage.app",messagingSenderId:"317518149234",appId:"1:317518149234:web:94f38624d68a2b9a6634eb",measurementId:"G-2XP88EK37S"},Kt=Yt(Jt),B=_t(Kt),gt="compras",rt="entradas",et="faturas",at="boletos",wt="reservas";let M=[],R=[],D=[],q=[],pt={metaMensal:0,valorAtualGuardado:0},ut=null,U=null,k=[],tt=0,ot=!1,Q=[];function d(t){return Number(t||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}function T(t){if(typeof t=="number")return t;if(!t)return 0;const e=parseFloat(String(t).replace(/R\$\s?/gi,"").replace(/\s/g,"").replace(/\./g,"").replace(",","."));return isNaN(e)?0:e}function it(t){if(!t)return"—";try{return new Date(t).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}catch{return t}}function g(t,e=3500){const a=document.getElementById("toast");a.textContent=t,a.classList.add("show"),setTimeout(()=>a.classList.remove("show"),e)}function C(t,e="var(--accent-amber)"){const a=document.getElementById("status-msg");a&&(a.textContent=t,a.style.color=e)}function Xt(t){if(!t)return new Date().toISOString().slice(0,16);try{const e=new Date(t);if(isNaN(e.getTime()))return new Date().toISOString().slice(0,16);const a=o=>String(o).padStart(2,"0");return`${e.getFullYear()}-${a(e.getMonth()+1)}-${a(e.getDate())}T${a(e.getHours())}:${a(e.getMinutes())}`}catch{return new Date().toISOString().slice(0,16)}}function te(t,e){let a=0;const o=new Date(t,e+1,0).getDate();for(let n=1;n<=o;n++){const s=new Date(t,e,n).getDay();s!==0&&s!==6&&a++}return a}window.goTab=function(t){document.querySelectorAll(".tab-content").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".desktop-nav .nav-item").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".mobile-nav .mob-btn").forEach(a=>a.classList.remove("active"));const e=document.getElementById("tab-"+t);e&&e.classList.add("active"),document.querySelectorAll(`[data-tab="${t}"]`).forEach(a=>a.classList.add("active"))};document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>goTab(t.getAttribute("data-tab")))});document.querySelectorAll(".sub-item").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".sub-item").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".sub-tab-content").forEach(a=>a.style.display="none"),t.classList.add("active");const e=document.getElementById("sub-"+t.getAttribute("data-sub"));e&&(e.style.display="block")})});function Bt(){document.getElementById("modal-add-nota").classList.add("active")}function At(){ot&&bt(),document.getElementById("modal-add-nota").classList.remove("active")}var yt;(yt=document.getElementById("btn-open-modal-home"))==null||yt.addEventListener("click",Bt);var Et;(Et=document.getElementById("btn-mercado-add-nota"))==null||Et.addEventListener("click",Bt);var $t;($t=document.getElementById("btn-close-modal-add"))==null||$t.addEventListener("click",At);nt(Zt(z(B,gt),Wt("dataEmissao","desc")),t=>{M=t.docs.map(e=>({id:e.id,...e.data()})),J()},t=>console.error("Firestore Mercado:",t));nt(z(B,rt),t=>{R=t.docs.map(e=>({id:e.id,...e.data()})),J()},t=>console.error("Firestore Entradas:",t));nt(z(B,et),t=>{D=t.docs.map(e=>({id:e.id,...e.data()})),J()},t=>console.error("Firestore Faturas:",t));nt(z(B,at),t=>{q=t.docs.map(e=>({id:e.id,...e.data()})),J()},t=>console.error("Firestore Boletos:",t));nt(S(B,wt,"config"),t=>{t.exists()&&(pt=t.data()),J()},t=>console.error("Firestore Reservas:",t));let E=new Date().toISOString().slice(0,7);function Tt(){const t=new Set,e=new Date().toISOString().slice(0,7);return t.add(e),E&&t.add(E),R.forEach(a=>{a.mesAno&&t.add(a.mesAno)}),D.forEach(a=>{a.mesAno&&t.add(a.mesAno)}),q.forEach(a=>{a.mesAno&&t.add(a.mesAno)}),M.forEach(a=>{a.mesAno&&t.add(a.mesAno)}),Array.from(t).sort().reverse()}window.selecionarMesGlobal=function(t){if(!t)return;E=t;const e=document.getElementById("inp-seletor-mes-global");e&&(e.value=t);const a=document.getElementById("inp-entradas-mes-ano");a&&(a.value=t);const o=document.getElementById("inp-fatura-vencimento");o&&(o.value=`${t}-10`,typeof atualizarMesRefFatura=="function"&&atualizarMesRefFatura());const n=document.getElementById("inp-boleto-vencimento");n&&(n.value=`${t}-10`,typeof atualizarMesRefBoleto=="function"&&atualizarMesRefBoleto()),J()};window.verMesEIrParaControle=function(t){selecionarMesGlobal(t),typeof goTab=="function"&&goTab("mensal")};function ee(){const t=document.getElementById("seletor-meses-bar"),e=document.getElementById("seletor-meses-bar-salarios"),a=Tt();a.includes(E)||(E=a[0]||new Date().toISOString().slice(0,7));const o=document.getElementById("inp-seletor-mes-global");o&&o.value!==E&&(o.value=E);const n=document.getElementById("inp-entradas-mes-ano");n&&n.value!==E&&(n.value=E);const s=a.map(r=>{const[c,l]=r.split("-"),m=new Date(parseInt(c),parseInt(l)-1,1).toLocaleString("pt-BR",{month:"short"}).toUpperCase().replace(".",""),u=r===E;return`
      <button class="sub-item ${u?"active":""}" onclick="selecionarMesGlobal('${r}')" style="${u?"background:var(--secondary);color:#fff;border-color:var(--secondary);box-shadow:0 0 10px rgba(99,102,241,0.4);font-weight:700":"background:rgba(15,23,42,.6);color:var(--text-muted);border:1px solid var(--border-color)"}; display:inline-flex;align-items:center;gap:.35rem">
        📅 ${m}/${c}
      </button>
    `}).join("");t&&(t.innerHTML=s),e&&(e.innerHTML=s)}window.switchMensalSub=function(t){document.querySelectorAll("[data-mensal-sub]").forEach(o=>o.classList.remove("active")),document.querySelectorAll(".mensal-sub-content").forEach(o=>o.style.display="none");const e=document.querySelector(`[data-mensal-sub="${t}"]`);e&&e.classList.add("active");const a=document.getElementById(t);a&&(a.style.display="block")};function J(){ee(),ne(),ae(),St(),ue(),ge(),be(),Ie(),xe(),we(),fe()}function ae(){const t=E,e=R.filter($=>$.mesAno===t),a=D.filter($=>$.mesAno===t),o=q.filter($=>$.mesAno===t),n=M.filter($=>$.mesAno===t),s=e.reduce(($,A)=>$+(A.valor||0),0),r=a.reduce(($,A)=>$+(A.valorTotal!==void 0?A.valorTotal:A.valor||0),0),c=o.reduce(($,A)=>$+(A.valorTotal!==void 0?A.valorTotal:A.valor||0),0);let l=0;n.forEach($=>{$.formasPagamento&&(l+=$.formasPagamento.cartaoDebito||0)});const i=s-r-c-l,m=document.getElementById("m-total-entradas");m&&(m.textContent=d(s));const u=document.getElementById("m-total-cartoes");u&&(u.textContent=d(r));const f=document.getElementById("m-total-boletos");f&&(f.textContent=d(c));const h=document.getElementById("m-mercado-debito");h&&(h.textContent=d(l));const v=document.getElementById("m-saldo-liquido");v&&(v.textContent=d(i),v.style.color=i>=0?"#60a5fa":"#fb7185");const[b,L]=t.split("-"),P=new Date(parseInt(b),parseInt(L)-1,1).toLocaleString("pt-BR",{month:"long"}),j=P.charAt(0).toUpperCase()+P.slice(1),N=document.getElementById("m-lbl-saldo-liquido");N&&(N.textContent=`Saldo Líquido (${j}/${b})`),oe(e,a,o,n)}function oe(t,e,a,o){const n=document.getElementById("content-salarios-mes");n&&(n.innerHTML=`
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header">
          <span class="card-title">💵 Entradas Registradas em ${E}</span>
          <span class="badge green">Total: ${d(t.reduce((l,i)=>l+(i.valor||0),0))}</span>
        </div>
        ${t.length?`<div class="table-responsive"><table class="custom-table">
              <thead><tr><th>Pessoa</th><th>Descrição</th><th>Tipo</th><th class="num">Valor</th><th>Ação</th></tr></thead>
              <tbody>${t.map(l=>`<tr>
                <td><span class="badge ${l.pessoa==="Victor"?"green":l.pessoa==="Maria"?"purple":"cyan"}">${l.pessoa}</span></td>
                <td><strong>${l.descricao}</strong></td>
                <td><span class="badge amber">${l.tipo==="holerite"?"Holerite":"Manual"}</span></td>
                <td class="num" style="color:#34d399"><strong>${d(l.valor)}</strong></td>
                <td><button class="btn-danger" onclick="excluirEntrada('${l.id}')">🗑️</button></td>
              </tr>`).join("")}</tbody>
            </table></div>`:`<div class="empty-state">Nenhuma entrada cadastrada para ${E}. Use a aba "Salários & Entradas" para cadastrar.</div>`}
      </div>
    `);const s=document.getElementById("content-cartoes-mes");if(s){const l=e.reduce((m,u)=>m+(u.valorTotal||0),0),i=e.length?qt(e):"";s.innerHTML=`
      ${i}
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header">
          <span class="card-title">💳 Faturas de Cartão Vencendo em ${E}</span>
          <span class="badge rose">Total: ${d(l)}</span>
        </div>
        ${e.length?e.map(m=>`
              <div class="purchase-card" style="margin-bottom:1rem">
                <div class="purchase-header" onclick="toggleDetail('fat-m-${m.id}')">
                  <div class="purchase-info">
                    <h3>${m.cartao==="Nubank"?"🟣 Nubank":m.cartao==="Santander"?"🔴 Santander":"💳 "+(m.descricao||m.cartao)}</h3>
                    <p>Vencimento: <strong>${m.dataVencimento||"—"}</strong> • ${m.qtdItens||(m.itens?m.itens.length:0)} lançamentos</p>
                  </div>
                  <div class="purchase-values">
                    <div class="pv-total" style="color:#fb7185">${d(m.valorTotal)}</div>
                    <div class="pv-sub">Clique para ver itens <span class="chevron">▼</span></div>
                  </div>
                </div>
                <div id="fat-m-${m.id}" class="purchase-details">
                  <div class="details-toolbar">
                    <span style="font-weight:700;font-size:.9rem;color:var(--text-muted)">Lançamentos da Fatura</span>
                    <button class="btn-danger" onclick="excluirFaturaDocumento('${m.id}')">🗑️ Excluir Fatura</button>
                  </div>
                  ${Ot(m)}
                </div>
              </div>
            `).join(""):`<div class="empty-state">Nenhuma fatura cadastrada com vencimento em ${E}. Use a aba "Cartões de Crédito" para importar.</div>`}
      </div>
    `}const r=document.getElementById("content-boletos-mes");if(r){const l=a.reduce((i,m)=>i+(m.valorTotal||0),0);r.innerHTML=`
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header">
          <span class="card-title">📄 Boletos Vencendo em ${E}</span>
          <span class="badge purple">Total: ${d(l)}</span>
        </div>
        ${a.length?a.map(i=>`
              <div class="purchase-card" style="margin-bottom:1rem">
                <div class="purchase-header" onclick="toggleDetail('bol-m-${i.id}')">
                  <div class="purchase-info">
                    <h3>📄 ${i.descricao||"Boleto / Conta"}</h3>
                    <p>Vencimento: <strong>${i.dataVencimento||"—"}</strong> • ${i.qtdItens||(i.itens?i.itens.length:0)} encargos</p>
                  </div>
                  <div class="purchase-values">
                    <div class="pv-total" style="color:#c084fc">${d(i.valorTotal)}</div>
                    <div class="pv-sub">Clique para ver detalhes <span class="chevron">▼</span></div>
                  </div>
                </div>
                <div id="bol-m-${i.id}" class="purchase-details">
                  <div class="details-toolbar">
                    <span style="font-weight:700;font-size:.9rem;color:var(--text-muted)">Detalhamento do Boleto</span>
                    <button class="btn-danger" onclick="excluirBoletoDocumento('${i.id}')">🗑️ Excluir Boleto</button>
                  </div>
                  ${Nt(i)}
                </div>
              </div>
            `).join(""):`<div class="empty-state">Nenhum boleto cadastrado para ${E}. Use a aba "Boletos" para importar.</div>`}
      </div>
    `}const c=document.getElementById("content-mercado-mes");c&&(c.innerHTML=`
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header">
          <span class="card-title">🛒 Compras de Mercado em ${E}</span>
          <span class="badge amber">${o.length} notas cadastradas</span>
        </div>
        ${o.length?o.map(l=>`
              <div class="purchase-card" style="margin-bottom:1rem">
                <div class="purchase-header" onclick="toggleDetail('mer-m-${l.id}')">
                  <div class="purchase-info">
                    <h3>🛒 ${l.nomeMercado||"Mercado"}</h3>
                    <p>Data: <strong>${it(l.dataEmissao)}</strong> • ${l.qtdTotalItens||0} itens</p>
                  </div>
                  <div class="purchase-values">
                    <div class="pv-total" style="color:#fbbf24">${d(l.valorAPagar)}</div>
                    <div class="pv-sub">Clique para ver itens <span class="chevron">▼</span></div>
                  </div>
                </div>
                <div id="mer-m-${l.id}" class="purchase-details">
                  <div class="details-toolbar">
                    <span style="font-weight:700;font-size:.9rem;color:var(--text-muted)">Itens da Nota</span>
                    <button class="btn-danger" onclick="excluirCompraDocumento('${l.id}')">🗑️ Excluir Nota</button>
                  </div>
                  ${Gt(l)}
                </div>
              </div>
            `).join(""):`<div class="empty-state">Nenhuma nota de mercado cadastrada para ${E}.</div>`}
      </div>
    `)}function ne(){let t=R.reduce((i,m)=>i+(m.valor||0),0),e=D.reduce((i,m)=>i+(m.valorTotal!==void 0?m.valorTotal:m.valor||0),0),a=q.reduce((i,m)=>i+(m.valorTotal!==void 0?m.valorTotal:m.valor||0),0),o=0,n=0,s=0;const r={};M.forEach(i=>{const m=i.valorAPagar||0;i.formasPagamento&&(n+=i.formasPagamento.valeAlimentacao||0,s+=i.formasPagamento.cartaoCredito||0,o+=i.formasPagamento.cartaoDebito||0);const u=i.mesAno||"Outros";r[u]=(r[u]||0)+m});let c=t-e-a-o;document.getElementById("fin-total-entradas").textContent=d(t);const l=document.getElementById("fin-subtext-entradas");l&&(l.textContent="Total de Entradas Cadastradas"),document.getElementById("fin-total-cartoes").textContent=d(e),document.getElementById("fin-total-boletos").textContent=d(a),document.getElementById("fin-mercado-debito").textContent=d(o),document.getElementById("fin-saldo-liquido").textContent=d(c),document.getElementById("dash-alimentacao").textContent=d(n),document.getElementById("dash-credito").textContent=d(s),document.getElementById("dash-debito").textContent=d(o),se(),Ct(r)}function se(){const t=document.getElementById("tabela-resumo-mensal");if(!t)return;const e=Tt();if(!e.length){t.innerHTML='<div class="empty-state">Nenhum dado cadastrado ainda.</div>';return}const a=e.map(o=>{const n=R.filter(v=>v.mesAno===o).reduce((v,b)=>v+(b.valor||0),0),s=D.filter(v=>v.mesAno===o).reduce((v,b)=>v+(b.valorTotal!==void 0?b.valorTotal:b.valor||0),0),r=q.filter(v=>v.mesAno===o).reduce((v,b)=>v+(b.valorTotal!==void 0?b.valorTotal:b.valor||0),0);let c=0;M.filter(v=>v.mesAno===o).forEach(v=>{v.formasPagamento&&(c+=v.formasPagamento.cartaoDebito||0)});const l=n-s-r-c,[i,m]=o.split("-"),f=new Date(parseInt(i),parseInt(m)-1,1).toLocaleString("pt-BR",{month:"short"}).toUpperCase().replace(".","");return`
      <tr style="${o===E?"background:rgba(99,102,241,0.1)":""}">
        <td><strong>📅 ${f}/${i}</strong></td>
        <td style="color:#34d399"><strong>${d(n)}</strong></td>
        <td style="color:#fb7185">${d(s)}</td>
        <td style="color:#c084fc">${d(r)}</td>
        <td style="color:#fbbf24">${d(c)}</td>
        <td style="color:${l>=0?"#60a5fa":"#fb7185"}; font-weight:800">${d(l)}</td>
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
  `}function Ct(t){var s;if(typeof Chart>"u")return setTimeout(()=>Ct(t),300);const e=(s=document.getElementById("chart-barras"))==null?void 0:s.getContext("2d");if(!e)return;const a=Object.keys(t).sort(),o=a.map(r=>{const[c,l]=r.split("-");return`${l}/${c}`}),n=a.map(r=>t[r]);ut&&ut.destroy(),ut=new Chart(e,{type:"bar",data:{labels:o.length?o:["Sem compras"],datasets:[{label:"Gasto Mercado R$",data:n.length?n:[0],backgroundColor:"rgba(16,185,129,0.78)",borderColor:"#10b981",borderWidth:2,borderRadius:8}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:r=>` ${d(r.raw)}`}}},scales:{y:{beginAtZero:!0,grid:{color:"rgba(255,255,255,.05)"},ticks:{color:"#94a3b8",callback:r=>"R$"+r}},x:{grid:{display:!1},ticks:{color:"#94a3b8"}}}}})}function Mt(t){if(!t)return 0;const e=t.match(/L[íi]quido(?:\s*a\s*receber)?\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/TOTAL\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/SAL[ÁA]RIO\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/VALOR\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i);return e?T(e[1]):0}function re(){const t=document.getElementById("inp-entradas-mes-ano");if(t&&!t.value){const e=new Date,a=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0");t.value=`${a}-${o}`}}setTimeout(re,300);let G="mes";window.toggleFiltroEntradasTabela=function(t){G=t,St()};document.getElementById("form-holerite-victor").addEventListener("submit",async t=>{t.preventDefault();const e=E||document.getElementById("inp-entradas-mes-ano").value||new Date().toISOString().slice(0,7),a=document.getElementById("inp-holerite-txt-victor").value;let o=parseFloat(document.getElementById("inp-salario-val-victor").value)||0;if(!o&&a&&(o=Mt(a)),!o){g("⚠️ Digite ou cole um holerite válido com valor.");return}const n=`salario_victor_${e}`;await st(S(B,rt,n),{pessoa:"Victor",tipo:"holerite",descricao:`Salário Líquido Victor (${e})`,valor:o,mesAno:e,data:new Date().toISOString()}),document.getElementById("inp-holerite-txt-victor").value="",document.getElementById("inp-salario-val-victor").value="",g(`✅ Salário do Victor (${e}) salvo com sucesso!`)});document.getElementById("form-holerite-maria").addEventListener("submit",async t=>{t.preventDefault();const e=E||document.getElementById("inp-entradas-mes-ano").value||new Date().toISOString().slice(0,7),a=document.getElementById("inp-holerite-txt-maria").value;let o=parseFloat(document.getElementById("inp-salario-val-maria").value)||0;if(!o&&a&&(o=Mt(a)),!o){g("⚠️ Digite ou cole um holerite válido com valor.");return}const n=`salario_maria_${e}`;await st(S(B,rt,n),{pessoa:"Maria",tipo:"holerite",descricao:`Salário Líquido Maria (${e})`,valor:o,mesAno:e,data:new Date().toISOString()}),document.getElementById("inp-holerite-txt-maria").value="",document.getElementById("inp-salario-val-maria").value="",g(`✅ Salário da Maria (${e}) salvo com sucesso!`)});document.getElementById("form-entrada-manual").addEventListener("submit",async t=>{t.preventDefault();const e=E||document.getElementById("inp-entradas-mes-ano").value||new Date().toISOString().slice(0,7),a=document.getElementById("inp-ent-desc").value.trim(),o=parseFloat(document.getElementById("inp-ent-val").value)||0,n=document.getElementById("inp-ent-pessoa").value;!a||!o||(await ct(z(B,rt),{pessoa:n,tipo:"manual",descricao:a,valor:o,mesAno:e,data:new Date().toISOString()}),t.target.reset(),g(`🎉 Entrada manual (${e}) registrada!`))});function St(){var l,i,m;const t=E||((l=document.getElementById("inp-entradas-mes-ano"))==null?void 0:l.value)||new Date().toISOString().slice(0,7),e=document.getElementById("lbl-entradas-mes-ref");if(e){const[u,f]=t.split("-"),v=new Date(parseInt(u),parseInt(f)-1,1).toLocaleString("pt-BR",{month:"long"}),b=v.charAt(0).toUpperCase()+v.slice(1);e.textContent=`Visualizando e inserindo entradas para: ${b} de ${u}`}const a=((i=R.find(u=>u.pessoa==="Victor"&&u.tipo==="holerite"&&u.mesAno===t))==null?void 0:i.valor)||0,o=((m=R.find(u=>u.pessoa==="Maria"&&u.tipo==="holerite"&&u.mesAno===t))==null?void 0:m.valor)||0,n=R.filter(u=>u.mesAno===t),s=n.reduce((u,f)=>u+(f.valor||0),0);document.getElementById("val-salario-victor").textContent=d(a),document.getElementById("val-salario-maria").textContent=d(o),document.getElementById("val-entradas-combinado").textContent=`${d(s)}`;const r=document.getElementById("lista-entradas-registradas");if(!r)return;const c=G==="mes"?n:R;if(!c.length){r.innerHTML=`
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;flex-wrap:wrap;gap:.5rem">
        <span style="font-size:.84rem;color:var(--text-muted)">Modo de Exibição da Tabela:</span>
        <div style="display:flex;gap:.35rem">
          <button type="button" class="btn-secondary" style="padding:.25rem .6rem;font-size:.78rem;${G==="mes"?"background:var(--secondary);color:#fff":""}" onclick="toggleFiltroEntradasTabela('mes')">📅 Mês (${t})</button>
          <button type="button" class="btn-secondary" style="padding:.25rem .6rem;font-size:.78rem;${G==="todos"?"background:var(--secondary);color:#fff":""}" onclick="toggleFiltroEntradasTabela('todos')">🌐 Todas as Entradas</button>
        </div>
      </div>
      <div class="empty-state">Nenhuma entrada registrada para ${G==="mes"?"o mês "+t:"o sistema"}.</div>
    `;return}r.innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.75rem;flex-wrap:wrap;gap:.5rem">
      <span style="font-size:.84rem;color:var(--text-muted);font-weight:600">Exibindo ${c.length} entrada(s) em tabela:</span>
      <div style="display:flex;gap:.35rem">
        <button type="button" class="btn-secondary" style="padding:.25rem .6rem;font-size:.78rem;${G==="mes"?"background:var(--secondary);color:#fff":""}" onclick="toggleFiltroEntradasTabela('mes')">📅 Mês ${t}</button>
        <button type="button" class="btn-secondary" style="padding:.25rem .6rem;font-size:.78rem;${G==="todos"?"background:var(--secondary);color:#fff":""}" onclick="toggleFiltroEntradasTabela('todos')">🌐 Todas</button>
      </div>
    </div>
    <div class="table-responsive"><table class="custom-table">
      <thead><tr><th>Mês / Ref</th><th>Descrição</th><th>Pessoa</th><th>Tipo</th><th class="num">Valor</th><th>Ação</th></tr></thead>
      <tbody>${c.map(u=>`<tr>
        <td><span class="badge green">${u.mesAno||"—"}</span></td>
        <td><strong>${u.descricao}</strong></td>
        <td><span class="badge ${u.pessoa==="Victor"?"green":u.pessoa==="Maria"?"purple":"cyan"}">${u.pessoa}</span></td>
        <td><span class="badge amber">${u.tipo==="holerite"?"Holerite":"Manual"}</span></td>
        <td class="num" style="color:#34d399"><strong>${d(u.valor)}</strong></td>
        <td><button class="btn-danger" onclick="excluirEntrada('${u.id}')">🗑️</button></td>
      </tr>`).join("")}</tbody>
    </table></div>
  `}window.excluirEntrada=async function(t){confirm("Excluir esta entrada?")&&(await W(S(B,rt,t)),g("🗑️ Entrada removida."))};let ft="Nubank",I=null;function ie(){const t=document.getElementById("inp-fatura-vencimento");if(t&&!t.value){const e=new Date,a=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0");t.value=`${a}-${o}-10`,atualizarMesRefFatura()}}setTimeout(ie,300);window.atualizarMesRefFatura=function(){const t=document.getElementById("inp-fatura-vencimento"),e=document.getElementById("lbl-fatura-mes-ref");if(!(!t||!e))if(t.value){const[a,o]=t.value.split("-"),s=new Date(parseInt(a),parseInt(o)-1,1).toLocaleString("pt-BR",{month:"long"});e.textContent=`Fatura ${s.charAt(0).toUpperCase()+s.slice(1)}/${a}`}else e.textContent="Mês da Fatura"};window.selecionarCartaoFatura=function(t){ft=t,document.querySelectorAll(".btn-card-select").forEach(a=>a.classList.remove("active"));const e=document.querySelector(`.btn-card-select[data-card="${t}"]`);e&&e.classList.add("active"),g(`Cartão selecionado: ${t}`)};window.handleFileFaturaSelect=async function(t){const e=t.target.files[0];if(!e)return;const a=document.getElementById("txt-file-fatura");a&&(a.textContent=`📄 Arquivo: ${e.name}`),g(`⏳ Lendo arquivo da fatura (${e.name})...`);let o="";if(e.type==="application/pdf"||e.name.endsWith(".pdf"))o=await Dt(e);else try{o=await e.text()}catch{o=""}o?(document.getElementById("inp-fatura-txt").value=o,await Lt(o,ft)):g("❌ Não foi possível ler o texto do arquivo da fatura.")};async function Dt(t){try{const e=await t.arrayBuffer();if(typeof pdfjsLib>"u")return g("⚠️ Aguarde a biblioteca de PDF carregar..."),"";pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";let a=pdfjsLib.getDocument({data:e});a.onPassword=(s,r)=>{let c=prompt(`🔒 Este PDF de fatura está protegido por senha.
Digite a senha para abrir (ex: CPF ou Data de Nascimento):`);c?s(c):g("⚠️ Senha não informada. Leitura do PDF cancelada.")};const o=await a.promise;let n="";for(let s=1;s<=o.numPages;s++){const c=await(await o.getPage(s)).getTextContent();let l=null,i="";for(const m of c.items){if(!m.str)continue;const u=m.transform?m.transform[5]:null;l!==null&&Math.abs(u-l)>3?i+=`
`:i.length>0&&!i.endsWith(`
`)&&!i.endsWith(" ")&&(i+=" "),i+=m.str,l=u}n+=i+`
`}return n}catch(e){return e.name==="PasswordException"?g("🔒 O PDF precisa de senha válida para ser aberto."):console.error("Erro ao ler PDF:",e),""}}function le(t){if(!t)return null;const e=t.match(/Total\s*a\s*Pagar\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/no\s*valor\s*de\s*R?\$\s*([\d\.,]+)/i)||t.match(/Valor\s*total\s*da\s*fatura\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/Total\s*da\s*fatura\s*[:\s]*R?\$\s*([\d\.,]+)/i);if(e){const a=T(e[1]);if(a>0)return a}return null}function de(t){if(!t)return null;const e=t.match(/Vencimento\s*[:\s]*(\d{2}[\/\.-]\d{2}[\/\.-]\d{4})/i)||t.match(/Data\s*de\s*vencimento\s*[:\s]*(\d{2})\s+([A-Za-z]{3})\s+(\d{4})/i)||t.match(/FATURA\s+(\d{2})\s+([A-Za-z]{3})\s+(\d{4})/i);if(e){if(e[2]&&e[3]){const a=e[1],o=e[2].toUpperCase(),n=e[3],r={JAN:"01",FEB:"02",MAR:"03",ABR:"04",APR:"04",MAI:"05",MAY:"05",JUN:"06",JUL:"07",AGO:"08",AUG:"08",SET:"09",SEP:"09",OUT:"10",OCT:"10",NOV:"11",DEZ:"12",DEC:"12"}[o]||"07";return`${n}-${r}-${a.padStart(2,"0")}`}else if(e[1]){const[a,o,n]=e[1].split(/[\/\.-]/);return`${n}-${o.padStart(2,"0")}-${a.padStart(2,"0")}`}}return null}window.importarFaturaManualOuArquivo=async function(){const t=document.getElementById("inp-fatura-txt").value.trim();if(!t){g("⚠️ Selecione o arquivo da fatura (.pdf, .csv) ou cole o texto da fatura.");return}await Lt(t,ft)};async function Lt(t,e){const a=de(t);a&&(document.getElementById("inp-fatura-vencimento").value=a,atualizarMesRefFatura());const o=le(t),n=ce(t),s=document.getElementById("inp-fatura-vencimento").value||new Date().toISOString().slice(0,10),r=s.slice(0,7),c=n.reduce((f,h)=>f+h.valor,0),l=o||c||0,i=e?`Cartão ${e}`:"Fatura Cartão";I={cartao:e||"Nubank",descricao:i,dataVencimento:s,mesAno:r,valorTotal:l,qtdItens:n.length,itens:n};const m=document.getElementById("inp-revisao-fatura-desc");m&&(m.value=i);const u=document.getElementById("inp-revisao-fatura-val");u&&(u.value=l?l.toFixed(2):""),Ft(),n.length>0?g(`✅ ${n.length} compras encontradas! Fatura total: ${d(l)}.`):g("ℹ️ Fatura pronta para revisão. Confirme o valor total e o cartão abaixo.")}window.atualizarValorTotalRevisaoFatura=function(){var e;if(!I)return;const t=parseFloat((e=document.getElementById("inp-revisao-fatura-val"))==null?void 0:e.value)||0;I.valorTotal=t,document.getElementById("badge-total-preview-fatura").textContent=d(t)};function Ft(){if(!I)return;const{valorTotal:t,itens:e,cartao:a,descricao:o}=I;document.getElementById("badge-total-preview-fatura").textContent=d(t);const n=document.getElementById("inp-revisao-fatura-desc");n&&(!n.value||n.value==="Fatura Cartão")&&(n.value=o||`Cartão ${a||"Nubank"}`);const s=document.getElementById("inp-revisao-fatura-val");s&&(!s.value||parseFloat(s.value)===0)&&(s.value=t?t.toFixed(2):"");const r=document.getElementById("lista-preview-fatura-itens");!e||!e.length?r.innerHTML='<div class="empty-state">Nenhum item individual extraído. O valor total acima será considerado.</div>':r.innerHTML=e.map((l,i)=>`
      <div style="display:flex; justify-content:space-between; align-items:center; padding:.4rem 0; border-bottom:1px dashed var(--border-color); font-size:.82rem;">
        <span><strong>${l.dataCompra||"—"}</strong> — ${l.descricao}</span>
        <div style="display:flex; align-items:center; gap:.75rem;">
          <span style="color:#fb7185; font-weight:700;">${d(l.valor)}</span>
          <button type="button" class="btn-danger" style="padding:.15rem .45rem; font-size:.75rem;" onclick="removerItemRevisaoFatura(${i})">🗑️</button>
        </div>
      </div>
    `).join("");const c=document.getElementById("box-revisao-fatura");c.style.display="block",c.scrollIntoView({behavior:"smooth"})}window.removerItemRevisaoFatura=function(t){if(!I||!I.itens)return;I.itens.splice(t,1);const e=I.itens.reduce((a,o)=>a+o.valor,0);if(e>0){I.valorTotal=e;const a=document.getElementById("inp-revisao-fatura-val");a&&(a.value=e.toFixed(2))}I.qtdItens=I.itens.length,Ft(),g("🗑️ Item removido da revisão da fatura.")};window.confirmarEGravarFaturaDocumento=async function(){var o,n;if(!I)return;const t=(o=document.getElementById("inp-revisao-fatura-desc"))==null?void 0:o.value.trim(),e=parseFloat((n=document.getElementById("inp-revisao-fatura-val"))==null?void 0:n.value)||0,a=document.getElementById("inp-fatura-vencimento").value||new Date().toISOString().slice(0,10);if(!e){g("⚠️ Digite ou confirme o valor total da fatura.");return}I.cartao=t||I.cartao||"Cartão",I.valorTotal=e,I.dataVencimento=a,I.mesAno=a.slice(0,7);try{await ct(z(B,et),{...I,createdAt:vt()}),document.getElementById("box-revisao-fatura").style.display="none",document.getElementById("inp-fatura-txt").value="";const s=document.getElementById("txt-file-fatura");s&&(s.textContent="Clique para Selecionar o Arquivo da Fatura");const r=d(I.valorTotal);I=null,g(`🎉 Fatura de ${r} salva com sucesso!`)}catch(s){alert("Erro ao salvar fatura: "+s.message)}};function ce(t){if(!t)return[];const e=[],a=/(?:[@\)\(\*•\s]+)?(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+(?:(\d{2}\/\d{2})\s+)?(-?R?\$\s*[\d\.]+,\d{2}|-?[\d\.]+,\d{2})/gi;if(t.split(`
`).forEach(n=>{const s=n.trim();if(!s||/EMISS[ÃA]O|TRANSA[ÇC][ÕO]ES|RESUMO|PAGAMENTO DE FATURA|TOTAL DA FATURA|FATURA ANTERIOR|SALDO ANTERIOR|LIMITE DISPON[ÍI]VEL|OPÇÕES DE PAGAMENTO|ALTERNATIVAS DE PAGAMENTO|PAGAMENTO E DEMAIS|PARCELAMENTOS|DESPESAS|HISTÓRICO DE FATURAS|SUPERCRÉDITO|SAQUE À CRÉDITO|COMPRA DATA DESCRIÇÃO/i.test(s))return;const r=/(?:[@\)\(\*•\s]+)?(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+(?:(\d{2}\/\d{2})\s+)?(-?R?\$\s*[\d\.]+,\d{2}|-?[\d\.]+,\d{2})$/i,c=s.match(r)||s.match(/(?:[@\)\(\*•\s]+)?(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+(?:(\d{2}\/\d{2})\s+)?(-?R?\$\s*[\d\.]+,\d{2}|-?[\d\.]+,\d{2})/i);if(c){const l=c[1];let i=c[2].trim();const m=c[3],u=c[4];if(u.includes("-")||/DEB AUTOM|PAGAMENTO|PAGTO|CR[ÉE]DITO FATURA/i.test(i))return;const f=T(u);m&&(i+=` (${m})`),i&&f>0&&i.length>2&&!/fatura|limite|pagamento|saldo|alternativas|opções|período|emissão|vencimento/i.test(i)&&e.push({dataCompra:l,descricao:i,valor:f})}}),e.length===0){let n;for(;(n=a.exec(t))!==null;){const s=n[1];let r=n[2].trim();const c=n[3],l=n[4];if(l.includes("-")||/DEB AUTOM|PAGAMENTO|PAGTO|CR[ÉE]DITO FATURA/i.test(r))continue;const i=T(l);c&&(r+=` (${c})`),r&&i>0&&r.length>2&&!/fatura|limite|pagamento|saldo|alternativas|opções|período|emissão|vencimento/i.test(r)&&e.push({dataCompra:s,descricao:r,valor:i})}}return e}window.ultimosLocaisAnalisados={};function me(t){if(!t)return"DIVERSOS";let e=t.replace(/\(\d{1,2}\/\d{1,2}\)/gi,"").replace(/\b\d{1,2}\/\d{1,2}\b/gi,"").replace(/\b\d{1,2}x\b/gi,"").trim();return e=e.replace(/\s+/g," "),e.toUpperCase()}function Rt(t){const e={};(Array.isArray(t)?t:[t]).forEach(n=>{!n||!n.itens||!Array.isArray(n.itens)||n.itens.forEach(s=>{if(!s.descricao||!s.valor)return;const r=me(s.descricao);e[r]||(e[r]={nome:r,qtd:0,valorTotal:0,compras:[]}),e[r].qtd+=1,e[r].valorTotal+=s.valor||0,e[r].compras.push({dataCompra:s.dataCompra||"—",descricao:s.descricao,valor:s.valor||0,cartao:n.cartao||"Cartão",mesAno:n.mesAno||"—"})})});const o=Object.values(e).filter(n=>n.qtd>=2);return o.sort((n,s)=>s.valorTotal-n.valorTotal),o}function qt(t,e="geral"){const a=Rt(t);if(a.forEach(n=>{window.ultimosLocaisAnalisados[`${e}_${n.nome}`]=n}),!a.length)return`
      <div class="card" style="margin-bottom:1.5rem; background:linear-gradient(135deg,rgba(30,41,59,0.7),rgba(15,23,42,0.8)); border-color:rgba(251,113,133,0.3)">
        <div class="card-header">
          <span class="card-title" style="color:#fb7185; font-size:.95rem">📊 Análise de Locais Frequentes (2x ou mais)</span>
          <span class="badge gray">Sem repetições</span>
        </div>
        <p style="font-size:.8rem; color:var(--text-muted); margin:0">Nenhum estabelecimento possui 2 ou mais compras nesta fatura/mês.</p>
      </div>
    `;const o=a.reduce((n,s)=>n+s.valorTotal,0);return`
    <div class="card" style="margin-bottom:1.5rem; background:linear-gradient(135deg,rgba(30,41,59,.95),rgba(15,23,42,.98)); border-color:#fb7185; box-shadow:0 4px 20px rgba(251,113,133,0.15)">
      <div class="card-header" style="flex-wrap:wrap; gap:.5rem">
        <div>
          <span class="card-title" style="color:#fb7185; font-size:1.05rem">🏬 Locais Mais Frequentados (${a.length} estabelecimentos com 2+ compras)</span>
          <p style="font-size:.78rem; color:var(--text-muted); margin-top:.2rem">💡 Clique em qualquer quadrado para ver o detalhamento de cada compra individual!</p>
        </div>
        <span class="badge rose" style="font-size:.85rem; padding:.35rem .75rem">Soma Repetidos: ${d(o)}</span>
      </div>

      <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap:0.85rem; margin-top:.5rem">
        ${a.map(n=>`
            <div style="background:rgba(15,23,42,0.85); border:1px solid rgba(251,113,133,0.35); border-radius:10px; padding:.85rem 1rem; display:flex; justify-content:space-between; align-items:center; cursor:pointer; transition:all .2s; box-shadow:0 2px 8px rgba(0,0,0,0.3)"
                 onclick="abrirModalComprasEstabelecimento('${`${e}_${n.nome}`}')"
                 onmouseover="this.style.transform='translateY(-3px)'; this.style.borderColor='#fb7185'; this.style.background='rgba(30,41,59,0.95)'" 
                 onmouseout="this.style.transform='none'; this.style.borderColor='rgba(251,113,133,0.35)'; this.style.background='rgba(15,23,42,0.85)'"
                 title="Clique para ver as ${n.qtd} compras de ${n.nome}">
              <div>
                <div style="font-weight:700; font-size:.88rem; color:#f8fafc; margin-bottom:.3rem; word-break:break-word">🏪 ${n.nome}</div>
                <span class="badge rose" style="font-size:.72rem">🛒 ${n.qtd} compras 🔍</span>
              </div>
              <div style="text-align:right; min-width:95px">
                <div style="font-weight:800; font-size:1.08rem; color:#fb7185">${d(n.valorTotal)}</div>
                <div style="font-size:.72rem; color:var(--text-muted)">total gasto 🔍</div>
              </div>
            </div>
          `).join("")}
      </div>
    </div>
  `}window.abrirModalComprasEstabelecimento=function(t){const e=window.ultimosLocaisAnalisados[t];if(!e){g("⚠️ Não foi possível carregar os detalhes do estabelecimento.");return}let a=document.getElementById("modal-detalhes-estabelecimento");if(!a){const n=document.createElement("div");n.id="modal-detalhes-estabelecimento",n.className="modal-overlay",n.innerHTML=`
      <div class="modal-card">
        <div class="modal-header">
          <div>
            <h3 id="modal-est-titulo" style="color:#fb7185; font-size:1.1rem; margin:0">🏬 Compras no Estabelecimento</h3>
            <p id="modal-est-subtitulo" style="font-size:.78rem; color:var(--text-muted); margin:.2rem 0 0 0">Detalhamento individual das compras contempladas</p>
          </div>
          <button type="button" class="modal-close" onclick="fecharModalEstabelecimento()">✕</button>
        </div>
        <div class="modal-body" id="modal-est-body"></div>
      </div>
    `,document.body.appendChild(n),a=n,a.addEventListener("click",s=>{s.target===a&&fecharModalEstabelecimento()})}document.getElementById("modal-est-titulo").innerHTML=`🏬 Estabelecimento: <span style="color:#fff">${e.nome}</span>`,document.getElementById("modal-est-subtitulo").textContent=`${e.qtd} compra(s) somando o valor total de ${d(e.valorTotal)}`;const o=document.getElementById("modal-est-body");o.innerHTML=`
    <div style="margin-bottom:1rem; background:rgba(251,113,133,0.08); border:1px dashed rgba(251,113,133,0.3); border-radius:8px; padding:.75rem 1rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:.5rem">
      <div>
        <span style="font-size:.82rem; color:var(--text-muted)">Total de Lançamentos:</span>
        <strong style="color:#fff; margin-left:.3rem; font-size:.95rem">${e.qtd} compras</strong>
      </div>
      <div>
        <span style="font-size:.82rem; color:var(--text-muted)">Soma Total Gasta:</span>
        <strong style="color:#fb7185; margin-left:.3rem; font-size:1.1rem">${d(e.valorTotal)}</strong>
      </div>
    </div>

    <div class="table-responsive">
      <table class="custom-table">
        <thead>
          <tr>
            <th>Data Compra</th>
            <th>Descrição do Lançamento</th>
            <th>Cartão / Origem</th>
            <th class="num">Valor (R$)</th>
          </tr>
        </thead>
        <tbody>
          ${e.compras.map(n=>`
            <tr>
              <td><strong>${n.dataCompra||"—"}</strong></td>
              <td>${n.descricao}</td>
              <td><span class="badge ${n.cartao.toLowerCase().includes("nubank")?"purple":"red"}">${n.cartao}</span></td>
              <td class="num" style="color:#fb7185; font-weight:700">${d(n.valor)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `,a.style.display="flex"};window.fecharModalEstabelecimento=function(){const t=document.getElementById("modal-detalhes-estabelecimento");t&&(t.style.display="none")};function ue(){const t=D.reduce((o,n)=>o+(n.valorTotal!==void 0?n.valorTotal:n.valor||0),0);document.getElementById("badge-total-cartoes").textContent=`${d(t)} total`;const e=document.getElementById("lista-faturas-registradas");if(!D.length){e.innerHTML='<div class="empty-state">Nenhuma fatura cadastrada ainda.</div>';return}const a=qt(D,"geral");e.innerHTML=a+D.map(o=>{var u;const n=o.valorTotal!==void 0?o.valorTotal:o.valor||0,s=o.cartao||"Cartão",r=s.toLowerCase().includes("nubank"),c=r?"purple":"red",l=r?"🟣":"🔴",i=o.dataVencimento?it(o.dataVencimento).split(",")[0]:"—",m=o.mesAno||"—";return`
      <div class="purchase-card" style="margin-bottom:1rem">
        <div class="purchase-header" onclick="toggleDetail('fat-${o.id}')">
          <div class="purchase-info">
            <h3><span class="badge ${c}">${l} ${s}</span> — Vencimento: ${i}</h3>
            <p>📅 Mês Referência: <strong>${m}</strong> &nbsp;•&nbsp; 🛒 ${o.qtdItens||((u=o.itens)==null?void 0:u.length)||1} itens contemplados</p>
          </div>
          <div class="purchase-values">
            <div class="pv-total" style="color:#fb7185">${d(n)}</div>
            <div class="pv-sub">Fatura do Mês</div>
          </div>
          <svg class="chevron" id="chev-fat-${o.id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="purchase-details" id="detail-fat-${o.id}">
          <div class="details-toolbar">
            <span class="card-subtext">Detalhamento dos Lançamentos da Fatura</span>
            <button class="btn-danger" onclick="excluirFaturaDocumento('${o.id}')">🗑️ Excluir Fatura</button>
          </div>
          ${Ot(o)}
        </div>
      </div>
    `}).join("")}function Ot(t){if(t.itens&&t.itens.length>0){const e=Rt([t]),a=`fatura_${t.id}`;e.forEach(n=>{window.ultimosLocaisAnalisados[`${a}_${n.nome}`]=n});let o="";return e.length>0&&(o=`
        <div style="background:rgba(251,113,133,0.08); border:1px dashed rgba(251,113,133,0.35); border-radius:8px; padding:.75rem 1rem; margin-bottom:1rem">
          <div style="font-weight:700; font-size:.84rem; color:#fb7185; margin-bottom:.5rem">
            🏬 Locais com 2 ou mais compras nesta fatura (${e.length} estabelecimentos - clique para ver):
          </div>
          <div style="display:flex; flex-wrap:wrap; gap:.5rem">
            ${e.map(n=>`
                <span style="background:rgba(15,23,42,0.9); border:1px solid rgba(251,113,133,0.4); border-radius:6px; padding:.3rem .6rem; font-size:.78rem; color:#f1f5f9; display:inline-flex; align-items:center; gap:.35rem; cursor:pointer"
                      onclick="event.stopPropagation(); abrirModalComprasEstabelecimento('${`${a}_${n.nome}`}')"
                      title="Clique para ver detalhadamente as compras de ${n.nome}">
                  🏬 <strong>${n.nome}</strong>: <span class="badge rose" style="font-size:.7rem">${n.qtd}x compras</span> <strong style="color:#fb7185; margin-left:.25rem">${d(n.valorTotal)}</strong>
                </span>
              `).join("")}
          </div>
        </div>
      `),`
      ${o}
      <div class="table-responsive"><table class="custom-table">
        <thead><tr><th>Data Compra</th><th>Descrição do Lançamento</th><th class="num">Valor</th><th>Ação</th></tr></thead>
        <tbody>${t.itens.map((n,s)=>`<tr>
          <td><strong>${n.dataCompra||"—"}</strong></td>
          <td>${n.descricao}</td>
          <td class="num" style="color:#fb7185"><strong>${d(n.valor)}</strong></td>
          <td><button class="btn-danger" style="padding:.2rem .5rem; font-size:.78rem;" onclick="removerItemFaturaCadastrada('${t.id}', ${s})">🗑️ Excluir</button></td>
        </tr>`).join("")}</tbody>
      </table></div>
    `}return`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Descrição</th><th class="num">Valor</th><th>Ação</th></tr></thead>
    <tbody><tr>
      <td>${t.descricao||"Fatura do Cartão"}</td>
      <td class="num" style="color:#fb7185"><strong>${d(t.valor||t.valorTotal)}</strong></td>
      <td><button class="btn-danger" style="padding:.2rem .5rem; font-size:.78rem;" onclick="excluirFaturaDocumento('${t.id}')">🗑️ Excluir</button></td>
    </tr></tbody>
  </table></div>`}window.removerItemFaturaCadastrada=async function(t,e){const a=D.find(s=>s.id===t);if(!a||!a.itens||!confirm("Remover este item da fatura?"))return;const o=[...a.itens];o.splice(e,1);const n=o.reduce((s,r)=>s+(r.valor||0),0);o.length===0?(await W(S(B,et,t)),g("🗑️ Fatura excluída pois todos os itens foram removidos.")):(await st(S(B,et,t),{...a,itens:o,valorTotal:n,qtdItens:o.length}),g("🗑️ Item removido da fatura."))};window.excluirFaturaDocumento=async function(t){confirm("Excluir esta fatura e todos os seus lançamentos?")&&(await W(S(B,et,t)),g("🗑️ Fatura removida com sucesso."))};let w=null;function pe(){const t=document.getElementById("inp-boleto-vencimento");if(t&&!t.value){const e=new Date,a=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0");t.value=`${a}-${o}-10`,atualizarMesRefBoleto()}}setTimeout(pe,300);window.atualizarMesRefBoleto=function(){const t=document.getElementById("inp-boleto-vencimento"),e=document.getElementById("lbl-boleto-mes-ref");if(!(!t||!e))if(t.value){const[a,o]=t.value.split("-"),s=new Date(parseInt(a),parseInt(o)-1,1).toLocaleString("pt-BR",{month:"long"});e.textContent=`Boleto ${s.charAt(0).toUpperCase()+s.slice(1)}/${a}`}else e.textContent="Mês do Boleto"};window.handleFileBoletoSelect=async function(t){const e=t.target.files[0];if(!e)return;const a=document.getElementById("txt-file-boleto");a&&(a.textContent=`📄 Arquivo: ${e.name}`),g(`⏳ Lendo arquivo do boleto (${e.name})...`);let o="";if(e.type==="application/pdf"||e.name.endsWith(".pdf"))o=await Dt(e);else try{o=await e.text()}catch{o=""}o?(document.getElementById("inp-boleto-txt").value=o,await kt(o,e.name)):g("❌ Não foi possível ler o texto do arquivo do boleto.")};window.importarBoletoManualOuArquivo=async function(){const t=document.getElementById("inp-boleto-txt").value.trim();if(!t){g("⚠️ Selecione o arquivo do boleto (.pdf, .txt) ou cole o texto do boleto.");return}await kt(t,"Boleto")};async function kt(t,e){const a=ve(t);a.vencimento&&(document.getElementById("inp-boleto-vencimento").value=a.vencimento,atualizarMesRefBoleto());const o=document.getElementById("inp-boleto-vencimento").value||new Date().toISOString().slice(0,10),n=o.slice(0,7),s=a.beneficiario||e.replace(/\.[^/.]+$/,"")||"Boleto / Conta",r=a.itens.reduce((l,i)=>l+i.valor,0),c=a.valorTotal||r||0;document.getElementById("inp-revisao-boleto-desc").value=s,document.getElementById("inp-revisao-boleto-val").value=c?c.toFixed(2):"",w={descricao:s,dataVencimento:o,mesAno:n,valorTotal:c,qtdItens:a.itens.length,itens:a.itens},Pt(),g("✅ Boleto identificado! Confira a descrição, valor e itens antes de salvar.")}window.atualizarValorTotalRevisaoBoleto=function(){if(!w)return;const t=parseFloat(document.getElementById("inp-revisao-boleto-val").value)||0;w.valorTotal=t,document.getElementById("badge-total-preview-boleto").textContent=d(t)};function Pt(){if(!w)return;const{valorTotal:t,itens:e}=w;document.getElementById("badge-total-preview-boleto").textContent=d(t);const a=document.getElementById("lista-preview-boleto-itens");!e||!e.length?a.innerHTML='<div class="empty-state">Nenhum encargo/item individual extraído. O valor total acima será considerado.</div>':a.innerHTML=e.map((n,s)=>`
      <div style="display:flex; justify-content:space-between; align-items:center; padding:.4rem 0; border-bottom:1px dashed var(--border-color); font-size:.82rem;">
        <span><strong>${n.dataBoleto||"—"}</strong> — ${n.descricao}</span>
        <div style="display:flex; align-items:center; gap:.75rem;">
          <span style="color:#c084fc; font-weight:700;">${d(n.valor)}</span>
          <button type="button" class="btn-danger" style="padding:.15rem .45rem; font-size:.75rem;" onclick="removerItemRevisaoBoleto(${s})">🗑️</button>
        </div>
      </div>
    `).join("");const o=document.getElementById("box-revisao-boleto");o.style.display="block",o.scrollIntoView({behavior:"smooth"})}window.removerItemRevisaoBoleto=function(t){if(!w||!w.itens)return;w.itens.splice(t,1);const e=w.itens.reduce((a,o)=>a+o.valor,0);e>0&&(w.valorTotal=e,document.getElementById("inp-revisao-boleto-val").value=e.toFixed(2)),w.qtdItens=w.itens.length,Pt(),g("🗑️ Item removido da revisão do boleto.")};window.confirmarEGravarBoletoDocumento=async function(){if(!w)return;const t=document.getElementById("inp-revisao-boleto-desc").value.trim(),e=parseFloat(document.getElementById("inp-revisao-boleto-val").value)||0,a=document.getElementById("inp-boleto-vencimento").value||new Date().toISOString().slice(0,10);if(!e){g("⚠️ Digite ou confirme o valor total do boleto.");return}w.descricao=t||"Boleto / Conta",w.valorTotal=e,w.dataVencimento=a,w.mesAno=a.slice(0,7);try{await ct(z(B,at),{...w,createdAt:vt()}),document.getElementById("box-revisao-boleto").style.display="none",document.getElementById("inp-boleto-txt").value="";const o=document.getElementById("txt-file-boleto");o&&(o.textContent="Clique para Selecionar o Arquivo do Boleto");const n=d(w.valorTotal);w=null,g(`🎉 Boleto de ${n} salvo com sucesso!`)}catch(o){alert("Erro ao salvar boleto: "+o.message)}};function ve(t){if(!t)return{beneficiario:"",valorTotal:0,vencimento:null,itens:[]};let e="",a=0,o=null;const n=[],s=t.match(/Vencimento\s*[:\s]*(\d{2}[\/\.-]\d{2}[\/\.-]\d{4})/i)||t.match(/Vencimento\s*[:\s]*(\d{2})\s+([A-Za-z]{3})\s+(\d{4})/i)||t.match(/Data\s*de\s*Vencimento\s*[:\s]*(\d{2}[\/\.-]\d{2}[\/\.-]\d{4})/i);if(s){if(s[2]&&s[3]){const i=s[1],m=s[2].toUpperCase();o=`${s[3]}-${{JAN:"01",FEB:"02",MAR:"03",ABR:"04",APR:"04",MAI:"05",MAY:"05",JUN:"06",JUL:"07",AGO:"08",AUG:"08",SET:"09",SEP:"09",OUT:"10",OCT:"10",NOV:"11",DEZ:"12",DEC:"12"}[m]||"07"}-${i.padStart(2,"0")}`}else if(s[1]){const[i,m,u]=s[1].split(/[\/\.-]/);o=`${u}-${m.padStart(2,"0")}-${i.padStart(2,"0")}`}}const r=t.match(/Benefici[áa]rio\s*[:\s]*([^\n\r]+)/i)||t.match(/Nome\s*do\s*Cedente\s*[:\s]*([^\n\r]+)/i)||t.match(/Raz[ãa]o\s*Social\s*[:\s]*([^\n\r]+)/i);r&&(e=r[1].trim().replace(/\s{2,}/g," "));const c=t.match(/Valor\s*do\s*Documento\s*[:\s]*R?\$\s*([\d\.]+,\d{2})/i)||t.match(/\(=\)\s*Valor\s*Cobrado\s*[:\s]*R?\$\s*([\d\.]+,\d{2})/i)||t.match(/Valor\s*Cobrado\s*[:\s]*R?\$\s*([\d\.]+,\d{2})/i)||t.match(/Valor\s*R?\$\s*([\d\.]+,\d{2})/i);return c&&(a=T(c[1])),t.split(`
`).forEach(i=>{const m=i.trim();if(!m||/vencimento|beneficiário|cedente|nosso\s*número|agência|código|autenticação|instruções/i.test(m))return;const u=m.match(/(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\b[A-Za-z]{3}\b)?\s*(.+?)\s+R?\$\s*([\d\.]+,\d{2})$/i);if(u){const f=u[1]||"Boleto",h=u[2].trim(),v=T(u[3]);h&&v>0&&h.length>2&&!/valor|total|documento|cobrado/i.test(h)&&n.push({dataBoleto:f,descricao:h,valor:v})}}),{beneficiario:e,valorTotal:a,vencimento:o,itens:n}}function ge(){const t=q.reduce((a,o)=>a+(o.valorTotal!==void 0?o.valorTotal:o.valor||0),0);document.getElementById("badge-total-boletos").textContent=`${d(t)} total`;const e=document.getElementById("lista-boletos-registrados");if(!q.length){e.innerHTML='<div class="empty-state">Nenhum boleto cadastrado ainda.</div>';return}e.innerHTML=q.map(a=>{var c;const o=a.valorTotal!==void 0?a.valorTotal:a.valor||0,n=a.dataVencimento?it(a.dataVencimento).split(",")[0]:"—",s=a.mesAno||"—",r=a.descricao||"Boleto / Conta";return`
      <div class="purchase-card">
        <div class="purchase-header" onclick="toggleDetail('bol-${a.id}')">
          <div class="purchase-info">
            <h3><span class="badge purple">📄 ${r}</span> — Vencimento: ${n}</h3>
            <p>📅 Mês Referência: <strong>${s}</strong> &nbsp;•&nbsp; 🛒 ${a.qtdItens||((c=a.itens)==null?void 0:c.length)||1} itens / encargos</p>
          </div>
          <div class="purchase-values">
            <div class="pv-total" style="color:#c084fc">${d(o)}</div>
            <div class="pv-sub">Boleto do Mês</div>
          </div>
          <svg class="chevron" id="chev-bol-${a.id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="purchase-details" id="detail-bol-${a.id}">
          <div class="details-toolbar">
            <span class="card-subtext">Detalhamento dos Itens / Encargos do Boleto</span>
            <button class="btn-danger" onclick="excluirBoletoDocumento('${a.id}')">🗑️ Excluir Boleto</button>
          </div>
          ${Nt(a)}
        </div>
      </div>
    `}).join("")}function Nt(t){return t.itens&&t.itens.length>0?`<div class="table-responsive"><table class="custom-table">
      <thead><tr><th>Data</th><th>Descrição / Item</th><th class="num">Valor</th><th>Ação</th></tr></thead>
      <tbody>${t.itens.map((e,a)=>`<tr>
        <td><strong>${e.dataBoleto||"—"}</strong></td>
        <td>${e.descricao}</td>
        <td class="num" style="color:#c084fc"><strong>${d(e.valor)}</strong></td>
        <td><button class="btn-danger" style="padding:.2rem .5rem; font-size:.78rem;" onclick="removerItemBoletoCadastrado('${t.id}', ${a})">🗑️ Excluir</button></td>
      </tr>`).join("")}</tbody>
    </table></div>`:`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Descrição</th><th class="num">Valor</th><th>Ação</th></tr></thead>
    <tbody><tr>
      <td>${t.descricao||"Boleto"}</td>
      <td class="num" style="color:#c084fc"><strong>${d(t.valor||t.valorTotal)}</strong></td>
      <td><button class="btn-danger" style="padding:.2rem .5rem; font-size:.78rem;" onclick="excluirBoletoDocumento('${t.id}')">🗑️ Excluir</button></td>
    </tr></tbody>
  </table></div>`}window.removerItemBoletoCadastrado=async function(t,e){const a=q.find(s=>s.id===t);if(!a||!a.itens||!confirm("Remover este item do boleto?"))return;const o=[...a.itens];o.splice(e,1);const n=o.reduce((s,r)=>s+(r.valor||0),0);o.length===0?(await W(S(B,at,t)),g("🗑️ Boleto excluído pois todos os itens foram removidos.")):(await st(S(B,at,t),{...a,itens:o,valorTotal:n,qtdItens:o.length}),g("🗑️ Item removido do boleto."))};window.excluirBoletoDocumento=async function(t){confirm("Excluir este boleto e todos os seus itens?")&&(await W(S(B,at,t)),g("🗑️ Boleto removido com sucesso."))};document.getElementById("form-config-reservas").addEventListener("submit",async t=>{t.preventDefault();const e=parseFloat(document.getElementById("inp-meta-mensal").value)||0,a=parseFloat(document.getElementById("inp-saldo-guardado").value)||0;await st(S(B,wt,"config"),{metaMensal:e,valorAtualGuardado:a,dataAtualizacao:new Date().toISOString()}),g("✅ Reservas e economias atualizadas!")});function fe(){const t=pt.metaMensal||0,e=pt.valorAtualGuardado||0;document.getElementById("val-meta-reserva").textContent=d(t),document.getElementById("val-real-guardado").textContent=d(e);const a=R.reduce((m,u)=>m+(u.valor||0),0),o=D.reduce((m,u)=>m+(u.valorTotal!==void 0?u.valorTotal:u.valor||0),0),n=q.reduce((m,u)=>m+(u.valorTotal!==void 0?u.valorTotal:u.valor||0),0);let s=0;M.forEach(m=>{m.formasPagamento&&(s+=m.formasPagamento.cartaoDebito||0)});const r=a-o-n-s,c=r>0?Math.max(r*.5,a*.2):0;document.getElementById("val-recomendacao-reserva").textContent=d(c);const l=document.getElementById("box-analise-reserva-detalhes");if(a===0){l.innerHTML='<p class="empty-state">Cadastre seus salários e entradas na aba "Salários & Entradas" para gerar o diagnóstico inteligente de economias.</p>';return}const i=t>0?Math.min(100,e/t*100).toFixed(1):0;l.innerHTML=`
    <p> Com base nos seus <strong>${d(a)}</strong> de Entradas, <strong>${d(o)}</strong> de Faturas de Cartão e <strong>${d(s)}</strong> de Mercado no Débito:</p>
    <div style="background:rgba(15,23,42,0.6);padding:1rem;border-radius:10px;margin:.75rem 0;border:1px solid var(--border-color)">
      <div style="display:flex;justify-content:space-between;margin-bottom:.4rem">
        <span>💰 Saldo Livre em Conta: <strong>${d(r)}</strong></span>
        <span>💡 Recomendação de Reserva: <strong style="color:#c084fc">${d(c)}/mês</strong></span>
      </div>
      <div class="progress-bar-bg">
        <div class="progress-bar-fill" style="width:${i}%"></div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:.78rem;color:var(--text-muted);margin-top:.4rem">
        <span>Guardado: ${d(e)}</span>
        <span>Meta Pessoal: ${d(t)} (${i}%)</span>
      </div>
    </div>
    <p style="font-size:.84rem;color:var(--text-muted)">
      💡 <strong>Dica de Inteligência Financeira:</strong> Como o Vale Alimentação e o Crédito no Mercado não saem do seu salário em conta, eles protegem sua renda real! O sistema recomenda destinar pelo menos 50% do seu saldo livre líquido (<strong>${d(c)}</strong>) para sua reserva de emergência e investimentos.
    </p>
  `}function be(){const t=document.getElementById("lista-mensal-container");if(!t)return;const e=new Date,a=new Date(e.getFullYear(),e.getMonth()+1,1),o=a.toLocaleString("pt-BR",{month:"long"}),n=a.getFullYear(),s=`${o.charAt(0).toUpperCase()+o.slice(1)} de ${n}`,r=te(a.getFullYear(),a.getMonth()),c=31.8,l=20,i=r*c,m=r*l,u={};let f=0;M.forEach(p=>{const y=p.valorAPagar||0;f+=y;const x=p.mesAno||"Outros";u[x]=(u[x]||0)+y});const h=Math.max(1,Object.keys(u).length),v=f/h,b={};M.forEach(p=>{(p.itens||[]).forEach(y=>{const x=(y.nome||"").toLowerCase().trim();x&&(b[x]||(b[x]={nome:y.nome,marca:y.marca||"Geral",qtdTotal:0,frequenciaNotas:0,valoresUnitarios:[]}),b[x].qtdTotal+=y.quantidade||1,b[x].frequenciaNotas+=1,y.valorUnitario&&b[x].valoresUnitarios.push(y.valorUnitario))})});const L=Object.values(b).map(p=>{const y=p.valoresUnitarios.length>0?p.valoresUnitarios.reduce((X,dt)=>X+dt,0)/p.valoresUnitarios.length:0,x=p.qtdTotal/h,Z=h/Math.max(1,p.frequenciaNotas),lt=p.frequenciaNotas/h;let O=0;lt>=.35||x>=.7?O=Math.ceil(x):O=Math.round(x),O<1&&p.frequenciaNotas>=h&&(O=1);const K=O*y;return{nome:p.nome,marca:p.marca,frequenciaNotas:p.frequenciaNotas,intervaloMeses:Z,qtdMensalTaxa:x,totalEstimadoUnidades:O,valorUnitario:y,subtotalCalculado:K}}).filter(p=>p.totalEstimadoUnidades>0);L.sort((p,y)=>y.frequenciaNotas-p.frequenciaNotas);const F=L.reduce((p,y)=>p+y.subtotalCalculado,0),P=v>0?v*1.05:F;let j=1;F>P&&v>0&&(j=P/F);const N=L.map(p=>({...p,subtotalFinal:p.subtotalCalculado*j})),$=v>0?Math.min(F,P):F;let A=$;const Y=Math.min(A,i);A-=Y;const _=Math.min(A,m);A-=_;const H=A>0?A:0;let V=`
    <div class="card" style="margin-bottom:1.5rem; background: linear-gradient(135deg, rgba(30,41,59,0.9), rgba(15,23,42,0.95)); border: 1px solid #3b82f6;">
      <div class="card-header">
        <div>
          <span class="card-title" style="color:#60a5fa;">📅 Previsão de Compras — ${s}</span>
          <p class="card-subtext" style="color:#cbd5e1; margin-top:0.25rem;">
            Calculado com unidades inteiras exatas (${r} dias úteis em ${o}).
          </p>
        </div>
        <span class="badge green" style="font-size:0.8rem; padding:0.4rem 0.75rem;">${r} Dias Úteis</span>
      </div>

      <div class="payment-grid" style="margin-top:1rem;">
        <div class="payment-item" style="border-color: rgba(16,185,129,0.4);">
          <div class="p-label">🍽️ Vale Alimentação (${r}d × R$ 31,80)</div>
          <div class="p-val" style="color:#34d399;">${d(Y)} <span style="font-size:0.75rem;font-weight:normal;color:var(--text-muted)">/ ${d(i)}</span></div>
        </div>
        <div class="payment-item" style="border-color: rgba(99,102,241,0.4);">
          <div class="p-label">💳 Cartão Crédito (${r}d × R$ 20,00)</div>
          <div class="p-val" style="color:#818cf8;">${d(_)} <span style="font-size:0.75rem;font-weight:normal;color:var(--text-muted)">/ ${d(m)}</span></div>
        </div>
        <div class="payment-item" style="border-color: ${H>0?"rgba(244,63,94,0.5)":"var(--border-color)"};">
          <div class="p-label">💳 Débito Necessário (Excedente)</div>
          <div class="p-val" style="color: ${H>0?"#fb7185":"var(--text-muted)"};">${d(H)}</div>
        </div>
      </div>

      <div style="margin-top:1.25rem; padding-top:1rem; border-top:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
        <div>
          <span style="font-size:0.85rem; color:var(--text-muted);">Total Estimado da Lista de Compras:</span>
          <p style="font-size:0.75rem; color:#60a5fa;">Média Histórica de Gastos: ${d(v)}</p>
        </div>
        <span style="font-size:1.6rem; font-weight:800; color:var(--primary);">${d($)}</span>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-title">Lista de Itens com Frequência e Total Estimado</span>
        <span class="badge amber">${N.length} itens cadastrados</span>
      </div>
      <p class="card-subtext" style="margin-bottom:1rem;">
        O <strong>Total Estimado</strong> arredonda o consumo médio para cima (unidades inteiras exatas), pois os produtos são comprados por unidade no mercado.
      </p>
  `;window.dadosListaMensalCache={mesAnoStr:s,diasUteis:r,totalGeralEstimado:$,cobertoAlim:Y,cobertoCred:_,cobertoDeb:H,alimDisponivel:i,credDisponivel:m,lista:N},N.length===0?V+='<div class="empty-state">Adicione notas fiscais para que o sistema gere automaticamente sua lista mensal de compras.</div></div>':V+=`
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
            ${N.map(p=>{const y=p.intervaloMeses>1.2?`A cada ${p.intervaloMeses.toFixed(1)} meses`:`Todo mês (${p.frequenciaNotas}x)`,x=p.qtdMensalTaxa<1?p.qtdMensalTaxa.toFixed(2):p.qtdMensalTaxa.toFixed(1),Z=p.totalEstimadoUnidades.toFixed(1);return`
                <tr>
                  <td><strong>${p.nome}</strong></td>
                  <td><span class="badge amber">${p.marca}</span></td>
                  <td><span class="badge cyan">${y}</span></td>
                  <td class="num">${x} un/mês</td>
                  <td class="num"><span class="badge green" style="font-size:0.82rem;">${Z}</span></td>
                  <td class="num">${d(p.valorUnitario)}</td>
                  <td class="num"><strong>${d(p.subtotalFinal)}</strong></td>
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
    </div>`,t.innerHTML=V}window.exportarPDFListaMensal=function(){if(!window.dadosListaMensalCache||!window.dadosListaMensalCache.lista.length){g("⚠️ Nenhuma lista mensal disponível para exportar.");return}const{mesAnoStr:t,diasUteis:e,totalGeralEstimado:a,cobertoAlim:o,cobertoCred:n,cobertoDeb:s,lista:r}=window.dadosListaMensalCache,c=window.open("","_blank","width=900,height=750");if(!c){alert("Permita pop-ups no navegador para gerar o PDF da lista.");return}const l=`
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
          <div class="val">${d(o)}</div>
        </div>
        <div class="res-item">
          <div class="label">💳 Cartão Crédito</div>
          <div class="val">${d(n)}</div>
        </div>
        <div class="res-item">
          <div class="label">💳 Débito (Excedente)</div>
          <div class="val">${d(s)}</div>
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
          ${r.map(i=>`
            <tr>
              <td class="check-col"><div class="chk-box"></div></td>
              <td><strong>${i.nome}</strong></td>
              <td>${i.marca}</td>
              <td class="num"><strong>${i.totalEstimadoUnidades.toFixed(1)} un</strong></td>
              <td class="num">${d(i.valorUnitario)}</td>
              <td class="num"><strong>${d(i.subtotalFinal)}</strong></td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <div class="total-footer">
        <span>Total Estimado da Compra:</span>
        <span style="font-size:18px; color:#059669;">${d(a)}</span>
      </div>

      <script>
        window.onload = function() {
          setTimeout(function() { window.print(); }, 350);
        };
      <\/script>
    </body>
    </html>
  `;c.document.open(),c.document.write(l),c.document.close()};document.getElementById("btn-start-cam").addEventListener("click",Vt);document.getElementById("btn-switch-cam").addEventListener("click",he);document.getElementById("btn-stop-cam").addEventListener("click",bt);async function Vt(){if(typeof Html5Qrcode>"u")return C("Carregando biblioteca de câmera, aguarde..."),setTimeout(Vt,600);try{U||(U=new Html5Qrcode("qr-reader")),k=await Html5Qrcode.getCameras();let t;if(k&&k.length>0){const e=k.findIndex(a=>/back|traseira|rear|environment/i.test(a.label));tt=e>=0?e:0,t=k[tt].id}else t={facingMode:"environment"};await U.start(t,{fps:10,qrbox:{width:240,height:240}},Ut,()=>{}),ot=!0,document.getElementById("btn-start-cam").style.display="none",document.getElementById("btn-switch-cam").style.display=k.length>1?"inline-flex":"none",document.getElementById("btn-stop-cam").style.display="inline-flex"}catch(t){C("❌ Não foi possível acessar a câmera. Verifique as permissões do navegador."),console.error(t)}}async function he(){if(!(!U||!ot))try{await U.stop(),k.length>1&&(tt=(tt+1)%k.length,await U.start(k[tt].id,{fps:10,qrbox:{width:240,height:240}},Ut,()=>{}))}catch(t){console.error("switchCam:",t)}}async function bt(){if(U&&ot)try{await U.stop()}catch{}ot=!1,document.getElementById("btn-start-cam").style.display="inline-flex",document.getElementById("btn-switch-cam").style.display="none",document.getElementById("btn-stop-cam").style.display="none"}async function Ut(t){bt(),document.getElementById("inp-url").value=t,C("✅ QR Code lido! Processando..."),await jt(t)}document.getElementById("btn-carregar-dados").addEventListener("click",async()=>{const t=document.getElementById("inp-url").value.trim(),e=document.getElementById("inp-html").value.trim();if(!t&&!e){C("⚠️ Cole a URL do QR Code ou o conteúdo da página para ler a nota fiscal.");return}if(t&&!e){C("⏳ Consultando nota fiscal..."),await jt(t);return}if(e){C("⏳ Processando conteúdo..."),await Ht(e);return}});document.getElementById("btn-preencher-manual").addEventListener("click",()=>{zt({nomeMercado:"",dataEmissao:new Date().toISOString(),valorTotal:0,descontoTotal:0,valorAPagar:0,qtdTotalItens:0,formasPagamento:{valeAlimentacao:0,cartaoCredito:0,cartaoDebito:0},itens:[]}),C("✍️ Preencha os dados da compra abaixo e clique em Salvar Nota Fiscal.","var(--accent-cyan)")});function zt(t){var s,r,c;document.getElementById("inp-mercado").value=t.nomeMercado||"",document.getElementById("inp-data").value=Xt(t.dataEmissao),document.getElementById("inp-vtotal").value=t.valorTotal!==void 0?t.valorTotal:0,document.getElementById("inp-desconto").value=t.descontoTotal!==void 0?t.descontoTotal:0,document.getElementById("inp-pagar").value=t.valorAPagar!==void 0?t.valorAPagar:0,document.getElementById("inp-qtd").value=t.qtdTotalItens!==void 0?t.qtdTotalItens:0,document.getElementById("inp-alim").value=((s=t.formasPagamento)==null?void 0:s.valeAlimentacao)||0,document.getElementById("inp-cred").value=((r=t.formasPagamento)==null?void 0:r.cartaoCredito)||0,document.getElementById("inp-deb").value=((c=t.formasPagamento)==null?void 0:c.cartaoDebito)||0,Q=t.itens||[];const e=document.getElementById("form-nfce");e.style.display="block";const a=document.getElementById("preview-itens-box"),o=document.getElementById("count-preview-itens"),n=document.getElementById("lista-preview-itens");Q.length>0?(a.style.display="block",o.textContent=Q.length,n.innerHTML=Q.map(l=>`
      <div style="display:flex; justify-content:space-between; padding: 0.35rem 0; border-bottom: 1px dashed var(--border-color);">
        <span><strong>${l.nome}</strong> (${l.quantidade} ${l.unidade||"Un"})</span>
        <span>${d(l.valorUnitario)}/un = <strong>${d(l.valorTotal)}</strong></span>
      </div>
    `).join("")):a.style.display="none",e.scrollIntoView({behavior:"smooth"})}document.getElementById("form-nfce").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-mercado").value.trim()||"Mercado",a=document.getElementById("inp-data").value||new Date().toISOString(),o=parseFloat(document.getElementById("inp-vtotal").value)||0,n=parseFloat(document.getElementById("inp-desconto").value)||0,s=parseFloat(document.getElementById("inp-pagar").value)||0,r=parseInt(document.getElementById("inp-qtd").value)||0,c=parseFloat(document.getElementById("inp-alim").value)||0,l=parseFloat(document.getElementById("inp-cred").value)||0,i=parseFloat(document.getElementById("inp-deb").value)||0,m=new Date(a).toISOString().slice(0,16),u=M.find(v=>{const b=new Date(v.dataEmissao).toISOString().slice(0,16),L=Math.abs((v.valorAPagar||0)-s)<.05,F=(v.nomeMercado||"").toLowerCase().trim()===e.toLowerCase().trim();return b===m&&L&&F});if(u){C(`⚠️ Esta nota fiscal já existe no sistema (Cadastrada em ${it(u.dataEmissao)} no valor de ${d(u.valorAPagar)}). Nota não adicionada!`,"#fb7185"),g("⚠️ Nota fiscal já cadastrada! Operação cancelada.");return}const f=new Date(a),h=`${f.getFullYear()}-${String(f.getMonth()+1).padStart(2,"0")}`;C("⏳ Salvando nota fiscal no banco...");try{await ct(z(B,gt),{nomeMercado:e,dataEmissao:a,mesAno:h,qtdTotalItens:r||Q.length,valorTotal:o,descontoTotal:n,valorAPagar:s,formasPagamento:{valeAlimentacao:c,cartaoCredito:l,cartaoDebito:i},itens:Q,createdAt:vt()}),C("✅ Nota salva com sucesso!","#34d399"),document.getElementById("form-nfce").style.display="none",document.getElementById("form-nfce").reset(),document.getElementById("inp-url").value="",document.getElementById("inp-html").value="",Q=[],At(),goTab("dashboard"),g("🎉 Nota fiscal registrada no Firebase!")}catch(v){C("❌ Erro ao salvar: "+v.message,"#fb7185")}});async function jt(t){const e=[a=>`https://api.allorigins.win/raw?url=${encodeURIComponent(a)}`,a=>`https://corsproxy.io/?${encodeURIComponent(a)}`];for(const a of e)try{const o=await fetch(a(t),{signal:AbortSignal.timeout(8e3)});if(o.ok){const n=await o.text();if(n&&n.length>200){await Ht(n);return}}}catch{}ye(t)}function ye(t){document.getElementById("modal-link").href=t,document.getElementById("modal-cors").classList.add("active"),C("⚠️ Abra o link, copie o conteúdo da página e cole no campo de texto abaixo.")}async function Ht(t){const e=Ee(t);zt(e),C("✅ Nota lida com sucesso! Confira os valores abaixo e altere se necessário antes de Salvar.","#34d399")}function Ee(t){var Y,_,H;const a=new DOMParser().parseFromString(t,"text/html"),o=((Y=a.body)==null?void 0:Y.textContent)||t;let n=((H=(_=a.querySelector(".txtTopo, .nomeEmit, h1"))==null?void 0:_.textContent)==null?void 0:H.trim())||"Mercado",s=new Date().toISOString();const r=o.match(/Emiss[ãa]o\s*[:\-]?\s*(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})?/i)||o.match(/(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})/);if(r){const[V,p,y]=r[1].split("/");s=`${y}-${p}-${V}T${r[2]||"12:00:00"}`}const c=o.match(/Qtd\.?\s*total\s*de\s*itens\s*[:\s]*([\d,\.]+)/i),l=o.match(/Valor\s*total\s*R\$\s*[:\s]*([\d\.,]+)/i),i=o.match(/Descontos?\s*R\$\s*[:\s]*([\d\.,]+)/i),m=o.match(/Valor\s*a\s*pagar\s*R\$\s*[:\s]*([\d\.,]+)/i)||o.match(/VALOR\s*PAGO\s*R\$\s*[:\s]*([\d\.,]+)/i),u=o.match(/(?:Vale\s*)?Alimenta[çc][ãa]o\s*[:\s]*([\d\.,]+)/i),f=o.match(/(?:Cart[ãa]o\s*de\s*)?Cr[eé]dito\s*[:\s]*([\d\.,]+)/i),h=o.match(/(?:Cart[ãa]o\s*de\s*)?D[eé]bito\s*[:\s]*([\d\.,]+)/i),v=c?T(c[1]):0,b=l?T(l[1]):0,L=i?T(i[1]):0;let F=m?T(m[1]):b-L;const P={valeAlimentacao:u?T(u[1]):0,cartaoCredito:f?T(f[1]):0,cartaoDebito:h?T(h[1]):0},j=[];a.querySelectorAll("tr, .item, .itemNota").forEach(V=>{var ht;const p=V.textContent;if(!/Vl\.\s*Unit|valorUnitario|Qtde?\./i.test(p))return;const y=V.querySelector(".txtTit, .txtTit2, .nomeProd"),x=((ht=y==null?void 0:y.textContent)==null?void 0:ht.trim())||"",Z=p.match(/Qtde?\.\s*[:\s]*([\d,\.]+)/i),lt=p.match(/Vl\.\s*Unit\.\s*[:\s]*([\d,\.]+)/i),O=p.match(/Vl\.\s*Total\s*([\d,\.]+)/i),K=p.match(/C[oó]digo\s*[:\s]*(\d+)/i),X=p.match(/UN\s*[:\s]*([A-Za-z]+)/i),dt=Z?T(Z[1]):1,mt=lt?T(lt[1]):0,Qt=O?T(O[1]):mt*dt;x&&mt>0&&j.push({codigo:(K==null?void 0:K[1])||"",nome:x,marca:$e(x),quantidade:dt,unidade:(X==null?void 0:X[1])||"Un",valorUnitario:mt,valorTotal:Qt})});const $=new Date(s),A=`${$.getFullYear()}-${String($.getMonth()+1).padStart(2,"0")}`;return{nomeMercado:n,dataEmissao:s,mesAno:A,qtdTotalItens:v,valorTotal:b,descontoTotal:L,valorAPagar:F,formasPagamento:P,itens:j}}function $e(t){const e=["BAUDUCCO","BAUD","PANCO","DANONE","NESTLE","QUALITA","SADIA","PERDIGAO","SEARA","CAMIL","TIO JOAO","URBANO","LIZA","SOYA","YPE","PILAO","MELITTA","3 CORACOES","VIGOR","PARMALAT","ITALAC","HEINZ","KRAFT"],a=t.toUpperCase();for(const o of e)if(a.includes(o))return o;return a.split(" ")[0]||"Genérica"}function Ie(){const t=document.getElementById("lista-historico");if(!M.length){t.innerHTML='<div class="empty-state">📭 Nenhuma compra cadastrada ainda.</div>';return}t.innerHTML=M.map(e=>{var a,o,n;return`
    <div class="purchase-card">
      <div class="purchase-header" onclick="toggleDetail('${e.id}')">
        <div class="purchase-info">
          <h3>${e.nomeMercado||"Mercado"}</h3>
          <p>📅 ${it(e.dataEmissao)} &nbsp;•&nbsp; 🛒 ${e.qtdTotalItens||0} itens</p>
        </div>
        <div class="purchase-values">
          <div class="pv-total">${d(e.valorAPagar)}</div>
          <div class="pv-sub">Desc: ${d(e.descontoTotal)}</div>
        </div>
        <svg class="chevron" id="chev-${e.id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      <div class="purchase-details" id="detail-${e.id}">
        <div class="details-toolbar">
          <span class="card-subtext">Pagamentos: Alimentação ${d((a=e.formasPagamento)==null?void 0:a.valeAlimentacao)} · Crédito ${d((o=e.formasPagamento)==null?void 0:o.cartaoCredito)} · Débito ${d((n=e.formasPagamento)==null?void 0:n.cartaoDebito)}</span>
          <button class="btn-danger" onclick="confirmarExcluirMercado('${e.id}')">🗑️ Excluir</button>
        </div>
        ${Gt(e)}
      </div>
    </div>`}).join("")}function Gt(t){return!t.itens||!t.itens.length?'<p class="card-subtext">Nenhum item detalhado registrado.</p>':`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Item</th><th>Marca</th><th class="num">Qtd</th><th class="num">Vl. Unit.</th><th class="num">Vl. Total</th></tr></thead>
    <tbody>${t.itens.map(e=>`<tr>
      <td>${e.nome}</td>
      <td><span class="badge amber">${e.marca||"—"}</span></td>
      <td class="num">${e.quantidade} ${e.unidade||"Un"}</td>
      <td class="num">${d(e.valorUnitario)}</td>
      <td class="num"><strong>${d(e.valorTotal)}</strong></td>
    </tr>`).join("")}</tbody>
  </table></div>`}window.toggleDetail=function(t){const e=document.getElementById("detail-"+t),a=document.getElementById("chev-"+t);e&&e.classList.toggle("open"),a&&a.classList.toggle("open")};window.confirmarExcluirMercado=async function(t){if(confirm("Excluir esta compra de mercado?"))try{await W(S(B,gt,t)),g("🗑️ Compra excluída.")}catch(e){alert("Erro: "+e.message)}};function xe(){const t=document.getElementById("lista-comparacao"),e={};M.forEach(o=>{(o.itens||[]).forEach(n=>{var r;const s=((r=n.nome)==null?void 0:r.toLowerCase().trim())||"produto";e[s]||(e[s]={nome:n.nome,marca:n.marca,hist:{}}),e[s].hist[o.mesAno]=n.valorUnitario})});const a=Object.values(e);if(!a.length){t.innerHTML='<div class="empty-state">Adicione notas para ver a comparação de preços unitários.</div>';return}t.innerHTML=`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Produto</th><th>Marca</th><th>Histórico (Unitário)</th><th>Variação</th></tr></thead>
    <tbody>${a.map(o=>{const n=Object.keys(o.hist).sort();let s=n.map(c=>`${c}: <strong>${d(o.hist[c])}</strong>`).join(" → "),r='<span class="badge cyan">Estável</span>';if(n.length>=2){const c=o.hist[n[n.length-2]],i=o.hist[n[n.length-1]]-c,m=(i/c*100).toFixed(1);i>.01?r=`<span class="badge red">+${m}% ↑</span>`:i<-.01&&(r=`<span class="badge green">${m}% ↓</span>`)}return`<tr><td><strong>${o.nome}</strong></td><td><span class="badge amber">${o.marca||"—"}</span></td><td>${s}</td><td>${r}</td></tr>`}).join("")}</tbody>
  </table></div>`}function we(){const t=document.getElementById("lista-recorrencia"),e=document.getElementById("lista-marcas"),a={},o={};M.forEach(r=>{(r.itens||[]).forEach(c=>{var u;const l=(u=c.nome)==null?void 0:u.toLowerCase().trim();if(!l)return;a[l]||(a[l]={nome:c.nome,marca:c.marca,qtd:0,notas:0,units:[]}),a[l].qtd+=c.quantidade||1,a[l].notas+=1,a[l].units.push(c.valorUnitario||0);const i=(c.nome||"").split(" ")[0].toUpperCase();o[i]||(o[i]={});const m=c.marca||"Genérica";o[i][m]||(o[i][m]=[]),o[i][m].push(c.valorUnitario||0)})});const n=Object.values(a).filter(r=>r.notas>1).sort((r,c)=>c.notas-r.notas);t.innerHTML=n.length?`<div class="table-responsive"><table class="custom-table">
        <thead><tr><th>Item</th><th>Marca</th><th>Compras</th><th class="num">Qtd Total</th><th class="num">Média Unitária</th></tr></thead>
        <tbody>${n.map(r=>{const c=r.units.reduce((l,i)=>l+i,0)/r.units.length;return`<tr>
            <td><strong>${r.nome}</strong></td>
            <td><span class="badge amber">${r.marca||"—"}</span></td>
            <td><span class="badge green">${r.notas}x</span></td>
            <td class="num">${r.qtd}</td>
            <td class="num">${d(c)}</td>
          </tr>`}).join("")}</tbody>
      </table></div>`:'<div class="empty-state">Adicione notas para ver a recorrência de itens.</div>';const s=Object.entries(o).filter(([,r])=>Object.keys(r).length>1).map(([r,c])=>{let l=1/0,i="";const m=Object.entries(c).map(([u,f])=>{const h=f.reduce((v,b)=>v+b,0)/f.length;return h<l&&(l=h,i=u),{marca:u,med:h}});return`<div class="brand-card">
      <div class="brand-card-header">
        <span class="card-title">${r}</span>
        <span class="badge green">🏆 Menor preço: ${i} (${d(l)}/un)</span>
      </div>
      <div class="brands-row">
        ${m.map(u=>`<div class="brand-chip${u.marca===i?" best":""}">
          <div class="bc-name">${u.marca} ${u.marca===i?"✅":""}</div>
          <div class="bc-val">${d(u.med)}<span style="font-size:.7rem;font-weight:400">/un</span></div>
        </div>`).join("")}
      </div>
    </div>`}).join("");e.innerHTML=s||'<div class="empty-state">Ao comprar o mesmo tipo de produto com marcas diferentes, o sistema mostrará qual teve menor preço.</div>'}document.getElementById("btn-modal-close").addEventListener("click",()=>{document.getElementById("modal-cors").classList.remove("active")});
