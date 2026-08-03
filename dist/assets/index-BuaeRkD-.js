import{initializeApp as Kt}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";import{getFirestore as Xt,onSnapshot as nt,query as te,collection as Y,orderBy as ee,doc as T,deleteDoc as H,setDoc as V,addDoc as gt,serverTimestamp as yt}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function o(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(n){if(n.ep)return;n.ep=!0;const s=o(n);fetch(n.href,s)}})();const Tt=document.createElement("script");Tt.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js";document.head.appendChild(Tt);const Ct=document.createElement("script");Ct.src="https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js";document.head.appendChild(Ct);const ae={apiKey:"AIzaSyANpFnEIkyN1XCT6qbtmVR9wx7sQHEsyrE",authDomain:"comprasmercado-23913.firebaseapp.com",projectId:"comprasmercado-23913",storageBucket:"comprasmercado-23913.firebasestorage.app",messagingSenderId:"317518149234",appId:"1:317518149234:web:94f38624d68a2b9a6634eb",measurementId:"G-2XP88EK37S"},oe=Kt(ae),I=Xt(oe),ft="compras",st="entradas",ot="faturas",K="boletos",Mt="reservas",X="estimativas";let O=[],j=[],k=[],P=[],Z=[],N={valorAtualGuardado:0},ht=null,J=null,Q=[],dt=0,ct=!1,et=[];function i(t){return Number(t||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}function S(t){if(typeof t=="number")return t;if(!t)return 0;const e=parseFloat(String(t).replace(/R\$\s?/gi,"").replace(/\s/g,"").replace(/\./g,"").replace(",","."));return isNaN(e)?0:e}function mt(t){if(!t)return"—";try{return new Date(t).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}catch{return t}}function $(t,e=3500){const o=document.getElementById("toast");o.textContent=t,o.classList.add("show"),setTimeout(()=>o.classList.remove("show"),e)}function U(t,e="var(--accent-amber)"){const o=document.getElementById("status-msg");o&&(o.textContent=t,o.style.color=e)}function ne(t){if(!t)return new Date().toISOString().slice(0,16);try{const e=new Date(t);if(isNaN(e.getTime()))return new Date().toISOString().slice(0,16);const o=a=>String(a).padStart(2,"0");return`${e.getFullYear()}-${o(e.getMonth()+1)}-${o(e.getDate())}T${o(e.getHours())}:${o(e.getMinutes())}`}catch{return new Date().toISOString().slice(0,16)}}function se(t,e){let o=0;const a=new Date(t,e+1,0).getDate();for(let n=1;n<=a;n++){const s=new Date(t,e,n).getDay();s!==0&&s!==6&&o++}return o}window.goTab=function(t){document.querySelectorAll(".tab-content").forEach(o=>o.classList.remove("active")),document.querySelectorAll(".desktop-nav .nav-item").forEach(o=>o.classList.remove("active")),document.querySelectorAll(".mobile-nav .mob-btn").forEach(o=>o.classList.remove("active"));const e=document.getElementById("tab-"+t);e&&e.classList.add("active"),document.querySelectorAll(`[data-tab="${t}"]`).forEach(o=>o.classList.add("active"))};document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>goTab(t.getAttribute("data-tab")))});document.querySelectorAll(".sub-item").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".sub-item").forEach(o=>o.classList.remove("active")),document.querySelectorAll(".sub-tab-content").forEach(o=>o.style.display="none"),t.classList.add("active");const e=document.getElementById("sub-"+t.getAttribute("data-sub"));e&&(e.style.display="block")})});function St(){document.getElementById("modal-add-nota").classList.add("active")}function Dt(){ct&&$t(),document.getElementById("modal-add-nota").classList.remove("active")}var It;(It=document.getElementById("btn-open-modal-home"))==null||It.addEventListener("click",St);var wt;(wt=document.getElementById("btn-mercado-add-nota"))==null||wt.addEventListener("click",St);var At;(At=document.getElementById("btn-close-modal-add"))==null||At.addEventListener("click",Dt);nt(te(Y(I,ft),ee("dataEmissao","desc")),t=>{O=t.docs.map(e=>({id:e.id,...e.data()})),W()},t=>console.error("Firestore Mercado:",t));nt(Y(I,st),t=>{j=t.docs.map(e=>({id:e.id,...e.data()})),W()},t=>console.error("Firestore Entradas:",t));nt(Y(I,ot),t=>{k=t.docs.map(e=>({id:e.id,...e.data()})),W()},t=>console.error("Firestore Faturas:",t));nt(Y(I,K),t=>{P=t.docs.map(e=>({id:e.id,...e.data()})),W()},t=>console.error("Firestore Boletos:",t));nt(T(I,Mt,"config"),t=>{t.exists()&&(N=t.data()),W()},t=>console.error("Firestore Reservas:",t));nt(Y(I,X),t=>{Z=t.docs.map(e=>({id:e.id,...e.data()})),W()},t=>console.error("Firestore Estimativas:",t));let h=new Date().toISOString().slice(0,7);const Lt=new Set;function rt(){const t=new Set,e=new Date().toISOString().slice(0,7);t.add(e);const o=new Date,a=new Date(o.getFullYear(),o.getMonth()+1,1),n=r=>String(r).padStart(2,"0"),s=`${a.getFullYear()}-${n(a.getMonth()+1)}`;return t.add(s),h&&t.add(h),j.forEach(r=>{r.mesAno&&t.add(r.mesAno)}),k.forEach(r=>{r.mesAno&&t.add(r.mesAno)}),P.forEach(r=>{r.mesAno&&t.add(r.mesAno)}),O.forEach(r=>{r.mesAno&&t.add(r.mesAno)}),Z.forEach(r=>{r.mesAno&&t.add(r.mesAno)}),Array.from(t).filter(r=>!Lt.has(r)).sort().reverse()}window.excluirMesSelecionadoAtual=function(){window.excluirDadosDoMes(h)};window.selecionarMesGlobal=function(t){if(!t)return;h=t;const e=document.getElementById("inp-seletor-mes-global");e&&(e.value=t);const o=document.getElementById("inp-entradas-mes-ano");o&&(o.value=t);const a=document.getElementById("inp-fatura-vencimento");a&&(a.value=`${t}-10`,typeof atualizarMesRefFatura=="function"&&atualizarMesRefFatura());const n=document.getElementById("inp-boleto-vencimento");n&&(n.value=`${t}-10`,typeof atualizarMesRefBoleto=="function"&&atualizarMesRefBoleto()),W()};window.verMesEIrParaControle=function(t){selecionarMesGlobal(t),typeof goTab=="function"&&goTab("mensal")};function re(){const t=document.getElementById("seletor-meses-bar"),e=document.getElementById("seletor-meses-bar-salarios"),o=document.getElementById("seletor-meses-bar-estimativa"),a=rt();a.includes(h)||(h=a[0]||new Date().toISOString().slice(0,7));const n=document.getElementById("inp-seletor-mes-global");n&&n.value!==h&&(n.value=h);const s=document.getElementById("inp-entradas-mes-ano");s&&s.value!==h&&(s.value=h);const r=a.map(l=>{const[m,d]=l.split("-"),c=new Date(parseInt(m),parseInt(d)-1,1).toLocaleString("pt-BR",{month:"short"}).toUpperCase().replace(".",""),b=l===h;return`
      <button class="sub-item ${b?"active":""}" onclick="selecionarMesGlobal('${l}')" style="${b?"background:var(--secondary);color:#fff;border-color:var(--secondary);box-shadow:0 0 10px rgba(99,102,241,0.4);font-weight:700":"background:rgba(15,23,42,.6);color:var(--text-muted);border:1px solid var(--border-color)"}; display:inline-flex;align-items:center;gap:.35rem">
        📅 ${c}/${m}
      </button>
    `}).join("");t&&(t.innerHTML=r),e&&(e.innerHTML=r),o&&(o.innerHTML=r)}window.switchMensalSub=function(t){document.querySelectorAll("[data-mensal-sub]").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".mensal-sub-content").forEach(a=>a.style.display="none");const e=document.querySelector(`[data-mensal-sub="${t}"]`);e&&e.classList.add("active");const o=document.getElementById(t);o&&(o.style.display="block")};function W(){re(),de(),ie(),Rt(),be(),Ee(),Ie(),we(),Me(),Se(),De(),$e()}function ie(){const t=h,e=j.filter(y=>y.mesAno===t),o=k.filter(y=>y.mesAno===t),a=P.filter(y=>y.mesAno===t),n=O.filter(y=>y.mesAno===t),s=e.reduce((y,x)=>y+(x.valor||0),0),r=o.reduce((y,x)=>y+(x.valorTotal!==void 0?x.valorTotal:x.valor||0),0),l=a.reduce((y,x)=>y+(x.valorTotal!==void 0?x.valorTotal:x.valor||0),0);let m=0;n.forEach(y=>{y.formasPagamento&&(m+=y.formasPagamento.cartaoDebito||0)});const d=s-r-l-m,p=document.getElementById("m-total-entradas");p&&(p.textContent=i(s));const c=document.getElementById("m-total-cartoes");c&&(c.textContent=i(r));const b=document.getElementById("m-total-boletos");b&&(b.textContent=i(l));const u=document.getElementById("m-mercado-debito");u&&(u.textContent=i(m));const v=document.getElementById("m-saldo-liquido");v&&(v.textContent=i(d),v.style.color=d>=0?"#60a5fa":"#fb7185");const[f,L]=t.split("-"),q=new Date(parseInt(f),parseInt(L)-1,1).toLocaleString("pt-BR",{month:"long"}),w=q.charAt(0).toUpperCase()+q.slice(1),B=document.getElementById("m-lbl-saldo-liquido");B&&(B.textContent=`Saldo Líquido (${w}/${f})`),le(e,o,a,n)}function le(t,e,o,a){const n=document.getElementById("content-salarios-mes");n&&(n.innerHTML=`
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header">
          <span class="card-title">💵 Entradas Registradas em ${h}</span>
          <span class="badge green">Total: ${i(t.reduce((m,d)=>m+(d.valor||0),0))}</span>
        </div>
        ${t.length?`<div class="table-responsive"><table class="custom-table">
              <thead><tr><th>Pessoa</th><th>Descrição</th><th>Tipo</th><th class="num">Valor</th><th>Ação</th></tr></thead>
              <tbody>${t.map(m=>`<tr>
                <td><span class="badge ${m.pessoa==="Victor"?"green":m.pessoa==="Maria"?"purple":"cyan"}">${m.pessoa}</span></td>
                <td><strong>${m.descricao}</strong></td>
                <td><span class="badge amber">${m.tipo==="holerite"?"Holerite":"Manual"}</span></td>
                <td class="num" style="color:#34d399"><strong>${i(m.valor)}</strong></td>
                <td><button class="btn-danger" onclick="excluirEntrada('${m.id}')">🗑️</button></td>
              </tr>`).join("")}</tbody>
            </table></div>`:`<div class="empty-state">Nenhuma entrada cadastrada para ${h}. Use a aba "Salários & Entradas" para cadastrar.</div>`}
      </div>
    `);const s=document.getElementById("content-cartoes-mes");if(s){const m=e.reduce((p,c)=>p+(c.valorTotal||0),0),d=e.length?Ut(e,"mes_"+h):"";s.innerHTML=`
      ${d}
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header">
          <span class="card-title">💳 Faturas de Cartão Vencendo em ${h}</span>
          <span class="badge rose">Total: ${i(m)}</span>
        </div>
        ${e.length?e.map(p=>`
              <div class="purchase-card" style="margin-bottom:1rem">
                <div class="purchase-header" onclick="toggleDetail('fat-m-${p.id}')">
                  <div class="purchase-info">
                    <h3>${p.cartao==="Nubank"?"🟣 Nubank":p.cartao==="Santander"?"🔴 Santander":"💳 "+(p.descricao||p.cartao)}</h3>
                    <p>Vencimento: <strong>${p.dataVencimento||"—"}</strong> • ${p.qtdItens||(p.itens?p.itens.length:0)} lançamentos</p>
                  </div>
                  <div class="purchase-values" style="display:flex;align-items:center;gap:.75rem">
                    <div style="text-align:right">
                      <div class="pv-total" style="color:#fb7185">${i(p.valorTotal)}</div>
                      <div class="pv-sub">Clique para ver itens <span class="chevron" id="chev-fat-m-${p.id}">▼</span></div>
                    </div>
                    <button type="button" class="btn-danger" style="padding:.35rem .65rem;font-size:.78rem;margin-left:.25rem" onclick="event.stopPropagation(); excluirFaturaDocumento('${p.id}')" title="Excluir esta fatura de todos os lugares do sistema">
                      🗑️ Excluir
                    </button>
                  </div>
                </div>
                <div id="detail-fat-m-${p.id}" class="purchase-details">
                  <div class="details-toolbar">
                    <span style="font-weight:700;font-size:.9rem;color:var(--text-muted)">Lançamentos da Fatura</span>
                    <button class="btn-danger" onclick="excluirFaturaDocumento('${p.id}')">🗑️ Excluir Fatura</button>
                  </div>
                  ${Vt(p)}
                </div>
              </div>
            `).join(""):`<div class="empty-state">Nenhuma fatura cadastrada com vencimento em ${h}. Use a aba "Cartões de Crédito" para importar.</div>`}
      </div>
    `}const r=document.getElementById("content-boletos-mes");if(r){const m=o.reduce((d,p)=>d+(p.valorTotal||0),0);r.innerHTML=`
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header">
          <span class="card-title">📄 Boletos Vencendo em ${h}</span>
          <span class="badge purple">Total: ${i(m)}</span>
        </div>
        ${o.length?o.map(d=>`
              <div class="purchase-card" style="margin-bottom:1rem">
                <div class="purchase-header" onclick="toggleDetail('bol-m-${d.id}')">
                  <div class="purchase-info">
                    <h3>📄 ${d.descricao||"Boleto / Conta"}</h3>
                    <p>Vencimento: <strong>${d.dataVencimento||"—"}</strong> • ${d.qtdItens||(d.itens?d.itens.length:0)} encargos</p>
                  </div>
                  <div class="purchase-values" style="display:flex;align-items:center;gap:.5rem">
                    <div style="text-align:right">
                      <div class="pv-total" style="color:#c084fc">${i(d.valorTotal)}</div>
                      <div class="pv-sub">Clique para ver detalhes <span class="chevron" id="chev-bol-m-${d.id}">▼</span></div>
                    </div>
                    <button type="button" class="btn-secondary" style="padding:.35rem .65rem;font-size:.78rem;margin-left:.25rem" onclick="event.stopPropagation(); editarValorBoletoDocumento('${d.id}')" title="Editar valor do boleto">
                      ✏️ Editar
                    </button>
                    <button type="button" class="btn-danger" style="padding:.35rem .65rem;font-size:.78rem" onclick="event.stopPropagation(); excluirBoletoDocumento('${d.id}')" title="Excluir este boleto de todos os lugares do sistema">
                      🗑️ Excluir
                    </button>
                  </div>
                </div>
                <div id="detail-bol-m-${d.id}" class="purchase-details">
                  <div class="details-toolbar">
                    <span style="font-weight:700;font-size:.9rem;color:var(--text-muted)">Detalhamento do Boleto</span>
                    <div style="display:flex;gap:.35rem">
                      <button class="btn-secondary" onclick="editarValorBoletoDocumento('${d.id}')">✏️ Editar Valor</button>
                      <button class="btn-danger" onclick="excluirBoletoDocumento('${d.id}')">🗑️ Excluir Boleto</button>
                    </div>
                  </div>
                  ${Ht(d)}
                </div>
              </div>
            `).join(""):`<div class="empty-state">Nenhum boleto cadastrado para ${h}. Use a aba "Boletos" para importar.</div>`}
      </div>
    `}const l=document.getElementById("content-mercado-mes");if(l){let m=0,d=0,p=0;a.forEach(c=>{c.formasPagamento?(m+=c.formasPagamento.valeAlimentacao||0,d+=c.formasPagamento.cartaoCredito||0,p+=c.formasPagamento.cartaoDebito||0):p+=c.valorAPagar||0}),l.innerHTML=`
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem">
          <span class="card-title">🛒 Compras de Mercado em ${h}</span>
          <div style="display:flex;gap:.4rem;align-items:center;flex-wrap:wrap">
            ${m>0?`<span class="badge green">🥗 Alimentação: ${i(m)}</span>`:""}
            ${d>0?`<span class="badge blue">💳 Crédito: ${i(d)}</span>`:""}
            ${p>0?`<span class="badge amber">💵 Débito: ${i(p)}</span>`:""}
            <span class="badge purple">${a.length} notas cadastradas</span>
          </div>
        </div>
        ${a.length?a.map(c=>{const b=c.formasPagamento||{},u=b.valeAlimentacao||0,v=b.cartaoCredito||0,f=b.cartaoDebito!==void 0?b.cartaoDebito:!u&&!v&&c.valorAPagar||0;return`
              <div class="purchase-card" style="margin-bottom:1rem">
                <div class="purchase-header" onclick="toggleDetail('mer-m-${c.id}')">
                  <div class="purchase-info">
                    <h3>🛒 ${c.nomeMercado||"Mercado"}</h3>
                    <p>Data: <strong>${mt(c.dataEmissao)}</strong> • ${c.qtdTotalItens||0} itens</p>
                  </div>
                  <div class="purchase-values" style="display:flex;align-items:center;gap:.75rem">
                    <div style="display:flex;flex-direction:column;align-items:flex-end;gap:.25rem;font-size:.78rem">
                      ${u>0?`<span style="color:#34d399;background:rgba(16,185,129,0.12);padding:2px 8px;border-radius:4px;white-space:nowrap">🥗 Alimentação: <strong>${i(u)}</strong></span>`:""}
                      ${v>0?`<span style="color:#60a5fa;background:rgba(59,130,246,0.12);padding:2px 8px;border-radius:4px;white-space:nowrap">💳 Crédito: <strong>${i(v)}</strong></span>`:""}
                      ${f>0?`<span style="color:#fbbf24;background:rgba(245,158,11,0.12);padding:2px 8px;border-radius:4px;white-space:nowrap">💵 Débito: <strong>${i(f)}</strong></span>`:""}
                    </div>
                    <div style="text-align:right">
                      <div class="pv-total" style="color:#fbbf24">${i(c.valorAPagar)}</div>
                      <div class="pv-sub">Clique para ver itens <span class="chevron" id="chev-mer-m-${c.id}">▼</span></div>
                    </div>
                  </div>
                </div>
                <div id="detail-mer-m-${c.id}" class="purchase-details">
                  <div class="details-toolbar">
                    <span style="font-weight:700;font-size:.9rem;color:var(--text-muted)">Itens da Nota</span>
                    <button class="btn-danger" onclick="excluirCompraDocumento('${c.id}')">🗑️ Excluir Nota</button>
                  </div>
                  ${Wt(c)}
                </div>
              </div>
            `}).join(""):`<div class="empty-state">Nenhuma nota de mercado cadastrada para ${h}.</div>`}
      </div>
    `}}function de(){const t=rt();let e=0,o=0,a=0,n=0,s=0;t.forEach(u=>{const v=j.filter(w=>w.mesAno===u).reduce((w,B)=>w+(B.valor||0),0),f=k.filter(w=>w.mesAno===u).reduce((w,B)=>w+(B.valorTotal!==void 0?B.valorTotal:B.valor||0),0),L=P.filter(w=>w.mesAno===u).reduce((w,B)=>w+(B.valorTotal!==void 0?B.valorTotal:B.valor||0),0);let F=0;O.filter(w=>w.mesAno===u).forEach(w=>{w.formasPagamento&&(F+=w.formasPagamento.cartaoDebito||0)});const q=v-f-L-F;e+=v,o+=f,a+=L,n+=F,s+=q});let r=0,l=0;const m={};O.forEach(u=>{const v=u.valorAPagar||0;u.formasPagamento&&(r+=u.formasPagamento.valeAlimentacao||0,l+=u.formasPagamento.cartaoCredito||0);const f=u.mesAno||"Outros";m[f]=(m[f]||0)+v});const d=N&&N.valorAtualGuardado!==void 0?N.valorAtualGuardado:3e3,p=s+d;document.getElementById("fin-total-entradas").textContent=i(e);const c=document.getElementById("fin-subtext-entradas");c&&(c.textContent="Soma Total das Entradas da Tabela Mensal"),document.getElementById("fin-total-cartoes").textContent=i(o),document.getElementById("fin-total-boletos").textContent=i(a),document.getElementById("fin-mercado-debito").textContent=i(n),document.getElementById("fin-saldo-liquido").textContent=i(s),document.getElementById("fin-saldo-liquido").style.color=s>=0?"#60a5fa":"#fb7185";const b=document.getElementById("fin-subtext-saldo");b&&(b.innerHTML=`Saldo Líquido + Reserva Guardada (${i(d)}): <strong style="color:#34d399">${i(p)}</strong>`),document.getElementById("dash-alimentacao").textContent=i(r),document.getElementById("dash-credito").textContent=i(l),document.getElementById("dash-debito").textContent=i(n),ce(),Ft(m)}function ce(){const t=document.getElementById("tabela-resumo-mensal");if(!t)return;const e=rt();if(!e.length){t.innerHTML='<div class="empty-state">Nenhum dado cadastrado ainda.</div>';return}const o=e.map(a=>{const n=j.filter(v=>v.mesAno===a).reduce((v,f)=>v+(f.valor||0),0),s=k.filter(v=>v.mesAno===a).reduce((v,f)=>v+(f.valorTotal!==void 0?f.valorTotal:f.valor||0),0),r=P.filter(v=>v.mesAno===a).reduce((v,f)=>v+(f.valorTotal!==void 0?f.valorTotal:f.valor||0),0);let l=0;O.filter(v=>v.mesAno===a).forEach(v=>{v.formasPagamento&&(l+=v.formasPagamento.cartaoDebito||0)});const m=n-s-r-l,[d,p]=a.split("-"),b=new Date(parseInt(d),parseInt(p)-1,1).toLocaleString("pt-BR",{month:"short"}).toUpperCase().replace(".","");return`
      <tr style="${a===h?"background:rgba(99,102,241,0.1)":""}">
        <td><strong>📅 ${b}/${d}</strong></td>
        <td style="color:#34d399"><strong>${i(n)}</strong></td>
        <td style="color:#fb7185">${i(s)}</td>
        <td style="color:#c084fc">${i(r)}</td>
        <td style="color:#fbbf24">${i(l)}</td>
        <td style="color:${m>=0?"#60a5fa":"#fb7185"}; font-weight:800">${i(m)}</td>
        <td>
          <div style="display:flex;gap:.35rem;align-items:center">
            <button class="btn-secondary" style="padding:.25rem .65rem; font-size:.78rem" onclick="verMesEIrParaControle('${a}')">
              🔍 Ver Mês
            </button>
            <button class="btn-danger" style="padding:.25rem .65rem; font-size:.78rem" onclick="excluirDadosDoMes('${a}')">
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
          ${o}
        </tbody>
      </table>
    </div>
  `}window.excluirDadosDoMes=async function(t){const e=t||h;if(!e)return;const[o,a]=e.split("-"),s=new Date(parseInt(o),parseInt(a)-1,1).toLocaleString("pt-BR",{month:"long"}),r=`${s.charAt(0).toUpperCase()+s.slice(1)} de ${o}`,l=j.filter(u=>u.mesAno===e),m=k.filter(u=>u.mesAno===e),d=P.filter(u=>u.mesAno===e),p=O.filter(u=>u.mesAno===e),c=Z.filter(u=>u.id===e),b=`⚠️ TEM CERTEZA QUE DESEJA EXCLUIR O MÊS ${r.toUpperCase()} (${e})?

Isso irá APAGAR PERMANENTEMENTE todos os registros vinculados a este mês:
• ${l.length} Salário(s) / Entrada(s)
• ${m.length} Fatura(s) de Cartão
• ${d.length} Boleto(s) & Conta(s)
• ${p.length} Nota(s) de Mercado
• Estimativa orçamentária do mês

Esta ação é irreversível. Confirmar exclusão do mês?`;if(confirm(b))try{const u=[];l.forEach(f=>u.push(H(T(I,st,f.id)))),m.forEach(f=>u.push(H(T(I,ot,f.id)))),d.forEach(f=>u.push(H(T(I,K,f.id)))),p.forEach(f=>u.push(H(T(I,ft,f.id)))),c.forEach(f=>u.push(H(T(I,X,f.id)))),u.length>0&&await Promise.all(u),Lt.add(e),$(`🗑️ O mês ${r} e todos os seus dados foram excluídos com sucesso!`),h=rt()[0]||new Date().toISOString().slice(0,7),W()}catch(u){alert("Erro ao excluir dados do mês: "+u.message)}};function Ft(t){var s;if(typeof Chart>"u")return setTimeout(()=>Ft(t),300);const e=(s=document.getElementById("chart-barras"))==null?void 0:s.getContext("2d");if(!e)return;const o=Object.keys(t).sort(),a=o.map(r=>{const[l,m]=r.split("-");return`${m}/${l}`}),n=o.map(r=>t[r]);ht&&ht.destroy(),ht=new Chart(e,{type:"bar",data:{labels:a.length?a:["Sem compras"],datasets:[{label:"Gasto Mercado R$",data:n.length?n:[0],backgroundColor:"rgba(16,185,129,0.78)",borderColor:"#10b981",borderWidth:2,borderRadius:8}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:r=>` ${i(r.raw)}`}}},scales:{y:{beginAtZero:!0,grid:{color:"rgba(255,255,255,.05)"},ticks:{color:"#94a3b8",callback:r=>"R$"+r}},x:{grid:{display:!1},ticks:{color:"#94a3b8"}}}}})}function qt(t){if(!t)return 0;const e=t.match(/L[íi]quido(?:\s*a\s*receber)?\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/TOTAL\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/SAL[ÁA]RIO\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/VALOR\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i);return e?S(e[1]):0}function me(){const t=document.getElementById("inp-entradas-mes-ano");if(t&&!t.value){const e=new Date,o=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0");t.value=`${o}-${a}`}}setTimeout(me,300);let tt="mes";window.toggleFiltroEntradasTabela=function(t){tt=t,Rt()};document.getElementById("form-holerite-victor").addEventListener("submit",async t=>{t.preventDefault();const e=h||document.getElementById("inp-entradas-mes-ano").value||new Date().toISOString().slice(0,7),o=document.getElementById("inp-holerite-txt-victor").value;let a=parseFloat(document.getElementById("inp-salario-val-victor").value)||0;if(!a&&o&&(a=qt(o)),!a){$("⚠️ Digite ou cole um holerite válido com valor.");return}const n=`salario_victor_${e}`;await V(T(I,st,n),{pessoa:"Victor",tipo:"holerite",descricao:`Salário Líquido Victor (${e})`,valor:a,mesAno:e,data:new Date().toISOString()}),document.getElementById("inp-holerite-txt-victor").value="",document.getElementById("inp-salario-val-victor").value="",$(`✅ Salário do Victor (${e}) salvo com sucesso!`)});document.getElementById("form-holerite-maria").addEventListener("submit",async t=>{t.preventDefault();const e=h||document.getElementById("inp-entradas-mes-ano").value||new Date().toISOString().slice(0,7),o=document.getElementById("inp-holerite-txt-maria").value;let a=parseFloat(document.getElementById("inp-salario-val-maria").value)||0;if(!a&&o&&(a=qt(o)),!a){$("⚠️ Digite ou cole um holerite válido com valor.");return}const n=`salario_maria_${e}`;await V(T(I,st,n),{pessoa:"Maria",tipo:"holerite",descricao:`Salário Líquido Maria (${e})`,valor:a,mesAno:e,data:new Date().toISOString()}),document.getElementById("inp-holerite-txt-maria").value="",document.getElementById("inp-salario-val-maria").value="",$(`✅ Salário da Maria (${e}) salvo com sucesso!`)});document.getElementById("form-entrada-manual").addEventListener("submit",async t=>{t.preventDefault();const e=h||document.getElementById("inp-entradas-mes-ano").value||new Date().toISOString().slice(0,7),o=document.getElementById("inp-ent-desc").value.trim(),a=parseFloat(document.getElementById("inp-ent-val").value)||0,n=document.getElementById("inp-ent-pessoa").value;!o||!a||(await gt(Y(I,st),{pessoa:n,tipo:"manual",descricao:o,valor:a,mesAno:e,data:new Date().toISOString()}),t.target.reset(),$(`🎉 Entrada manual (${e}) registrada!`))});function Rt(){var m,d,p;const t=h||((m=document.getElementById("inp-entradas-mes-ano"))==null?void 0:m.value)||new Date().toISOString().slice(0,7),e=document.getElementById("lbl-entradas-mes-ref");if(e){const[c,b]=t.split("-"),v=new Date(parseInt(c),parseInt(b)-1,1).toLocaleString("pt-BR",{month:"long"}),f=v.charAt(0).toUpperCase()+v.slice(1);e.textContent=`Visualizando e inserindo entradas para: ${f} de ${c}`}const o=((d=j.find(c=>c.pessoa==="Victor"&&c.tipo==="holerite"&&c.mesAno===t))==null?void 0:d.valor)||0,a=((p=j.find(c=>c.pessoa==="Maria"&&c.tipo==="holerite"&&c.mesAno===t))==null?void 0:p.valor)||0,n=j.filter(c=>c.mesAno===t),s=n.reduce((c,b)=>c+(b.valor||0),0);document.getElementById("val-salario-victor").textContent=i(o),document.getElementById("val-salario-maria").textContent=i(a),document.getElementById("val-entradas-combinado").textContent=`${i(s)}`;const r=document.getElementById("lista-entradas-registradas");if(!r)return;const l=tt==="mes"?n:j;if(!l.length){r.innerHTML=`
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;flex-wrap:wrap;gap:.5rem">
        <span style="font-size:.84rem;color:var(--text-muted)">Modo de Exibição da Tabela:</span>
        <div style="display:flex;gap:.35rem">
          <button type="button" class="btn-secondary" style="padding:.25rem .6rem;font-size:.78rem;${tt==="mes"?"background:var(--secondary);color:#fff":""}" onclick="toggleFiltroEntradasTabela('mes')">📅 Mês (${t})</button>
          <button type="button" class="btn-secondary" style="padding:.25rem .6rem;font-size:.78rem;${tt==="todos"?"background:var(--secondary);color:#fff":""}" onclick="toggleFiltroEntradasTabela('todos')">🌐 Todas as Entradas</button>
        </div>
      </div>
      <div class="empty-state">Nenhuma entrada registrada para ${tt==="mes"?"o mês "+t:"o sistema"}.</div>
    `;return}r.innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.75rem;flex-wrap:wrap;gap:.5rem">
      <span style="font-size:.84rem;color:var(--text-muted);font-weight:600">Exibindo ${l.length} entrada(s) em tabela:</span>
      <div style="display:flex;gap:.35rem">
        <button type="button" class="btn-secondary" style="padding:.25rem .6rem;font-size:.78rem;${tt==="mes"?"background:var(--secondary);color:#fff":""}" onclick="toggleFiltroEntradasTabela('mes')">📅 Mês ${t}</button>
        <button type="button" class="btn-secondary" style="padding:.25rem .6rem;font-size:.78rem;${tt==="todos"?"background:var(--secondary);color:#fff":""}" onclick="toggleFiltroEntradasTabela('todos')">🌐 Todas</button>
      </div>
    </div>
    <div class="table-responsive"><table class="custom-table">
      <thead><tr><th>Mês / Ref</th><th>Descrição</th><th>Pessoa</th><th>Tipo</th><th class="num">Valor</th><th>Ação</th></tr></thead>
      <tbody>${l.map(c=>`<tr>
        <td><span class="badge green">${c.mesAno||"—"}</span></td>
        <td><strong>${c.descricao}</strong></td>
        <td><span class="badge ${c.pessoa==="Victor"?"green":c.pessoa==="Maria"?"purple":"cyan"}">${c.pessoa}</span></td>
        <td><span class="badge amber">${c.tipo==="holerite"?"Holerite":"Manual"}</span></td>
        <td class="num" style="color:#34d399"><strong>${i(c.valor)}</strong></td>
        <td><button class="btn-danger" onclick="excluirEntrada('${c.id}')">🗑️</button></td>
      </tr>`).join("")}</tbody>
    </table></div>
  `}window.excluirEntrada=async function(t){confirm("Excluir esta entrada?")&&(await H(T(I,st,t)),$("🗑️ Entrada removida."))};let Et="Nubank",M=null;function ue(){const t=document.getElementById("inp-fatura-vencimento");if(t&&!t.value){const e=new Date,o=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0");t.value=`${o}-${a}-10`,atualizarMesRefFatura()}}setTimeout(ue,300);window.atualizarMesRefFatura=function(){const t=document.getElementById("inp-fatura-vencimento"),e=document.getElementById("lbl-fatura-mes-ref");if(!(!t||!e))if(t.value){const[o,a]=t.value.split("-"),s=new Date(parseInt(o),parseInt(a)-1,1).toLocaleString("pt-BR",{month:"long"});e.textContent=`Fatura ${s.charAt(0).toUpperCase()+s.slice(1)}/${o}`}else e.textContent="Mês da Fatura"};window.selecionarCartaoFatura=function(t){Et=t,document.querySelectorAll(".btn-card-select").forEach(o=>o.classList.remove("active"));const e=document.querySelector(`.btn-card-select[data-card="${t}"]`);e&&e.classList.add("active"),$(`Cartão selecionado: ${t}`)};window.handleFileFaturaSelect=async function(t){const e=t.target.files[0];if(!e)return;const o=document.getElementById("txt-file-fatura");o&&(o.textContent=`📄 Arquivo: ${e.name}`),$(`⏳ Lendo arquivo da fatura (${e.name})...`);let a="";if(e.type==="application/pdf"||e.name.endsWith(".pdf"))a=await Ot(e);else try{a=await e.text()}catch{a=""}a?(document.getElementById("inp-fatura-txt").value=a,await Pt(a,Et)):$("❌ Não foi possível ler o texto do arquivo da fatura.")};async function Ot(t){try{const e=await t.arrayBuffer();if(typeof pdfjsLib>"u")return $("⚠️ Aguarde a biblioteca de PDF carregar..."),"";pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";let o=pdfjsLib.getDocument({data:e});o.onPassword=(s,r)=>{let l=prompt(`🔒 Este PDF de fatura está protegido por senha.
Digite a senha para abrir (ex: CPF ou Data de Nascimento):`);l?s(l):$("⚠️ Senha não informada. Leitura do PDF cancelada.")};const a=await o.promise;let n="";for(let s=1;s<=a.numPages;s++){const l=await(await a.getPage(s)).getTextContent();let m=null,d="";for(const p of l.items){if(!p.str)continue;const c=p.transform?p.transform[5]:null;m!==null&&Math.abs(c-m)>3?d+=`
`:d.length>0&&!d.endsWith(`
`)&&!d.endsWith(" ")&&(d+=" "),d+=p.str,m=c}n+=d+`
`}return n}catch(e){return e.name==="PasswordException"?$("🔒 O PDF precisa de senha válida para ser aberto."):console.error("Erro ao ler PDF:",e),""}}function pe(t){if(!t)return null;const e=t.match(/Total\s*a\s*Pagar\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/no\s*valor\s*de\s*R?\$\s*([\d\.,]+)/i)||t.match(/Valor\s*total\s*da\s*fatura\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/Total\s*da\s*fatura\s*[:\s]*R?\$\s*([\d\.,]+)/i);if(e){const o=S(e[1]);if(o>0)return o}return null}function ve(t){if(!t)return null;const e=t.match(/Vencimento\s*[:\s]*(\d{2}[\/\.-]\d{2}[\/\.-]\d{4})/i)||t.match(/Data\s*de\s*vencimento\s*[:\s]*(\d{2})\s+([A-Za-z]{3})\s+(\d{4})/i)||t.match(/FATURA\s+(\d{2})\s+([A-Za-z]{3})\s+(\d{4})/i);if(e){if(e[2]&&e[3]){const o=e[1],a=e[2].toUpperCase(),n=e[3],r={JAN:"01",FEB:"02",MAR:"03",ABR:"04",APR:"04",MAI:"05",MAY:"05",JUN:"06",JUL:"07",AGO:"08",AUG:"08",SET:"09",SEP:"09",OUT:"10",OCT:"10",NOV:"11",DEZ:"12",DEC:"12"}[a]||"07";return`${n}-${r}-${o.padStart(2,"0")}`}else if(e[1]){const[o,a,n]=e[1].split(/[\/\.-]/);return`${n}-${a.padStart(2,"0")}-${o.padStart(2,"0")}`}}return null}window.importarFaturaManualOuArquivo=async function(){const t=document.getElementById("inp-fatura-txt").value.trim();if(!t){$("⚠️ Selecione o arquivo da fatura (.pdf, .csv) ou cole o texto da fatura.");return}await Pt(t,Et)};async function Pt(t,e){const o=ve(t);o&&(document.getElementById("inp-fatura-vencimento").value=o,atualizarMesRefFatura());const a=pe(t),n=ge(t),s=document.getElementById("inp-fatura-vencimento").value||new Date().toISOString().slice(0,10),r=s.slice(0,7),l=n.reduce((b,u)=>b+u.valor,0),m=a||l||0,d=e?`Cartão ${e}`:"Fatura Cartão";M={cartao:e||"Nubank",descricao:d,dataVencimento:s,mesAno:r,valorTotal:m,qtdItens:n.length,itens:n};const p=document.getElementById("inp-revisao-fatura-desc");p&&(p.value=d);const c=document.getElementById("inp-revisao-fatura-val");c&&(c.value=m?m.toFixed(2):""),zt(),n.length>0?$(`✅ ${n.length} compras encontradas! Fatura total: ${i(m)}.`):$("ℹ️ Fatura pronta para revisão. Confirme o valor total e o cartão abaixo.")}window.atualizarValorTotalRevisaoFatura=function(){var e;if(!M)return;const t=parseFloat((e=document.getElementById("inp-revisao-fatura-val"))==null?void 0:e.value)||0;M.valorTotal=t,document.getElementById("badge-total-preview-fatura").textContent=i(t)};function zt(){if(!M)return;const{valorTotal:t,itens:e,cartao:o,descricao:a}=M;document.getElementById("badge-total-preview-fatura").textContent=i(t);const n=document.getElementById("inp-revisao-fatura-desc");n&&(!n.value||n.value==="Fatura Cartão")&&(n.value=a||`Cartão ${o||"Nubank"}`);const s=document.getElementById("inp-revisao-fatura-val");s&&(!s.value||parseFloat(s.value)===0)&&(s.value=t?t.toFixed(2):"");const r=document.getElementById("lista-preview-fatura-itens");!e||!e.length?r.innerHTML='<div class="empty-state">Nenhum item individual extraído. O valor total acima será considerado.</div>':r.innerHTML=e.map((m,d)=>`
      <div style="display:flex; justify-content:space-between; align-items:center; padding:.4rem 0; border-bottom:1px dashed var(--border-color); font-size:.82rem;">
        <span><strong>${m.dataCompra||"—"}</strong> — ${m.descricao}</span>
        <div style="display:flex; align-items:center; gap:.75rem;">
          <span style="color:#fb7185; font-weight:700;">${i(m.valor)}</span>
          <button type="button" class="btn-danger" style="padding:.15rem .45rem; font-size:.75rem;" onclick="removerItemRevisaoFatura(${d})">🗑️</button>
        </div>
      </div>
    `).join("");const l=document.getElementById("box-revisao-fatura");l.style.display="block",l.scrollIntoView({behavior:"smooth"})}window.removerItemRevisaoFatura=function(t){if(!M||!M.itens)return;M.itens.splice(t,1);const e=M.itens.reduce((o,a)=>o+a.valor,0);if(e>0){M.valorTotal=e;const o=document.getElementById("inp-revisao-fatura-val");o&&(o.value=e.toFixed(2))}M.qtdItens=M.itens.length,zt(),$("🗑️ Item removido da revisão da fatura.")};window.confirmarEGravarFaturaDocumento=async function(){var a,n;if(!M)return;const t=(a=document.getElementById("inp-revisao-fatura-desc"))==null?void 0:a.value.trim(),e=parseFloat((n=document.getElementById("inp-revisao-fatura-val"))==null?void 0:n.value)||0,o=document.getElementById("inp-fatura-vencimento").value||new Date().toISOString().slice(0,10);if(!e){$("⚠️ Digite ou confirme o valor total da fatura.");return}M.cartao=t||M.cartao||"Cartão",M.valorTotal=e,M.dataVencimento=o,M.mesAno=o.slice(0,7);try{await gt(Y(I,ot),{...M,createdAt:yt()}),document.getElementById("box-revisao-fatura").style.display="none",document.getElementById("inp-fatura-txt").value="";const s=document.getElementById("txt-file-fatura");s&&(s.textContent="Clique para Selecionar o Arquivo da Fatura");const r=i(M.valorTotal);M=null,$(`🎉 Fatura de ${r} salva com sucesso!`)}catch(s){alert("Erro ao salvar fatura: "+s.message)}};function ge(t){if(!t)return[];const e=[],o=/(?:[@\)\(\*•\s]+)?(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+(?:(\d{2}\/\d{2})\s+)?(-?R?\$\s*[\d\.]+,\d{2}|-?[\d\.]+,\d{2})/gi;if(t.split(`
`).forEach(n=>{const s=n.trim();if(!s||/EMISS[ÃA]O|TRANSA[ÇC][ÕO]ES|RESUMO|PAGAMENTO DE FATURA|TOTAL DA FATURA|FATURA ANTERIOR|SALDO ANTERIOR|LIMITE DISPON[ÍI]VEL|OPÇÕES DE PAGAMENTO|ALTERNATIVAS DE PAGAMENTO|PAGAMENTO E DEMAIS|PARCELAMENTOS|DESPESAS|HISTÓRICO DE FATURAS|SUPERCRÉDITO|SAQUE À CRÉDITO|COMPRA DATA DESCRIÇÃO/i.test(s))return;const r=/(?:[@\)\(\*•\s]+)?(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+(?:(\d{2}\/\d{2})\s+)?(-?R?\$\s*[\d\.]+,\d{2}|-?[\d\.]+,\d{2})$/i,l=s.match(r)||s.match(/(?:[@\)\(\*•\s]+)?(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+(?:(\d{2}\/\d{2})\s+)?(-?R?\$\s*[\d\.]+,\d{2}|-?[\d\.]+,\d{2})/i);if(l){const m=l[1];let d=l[2].trim();const p=l[3],c=l[4];if(c.includes("-")||/DEB AUTOM|PAGAMENTO|PAGTO|CR[ÉE]DITO FATURA/i.test(d))return;const b=S(c);p&&(d+=` (${p})`),d&&b>0&&d.length>2&&!/fatura|limite|pagamento|saldo|alternativas|opções|período|emissão|vencimento/i.test(d)&&e.push({dataCompra:m,descricao:d,valor:b})}}),e.length===0){let n;for(;(n=o.exec(t))!==null;){const s=n[1];let r=n[2].trim();const l=n[3],m=n[4];if(m.includes("-")||/DEB AUTOM|PAGAMENTO|PAGTO|CR[ÉE]DITO FATURA/i.test(r))continue;const d=S(m);l&&(r+=` (${l})`),r&&d>0&&r.length>2&&!/fatura|limite|pagamento|saldo|alternativas|opções|período|emissão|vencimento/i.test(r)&&e.push({dataCompra:s,descricao:r,valor:d})}}return e}window.ultimosLocaisAnalisados={};function fe(t){if(!t)return"DIVERSOS";let e=t.replace(/\(\d{1,2}\/\d{1,2}\)/gi,"").replace(/\b\d{1,2}\/\d{1,2}\b/gi,"").replace(/\b\d{1,2}x\b/gi,"").trim();return e=e.replace(/\s+/g," "),e.toUpperCase()}function kt(t){const e={};(Array.isArray(t)?t:[t]).forEach(n=>{!n||!n.itens||!Array.isArray(n.itens)||n.itens.forEach(s=>{if(!s.descricao||!s.valor)return;const r=fe(s.descricao);e[r]||(e[r]={nome:r,qtd:0,valorTotal:0,compras:[]}),e[r].qtd+=1,e[r].valorTotal+=s.valor||0,e[r].compras.push({dataCompra:s.dataCompra||"—",descricao:s.descricao,valor:s.valor||0,cartao:n.cartao||"Cartão",mesAno:n.mesAno||"—"})})});const a=Object.values(e).filter(n=>n.qtd>=2);return a.sort((n,s)=>s.valorTotal-n.valorTotal),a}function Ut(t,e="geral"){const o=kt(t);if(o.forEach(n=>{window.ultimosLocaisAnalisados[`${e}_${n.nome}`]=n}),!o.length)return`
      <div class="card" style="margin-bottom:1.5rem; background:linear-gradient(135deg,rgba(30,41,59,0.7),rgba(15,23,42,0.8)); border-color:rgba(251,113,133,0.3)">
        <div class="card-header">
          <span class="card-title" style="color:#fb7185; font-size:.95rem">📊 Análise de Locais Frequentes (2x ou mais)</span>
          <span class="badge gray">Sem repetições</span>
        </div>
        <p style="font-size:.8rem; color:var(--text-muted); margin:0">Nenhum estabelecimento possui 2 ou mais compras nesta fatura/mês.</p>
      </div>
    `;const a=o.reduce((n,s)=>n+s.valorTotal,0);return`
    <div class="card" style="margin-bottom:1.5rem; background:linear-gradient(135deg,rgba(30,41,59,.95),rgba(15,23,42,.98)); border-color:#fb7185; box-shadow:0 4px 20px rgba(251,113,133,0.15)">
      <div class="card-header" style="flex-wrap:wrap; gap:.5rem">
        <div>
          <span class="card-title" style="color:#fb7185; font-size:1.05rem">🏬 Locais Mais Frequentados (${o.length} estabelecimentos com 2+ compras)</span>
          <p style="font-size:.78rem; color:var(--text-muted); margin-top:.2rem">💡 Clique em qualquer quadrado para ver o detalhamento de cada compra individual!</p>
        </div>
        <span class="badge rose" style="font-size:.85rem; padding:.35rem .75rem">Soma Repetidos: ${i(a)}</span>
      </div>

      <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap:0.85rem; margin-top:.5rem">
        ${o.map(n=>`
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
                <div style="font-weight:800; font-size:1.08rem; color:#fb7185">${i(n.valorTotal)}</div>
                <div style="font-size:.72rem; color:var(--text-muted)">total gasto 🔍</div>
              </div>
            </div>
          `).join("")}
      </div>
    </div>
  `}window.abrirModalComprasEstabelecimento=function(t){const e=window.ultimosLocaisAnalisados[t];if(!e){$("⚠️ Não foi possível carregar os detalhes do estabelecimento.");return}let o=document.getElementById("modal-detalhes-estabelecimento");if(!o){const n=document.createElement("div");n.id="modal-detalhes-estabelecimento",n.className="modal-overlay",n.innerHTML=`
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
    `,document.body.appendChild(n),o=n,o.addEventListener("click",s=>{s.target===o&&fecharModalEstabelecimento()})}document.getElementById("modal-est-titulo").innerHTML=`🏬 Estabelecimento: <span style="color:#fff">${e.nome}</span>`,document.getElementById("modal-est-subtitulo").textContent=`${e.qtd} compra(s) somando o valor total de ${i(e.valorTotal)}`;const a=document.getElementById("modal-est-body");a.innerHTML=`
    <div style="margin-bottom:1rem; background:rgba(251,113,133,0.08); border:1px dashed rgba(251,113,133,0.3); border-radius:8px; padding:.75rem 1rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:.5rem">
      <div>
        <span style="font-size:.82rem; color:var(--text-muted)">Total de Lançamentos:</span>
        <strong style="color:#fff; margin-left:.3rem; font-size:.95rem">${e.qtd} compras</strong>
      </div>
      <div>
        <span style="font-size:.82rem; color:var(--text-muted)">Soma Total Gasta:</span>
        <strong style="color:#fb7185; margin-left:.3rem; font-size:1.1rem">${i(e.valorTotal)}</strong>
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
              <td class="num" style="color:#fb7185; font-weight:700">${i(n.valor)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `,o.style.display="flex"};window.fecharModalEstabelecimento=function(){const t=document.getElementById("modal-detalhes-estabelecimento");t&&(t.style.display="none")};function be(){const t=k.reduce((a,n)=>a+(n.valorTotal!==void 0?n.valorTotal:n.valor||0),0);document.getElementById("badge-total-cartoes").textContent=`${i(t)} total`;const e=document.getElementById("lista-faturas-registradas");if(!k.length){e.innerHTML='<div class="empty-state">Nenhuma fatura cadastrada ainda.</div>';return}const o=Ut(k,"geral");e.innerHTML=o+k.map(a=>{var c;const n=a.valorTotal!==void 0?a.valorTotal:a.valor||0,s=a.cartao||"Cartão",r=s.toLowerCase().includes("nubank"),l=r?"purple":"red",m=r?"🟣":"🔴",d=a.dataVencimento?mt(a.dataVencimento).split(",")[0]:"—",p=a.mesAno||"—";return`
      <div class="purchase-card" style="margin-bottom:1rem">
        <div class="purchase-header" onclick="toggleDetail('fat-${a.id}')">
          <div class="purchase-info">
            <h3><span class="badge ${l}">${m} ${s}</span> — Vencimento: ${d}</h3>
            <p>📅 Mês Referência: <strong>${p}</strong> &nbsp;•&nbsp; 🛒 ${a.qtdItens||((c=a.itens)==null?void 0:c.length)||1} itens contemplados</p>
          </div>
          <div class="purchase-values" style="display:flex;align-items:center;gap:.75rem">
            <div style="text-align:right">
              <div class="pv-total" style="color:#fb7185">${i(n)}</div>
              <div class="pv-sub">Fatura do Mês</div>
            </div>
            <button type="button" class="btn-danger" style="padding:.35rem .65rem;font-size:.78rem;margin-left:.25rem" onclick="event.stopPropagation(); excluirFaturaDocumento('${a.id}')" title="Excluir esta fatura de todos os lugares do sistema">
              🗑️ Excluir
            </button>
          </div>
          <svg class="chevron" id="chev-fat-${a.id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="purchase-details" id="detail-fat-${a.id}">
          <div class="details-toolbar">
            <span class="card-subtext">Detalhamento dos Lançamentos da Fatura</span>
            <button class="btn-danger" onclick="excluirFaturaDocumento('${a.id}')">🗑️ Excluir Fatura</button>
          </div>
          ${Vt(a)}
        </div>
      </div>
    `}).join("")}function Vt(t){if(t.itens&&t.itens.length>0){const e=kt([t]),o=`fatura_${t.id}`;e.forEach(n=>{window.ultimosLocaisAnalisados[`${o}_${n.nome}`]=n});let a="";return e.length>0&&(a=`
        <div style="background:rgba(251,113,133,0.08); border:1px dashed rgba(251,113,133,0.35); border-radius:8px; padding:.75rem 1rem; margin-bottom:1rem">
          <div style="font-weight:700; font-size:.84rem; color:#fb7185; margin-bottom:.5rem">
            🏬 Locais com 2 ou mais compras nesta fatura (${e.length} estabelecimentos - clique para ver):
          </div>
          <div style="display:flex; flex-wrap:wrap; gap:.5rem">
            ${e.map(n=>`
                <span style="background:rgba(15,23,42,0.9); border:1px solid rgba(251,113,133,0.4); border-radius:6px; padding:.3rem .6rem; font-size:.78rem; color:#f1f5f9; display:inline-flex; align-items:center; gap:.35rem; cursor:pointer"
                      onclick="event.stopPropagation(); abrirModalComprasEstabelecimento('${`${o}_${n.nome}`}')"
                      title="Clique para ver detalhadamente as compras de ${n.nome}">
                  🏬 <strong>${n.nome}</strong>: <span class="badge rose" style="font-size:.7rem">${n.qtd}x compras</span> <strong style="color:#fb7185; margin-left:.25rem">${i(n.valorTotal)}</strong>
                </span>
              `).join("")}
          </div>
        </div>
      `),`
      ${a}
      <div class="table-responsive"><table class="custom-table">
        <thead><tr><th>Data Compra</th><th>Descrição do Lançamento</th><th class="num">Valor</th><th>Ação</th></tr></thead>
        <tbody>${t.itens.map((n,s)=>`<tr>
          <td><strong>${n.dataCompra||"—"}</strong></td>
          <td>${n.descricao}</td>
          <td class="num" style="color:#fb7185"><strong>${i(n.valor)}</strong></td>
          <td><button class="btn-danger" style="padding:.2rem .5rem; font-size:.78rem;" onclick="removerItemFaturaCadastrada('${t.id}', ${s})">🗑️ Excluir</button></td>
        </tr>`).join("")}</tbody>
      </table></div>
    `}return`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Descrição</th><th class="num">Valor</th><th>Ação</th></tr></thead>
    <tbody><tr>
      <td>${t.descricao||"Fatura do Cartão"}</td>
      <td class="num" style="color:#fb7185"><strong>${i(t.valor||t.valorTotal)}</strong></td>
      <td><button class="btn-danger" style="padding:.2rem .5rem; font-size:.78rem;" onclick="excluirFaturaDocumento('${t.id}')">🗑️ Excluir</button></td>
    </tr></tbody>
  </table></div>`}window.removerItemFaturaCadastrada=async function(t,e){const o=k.find(s=>s.id===t);if(!o||!o.itens||!confirm("Remover este item da fatura?"))return;const a=[...o.itens];a.splice(e,1);const n=a.reduce((s,r)=>s+(r.valor||0),0);a.length===0?(await H(T(I,ot,t)),$("🗑️ Fatura excluída pois todos os itens foram removidos.")):(await V(T(I,ot,t),{...o,itens:a,valorTotal:n,qtdItens:a.length}),$("🗑️ Item removido da fatura."))};window.excluirFaturaDocumento=async function(t){confirm("Excluir esta fatura e todos os seus lançamentos?")&&(await H(T(I,ot,t)),$("🗑️ Fatura removida com sucesso."))};let D=null;function he(){const t=document.getElementById("inp-boleto-vencimento");if(t&&!t.value){const e=new Date,o=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0");t.value=`${o}-${a}-10`,atualizarMesRefBoleto()}}setTimeout(he,300);window.atualizarMesRefBoleto=function(){const t=document.getElementById("inp-boleto-vencimento"),e=document.getElementById("lbl-boleto-mes-ref");if(!(!t||!e))if(t.value){const[o,a]=t.value.split("-"),s=new Date(parseInt(o),parseInt(a)-1,1).toLocaleString("pt-BR",{month:"long"});e.textContent=`Boleto ${s.charAt(0).toUpperCase()+s.slice(1)}/${o}`}else e.textContent="Mês do Boleto"};window.handleFileBoletoSelect=async function(t){const e=t.target.files[0];if(!e)return;const o=document.getElementById("txt-file-boleto");o&&(o.textContent=`📄 Arquivo: ${e.name}`),$(`⏳ Lendo arquivo do boleto (${e.name})...`);let a="";if(e.type==="application/pdf"||e.name.endsWith(".pdf"))a=await Ot(e);else try{a=await e.text()}catch{a=""}a?(document.getElementById("inp-boleto-txt").value=a,await Nt(a,e.name)):$("❌ Não foi possível ler o texto do arquivo do boleto.")};window.importarBoletoManualOuArquivo=async function(){const t=document.getElementById("inp-boleto-txt").value.trim();if(!t){$("⚠️ Selecione o arquivo do boleto (.pdf, .txt) ou cole o texto do boleto.");return}await Nt(t,"Boleto")};async function Nt(t,e){const o=ye(t);o.vencimento&&(document.getElementById("inp-boleto-vencimento").value=o.vencimento,atualizarMesRefBoleto());const a=document.getElementById("inp-boleto-vencimento").value||new Date().toISOString().slice(0,10),n=a.slice(0,7),s=o.beneficiario||e.replace(/\.[^/.]+$/,"")||"Boleto / Conta",r=o.itens.reduce((m,d)=>m+d.valor,0),l=o.valorTotal||r||0;document.getElementById("inp-revisao-boleto-desc").value=s,document.getElementById("inp-revisao-boleto-val").value=l?l.toFixed(2):"",D={descricao:s,dataVencimento:a,mesAno:n,valorTotal:l,qtdItens:o.itens.length,itens:o.itens},jt(),$("✅ Boleto identificado! Confira a descrição, valor e itens antes de salvar.")}window.atualizarValorTotalRevisaoBoleto=function(){if(!D)return;const t=parseFloat(document.getElementById("inp-revisao-boleto-val").value)||0;D.valorTotal=t,document.getElementById("badge-total-preview-boleto").textContent=i(t)};function jt(){if(!D)return;const{valorTotal:t,itens:e}=D;document.getElementById("badge-total-preview-boleto").textContent=i(t);const o=document.getElementById("lista-preview-boleto-itens");!e||!e.length?o.innerHTML='<div class="empty-state">Nenhum encargo/item individual extraído. O valor total acima será considerado.</div>':o.innerHTML=e.map((n,s)=>`
      <div style="display:flex; justify-content:space-between; align-items:center; padding:.4rem 0; border-bottom:1px dashed var(--border-color); font-size:.82rem;">
        <span><strong>${n.dataBoleto||"—"}</strong> — ${n.descricao}</span>
        <div style="display:flex; align-items:center; gap:.75rem;">
          <span style="color:#c084fc; font-weight:700;">${i(n.valor)}</span>
          <button type="button" class="btn-danger" style="padding:.15rem .45rem; font-size:.75rem;" onclick="removerItemRevisaoBoleto(${s})">🗑️</button>
        </div>
      </div>
    `).join("");const a=document.getElementById("box-revisao-boleto");a.style.display="block",a.scrollIntoView({behavior:"smooth"})}window.removerItemRevisaoBoleto=function(t){if(!D||!D.itens)return;D.itens.splice(t,1);const e=D.itens.reduce((o,a)=>o+a.valor,0);e>0&&(D.valorTotal=e,document.getElementById("inp-revisao-boleto-val").value=e.toFixed(2)),D.qtdItens=D.itens.length,jt(),$("🗑️ Item removido da revisão do boleto.")};window.confirmarEGravarBoletoDocumento=async function(){if(!D)return;const t=document.getElementById("inp-revisao-boleto-desc").value.trim(),e=parseFloat(document.getElementById("inp-revisao-boleto-val").value)||0,o=document.getElementById("inp-boleto-vencimento").value||new Date().toISOString().slice(0,10);if(!e){$("⚠️ Digite ou confirme o valor total do boleto.");return}D.descricao=t||"Boleto / Conta",D.valorTotal=e,D.dataVencimento=o,D.mesAno=o.slice(0,7);try{await gt(Y(I,K),{...D,createdAt:yt()}),document.getElementById("box-revisao-boleto").style.display="none",document.getElementById("inp-boleto-txt").value="";const a=document.getElementById("txt-file-boleto");a&&(a.textContent="Clique para Selecionar o Arquivo do Boleto");const n=i(D.valorTotal);D=null,$(`🎉 Boleto de ${n} salvo com sucesso!`)}catch(a){alert("Erro ao salvar boleto: "+a.message)}};function ye(t){if(!t)return{beneficiario:"",valorTotal:0,vencimento:null,itens:[]};let e="",o=0,a=null;const n=[],s=t.match(/Vencimento\s*[:\s]*(\d{2}[\/\.-]\d{2}[\/\.-]\d{4})/i)||t.match(/Vencimento\s*[:\s]*(\d{2})\s+([A-Za-z]{3})\s+(\d{4})/i)||t.match(/Data\s*de\s*Vencimento\s*[:\s]*(\d{2}[\/\.-]\d{2}[\/\.-]\d{4})/i);if(s){if(s[2]&&s[3]){const d=s[1],p=s[2].toUpperCase();a=`${s[3]}-${{JAN:"01",FEB:"02",MAR:"03",ABR:"04",APR:"04",MAI:"05",MAY:"05",JUN:"06",JUL:"07",AGO:"08",AUG:"08",SET:"09",SEP:"09",OUT:"10",OCT:"10",NOV:"11",DEZ:"12",DEC:"12"}[p]||"07"}-${d.padStart(2,"0")}`}else if(s[1]){const[d,p,c]=s[1].split(/[\/\.-]/);a=`${c}-${p.padStart(2,"0")}-${d.padStart(2,"0")}`}}const r=t.match(/Benefici[áa]rio\s*[:\s]*([^\n\r]+)/i)||t.match(/Nome\s*do\s*Cedente\s*[:\s]*([^\n\r]+)/i)||t.match(/Raz[ãa]o\s*Social\s*[:\s]*([^\n\r]+)/i);r&&(e=r[1].trim().replace(/\s{2,}/g," "));const l=t.match(/Valor\s*do\s*Documento\s*[:\s]*R?\$\s*([\d\.]+,\d{2})/i)||t.match(/\(=\)\s*Valor\s*Cobrado\s*[:\s]*R?\$\s*([\d\.]+,\d{2})/i)||t.match(/Valor\s*Cobrado\s*[:\s]*R?\$\s*([\d\.]+,\d{2})/i)||t.match(/Valor\s*R?\$\s*([\d\.]+,\d{2})/i);return l&&(o=S(l[1])),t.split(`
`).forEach(d=>{const p=d.trim();if(!p||/vencimento|beneficiário|cedente|nosso\s*número|agência|código|autenticação|instruções/i.test(p))return;const c=p.match(/(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\b[A-Za-z]{3}\b)?\s*(.+?)\s+R?\$\s*([\d\.]+,\d{2})$/i);if(c){const b=c[1]||"Boleto",u=c[2].trim(),v=S(c[3]);u&&v>0&&u.length>2&&!/valor|total|documento|cobrado/i.test(u)&&n.push({dataBoleto:b,descricao:u,valor:v})}}),{beneficiario:e,valorTotal:o,vencimento:a,itens:n}}function Ee(){const t=P.reduce((a,n)=>a+(n.valorTotal!==void 0?n.valorTotal:n.valor||0),0);document.getElementById("badge-total-boletos").textContent=`${i(t)} total`;const e=document.getElementById("lista-boletos-registrados");if(!P.length){e.innerHTML='<div class="empty-state">Nenhum boleto cadastrado ainda.</div>';return}const o=[...P].sort((a,n)=>{const s=a.dataVencimento?new Date(a.dataVencimento).getTime():a.mesAno?new Date(a.mesAno+"-01").getTime():0;return(n.dataVencimento?new Date(n.dataVencimento).getTime():n.mesAno?new Date(n.mesAno+"-01").getTime():0)-s});e.innerHTML=o.map(a=>{var m;const n=a.valorTotal!==void 0?a.valorTotal:a.valor||0,s=a.dataVencimento?mt(a.dataVencimento).split(",")[0]:"—",r=a.mesAno||"—",l=a.descricao||"Boleto / Conta";return`
      <div class="purchase-card">
        <div class="purchase-header" onclick="toggleDetail('bol-${a.id}')">
          <div class="purchase-info">
            <h3><span class="badge purple">📄 ${l}</span> — Vencimento: ${s}</h3>
            <p>📅 Mês Referência: <strong>${r}</strong> &nbsp;•&nbsp; 🛒 ${a.qtdItens||((m=a.itens)==null?void 0:m.length)||1} itens / encargos</p>
          </div>
          <div class="purchase-values" style="display:flex;align-items:center;gap:.5rem">
            <div style="text-align:right">
              <div class="pv-total" style="color:#c084fc">${i(n)}</div>
              <div class="pv-sub">Boleto do Mês</div>
            </div>
            <button type="button" class="btn-secondary" style="padding:.35rem .65rem;font-size:.78rem;margin-left:.25rem" onclick="event.stopPropagation(); editarValorBoletoDocumento('${a.id}')" title="Editar valor do boleto">
              ✏️ Editar
            </button>
            <button type="button" class="btn-danger" style="padding:.35rem .65rem;font-size:.78rem" onclick="event.stopPropagation(); excluirBoletoDocumento('${a.id}')" title="Excluir este boleto de todos os lugares do sistema">
              🗑️ Excluir
            </button>
          </div>
          <svg class="chevron" id="chev-bol-${a.id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="purchase-details" id="detail-bol-${a.id}">
          <div class="details-toolbar">
            <span class="card-subtext">Detalhamento dos Itens / Encargos do Boleto</span>
            <div style="display:flex;gap:.35rem">
              <button class="btn-secondary" onclick="editarValorBoletoDocumento('${a.id}')">✏️ Editar Valor</button>
              <button class="btn-danger" onclick="excluirBoletoDocumento('${a.id}')">🗑️ Excluir Boleto</button>
            </div>
          </div>
          ${Ht(a)}
        </div>
      </div>
    `}).join("")}function Ht(t){return t.itens&&t.itens.length>0?`<div class="table-responsive"><table class="custom-table">
      <thead><tr><th>Data</th><th>Descrição / Item</th><th class="num">Valor</th><th>Ação</th></tr></thead>
      <tbody>${t.itens.map((e,o)=>`<tr>
        <td><strong>${e.dataBoleto||"—"}</strong></td>
        <td>${e.descricao}</td>
        <td class="num" style="color:#c084fc"><strong>${i(e.valor)}</strong></td>
        <td>
          <div style="display:flex;gap:.35rem;align-items:center">
            <button class="btn-secondary" style="padding:.2rem .5rem; font-size:.78rem;" onclick="editarItemBoleto('${t.id}', ${o})" title="Editar valor deste item">✏️ Editar</button>
            <button class="btn-danger" style="padding:.2rem .5rem; font-size:.78rem;" onclick="removerItemBoletoCadastrado('${t.id}', ${o})">🗑️ Excluir</button>
          </div>
        </td>
      </tr>`).join("")}</tbody>
    </table></div>`:`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Descrição</th><th class="num">Valor</th><th>Ação</th></tr></thead>
    <tbody><tr>
      <td>${t.descricao||"Boleto"}</td>
      <td class="num" style="color:#c084fc"><strong>${i(t.valor||t.valorTotal)}</strong></td>
      <td>
        <div style="display:flex;gap:.35rem;align-items:center">
          <button class="btn-secondary" style="padding:.2rem .5rem; font-size:.78rem;" onclick="editarValorBoletoDocumento('${t.id}')" title="Editar valor do boleto">✏️ Editar</button>
          <button class="btn-danger" style="padding:.2rem .5rem; font-size:.78rem;" onclick="excluirBoletoDocumento('${t.id}')">🗑️ Excluir</button>
        </div>
      </td>
    </tr></tbody>
  </table></div>`}window.editarValorBoletoDocumento=async function(t){const e=P.find(s=>s.id===t);if(!e)return;const o=e.valorTotal!==void 0?e.valorTotal:e.valor||0,a=prompt(`✏️ Editar valor do boleto "${e.descricao||"Boleto"}":`,o.toFixed(2));if(a===null)return;const n=typeof S=="function"?S(a):parseFloat(a.replace(",","."));if(isNaN(n)||n<=0){alert("Por favor, informe um valor numérico válido maior que zero.");return}try{const s=T(I,K,t),r={valorTotal:n,valor:n,dataAtualizacao:new Date().toISOString()};if(e.itens&&e.itens.length>0){const l=[...e.itens];l[0]={...l[0],valor:n},r.itens=l}await V(s,r,{merge:!0}),$(`✏️ Valor do boleto atualizado para ${i(n)} em todo o sistema!`)}catch(s){alert("Erro ao atualizar valor do boleto: "+s.message)}};window.editarItemBoleto=async function(t,e){const o=P.find(l=>l.id===t);if(!o||!o.itens||!o.itens[e])return;const a=o.itens[e],n=a.valor||0,s=prompt(`✏️ Editar valor do item "${a.descricao}":`,n.toFixed(2));if(s===null)return;const r=typeof S=="function"?S(s):parseFloat(s.replace(",","."));if(isNaN(r)||r<=0){alert("Por favor, informe um valor numérico válido maior que zero.");return}try{const l=[...o.itens];l[e]={...l[e],valor:r};const m=l.reduce((d,p)=>d+(p.valor||0),0);await V(T(I,K,t),{...o,itens:l,valorTotal:m,valor:m,dataAtualizacao:new Date().toISOString()},{merge:!0}),$(`✏️ Item do boleto atualizado para ${i(r)} em todo o sistema!`)}catch(l){alert("Erro ao atualizar item do boleto: "+l.message)}};window.removerItemBoletoCadastrado=async function(t,e){const o=P.find(s=>s.id===t);if(!o||!o.itens||!confirm("Remover este item do boleto?"))return;const a=[...o.itens];a.splice(e,1);const n=a.reduce((s,r)=>s+(r.valor||0),0);a.length===0?(await H(T(I,K,t)),$("🗑️ Boleto excluído pois todos os itens foram removidos.")):(await V(T(I,K,t),{...o,itens:a,valorTotal:n,qtdItens:a.length}),$("🗑️ Item removido do boleto."))};window.excluirBoletoDocumento=async function(t){const e=P.find(n=>n.id===t),o=e?e.descricao||"Boleto / Conta":"este boleto",a=e?i(e.valorTotal!==void 0?e.valorTotal:e.valor||0):"";confirm(`⚠️ Deseja realmente excluir ${o} ${a?"("+a+")":""}?

Este boleto será removido permanentemente de todos os meses, resumos e relatórios do sistema.`)&&(await H(T(I,K,t)),$("🗑️ Boleto removido de todo o sistema com sucesso."))};document.getElementById("form-config-reservas").addEventListener("submit",async t=>{t.preventDefault();const e=parseFloat(document.getElementById("inp-meta-anual").value)||0,o=parseFloat(document.getElementById("inp-saldo-guardado").value)||0;N.metaAnual=e,N.valorAtualGuardado=o,await V(T(I,Mt,"config"),{metaAnual:e,valorAtualGuardado:o,dataAtualizacao:new Date().toISOString()}),$("✅ Reservas e configurações de economias salvas!"),W()});function $e(){const t=N&&N.metaAnual!==void 0?N.metaAnual:15e3,e=N&&N.valorAtualGuardado!==void 0?N.valorAtualGuardado:3e3,o=document.getElementById("inp-meta-anual");o&&document.activeElement!==o&&(o.value=t);const a=document.getElementById("inp-saldo-guardado");a&&document.activeElement!==a&&(a.value=e);const s=new Date().getMonth()+1,r=Math.max(1,12-s+1),l=Math.max(0,t-e),m=l>0?l/r:0;document.getElementById("val-meta-reserva").textContent=i(m);const d=document.getElementById("subtext-meta-reserva");d&&(d.textContent=`Faltam ${i(l)} p/ Meta Anual de ${i(t)} (${r} mês(es) até o fim do ano)`),document.getElementById("val-real-guardado").textContent=i(e);const p=rt();let c=0,b=0,u=0,v=0;p.forEach(C=>{const G=j.filter(E=>E.mesAno===C).reduce((E,A)=>E+(A.valor||0),0),z=k.filter(E=>E.mesAno===C).reduce((E,A)=>E+(A.valorTotal!==void 0?A.valorTotal:A.valor||0),0),R=P.filter(E=>E.mesAno===C).reduce((E,A)=>E+(A.valorTotal!==void 0?A.valorTotal:A.valor||0),0);let g=0;O.filter(E=>E.mesAno===C).forEach(E=>{E.formasPagamento&&(g+=E.formasPagamento.cartaoDebito||0)}),c+=G,b+=z,u+=R,v+=g});const f=b+u+v,L=c-f,F=Math.max(1,p.length),q=L/F,w=q>0?q*.5:0,B=w*12;document.getElementById("val-recomendacao-reserva").textContent=i(B);const y=document.getElementById("subtext-recomendacao");y&&(y.textContent=`Sugerido poupar ${i(w)}/mês (${i(B)} no ano)`);const x=document.getElementById("box-analise-reserva-detalhes");if(x)if(c===0)x.innerHTML='<p class="empty-state">Cadastre seus salários e entradas na aba "Salários & Entradas" para gerar o diagnóstico inteligente de economias.</p>';else{const C=t>0?Math.min(100,e/t*100).toFixed(1):0;x.innerHTML=`
        <p style="margin-bottom:.5rem;font-weight:600">
          Com base na soma acumulada de todos os meses (<strong>${i(c)}</strong> Entradas vs <strong>${i(f)}</strong> Saídas Totais):
        </p>
        <div style="background:rgba(15,23,42,0.6);padding:1.1rem;border-radius:10px;margin:.75rem 0;border:1px solid var(--border-color)">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem;flex-wrap:wrap;gap:.75rem">
            <div>
              <span style="font-size:.82rem;color:var(--text-muted);display:block">💰 Saldo Líquido em Conta</span>
              <strong style="font-size:1.15rem;color:#60a5fa">${i(L)}</strong>
            </div>
            <div>
              <span style="font-size:.82rem;color:var(--text-muted);display:block">🏦 Total Guardado na Reserva</span>
              <strong style="font-size:1.15rem;color:#34d399">${i(e)}</strong>
            </div>
            <div>
              <span style="font-size:.82rem;color:var(--text-muted);display:block">🎯 Meta Anual Desejada</span>
              <strong style="font-size:1.15rem;color:#a5b4fc">${i(t)}</strong>
            </div>
          </div>

          <div class="progress-bar-bg" style="height:12px;border-radius:6px;background:rgba(255,255,255,0.08);overflow:hidden;margin:.75rem 0 .4rem 0">
            <div class="progress-bar-fill" style="width:${C}%;height:100%;background:linear-gradient(90deg,#10b981,#34d399);border-radius:6px"></div>
          </div>

          <div style="display:flex;justify-content:space-between;font-size:.82rem;color:var(--text-muted);margin-top:.4rem;flex-wrap:wrap;gap:.5rem">
            <span>Progresso da Meta: <strong style="color:#34d399">${i(e)}</strong> de ${i(t)} (<strong>${C}%</strong> concluído)</span>
            <span>Faltam guardar: <strong style="color:#fb7185">${i(l)}</strong> nos próximos ${r} mês(es)</span>
          </div>
        </div>

        <p style="font-size:.85rem;color:var(--text-muted);line-height:1.45">
          💡 <strong>Planejamento do Sistema:</strong> Guardando <strong style="color:#34d399">${i(m)}/mês</strong> durante os próximos <strong>${r} mês(es)</strong>, você atingirá com 100% de precisão sua Meta Anual de <strong>${i(t)}</strong> (considerando seu saldo atual guardado de <strong>${i(e)}</strong>)!
        </p>
      `}xe()}function xe(){const t=document.getElementById("container-analise-mensal-lista");if(!t)return;const e=rt();if(!e.length){t.innerHTML='<div class="empty-state">Nenhum mês registrado para gerar a análise mensal.</div>';return}const o=e.map(a=>{const s=j.filter(y=>y.mesAno===a).reduce((y,x)=>y+(x.valor||0),0),r=k.filter(y=>y.mesAno===a),l=r.reduce((y,x)=>y+(x.valorTotal!==void 0?x.valorTotal:x.valor||0),0),m=P.filter(y=>y.mesAno===a),d=m.reduce((y,x)=>y+(x.valorTotal!==void 0?x.valorTotal:x.valor||0),0),p=O.filter(y=>y.mesAno===a);let c=0;p.forEach(y=>{y.formasPagamento&&(c+=y.formasPagamento.cartaoDebito||0)});const b=l+d+c,u=s-b,v=u>=0,[f,L]=a.split("-"),q=new Date(parseInt(f),parseInt(L)-1,1).toLocaleString("pt-BR",{month:"long"}),w=q.charAt(0).toUpperCase()+q.slice(1);let B="";if(v){const y=u*.5;B=`
        <div style="background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.25); border-radius:10px; padding:.85rem 1rem; margin-top:1rem">
          <div style="font-weight:700; font-size:.88rem; color:#34d399; margin-bottom:.2rem">
            🎉 Mês Positivo! Capacidade de Poupança Excelente
          </div>
          <p style="font-size:.8rem; color:var(--text-muted); margin:0">
            Neste mês sobraram <strong>${i(u)}</strong> em conta. O sistema sugere destinar pelo menos <strong style="color:#34d399">${i(y)}</strong> para sua reserva!
          </p>
        </div>
      `}else{const y=Math.abs(u);let x="Cartão de Crédito",C=l;d>C&&(x="Boletos & Contas",C=d),c>C&&(x="Mercado no Débito",C=c);const G=b>0?(C/b*100).toFixed(1):0;let z="",R=0;r.forEach(g=>{const E=g.valorTotal!==void 0?g.valorTotal:g.valor||0;E>R&&(R=E,z=`Fatura do ${g.cartao||"Cartão"}`)}),m.forEach(g=>{const E=g.valorTotal!==void 0?g.valorTotal:g.valor||0;E>R&&(R=E,z=`Boleto ${g.descricao||"de Conta"}`)}),B=`
        <div style="background:rgba(244,63,94,0.1); border:1px solid rgba(244,63,94,0.3); border-radius:10px; padding:.85rem 1rem; margin-top:1rem">
          <div style="font-weight:700; font-size:.88rem; color:#fb7185; margin-bottom:.4rem; display:flex; align-items:center; gap:.4rem">
            ⚠️ O que causou o déficit em ${w}/${f}?
          </div>
          <p style="font-size:.82rem; color:var(--text-main); margin-bottom:.5rem; line-height:1.5">
            As saídas (<strong>${i(b)}</strong>) superaram as entradas (<strong>${i(s)}</strong>) em <strong style="color:#fb7185">${i(y)}</strong>.
          </p>
          <div style="font-size:.78rem; color:var(--text-muted); line-height:1.5">
            • <strong>Vilão Principal:</strong> A categoria <strong style="color:#f8fafc">${x}</strong> representou <strong>${G}%</strong> de todas as saídas do mês (${i(C)}).
            ${z?`<br>• <strong>Maior Despesa Registrada:</strong> ${z} no valor de <strong style="color:#fb7185">${i(R)}</strong>.`:""}
          </div>
        </div>
      `}return`
      <div class="card" style="margin-bottom:1.25rem; border-color:${v?"rgba(52,211,153,0.3)":"rgba(251,113,133,0.4)"}">
        <div class="card-header" style="flex-wrap:wrap; gap:.5rem">
          <div style="display:flex; align-items:center; gap:.5rem">
            <span class="card-title" style="font-size:1rem; color:#f8fafc">📅 ${w} de ${f}</span>
            <span class="badge ${v?"green":"red"}">${v?"🟢 Superávit":"🔴 Déficit"}</span>
          </div>
          <button type="button" class="btn-secondary" style="padding:.25rem .6rem; font-size:.78rem" onclick="verMesEIrParaControle('${a}')">
            🔍 Detalhar Mês
          </button>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:.75rem; margin-top:.5rem">
          <div style="background:rgba(15,23,42,0.6); padding:.6rem .8rem; border-radius:8px; border:1px solid var(--border-color)">
            <div style="font-size:.75rem; color:var(--text-muted)">Entradas do Mês</div>
            <div style="font-weight:700; font-size:1rem; color:#34d399">${i(s)}</div>
          </div>

          <div style="background:rgba(15,23,42,0.6); padding:.6rem .8rem; border-radius:8px; border:1px solid var(--border-color)">
            <div style="font-size:.75rem; color:var(--text-muted)">Cartão de Crédito</div>
            <div style="font-weight:700; font-size:1rem; color:#fb7185">${i(l)}</div>
          </div>

          <div style="background:rgba(15,23,42,0.6); padding:.6rem .8rem; border-radius:8px; border:1px solid var(--border-color)">
            <div style="font-size:.75rem; color:var(--text-muted)">Boletos & Contas</div>
            <div style="font-weight:700; font-size:1rem; color:#c084fc">${i(d)}</div>
          </div>

          <div style="background:rgba(15,23,42,0.6); padding:.6rem .8rem; border-radius:8px; border:1px solid var(--border-color)">
            <div style="font-size:.75rem; color:var(--text-muted)">Mercado (Débito)</div>
            <div style="font-weight:700; font-size:1rem; color:#fbbf24">${i(c)}</div>
          </div>

          <div style="background:rgba(15,23,42,0.8); padding:.6rem .8rem; border-radius:8px; border:1px solid ${v?"#34d399":"#fb7185"}">
            <div style="font-size:.75rem; color:var(--text-muted)">Saldo Líquido no Mês</div>
            <div style="font-weight:800; font-size:1.05rem; color:${v?"#60a5fa":"#fb7185"}">${i(u)}</div>
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
      ${o}
    </div>
  `}const vt=[{id:"est_1",nome:"Corte de Cabelo Victor",quantidade:2,valorUnitario:70},{id:"est_2",nome:"Compra Programada Tunico",quantidade:1,valorUnitario:150},{id:"est_3",nome:"Sobrancelha Maria",quantidade:1,valorUnitario:50},{id:"est_4",nome:"Unha Maria",quantidade:1,valorUnitario:90},{id:"est_5",nome:"Banho Tunico",quantidade:1,valorUnitario:65},{id:"est_6",nome:"Saída Simples",quantidade:2,valorUnitario:100},{id:"est_7",nome:"Saída Premiun",quantidade:1,valorUnitario:150},{id:"est_8",nome:"Saída Premiun Plus",quantidade:1,valorUnitario:200},{id:"est_9",nome:"Mercado Pontual",quantidade:4,valorUnitario:70},{id:"est_10",nome:"Farmacia",quantidade:2,valorUnitario:35},{id:"est_11",nome:"Padaria 3D",quantidade:10,valorUnitario:10}];window.abrirModalAddEstimativa=function(t=null){const e=document.getElementById("modal-add-estimativa");if(e){if(document.getElementById("inp-est-id").value=t||"",t){document.getElementById("titulo-modal-estimativa").textContent="✏️ Editar Gastos Previsto";const o=Z.find(n=>n.id===h),a=((o==null?void 0:o.itens)||[]).find(n=>n.id===t);a&&(document.getElementById("inp-est-nome").value=a.nome||"",document.getElementById("inp-est-qtd").value=a.quantidade||1,document.getElementById("inp-est-val").value=a.valorUnitario||0)}else document.getElementById("titulo-modal-estimativa").textContent="➕ Adicionar Gastos Previsto",document.getElementById("inp-est-nome").value="",document.getElementById("inp-est-qtd").value=1,document.getElementById("inp-est-val").value="";e.classList.add("active")}};window.fecharModalAddEstimativa=function(){var t;(t=document.getElementById("modal-add-estimativa"))==null||t.classList.remove("active")};var Bt;(Bt=document.getElementById("form-item-estimativa"))==null||Bt.addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-est-id").value,o=document.getElementById("inp-est-nome").value.trim(),a=parseFloat(document.getElementById("inp-est-qtd").value)||1,n=parseFloat(document.getElementById("inp-est-val").value)||0;if(!o){alert("Preencha a descrição do gasto.");return}const s=Z.find(l=>l.id===h);let r=s?[...s.itens||[]]:[...vt];e?r=r.map(l=>l.id===e?{...l,nome:o,quantidade:a,valorUnitario:n}:l):r.push({id:"est_"+Date.now(),nome:o,quantidade:a,valorUnitario:n}),await V(T(I,X,h),{mesAno:h,itens:r,ultimaAtualizacao:new Date().toISOString()}),fecharModalAddEstimativa(),$("✅ Estimativa atualizada!")});window.atualizarQtdItemEstimativa=async function(t,e){const o=Z.find(s=>s.id===h);if(!o)return;const a=Math.max(1,parseInt(e)||1),n=(o.itens||[]).map(s=>s.id===t?{...s,quantidade:a}:s);await V(T(I,X,h),{mesAno:h,itens:n,ultimaAtualizacao:new Date().toISOString()})};window.atualizarValorItemEstimativa=async function(t,e){const o=Z.find(s=>s.id===h);if(!o)return;const a=Math.max(0,parseFloat(e)||0),n=(o.itens||[]).map(s=>s.id===t?{...s,valorUnitario:a}:s);await V(T(I,X,h),{mesAno:h,itens:n,ultimaAtualizacao:new Date().toISOString()})};window.excluirItemEstimativa=async function(t){if(!confirm("Remover este item da estimativa do mês?"))return;const e=Z.find(a=>a.id===h);if(!e)return;const o=(e.itens||[]).filter(a=>a.id!==t);await V(T(I,X,h),{mesAno:h,itens:o,ultimaAtualizacao:new Date().toISOString()}),$("🗑️ Item removido da estimativa.")};window.resetarItensEstimativaPadrao=async function(){confirm(`Deseja carregar/resetar os 11 itens padrão de previsão para ${h}?`)&&(await V(T(I,X,h),{mesAno:h,itens:vt,ultimaAtualizacao:new Date().toISOString()}),$("🔄 Itens padrão de estimativa carregados!"))};function Ie(){const t=document.getElementById("container-lista-estimativa");if(!t)return;const e=Z.find(u=>u.id===h);let o=[];e&&Array.isArray(e.itens)?o=e.itens:(o=vt,V(T(I,X,h),{mesAno:h,itens:vt,ultimaAtualizacao:new Date().toISOString()}).catch(u=>console.error("Auto init estimativa error:",u)));let a=0;o.forEach(u=>{a+=(u.quantidade||0)*(u.valorUnitario||0)});const n=document.getElementById("val-total-estimativa-mes");n&&(n.textContent=i(a));const[s,r]=h.split("-"),m=new Date(parseInt(s),parseInt(r)-1,1).toLocaleString("pt-BR",{month:"long"}),d=m.charAt(0).toUpperCase()+m.slice(1),p=document.getElementById("subtext-estimativa-mes");p&&(p.textContent=`Total previsto para ${d} de ${s} (${o.length} itens cadastrados)`);const c=document.getElementById("badge-count-estimativa");if(c&&(c.textContent=`${o.length} itens previstos`),!o.length){t.innerHTML=`
      <div class="empty-state">
        <p>Nenhum gasto estimado para ${h}.</p>
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
          ${o.map(u=>{const v=(u.quantidade||0)*(u.valorUnitario||0);return`
              <tr>
                <td>
                  <strong style="color:#f8fafc">${u.nome}</strong>
                </td>
                <td class="num">
                  <input type="number" min="1" step="1" class="form-control" style="width:70px;padding:.2rem .4rem;font-size:.82rem;text-align:center" value="${u.quantidade}" onchange="atualizarQtdItemEstimativa('${u.id}', this.value)">
                </td>
                <td class="num">
                  <input type="number" min="0" step="0.01" class="form-control" style="width:95px;padding:.2rem .4rem;font-size:.82rem;text-align:right" value="${u.valorUnitario}" onchange="atualizarValorItemEstimativa('${u.id}', this.value)">
                </td>
                <td class="num">
                  <strong style="color:#a5b4fc">${i(v)}</strong>
                </td>
                <td style="text-align:right">
                  <div style="display:flex;gap:.35rem;justify-content:flex-end">
                    <button type="button" class="btn-secondary" style="padding:.2rem .4rem;font-size:.75rem" onclick="abrirModalAddEstimativa('${u.id}')" title="Editar">✏️</button>
                    <button type="button" class="btn-danger" style="padding:.2rem .4rem;font-size:.75rem" onclick="excluirItemEstimativa('${u.id}')" title="Excluir">🗑️</button>
                  </div>
                </td>
              </tr>
            `}).join("")}
        </tbody>
      </table>
    </div>
  `;t.innerHTML=b}function we(){const t=document.getElementById("lista-mensal-container");if(!t)return;const e=new Date,o=new Date(e.getFullYear(),e.getMonth()+1,1),a=o.toLocaleString("pt-BR",{month:"long"}),n=o.getFullYear(),s=`${a.charAt(0).toUpperCase()+a.slice(1)} de ${n}`,r=se(o.getFullYear(),o.getMonth()),l=31.8,m=20,d=r*l,p=r*m,c={};let b=0;O.forEach(g=>{const E=g.valorAPagar||0;b+=E;const A=g.mesAno||"Outros";c[A]=(c[A]||0)+E});const u=Math.max(1,Object.keys(c).length),v=b/u,f={};O.forEach(g=>{(g.itens||[]).forEach(E=>{const A=(E.nome||"").toLowerCase().trim();A&&(f[A]||(f[A]={nome:E.nome,marca:E.marca||"Geral",qtdTotal:0,frequenciaNotas:0,valoresUnitarios:[]}),f[A].qtdTotal+=E.quantidade||1,f[A].frequenciaNotas+=1,E.valorUnitario&&f[A].valoresUnitarios.push(E.valorUnitario))})});const L=Object.values(f).map(g=>{const E=g.valoresUnitarios.length>0?g.valoresUnitarios.reduce((lt,pt)=>lt+pt,0)/g.valoresUnitarios.length:0,A=g.qtdTotal/u,at=u/Math.max(1,g.frequenciaNotas),ut=g.frequenciaNotas/u;let _=0;ut>=.35||A>=.7?_=Math.ceil(A):_=Math.round(A),_<1&&g.frequenciaNotas>=u&&(_=1);const it=_*E;return{nome:g.nome,marca:g.marca,frequenciaNotas:g.frequenciaNotas,intervaloMeses:at,qtdMensalTaxa:A,totalEstimadoUnidades:_,valorUnitario:E,subtotalCalculado:it}}).filter(g=>g.totalEstimadoUnidades>0);L.sort((g,E)=>E.frequenciaNotas-g.frequenciaNotas);const F=L.reduce((g,E)=>g+E.subtotalCalculado,0),q=v>0?v*1.05:F;let w=1;F>q&&v>0&&(w=q/F);const B=L.map(g=>({...g,subtotalFinal:g.subtotalCalculado*w})),y=v>0?Math.min(F,q):F;let x=y;const C=Math.min(x,d);x-=C;const G=Math.min(x,p);x-=G;const z=x>0?x:0;let R=`
    <div class="card" style="margin-bottom:1.5rem; background: linear-gradient(135deg, rgba(30,41,59,0.9), rgba(15,23,42,0.95)); border: 1px solid #3b82f6;">
      <div class="card-header">
        <div>
          <span class="card-title" style="color:#60a5fa;">📅 Previsão de Compras — ${s}</span>
          <p class="card-subtext" style="color:#cbd5e1; margin-top:0.25rem;">
            Calculado com unidades inteiras exatas (${r} dias úteis em ${a}).
          </p>
        </div>
        <span class="badge green" style="font-size:0.8rem; padding:0.4rem 0.75rem;">${r} Dias Úteis</span>
      </div>

      <div class="payment-grid" style="margin-top:1rem;">
        <div class="payment-item" style="border-color: rgba(16,185,129,0.4);">
          <div class="p-label">🍽️ Vale Alimentação (${r}d × R$ 31,80)</div>
          <div class="p-val" style="color:#34d399;">${i(C)} <span style="font-size:0.75rem;font-weight:normal;color:var(--text-muted)">/ ${i(d)}</span></div>
        </div>
        <div class="payment-item" style="border-color: rgba(99,102,241,0.4);">
          <div class="p-label">💳 Cartão Crédito (${r}d × R$ 20,00)</div>
          <div class="p-val" style="color:#818cf8;">${i(G)} <span style="font-size:0.75rem;font-weight:normal;color:var(--text-muted)">/ ${i(p)}</span></div>
        </div>
        <div class="payment-item" style="border-color: ${z>0?"rgba(244,63,94,0.5)":"var(--border-color)"};">
          <div class="p-label">💳 Débito Necessário (Excedente)</div>
          <div class="p-val" style="color: ${z>0?"#fb7185":"var(--text-muted)"};">${i(z)}</div>
        </div>
      </div>

      <div style="margin-top:1.25rem; padding-top:1rem; border-top:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
        <div>
          <span style="font-size:0.85rem; color:var(--text-muted);">Total Estimado da Lista de Compras:</span>
          <p style="font-size:0.75rem; color:#60a5fa;">Média Histórica de Gastos: ${i(v)}</p>
        </div>
        <span style="font-size:1.6rem; font-weight:800; color:var(--primary);">${i(y)}</span>
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
  `;window.dadosListaMensalCache={mesAnoStr:s,diasUteis:r,totalGeralEstimado:y,cobertoAlim:C,cobertoCred:G,cobertoDeb:z,alimDisponivel:d,credDisponivel:p,lista:B},B.length===0?R+='<div class="empty-state">Adicione notas fiscais para que o sistema gere automaticamente sua lista mensal de compras.</div></div>':R+=`
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
            ${B.map(g=>{const E=g.intervaloMeses>1.2?`A cada ${g.intervaloMeses.toFixed(1)} meses`:`Todo mês (${g.frequenciaNotas}x)`,A=g.qtdMensalTaxa<1?g.qtdMensalTaxa.toFixed(2):g.qtdMensalTaxa.toFixed(1),at=g.totalEstimadoUnidades.toFixed(1);return`
                <tr>
                  <td><strong>${g.nome}</strong></td>
                  <td><span class="badge amber">${g.marca}</span></td>
                  <td><span class="badge cyan">${E}</span></td>
                  <td class="num">${A} un/mês</td>
                  <td class="num"><span class="badge green" style="font-size:0.82rem;">${at}</span></td>
                  <td class="num">${i(g.valorUnitario)}</td>
                  <td class="num"><strong>${i(g.subtotalFinal)}</strong></td>
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
    </div>`,t.innerHTML=R}window.exportarPDFListaMensal=function(){if(!window.dadosListaMensalCache||!window.dadosListaMensalCache.lista.length){$("⚠️ Nenhuma lista mensal disponível para exportar.");return}const{mesAnoStr:t,diasUteis:e,totalGeralEstimado:o,cobertoAlim:a,cobertoCred:n,cobertoDeb:s,lista:r}=window.dadosListaMensalCache,l=window.open("","_blank","width=900,height=750");if(!l){alert("Permita pop-ups no navegador para gerar o PDF da lista.");return}const m=`
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
          <div class="val">${i(a)}</div>
        </div>
        <div class="res-item">
          <div class="label">💳 Cartão Crédito</div>
          <div class="val">${i(n)}</div>
        </div>
        <div class="res-item">
          <div class="label">💳 Débito (Excedente)</div>
          <div class="val">${i(s)}</div>
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
          ${r.map(d=>`
            <tr>
              <td class="check-col"><div class="chk-box"></div></td>
              <td><strong>${d.nome}</strong></td>
              <td>${d.marca}</td>
              <td class="num"><strong>${d.totalEstimadoUnidades.toFixed(1)} un</strong></td>
              <td class="num">${i(d.valorUnitario)}</td>
              <td class="num"><strong>${i(d.subtotalFinal)}</strong></td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <div class="total-footer">
        <span>Total Estimado da Compra:</span>
        <span style="font-size:18px; color:#059669;">${i(o)}</span>
      </div>

      <script>
        window.onload = function() {
          setTimeout(function() { window.print(); }, 350);
        };
      <\/script>
    </body>
    </html>
  `;l.document.open(),l.document.write(m),l.document.close()};document.getElementById("btn-start-cam").addEventListener("click",Gt);document.getElementById("btn-switch-cam").addEventListener("click",Ae);document.getElementById("btn-stop-cam").addEventListener("click",$t);async function Gt(){if(typeof Html5Qrcode>"u")return U("Carregando biblioteca de câmera, aguarde..."),setTimeout(Gt,600);try{J||(J=new Html5Qrcode("qr-reader")),Q=await Html5Qrcode.getCameras();let t;if(Q&&Q.length>0){const e=Q.findIndex(o=>/back|traseira|rear|environment/i.test(o.label));dt=e>=0?e:0,t=Q[dt].id}else t={facingMode:"environment"};await J.start(t,{fps:10,qrbox:{width:240,height:240}},_t,()=>{}),ct=!0,document.getElementById("btn-start-cam").style.display="none",document.getElementById("btn-switch-cam").style.display=Q.length>1?"inline-flex":"none",document.getElementById("btn-stop-cam").style.display="inline-flex"}catch(t){U("❌ Não foi possível acessar a câmera. Verifique as permissões do navegador."),console.error(t)}}async function Ae(){if(!(!J||!ct))try{await J.stop(),Q.length>1&&(dt=(dt+1)%Q.length,await J.start(Q[dt].id,{fps:10,qrbox:{width:240,height:240}},_t,()=>{}))}catch(t){console.error("switchCam:",t)}}async function $t(){if(J&&ct)try{await J.stop()}catch{}ct=!1,document.getElementById("btn-start-cam").style.display="inline-flex",document.getElementById("btn-switch-cam").style.display="none",document.getElementById("btn-stop-cam").style.display="none"}async function _t(t){$t(),document.getElementById("inp-url").value=t,U("✅ QR Code lido! Processando..."),await Yt(t)}document.getElementById("btn-carregar-dados").addEventListener("click",async()=>{const t=document.getElementById("inp-url").value.trim(),e=document.getElementById("inp-html").value.trim();if(!t&&!e){U("⚠️ Cole a URL do QR Code ou o conteúdo da página para ler a nota fiscal.");return}if(t&&!e){U("⏳ Consultando nota fiscal..."),await Yt(t);return}if(e){U("⏳ Processando conteúdo..."),await Zt(e);return}});document.getElementById("btn-preencher-manual").addEventListener("click",()=>{Qt({nomeMercado:"",dataEmissao:new Date().toISOString(),valorTotal:0,descontoTotal:0,valorAPagar:0,qtdTotalItens:0,formasPagamento:{valeAlimentacao:0,cartaoCredito:0,cartaoDebito:0},itens:[]}),U("✍️ Preencha os dados da compra abaixo e clique em Salvar Nota Fiscal.","var(--accent-cyan)")});function Qt(t){var s,r,l;document.getElementById("inp-mercado").value=t.nomeMercado||"",document.getElementById("inp-data").value=ne(t.dataEmissao),document.getElementById("inp-vtotal").value=t.valorTotal!==void 0?t.valorTotal:0,document.getElementById("inp-desconto").value=t.descontoTotal!==void 0?t.descontoTotal:0,document.getElementById("inp-pagar").value=t.valorAPagar!==void 0?t.valorAPagar:0,document.getElementById("inp-qtd").value=t.qtdTotalItens!==void 0?t.qtdTotalItens:0,document.getElementById("inp-alim").value=((s=t.formasPagamento)==null?void 0:s.valeAlimentacao)||0,document.getElementById("inp-cred").value=((r=t.formasPagamento)==null?void 0:r.cartaoCredito)||0,document.getElementById("inp-deb").value=((l=t.formasPagamento)==null?void 0:l.cartaoDebito)||0,et=t.itens||[];const e=document.getElementById("form-nfce");e.style.display="block";const o=document.getElementById("preview-itens-box"),a=document.getElementById("count-preview-itens"),n=document.getElementById("lista-preview-itens");et.length>0?(o.style.display="block",a.textContent=et.length,n.innerHTML=et.map(m=>`
      <div style="display:flex; justify-content:space-between; padding: 0.35rem 0; border-bottom: 1px dashed var(--border-color);">
        <span><strong>${m.nome}</strong> (${m.quantidade} ${m.unidade||"Un"})</span>
        <span>${i(m.valorUnitario)}/un = <strong>${i(m.valorTotal)}</strong></span>
      </div>
    `).join("")):o.style.display="none",e.scrollIntoView({behavior:"smooth"})}document.getElementById("form-nfce").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-mercado").value.trim()||"Mercado",o=document.getElementById("inp-data").value||new Date().toISOString(),a=parseFloat(document.getElementById("inp-vtotal").value)||0,n=parseFloat(document.getElementById("inp-desconto").value)||0,s=parseFloat(document.getElementById("inp-pagar").value)||0,r=parseInt(document.getElementById("inp-qtd").value)||0,l=parseFloat(document.getElementById("inp-alim").value)||0,m=parseFloat(document.getElementById("inp-cred").value)||0,d=parseFloat(document.getElementById("inp-deb").value)||0,p=new Date(o).toISOString().slice(0,16),c=O.find(v=>{const f=new Date(v.dataEmissao).toISOString().slice(0,16),L=Math.abs((v.valorAPagar||0)-s)<.05,F=(v.nomeMercado||"").toLowerCase().trim()===e.toLowerCase().trim();return f===p&&L&&F});if(c){U(`⚠️ Esta nota fiscal já existe no sistema (Cadastrada em ${mt(c.dataEmissao)} no valor de ${i(c.valorAPagar)}). Nota não adicionada!`,"#fb7185"),$("⚠️ Nota fiscal já cadastrada! Operação cancelada.");return}const b=new Date(o),u=`${b.getFullYear()}-${String(b.getMonth()+1).padStart(2,"0")}`;U("⏳ Salvando nota fiscal no banco...");try{await gt(Y(I,ft),{nomeMercado:e,dataEmissao:o,mesAno:u,qtdTotalItens:r||et.length,valorTotal:a,descontoTotal:n,valorAPagar:s,formasPagamento:{valeAlimentacao:l,cartaoCredito:m,cartaoDebito:d},itens:et,createdAt:yt()}),U("✅ Nota salva com sucesso!","#34d399"),document.getElementById("form-nfce").style.display="none",document.getElementById("form-nfce").reset(),document.getElementById("inp-url").value="",document.getElementById("inp-html").value="",et=[],Dt(),goTab("dashboard"),$("🎉 Nota fiscal registrada no Firebase!")}catch(v){U("❌ Erro ao salvar: "+v.message,"#fb7185")}});async function Yt(t){const e=[o=>`https://api.allorigins.win/raw?url=${encodeURIComponent(o)}`,o=>`https://corsproxy.io/?${encodeURIComponent(o)}`];for(const o of e)try{const a=await fetch(o(t),{signal:AbortSignal.timeout(8e3)});if(a.ok){const n=await a.text();if(n&&n.length>200){await Zt(n);return}}}catch{}Be(t)}function Be(t){document.getElementById("modal-link").href=t,document.getElementById("modal-cors").classList.add("active"),U("⚠️ Abra o link, copie o conteúdo da página e cole no campo de texto abaixo.")}async function Zt(t){const e=Te(t);Qt(e),U("✅ Nota lida com sucesso! Confira os valores abaixo e altere se necessário antes de Salvar.","#34d399")}function Te(t){var C,G,z;const o=new DOMParser().parseFromString(t,"text/html"),a=((C=o.body)==null?void 0:C.textContent)||t;let n=((z=(G=o.querySelector(".txtTopo, .nomeEmit, h1"))==null?void 0:G.textContent)==null?void 0:z.trim())||"Mercado",s=new Date().toISOString();const r=a.match(/Emiss[ãa]o\s*[:\-]?\s*(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})?/i)||a.match(/(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})/);if(r){const[R,g,E]=r[1].split("/");s=`${E}-${g}-${R}T${r[2]||"12:00:00"}`}const l=a.match(/Qtd\.?\s*total\s*de\s*itens\s*[:\s]*([\d,\.]+)/i),m=a.match(/Valor\s*total\s*R\$\s*[:\s]*([\d\.,]+)/i),d=a.match(/Descontos?\s*R\$\s*[:\s]*([\d\.,]+)/i),p=a.match(/Valor\s*a\s*pagar\s*R\$\s*[:\s]*([\d\.,]+)/i)||a.match(/VALOR\s*PAGO\s*R\$\s*[:\s]*([\d\.,]+)/i),c=a.match(/(?:Vale\s*)?Alimenta[çc][ãa]o\s*[:\s]*([\d\.,]+)/i),b=a.match(/(?:Cart[ãa]o\s*de\s*)?Cr[eé]dito\s*[:\s]*([\d\.,]+)/i),u=a.match(/(?:Cart[ãa]o\s*de\s*)?D[eé]bito\s*[:\s]*([\d\.,]+)/i),v=l?S(l[1]):0,f=m?S(m[1]):0,L=d?S(d[1]):0;let F=p?S(p[1]):f-L;const q={valeAlimentacao:c?S(c[1]):0,cartaoCredito:b?S(b[1]):0,cartaoDebito:u?S(u[1]):0},w=[];o.querySelectorAll("tr, .item, .itemNota").forEach(R=>{var xt;const g=R.textContent;if(!/Vl\.\s*Unit|valorUnitario|Qtde?\./i.test(g))return;const E=R.querySelector(".txtTit, .txtTit2, .nomeProd"),A=((xt=E==null?void 0:E.textContent)==null?void 0:xt.trim())||"",at=g.match(/Qtde?\.\s*[:\s]*([\d,\.]+)/i),ut=g.match(/Vl\.\s*Unit\.\s*[:\s]*([\d,\.]+)/i),_=g.match(/Vl\.\s*Total\s*([\d,\.]+)/i),it=g.match(/C[oó]digo\s*[:\s]*(\d+)/i),lt=g.match(/UN\s*[:\s]*([A-Za-z]+)/i),pt=at?S(at[1]):1,bt=ut?S(ut[1]):0,Jt=_?S(_[1]):bt*pt;A&&bt>0&&w.push({codigo:(it==null?void 0:it[1])||"",nome:A,marca:Ce(A),quantidade:pt,unidade:(lt==null?void 0:lt[1])||"Un",valorUnitario:bt,valorTotal:Jt})});const y=new Date(s),x=`${y.getFullYear()}-${String(y.getMonth()+1).padStart(2,"0")}`;return{nomeMercado:n,dataEmissao:s,mesAno:x,qtdTotalItens:v,valorTotal:f,descontoTotal:L,valorAPagar:F,formasPagamento:q,itens:w}}function Ce(t){const e=["BAUDUCCO","BAUD","PANCO","DANONE","NESTLE","QUALITA","SADIA","PERDIGAO","SEARA","CAMIL","TIO JOAO","URBANO","LIZA","SOYA","YPE","PILAO","MELITTA","3 CORACOES","VIGOR","PARMALAT","ITALAC","HEINZ","KRAFT"],o=t.toUpperCase();for(const a of e)if(o.includes(a))return a;return o.split(" ")[0]||"Genérica"}function Me(){const t=document.getElementById("lista-historico");if(!O.length){t.innerHTML='<div class="empty-state">📭 Nenhuma compra cadastrada ainda.</div>';return}t.innerHTML=O.map(e=>{var o,a,n;return`
    <div class="purchase-card">
      <div class="purchase-header" onclick="toggleDetail('${e.id}')">
        <div class="purchase-info">
          <h3>${e.nomeMercado||"Mercado"}</h3>
          <p>📅 ${mt(e.dataEmissao)} &nbsp;•&nbsp; 🛒 ${e.qtdTotalItens||0} itens</p>
        </div>
        <div class="purchase-values">
          <div class="pv-total">${i(e.valorAPagar)}</div>
          <div class="pv-sub">Desc: ${i(e.descontoTotal)}</div>
        </div>
        <svg class="chevron" id="chev-${e.id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      <div class="purchase-details" id="detail-${e.id}">
        <div class="details-toolbar">
          <span class="card-subtext">Pagamentos: Alimentação ${i((o=e.formasPagamento)==null?void 0:o.valeAlimentacao)} · Crédito ${i((a=e.formasPagamento)==null?void 0:a.cartaoCredito)} · Débito ${i((n=e.formasPagamento)==null?void 0:n.cartaoDebito)}</span>
          <button class="btn-danger" onclick="confirmarExcluirMercado('${e.id}')">🗑️ Excluir</button>
        </div>
        ${Wt(e)}
      </div>
    </div>`}).join("")}function Wt(t){return!t.itens||!t.itens.length?'<p class="card-subtext">Nenhum item detalhado registrado.</p>':`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Item</th><th>Marca</th><th class="num">Qtd</th><th class="num">Vl. Unit.</th><th class="num">Vl. Total</th></tr></thead>
    <tbody>${t.itens.map(e=>`<tr>
      <td>${e.nome}</td>
      <td><span class="badge amber">${e.marca||"—"}</span></td>
      <td class="num">${e.quantidade} ${e.unidade||"Un"}</td>
      <td class="num">${i(e.valorUnitario)}</td>
      <td class="num"><strong>${i(e.valorTotal)}</strong></td>
    </tr>`).join("")}</tbody>
  </table></div>`}window.toggleDetail=function(t){let e=document.getElementById("detail-"+t)||document.getElementById(t);!e&&t.startsWith("detail-")&&(e=document.getElementById(t.replace("detail-","")));let o=document.getElementById("chev-"+t)||document.getElementById("chev-"+t.replace("detail-",""));e&&e.classList.toggle("open"),o&&o.classList.toggle("open")};window.confirmarExcluirMercado=async function(t){if(confirm("Excluir esta compra de mercado?"))try{await H(T(I,ft,t)),$("🗑️ Compra excluída.")}catch(e){alert("Erro: "+e.message)}};function Se(){const t=document.getElementById("lista-comparacao"),e={};O.forEach(a=>{(a.itens||[]).forEach(n=>{var r;const s=((r=n.nome)==null?void 0:r.toLowerCase().trim())||"produto";e[s]||(e[s]={nome:n.nome,marca:n.marca,hist:{}}),e[s].hist[a.mesAno]=n.valorUnitario})});const o=Object.values(e);if(!o.length){t.innerHTML='<div class="empty-state">Adicione notas para ver a comparação de preços unitários.</div>';return}t.innerHTML=`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Produto</th><th>Marca</th><th>Histórico (Unitário)</th><th>Variação</th></tr></thead>
    <tbody>${o.map(a=>{const n=Object.keys(a.hist).sort();let s=n.map(l=>`${l}: <strong>${i(a.hist[l])}</strong>`).join(" → "),r='<span class="badge cyan">Estável</span>';if(n.length>=2){const l=a.hist[n[n.length-2]],d=a.hist[n[n.length-1]]-l,p=(d/l*100).toFixed(1);d>.01?r=`<span class="badge red">+${p}% ↑</span>`:d<-.01&&(r=`<span class="badge green">${p}% ↓</span>`)}return`<tr><td><strong>${a.nome}</strong></td><td><span class="badge amber">${a.marca||"—"}</span></td><td>${s}</td><td>${r}</td></tr>`}).join("")}</tbody>
  </table></div>`}function De(){const t=document.getElementById("lista-recorrencia"),e=document.getElementById("lista-marcas"),o={},a={};O.forEach(r=>{(r.itens||[]).forEach(l=>{var c;const m=(c=l.nome)==null?void 0:c.toLowerCase().trim();if(!m)return;o[m]||(o[m]={nome:l.nome,marca:l.marca,qtd:0,notas:0,units:[]}),o[m].qtd+=l.quantidade||1,o[m].notas+=1,o[m].units.push(l.valorUnitario||0);const d=(l.nome||"").split(" ")[0].toUpperCase();a[d]||(a[d]={});const p=l.marca||"Genérica";a[d][p]||(a[d][p]=[]),a[d][p].push(l.valorUnitario||0)})});const n=Object.values(o).filter(r=>r.notas>1).sort((r,l)=>l.notas-r.notas);t.innerHTML=n.length?`<div class="table-responsive"><table class="custom-table">
        <thead><tr><th>Item</th><th>Marca</th><th>Compras</th><th class="num">Qtd Total</th><th class="num">Média Unitária</th></tr></thead>
        <tbody>${n.map(r=>{const l=r.units.reduce((m,d)=>m+d,0)/r.units.length;return`<tr>
            <td><strong>${r.nome}</strong></td>
            <td><span class="badge amber">${r.marca||"—"}</span></td>
            <td><span class="badge green">${r.notas}x</span></td>
            <td class="num">${r.qtd}</td>
            <td class="num">${i(l)}</td>
          </tr>`}).join("")}</tbody>
      </table></div>`:'<div class="empty-state">Adicione notas para ver a recorrência de itens.</div>';const s=Object.entries(a).filter(([,r])=>Object.keys(r).length>1).map(([r,l])=>{let m=1/0,d="";const p=Object.entries(l).map(([c,b])=>{const u=b.reduce((v,f)=>v+f,0)/b.length;return u<m&&(m=u,d=c),{marca:c,med:u}});return`<div class="brand-card">
      <div class="brand-card-header">
        <span class="card-title">${r}</span>
        <span class="badge green">🏆 Menor preço: ${d} (${i(m)}/un)</span>
      </div>
      <div class="brands-row">
        ${p.map(c=>`<div class="brand-chip${c.marca===d?" best":""}">
          <div class="bc-name">${c.marca} ${c.marca===d?"✅":""}</div>
          <div class="bc-val">${i(c.med)}<span style="font-size:.7rem;font-weight:400">/un</span></div>
        </div>`).join("")}
      </div>
    </div>`}).join("");e.innerHTML=s||'<div class="empty-state">Ao comprar o mesmo tipo de produto com marcas diferentes, o sistema mostrará qual teve menor preço.</div>'}document.getElementById("btn-modal-close").addEventListener("click",()=>{document.getElementById("modal-cors").classList.remove("active")});
