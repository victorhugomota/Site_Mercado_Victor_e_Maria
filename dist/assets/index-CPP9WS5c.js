import{initializeApp as Jt}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";import{getFirestore as Kt,onSnapshot as tt,query as Xt,collection as G,orderBy as te,doc as T,setDoc as V,addDoc as pt,deleteDoc as et,serverTimestamp as ht}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function a(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(n){if(n.ep)return;n.ep=!0;const s=a(n);fetch(n.href,s)}})();const Ct=document.createElement("script");Ct.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js";document.head.appendChild(Ct);const Tt=document.createElement("script");Tt.src="https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js";document.head.appendChild(Tt);const ee={apiKey:"AIzaSyANpFnEIkyN1XCT6qbtmVR9wx7sQHEsyrE",authDomain:"comprasmercado-23913.firebaseapp.com",projectId:"comprasmercado-23913",storageBucket:"comprasmercado-23913.firebasestorage.app",messagingSenderId:"317518149234",appId:"1:317518149234:web:94f38624d68a2b9a6634eb",measurementId:"G-2XP88EK37S"},ae=Jt(ee),x=Kt(ae),yt="compras",lt="entradas",st="faturas",rt="boletos",Mt="reservas",J="estimativas";let R=[],U=[],z=[],N=[],Y=[],bt={valorAtualGuardado:0},ft=null,Q=null,H=[],nt=0,it=!1,W=[];function l(t){return Number(t||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}function M(t){if(typeof t=="number")return t;if(!t)return 0;const e=parseFloat(String(t).replace(/R\$\s?/gi,"").replace(/\s/g,"").replace(/\./g,"").replace(",","."));return isNaN(e)?0:e}function dt(t){if(!t)return"—";try{return new Date(t).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}catch{return t}}function E(t,e=3500){const a=document.getElementById("toast");a.textContent=t,a.classList.add("show"),setTimeout(()=>a.classList.remove("show"),e)}function P(t,e="var(--accent-amber)"){const a=document.getElementById("status-msg");a&&(a.textContent=t,a.style.color=e)}function oe(t){if(!t)return new Date().toISOString().slice(0,16);try{const e=new Date(t);if(isNaN(e.getTime()))return new Date().toISOString().slice(0,16);const a=o=>String(o).padStart(2,"0");return`${e.getFullYear()}-${a(e.getMonth()+1)}-${a(e.getDate())}T${a(e.getHours())}:${a(e.getMinutes())}`}catch{return new Date().toISOString().slice(0,16)}}function ne(t,e){let a=0;const o=new Date(t,e+1,0).getDate();for(let n=1;n<=o;n++){const s=new Date(t,e,n).getDay();s!==0&&s!==6&&a++}return a}window.goTab=function(t){document.querySelectorAll(".tab-content").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".desktop-nav .nav-item").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".mobile-nav .mob-btn").forEach(a=>a.classList.remove("active"));const e=document.getElementById("tab-"+t);e&&e.classList.add("active"),document.querySelectorAll(`[data-tab="${t}"]`).forEach(a=>a.classList.add("active"))};document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>goTab(t.getAttribute("data-tab")))});document.querySelectorAll(".sub-item").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".sub-item").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".sub-tab-content").forEach(a=>a.style.display="none"),t.classList.add("active");const e=document.getElementById("sub-"+t.getAttribute("data-sub"));e&&(e.style.display="block")})});function St(){document.getElementById("modal-add-nota").classList.add("active")}function Dt(){it&&$t(),document.getElementById("modal-add-nota").classList.remove("active")}var xt;(xt=document.getElementById("btn-open-modal-home"))==null||xt.addEventListener("click",St);var wt;(wt=document.getElementById("btn-mercado-add-nota"))==null||wt.addEventListener("click",St);var At;(At=document.getElementById("btn-close-modal-add"))==null||At.addEventListener("click",Dt);tt(Xt(G(x,yt),te("dataEmissao","desc")),t=>{R=t.docs.map(e=>({id:e.id,...e.data()})),K()},t=>console.error("Firestore Mercado:",t));tt(G(x,lt),t=>{U=t.docs.map(e=>({id:e.id,...e.data()})),K()},t=>console.error("Firestore Entradas:",t));tt(G(x,st),t=>{z=t.docs.map(e=>({id:e.id,...e.data()})),K()},t=>console.error("Firestore Faturas:",t));tt(G(x,rt),t=>{N=t.docs.map(e=>({id:e.id,...e.data()})),K()},t=>console.error("Firestore Boletos:",t));tt(T(x,Mt,"config"),t=>{t.exists()&&(bt=t.data()),K()},t=>console.error("Firestore Reservas:",t));tt(G(x,J),t=>{Y=t.docs.map(e=>({id:e.id,...e.data()})),K()},t=>console.error("Firestore Estimativas:",t));let h=new Date().toISOString().slice(0,7);function vt(){const t=new Set,e=new Date().toISOString().slice(0,7);t.add(e);const a=new Date,o=new Date(a.getFullYear(),a.getMonth()+1,1),n=r=>String(r).padStart(2,"0"),s=`${o.getFullYear()}-${n(o.getMonth()+1)}`;return t.add(s),h&&t.add(h),U.forEach(r=>{r.mesAno&&t.add(r.mesAno)}),z.forEach(r=>{r.mesAno&&t.add(r.mesAno)}),N.forEach(r=>{r.mesAno&&t.add(r.mesAno)}),R.forEach(r=>{r.mesAno&&t.add(r.mesAno)}),Y.forEach(r=>{r.mesAno&&t.add(r.mesAno)}),Array.from(t).sort().reverse()}window.selecionarMesGlobal=function(t){if(!t)return;h=t;const e=document.getElementById("inp-seletor-mes-global");e&&(e.value=t);const a=document.getElementById("inp-entradas-mes-ano");a&&(a.value=t);const o=document.getElementById("inp-fatura-vencimento");o&&(o.value=`${t}-10`,typeof atualizarMesRefFatura=="function"&&atualizarMesRefFatura());const n=document.getElementById("inp-boleto-vencimento");n&&(n.value=`${t}-10`,typeof atualizarMesRefBoleto=="function"&&atualizarMesRefBoleto()),K()};window.verMesEIrParaControle=function(t){selecionarMesGlobal(t),typeof goTab=="function"&&goTab("mensal")};function se(){const t=document.getElementById("seletor-meses-bar"),e=document.getElementById("seletor-meses-bar-salarios"),a=document.getElementById("seletor-meses-bar-estimativa"),o=vt();o.includes(h)||(h=o[0]||new Date().toISOString().slice(0,7));const n=document.getElementById("inp-seletor-mes-global");n&&n.value!==h&&(n.value=h);const s=document.getElementById("inp-entradas-mes-ano");s&&s.value!==h&&(s.value=h);const r=o.map(d=>{const[c,i]=d.split("-"),m=new Date(parseInt(c),parseInt(i)-1,1).toLocaleString("pt-BR",{month:"short"}).toUpperCase().replace(".",""),y=d===h;return`
      <button class="sub-item ${y?"active":""}" onclick="selecionarMesGlobal('${d}')" style="${y?"background:var(--secondary);color:#fff;border-color:var(--secondary);box-shadow:0 0 10px rgba(99,102,241,0.4);font-weight:700":"background:rgba(15,23,42,.6);color:var(--text-muted);border:1px solid var(--border-color)"}; display:inline-flex;align-items:center;gap:.35rem">
        📅 ${m}/${c}
      </button>
    `}).join("");t&&(t.innerHTML=r),e&&(e.innerHTML=r),a&&(a.innerHTML=r)}window.switchMensalSub=function(t){document.querySelectorAll("[data-mensal-sub]").forEach(o=>o.classList.remove("active")),document.querySelectorAll(".mensal-sub-content").forEach(o=>o.style.display="none");const e=document.querySelector(`[data-mensal-sub="${t}"]`);e&&e.classList.add("active");const a=document.getElementById(t);a&&(a.style.display="block")};function K(){se(),le(),re(),qt(),fe(),ye(),Ie(),xe(),Te(),Me(),Se(),Ee()}function re(){const t=h,e=U.filter(f=>f.mesAno===t),a=z.filter(f=>f.mesAno===t),o=N.filter(f=>f.mesAno===t),n=R.filter(f=>f.mesAno===t),s=e.reduce((f,b)=>f+(b.valor||0),0),r=a.reduce((f,b)=>f+(b.valorTotal!==void 0?b.valorTotal:b.valor||0),0),d=o.reduce((f,b)=>f+(b.valorTotal!==void 0?b.valorTotal:b.valor||0),0);let c=0;n.forEach(f=>{f.formasPagamento&&(c+=f.formasPagamento.cartaoDebito||0)});const i=s-r-d-c,u=document.getElementById("m-total-entradas");u&&(u.textContent=l(s));const m=document.getElementById("m-total-cartoes");m&&(m.textContent=l(r));const y=document.getElementById("m-total-boletos");y&&(y.textContent=l(d));const v=document.getElementById("m-mercado-debito");v&&(v.textContent=l(c));const g=document.getElementById("m-saldo-liquido");g&&(g.textContent=l(i),g.style.color=i>=0?"#60a5fa":"#fb7185");const[$,D]=t.split("-"),F=new Date(parseInt($),parseInt(D)-1,1).toLocaleString("pt-BR",{month:"long"}),O=F.charAt(0).toUpperCase()+F.slice(1),S=document.getElementById("m-lbl-saldo-liquido");S&&(S.textContent=`Saldo Líquido (${O}/${$})`),ie(e,a,o,n)}function ie(t,e,a,o){const n=document.getElementById("content-salarios-mes");n&&(n.innerHTML=`
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header">
          <span class="card-title">💵 Entradas Registradas em ${h}</span>
          <span class="badge green">Total: ${l(t.reduce((c,i)=>c+(i.valor||0),0))}</span>
        </div>
        ${t.length?`<div class="table-responsive"><table class="custom-table">
              <thead><tr><th>Pessoa</th><th>Descrição</th><th>Tipo</th><th class="num">Valor</th><th>Ação</th></tr></thead>
              <tbody>${t.map(c=>`<tr>
                <td><span class="badge ${c.pessoa==="Victor"?"green":c.pessoa==="Maria"?"purple":"cyan"}">${c.pessoa}</span></td>
                <td><strong>${c.descricao}</strong></td>
                <td><span class="badge amber">${c.tipo==="holerite"?"Holerite":"Manual"}</span></td>
                <td class="num" style="color:#34d399"><strong>${l(c.valor)}</strong></td>
                <td><button class="btn-danger" onclick="excluirEntrada('${c.id}')">🗑️</button></td>
              </tr>`).join("")}</tbody>
            </table></div>`:`<div class="empty-state">Nenhuma entrada cadastrada para ${h}. Use a aba "Salários & Entradas" para cadastrar.</div>`}
      </div>
    `);const s=document.getElementById("content-cartoes-mes");if(s){const c=e.reduce((u,m)=>u+(m.valorTotal||0),0),i=e.length?zt(e):"";s.innerHTML=`
      ${i}
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header">
          <span class="card-title">💳 Faturas de Cartão Vencendo em ${h}</span>
          <span class="badge rose">Total: ${l(c)}</span>
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
                  ${Ut(u)}
                </div>
              </div>
            `).join(""):`<div class="empty-state">Nenhuma fatura cadastrada com vencimento em ${h}. Use a aba "Cartões de Crédito" para importar.</div>`}
      </div>
    `}const r=document.getElementById("content-boletos-mes");if(r){const c=a.reduce((i,u)=>i+(u.valorTotal||0),0);r.innerHTML=`
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header">
          <span class="card-title">📄 Boletos Vencendo em ${h}</span>
          <span class="badge purple">Total: ${l(c)}</span>
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
                  ${jt(i)}
                </div>
              </div>
            `).join(""):`<div class="empty-state">Nenhum boleto cadastrado para ${h}. Use a aba "Boletos" para importar.</div>`}
      </div>
    `}const d=document.getElementById("content-mercado-mes");d&&(d.innerHTML=`
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header">
          <span class="card-title">🛒 Compras de Mercado em ${h}</span>
          <span class="badge amber">${o.length} notas cadastradas</span>
        </div>
        ${o.length?o.map(c=>`
              <div class="purchase-card" style="margin-bottom:1rem">
                <div class="purchase-header" onclick="toggleDetail('mer-m-${c.id}')">
                  <div class="purchase-info">
                    <h3>🛒 ${c.nomeMercado||"Mercado"}</h3>
                    <p>Data: <strong>${dt(c.dataEmissao)}</strong> • ${c.qtdTotalItens||0} itens</p>
                  </div>
                  <div class="purchase-values">
                    <div class="pv-total" style="color:#fbbf24">${l(c.valorAPagar)}</div>
                    <div class="pv-sub">Clique para ver itens <span class="chevron">▼</span></div>
                  </div>
                </div>
                <div id="mer-m-${c.id}" class="purchase-details">
                  <div class="details-toolbar">
                    <span style="font-weight:700;font-size:.9rem;color:var(--text-muted)">Itens da Nota</span>
                    <button class="btn-danger" onclick="excluirCompraDocumento('${c.id}')">🗑️ Excluir Nota</button>
                  </div>
                  ${Zt(c)}
                </div>
              </div>
            `).join(""):`<div class="empty-state">Nenhuma nota de mercado cadastrada para ${h}.</div>`}
      </div>
    `)}function le(){let t=U.reduce((i,u)=>i+(u.valor||0),0),e=z.reduce((i,u)=>i+(u.valorTotal!==void 0?u.valorTotal:u.valor||0),0),a=N.reduce((i,u)=>i+(u.valorTotal!==void 0?u.valorTotal:u.valor||0),0),o=0,n=0,s=0;const r={};R.forEach(i=>{const u=i.valorAPagar||0;i.formasPagamento&&(n+=i.formasPagamento.valeAlimentacao||0,s+=i.formasPagamento.cartaoCredito||0,o+=i.formasPagamento.cartaoDebito||0);const m=i.mesAno||"Outros";r[m]=(r[m]||0)+u});let d=t-e-a-o;document.getElementById("fin-total-entradas").textContent=l(t);const c=document.getElementById("fin-subtext-entradas");c&&(c.textContent="Total de Entradas Cadastradas"),document.getElementById("fin-total-cartoes").textContent=l(e),document.getElementById("fin-total-boletos").textContent=l(a),document.getElementById("fin-mercado-debito").textContent=l(o),document.getElementById("fin-saldo-liquido").textContent=l(d),document.getElementById("dash-alimentacao").textContent=l(n),document.getElementById("dash-credito").textContent=l(s),document.getElementById("dash-debito").textContent=l(o),de(),Lt(r)}function de(){const t=document.getElementById("tabela-resumo-mensal");if(!t)return;const e=vt();if(!e.length){t.innerHTML='<div class="empty-state">Nenhum dado cadastrado ainda.</div>';return}const a=e.map(o=>{const n=U.filter(g=>g.mesAno===o).reduce((g,$)=>g+($.valor||0),0),s=z.filter(g=>g.mesAno===o).reduce((g,$)=>g+($.valorTotal!==void 0?$.valorTotal:$.valor||0),0),r=N.filter(g=>g.mesAno===o).reduce((g,$)=>g+($.valorTotal!==void 0?$.valorTotal:$.valor||0),0);let d=0;R.filter(g=>g.mesAno===o).forEach(g=>{g.formasPagamento&&(d+=g.formasPagamento.cartaoDebito||0)});const c=n-s-r-d,[i,u]=o.split("-"),y=new Date(parseInt(i),parseInt(u)-1,1).toLocaleString("pt-BR",{month:"short"}).toUpperCase().replace(".","");return`
      <tr style="${o===h?"background:rgba(99,102,241,0.1)":""}">
        <td><strong>📅 ${y}/${i}</strong></td>
        <td style="color:#34d399"><strong>${l(n)}</strong></td>
        <td style="color:#fb7185">${l(s)}</td>
        <td style="color:#c084fc">${l(r)}</td>
        <td style="color:#fbbf24">${l(d)}</td>
        <td style="color:${c>=0?"#60a5fa":"#fb7185"}; font-weight:800">${l(c)}</td>
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
  `}function Lt(t){var s;if(typeof Chart>"u")return setTimeout(()=>Lt(t),300);const e=(s=document.getElementById("chart-barras"))==null?void 0:s.getContext("2d");if(!e)return;const a=Object.keys(t).sort(),o=a.map(r=>{const[d,c]=r.split("-");return`${c}/${d}`}),n=a.map(r=>t[r]);ft&&ft.destroy(),ft=new Chart(e,{type:"bar",data:{labels:o.length?o:["Sem compras"],datasets:[{label:"Gasto Mercado R$",data:n.length?n:[0],backgroundColor:"rgba(16,185,129,0.78)",borderColor:"#10b981",borderWidth:2,borderRadius:8}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:r=>` ${l(r.raw)}`}}},scales:{y:{beginAtZero:!0,grid:{color:"rgba(255,255,255,.05)"},ticks:{color:"#94a3b8",callback:r=>"R$"+r}},x:{grid:{display:!1},ticks:{color:"#94a3b8"}}}}})}function Ft(t){if(!t)return 0;const e=t.match(/L[íi]quido(?:\s*a\s*receber)?\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/TOTAL\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/SAL[ÁA]RIO\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/VALOR\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i);return e?M(e[1]):0}function ce(){const t=document.getElementById("inp-entradas-mes-ano");if(t&&!t.value){const e=new Date,a=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0");t.value=`${a}-${o}`}}setTimeout(ce,300);let Z="mes";window.toggleFiltroEntradasTabela=function(t){Z=t,qt()};document.getElementById("form-holerite-victor").addEventListener("submit",async t=>{t.preventDefault();const e=h||document.getElementById("inp-entradas-mes-ano").value||new Date().toISOString().slice(0,7),a=document.getElementById("inp-holerite-txt-victor").value;let o=parseFloat(document.getElementById("inp-salario-val-victor").value)||0;if(!o&&a&&(o=Ft(a)),!o){E("⚠️ Digite ou cole um holerite válido com valor.");return}const n=`salario_victor_${e}`;await V(T(x,lt,n),{pessoa:"Victor",tipo:"holerite",descricao:`Salário Líquido Victor (${e})`,valor:o,mesAno:e,data:new Date().toISOString()}),document.getElementById("inp-holerite-txt-victor").value="",document.getElementById("inp-salario-val-victor").value="",E(`✅ Salário do Victor (${e}) salvo com sucesso!`)});document.getElementById("form-holerite-maria").addEventListener("submit",async t=>{t.preventDefault();const e=h||document.getElementById("inp-entradas-mes-ano").value||new Date().toISOString().slice(0,7),a=document.getElementById("inp-holerite-txt-maria").value;let o=parseFloat(document.getElementById("inp-salario-val-maria").value)||0;if(!o&&a&&(o=Ft(a)),!o){E("⚠️ Digite ou cole um holerite válido com valor.");return}const n=`salario_maria_${e}`;await V(T(x,lt,n),{pessoa:"Maria",tipo:"holerite",descricao:`Salário Líquido Maria (${e})`,valor:o,mesAno:e,data:new Date().toISOString()}),document.getElementById("inp-holerite-txt-maria").value="",document.getElementById("inp-salario-val-maria").value="",E(`✅ Salário da Maria (${e}) salvo com sucesso!`)});document.getElementById("form-entrada-manual").addEventListener("submit",async t=>{t.preventDefault();const e=h||document.getElementById("inp-entradas-mes-ano").value||new Date().toISOString().slice(0,7),a=document.getElementById("inp-ent-desc").value.trim(),o=parseFloat(document.getElementById("inp-ent-val").value)||0,n=document.getElementById("inp-ent-pessoa").value;!a||!o||(await pt(G(x,lt),{pessoa:n,tipo:"manual",descricao:a,valor:o,mesAno:e,data:new Date().toISOString()}),t.target.reset(),E(`🎉 Entrada manual (${e}) registrada!`))});function qt(){var c,i,u;const t=h||((c=document.getElementById("inp-entradas-mes-ano"))==null?void 0:c.value)||new Date().toISOString().slice(0,7),e=document.getElementById("lbl-entradas-mes-ref");if(e){const[m,y]=t.split("-"),g=new Date(parseInt(m),parseInt(y)-1,1).toLocaleString("pt-BR",{month:"long"}),$=g.charAt(0).toUpperCase()+g.slice(1);e.textContent=`Visualizando e inserindo entradas para: ${$} de ${m}`}const a=((i=U.find(m=>m.pessoa==="Victor"&&m.tipo==="holerite"&&m.mesAno===t))==null?void 0:i.valor)||0,o=((u=U.find(m=>m.pessoa==="Maria"&&m.tipo==="holerite"&&m.mesAno===t))==null?void 0:u.valor)||0,n=U.filter(m=>m.mesAno===t),s=n.reduce((m,y)=>m+(y.valor||0),0);document.getElementById("val-salario-victor").textContent=l(a),document.getElementById("val-salario-maria").textContent=l(o),document.getElementById("val-entradas-combinado").textContent=`${l(s)}`;const r=document.getElementById("lista-entradas-registradas");if(!r)return;const d=Z==="mes"?n:U;if(!d.length){r.innerHTML=`
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;flex-wrap:wrap;gap:.5rem">
        <span style="font-size:.84rem;color:var(--text-muted)">Modo de Exibição da Tabela:</span>
        <div style="display:flex;gap:.35rem">
          <button type="button" class="btn-secondary" style="padding:.25rem .6rem;font-size:.78rem;${Z==="mes"?"background:var(--secondary);color:#fff":""}" onclick="toggleFiltroEntradasTabela('mes')">📅 Mês (${t})</button>
          <button type="button" class="btn-secondary" style="padding:.25rem .6rem;font-size:.78rem;${Z==="todos"?"background:var(--secondary);color:#fff":""}" onclick="toggleFiltroEntradasTabela('todos')">🌐 Todas as Entradas</button>
        </div>
      </div>
      <div class="empty-state">Nenhuma entrada registrada para ${Z==="mes"?"o mês "+t:"o sistema"}.</div>
    `;return}r.innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.75rem;flex-wrap:wrap;gap:.5rem">
      <span style="font-size:.84rem;color:var(--text-muted);font-weight:600">Exibindo ${d.length} entrada(s) em tabela:</span>
      <div style="display:flex;gap:.35rem">
        <button type="button" class="btn-secondary" style="padding:.25rem .6rem;font-size:.78rem;${Z==="mes"?"background:var(--secondary);color:#fff":""}" onclick="toggleFiltroEntradasTabela('mes')">📅 Mês ${t}</button>
        <button type="button" class="btn-secondary" style="padding:.25rem .6rem;font-size:.78rem;${Z==="todos"?"background:var(--secondary);color:#fff":""}" onclick="toggleFiltroEntradasTabela('todos')">🌐 Todas</button>
      </div>
    </div>
    <div class="table-responsive"><table class="custom-table">
      <thead><tr><th>Mês / Ref</th><th>Descrição</th><th>Pessoa</th><th>Tipo</th><th class="num">Valor</th><th>Ação</th></tr></thead>
      <tbody>${d.map(m=>`<tr>
        <td><span class="badge green">${m.mesAno||"—"}</span></td>
        <td><strong>${m.descricao}</strong></td>
        <td><span class="badge ${m.pessoa==="Victor"?"green":m.pessoa==="Maria"?"purple":"cyan"}">${m.pessoa}</span></td>
        <td><span class="badge amber">${m.tipo==="holerite"?"Holerite":"Manual"}</span></td>
        <td class="num" style="color:#34d399"><strong>${l(m.valor)}</strong></td>
        <td><button class="btn-danger" onclick="excluirEntrada('${m.id}')">🗑️</button></td>
      </tr>`).join("")}</tbody>
    </table></div>
  `}window.excluirEntrada=async function(t){confirm("Excluir esta entrada?")&&(await et(T(x,lt,t)),E("🗑️ Entrada removida."))};let Et="Nubank",A=null;function me(){const t=document.getElementById("inp-fatura-vencimento");if(t&&!t.value){const e=new Date,a=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0");t.value=`${a}-${o}-10`,atualizarMesRefFatura()}}setTimeout(me,300);window.atualizarMesRefFatura=function(){const t=document.getElementById("inp-fatura-vencimento"),e=document.getElementById("lbl-fatura-mes-ref");if(!(!t||!e))if(t.value){const[a,o]=t.value.split("-"),s=new Date(parseInt(a),parseInt(o)-1,1).toLocaleString("pt-BR",{month:"long"});e.textContent=`Fatura ${s.charAt(0).toUpperCase()+s.slice(1)}/${a}`}else e.textContent="Mês da Fatura"};window.selecionarCartaoFatura=function(t){Et=t,document.querySelectorAll(".btn-card-select").forEach(a=>a.classList.remove("active"));const e=document.querySelector(`.btn-card-select[data-card="${t}"]`);e&&e.classList.add("active"),E(`Cartão selecionado: ${t}`)};window.handleFileFaturaSelect=async function(t){const e=t.target.files[0];if(!e)return;const a=document.getElementById("txt-file-fatura");a&&(a.textContent=`📄 Arquivo: ${e.name}`),E(`⏳ Lendo arquivo da fatura (${e.name})...`);let o="";if(e.type==="application/pdf"||e.name.endsWith(".pdf"))o=await Rt(e);else try{o=await e.text()}catch{o=""}o?(document.getElementById("inp-fatura-txt").value=o,await Ot(o,Et)):E("❌ Não foi possível ler o texto do arquivo da fatura.")};async function Rt(t){try{const e=await t.arrayBuffer();if(typeof pdfjsLib>"u")return E("⚠️ Aguarde a biblioteca de PDF carregar..."),"";pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";let a=pdfjsLib.getDocument({data:e});a.onPassword=(s,r)=>{let d=prompt(`🔒 Este PDF de fatura está protegido por senha.
Digite a senha para abrir (ex: CPF ou Data de Nascimento):`);d?s(d):E("⚠️ Senha não informada. Leitura do PDF cancelada.")};const o=await a.promise;let n="";for(let s=1;s<=o.numPages;s++){const d=await(await o.getPage(s)).getTextContent();let c=null,i="";for(const u of d.items){if(!u.str)continue;const m=u.transform?u.transform[5]:null;c!==null&&Math.abs(m-c)>3?i+=`
`:i.length>0&&!i.endsWith(`
`)&&!i.endsWith(" ")&&(i+=" "),i+=u.str,c=m}n+=i+`
`}return n}catch(e){return e.name==="PasswordException"?E("🔒 O PDF precisa de senha válida para ser aberto."):console.error("Erro ao ler PDF:",e),""}}function ue(t){if(!t)return null;const e=t.match(/Total\s*a\s*Pagar\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/no\s*valor\s*de\s*R?\$\s*([\d\.,]+)/i)||t.match(/Valor\s*total\s*da\s*fatura\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/Total\s*da\s*fatura\s*[:\s]*R?\$\s*([\d\.,]+)/i);if(e){const a=M(e[1]);if(a>0)return a}return null}function pe(t){if(!t)return null;const e=t.match(/Vencimento\s*[:\s]*(\d{2}[\/\.-]\d{2}[\/\.-]\d{4})/i)||t.match(/Data\s*de\s*vencimento\s*[:\s]*(\d{2})\s+([A-Za-z]{3})\s+(\d{4})/i)||t.match(/FATURA\s+(\d{2})\s+([A-Za-z]{3})\s+(\d{4})/i);if(e){if(e[2]&&e[3]){const a=e[1],o=e[2].toUpperCase(),n=e[3],r={JAN:"01",FEB:"02",MAR:"03",ABR:"04",APR:"04",MAI:"05",MAY:"05",JUN:"06",JUL:"07",AGO:"08",AUG:"08",SET:"09",SEP:"09",OUT:"10",OCT:"10",NOV:"11",DEZ:"12",DEC:"12"}[o]||"07";return`${n}-${r}-${a.padStart(2,"0")}`}else if(e[1]){const[a,o,n]=e[1].split(/[\/\.-]/);return`${n}-${o.padStart(2,"0")}-${a.padStart(2,"0")}`}}return null}window.importarFaturaManualOuArquivo=async function(){const t=document.getElementById("inp-fatura-txt").value.trim();if(!t){E("⚠️ Selecione o arquivo da fatura (.pdf, .csv) ou cole o texto da fatura.");return}await Ot(t,Et)};async function Ot(t,e){const a=pe(t);a&&(document.getElementById("inp-fatura-vencimento").value=a,atualizarMesRefFatura());const o=ue(t),n=ve(t),s=document.getElementById("inp-fatura-vencimento").value||new Date().toISOString().slice(0,10),r=s.slice(0,7),d=n.reduce((y,v)=>y+v.valor,0),c=o||d||0,i=e?`Cartão ${e}`:"Fatura Cartão";A={cartao:e||"Nubank",descricao:i,dataVencimento:s,mesAno:r,valorTotal:c,qtdItens:n.length,itens:n};const u=document.getElementById("inp-revisao-fatura-desc");u&&(u.value=i);const m=document.getElementById("inp-revisao-fatura-val");m&&(m.value=c?c.toFixed(2):""),Pt(),n.length>0?E(`✅ ${n.length} compras encontradas! Fatura total: ${l(c)}.`):E("ℹ️ Fatura pronta para revisão. Confirme o valor total e o cartão abaixo.")}window.atualizarValorTotalRevisaoFatura=function(){var e;if(!A)return;const t=parseFloat((e=document.getElementById("inp-revisao-fatura-val"))==null?void 0:e.value)||0;A.valorTotal=t,document.getElementById("badge-total-preview-fatura").textContent=l(t)};function Pt(){if(!A)return;const{valorTotal:t,itens:e,cartao:a,descricao:o}=A;document.getElementById("badge-total-preview-fatura").textContent=l(t);const n=document.getElementById("inp-revisao-fatura-desc");n&&(!n.value||n.value==="Fatura Cartão")&&(n.value=o||`Cartão ${a||"Nubank"}`);const s=document.getElementById("inp-revisao-fatura-val");s&&(!s.value||parseFloat(s.value)===0)&&(s.value=t?t.toFixed(2):"");const r=document.getElementById("lista-preview-fatura-itens");!e||!e.length?r.innerHTML='<div class="empty-state">Nenhum item individual extraído. O valor total acima será considerado.</div>':r.innerHTML=e.map((c,i)=>`
      <div style="display:flex; justify-content:space-between; align-items:center; padding:.4rem 0; border-bottom:1px dashed var(--border-color); font-size:.82rem;">
        <span><strong>${c.dataCompra||"—"}</strong> — ${c.descricao}</span>
        <div style="display:flex; align-items:center; gap:.75rem;">
          <span style="color:#fb7185; font-weight:700;">${l(c.valor)}</span>
          <button type="button" class="btn-danger" style="padding:.15rem .45rem; font-size:.75rem;" onclick="removerItemRevisaoFatura(${i})">🗑️</button>
        </div>
      </div>
    `).join("");const d=document.getElementById("box-revisao-fatura");d.style.display="block",d.scrollIntoView({behavior:"smooth"})}window.removerItemRevisaoFatura=function(t){if(!A||!A.itens)return;A.itens.splice(t,1);const e=A.itens.reduce((a,o)=>a+o.valor,0);if(e>0){A.valorTotal=e;const a=document.getElementById("inp-revisao-fatura-val");a&&(a.value=e.toFixed(2))}A.qtdItens=A.itens.length,Pt(),E("🗑️ Item removido da revisão da fatura.")};window.confirmarEGravarFaturaDocumento=async function(){var o,n;if(!A)return;const t=(o=document.getElementById("inp-revisao-fatura-desc"))==null?void 0:o.value.trim(),e=parseFloat((n=document.getElementById("inp-revisao-fatura-val"))==null?void 0:n.value)||0,a=document.getElementById("inp-fatura-vencimento").value||new Date().toISOString().slice(0,10);if(!e){E("⚠️ Digite ou confirme o valor total da fatura.");return}A.cartao=t||A.cartao||"Cartão",A.valorTotal=e,A.dataVencimento=a,A.mesAno=a.slice(0,7);try{await pt(G(x,st),{...A,createdAt:ht()}),document.getElementById("box-revisao-fatura").style.display="none",document.getElementById("inp-fatura-txt").value="";const s=document.getElementById("txt-file-fatura");s&&(s.textContent="Clique para Selecionar o Arquivo da Fatura");const r=l(A.valorTotal);A=null,E(`🎉 Fatura de ${r} salva com sucesso!`)}catch(s){alert("Erro ao salvar fatura: "+s.message)}};function ve(t){if(!t)return[];const e=[],a=/(?:[@\)\(\*•\s]+)?(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+(?:(\d{2}\/\d{2})\s+)?(-?R?\$\s*[\d\.]+,\d{2}|-?[\d\.]+,\d{2})/gi;if(t.split(`
`).forEach(n=>{const s=n.trim();if(!s||/EMISS[ÃA]O|TRANSA[ÇC][ÕO]ES|RESUMO|PAGAMENTO DE FATURA|TOTAL DA FATURA|FATURA ANTERIOR|SALDO ANTERIOR|LIMITE DISPON[ÍI]VEL|OPÇÕES DE PAGAMENTO|ALTERNATIVAS DE PAGAMENTO|PAGAMENTO E DEMAIS|PARCELAMENTOS|DESPESAS|HISTÓRICO DE FATURAS|SUPERCRÉDITO|SAQUE À CRÉDITO|COMPRA DATA DESCRIÇÃO/i.test(s))return;const r=/(?:[@\)\(\*•\s]+)?(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+(?:(\d{2}\/\d{2})\s+)?(-?R?\$\s*[\d\.]+,\d{2}|-?[\d\.]+,\d{2})$/i,d=s.match(r)||s.match(/(?:[@\)\(\*•\s]+)?(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+(?:(\d{2}\/\d{2})\s+)?(-?R?\$\s*[\d\.]+,\d{2}|-?[\d\.]+,\d{2})/i);if(d){const c=d[1];let i=d[2].trim();const u=d[3],m=d[4];if(m.includes("-")||/DEB AUTOM|PAGAMENTO|PAGTO|CR[ÉE]DITO FATURA/i.test(i))return;const y=M(m);u&&(i+=` (${u})`),i&&y>0&&i.length>2&&!/fatura|limite|pagamento|saldo|alternativas|opções|período|emissão|vencimento/i.test(i)&&e.push({dataCompra:c,descricao:i,valor:y})}}),e.length===0){let n;for(;(n=a.exec(t))!==null;){const s=n[1];let r=n[2].trim();const d=n[3],c=n[4];if(c.includes("-")||/DEB AUTOM|PAGAMENTO|PAGTO|CR[ÉE]DITO FATURA/i.test(r))continue;const i=M(c);d&&(r+=` (${d})`),r&&i>0&&r.length>2&&!/fatura|limite|pagamento|saldo|alternativas|opções|período|emissão|vencimento/i.test(r)&&e.push({dataCompra:s,descricao:r,valor:i})}}return e}window.ultimosLocaisAnalisados={};function ge(t){if(!t)return"DIVERSOS";let e=t.replace(/\(\d{1,2}\/\d{1,2}\)/gi,"").replace(/\b\d{1,2}\/\d{1,2}\b/gi,"").replace(/\b\d{1,2}x\b/gi,"").trim();return e=e.replace(/\s+/g," "),e.toUpperCase()}function kt(t){const e={};(Array.isArray(t)?t:[t]).forEach(n=>{!n||!n.itens||!Array.isArray(n.itens)||n.itens.forEach(s=>{if(!s.descricao||!s.valor)return;const r=ge(s.descricao);e[r]||(e[r]={nome:r,qtd:0,valorTotal:0,compras:[]}),e[r].qtd+=1,e[r].valorTotal+=s.valor||0,e[r].compras.push({dataCompra:s.dataCompra||"—",descricao:s.descricao,valor:s.valor||0,cartao:n.cartao||"Cartão",mesAno:n.mesAno||"—"})})});const o=Object.values(e).filter(n=>n.qtd>=2);return o.sort((n,s)=>s.valorTotal-n.valorTotal),o}function zt(t,e="geral"){const a=kt(t);if(a.forEach(n=>{window.ultimosLocaisAnalisados[`${e}_${n.nome}`]=n}),!a.length)return`
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
  `}window.abrirModalComprasEstabelecimento=function(t){const e=window.ultimosLocaisAnalisados[t];if(!e){E("⚠️ Não foi possível carregar os detalhes do estabelecimento.");return}let a=document.getElementById("modal-detalhes-estabelecimento");if(!a){const n=document.createElement("div");n.id="modal-detalhes-estabelecimento",n.className="modal-overlay",n.innerHTML=`
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
  `,a.style.display="flex"};window.fecharModalEstabelecimento=function(){const t=document.getElementById("modal-detalhes-estabelecimento");t&&(t.style.display="none")};function fe(){const t=z.reduce((o,n)=>o+(n.valorTotal!==void 0?n.valorTotal:n.valor||0),0);document.getElementById("badge-total-cartoes").textContent=`${l(t)} total`;const e=document.getElementById("lista-faturas-registradas");if(!z.length){e.innerHTML='<div class="empty-state">Nenhuma fatura cadastrada ainda.</div>';return}const a=zt(z,"geral");e.innerHTML=a+z.map(o=>{var m;const n=o.valorTotal!==void 0?o.valorTotal:o.valor||0,s=o.cartao||"Cartão",r=s.toLowerCase().includes("nubank"),d=r?"purple":"red",c=r?"🟣":"🔴",i=o.dataVencimento?dt(o.dataVencimento).split(",")[0]:"—",u=o.mesAno||"—";return`
      <div class="purchase-card" style="margin-bottom:1rem">
        <div class="purchase-header" onclick="toggleDetail('fat-${o.id}')">
          <div class="purchase-info">
            <h3><span class="badge ${d}">${c} ${s}</span> — Vencimento: ${i}</h3>
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
          ${Ut(o)}
        </div>
      </div>
    `}).join("")}function Ut(t){if(t.itens&&t.itens.length>0){const e=kt([t]),a=`fatura_${t.id}`;e.forEach(n=>{window.ultimosLocaisAnalisados[`${a}_${n.nome}`]=n});let o="";return e.length>0&&(o=`
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
  </table></div>`}window.removerItemFaturaCadastrada=async function(t,e){const a=z.find(s=>s.id===t);if(!a||!a.itens||!confirm("Remover este item da fatura?"))return;const o=[...a.itens];o.splice(e,1);const n=o.reduce((s,r)=>s+(r.valor||0),0);o.length===0?(await et(T(x,st,t)),E("🗑️ Fatura excluída pois todos os itens foram removidos.")):(await V(T(x,st,t),{...a,itens:o,valorTotal:n,qtdItens:o.length}),E("🗑️ Item removido da fatura."))};window.excluirFaturaDocumento=async function(t){confirm("Excluir esta fatura e todos os seus lançamentos?")&&(await et(T(x,st,t)),E("🗑️ Fatura removida com sucesso."))};let C=null;function be(){const t=document.getElementById("inp-boleto-vencimento");if(t&&!t.value){const e=new Date,a=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0");t.value=`${a}-${o}-10`,atualizarMesRefBoleto()}}setTimeout(be,300);window.atualizarMesRefBoleto=function(){const t=document.getElementById("inp-boleto-vencimento"),e=document.getElementById("lbl-boleto-mes-ref");if(!(!t||!e))if(t.value){const[a,o]=t.value.split("-"),s=new Date(parseInt(a),parseInt(o)-1,1).toLocaleString("pt-BR",{month:"long"});e.textContent=`Boleto ${s.charAt(0).toUpperCase()+s.slice(1)}/${a}`}else e.textContent="Mês do Boleto"};window.handleFileBoletoSelect=async function(t){const e=t.target.files[0];if(!e)return;const a=document.getElementById("txt-file-boleto");a&&(a.textContent=`📄 Arquivo: ${e.name}`),E(`⏳ Lendo arquivo do boleto (${e.name})...`);let o="";if(e.type==="application/pdf"||e.name.endsWith(".pdf"))o=await Rt(e);else try{o=await e.text()}catch{o=""}o?(document.getElementById("inp-boleto-txt").value=o,await Nt(o,e.name)):E("❌ Não foi possível ler o texto do arquivo do boleto.")};window.importarBoletoManualOuArquivo=async function(){const t=document.getElementById("inp-boleto-txt").value.trim();if(!t){E("⚠️ Selecione o arquivo do boleto (.pdf, .txt) ou cole o texto do boleto.");return}await Nt(t,"Boleto")};async function Nt(t,e){const a=he(t);a.vencimento&&(document.getElementById("inp-boleto-vencimento").value=a.vencimento,atualizarMesRefBoleto());const o=document.getElementById("inp-boleto-vencimento").value||new Date().toISOString().slice(0,10),n=o.slice(0,7),s=a.beneficiario||e.replace(/\.[^/.]+$/,"")||"Boleto / Conta",r=a.itens.reduce((c,i)=>c+i.valor,0),d=a.valorTotal||r||0;document.getElementById("inp-revisao-boleto-desc").value=s,document.getElementById("inp-revisao-boleto-val").value=d?d.toFixed(2):"",C={descricao:s,dataVencimento:o,mesAno:n,valorTotal:d,qtdItens:a.itens.length,itens:a.itens},Vt(),E("✅ Boleto identificado! Confira a descrição, valor e itens antes de salvar.")}window.atualizarValorTotalRevisaoBoleto=function(){if(!C)return;const t=parseFloat(document.getElementById("inp-revisao-boleto-val").value)||0;C.valorTotal=t,document.getElementById("badge-total-preview-boleto").textContent=l(t)};function Vt(){if(!C)return;const{valorTotal:t,itens:e}=C;document.getElementById("badge-total-preview-boleto").textContent=l(t);const a=document.getElementById("lista-preview-boleto-itens");!e||!e.length?a.innerHTML='<div class="empty-state">Nenhum encargo/item individual extraído. O valor total acima será considerado.</div>':a.innerHTML=e.map((n,s)=>`
      <div style="display:flex; justify-content:space-between; align-items:center; padding:.4rem 0; border-bottom:1px dashed var(--border-color); font-size:.82rem;">
        <span><strong>${n.dataBoleto||"—"}</strong> — ${n.descricao}</span>
        <div style="display:flex; align-items:center; gap:.75rem;">
          <span style="color:#c084fc; font-weight:700;">${l(n.valor)}</span>
          <button type="button" class="btn-danger" style="padding:.15rem .45rem; font-size:.75rem;" onclick="removerItemRevisaoBoleto(${s})">🗑️</button>
        </div>
      </div>
    `).join("");const o=document.getElementById("box-revisao-boleto");o.style.display="block",o.scrollIntoView({behavior:"smooth"})}window.removerItemRevisaoBoleto=function(t){if(!C||!C.itens)return;C.itens.splice(t,1);const e=C.itens.reduce((a,o)=>a+o.valor,0);e>0&&(C.valorTotal=e,document.getElementById("inp-revisao-boleto-val").value=e.toFixed(2)),C.qtdItens=C.itens.length,Vt(),E("🗑️ Item removido da revisão do boleto.")};window.confirmarEGravarBoletoDocumento=async function(){if(!C)return;const t=document.getElementById("inp-revisao-boleto-desc").value.trim(),e=parseFloat(document.getElementById("inp-revisao-boleto-val").value)||0,a=document.getElementById("inp-boleto-vencimento").value||new Date().toISOString().slice(0,10);if(!e){E("⚠️ Digite ou confirme o valor total do boleto.");return}C.descricao=t||"Boleto / Conta",C.valorTotal=e,C.dataVencimento=a,C.mesAno=a.slice(0,7);try{await pt(G(x,rt),{...C,createdAt:ht()}),document.getElementById("box-revisao-boleto").style.display="none",document.getElementById("inp-boleto-txt").value="";const o=document.getElementById("txt-file-boleto");o&&(o.textContent="Clique para Selecionar o Arquivo do Boleto");const n=l(C.valorTotal);C=null,E(`🎉 Boleto de ${n} salvo com sucesso!`)}catch(o){alert("Erro ao salvar boleto: "+o.message)}};function he(t){if(!t)return{beneficiario:"",valorTotal:0,vencimento:null,itens:[]};let e="",a=0,o=null;const n=[],s=t.match(/Vencimento\s*[:\s]*(\d{2}[\/\.-]\d{2}[\/\.-]\d{4})/i)||t.match(/Vencimento\s*[:\s]*(\d{2})\s+([A-Za-z]{3})\s+(\d{4})/i)||t.match(/Data\s*de\s*Vencimento\s*[:\s]*(\d{2}[\/\.-]\d{2}[\/\.-]\d{4})/i);if(s){if(s[2]&&s[3]){const i=s[1],u=s[2].toUpperCase();o=`${s[3]}-${{JAN:"01",FEB:"02",MAR:"03",ABR:"04",APR:"04",MAI:"05",MAY:"05",JUN:"06",JUL:"07",AGO:"08",AUG:"08",SET:"09",SEP:"09",OUT:"10",OCT:"10",NOV:"11",DEZ:"12",DEC:"12"}[u]||"07"}-${i.padStart(2,"0")}`}else if(s[1]){const[i,u,m]=s[1].split(/[\/\.-]/);o=`${m}-${u.padStart(2,"0")}-${i.padStart(2,"0")}`}}const r=t.match(/Benefici[áa]rio\s*[:\s]*([^\n\r]+)/i)||t.match(/Nome\s*do\s*Cedente\s*[:\s]*([^\n\r]+)/i)||t.match(/Raz[ãa]o\s*Social\s*[:\s]*([^\n\r]+)/i);r&&(e=r[1].trim().replace(/\s{2,}/g," "));const d=t.match(/Valor\s*do\s*Documento\s*[:\s]*R?\$\s*([\d\.]+,\d{2})/i)||t.match(/\(=\)\s*Valor\s*Cobrado\s*[:\s]*R?\$\s*([\d\.]+,\d{2})/i)||t.match(/Valor\s*Cobrado\s*[:\s]*R?\$\s*([\d\.]+,\d{2})/i)||t.match(/Valor\s*R?\$\s*([\d\.]+,\d{2})/i);return d&&(a=M(d[1])),t.split(`
`).forEach(i=>{const u=i.trim();if(!u||/vencimento|beneficiário|cedente|nosso\s*número|agência|código|autenticação|instruções/i.test(u))return;const m=u.match(/(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\b[A-Za-z]{3}\b)?\s*(.+?)\s+R?\$\s*([\d\.]+,\d{2})$/i);if(m){const y=m[1]||"Boleto",v=m[2].trim(),g=M(m[3]);v&&g>0&&v.length>2&&!/valor|total|documento|cobrado/i.test(v)&&n.push({dataBoleto:y,descricao:v,valor:g})}}),{beneficiario:e,valorTotal:a,vencimento:o,itens:n}}function ye(){const t=N.reduce((a,o)=>a+(o.valorTotal!==void 0?o.valorTotal:o.valor||0),0);document.getElementById("badge-total-boletos").textContent=`${l(t)} total`;const e=document.getElementById("lista-boletos-registrados");if(!N.length){e.innerHTML='<div class="empty-state">Nenhum boleto cadastrado ainda.</div>';return}e.innerHTML=N.map(a=>{var d;const o=a.valorTotal!==void 0?a.valorTotal:a.valor||0,n=a.dataVencimento?dt(a.dataVencimento).split(",")[0]:"—",s=a.mesAno||"—",r=a.descricao||"Boleto / Conta";return`
      <div class="purchase-card">
        <div class="purchase-header" onclick="toggleDetail('bol-${a.id}')">
          <div class="purchase-info">
            <h3><span class="badge purple">📄 ${r}</span> — Vencimento: ${n}</h3>
            <p>📅 Mês Referência: <strong>${s}</strong> &nbsp;•&nbsp; 🛒 ${a.qtdItens||((d=a.itens)==null?void 0:d.length)||1} itens / encargos</p>
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
          ${jt(a)}
        </div>
      </div>
    `}).join("")}function jt(t){return t.itens&&t.itens.length>0?`<div class="table-responsive"><table class="custom-table">
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
  </table></div>`}window.removerItemBoletoCadastrado=async function(t,e){const a=N.find(s=>s.id===t);if(!a||!a.itens||!confirm("Remover este item do boleto?"))return;const o=[...a.itens];o.splice(e,1);const n=o.reduce((s,r)=>s+(r.valor||0),0);o.length===0?(await et(T(x,rt,t)),E("🗑️ Boleto excluído pois todos os itens foram removidos.")):(await V(T(x,rt,t),{...a,itens:o,valorTotal:n,qtdItens:o.length}),E("🗑️ Item removido do boleto."))};window.excluirBoletoDocumento=async function(t){confirm("Excluir este boleto e todos os seus itens?")&&(await et(T(x,rt,t)),E("🗑️ Boleto removido com sucesso."))};document.getElementById("form-config-reservas").addEventListener("submit",async t=>{t.preventDefault();const e=parseFloat(document.getElementById("inp-meta-anual").value)||0,a=parseFloat(document.getElementById("inp-saldo-guardado").value)||0;await V(T(x,Mt,"config"),{metaAnual:e,valorAtualGuardado:a,dataAtualizacao:new Date().toISOString()}),E("✅ Reservas e configurações de economias salvas!")});function Ee(){const t=bt.metaAnual||15e3,e=bt.valorAtualGuardado||3e3,a=document.getElementById("inp-meta-anual");a&&!a.value&&t&&(a.value=t);const o=document.getElementById("inp-saldo-guardado");o&&!o.value&&e&&(o.value=e);const s=new Date().getMonth()+1,r=Math.max(1,12-s+1),d=Math.max(0,t-e),c=d>0?d/r:0;document.getElementById("val-meta-reserva").textContent=l(c);const i=document.getElementById("subtext-meta-reserva");i&&(i.textContent=`Faltam ${l(d)} p/ Meta Anual de ${l(t)} (${r} mês(es) até o fim do ano)`),document.getElementById("val-real-guardado").textContent=l(e);const u=U.reduce((b,w)=>b+(w.valor||0),0),m=z.reduce((b,w)=>b+(w.valorTotal!==void 0?w.valorTotal:w.valor||0),0),y=N.reduce((b,w)=>b+(w.valorTotal!==void 0?w.valorTotal:w.valor||0),0);let v=0;R.forEach(b=>{b.formasPagamento?v+=(b.formasPagamento.cartaoDebito||0)+(b.formasPagamento.dinheiro||0)+(b.formasPagamento.pix||0):v+=b.valorAPagar||0});const g=m+y+v,$=u-g,D=Math.max(1,vt().length),L=$/D,F=L>0?L*.5:0,O=F*12;document.getElementById("val-recomendacao-reserva").textContent=l(O);const S=document.getElementById("subtext-recomendacao");S&&(S.textContent=`Sugerido poupar ${l(F)}/mês (${l(O)} no ano)`);const f=document.getElementById("box-analise-reserva-detalhes");if(f)if(u===0)f.innerHTML='<p class="empty-state">Cadastre seus salários e entradas na aba "Salários & Entradas" para gerar o diagnóstico inteligente de economias.</p>';else{const b=t>0?Math.min(100,e/t*100).toFixed(1):0;f.innerHTML=`
        <p>Com base na soma acumulada de todos os meses (<strong>${l(u)}</strong> Entradas vs <strong>${l(g)}</strong> Saídas Totais):</p>
        <div style="background:rgba(15,23,42,0.6);padding:1rem;border-radius:10px;margin:.75rem 0;border:1px solid var(--border-color)">
          <div style="display:flex;justify-content:space-between;margin-bottom:.4rem;flex-wrap:wrap;gap:.5rem">
            <span>💰 Saldo Livre Acumulado no Sistema: <strong>${l($)}</strong></span>
            <span>🎯 Meta Anual Desejada: <strong>${l(t)}</strong></span>
          </div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width:${b}%"></div>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:.78rem;color:var(--text-muted);margin-top:.4rem">
            <span>Guardado: ${l(e)} (${b}%)</span>
            <span>Faltam guardar: ${l(d)} nos próximos ${r} meses</span>
          </div>
        </div>
        <p style="font-size:.84rem;color:var(--text-muted)">
          💡 <strong>Planejamento do Sistema:</strong> Guardando <strong>${l(c)}/mês</strong> durante os próximos <strong>${r} meses</strong>, você atingirá com 100% de precisão sua Meta Anual de <strong>${l(t)}</strong>!
        </p>
      `}$e()}function $e(){const t=document.getElementById("container-analise-mensal-lista");if(!t)return;const e=vt();if(!e.length){t.innerHTML='<div class="empty-state">Nenhum mês registrado para gerar a análise mensal.</div>';return}const a=e.map(o=>{const s=U.filter(f=>f.mesAno===o).reduce((f,b)=>f+(b.valor||0),0),r=z.filter(f=>f.mesAno===o),d=r.reduce((f,b)=>f+(b.valorTotal!==void 0?b.valorTotal:b.valor||0),0),c=N.filter(f=>f.mesAno===o),i=c.reduce((f,b)=>f+(b.valorTotal!==void 0?b.valorTotal:b.valor||0),0),u=R.filter(f=>f.mesAno===o);let m=0;u.forEach(f=>{f.formasPagamento&&(m+=f.formasPagamento.cartaoDebito||0)});const y=d+i+m,v=s-y,g=v>=0,[$,D]=o.split("-"),F=new Date(parseInt($),parseInt(D)-1,1).toLocaleString("pt-BR",{month:"long"}),O=F.charAt(0).toUpperCase()+F.slice(1);let S="";if(g){const f=v*.5;S=`
        <div style="background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.25); border-radius:10px; padding:.85rem 1rem; margin-top:1rem">
          <div style="font-weight:700; font-size:.88rem; color:#34d399; margin-bottom:.2rem">
            🎉 Mês Positivo! Capacidade de Poupança Excelente
          </div>
          <p style="font-size:.8rem; color:var(--text-muted); margin:0">
            Neste mês sobraram <strong>${l(v)}</strong> em conta. O sistema sugere destinar pelo menos <strong style="color:#34d399">${l(f)}</strong> para sua reserva!
          </p>
        </div>
      `}else{const f=Math.abs(v);let b="Cartão de Crédito",w=d;i>w&&(b="Boletos & Contas",w=i),m>w&&(b="Mercado no Débito",w=m);const _=y>0?(w/y*100).toFixed(1):0;let k="",q=0;r.forEach(p=>{const I=p.valorTotal!==void 0?p.valorTotal:p.valor||0;I>q&&(q=I,k=`Fatura do ${p.cartao||"Cartão"}`)}),c.forEach(p=>{const I=p.valorTotal!==void 0?p.valorTotal:p.valor||0;I>q&&(q=I,k=`Boleto ${p.descricao||"de Conta"}`)}),S=`
        <div style="background:rgba(244,63,94,0.1); border:1px solid rgba(244,63,94,0.3); border-radius:10px; padding:.85rem 1rem; margin-top:1rem">
          <div style="font-weight:700; font-size:.88rem; color:#fb7185; margin-bottom:.4rem; display:flex; align-items:center; gap:.4rem">
            ⚠️ O que causou o déficit em ${O}/${$}?
          </div>
          <p style="font-size:.82rem; color:var(--text-main); margin-bottom:.5rem; line-height:1.5">
            As saídas (<strong>${l(y)}</strong>) superaram as entradas (<strong>${l(s)}</strong>) em <strong style="color:#fb7185">${l(f)}</strong>.
          </p>
          <div style="font-size:.78rem; color:var(--text-muted); line-height:1.5">
            • <strong>Vilão Principal:</strong> A categoria <strong style="color:#f8fafc">${b}</strong> representou <strong>${_}%</strong> de todas as saídas do mês (${l(w)}).
            ${k?`<br>• <strong>Maior Despesa Registrada:</strong> ${k} no valor de <strong style="color:#fb7185">${l(q)}</strong>.`:""}
          </div>
        </div>
      `}return`
      <div class="card" style="margin-bottom:1.25rem; border-color:${g?"rgba(52,211,153,0.3)":"rgba(251,113,133,0.4)"}">
        <div class="card-header" style="flex-wrap:wrap; gap:.5rem">
          <div style="display:flex; align-items:center; gap:.5rem">
            <span class="card-title" style="font-size:1rem; color:#f8fafc">📅 ${O} de ${$}</span>
            <span class="badge ${g?"green":"red"}">${g?"🟢 Superávit":"🔴 Déficit"}</span>
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
            <div style="font-weight:700; font-size:1rem; color:#fb7185">${l(d)}</div>
          </div>

          <div style="background:rgba(15,23,42,0.6); padding:.6rem .8rem; border-radius:8px; border:1px solid var(--border-color)">
            <div style="font-size:.75rem; color:var(--text-muted)">Boletos & Contas</div>
            <div style="font-weight:700; font-size:1rem; color:#c084fc">${l(i)}</div>
          </div>

          <div style="background:rgba(15,23,42,0.6); padding:.6rem .8rem; border-radius:8px; border:1px solid var(--border-color)">
            <div style="font-size:.75rem; color:var(--text-muted)">Mercado (Débito)</div>
            <div style="font-weight:700; font-size:1rem; color:#fbbf24">${l(m)}</div>
          </div>

          <div style="background:rgba(15,23,42,0.8); padding:.6rem .8rem; border-radius:8px; border:1px solid ${g?"#34d399":"#fb7185"}">
            <div style="font-size:.75rem; color:var(--text-muted)">Saldo Líquido no Mês</div>
            <div style="font-weight:800; font-size:1.05rem; color:${g?"#60a5fa":"#fb7185"}">${l(v)}</div>
          </div>
        </div>

        ${S}
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
  `}const ut=[{id:"est_1",nome:"Corte de Cabelo Victor",quantidade:2,valorUnitario:70},{id:"est_2",nome:"Compra Programada Tunico",quantidade:1,valorUnitario:150},{id:"est_3",nome:"Sobrancelha Maria",quantidade:1,valorUnitario:50},{id:"est_4",nome:"Unha Maria",quantidade:1,valorUnitario:90},{id:"est_5",nome:"Banho Tunico",quantidade:1,valorUnitario:65},{id:"est_6",nome:"Saída Simples",quantidade:2,valorUnitario:100},{id:"est_7",nome:"Saída Premiun",quantidade:1,valorUnitario:150},{id:"est_8",nome:"Saída Premiun Plus",quantidade:1,valorUnitario:200},{id:"est_9",nome:"Mercado Pontual",quantidade:4,valorUnitario:70},{id:"est_10",nome:"Farmacia",quantidade:2,valorUnitario:35},{id:"est_11",nome:"Padaria 3D",quantidade:10,valorUnitario:10}];window.abrirModalAddEstimativa=function(t=null){const e=document.getElementById("modal-add-estimativa");if(e){if(document.getElementById("inp-est-id").value=t||"",t){document.getElementById("titulo-modal-estimativa").textContent="✏️ Editar Gastos Previsto";const a=Y.find(n=>n.id===h),o=((a==null?void 0:a.itens)||[]).find(n=>n.id===t);o&&(document.getElementById("inp-est-nome").value=o.nome||"",document.getElementById("inp-est-qtd").value=o.quantidade||1,document.getElementById("inp-est-val").value=o.valorUnitario||0)}else document.getElementById("titulo-modal-estimativa").textContent="➕ Adicionar Gastos Previsto",document.getElementById("inp-est-nome").value="",document.getElementById("inp-est-qtd").value=1,document.getElementById("inp-est-val").value="";e.classList.add("active")}};window.fecharModalAddEstimativa=function(){var t;(t=document.getElementById("modal-add-estimativa"))==null||t.classList.remove("active")};var Bt;(Bt=document.getElementById("form-item-estimativa"))==null||Bt.addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-est-id").value,a=document.getElementById("inp-est-nome").value.trim(),o=parseFloat(document.getElementById("inp-est-qtd").value)||1,n=parseFloat(document.getElementById("inp-est-val").value)||0;if(!a){alert("Preencha a descrição do gasto.");return}const s=Y.find(d=>d.id===h);let r=s?[...s.itens||[]]:[...ut];e?r=r.map(d=>d.id===e?{...d,nome:a,quantidade:o,valorUnitario:n}:d):r.push({id:"est_"+Date.now(),nome:a,quantidade:o,valorUnitario:n}),await V(T(x,J,h),{mesAno:h,itens:r,ultimaAtualizacao:new Date().toISOString()}),fecharModalAddEstimativa(),E("✅ Estimativa atualizada!")});window.atualizarQtdItemEstimativa=async function(t,e){const a=Y.find(s=>s.id===h);if(!a)return;const o=Math.max(1,parseInt(e)||1),n=(a.itens||[]).map(s=>s.id===t?{...s,quantidade:o}:s);await V(T(x,J,h),{mesAno:h,itens:n,ultimaAtualizacao:new Date().toISOString()})};window.atualizarValorItemEstimativa=async function(t,e){const a=Y.find(s=>s.id===h);if(!a)return;const o=Math.max(0,parseFloat(e)||0),n=(a.itens||[]).map(s=>s.id===t?{...s,valorUnitario:o}:s);await V(T(x,J,h),{mesAno:h,itens:n,ultimaAtualizacao:new Date().toISOString()})};window.excluirItemEstimativa=async function(t){if(!confirm("Remover este item da estimativa do mês?"))return;const e=Y.find(o=>o.id===h);if(!e)return;const a=(e.itens||[]).filter(o=>o.id!==t);await V(T(x,J,h),{mesAno:h,itens:a,ultimaAtualizacao:new Date().toISOString()}),E("🗑️ Item removido da estimativa.")};window.resetarItensEstimativaPadrao=async function(){confirm(`Deseja carregar/resetar os 11 itens padrão de previsão para ${h}?`)&&(await V(T(x,J,h),{mesAno:h,itens:ut,ultimaAtualizacao:new Date().toISOString()}),E("🔄 Itens padrão de estimativa carregados!"))};function Ie(){const t=document.getElementById("container-lista-estimativa");if(!t)return;const e=Y.find(v=>v.id===h);let a=[];e&&Array.isArray(e.itens)?a=e.itens:(a=ut,V(T(x,J,h),{mesAno:h,itens:ut,ultimaAtualizacao:new Date().toISOString()}).catch(v=>console.error("Auto init estimativa error:",v)));let o=0;a.forEach(v=>{o+=(v.quantidade||0)*(v.valorUnitario||0)});const n=document.getElementById("val-total-estimativa-mes");n&&(n.textContent=l(o));const[s,r]=h.split("-"),c=new Date(parseInt(s),parseInt(r)-1,1).toLocaleString("pt-BR",{month:"long"}),i=c.charAt(0).toUpperCase()+c.slice(1),u=document.getElementById("subtext-estimativa-mes");u&&(u.textContent=`Total previsto para ${i} de ${s} (${a.length} itens cadastrados)`);const m=document.getElementById("badge-count-estimativa");if(m&&(m.textContent=`${a.length} itens previstos`),!a.length){t.innerHTML=`
      <div class="empty-state">
        <p>Nenhum gasto estimado para ${h}.</p>
        <button class="btn-secondary" onclick="resetarItensEstimativaPadrao()" style="margin-top:.5rem">
          🔄 Carregar Itens Padrão
        </button>
      </div>
    `;return}const y=`
    <div class="table-responsive">
      <table class="custom-table">
        <thead>
          <tr>
            <th>Gasto / Item Previsto</th>
            <th class="num" style="width:110px">Qtd</th>
            <th class="num" style="width:130px">Vl. Unit. (R$)</th>
            <th class="num">Subtotal</th>
            <th style="text-align:right;width:120px">Ações</th>
          </tr>
        </thead>
        <tbody>
          ${a.map(v=>{const g=(v.quantidade||0)*(v.valorUnitario||0);return`
              <tr>
                <td>
                  <strong style="color:#f8fafc">${v.nome}</strong>
                </td>
                <td class="num">
                  <input type="number" min="1" step="1" class="form-control" style="width:70px;padding:.2rem .4rem;font-size:.82rem;text-align:center" value="${v.quantidade}" onchange="atualizarQtdItemEstimativa('${v.id}', this.value)">
                </td>
                <td class="num">
                  <input type="number" min="0" step="0.01" class="form-control" style="width:95px;padding:.2rem .4rem;font-size:.82rem;text-align:right" value="${v.valorUnitario}" onchange="atualizarValorItemEstimativa('${v.id}', this.value)">
                </td>
                <td class="num">
                  <strong style="color:#a5b4fc">${l(g)}</strong>
                </td>
                <td style="text-align:right">
                  <div style="display:flex;gap:.35rem;justify-content:flex-end">
                    <button type="button" class="btn-secondary" style="padding:.2rem .4rem;font-size:.75rem" onclick="abrirModalAddEstimativa('${v.id}')" title="Editar">✏️</button>
                    <button type="button" class="btn-danger" style="padding:.2rem .4rem;font-size:.75rem" onclick="excluirItemEstimativa('${v.id}')" title="Excluir">🗑️</button>
                  </div>
                </td>
              </tr>
            `}).join("")}
        </tbody>
      </table>
    </div>
  `;t.innerHTML=y}function xe(){const t=document.getElementById("lista-mensal-container");if(!t)return;const e=new Date,a=new Date(e.getFullYear(),e.getMonth()+1,1),o=a.toLocaleString("pt-BR",{month:"long"}),n=a.getFullYear(),s=`${o.charAt(0).toUpperCase()+o.slice(1)} de ${n}`,r=ne(a.getFullYear(),a.getMonth()),d=31.8,c=20,i=r*d,u=r*c,m={};let y=0;R.forEach(p=>{const I=p.valorAPagar||0;y+=I;const B=p.mesAno||"Outros";m[B]=(m[B]||0)+I});const v=Math.max(1,Object.keys(m).length),g=y/v,$={};R.forEach(p=>{(p.itens||[]).forEach(I=>{const B=(I.nome||"").toLowerCase().trim();B&&($[B]||($[B]={nome:I.nome,marca:I.marca||"Geral",qtdTotal:0,frequenciaNotas:0,valoresUnitarios:[]}),$[B].qtdTotal+=I.quantidade||1,$[B].frequenciaNotas+=1,I.valorUnitario&&$[B].valoresUnitarios.push(I.valorUnitario))})});const D=Object.values($).map(p=>{const I=p.valoresUnitarios.length>0?p.valoresUnitarios.reduce((ot,mt)=>ot+mt,0)/p.valoresUnitarios.length:0,B=p.qtdTotal/v,X=v/Math.max(1,p.frequenciaNotas),ct=p.frequenciaNotas/v;let j=0;ct>=.35||B>=.7?j=Math.ceil(B):j=Math.round(B),j<1&&p.frequenciaNotas>=v&&(j=1);const at=j*I;return{nome:p.nome,marca:p.marca,frequenciaNotas:p.frequenciaNotas,intervaloMeses:X,qtdMensalTaxa:B,totalEstimadoUnidades:j,valorUnitario:I,subtotalCalculado:at}}).filter(p=>p.totalEstimadoUnidades>0);D.sort((p,I)=>I.frequenciaNotas-p.frequenciaNotas);const L=D.reduce((p,I)=>p+I.subtotalCalculado,0),F=g>0?g*1.05:L;let O=1;L>F&&g>0&&(O=F/L);const S=D.map(p=>({...p,subtotalFinal:p.subtotalCalculado*O})),f=g>0?Math.min(L,F):L;let b=f;const w=Math.min(b,i);b-=w;const _=Math.min(b,u);b-=_;const k=b>0?b:0;let q=`
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
          <div class="p-val" style="color:#34d399;">${l(w)} <span style="font-size:0.75rem;font-weight:normal;color:var(--text-muted)">/ ${l(i)}</span></div>
        </div>
        <div class="payment-item" style="border-color: rgba(99,102,241,0.4);">
          <div class="p-label">💳 Cartão Crédito (${r}d × R$ 20,00)</div>
          <div class="p-val" style="color:#818cf8;">${l(_)} <span style="font-size:0.75rem;font-weight:normal;color:var(--text-muted)">/ ${l(u)}</span></div>
        </div>
        <div class="payment-item" style="border-color: ${k>0?"rgba(244,63,94,0.5)":"var(--border-color)"};">
          <div class="p-label">💳 Débito Necessário (Excedente)</div>
          <div class="p-val" style="color: ${k>0?"#fb7185":"var(--text-muted)"};">${l(k)}</div>
        </div>
      </div>

      <div style="margin-top:1.25rem; padding-top:1rem; border-top:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
        <div>
          <span style="font-size:0.85rem; color:var(--text-muted);">Total Estimado da Lista de Compras:</span>
          <p style="font-size:0.75rem; color:#60a5fa;">Média Histórica de Gastos: ${l(g)}</p>
        </div>
        <span style="font-size:1.6rem; font-weight:800; color:var(--primary);">${l(f)}</span>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-title">Lista de Itens com Frequência e Total Estimado</span>
        <span class="badge amber">${S.length} itens cadastrados</span>
      </div>
      <p class="card-subtext" style="margin-bottom:1rem;">
        O <strong>Total Estimado</strong> arredonda o consumo médio para cima (unidades inteiras exatas), pois os produtos são comprados por unidade no mercado.
      </p>
  `;window.dadosListaMensalCache={mesAnoStr:s,diasUteis:r,totalGeralEstimado:f,cobertoAlim:w,cobertoCred:_,cobertoDeb:k,alimDisponivel:i,credDisponivel:u,lista:S},S.length===0?q+='<div class="empty-state">Adicione notas fiscais para que o sistema gere automaticamente sua lista mensal de compras.</div></div>':q+=`
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
            ${S.map(p=>{const I=p.intervaloMeses>1.2?`A cada ${p.intervaloMeses.toFixed(1)} meses`:`Todo mês (${p.frequenciaNotas}x)`,B=p.qtdMensalTaxa<1?p.qtdMensalTaxa.toFixed(2):p.qtdMensalTaxa.toFixed(1),X=p.totalEstimadoUnidades.toFixed(1);return`
                <tr>
                  <td><strong>${p.nome}</strong></td>
                  <td><span class="badge amber">${p.marca}</span></td>
                  <td><span class="badge cyan">${I}</span></td>
                  <td class="num">${B} un/mês</td>
                  <td class="num"><span class="badge green" style="font-size:0.82rem;">${X}</span></td>
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
    </div>`,t.innerHTML=q}window.exportarPDFListaMensal=function(){if(!window.dadosListaMensalCache||!window.dadosListaMensalCache.lista.length){E("⚠️ Nenhuma lista mensal disponível para exportar.");return}const{mesAnoStr:t,diasUteis:e,totalGeralEstimado:a,cobertoAlim:o,cobertoCred:n,cobertoDeb:s,lista:r}=window.dadosListaMensalCache,d=window.open("","_blank","width=900,height=750");if(!d){alert("Permita pop-ups no navegador para gerar o PDF da lista.");return}const c=`
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
  `;d.document.open(),d.document.write(c),d.document.close()};document.getElementById("btn-start-cam").addEventListener("click",Ht);document.getElementById("btn-switch-cam").addEventListener("click",we);document.getElementById("btn-stop-cam").addEventListener("click",$t);async function Ht(){if(typeof Html5Qrcode>"u")return P("Carregando biblioteca de câmera, aguarde..."),setTimeout(Ht,600);try{Q||(Q=new Html5Qrcode("qr-reader")),H=await Html5Qrcode.getCameras();let t;if(H&&H.length>0){const e=H.findIndex(a=>/back|traseira|rear|environment/i.test(a.label));nt=e>=0?e:0,t=H[nt].id}else t={facingMode:"environment"};await Q.start(t,{fps:10,qrbox:{width:240,height:240}},Gt,()=>{}),it=!0,document.getElementById("btn-start-cam").style.display="none",document.getElementById("btn-switch-cam").style.display=H.length>1?"inline-flex":"none",document.getElementById("btn-stop-cam").style.display="inline-flex"}catch(t){P("❌ Não foi possível acessar a câmera. Verifique as permissões do navegador."),console.error(t)}}async function we(){if(!(!Q||!it))try{await Q.stop(),H.length>1&&(nt=(nt+1)%H.length,await Q.start(H[nt].id,{fps:10,qrbox:{width:240,height:240}},Gt,()=>{}))}catch(t){console.error("switchCam:",t)}}async function $t(){if(Q&&it)try{await Q.stop()}catch{}it=!1,document.getElementById("btn-start-cam").style.display="inline-flex",document.getElementById("btn-switch-cam").style.display="none",document.getElementById("btn-stop-cam").style.display="none"}async function Gt(t){$t(),document.getElementById("inp-url").value=t,P("✅ QR Code lido! Processando..."),await Qt(t)}document.getElementById("btn-carregar-dados").addEventListener("click",async()=>{const t=document.getElementById("inp-url").value.trim(),e=document.getElementById("inp-html").value.trim();if(!t&&!e){P("⚠️ Cole a URL do QR Code ou o conteúdo da página para ler a nota fiscal.");return}if(t&&!e){P("⏳ Consultando nota fiscal..."),await Qt(t);return}if(e){P("⏳ Processando conteúdo..."),await Yt(e);return}});document.getElementById("btn-preencher-manual").addEventListener("click",()=>{_t({nomeMercado:"",dataEmissao:new Date().toISOString(),valorTotal:0,descontoTotal:0,valorAPagar:0,qtdTotalItens:0,formasPagamento:{valeAlimentacao:0,cartaoCredito:0,cartaoDebito:0},itens:[]}),P("✍️ Preencha os dados da compra abaixo e clique em Salvar Nota Fiscal.","var(--accent-cyan)")});function _t(t){var s,r,d;document.getElementById("inp-mercado").value=t.nomeMercado||"",document.getElementById("inp-data").value=oe(t.dataEmissao),document.getElementById("inp-vtotal").value=t.valorTotal!==void 0?t.valorTotal:0,document.getElementById("inp-desconto").value=t.descontoTotal!==void 0?t.descontoTotal:0,document.getElementById("inp-pagar").value=t.valorAPagar!==void 0?t.valorAPagar:0,document.getElementById("inp-qtd").value=t.qtdTotalItens!==void 0?t.qtdTotalItens:0,document.getElementById("inp-alim").value=((s=t.formasPagamento)==null?void 0:s.valeAlimentacao)||0,document.getElementById("inp-cred").value=((r=t.formasPagamento)==null?void 0:r.cartaoCredito)||0,document.getElementById("inp-deb").value=((d=t.formasPagamento)==null?void 0:d.cartaoDebito)||0,W=t.itens||[];const e=document.getElementById("form-nfce");e.style.display="block";const a=document.getElementById("preview-itens-box"),o=document.getElementById("count-preview-itens"),n=document.getElementById("lista-preview-itens");W.length>0?(a.style.display="block",o.textContent=W.length,n.innerHTML=W.map(c=>`
      <div style="display:flex; justify-content:space-between; padding: 0.35rem 0; border-bottom: 1px dashed var(--border-color);">
        <span><strong>${c.nome}</strong> (${c.quantidade} ${c.unidade||"Un"})</span>
        <span>${l(c.valorUnitario)}/un = <strong>${l(c.valorTotal)}</strong></span>
      </div>
    `).join("")):a.style.display="none",e.scrollIntoView({behavior:"smooth"})}document.getElementById("form-nfce").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-mercado").value.trim()||"Mercado",a=document.getElementById("inp-data").value||new Date().toISOString(),o=parseFloat(document.getElementById("inp-vtotal").value)||0,n=parseFloat(document.getElementById("inp-desconto").value)||0,s=parseFloat(document.getElementById("inp-pagar").value)||0,r=parseInt(document.getElementById("inp-qtd").value)||0,d=parseFloat(document.getElementById("inp-alim").value)||0,c=parseFloat(document.getElementById("inp-cred").value)||0,i=parseFloat(document.getElementById("inp-deb").value)||0,u=new Date(a).toISOString().slice(0,16),m=R.find(g=>{const $=new Date(g.dataEmissao).toISOString().slice(0,16),D=Math.abs((g.valorAPagar||0)-s)<.05,L=(g.nomeMercado||"").toLowerCase().trim()===e.toLowerCase().trim();return $===u&&D&&L});if(m){P(`⚠️ Esta nota fiscal já existe no sistema (Cadastrada em ${dt(m.dataEmissao)} no valor de ${l(m.valorAPagar)}). Nota não adicionada!`,"#fb7185"),E("⚠️ Nota fiscal já cadastrada! Operação cancelada.");return}const y=new Date(a),v=`${y.getFullYear()}-${String(y.getMonth()+1).padStart(2,"0")}`;P("⏳ Salvando nota fiscal no banco...");try{await pt(G(x,yt),{nomeMercado:e,dataEmissao:a,mesAno:v,qtdTotalItens:r||W.length,valorTotal:o,descontoTotal:n,valorAPagar:s,formasPagamento:{valeAlimentacao:d,cartaoCredito:c,cartaoDebito:i},itens:W,createdAt:ht()}),P("✅ Nota salva com sucesso!","#34d399"),document.getElementById("form-nfce").style.display="none",document.getElementById("form-nfce").reset(),document.getElementById("inp-url").value="",document.getElementById("inp-html").value="",W=[],Dt(),goTab("dashboard"),E("🎉 Nota fiscal registrada no Firebase!")}catch(g){P("❌ Erro ao salvar: "+g.message,"#fb7185")}});async function Qt(t){const e=[a=>`https://api.allorigins.win/raw?url=${encodeURIComponent(a)}`,a=>`https://corsproxy.io/?${encodeURIComponent(a)}`];for(const a of e)try{const o=await fetch(a(t),{signal:AbortSignal.timeout(8e3)});if(o.ok){const n=await o.text();if(n&&n.length>200){await Yt(n);return}}}catch{}Ae(t)}function Ae(t){document.getElementById("modal-link").href=t,document.getElementById("modal-cors").classList.add("active"),P("⚠️ Abra o link, copie o conteúdo da página e cole no campo de texto abaixo.")}async function Yt(t){const e=Be(t);_t(e),P("✅ Nota lida com sucesso! Confira os valores abaixo e altere se necessário antes de Salvar.","#34d399")}function Be(t){var w,_,k;const a=new DOMParser().parseFromString(t,"text/html"),o=((w=a.body)==null?void 0:w.textContent)||t;let n=((k=(_=a.querySelector(".txtTopo, .nomeEmit, h1"))==null?void 0:_.textContent)==null?void 0:k.trim())||"Mercado",s=new Date().toISOString();const r=o.match(/Emiss[ãa]o\s*[:\-]?\s*(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})?/i)||o.match(/(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})/);if(r){const[q,p,I]=r[1].split("/");s=`${I}-${p}-${q}T${r[2]||"12:00:00"}`}const d=o.match(/Qtd\.?\s*total\s*de\s*itens\s*[:\s]*([\d,\.]+)/i),c=o.match(/Valor\s*total\s*R\$\s*[:\s]*([\d\.,]+)/i),i=o.match(/Descontos?\s*R\$\s*[:\s]*([\d\.,]+)/i),u=o.match(/Valor\s*a\s*pagar\s*R\$\s*[:\s]*([\d\.,]+)/i)||o.match(/VALOR\s*PAGO\s*R\$\s*[:\s]*([\d\.,]+)/i),m=o.match(/(?:Vale\s*)?Alimenta[çc][ãa]o\s*[:\s]*([\d\.,]+)/i),y=o.match(/(?:Cart[ãa]o\s*de\s*)?Cr[eé]dito\s*[:\s]*([\d\.,]+)/i),v=o.match(/(?:Cart[ãa]o\s*de\s*)?D[eé]bito\s*[:\s]*([\d\.,]+)/i),g=d?M(d[1]):0,$=c?M(c[1]):0,D=i?M(i[1]):0;let L=u?M(u[1]):$-D;const F={valeAlimentacao:m?M(m[1]):0,cartaoCredito:y?M(y[1]):0,cartaoDebito:v?M(v[1]):0},O=[];a.querySelectorAll("tr, .item, .itemNota").forEach(q=>{var It;const p=q.textContent;if(!/Vl\.\s*Unit|valorUnitario|Qtde?\./i.test(p))return;const I=q.querySelector(".txtTit, .txtTit2, .nomeProd"),B=((It=I==null?void 0:I.textContent)==null?void 0:It.trim())||"",X=p.match(/Qtde?\.\s*[:\s]*([\d,\.]+)/i),ct=p.match(/Vl\.\s*Unit\.\s*[:\s]*([\d,\.]+)/i),j=p.match(/Vl\.\s*Total\s*([\d,\.]+)/i),at=p.match(/C[oó]digo\s*[:\s]*(\d+)/i),ot=p.match(/UN\s*[:\s]*([A-Za-z]+)/i),mt=X?M(X[1]):1,gt=ct?M(ct[1]):0,Wt=j?M(j[1]):gt*mt;B&&gt>0&&O.push({codigo:(at==null?void 0:at[1])||"",nome:B,marca:Ce(B),quantidade:mt,unidade:(ot==null?void 0:ot[1])||"Un",valorUnitario:gt,valorTotal:Wt})});const f=new Date(s),b=`${f.getFullYear()}-${String(f.getMonth()+1).padStart(2,"0")}`;return{nomeMercado:n,dataEmissao:s,mesAno:b,qtdTotalItens:g,valorTotal:$,descontoTotal:D,valorAPagar:L,formasPagamento:F,itens:O}}function Ce(t){const e=["BAUDUCCO","BAUD","PANCO","DANONE","NESTLE","QUALITA","SADIA","PERDIGAO","SEARA","CAMIL","TIO JOAO","URBANO","LIZA","SOYA","YPE","PILAO","MELITTA","3 CORACOES","VIGOR","PARMALAT","ITALAC","HEINZ","KRAFT"],a=t.toUpperCase();for(const o of e)if(a.includes(o))return o;return a.split(" ")[0]||"Genérica"}function Te(){const t=document.getElementById("lista-historico");if(!R.length){t.innerHTML='<div class="empty-state">📭 Nenhuma compra cadastrada ainda.</div>';return}t.innerHTML=R.map(e=>{var a,o,n;return`
    <div class="purchase-card">
      <div class="purchase-header" onclick="toggleDetail('${e.id}')">
        <div class="purchase-info">
          <h3>${e.nomeMercado||"Mercado"}</h3>
          <p>📅 ${dt(e.dataEmissao)} &nbsp;•&nbsp; 🛒 ${e.qtdTotalItens||0} itens</p>
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
        ${Zt(e)}
      </div>
    </div>`}).join("")}function Zt(t){return!t.itens||!t.itens.length?'<p class="card-subtext">Nenhum item detalhado registrado.</p>':`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Item</th><th>Marca</th><th class="num">Qtd</th><th class="num">Vl. Unit.</th><th class="num">Vl. Total</th></tr></thead>
    <tbody>${t.itens.map(e=>`<tr>
      <td>${e.nome}</td>
      <td><span class="badge amber">${e.marca||"—"}</span></td>
      <td class="num">${e.quantidade} ${e.unidade||"Un"}</td>
      <td class="num">${l(e.valorUnitario)}</td>
      <td class="num"><strong>${l(e.valorTotal)}</strong></td>
    </tr>`).join("")}</tbody>
  </table></div>`}window.toggleDetail=function(t){const e=document.getElementById("detail-"+t),a=document.getElementById("chev-"+t);e&&e.classList.toggle("open"),a&&a.classList.toggle("open")};window.confirmarExcluirMercado=async function(t){if(confirm("Excluir esta compra de mercado?"))try{await et(T(x,yt,t)),E("🗑️ Compra excluída.")}catch(e){alert("Erro: "+e.message)}};function Me(){const t=document.getElementById("lista-comparacao"),e={};R.forEach(o=>{(o.itens||[]).forEach(n=>{var r;const s=((r=n.nome)==null?void 0:r.toLowerCase().trim())||"produto";e[s]||(e[s]={nome:n.nome,marca:n.marca,hist:{}}),e[s].hist[o.mesAno]=n.valorUnitario})});const a=Object.values(e);if(!a.length){t.innerHTML='<div class="empty-state">Adicione notas para ver a comparação de preços unitários.</div>';return}t.innerHTML=`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Produto</th><th>Marca</th><th>Histórico (Unitário)</th><th>Variação</th></tr></thead>
    <tbody>${a.map(o=>{const n=Object.keys(o.hist).sort();let s=n.map(d=>`${d}: <strong>${l(o.hist[d])}</strong>`).join(" → "),r='<span class="badge cyan">Estável</span>';if(n.length>=2){const d=o.hist[n[n.length-2]],i=o.hist[n[n.length-1]]-d,u=(i/d*100).toFixed(1);i>.01?r=`<span class="badge red">+${u}% ↑</span>`:i<-.01&&(r=`<span class="badge green">${u}% ↓</span>`)}return`<tr><td><strong>${o.nome}</strong></td><td><span class="badge amber">${o.marca||"—"}</span></td><td>${s}</td><td>${r}</td></tr>`}).join("")}</tbody>
  </table></div>`}function Se(){const t=document.getElementById("lista-recorrencia"),e=document.getElementById("lista-marcas"),a={},o={};R.forEach(r=>{(r.itens||[]).forEach(d=>{var m;const c=(m=d.nome)==null?void 0:m.toLowerCase().trim();if(!c)return;a[c]||(a[c]={nome:d.nome,marca:d.marca,qtd:0,notas:0,units:[]}),a[c].qtd+=d.quantidade||1,a[c].notas+=1,a[c].units.push(d.valorUnitario||0);const i=(d.nome||"").split(" ")[0].toUpperCase();o[i]||(o[i]={});const u=d.marca||"Genérica";o[i][u]||(o[i][u]=[]),o[i][u].push(d.valorUnitario||0)})});const n=Object.values(a).filter(r=>r.notas>1).sort((r,d)=>d.notas-r.notas);t.innerHTML=n.length?`<div class="table-responsive"><table class="custom-table">
        <thead><tr><th>Item</th><th>Marca</th><th>Compras</th><th class="num">Qtd Total</th><th class="num">Média Unitária</th></tr></thead>
        <tbody>${n.map(r=>{const d=r.units.reduce((c,i)=>c+i,0)/r.units.length;return`<tr>
            <td><strong>${r.nome}</strong></td>
            <td><span class="badge amber">${r.marca||"—"}</span></td>
            <td><span class="badge green">${r.notas}x</span></td>
            <td class="num">${r.qtd}</td>
            <td class="num">${l(d)}</td>
          </tr>`}).join("")}</tbody>
      </table></div>`:'<div class="empty-state">Adicione notas para ver a recorrência de itens.</div>';const s=Object.entries(o).filter(([,r])=>Object.keys(r).length>1).map(([r,d])=>{let c=1/0,i="";const u=Object.entries(d).map(([m,y])=>{const v=y.reduce((g,$)=>g+$,0)/y.length;return v<c&&(c=v,i=m),{marca:m,med:v}});return`<div class="brand-card">
      <div class="brand-card-header">
        <span class="card-title">${r}</span>
        <span class="badge green">🏆 Menor preço: ${i} (${l(c)}/un)</span>
      </div>
      <div class="brands-row">
        ${u.map(m=>`<div class="brand-chip${m.marca===i?" best":""}">
          <div class="bc-name">${m.marca} ${m.marca===i?"✅":""}</div>
          <div class="bc-val">${l(m.med)}<span style="font-size:.7rem;font-weight:400">/un</span></div>
        </div>`).join("")}
      </div>
    </div>`}).join("");e.innerHTML=s||'<div class="empty-state">Ao comprar o mesmo tipo de produto com marcas diferentes, o sistema mostrará qual teve menor preço.</div>'}document.getElementById("btn-modal-close").addEventListener("click",()=>{document.getElementById("modal-cors").classList.remove("active")});
