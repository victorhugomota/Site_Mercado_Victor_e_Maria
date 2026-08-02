import{initializeApp as Yt}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";import{getFirestore as _t,onSnapshot as nt,query as Zt,collection as Q,orderBy as Wt,doc as z,setDoc as st,addDoc as ct,deleteDoc as W,serverTimestamp as gt}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function a(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(n){if(n.ep)return;n.ep=!0;const s=a(n);fetch(n.href,s)}})();const It=document.createElement("script");It.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js";document.head.appendChild(It);const wt=document.createElement("script");wt.src="https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js";document.head.appendChild(wt);const Jt={apiKey:"AIzaSyANpFnEIkyN1XCT6qbtmVR9wx7sQHEsyrE",authDomain:"comprasmercado-23913.firebaseapp.com",projectId:"comprasmercado-23913",storageBucket:"comprasmercado-23913.firebasestorage.app",messagingSenderId:"317518149234",appId:"1:317518149234:web:94f38624d68a2b9a6634eb",measurementId:"G-2XP88EK37S"},Kt=Yt(Jt),C=_t(Kt),ft="compras",rt="entradas",et="faturas",at="boletos",Bt="reservas";let R=[],N=[],P=[],V=[],vt={valorAtualGuardado:0},pt=null,G=null,j=[],tt=0,ot=!1,_=[];function l(t){return Number(t||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}function T(t){if(typeof t=="number")return t;if(!t)return 0;const e=parseFloat(String(t).replace(/R\$\s?/gi,"").replace(/\s/g,"").replace(/\./g,"").replace(",","."));return isNaN(e)?0:e}function it(t){if(!t)return"—";try{return new Date(t).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}catch{return t}}function b(t,e=3500){const a=document.getElementById("toast");a.textContent=t,a.classList.add("show"),setTimeout(()=>a.classList.remove("show"),e)}function O(t,e="var(--accent-amber)"){const a=document.getElementById("status-msg");a&&(a.textContent=t,a.style.color=e)}function Xt(t){if(!t)return new Date().toISOString().slice(0,16);try{const e=new Date(t);if(isNaN(e.getTime()))return new Date().toISOString().slice(0,16);const a=o=>String(o).padStart(2,"0");return`${e.getFullYear()}-${a(e.getMonth()+1)}-${a(e.getDate())}T${a(e.getHours())}:${a(e.getMinutes())}`}catch{return new Date().toISOString().slice(0,16)}}function te(t,e){let a=0;const o=new Date(t,e+1,0).getDate();for(let n=1;n<=o;n++){const s=new Date(t,e,n).getDay();s!==0&&s!==6&&a++}return a}window.goTab=function(t){document.querySelectorAll(".tab-content").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".desktop-nav .nav-item").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".mobile-nav .mob-btn").forEach(a=>a.classList.remove("active"));const e=document.getElementById("tab-"+t);e&&e.classList.add("active"),document.querySelectorAll(`[data-tab="${t}"]`).forEach(a=>a.classList.add("active"))};document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>goTab(t.getAttribute("data-tab")))});document.querySelectorAll(".sub-item").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".sub-item").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".sub-tab-content").forEach(a=>a.style.display="none"),t.classList.add("active");const e=document.getElementById("sub-"+t.getAttribute("data-sub"));e&&(e.style.display="block")})});function At(){document.getElementById("modal-add-nota").classList.add("active")}function Ct(){ot&&ht(),document.getElementById("modal-add-nota").classList.remove("active")}var Et;(Et=document.getElementById("btn-open-modal-home"))==null||Et.addEventListener("click",At);var $t;($t=document.getElementById("btn-mercado-add-nota"))==null||$t.addEventListener("click",At);var xt;(xt=document.getElementById("btn-close-modal-add"))==null||xt.addEventListener("click",Ct);nt(Zt(Q(C,ft),Wt("dataEmissao","desc")),t=>{R=t.docs.map(e=>({id:e.id,...e.data()})),J()},t=>console.error("Firestore Mercado:",t));nt(Q(C,rt),t=>{N=t.docs.map(e=>({id:e.id,...e.data()})),J()},t=>console.error("Firestore Entradas:",t));nt(Q(C,et),t=>{P=t.docs.map(e=>({id:e.id,...e.data()})),J()},t=>console.error("Firestore Faturas:",t));nt(Q(C,at),t=>{V=t.docs.map(e=>({id:e.id,...e.data()})),J()},t=>console.error("Firestore Boletos:",t));nt(z(C,Bt,"config"),t=>{t.exists()&&(vt=t.data()),J()},t=>console.error("Firestore Reservas:",t));let x=new Date().toISOString().slice(0,7);function mt(){const t=new Set,e=new Date().toISOString().slice(0,7);return t.add(e),x&&t.add(x),N.forEach(a=>{a.mesAno&&t.add(a.mesAno)}),P.forEach(a=>{a.mesAno&&t.add(a.mesAno)}),V.forEach(a=>{a.mesAno&&t.add(a.mesAno)}),R.forEach(a=>{a.mesAno&&t.add(a.mesAno)}),Array.from(t).sort().reverse()}window.selecionarMesGlobal=function(t){if(!t)return;x=t;const e=document.getElementById("inp-seletor-mes-global");e&&(e.value=t);const a=document.getElementById("inp-entradas-mes-ano");a&&(a.value=t);const o=document.getElementById("inp-fatura-vencimento");o&&(o.value=`${t}-10`,typeof atualizarMesRefFatura=="function"&&atualizarMesRefFatura());const n=document.getElementById("inp-boleto-vencimento");n&&(n.value=`${t}-10`,typeof atualizarMesRefBoleto=="function"&&atualizarMesRefBoleto()),J()};window.verMesEIrParaControle=function(t){selecionarMesGlobal(t),typeof goTab=="function"&&goTab("mensal")};function ee(){const t=document.getElementById("seletor-meses-bar"),e=document.getElementById("seletor-meses-bar-salarios"),a=mt();a.includes(x)||(x=a[0]||new Date().toISOString().slice(0,7));const o=document.getElementById("inp-seletor-mes-global");o&&o.value!==x&&(o.value=x);const n=document.getElementById("inp-entradas-mes-ano");n&&n.value!==x&&(n.value=x);const s=a.map(r=>{const[c,d]=r.split("-"),u=new Date(parseInt(c),parseInt(d)-1,1).toLocaleString("pt-BR",{month:"short"}).toUpperCase().replace(".",""),m=r===x;return`
      <button class="sub-item ${m?"active":""}" onclick="selecionarMesGlobal('${r}')" style="${m?"background:var(--secondary);color:#fff;border-color:var(--secondary);box-shadow:0 0 10px rgba(99,102,241,0.4);font-weight:700":"background:rgba(15,23,42,.6);color:var(--text-muted);border:1px solid var(--border-color)"}; display:inline-flex;align-items:center;gap:.35rem">
        📅 ${u}/${c}
      </button>
    `}).join("");t&&(t.innerHTML=s),e&&(e.innerHTML=s)}window.switchMensalSub=function(t){document.querySelectorAll("[data-mensal-sub]").forEach(o=>o.classList.remove("active")),document.querySelectorAll(".mensal-sub-content").forEach(o=>o.style.display="none");const e=document.querySelector(`[data-mensal-sub="${t}"]`);e&&e.classList.add("active");const a=document.getElementById(t);a&&(a.style.display="block")};function J(){ee(),ne(),ae(),St(),ue(),ge(),he(),Ie(),we(),Be(),fe()}function ae(){const t=x,e=N.filter(g=>g.mesAno===t),a=P.filter(g=>g.mesAno===t),o=V.filter(g=>g.mesAno===t),n=R.filter(g=>g.mesAno===t),s=e.reduce((g,f)=>g+(f.valor||0),0),r=a.reduce((g,f)=>g+(f.valorTotal!==void 0?f.valorTotal:f.valor||0),0),c=o.reduce((g,f)=>g+(f.valorTotal!==void 0?f.valorTotal:f.valor||0),0);let d=0;n.forEach(g=>{g.formasPagamento&&(d+=g.formasPagamento.cartaoDebito||0)});const i=s-r-c-d,u=document.getElementById("m-total-entradas");u&&(u.textContent=l(s));const m=document.getElementById("m-total-cartoes");m&&(m.textContent=l(r));const h=document.getElementById("m-total-boletos");h&&(h.textContent=l(c));const y=document.getElementById("m-mercado-debito");y&&(y.textContent=l(d));const v=document.getElementById("m-saldo-liquido");v&&(v.textContent=l(i),v.style.color=i>=0?"#60a5fa":"#fb7185");const[E,S]=t.split("-"),L=new Date(parseInt(E),parseInt(S)-1,1).toLocaleString("pt-BR",{month:"long"}),q=L.charAt(0).toUpperCase()+L.slice(1),M=document.getElementById("m-lbl-saldo-liquido");M&&(M.textContent=`Saldo Líquido (${q}/${E})`),oe(e,a,o,n)}function oe(t,e,a,o){const n=document.getElementById("content-salarios-mes");n&&(n.innerHTML=`
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header">
          <span class="card-title">💵 Entradas Registradas em ${x}</span>
          <span class="badge green">Total: ${l(t.reduce((d,i)=>d+(i.valor||0),0))}</span>
        </div>
        ${t.length?`<div class="table-responsive"><table class="custom-table">
              <thead><tr><th>Pessoa</th><th>Descrição</th><th>Tipo</th><th class="num">Valor</th><th>Ação</th></tr></thead>
              <tbody>${t.map(d=>`<tr>
                <td><span class="badge ${d.pessoa==="Victor"?"green":d.pessoa==="Maria"?"purple":"cyan"}">${d.pessoa}</span></td>
                <td><strong>${d.descricao}</strong></td>
                <td><span class="badge amber">${d.tipo==="holerite"?"Holerite":"Manual"}</span></td>
                <td class="num" style="color:#34d399"><strong>${l(d.valor)}</strong></td>
                <td><button class="btn-danger" onclick="excluirEntrada('${d.id}')">🗑️</button></td>
              </tr>`).join("")}</tbody>
            </table></div>`:`<div class="empty-state">Nenhuma entrada cadastrada para ${x}. Use a aba "Salários & Entradas" para cadastrar.</div>`}
      </div>
    `);const s=document.getElementById("content-cartoes-mes");if(s){const d=e.reduce((u,m)=>u+(m.valorTotal||0),0),i=e.length?qt(e):"";s.innerHTML=`
      ${i}
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header">
          <span class="card-title">💳 Faturas de Cartão Vencendo em ${x}</span>
          <span class="badge rose">Total: ${l(d)}</span>
        </div>
        ${e.length?e.map(u=>`
              <div class="purchase-card" style="margin-bottom:1rem">
                <div class="purchase-header" onclick="toggleDetail('fat-m-${u.id}')">
                  <div class="purchase-info">
                    <h3>${u.cartao==="Nubank"?"🟣 Nubank":u.cartao==="Santander"?"🔴 Santander":"💳 "+(u.descricao||u.cartao)}</h3>
                    <p>Vencimento: <strong>${u.dataVencimento||"—"}</strong> • ${u.qtdItens||(u.itens?u.itens.length:0)} lançamentos</p>
                  </div>
                  <div class="purchase-values">
                    <div class="pv-total" style="color:#fb7185">${l(u.valorTotal)}</div>
                    <div class="pv-sub">Clique para ver itens <span class="chevron">▼</span></div>
                  </div>
                </div>
                <div id="fat-m-${u.id}" class="purchase-details">
                  <div class="details-toolbar">
                    <span style="font-weight:700;font-size:.9rem;color:var(--text-muted)">Lançamentos da Fatura</span>
                    <button class="btn-danger" onclick="excluirFaturaDocumento('${u.id}')">🗑️ Excluir Fatura</button>
                  </div>
                  ${Ot(u)}
                </div>
              </div>
            `).join(""):`<div class="empty-state">Nenhuma fatura cadastrada com vencimento em ${x}. Use a aba "Cartões de Crédito" para importar.</div>`}
      </div>
    `}const r=document.getElementById("content-boletos-mes");if(r){const d=a.reduce((i,u)=>i+(u.valorTotal||0),0);r.innerHTML=`
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header">
          <span class="card-title">📄 Boletos Vencendo em ${x}</span>
          <span class="badge purple">Total: ${l(d)}</span>
        </div>
        ${a.length?a.map(i=>`
              <div class="purchase-card" style="margin-bottom:1rem">
                <div class="purchase-header" onclick="toggleDetail('bol-m-${i.id}')">
                  <div class="purchase-info">
                    <h3>📄 ${i.descricao||"Boleto / Conta"}</h3>
                    <p>Vencimento: <strong>${i.dataVencimento||"—"}</strong> • ${i.qtdItens||(i.itens?i.itens.length:0)} encargos</p>
                  </div>
                  <div class="purchase-values">
                    <div class="pv-total" style="color:#c084fc">${l(i.valorTotal)}</div>
                    <div class="pv-sub">Clique para ver detalhes <span class="chevron">▼</span></div>
                  </div>
                </div>
                <div id="bol-m-${i.id}" class="purchase-details">
                  <div class="details-toolbar">
                    <span style="font-weight:700;font-size:.9rem;color:var(--text-muted)">Detalhamento do Boleto</span>
                    <button class="btn-danger" onclick="excluirBoletoDocumento('${i.id}')">🗑️ Excluir Boleto</button>
                  </div>
                  ${zt(i)}
                </div>
              </div>
            `).join(""):`<div class="empty-state">Nenhum boleto cadastrado para ${x}. Use a aba "Boletos" para importar.</div>`}
      </div>
    `}const c=document.getElementById("content-mercado-mes");c&&(c.innerHTML=`
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header">
          <span class="card-title">🛒 Compras de Mercado em ${x}</span>
          <span class="badge amber">${o.length} notas cadastradas</span>
        </div>
        ${o.length?o.map(d=>`
              <div class="purchase-card" style="margin-bottom:1rem">
                <div class="purchase-header" onclick="toggleDetail('mer-m-${d.id}')">
                  <div class="purchase-info">
                    <h3>🛒 ${d.nomeMercado||"Mercado"}</h3>
                    <p>Data: <strong>${it(d.dataEmissao)}</strong> • ${d.qtdTotalItens||0} itens</p>
                  </div>
                  <div class="purchase-values">
                    <div class="pv-total" style="color:#fbbf24">${l(d.valorAPagar)}</div>
                    <div class="pv-sub">Clique para ver itens <span class="chevron">▼</span></div>
                  </div>
                </div>
                <div id="mer-m-${d.id}" class="purchase-details">
                  <div class="details-toolbar">
                    <span style="font-weight:700;font-size:.9rem;color:var(--text-muted)">Itens da Nota</span>
                    <button class="btn-danger" onclick="excluirCompraDocumento('${d.id}')">🗑️ Excluir Nota</button>
                  </div>
                  ${Gt(d)}
                </div>
              </div>
            `).join(""):`<div class="empty-state">Nenhuma nota de mercado cadastrada para ${x}.</div>`}
      </div>
    `)}function ne(){let t=N.reduce((i,u)=>i+(u.valor||0),0),e=P.reduce((i,u)=>i+(u.valorTotal!==void 0?u.valorTotal:u.valor||0),0),a=V.reduce((i,u)=>i+(u.valorTotal!==void 0?u.valorTotal:u.valor||0),0),o=0,n=0,s=0;const r={};R.forEach(i=>{const u=i.valorAPagar||0;i.formasPagamento&&(n+=i.formasPagamento.valeAlimentacao||0,s+=i.formasPagamento.cartaoCredito||0,o+=i.formasPagamento.cartaoDebito||0);const m=i.mesAno||"Outros";r[m]=(r[m]||0)+u});let c=t-e-a-o;document.getElementById("fin-total-entradas").textContent=l(t);const d=document.getElementById("fin-subtext-entradas");d&&(d.textContent="Total de Entradas Cadastradas"),document.getElementById("fin-total-cartoes").textContent=l(e),document.getElementById("fin-total-boletos").textContent=l(a),document.getElementById("fin-mercado-debito").textContent=l(o),document.getElementById("fin-saldo-liquido").textContent=l(c),document.getElementById("dash-alimentacao").textContent=l(n),document.getElementById("dash-credito").textContent=l(s),document.getElementById("dash-debito").textContent=l(o),se(),Tt(r)}function se(){const t=document.getElementById("tabela-resumo-mensal");if(!t)return;const e=mt();if(!e.length){t.innerHTML='<div class="empty-state">Nenhum dado cadastrado ainda.</div>';return}const a=e.map(o=>{const n=N.filter(v=>v.mesAno===o).reduce((v,E)=>v+(E.valor||0),0),s=P.filter(v=>v.mesAno===o).reduce((v,E)=>v+(E.valorTotal!==void 0?E.valorTotal:E.valor||0),0),r=V.filter(v=>v.mesAno===o).reduce((v,E)=>v+(E.valorTotal!==void 0?E.valorTotal:E.valor||0),0);let c=0;R.filter(v=>v.mesAno===o).forEach(v=>{v.formasPagamento&&(c+=v.formasPagamento.cartaoDebito||0)});const d=n-s-r-c,[i,u]=o.split("-"),h=new Date(parseInt(i),parseInt(u)-1,1).toLocaleString("pt-BR",{month:"short"}).toUpperCase().replace(".","");return`
      <tr style="${o===x?"background:rgba(99,102,241,0.1)":""}">
        <td><strong>📅 ${h}/${i}</strong></td>
        <td style="color:#34d399"><strong>${l(n)}</strong></td>
        <td style="color:#fb7185">${l(s)}</td>
        <td style="color:#c084fc">${l(r)}</td>
        <td style="color:#fbbf24">${l(c)}</td>
        <td style="color:${d>=0?"#60a5fa":"#fb7185"}; font-weight:800">${l(d)}</td>
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
  `}function Tt(t){var s;if(typeof Chart>"u")return setTimeout(()=>Tt(t),300);const e=(s=document.getElementById("chart-barras"))==null?void 0:s.getContext("2d");if(!e)return;const a=Object.keys(t).sort(),o=a.map(r=>{const[c,d]=r.split("-");return`${d}/${c}`}),n=a.map(r=>t[r]);pt&&pt.destroy(),pt=new Chart(e,{type:"bar",data:{labels:o.length?o:["Sem compras"],datasets:[{label:"Gasto Mercado R$",data:n.length?n:[0],backgroundColor:"rgba(16,185,129,0.78)",borderColor:"#10b981",borderWidth:2,borderRadius:8}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:r=>` ${l(r.raw)}`}}},scales:{y:{beginAtZero:!0,grid:{color:"rgba(255,255,255,.05)"},ticks:{color:"#94a3b8",callback:r=>"R$"+r}},x:{grid:{display:!1},ticks:{color:"#94a3b8"}}}}})}function Mt(t){if(!t)return 0;const e=t.match(/L[íi]quido(?:\s*a\s*receber)?\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/TOTAL\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/SAL[ÁA]RIO\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/VALOR\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i);return e?T(e[1]):0}function re(){const t=document.getElementById("inp-entradas-mes-ano");if(t&&!t.value){const e=new Date,a=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0");t.value=`${a}-${o}`}}setTimeout(re,300);let Y="mes";window.toggleFiltroEntradasTabela=function(t){Y=t,St()};document.getElementById("form-holerite-victor").addEventListener("submit",async t=>{t.preventDefault();const e=x||document.getElementById("inp-entradas-mes-ano").value||new Date().toISOString().slice(0,7),a=document.getElementById("inp-holerite-txt-victor").value;let o=parseFloat(document.getElementById("inp-salario-val-victor").value)||0;if(!o&&a&&(o=Mt(a)),!o){b("⚠️ Digite ou cole um holerite válido com valor.");return}const n=`salario_victor_${e}`;await st(z(C,rt,n),{pessoa:"Victor",tipo:"holerite",descricao:`Salário Líquido Victor (${e})`,valor:o,mesAno:e,data:new Date().toISOString()}),document.getElementById("inp-holerite-txt-victor").value="",document.getElementById("inp-salario-val-victor").value="",b(`✅ Salário do Victor (${e}) salvo com sucesso!`)});document.getElementById("form-holerite-maria").addEventListener("submit",async t=>{t.preventDefault();const e=x||document.getElementById("inp-entradas-mes-ano").value||new Date().toISOString().slice(0,7),a=document.getElementById("inp-holerite-txt-maria").value;let o=parseFloat(document.getElementById("inp-salario-val-maria").value)||0;if(!o&&a&&(o=Mt(a)),!o){b("⚠️ Digite ou cole um holerite válido com valor.");return}const n=`salario_maria_${e}`;await st(z(C,rt,n),{pessoa:"Maria",tipo:"holerite",descricao:`Salário Líquido Maria (${e})`,valor:o,mesAno:e,data:new Date().toISOString()}),document.getElementById("inp-holerite-txt-maria").value="",document.getElementById("inp-salario-val-maria").value="",b(`✅ Salário da Maria (${e}) salvo com sucesso!`)});document.getElementById("form-entrada-manual").addEventListener("submit",async t=>{t.preventDefault();const e=x||document.getElementById("inp-entradas-mes-ano").value||new Date().toISOString().slice(0,7),a=document.getElementById("inp-ent-desc").value.trim(),o=parseFloat(document.getElementById("inp-ent-val").value)||0,n=document.getElementById("inp-ent-pessoa").value;!a||!o||(await ct(Q(C,rt),{pessoa:n,tipo:"manual",descricao:a,valor:o,mesAno:e,data:new Date().toISOString()}),t.target.reset(),b(`🎉 Entrada manual (${e}) registrada!`))});function St(){var d,i,u;const t=x||((d=document.getElementById("inp-entradas-mes-ano"))==null?void 0:d.value)||new Date().toISOString().slice(0,7),e=document.getElementById("lbl-entradas-mes-ref");if(e){const[m,h]=t.split("-"),v=new Date(parseInt(m),parseInt(h)-1,1).toLocaleString("pt-BR",{month:"long"}),E=v.charAt(0).toUpperCase()+v.slice(1);e.textContent=`Visualizando e inserindo entradas para: ${E} de ${m}`}const a=((i=N.find(m=>m.pessoa==="Victor"&&m.tipo==="holerite"&&m.mesAno===t))==null?void 0:i.valor)||0,o=((u=N.find(m=>m.pessoa==="Maria"&&m.tipo==="holerite"&&m.mesAno===t))==null?void 0:u.valor)||0,n=N.filter(m=>m.mesAno===t),s=n.reduce((m,h)=>m+(h.valor||0),0);document.getElementById("val-salario-victor").textContent=l(a),document.getElementById("val-salario-maria").textContent=l(o),document.getElementById("val-entradas-combinado").textContent=`${l(s)}`;const r=document.getElementById("lista-entradas-registradas");if(!r)return;const c=Y==="mes"?n:N;if(!c.length){r.innerHTML=`
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;flex-wrap:wrap;gap:.5rem">
        <span style="font-size:.84rem;color:var(--text-muted)">Modo de Exibição da Tabela:</span>
        <div style="display:flex;gap:.35rem">
          <button type="button" class="btn-secondary" style="padding:.25rem .6rem;font-size:.78rem;${Y==="mes"?"background:var(--secondary);color:#fff":""}" onclick="toggleFiltroEntradasTabela('mes')">📅 Mês (${t})</button>
          <button type="button" class="btn-secondary" style="padding:.25rem .6rem;font-size:.78rem;${Y==="todos"?"background:var(--secondary);color:#fff":""}" onclick="toggleFiltroEntradasTabela('todos')">🌐 Todas as Entradas</button>
        </div>
      </div>
      <div class="empty-state">Nenhuma entrada registrada para ${Y==="mes"?"o mês "+t:"o sistema"}.</div>
    `;return}r.innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.75rem;flex-wrap:wrap;gap:.5rem">
      <span style="font-size:.84rem;color:var(--text-muted);font-weight:600">Exibindo ${c.length} entrada(s) em tabela:</span>
      <div style="display:flex;gap:.35rem">
        <button type="button" class="btn-secondary" style="padding:.25rem .6rem;font-size:.78rem;${Y==="mes"?"background:var(--secondary);color:#fff":""}" onclick="toggleFiltroEntradasTabela('mes')">📅 Mês ${t}</button>
        <button type="button" class="btn-secondary" style="padding:.25rem .6rem;font-size:.78rem;${Y==="todos"?"background:var(--secondary);color:#fff":""}" onclick="toggleFiltroEntradasTabela('todos')">🌐 Todas</button>
      </div>
    </div>
    <div class="table-responsive"><table class="custom-table">
      <thead><tr><th>Mês / Ref</th><th>Descrição</th><th>Pessoa</th><th>Tipo</th><th class="num">Valor</th><th>Ação</th></tr></thead>
      <tbody>${c.map(m=>`<tr>
        <td><span class="badge green">${m.mesAno||"—"}</span></td>
        <td><strong>${m.descricao}</strong></td>
        <td><span class="badge ${m.pessoa==="Victor"?"green":m.pessoa==="Maria"?"purple":"cyan"}">${m.pessoa}</span></td>
        <td><span class="badge amber">${m.tipo==="holerite"?"Holerite":"Manual"}</span></td>
        <td class="num" style="color:#34d399"><strong>${l(m.valor)}</strong></td>
        <td><button class="btn-danger" onclick="excluirEntrada('${m.id}')">🗑️</button></td>
      </tr>`).join("")}</tbody>
    </table></div>
  `}window.excluirEntrada=async function(t){confirm("Excluir esta entrada?")&&(await W(z(C,rt,t)),b("🗑️ Entrada removida."))};let bt="Nubank",w=null;function ie(){const t=document.getElementById("inp-fatura-vencimento");if(t&&!t.value){const e=new Date,a=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0");t.value=`${a}-${o}-10`,atualizarMesRefFatura()}}setTimeout(ie,300);window.atualizarMesRefFatura=function(){const t=document.getElementById("inp-fatura-vencimento"),e=document.getElementById("lbl-fatura-mes-ref");if(!(!t||!e))if(t.value){const[a,o]=t.value.split("-"),s=new Date(parseInt(a),parseInt(o)-1,1).toLocaleString("pt-BR",{month:"long"});e.textContent=`Fatura ${s.charAt(0).toUpperCase()+s.slice(1)}/${a}`}else e.textContent="Mês da Fatura"};window.selecionarCartaoFatura=function(t){bt=t,document.querySelectorAll(".btn-card-select").forEach(a=>a.classList.remove("active"));const e=document.querySelector(`.btn-card-select[data-card="${t}"]`);e&&e.classList.add("active"),b(`Cartão selecionado: ${t}`)};window.handleFileFaturaSelect=async function(t){const e=t.target.files[0];if(!e)return;const a=document.getElementById("txt-file-fatura");a&&(a.textContent=`📄 Arquivo: ${e.name}`),b(`⏳ Lendo arquivo da fatura (${e.name})...`);let o="";if(e.type==="application/pdf"||e.name.endsWith(".pdf"))o=await Dt(e);else try{o=await e.text()}catch{o=""}o?(document.getElementById("inp-fatura-txt").value=o,await Lt(o,bt)):b("❌ Não foi possível ler o texto do arquivo da fatura.")};async function Dt(t){try{const e=await t.arrayBuffer();if(typeof pdfjsLib>"u")return b("⚠️ Aguarde a biblioteca de PDF carregar..."),"";pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";let a=pdfjsLib.getDocument({data:e});a.onPassword=(s,r)=>{let c=prompt(`🔒 Este PDF de fatura está protegido por senha.
Digite a senha para abrir (ex: CPF ou Data de Nascimento):`);c?s(c):b("⚠️ Senha não informada. Leitura do PDF cancelada.")};const o=await a.promise;let n="";for(let s=1;s<=o.numPages;s++){const c=await(await o.getPage(s)).getTextContent();let d=null,i="";for(const u of c.items){if(!u.str)continue;const m=u.transform?u.transform[5]:null;d!==null&&Math.abs(m-d)>3?i+=`
`:i.length>0&&!i.endsWith(`
`)&&!i.endsWith(" ")&&(i+=" "),i+=u.str,d=m}n+=i+`
`}return n}catch(e){return e.name==="PasswordException"?b("🔒 O PDF precisa de senha válida para ser aberto."):console.error("Erro ao ler PDF:",e),""}}function le(t){if(!t)return null;const e=t.match(/Total\s*a\s*Pagar\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/no\s*valor\s*de\s*R?\$\s*([\d\.,]+)/i)||t.match(/Valor\s*total\s*da\s*fatura\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/Total\s*da\s*fatura\s*[:\s]*R?\$\s*([\d\.,]+)/i);if(e){const a=T(e[1]);if(a>0)return a}return null}function de(t){if(!t)return null;const e=t.match(/Vencimento\s*[:\s]*(\d{2}[\/\.-]\d{2}[\/\.-]\d{4})/i)||t.match(/Data\s*de\s*vencimento\s*[:\s]*(\d{2})\s+([A-Za-z]{3})\s+(\d{4})/i)||t.match(/FATURA\s+(\d{2})\s+([A-Za-z]{3})\s+(\d{4})/i);if(e){if(e[2]&&e[3]){const a=e[1],o=e[2].toUpperCase(),n=e[3],r={JAN:"01",FEB:"02",MAR:"03",ABR:"04",APR:"04",MAI:"05",MAY:"05",JUN:"06",JUL:"07",AGO:"08",AUG:"08",SET:"09",SEP:"09",OUT:"10",OCT:"10",NOV:"11",DEZ:"12",DEC:"12"}[o]||"07";return`${n}-${r}-${a.padStart(2,"0")}`}else if(e[1]){const[a,o,n]=e[1].split(/[\/\.-]/);return`${n}-${o.padStart(2,"0")}-${a.padStart(2,"0")}`}}return null}window.importarFaturaManualOuArquivo=async function(){const t=document.getElementById("inp-fatura-txt").value.trim();if(!t){b("⚠️ Selecione o arquivo da fatura (.pdf, .csv) ou cole o texto da fatura.");return}await Lt(t,bt)};async function Lt(t,e){const a=de(t);a&&(document.getElementById("inp-fatura-vencimento").value=a,atualizarMesRefFatura());const o=le(t),n=ce(t),s=document.getElementById("inp-fatura-vencimento").value||new Date().toISOString().slice(0,10),r=s.slice(0,7),c=n.reduce((h,y)=>h+y.valor,0),d=o||c||0,i=e?`Cartão ${e}`:"Fatura Cartão";w={cartao:e||"Nubank",descricao:i,dataVencimento:s,mesAno:r,valorTotal:d,qtdItens:n.length,itens:n};const u=document.getElementById("inp-revisao-fatura-desc");u&&(u.value=i);const m=document.getElementById("inp-revisao-fatura-val");m&&(m.value=d?d.toFixed(2):""),Ft(),n.length>0?b(`✅ ${n.length} compras encontradas! Fatura total: ${l(d)}.`):b("ℹ️ Fatura pronta para revisão. Confirme o valor total e o cartão abaixo.")}window.atualizarValorTotalRevisaoFatura=function(){var e;if(!w)return;const t=parseFloat((e=document.getElementById("inp-revisao-fatura-val"))==null?void 0:e.value)||0;w.valorTotal=t,document.getElementById("badge-total-preview-fatura").textContent=l(t)};function Ft(){if(!w)return;const{valorTotal:t,itens:e,cartao:a,descricao:o}=w;document.getElementById("badge-total-preview-fatura").textContent=l(t);const n=document.getElementById("inp-revisao-fatura-desc");n&&(!n.value||n.value==="Fatura Cartão")&&(n.value=o||`Cartão ${a||"Nubank"}`);const s=document.getElementById("inp-revisao-fatura-val");s&&(!s.value||parseFloat(s.value)===0)&&(s.value=t?t.toFixed(2):"");const r=document.getElementById("lista-preview-fatura-itens");!e||!e.length?r.innerHTML='<div class="empty-state">Nenhum item individual extraído. O valor total acima será considerado.</div>':r.innerHTML=e.map((d,i)=>`
      <div style="display:flex; justify-content:space-between; align-items:center; padding:.4rem 0; border-bottom:1px dashed var(--border-color); font-size:.82rem;">
        <span><strong>${d.dataCompra||"—"}</strong> — ${d.descricao}</span>
        <div style="display:flex; align-items:center; gap:.75rem;">
          <span style="color:#fb7185; font-weight:700;">${l(d.valor)}</span>
          <button type="button" class="btn-danger" style="padding:.15rem .45rem; font-size:.75rem;" onclick="removerItemRevisaoFatura(${i})">🗑️</button>
        </div>
      </div>
    `).join("");const c=document.getElementById("box-revisao-fatura");c.style.display="block",c.scrollIntoView({behavior:"smooth"})}window.removerItemRevisaoFatura=function(t){if(!w||!w.itens)return;w.itens.splice(t,1);const e=w.itens.reduce((a,o)=>a+o.valor,0);if(e>0){w.valorTotal=e;const a=document.getElementById("inp-revisao-fatura-val");a&&(a.value=e.toFixed(2))}w.qtdItens=w.itens.length,Ft(),b("🗑️ Item removido da revisão da fatura.")};window.confirmarEGravarFaturaDocumento=async function(){var o,n;if(!w)return;const t=(o=document.getElementById("inp-revisao-fatura-desc"))==null?void 0:o.value.trim(),e=parseFloat((n=document.getElementById("inp-revisao-fatura-val"))==null?void 0:n.value)||0,a=document.getElementById("inp-fatura-vencimento").value||new Date().toISOString().slice(0,10);if(!e){b("⚠️ Digite ou confirme o valor total da fatura.");return}w.cartao=t||w.cartao||"Cartão",w.valorTotal=e,w.dataVencimento=a,w.mesAno=a.slice(0,7);try{await ct(Q(C,et),{...w,createdAt:gt()}),document.getElementById("box-revisao-fatura").style.display="none",document.getElementById("inp-fatura-txt").value="";const s=document.getElementById("txt-file-fatura");s&&(s.textContent="Clique para Selecionar o Arquivo da Fatura");const r=l(w.valorTotal);w=null,b(`🎉 Fatura de ${r} salva com sucesso!`)}catch(s){alert("Erro ao salvar fatura: "+s.message)}};function ce(t){if(!t)return[];const e=[],a=/(?:[@\)\(\*•\s]+)?(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+(?:(\d{2}\/\d{2})\s+)?(-?R?\$\s*[\d\.]+,\d{2}|-?[\d\.]+,\d{2})/gi;if(t.split(`
`).forEach(n=>{const s=n.trim();if(!s||/EMISS[ÃA]O|TRANSA[ÇC][ÕO]ES|RESUMO|PAGAMENTO DE FATURA|TOTAL DA FATURA|FATURA ANTERIOR|SALDO ANTERIOR|LIMITE DISPON[ÍI]VEL|OPÇÕES DE PAGAMENTO|ALTERNATIVAS DE PAGAMENTO|PAGAMENTO E DEMAIS|PARCELAMENTOS|DESPESAS|HISTÓRICO DE FATURAS|SUPERCRÉDITO|SAQUE À CRÉDITO|COMPRA DATA DESCRIÇÃO/i.test(s))return;const r=/(?:[@\)\(\*•\s]+)?(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+(?:(\d{2}\/\d{2})\s+)?(-?R?\$\s*[\d\.]+,\d{2}|-?[\d\.]+,\d{2})$/i,c=s.match(r)||s.match(/(?:[@\)\(\*•\s]+)?(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+(?:(\d{2}\/\d{2})\s+)?(-?R?\$\s*[\d\.]+,\d{2}|-?[\d\.]+,\d{2})/i);if(c){const d=c[1];let i=c[2].trim();const u=c[3],m=c[4];if(m.includes("-")||/DEB AUTOM|PAGAMENTO|PAGTO|CR[ÉE]DITO FATURA/i.test(i))return;const h=T(m);u&&(i+=` (${u})`),i&&h>0&&i.length>2&&!/fatura|limite|pagamento|saldo|alternativas|opções|período|emissão|vencimento/i.test(i)&&e.push({dataCompra:d,descricao:i,valor:h})}}),e.length===0){let n;for(;(n=a.exec(t))!==null;){const s=n[1];let r=n[2].trim();const c=n[3],d=n[4];if(d.includes("-")||/DEB AUTOM|PAGAMENTO|PAGTO|CR[ÉE]DITO FATURA/i.test(r))continue;const i=T(d);c&&(r+=` (${c})`),r&&i>0&&r.length>2&&!/fatura|limite|pagamento|saldo|alternativas|opções|período|emissão|vencimento/i.test(r)&&e.push({dataCompra:s,descricao:r,valor:i})}}return e}window.ultimosLocaisAnalisados={};function me(t){if(!t)return"DIVERSOS";let e=t.replace(/\(\d{1,2}\/\d{1,2}\)/gi,"").replace(/\b\d{1,2}\/\d{1,2}\b/gi,"").replace(/\b\d{1,2}x\b/gi,"").trim();return e=e.replace(/\s+/g," "),e.toUpperCase()}function Rt(t){const e={};(Array.isArray(t)?t:[t]).forEach(n=>{!n||!n.itens||!Array.isArray(n.itens)||n.itens.forEach(s=>{if(!s.descricao||!s.valor)return;const r=me(s.descricao);e[r]||(e[r]={nome:r,qtd:0,valorTotal:0,compras:[]}),e[r].qtd+=1,e[r].valorTotal+=s.valor||0,e[r].compras.push({dataCompra:s.dataCompra||"—",descricao:s.descricao,valor:s.valor||0,cartao:n.cartao||"Cartão",mesAno:n.mesAno||"—"})})});const o=Object.values(e).filter(n=>n.qtd>=2);return o.sort((n,s)=>s.valorTotal-n.valorTotal),o}function qt(t,e="geral"){const a=Rt(t);if(a.forEach(n=>{window.ultimosLocaisAnalisados[`${e}_${n.nome}`]=n}),!a.length)return`
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
        <span class="badge rose" style="font-size:.85rem; padding:.35rem .75rem">Soma Repetidos: ${l(o)}</span>
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
                <div style="font-weight:800; font-size:1.08rem; color:#fb7185">${l(n.valorTotal)}</div>
                <div style="font-size:.72rem; color:var(--text-muted)">total gasto 🔍</div>
              </div>
            </div>
          `).join("")}
      </div>
    </div>
  `}window.abrirModalComprasEstabelecimento=function(t){const e=window.ultimosLocaisAnalisados[t];if(!e){b("⚠️ Não foi possível carregar os detalhes do estabelecimento.");return}let a=document.getElementById("modal-detalhes-estabelecimento");if(!a){const n=document.createElement("div");n.id="modal-detalhes-estabelecimento",n.className="modal-overlay",n.innerHTML=`
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
    `,document.body.appendChild(n),a=n,a.addEventListener("click",s=>{s.target===a&&fecharModalEstabelecimento()})}document.getElementById("modal-est-titulo").innerHTML=`🏬 Estabelecimento: <span style="color:#fff">${e.nome}</span>`,document.getElementById("modal-est-subtitulo").textContent=`${e.qtd} compra(s) somando o valor total de ${l(e.valorTotal)}`;const o=document.getElementById("modal-est-body");o.innerHTML=`
    <div style="margin-bottom:1rem; background:rgba(251,113,133,0.08); border:1px dashed rgba(251,113,133,0.3); border-radius:8px; padding:.75rem 1rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:.5rem">
      <div>
        <span style="font-size:.82rem; color:var(--text-muted)">Total de Lançamentos:</span>
        <strong style="color:#fff; margin-left:.3rem; font-size:.95rem">${e.qtd} compras</strong>
      </div>
      <div>
        <span style="font-size:.82rem; color:var(--text-muted)">Soma Total Gasta:</span>
        <strong style="color:#fb7185; margin-left:.3rem; font-size:1.1rem">${l(e.valorTotal)}</strong>
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
              <td class="num" style="color:#fb7185; font-weight:700">${l(n.valor)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `,a.style.display="flex"};window.fecharModalEstabelecimento=function(){const t=document.getElementById("modal-detalhes-estabelecimento");t&&(t.style.display="none")};function ue(){const t=P.reduce((o,n)=>o+(n.valorTotal!==void 0?n.valorTotal:n.valor||0),0);document.getElementById("badge-total-cartoes").textContent=`${l(t)} total`;const e=document.getElementById("lista-faturas-registradas");if(!P.length){e.innerHTML='<div class="empty-state">Nenhuma fatura cadastrada ainda.</div>';return}const a=qt(P,"geral");e.innerHTML=a+P.map(o=>{var m;const n=o.valorTotal!==void 0?o.valorTotal:o.valor||0,s=o.cartao||"Cartão",r=s.toLowerCase().includes("nubank"),c=r?"purple":"red",d=r?"🟣":"🔴",i=o.dataVencimento?it(o.dataVencimento).split(",")[0]:"—",u=o.mesAno||"—";return`
      <div class="purchase-card" style="margin-bottom:1rem">
        <div class="purchase-header" onclick="toggleDetail('fat-${o.id}')">
          <div class="purchase-info">
            <h3><span class="badge ${c}">${d} ${s}</span> — Vencimento: ${i}</h3>
            <p>📅 Mês Referência: <strong>${u}</strong> &nbsp;•&nbsp; 🛒 ${o.qtdItens||((m=o.itens)==null?void 0:m.length)||1} itens contemplados</p>
          </div>
          <div class="purchase-values">
            <div class="pv-total" style="color:#fb7185">${l(n)}</div>
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
                  🏬 <strong>${n.nome}</strong>: <span class="badge rose" style="font-size:.7rem">${n.qtd}x compras</span> <strong style="color:#fb7185; margin-left:.25rem">${l(n.valorTotal)}</strong>
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
          <td class="num" style="color:#fb7185"><strong>${l(n.valor)}</strong></td>
          <td><button class="btn-danger" style="padding:.2rem .5rem; font-size:.78rem;" onclick="removerItemFaturaCadastrada('${t.id}', ${s})">🗑️ Excluir</button></td>
        </tr>`).join("")}</tbody>
      </table></div>
    `}return`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Descrição</th><th class="num">Valor</th><th>Ação</th></tr></thead>
    <tbody><tr>
      <td>${t.descricao||"Fatura do Cartão"}</td>
      <td class="num" style="color:#fb7185"><strong>${l(t.valor||t.valorTotal)}</strong></td>
      <td><button class="btn-danger" style="padding:.2rem .5rem; font-size:.78rem;" onclick="excluirFaturaDocumento('${t.id}')">🗑️ Excluir</button></td>
    </tr></tbody>
  </table></div>`}window.removerItemFaturaCadastrada=async function(t,e){const a=P.find(s=>s.id===t);if(!a||!a.itens||!confirm("Remover este item da fatura?"))return;const o=[...a.itens];o.splice(e,1);const n=o.reduce((s,r)=>s+(r.valor||0),0);o.length===0?(await W(z(C,et,t)),b("🗑️ Fatura excluída pois todos os itens foram removidos.")):(await st(z(C,et,t),{...a,itens:o,valorTotal:n,qtdItens:o.length}),b("🗑️ Item removido da fatura."))};window.excluirFaturaDocumento=async function(t){confirm("Excluir esta fatura e todos os seus lançamentos?")&&(await W(z(C,et,t)),b("🗑️ Fatura removida com sucesso."))};let A=null;function pe(){const t=document.getElementById("inp-boleto-vencimento");if(t&&!t.value){const e=new Date,a=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0");t.value=`${a}-${o}-10`,atualizarMesRefBoleto()}}setTimeout(pe,300);window.atualizarMesRefBoleto=function(){const t=document.getElementById("inp-boleto-vencimento"),e=document.getElementById("lbl-boleto-mes-ref");if(!(!t||!e))if(t.value){const[a,o]=t.value.split("-"),s=new Date(parseInt(a),parseInt(o)-1,1).toLocaleString("pt-BR",{month:"long"});e.textContent=`Boleto ${s.charAt(0).toUpperCase()+s.slice(1)}/${a}`}else e.textContent="Mês do Boleto"};window.handleFileBoletoSelect=async function(t){const e=t.target.files[0];if(!e)return;const a=document.getElementById("txt-file-boleto");a&&(a.textContent=`📄 Arquivo: ${e.name}`),b(`⏳ Lendo arquivo do boleto (${e.name})...`);let o="";if(e.type==="application/pdf"||e.name.endsWith(".pdf"))o=await Dt(e);else try{o=await e.text()}catch{o=""}o?(document.getElementById("inp-boleto-txt").value=o,await kt(o,e.name)):b("❌ Não foi possível ler o texto do arquivo do boleto.")};window.importarBoletoManualOuArquivo=async function(){const t=document.getElementById("inp-boleto-txt").value.trim();if(!t){b("⚠️ Selecione o arquivo do boleto (.pdf, .txt) ou cole o texto do boleto.");return}await kt(t,"Boleto")};async function kt(t,e){const a=ve(t);a.vencimento&&(document.getElementById("inp-boleto-vencimento").value=a.vencimento,atualizarMesRefBoleto());const o=document.getElementById("inp-boleto-vencimento").value||new Date().toISOString().slice(0,10),n=o.slice(0,7),s=a.beneficiario||e.replace(/\.[^/.]+$/,"")||"Boleto / Conta",r=a.itens.reduce((d,i)=>d+i.valor,0),c=a.valorTotal||r||0;document.getElementById("inp-revisao-boleto-desc").value=s,document.getElementById("inp-revisao-boleto-val").value=c?c.toFixed(2):"",A={descricao:s,dataVencimento:o,mesAno:n,valorTotal:c,qtdItens:a.itens.length,itens:a.itens},Pt(),b("✅ Boleto identificado! Confira a descrição, valor e itens antes de salvar.")}window.atualizarValorTotalRevisaoBoleto=function(){if(!A)return;const t=parseFloat(document.getElementById("inp-revisao-boleto-val").value)||0;A.valorTotal=t,document.getElementById("badge-total-preview-boleto").textContent=l(t)};function Pt(){if(!A)return;const{valorTotal:t,itens:e}=A;document.getElementById("badge-total-preview-boleto").textContent=l(t);const a=document.getElementById("lista-preview-boleto-itens");!e||!e.length?a.innerHTML='<div class="empty-state">Nenhum encargo/item individual extraído. O valor total acima será considerado.</div>':a.innerHTML=e.map((n,s)=>`
      <div style="display:flex; justify-content:space-between; align-items:center; padding:.4rem 0; border-bottom:1px dashed var(--border-color); font-size:.82rem;">
        <span><strong>${n.dataBoleto||"—"}</strong> — ${n.descricao}</span>
        <div style="display:flex; align-items:center; gap:.75rem;">
          <span style="color:#c084fc; font-weight:700;">${l(n.valor)}</span>
          <button type="button" class="btn-danger" style="padding:.15rem .45rem; font-size:.75rem;" onclick="removerItemRevisaoBoleto(${s})">🗑️</button>
        </div>
      </div>
    `).join("");const o=document.getElementById("box-revisao-boleto");o.style.display="block",o.scrollIntoView({behavior:"smooth"})}window.removerItemRevisaoBoleto=function(t){if(!A||!A.itens)return;A.itens.splice(t,1);const e=A.itens.reduce((a,o)=>a+o.valor,0);e>0&&(A.valorTotal=e,document.getElementById("inp-revisao-boleto-val").value=e.toFixed(2)),A.qtdItens=A.itens.length,Pt(),b("🗑️ Item removido da revisão do boleto.")};window.confirmarEGravarBoletoDocumento=async function(){if(!A)return;const t=document.getElementById("inp-revisao-boleto-desc").value.trim(),e=parseFloat(document.getElementById("inp-revisao-boleto-val").value)||0,a=document.getElementById("inp-boleto-vencimento").value||new Date().toISOString().slice(0,10);if(!e){b("⚠️ Digite ou confirme o valor total do boleto.");return}A.descricao=t||"Boleto / Conta",A.valorTotal=e,A.dataVencimento=a,A.mesAno=a.slice(0,7);try{await ct(Q(C,at),{...A,createdAt:gt()}),document.getElementById("box-revisao-boleto").style.display="none",document.getElementById("inp-boleto-txt").value="";const o=document.getElementById("txt-file-boleto");o&&(o.textContent="Clique para Selecionar o Arquivo do Boleto");const n=l(A.valorTotal);A=null,b(`🎉 Boleto de ${n} salvo com sucesso!`)}catch(o){alert("Erro ao salvar boleto: "+o.message)}};function ve(t){if(!t)return{beneficiario:"",valorTotal:0,vencimento:null,itens:[]};let e="",a=0,o=null;const n=[],s=t.match(/Vencimento\s*[:\s]*(\d{2}[\/\.-]\d{2}[\/\.-]\d{4})/i)||t.match(/Vencimento\s*[:\s]*(\d{2})\s+([A-Za-z]{3})\s+(\d{4})/i)||t.match(/Data\s*de\s*Vencimento\s*[:\s]*(\d{2}[\/\.-]\d{2}[\/\.-]\d{4})/i);if(s){if(s[2]&&s[3]){const i=s[1],u=s[2].toUpperCase();o=`${s[3]}-${{JAN:"01",FEB:"02",MAR:"03",ABR:"04",APR:"04",MAI:"05",MAY:"05",JUN:"06",JUL:"07",AGO:"08",AUG:"08",SET:"09",SEP:"09",OUT:"10",OCT:"10",NOV:"11",DEZ:"12",DEC:"12"}[u]||"07"}-${i.padStart(2,"0")}`}else if(s[1]){const[i,u,m]=s[1].split(/[\/\.-]/);o=`${m}-${u.padStart(2,"0")}-${i.padStart(2,"0")}`}}const r=t.match(/Benefici[áa]rio\s*[:\s]*([^\n\r]+)/i)||t.match(/Nome\s*do\s*Cedente\s*[:\s]*([^\n\r]+)/i)||t.match(/Raz[ãa]o\s*Social\s*[:\s]*([^\n\r]+)/i);r&&(e=r[1].trim().replace(/\s{2,}/g," "));const c=t.match(/Valor\s*do\s*Documento\s*[:\s]*R?\$\s*([\d\.]+,\d{2})/i)||t.match(/\(=\)\s*Valor\s*Cobrado\s*[:\s]*R?\$\s*([\d\.]+,\d{2})/i)||t.match(/Valor\s*Cobrado\s*[:\s]*R?\$\s*([\d\.]+,\d{2})/i)||t.match(/Valor\s*R?\$\s*([\d\.]+,\d{2})/i);return c&&(a=T(c[1])),t.split(`
`).forEach(i=>{const u=i.trim();if(!u||/vencimento|beneficiário|cedente|nosso\s*número|agência|código|autenticação|instruções/i.test(u))return;const m=u.match(/(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\b[A-Za-z]{3}\b)?\s*(.+?)\s+R?\$\s*([\d\.]+,\d{2})$/i);if(m){const h=m[1]||"Boleto",y=m[2].trim(),v=T(m[3]);y&&v>0&&y.length>2&&!/valor|total|documento|cobrado/i.test(y)&&n.push({dataBoleto:h,descricao:y,valor:v})}}),{beneficiario:e,valorTotal:a,vencimento:o,itens:n}}function ge(){const t=V.reduce((a,o)=>a+(o.valorTotal!==void 0?o.valorTotal:o.valor||0),0);document.getElementById("badge-total-boletos").textContent=`${l(t)} total`;const e=document.getElementById("lista-boletos-registrados");if(!V.length){e.innerHTML='<div class="empty-state">Nenhum boleto cadastrado ainda.</div>';return}e.innerHTML=V.map(a=>{var c;const o=a.valorTotal!==void 0?a.valorTotal:a.valor||0,n=a.dataVencimento?it(a.dataVencimento).split(",")[0]:"—",s=a.mesAno||"—",r=a.descricao||"Boleto / Conta";return`
      <div class="purchase-card">
        <div class="purchase-header" onclick="toggleDetail('bol-${a.id}')">
          <div class="purchase-info">
            <h3><span class="badge purple">📄 ${r}</span> — Vencimento: ${n}</h3>
            <p>📅 Mês Referência: <strong>${s}</strong> &nbsp;•&nbsp; 🛒 ${a.qtdItens||((c=a.itens)==null?void 0:c.length)||1} itens / encargos</p>
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
          ${zt(a)}
        </div>
      </div>
    `}).join("")}function zt(t){return t.itens&&t.itens.length>0?`<div class="table-responsive"><table class="custom-table">
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
  </table></div>`}window.removerItemBoletoCadastrado=async function(t,e){const a=V.find(s=>s.id===t);if(!a||!a.itens||!confirm("Remover este item do boleto?"))return;const o=[...a.itens];o.splice(e,1);const n=o.reduce((s,r)=>s+(r.valor||0),0);o.length===0?(await W(z(C,at,t)),b("🗑️ Boleto excluído pois todos os itens foram removidos.")):(await st(z(C,at,t),{...a,itens:o,valorTotal:n,qtdItens:o.length}),b("🗑️ Item removido do boleto."))};window.excluirBoletoDocumento=async function(t){confirm("Excluir este boleto e todos os seus itens?")&&(await W(z(C,at,t)),b("🗑️ Boleto removido com sucesso."))};document.getElementById("form-config-reservas").addEventListener("submit",async t=>{t.preventDefault();const e=parseFloat(document.getElementById("inp-meta-anual").value)||0,a=parseFloat(document.getElementById("inp-saldo-guardado").value)||0;await st(z(C,Bt,"config"),{metaAnual:e,valorAtualGuardado:a,dataAtualizacao:new Date().toISOString()}),b("✅ Reservas e configurações de economias salvas!")});function fe(){const t=vt.metaAnual||15e3,e=vt.valorAtualGuardado||3e3,a=document.getElementById("inp-meta-anual");a&&!a.value&&t&&(a.value=t);const o=document.getElementById("inp-saldo-guardado");o&&!o.value&&e&&(o.value=e);const s=new Date().getMonth()+1,r=Math.max(1,12-s+1),c=Math.max(0,t-e),d=c>0?c/r:0;document.getElementById("val-meta-reserva").textContent=l(d);const i=document.getElementById("subtext-meta-reserva");i&&(i.textContent=`Faltam ${l(c)} p/ Meta Anual de ${l(t)} (${r} mês(es) até o fim do ano)`),document.getElementById("val-real-guardado").textContent=l(e);const u=N.reduce((f,I)=>f+(I.valor||0),0),m=P.reduce((f,I)=>f+(I.valorTotal!==void 0?I.valorTotal:I.valor||0),0),h=V.reduce((f,I)=>f+(I.valorTotal!==void 0?I.valorTotal:I.valor||0),0);let y=0;R.forEach(f=>{f.formasPagamento?y+=(f.formasPagamento.cartaoDebito||0)+(f.formasPagamento.dinheiro||0)+(f.formasPagamento.pix||0):y+=f.valorAPagar||0});const v=m+h+y,E=u-v,S=Math.max(1,mt().length),D=E/S,L=D>0?D*.5:0,q=L*12;document.getElementById("val-recomendacao-reserva").textContent=l(q);const M=document.getElementById("subtext-recomendacao");M&&(M.textContent=`Sugerido poupar ${l(L)}/mês (${l(q)} no ano)`);const g=document.getElementById("box-analise-reserva-detalhes");if(g)if(u===0)g.innerHTML='<p class="empty-state">Cadastre seus salários e entradas na aba "Salários & Entradas" para gerar o diagnóstico inteligente de economias.</p>';else{const f=t>0?Math.min(100,e/t*100).toFixed(1):0;g.innerHTML=`
        <p>Com base na soma acumulada de todos os meses (<strong>${l(u)}</strong> Entradas vs <strong>${l(v)}</strong> Saídas Totais):</p>
        <div style="background:rgba(15,23,42,0.6);padding:1rem;border-radius:10px;margin:.75rem 0;border:1px solid var(--border-color)">
          <div style="display:flex;justify-content:space-between;margin-bottom:.4rem;flex-wrap:wrap;gap:.5rem">
            <span>💰 Saldo Livre Acumulado no Sistema: <strong>${l(E)}</strong></span>
            <span>🎯 Meta Anual Desejada: <strong>${l(t)}</strong></span>
          </div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width:${f}%"></div>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:.78rem;color:var(--text-muted);margin-top:.4rem">
            <span>Guardado: ${l(e)} (${f}%)</span>
            <span>Faltam guardar: ${l(c)} nos próximos ${r} meses</span>
          </div>
        </div>
        <p style="font-size:.84rem;color:var(--text-muted)">
          💡 <strong>Planejamento do Sistema:</strong> Guardando <strong>${l(d)}/mês</strong> durante os próximos <strong>${r} meses</strong>, você atingirá com 100% de precisão sua Meta Anual de <strong>${l(t)}</strong>!
        </p>
      `}be()}function be(){const t=document.getElementById("container-analise-mensal-lista");if(!t)return;const e=mt();if(!e.length){t.innerHTML='<div class="empty-state">Nenhum mês registrado para gerar a análise mensal.</div>';return}const a=e.map(o=>{const s=N.filter(g=>g.mesAno===o).reduce((g,f)=>g+(f.valor||0),0),r=P.filter(g=>g.mesAno===o),c=r.reduce((g,f)=>g+(f.valorTotal!==void 0?f.valorTotal:f.valor||0),0),d=V.filter(g=>g.mesAno===o),i=d.reduce((g,f)=>g+(f.valorTotal!==void 0?f.valorTotal:f.valor||0),0),u=R.filter(g=>g.mesAno===o);let m=0;u.forEach(g=>{g.formasPagamento&&(m+=g.formasPagamento.cartaoDebito||0)});const h=c+i+m,y=s-h,v=y>=0,[E,S]=o.split("-"),L=new Date(parseInt(E),parseInt(S)-1,1).toLocaleString("pt-BR",{month:"long"}),q=L.charAt(0).toUpperCase()+L.slice(1);let M="";if(v){const g=y*.5;M=`
        <div style="background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.25); border-radius:10px; padding:.85rem 1rem; margin-top:1rem">
          <div style="font-weight:700; font-size:.88rem; color:#34d399; margin-bottom:.2rem">
            🎉 Mês Positivo! Capacidade de Poupança Excelente
          </div>
          <p style="font-size:.8rem; color:var(--text-muted); margin:0">
            Neste mês sobraram <strong>${l(y)}</strong> em conta. O sistema sugere destinar pelo menos <strong style="color:#34d399">${l(g)}</strong> para sua reserva!
          </p>
        </div>
      `}else{const g=Math.abs(y);let f="Cartão de Crédito",I=c;i>I&&(f="Boletos & Contas",I=i),m>I&&(f="Mercado no Débito",I=m);const H=h>0?(I/h*100).toFixed(1):0;let k="",F=0;r.forEach(p=>{const $=p.valorTotal!==void 0?p.valorTotal:p.valor||0;$>F&&(F=$,k=`Fatura do ${p.cartao||"Cartão"}`)}),d.forEach(p=>{const $=p.valorTotal!==void 0?p.valorTotal:p.valor||0;$>F&&(F=$,k=`Boleto ${p.descricao||"de Conta"}`)}),M=`
        <div style="background:rgba(244,63,94,0.1); border:1px solid rgba(244,63,94,0.3); border-radius:10px; padding:.85rem 1rem; margin-top:1rem">
          <div style="font-weight:700; font-size:.88rem; color:#fb7185; margin-bottom:.4rem; display:flex; align-items:center; gap:.4rem">
            ⚠️ O que causou o déficit em ${q}/${E}?
          </div>
          <p style="font-size:.82rem; color:var(--text-main); margin-bottom:.5rem; line-height:1.5">
            As saídas (<strong>${l(h)}</strong>) superaram as entradas (<strong>${l(s)}</strong>) em <strong style="color:#fb7185">${l(g)}</strong>.
          </p>
          <div style="font-size:.78rem; color:var(--text-muted); line-height:1.5">
            • <strong>Vilão Principal:</strong> A categoria <strong style="color:#f8fafc">${f}</strong> representou <strong>${H}%</strong> de todas as saídas do mês (${l(I)}).
            ${k?`<br>• <strong>Maior Despesa Registrada:</strong> ${k} no valor de <strong style="color:#fb7185">${l(F)}</strong>.`:""}
          </div>
        </div>
      `}return`
      <div class="card" style="margin-bottom:1.25rem; border-color:${v?"rgba(52,211,153,0.3)":"rgba(251,113,133,0.4)"}">
        <div class="card-header" style="flex-wrap:wrap; gap:.5rem">
          <div style="display:flex; align-items:center; gap:.5rem">
            <span class="card-title" style="font-size:1rem; color:#f8fafc">📅 ${q} de ${E}</span>
            <span class="badge ${v?"green":"red"}">${v?"🟢 Superávit":"🔴 Déficit"}</span>
          </div>
          <button type="button" class="btn-secondary" style="padding:.25rem .6rem; font-size:.78rem" onclick="verMesEIrParaControle('${o}')">
            🔍 Detalhar Mês
          </button>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:.75rem; margin-top:.5rem">
          <div style="background:rgba(15,23,42,0.6); padding:.6rem .8rem; border-radius:8px; border:1px solid var(--border-color)">
            <div style="font-size:.75rem; color:var(--text-muted)">Entradas do Mês</div>
            <div style="font-weight:700; font-size:1rem; color:#34d399">${l(s)}</div>
          </div>

          <div style="background:rgba(15,23,42,0.6); padding:.6rem .8rem; border-radius:8px; border:1px solid var(--border-color)">
            <div style="font-size:.75rem; color:var(--text-muted)">Cartão de Crédito</div>
            <div style="font-weight:700; font-size:1rem; color:#fb7185">${l(c)}</div>
          </div>

          <div style="background:rgba(15,23,42,0.6); padding:.6rem .8rem; border-radius:8px; border:1px solid var(--border-color)">
            <div style="font-size:.75rem; color:var(--text-muted)">Boletos & Contas</div>
            <div style="font-weight:700; font-size:1rem; color:#c084fc">${l(i)}</div>
          </div>

          <div style="background:rgba(15,23,42,0.6); padding:.6rem .8rem; border-radius:8px; border:1px solid var(--border-color)">
            <div style="font-size:.75rem; color:var(--text-muted)">Mercado (Débito)</div>
            <div style="font-weight:700; font-size:1rem; color:#fbbf24">${l(m)}</div>
          </div>

          <div style="background:rgba(15,23,42,0.8); padding:.6rem .8rem; border-radius:8px; border:1px solid ${v?"#34d399":"#fb7185"}">
            <div style="font-size:.75rem; color:var(--text-muted)">Saldo Líquido no Mês</div>
            <div style="font-weight:800; font-size:1.05rem; color:${v?"#60a5fa":"#fb7185"}">${l(y)}</div>
          </div>
        </div>

        ${M}
      </div>
    `}).join("");t.innerHTML=`
    <div class="card" style="margin-top:1.5rem; background:linear-gradient(135deg,rgba(30,41,59,.9),rgba(15,23,42,.95)); border-color:var(--secondary)">
      <div class="card-header">
        <span class="card-title" style="color:#a5b4fc; font-size:1.05rem">📊 Análise Geral Mês a Mês (Capacidade de Economia & Diagnóstico)</span>
        <span class="badge purple">${e.length} meses analisados</span>
      </div>
      <p style="font-size:.78rem; color:var(--text-muted); margin-bottom:1rem">
        Abaixo está o raio-x financeiro de cada mês com o diagnóstico automático do que gerou superávit ou déficit:
      </p>
      ${a}
    </div>
  `}function he(){const t=document.getElementById("lista-mensal-container");if(!t)return;const e=new Date,a=new Date(e.getFullYear(),e.getMonth()+1,1),o=a.toLocaleString("pt-BR",{month:"long"}),n=a.getFullYear(),s=`${o.charAt(0).toUpperCase()+o.slice(1)} de ${n}`,r=te(a.getFullYear(),a.getMonth()),c=31.8,d=20,i=r*c,u=r*d,m={};let h=0;R.forEach(p=>{const $=p.valorAPagar||0;h+=$;const B=p.mesAno||"Outros";m[B]=(m[B]||0)+$});const y=Math.max(1,Object.keys(m).length),v=h/y,E={};R.forEach(p=>{(p.itens||[]).forEach($=>{const B=($.nome||"").toLowerCase().trim();B&&(E[B]||(E[B]={nome:$.nome,marca:$.marca||"Geral",qtdTotal:0,frequenciaNotas:0,valoresUnitarios:[]}),E[B].qtdTotal+=$.quantidade||1,E[B].frequenciaNotas+=1,$.valorUnitario&&E[B].valoresUnitarios.push($.valorUnitario))})});const S=Object.values(E).map(p=>{const $=p.valoresUnitarios.length>0?p.valoresUnitarios.reduce((X,dt)=>X+dt,0)/p.valoresUnitarios.length:0,B=p.qtdTotal/y,Z=y/Math.max(1,p.frequenciaNotas),lt=p.frequenciaNotas/y;let U=0;lt>=.35||B>=.7?U=Math.ceil(B):U=Math.round(B),U<1&&p.frequenciaNotas>=y&&(U=1);const K=U*$;return{nome:p.nome,marca:p.marca,frequenciaNotas:p.frequenciaNotas,intervaloMeses:Z,qtdMensalTaxa:B,totalEstimadoUnidades:U,valorUnitario:$,subtotalCalculado:K}}).filter(p=>p.totalEstimadoUnidades>0);S.sort((p,$)=>$.frequenciaNotas-p.frequenciaNotas);const D=S.reduce((p,$)=>p+$.subtotalCalculado,0),L=v>0?v*1.05:D;let q=1;D>L&&v>0&&(q=L/D);const M=S.map(p=>({...p,subtotalFinal:p.subtotalCalculado*q})),g=v>0?Math.min(D,L):D;let f=g;const I=Math.min(f,i);f-=I;const H=Math.min(f,u);f-=H;const k=f>0?f:0;let F=`
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
          <div class="p-val" style="color:#34d399;">${l(I)} <span style="font-size:0.75rem;font-weight:normal;color:var(--text-muted)">/ ${l(i)}</span></div>
        </div>
        <div class="payment-item" style="border-color: rgba(99,102,241,0.4);">
          <div class="p-label">💳 Cartão Crédito (${r}d × R$ 20,00)</div>
          <div class="p-val" style="color:#818cf8;">${l(H)} <span style="font-size:0.75rem;font-weight:normal;color:var(--text-muted)">/ ${l(u)}</span></div>
        </div>
        <div class="payment-item" style="border-color: ${k>0?"rgba(244,63,94,0.5)":"var(--border-color)"};">
          <div class="p-label">💳 Débito Necessário (Excedente)</div>
          <div class="p-val" style="color: ${k>0?"#fb7185":"var(--text-muted)"};">${l(k)}</div>
        </div>
      </div>

      <div style="margin-top:1.25rem; padding-top:1rem; border-top:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
        <div>
          <span style="font-size:0.85rem; color:var(--text-muted);">Total Estimado da Lista de Compras:</span>
          <p style="font-size:0.75rem; color:#60a5fa;">Média Histórica de Gastos: ${l(v)}</p>
        </div>
        <span style="font-size:1.6rem; font-weight:800; color:var(--primary);">${l(g)}</span>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-title">Lista de Itens com Frequência e Total Estimado</span>
        <span class="badge amber">${M.length} itens cadastrados</span>
      </div>
      <p class="card-subtext" style="margin-bottom:1rem;">
        O <strong>Total Estimado</strong> arredonda o consumo médio para cima (unidades inteiras exatas), pois os produtos são comprados por unidade no mercado.
      </p>
  `;window.dadosListaMensalCache={mesAnoStr:s,diasUteis:r,totalGeralEstimado:g,cobertoAlim:I,cobertoCred:H,cobertoDeb:k,alimDisponivel:i,credDisponivel:u,lista:M},M.length===0?F+='<div class="empty-state">Adicione notas fiscais para que o sistema gere automaticamente sua lista mensal de compras.</div></div>':F+=`
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
            ${M.map(p=>{const $=p.intervaloMeses>1.2?`A cada ${p.intervaloMeses.toFixed(1)} meses`:`Todo mês (${p.frequenciaNotas}x)`,B=p.qtdMensalTaxa<1?p.qtdMensalTaxa.toFixed(2):p.qtdMensalTaxa.toFixed(1),Z=p.totalEstimadoUnidades.toFixed(1);return`
                <tr>
                  <td><strong>${p.nome}</strong></td>
                  <td><span class="badge amber">${p.marca}</span></td>
                  <td><span class="badge cyan">${$}</span></td>
                  <td class="num">${B} un/mês</td>
                  <td class="num"><span class="badge green" style="font-size:0.82rem;">${Z}</span></td>
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
    </div>`,t.innerHTML=F}window.exportarPDFListaMensal=function(){if(!window.dadosListaMensalCache||!window.dadosListaMensalCache.lista.length){b("⚠️ Nenhuma lista mensal disponível para exportar.");return}const{mesAnoStr:t,diasUteis:e,totalGeralEstimado:a,cobertoAlim:o,cobertoCred:n,cobertoDeb:s,lista:r}=window.dadosListaMensalCache,c=window.open("","_blank","width=900,height=750");if(!c){alert("Permita pop-ups no navegador para gerar o PDF da lista.");return}const d=`
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
          <div class="val">${l(s)}</div>
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
  `;c.document.open(),c.document.write(d),c.document.close()};document.getElementById("btn-start-cam").addEventListener("click",Nt);document.getElementById("btn-switch-cam").addEventListener("click",ye);document.getElementById("btn-stop-cam").addEventListener("click",ht);async function Nt(){if(typeof Html5Qrcode>"u")return O("Carregando biblioteca de câmera, aguarde..."),setTimeout(Nt,600);try{G||(G=new Html5Qrcode("qr-reader")),j=await Html5Qrcode.getCameras();let t;if(j&&j.length>0){const e=j.findIndex(a=>/back|traseira|rear|environment/i.test(a.label));tt=e>=0?e:0,t=j[tt].id}else t={facingMode:"environment"};await G.start(t,{fps:10,qrbox:{width:240,height:240}},Vt,()=>{}),ot=!0,document.getElementById("btn-start-cam").style.display="none",document.getElementById("btn-switch-cam").style.display=j.length>1?"inline-flex":"none",document.getElementById("btn-stop-cam").style.display="inline-flex"}catch(t){O("❌ Não foi possível acessar a câmera. Verifique as permissões do navegador."),console.error(t)}}async function ye(){if(!(!G||!ot))try{await G.stop(),j.length>1&&(tt=(tt+1)%j.length,await G.start(j[tt].id,{fps:10,qrbox:{width:240,height:240}},Vt,()=>{}))}catch(t){console.error("switchCam:",t)}}async function ht(){if(G&&ot)try{await G.stop()}catch{}ot=!1,document.getElementById("btn-start-cam").style.display="inline-flex",document.getElementById("btn-switch-cam").style.display="none",document.getElementById("btn-stop-cam").style.display="none"}async function Vt(t){ht(),document.getElementById("inp-url").value=t,O("✅ QR Code lido! Processando..."),await jt(t)}document.getElementById("btn-carregar-dados").addEventListener("click",async()=>{const t=document.getElementById("inp-url").value.trim(),e=document.getElementById("inp-html").value.trim();if(!t&&!e){O("⚠️ Cole a URL do QR Code ou o conteúdo da página para ler a nota fiscal.");return}if(t&&!e){O("⏳ Consultando nota fiscal..."),await jt(t);return}if(e){O("⏳ Processando conteúdo..."),await Ht(e);return}});document.getElementById("btn-preencher-manual").addEventListener("click",()=>{Ut({nomeMercado:"",dataEmissao:new Date().toISOString(),valorTotal:0,descontoTotal:0,valorAPagar:0,qtdTotalItens:0,formasPagamento:{valeAlimentacao:0,cartaoCredito:0,cartaoDebito:0},itens:[]}),O("✍️ Preencha os dados da compra abaixo e clique em Salvar Nota Fiscal.","var(--accent-cyan)")});function Ut(t){var s,r,c;document.getElementById("inp-mercado").value=t.nomeMercado||"",document.getElementById("inp-data").value=Xt(t.dataEmissao),document.getElementById("inp-vtotal").value=t.valorTotal!==void 0?t.valorTotal:0,document.getElementById("inp-desconto").value=t.descontoTotal!==void 0?t.descontoTotal:0,document.getElementById("inp-pagar").value=t.valorAPagar!==void 0?t.valorAPagar:0,document.getElementById("inp-qtd").value=t.qtdTotalItens!==void 0?t.qtdTotalItens:0,document.getElementById("inp-alim").value=((s=t.formasPagamento)==null?void 0:s.valeAlimentacao)||0,document.getElementById("inp-cred").value=((r=t.formasPagamento)==null?void 0:r.cartaoCredito)||0,document.getElementById("inp-deb").value=((c=t.formasPagamento)==null?void 0:c.cartaoDebito)||0,_=t.itens||[];const e=document.getElementById("form-nfce");e.style.display="block";const a=document.getElementById("preview-itens-box"),o=document.getElementById("count-preview-itens"),n=document.getElementById("lista-preview-itens");_.length>0?(a.style.display="block",o.textContent=_.length,n.innerHTML=_.map(d=>`
      <div style="display:flex; justify-content:space-between; padding: 0.35rem 0; border-bottom: 1px dashed var(--border-color);">
        <span><strong>${d.nome}</strong> (${d.quantidade} ${d.unidade||"Un"})</span>
        <span>${l(d.valorUnitario)}/un = <strong>${l(d.valorTotal)}</strong></span>
      </div>
    `).join("")):a.style.display="none",e.scrollIntoView({behavior:"smooth"})}document.getElementById("form-nfce").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-mercado").value.trim()||"Mercado",a=document.getElementById("inp-data").value||new Date().toISOString(),o=parseFloat(document.getElementById("inp-vtotal").value)||0,n=parseFloat(document.getElementById("inp-desconto").value)||0,s=parseFloat(document.getElementById("inp-pagar").value)||0,r=parseInt(document.getElementById("inp-qtd").value)||0,c=parseFloat(document.getElementById("inp-alim").value)||0,d=parseFloat(document.getElementById("inp-cred").value)||0,i=parseFloat(document.getElementById("inp-deb").value)||0,u=new Date(a).toISOString().slice(0,16),m=R.find(v=>{const E=new Date(v.dataEmissao).toISOString().slice(0,16),S=Math.abs((v.valorAPagar||0)-s)<.05,D=(v.nomeMercado||"").toLowerCase().trim()===e.toLowerCase().trim();return E===u&&S&&D});if(m){O(`⚠️ Esta nota fiscal já existe no sistema (Cadastrada em ${it(m.dataEmissao)} no valor de ${l(m.valorAPagar)}). Nota não adicionada!`,"#fb7185"),b("⚠️ Nota fiscal já cadastrada! Operação cancelada.");return}const h=new Date(a),y=`${h.getFullYear()}-${String(h.getMonth()+1).padStart(2,"0")}`;O("⏳ Salvando nota fiscal no banco...");try{await ct(Q(C,ft),{nomeMercado:e,dataEmissao:a,mesAno:y,qtdTotalItens:r||_.length,valorTotal:o,descontoTotal:n,valorAPagar:s,formasPagamento:{valeAlimentacao:c,cartaoCredito:d,cartaoDebito:i},itens:_,createdAt:gt()}),O("✅ Nota salva com sucesso!","#34d399"),document.getElementById("form-nfce").style.display="none",document.getElementById("form-nfce").reset(),document.getElementById("inp-url").value="",document.getElementById("inp-html").value="",_=[],Ct(),goTab("dashboard"),b("🎉 Nota fiscal registrada no Firebase!")}catch(v){O("❌ Erro ao salvar: "+v.message,"#fb7185")}});async function jt(t){const e=[a=>`https://api.allorigins.win/raw?url=${encodeURIComponent(a)}`,a=>`https://corsproxy.io/?${encodeURIComponent(a)}`];for(const a of e)try{const o=await fetch(a(t),{signal:AbortSignal.timeout(8e3)});if(o.ok){const n=await o.text();if(n&&n.length>200){await Ht(n);return}}}catch{}Ee(t)}function Ee(t){document.getElementById("modal-link").href=t,document.getElementById("modal-cors").classList.add("active"),O("⚠️ Abra o link, copie o conteúdo da página e cole no campo de texto abaixo.")}async function Ht(t){const e=$e(t);Ut(e),O("✅ Nota lida com sucesso! Confira os valores abaixo e altere se necessário antes de Salvar.","#34d399")}function $e(t){var I,H,k;const a=new DOMParser().parseFromString(t,"text/html"),o=((I=a.body)==null?void 0:I.textContent)||t;let n=((k=(H=a.querySelector(".txtTopo, .nomeEmit, h1"))==null?void 0:H.textContent)==null?void 0:k.trim())||"Mercado",s=new Date().toISOString();const r=o.match(/Emiss[ãa]o\s*[:\-]?\s*(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})?/i)||o.match(/(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})/);if(r){const[F,p,$]=r[1].split("/");s=`${$}-${p}-${F}T${r[2]||"12:00:00"}`}const c=o.match(/Qtd\.?\s*total\s*de\s*itens\s*[:\s]*([\d,\.]+)/i),d=o.match(/Valor\s*total\s*R\$\s*[:\s]*([\d\.,]+)/i),i=o.match(/Descontos?\s*R\$\s*[:\s]*([\d\.,]+)/i),u=o.match(/Valor\s*a\s*pagar\s*R\$\s*[:\s]*([\d\.,]+)/i)||o.match(/VALOR\s*PAGO\s*R\$\s*[:\s]*([\d\.,]+)/i),m=o.match(/(?:Vale\s*)?Alimenta[çc][ãa]o\s*[:\s]*([\d\.,]+)/i),h=o.match(/(?:Cart[ãa]o\s*de\s*)?Cr[eé]dito\s*[:\s]*([\d\.,]+)/i),y=o.match(/(?:Cart[ãa]o\s*de\s*)?D[eé]bito\s*[:\s]*([\d\.,]+)/i),v=c?T(c[1]):0,E=d?T(d[1]):0,S=i?T(i[1]):0;let D=u?T(u[1]):E-S;const L={valeAlimentacao:m?T(m[1]):0,cartaoCredito:h?T(h[1]):0,cartaoDebito:y?T(y[1]):0},q=[];a.querySelectorAll("tr, .item, .itemNota").forEach(F=>{var yt;const p=F.textContent;if(!/Vl\.\s*Unit|valorUnitario|Qtde?\./i.test(p))return;const $=F.querySelector(".txtTit, .txtTit2, .nomeProd"),B=((yt=$==null?void 0:$.textContent)==null?void 0:yt.trim())||"",Z=p.match(/Qtde?\.\s*[:\s]*([\d,\.]+)/i),lt=p.match(/Vl\.\s*Unit\.\s*[:\s]*([\d,\.]+)/i),U=p.match(/Vl\.\s*Total\s*([\d,\.]+)/i),K=p.match(/C[oó]digo\s*[:\s]*(\d+)/i),X=p.match(/UN\s*[:\s]*([A-Za-z]+)/i),dt=Z?T(Z[1]):1,ut=lt?T(lt[1]):0,Qt=U?T(U[1]):ut*dt;B&&ut>0&&q.push({codigo:(K==null?void 0:K[1])||"",nome:B,marca:xe(B),quantidade:dt,unidade:(X==null?void 0:X[1])||"Un",valorUnitario:ut,valorTotal:Qt})});const g=new Date(s),f=`${g.getFullYear()}-${String(g.getMonth()+1).padStart(2,"0")}`;return{nomeMercado:n,dataEmissao:s,mesAno:f,qtdTotalItens:v,valorTotal:E,descontoTotal:S,valorAPagar:D,formasPagamento:L,itens:q}}function xe(t){const e=["BAUDUCCO","BAUD","PANCO","DANONE","NESTLE","QUALITA","SADIA","PERDIGAO","SEARA","CAMIL","TIO JOAO","URBANO","LIZA","SOYA","YPE","PILAO","MELITTA","3 CORACOES","VIGOR","PARMALAT","ITALAC","HEINZ","KRAFT"],a=t.toUpperCase();for(const o of e)if(a.includes(o))return o;return a.split(" ")[0]||"Genérica"}function Ie(){const t=document.getElementById("lista-historico");if(!R.length){t.innerHTML='<div class="empty-state">📭 Nenhuma compra cadastrada ainda.</div>';return}t.innerHTML=R.map(e=>{var a,o,n;return`
    <div class="purchase-card">
      <div class="purchase-header" onclick="toggleDetail('${e.id}')">
        <div class="purchase-info">
          <h3>${e.nomeMercado||"Mercado"}</h3>
          <p>📅 ${it(e.dataEmissao)} &nbsp;•&nbsp; 🛒 ${e.qtdTotalItens||0} itens</p>
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
        ${Gt(e)}
      </div>
    </div>`}).join("")}function Gt(t){return!t.itens||!t.itens.length?'<p class="card-subtext">Nenhum item detalhado registrado.</p>':`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Item</th><th>Marca</th><th class="num">Qtd</th><th class="num">Vl. Unit.</th><th class="num">Vl. Total</th></tr></thead>
    <tbody>${t.itens.map(e=>`<tr>
      <td>${e.nome}</td>
      <td><span class="badge amber">${e.marca||"—"}</span></td>
      <td class="num">${e.quantidade} ${e.unidade||"Un"}</td>
      <td class="num">${l(e.valorUnitario)}</td>
      <td class="num"><strong>${l(e.valorTotal)}</strong></td>
    </tr>`).join("")}</tbody>
  </table></div>`}window.toggleDetail=function(t){const e=document.getElementById("detail-"+t),a=document.getElementById("chev-"+t);e&&e.classList.toggle("open"),a&&a.classList.toggle("open")};window.confirmarExcluirMercado=async function(t){if(confirm("Excluir esta compra de mercado?"))try{await W(z(C,ft,t)),b("🗑️ Compra excluída.")}catch(e){alert("Erro: "+e.message)}};function we(){const t=document.getElementById("lista-comparacao"),e={};R.forEach(o=>{(o.itens||[]).forEach(n=>{var r;const s=((r=n.nome)==null?void 0:r.toLowerCase().trim())||"produto";e[s]||(e[s]={nome:n.nome,marca:n.marca,hist:{}}),e[s].hist[o.mesAno]=n.valorUnitario})});const a=Object.values(e);if(!a.length){t.innerHTML='<div class="empty-state">Adicione notas para ver a comparação de preços unitários.</div>';return}t.innerHTML=`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Produto</th><th>Marca</th><th>Histórico (Unitário)</th><th>Variação</th></tr></thead>
    <tbody>${a.map(o=>{const n=Object.keys(o.hist).sort();let s=n.map(c=>`${c}: <strong>${l(o.hist[c])}</strong>`).join(" → "),r='<span class="badge cyan">Estável</span>';if(n.length>=2){const c=o.hist[n[n.length-2]],i=o.hist[n[n.length-1]]-c,u=(i/c*100).toFixed(1);i>.01?r=`<span class="badge red">+${u}% ↑</span>`:i<-.01&&(r=`<span class="badge green">${u}% ↓</span>`)}return`<tr><td><strong>${o.nome}</strong></td><td><span class="badge amber">${o.marca||"—"}</span></td><td>${s}</td><td>${r}</td></tr>`}).join("")}</tbody>
  </table></div>`}function Be(){const t=document.getElementById("lista-recorrencia"),e=document.getElementById("lista-marcas"),a={},o={};R.forEach(r=>{(r.itens||[]).forEach(c=>{var m;const d=(m=c.nome)==null?void 0:m.toLowerCase().trim();if(!d)return;a[d]||(a[d]={nome:c.nome,marca:c.marca,qtd:0,notas:0,units:[]}),a[d].qtd+=c.quantidade||1,a[d].notas+=1,a[d].units.push(c.valorUnitario||0);const i=(c.nome||"").split(" ")[0].toUpperCase();o[i]||(o[i]={});const u=c.marca||"Genérica";o[i][u]||(o[i][u]=[]),o[i][u].push(c.valorUnitario||0)})});const n=Object.values(a).filter(r=>r.notas>1).sort((r,c)=>c.notas-r.notas);t.innerHTML=n.length?`<div class="table-responsive"><table class="custom-table">
        <thead><tr><th>Item</th><th>Marca</th><th>Compras</th><th class="num">Qtd Total</th><th class="num">Média Unitária</th></tr></thead>
        <tbody>${n.map(r=>{const c=r.units.reduce((d,i)=>d+i,0)/r.units.length;return`<tr>
            <td><strong>${r.nome}</strong></td>
            <td><span class="badge amber">${r.marca||"—"}</span></td>
            <td><span class="badge green">${r.notas}x</span></td>
            <td class="num">${r.qtd}</td>
            <td class="num">${l(c)}</td>
          </tr>`}).join("")}</tbody>
      </table></div>`:'<div class="empty-state">Adicione notas para ver a recorrência de itens.</div>';const s=Object.entries(o).filter(([,r])=>Object.keys(r).length>1).map(([r,c])=>{let d=1/0,i="";const u=Object.entries(c).map(([m,h])=>{const y=h.reduce((v,E)=>v+E,0)/h.length;return y<d&&(d=y,i=m),{marca:m,med:y}});return`<div class="brand-card">
      <div class="brand-card-header">
        <span class="card-title">${r}</span>
        <span class="badge green">🏆 Menor preço: ${i} (${l(d)}/un)</span>
      </div>
      <div class="brands-row">
        ${u.map(m=>`<div class="brand-chip${m.marca===i?" best":""}">
          <div class="bc-name">${m.marca} ${m.marca===i?"✅":""}</div>
          <div class="bc-val">${l(m.med)}<span style="font-size:.7rem;font-weight:400">/un</span></div>
        </div>`).join("")}
      </div>
    </div>`}).join("");e.innerHTML=s||'<div class="empty-state">Ao comprar o mesmo tipo de produto com marcas diferentes, o sistema mostrará qual teve menor preço.</div>'}document.getElementById("btn-modal-close").addEventListener("click",()=>{document.getElementById("modal-cors").classList.remove("active")});
