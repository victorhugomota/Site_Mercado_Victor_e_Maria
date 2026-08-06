import{initializeApp as tt}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";import{getFirestore as at,onSnapshot as re,query as ot,collection as J,orderBy as nt,doc as R,deleteDoc as Z,setDoc as H,addDoc as fe,serverTimestamp as $e}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function a(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(n){if(n.ep)return;n.ep=!0;const s=a(n);fetch(n.href,s)}})();const Me=document.createElement("script");Me.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js";document.head.appendChild(Me);const Se=document.createElement("script");Se.src="https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js";document.head.appendChild(Se);const st={apiKey:"AIzaSyANpFnEIkyN1XCT6qbtmVR9wx7sQHEsyrE",authDomain:"comprasmercado-23913.firebaseapp.com",projectId:"comprasmercado-23913",storageBucket:"comprasmercado-23913.firebasestorage.app",messagingSenderId:"317518149234",appId:"1:317518149234:web:94f38624d68a2b9a6634eb",measurementId:"G-2XP88EK37S"},rt=tt(st),C=at(rt),be="compras",ie="entradas",se="faturas",oe="boletos",De="reservas",ee="estimativas";let U=[],Q=[],V=[],q=[],K=[],_={valorAtualGuardado:0},he=null,X=null,Y=[],me=0,ue=!1,ae=[];function l(t){return Number(t||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}function N(t){if(typeof t=="number")return t;if(!t)return 0;const e=parseFloat(String(t).replace(/R\$\s?/gi,"").replace(/\s/g,"").replace(/\./g,"").replace(",","."));return isNaN(e)?0:e}function pe(t){if(!t)return"—";try{return new Date(t).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}catch{return t}}function A(t,e=3500){const a=document.getElementById("toast");a.textContent=t,a.classList.add("show"),setTimeout(()=>a.classList.remove("show"),e)}function G(t,e="var(--accent-amber)"){const a=document.getElementById("status-msg");a&&(a.textContent=t,a.style.color=e)}function it(t){if(!t)return new Date().toISOString().slice(0,16);try{const e=new Date(t);if(isNaN(e.getTime()))return new Date().toISOString().slice(0,16);const a=o=>String(o).padStart(2,"0");return`${e.getFullYear()}-${a(e.getMonth()+1)}-${a(e.getDate())}T${a(e.getHours())}:${a(e.getMinutes())}`}catch{return new Date().toISOString().slice(0,16)}}function lt(t,e){let a=0;const o=new Date(t,e+1,0).getDate();for(let n=1;n<=o;n++){const s=new Date(t,e,n).getDay();s!==0&&s!==6&&a++}return a}window.goTab=function(t){document.querySelectorAll(".tab-content").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".desktop-nav .nav-item").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".mobile-nav .mob-btn").forEach(a=>a.classList.remove("active"));const e=document.getElementById("tab-"+t);e&&e.classList.add("active"),document.querySelectorAll(`[data-tab="${t}"]`).forEach(a=>a.classList.add("active"))};document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>goTab(t.getAttribute("data-tab")))});document.querySelectorAll(".sub-item").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".sub-item").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".sub-tab-content").forEach(a=>a.style.display="none"),t.classList.add("active");const e=document.getElementById("sub-"+t.getAttribute("data-sub"));e&&(e.style.display="block")})});function Oe(){document.getElementById("modal-add-nota").classList.add("active")}function Le(){ue&&xe(),document.getElementById("modal-add-nota").classList.remove("active")}var we;(we=document.getElementById("btn-open-modal-home"))==null||we.addEventListener("click",Oe);var Te;(Te=document.getElementById("btn-mercado-add-nota"))==null||Te.addEventListener("click",Oe);var Be;(Be=document.getElementById("btn-close-modal-add"))==null||Be.addEventListener("click",Le);re(ot(J(C,be),nt("dataEmissao","desc")),t=>{U=t.docs.map(e=>({id:e.id,...e.data()})),W()},t=>console.error("Firestore Mercado:",t));re(J(C,ie),t=>{Q=t.docs.map(e=>({id:e.id,...e.data()})),W()},t=>console.error("Firestore Entradas:",t));re(J(C,se),t=>{V=t.docs.map(e=>({id:e.id,...e.data()})),W()},t=>console.error("Firestore Faturas:",t));re(J(C,oe),t=>{q=t.docs.map(e=>({id:e.id,...e.data()})),W()},t=>console.error("Firestore Boletos:",t));re(R(C,De,"config"),t=>{t.exists()&&(_=t.data()),W()},t=>console.error("Firestore Reservas:",t));re(J(C,ee),t=>{K=t.docs.map(e=>({id:e.id,...e.data()})),W()},t=>console.error("Firestore Estimativas:",t));let E=new Date().toISOString().slice(0,7);const Re=new Set;function le(){const t=new Set,e=new Date().toISOString().slice(0,7);t.add(e);const a=new Date,o=new Date(a.getFullYear(),a.getMonth()+1,1),n=i=>String(i).padStart(2,"0"),s=`${o.getFullYear()}-${n(o.getMonth()+1)}`;return t.add(s),E&&t.add(E),Q.forEach(i=>{i.mesAno&&t.add(i.mesAno)}),V.forEach(i=>{i.mesAno&&t.add(i.mesAno)}),q.forEach(i=>{i.mesAno&&t.add(i.mesAno)}),U.forEach(i=>{i.mesAno&&t.add(i.mesAno)}),K.forEach(i=>{i.mesAno&&t.add(i.mesAno)}),Array.from(t).filter(i=>!Re.has(i)).sort().reverse()}window.excluirMesSelecionadoAtual=function(){window.excluirDadosDoMes(E)};window.selecionarMesGlobal=function(t){if(!t)return;E=t;const e=document.getElementById("inp-seletor-mes-global");e&&(e.value=t);const a=document.getElementById("inp-entradas-mes-ano");a&&(a.value=t);const o=document.getElementById("inp-fatura-vencimento");o&&(o.value=`${t}-10`,typeof atualizarMesRefFatura=="function"&&atualizarMesRefFatura());const n=document.getElementById("inp-boleto-vencimento");n&&(n.value=`${t}-10`,typeof atualizarMesRefBoleto=="function"&&atualizarMesRefBoleto()),W()};window.verMesEIrParaControle=function(t){selecionarMesGlobal(t),typeof goTab=="function"&&goTab("mensal")};function dt(){const t=document.getElementById("seletor-meses-bar"),e=document.getElementById("seletor-meses-bar-salarios"),a=document.getElementById("seletor-meses-bar-estimativa"),o=le();o.includes(E)||(E=o[0]||new Date().toISOString().slice(0,7));const n=document.getElementById("inp-seletor-mes-global");n&&n.value!==E&&(n.value=E);const s=document.getElementById("inp-entradas-mes-ano");s&&s.value!==E&&(s.value=E);const i=o.map(d=>{const[u,m]=d.split("-"),p=new Date(parseInt(u),parseInt(m)-1,1).toLocaleString("pt-BR",{month:"short"}).toUpperCase().replace(".",""),b=d===E;return`
      <button class="sub-item ${b?"active":""}" onclick="selecionarMesGlobal('${d}')" style="${b?"background:var(--secondary);color:#fff;border-color:var(--secondary);box-shadow:0 0 10px rgba(99,102,241,0.4);font-weight:700":"background:rgba(15,23,42,.6);color:var(--text-muted);border:1px solid var(--border-color)"}; display:inline-flex;align-items:center;gap:.35rem">
        📅 ${p}/${u}
      </button>
    `}).join("");t&&(t.innerHTML=i),e&&(e.innerHTML=i),a&&(a.innerHTML=i)}window.switchMensalSub=function(t){document.querySelectorAll("[data-mensal-sub]").forEach(o=>o.classList.remove("active")),document.querySelectorAll(".mensal-sub-content").forEach(o=>o.style.display="none");const e=document.querySelector(`[data-mensal-sub="${t}"]`);e&&e.classList.add("active");const a=document.getElementById(t);a&&(a.style.display="block")};function W(){dt(),ut(),ct(),ke(),Et(),It(),Bt(),Ct(),Lt(),Rt(),Ft(),wt()}function ct(){const t=E,e=Q.filter(h=>h.mesAno===t),a=V.filter(h=>h.mesAno===t),o=q.filter(h=>h.mesAno===t),n=U.filter(h=>h.mesAno===t),s=e.reduce((h,T)=>h+(T.valor||0),0),i=a.reduce((h,T)=>h+(T.valorTotal!==void 0?T.valorTotal:T.valor||0),0),d=o.reduce((h,T)=>h+(T.valorTotal!==void 0?T.valorTotal:T.valor||0),0);let u=0;n.forEach(h=>{h.formasPagamento&&(u+=h.formasPagamento.cartaoDebito||0)});const m=s-i-d-u,v=document.getElementById("m-total-entradas");v&&(v.textContent=l(s));const p=document.getElementById("m-total-cartoes");p&&(p.textContent=l(i));const b=document.getElementById("m-total-boletos");b&&(b.textContent=l(d));const r=document.getElementById("m-mercado-debito");r&&(r.textContent=l(u));const c=document.getElementById("m-saldo-liquido");c&&(c.textContent=l(m),c.style.color=m>=0?"#60a5fa":"#fb7185");const[g,x]=t.split("-"),M=new Date(parseInt(g),parseInt(x)-1,1).toLocaleString("pt-BR",{month:"long"}),w=M.charAt(0).toUpperCase()+M.slice(1),B=document.getElementById("m-lbl-saldo-liquido");B&&(B.textContent=`Saldo Líquido (${w}/${g})`),mt(e,a,o,n)}function mt(t,e,a,o){const n=document.getElementById("content-salarios-mes");n&&(n.innerHTML=`
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header">
          <span class="card-title">💵 Entradas Registradas em ${E}</span>
          <span class="badge green">Total: ${l(t.reduce((u,m)=>u+(m.valor||0),0))}</span>
        </div>
        ${t.length?`<div class="table-responsive"><table class="custom-table">
              <thead><tr><th>Pessoa</th><th>Descrição</th><th>Tipo</th><th class="num">Valor</th><th>Ação</th></tr></thead>
              <tbody>${t.map(u=>`<tr>
                <td><span class="badge ${u.pessoa==="Victor"?"green":u.pessoa==="Maria"?"purple":"cyan"}">${u.pessoa}</span></td>
                <td><strong>${u.descricao}</strong></td>
                <td><span class="badge amber">${u.tipo==="holerite"?"Holerite":"Manual"}</span></td>
                <td class="num" style="color:#34d399"><strong>${l(u.valor)}</strong></td>
                <td><button class="btn-danger" onclick="excluirEntrada('${u.id}')">🗑️</button></td>
              </tr>`).join("")}</tbody>
            </table></div>`:`<div class="empty-state">Nenhuma entrada cadastrada para ${E}. Use a aba "Salários & Entradas" para cadastrar.</div>`}
      </div>
    `);const s=document.getElementById("content-cartoes-mes");if(s){const u=e.reduce((v,p)=>v+(p.valorTotal||0),0),m=e.length?Ve(e,"mes_"+E):"";s.innerHTML=`
      ${m}
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header">
          <span class="card-title">💳 Faturas de Cartão Vencendo em ${E}</span>
          <span class="badge rose">Total: ${l(u)}</span>
        </div>
        ${e.length?e.map(v=>`
              <div class="purchase-card" style="margin-bottom:1rem">
                <div class="purchase-header" onclick="toggleDetail('fat-m-${v.id}')">
                  <div class="purchase-info">
                    <h3>${v.cartao==="Nubank"?"🟣 Nubank":v.cartao==="Santander"?"🔴 Santander":"💳 "+(v.descricao||v.cartao)}</h3>
                    <p>Vencimento: <strong>${v.dataVencimento||"—"}</strong> • ${v.qtdItens||(v.itens?v.itens.length:0)} lançamentos</p>
                  </div>
                  <div class="purchase-values" style="display:flex;align-items:center;gap:.75rem">
                    <div style="text-align:right">
                      <div class="pv-total" style="color:#fb7185">${l(v.valorTotal)}</div>
                      <div class="pv-sub">Clique para ver itens <span class="chevron" id="chev-fat-m-${v.id}">▼</span></div>
                    </div>
                    <button type="button" class="btn-danger" style="padding:.35rem .65rem;font-size:.78rem;margin-left:.25rem" onclick="event.stopPropagation(); excluirFaturaDocumento('${v.id}')" title="Excluir esta fatura de todos os lugares do sistema">
                      🗑️ Excluir
                    </button>
                  </div>
                </div>
                <div id="detail-fat-m-${v.id}" class="purchase-details">
                  <div class="details-toolbar">
                    <span style="font-weight:700;font-size:.9rem;color:var(--text-muted)">Lançamentos da Fatura</span>
                    <button class="btn-danger" onclick="excluirFaturaDocumento('${v.id}')">🗑️ Excluir Fatura</button>
                  </div>
                  ${Ge(v)}
                </div>
              </div>
            `).join(""):`<div class="empty-state">Nenhuma fatura cadastrada com vencimento em ${E}. Use a aba "Cartões de Crédito" para importar.</div>`}
      </div>
    `}const i=document.getElementById("content-boletos-mes");if(i){const u=a.reduce((m,v)=>m+(v.valorTotal||0),0);i.innerHTML=`
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header">
          <span class="card-title">📄 Boletos Vencendo em ${E}</span>
          <span class="badge purple">Total: ${l(u)}</span>
        </div>
        ${a.length?a.map(m=>`
              <div class="purchase-card" style="margin-bottom:1rem">
                <div class="purchase-header" onclick="toggleDetail('bol-m-${m.id}')">
                  <div class="purchase-info">
                    <h3>📄 ${ne(m)}</h3>
                    <p>Vencimento: <strong>${m.dataVencimento||"—"}</strong> • ${m.qtdItens||(m.itens?m.itens.length:0)} encargos</p>
                  </div>
                  <div class="purchase-values" style="display:flex;align-items:center;gap:.5rem">
                    <div style="text-align:right">
                      <div class="pv-total" style="color:#c084fc">${l(m.valorTotal)}</div>
                      <div class="pv-sub">Clique para ver detalhes <span class="chevron" id="chev-bol-m-${m.id}">▼</span></div>
                    </div>
                    <button type="button" class="btn-secondary" style="padding:.35rem .65rem;font-size:.78rem;margin-left:.25rem" onclick="event.stopPropagation(); editarValorBoletoDocumento('${m.id}')" title="Editar valor do boleto">
                      ✏️ Editar
                    </button>
                    <button type="button" class="btn-danger" style="padding:.35rem .65rem;font-size:.78rem" onclick="event.stopPropagation(); excluirBoletoDocumento('${m.id}')" title="Excluir este boleto de todos os lugares do sistema">
                      🗑️ Excluir
                    </button>
                  </div>
                </div>
                <div id="detail-bol-m-${m.id}" class="purchase-details">
                  <div class="details-toolbar">
                    <span style="font-weight:700;font-size:.9rem;color:var(--text-muted)">Detalhamento do Boleto</span>
                    <div style="display:flex;gap:.35rem">
                      <button class="btn-secondary" onclick="editarValorBoletoDocumento('${m.id}')">✏️ Editar Valor</button>
                      <button class="btn-danger" onclick="excluirBoletoDocumento('${m.id}')">🗑️ Excluir Boleto</button>
                    </div>
                  </div>
                  ${Qe(m)}
                </div>
              </div>
            `).join(""):`<div class="empty-state">Nenhum boleto cadastrado para ${E}. Use a aba "Boletos" para importar.</div>`}
      </div>
    `}const d=document.getElementById("content-mercado-mes");if(d){let u=0,m=0,v=0;o.forEach(p=>{p.formasPagamento?(u+=p.formasPagamento.valeAlimentacao||0,m+=p.formasPagamento.cartaoCredito||0,v+=p.formasPagamento.cartaoDebito||0):v+=p.valorAPagar||0}),d.innerHTML=`
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem">
          <span class="card-title">🛒 Compras de Mercado em ${E}</span>
          <div style="display:flex;gap:.4rem;align-items:center;flex-wrap:wrap">
            ${u>0?`<span class="badge green">🥗 Alimentação: ${l(u)}</span>`:""}
            ${m>0?`<span class="badge blue">💳 Crédito: ${l(m)}</span>`:""}
            ${v>0?`<span class="badge amber">💵 Débito: ${l(v)}</span>`:""}
            <span class="badge purple">${o.length} notas cadastradas</span>
          </div>
        </div>
        ${o.length?o.map(p=>`
              <div class="purchase-card" style="margin-bottom:1rem">
                <div class="purchase-header" onclick="toggleDetail('mer-m-${p.id}')">
                  <div class="purchase-info">
                    <h3>🛒 ${p.nomeMercado||"Mercado"}</h3>
                    <p>Data: <strong>${pe(p.dataEmissao)}</strong> • ${p.qtdTotalItens||0} itens</p>
                  </div>
                  <div class="purchase-values">
                    <div class="pv-total" style="color:#fbbf24">${l(p.valorAPagar)}</div>
                    <div class="pv-sub">Clique para ver itens <span class="chevron" id="chev-mer-m-${p.id}">▼</span></div>
                  </div>
                </div>
                <div id="detail-mer-m-${p.id}" class="purchase-details">
                  <div class="details-toolbar">
                    <span style="font-weight:700;font-size:.9rem;color:var(--text-muted)">Itens da Nota</span>
                    <button class="btn-danger" onclick="excluirCompraDocumento('${p.id}')">🗑️ Excluir Nota</button>
                  </div>
                  ${Xe(p)}
                </div>
              </div>
            `).join(""):`<div class="empty-state">Nenhuma nota de mercado cadastrada para ${E}.</div>`}
      </div>
    `}}function ut(){const t=le();let e=0,a=0,o=0,n=0,s=0;t.forEach(r=>{const c=Q.filter(w=>w.mesAno===r).reduce((w,B)=>w+(B.valor||0),0),g=V.filter(w=>w.mesAno===r).reduce((w,B)=>w+(B.valorTotal!==void 0?B.valorTotal:B.valor||0),0),x=q.filter(w=>w.mesAno===r).reduce((w,B)=>w+(B.valorTotal!==void 0?B.valorTotal:B.valor||0),0);let I=0;U.filter(w=>w.mesAno===r).forEach(w=>{w.formasPagamento&&(I+=w.formasPagamento.cartaoDebito||0)});const M=c-g-x-I;e+=c,a+=g,o+=x,n+=I,s+=M});let i=0,d=0;const u={};U.forEach(r=>{const c=r.valorAPagar||0;r.formasPagamento&&(i+=r.formasPagamento.valeAlimentacao||0,d+=r.formasPagamento.cartaoCredito||0);const g=r.mesAno||"Outros";u[g]=(u[g]||0)+c});const m=_&&_.valorAtualGuardado!==void 0?_.valorAtualGuardado:3e3,v=s+m;document.getElementById("fin-total-entradas").textContent=l(e);const p=document.getElementById("fin-subtext-entradas");p&&(p.textContent="Soma Total das Entradas da Tabela Mensal"),document.getElementById("fin-total-cartoes").textContent=l(a),document.getElementById("fin-total-boletos").textContent=l(o),document.getElementById("fin-mercado-debito").textContent=l(n),document.getElementById("fin-saldo-liquido").textContent=l(s),document.getElementById("fin-saldo-liquido").style.color=s>=0?"#60a5fa":"#fb7185";const b=document.getElementById("fin-subtext-saldo");b&&(b.innerHTML=`Saldo Líquido + Reserva Guardada (${l(m)}): <strong style="color:#34d399">${l(v)}</strong>`),document.getElementById("dash-alimentacao").textContent=l(i),document.getElementById("dash-credito").textContent=l(d),document.getElementById("dash-debito").textContent=l(n),pt(),Fe(u)}function pt(){const t=document.getElementById("tabela-resumo-mensal");if(!t)return;const e=le();if(!e.length){t.innerHTML='<div class="empty-state">Nenhum dado cadastrado ainda.</div>';return}const a=e.map(o=>{const n=Q.filter(c=>c.mesAno===o).reduce((c,g)=>c+(g.valor||0),0),s=V.filter(c=>c.mesAno===o).reduce((c,g)=>c+(g.valorTotal!==void 0?g.valorTotal:g.valor||0),0),i=q.filter(c=>c.mesAno===o).reduce((c,g)=>c+(g.valorTotal!==void 0?g.valorTotal:g.valor||0),0);let d=0;U.filter(c=>c.mesAno===o).forEach(c=>{c.formasPagamento&&(d+=c.formasPagamento.cartaoDebito||0)});const u=n-s-i-d,[m,v]=o.split("-"),b=new Date(parseInt(m),parseInt(v)-1,1).toLocaleString("pt-BR",{month:"short"}).toUpperCase().replace(".","");return`
      <tr style="${o===E?"background:rgba(99,102,241,0.1)":""}">
        <td><strong>📅 ${b}/${m}</strong></td>
        <td style="color:#34d399"><strong>${l(n)}</strong></td>
        <td style="color:#fb7185">${l(s)}</td>
        <td style="color:#c084fc">${l(i)}</td>
        <td style="color:#fbbf24">${l(d)}</td>
        <td style="color:${u>=0?"#60a5fa":"#fb7185"}; font-weight:800">${l(u)}</td>
        <td>
          <div style="display:flex;gap:.35rem;align-items:center">
            <button class="btn-secondary" style="padding:.25rem .65rem; font-size:.78rem" onclick="verMesEIrParaControle('${o}')">
              🔍 Ver Mês
            </button>
            <button class="btn-danger" style="padding:.25rem .65rem; font-size:.78rem" onclick="excluirDadosDoMes('${o}')">
              🗑️ Excluir
            </button>
          </div>
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
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          ${a}
        </tbody>
      </table>
    </div>
  `}window.excluirDadosDoMes=async function(t){const e=t||E;if(!e)return;const[a,o]=e.split("-"),s=new Date(parseInt(a),parseInt(o)-1,1).toLocaleString("pt-BR",{month:"long"}),i=`${s.charAt(0).toUpperCase()+s.slice(1)} de ${a}`,d=Q.filter(r=>r.mesAno===e),u=V.filter(r=>r.mesAno===e),m=q.filter(r=>r.mesAno===e),v=U.filter(r=>r.mesAno===e),p=K.filter(r=>r.id===e),b=`⚠️ TEM CERTEZA QUE DESEJA EXCLUIR O MÊS ${i.toUpperCase()} (${e})?

Isso irá APAGAR PERMANENTEMENTE todos os registros vinculados a este mês:
• ${d.length} Salário(s) / Entrada(s)
• ${u.length} Fatura(s) de Cartão
• ${m.length} Boleto(s) & Conta(s)
• ${v.length} Nota(s) de Mercado
• Estimativa orçamentária do mês

Esta ação é irreversível. Confirmar exclusão do mês?`;if(confirm(b))try{const r=[];d.forEach(g=>r.push(Z(R(C,ie,g.id)))),u.forEach(g=>r.push(Z(R(C,se,g.id)))),m.forEach(g=>r.push(Z(R(C,oe,g.id)))),v.forEach(g=>r.push(Z(R(C,be,g.id)))),p.forEach(g=>r.push(Z(R(C,ee,g.id)))),r.length>0&&await Promise.all(r),Re.add(e),A(`🗑️ O mês ${i} e todos os seus dados foram excluídos com sucesso!`),E=le()[0]||new Date().toISOString().slice(0,7),W()}catch(r){alert("Erro ao excluir dados do mês: "+r.message)}};function Fe(t){var s;if(typeof Chart>"u")return setTimeout(()=>Fe(t),300);const e=(s=document.getElementById("chart-barras"))==null?void 0:s.getContext("2d");if(!e)return;const a=Object.keys(t).sort(),o=a.map(i=>{const[d,u]=i.split("-");return`${u}/${d}`}),n=a.map(i=>t[i]);he&&he.destroy(),he=new Chart(e,{type:"bar",data:{labels:o.length?o:["Sem compras"],datasets:[{label:"Gasto Mercado R$",data:n.length?n:[0],backgroundColor:"rgba(16,185,129,0.78)",borderColor:"#10b981",borderWidth:2,borderRadius:8}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:i=>` ${l(i.raw)}`}}},scales:{y:{beginAtZero:!0,grid:{color:"rgba(255,255,255,.05)"},ticks:{color:"#94a3b8",callback:i=>"R$"+i}},x:{grid:{display:!1},ticks:{color:"#94a3b8"}}}}})}function ze(t){if(!t)return 0;const e=t.match(/L[íi]quido(?:\s*a\s*receber)?\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/TOTAL\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/SAL[ÁA]RIO\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/VALOR\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i);return e?N(e[1]):0}function vt(){const t=document.getElementById("inp-entradas-mes-ano");if(t&&!t.value){const e=new Date,a=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0");t.value=`${a}-${o}`}}setTimeout(vt,300);let te="mes";window.toggleFiltroEntradasTabela=function(t){te=t,ke()};document.getElementById("form-holerite-victor").addEventListener("submit",async t=>{t.preventDefault();const e=E||document.getElementById("inp-entradas-mes-ano").value||new Date().toISOString().slice(0,7),a=document.getElementById("inp-holerite-txt-victor").value;let o=parseFloat(document.getElementById("inp-salario-val-victor").value)||0;if(!o&&a&&(o=ze(a)),!o){A("⚠️ Digite ou cole um holerite válido com valor.");return}const n=`salario_victor_${e}`;await H(R(C,ie,n),{pessoa:"Victor",tipo:"holerite",descricao:`Salário Líquido Victor (${e})`,valor:o,mesAno:e,data:new Date().toISOString()}),document.getElementById("inp-holerite-txt-victor").value="",document.getElementById("inp-salario-val-victor").value="",A(`✅ Salário do Victor (${e}) salvo com sucesso!`)});document.getElementById("form-holerite-maria").addEventListener("submit",async t=>{t.preventDefault();const e=E||document.getElementById("inp-entradas-mes-ano").value||new Date().toISOString().slice(0,7),a=document.getElementById("inp-holerite-txt-maria").value;let o=parseFloat(document.getElementById("inp-salario-val-maria").value)||0;if(!o&&a&&(o=ze(a)),!o){A("⚠️ Digite ou cole um holerite válido com valor.");return}const n=`salario_maria_${e}`;await H(R(C,ie,n),{pessoa:"Maria",tipo:"holerite",descricao:`Salário Líquido Maria (${e})`,valor:o,mesAno:e,data:new Date().toISOString()}),document.getElementById("inp-holerite-txt-maria").value="",document.getElementById("inp-salario-val-maria").value="",A(`✅ Salário da Maria (${e}) salvo com sucesso!`)});document.getElementById("form-entrada-manual").addEventListener("submit",async t=>{t.preventDefault();const e=E||document.getElementById("inp-entradas-mes-ano").value||new Date().toISOString().slice(0,7),a=document.getElementById("inp-ent-desc").value.trim(),o=parseFloat(document.getElementById("inp-ent-val").value)||0,n=document.getElementById("inp-ent-pessoa").value;!a||!o||(await fe(J(C,ie),{pessoa:n,tipo:"manual",descricao:a,valor:o,mesAno:e,data:new Date().toISOString()}),t.target.reset(),A(`🎉 Entrada manual (${e}) registrada!`))});function ke(){var u,m,v;const t=E||((u=document.getElementById("inp-entradas-mes-ano"))==null?void 0:u.value)||new Date().toISOString().slice(0,7),e=document.getElementById("lbl-entradas-mes-ref");if(e){const[p,b]=t.split("-"),c=new Date(parseInt(p),parseInt(b)-1,1).toLocaleString("pt-BR",{month:"long"}),g=c.charAt(0).toUpperCase()+c.slice(1);e.textContent=`Visualizando e inserindo entradas para: ${g} de ${p}`}const a=((m=Q.find(p=>p.pessoa==="Victor"&&p.tipo==="holerite"&&p.mesAno===t))==null?void 0:m.valor)||0,o=((v=Q.find(p=>p.pessoa==="Maria"&&p.tipo==="holerite"&&p.mesAno===t))==null?void 0:v.valor)||0,n=Q.filter(p=>p.mesAno===t),s=n.reduce((p,b)=>p+(b.valor||0),0);document.getElementById("val-salario-victor").textContent=l(a),document.getElementById("val-salario-maria").textContent=l(o),document.getElementById("val-entradas-combinado").textContent=`${l(s)}`;const i=document.getElementById("lista-entradas-registradas");if(!i)return;const d=te==="mes"?n:Q;if(!d.length){i.innerHTML=`
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;flex-wrap:wrap;gap:.5rem">
        <span style="font-size:.84rem;color:var(--text-muted)">Modo de Exibição da Tabela:</span>
        <div style="display:flex;gap:.35rem">
          <button type="button" class="btn-secondary" style="padding:.25rem .6rem;font-size:.78rem;${te==="mes"?"background:var(--secondary);color:#fff":""}" onclick="toggleFiltroEntradasTabela('mes')">📅 Mês (${t})</button>
          <button type="button" class="btn-secondary" style="padding:.25rem .6rem;font-size:.78rem;${te==="todos"?"background:var(--secondary);color:#fff":""}" onclick="toggleFiltroEntradasTabela('todos')">🌐 Todas as Entradas</button>
        </div>
      </div>
      <div class="empty-state">Nenhuma entrada registrada para ${te==="mes"?"o mês "+t:"o sistema"}.</div>
    `;return}i.innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.75rem;flex-wrap:wrap;gap:.5rem">
      <span style="font-size:.84rem;color:var(--text-muted);font-weight:600">Exibindo ${d.length} entrada(s) em tabela:</span>
      <div style="display:flex;gap:.35rem">
        <button type="button" class="btn-secondary" style="padding:.25rem .6rem;font-size:.78rem;${te==="mes"?"background:var(--secondary);color:#fff":""}" onclick="toggleFiltroEntradasTabela('mes')">📅 Mês ${t}</button>
        <button type="button" class="btn-secondary" style="padding:.25rem .6rem;font-size:.78rem;${te==="todos"?"background:var(--secondary);color:#fff":""}" onclick="toggleFiltroEntradasTabela('todos')">🌐 Todas</button>
      </div>
    </div>
    <div class="table-responsive"><table class="custom-table">
      <thead><tr><th>Mês / Ref</th><th>Descrição</th><th>Pessoa</th><th>Tipo</th><th class="num">Valor</th><th>Ação</th></tr></thead>
      <tbody>${d.map(p=>`<tr>
        <td><span class="badge green">${p.mesAno||"—"}</span></td>
        <td><strong>${p.descricao}</strong></td>
        <td><span class="badge ${p.pessoa==="Victor"?"green":p.pessoa==="Maria"?"purple":"cyan"}">${p.pessoa}</span></td>
        <td><span class="badge amber">${p.tipo==="holerite"?"Holerite":"Manual"}</span></td>
        <td class="num" style="color:#34d399"><strong>${l(p.valor)}</strong></td>
        <td><button class="btn-danger" onclick="excluirEntrada('${p.id}')">🗑️</button></td>
      </tr>`).join("")}</tbody>
    </table></div>
  `}window.excluirEntrada=async function(t){confirm("Excluir esta entrada?")&&(await Z(R(C,ie,t)),A("🗑️ Entrada removida."))};let Ae="Nubank",k=null;function gt(){const t=document.getElementById("inp-fatura-vencimento");if(t&&!t.value){const e=new Date,a=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0");t.value=`${a}-${o}-10`,atualizarMesRefFatura()}}setTimeout(gt,300);window.atualizarMesRefFatura=function(){const t=document.getElementById("inp-fatura-vencimento"),e=document.getElementById("lbl-fatura-mes-ref");if(!(!t||!e))if(t.value){const[a,o]=t.value.split("-"),s=new Date(parseInt(a),parseInt(o)-1,1).toLocaleString("pt-BR",{month:"long"});e.textContent=`Fatura ${s.charAt(0).toUpperCase()+s.slice(1)}/${a}`}else e.textContent="Mês da Fatura"};window.selecionarCartaoFatura=function(t){Ae=t,document.querySelectorAll(".btn-card-select").forEach(a=>a.classList.remove("active"));const e=document.querySelector(`.btn-card-select[data-card="${t}"]`);e&&e.classList.add("active"),A(`Cartão selecionado: ${t}`)};window.handleFileFaturaSelect=async function(t){const e=t.target.files[0];if(!e)return;const a=document.getElementById("txt-file-fatura");a&&(a.textContent=`📄 Arquivo: ${e.name}`),A(`⏳ Lendo arquivo da fatura (${e.name})...`);let o="";if(e.type==="application/pdf"||e.name.endsWith(".pdf"))o=await Pe(e);else try{o=await e.text()}catch{o=""}o?(document.getElementById("inp-fatura-txt").value=o,await qe(o,Ae)):A("❌ Não foi possível ler o texto do arquivo da fatura.")};async function Pe(t){try{const e=await t.arrayBuffer();if(typeof pdfjsLib>"u")return A("⚠️ Aguarde a biblioteca de PDF carregar..."),"";pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";let a=pdfjsLib.getDocument({data:e});a.onPassword=(s,i)=>{let d=prompt(`🔒 Este PDF de fatura está protegido por senha.
Digite a senha para abrir (ex: CPF ou Data de Nascimento):`);d?s(d):A("⚠️ Senha não informada. Leitura do PDF cancelada.")};const o=await a.promise;let n="";for(let s=1;s<=o.numPages;s++){const d=await(await o.getPage(s)).getTextContent();let u=null,m="";for(const v of d.items){if(!v.str)continue;const p=v.transform?v.transform[5]:null;u!==null&&Math.abs(p-u)>3?m+=`
`:m.length>0&&!m.endsWith(`
`)&&!m.endsWith(" ")&&(m+=" "),m+=v.str,u=p}n+=m+`
`}return n}catch(e){return e.name==="PasswordException"?A("🔒 O PDF precisa de senha válida para ser aberto."):console.error("Erro ao ler PDF:",e),""}}function ft(t){if(!t)return null;const e=t.match(/Total\s*a\s*Pagar\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/no\s*valor\s*de\s*R?\$\s*([\d\.,]+)/i)||t.match(/Valor\s*total\s*da\s*fatura\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/Total\s*da\s*fatura\s*[:\s]*R?\$\s*([\d\.,]+)/i);if(e){const a=N(e[1]);if(a>0)return a}return null}function bt(t){if(!t)return null;const e=t.match(/Vencimento\s*[:\s]*(\d{2}[\/\.-]\d{2}[\/\.-]\d{4})/i)||t.match(/Data\s*de\s*vencimento\s*[:\s]*(\d{2})\s+([A-Za-z]{3})\s+(\d{4})/i)||t.match(/FATURA\s+(\d{2})\s+([A-Za-z]{3})\s+(\d{4})/i);if(e){if(e[2]&&e[3]){const a=e[1],o=e[2].toUpperCase(),n=e[3],i={JAN:"01",FEB:"02",MAR:"03",ABR:"04",APR:"04",MAI:"05",MAY:"05",JUN:"06",JUL:"07",AGO:"08",AUG:"08",SET:"09",SEP:"09",OUT:"10",OCT:"10",NOV:"11",DEZ:"12",DEC:"12"}[o]||"07";return`${n}-${i}-${a.padStart(2,"0")}`}else if(e[1]){const[a,o,n]=e[1].split(/[\/\.-]/);return`${n}-${o.padStart(2,"0")}-${a.padStart(2,"0")}`}}return null}window.importarFaturaManualOuArquivo=async function(){const t=document.getElementById("inp-fatura-txt").value.trim();if(!t){A("⚠️ Selecione o arquivo da fatura (.pdf, .csv) ou cole o texto da fatura.");return}await qe(t,Ae)};async function qe(t,e){const a=bt(t);a&&(document.getElementById("inp-fatura-vencimento").value=a,atualizarMesRefFatura());const o=ft(t),n=yt(t),s=document.getElementById("inp-fatura-vencimento").value||new Date().toISOString().slice(0,10),i=s.slice(0,7),d=n.reduce((b,r)=>b+r.valor,0),u=o||d||0,m=e?`Cartão ${e}`:"Fatura Cartão";k={cartao:e||"Nubank",descricao:m,dataVencimento:s,mesAno:i,valorTotal:u,qtdItens:n.length,itens:n};const v=document.getElementById("inp-revisao-fatura-desc");v&&(v.value=m);const p=document.getElementById("inp-revisao-fatura-val");p&&(p.value=u?u.toFixed(2):""),Ne(),n.length>0?A(`✅ ${n.length} compras encontradas! Fatura total: ${l(u)}.`):A("ℹ️ Fatura pronta para revisão. Confirme o valor total e o cartão abaixo.")}window.atualizarValorTotalRevisaoFatura=function(){var e;if(!k)return;const t=parseFloat((e=document.getElementById("inp-revisao-fatura-val"))==null?void 0:e.value)||0;k.valorTotal=t,document.getElementById("badge-total-preview-fatura").textContent=l(t)};function Ne(){if(!k)return;const{valorTotal:t,itens:e,cartao:a,descricao:o}=k;document.getElementById("badge-total-preview-fatura").textContent=l(t);const n=document.getElementById("inp-revisao-fatura-desc");n&&(!n.value||n.value==="Fatura Cartão")&&(n.value=o||`Cartão ${a||"Nubank"}`);const s=document.getElementById("inp-revisao-fatura-val");s&&(!s.value||parseFloat(s.value)===0)&&(s.value=t?t.toFixed(2):"");const i=document.getElementById("lista-preview-fatura-itens");!e||!e.length?i.innerHTML='<div class="empty-state">Nenhum item individual extraído. O valor total acima será considerado.</div>':i.innerHTML=e.map((u,m)=>`
      <div style="display:flex; justify-content:space-between; align-items:center; padding:.4rem 0; border-bottom:1px dashed var(--border-color); font-size:.82rem;">
        <span><strong>${u.dataCompra||"—"}</strong> — ${u.descricao}</span>
        <div style="display:flex; align-items:center; gap:.75rem;">
          <span style="color:#fb7185; font-weight:700;">${l(u.valor)}</span>
          <button type="button" class="btn-danger" style="padding:.15rem .45rem; font-size:.75rem;" onclick="removerItemRevisaoFatura(${m})">🗑️</button>
        </div>
      </div>
    `).join("");const d=document.getElementById("box-revisao-fatura");d.style.display="block",d.scrollIntoView({behavior:"smooth"})}window.removerItemRevisaoFatura=function(t){if(!k||!k.itens)return;k.itens.splice(t,1);const e=k.itens.reduce((a,o)=>a+o.valor,0);if(e>0){k.valorTotal=e;const a=document.getElementById("inp-revisao-fatura-val");a&&(a.value=e.toFixed(2))}k.qtdItens=k.itens.length,Ne(),A("🗑️ Item removido da revisão da fatura.")};window.confirmarEGravarFaturaDocumento=async function(){var o,n;if(!k)return;const t=(o=document.getElementById("inp-revisao-fatura-desc"))==null?void 0:o.value.trim(),e=parseFloat((n=document.getElementById("inp-revisao-fatura-val"))==null?void 0:n.value)||0,a=document.getElementById("inp-fatura-vencimento").value||new Date().toISOString().slice(0,10);if(!e){A("⚠️ Digite ou confirme o valor total da fatura.");return}k.cartao=t||k.cartao||"Cartão",k.valorTotal=e,k.dataVencimento=a,k.mesAno=a.slice(0,7);try{await fe(J(C,se),{...k,createdAt:$e()}),document.getElementById("box-revisao-fatura").style.display="none",document.getElementById("inp-fatura-txt").value="";const s=document.getElementById("txt-file-fatura");s&&(s.textContent="Clique para Selecionar o Arquivo da Fatura");const i=l(k.valorTotal);k=null,A(`🎉 Fatura de ${i} salva com sucesso!`)}catch(s){alert("Erro ao salvar fatura: "+s.message)}};function yt(t){if(!t)return[];const e=[],a=/(?:[@\)\(\*•\s]+)?(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+(?:(\d{2}\/\d{2})\s+)?(-?R?\$\s*[\d\.]+,\d{2}|-?[\d\.]+,\d{2})/gi;if(t.split(`
`).forEach(n=>{const s=n.trim();if(!s||/EMISS[ÃA]O|TRANSA[ÇC][ÕO]ES|RESUMO|PAGAMENTO DE FATURA|TOTAL DA FATURA|FATURA ANTERIOR|SALDO ANTERIOR|LIMITE DISPON[ÍI]VEL|OPÇÕES DE PAGAMENTO|ALTERNATIVAS DE PAGAMENTO|PAGAMENTO E DEMAIS|PARCELAMENTOS|DESPESAS|HISTÓRICO DE FATURAS|SUPERCRÉDITO|SAQUE À CRÉDITO|COMPRA DATA DESCRIÇÃO/i.test(s))return;const i=/(?:[@\)\(\*•\s]+)?(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+(?:(\d{2}\/\d{2})\s+)?(-?R?\$\s*[\d\.]+,\d{2}|-?[\d\.]+,\d{2})$/i,d=s.match(i)||s.match(/(?:[@\)\(\*•\s]+)?(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+(?:(\d{2}\/\d{2})\s+)?(-?R?\$\s*[\d\.]+,\d{2}|-?[\d\.]+,\d{2})/i);if(d){const u=d[1];let m=d[2].trim();const v=d[3],p=d[4];if(p.includes("-")||/DEB AUTOM|PAGAMENTO|PAGTO|CR[ÉE]DITO FATURA/i.test(m))return;const b=N(p);v&&(m+=` (${v})`),m&&b>0&&m.length>2&&!/fatura|limite|pagamento|saldo|alternativas|opções|período|emissão|vencimento/i.test(m)&&e.push({dataCompra:u,descricao:m,valor:b})}}),e.length===0){let n;for(;(n=a.exec(t))!==null;){const s=n[1];let i=n[2].trim();const d=n[3],u=n[4];if(u.includes("-")||/DEB AUTOM|PAGAMENTO|PAGTO|CR[ÉE]DITO FATURA/i.test(i))continue;const m=N(u);d&&(i+=` (${d})`),i&&m>0&&i.length>2&&!/fatura|limite|pagamento|saldo|alternativas|opções|período|emissão|vencimento/i.test(i)&&e.push({dataCompra:s,descricao:i,valor:m})}}return e}window.ultimosLocaisAnalisados={};function Ue(t){if(!t)return"DIVERSOS";let e=t.replace(/\(\d{1,2}\/\d{1,2}\)/gi,"").replace(/\b\d{1,2}\/\d{1,2}\b/gi,"").replace(/\b\d{1,2}x\b/gi,"").trim();return e=e.replace(/\s+/g," "),e.toUpperCase()}function je(t){const e={};(Array.isArray(t)?t:[t]).forEach(n=>{!n||!n.itens||!Array.isArray(n.itens)||n.itens.forEach(s=>{if(!s.descricao||!s.valor)return;const i=Ue(s.descricao);e[i]||(e[i]={nome:i,qtd:0,valorTotal:0,compras:[]}),e[i].qtd+=1,e[i].valorTotal+=s.valor||0,e[i].compras.push({dataCompra:s.dataCompra||"—",descricao:s.descricao,valor:s.valor||0,cartao:n.cartao||"Cartão",mesAno:n.mesAno||"—"})})});const o=Object.values(e).filter(n=>n.qtd>=2);return o.sort((n,s)=>s.valorTotal-n.valorTotal),o}function Ve(t,e="geral"){const a=je(t);if(a.forEach(n=>{window.ultimosLocaisAnalisados[`${e}_${n.nome}`]=n}),!a.length)return`
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
  `}window.abrirModalComprasEstabelecimento=function(t){const e=window.ultimosLocaisAnalisados[t];if(!e){A("⚠️ Não foi possível carregar os detalhes do estabelecimento.");return}let a=document.getElementById("modal-detalhes-estabelecimento");if(!a){const n=document.createElement("div");n.id="modal-detalhes-estabelecimento",n.className="modal-overlay",n.innerHTML=`
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
  `,a.style.display="flex"};window.fecharModalEstabelecimento=function(){const t=document.getElementById("modal-detalhes-estabelecimento");t&&(t.style.display="none")};function Ee(t){if(!t)return{nome:"Outros & Diversos",icone:"📦",cor:"blue"};const e=t.toUpperCase();return e.includes("ZARA")||e.includes("RENNER")||e.includes("C&A")||e.includes("RIACHUELO")||e.includes("ROUPA")||e.includes("VESTUARIO")||e.includes("SAPATO")||e.includes("CALCADO")||e.includes("CENTAURO")||e.includes("NIKE")||e.includes("ADIDAS")||e.includes("SHEIN")||e.includes("DAFITI")?{nome:"Vestuário & Roupas",icone:"👗",cor:"rose"}:e.includes("VIAGEM")||e.includes("AIRBNB")||e.includes("BOOKING")||e.includes("HOTEL")||e.includes("POUSADA")||e.includes("DECOLAR")||e.includes("LATAM")||e.includes("GOL")||e.includes("AZUL")||e.includes("FLIGHT")||e.includes("PASSAGEM")||e.includes("PASSAGENS")?{nome:"Viagens & Hospedagem",icone:"✈️",cor:"purple"}:e.includes("AUTOPOSTO")||e.includes("POSTO")||e.includes("UBER")||e.includes("99")||e.includes("SHELL")||e.includes("IPIRANGA")||e.includes("PETROBRAS")||e.includes("COMBUSTIVEL")||e.includes("PEDAGIO")?{nome:"Transporte & Combustível",icone:"⛽",cor:"amber"}:e.includes("SAVEGNAGO")||e.includes("TONELLI")||e.includes("SUPERMERCADO")||e.includes("MERCADO")||e.includes("ATACADAO")||e.includes("CARREFOUR")||e.includes("PAO DE ACUCAR")||e.includes("MARTINS")?{nome:"Supermercado & Alimentação",icone:"🛒",cor:"green"}:e.includes("SORVETERIA")||e.includes("PIZZA")||e.includes("BURGER")||e.includes("IFOOD")||e.includes("RESTAURANTE")||e.includes("BAR")||e.includes("PUB")||e.includes("DELICIAS")||e.includes("CHOCOLATE")||e.includes("CINEMA")||e.includes("OUTBACK")||e.includes("MC DONALDS")||e.includes("KFC")?{nome:"Restaurantes & Lazer",icone:"🍕",cor:"orange"}:e.includes("COSMETICO")||e.includes("COSMETICOS")||e.includes("FARMACIA")||e.includes("DROGARIA")||e.includes("DROGASIL")||e.includes("PAGUE MENOS")||e.includes("PERFUMARIA")||e.includes("NATURA")||e.includes("BOTICARIO")||e.includes("ESSENCIA")?{nome:"Saúde & Cosméticos",icone:"💄",cor:"pink"}:e.includes("AMAZON")||e.includes("MERCADO LIVRE")||e.includes("MAGALU")||e.includes("MAGAZINE")||e.includes("SHOPEE")||e.includes("ALIEXPRESS")||e.includes("FAST SHOP")||e.includes("APPLE")||e.includes("KABUM")?{nome:"Eletrônicos & Shopping",icone:"📱",cor:"cyan"}:{nome:"Outros & Diversos",icone:"📦",cor:"blue"}}function ht(t){if(!t||!t.length)return"";const e=[];t.forEach(r=>{r.itens&&Array.isArray(r.itens)&&r.itens.forEach(c=>{c.descricao&&c.valor&&e.push({...c,cartao:r.cartao||"Cartão",mesAno:r.mesAno||"Outros"})})});const a=t.reduce((r,c)=>r+(c.valorTotal!==void 0?c.valorTotal:c.valor||0),0),o={};e.forEach(r=>{const c=Ue(r.descricao);o[c]||(o[c]={nome:c,valorTotal:0,qtd:0}),o[c].valorTotal+=r.valor,o[c].qtd+=1});const n=Object.values(o).sort((r,c)=>c.valorTotal-r.valorTotal).slice(0,5),s={};e.forEach(r=>{const c=Ee(r.descricao);s[c.nome]||(s[c.nome]={...c,valorTotal:0,qtd:0}),s[c.nome].valorTotal+=r.valor,s[c.nome].qtd+=1});const i=Object.values(s).sort((r,c)=>c.valorTotal-r.valorTotal),d={};t.forEach(r=>{const c=r.mesAno||"Outros";d[c]||(d[c]=[]),d[c].push(r)});const u=Object.keys(d).sort((r,c)=>c.localeCompare(r)),m=u[0],v=u[1];let p="",b="";if(m&&v){let w=function(f){if(!f||!f.includes("-"))return f;const[$,F]=f.split("-"),L=new Date(parseInt($),parseInt(F)-1,1).toLocaleString("pt-BR",{month:"long"});return`${L.charAt(0).toUpperCase()+L.slice(1)}/${$}`};const r=d[m]||[],c=d[v]||[],g=r.reduce((f,$)=>f+($.valorTotal!==void 0?$.valorTotal:$.valor||0),0),x=c.reduce((f,$)=>f+($.valorTotal!==void 0?$.valorTotal:$.valor||0),0),I=g-x,M=x>0?(I/x*100).toFixed(1):0,B=w(m),h=w(v),T={},S={};r.forEach(f=>{f.itens&&f.itens.forEach($=>{const F=Ee($.descricao).nome;T[F]=(T[F]||0)+($.valor||0)})}),c.forEach(f=>{f.itens&&f.itens.forEach($=>{const F=Ee($.descricao).nome;S[F]=(S[F]||0)+($.valor||0)})});const j=Array.from(new Set([...Object.keys(T),...Object.keys(S)])),z=[];j.forEach(f=>{const $=T[f]||0,F=S[f]||0,O=$-F;if(O>50){const L=F>0?(O/F*100).toFixed(0):"100+";z.push({categoria:f,vAtual:$,vAnterior:F,difCat:O,pctCat:L})}}),z.sort((f,$)=>$.difCat-f.difCat);let D=I>0?"📈":"📉",y=I>0?"+":"";p=`
      <div style="background:rgba(15,23,42,0.7); border:1px solid var(--border-color); border-radius:10px; padding:.85rem 1rem; margin-bottom:1rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:.75rem">
        <div>
          <span style="font-size:.82rem; color:var(--text-muted); display:block">⚖️ Comparativo Mês Atual (${B}) vs Mês Anterior (${h})</span>
          <div style="font-size:1.05rem; font-weight:700; color:#f8fafc; margin-top:.2rem">
            ${l(g)} <span style="font-size:.82rem; font-weight:400; color:var(--text-muted)">em ${B}</span> vs ${l(x)} <span style="font-size:.82rem; font-weight:400; color:var(--text-muted)">em ${h}</span>
          </div>
        </div>
        <div style="text-align:right">
          <span class="badge ${I>0?"rose":"green"}" style="font-size:.88rem; padding:.35rem .75rem">
            ${D} Variação: ${y}${l(I)} (${y}${M}%)
          </span>
        </div>
      </div>
    `,z.length>0?b=`
        <div style="margin-top:1rem; background:rgba(251,113,133,0.08); border:1px dashed rgba(251,113,133,0.35); border-radius:10px; padding:.85rem 1rem">
          <div style="font-weight:700; font-size:.9rem; color:#fb7185; margin-bottom:.5rem; display:flex; align-items:center; gap:.4rem">
            💡 DICAS DE ECONOMIA & RECOMENDAÇÕES (Categorias com Aumento em ${B}):
          </div>
          <div style="display:flex; flex-direction:column; gap:.5rem">
            ${z.map(f=>`
              <div style="font-size:.83rem; color:#f1f5f9; background:rgba(15,23,42,0.8); border-left:3px solid #fb7185; padding:.5rem .75rem; border-radius:4px">
                🚨 <strong>${f.categoria}</strong>: Gastos subiram <strong style="color:#fb7185">+${l(f.difCat)} (+${f.pctCat}%)</strong> em relação a ${h} (${l(f.vAtual)} vs ${l(f.vAnterior)}).
                <span style="color:var(--text-muted); display:block; margin-top:.2rem">👉 <em>Recomendação: Para o próximo mês, busque limitar os gastos nesta categoria para equilibrar o orçamento.</em></span>
              </div>
            `).join("")}
          </div>
        </div>
      `:b=`
        <div style="margin-top:1rem; background:rgba(16,185,129,0.08); border:1px dashed rgba(16,185,129,0.35); border-radius:10px; padding:.85rem 1rem">
          <div style="font-weight:700; font-size:.9rem; color:#34d399; display:flex; align-items:center; gap:.4rem">
            👏 EXCELENTE DESEMPENHO!
          </div>
          <p style="font-size:.83rem; color:#f1f5f9; margin-top:.25rem">
            Nenhuma categoria apresentou aumento expressivo de gastos em relação a ${h}. Você manteve seus gastos sob controle neste mês!
          </p>
        </div>
      `}return`
    <div class="card" style="margin-bottom:1.5rem; background:linear-gradient(135deg,rgba(30,41,59,.98),rgba(15,23,42,.99)); border-color:#a855f7; box-shadow:0 4px 22px rgba(168,85,247,0.18)">
      <div class="card-header" style="flex-wrap:wrap; gap:.5rem">
        <div>
          <span class="card-title" style="color:#c084fc; font-size:1.1rem">📊 ANÁLISE DE GASTOS DO CARTÃO DE CRÉDITO & ECONOMIA</span>
          <p style="font-size:.78rem; color:var(--text-muted); margin-top:.2rem">Visão consolidada por Estabelecimentos Top, Categorias de Consumo e Comparativo com o Mês Anterior.</p>
        </div>
        <span class="badge purple" style="font-size:.85rem; padding:.35rem .75rem">Total em Cartões: ${l(a)}</span>
      </div>

      ${p}

      <!-- Grid 2 Colunas: Top Locais vs Categorias -->
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:1rem; margin-top:1rem">
        
        <!-- Coluna 1: Top 5 Locais em R$ -->
        <div style="background:rgba(15,23,42,0.6); border:1px solid var(--border-color); border-radius:10px; padding:.85rem 1rem">
          <div style="font-weight:700; font-size:.9rem; color:#c084fc; margin-bottom:.75rem; display:flex; justify-content:space-between; align-items:center">
            <span>🏆 Locais Onde Mais Foi Gasto (Top R$)</span>
            <span style="font-size:.75rem; color:var(--text-muted)">Maiores valores</span>
          </div>
          <div style="display:flex; flex-direction:column; gap:.6rem">
            ${n.map((r,c)=>{const g=a>0?(r.valorTotal/a*100).toFixed(1):0;return`
                <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(30,41,59,0.7); border-radius:6px; padding:.5rem .75rem">
                  <div style="display:flex; align-items:center; gap:.5rem">
                    <span style="font-size:1rem; font-weight:700">${c===0?"🥇":c===1?"🥈":c===2?"🥉":`#${c+1}`}</span>
                    <div>
                      <strong style="font-size:.85rem; color:#f8fafc">${r.nome}</strong>
                      <span style="font-size:.72rem; color:var(--text-muted); display:block">${r.qtd} compra${r.qtd>1?"s":""} • ${g}% do cartão</span>
                    </div>
                  </div>
                  <strong style="color:#fb7185; font-size:.95rem">${l(r.valorTotal)}</strong>
                </div>
              `}).join("")}
          </div>
        </div>

        <!-- Coluna 2: Gastos por Categoria -->
        <div style="background:rgba(15,23,42,0.6); border:1px solid var(--border-color); border-radius:10px; padding:.85rem 1rem">
          <div style="font-weight:700; font-size:.9rem; color:#c084fc; margin-bottom:.75rem; display:flex; justify-content:space-between; align-items:center">
            <span>🏷️ Categorias Onde Mais Foi Gasto</span>
            <span style="font-size:.75rem; color:var(--text-muted)">Distribuição de Despesas</span>
          </div>
          <div style="display:flex; flex-direction:column; gap:.6rem">
            ${i.map(r=>{const c=a>0?(r.valorTotal/a*100).toFixed(1):0;return`
                <div>
                  <div style="display:flex; justify-content:space-between; align-items:center; font-size:.83rem; margin-bottom:.2rem">
                    <span>${r.icone} <strong>${r.nome}</strong> <span style="font-size:.72rem; color:var(--text-muted)">(${r.qtd} itens)</span></span>
                    <strong style="color:#f8fafc">${l(r.valorTotal)} <span style="font-size:.72rem; color:var(--text-muted)">(${c}%)</span></strong>
                  </div>
                  <div class="progress-bar-bg" style="height:6px; border-radius:3px; background:rgba(255,255,255,0.08); overflow:hidden">
                    <div class="progress-bar-fill" style="width:${c}%; height:100%; background:var(--accent-purple); border-radius:3px"></div>
                  </div>
                </div>
              `}).join("")}
          </div>
        </div>

      </div>

      ${b}

    </div>
  `}function Et(){const t=V.reduce((d,u)=>d+(u.valorTotal!==void 0?u.valorTotal:u.valor||0),0);document.getElementById("badge-total-cartoes").textContent=`${l(t)} total`;const e=document.getElementById("lista-faturas-registradas");if(!V.length){e.innerHTML='<div class="empty-state">Nenhuma fatura cadastrada ainda.</div>';return}const a=ht(V),o=Ve(V,"geral"),n={};V.forEach(d=>{const u=d.mesAno||"Outros";n[u]||(n[u]=[]),n[u].push(d)});const i=Object.keys(n).sort((d,u)=>u.localeCompare(d)).map((d,u)=>{const m=n[d],v=m.reduce((r,c)=>r+(c.valorTotal!==void 0?c.valorTotal:c.valor||0),0);let p=d;if(d!=="Outros"&&d.includes("-")){const[r,c]=d.split("-"),x=new Date(parseInt(r),parseInt(c)-1,1).toLocaleString("pt-BR",{month:"long"});p=`${x.charAt(0).toUpperCase()+x.slice(1)} de ${r}`}const b=u===0;return`
      <div class="card" style="margin-bottom:1.25rem;background:rgba(15,23,42,0.45);border:1px solid var(--border-color)">
        <div class="card-header" style="cursor:pointer;user-select:none;display:flex;justify-content:space-between;align-items:center" onclick="toggleGroupMonth('fat-group-${d}')">
          <span class="card-title" style="font-size:1.05rem">📅 Faturas de ${p}</span>
          <div style="display:flex;align-items:center;gap:.75rem">
            <span class="badge blue" style="font-size:.85rem">Total: ${l(v)} (${m.length} fatura${m.length>1?"s":""})</span>
            <span class="chevron ${b?"open":""}" id="chev-fat-group-${d}">▼</span>
          </div>
        </div>
        <div id="fat-group-${d}" class="purchase-details ${b?"open":""}" style="padding:.75rem 1rem;display:${b?"block":"none"}">
          ${m.map(r=>{var h;const c=r.valorTotal!==void 0?r.valorTotal:r.valor||0,g=r.cartao||"Cartão",x=g.toLowerCase().includes("nubank"),I=x?"purple":"red",M=x?"🟣":"🔴",w=r.dataVencimento?pe(r.dataVencimento).split(",")[0]:"—",B=r.mesAno||"—";return`
              <div class="purchase-card" style="margin-bottom:1rem">
                <div class="purchase-header" onclick="toggleDetail('fat-${r.id}')">
                  <div class="purchase-info">
                    <h3><span class="badge ${I}">${M} ${g}</span> — Vencimento: ${w}</h3>
                    <p>📅 Mês Referência: <strong>${B}</strong> &nbsp;•&nbsp; 🛒 ${r.qtdItens||((h=r.itens)==null?void 0:h.length)||1} itens contemplados</p>
                  </div>
                  <div class="purchase-values" style="display:flex;align-items:center;gap:.75rem">
                    <div style="text-align:right">
                      <div class="pv-total" style="color:#fb7185">${l(c)}</div>
                      <div class="pv-sub">Fatura do Mês</div>
                    </div>
                    <button type="button" class="btn-danger" style="padding:.35rem .65rem;font-size:.78rem;margin-left:.25rem" onclick="event.stopPropagation(); excluirFaturaDocumento('${r.id}')" title="Excluir esta fatura de todos os lugares do sistema">
                      🗑️ Excluir
                    </button>
                  </div>
                  <svg class="chevron" id="chev-fat-${r.id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
                <div class="purchase-details" id="detail-fat-${r.id}">
                  <div class="details-toolbar">
                    <span class="card-subtext">Detalhamento dos Lançamentos da Fatura</span>
                    <button class="btn-danger" onclick="excluirFaturaDocumento('${r.id}')">🗑️ Excluir Fatura</button>
                  </div>
                  ${Ge(r)}
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `}).join("");e.innerHTML=a+o+i}function Ge(t){if(t.itens&&t.itens.length>0){const e=je([t]),a=`fatura_${t.id}`;e.forEach(n=>{window.ultimosLocaisAnalisados[`${a}_${n.nome}`]=n});let o="";return e.length>0&&(o=`
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
  </table></div>`}window.removerItemFaturaCadastrada=async function(t,e){const a=V.find(s=>s.id===t);if(!a||!a.itens||!confirm("Remover este item da fatura?"))return;const o=[...a.itens];o.splice(e,1);const n=o.reduce((s,i)=>s+(i.valor||0),0);o.length===0?(await Z(R(C,se,t)),A("🗑️ Fatura excluída pois todos os itens foram removidos.")):(await H(R(C,se,t),{...a,itens:o,valorTotal:n,qtdItens:o.length}),A("🗑️ Item removido da fatura."))};window.excluirFaturaDocumento=async function(t){confirm("Excluir esta fatura e todos os seus lançamentos?")&&(await Z(R(C,se,t)),A("🗑️ Fatura removida com sucesso."))};let P=null;function $t(){const t=document.getElementById("inp-boleto-vencimento");if(t&&!t.value){const e=new Date,a=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0");t.value=`${a}-${o}-10`,atualizarMesRefBoleto()}}setTimeout($t,300);window.atualizarMesRefBoleto=function(){const t=document.getElementById("inp-boleto-vencimento"),e=document.getElementById("lbl-boleto-mes-ref");if(!(!t||!e))if(t.value){const[a,o]=t.value.split("-"),s=new Date(parseInt(a),parseInt(o)-1,1).toLocaleString("pt-BR",{month:"long"});e.textContent=`Boleto ${s.charAt(0).toUpperCase()+s.slice(1)}/${a}`}else e.textContent="Mês do Boleto"};window.handleFileBoletoSelect=async function(t){const e=t.target.files[0];if(!e)return;const a=document.getElementById("txt-file-boleto");a&&(a.textContent=`📄 Arquivo: ${e.name}`),A(`⏳ Lendo arquivo do boleto (${e.name})...`);let o="";if(e.type==="application/pdf"||e.name.endsWith(".pdf"))o=await Pe(e);else try{o=await e.text()}catch{o=""}o?(document.getElementById("inp-boleto-txt").value=o,await He(o,e.name)):A("❌ Não foi possível ler o texto do arquivo do boleto.")};window.importarBoletoManualOuArquivo=async function(){const t=document.getElementById("inp-boleto-txt").value.trim();if(!t){A("⚠️ Selecione o arquivo do boleto (.pdf, .txt) ou cole o texto do boleto.");return}await He(t,"Boleto")};async function He(t,e){const a=At(t);a.vencimento&&(document.getElementById("inp-boleto-vencimento").value=a.vencimento,atualizarMesRefBoleto());const o=document.getElementById("inp-boleto-vencimento").value||new Date().toISOString().slice(0,10),n=o.slice(0,7),s=a.beneficiario||e.replace(/\.[^/.]+$/,"")||"Boleto / Conta",i=a.itens.reduce((u,m)=>u+m.valor,0),d=a.valorTotal||i||0;document.getElementById("inp-revisao-boleto-desc").value=s,document.getElementById("inp-revisao-boleto-val").value=d?d.toFixed(2):"",P={descricao:s,dataVencimento:o,mesAno:n,valorTotal:d,qtdItens:a.itens.length,itens:a.itens},_e(),A("✅ Boleto identificado! Confira a descrição, valor e itens antes de salvar.")}window.atualizarValorTotalRevisaoBoleto=function(){if(!P)return;const t=parseFloat(document.getElementById("inp-revisao-boleto-val").value)||0;P.valorTotal=t,document.getElementById("badge-total-preview-boleto").textContent=l(t)};function _e(){if(!P)return;const{valorTotal:t,itens:e}=P;document.getElementById("badge-total-preview-boleto").textContent=l(t);const a=document.getElementById("lista-preview-boleto-itens");!e||!e.length?a.innerHTML='<div class="empty-state">Nenhum encargo/item individual extraído. O valor total acima será considerado.</div>':a.innerHTML=e.map((n,s)=>`
      <div style="display:flex; justify-content:space-between; align-items:center; padding:.4rem 0; border-bottom:1px dashed var(--border-color); font-size:.82rem;">
        <span><strong>${n.dataBoleto||"—"}</strong> — ${n.descricao}</span>
        <div style="display:flex; align-items:center; gap:.75rem;">
          <span style="color:#c084fc; font-weight:700;">${l(n.valor)}</span>
          <button type="button" class="btn-danger" style="padding:.15rem .45rem; font-size:.75rem;" onclick="removerItemRevisaoBoleto(${s})">🗑️</button>
        </div>
      </div>
    `).join("");const o=document.getElementById("box-revisao-boleto");o.style.display="block",o.scrollIntoView({behavior:"smooth"})}window.removerItemRevisaoBoleto=function(t){if(!P||!P.itens)return;P.itens.splice(t,1);const e=P.itens.reduce((a,o)=>a+o.valor,0);e>0&&(P.valorTotal=e,document.getElementById("inp-revisao-boleto-val").value=e.toFixed(2)),P.qtdItens=P.itens.length,_e(),A("🗑️ Item removido da revisão do boleto.")};window.confirmarEGravarBoletoDocumento=async function(){if(!P)return;const t=document.getElementById("inp-revisao-boleto-desc").value.trim(),e=parseFloat(document.getElementById("inp-revisao-boleto-val").value)||0,a=document.getElementById("inp-boleto-vencimento").value||new Date().toISOString().slice(0,10);if(!e){A("⚠️ Digite ou confirme o valor total do boleto.");return}P.descricao=t||"Boleto / Conta",P.valorTotal=e,P.dataVencimento=a,P.mesAno=a.slice(0,7);try{await fe(J(C,oe),{...P,createdAt:$e()}),document.getElementById("box-revisao-boleto").style.display="none",document.getElementById("inp-boleto-txt").value="";const o=document.getElementById("txt-file-boleto");o&&(o.textContent="Clique para Selecionar o Arquivo do Boleto");const n=l(P.valorTotal);P=null,A(`🎉 Boleto de ${n} salvo com sucesso!`)}catch(o){alert("Erro ao salvar boleto: "+o.message)}};function At(t){if(!t)return{beneficiario:"",valorTotal:0,vencimento:null,itens:[]};let e="",a=0,o=null;const n=[],s=t.match(/Vencimento\s*[:\s]*(\d{2}[\/\.-]\d{2}[\/\.-]\d{4})/i)||t.match(/Vencimento\s*[:\s]*(\d{2})\s+([A-Za-z]{3})\s+(\d{4})/i)||t.match(/Data\s*de\s*Vencimento\s*[:\s]*(\d{2}[\/\.-]\d{2}[\/\.-]\d{4})/i);if(s){if(s[2]&&s[3]){const m=s[1],v=s[2].toUpperCase();o=`${s[3]}-${{JAN:"01",FEB:"02",MAR:"03",ABR:"04",APR:"04",MAI:"05",MAY:"05",JUN:"06",JUL:"07",AGO:"08",AUG:"08",SET:"09",SEP:"09",OUT:"10",OCT:"10",NOV:"11",DEZ:"12",DEC:"12"}[v]||"07"}-${m.padStart(2,"0")}`}else if(s[1]){const[m,v,p]=s[1].split(/[\/\.-]/);o=`${p}-${v.padStart(2,"0")}-${m.padStart(2,"0")}`}}const i=t.match(/Benefici[áa]rio\s*[:\s]*([^\n\r]+)/i)||t.match(/Nome\s*do\s*Cedente\s*[:\s]*([^\n\r]+)/i)||t.match(/Raz[ãa]o\s*Social\s*[:\s]*([^\n\r]+)/i);i&&(e=i[1].trim().replace(/\s{2,}/g," "));const d=t.match(/Valor\s*do\s*Documento\s*[:\s]*R?\$\s*([\d\.]+,\d{2})/i)||t.match(/\(=\)\s*Valor\s*Cobrado\s*[:\s]*R?\$\s*([\d\.]+,\d{2})/i)||t.match(/Valor\s*Cobrado\s*[:\s]*R?\$\s*([\d\.]+,\d{2})/i)||t.match(/Valor\s*R?\$\s*([\d\.]+,\d{2})/i);return d&&(a=N(d[1])),t.split(`
`).forEach(m=>{const v=m.trim();if(!v||/vencimento|beneficiário|cedente|nosso\s*número|agência|código|autenticação|instruções/i.test(v))return;const p=v.match(/(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\b[A-Za-z]{3}\b)?\s*(.+?)\s+R?\$\s*([\d\.]+,\d{2})$/i);if(p){const b=p[1]||"Boleto",r=p[2].trim(),c=N(p[3]);r&&c>0&&r.length>2&&!/valor|total|documento|cobrado/i.test(r)&&n.push({dataBoleto:b,descricao:r,valor:c})}}),{beneficiario:e,valorTotal:a,vencimento:o,itens:n}}function xt(t){const e=document.getElementById("container-analise-boletos-recorrentes");if(!e)return;if(!t||!t.length){e.innerHTML="";return}const a={};t.forEach(r=>{const c=ne(r);a[c]||(a[c]={nome:c,valorTotalAno:0,qtd:0,historicoMeses:{}});const g=r.valorTotal!==void 0?r.valorTotal:r.valor||0;a[c].valorTotalAno+=g,a[c].qtd+=1;const x=r.mesAno||"Outros";a[c].historicoMeses[x]=(a[c].historicoMeses[x]||0)+g});const o=Object.values(a).sort((r,c)=>c.valorTotalAno-r.valorTotalAno),n=Array.from(new Set(t.map(r=>r.mesAno||"Outros"))).sort((r,c)=>c.localeCompare(r)),s=n[0],i=n[1];function d(r){if(!r||!r.includes("-"))return r;const[c,g]=r.split("-"),I=new Date(parseInt(c),parseInt(g)-1,1).toLocaleString("pt-BR",{month:"long"});return`${I.charAt(0).toUpperCase()+I.slice(1)}/${c}`}const u=d(s),m=d(i),v=[];s&&i&&o.forEach(r=>{const c=r.historicoMeses[s],g=r.historicoMeses[i];if(c!==void 0&&g!==void 0){const x=c-g;if(x>5){const I=(x/g*100).toFixed(1);v.push({nome:r.nome,valAtual:c,valAnterior:g,dif:x,pct:I})}}}),v.sort((r,c)=>c.dif-r.dif);const p=t.reduce((r,c)=>r+(c.valorTotal!==void 0?c.valorTotal:c.valor||0),0);let b="";s&&i&&(v.length>0?b=`
        <div style="margin-top:1rem; background:rgba(251,113,133,0.08); border:1px dashed rgba(251,113,133,0.35); border-radius:10px; padding:.85rem 1rem">
          <div style="font-weight:700; font-size:.9rem; color:#fb7185; margin-bottom:.5rem; display:flex; align-items:center; gap:.4rem">
            ⚠️ ALERTAS DE AUMENTO DE PREÇO (${u} vs ${m}):
          </div>
          <div style="display:flex; flex-direction:column; gap:.5rem">
            ${v.map(r=>`
              <div style="font-size:.83rem; color:#f1f5f9; background:rgba(15,23,42,0.8); border-left:3px solid #fb7185; padding:.5rem .75rem; border-radius:4px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:.5rem">
                <div>
                  🚨 <strong>${r.nome}</strong>: Aumentou <strong style="color:#fb7185">+${l(r.dif)} (+${r.pct}%)</strong> em relação a ${m}.
                  <span style="color:var(--text-muted); display:block; margin-top:.15rem">Mês anterior: ${l(r.valAnterior)} ➔ Mês atual: ${l(r.valAtual)}</span>
                </div>
                <span class="badge rose" style="font-size:.78rem">+${r.pct}%</span>
              </div>
            `).join("")}
          </div>
        </div>
      `:b=`
        <div style="margin-top:1rem; background:rgba(16,185,129,0.08); border:1px dashed rgba(16,185,129,0.35); border-radius:10px; padding:.85rem 1rem">
          <div style="font-weight:700; font-size:.88rem; color:#34d399">
            🟢 Nenhum boleto recorrente teve aumento de preço entre ${m} e ${u}. Todos os valores mantiveram-se estáveis!
          </div>
        </div>
      `),e.innerHTML=`
    <div class="card" style="margin-bottom:1.5rem; background:linear-gradient(135deg,rgba(30,41,59,.98),rgba(15,23,42,.99)); border-color:#c084fc; box-shadow:0 4px 22px rgba(192,132,252,0.18)">
      <div class="card-header" style="flex-wrap:wrap; gap:.5rem">
        <div>
          <span class="card-title" style="color:#c084fc; font-size:1.1rem">📊 ANÁLISE DE BOLETOS RECORRENTES & COMPARATIVO DE CONTAS</span>
          <p style="font-size:.78rem; color:var(--text-muted); margin-top:.2rem">Acompanhamento dos totais acumulados no ano e variação de preço de um mês para o outro.</p>
        </div>
        <span class="badge purple" style="font-size:.85rem; padding:.35rem .75rem">Total em Boletos: ${l(p)}</span>
      </div>

      <!-- Grid de Boletos Recorrentes -->
      <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap:.85rem; margin-top:.75rem">
        ${o.map(r=>{const c=r.qtd>0?r.valorTotalAno/r.qtd:0;let g='<span class="badge gray" style="font-size:.72rem">Único registro</span>';if(s&&i){const x=r.historicoMeses[s],I=r.historicoMeses[i];if(x!==void 0&&I!==void 0){const M=x-I;if(M>0){const w=(M/I*100).toFixed(1);g=`<span class="badge rose" style="font-size:.75rem" title="Subiu ${l(M)} em relação a ${m}">📈 +${l(M)} (+${w}%)</span>`}else if(M<0){const w=(Math.abs(M)/I*100).toFixed(1);g=`<span class="badge green" style="font-size:.75rem" title="Caiu ${l(Math.abs(M))} em relação a ${m}">📉 ${l(M)} (-${w}%)</span>`}else g='<span class="badge purple" style="font-size:.75rem">🟢 R$ 0,00 (Estável)</span>'}}return`
            <div style="background:rgba(15,23,42,0.75); border:1px solid var(--border-color); border-radius:10px; padding:.85rem 1rem; display:flex; justify-content:space-between; align-items:center">
              <div>
                <div style="font-weight:700; font-size:.9rem; color:#f8fafc; margin-bottom:.25rem">📄 ${r.nome}</div>
                <div style="font-size:.75rem; color:var(--text-muted)">
                  Média: <strong>${l(c)}/mês</strong> &nbsp;•&nbsp; ${r.qtd} boleto${r.qtd>1?"s":""}
                </div>
                <div style="margin-top:.4rem">${g}</div>
              </div>
              <div style="text-align:right">
                <div style="font-weight:800; font-size:1.1rem; color:#c084fc">${l(r.valorTotalAno)}</div>
                <div style="font-size:.72rem; color:var(--text-muted)">total acumulado</div>
              </div>
            </div>
          `}).join("")}
      </div>

      ${b}

    </div>
  `}function It(){const t=q.reduce((n,s)=>n+(s.valorTotal!==void 0?s.valorTotal:s.valor||0),0);document.getElementById("badge-total-boletos").textContent=`${l(t)} total`,xt(q);const e=document.getElementById("lista-boletos-registrados");if(!q.length){e.innerHTML='<div class="empty-state">Nenhum boleto cadastrado ainda.</div>';return}const a={};q.forEach(n=>{const s=n.mesAno||"Outros";a[s]||(a[s]=[]),a[s].push(n)});const o=Object.keys(a).sort((n,s)=>s.localeCompare(n));e.innerHTML=o.map((n,s)=>{const i=a[n];i.sort((v,p)=>{const b=v.dataVencimento?new Date(v.dataVencimento).getTime():0;return(p.dataVencimento?new Date(p.dataVencimento).getTime():0)-b});const d=i.reduce((v,p)=>v+(p.valorTotal!==void 0?p.valorTotal:p.valor||0),0);let u=n;if(n!=="Outros"&&n.includes("-")){const[v,p]=n.split("-"),r=new Date(parseInt(v),parseInt(p)-1,1).toLocaleString("pt-BR",{month:"long"});u=`${r.charAt(0).toUpperCase()+r.slice(1)} de ${v}`}const m=s===0;return`
      <div class="card" style="margin-bottom:1.25rem;background:rgba(15,23,42,0.45);border:1px solid var(--border-color)">
        <div class="card-header" style="cursor:pointer;user-select:none;display:flex;justify-content:space-between;align-items:center" onclick="toggleGroupMonth('bol-group-${n}')">
          <span class="card-title" style="font-size:1.05rem">📄 Boletos de ${u}</span>
          <div style="display:flex;align-items:center;gap:.75rem">
            <span class="badge purple" style="font-size:.85rem">Total: ${l(d)} (${i.length} boleto${i.length>1?"s":""})</span>
            <span class="chevron ${m?"open":""}" id="chev-bol-group-${n}">▼</span>
          </div>
        </div>
        <div id="bol-group-${n}" class="purchase-details ${m?"open":""}" style="padding:.75rem 1rem;display:${m?"block":"none"}">
          ${i.map(v=>{var g;const p=v.valorTotal!==void 0?v.valorTotal:v.valor||0,b=v.dataVencimento?pe(v.dataVencimento).split(",")[0]:"—",r=v.mesAno||"—",c=ne(v);return`
              <div class="purchase-card" style="margin-bottom:1rem">
                <div class="purchase-header" onclick="toggleDetail('bol-${v.id}')">
                  <div class="purchase-info">
                    <h3><span class="badge purple">📄 ${c}</span> — Vencimento: ${b}</h3>
                    <p>📅 Mês Referência: <strong>${r}</strong> &nbsp;•&nbsp; 🛒 ${v.qtdItens||((g=v.itens)==null?void 0:g.length)||1} itens / encargos</p>
                  </div>
                  <div class="purchase-values" style="display:flex;align-items:center;gap:.5rem">
                    <div style="text-align:right">
                      <div class="pv-total" style="color:#c084fc">${l(p)}</div>
                      <div class="pv-sub">Boleto do Mês</div>
                    </div>
                    <button type="button" class="btn-secondary" style="padding:.35rem .65rem;font-size:.78rem;margin-left:.25rem" onclick="event.stopPropagation(); editarValorBoletoDocumento('${v.id}')" title="Editar valor do boleto">
                      ✏️ Editar
                    </button>
                    <button type="button" class="btn-danger" style="padding:.35rem .65rem;font-size:.78rem" onclick="event.stopPropagation(); excluirBoletoDocumento('${v.id}')" title="Excluir este boleto de todos os lugares do sistema">
                      🗑️ Excluir
                    </button>
                  </div>
                  <svg class="chevron" id="chev-bol-${v.id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
                <div class="purchase-details" id="detail-bol-${v.id}">
                  <div class="details-toolbar">
                    <span class="card-subtext">Detalhamento dos Itens / Encargos do Boleto</span>
                    <div style="display:flex;gap:.35rem">
                      <button class="btn-secondary" onclick="editarValorBoletoDocumento('${v.id}')">✏️ Editar Valor</button>
                      <button class="btn-danger" onclick="excluirBoletoDocumento('${v.id}')">🗑️ Excluir Boleto</button>
                    </div>
                  </div>
                  ${Qe(v)}
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `}).join("")}function ne(t){if(!t)return"Boleto";let e=t.descricao;return(!e||e==="Boleto"||e==="Boleto / Conta")&&(t.itens&&t.itens.length>0&&t.itens[0].descricao?e=t.itens[0].descricao:t.beneficiario?e=t.beneficiario:e="Boleto"),e=e.trim().replace(/[-–—\s]+$/,"").trim(),e||"Boleto"}function Qe(t){return t.itens&&t.itens.length>0?`<div class="table-responsive"><table class="custom-table">
      <thead><tr><th>Data</th><th>Descrição / Item</th><th class="num">Valor</th><th>Ação</th></tr></thead>
      <tbody>${t.itens.map((e,a)=>`<tr>
        <td><strong>${e.dataBoleto||"—"}</strong></td>
        <td>${e.descricao}</td>
        <td class="num" style="color:#c084fc"><strong>${l(e.valor)}</strong></td>
        <td>
          <div style="display:flex;gap:.35rem;align-items:center">
            <button class="btn-secondary" style="padding:.2rem .5rem; font-size:.78rem;" onclick="editarItemBoleto('${t.id}', ${a})" title="Editar valor deste item">✏️ Editar</button>
            <button class="btn-danger" style="padding:.2rem .5rem; font-size:.78rem;" onclick="removerItemBoletoCadastrado('${t.id}', ${a})">🗑️ Excluir</button>
          </div>
        </td>
      </tr>`).join("")}</tbody>
    </table></div>`:`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Descrição</th><th class="num">Valor</th><th>Ação</th></tr></thead>
    <tbody><tr>
      <td>${t.descricao||"Boleto"}</td>
      <td class="num" style="color:#c084fc"><strong>${l(t.valor||t.valorTotal)}</strong></td>
      <td>
        <div style="display:flex;gap:.35rem;align-items:center">
          <button class="btn-secondary" style="padding:.2rem .5rem; font-size:.78rem;" onclick="editarValorBoletoDocumento('${t.id}')" title="Editar valor do boleto">✏️ Editar</button>
          <button class="btn-danger" style="padding:.2rem .5rem; font-size:.78rem;" onclick="excluirBoletoDocumento('${t.id}')">🗑️ Excluir</button>
        </div>
      </td>
    </tr></tbody>
  </table></div>`}window.editarValorBoletoDocumento=function(t){const e=q.find(s=>s.id===t);if(!e)return;const a=e.valorTotal!==void 0?e.valorTotal:e.valor||0,o=typeof ne=="function"?ne(e):e.descricao||"Boleto";document.getElementById("inp-edit-boleto-id").value=t,document.getElementById("inp-edit-item-index").value="",document.getElementById("inp-edit-boleto-desc").value=o,document.getElementById("inp-edit-boleto-valor").value=a.toFixed(2),document.getElementById("titulo-modal-editar-boleto").textContent="✏️ Editar Valor do Boleto";const n=document.getElementById("modal-editar-boleto");n&&(n.classList.add("active"),setTimeout(()=>{const s=document.getElementById("inp-edit-boleto-valor");s&&(s.focus(),s.select())},100))};window.editarItemBoleto=function(t,e){const a=q.find(i=>i.id===t);if(!a||!a.itens||!a.itens[e])return;const o=a.itens[e],n=o.valor||0;document.getElementById("inp-edit-boleto-id").value=t,document.getElementById("inp-edit-item-index").value=e,document.getElementById("inp-edit-boleto-desc").value=o.descricao||(typeof ne=="function"?ne(a):"Item"),document.getElementById("inp-edit-boleto-valor").value=n.toFixed(2),document.getElementById("titulo-modal-editar-boleto").textContent="✏️ Editar Valor do Item";const s=document.getElementById("modal-editar-boleto");s&&(s.classList.add("active"),setTimeout(()=>{const i=document.getElementById("inp-edit-boleto-valor");i&&(i.focus(),i.select())},100))};window.fecharModalEditarBoleto=function(){const t=document.getElementById("modal-editar-boleto");t&&t.classList.remove("active")};document.getElementById("form-editar-boleto").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-edit-boleto-id").value,a=document.getElementById("inp-edit-item-index").value,o=document.getElementById("inp-edit-boleto-valor").value,n=parseFloat(o);if(!e||isNaN(n)||n<=0){alert("Por favor, informe um valor numérico válido maior que zero.");return}const s=q.find(i=>i.id===e);if(s)try{const i=R(C,oe,e);if(a===""){const d={valorTotal:n,valor:n,dataAtualizacao:new Date().toISOString()};if(s.itens&&s.itens.length>0){const u=[...s.itens];u[0]={...u[0],valor:n},d.itens=u}await H(i,d,{merge:!0}),A(`✏️ Valor do boleto atualizado para ${l(n)} em todo o sistema!`)}else{const d=parseInt(a);if(s.itens&&s.itens[d]){const u=[...s.itens];u[d]={...u[d],valor:n};const m=u.reduce((v,p)=>v+(p.valor||0),0);await H(i,{...s,itens:u,valorTotal:m,valor:m,dataAtualizacao:new Date().toISOString()},{merge:!0}),A(`✏️ Item do boleto atualizado para ${l(n)} em todo o sistema!`)}}fecharModalEditarBoleto()}catch(i){alert("Erro ao atualizar valor do boleto: "+i.message)}});window.removerItemBoletoCadastrado=async function(t,e){const a=q.find(s=>s.id===t);if(!a||!a.itens||!confirm("Remover este item do boleto?"))return;const o=[...a.itens];o.splice(e,1);const n=o.reduce((s,i)=>s+(i.valor||0),0);o.length===0?(await Z(R(C,oe,t)),A("🗑️ Boleto excluído pois todos os itens foram removidos.")):(await H(R(C,oe,t),{...a,itens:o,valorTotal:n,qtdItens:o.length}),A("🗑️ Item removido do boleto."))};window.excluirBoletoDocumento=async function(t){const e=q.find(n=>n.id===t),a=e?e.descricao||"Boleto / Conta":"este boleto",o=e?l(e.valorTotal!==void 0?e.valorTotal:e.valor||0):"";confirm(`⚠️ Deseja realmente excluir ${a} ${o?"("+o+")":""}?

Este boleto será removido permanentemente de todos os meses, resumos e relatórios do sistema.`)&&(await Z(R(C,oe,t)),A("🗑️ Boleto removido de todo o sistema com sucesso."))};document.getElementById("form-config-reservas").addEventListener("submit",async t=>{t.preventDefault();const e=parseFloat(document.getElementById("inp-meta-anual").value)||0,a=parseFloat(document.getElementById("inp-saldo-guardado").value)||0;_.metaAnual=e,_.valorAtualGuardado=a,await H(R(C,De,"config"),{metaAnual:e,valorAtualGuardado:a,dataAtualizacao:new Date().toISOString()}),A("✅ Reservas e configurações de economias salvas!"),W()});function wt(){const t=_&&_.metaAnual!==void 0?_.metaAnual:15e3,e=_&&_.valorAtualGuardado!==void 0?_.valorAtualGuardado:3e3,a=document.getElementById("inp-meta-anual");a&&document.activeElement!==a&&(a.value=t);const o=document.getElementById("inp-saldo-guardado");o&&document.activeElement!==o&&(o.value=e);const s=new Date().getMonth()+1,i=Math.max(1,12-s+1),d=Math.max(0,t-e),u=d>0?d/i:0;document.getElementById("val-meta-reserva").textContent=l(u);const m=document.getElementById("subtext-meta-reserva");m&&(m.textContent=`Faltam ${l(d)} p/ Meta Anual de ${l(t)} (${i} mês(es) até o fim do ano)`),document.getElementById("val-real-guardado").textContent=l(e);const v=le();let p=0,b=0,r=0,c=0;v.forEach(D=>{const y=Q.filter(O=>O.mesAno===D).reduce((O,L)=>O+(L.valor||0),0),f=V.filter(O=>O.mesAno===D).reduce((O,L)=>O+(L.valorTotal!==void 0?L.valorTotal:L.valor||0),0),$=q.filter(O=>O.mesAno===D).reduce((O,L)=>O+(L.valorTotal!==void 0?L.valorTotal:L.valor||0),0);let F=0;U.filter(O=>O.mesAno===D).forEach(O=>{O.formasPagamento&&(F+=O.formasPagamento.cartaoDebito||0)}),p+=y,b+=f,r+=$,c+=F});const g=b+r+c,x=p-g,I=Math.max(1,v.length),M=p/I,w=g/I,B=x/I,h=B>0?B:0,T=h*i,S=e+T;document.getElementById("val-recomendacao-reserva").textContent=l(S);const j=document.getElementById("subtext-recomendacao");if(j)if(S>=t)j.innerHTML=`✅ Projeção de <strong style="color:#34d399">${l(S)}</strong> até Dez/2026 supera sua Meta Anual de ${l(t)}!`;else{const D=t-S;j.innerHTML=`⚠️ Sobra média de ${l(h)}/mês. Projeção de ${l(S)} fica <strong style="color:#fb7185">${l(D)}</strong> abaixo da Meta de ${l(t)}.`}const z=document.getElementById("box-analise-reserva-detalhes");if(z)if(p===0)z.innerHTML='<p class="empty-state">Cadastre seus salários e entradas na aba "Salários & Entradas" para gerar o diagnóstico inteligente de economias.</p>';else{const D=t>0?Math.min(100,e/t*100).toFixed(1):0,y=S>=t;let f="";if(y)f=`
          <div style="background:rgba(16,185,129,0.12);border:1px solid rgba(16,185,129,0.35);border-radius:8px;padding:.85rem 1rem;margin-top:.85rem">
            <span style="color:#34d399;font-weight:700;font-size:.9rem">✅ DIAGNÓSTICO: META ANUAL TOTALMENTE ATINGÍVEL!</span>
            <p style="font-size:.85rem;color:#f1f5f9;margin-top:.35rem;line-height:1.45">
              Com base na sua média de sobra mensal livre de <strong style="color:#34d399">${l(B)}/mês</strong> (Entradas: ${l(M)} vs Saídas: ${l(w)}), a projeção é acumular <strong style="color:#34d399">${l(S)}</strong> até o fim do ano.
              Isso <strong>SUPERA a sua Meta Anual de ${l(t)}</strong> (contemplando o valor já guardado de ${l(e)})!
            </p>
          </div>
        `;else if(B>0){const $=Math.max(0,u-B);f=`
          <div style="background:rgba(245,158,11,0.12);border:1px solid rgba(245,158,11,0.35);border-radius:8px;padding:.85rem 1rem;margin-top:.85rem">
            <span style="color:#fbbf24;font-weight:700;font-size:.9rem">⚠️ DIAGNÓSTICO: META DESAFIADORA (AJUSTE DE ECONOMIA NECESSÁRIO)</span>
            <p style="font-size:.85rem;color:#f1f5f9;margin-top:.35rem;line-height:1.45">
              Com a sua sobra média mensal atual de <strong style="color:#fbbf24">${l(B)}/mês</strong>, o sistema projeta acumular <strong style="color:#60a5fa">${l(S)}</strong> até o fim do ano (somando os ${l(e)} já guardados).
              Para alcançar a sua Meta de <strong>${l(t)}</strong> (faltam ${l(d)}), é necessário guardar <strong style="color:#fb7185">${l(u)}/mês</strong> nos próximos ${i} meses (um incremento de <strong>${l($)}/mês</strong> em relação à sua média).
            </p>
          </div>
        `}else f=`
          <div style="background:rgba(251,113,133,0.12);border:1px solid rgba(251,113,133,0.35);border-radius:8px;padding:.85rem 1rem;margin-top:.85rem">
            <span style="color:#fb7185;font-weight:700;font-size:.9rem">🚨 DIAGNÓSTICO: ALERTA DE VIABILIDADE (SAÍDAS SUPERARAM ENTRADAS)</span>
            <p style="font-size:.85rem;color:#f1f5f9;margin-top:.35rem;line-height:1.45">
              No histórico dos ${I} meses registrados, suas saídas (${l(g)}) superaram as entradas (${l(p)}), com saldo médio negativo de ${l(B)}/mês.
              A projeção do sistema prevê apenas a manutenção dos <strong style="color:#34d399">${l(e)}</strong> já guardados. Para atingir sua Meta Anual de <strong>${l(t)}</strong> (faltam <strong>${l(d)}</strong>), você precisará guardar <strong style="color:#fb7185">${l(u)}/mês</strong> nos próximos ${i} mês(es).
            </p>
          </div>
        `;z.innerHTML=`
        <p style="margin-bottom:.5rem;font-weight:600">
          Com base no histórico dos ${I} mês(es) registrados (Média Entradas: <strong>${l(M)}</strong> vs Saídas: <strong>${l(w)}</strong>):
        </p>
        <div style="background:rgba(15,23,42,0.6);padding:1.1rem;border-radius:10px;margin:.75rem 0;border:1px solid var(--border-color)">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem;flex-wrap:wrap;gap:.75rem">
            <div>
              <span style="font-size:.82rem;color:var(--text-muted);display:block">💰 Saldo Líquido no Período</span>
              <strong style="font-size:1.15rem;color:${x>=0?"#60a5fa":"#fb7185"}">${l(x)}</strong>
            </div>
            <div>
              <span style="font-size:.82rem;color:var(--text-muted);display:block">🏦 Total Guardado na Reserva</span>
              <strong style="font-size:1.15rem;color:#34d399">${l(e)}</strong>
            </div>
            <div>
              <span style="font-size:.82rem;color:var(--text-muted);display:block">🎯 Meta Anual Desejada</span>
              <strong style="font-size:1.15rem;color:#a5b4fc">${l(t)}</strong>
            </div>
          </div>

          <div class="progress-bar-bg" style="height:12px;border-radius:6px;background:rgba(255,255,255,0.08);overflow:hidden;margin:.75rem 0 .4rem 0">
            <div class="progress-bar-fill" style="width:${D}%;height:100%;background:linear-gradient(90deg,#10b981,#34d399);border-radius:6px"></div>
          </div>

          <div style="display:flex;justify-content:space-between;font-size:.82rem;color:var(--text-muted);margin-top:.4rem;flex-wrap:wrap;gap:.5rem">
            <span>Progresso Atual: <strong style="color:#34d399">${l(e)}</strong> de ${l(t)} (<strong>${D}%</strong> concluído)</span>
            <span>Faltam guardar: <strong style="color:#fb7185">${l(d)}</strong> em ${i} mês(es)</span>
          </div>
        </div>

        ${f}
      `}Tt()}function Tt(){const t=document.getElementById("container-analise-mensal-lista");if(!t)return;const e=le();if(!e.length){t.innerHTML='<div class="empty-state">Nenhum mês registrado para gerar a análise mensal.</div>';return}const a=e.map(o=>{const s=Q.filter(h=>h.mesAno===o).reduce((h,T)=>h+(T.valor||0),0),i=V.filter(h=>h.mesAno===o),d=i.reduce((h,T)=>h+(T.valorTotal!==void 0?T.valorTotal:T.valor||0),0),u=q.filter(h=>h.mesAno===o),m=u.reduce((h,T)=>h+(T.valorTotal!==void 0?T.valorTotal:T.valor||0),0),v=U.filter(h=>h.mesAno===o);let p=0;v.forEach(h=>{h.formasPagamento&&(p+=h.formasPagamento.cartaoDebito||0)});const b=d+m+p,r=s-b,c=r>=0,[g,x]=o.split("-"),M=new Date(parseInt(g),parseInt(x)-1,1).toLocaleString("pt-BR",{month:"long"}),w=M.charAt(0).toUpperCase()+M.slice(1);let B="";if(c){const h=r*.5;B=`
        <div style="background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.25); border-radius:10px; padding:.85rem 1rem; margin-top:1rem">
          <div style="font-weight:700; font-size:.88rem; color:#34d399; margin-bottom:.2rem">
            🎉 Mês Positivo! Capacidade de Poupança Excelente
          </div>
          <p style="font-size:.8rem; color:var(--text-muted); margin:0">
            Neste mês sobraram <strong>${l(r)}</strong> em conta. O sistema sugere destinar pelo menos <strong style="color:#34d399">${l(h)}</strong> para sua reserva!
          </p>
        </div>
      `}else{const h=Math.abs(r);let T="Cartão de Crédito",S=d;m>S&&(T="Boletos & Contas",S=m),p>S&&(T="Mercado no Débito",S=p);const j=b>0?(S/b*100).toFixed(1):0;let z="",D=0;i.forEach(y=>{const f=y.valorTotal!==void 0?y.valorTotal:y.valor||0;f>D&&(D=f,z=`Fatura do ${y.cartao||"Cartão"}`)}),u.forEach(y=>{const f=y.valorTotal!==void 0?y.valorTotal:y.valor||0;f>D&&(D=f,z=`Boleto ${y.descricao||"de Conta"}`)}),B=`
        <div style="background:rgba(244,63,94,0.1); border:1px solid rgba(244,63,94,0.3); border-radius:10px; padding:.85rem 1rem; margin-top:1rem">
          <div style="font-weight:700; font-size:.88rem; color:#fb7185; margin-bottom:.4rem; display:flex; align-items:center; gap:.4rem">
            ⚠️ O que causou o déficit em ${w}/${g}?
          </div>
          <p style="font-size:.82rem; color:var(--text-main); margin-bottom:.5rem; line-height:1.5">
            As saídas (<strong>${l(b)}</strong>) superaram as entradas (<strong>${l(s)}</strong>) em <strong style="color:#fb7185">${l(h)}</strong>.
          </p>
          <div style="font-size:.78rem; color:var(--text-muted); line-height:1.5">
            • <strong>Vilão Principal:</strong> A categoria <strong style="color:#f8fafc">${T}</strong> representou <strong>${j}%</strong> de todas as saídas do mês (${l(S)}).
            ${z?`<br>• <strong>Maior Despesa Registrada:</strong> ${z} no valor de <strong style="color:#fb7185">${l(D)}</strong>.`:""}
          </div>
        </div>
      `}return`
      <div class="card" style="margin-bottom:1.25rem; border-color:${c?"rgba(52,211,153,0.3)":"rgba(251,113,133,0.4)"}">
        <div class="card-header" style="flex-wrap:wrap; gap:.5rem">
          <div style="display:flex; align-items:center; gap:.5rem">
            <span class="card-title" style="font-size:1rem; color:#f8fafc">📅 ${w} de ${g}</span>
            <span class="badge ${c?"green":"red"}">${c?"🟢 Superávit":"🔴 Déficit"}</span>
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
            <div style="font-weight:700; font-size:1rem; color:#c084fc">${l(m)}</div>
          </div>

          <div style="background:rgba(15,23,42,0.6); padding:.6rem .8rem; border-radius:8px; border:1px solid var(--border-color)">
            <div style="font-size:.75rem; color:var(--text-muted)">Mercado (Débito)</div>
            <div style="font-weight:700; font-size:1rem; color:#fbbf24">${l(p)}</div>
          </div>

          <div style="background:rgba(15,23,42,0.8); padding:.6rem .8rem; border-radius:8px; border:1px solid ${c?"#34d399":"#fb7185"}">
            <div style="font-size:.75rem; color:var(--text-muted)">Saldo Líquido no Mês</div>
            <div style="font-weight:800; font-size:1.05rem; color:${c?"#60a5fa":"#fb7185"}">${l(r)}</div>
          </div>
        </div>

        ${B}
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
  `}const ge=[{id:"est_1",nome:"Corte de Cabelo Victor",quantidade:2,valorUnitario:70},{id:"est_2",nome:"Compra Programada Tunico",quantidade:1,valorUnitario:150},{id:"est_3",nome:"Sobrancelha Maria",quantidade:1,valorUnitario:50},{id:"est_4",nome:"Unha Maria",quantidade:1,valorUnitario:90},{id:"est_5",nome:"Banho Tunico",quantidade:1,valorUnitario:65},{id:"est_6",nome:"Saída Simples",quantidade:2,valorUnitario:100},{id:"est_7",nome:"Saída Premiun",quantidade:1,valorUnitario:150},{id:"est_8",nome:"Saída Premiun Plus",quantidade:1,valorUnitario:200},{id:"est_9",nome:"Mercado Pontual",quantidade:4,valorUnitario:70},{id:"est_10",nome:"Farmacia",quantidade:2,valorUnitario:35},{id:"est_11",nome:"Padaria 3D",quantidade:10,valorUnitario:10}];window.abrirModalAddEstimativa=function(t=null){const e=document.getElementById("modal-add-estimativa");if(e){if(document.getElementById("inp-est-id").value=t||"",t){document.getElementById("titulo-modal-estimativa").textContent="✏️ Editar Gastos Previsto";const a=K.find(n=>n.id===E),o=((a==null?void 0:a.itens)||[]).find(n=>n.id===t);o&&(document.getElementById("inp-est-nome").value=o.nome||"",document.getElementById("inp-est-qtd").value=o.quantidade||1,document.getElementById("inp-est-val").value=o.valorUnitario||0)}else document.getElementById("titulo-modal-estimativa").textContent="➕ Adicionar Gastos Previsto",document.getElementById("inp-est-nome").value="",document.getElementById("inp-est-qtd").value=1,document.getElementById("inp-est-val").value="";e.classList.add("active")}};window.fecharModalAddEstimativa=function(){var t;(t=document.getElementById("modal-add-estimativa"))==null||t.classList.remove("active")};var Ce;(Ce=document.getElementById("form-item-estimativa"))==null||Ce.addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-est-id").value,a=document.getElementById("inp-est-nome").value.trim(),o=parseFloat(document.getElementById("inp-est-qtd").value)||1,n=parseFloat(document.getElementById("inp-est-val").value)||0;if(!a){alert("Preencha a descrição do gasto.");return}const s=K.find(d=>d.id===E);let i=s?[...s.itens||[]]:[...ge];e?i=i.map(d=>d.id===e?{...d,nome:a,quantidade:o,valorUnitario:n}:d):i.push({id:"est_"+Date.now(),nome:a,quantidade:o,valorUnitario:n}),await H(R(C,ee,E),{mesAno:E,itens:i,ultimaAtualizacao:new Date().toISOString()}),fecharModalAddEstimativa(),A("✅ Estimativa atualizada!")});window.atualizarQtdItemEstimativa=async function(t,e){const a=K.find(s=>s.id===E);if(!a)return;const o=Math.max(1,parseInt(e)||1),n=(a.itens||[]).map(s=>s.id===t?{...s,quantidade:o}:s);await H(R(C,ee,E),{mesAno:E,itens:n,ultimaAtualizacao:new Date().toISOString()})};window.atualizarValorItemEstimativa=async function(t,e){const a=K.find(s=>s.id===E);if(!a)return;const o=Math.max(0,parseFloat(e)||0),n=(a.itens||[]).map(s=>s.id===t?{...s,valorUnitario:o}:s);await H(R(C,ee,E),{mesAno:E,itens:n,ultimaAtualizacao:new Date().toISOString()})};window.excluirItemEstimativa=async function(t){if(!confirm("Remover este item da estimativa do mês?"))return;const e=K.find(o=>o.id===E);if(!e)return;const a=(e.itens||[]).filter(o=>o.id!==t);await H(R(C,ee,E),{mesAno:E,itens:a,ultimaAtualizacao:new Date().toISOString()}),A("🗑️ Item removido da estimativa.")};window.resetarItensEstimativaPadrao=async function(){confirm(`Deseja carregar/resetar os 11 itens padrão de previsão para ${E}?`)&&(await H(R(C,ee,E),{mesAno:E,itens:ge,ultimaAtualizacao:new Date().toISOString()}),A("🔄 Itens padrão de estimativa carregados!"))};function Bt(){const t=document.getElementById("container-lista-estimativa");if(!t)return;const e=K.find(r=>r.id===E);let a=[];e&&Array.isArray(e.itens)?a=e.itens:(a=ge,H(R(C,ee,E),{mesAno:E,itens:ge,ultimaAtualizacao:new Date().toISOString()}).catch(r=>console.error("Auto init estimativa error:",r)));let o=0;a.forEach(r=>{o+=(r.quantidade||0)*(r.valorUnitario||0)});const n=document.getElementById("val-total-estimativa-mes");n&&(n.textContent=l(o));const[s,i]=E.split("-"),u=new Date(parseInt(s),parseInt(i)-1,1).toLocaleString("pt-BR",{month:"long"}),m=u.charAt(0).toUpperCase()+u.slice(1),v=document.getElementById("subtext-estimativa-mes");v&&(v.textContent=`Total previsto para ${m} de ${s} (${a.length} itens cadastrados)`);const p=document.getElementById("badge-count-estimativa");if(p&&(p.textContent=`${a.length} itens previstos`),!a.length){t.innerHTML=`
      <div class="empty-state">
        <p>Nenhum gasto estimado para ${E}.</p>
        <button class="btn-secondary" onclick="resetarItensEstimativaPadrao()" style="margin-top:.5rem">
          🔄 Carregar Itens Padrão
        </button>
      </div>
    `;return}const b=`
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
          ${a.map(r=>{const c=(r.quantidade||0)*(r.valorUnitario||0);return`
              <tr>
                <td>
                  <strong style="color:#f8fafc">${r.nome}</strong>
                </td>
                <td class="num">
                  <input type="number" min="1" step="1" class="form-control" style="width:70px;padding:.2rem .4rem;font-size:.82rem;text-align:center" value="${r.quantidade}" onchange="atualizarQtdItemEstimativa('${r.id}', this.value)">
                </td>
                <td class="num">
                  <input type="number" min="0" step="0.01" class="form-control" style="width:95px;padding:.2rem .4rem;font-size:.82rem;text-align:right" value="${r.valorUnitario}" onchange="atualizarValorItemEstimativa('${r.id}', this.value)">
                </td>
                <td class="num">
                  <strong style="color:#a5b4fc">${l(c)}</strong>
                </td>
                <td style="text-align:right">
                  <div style="display:flex;gap:.35rem;justify-content:flex-end">
                    <button type="button" class="btn-secondary" style="padding:.2rem .4rem;font-size:.75rem" onclick="abrirModalAddEstimativa('${r.id}')" title="Editar">✏️</button>
                    <button type="button" class="btn-danger" style="padding:.2rem .4rem;font-size:.75rem" onclick="excluirItemEstimativa('${r.id}')" title="Excluir">🗑️</button>
                  </div>
                </td>
              </tr>
            `}).join("")}
        </tbody>
      </table>
    </div>
  `;t.innerHTML=b}function Ct(){const t=document.getElementById("lista-mensal-container");if(!t)return;const e=new Date,a=new Date(e.getFullYear(),e.getMonth()+1,1),o=a.toLocaleString("pt-BR",{month:"long"}),n=a.getFullYear(),s=`${o.charAt(0).toUpperCase()+o.slice(1)} de ${n}`,i=lt(a.getFullYear(),a.getMonth()),d=31.8,u=20,m=i*d,v=i*u,p={};let b=0;U.forEach(y=>{const f=y.valorAPagar||0;b+=f;const $=y.mesAno||"Outros";p[$]=(p[$]||0)+f});const r=Math.max(1,Object.keys(p).length),c=b/r,g={};U.forEach(y=>{(y.itens||[]).forEach(f=>{const $=(f.nome||"").toLowerCase().trim();$&&(g[$]||(g[$]={nome:f.nome,marca:f.marca||"Geral",qtdTotal:0,frequenciaNotas:0,valoresUnitarios:[]}),g[$].qtdTotal+=f.quantidade||1,g[$].frequenciaNotas+=1,f.valorUnitario&&g[$].valoresUnitarios.push(f.valorUnitario))})});const x=Object.values(g).map(y=>{const f=y.valoresUnitarios.length>0?y.valoresUnitarios.reduce((ce,ve)=>ce+ve,0)/y.valoresUnitarios.length:0,$=y.qtdTotal/r,F=r/Math.max(1,y.frequenciaNotas),O=y.frequenciaNotas/r;let L=0;O>=.35||$>=.7?L=Math.ceil($):L=Math.round($),L<1&&y.frequenciaNotas>=r&&(L=1);const de=L*f;return{nome:y.nome,marca:y.marca,frequenciaNotas:y.frequenciaNotas,intervaloMeses:F,qtdMensalTaxa:$,totalEstimadoUnidades:L,valorUnitario:f,subtotalCalculado:de}}).filter(y=>y.totalEstimadoUnidades>0);x.sort((y,f)=>f.frequenciaNotas-y.frequenciaNotas);const I=x.reduce((y,f)=>y+f.subtotalCalculado,0),M=c>0?c*1.05:I;let w=1;I>M&&c>0&&(w=M/I);const B=x.map(y=>({...y,subtotalFinal:y.subtotalCalculado*w})),h=c>0?Math.min(I,M):I;let T=h;const S=Math.min(T,m);T-=S;const j=Math.min(T,v);T-=j;const z=T>0?T:0;let D=`
    <div class="card" style="margin-bottom:1.5rem; background: linear-gradient(135deg, rgba(30,41,59,0.9), rgba(15,23,42,0.95)); border: 1px solid #3b82f6;">
      <div class="card-header">
        <div>
          <span class="card-title" style="color:#60a5fa;">📅 Previsão de Compras — ${s}</span>
          <p class="card-subtext" style="color:#cbd5e1; margin-top:0.25rem;">
            Calculado com unidades inteiras exatas (${i} dias úteis em ${o}).
          </p>
        </div>
        <span class="badge green" style="font-size:0.8rem; padding:0.4rem 0.75rem;">${i} Dias Úteis</span>
      </div>

      <div class="payment-grid" style="margin-top:1rem;">
        <div class="payment-item" style="border-color: rgba(16,185,129,0.4);">
          <div class="p-label">🍽️ Vale Alimentação (${i}d × R$ 31,80)</div>
          <div class="p-val" style="color:#34d399;">${l(S)} <span style="font-size:0.75rem;font-weight:normal;color:var(--text-muted)">/ ${l(m)}</span></div>
        </div>
        <div class="payment-item" style="border-color: rgba(99,102,241,0.4);">
          <div class="p-label">💳 Cartão Crédito (${i}d × R$ 20,00)</div>
          <div class="p-val" style="color:#818cf8;">${l(j)} <span style="font-size:0.75rem;font-weight:normal;color:var(--text-muted)">/ ${l(v)}</span></div>
        </div>
        <div class="payment-item" style="border-color: ${z>0?"rgba(244,63,94,0.5)":"var(--border-color)"};">
          <div class="p-label">💳 Débito Necessário (Excedente)</div>
          <div class="p-val" style="color: ${z>0?"#fb7185":"var(--text-muted)"};">${l(z)}</div>
        </div>
      </div>

      <div style="margin-top:1.25rem; padding-top:1rem; border-top:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
        <div>
          <span style="font-size:0.85rem; color:var(--text-muted);">Total Estimado da Lista de Compras:</span>
          <p style="font-size:0.75rem; color:#60a5fa;">Média Histórica de Gastos: ${l(c)}</p>
        </div>
        <span style="font-size:1.6rem; font-weight:800; color:var(--primary);">${l(h)}</span>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-title">Lista de Itens com Frequência e Total Estimado</span>
        <span class="badge amber">${B.length} itens cadastrados</span>
      </div>
      <p class="card-subtext" style="margin-bottom:1rem;">
        O <strong>Total Estimado</strong> arredonda o consumo médio para cima (unidades inteiras exatas), pois os produtos são comprados por unidade no mercado.
      </p>
  `;window.dadosListaMensalCache={mesAnoStr:s,diasUteis:i,totalGeralEstimado:h,cobertoAlim:S,cobertoCred:j,cobertoDeb:z,alimDisponivel:m,credDisponivel:v,lista:B},B.length===0?D+='<div class="empty-state">Adicione notas fiscais para que o sistema gere automaticamente sua lista mensal de compras.</div></div>':D+=`
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
            ${B.map(y=>{const f=y.intervaloMeses>1.2?`A cada ${y.intervaloMeses.toFixed(1)} meses`:`Todo mês (${y.frequenciaNotas}x)`,$=y.qtdMensalTaxa<1?y.qtdMensalTaxa.toFixed(2):y.qtdMensalTaxa.toFixed(1),F=y.totalEstimadoUnidades.toFixed(1);return`
                <tr>
                  <td><strong>${y.nome}</strong></td>
                  <td><span class="badge amber">${y.marca}</span></td>
                  <td><span class="badge cyan">${f}</span></td>
                  <td class="num">${$} un/mês</td>
                  <td class="num"><span class="badge green" style="font-size:0.82rem;">${F}</span></td>
                  <td class="num">${l(y.valorUnitario)}</td>
                  <td class="num"><strong>${l(y.subtotalFinal)}</strong></td>
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
    </div>`,t.innerHTML=D}window.exportarPDFListaMensal=function(){if(!window.dadosListaMensalCache||!window.dadosListaMensalCache.lista.length){A("⚠️ Nenhuma lista mensal disponível para exportar.");return}const{mesAnoStr:t,diasUteis:e,totalGeralEstimado:a,cobertoAlim:o,cobertoCred:n,cobertoDeb:s,lista:i}=window.dadosListaMensalCache,d=window.open("","_blank","width=900,height=750");if(!d){alert("Permita pop-ups no navegador para gerar o PDF da lista.");return}const u=`
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
          ${i.map(m=>`
            <tr>
              <td class="check-col"><div class="chk-box"></div></td>
              <td><strong>${m.nome}</strong></td>
              <td>${m.marca}</td>
              <td class="num"><strong>${m.totalEstimadoUnidades.toFixed(1)} un</strong></td>
              <td class="num">${l(m.valorUnitario)}</td>
              <td class="num"><strong>${l(m.subtotalFinal)}</strong></td>
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
  `;d.document.open(),d.document.write(u),d.document.close()};document.getElementById("btn-start-cam").addEventListener("click",Ze);document.getElementById("btn-switch-cam").addEventListener("click",Mt);document.getElementById("btn-stop-cam").addEventListener("click",xe);async function Ze(){if(typeof Html5Qrcode>"u")return G("Carregando biblioteca de câmera, aguarde..."),setTimeout(Ze,600);try{X||(X=new Html5Qrcode("qr-reader")),Y=await Html5Qrcode.getCameras();let t;if(Y&&Y.length>0){const e=Y.findIndex(a=>/back|traseira|rear|environment/i.test(a.label));me=e>=0?e:0,t=Y[me].id}else t={facingMode:"environment"};await X.start(t,{fps:10,qrbox:{width:240,height:240}},Ye,()=>{}),ue=!0,document.getElementById("btn-start-cam").style.display="none",document.getElementById("btn-switch-cam").style.display=Y.length>1?"inline-flex":"none",document.getElementById("btn-stop-cam").style.display="inline-flex"}catch(t){G("❌ Não foi possível acessar a câmera. Verifique as permissões do navegador."),console.error(t)}}async function Mt(){if(!(!X||!ue))try{await X.stop(),Y.length>1&&(me=(me+1)%Y.length,await X.start(Y[me].id,{fps:10,qrbox:{width:240,height:240}},Ye,()=>{}))}catch(t){console.error("switchCam:",t)}}async function xe(){if(X&&ue)try{await X.stop()}catch{}ue=!1,document.getElementById("btn-start-cam").style.display="inline-flex",document.getElementById("btn-switch-cam").style.display="none",document.getElementById("btn-stop-cam").style.display="none"}async function Ye(t){xe(),document.getElementById("inp-url").value=t,G("✅ QR Code lido! Processando..."),await Ke(t)}document.getElementById("btn-carregar-dados").addEventListener("click",async()=>{const t=document.getElementById("inp-url").value.trim(),e=document.getElementById("inp-html").value.trim();if(!t&&!e){G("⚠️ Cole a URL do QR Code ou o conteúdo da página para ler a nota fiscal.");return}if(t&&!e){G("⏳ Consultando nota fiscal..."),await Ke(t);return}if(e){G("⏳ Processando conteúdo..."),await We(e);return}});document.getElementById("btn-preencher-manual").addEventListener("click",()=>{Je({nomeMercado:"",dataEmissao:new Date().toISOString(),valorTotal:0,descontoTotal:0,valorAPagar:0,qtdTotalItens:0,formasPagamento:{valeAlimentacao:0,cartaoCredito:0,cartaoDebito:0},itens:[]}),G("✍️ Preencha os dados da compra abaixo e clique em Salvar Nota Fiscal.","var(--accent-cyan)")});function Je(t){var s,i,d;document.getElementById("inp-mercado").value=t.nomeMercado||"",document.getElementById("inp-data").value=it(t.dataEmissao),document.getElementById("inp-vtotal").value=t.valorTotal!==void 0?t.valorTotal:0,document.getElementById("inp-desconto").value=t.descontoTotal!==void 0?t.descontoTotal:0,document.getElementById("inp-pagar").value=t.valorAPagar!==void 0?t.valorAPagar:0,document.getElementById("inp-qtd").value=t.qtdTotalItens!==void 0?t.qtdTotalItens:0,document.getElementById("inp-alim").value=((s=t.formasPagamento)==null?void 0:s.valeAlimentacao)||0,document.getElementById("inp-cred").value=((i=t.formasPagamento)==null?void 0:i.cartaoCredito)||0,document.getElementById("inp-deb").value=((d=t.formasPagamento)==null?void 0:d.cartaoDebito)||0,ae=t.itens||[];const e=document.getElementById("form-nfce");e.style.display="block";const a=document.getElementById("preview-itens-box"),o=document.getElementById("count-preview-itens"),n=document.getElementById("lista-preview-itens");ae.length>0?(a.style.display="block",o.textContent=ae.length,n.innerHTML=ae.map(u=>`
      <div style="display:flex; justify-content:space-between; padding: 0.35rem 0; border-bottom: 1px dashed var(--border-color);">
        <span><strong>${u.nome}</strong> (${u.quantidade} ${u.unidade||"Un"})</span>
        <span>${l(u.valorUnitario)}/un = <strong>${l(u.valorTotal)}</strong></span>
      </div>
    `).join("")):a.style.display="none",e.scrollIntoView({behavior:"smooth"})}document.getElementById("form-nfce").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-mercado").value.trim()||"Mercado",a=document.getElementById("inp-data").value||new Date().toISOString(),o=parseFloat(document.getElementById("inp-vtotal").value)||0,n=parseFloat(document.getElementById("inp-desconto").value)||0,s=parseFloat(document.getElementById("inp-pagar").value)||0,i=parseInt(document.getElementById("inp-qtd").value)||0,d=parseFloat(document.getElementById("inp-alim").value)||0,u=parseFloat(document.getElementById("inp-cred").value)||0,m=parseFloat(document.getElementById("inp-deb").value)||0,v=new Date(a).toISOString().slice(0,16),p=U.find(c=>{const g=new Date(c.dataEmissao).toISOString().slice(0,16),x=Math.abs((c.valorAPagar||0)-s)<.05,I=(c.nomeMercado||"").toLowerCase().trim()===e.toLowerCase().trim();return g===v&&x&&I});if(p){G(`⚠️ Esta nota fiscal já existe no sistema (Cadastrada em ${pe(p.dataEmissao)} no valor de ${l(p.valorAPagar)}). Nota não adicionada!`,"#fb7185"),A("⚠️ Nota fiscal já cadastrada! Operação cancelada.");return}const b=new Date(a),r=`${b.getFullYear()}-${String(b.getMonth()+1).padStart(2,"0")}`;G("⏳ Salvando nota fiscal no banco...");try{await fe(J(C,be),{nomeMercado:e,dataEmissao:a,mesAno:r,qtdTotalItens:i||ae.length,valorTotal:o,descontoTotal:n,valorAPagar:s,formasPagamento:{valeAlimentacao:d,cartaoCredito:u,cartaoDebito:m},itens:ae,createdAt:$e()}),G("✅ Nota salva com sucesso!","#34d399"),document.getElementById("form-nfce").style.display="none",document.getElementById("form-nfce").reset(),document.getElementById("inp-url").value="",document.getElementById("inp-html").value="",ae=[],Le(),goTab("dashboard"),A("🎉 Nota fiscal registrada no Firebase!")}catch(c){G("❌ Erro ao salvar: "+c.message,"#fb7185")}});async function Ke(t){const e=[a=>`https://api.allorigins.win/raw?url=${encodeURIComponent(a)}`,a=>`https://corsproxy.io/?${encodeURIComponent(a)}`];for(const a of e)try{const o=await fetch(a(t),{signal:AbortSignal.timeout(8e3)});if(o.ok){const n=await o.text();if(n&&n.length>200){await We(n);return}}}catch{}St(t)}function St(t){document.getElementById("modal-link").href=t,document.getElementById("modal-cors").classList.add("active"),G("⚠️ Abra o link, copie o conteúdo da página e cole no campo de texto abaixo.")}async function We(t){const e=Dt(t);Je(e),G("✅ Nota lida com sucesso! Confira os valores abaixo e altere se necessário antes de Salvar.","#34d399")}function Dt(t){var S,j,z;const a=new DOMParser().parseFromString(t,"text/html"),o=((S=a.body)==null?void 0:S.textContent)||t;let n=((z=(j=a.querySelector(".txtTopo, .nomeEmit, h1"))==null?void 0:j.textContent)==null?void 0:z.trim())||"Mercado",s=new Date().toISOString();const i=o.match(/Emiss[ãa]o\s*[:\-]?\s*(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})?/i)||o.match(/(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})/);if(i){const[D,y,f]=i[1].split("/");s=`${f}-${y}-${D}T${i[2]||"12:00:00"}`}const d=o.match(/Qtd\.?\s*total\s*de\s*itens\s*[:\s]*([\d,\.]+)/i),u=o.match(/Valor\s*total\s*R\$\s*[:\s]*([\d\.,]+)/i),m=o.match(/Descontos?\s*R\$\s*[:\s]*([\d\.,]+)/i),v=o.match(/Valor\s*a\s*pagar\s*R\$\s*[:\s]*([\d\.,]+)/i)||o.match(/VALOR\s*PAGO\s*R\$\s*[:\s]*([\d\.,]+)/i),p=o.match(/(?:Vale\s*)?Alimenta[çc][ãa]o\s*[:\s]*([\d\.,]+)/i),b=o.match(/(?:Cart[ãa]o\s*de\s*)?Cr[eé]dito\s*[:\s]*([\d\.,]+)/i),r=o.match(/(?:Cart[ãa]o\s*de\s*)?D[eé]bito\s*[:\s]*([\d\.,]+)/i),c=d?N(d[1]):0,g=u?N(u[1]):0,x=m?N(m[1]):0;let I=v?N(v[1]):g-x;const M={valeAlimentacao:p?N(p[1]):0,cartaoCredito:b?N(b[1]):0,cartaoDebito:r?N(r[1]):0},w=[];a.querySelectorAll("tr, .item, .itemNota").forEach(D=>{var Ie;const y=D.textContent;if(!/Vl\.\s*Unit|valorUnitario|Qtde?\./i.test(y))return;const f=D.querySelector(".txtTit, .txtTit2, .nomeProd"),$=((Ie=f==null?void 0:f.textContent)==null?void 0:Ie.trim())||"",F=y.match(/Qtde?\.\s*[:\s]*([\d,\.]+)/i),O=y.match(/Vl\.\s*Unit\.\s*[:\s]*([\d,\.]+)/i),L=y.match(/Vl\.\s*Total\s*([\d,\.]+)/i),de=y.match(/C[oó]digo\s*[:\s]*(\d+)/i),ce=y.match(/UN\s*[:\s]*([A-Za-z]+)/i),ve=F?N(F[1]):1,ye=O?N(O[1]):0,et=L?N(L[1]):ye*ve;$&&ye>0&&w.push({codigo:(de==null?void 0:de[1])||"",nome:$,marca:Ot($),quantidade:ve,unidade:(ce==null?void 0:ce[1])||"Un",valorUnitario:ye,valorTotal:et})});const h=new Date(s),T=`${h.getFullYear()}-${String(h.getMonth()+1).padStart(2,"0")}`;return{nomeMercado:n,dataEmissao:s,mesAno:T,qtdTotalItens:c,valorTotal:g,descontoTotal:x,valorAPagar:I,formasPagamento:M,itens:w}}function Ot(t){const e=["BAUDUCCO","BAUD","PANCO","DANONE","NESTLE","QUALITA","SADIA","PERDIGAO","SEARA","CAMIL","TIO JOAO","URBANO","LIZA","SOYA","YPE","PILAO","MELITTA","3 CORACOES","VIGOR","PARMALAT","ITALAC","HEINZ","KRAFT"],a=t.toUpperCase();for(const o of e)if(a.includes(o))return o;return a.split(" ")[0]||"Genérica"}function Lt(){const t=document.getElementById("lista-historico");if(!U.length){t.innerHTML='<div class="empty-state">📭 Nenhuma compra cadastrada ainda.</div>';return}t.innerHTML=U.map(e=>{var a,o,n;return`
    <div class="purchase-card">
      <div class="purchase-header" onclick="toggleDetail('${e.id}')">
        <div class="purchase-info">
          <h3>${e.nomeMercado||"Mercado"}</h3>
          <p>📅 ${pe(e.dataEmissao)} &nbsp;•&nbsp; 🛒 ${e.qtdTotalItens||0} itens</p>
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
        ${Xe(e)}
      </div>
    </div>`}).join("")}function Xe(t){return!t.itens||!t.itens.length?'<p class="card-subtext">Nenhum item detalhado registrado.</p>':`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Item</th><th>Marca</th><th class="num">Qtd</th><th class="num">Vl. Unit.</th><th class="num">Vl. Total</th></tr></thead>
    <tbody>${t.itens.map(e=>`<tr>
      <td>${e.nome}</td>
      <td><span class="badge amber">${e.marca||"—"}</span></td>
      <td class="num">${e.quantidade} ${e.unidade||"Un"}</td>
      <td class="num">${l(e.valorUnitario)}</td>
      <td class="num"><strong>${l(e.valorTotal)}</strong></td>
    </tr>`).join("")}</tbody>
  </table></div>`}window.toggleDetail=function(t){let e=document.getElementById("detail-"+t)||document.getElementById(t);!e&&t.startsWith("detail-")&&(e=document.getElementById(t.replace("detail-","")));let a=document.getElementById("chev-"+t)||document.getElementById("chev-"+t.replace("detail-",""));e&&e.classList.toggle("open"),a&&a.classList.toggle("open")};window.toggleGroupMonth=function(t){const e=document.getElementById(t),a=document.getElementById("chev-"+t);if(!e)return;const o=e.style.display==="none"||!e.style.display;e.style.display=o?"block":"none",a&&(o?a.classList.add("open"):a.classList.remove("open"))};window.confirmarExcluirMercado=async function(t){if(confirm("Excluir esta compra de mercado?"))try{await Z(R(C,be,t)),A("🗑️ Compra excluída.")}catch(e){alert("Erro: "+e.message)}};function Rt(){const t=document.getElementById("lista-comparacao"),e={};U.forEach(o=>{(o.itens||[]).forEach(n=>{var i;const s=((i=n.nome)==null?void 0:i.toLowerCase().trim())||"produto";e[s]||(e[s]={nome:n.nome,marca:n.marca,hist:{}}),e[s].hist[o.mesAno]=n.valorUnitario})});const a=Object.values(e);if(!a.length){t.innerHTML='<div class="empty-state">Adicione notas para ver a comparação de preços unitários.</div>';return}t.innerHTML=`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Produto</th><th>Marca</th><th>Histórico (Unitário)</th><th>Variação</th></tr></thead>
    <tbody>${a.map(o=>{const n=Object.keys(o.hist).sort();let s=n.map(d=>`${d}: <strong>${l(o.hist[d])}</strong>`).join(" → "),i='<span class="badge cyan">Estável</span>';if(n.length>=2){const d=o.hist[n[n.length-2]],m=o.hist[n[n.length-1]]-d,v=(m/d*100).toFixed(1);m>.01?i=`<span class="badge red">+${v}% ↑</span>`:m<-.01&&(i=`<span class="badge green">${v}% ↓</span>`)}return`<tr><td><strong>${o.nome}</strong></td><td><span class="badge amber">${o.marca||"—"}</span></td><td>${s}</td><td>${i}</td></tr>`}).join("")}</tbody>
  </table></div>`}function Ft(){const t=document.getElementById("lista-recorrencia"),e=document.getElementById("lista-marcas"),a={},o={};U.forEach(i=>{(i.itens||[]).forEach(d=>{var p;const u=(p=d.nome)==null?void 0:p.toLowerCase().trim();if(!u)return;a[u]||(a[u]={nome:d.nome,marca:d.marca,qtd:0,notas:0,units:[]}),a[u].qtd+=d.quantidade||1,a[u].notas+=1,a[u].units.push(d.valorUnitario||0);const m=(d.nome||"").split(" ")[0].toUpperCase();o[m]||(o[m]={});const v=d.marca||"Genérica";o[m][v]||(o[m][v]=[]),o[m][v].push(d.valorUnitario||0)})});const n=Object.values(a).filter(i=>i.notas>1).sort((i,d)=>d.notas-i.notas);t.innerHTML=n.length?`<div class="table-responsive"><table class="custom-table">
        <thead><tr><th>Item</th><th>Marca</th><th>Compras</th><th class="num">Qtd Total</th><th class="num">Média Unitária</th></tr></thead>
        <tbody>${n.map(i=>{const d=i.units.reduce((u,m)=>u+m,0)/i.units.length;return`<tr>
            <td><strong>${i.nome}</strong></td>
            <td><span class="badge amber">${i.marca||"—"}</span></td>
            <td><span class="badge green">${i.notas}x</span></td>
            <td class="num">${i.qtd}</td>
            <td class="num">${l(d)}</td>
          </tr>`}).join("")}</tbody>
      </table></div>`:'<div class="empty-state">Adicione notas para ver a recorrência de itens.</div>';const s=Object.entries(o).filter(([,i])=>Object.keys(i).length>1).map(([i,d])=>{let u=1/0,m="";const v=Object.entries(d).map(([p,b])=>{const r=b.reduce((c,g)=>c+g,0)/b.length;return r<u&&(u=r,m=p),{marca:p,med:r}});return`<div class="brand-card">
      <div class="brand-card-header">
        <span class="card-title">${i}</span>
        <span class="badge green">🏆 Menor preço: ${m} (${l(u)}/un)</span>
      </div>
      <div class="brands-row">
        ${v.map(p=>`<div class="brand-chip${p.marca===m?" best":""}">
          <div class="bc-name">${p.marca} ${p.marca===m?"✅":""}</div>
          <div class="bc-val">${l(p.med)}<span style="font-size:.7rem;font-weight:400">/un</span></div>
        </div>`).join("")}
      </div>
    </div>`}).join("");e.innerHTML=s||'<div class="empty-state">Ao comprar o mesmo tipo de produto com marcas diferentes, o sistema mostrará qual teve menor preço.</div>'}document.getElementById("btn-modal-close").addEventListener("click",()=>{document.getElementById("modal-cors").classList.remove("active")});
