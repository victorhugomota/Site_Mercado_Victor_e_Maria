import{initializeApp as st}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";import{getFirestore as rt,onSnapshot as ce,query as it,collection as K,orderBy as lt,doc as F,deleteDoc as Z,setDoc as H,addDoc as he,serverTimestamp as Ie}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function a(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(n){if(n.ep)return;n.ep=!0;const s=a(n);fetch(n.href,s)}})();const ze=document.createElement("script");ze.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js";document.head.appendChild(ze);const Ne=document.createElement("script");Ne.src="https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js";document.head.appendChild(Ne);const dt={apiKey:"AIzaSyANpFnEIkyN1XCT6qbtmVR9wx7sQHEsyrE",authDomain:"comprasmercado-23913.firebaseapp.com",projectId:"comprasmercado-23913",storageBucket:"comprasmercado-23913.firebasestorage.app",messagingSenderId:"317518149234",appId:"1:317518149234:web:94f38624d68a2b9a6634eb",measurementId:"G-2XP88EK37S"},ct=st(dt),M=rt(ct),Ee="compras",me="entradas",de="faturas",ie="boletos",Pe="reservas",oe="estimativas";let V=[],_=[],G=[],U=[],X=[],Q={valorAtualGuardado:0},$e=null,ae=null,J=[],ve=0,ge=!1,re=[];function l(t){return Number(t||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}function k(t){if(typeof t=="number")return t;if(!t)return 0;const e=parseFloat(String(t).replace(/R\$\s?/gi,"").replace(/\s/g,"").replace(/\./g,"").replace(",","."));return isNaN(e)?0:e}function fe(t){if(!t)return"—";try{return new Date(t).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}catch{return t}}function A(t,e=3500){const a=document.getElementById("toast");a.textContent=t,a.classList.add("show"),setTimeout(()=>a.classList.remove("show"),e)}function q(t,e="var(--accent-amber)"){const a=document.getElementById("status-msg");a&&(a.textContent=t,a.style.color=e)}function mt(t){if(!t)return new Date().toISOString().slice(0,16);try{const e=new Date(t);if(isNaN(e.getTime()))return new Date().toISOString().slice(0,16);const a=o=>String(o).padStart(2,"0");return`${e.getFullYear()}-${a(e.getMonth()+1)}-${a(e.getDate())}T${a(e.getHours())}:${a(e.getMinutes())}`}catch{return new Date().toISOString().slice(0,16)}}function ut(t,e){let a=0;const o=new Date(t,e+1,0).getDate();for(let n=1;n<=o;n++){const s=new Date(t,e,n).getDay();s!==0&&s!==6&&a++}return a}window.goTab=function(t){document.querySelectorAll(".tab-content").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".desktop-nav .nav-item").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".mobile-nav .mob-btn").forEach(a=>a.classList.remove("active"));const e=document.getElementById("tab-"+t);e&&e.classList.add("active"),document.querySelectorAll(`[data-tab="${t}"]`).forEach(a=>a.classList.add("active"))};document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>goTab(t.getAttribute("data-tab")))});document.querySelectorAll(".sub-item").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".sub-item").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".sub-tab-content").forEach(a=>a.style.display="none"),t.classList.add("active");const e=document.getElementById("sub-"+t.getAttribute("data-sub"));e&&(e.style.display="block")})});function ke(){document.getElementById("modal-add-nota").classList.add("active")}function qe(){ge&&Ce(),document.getElementById("modal-add-nota").classList.remove("active")}var De;(De=document.getElementById("btn-open-modal-home"))==null||De.addEventListener("click",ke);var Oe;(Oe=document.getElementById("btn-mercado-add-nota"))==null||Oe.addEventListener("click",ke);var Le;(Le=document.getElementById("btn-close-modal-add"))==null||Le.addEventListener("click",qe);ce(it(K(M,Ee),lt("dataEmissao","desc")),t=>{V=t.docs.map(e=>({id:e.id,...e.data()})),ee()},t=>console.error("Firestore Mercado:",t));ce(K(M,me),t=>{_=t.docs.map(e=>({id:e.id,...e.data()})),ee()},t=>console.error("Firestore Entradas:",t));ce(K(M,de),t=>{G=t.docs.map(e=>({id:e.id,...e.data()})),ee()},t=>console.error("Firestore Faturas:",t));ce(K(M,ie),t=>{U=t.docs.map(e=>({id:e.id,...e.data()})),ee()},t=>console.error("Firestore Boletos:",t));ce(F(M,Pe,"config"),t=>{t.exists()&&(Q=t.data()),ee()},t=>console.error("Firestore Reservas:",t));ce(K(M,oe),t=>{X=t.docs.map(e=>({id:e.id,...e.data()})),ee()},t=>console.error("Firestore Estimativas:",t));let $=new Date().toISOString().slice(0,7);const Ue=new Set;function ue(){const t=new Set,e=new Date().toISOString().slice(0,7);t.add(e);const a=new Date,o=new Date(a.getFullYear(),a.getMonth()+1,1),n=r=>String(r).padStart(2,"0"),s=`${o.getFullYear()}-${n(o.getMonth()+1)}`;return t.add(s),$&&t.add($),_.forEach(r=>{r.mesAno&&t.add(r.mesAno)}),G.forEach(r=>{r.mesAno&&t.add(r.mesAno)}),U.forEach(r=>{r.mesAno&&t.add(r.mesAno)}),V.forEach(r=>{r.mesAno&&t.add(r.mesAno)}),X.forEach(r=>{r.mesAno&&t.add(r.mesAno)}),Array.from(t).filter(r=>!Ue.has(r)).sort().reverse()}window.excluirMesSelecionadoAtual=function(){window.excluirDadosDoMes($)};window.selecionarMesGlobal=function(t){if(!t)return;$=t;const e=document.getElementById("inp-seletor-mes-global");e&&(e.value=t);const a=document.getElementById("inp-entradas-mes-ano");a&&(a.value=t);const o=document.getElementById("inp-fatura-vencimento");o&&(o.value=`${t}-10`,typeof atualizarMesRefFatura=="function"&&atualizarMesRefFatura());const n=document.getElementById("inp-boleto-vencimento");n&&(n.value=`${t}-10`,typeof atualizarMesRefBoleto=="function"&&atualizarMesRefBoleto()),ee()};window.verMesEIrParaControle=function(t){selecionarMesGlobal(t),typeof goTab=="function"&&goTab("mensal")};function pt(){const t=document.getElementById("seletor-meses-bar"),e=document.getElementById("seletor-meses-bar-salarios"),a=document.getElementById("seletor-meses-bar-estimativa"),o=ue();o.includes($)||($=o[0]||new Date().toISOString().slice(0,7));const n=document.getElementById("inp-seletor-mes-global");n&&n.value!==$&&(n.value=$);const s=document.getElementById("inp-entradas-mes-ano");s&&s.value!==$&&(s.value=$);const r=o.map(d=>{const[u,c]=d.split("-"),p=new Date(parseInt(u),parseInt(c)-1,1).toLocaleString("pt-BR",{month:"short"}).toUpperCase().replace(".",""),y=d===$;return`
      <button class="sub-item ${y?"active":""}" onclick="selecionarMesGlobal('${d}')" style="${y?"background:var(--secondary);color:#fff;border-color:var(--secondary);box-shadow:0 0 10px rgba(99,102,241,0.4);font-weight:700":"background:rgba(15,23,42,.6);color:var(--text-muted);border:1px solid var(--border-color)"}; display:inline-flex;align-items:center;gap:.35rem">
        📅 ${p}/${u}
      </button>
    `}).join("");t&&(t.innerHTML=r),e&&(e.innerHTML=r),a&&(a.innerHTML=r)}window.switchMensalSub=function(t){document.querySelectorAll("[data-mensal-sub]").forEach(o=>o.classList.remove("active")),document.querySelectorAll(".mensal-sub-content").forEach(o=>o.style.display="none");const e=document.querySelector(`[data-mensal-sub="${t}"]`);e&&e.classList.add("active");const a=document.getElementById(t);a&&(a.style.display="block")};function ee(){pt(),ft(),vt(),Ge(),xt(),Bt(),Dt(),Ot(),zt(),Nt(),Pt(),Mt()}function vt(){const t=$,e=_.filter(h=>h.mesAno===t),a=G.filter(h=>h.mesAno===t),o=U.filter(h=>h.mesAno===t),n=V.filter(h=>h.mesAno===t),s=e.reduce((h,w)=>h+(w.valor||0),0),r=a.reduce((h,w)=>h+(w.valorTotal!==void 0?w.valorTotal:w.valor||0),0),d=o.reduce((h,w)=>h+(w.valorTotal!==void 0?w.valorTotal:w.valor||0),0);let u=0;n.forEach(h=>{h.formasPagamento&&(u+=h.formasPagamento.cartaoDebito||0)});const c=s-r-d-u,v=document.getElementById("m-total-entradas");v&&(v.textContent=l(s));const p=document.getElementById("m-total-cartoes");p&&(p.textContent=l(r));const y=document.getElementById("m-total-boletos");y&&(y.textContent=l(d));const i=document.getElementById("m-mercado-debito");i&&(i.textContent=l(u));const m=document.getElementById("m-saldo-liquido");m&&(m.textContent=l(c),m.style.color=c>=0?"#60a5fa":"#fb7185");const[g,I]=t.split("-"),S=new Date(parseInt(g),parseInt(I)-1,1).toLocaleString("pt-BR",{month:"long"}),x=S.charAt(0).toUpperCase()+S.slice(1),T=document.getElementById("m-lbl-saldo-liquido");T&&(T.textContent=`Saldo Líquido (${x}/${g})`),gt(e,a,o,n)}function gt(t,e,a,o){const n=document.getElementById("content-salarios-mes");n&&(n.innerHTML=`
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header">
          <span class="card-title">💵 Entradas Registradas em ${$}</span>
          <span class="badge green">Total: ${l(t.reduce((u,c)=>u+(c.valor||0),0))}</span>
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
            </table></div>`:`<div class="empty-state">Nenhuma entrada cadastrada para ${$}. Use a aba "Salários & Entradas" para cadastrar.</div>`}
      </div>
    `);const s=document.getElementById("content-cartoes-mes");if(s){const u=e.reduce((v,p)=>v+(p.valorTotal||0),0),c=e.length?We(e,"mes_"+$):"";s.innerHTML=`
      ${c}
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header">
          <span class="card-title">💳 Faturas de Cartão Vencendo em ${$}</span>
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
                  ${Je(v)}
                </div>
              </div>
            `).join(""):`<div class="empty-state">Nenhuma fatura cadastrada com vencimento em ${$}. Use a aba "Cartões de Crédito" para importar.</div>`}
      </div>
    `}const r=document.getElementById("content-boletos-mes");if(r){const u=a.reduce((c,v)=>c+(v.valorTotal||0),0);r.innerHTML=`
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header">
          <span class="card-title">📄 Boletos Vencendo em ${$}</span>
          <span class="badge purple">Total: ${l(u)}</span>
        </div>
        ${a.length?a.map(c=>`
              <div class="purchase-card" style="margin-bottom:1rem">
                <div class="purchase-header" onclick="toggleDetail('bol-m-${c.id}')">
                  <div class="purchase-info">
                    <h3>📄 ${le(c)}</h3>
                    <p>Vencimento: <strong>${c.dataVencimento||"—"}</strong> • ${c.qtdItens||(c.itens?c.itens.length:0)} encargos</p>
                  </div>
                  <div class="purchase-values" style="display:flex;align-items:center;gap:.5rem">
                    <div style="text-align:right">
                      <div class="pv-total" style="color:#c084fc">${l(c.valorTotal)}</div>
                      <div class="pv-sub">Clique para ver detalhes <span class="chevron" id="chev-bol-m-${c.id}">▼</span></div>
                    </div>
                    <button type="button" class="btn-secondary" style="padding:.35rem .65rem;font-size:.78rem;margin-left:.25rem" onclick="event.stopPropagation(); editarValorBoletoDocumento('${c.id}')" title="Editar valor do boleto">
                      ✏️ Editar
                    </button>
                    <button type="button" class="btn-danger" style="padding:.35rem .65rem;font-size:.78rem" onclick="event.stopPropagation(); excluirBoletoDocumento('${c.id}')" title="Excluir este boleto de todos os lugares do sistema">
                      🗑️ Excluir
                    </button>
                  </div>
                </div>
                <div id="detail-bol-m-${c.id}" class="purchase-details">
                  <div class="details-toolbar">
                    <span style="font-weight:700;font-size:.9rem;color:var(--text-muted)">Detalhamento do Boleto</span>
                    <div style="display:flex;gap:.35rem">
                      <button class="btn-secondary" onclick="editarValorBoletoDocumento('${c.id}')">✏️ Editar Valor</button>
                      <button class="btn-danger" onclick="excluirBoletoDocumento('${c.id}')">🗑️ Excluir Boleto</button>
                    </div>
                  </div>
                  ${et(c)}
                </div>
              </div>
            `).join(""):`<div class="empty-state">Nenhum boleto cadastrado para ${$}. Use a aba "Boletos" para importar.</div>`}
      </div>
    `}const d=document.getElementById("content-mercado-mes");if(d){let u=0,c=0,v=0;o.forEach(p=>{p.formasPagamento?(u+=p.formasPagamento.valeAlimentacao||0,c+=p.formasPagamento.cartaoCredito||0,v+=p.formasPagamento.cartaoDebito||0):v+=p.valorAPagar||0}),d.innerHTML=`
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem">
          <span class="card-title">🛒 Compras de Mercado em ${$}</span>
          <div style="display:flex;gap:.4rem;align-items:center;flex-wrap:wrap">
            ${u>0?`<span class="badge green">🥗 Alimentação: ${l(u)}</span>`:""}
            ${c>0?`<span class="badge blue">💳 Crédito: ${l(c)}</span>`:""}
            ${v>0?`<span class="badge amber">💵 Débito: ${l(v)}</span>`:""}
            <span class="badge purple">${o.length} notas cadastradas</span>
          </div>
        </div>
        ${o.length?o.map(p=>`
              <div class="purchase-card" style="margin-bottom:1rem">
                <div class="purchase-header" onclick="toggleDetail('mer-m-${p.id}')">
                  <div class="purchase-info">
                    <h3>🛒 ${p.nomeMercado||"Mercado"}</h3>
                    <p>Data: <strong>${fe(p.dataEmissao)}</strong> • ${p.qtdTotalItens||0} itens</p>
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
                  ${nt(p)}
                </div>
              </div>
            `).join(""):`<div class="empty-state">Nenhuma nota de mercado cadastrada para ${$}.</div>`}
      </div>
    `}}function ft(){const t=ue();let e=0,a=0,o=0,n=0,s=0;t.forEach(i=>{const m=_.filter(x=>x.mesAno===i).reduce((x,T)=>x+(T.valor||0),0),g=G.filter(x=>x.mesAno===i).reduce((x,T)=>x+(T.valorTotal!==void 0?T.valorTotal:T.valor||0),0),I=U.filter(x=>x.mesAno===i).reduce((x,T)=>x+(T.valorTotal!==void 0?T.valorTotal:T.valor||0),0);let C=0;V.filter(x=>x.mesAno===i).forEach(x=>{x.formasPagamento&&(C+=x.formasPagamento.cartaoDebito||0)});const S=m-g-I-C;e+=m,a+=g,o+=I,n+=C,s+=S});let r=0,d=0;const u={};V.forEach(i=>{const m=i.valorAPagar||0;i.formasPagamento&&(r+=i.formasPagamento.valeAlimentacao||0,d+=i.formasPagamento.cartaoCredito||0);const g=i.mesAno||"Outros";u[g]=(u[g]||0)+m});const c=Q&&Q.valorAtualGuardado!==void 0?Q.valorAtualGuardado:3e3,v=s+c;document.getElementById("fin-total-entradas").textContent=l(e);const p=document.getElementById("fin-subtext-entradas");p&&(p.textContent="Soma Total das Entradas da Tabela Mensal"),document.getElementById("fin-total-cartoes").textContent=l(a),document.getElementById("fin-total-boletos").textContent=l(o),document.getElementById("fin-mercado-debito").textContent=l(n),document.getElementById("fin-saldo-liquido").textContent=l(s),document.getElementById("fin-saldo-liquido").style.color=s>=0?"#60a5fa":"#fb7185";const y=document.getElementById("fin-subtext-saldo");y&&(y.innerHTML=`Saldo Líquido + Reserva Guardada (${l(c)}): <strong style="color:#34d399">${l(v)}</strong>`),document.getElementById("dash-alimentacao").textContent=l(r),document.getElementById("dash-credito").textContent=l(d),document.getElementById("dash-debito").textContent=l(n),bt(),Ve(u)}function bt(){const t=document.getElementById("tabela-resumo-mensal");if(!t)return;const e=ue();if(!e.length){t.innerHTML='<div class="empty-state">Nenhum dado cadastrado ainda.</div>';return}const a=e.map(o=>{const n=_.filter(m=>m.mesAno===o).reduce((m,g)=>m+(g.valor||0),0),s=G.filter(m=>m.mesAno===o).reduce((m,g)=>m+(g.valorTotal!==void 0?g.valorTotal:g.valor||0),0),r=U.filter(m=>m.mesAno===o).reduce((m,g)=>m+(g.valorTotal!==void 0?g.valorTotal:g.valor||0),0);let d=0;V.filter(m=>m.mesAno===o).forEach(m=>{m.formasPagamento&&(d+=m.formasPagamento.cartaoDebito||0)});const u=n-s-r-d,[c,v]=o.split("-"),y=new Date(parseInt(c),parseInt(v)-1,1).toLocaleString("pt-BR",{month:"short"}).toUpperCase().replace(".","");return`
      <tr style="${o===$?"background:rgba(99,102,241,0.1)":""}">
        <td><strong>📅 ${y}/${c}</strong></td>
        <td style="color:#34d399"><strong>${l(n)}</strong></td>
        <td style="color:#fb7185">${l(s)}</td>
        <td style="color:#c084fc">${l(r)}</td>
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
  `}window.excluirDadosDoMes=async function(t){const e=t||$;if(!e)return;const[a,o]=e.split("-"),s=new Date(parseInt(a),parseInt(o)-1,1).toLocaleString("pt-BR",{month:"long"}),r=`${s.charAt(0).toUpperCase()+s.slice(1)} de ${a}`,d=_.filter(i=>i.mesAno===e),u=G.filter(i=>i.mesAno===e),c=U.filter(i=>i.mesAno===e),v=V.filter(i=>i.mesAno===e),p=X.filter(i=>i.id===e),y=`⚠️ TEM CERTEZA QUE DESEJA EXCLUIR O MÊS ${r.toUpperCase()} (${e})?

Isso irá APAGAR PERMANENTEMENTE todos os registros vinculados a este mês:
• ${d.length} Salário(s) / Entrada(s)
• ${u.length} Fatura(s) de Cartão
• ${c.length} Boleto(s) & Conta(s)
• ${v.length} Nota(s) de Mercado
• Estimativa orçamentária do mês

Esta ação é irreversível. Confirmar exclusão do mês?`;if(confirm(y))try{const i=[];d.forEach(g=>i.push(Z(F(M,me,g.id)))),u.forEach(g=>i.push(Z(F(M,de,g.id)))),c.forEach(g=>i.push(Z(F(M,ie,g.id)))),v.forEach(g=>i.push(Z(F(M,Ee,g.id)))),p.forEach(g=>i.push(Z(F(M,oe,g.id)))),i.length>0&&await Promise.all(i),Ue.add(e),A(`🗑️ O mês ${r} e todos os seus dados foram excluídos com sucesso!`),$=ue()[0]||new Date().toISOString().slice(0,7),ee()}catch(i){alert("Erro ao excluir dados do mês: "+i.message)}};function Ve(t){var s;if(typeof Chart>"u")return setTimeout(()=>Ve(t),300);const e=(s=document.getElementById("chart-barras"))==null?void 0:s.getContext("2d");if(!e)return;const a=Object.keys(t).sort(),o=a.map(r=>{const[d,u]=r.split("-");return`${u}/${d}`}),n=a.map(r=>t[r]);$e&&$e.destroy(),$e=new Chart(e,{type:"bar",data:{labels:o.length?o:["Sem compras"],datasets:[{label:"Gasto Mercado R$",data:n.length?n:[0],backgroundColor:"rgba(16,185,129,0.78)",borderColor:"#10b981",borderWidth:2,borderRadius:8}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:r=>` ${l(r.raw)}`}}},scales:{y:{beginAtZero:!0,grid:{color:"rgba(255,255,255,.05)"},ticks:{color:"#94a3b8",callback:r=>"R$"+r}},x:{grid:{display:!1},ticks:{color:"#94a3b8"}}}}})}function je(t){if(!t)return 0;const e=t.match(/L[íi]quido(?:\s*a\s*receber)?\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/TOTAL\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/SAL[ÁA]RIO\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/VALOR\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i);return e?k(e[1]):0}function yt(){const t=document.getElementById("inp-entradas-mes-ano");if(t&&!t.value){const e=new Date,a=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0");t.value=`${a}-${o}`}}setTimeout(yt,300);let se="mes";window.toggleFiltroEntradasTabela=function(t){se=t,Ge()};document.getElementById("form-holerite-victor").addEventListener("submit",async t=>{t.preventDefault();const e=$||document.getElementById("inp-entradas-mes-ano").value||new Date().toISOString().slice(0,7),a=document.getElementById("inp-holerite-txt-victor").value;let o=parseFloat(document.getElementById("inp-salario-val-victor").value)||0;if(!o&&a&&(o=je(a)),!o){A("⚠️ Digite ou cole um holerite válido com valor.");return}const n=`salario_victor_${e}`;await H(F(M,me,n),{pessoa:"Victor",tipo:"holerite",descricao:`Salário Líquido Victor (${e})`,valor:o,mesAno:e,data:new Date().toISOString()}),document.getElementById("inp-holerite-txt-victor").value="",document.getElementById("inp-salario-val-victor").value="",A(`✅ Salário do Victor (${e}) salvo com sucesso!`)});document.getElementById("form-holerite-maria").addEventListener("submit",async t=>{t.preventDefault();const e=$||document.getElementById("inp-entradas-mes-ano").value||new Date().toISOString().slice(0,7),a=document.getElementById("inp-holerite-txt-maria").value;let o=parseFloat(document.getElementById("inp-salario-val-maria").value)||0;if(!o&&a&&(o=je(a)),!o){A("⚠️ Digite ou cole um holerite válido com valor.");return}const n=`salario_maria_${e}`;await H(F(M,me,n),{pessoa:"Maria",tipo:"holerite",descricao:`Salário Líquido Maria (${e})`,valor:o,mesAno:e,data:new Date().toISOString()}),document.getElementById("inp-holerite-txt-maria").value="",document.getElementById("inp-salario-val-maria").value="",A(`✅ Salário da Maria (${e}) salvo com sucesso!`)});document.getElementById("form-entrada-manual").addEventListener("submit",async t=>{t.preventDefault();const e=$||document.getElementById("inp-entradas-mes-ano").value||new Date().toISOString().slice(0,7),a=document.getElementById("inp-ent-desc").value.trim(),o=parseFloat(document.getElementById("inp-ent-val").value)||0,n=document.getElementById("inp-ent-pessoa").value;!a||!o||(await he(K(M,me),{pessoa:n,tipo:"manual",descricao:a,valor:o,mesAno:e,data:new Date().toISOString()}),t.target.reset(),A(`🎉 Entrada manual (${e}) registrada!`))});function Ge(){var u,c,v;const t=$||((u=document.getElementById("inp-entradas-mes-ano"))==null?void 0:u.value)||new Date().toISOString().slice(0,7),e=document.getElementById("lbl-entradas-mes-ref");if(e){const[p,y]=t.split("-"),m=new Date(parseInt(p),parseInt(y)-1,1).toLocaleString("pt-BR",{month:"long"}),g=m.charAt(0).toUpperCase()+m.slice(1);e.textContent=`Visualizando e inserindo entradas para: ${g} de ${p}`}const a=((c=_.find(p=>p.pessoa==="Victor"&&p.tipo==="holerite"&&p.mesAno===t))==null?void 0:c.valor)||0,o=((v=_.find(p=>p.pessoa==="Maria"&&p.tipo==="holerite"&&p.mesAno===t))==null?void 0:v.valor)||0,n=_.filter(p=>p.mesAno===t),s=n.reduce((p,y)=>p+(y.valor||0),0);document.getElementById("val-salario-victor").textContent=l(a),document.getElementById("val-salario-maria").textContent=l(o),document.getElementById("val-entradas-combinado").textContent=`${l(s)}`;const r=document.getElementById("lista-entradas-registradas");if(!r)return;const d=se==="mes"?n:_;if(!d.length){r.innerHTML=`
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;flex-wrap:wrap;gap:.5rem">
        <span style="font-size:.84rem;color:var(--text-muted)">Modo de Exibição da Tabela:</span>
        <div style="display:flex;gap:.35rem">
          <button type="button" class="btn-secondary" style="padding:.25rem .6rem;font-size:.78rem;${se==="mes"?"background:var(--secondary);color:#fff":""}" onclick="toggleFiltroEntradasTabela('mes')">📅 Mês (${t})</button>
          <button type="button" class="btn-secondary" style="padding:.25rem .6rem;font-size:.78rem;${se==="todos"?"background:var(--secondary);color:#fff":""}" onclick="toggleFiltroEntradasTabela('todos')">🌐 Todas as Entradas</button>
        </div>
      </div>
      <div class="empty-state">Nenhuma entrada registrada para ${se==="mes"?"o mês "+t:"o sistema"}.</div>
    `;return}r.innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.75rem;flex-wrap:wrap;gap:.5rem">
      <span style="font-size:.84rem;color:var(--text-muted);font-weight:600">Exibindo ${d.length} entrada(s) em tabela:</span>
      <div style="display:flex;gap:.35rem">
        <button type="button" class="btn-secondary" style="padding:.25rem .6rem;font-size:.78rem;${se==="mes"?"background:var(--secondary);color:#fff":""}" onclick="toggleFiltroEntradasTabela('mes')">📅 Mês ${t}</button>
        <button type="button" class="btn-secondary" style="padding:.25rem .6rem;font-size:.78rem;${se==="todos"?"background:var(--secondary);color:#fff":""}" onclick="toggleFiltroEntradasTabela('todos')">🌐 Todas</button>
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
  `}window.excluirEntrada=async function(t){confirm("Excluir esta entrada?")&&(await Z(F(M,me,t)),A("🗑️ Entrada removida."))};let xe="Nubank",N=null;function ht(){const t=document.getElementById("inp-fatura-vencimento");if(t&&!t.value){const e=new Date,a=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0");t.value=`${a}-${o}-10`,atualizarMesRefFatura()}}setTimeout(ht,300);window.atualizarMesRefFatura=function(){const t=document.getElementById("inp-fatura-vencimento"),e=document.getElementById("lbl-fatura-mes-ref");if(!(!t||!e))if(t.value){const[a,o]=t.value.split("-"),s=new Date(parseInt(a),parseInt(o)-1,1).toLocaleString("pt-BR",{month:"long"});e.textContent=`Fatura ${s.charAt(0).toUpperCase()+s.slice(1)}/${a}`}else e.textContent="Mês da Fatura"};window.selecionarCartaoFatura=function(t){xe=t,document.querySelectorAll(".btn-card-select").forEach(a=>a.classList.remove("active"));const e=document.querySelector(`.btn-card-select[data-card="${t}"]`);e&&e.classList.add("active"),A(`Cartão selecionado: ${t}`)};window.handleFileFaturaSelect=async function(t){const e=t.target.files[0];if(!e)return;const a=document.getElementById("txt-file-fatura");a&&(a.textContent=`📄 Arquivo: ${e.name}`),A(`⏳ Lendo arquivo da fatura (${e.name})...`);let o="";if(e.type==="application/pdf"||e.name.endsWith(".pdf"))o=await He(e);else try{o=await e.text()}catch{o=""}o?(document.getElementById("inp-fatura-txt").value=o,await Qe(o,xe)):A("❌ Não foi possível ler o texto do arquivo da fatura.")};async function He(t){try{const e=await t.arrayBuffer();if(typeof pdfjsLib>"u")return A("⚠️ Aguarde a biblioteca de PDF carregar..."),"";pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";let a=pdfjsLib.getDocument({data:e});a.onPassword=(s,r)=>{let d=prompt(`🔒 Este PDF de fatura está protegido por senha.
Digite a senha para abrir (ex: CPF ou Data de Nascimento):`);d?s(d):A("⚠️ Senha não informada. Leitura do PDF cancelada.")};const o=await a.promise;let n="";for(let s=1;s<=o.numPages;s++){const d=await(await o.getPage(s)).getTextContent();let u=null,c="";for(const v of d.items){if(!v.str)continue;const p=v.transform?v.transform[5]:null;u!==null&&Math.abs(p-u)>3?c+=`
`:c.length>0&&!c.endsWith(`
`)&&!c.endsWith(" ")&&(c+=" "),c+=v.str,u=p}n+=c+`
`}return n}catch(e){return e.name==="PasswordException"?A("🔒 O PDF precisa de senha válida para ser aberto."):console.error("Erro ao ler PDF:",e),""}}function Et(t){if(!t)return null;const e=t.match(/Total\s*a\s*Pagar\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/no\s*valor\s*de\s*R?\$\s*([\d\.,]+)/i)||t.match(/Valor\s*total\s*da\s*fatura\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/Total\s*da\s*fatura\s*[:\s]*R?\$\s*([\d\.,]+)/i);if(e){const a=k(e[1]);if(a>0)return a}return null}function $t(t){if(!t)return null;const e=t.match(/Vencimento\s*[:\s]*(\d{2}[\/\.-]\d{2}[\/\.-]\d{4})/i)||t.match(/Data\s*de\s*vencimento\s*[:\s]*(\d{2})\s+([A-Za-z]{3})\s+(\d{4})/i)||t.match(/FATURA\s+(\d{2})\s+([A-Za-z]{3})\s+(\d{4})/i);if(e){if(e[2]&&e[3]){const a=e[1],o=e[2].toUpperCase(),n=e[3],r={JAN:"01",FEB:"02",MAR:"03",ABR:"04",APR:"04",MAI:"05",MAY:"05",JUN:"06",JUL:"07",AGO:"08",AUG:"08",SET:"09",SEP:"09",OUT:"10",OCT:"10",NOV:"11",DEZ:"12",DEC:"12"}[o]||"07";return`${n}-${r}-${a.padStart(2,"0")}`}else if(e[1]){const[a,o,n]=e[1].split(/[\/\.-]/);return`${n}-${o.padStart(2,"0")}-${a.padStart(2,"0")}`}}return null}window.importarFaturaManualOuArquivo=async function(){const t=document.getElementById("inp-fatura-txt").value.trim();if(!t){A("⚠️ Selecione o arquivo da fatura (.pdf, .csv) ou cole o texto da fatura.");return}await Qe(t,xe)};async function Qe(t,e){const a=$t(t);a&&(document.getElementById("inp-fatura-vencimento").value=a,atualizarMesRefFatura());const o=Et(t),n=At(t),s=document.getElementById("inp-fatura-vencimento").value||new Date().toISOString().slice(0,10),r=s.slice(0,7),d=n.reduce((y,i)=>y+i.valor,0),u=o||d||0,c=e?`Cartão ${e}`:"Fatura Cartão";N={cartao:e||"Nubank",descricao:c,dataVencimento:s,mesAno:r,valorTotal:u,qtdItens:n.length,itens:n};const v=document.getElementById("inp-revisao-fatura-desc");v&&(v.value=c);const p=document.getElementById("inp-revisao-fatura-val");p&&(p.value=u?u.toFixed(2):""),_e(),n.length>0?A(`✅ ${n.length} compras encontradas! Fatura total: ${l(u)}.`):A("ℹ️ Fatura pronta para revisão. Confirme o valor total e o cartão abaixo.")}window.atualizarValorTotalRevisaoFatura=function(){var e;if(!N)return;const t=parseFloat((e=document.getElementById("inp-revisao-fatura-val"))==null?void 0:e.value)||0;N.valorTotal=t,document.getElementById("badge-total-preview-fatura").textContent=l(t)};function _e(){if(!N)return;const{valorTotal:t,itens:e,cartao:a,descricao:o}=N;document.getElementById("badge-total-preview-fatura").textContent=l(t);const n=document.getElementById("inp-revisao-fatura-desc");n&&(!n.value||n.value==="Fatura Cartão")&&(n.value=o||`Cartão ${a||"Nubank"}`);const s=document.getElementById("inp-revisao-fatura-val");s&&(!s.value||parseFloat(s.value)===0)&&(s.value=t?t.toFixed(2):"");const r=document.getElementById("lista-preview-fatura-itens");!e||!e.length?r.innerHTML='<div class="empty-state">Nenhum item individual extraído. O valor total acima será considerado.</div>':r.innerHTML=e.map((u,c)=>`
      <div style="display:flex; justify-content:space-between; align-items:center; padding:.4rem 0; border-bottom:1px dashed var(--border-color); font-size:.82rem;">
        <span><strong>${u.dataCompra||"—"}</strong> — ${u.descricao}</span>
        <div style="display:flex; align-items:center; gap:.75rem;">
          <span style="color:#fb7185; font-weight:700;">${l(u.valor)}</span>
          <button type="button" class="btn-danger" style="padding:.15rem .45rem; font-size:.75rem;" onclick="removerItemRevisaoFatura(${c})">🗑️</button>
        </div>
      </div>
    `).join("");const d=document.getElementById("box-revisao-fatura");d.style.display="block",d.scrollIntoView({behavior:"smooth"})}window.removerItemRevisaoFatura=function(t){if(!N||!N.itens)return;N.itens.splice(t,1);const e=N.itens.reduce((a,o)=>a+o.valor,0);if(e>0){N.valorTotal=e;const a=document.getElementById("inp-revisao-fatura-val");a&&(a.value=e.toFixed(2))}N.qtdItens=N.itens.length,_e(),A("🗑️ Item removido da revisão da fatura.")};window.confirmarEGravarFaturaDocumento=async function(){var o,n;if(!N)return;const t=(o=document.getElementById("inp-revisao-fatura-desc"))==null?void 0:o.value.trim(),e=parseFloat((n=document.getElementById("inp-revisao-fatura-val"))==null?void 0:n.value)||0,a=document.getElementById("inp-fatura-vencimento").value||new Date().toISOString().slice(0,10);if(!e){A("⚠️ Digite ou confirme o valor total da fatura.");return}N.cartao=t||N.cartao||"Cartão",N.valorTotal=e,N.dataVencimento=a,N.mesAno=a.slice(0,7);try{await he(K(M,de),{...N,createdAt:Ie()}),document.getElementById("box-revisao-fatura").style.display="none",document.getElementById("inp-fatura-txt").value="";const s=document.getElementById("txt-file-fatura");s&&(s.textContent="Clique para Selecionar o Arquivo da Fatura");const r=l(N.valorTotal);N=null,A(`🎉 Fatura de ${r} salva com sucesso!`)}catch(s){alert("Erro ao salvar fatura: "+s.message)}};function At(t){if(!t)return[];const e=[],a=/(?:[@\)\(\*•\s]+)?(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+(?:(\d{2}\/\d{2})\s+)?(-?R?\$\s*[\d\.]+,\d{2}|-?[\d\.]+,\d{2})/gi;if(t.split(`
`).forEach(n=>{const s=n.trim();if(!s||/EMISS[ÃA]O|TRANSA[ÇC][ÕO]ES|RESUMO|PAGAMENTO DE FATURA|TOTAL DA FATURA|FATURA ANTERIOR|SALDO ANTERIOR|LIMITE DISPON[ÍI]VEL|OPÇÕES DE PAGAMENTO|ALTERNATIVAS DE PAGAMENTO|PAGAMENTO E DEMAIS|PARCELAMENTOS|DESPESAS|HISTÓRICO DE FATURAS|SUPERCRÉDITO|SAQUE À CRÉDITO|COMPRA DATA DESCRIÇÃO/i.test(s))return;const r=/(?:[@\)\(\*•\s]+)?(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+(?:(\d{2}\/\d{2})\s+)?(-?R?\$\s*[\d\.]+,\d{2}|-?[\d\.]+,\d{2})$/i,d=s.match(r)||s.match(/(?:[@\)\(\*•\s]+)?(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+(?:(\d{2}\/\d{2})\s+)?(-?R?\$\s*[\d\.]+,\d{2}|-?[\d\.]+,\d{2})/i);if(d){const u=d[1];let c=d[2].trim();const v=d[3],p=d[4];if(p.includes("-")||/DEB AUTOM|PAGAMENTO|PAGTO|CR[ÉE]DITO FATURA/i.test(c))return;const y=k(p);v&&(c+=` (${v})`),c&&y>0&&c.length>2&&!/fatura|limite|pagamento|saldo|alternativas|opções|período|emissão|vencimento/i.test(c)&&e.push({dataCompra:u,descricao:c,valor:y})}}),e.length===0){let n;for(;(n=a.exec(t))!==null;){const s=n[1];let r=n[2].trim();const d=n[3],u=n[4];if(u.includes("-")||/DEB AUTOM|PAGAMENTO|PAGTO|CR[ÉE]DITO FATURA/i.test(r))continue;const c=k(u);d&&(r+=` (${d})`),r&&c>0&&r.length>2&&!/fatura|limite|pagamento|saldo|alternativas|opções|período|emissão|vencimento/i.test(r)&&e.push({dataCompra:s,descricao:r,valor:c})}}return e}window.ultimosLocaisAnalisados={};function Ze(t){if(!t)return"DIVERSOS";let e=t.replace(/\(\d{1,2}\/\d{1,2}\)/gi,"").replace(/\b\d{1,2}\/\d{1,2}\b/gi,"").replace(/\b\d{1,2}x\b/gi,"").trim();return e=e.replace(/\s+/g," "),e.toUpperCase()}function Ye(t){const e={};(Array.isArray(t)?t:[t]).forEach(n=>{!n||!n.itens||!Array.isArray(n.itens)||n.itens.forEach(s=>{if(!s.descricao||!s.valor)return;const r=Ze(s.descricao);e[r]||(e[r]={nome:r,qtd:0,valorTotal:0,compras:[]}),e[r].qtd+=1,e[r].valorTotal+=s.valor||0,e[r].compras.push({dataCompra:s.dataCompra||"—",descricao:s.descricao,valor:s.valor||0,cartao:n.cartao||"Cartão",mesAno:n.mesAno||"—"})})});const o=Object.values(e).filter(n=>n.qtd>=2);return o.sort((n,s)=>s.valorTotal-n.valorTotal),o}function We(t,e="geral"){const a=Ye(t);if(a.forEach(n=>{window.ultimosLocaisAnalisados[`${e}_${n.nome}`]=n}),!a.length)return`
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
  `,a.style.display="flex"};window.fecharModalEstabelecimento=function(){const t=document.getElementById("modal-detalhes-estabelecimento");t&&(t.style.display="none")};function Ae(t){if(!t)return{nome:"Outros & Diversos",icone:"📦",cor:"blue"};const e=t.toUpperCase();return e.includes("ZARA")||e.includes("RENNER")||e.includes("C&A")||e.includes("RIACHUELO")||e.includes("ROUPA")||e.includes("VESTUARIO")||e.includes("SAPATO")||e.includes("CALCADO")||e.includes("CENTAURO")||e.includes("NIKE")||e.includes("ADIDAS")||e.includes("SHEIN")||e.includes("DAFITI")?{nome:"Vestuário & Roupas",icone:"👗",cor:"rose"}:e.includes("VIAGEM")||e.includes("AIRBNB")||e.includes("BOOKING")||e.includes("HOTEL")||e.includes("POUSADA")||e.includes("DECOLAR")||e.includes("LATAM")||e.includes("GOL")||e.includes("AZUL")||e.includes("FLIGHT")||e.includes("PASSAGEM")||e.includes("PASSAGENS")?{nome:"Viagens & Hospedagem",icone:"✈️",cor:"purple"}:e.includes("AUTOPOSTO")||e.includes("POSTO")||e.includes("UBER")||e.includes("99")||e.includes("SHELL")||e.includes("IPIRANGA")||e.includes("PETROBRAS")||e.includes("COMBUSTIVEL")||e.includes("PEDAGIO")?{nome:"Transporte & Combustível",icone:"⛽",cor:"amber"}:e.includes("SAVEGNAGO")||e.includes("TONELLI")||e.includes("SUPERMERCADO")||e.includes("MERCADO")||e.includes("ATACADAO")||e.includes("CARREFOUR")||e.includes("PAO DE ACUCAR")||e.includes("MARTINS")?{nome:"Supermercado & Alimentação",icone:"🛒",cor:"green"}:e.includes("SORVETERIA")||e.includes("PIZZA")||e.includes("BURGER")||e.includes("IFOOD")||e.includes("RESTAURANTE")||e.includes("BAR")||e.includes("PUB")||e.includes("DELICIAS")||e.includes("CHOCOLATE")||e.includes("CINEMA")||e.includes("OUTBACK")||e.includes("MC DONALDS")||e.includes("KFC")?{nome:"Restaurantes & Lazer",icone:"🍕",cor:"orange"}:e.includes("COSMETICO")||e.includes("COSMETICOS")||e.includes("FARMACIA")||e.includes("DROGARIA")||e.includes("DROGASIL")||e.includes("PAGUE MENOS")||e.includes("PERFUMARIA")||e.includes("NATURA")||e.includes("BOTICARIO")||e.includes("ESSENCIA")?{nome:"Saúde & Cosméticos",icone:"💄",cor:"pink"}:e.includes("AMAZON")||e.includes("MERCADO LIVRE")||e.includes("MAGALU")||e.includes("MAGAZINE")||e.includes("SHOPEE")||e.includes("ALIEXPRESS")||e.includes("FAST SHOP")||e.includes("APPLE")||e.includes("KABUM")?{nome:"Eletrônicos & Shopping",icone:"📱",cor:"cyan"}:{nome:"Outros & Diversos",icone:"📦",cor:"blue"}}function It(t){if(!t||!t.length)return"";const e=[];t.forEach(i=>{i.itens&&Array.isArray(i.itens)&&i.itens.forEach(m=>{m.descricao&&m.valor&&e.push({...m,cartao:i.cartao||"Cartão",mesAno:i.mesAno||"Outros"})})});const a=t.reduce((i,m)=>i+(m.valorTotal!==void 0?m.valorTotal:m.valor||0),0),o={};e.forEach(i=>{const m=Ze(i.descricao);o[m]||(o[m]={nome:m,valorTotal:0,qtd:0}),o[m].valorTotal+=i.valor,o[m].qtd+=1});const n=Object.values(o).sort((i,m)=>m.valorTotal-i.valorTotal).slice(0,5),s={};e.forEach(i=>{const m=Ae(i.descricao);s[m.nome]||(s[m.nome]={...m,valorTotal:0,qtd:0}),s[m.nome].valorTotal+=i.valor,s[m.nome].qtd+=1});const r=Object.values(s).sort((i,m)=>m.valorTotal-i.valorTotal),d={};t.forEach(i=>{const m=i.mesAno||"Outros";d[m]||(d[m]=[]),d[m].push(i)});const u=Object.keys(d).sort((i,m)=>m.localeCompare(i)),c=u[0],v=u[1];let p="",y="";if(c&&v){let x=function(b){if(!b||!b.includes("-"))return b;const[E,R]=b.split("-"),L=new Date(parseInt(E),parseInt(R)-1,1).toLocaleString("pt-BR",{month:"long"});return`${L.charAt(0).toUpperCase()+L.slice(1)}/${E}`};const i=d[c]||[],m=d[v]||[],g=i.reduce((b,E)=>b+(E.valorTotal!==void 0?E.valorTotal:E.valor||0),0),I=m.reduce((b,E)=>b+(E.valorTotal!==void 0?E.valorTotal:E.valor||0),0),C=g-I,S=I>0?(C/I*100).toFixed(1):0,T=x(c),h=x(v),w={},O={};i.forEach(b=>{b.itens&&b.itens.forEach(E=>{const R=Ae(E.descricao).nome;w[R]=(w[R]||0)+(E.valor||0)})}),m.forEach(b=>{b.itens&&b.itens.forEach(E=>{const R=Ae(E.descricao).nome;O[R]=(O[R]||0)+(E.valor||0)})});const j=Array.from(new Set([...Object.keys(w),...Object.keys(O)])),z=[];j.forEach(b=>{const E=w[b]||0,R=O[b]||0,D=E-R;if(D>50){const L=R>0?(D/R*100).toFixed(0):"100+";z.push({categoria:b,vAtual:E,vAnterior:R,difCat:D,pctCat:L})}}),z.sort((b,E)=>E.difCat-b.difCat);let B=C>0?"📈":"📉",f=C>0?"+":"";p=`
      <div style="background:rgba(15,23,42,0.7); border:1px solid var(--border-color); border-radius:10px; padding:.85rem 1rem; margin-bottom:1rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:.75rem">
        <div>
          <span style="font-size:.82rem; color:var(--text-muted); display:block">⚖️ Comparativo Mês Atual (${T}) vs Mês Anterior (${h})</span>
          <div style="font-size:1.05rem; font-weight:700; color:#f8fafc; margin-top:.2rem">
            ${l(g)} <span style="font-size:.82rem; font-weight:400; color:var(--text-muted)">em ${T}</span> vs ${l(I)} <span style="font-size:.82rem; font-weight:400; color:var(--text-muted)">em ${h}</span>
          </div>
        </div>
        <div style="text-align:right">
          <span class="badge ${C>0?"rose":"green"}" style="font-size:.88rem; padding:.35rem .75rem">
            ${B} Variação: ${f}${l(C)} (${f}${S}%)
          </span>
        </div>
      </div>
    `,z.length>0?y=`
        <div style="margin-top:1rem; background:rgba(251,113,133,0.08); border:1px dashed rgba(251,113,133,0.35); border-radius:10px; padding:.85rem 1rem">
          <div style="font-weight:700; font-size:.9rem; color:#fb7185; margin-bottom:.5rem; display:flex; align-items:center; gap:.4rem">
            💡 DICAS DE ECONOMIA & RECOMENDAÇÕES (Categorias com Aumento em ${T}):
          </div>
          <div style="display:flex; flex-direction:column; gap:.5rem">
            ${z.map(b=>`
              <div style="font-size:.83rem; color:#f1f5f9; background:rgba(15,23,42,0.8); border-left:3px solid #fb7185; padding:.5rem .75rem; border-radius:4px">
                🚨 <strong>${b.categoria}</strong>: Gastos subiram <strong style="color:#fb7185">+${l(b.difCat)} (+${b.pctCat}%)</strong> em relação a ${h} (${l(b.vAtual)} vs ${l(b.vAnterior)}).
                <span style="color:var(--text-muted); display:block; margin-top:.2rem">👉 <em>Recomendação: Para o próximo mês, busque limitar os gastos nesta categoria para equilibrar o orçamento.</em></span>
              </div>
            `).join("")}
          </div>
        </div>
      `:y=`
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
            ${n.map((i,m)=>{const g=a>0?(i.valorTotal/a*100).toFixed(1):0;return`
                <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(30,41,59,0.7); border-radius:6px; padding:.5rem .75rem">
                  <div style="display:flex; align-items:center; gap:.5rem">
                    <span style="font-size:1rem; font-weight:700">${m===0?"🥇":m===1?"🥈":m===2?"🥉":`#${m+1}`}</span>
                    <div>
                      <strong style="font-size:.85rem; color:#f8fafc">${i.nome}</strong>
                      <span style="font-size:.72rem; color:var(--text-muted); display:block">${i.qtd} compra${i.qtd>1?"s":""} • ${g}% do cartão</span>
                    </div>
                  </div>
                  <strong style="color:#fb7185; font-size:.95rem">${l(i.valorTotal)}</strong>
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
            ${r.map(i=>{const m=a>0?(i.valorTotal/a*100).toFixed(1):0;return`
                <div>
                  <div style="display:flex; justify-content:space-between; align-items:center; font-size:.83rem; margin-bottom:.2rem">
                    <span>${i.icone} <strong>${i.nome}</strong> <span style="font-size:.72rem; color:var(--text-muted)">(${i.qtd} itens)</span></span>
                    <strong style="color:#f8fafc">${l(i.valorTotal)} <span style="font-size:.72rem; color:var(--text-muted)">(${m}%)</span></strong>
                  </div>
                  <div class="progress-bar-bg" style="height:6px; border-radius:3px; background:rgba(255,255,255,0.08); overflow:hidden">
                    <div class="progress-bar-fill" style="width:${m}%; height:100%; background:var(--accent-purple); border-radius:3px"></div>
                  </div>
                </div>
              `}).join("")}
          </div>
        </div>

      </div>

      ${y}

    </div>
  `}function xt(){const t=G.reduce((d,u)=>d+(u.valorTotal!==void 0?u.valorTotal:u.valor||0),0);document.getElementById("badge-total-cartoes").textContent=`${l(t)} total`;const e=document.getElementById("lista-faturas-registradas");if(!G.length){e.innerHTML='<div class="empty-state">Nenhuma fatura cadastrada ainda.</div>';return}const a=It(G),o=We(G,"geral"),n={};G.forEach(d=>{const u=d.mesAno||"Outros";n[u]||(n[u]=[]),n[u].push(d)});const r=Object.keys(n).sort((d,u)=>u.localeCompare(d)).map((d,u)=>{const c=n[d],v=c.reduce((i,m)=>i+(m.valorTotal!==void 0?m.valorTotal:m.valor||0),0);let p=d;if(d!=="Outros"&&d.includes("-")){const[i,m]=d.split("-"),I=new Date(parseInt(i),parseInt(m)-1,1).toLocaleString("pt-BR",{month:"long"});p=`${I.charAt(0).toUpperCase()+I.slice(1)} de ${i}`}const y=u===0;return`
      <div class="card" style="margin-bottom:1.25rem;background:rgba(15,23,42,0.45);border:1px solid var(--border-color)">
        <div class="card-header" style="cursor:pointer;user-select:none;display:flex;justify-content:space-between;align-items:center" onclick="toggleGroupMonth('fat-group-${d}')">
          <span class="card-title" style="font-size:1.05rem">📅 Faturas de ${p}</span>
          <div style="display:flex;align-items:center;gap:.75rem">
            <span class="badge blue" style="font-size:.85rem">Total: ${l(v)} (${c.length} fatura${c.length>1?"s":""})</span>
            <span class="chevron ${y?"open":""}" id="chev-fat-group-${d}">▼</span>
          </div>
        </div>
        <div id="fat-group-${d}" class="purchase-details ${y?"open":""}" style="padding:.75rem 1rem;display:${y?"block":"none"}">
          ${c.map(i=>{var h;const m=i.valorTotal!==void 0?i.valorTotal:i.valor||0,g=i.cartao||"Cartão",I=g.toLowerCase().includes("nubank"),C=I?"purple":"red",S=I?"🟣":"🔴",x=i.dataVencimento?fe(i.dataVencimento).split(",")[0]:"—",T=i.mesAno||"—";return`
              <div class="purchase-card" style="margin-bottom:1rem">
                <div class="purchase-header" onclick="toggleDetail('fat-${i.id}')">
                  <div class="purchase-info">
                    <h3><span class="badge ${C}">${S} ${g}</span> — Vencimento: ${x}</h3>
                    <p>📅 Mês Referência: <strong>${T}</strong> &nbsp;•&nbsp; 🛒 ${i.qtdItens||((h=i.itens)==null?void 0:h.length)||1} itens contemplados</p>
                  </div>
                  <div class="purchase-values" style="display:flex;align-items:center;gap:.75rem">
                    <div style="text-align:right">
                      <div class="pv-total" style="color:#fb7185">${l(m)}</div>
                      <div class="pv-sub">Fatura do Mês</div>
                    </div>
                    <button type="button" class="btn-danger" style="padding:.35rem .65rem;font-size:.78rem;margin-left:.25rem" onclick="event.stopPropagation(); excluirFaturaDocumento('${i.id}')" title="Excluir esta fatura de todos os lugares do sistema">
                      🗑️ Excluir
                    </button>
                  </div>
                  <svg class="chevron" id="chev-fat-${i.id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
                <div class="purchase-details" id="detail-fat-${i.id}">
                  <div class="details-toolbar">
                    <span class="card-subtext">Detalhamento dos Lançamentos da Fatura</span>
                    <button class="btn-danger" onclick="excluirFaturaDocumento('${i.id}')">🗑️ Excluir Fatura</button>
                  </div>
                  ${Je(i)}
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `}).join("");e.innerHTML=a+o+r}function Je(t){if(t.itens&&t.itens.length>0){const e=Ye([t]),a=`fatura_${t.id}`;e.forEach(n=>{window.ultimosLocaisAnalisados[`${a}_${n.nome}`]=n});let o="";return e.length>0&&(o=`
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
  </table></div>`}window.removerItemFaturaCadastrada=async function(t,e){const a=G.find(s=>s.id===t);if(!a||!a.itens||!confirm("Remover este item da fatura?"))return;const o=[...a.itens];o.splice(e,1);const n=o.reduce((s,r)=>s+(r.valor||0),0);o.length===0?(await Z(F(M,de,t)),A("🗑️ Fatura excluída pois todos os itens foram removidos.")):(await H(F(M,de,t),{...a,itens:o,valorTotal:n,qtdItens:o.length}),A("🗑️ Item removido da fatura."))};window.excluirFaturaDocumento=async function(t){confirm("Excluir esta fatura e todos os seus lançamentos?")&&(await Z(F(M,de,t)),A("🗑️ Fatura removida com sucesso."))};let P=null;function Ct(){const t=document.getElementById("inp-boleto-vencimento");if(t&&!t.value){const e=new Date,a=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0");t.value=`${a}-${o}-10`,atualizarMesRefBoleto()}}setTimeout(Ct,300);window.atualizarMesRefBoleto=function(){const t=document.getElementById("inp-boleto-vencimento"),e=document.getElementById("lbl-boleto-mes-ref");if(!(!t||!e))if(t.value){const[a,o]=t.value.split("-"),s=new Date(parseInt(a),parseInt(o)-1,1).toLocaleString("pt-BR",{month:"long"});e.textContent=`Boleto ${s.charAt(0).toUpperCase()+s.slice(1)}/${a}`}else e.textContent="Mês do Boleto"};window.handleFileBoletoSelect=async function(t){const e=t.target.files[0];if(!e)return;const a=document.getElementById("txt-file-boleto");a&&(a.textContent=`📄 Arquivo: ${e.name}`),A(`⏳ Lendo arquivo do boleto (${e.name})...`);let o="";if(e.type==="application/pdf"||e.name.endsWith(".pdf"))o=await He(e);else try{o=await e.text()}catch{o=""}o?(document.getElementById("inp-boleto-txt").value=o,await Ke(o,e.name)):A("❌ Não foi possível ler o texto do arquivo do boleto.")};window.importarBoletoManualOuArquivo=async function(){const t=document.getElementById("inp-boleto-txt").value.trim();if(!t){A("⚠️ Selecione o arquivo do boleto (.pdf, .txt) ou cole o texto do boleto.");return}await Ke(t,"Boleto")};async function Ke(t,e){const a=wt(t);a.vencimento&&(document.getElementById("inp-boleto-vencimento").value=a.vencimento,atualizarMesRefBoleto());const o=document.getElementById("inp-boleto-vencimento").value||new Date().toISOString().slice(0,10),n=o.slice(0,7),s=a.beneficiario||e.replace(/\.[^/.]+$/,"")||"Boleto / Conta",r=a.itens.reduce((u,c)=>u+c.valor,0),d=a.valorTotal||r||0;document.getElementById("inp-revisao-boleto-desc").value=s,document.getElementById("inp-revisao-boleto-val").value=d?d.toFixed(2):"",P={descricao:s,dataVencimento:o,mesAno:n,valorTotal:d,qtdItens:a.itens.length,itens:a.itens},Xe(),A("✅ Boleto identificado! Confira a descrição, valor e itens antes de salvar.")}window.atualizarValorTotalRevisaoBoleto=function(){if(!P)return;const t=parseFloat(document.getElementById("inp-revisao-boleto-val").value)||0;P.valorTotal=t,document.getElementById("badge-total-preview-boleto").textContent=l(t)};function Xe(){if(!P)return;const{valorTotal:t,itens:e}=P;document.getElementById("badge-total-preview-boleto").textContent=l(t);const a=document.getElementById("lista-preview-boleto-itens");!e||!e.length?a.innerHTML='<div class="empty-state">Nenhum encargo/item individual extraído. O valor total acima será considerado.</div>':a.innerHTML=e.map((n,s)=>`
      <div style="display:flex; justify-content:space-between; align-items:center; padding:.4rem 0; border-bottom:1px dashed var(--border-color); font-size:.82rem;">
        <span><strong>${n.dataBoleto||"—"}</strong> — ${n.descricao}</span>
        <div style="display:flex; align-items:center; gap:.75rem;">
          <span style="color:#c084fc; font-weight:700;">${l(n.valor)}</span>
          <button type="button" class="btn-danger" style="padding:.15rem .45rem; font-size:.75rem;" onclick="removerItemRevisaoBoleto(${s})">🗑️</button>
        </div>
      </div>
    `).join("");const o=document.getElementById("box-revisao-boleto");o.style.display="block",o.scrollIntoView({behavior:"smooth"})}window.removerItemRevisaoBoleto=function(t){if(!P||!P.itens)return;P.itens.splice(t,1);const e=P.itens.reduce((a,o)=>a+o.valor,0);e>0&&(P.valorTotal=e,document.getElementById("inp-revisao-boleto-val").value=e.toFixed(2)),P.qtdItens=P.itens.length,Xe(),A("🗑️ Item removido da revisão do boleto.")};window.confirmarEGravarBoletoDocumento=async function(){if(!P)return;const t=document.getElementById("inp-revisao-boleto-desc").value.trim(),e=parseFloat(document.getElementById("inp-revisao-boleto-val").value)||0,a=document.getElementById("inp-boleto-vencimento").value||new Date().toISOString().slice(0,10);if(!e){A("⚠️ Digite ou confirme o valor total do boleto.");return}P.descricao=t||"Boleto / Conta",P.valorTotal=e,P.dataVencimento=a,P.mesAno=a.slice(0,7);try{await he(K(M,ie),{...P,createdAt:Ie()}),document.getElementById("box-revisao-boleto").style.display="none",document.getElementById("inp-boleto-txt").value="";const o=document.getElementById("txt-file-boleto");o&&(o.textContent="Clique para Selecionar o Arquivo do Boleto");const n=l(P.valorTotal);P=null,A(`🎉 Boleto de ${n} salvo com sucesso!`)}catch(o){alert("Erro ao salvar boleto: "+o.message)}};function wt(t){if(!t)return{beneficiario:"",valorTotal:0,vencimento:null,itens:[]};let e="",a=0,o=null;const n=[],s=t.match(/Vencimento\s*[:\s]*(\d{2}[\/\.-]\d{2}[\/\.-]\d{4})/i)||t.match(/Vencimento\s*[:\s]*(\d{2})\s+([A-Za-z]{3})\s+(\d{4})/i)||t.match(/Data\s*de\s*Vencimento\s*[:\s]*(\d{2}[\/\.-]\d{2}[\/\.-]\d{4})/i);if(s){if(s[2]&&s[3]){const c=s[1],v=s[2].toUpperCase();o=`${s[3]}-${{JAN:"01",FEB:"02",MAR:"03",ABR:"04",APR:"04",MAI:"05",MAY:"05",JUN:"06",JUL:"07",AGO:"08",AUG:"08",SET:"09",SEP:"09",OUT:"10",OCT:"10",NOV:"11",DEZ:"12",DEC:"12"}[v]||"07"}-${c.padStart(2,"0")}`}else if(s[1]){const[c,v,p]=s[1].split(/[\/\.-]/);o=`${p}-${v.padStart(2,"0")}-${c.padStart(2,"0")}`}}const r=t.match(/Benefici[áa]rio\s*[:\s]*([^\n\r]+)/i)||t.match(/Nome\s*do\s*Cedente\s*[:\s]*([^\n\r]+)/i)||t.match(/Raz[ãa]o\s*Social\s*[:\s]*([^\n\r]+)/i);r&&(e=r[1].trim().replace(/\s{2,}/g," "));const d=t.match(/Valor\s*do\s*Documento\s*[:\s]*R?\$\s*([\d\.]+,\d{2})/i)||t.match(/\(=\)\s*Valor\s*Cobrado\s*[:\s]*R?\$\s*([\d\.]+,\d{2})/i)||t.match(/Valor\s*Cobrado\s*[:\s]*R?\$\s*([\d\.]+,\d{2})/i)||t.match(/Valor\s*R?\$\s*([\d\.]+,\d{2})/i);return d&&(a=k(d[1])),t.split(`
`).forEach(c=>{const v=c.trim();if(!v||/vencimento|beneficiário|cedente|nosso\s*número|agência|código|autenticação|instruções/i.test(v))return;const p=v.match(/(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\b[A-Za-z]{3}\b)?\s*(.+?)\s+R?\$\s*([\d\.]+,\d{2})$/i);if(p){const y=p[1]||"Boleto",i=p[2].trim(),m=k(p[3]);i&&m>0&&i.length>2&&!/valor|total|documento|cobrado/i.test(i)&&n.push({dataBoleto:y,descricao:i,valor:m})}}),{beneficiario:e,valorTotal:a,vencimento:o,itens:n}}function Tt(t){const e=document.getElementById("container-analise-boletos-recorrentes");if(!e)return;if(!t||!t.length){e.innerHTML="";return}const a={};t.forEach(i=>{const m=le(i);a[m]||(a[m]={nome:m,valorTotalAno:0,qtd:0,historicoMeses:{}});const g=i.valorTotal!==void 0?i.valorTotal:i.valor||0;a[m].valorTotalAno+=g,a[m].qtd+=1;const I=i.mesAno||"Outros";a[m].historicoMeses[I]=(a[m].historicoMeses[I]||0)+g});const o=Object.values(a).sort((i,m)=>m.valorTotalAno-i.valorTotalAno),n=Array.from(new Set(t.map(i=>i.mesAno||"Outros"))).sort((i,m)=>m.localeCompare(i)),s=n[0],r=n[1];function d(i){if(!i||!i.includes("-"))return i;const[m,g]=i.split("-"),C=new Date(parseInt(m),parseInt(g)-1,1).toLocaleString("pt-BR",{month:"long"});return`${C.charAt(0).toUpperCase()+C.slice(1)}/${m}`}const u=d(s),c=d(r),v=[];s&&r&&o.forEach(i=>{const m=i.historicoMeses[s],g=i.historicoMeses[r];if(m!==void 0&&g!==void 0){const I=m-g;if(I>5){const C=(I/g*100).toFixed(1);v.push({nome:i.nome,valAtual:m,valAnterior:g,dif:I,pct:C})}}}),v.sort((i,m)=>m.dif-i.dif);const p=t.reduce((i,m)=>i+(m.valorTotal!==void 0?m.valorTotal:m.valor||0),0);let y="";s&&r&&(v.length>0?y=`
        <div style="margin-top:1rem; background:rgba(251,113,133,0.08); border:1px dashed rgba(251,113,133,0.35); border-radius:10px; padding:.85rem 1rem">
          <div style="font-weight:700; font-size:.9rem; color:#fb7185; margin-bottom:.5rem; display:flex; align-items:center; gap:.4rem">
            ⚠️ ALERTAS DE AUMENTO DE PREÇO (${u} vs ${c}):
          </div>
          <div style="display:flex; flex-direction:column; gap:.5rem">
            ${v.map(i=>`
              <div style="font-size:.83rem; color:#f1f5f9; background:rgba(15,23,42,0.8); border-left:3px solid #fb7185; padding:.5rem .75rem; border-radius:4px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:.5rem">
                <div>
                  🚨 <strong>${i.nome}</strong>: Aumentou <strong style="color:#fb7185">+${l(i.dif)} (+${i.pct}%)</strong> em relação a ${c}.
                  <span style="color:var(--text-muted); display:block; margin-top:.15rem">Mês anterior: ${l(i.valAnterior)} ➔ Mês atual: ${l(i.valAtual)}</span>
                </div>
                <span class="badge rose" style="font-size:.78rem">+${i.pct}%</span>
              </div>
            `).join("")}
          </div>
        </div>
      `:y=`
        <div style="margin-top:1rem; background:rgba(16,185,129,0.08); border:1px dashed rgba(16,185,129,0.35); border-radius:10px; padding:.85rem 1rem">
          <div style="font-weight:700; font-size:.88rem; color:#34d399">
            🟢 Nenhum boleto recorrente teve aumento de preço entre ${c} e ${u}. Todos os valores mantiveram-se estáveis!
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
        ${o.map(i=>{const m=i.qtd>0?i.valorTotalAno/i.qtd:0;let g='<span class="badge gray" style="font-size:.72rem">Único registro</span>';if(s&&r){const I=i.historicoMeses[s],C=i.historicoMeses[r];if(I!==void 0&&C!==void 0){const S=I-C;if(S>0){const x=(S/C*100).toFixed(1);g=`<span class="badge rose" style="font-size:.75rem" title="Subiu ${l(S)} em relação a ${c}">📈 +${l(S)} (+${x}%)</span>`}else if(S<0){const x=(Math.abs(S)/C*100).toFixed(1);g=`<span class="badge green" style="font-size:.75rem" title="Caiu ${l(Math.abs(S))} em relação a ${c}">📉 ${l(S)} (-${x}%)</span>`}else g='<span class="badge purple" style="font-size:.75rem">🟢 R$ 0,00 (Estável)</span>'}}return`
            <div style="background:rgba(15,23,42,0.75); border:1px solid var(--border-color); border-radius:10px; padding:.85rem 1rem; display:flex; justify-content:space-between; align-items:center">
              <div>
                <div style="font-weight:700; font-size:.9rem; color:#f8fafc; margin-bottom:.25rem">📄 ${i.nome}</div>
                <div style="font-size:.75rem; color:var(--text-muted)">
                  Média: <strong>${l(m)}/mês</strong> &nbsp;•&nbsp; ${i.qtd} boleto${i.qtd>1?"s":""}
                </div>
                <div style="margin-top:.4rem">${g}</div>
              </div>
              <div style="text-align:right">
                <div style="font-weight:800; font-size:1.1rem; color:#c084fc">${l(i.valorTotalAno)}</div>
                <div style="font-size:.72rem; color:var(--text-muted)">total acumulado</div>
              </div>
            </div>
          `}).join("")}
      </div>

      ${y}

    </div>
  `}function Bt(){const t=U.reduce((n,s)=>n+(s.valorTotal!==void 0?s.valorTotal:s.valor||0),0);document.getElementById("badge-total-boletos").textContent=`${l(t)} total`,Tt(U);const e=document.getElementById("lista-boletos-registrados");if(!U.length){e.innerHTML='<div class="empty-state">Nenhum boleto cadastrado ainda.</div>';return}const a={};U.forEach(n=>{const s=n.mesAno||"Outros";a[s]||(a[s]=[]),a[s].push(n)});const o=Object.keys(a).sort((n,s)=>s.localeCompare(n));e.innerHTML=o.map((n,s)=>{const r=a[n];r.sort((v,p)=>{const y=v.dataVencimento?new Date(v.dataVencimento).getTime():0;return(p.dataVencimento?new Date(p.dataVencimento).getTime():0)-y});const d=r.reduce((v,p)=>v+(p.valorTotal!==void 0?p.valorTotal:p.valor||0),0);let u=n;if(n!=="Outros"&&n.includes("-")){const[v,p]=n.split("-"),i=new Date(parseInt(v),parseInt(p)-1,1).toLocaleString("pt-BR",{month:"long"});u=`${i.charAt(0).toUpperCase()+i.slice(1)} de ${v}`}const c=s===0;return`
      <div class="card" style="margin-bottom:1.25rem;background:rgba(15,23,42,0.45);border:1px solid var(--border-color)">
        <div class="card-header" style="cursor:pointer;user-select:none;display:flex;justify-content:space-between;align-items:center" onclick="toggleGroupMonth('bol-group-${n}')">
          <span class="card-title" style="font-size:1.05rem">📄 Boletos de ${u}</span>
          <div style="display:flex;align-items:center;gap:.75rem">
            <span class="badge purple" style="font-size:.85rem">Total: ${l(d)} (${r.length} boleto${r.length>1?"s":""})</span>
            <span class="chevron ${c?"open":""}" id="chev-bol-group-${n}">▼</span>
          </div>
        </div>
        <div id="bol-group-${n}" class="purchase-details ${c?"open":""}" style="padding:.75rem 1rem;display:${c?"block":"none"}">
          ${r.map(v=>{var g;const p=v.valorTotal!==void 0?v.valorTotal:v.valor||0,y=v.dataVencimento?fe(v.dataVencimento).split(",")[0]:"—",i=v.mesAno||"—",m=le(v);return`
              <div class="purchase-card" style="margin-bottom:1rem">
                <div class="purchase-header" onclick="toggleDetail('bol-${v.id}')">
                  <div class="purchase-info">
                    <h3><span class="badge purple">📄 ${m}</span> — Vencimento: ${y}</h3>
                    <p>📅 Mês Referência: <strong>${i}</strong> &nbsp;•&nbsp; 🛒 ${v.qtdItens||((g=v.itens)==null?void 0:g.length)||1} itens / encargos</p>
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
                  ${et(v)}
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `}).join("")}function le(t){if(!t)return"Boleto";let e=t.descricao;return(!e||e==="Boleto"||e==="Boleto / Conta")&&(t.itens&&t.itens.length>0&&t.itens[0].descricao?e=t.itens[0].descricao:t.beneficiario?e=t.beneficiario:e="Boleto"),e?(e=e.replace(/[-–—\s]*\b\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}\b/gi,""),e=e.replace(/[-–—\s]*\b\d{14}\b/gi,""),e=e.replace(/^\d{1,6}\s+/,""),e=e.trim().replace(/^[-–—\s]+|[-–—\s]+$/g,"").trim().toUpperCase(),e.includes("CONDOMINIO")&&(e.includes("GRECIA")||e.includes("LAR"))?"CONDOMINIO LAR GRECIA":e.includes("FINANCIAMENTO")&&(e.includes("APTO")||e.includes("APARTAMENTO"))?"FINANCIAMENTO APTO":e.includes("CONSORCIO")&&(e.includes("CARRO")||e.includes("AUTO"))?"CONSORCIO CARRO":e.includes("LUZ")||e.includes("CPFL")||e.includes("ENERGIA")||e.includes("ELETRICIDADE")?"CONTA DE LUZ":e.includes("INTERNET")||e.includes("BANDA LARGA")||e.includes("WI-FI")?"INTERNET":e.includes("IPTU")?"IPTU":e||"Boleto"):"Boleto"}function et(t){return t.itens&&t.itens.length>0?`<div class="table-responsive"><table class="custom-table">
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
  </table></div>`}window.editarValorBoletoDocumento=function(t){const e=U.find(s=>s.id===t);if(!e)return;const a=e.valorTotal!==void 0?e.valorTotal:e.valor||0,o=typeof le=="function"?le(e):e.descricao||"Boleto";document.getElementById("inp-edit-boleto-id").value=t,document.getElementById("inp-edit-item-index").value="",document.getElementById("inp-edit-boleto-desc").value=o,document.getElementById("inp-edit-boleto-valor").value=a.toFixed(2),document.getElementById("titulo-modal-editar-boleto").textContent="✏️ Editar Valor do Boleto";const n=document.getElementById("modal-editar-boleto");n&&(n.classList.add("active"),setTimeout(()=>{const s=document.getElementById("inp-edit-boleto-valor");s&&(s.focus(),s.select())},100))};window.editarItemBoleto=function(t,e){const a=U.find(r=>r.id===t);if(!a||!a.itens||!a.itens[e])return;const o=a.itens[e],n=o.valor||0;document.getElementById("inp-edit-boleto-id").value=t,document.getElementById("inp-edit-item-index").value=e,document.getElementById("inp-edit-boleto-desc").value=o.descricao||(typeof le=="function"?le(a):"Item"),document.getElementById("inp-edit-boleto-valor").value=n.toFixed(2),document.getElementById("titulo-modal-editar-boleto").textContent="✏️ Editar Valor do Item";const s=document.getElementById("modal-editar-boleto");s&&(s.classList.add("active"),setTimeout(()=>{const r=document.getElementById("inp-edit-boleto-valor");r&&(r.focus(),r.select())},100))};window.fecharModalEditarBoleto=function(){const t=document.getElementById("modal-editar-boleto");t&&t.classList.remove("active")};document.getElementById("form-editar-boleto").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-edit-boleto-id").value,a=document.getElementById("inp-edit-item-index").value,o=document.getElementById("inp-edit-boleto-valor").value,n=parseFloat(o);if(!e||isNaN(n)||n<=0){alert("Por favor, informe um valor numérico válido maior que zero.");return}const s=U.find(r=>r.id===e);if(s)try{const r=F(M,ie,e);if(a===""){const d={valorTotal:n,valor:n,dataAtualizacao:new Date().toISOString()};if(s.itens&&s.itens.length>0){const u=[...s.itens];u[0]={...u[0],valor:n},d.itens=u}await H(r,d,{merge:!0}),A(`✏️ Valor do boleto atualizado para ${l(n)} em todo o sistema!`)}else{const d=parseInt(a);if(s.itens&&s.itens[d]){const u=[...s.itens];u[d]={...u[d],valor:n};const c=u.reduce((v,p)=>v+(p.valor||0),0);await H(r,{...s,itens:u,valorTotal:c,valor:c,dataAtualizacao:new Date().toISOString()},{merge:!0}),A(`✏️ Item do boleto atualizado para ${l(n)} em todo o sistema!`)}}fecharModalEditarBoleto()}catch(r){alert("Erro ao atualizar valor do boleto: "+r.message)}});window.removerItemBoletoCadastrado=async function(t,e){const a=U.find(s=>s.id===t);if(!a||!a.itens||!confirm("Remover este item do boleto?"))return;const o=[...a.itens];o.splice(e,1);const n=o.reduce((s,r)=>s+(r.valor||0),0);o.length===0?(await Z(F(M,ie,t)),A("🗑️ Boleto excluído pois todos os itens foram removidos.")):(await H(F(M,ie,t),{...a,itens:o,valorTotal:n,qtdItens:o.length}),A("🗑️ Item removido do boleto."))};window.excluirBoletoDocumento=async function(t){const e=U.find(n=>n.id===t),a=e?e.descricao||"Boleto / Conta":"este boleto",o=e?l(e.valorTotal!==void 0?e.valorTotal:e.valor||0):"";confirm(`⚠️ Deseja realmente excluir ${a} ${o?"("+o+")":""}?

Este boleto será removido permanentemente de todos os meses, resumos e relatórios do sistema.`)&&(await Z(F(M,ie,t)),A("🗑️ Boleto removido de todo o sistema com sucesso."))};document.getElementById("form-config-reservas").addEventListener("submit",async t=>{t.preventDefault();const e=parseFloat(document.getElementById("inp-meta-anual").value)||0,a=parseFloat(document.getElementById("inp-saldo-guardado").value)||0;Q.metaAnual=e,Q.valorAtualGuardado=a,await H(F(M,Pe,"config"),{metaAnual:e,valorAtualGuardado:a,dataAtualizacao:new Date().toISOString()}),A("✅ Reservas e configurações de economias salvas!"),ee()});function Mt(){const t=Q&&Q.metaAnual!==void 0?Q.metaAnual:15e3,e=Q&&Q.valorAtualGuardado!==void 0?Q.valorAtualGuardado:3e3,a=document.getElementById("inp-meta-anual");a&&document.activeElement!==a&&(a.value=t);const o=document.getElementById("inp-saldo-guardado");o&&document.activeElement!==o&&(o.value=e);const s=new Date().getMonth()+1,r=Math.max(1,12-s+1),d=Math.max(0,t-e),u=d>0?d/r:0;document.getElementById("val-meta-reserva").textContent=l(u);const c=document.getElementById("subtext-meta-reserva");c&&(c.textContent=`Faltam ${l(d)} p/ Meta Anual de ${l(t)} (${r} mês(es) até o fim do ano)`),document.getElementById("val-real-guardado").textContent=l(e);const v=ue();let p=0,y=0,i=0,m=0;v.forEach(B=>{const f=_.filter(D=>D.mesAno===B).reduce((D,L)=>D+(L.valor||0),0),b=G.filter(D=>D.mesAno===B).reduce((D,L)=>D+(L.valorTotal!==void 0?L.valorTotal:L.valor||0),0),E=U.filter(D=>D.mesAno===B).reduce((D,L)=>D+(L.valorTotal!==void 0?L.valorTotal:L.valor||0),0);let R=0;V.filter(D=>D.mesAno===B).forEach(D=>{D.formasPagamento&&(R+=D.formasPagamento.cartaoDebito||0)}),p+=f,y+=b,i+=E,m+=R});const g=y+i+m,I=p-g,C=Math.max(1,v.length),S=p/C,x=g/C,T=I/C,h=T>0?T:0,w=h*r,O=e+w;document.getElementById("val-recomendacao-reserva").textContent=l(O);const j=document.getElementById("subtext-recomendacao");if(j)if(O>=t)j.innerHTML=`✅ Projeção de <strong style="color:#34d399">${l(O)}</strong> até Dez/2026 supera sua Meta Anual de ${l(t)}!`;else{const B=t-O;j.innerHTML=`⚠️ Sobra média de ${l(h)}/mês. Projeção de ${l(O)} fica <strong style="color:#fb7185">${l(B)}</strong> abaixo da Meta de ${l(t)}.`}const z=document.getElementById("box-analise-reserva-detalhes");if(z)if(p===0)z.innerHTML='<p class="empty-state">Cadastre seus salários e entradas na aba "Salários & Entradas" para gerar o diagnóstico inteligente de economias.</p>';else{const B=t>0?Math.min(100,e/t*100).toFixed(1):0,f=O>=t;let b="";if(f)b=`
          <div style="background:rgba(16,185,129,0.12);border:1px solid rgba(16,185,129,0.35);border-radius:8px;padding:.85rem 1rem;margin-top:.85rem">
            <span style="color:#34d399;font-weight:700;font-size:.9rem">✅ DIAGNÓSTICO: META ANUAL TOTALMENTE ATINGÍVEL!</span>
            <p style="font-size:.85rem;color:#f1f5f9;margin-top:.35rem;line-height:1.45">
              Com base na sua média de sobra mensal livre de <strong style="color:#34d399">${l(T)}/mês</strong> (Entradas: ${l(S)} vs Saídas: ${l(x)}), a projeção é acumular <strong style="color:#34d399">${l(O)}</strong> até o fim do ano.
              Isso <strong>SUPERA a sua Meta Anual de ${l(t)}</strong> (contemplando o valor já guardado de ${l(e)})!
            </p>
          </div>
        `;else if(T>0){const E=Math.max(0,u-T);b=`
          <div style="background:rgba(245,158,11,0.12);border:1px solid rgba(245,158,11,0.35);border-radius:8px;padding:.85rem 1rem;margin-top:.85rem">
            <span style="color:#fbbf24;font-weight:700;font-size:.9rem">⚠️ DIAGNÓSTICO: META DESAFIADORA (AJUSTE DE ECONOMIA NECESSÁRIO)</span>
            <p style="font-size:.85rem;color:#f1f5f9;margin-top:.35rem;line-height:1.45">
              Com a sua sobra média mensal atual de <strong style="color:#fbbf24">${l(T)}/mês</strong>, o sistema projeta acumular <strong style="color:#60a5fa">${l(O)}</strong> até o fim do ano (somando os ${l(e)} já guardados).
              Para alcançar a sua Meta de <strong>${l(t)}</strong> (faltam ${l(d)}), é necessário guardar <strong style="color:#fb7185">${l(u)}/mês</strong> nos próximos ${r} meses (um incremento de <strong>${l(E)}/mês</strong> em relação à sua média).
            </p>
          </div>
        `}else b=`
          <div style="background:rgba(251,113,133,0.12);border:1px solid rgba(251,113,133,0.35);border-radius:8px;padding:.85rem 1rem;margin-top:.85rem">
            <span style="color:#fb7185;font-weight:700;font-size:.9rem">🚨 DIAGNÓSTICO: ALERTA DE VIABILIDADE (SAÍDAS SUPERARAM ENTRADAS)</span>
            <p style="font-size:.85rem;color:#f1f5f9;margin-top:.35rem;line-height:1.45">
              No histórico dos ${C} meses registrados, suas saídas (${l(g)}) superaram as entradas (${l(p)}), com saldo médio negativo de ${l(T)}/mês.
              A projeção do sistema prevê apenas a manutenção dos <strong style="color:#34d399">${l(e)}</strong> já guardados. Para atingir sua Meta Anual de <strong>${l(t)}</strong> (faltam <strong>${l(d)}</strong>), você precisará guardar <strong style="color:#fb7185">${l(u)}/mês</strong> nos próximos ${r} mês(es).
            </p>
          </div>
        `;z.innerHTML=`
        <p style="margin-bottom:.5rem;font-weight:600">
          Com base no histórico dos ${C} mês(es) registrados (Média Entradas: <strong>${l(S)}</strong> vs Saídas: <strong>${l(x)}</strong>):
        </p>
        <div style="background:rgba(15,23,42,0.6);padding:1.1rem;border-radius:10px;margin:.75rem 0;border:1px solid var(--border-color)">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem;flex-wrap:wrap;gap:.75rem">
            <div>
              <span style="font-size:.82rem;color:var(--text-muted);display:block">💰 Saldo Líquido no Período</span>
              <strong style="font-size:1.15rem;color:${I>=0?"#60a5fa":"#fb7185"}">${l(I)}</strong>
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
            <div class="progress-bar-fill" style="width:${B}%;height:100%;background:linear-gradient(90deg,#10b981,#34d399);border-radius:6px"></div>
          </div>

          <div style="display:flex;justify-content:space-between;font-size:.82rem;color:var(--text-muted);margin-top:.4rem;flex-wrap:wrap;gap:.5rem">
            <span>Progresso Atual: <strong style="color:#34d399">${l(e)}</strong> de ${l(t)} (<strong>${B}%</strong> concluído)</span>
            <span>Faltam guardar: <strong style="color:#fb7185">${l(d)}</strong> em ${r} mês(es)</span>
          </div>
        </div>

        ${b}
      `}St()}function St(){const t=document.getElementById("container-analise-mensal-lista");if(!t)return;const e=ue();if(!e.length){t.innerHTML='<div class="empty-state">Nenhum mês registrado para gerar a análise mensal.</div>';return}const a=e.map(o=>{const s=_.filter(h=>h.mesAno===o).reduce((h,w)=>h+(w.valor||0),0),r=G.filter(h=>h.mesAno===o),d=r.reduce((h,w)=>h+(w.valorTotal!==void 0?w.valorTotal:w.valor||0),0),u=U.filter(h=>h.mesAno===o),c=u.reduce((h,w)=>h+(w.valorTotal!==void 0?w.valorTotal:w.valor||0),0),v=V.filter(h=>h.mesAno===o);let p=0;v.forEach(h=>{h.formasPagamento&&(p+=h.formasPagamento.cartaoDebito||0)});const y=d+c+p,i=s-y,m=i>=0,[g,I]=o.split("-"),S=new Date(parseInt(g),parseInt(I)-1,1).toLocaleString("pt-BR",{month:"long"}),x=S.charAt(0).toUpperCase()+S.slice(1);let T="";if(m){const h=i*.5;T=`
        <div style="background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.25); border-radius:10px; padding:.85rem 1rem; margin-top:1rem">
          <div style="font-weight:700; font-size:.88rem; color:#34d399; margin-bottom:.2rem">
            🎉 Mês Positivo! Capacidade de Poupança Excelente
          </div>
          <p style="font-size:.8rem; color:var(--text-muted); margin:0">
            Neste mês sobraram <strong>${l(i)}</strong> em conta. O sistema sugere destinar pelo menos <strong style="color:#34d399">${l(h)}</strong> para sua reserva!
          </p>
        </div>
      `}else{const h=Math.abs(i);let w="Cartão de Crédito",O=d;c>O&&(w="Boletos & Contas",O=c),p>O&&(w="Mercado no Débito",O=p);const j=y>0?(O/y*100).toFixed(1):0;let z="",B=0;r.forEach(f=>{const b=f.valorTotal!==void 0?f.valorTotal:f.valor||0;b>B&&(B=b,z=`Fatura do ${f.cartao||"Cartão"}`)}),u.forEach(f=>{const b=f.valorTotal!==void 0?f.valorTotal:f.valor||0;b>B&&(B=b,z=`Boleto ${f.descricao||"de Conta"}`)}),T=`
        <div style="background:rgba(244,63,94,0.1); border:1px solid rgba(244,63,94,0.3); border-radius:10px; padding:.85rem 1rem; margin-top:1rem">
          <div style="font-weight:700; font-size:.88rem; color:#fb7185; margin-bottom:.4rem; display:flex; align-items:center; gap:.4rem">
            ⚠️ O que causou o déficit em ${x}/${g}?
          </div>
          <p style="font-size:.82rem; color:var(--text-main); margin-bottom:.5rem; line-height:1.5">
            As saídas (<strong>${l(y)}</strong>) superaram as entradas (<strong>${l(s)}</strong>) em <strong style="color:#fb7185">${l(h)}</strong>.
          </p>
          <div style="font-size:.78rem; color:var(--text-muted); line-height:1.5">
            • <strong>Vilão Principal:</strong> A categoria <strong style="color:#f8fafc">${w}</strong> representou <strong>${j}%</strong> de todas as saídas do mês (${l(O)}).
            ${z?`<br>• <strong>Maior Despesa Registrada:</strong> ${z} no valor de <strong style="color:#fb7185">${l(B)}</strong>.`:""}
          </div>
        </div>
      `}return`
      <div class="card" style="margin-bottom:1.25rem; border-color:${m?"rgba(52,211,153,0.3)":"rgba(251,113,133,0.4)"}">
        <div class="card-header" style="flex-wrap:wrap; gap:.5rem">
          <div style="display:flex; align-items:center; gap:.5rem">
            <span class="card-title" style="font-size:1rem; color:#f8fafc">📅 ${x} de ${g}</span>
            <span class="badge ${m?"green":"red"}">${m?"🟢 Superávit":"🔴 Déficit"}</span>
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
            <div style="font-weight:700; font-size:1rem; color:#c084fc">${l(c)}</div>
          </div>

          <div style="background:rgba(15,23,42,0.6); padding:.6rem .8rem; border-radius:8px; border:1px solid var(--border-color)">
            <div style="font-size:.75rem; color:var(--text-muted)">Mercado (Débito)</div>
            <div style="font-weight:700; font-size:1rem; color:#fbbf24">${l(p)}</div>
          </div>

          <div style="background:rgba(15,23,42,0.8); padding:.6rem .8rem; border-radius:8px; border:1px solid ${m?"#34d399":"#fb7185"}">
            <div style="font-size:.75rem; color:var(--text-muted)">Saldo Líquido no Mês</div>
            <div style="font-weight:800; font-size:1.05rem; color:${m?"#60a5fa":"#fb7185"}">${l(i)}</div>
          </div>
        </div>

        ${T}
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
  `}const be=[{id:"est_1",nome:"Corte de Cabelo Victor",quantidade:2,valorUnitario:70},{id:"est_2",nome:"Compra Programada Tunico",quantidade:1,valorUnitario:150},{id:"est_3",nome:"Sobrancelha Maria",quantidade:1,valorUnitario:50},{id:"est_4",nome:"Unha Maria",quantidade:1,valorUnitario:90},{id:"est_5",nome:"Banho Tunico",quantidade:1,valorUnitario:65},{id:"est_6",nome:"Saída Simples",quantidade:2,valorUnitario:100},{id:"est_7",nome:"Saída Premiun",quantidade:1,valorUnitario:150},{id:"est_8",nome:"Saída Premiun Plus",quantidade:1,valorUnitario:200},{id:"est_9",nome:"Mercado Pontual",quantidade:4,valorUnitario:70},{id:"est_10",nome:"Farmacia",quantidade:2,valorUnitario:35},{id:"est_11",nome:"Padaria 3D",quantidade:10,valorUnitario:10}];window.abrirModalAddEstimativa=function(t=null){const e=document.getElementById("modal-add-estimativa");if(e){if(document.getElementById("inp-est-id").value=t||"",t){document.getElementById("titulo-modal-estimativa").textContent="✏️ Editar Gastos Previsto";const a=X.find(n=>n.id===$),o=((a==null?void 0:a.itens)||[]).find(n=>n.id===t);o&&(document.getElementById("inp-est-nome").value=o.nome||"",document.getElementById("inp-est-qtd").value=o.quantidade||1,document.getElementById("inp-est-val").value=o.valorUnitario||0)}else document.getElementById("titulo-modal-estimativa").textContent="➕ Adicionar Gastos Previsto",document.getElementById("inp-est-nome").value="",document.getElementById("inp-est-qtd").value=1,document.getElementById("inp-est-val").value="";e.classList.add("active")}};window.fecharModalAddEstimativa=function(){var t;(t=document.getElementById("modal-add-estimativa"))==null||t.classList.remove("active")};var Re;(Re=document.getElementById("form-item-estimativa"))==null||Re.addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-est-id").value,a=document.getElementById("inp-est-nome").value.trim(),o=parseFloat(document.getElementById("inp-est-qtd").value)||1,n=parseFloat(document.getElementById("inp-est-val").value)||0;if(!a){alert("Preencha a descrição do gasto.");return}const s=X.find(d=>d.id===$);let r=s?[...s.itens||[]]:[...be];e?r=r.map(d=>d.id===e?{...d,nome:a,quantidade:o,valorUnitario:n}:d):r.push({id:"est_"+Date.now(),nome:a,quantidade:o,valorUnitario:n}),await H(F(M,oe,$),{mesAno:$,itens:r,ultimaAtualizacao:new Date().toISOString()}),fecharModalAddEstimativa(),A("✅ Estimativa atualizada!")});window.atualizarQtdItemEstimativa=async function(t,e){const a=X.find(s=>s.id===$);if(!a)return;const o=Math.max(1,parseInt(e)||1),n=(a.itens||[]).map(s=>s.id===t?{...s,quantidade:o}:s);await H(F(M,oe,$),{mesAno:$,itens:n,ultimaAtualizacao:new Date().toISOString()})};window.atualizarValorItemEstimativa=async function(t,e){const a=X.find(s=>s.id===$);if(!a)return;const o=Math.max(0,parseFloat(e)||0),n=(a.itens||[]).map(s=>s.id===t?{...s,valorUnitario:o}:s);await H(F(M,oe,$),{mesAno:$,itens:n,ultimaAtualizacao:new Date().toISOString()})};window.excluirItemEstimativa=async function(t){if(!confirm("Remover este item da estimativa do mês?"))return;const e=X.find(o=>o.id===$);if(!e)return;const a=(e.itens||[]).filter(o=>o.id!==t);await H(F(M,oe,$),{mesAno:$,itens:a,ultimaAtualizacao:new Date().toISOString()}),A("🗑️ Item removido da estimativa.")};window.resetarItensEstimativaPadrao=async function(){confirm(`Deseja carregar/resetar os 11 itens padrão de previsão para ${$}?`)&&(await H(F(M,oe,$),{mesAno:$,itens:be,ultimaAtualizacao:new Date().toISOString()}),A("🔄 Itens padrão de estimativa carregados!"))};function Dt(){const t=document.getElementById("container-lista-estimativa");if(!t)return;const e=X.find(i=>i.id===$);let a=[];e&&Array.isArray(e.itens)?a=e.itens:(a=be,H(F(M,oe,$),{mesAno:$,itens:be,ultimaAtualizacao:new Date().toISOString()}).catch(i=>console.error("Auto init estimativa error:",i)));let o=0;a.forEach(i=>{o+=(i.quantidade||0)*(i.valorUnitario||0)});const n=document.getElementById("val-total-estimativa-mes");n&&(n.textContent=l(o));const[s,r]=$.split("-"),u=new Date(parseInt(s),parseInt(r)-1,1).toLocaleString("pt-BR",{month:"long"}),c=u.charAt(0).toUpperCase()+u.slice(1),v=document.getElementById("subtext-estimativa-mes");v&&(v.textContent=`Total previsto para ${c} de ${s} (${a.length} itens cadastrados)`);const p=document.getElementById("badge-count-estimativa");if(p&&(p.textContent=`${a.length} itens previstos`),!a.length){t.innerHTML=`
      <div class="empty-state">
        <p>Nenhum gasto estimado para ${$}.</p>
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
          ${a.map(i=>{const m=(i.quantidade||0)*(i.valorUnitario||0);return`
              <tr>
                <td>
                  <strong style="color:#f8fafc">${i.nome}</strong>
                </td>
                <td class="num">
                  <input type="number" min="1" step="1" class="form-control" style="width:70px;padding:.2rem .4rem;font-size:.82rem;text-align:center" value="${i.quantidade}" onchange="atualizarQtdItemEstimativa('${i.id}', this.value)">
                </td>
                <td class="num">
                  <input type="number" min="0" step="0.01" class="form-control" style="width:95px;padding:.2rem .4rem;font-size:.82rem;text-align:right" value="${i.valorUnitario}" onchange="atualizarValorItemEstimativa('${i.id}', this.value)">
                </td>
                <td class="num">
                  <strong style="color:#a5b4fc">${l(m)}</strong>
                </td>
                <td style="text-align:right">
                  <div style="display:flex;gap:.35rem;justify-content:flex-end">
                    <button type="button" class="btn-secondary" style="padding:.2rem .4rem;font-size:.75rem" onclick="abrirModalAddEstimativa('${i.id}')" title="Editar">✏️</button>
                    <button type="button" class="btn-danger" style="padding:.2rem .4rem;font-size:.75rem" onclick="excluirItemEstimativa('${i.id}')" title="Excluir">🗑️</button>
                  </div>
                </td>
              </tr>
            `}).join("")}
        </tbody>
      </table>
    </div>
  `;t.innerHTML=y}function Ot(){const t=document.getElementById("lista-mensal-container");if(!t)return;const e=new Date,a=new Date(e.getFullYear(),e.getMonth()+1,1),o=a.toLocaleString("pt-BR",{month:"long"}),n=a.getFullYear(),s=`${o.charAt(0).toUpperCase()+o.slice(1)} de ${n}`,r=ut(a.getFullYear(),a.getMonth()),d=31.8,u=20,c=r*d,v=r*u,p={};let y=0;V.forEach(f=>{const b=f.valorAPagar||0;y+=b;const E=f.mesAno||"Outros";p[E]=(p[E]||0)+b});const i=Math.max(1,Object.keys(p).length),m=y/i,g={};V.forEach(f=>{(f.itens||[]).forEach(b=>{const E=(b.nome||"").toLowerCase().trim();E&&(g[E]||(g[E]={nome:b.nome,marca:b.marca||"Geral",qtdTotal:0,frequenciaNotas:0,valoresUnitarios:[]}),g[E].qtdTotal+=b.quantidade||1,g[E].frequenciaNotas+=1,b.valorUnitario&&g[E].valoresUnitarios.push(b.valorUnitario))})});const I=Object.values(g).map(f=>{const b=f.valoresUnitarios.length>0?f.valoresUnitarios.reduce((W,te)=>W+te,0)/f.valoresUnitarios.length:0,E=f.qtdTotal/i,R=i/Math.max(1,f.frequenciaNotas),D=f.frequenciaNotas/i;let L=0;D>=.35||E>=.7?L=Math.ceil(E):L=Math.round(E),L<1&&f.frequenciaNotas>=i&&(L=1);const Y=L*b;return{nome:f.nome,marca:f.marca,frequenciaNotas:f.frequenciaNotas,intervaloMeses:R,qtdMensalTaxa:E,totalEstimadoUnidades:L,valorUnitario:b,subtotalCalculado:Y}}).filter(f=>f.totalEstimadoUnidades>0);I.sort((f,b)=>b.frequenciaNotas-f.frequenciaNotas);const C=I.reduce((f,b)=>f+b.subtotalCalculado,0),S=m>0?m*1.05:C;let x=1;C>S&&m>0&&(x=S/C);const T=I.map(f=>({...f,subtotalFinal:f.subtotalCalculado*x})),h=m>0?Math.min(C,S):C;let w=h;const O=Math.min(w,c);w-=O;const j=Math.min(w,v);w-=j;const z=w>0?w:0;let B=`
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
          <div class="p-val" style="color:#34d399;">${l(O)} <span style="font-size:0.75rem;font-weight:normal;color:var(--text-muted)">/ ${l(c)}</span></div>
        </div>
        <div class="payment-item" style="border-color: rgba(99,102,241,0.4);">
          <div class="p-label">💳 Cartão Crédito (${r}d × R$ 20,00)</div>
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
          <p style="font-size:0.75rem; color:#60a5fa;">Média Histórica de Gastos: ${l(m)}</p>
        </div>
        <span style="font-size:1.6rem; font-weight:800; color:var(--primary);">${l(h)}</span>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-title">Lista de Itens com Frequência e Total Estimado</span>
        <span class="badge amber">${T.length} itens cadastrados</span>
      </div>
      <p class="card-subtext" style="margin-bottom:1rem;">
        O <strong>Total Estimado</strong> arredonda o consumo médio para cima (unidades inteiras exatas), pois os produtos são comprados por unidade no mercado.
      </p>
  `;window.dadosListaMensalCache={mesAnoStr:s,diasUteis:r,totalGeralEstimado:h,cobertoAlim:O,cobertoCred:j,cobertoDeb:z,alimDisponivel:c,credDisponivel:v,lista:T},T.length===0?B+='<div class="empty-state">Adicione notas fiscais para que o sistema gere automaticamente sua lista mensal de compras.</div></div>':B+=`
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
            ${T.map(f=>{const b=f.intervaloMeses>1.2?`A cada ${f.intervaloMeses.toFixed(1)} meses`:`Todo mês (${f.frequenciaNotas}x)`,E=f.qtdMensalTaxa<1?f.qtdMensalTaxa.toFixed(2):f.qtdMensalTaxa.toFixed(1),R=f.totalEstimadoUnidades.toFixed(1);return`
                <tr>
                  <td><strong>${f.nome}</strong></td>
                  <td><span class="badge amber">${f.marca}</span></td>
                  <td><span class="badge cyan">${b}</span></td>
                  <td class="num">${E} un/mês</td>
                  <td class="num"><span class="badge green" style="font-size:0.82rem;">${R}</span></td>
                  <td class="num">${l(f.valorUnitario)}</td>
                  <td class="num"><strong>${l(f.subtotalFinal)}</strong></td>
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
    </div>`,t.innerHTML=B}window.exportarPDFListaMensal=function(){if(!window.dadosListaMensalCache||!window.dadosListaMensalCache.lista.length){A("⚠️ Nenhuma lista mensal disponível para exportar.");return}const{mesAnoStr:t,diasUteis:e,totalGeralEstimado:a,cobertoAlim:o,cobertoCred:n,cobertoDeb:s,lista:r}=window.dadosListaMensalCache,d=window.open("","_blank","width=900,height=750");if(!d){alert("Permita pop-ups no navegador para gerar o PDF da lista.");return}const u=`
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
          ${r.map(c=>`
            <tr>
              <td class="check-col"><div class="chk-box"></div></td>
              <td><strong>${c.nome}</strong></td>
              <td>${c.marca}</td>
              <td class="num"><strong>${c.totalEstimadoUnidades.toFixed(1)} un</strong></td>
              <td class="num">${l(c.valorUnitario)}</td>
              <td class="num"><strong>${l(c.subtotalFinal)}</strong></td>
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
  `;d.document.open(),d.document.write(u),d.document.close()};document.getElementById("btn-start-cam").addEventListener("click",tt);document.getElementById("btn-switch-cam").addEventListener("click",Lt);document.getElementById("btn-stop-cam").addEventListener("click",Ce);async function tt(){if(typeof Html5Qrcode>"u")return q("Carregando biblioteca de câmera, aguarde..."),setTimeout(tt,600);try{ae||(ae=new Html5Qrcode("qr-reader")),J=await Html5Qrcode.getCameras();let t;if(J&&J.length>0){const e=J.findIndex(a=>/back|traseira|rear|environment/i.test(a.label));ve=e>=0?e:0,t=J[ve].id}else t={facingMode:"environment"};await ae.start(t,{fps:10,qrbox:{width:240,height:240}},at,()=>{}),ge=!0,document.getElementById("btn-start-cam").style.display="none",document.getElementById("btn-switch-cam").style.display=J.length>1?"inline-flex":"none",document.getElementById("btn-stop-cam").style.display="inline-flex"}catch(t){q("❌ Não foi possível acessar a câmera. Verifique as permissões do navegador."),console.error(t)}}async function Lt(){if(!(!ae||!ge))try{await ae.stop(),J.length>1&&(ve=(ve+1)%J.length,await ae.start(J[ve].id,{fps:10,qrbox:{width:240,height:240}},at,()=>{}))}catch(t){console.error("switchCam:",t)}}async function Ce(){if(ae&&ge)try{await ae.stop()}catch{}ge=!1,document.getElementById("btn-start-cam").style.display="inline-flex",document.getElementById("btn-switch-cam").style.display="none",document.getElementById("btn-stop-cam").style.display="none"}function we(t){if(!t)return"";const e=String(t).trim(),a=e.match(/chNFe=([0-9\s%20]{44,65})/i);if(a){const r=decodeURIComponent(a[1]).replace(/\D/g,"");if(r.length===44)return r}const o=e.match(/[?&]p=([0-9]{44})/i)||e.match(/[?&]p=([0-9]{44})\|/i);if(o)return o[1];const n=e.match(/\b\d{44}\b/);if(n)return n[0];const s=e.replace(/\D/g,"");return s.length===44?s:s.length>44?s.slice(0,44):""}function Te(t){return t?t.replace(/\D/g,"").slice(0,44).replace(/(\d{4})(?=\d)/g,"$1 ").trim():""}async function at(t){Ce();const e=we(t),a=e?Te(e):t,o=document.getElementById("inp-nfce-chave");if(o&&(o.value=a),e){q(`✅ QR Code lido com sucesso! NFC-e: ${a}`);const n=`https://www.nfce.fazenda.sp.gov.br/NFCeConsultaPublica/Paginas/ConsultaPublica.aspx?chNFe=${e}`;await ye(n,e)}else q("✅ QR Code lido! Consultando..."),await ye(t)}document.getElementById("btn-carregar-dados").addEventListener("click",async()=>{var a;const t=(((a=document.getElementById("inp-nfce-chave"))==null?void 0:a.value)||"").trim();if(!t){q("⚠️ Digite o número da NFC-e (44 dígitos) ou escaneie o QR Code.");return}if(t.includes("<")&&t.includes(">")||t.length>200&&/Vl\.\s*Unit|Qtde|Emiss/i.test(t)){q("⏳ Processando conteúdo copiado..."),await Be(t);return}const e=we(t);if(e&&e.length===44){const o=Te(e);document.getElementById("inp-nfce-chave").value=o;const n=`https://www.nfce.fazenda.sp.gov.br/NFCeConsultaPublica/Paginas/ConsultaPublica.aspx?chNFe=${e}`;q(`⏳ Consultando NFC-e na SEFAZ: ${e}...`),await ye(n,e);return}if(t.startsWith("http://")||t.startsWith("https://")){q("⏳ Consultando link da nota..."),await ye(t);return}q("⚠️ Número da NFC-e inválido. A chave deve conter 44 dígitos numéricos.","#fb7185")});var Fe;(Fe=document.getElementById("inp-nfce-chave"))==null||Fe.addEventListener("input",t=>{const e=t.target.value;if(e.startsWith("http")||e.includes("<")||e.includes("="))return;const a=e.replace(/\D/g,"").slice(0,44);a.length>0&&a.length<=44&&(t.target.value=Te(a))});document.getElementById("btn-preencher-manual").addEventListener("click",()=>{ot({nomeMercado:"",dataEmissao:new Date().toISOString(),valorTotal:0,descontoTotal:0,valorAPagar:0,qtdTotalItens:0,formasPagamento:{valeAlimentacao:0,cartaoCredito:0,cartaoDebito:0},itens:[]}),q("✍️ Preencha os dados da compra abaixo e clique em Salvar Nota Fiscal.","var(--accent-cyan)")});function ot(t){var s,r,d;document.getElementById("inp-mercado").value=t.nomeMercado||"",document.getElementById("inp-data").value=mt(t.dataEmissao),document.getElementById("inp-vtotal").value=t.valorTotal!==void 0?t.valorTotal:0,document.getElementById("inp-desconto").value=t.descontoTotal!==void 0?t.descontoTotal:0,document.getElementById("inp-pagar").value=t.valorAPagar!==void 0?t.valorAPagar:0,document.getElementById("inp-qtd").value=t.qtdTotalItens!==void 0?t.qtdTotalItens:0,document.getElementById("inp-alim").value=((s=t.formasPagamento)==null?void 0:s.valeAlimentacao)||0,document.getElementById("inp-cred").value=((r=t.formasPagamento)==null?void 0:r.cartaoCredito)||0,document.getElementById("inp-deb").value=((d=t.formasPagamento)==null?void 0:d.cartaoDebito)||0,re=t.itens||[];const e=document.getElementById("form-nfce");e.style.display="block";const a=document.getElementById("preview-itens-box"),o=document.getElementById("count-preview-itens"),n=document.getElementById("lista-preview-itens");re.length>0?(a.style.display="block",o.textContent=re.length,n.innerHTML=re.map(u=>`
      <div style="display:flex; justify-content:space-between; padding: 0.35rem 0; border-bottom: 1px dashed var(--border-color);">
        <span><strong>${u.nome}</strong> (${u.quantidade} ${u.unidade||"Un"})</span>
        <span>${l(u.valorUnitario)}/un = <strong>${l(u.valorTotal)}</strong></span>
      </div>
    `).join("")):a.style.display="none",e.scrollIntoView({behavior:"smooth"})}document.getElementById("form-nfce").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-mercado").value.trim()||"Mercado",a=document.getElementById("inp-data").value||new Date().toISOString(),o=parseFloat(document.getElementById("inp-vtotal").value)||0,n=parseFloat(document.getElementById("inp-desconto").value)||0,s=parseFloat(document.getElementById("inp-pagar").value)||0,r=parseInt(document.getElementById("inp-qtd").value)||0,d=parseFloat(document.getElementById("inp-alim").value)||0,u=parseFloat(document.getElementById("inp-cred").value)||0,c=parseFloat(document.getElementById("inp-deb").value)||0,v=new Date(a).toISOString().slice(0,16),p=V.find(m=>{const g=new Date(m.dataEmissao).toISOString().slice(0,16),I=Math.abs((m.valorAPagar||0)-s)<.05,C=(m.nomeMercado||"").toLowerCase().trim()===e.toLowerCase().trim();return g===v&&I&&C});if(p){q(`⚠️ Esta nota fiscal já existe no sistema (Cadastrada em ${fe(p.dataEmissao)} no valor de ${l(p.valorAPagar)}). Nota não adicionada!`,"#fb7185"),A("⚠️ Nota fiscal já cadastrada! Operação cancelada.");return}const y=new Date(a),i=`${y.getFullYear()}-${String(y.getMonth()+1).padStart(2,"0")}`;q("⏳ Salvando nota fiscal no banco...");try{await he(K(M,Ee),{nomeMercado:e,dataEmissao:a,mesAno:i,qtdTotalItens:r||re.length,valorTotal:o,descontoTotal:n,valorAPagar:s,formasPagamento:{valeAlimentacao:d,cartaoCredito:u,cartaoDebito:c},itens:re,createdAt:Ie()}),q("✅ Nota salva com sucesso!","#34d399"),document.getElementById("form-nfce").style.display="none",document.getElementById("form-nfce").reset();const m=document.getElementById("inp-nfce-chave");m&&(m.value=""),re=[],qe(),goTab("dashboard"),A("🎉 Nota fiscal registrada no Firebase!")}catch(m){q("❌ Erro ao salvar: "+m.message,"#fb7185")}});async function ye(t,e){q("⏳ Consultando dados da nota na SEFAZ...");const a=e||we(t),o=a?`https://www.nfce.fazenda.sp.gov.br/NFCeConsultaPublica/Paginas/ConsultaPublica.aspx?chNFe=${a}`:t,n=[o];n.includes(t)||n.push(t);const s=[r=>`https://api.allorigins.win/raw?url=${encodeURIComponent(r)}`,r=>`https://corsproxy.io/?${encodeURIComponent(r)}`,r=>`https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(r)}`];for(const r of n)for(const d of s)try{const u=await fetch(d(r),{signal:AbortSignal.timeout(6e3)});if(u.ok){const c=await u.text();if(c&&c.length>200&&(/Vl\.\s*Unit|valorUnitario|Qtde|txtTit|itemNota/i.test(c)||/Valor\s*total/i.test(c))){await Be(c);return}}}catch{}Rt(o,a)}function Rt(t,e){const a=document.getElementById("modal-cors-url-display");a&&(a.textContent=t);const o=document.getElementById("modal-link");o&&(o.href=t);const n=document.getElementById("btn-modal-copiar-chave");n&&(n.onclick=()=>{const d=e?e.replace(/\s+/g,""):"";d&&(navigator.clipboard.writeText(d),A("📋 Número da NFC-e copiado para a área de transferência!"))});const s=document.getElementById("modal-cors-textarea");s&&(s.value="");const r=document.getElementById("btn-modal-processar-colado");r&&(r.onclick=async()=>{var u,c;const d=(c=(u=document.getElementById("modal-cors-textarea"))==null?void 0:u.value)==null?void 0:c.trim();if(!d){A("⚠️ Cole o texto da página da SEFAZ no campo antes de processar.");return}document.getElementById("modal-cors").classList.remove("active"),await Be(d)}),document.getElementById("modal-cors").classList.add("active"),q("⚠️ A SEFAZ exige consulta externa. Clique no botão para abrir, copie o conteúdo e cole na caixa de texto.","var(--accent-amber)")}async function Be(t){const e=Ft(t);ot(e),q("✅ Nota lida com sucesso! Confira os valores abaixo e altere se necessário antes de Salvar.","#34d399")}function Ft(t){var O,j,z;const a=new DOMParser().parseFromString(t,"text/html"),o=((O=a.body)==null?void 0:O.textContent)||t;let n=((z=(j=a.querySelector(".txtTopo, .nomeEmit, h1, #lblNomeFantasia, #lblRazaoSocial"))==null?void 0:j.textContent)==null?void 0:z.trim())||"";if(!n||/DOCUMENTO\s*AUXILIAR|NOTA\s*FISCAL\s*DE\s*CONSUMIDOR|DANFE/i.test(n)){const B=o.match(/(?:Raz[ãa]o\s*Social|Nome\s*Fantasia|Emitente)\s*[:\-]?\s*([^\n\r]+)/i);B&&(n=B[1].trim())}(!n||/DOCUMENTO\s*AUXILIAR|NOTA\s*FISCAL\s*DE\s*CONSUMIDOR|DANFE/i.test(n))&&(n="Mercado");let s=new Date().toISOString();const r=o.match(/Emiss[ãa]o\s*[:\-]?\s*(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})?/i)||o.match(/(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})/);if(r){const[B,f,b]=r[1].split("/");s=`${b}-${f}-${B}T${r[2]||"12:00:00"}`}const d=o.match(/Qtd\.?\s*total\s*de\s*itens\s*[:\s]*([\d,\.]+)/i),u=o.match(/Valor\s*total\s*R\$\s*[:\s]*([\d\.,]+)/i),c=o.match(/Descontos?\s*R\$\s*[:\s]*([\d\.,]+)/i),v=o.match(/Valor\s*a\s*pagar\s*R\$\s*[:\s]*([\d\.,]+)/i)||o.match(/VALOR\s*PAGO\s*R\$\s*[:\s]*([\d\.,]+)/i),p=o.match(/(?:Vale\s*)?Alimenta[çc][ãa]o\s*[:\s]*([\d\.,]+)/i),y=o.match(/(?:Cart[ãa]o\s*de\s*)?Cr[eé]dito\s*[:\s]*([\d\.,]+)/i),i=o.match(/(?:Cart[ãa]o\s*de\s*)?D[eé]bito\s*[:\s]*([\d\.,]+)/i),m=d?k(d[1]):0,g=u?k(u[1]):0,I=c?k(c[1]):0;let C=v?k(v[1]):g-I;const S={valeAlimentacao:p?k(p[1]):0,cartaoCredito:y?k(y[1]):0,cartaoDebito:i?k(i[1]):0},x=[];if(a.querySelectorAll("tr, .item, .itemNota").forEach(B=>{var Me;const f=B.textContent;if(!/Vl\.\s*Unit|valorUnitario|Qtde?\./i.test(f))return;const b=B.querySelector(".txtTit, .txtTit2, .nomeProd"),E=((Me=b==null?void 0:b.textContent)==null?void 0:Me.trim())||"",R=f.match(/Qtde?\.\s*[:\s]*([\d,\.]+)/i),D=f.match(/Vl\.\s*Unit\.\s*[:\s]*([\d,\.]+)/i),L=f.match(/Vl\.\s*Total\s*([\d,\.]+)/i),Y=f.match(/C[oó]digo\s*[:\s]*(\d+)/i),W=f.match(/UN\s*[:\s]*([A-Za-z]+)/i),te=R?k(R[1]):1,ne=D?k(D[1]):0,pe=L?k(L[1]):ne*te;E&&ne>0&&x.push({codigo:(Y==null?void 0:Y[1])||"",nome:E,marca:Se(E),quantidade:te,unidade:(W==null?void 0:W[1])||"Un",valorUnitario:ne,valorTotal:pe})}),x.length===0){const B=o.split(/\r?\n/).map(f=>f.trim()).filter(Boolean);for(let f=0;f<B.length;f++){const b=B[f];if(/Qtde?\.?|Vl\.\s*Unit/i.test(b)){let E="";f>0&&B[f-1].length>2&&!/Qtde?|Vl\.|Total|Emiss|CNPJ/i.test(B[f-1])?E=B[f-1]:E=b.split(/Qtde?|Vl\./i)[0].trim();const R=b.match(/Qtde?\.\s*[:\s]*([\d,\.]+)/i),D=b.match(/Vl\.\s*Unit\.\s*[:\s]*([\d,\.]+)/i),L=b.match(/Vl\.\s*Total\s*([\d,\.]+)/i),Y=b.match(/C[oó]digo\s*[:\s]*(\d+)/i)||(f>0?B[f-1].match(/C[oó]digo\s*[:\s]*(\d+)/i):null),W=b.match(/UN\s*[:\s]*([A-Za-z]+)/i),te=R?k(R[1]):1,ne=D?k(D[1]):0,pe=L?k(L[1]):ne*te;E&&(ne>0||pe>0)&&x.push({codigo:(Y==null?void 0:Y[1])||"",nome:E.replace(/^\d+[\s\-\.]*/,"").trim(),marca:Se(E),quantidade:te,unidade:(W==null?void 0:W[1])||"Un",valorUnitario:ne||pe/te,valorTotal:pe})}}}const h=new Date(s),w=`${h.getFullYear()}-${String(h.getMonth()+1).padStart(2,"0")}`;return{nomeMercado:n,dataEmissao:s,mesAno:w,qtdTotalItens:m,valorTotal:g,descontoTotal:I,valorAPagar:C,formasPagamento:S,itens:x}}function Se(t){const e=["BAUDUCCO","BAUD","PANCO","DANONE","NESTLE","QUALITA","SADIA","PERDIGAO","SEARA","CAMIL","TIO JOAO","URBANO","LIZA","SOYA","YPE","PILAO","MELITTA","3 CORACOES","VIGOR","PARMALAT","ITALAC","HEINZ","KRAFT"],a=t.toUpperCase();for(const o of e)if(a.includes(o))return o;return a.split(" ")[0]||"Genérica"}function zt(){const t=document.getElementById("lista-historico");if(!V.length){t.innerHTML='<div class="empty-state">📭 Nenhuma compra cadastrada ainda.</div>';return}t.innerHTML=V.map(e=>{var a,o,n;return`
    <div class="purchase-card">
      <div class="purchase-header" onclick="toggleDetail('${e.id}')">
        <div class="purchase-info" style="flex:1;min-width:0;">
          <h3>${e.nomeMercado||"Mercado"}</h3>
          <p>📅 ${fe(e.dataEmissao)} &nbsp;•&nbsp; 🛒 ${e.qtdTotalItens||0} itens</p>
        </div>
        <div style="display:flex;align-items:center;gap:1.25rem;flex-shrink:0;margin-left:auto;">
          <div class="purchase-values">
            <div class="pv-total">${l(e.valorAPagar)}</div>
            <div class="pv-sub">Desc: ${l(e.descontoTotal)}</div>
          </div>
          <svg class="chevron" id="chev-${e.id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </div>
      <div class="purchase-details" id="detail-${e.id}">
        <div class="details-toolbar">
          <span class="card-subtext">Pagamentos: Alimentação ${l((a=e.formasPagamento)==null?void 0:a.valeAlimentacao)} · Crédito ${l((o=e.formasPagamento)==null?void 0:o.cartaoCredito)} · Débito ${l((n=e.formasPagamento)==null?void 0:n.cartaoDebito)}</span>
          <button class="btn-danger" onclick="confirmarExcluirMercado('${e.id}')">🗑️ Excluir</button>
        </div>
        ${nt(e)}
      </div>
    </div>`}).join("")}function nt(t){return!t.itens||!t.itens.length?'<p class="card-subtext">Nenhum item detalhado registrado.</p>':`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Item</th><th>Marca</th><th class="num">Qtd</th><th class="num">Vl. Unit.</th><th class="num">Vl. Total</th></tr></thead>
    <tbody>${t.itens.map(e=>`<tr>
      <td>${e.nome}</td>
      <td><span class="badge amber">${e.marca||"—"}</span></td>
      <td class="num">${e.quantidade} ${e.unidade||"Un"}</td>
      <td class="num">${l(e.valorUnitario)}</td>
      <td class="num"><strong>${l(e.valorTotal)}</strong></td>
    </tr>`).join("")}</tbody>
  </table></div>`}window.toggleDetail=function(t){let e=document.getElementById("detail-"+t)||document.getElementById(t);!e&&t.startsWith("detail-")&&(e=document.getElementById(t.replace("detail-","")));let a=document.getElementById("chev-"+t)||document.getElementById("chev-"+t.replace("detail-",""));e&&e.classList.toggle("open"),a&&a.classList.toggle("open")};window.toggleGroupMonth=function(t){const e=document.getElementById(t),a=document.getElementById("chev-"+t);if(!e)return;const o=e.style.display==="none"||!e.style.display;e.style.display=o?"block":"none",a&&(o?a.classList.add("open"):a.classList.remove("open"))};window.confirmarExcluirMercado=async function(t){if(confirm("Excluir esta compra de mercado?"))try{await Z(F(M,Ee,t)),A("🗑️ Compra excluída.")}catch(e){alert("Erro: "+e.message)}};function Nt(){const t=document.getElementById("lista-comparacao"),e={};V.forEach(o=>{(o.itens||[]).forEach(n=>{var r;const s=((r=n.nome)==null?void 0:r.toLowerCase().trim())||"produto";e[s]||(e[s]={nome:n.nome,marca:n.marca,hist:{}}),e[s].hist[o.mesAno]=n.valorUnitario})});const a=Object.values(e);if(!a.length){t.innerHTML='<div class="empty-state">Adicione notas para ver a comparação de preços unitários.</div>';return}t.innerHTML=`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Produto</th><th>Marca</th><th>Histórico (Unitário)</th><th>Variação</th></tr></thead>
    <tbody>${a.map(o=>{const n=Object.keys(o.hist).sort();let s=n.map(d=>`${d}: <strong>${l(o.hist[d])}</strong>`).join(" → "),r='<span class="badge cyan">Estável</span>';if(n.length>=2){const d=o.hist[n[n.length-2]],c=o.hist[n[n.length-1]]-d,v=(c/d*100).toFixed(1);c>.01?r=`<span class="badge red">+${v}% ↑</span>`:c<-.01&&(r=`<span class="badge green">${v}% ↓</span>`)}return`<tr><td><strong>${o.nome}</strong></td><td><span class="badge amber">${o.marca||"—"}</span></td><td>${s}</td><td>${r}</td></tr>`}).join("")}</tbody>
  </table></div>`}function Pt(){const t=document.getElementById("lista-recorrencia"),e=document.getElementById("lista-marcas"),a={},o={};V.forEach(r=>{(r.itens||[]).forEach(d=>{var p;const u=(p=d.nome)==null?void 0:p.toLowerCase().trim();if(!u)return;a[u]||(a[u]={nome:d.nome,marca:d.marca,qtd:0,notas:0,units:[]}),a[u].qtd+=d.quantidade||1,a[u].notas+=1,a[u].units.push(d.valorUnitario||0);const c=(d.nome||"").split(" ")[0].toUpperCase();o[c]||(o[c]={});const v=d.marca||"Genérica";o[c][v]||(o[c][v]=[]),o[c][v].push(d.valorUnitario||0)})});const n=Object.values(a).filter(r=>r.notas>1).sort((r,d)=>d.notas-r.notas);t.innerHTML=n.length?`<div class="table-responsive"><table class="custom-table">
        <thead><tr><th>Item</th><th>Marca</th><th>Compras</th><th class="num">Qtd Total</th><th class="num">Média Unitária</th></tr></thead>
        <tbody>${n.map(r=>{const d=r.units.reduce((u,c)=>u+c,0)/r.units.length;return`<tr>
            <td><strong>${r.nome}</strong></td>
            <td><span class="badge amber">${r.marca||"—"}</span></td>
            <td><span class="badge green">${r.notas}x</span></td>
            <td class="num">${r.qtd}</td>
            <td class="num">${l(d)}</td>
          </tr>`}).join("")}</tbody>
      </table></div>`:'<div class="empty-state">Adicione notas para ver a recorrência de itens.</div>';const s=Object.entries(o).filter(([,r])=>Object.keys(r).length>1).map(([r,d])=>{let u=1/0,c="";const v=Object.entries(d).map(([p,y])=>{const i=y.reduce((m,g)=>m+g,0)/y.length;return i<u&&(u=i,c=p),{marca:p,med:i}});return`<div class="brand-card">
      <div class="brand-card-header">
        <span class="card-title">${r}</span>
        <span class="badge green">🏆 Menor preço: ${c} (${l(u)}/un)</span>
      </div>
      <div class="brands-row">
        ${v.map(p=>`<div class="brand-chip${p.marca===c?" best":""}">
          <div class="bc-name">${p.marca} ${p.marca===c?"✅":""}</div>
          <div class="bc-val">${l(p.med)}<span style="font-size:.7rem;font-weight:400">/un</span></div>
        </div>`).join("")}
      </div>
    </div>`}).join("");e.innerHTML=s||'<div class="empty-state">Ao comprar o mesmo tipo de produto com marcas diferentes, o sistema mostrará qual teve menor preço.</div>'}document.getElementById("btn-modal-close").addEventListener("click",()=>{document.getElementById("modal-cors").classList.remove("active")});
