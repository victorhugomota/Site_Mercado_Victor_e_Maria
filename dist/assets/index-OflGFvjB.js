import{initializeApp as Xt}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";import{getFirestore as te,onSnapshot as st,query as ee,collection as Y,orderBy as ae,doc as T,deleteDoc as H,setDoc as V,addDoc as ft,serverTimestamp as Et}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function a(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(n){if(n.ep)return;n.ep=!0;const s=a(n);fetch(n.href,s)}})();const Mt=document.createElement("script");Mt.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js";document.head.appendChild(Mt);const Ct=document.createElement("script");Ct.src="https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js";document.head.appendChild(Ct);const oe={apiKey:"AIzaSyANpFnEIkyN1XCT6qbtmVR9wx7sQHEsyrE",authDomain:"comprasmercado-23913.firebaseapp.com",projectId:"comprasmercado-23913",storageBucket:"comprasmercado-23913.firebasestorage.app",messagingSenderId:"317518149234",appId:"1:317518149234:web:94f38624d68a2b9a6634eb",measurementId:"G-2XP88EK37S"},ne=Xt(oe),x=te(ne),bt="compras",rt="entradas",ot="faturas",et="boletos",St="reservas",K="estimativas";let k=[],j=[],P=[],q=[],Z=[],N={valorAtualGuardado:0},ht=null,J=null,Q=[],ct=0,mt=!1,tt=[];function l(t){return Number(t||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}function R(t){if(typeof t=="number")return t;if(!t)return 0;const e=parseFloat(String(t).replace(/R\$\s?/gi,"").replace(/\s/g,"").replace(/\./g,"").replace(",","."));return isNaN(e)?0:e}function ut(t){if(!t)return"—";try{return new Date(t).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}catch{return t}}function $(t,e=3500){const a=document.getElementById("toast");a.textContent=t,a.classList.add("show"),setTimeout(()=>a.classList.remove("show"),e)}function U(t,e="var(--accent-amber)"){const a=document.getElementById("status-msg");a&&(a.textContent=t,a.style.color=e)}function se(t){if(!t)return new Date().toISOString().slice(0,16);try{const e=new Date(t);if(isNaN(e.getTime()))return new Date().toISOString().slice(0,16);const a=o=>String(o).padStart(2,"0");return`${e.getFullYear()}-${a(e.getMonth()+1)}-${a(e.getDate())}T${a(e.getHours())}:${a(e.getMinutes())}`}catch{return new Date().toISOString().slice(0,16)}}function re(t,e){let a=0;const o=new Date(t,e+1,0).getDate();for(let n=1;n<=o;n++){const s=new Date(t,e,n).getDay();s!==0&&s!==6&&a++}return a}window.goTab=function(t){document.querySelectorAll(".tab-content").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".desktop-nav .nav-item").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".mobile-nav .mob-btn").forEach(a=>a.classList.remove("active"));const e=document.getElementById("tab-"+t);e&&e.classList.add("active"),document.querySelectorAll(`[data-tab="${t}"]`).forEach(a=>a.classList.add("active"))};document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>goTab(t.getAttribute("data-tab")))});document.querySelectorAll(".sub-item").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".sub-item").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".sub-tab-content").forEach(a=>a.style.display="none"),t.classList.add("active");const e=document.getElementById("sub-"+t.getAttribute("data-sub"));e&&(e.style.display="block")})});function Dt(){document.getElementById("modal-add-nota").classList.add("active")}function Lt(){mt&&It(),document.getElementById("modal-add-nota").classList.remove("active")}var wt;(wt=document.getElementById("btn-open-modal-home"))==null||wt.addEventListener("click",Dt);var Bt;(Bt=document.getElementById("btn-mercado-add-nota"))==null||Bt.addEventListener("click",Dt);var At;(At=document.getElementById("btn-close-modal-add"))==null||At.addEventListener("click",Lt);st(ee(Y(x,bt),ae("dataEmissao","desc")),t=>{k=t.docs.map(e=>({id:e.id,...e.data()})),W()},t=>console.error("Firestore Mercado:",t));st(Y(x,rt),t=>{j=t.docs.map(e=>({id:e.id,...e.data()})),W()},t=>console.error("Firestore Entradas:",t));st(Y(x,ot),t=>{P=t.docs.map(e=>({id:e.id,...e.data()})),W()},t=>console.error("Firestore Faturas:",t));st(Y(x,et),t=>{q=t.docs.map(e=>({id:e.id,...e.data()})),W()},t=>console.error("Firestore Boletos:",t));st(T(x,St,"config"),t=>{t.exists()&&(N=t.data()),W()},t=>console.error("Firestore Reservas:",t));st(Y(x,K),t=>{Z=t.docs.map(e=>({id:e.id,...e.data()})),W()},t=>console.error("Firestore Estimativas:",t));let y=new Date().toISOString().slice(0,7);const Ft=new Set;function it(){const t=new Set,e=new Date().toISOString().slice(0,7);t.add(e);const a=new Date,o=new Date(a.getFullYear(),a.getMonth()+1,1),n=r=>String(r).padStart(2,"0"),s=`${o.getFullYear()}-${n(o.getMonth()+1)}`;return t.add(s),y&&t.add(y),j.forEach(r=>{r.mesAno&&t.add(r.mesAno)}),P.forEach(r=>{r.mesAno&&t.add(r.mesAno)}),q.forEach(r=>{r.mesAno&&t.add(r.mesAno)}),k.forEach(r=>{r.mesAno&&t.add(r.mesAno)}),Z.forEach(r=>{r.mesAno&&t.add(r.mesAno)}),Array.from(t).filter(r=>!Ft.has(r)).sort().reverse()}window.excluirMesSelecionadoAtual=function(){window.excluirDadosDoMes(y)};window.selecionarMesGlobal=function(t){if(!t)return;y=t;const e=document.getElementById("inp-seletor-mes-global");e&&(e.value=t);const a=document.getElementById("inp-entradas-mes-ano");a&&(a.value=t);const o=document.getElementById("inp-fatura-vencimento");o&&(o.value=`${t}-10`,typeof atualizarMesRefFatura=="function"&&atualizarMesRefFatura());const n=document.getElementById("inp-boleto-vencimento");n&&(n.value=`${t}-10`,typeof atualizarMesRefBoleto=="function"&&atualizarMesRefBoleto()),W()};window.verMesEIrParaControle=function(t){selecionarMesGlobal(t),typeof goTab=="function"&&goTab("mensal")};function ie(){const t=document.getElementById("seletor-meses-bar"),e=document.getElementById("seletor-meses-bar-salarios"),a=document.getElementById("seletor-meses-bar-estimativa"),o=it();o.includes(y)||(y=o[0]||new Date().toISOString().slice(0,7));const n=document.getElementById("inp-seletor-mes-global");n&&n.value!==y&&(n.value=y);const s=document.getElementById("inp-entradas-mes-ano");s&&s.value!==y&&(s.value=y);const r=o.map(i=>{const[m,d]=i.split("-"),c=new Date(parseInt(m),parseInt(d)-1,1).toLocaleString("pt-BR",{month:"short"}).toUpperCase().replace(".",""),v=i===y;return`
      <button class="sub-item ${v?"active":""}" onclick="selecionarMesGlobal('${i}')" style="${v?"background:var(--secondary);color:#fff;border-color:var(--secondary);box-shadow:0 0 10px rgba(99,102,241,0.4);font-weight:700":"background:rgba(15,23,42,.6);color:var(--text-muted);border:1px solid var(--border-color)"}; display:inline-flex;align-items:center;gap:.35rem">
        📅 ${c}/${m}
      </button>
    `}).join("");t&&(t.innerHTML=r),e&&(e.innerHTML=r),a&&(a.innerHTML=r)}window.switchMensalSub=function(t){document.querySelectorAll("[data-mensal-sub]").forEach(o=>o.classList.remove("active")),document.querySelectorAll(".mensal-sub-content").forEach(o=>o.style.display="none");const e=document.querySelector(`[data-mensal-sub="${t}"]`);e&&e.classList.add("active");const a=document.getElementById(t);a&&(a.style.display="block")};function W(){ie(),ce(),le(),qt(),ye(),$e(),we(),Be(),Se(),De(),Le(),Ie()}function le(){const t=y,e=j.filter(h=>h.mesAno===t),a=P.filter(h=>h.mesAno===t),o=q.filter(h=>h.mesAno===t),n=k.filter(h=>h.mesAno===t),s=e.reduce((h,I)=>h+(I.valor||0),0),r=a.reduce((h,I)=>h+(I.valorTotal!==void 0?I.valorTotal:I.valor||0),0),i=o.reduce((h,I)=>h+(I.valorTotal!==void 0?I.valorTotal:I.valor||0),0);let m=0;n.forEach(h=>{h.formasPagamento&&(m+=h.formasPagamento.cartaoDebito||0)});const d=s-r-i-m,u=document.getElementById("m-total-entradas");u&&(u.textContent=l(s));const c=document.getElementById("m-total-cartoes");c&&(c.textContent=l(r));const v=document.getElementById("m-total-boletos");v&&(v.textContent=l(i));const p=document.getElementById("m-mercado-debito");p&&(p.textContent=l(m));const g=document.getElementById("m-saldo-liquido");g&&(g.textContent=l(d),g.style.color=d>=0?"#60a5fa":"#fb7185");const[f,S]=t.split("-"),F=new Date(parseInt(f),parseInt(S)-1,1).toLocaleString("pt-BR",{month:"long"}),w=F.charAt(0).toUpperCase()+F.slice(1),A=document.getElementById("m-lbl-saldo-liquido");A&&(A.textContent=`Saldo Líquido (${w}/${f})`),de(e,a,o,n)}function de(t,e,a,o){const n=document.getElementById("content-salarios-mes");n&&(n.innerHTML=`
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header">
          <span class="card-title">💵 Entradas Registradas em ${y}</span>
          <span class="badge green">Total: ${l(t.reduce((m,d)=>m+(d.valor||0),0))}</span>
        </div>
        ${t.length?`<div class="table-responsive"><table class="custom-table">
              <thead><tr><th>Pessoa</th><th>Descrição</th><th>Tipo</th><th class="num">Valor</th><th>Ação</th></tr></thead>
              <tbody>${t.map(m=>`<tr>
                <td><span class="badge ${m.pessoa==="Victor"?"green":m.pessoa==="Maria"?"purple":"cyan"}">${m.pessoa}</span></td>
                <td><strong>${m.descricao}</strong></td>
                <td><span class="badge amber">${m.tipo==="holerite"?"Holerite":"Manual"}</span></td>
                <td class="num" style="color:#34d399"><strong>${l(m.valor)}</strong></td>
                <td><button class="btn-danger" onclick="excluirEntrada('${m.id}')">🗑️</button></td>
              </tr>`).join("")}</tbody>
            </table></div>`:`<div class="empty-state">Nenhuma entrada cadastrada para ${y}. Use a aba "Salários & Entradas" para cadastrar.</div>`}
      </div>
    `);const s=document.getElementById("content-cartoes-mes");if(s){const m=e.reduce((u,c)=>u+(c.valorTotal||0),0),d=e.length?Vt(e,"mes_"+y):"";s.innerHTML=`
      ${d}
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header">
          <span class="card-title">💳 Faturas de Cartão Vencendo em ${y}</span>
          <span class="badge rose">Total: ${l(m)}</span>
        </div>
        ${e.length?e.map(u=>`
              <div class="purchase-card" style="margin-bottom:1rem">
                <div class="purchase-header" onclick="toggleDetail('fat-m-${u.id}')">
                  <div class="purchase-info">
                    <h3>${u.cartao==="Nubank"?"🟣 Nubank":u.cartao==="Santander"?"🔴 Santander":"💳 "+(u.descricao||u.cartao)}</h3>
                    <p>Vencimento: <strong>${u.dataVencimento||"—"}</strong> • ${u.qtdItens||(u.itens?u.itens.length:0)} lançamentos</p>
                  </div>
                  <div class="purchase-values" style="display:flex;align-items:center;gap:.75rem">
                    <div style="text-align:right">
                      <div class="pv-total" style="color:#fb7185">${l(u.valorTotal)}</div>
                      <div class="pv-sub">Clique para ver itens <span class="chevron" id="chev-fat-m-${u.id}">▼</span></div>
                    </div>
                    <button type="button" class="btn-danger" style="padding:.35rem .65rem;font-size:.78rem;margin-left:.25rem" onclick="event.stopPropagation(); excluirFaturaDocumento('${u.id}')" title="Excluir esta fatura de todos os lugares do sistema">
                      🗑️ Excluir
                    </button>
                  </div>
                </div>
                <div id="detail-fat-m-${u.id}" class="purchase-details">
                  <div class="details-toolbar">
                    <span style="font-weight:700;font-size:.9rem;color:var(--text-muted)">Lançamentos da Fatura</span>
                    <button class="btn-danger" onclick="excluirFaturaDocumento('${u.id}')">🗑️ Excluir Fatura</button>
                  </div>
                  ${Nt(u)}
                </div>
              </div>
            `).join(""):`<div class="empty-state">Nenhuma fatura cadastrada com vencimento em ${y}. Use a aba "Cartões de Crédito" para importar.</div>`}
      </div>
    `}const r=document.getElementById("content-boletos-mes");if(r){const m=a.reduce((d,u)=>d+(u.valorTotal||0),0);r.innerHTML=`
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header">
          <span class="card-title">📄 Boletos Vencendo em ${y}</span>
          <span class="badge purple">Total: ${l(m)}</span>
        </div>
        ${a.length?a.map(d=>`
              <div class="purchase-card" style="margin-bottom:1rem">
                <div class="purchase-header" onclick="toggleDetail('bol-m-${d.id}')">
                  <div class="purchase-info">
                    <h3>📄 ${nt(d)}</h3>
                    <p>Vencimento: <strong>${d.dataVencimento||"—"}</strong> • ${d.qtdItens||(d.itens?d.itens.length:0)} encargos</p>
                  </div>
                  <div class="purchase-values" style="display:flex;align-items:center;gap:.5rem">
                    <div style="text-align:right">
                      <div class="pv-total" style="color:#c084fc">${l(d.valorTotal)}</div>
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
                  ${Gt(d)}
                </div>
              </div>
            `).join(""):`<div class="empty-state">Nenhum boleto cadastrado para ${y}. Use a aba "Boletos" para importar.</div>`}
      </div>
    `}const i=document.getElementById("content-mercado-mes");if(i){let m=0,d=0,u=0;o.forEach(c=>{c.formasPagamento?(m+=c.formasPagamento.valeAlimentacao||0,d+=c.formasPagamento.cartaoCredito||0,u+=c.formasPagamento.cartaoDebito||0):u+=c.valorAPagar||0}),i.innerHTML=`
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem">
          <span class="card-title">🛒 Compras de Mercado em ${y}</span>
          <div style="display:flex;gap:.4rem;align-items:center;flex-wrap:wrap">
            ${m>0?`<span class="badge green">🥗 Alimentação: ${l(m)}</span>`:""}
            ${d>0?`<span class="badge blue">💳 Crédito: ${l(d)}</span>`:""}
            ${u>0?`<span class="badge amber">💵 Débito: ${l(u)}</span>`:""}
            <span class="badge purple">${o.length} notas cadastradas</span>
          </div>
        </div>
        ${o.length?o.map(c=>`
              <div class="purchase-card" style="margin-bottom:1rem">
                <div class="purchase-header" onclick="toggleDetail('mer-m-${c.id}')">
                  <div class="purchase-info">
                    <h3>🛒 ${c.nomeMercado||"Mercado"}</h3>
                    <p>Data: <strong>${ut(c.dataEmissao)}</strong> • ${c.qtdTotalItens||0} itens</p>
                  </div>
                  <div class="purchase-values">
                    <div class="pv-total" style="color:#fbbf24">${l(c.valorAPagar)}</div>
                    <div class="pv-sub">Clique para ver itens <span class="chevron" id="chev-mer-m-${c.id}">▼</span></div>
                  </div>
                </div>
                <div id="detail-mer-m-${c.id}" class="purchase-details">
                  <div class="details-toolbar">
                    <span style="font-weight:700;font-size:.9rem;color:var(--text-muted)">Itens da Nota</span>
                    <button class="btn-danger" onclick="excluirCompraDocumento('${c.id}')">🗑️ Excluir Nota</button>
                  </div>
                  ${Jt(c)}
                </div>
              </div>
            `).join(""):`<div class="empty-state">Nenhuma nota de mercado cadastrada para ${y}.</div>`}
      </div>
    `}}function ce(){const t=it();let e=0,a=0,o=0,n=0,s=0;t.forEach(p=>{const g=j.filter(w=>w.mesAno===p).reduce((w,A)=>w+(A.valor||0),0),f=P.filter(w=>w.mesAno===p).reduce((w,A)=>w+(A.valorTotal!==void 0?A.valorTotal:A.valor||0),0),S=q.filter(w=>w.mesAno===p).reduce((w,A)=>w+(A.valorTotal!==void 0?A.valorTotal:A.valor||0),0);let L=0;k.filter(w=>w.mesAno===p).forEach(w=>{w.formasPagamento&&(L+=w.formasPagamento.cartaoDebito||0)});const F=g-f-S-L;e+=g,a+=f,o+=S,n+=L,s+=F});let r=0,i=0;const m={};k.forEach(p=>{const g=p.valorAPagar||0;p.formasPagamento&&(r+=p.formasPagamento.valeAlimentacao||0,i+=p.formasPagamento.cartaoCredito||0);const f=p.mesAno||"Outros";m[f]=(m[f]||0)+g});const d=N&&N.valorAtualGuardado!==void 0?N.valorAtualGuardado:3e3,u=s+d;document.getElementById("fin-total-entradas").textContent=l(e);const c=document.getElementById("fin-subtext-entradas");c&&(c.textContent="Soma Total das Entradas da Tabela Mensal"),document.getElementById("fin-total-cartoes").textContent=l(a),document.getElementById("fin-total-boletos").textContent=l(o),document.getElementById("fin-mercado-debito").textContent=l(n),document.getElementById("fin-saldo-liquido").textContent=l(s),document.getElementById("fin-saldo-liquido").style.color=s>=0?"#60a5fa":"#fb7185";const v=document.getElementById("fin-subtext-saldo");v&&(v.innerHTML=`Saldo Líquido + Reserva Guardada (${l(d)}): <strong style="color:#34d399">${l(u)}</strong>`),document.getElementById("dash-alimentacao").textContent=l(r),document.getElementById("dash-credito").textContent=l(i),document.getElementById("dash-debito").textContent=l(n),me(),Ot(m)}function me(){const t=document.getElementById("tabela-resumo-mensal");if(!t)return;const e=it();if(!e.length){t.innerHTML='<div class="empty-state">Nenhum dado cadastrado ainda.</div>';return}const a=e.map(o=>{const n=j.filter(g=>g.mesAno===o).reduce((g,f)=>g+(f.valor||0),0),s=P.filter(g=>g.mesAno===o).reduce((g,f)=>g+(f.valorTotal!==void 0?f.valorTotal:f.valor||0),0),r=q.filter(g=>g.mesAno===o).reduce((g,f)=>g+(f.valorTotal!==void 0?f.valorTotal:f.valor||0),0);let i=0;k.filter(g=>g.mesAno===o).forEach(g=>{g.formasPagamento&&(i+=g.formasPagamento.cartaoDebito||0)});const m=n-s-r-i,[d,u]=o.split("-"),v=new Date(parseInt(d),parseInt(u)-1,1).toLocaleString("pt-BR",{month:"short"}).toUpperCase().replace(".","");return`
      <tr style="${o===y?"background:rgba(99,102,241,0.1)":""}">
        <td><strong>📅 ${v}/${d}</strong></td>
        <td style="color:#34d399"><strong>${l(n)}</strong></td>
        <td style="color:#fb7185">${l(s)}</td>
        <td style="color:#c084fc">${l(r)}</td>
        <td style="color:#fbbf24">${l(i)}</td>
        <td style="color:${m>=0?"#60a5fa":"#fb7185"}; font-weight:800">${l(m)}</td>
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
  `}window.excluirDadosDoMes=async function(t){const e=t||y;if(!e)return;const[a,o]=e.split("-"),s=new Date(parseInt(a),parseInt(o)-1,1).toLocaleString("pt-BR",{month:"long"}),r=`${s.charAt(0).toUpperCase()+s.slice(1)} de ${a}`,i=j.filter(p=>p.mesAno===e),m=P.filter(p=>p.mesAno===e),d=q.filter(p=>p.mesAno===e),u=k.filter(p=>p.mesAno===e),c=Z.filter(p=>p.id===e),v=`⚠️ TEM CERTEZA QUE DESEJA EXCLUIR O MÊS ${r.toUpperCase()} (${e})?

Isso irá APAGAR PERMANENTEMENTE todos os registros vinculados a este mês:
• ${i.length} Salário(s) / Entrada(s)
• ${m.length} Fatura(s) de Cartão
• ${d.length} Boleto(s) & Conta(s)
• ${u.length} Nota(s) de Mercado
• Estimativa orçamentária do mês

Esta ação é irreversível. Confirmar exclusão do mês?`;if(confirm(v))try{const p=[];i.forEach(f=>p.push(H(T(x,rt,f.id)))),m.forEach(f=>p.push(H(T(x,ot,f.id)))),d.forEach(f=>p.push(H(T(x,et,f.id)))),u.forEach(f=>p.push(H(T(x,bt,f.id)))),c.forEach(f=>p.push(H(T(x,K,f.id)))),p.length>0&&await Promise.all(p),Ft.add(e),$(`🗑️ O mês ${r} e todos os seus dados foram excluídos com sucesso!`),y=it()[0]||new Date().toISOString().slice(0,7),W()}catch(p){alert("Erro ao excluir dados do mês: "+p.message)}};function Ot(t){var s;if(typeof Chart>"u")return setTimeout(()=>Ot(t),300);const e=(s=document.getElementById("chart-barras"))==null?void 0:s.getContext("2d");if(!e)return;const a=Object.keys(t).sort(),o=a.map(r=>{const[i,m]=r.split("-");return`${m}/${i}`}),n=a.map(r=>t[r]);ht&&ht.destroy(),ht=new Chart(e,{type:"bar",data:{labels:o.length?o:["Sem compras"],datasets:[{label:"Gasto Mercado R$",data:n.length?n:[0],backgroundColor:"rgba(16,185,129,0.78)",borderColor:"#10b981",borderWidth:2,borderRadius:8}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:r=>` ${l(r.raw)}`}}},scales:{y:{beginAtZero:!0,grid:{color:"rgba(255,255,255,.05)"},ticks:{color:"#94a3b8",callback:r=>"R$"+r}},x:{grid:{display:!1},ticks:{color:"#94a3b8"}}}}})}function Rt(t){if(!t)return 0;const e=t.match(/L[íi]quido(?:\s*a\s*receber)?\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/TOTAL\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/SAL[ÁA]RIO\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/VALOR\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i);return e?R(e[1]):0}function ue(){const t=document.getElementById("inp-entradas-mes-ano");if(t&&!t.value){const e=new Date,a=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0");t.value=`${a}-${o}`}}setTimeout(ue,300);let X="mes";window.toggleFiltroEntradasTabela=function(t){X=t,qt()};document.getElementById("form-holerite-victor").addEventListener("submit",async t=>{t.preventDefault();const e=y||document.getElementById("inp-entradas-mes-ano").value||new Date().toISOString().slice(0,7),a=document.getElementById("inp-holerite-txt-victor").value;let o=parseFloat(document.getElementById("inp-salario-val-victor").value)||0;if(!o&&a&&(o=Rt(a)),!o){$("⚠️ Digite ou cole um holerite válido com valor.");return}const n=`salario_victor_${e}`;await V(T(x,rt,n),{pessoa:"Victor",tipo:"holerite",descricao:`Salário Líquido Victor (${e})`,valor:o,mesAno:e,data:new Date().toISOString()}),document.getElementById("inp-holerite-txt-victor").value="",document.getElementById("inp-salario-val-victor").value="",$(`✅ Salário do Victor (${e}) salvo com sucesso!`)});document.getElementById("form-holerite-maria").addEventListener("submit",async t=>{t.preventDefault();const e=y||document.getElementById("inp-entradas-mes-ano").value||new Date().toISOString().slice(0,7),a=document.getElementById("inp-holerite-txt-maria").value;let o=parseFloat(document.getElementById("inp-salario-val-maria").value)||0;if(!o&&a&&(o=Rt(a)),!o){$("⚠️ Digite ou cole um holerite válido com valor.");return}const n=`salario_maria_${e}`;await V(T(x,rt,n),{pessoa:"Maria",tipo:"holerite",descricao:`Salário Líquido Maria (${e})`,valor:o,mesAno:e,data:new Date().toISOString()}),document.getElementById("inp-holerite-txt-maria").value="",document.getElementById("inp-salario-val-maria").value="",$(`✅ Salário da Maria (${e}) salvo com sucesso!`)});document.getElementById("form-entrada-manual").addEventListener("submit",async t=>{t.preventDefault();const e=y||document.getElementById("inp-entradas-mes-ano").value||new Date().toISOString().slice(0,7),a=document.getElementById("inp-ent-desc").value.trim(),o=parseFloat(document.getElementById("inp-ent-val").value)||0,n=document.getElementById("inp-ent-pessoa").value;!a||!o||(await ft(Y(x,rt),{pessoa:n,tipo:"manual",descricao:a,valor:o,mesAno:e,data:new Date().toISOString()}),t.target.reset(),$(`🎉 Entrada manual (${e}) registrada!`))});function qt(){var m,d,u;const t=y||((m=document.getElementById("inp-entradas-mes-ano"))==null?void 0:m.value)||new Date().toISOString().slice(0,7),e=document.getElementById("lbl-entradas-mes-ref");if(e){const[c,v]=t.split("-"),g=new Date(parseInt(c),parseInt(v)-1,1).toLocaleString("pt-BR",{month:"long"}),f=g.charAt(0).toUpperCase()+g.slice(1);e.textContent=`Visualizando e inserindo entradas para: ${f} de ${c}`}const a=((d=j.find(c=>c.pessoa==="Victor"&&c.tipo==="holerite"&&c.mesAno===t))==null?void 0:d.valor)||0,o=((u=j.find(c=>c.pessoa==="Maria"&&c.tipo==="holerite"&&c.mesAno===t))==null?void 0:u.valor)||0,n=j.filter(c=>c.mesAno===t),s=n.reduce((c,v)=>c+(v.valor||0),0);document.getElementById("val-salario-victor").textContent=l(a),document.getElementById("val-salario-maria").textContent=l(o),document.getElementById("val-entradas-combinado").textContent=`${l(s)}`;const r=document.getElementById("lista-entradas-registradas");if(!r)return;const i=X==="mes"?n:j;if(!i.length){r.innerHTML=`
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;flex-wrap:wrap;gap:.5rem">
        <span style="font-size:.84rem;color:var(--text-muted)">Modo de Exibição da Tabela:</span>
        <div style="display:flex;gap:.35rem">
          <button type="button" class="btn-secondary" style="padding:.25rem .6rem;font-size:.78rem;${X==="mes"?"background:var(--secondary);color:#fff":""}" onclick="toggleFiltroEntradasTabela('mes')">📅 Mês (${t})</button>
          <button type="button" class="btn-secondary" style="padding:.25rem .6rem;font-size:.78rem;${X==="todos"?"background:var(--secondary);color:#fff":""}" onclick="toggleFiltroEntradasTabela('todos')">🌐 Todas as Entradas</button>
        </div>
      </div>
      <div class="empty-state">Nenhuma entrada registrada para ${X==="mes"?"o mês "+t:"o sistema"}.</div>
    `;return}r.innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.75rem;flex-wrap:wrap;gap:.5rem">
      <span style="font-size:.84rem;color:var(--text-muted);font-weight:600">Exibindo ${i.length} entrada(s) em tabela:</span>
      <div style="display:flex;gap:.35rem">
        <button type="button" class="btn-secondary" style="padding:.25rem .6rem;font-size:.78rem;${X==="mes"?"background:var(--secondary);color:#fff":""}" onclick="toggleFiltroEntradasTabela('mes')">📅 Mês ${t}</button>
        <button type="button" class="btn-secondary" style="padding:.25rem .6rem;font-size:.78rem;${X==="todos"?"background:var(--secondary);color:#fff":""}" onclick="toggleFiltroEntradasTabela('todos')">🌐 Todas</button>
      </div>
    </div>
    <div class="table-responsive"><table class="custom-table">
      <thead><tr><th>Mês / Ref</th><th>Descrição</th><th>Pessoa</th><th>Tipo</th><th class="num">Valor</th><th>Ação</th></tr></thead>
      <tbody>${i.map(c=>`<tr>
        <td><span class="badge green">${c.mesAno||"—"}</span></td>
        <td><strong>${c.descricao}</strong></td>
        <td><span class="badge ${c.pessoa==="Victor"?"green":c.pessoa==="Maria"?"purple":"cyan"}">${c.pessoa}</span></td>
        <td><span class="badge amber">${c.tipo==="holerite"?"Holerite":"Manual"}</span></td>
        <td class="num" style="color:#34d399"><strong>${l(c.valor)}</strong></td>
        <td><button class="btn-danger" onclick="excluirEntrada('${c.id}')">🗑️</button></td>
      </tr>`).join("")}</tbody>
    </table></div>
  `}window.excluirEntrada=async function(t){confirm("Excluir esta entrada?")&&(await H(T(x,rt,t)),$("🗑️ Entrada removida."))};let $t="Nubank",C=null;function pe(){const t=document.getElementById("inp-fatura-vencimento");if(t&&!t.value){const e=new Date,a=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0");t.value=`${a}-${o}-10`,atualizarMesRefFatura()}}setTimeout(pe,300);window.atualizarMesRefFatura=function(){const t=document.getElementById("inp-fatura-vencimento"),e=document.getElementById("lbl-fatura-mes-ref");if(!(!t||!e))if(t.value){const[a,o]=t.value.split("-"),s=new Date(parseInt(a),parseInt(o)-1,1).toLocaleString("pt-BR",{month:"long"});e.textContent=`Fatura ${s.charAt(0).toUpperCase()+s.slice(1)}/${a}`}else e.textContent="Mês da Fatura"};window.selecionarCartaoFatura=function(t){$t=t,document.querySelectorAll(".btn-card-select").forEach(a=>a.classList.remove("active"));const e=document.querySelector(`.btn-card-select[data-card="${t}"]`);e&&e.classList.add("active"),$(`Cartão selecionado: ${t}`)};window.handleFileFaturaSelect=async function(t){const e=t.target.files[0];if(!e)return;const a=document.getElementById("txt-file-fatura");a&&(a.textContent=`📄 Arquivo: ${e.name}`),$(`⏳ Lendo arquivo da fatura (${e.name})...`);let o="";if(e.type==="application/pdf"||e.name.endsWith(".pdf"))o=await kt(e);else try{o=await e.text()}catch{o=""}o?(document.getElementById("inp-fatura-txt").value=o,await zt(o,$t)):$("❌ Não foi possível ler o texto do arquivo da fatura.")};async function kt(t){try{const e=await t.arrayBuffer();if(typeof pdfjsLib>"u")return $("⚠️ Aguarde a biblioteca de PDF carregar..."),"";pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";let a=pdfjsLib.getDocument({data:e});a.onPassword=(s,r)=>{let i=prompt(`🔒 Este PDF de fatura está protegido por senha.
Digite a senha para abrir (ex: CPF ou Data de Nascimento):`);i?s(i):$("⚠️ Senha não informada. Leitura do PDF cancelada.")};const o=await a.promise;let n="";for(let s=1;s<=o.numPages;s++){const i=await(await o.getPage(s)).getTextContent();let m=null,d="";for(const u of i.items){if(!u.str)continue;const c=u.transform?u.transform[5]:null;m!==null&&Math.abs(c-m)>3?d+=`
`:d.length>0&&!d.endsWith(`
`)&&!d.endsWith(" ")&&(d+=" "),d+=u.str,m=c}n+=d+`
`}return n}catch(e){return e.name==="PasswordException"?$("🔒 O PDF precisa de senha válida para ser aberto."):console.error("Erro ao ler PDF:",e),""}}function ve(t){if(!t)return null;const e=t.match(/Total\s*a\s*Pagar\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/no\s*valor\s*de\s*R?\$\s*([\d\.,]+)/i)||t.match(/Valor\s*total\s*da\s*fatura\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/Total\s*da\s*fatura\s*[:\s]*R?\$\s*([\d\.,]+)/i);if(e){const a=R(e[1]);if(a>0)return a}return null}function ge(t){if(!t)return null;const e=t.match(/Vencimento\s*[:\s]*(\d{2}[\/\.-]\d{2}[\/\.-]\d{4})/i)||t.match(/Data\s*de\s*vencimento\s*[:\s]*(\d{2})\s+([A-Za-z]{3})\s+(\d{4})/i)||t.match(/FATURA\s+(\d{2})\s+([A-Za-z]{3})\s+(\d{4})/i);if(e){if(e[2]&&e[3]){const a=e[1],o=e[2].toUpperCase(),n=e[3],r={JAN:"01",FEB:"02",MAR:"03",ABR:"04",APR:"04",MAI:"05",MAY:"05",JUN:"06",JUL:"07",AGO:"08",AUG:"08",SET:"09",SEP:"09",OUT:"10",OCT:"10",NOV:"11",DEZ:"12",DEC:"12"}[o]||"07";return`${n}-${r}-${a.padStart(2,"0")}`}else if(e[1]){const[a,o,n]=e[1].split(/[\/\.-]/);return`${n}-${o.padStart(2,"0")}-${a.padStart(2,"0")}`}}return null}window.importarFaturaManualOuArquivo=async function(){const t=document.getElementById("inp-fatura-txt").value.trim();if(!t){$("⚠️ Selecione o arquivo da fatura (.pdf, .csv) ou cole o texto da fatura.");return}await zt(t,$t)};async function zt(t,e){const a=ge(t);a&&(document.getElementById("inp-fatura-vencimento").value=a,atualizarMesRefFatura());const o=ve(t),n=fe(t),s=document.getElementById("inp-fatura-vencimento").value||new Date().toISOString().slice(0,10),r=s.slice(0,7),i=n.reduce((v,p)=>v+p.valor,0),m=o||i||0,d=e?`Cartão ${e}`:"Fatura Cartão";C={cartao:e||"Nubank",descricao:d,dataVencimento:s,mesAno:r,valorTotal:m,qtdItens:n.length,itens:n};const u=document.getElementById("inp-revisao-fatura-desc");u&&(u.value=d);const c=document.getElementById("inp-revisao-fatura-val");c&&(c.value=m?m.toFixed(2):""),Pt(),n.length>0?$(`✅ ${n.length} compras encontradas! Fatura total: ${l(m)}.`):$("ℹ️ Fatura pronta para revisão. Confirme o valor total e o cartão abaixo.")}window.atualizarValorTotalRevisaoFatura=function(){var e;if(!C)return;const t=parseFloat((e=document.getElementById("inp-revisao-fatura-val"))==null?void 0:e.value)||0;C.valorTotal=t,document.getElementById("badge-total-preview-fatura").textContent=l(t)};function Pt(){if(!C)return;const{valorTotal:t,itens:e,cartao:a,descricao:o}=C;document.getElementById("badge-total-preview-fatura").textContent=l(t);const n=document.getElementById("inp-revisao-fatura-desc");n&&(!n.value||n.value==="Fatura Cartão")&&(n.value=o||`Cartão ${a||"Nubank"}`);const s=document.getElementById("inp-revisao-fatura-val");s&&(!s.value||parseFloat(s.value)===0)&&(s.value=t?t.toFixed(2):"");const r=document.getElementById("lista-preview-fatura-itens");!e||!e.length?r.innerHTML='<div class="empty-state">Nenhum item individual extraído. O valor total acima será considerado.</div>':r.innerHTML=e.map((m,d)=>`
      <div style="display:flex; justify-content:space-between; align-items:center; padding:.4rem 0; border-bottom:1px dashed var(--border-color); font-size:.82rem;">
        <span><strong>${m.dataCompra||"—"}</strong> — ${m.descricao}</span>
        <div style="display:flex; align-items:center; gap:.75rem;">
          <span style="color:#fb7185; font-weight:700;">${l(m.valor)}</span>
          <button type="button" class="btn-danger" style="padding:.15rem .45rem; font-size:.75rem;" onclick="removerItemRevisaoFatura(${d})">🗑️</button>
        </div>
      </div>
    `).join("");const i=document.getElementById("box-revisao-fatura");i.style.display="block",i.scrollIntoView({behavior:"smooth"})}window.removerItemRevisaoFatura=function(t){if(!C||!C.itens)return;C.itens.splice(t,1);const e=C.itens.reduce((a,o)=>a+o.valor,0);if(e>0){C.valorTotal=e;const a=document.getElementById("inp-revisao-fatura-val");a&&(a.value=e.toFixed(2))}C.qtdItens=C.itens.length,Pt(),$("🗑️ Item removido da revisão da fatura.")};window.confirmarEGravarFaturaDocumento=async function(){var o,n;if(!C)return;const t=(o=document.getElementById("inp-revisao-fatura-desc"))==null?void 0:o.value.trim(),e=parseFloat((n=document.getElementById("inp-revisao-fatura-val"))==null?void 0:n.value)||0,a=document.getElementById("inp-fatura-vencimento").value||new Date().toISOString().slice(0,10);if(!e){$("⚠️ Digite ou confirme o valor total da fatura.");return}C.cartao=t||C.cartao||"Cartão",C.valorTotal=e,C.dataVencimento=a,C.mesAno=a.slice(0,7);try{await ft(Y(x,ot),{...C,createdAt:Et()}),document.getElementById("box-revisao-fatura").style.display="none",document.getElementById("inp-fatura-txt").value="";const s=document.getElementById("txt-file-fatura");s&&(s.textContent="Clique para Selecionar o Arquivo da Fatura");const r=l(C.valorTotal);C=null,$(`🎉 Fatura de ${r} salva com sucesso!`)}catch(s){alert("Erro ao salvar fatura: "+s.message)}};function fe(t){if(!t)return[];const e=[],a=/(?:[@\)\(\*•\s]+)?(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+(?:(\d{2}\/\d{2})\s+)?(-?R?\$\s*[\d\.]+,\d{2}|-?[\d\.]+,\d{2})/gi;if(t.split(`
`).forEach(n=>{const s=n.trim();if(!s||/EMISS[ÃA]O|TRANSA[ÇC][ÕO]ES|RESUMO|PAGAMENTO DE FATURA|TOTAL DA FATURA|FATURA ANTERIOR|SALDO ANTERIOR|LIMITE DISPON[ÍI]VEL|OPÇÕES DE PAGAMENTO|ALTERNATIVAS DE PAGAMENTO|PAGAMENTO E DEMAIS|PARCELAMENTOS|DESPESAS|HISTÓRICO DE FATURAS|SUPERCRÉDITO|SAQUE À CRÉDITO|COMPRA DATA DESCRIÇÃO/i.test(s))return;const r=/(?:[@\)\(\*•\s]+)?(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+(?:(\d{2}\/\d{2})\s+)?(-?R?\$\s*[\d\.]+,\d{2}|-?[\d\.]+,\d{2})$/i,i=s.match(r)||s.match(/(?:[@\)\(\*•\s]+)?(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+(?:(\d{2}\/\d{2})\s+)?(-?R?\$\s*[\d\.]+,\d{2}|-?[\d\.]+,\d{2})/i);if(i){const m=i[1];let d=i[2].trim();const u=i[3],c=i[4];if(c.includes("-")||/DEB AUTOM|PAGAMENTO|PAGTO|CR[ÉE]DITO FATURA/i.test(d))return;const v=R(c);u&&(d+=` (${u})`),d&&v>0&&d.length>2&&!/fatura|limite|pagamento|saldo|alternativas|opções|período|emissão|vencimento/i.test(d)&&e.push({dataCompra:m,descricao:d,valor:v})}}),e.length===0){let n;for(;(n=a.exec(t))!==null;){const s=n[1];let r=n[2].trim();const i=n[3],m=n[4];if(m.includes("-")||/DEB AUTOM|PAGAMENTO|PAGTO|CR[ÉE]DITO FATURA/i.test(r))continue;const d=R(m);i&&(r+=` (${i})`),r&&d>0&&r.length>2&&!/fatura|limite|pagamento|saldo|alternativas|opções|período|emissão|vencimento/i.test(r)&&e.push({dataCompra:s,descricao:r,valor:d})}}return e}window.ultimosLocaisAnalisados={};function be(t){if(!t)return"DIVERSOS";let e=t.replace(/\(\d{1,2}\/\d{1,2}\)/gi,"").replace(/\b\d{1,2}\/\d{1,2}\b/gi,"").replace(/\b\d{1,2}x\b/gi,"").trim();return e=e.replace(/\s+/g," "),e.toUpperCase()}function Ut(t){const e={};(Array.isArray(t)?t:[t]).forEach(n=>{!n||!n.itens||!Array.isArray(n.itens)||n.itens.forEach(s=>{if(!s.descricao||!s.valor)return;const r=be(s.descricao);e[r]||(e[r]={nome:r,qtd:0,valorTotal:0,compras:[]}),e[r].qtd+=1,e[r].valorTotal+=s.valor||0,e[r].compras.push({dataCompra:s.dataCompra||"—",descricao:s.descricao,valor:s.valor||0,cartao:n.cartao||"Cartão",mesAno:n.mesAno||"—"})})});const o=Object.values(e).filter(n=>n.qtd>=2);return o.sort((n,s)=>s.valorTotal-n.valorTotal),o}function Vt(t,e="geral"){const a=Ut(t);if(a.forEach(n=>{window.ultimosLocaisAnalisados[`${e}_${n.nome}`]=n}),!a.length)return`
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
  `}window.abrirModalComprasEstabelecimento=function(t){const e=window.ultimosLocaisAnalisados[t];if(!e){$("⚠️ Não foi possível carregar os detalhes do estabelecimento.");return}let a=document.getElementById("modal-detalhes-estabelecimento");if(!a){const n=document.createElement("div");n.id="modal-detalhes-estabelecimento",n.className="modal-overlay",n.innerHTML=`
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
  `,a.style.display="flex"};window.fecharModalEstabelecimento=function(){const t=document.getElementById("modal-detalhes-estabelecimento");t&&(t.style.display="none")};function ye(){const t=P.reduce((r,i)=>r+(i.valorTotal!==void 0?i.valorTotal:i.valor||0),0);document.getElementById("badge-total-cartoes").textContent=`${l(t)} total`;const e=document.getElementById("lista-faturas-registradas");if(!P.length){e.innerHTML='<div class="empty-state">Nenhuma fatura cadastrada ainda.</div>';return}const a=Vt(P,"geral"),o={};P.forEach(r=>{const i=r.mesAno||"Outros";o[i]||(o[i]=[]),o[i].push(r)});const s=Object.keys(o).sort((r,i)=>i.localeCompare(r)).map((r,i)=>{const m=o[r],d=m.reduce((v,p)=>v+(p.valorTotal!==void 0?p.valorTotal:p.valor||0),0);let u=r;if(r!=="Outros"&&r.includes("-")){const[v,p]=r.split("-"),f=new Date(parseInt(v),parseInt(p)-1,1).toLocaleString("pt-BR",{month:"long"});u=`${f.charAt(0).toUpperCase()+f.slice(1)} de ${v}`}const c=i===0;return`
      <div class="card" style="margin-bottom:1.25rem;background:rgba(15,23,42,0.45);border:1px solid var(--border-color)">
        <div class="card-header" style="cursor:pointer;user-select:none;display:flex;justify-content:space-between;align-items:center" onclick="toggleGroupMonth('fat-group-${r}')">
          <span class="card-title" style="font-size:1.05rem">📅 Faturas de ${u}</span>
          <div style="display:flex;align-items:center;gap:.75rem">
            <span class="badge blue" style="font-size:.85rem">Total: ${l(d)} (${m.length} fatura${m.length>1?"s":""})</span>
            <span class="chevron ${c?"open":""}" id="chev-fat-group-${r}">▼</span>
          </div>
        </div>
        <div id="fat-group-${r}" class="purchase-details ${c?"open":""}" style="padding:.75rem 1rem;display:${c?"block":"none"}">
          ${m.map(v=>{var A;const p=v.valorTotal!==void 0?v.valorTotal:v.valor||0,g=v.cartao||"Cartão",f=g.toLowerCase().includes("nubank"),S=f?"purple":"red",L=f?"🟣":"🔴",F=v.dataVencimento?ut(v.dataVencimento).split(",")[0]:"—",w=v.mesAno||"—";return`
              <div class="purchase-card" style="margin-bottom:1rem">
                <div class="purchase-header" onclick="toggleDetail('fat-${v.id}')">
                  <div class="purchase-info">
                    <h3><span class="badge ${S}">${L} ${g}</span> — Vencimento: ${F}</h3>
                    <p>📅 Mês Referência: <strong>${w}</strong> &nbsp;•&nbsp; 🛒 ${v.qtdItens||((A=v.itens)==null?void 0:A.length)||1} itens contemplados</p>
                  </div>
                  <div class="purchase-values" style="display:flex;align-items:center;gap:.75rem">
                    <div style="text-align:right">
                      <div class="pv-total" style="color:#fb7185">${l(p)}</div>
                      <div class="pv-sub">Fatura do Mês</div>
                    </div>
                    <button type="button" class="btn-danger" style="padding:.35rem .65rem;font-size:.78rem;margin-left:.25rem" onclick="event.stopPropagation(); excluirFaturaDocumento('${v.id}')" title="Excluir esta fatura de todos os lugares do sistema">
                      🗑️ Excluir
                    </button>
                  </div>
                  <svg class="chevron" id="chev-fat-${v.id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
                <div class="purchase-details" id="detail-fat-${v.id}">
                  <div class="details-toolbar">
                    <span class="card-subtext">Detalhamento dos Lançamentos da Fatura</span>
                    <button class="btn-danger" onclick="excluirFaturaDocumento('${v.id}')">🗑️ Excluir Fatura</button>
                  </div>
                  ${Nt(v)}
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `}).join("");e.innerHTML=a+s}function Nt(t){if(t.itens&&t.itens.length>0){const e=Ut([t]),a=`fatura_${t.id}`;e.forEach(n=>{window.ultimosLocaisAnalisados[`${a}_${n.nome}`]=n});let o="";return e.length>0&&(o=`
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
  </table></div>`}window.removerItemFaturaCadastrada=async function(t,e){const a=P.find(s=>s.id===t);if(!a||!a.itens||!confirm("Remover este item da fatura?"))return;const o=[...a.itens];o.splice(e,1);const n=o.reduce((s,r)=>s+(r.valor||0),0);o.length===0?(await H(T(x,ot,t)),$("🗑️ Fatura excluída pois todos os itens foram removidos.")):(await V(T(x,ot,t),{...a,itens:o,valorTotal:n,qtdItens:o.length}),$("🗑️ Item removido da fatura."))};window.excluirFaturaDocumento=async function(t){confirm("Excluir esta fatura e todos os seus lançamentos?")&&(await H(T(x,ot,t)),$("🗑️ Fatura removida com sucesso."))};let D=null;function he(){const t=document.getElementById("inp-boleto-vencimento");if(t&&!t.value){const e=new Date,a=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0");t.value=`${a}-${o}-10`,atualizarMesRefBoleto()}}setTimeout(he,300);window.atualizarMesRefBoleto=function(){const t=document.getElementById("inp-boleto-vencimento"),e=document.getElementById("lbl-boleto-mes-ref");if(!(!t||!e))if(t.value){const[a,o]=t.value.split("-"),s=new Date(parseInt(a),parseInt(o)-1,1).toLocaleString("pt-BR",{month:"long"});e.textContent=`Boleto ${s.charAt(0).toUpperCase()+s.slice(1)}/${a}`}else e.textContent="Mês do Boleto"};window.handleFileBoletoSelect=async function(t){const e=t.target.files[0];if(!e)return;const a=document.getElementById("txt-file-boleto");a&&(a.textContent=`📄 Arquivo: ${e.name}`),$(`⏳ Lendo arquivo do boleto (${e.name})...`);let o="";if(e.type==="application/pdf"||e.name.endsWith(".pdf"))o=await kt(e);else try{o=await e.text()}catch{o=""}o?(document.getElementById("inp-boleto-txt").value=o,await jt(o,e.name)):$("❌ Não foi possível ler o texto do arquivo do boleto.")};window.importarBoletoManualOuArquivo=async function(){const t=document.getElementById("inp-boleto-txt").value.trim();if(!t){$("⚠️ Selecione o arquivo do boleto (.pdf, .txt) ou cole o texto do boleto.");return}await jt(t,"Boleto")};async function jt(t,e){const a=Ee(t);a.vencimento&&(document.getElementById("inp-boleto-vencimento").value=a.vencimento,atualizarMesRefBoleto());const o=document.getElementById("inp-boleto-vencimento").value||new Date().toISOString().slice(0,10),n=o.slice(0,7),s=a.beneficiario||e.replace(/\.[^/.]+$/,"")||"Boleto / Conta",r=a.itens.reduce((m,d)=>m+d.valor,0),i=a.valorTotal||r||0;document.getElementById("inp-revisao-boleto-desc").value=s,document.getElementById("inp-revisao-boleto-val").value=i?i.toFixed(2):"",D={descricao:s,dataVencimento:o,mesAno:n,valorTotal:i,qtdItens:a.itens.length,itens:a.itens},Ht(),$("✅ Boleto identificado! Confira a descrição, valor e itens antes de salvar.")}window.atualizarValorTotalRevisaoBoleto=function(){if(!D)return;const t=parseFloat(document.getElementById("inp-revisao-boleto-val").value)||0;D.valorTotal=t,document.getElementById("badge-total-preview-boleto").textContent=l(t)};function Ht(){if(!D)return;const{valorTotal:t,itens:e}=D;document.getElementById("badge-total-preview-boleto").textContent=l(t);const a=document.getElementById("lista-preview-boleto-itens");!e||!e.length?a.innerHTML='<div class="empty-state">Nenhum encargo/item individual extraído. O valor total acima será considerado.</div>':a.innerHTML=e.map((n,s)=>`
      <div style="display:flex; justify-content:space-between; align-items:center; padding:.4rem 0; border-bottom:1px dashed var(--border-color); font-size:.82rem;">
        <span><strong>${n.dataBoleto||"—"}</strong> — ${n.descricao}</span>
        <div style="display:flex; align-items:center; gap:.75rem;">
          <span style="color:#c084fc; font-weight:700;">${l(n.valor)}</span>
          <button type="button" class="btn-danger" style="padding:.15rem .45rem; font-size:.75rem;" onclick="removerItemRevisaoBoleto(${s})">🗑️</button>
        </div>
      </div>
    `).join("");const o=document.getElementById("box-revisao-boleto");o.style.display="block",o.scrollIntoView({behavior:"smooth"})}window.removerItemRevisaoBoleto=function(t){if(!D||!D.itens)return;D.itens.splice(t,1);const e=D.itens.reduce((a,o)=>a+o.valor,0);e>0&&(D.valorTotal=e,document.getElementById("inp-revisao-boleto-val").value=e.toFixed(2)),D.qtdItens=D.itens.length,Ht(),$("🗑️ Item removido da revisão do boleto.")};window.confirmarEGravarBoletoDocumento=async function(){if(!D)return;const t=document.getElementById("inp-revisao-boleto-desc").value.trim(),e=parseFloat(document.getElementById("inp-revisao-boleto-val").value)||0,a=document.getElementById("inp-boleto-vencimento").value||new Date().toISOString().slice(0,10);if(!e){$("⚠️ Digite ou confirme o valor total do boleto.");return}D.descricao=t||"Boleto / Conta",D.valorTotal=e,D.dataVencimento=a,D.mesAno=a.slice(0,7);try{await ft(Y(x,et),{...D,createdAt:Et()}),document.getElementById("box-revisao-boleto").style.display="none",document.getElementById("inp-boleto-txt").value="";const o=document.getElementById("txt-file-boleto");o&&(o.textContent="Clique para Selecionar o Arquivo do Boleto");const n=l(D.valorTotal);D=null,$(`🎉 Boleto de ${n} salvo com sucesso!`)}catch(o){alert("Erro ao salvar boleto: "+o.message)}};function Ee(t){if(!t)return{beneficiario:"",valorTotal:0,vencimento:null,itens:[]};let e="",a=0,o=null;const n=[],s=t.match(/Vencimento\s*[:\s]*(\d{2}[\/\.-]\d{2}[\/\.-]\d{4})/i)||t.match(/Vencimento\s*[:\s]*(\d{2})\s+([A-Za-z]{3})\s+(\d{4})/i)||t.match(/Data\s*de\s*Vencimento\s*[:\s]*(\d{2}[\/\.-]\d{2}[\/\.-]\d{4})/i);if(s){if(s[2]&&s[3]){const d=s[1],u=s[2].toUpperCase();o=`${s[3]}-${{JAN:"01",FEB:"02",MAR:"03",ABR:"04",APR:"04",MAI:"05",MAY:"05",JUN:"06",JUL:"07",AGO:"08",AUG:"08",SET:"09",SEP:"09",OUT:"10",OCT:"10",NOV:"11",DEZ:"12",DEC:"12"}[u]||"07"}-${d.padStart(2,"0")}`}else if(s[1]){const[d,u,c]=s[1].split(/[\/\.-]/);o=`${c}-${u.padStart(2,"0")}-${d.padStart(2,"0")}`}}const r=t.match(/Benefici[áa]rio\s*[:\s]*([^\n\r]+)/i)||t.match(/Nome\s*do\s*Cedente\s*[:\s]*([^\n\r]+)/i)||t.match(/Raz[ãa]o\s*Social\s*[:\s]*([^\n\r]+)/i);r&&(e=r[1].trim().replace(/\s{2,}/g," "));const i=t.match(/Valor\s*do\s*Documento\s*[:\s]*R?\$\s*([\d\.]+,\d{2})/i)||t.match(/\(=\)\s*Valor\s*Cobrado\s*[:\s]*R?\$\s*([\d\.]+,\d{2})/i)||t.match(/Valor\s*Cobrado\s*[:\s]*R?\$\s*([\d\.]+,\d{2})/i)||t.match(/Valor\s*R?\$\s*([\d\.]+,\d{2})/i);return i&&(a=R(i[1])),t.split(`
`).forEach(d=>{const u=d.trim();if(!u||/vencimento|beneficiário|cedente|nosso\s*número|agência|código|autenticação|instruções/i.test(u))return;const c=u.match(/(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\b[A-Za-z]{3}\b)?\s*(.+?)\s+R?\$\s*([\d\.]+,\d{2})$/i);if(c){const v=c[1]||"Boleto",p=c[2].trim(),g=R(c[3]);p&&g>0&&p.length>2&&!/valor|total|documento|cobrado/i.test(p)&&n.push({dataBoleto:v,descricao:p,valor:g})}}),{beneficiario:e,valorTotal:a,vencimento:o,itens:n}}function $e(){const t=q.reduce((n,s)=>n+(s.valorTotal!==void 0?s.valorTotal:s.valor||0),0);document.getElementById("badge-total-boletos").textContent=`${l(t)} total`;const e=document.getElementById("lista-boletos-registrados");if(!q.length){e.innerHTML='<div class="empty-state">Nenhum boleto cadastrado ainda.</div>';return}const a={};q.forEach(n=>{const s=n.mesAno||"Outros";a[s]||(a[s]=[]),a[s].push(n)});const o=Object.keys(a).sort((n,s)=>s.localeCompare(n));e.innerHTML=o.map((n,s)=>{const r=a[n];r.sort((u,c)=>{const v=u.dataVencimento?new Date(u.dataVencimento).getTime():0;return(c.dataVencimento?new Date(c.dataVencimento).getTime():0)-v});const i=r.reduce((u,c)=>u+(c.valorTotal!==void 0?c.valorTotal:c.valor||0),0);let m=n;if(n!=="Outros"&&n.includes("-")){const[u,c]=n.split("-"),p=new Date(parseInt(u),parseInt(c)-1,1).toLocaleString("pt-BR",{month:"long"});m=`${p.charAt(0).toUpperCase()+p.slice(1)} de ${u}`}const d=s===0;return`
      <div class="card" style="margin-bottom:1.25rem;background:rgba(15,23,42,0.45);border:1px solid var(--border-color)">
        <div class="card-header" style="cursor:pointer;user-select:none;display:flex;justify-content:space-between;align-items:center" onclick="toggleGroupMonth('bol-group-${n}')">
          <span class="card-title" style="font-size:1.05rem">📄 Boletos de ${m}</span>
          <div style="display:flex;align-items:center;gap:.75rem">
            <span class="badge purple" style="font-size:.85rem">Total: ${l(i)} (${r.length} boleto${r.length>1?"s":""})</span>
            <span class="chevron ${d?"open":""}" id="chev-bol-group-${n}">▼</span>
          </div>
        </div>
        <div id="bol-group-${n}" class="purchase-details ${d?"open":""}" style="padding:.75rem 1rem;display:${d?"block":"none"}">
          ${r.map(u=>{var f;const c=u.valorTotal!==void 0?u.valorTotal:u.valor||0,v=u.dataVencimento?ut(u.dataVencimento).split(",")[0]:"—",p=u.mesAno||"—",g=nt(u);return`
              <div class="purchase-card" style="margin-bottom:1rem">
                <div class="purchase-header" onclick="toggleDetail('bol-${u.id}')">
                  <div class="purchase-info">
                    <h3><span class="badge purple">📄 ${g}</span> — Vencimento: ${v}</h3>
                    <p>📅 Mês Referência: <strong>${p}</strong> &nbsp;•&nbsp; 🛒 ${u.qtdItens||((f=u.itens)==null?void 0:f.length)||1} itens / encargos</p>
                  </div>
                  <div class="purchase-values" style="display:flex;align-items:center;gap:.5rem">
                    <div style="text-align:right">
                      <div class="pv-total" style="color:#c084fc">${l(c)}</div>
                      <div class="pv-sub">Boleto do Mês</div>
                    </div>
                    <button type="button" class="btn-secondary" style="padding:.35rem .65rem;font-size:.78rem;margin-left:.25rem" onclick="event.stopPropagation(); editarValorBoletoDocumento('${u.id}')" title="Editar valor do boleto">
                      ✏️ Editar
                    </button>
                    <button type="button" class="btn-danger" style="padding:.35rem .65rem;font-size:.78rem" onclick="event.stopPropagation(); excluirBoletoDocumento('${u.id}')" title="Excluir este boleto de todos os lugares do sistema">
                      🗑️ Excluir
                    </button>
                  </div>
                  <svg class="chevron" id="chev-bol-${u.id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
                <div class="purchase-details" id="detail-bol-${u.id}">
                  <div class="details-toolbar">
                    <span class="card-subtext">Detalhamento dos Itens / Encargos do Boleto</span>
                    <div style="display:flex;gap:.35rem">
                      <button class="btn-secondary" onclick="editarValorBoletoDocumento('${u.id}')">✏️ Editar Valor</button>
                      <button class="btn-danger" onclick="excluirBoletoDocumento('${u.id}')">🗑️ Excluir Boleto</button>
                    </div>
                  </div>
                  ${Gt(u)}
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `}).join("")}function nt(t){if(!t)return"Boleto";let e=t.descricao;return(!e||e==="Boleto"||e==="Boleto / Conta")&&(t.itens&&t.itens.length>0&&t.itens[0].descricao?e=t.itens[0].descricao:t.beneficiario?e=t.beneficiario:e="Boleto"),e=e.trim().replace(/[-–—\s]+$/,"").trim(),e||"Boleto"}function Gt(t){return t.itens&&t.itens.length>0?`<div class="table-responsive"><table class="custom-table">
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
  </table></div>`}window.editarValorBoletoDocumento=function(t){const e=q.find(s=>s.id===t);if(!e)return;const a=e.valorTotal!==void 0?e.valorTotal:e.valor||0,o=typeof nt=="function"?nt(e):e.descricao||"Boleto";document.getElementById("inp-edit-boleto-id").value=t,document.getElementById("inp-edit-item-index").value="",document.getElementById("inp-edit-boleto-desc").value=o,document.getElementById("inp-edit-boleto-valor").value=a.toFixed(2),document.getElementById("titulo-modal-editar-boleto").textContent="✏️ Editar Valor do Boleto";const n=document.getElementById("modal-editar-boleto");n&&(n.classList.add("active"),setTimeout(()=>{const s=document.getElementById("inp-edit-boleto-valor");s&&(s.focus(),s.select())},100))};window.editarItemBoleto=function(t,e){const a=q.find(r=>r.id===t);if(!a||!a.itens||!a.itens[e])return;const o=a.itens[e],n=o.valor||0;document.getElementById("inp-edit-boleto-id").value=t,document.getElementById("inp-edit-item-index").value=e,document.getElementById("inp-edit-boleto-desc").value=o.descricao||(typeof nt=="function"?nt(a):"Item"),document.getElementById("inp-edit-boleto-valor").value=n.toFixed(2),document.getElementById("titulo-modal-editar-boleto").textContent="✏️ Editar Valor do Item";const s=document.getElementById("modal-editar-boleto");s&&(s.classList.add("active"),setTimeout(()=>{const r=document.getElementById("inp-edit-boleto-valor");r&&(r.focus(),r.select())},100))};window.fecharModalEditarBoleto=function(){const t=document.getElementById("modal-editar-boleto");t&&t.classList.remove("active")};document.getElementById("form-editar-boleto").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-edit-boleto-id").value,a=document.getElementById("inp-edit-item-index").value,o=document.getElementById("inp-edit-boleto-valor").value,n=parseFloat(o);if(!e||isNaN(n)||n<=0){alert("Por favor, informe um valor numérico válido maior que zero.");return}const s=q.find(r=>r.id===e);if(s)try{const r=T(x,et,e);if(a===""){const i={valorTotal:n,valor:n,dataAtualizacao:new Date().toISOString()};if(s.itens&&s.itens.length>0){const m=[...s.itens];m[0]={...m[0],valor:n},i.itens=m}await V(r,i,{merge:!0}),$(`✏️ Valor do boleto atualizado para ${l(n)} em todo o sistema!`)}else{const i=parseInt(a);if(s.itens&&s.itens[i]){const m=[...s.itens];m[i]={...m[i],valor:n};const d=m.reduce((u,c)=>u+(c.valor||0),0);await V(r,{...s,itens:m,valorTotal:d,valor:d,dataAtualizacao:new Date().toISOString()},{merge:!0}),$(`✏️ Item do boleto atualizado para ${l(n)} em todo o sistema!`)}}fecharModalEditarBoleto()}catch(r){alert("Erro ao atualizar valor do boleto: "+r.message)}});window.removerItemBoletoCadastrado=async function(t,e){const a=q.find(s=>s.id===t);if(!a||!a.itens||!confirm("Remover este item do boleto?"))return;const o=[...a.itens];o.splice(e,1);const n=o.reduce((s,r)=>s+(r.valor||0),0);o.length===0?(await H(T(x,et,t)),$("🗑️ Boleto excluído pois todos os itens foram removidos.")):(await V(T(x,et,t),{...a,itens:o,valorTotal:n,qtdItens:o.length}),$("🗑️ Item removido do boleto."))};window.excluirBoletoDocumento=async function(t){const e=q.find(n=>n.id===t),a=e?e.descricao||"Boleto / Conta":"este boleto",o=e?l(e.valorTotal!==void 0?e.valorTotal:e.valor||0):"";confirm(`⚠️ Deseja realmente excluir ${a} ${o?"("+o+")":""}?

Este boleto será removido permanentemente de todos os meses, resumos e relatórios do sistema.`)&&(await H(T(x,et,t)),$("🗑️ Boleto removido de todo o sistema com sucesso."))};document.getElementById("form-config-reservas").addEventListener("submit",async t=>{t.preventDefault();const e=parseFloat(document.getElementById("inp-meta-anual").value)||0,a=parseFloat(document.getElementById("inp-saldo-guardado").value)||0;N.metaAnual=e,N.valorAtualGuardado=a,await V(T(x,St,"config"),{metaAnual:e,valorAtualGuardado:a,dataAtualizacao:new Date().toISOString()}),$("✅ Reservas e configurações de economias salvas!"),W()});function Ie(){const t=N&&N.metaAnual!==void 0?N.metaAnual:15e3,e=N&&N.valorAtualGuardado!==void 0?N.valorAtualGuardado:3e3,a=document.getElementById("inp-meta-anual");a&&document.activeElement!==a&&(a.value=t);const o=document.getElementById("inp-saldo-guardado");o&&document.activeElement!==o&&(o.value=e);const s=new Date().getMonth()+1,r=Math.max(1,12-s+1),i=Math.max(0,t-e),m=i>0?i/r:0;document.getElementById("val-meta-reserva").textContent=l(m);const d=document.getElementById("subtext-meta-reserva");d&&(d.textContent=`Faltam ${l(i)} p/ Meta Anual de ${l(t)} (${r} mês(es) até o fim do ano)`),document.getElementById("val-real-guardado").textContent=l(e);const u=it();let c=0,v=0,p=0,g=0;u.forEach(M=>{const G=j.filter(E=>E.mesAno===M).reduce((E,B)=>E+(B.valor||0),0),z=P.filter(E=>E.mesAno===M).reduce((E,B)=>E+(B.valorTotal!==void 0?B.valorTotal:B.valor||0),0),O=q.filter(E=>E.mesAno===M).reduce((E,B)=>E+(B.valorTotal!==void 0?B.valorTotal:B.valor||0),0);let b=0;k.filter(E=>E.mesAno===M).forEach(E=>{E.formasPagamento&&(b+=E.formasPagamento.cartaoDebito||0)}),c+=G,v+=z,p+=O,g+=b});const f=v+p+g,S=c-f,L=Math.max(1,u.length),F=S/L,w=F>0?F*.5:0,A=w*12;document.getElementById("val-recomendacao-reserva").textContent=l(A);const h=document.getElementById("subtext-recomendacao");h&&(h.textContent=`Sugerido poupar ${l(w)}/mês (${l(A)} no ano)`);const I=document.getElementById("box-analise-reserva-detalhes");if(I)if(c===0)I.innerHTML='<p class="empty-state">Cadastre seus salários e entradas na aba "Salários & Entradas" para gerar o diagnóstico inteligente de economias.</p>';else{const M=t>0?Math.min(100,e/t*100).toFixed(1):0;I.innerHTML=`
        <p style="margin-bottom:.5rem;font-weight:600">
          Com base na soma acumulada de todos os meses (<strong>${l(c)}</strong> Entradas vs <strong>${l(f)}</strong> Saídas Totais):
        </p>
        <div style="background:rgba(15,23,42,0.6);padding:1.1rem;border-radius:10px;margin:.75rem 0;border:1px solid var(--border-color)">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem;flex-wrap:wrap;gap:.75rem">
            <div>
              <span style="font-size:.82rem;color:var(--text-muted);display:block">💰 Saldo Líquido em Conta</span>
              <strong style="font-size:1.15rem;color:#60a5fa">${l(S)}</strong>
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
            <div class="progress-bar-fill" style="width:${M}%;height:100%;background:linear-gradient(90deg,#10b981,#34d399);border-radius:6px"></div>
          </div>

          <div style="display:flex;justify-content:space-between;font-size:.82rem;color:var(--text-muted);margin-top:.4rem;flex-wrap:wrap;gap:.5rem">
            <span>Progresso da Meta: <strong style="color:#34d399">${l(e)}</strong> de ${l(t)} (<strong>${M}%</strong> concluído)</span>
            <span>Faltam guardar: <strong style="color:#fb7185">${l(i)}</strong> nos próximos ${r} mês(es)</span>
          </div>
        </div>

        <p style="font-size:.85rem;color:var(--text-muted);line-height:1.45">
          💡 <strong>Planejamento do Sistema:</strong> Guardando <strong style="color:#34d399">${l(m)}/mês</strong> durante os próximos <strong>${r} mês(es)</strong>, você atingirá com 100% de precisão sua Meta Anual de <strong>${l(t)}</strong> (considerando seu saldo atual guardado de <strong>${l(e)}</strong>)!
        </p>
      `}xe()}function xe(){const t=document.getElementById("container-analise-mensal-lista");if(!t)return;const e=it();if(!e.length){t.innerHTML='<div class="empty-state">Nenhum mês registrado para gerar a análise mensal.</div>';return}const a=e.map(o=>{const s=j.filter(h=>h.mesAno===o).reduce((h,I)=>h+(I.valor||0),0),r=P.filter(h=>h.mesAno===o),i=r.reduce((h,I)=>h+(I.valorTotal!==void 0?I.valorTotal:I.valor||0),0),m=q.filter(h=>h.mesAno===o),d=m.reduce((h,I)=>h+(I.valorTotal!==void 0?I.valorTotal:I.valor||0),0),u=k.filter(h=>h.mesAno===o);let c=0;u.forEach(h=>{h.formasPagamento&&(c+=h.formasPagamento.cartaoDebito||0)});const v=i+d+c,p=s-v,g=p>=0,[f,S]=o.split("-"),F=new Date(parseInt(f),parseInt(S)-1,1).toLocaleString("pt-BR",{month:"long"}),w=F.charAt(0).toUpperCase()+F.slice(1);let A="";if(g){const h=p*.5;A=`
        <div style="background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.25); border-radius:10px; padding:.85rem 1rem; margin-top:1rem">
          <div style="font-weight:700; font-size:.88rem; color:#34d399; margin-bottom:.2rem">
            🎉 Mês Positivo! Capacidade de Poupança Excelente
          </div>
          <p style="font-size:.8rem; color:var(--text-muted); margin:0">
            Neste mês sobraram <strong>${l(p)}</strong> em conta. O sistema sugere destinar pelo menos <strong style="color:#34d399">${l(h)}</strong> para sua reserva!
          </p>
        </div>
      `}else{const h=Math.abs(p);let I="Cartão de Crédito",M=i;d>M&&(I="Boletos & Contas",M=d),c>M&&(I="Mercado no Débito",M=c);const G=v>0?(M/v*100).toFixed(1):0;let z="",O=0;r.forEach(b=>{const E=b.valorTotal!==void 0?b.valorTotal:b.valor||0;E>O&&(O=E,z=`Fatura do ${b.cartao||"Cartão"}`)}),m.forEach(b=>{const E=b.valorTotal!==void 0?b.valorTotal:b.valor||0;E>O&&(O=E,z=`Boleto ${b.descricao||"de Conta"}`)}),A=`
        <div style="background:rgba(244,63,94,0.1); border:1px solid rgba(244,63,94,0.3); border-radius:10px; padding:.85rem 1rem; margin-top:1rem">
          <div style="font-weight:700; font-size:.88rem; color:#fb7185; margin-bottom:.4rem; display:flex; align-items:center; gap:.4rem">
            ⚠️ O que causou o déficit em ${w}/${f}?
          </div>
          <p style="font-size:.82rem; color:var(--text-main); margin-bottom:.5rem; line-height:1.5">
            As saídas (<strong>${l(v)}</strong>) superaram as entradas (<strong>${l(s)}</strong>) em <strong style="color:#fb7185">${l(h)}</strong>.
          </p>
          <div style="font-size:.78rem; color:var(--text-muted); line-height:1.5">
            • <strong>Vilão Principal:</strong> A categoria <strong style="color:#f8fafc">${I}</strong> representou <strong>${G}%</strong> de todas as saídas do mês (${l(M)}).
            ${z?`<br>• <strong>Maior Despesa Registrada:</strong> ${z} no valor de <strong style="color:#fb7185">${l(O)}</strong>.`:""}
          </div>
        </div>
      `}return`
      <div class="card" style="margin-bottom:1.25rem; border-color:${g?"rgba(52,211,153,0.3)":"rgba(251,113,133,0.4)"}">
        <div class="card-header" style="flex-wrap:wrap; gap:.5rem">
          <div style="display:flex; align-items:center; gap:.5rem">
            <span class="card-title" style="font-size:1rem; color:#f8fafc">📅 ${w} de ${f}</span>
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
            <div style="font-weight:700; font-size:1rem; color:#fb7185">${l(i)}</div>
          </div>

          <div style="background:rgba(15,23,42,0.6); padding:.6rem .8rem; border-radius:8px; border:1px solid var(--border-color)">
            <div style="font-size:.75rem; color:var(--text-muted)">Boletos & Contas</div>
            <div style="font-weight:700; font-size:1rem; color:#c084fc">${l(d)}</div>
          </div>

          <div style="background:rgba(15,23,42,0.6); padding:.6rem .8rem; border-radius:8px; border:1px solid var(--border-color)">
            <div style="font-size:.75rem; color:var(--text-muted)">Mercado (Débito)</div>
            <div style="font-weight:700; font-size:1rem; color:#fbbf24">${l(c)}</div>
          </div>

          <div style="background:rgba(15,23,42,0.8); padding:.6rem .8rem; border-radius:8px; border:1px solid ${g?"#34d399":"#fb7185"}">
            <div style="font-size:.75rem; color:var(--text-muted)">Saldo Líquido no Mês</div>
            <div style="font-weight:800; font-size:1.05rem; color:${g?"#60a5fa":"#fb7185"}">${l(p)}</div>
          </div>
        </div>

        ${A}
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
  `}const gt=[{id:"est_1",nome:"Corte de Cabelo Victor",quantidade:2,valorUnitario:70},{id:"est_2",nome:"Compra Programada Tunico",quantidade:1,valorUnitario:150},{id:"est_3",nome:"Sobrancelha Maria",quantidade:1,valorUnitario:50},{id:"est_4",nome:"Unha Maria",quantidade:1,valorUnitario:90},{id:"est_5",nome:"Banho Tunico",quantidade:1,valorUnitario:65},{id:"est_6",nome:"Saída Simples",quantidade:2,valorUnitario:100},{id:"est_7",nome:"Saída Premiun",quantidade:1,valorUnitario:150},{id:"est_8",nome:"Saída Premiun Plus",quantidade:1,valorUnitario:200},{id:"est_9",nome:"Mercado Pontual",quantidade:4,valorUnitario:70},{id:"est_10",nome:"Farmacia",quantidade:2,valorUnitario:35},{id:"est_11",nome:"Padaria 3D",quantidade:10,valorUnitario:10}];window.abrirModalAddEstimativa=function(t=null){const e=document.getElementById("modal-add-estimativa");if(e){if(document.getElementById("inp-est-id").value=t||"",t){document.getElementById("titulo-modal-estimativa").textContent="✏️ Editar Gastos Previsto";const a=Z.find(n=>n.id===y),o=((a==null?void 0:a.itens)||[]).find(n=>n.id===t);o&&(document.getElementById("inp-est-nome").value=o.nome||"",document.getElementById("inp-est-qtd").value=o.quantidade||1,document.getElementById("inp-est-val").value=o.valorUnitario||0)}else document.getElementById("titulo-modal-estimativa").textContent="➕ Adicionar Gastos Previsto",document.getElementById("inp-est-nome").value="",document.getElementById("inp-est-qtd").value=1,document.getElementById("inp-est-val").value="";e.classList.add("active")}};window.fecharModalAddEstimativa=function(){var t;(t=document.getElementById("modal-add-estimativa"))==null||t.classList.remove("active")};var Tt;(Tt=document.getElementById("form-item-estimativa"))==null||Tt.addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-est-id").value,a=document.getElementById("inp-est-nome").value.trim(),o=parseFloat(document.getElementById("inp-est-qtd").value)||1,n=parseFloat(document.getElementById("inp-est-val").value)||0;if(!a){alert("Preencha a descrição do gasto.");return}const s=Z.find(i=>i.id===y);let r=s?[...s.itens||[]]:[...gt];e?r=r.map(i=>i.id===e?{...i,nome:a,quantidade:o,valorUnitario:n}:i):r.push({id:"est_"+Date.now(),nome:a,quantidade:o,valorUnitario:n}),await V(T(x,K,y),{mesAno:y,itens:r,ultimaAtualizacao:new Date().toISOString()}),fecharModalAddEstimativa(),$("✅ Estimativa atualizada!")});window.atualizarQtdItemEstimativa=async function(t,e){const a=Z.find(s=>s.id===y);if(!a)return;const o=Math.max(1,parseInt(e)||1),n=(a.itens||[]).map(s=>s.id===t?{...s,quantidade:o}:s);await V(T(x,K,y),{mesAno:y,itens:n,ultimaAtualizacao:new Date().toISOString()})};window.atualizarValorItemEstimativa=async function(t,e){const a=Z.find(s=>s.id===y);if(!a)return;const o=Math.max(0,parseFloat(e)||0),n=(a.itens||[]).map(s=>s.id===t?{...s,valorUnitario:o}:s);await V(T(x,K,y),{mesAno:y,itens:n,ultimaAtualizacao:new Date().toISOString()})};window.excluirItemEstimativa=async function(t){if(!confirm("Remover este item da estimativa do mês?"))return;const e=Z.find(o=>o.id===y);if(!e)return;const a=(e.itens||[]).filter(o=>o.id!==t);await V(T(x,K,y),{mesAno:y,itens:a,ultimaAtualizacao:new Date().toISOString()}),$("🗑️ Item removido da estimativa.")};window.resetarItensEstimativaPadrao=async function(){confirm(`Deseja carregar/resetar os 11 itens padrão de previsão para ${y}?`)&&(await V(T(x,K,y),{mesAno:y,itens:gt,ultimaAtualizacao:new Date().toISOString()}),$("🔄 Itens padrão de estimativa carregados!"))};function we(){const t=document.getElementById("container-lista-estimativa");if(!t)return;const e=Z.find(p=>p.id===y);let a=[];e&&Array.isArray(e.itens)?a=e.itens:(a=gt,V(T(x,K,y),{mesAno:y,itens:gt,ultimaAtualizacao:new Date().toISOString()}).catch(p=>console.error("Auto init estimativa error:",p)));let o=0;a.forEach(p=>{o+=(p.quantidade||0)*(p.valorUnitario||0)});const n=document.getElementById("val-total-estimativa-mes");n&&(n.textContent=l(o));const[s,r]=y.split("-"),m=new Date(parseInt(s),parseInt(r)-1,1).toLocaleString("pt-BR",{month:"long"}),d=m.charAt(0).toUpperCase()+m.slice(1),u=document.getElementById("subtext-estimativa-mes");u&&(u.textContent=`Total previsto para ${d} de ${s} (${a.length} itens cadastrados)`);const c=document.getElementById("badge-count-estimativa");if(c&&(c.textContent=`${a.length} itens previstos`),!a.length){t.innerHTML=`
      <div class="empty-state">
        <p>Nenhum gasto estimado para ${y}.</p>
        <button class="btn-secondary" onclick="resetarItensEstimativaPadrao()" style="margin-top:.5rem">
          🔄 Carregar Itens Padrão
        </button>
      </div>
    `;return}const v=`
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
          ${a.map(p=>{const g=(p.quantidade||0)*(p.valorUnitario||0);return`
              <tr>
                <td>
                  <strong style="color:#f8fafc">${p.nome}</strong>
                </td>
                <td class="num">
                  <input type="number" min="1" step="1" class="form-control" style="width:70px;padding:.2rem .4rem;font-size:.82rem;text-align:center" value="${p.quantidade}" onchange="atualizarQtdItemEstimativa('${p.id}', this.value)">
                </td>
                <td class="num">
                  <input type="number" min="0" step="0.01" class="form-control" style="width:95px;padding:.2rem .4rem;font-size:.82rem;text-align:right" value="${p.valorUnitario}" onchange="atualizarValorItemEstimativa('${p.id}', this.value)">
                </td>
                <td class="num">
                  <strong style="color:#a5b4fc">${l(g)}</strong>
                </td>
                <td style="text-align:right">
                  <div style="display:flex;gap:.35rem;justify-content:flex-end">
                    <button type="button" class="btn-secondary" style="padding:.2rem .4rem;font-size:.75rem" onclick="abrirModalAddEstimativa('${p.id}')" title="Editar">✏️</button>
                    <button type="button" class="btn-danger" style="padding:.2rem .4rem;font-size:.75rem" onclick="excluirItemEstimativa('${p.id}')" title="Excluir">🗑️</button>
                  </div>
                </td>
              </tr>
            `}).join("")}
        </tbody>
      </table>
    </div>
  `;t.innerHTML=v}function Be(){const t=document.getElementById("lista-mensal-container");if(!t)return;const e=new Date,a=new Date(e.getFullYear(),e.getMonth()+1,1),o=a.toLocaleString("pt-BR",{month:"long"}),n=a.getFullYear(),s=`${o.charAt(0).toUpperCase()+o.slice(1)} de ${n}`,r=re(a.getFullYear(),a.getMonth()),i=31.8,m=20,d=r*i,u=r*m,c={};let v=0;k.forEach(b=>{const E=b.valorAPagar||0;v+=E;const B=b.mesAno||"Outros";c[B]=(c[B]||0)+E});const p=Math.max(1,Object.keys(c).length),g=v/p,f={};k.forEach(b=>{(b.itens||[]).forEach(E=>{const B=(E.nome||"").toLowerCase().trim();B&&(f[B]||(f[B]={nome:E.nome,marca:E.marca||"Geral",qtdTotal:0,frequenciaNotas:0,valoresUnitarios:[]}),f[B].qtdTotal+=E.quantidade||1,f[B].frequenciaNotas+=1,E.valorUnitario&&f[B].valoresUnitarios.push(E.valorUnitario))})});const S=Object.values(f).map(b=>{const E=b.valoresUnitarios.length>0?b.valoresUnitarios.reduce((dt,vt)=>dt+vt,0)/b.valoresUnitarios.length:0,B=b.qtdTotal/p,at=p/Math.max(1,b.frequenciaNotas),pt=b.frequenciaNotas/p;let _=0;pt>=.35||B>=.7?_=Math.ceil(B):_=Math.round(B),_<1&&b.frequenciaNotas>=p&&(_=1);const lt=_*E;return{nome:b.nome,marca:b.marca,frequenciaNotas:b.frequenciaNotas,intervaloMeses:at,qtdMensalTaxa:B,totalEstimadoUnidades:_,valorUnitario:E,subtotalCalculado:lt}}).filter(b=>b.totalEstimadoUnidades>0);S.sort((b,E)=>E.frequenciaNotas-b.frequenciaNotas);const L=S.reduce((b,E)=>b+E.subtotalCalculado,0),F=g>0?g*1.05:L;let w=1;L>F&&g>0&&(w=F/L);const A=S.map(b=>({...b,subtotalFinal:b.subtotalCalculado*w})),h=g>0?Math.min(L,F):L;let I=h;const M=Math.min(I,d);I-=M;const G=Math.min(I,u);I-=G;const z=I>0?I:0;let O=`
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
          <div class="p-val" style="color:#34d399;">${l(M)} <span style="font-size:0.75rem;font-weight:normal;color:var(--text-muted)">/ ${l(d)}</span></div>
        </div>
        <div class="payment-item" style="border-color: rgba(99,102,241,0.4);">
          <div class="p-label">💳 Cartão Crédito (${r}d × R$ 20,00)</div>
          <div class="p-val" style="color:#818cf8;">${l(G)} <span style="font-size:0.75rem;font-weight:normal;color:var(--text-muted)">/ ${l(u)}</span></div>
        </div>
        <div class="payment-item" style="border-color: ${z>0?"rgba(244,63,94,0.5)":"var(--border-color)"};">
          <div class="p-label">💳 Débito Necessário (Excedente)</div>
          <div class="p-val" style="color: ${z>0?"#fb7185":"var(--text-muted)"};">${l(z)}</div>
        </div>
      </div>

      <div style="margin-top:1.25rem; padding-top:1rem; border-top:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
        <div>
          <span style="font-size:0.85rem; color:var(--text-muted);">Total Estimado da Lista de Compras:</span>
          <p style="font-size:0.75rem; color:#60a5fa;">Média Histórica de Gastos: ${l(g)}</p>
        </div>
        <span style="font-size:1.6rem; font-weight:800; color:var(--primary);">${l(h)}</span>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-title">Lista de Itens com Frequência e Total Estimado</span>
        <span class="badge amber">${A.length} itens cadastrados</span>
      </div>
      <p class="card-subtext" style="margin-bottom:1rem;">
        O <strong>Total Estimado</strong> arredonda o consumo médio para cima (unidades inteiras exatas), pois os produtos são comprados por unidade no mercado.
      </p>
  `;window.dadosListaMensalCache={mesAnoStr:s,diasUteis:r,totalGeralEstimado:h,cobertoAlim:M,cobertoCred:G,cobertoDeb:z,alimDisponivel:d,credDisponivel:u,lista:A},A.length===0?O+='<div class="empty-state">Adicione notas fiscais para que o sistema gere automaticamente sua lista mensal de compras.</div></div>':O+=`
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
            ${A.map(b=>{const E=b.intervaloMeses>1.2?`A cada ${b.intervaloMeses.toFixed(1)} meses`:`Todo mês (${b.frequenciaNotas}x)`,B=b.qtdMensalTaxa<1?b.qtdMensalTaxa.toFixed(2):b.qtdMensalTaxa.toFixed(1),at=b.totalEstimadoUnidades.toFixed(1);return`
                <tr>
                  <td><strong>${b.nome}</strong></td>
                  <td><span class="badge amber">${b.marca}</span></td>
                  <td><span class="badge cyan">${E}</span></td>
                  <td class="num">${B} un/mês</td>
                  <td class="num"><span class="badge green" style="font-size:0.82rem;">${at}</span></td>
                  <td class="num">${l(b.valorUnitario)}</td>
                  <td class="num"><strong>${l(b.subtotalFinal)}</strong></td>
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
    </div>`,t.innerHTML=O}window.exportarPDFListaMensal=function(){if(!window.dadosListaMensalCache||!window.dadosListaMensalCache.lista.length){$("⚠️ Nenhuma lista mensal disponível para exportar.");return}const{mesAnoStr:t,diasUteis:e,totalGeralEstimado:a,cobertoAlim:o,cobertoCred:n,cobertoDeb:s,lista:r}=window.dadosListaMensalCache,i=window.open("","_blank","width=900,height=750");if(!i){alert("Permita pop-ups no navegador para gerar o PDF da lista.");return}const m=`
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
          ${r.map(d=>`
            <tr>
              <td class="check-col"><div class="chk-box"></div></td>
              <td><strong>${d.nome}</strong></td>
              <td>${d.marca}</td>
              <td class="num"><strong>${d.totalEstimadoUnidades.toFixed(1)} un</strong></td>
              <td class="num">${l(d.valorUnitario)}</td>
              <td class="num"><strong>${l(d.subtotalFinal)}</strong></td>
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
  `;i.document.open(),i.document.write(m),i.document.close()};document.getElementById("btn-start-cam").addEventListener("click",_t);document.getElementById("btn-switch-cam").addEventListener("click",Ae);document.getElementById("btn-stop-cam").addEventListener("click",It);async function _t(){if(typeof Html5Qrcode>"u")return U("Carregando biblioteca de câmera, aguarde..."),setTimeout(_t,600);try{J||(J=new Html5Qrcode("qr-reader")),Q=await Html5Qrcode.getCameras();let t;if(Q&&Q.length>0){const e=Q.findIndex(a=>/back|traseira|rear|environment/i.test(a.label));ct=e>=0?e:0,t=Q[ct].id}else t={facingMode:"environment"};await J.start(t,{fps:10,qrbox:{width:240,height:240}},Qt,()=>{}),mt=!0,document.getElementById("btn-start-cam").style.display="none",document.getElementById("btn-switch-cam").style.display=Q.length>1?"inline-flex":"none",document.getElementById("btn-stop-cam").style.display="inline-flex"}catch(t){U("❌ Não foi possível acessar a câmera. Verifique as permissões do navegador."),console.error(t)}}async function Ae(){if(!(!J||!mt))try{await J.stop(),Q.length>1&&(ct=(ct+1)%Q.length,await J.start(Q[ct].id,{fps:10,qrbox:{width:240,height:240}},Qt,()=>{}))}catch(t){console.error("switchCam:",t)}}async function It(){if(J&&mt)try{await J.stop()}catch{}mt=!1,document.getElementById("btn-start-cam").style.display="inline-flex",document.getElementById("btn-switch-cam").style.display="none",document.getElementById("btn-stop-cam").style.display="none"}async function Qt(t){It(),document.getElementById("inp-url").value=t,U("✅ QR Code lido! Processando..."),await Zt(t)}document.getElementById("btn-carregar-dados").addEventListener("click",async()=>{const t=document.getElementById("inp-url").value.trim(),e=document.getElementById("inp-html").value.trim();if(!t&&!e){U("⚠️ Cole a URL do QR Code ou o conteúdo da página para ler a nota fiscal.");return}if(t&&!e){U("⏳ Consultando nota fiscal..."),await Zt(t);return}if(e){U("⏳ Processando conteúdo..."),await Wt(e);return}});document.getElementById("btn-preencher-manual").addEventListener("click",()=>{Yt({nomeMercado:"",dataEmissao:new Date().toISOString(),valorTotal:0,descontoTotal:0,valorAPagar:0,qtdTotalItens:0,formasPagamento:{valeAlimentacao:0,cartaoCredito:0,cartaoDebito:0},itens:[]}),U("✍️ Preencha os dados da compra abaixo e clique em Salvar Nota Fiscal.","var(--accent-cyan)")});function Yt(t){var s,r,i;document.getElementById("inp-mercado").value=t.nomeMercado||"",document.getElementById("inp-data").value=se(t.dataEmissao),document.getElementById("inp-vtotal").value=t.valorTotal!==void 0?t.valorTotal:0,document.getElementById("inp-desconto").value=t.descontoTotal!==void 0?t.descontoTotal:0,document.getElementById("inp-pagar").value=t.valorAPagar!==void 0?t.valorAPagar:0,document.getElementById("inp-qtd").value=t.qtdTotalItens!==void 0?t.qtdTotalItens:0,document.getElementById("inp-alim").value=((s=t.formasPagamento)==null?void 0:s.valeAlimentacao)||0,document.getElementById("inp-cred").value=((r=t.formasPagamento)==null?void 0:r.cartaoCredito)||0,document.getElementById("inp-deb").value=((i=t.formasPagamento)==null?void 0:i.cartaoDebito)||0,tt=t.itens||[];const e=document.getElementById("form-nfce");e.style.display="block";const a=document.getElementById("preview-itens-box"),o=document.getElementById("count-preview-itens"),n=document.getElementById("lista-preview-itens");tt.length>0?(a.style.display="block",o.textContent=tt.length,n.innerHTML=tt.map(m=>`
      <div style="display:flex; justify-content:space-between; padding: 0.35rem 0; border-bottom: 1px dashed var(--border-color);">
        <span><strong>${m.nome}</strong> (${m.quantidade} ${m.unidade||"Un"})</span>
        <span>${l(m.valorUnitario)}/un = <strong>${l(m.valorTotal)}</strong></span>
      </div>
    `).join("")):a.style.display="none",e.scrollIntoView({behavior:"smooth"})}document.getElementById("form-nfce").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-mercado").value.trim()||"Mercado",a=document.getElementById("inp-data").value||new Date().toISOString(),o=parseFloat(document.getElementById("inp-vtotal").value)||0,n=parseFloat(document.getElementById("inp-desconto").value)||0,s=parseFloat(document.getElementById("inp-pagar").value)||0,r=parseInt(document.getElementById("inp-qtd").value)||0,i=parseFloat(document.getElementById("inp-alim").value)||0,m=parseFloat(document.getElementById("inp-cred").value)||0,d=parseFloat(document.getElementById("inp-deb").value)||0,u=new Date(a).toISOString().slice(0,16),c=k.find(g=>{const f=new Date(g.dataEmissao).toISOString().slice(0,16),S=Math.abs((g.valorAPagar||0)-s)<.05,L=(g.nomeMercado||"").toLowerCase().trim()===e.toLowerCase().trim();return f===u&&S&&L});if(c){U(`⚠️ Esta nota fiscal já existe no sistema (Cadastrada em ${ut(c.dataEmissao)} no valor de ${l(c.valorAPagar)}). Nota não adicionada!`,"#fb7185"),$("⚠️ Nota fiscal já cadastrada! Operação cancelada.");return}const v=new Date(a),p=`${v.getFullYear()}-${String(v.getMonth()+1).padStart(2,"0")}`;U("⏳ Salvando nota fiscal no banco...");try{await ft(Y(x,bt),{nomeMercado:e,dataEmissao:a,mesAno:p,qtdTotalItens:r||tt.length,valorTotal:o,descontoTotal:n,valorAPagar:s,formasPagamento:{valeAlimentacao:i,cartaoCredito:m,cartaoDebito:d},itens:tt,createdAt:Et()}),U("✅ Nota salva com sucesso!","#34d399"),document.getElementById("form-nfce").style.display="none",document.getElementById("form-nfce").reset(),document.getElementById("inp-url").value="",document.getElementById("inp-html").value="",tt=[],Lt(),goTab("dashboard"),$("🎉 Nota fiscal registrada no Firebase!")}catch(g){U("❌ Erro ao salvar: "+g.message,"#fb7185")}});async function Zt(t){const e=[a=>`https://api.allorigins.win/raw?url=${encodeURIComponent(a)}`,a=>`https://corsproxy.io/?${encodeURIComponent(a)}`];for(const a of e)try{const o=await fetch(a(t),{signal:AbortSignal.timeout(8e3)});if(o.ok){const n=await o.text();if(n&&n.length>200){await Wt(n);return}}}catch{}Te(t)}function Te(t){document.getElementById("modal-link").href=t,document.getElementById("modal-cors").classList.add("active"),U("⚠️ Abra o link, copie o conteúdo da página e cole no campo de texto abaixo.")}async function Wt(t){const e=Me(t);Yt(e),U("✅ Nota lida com sucesso! Confira os valores abaixo e altere se necessário antes de Salvar.","#34d399")}function Me(t){var M,G,z;const a=new DOMParser().parseFromString(t,"text/html"),o=((M=a.body)==null?void 0:M.textContent)||t;let n=((z=(G=a.querySelector(".txtTopo, .nomeEmit, h1"))==null?void 0:G.textContent)==null?void 0:z.trim())||"Mercado",s=new Date().toISOString();const r=o.match(/Emiss[ãa]o\s*[:\-]?\s*(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})?/i)||o.match(/(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})/);if(r){const[O,b,E]=r[1].split("/");s=`${E}-${b}-${O}T${r[2]||"12:00:00"}`}const i=o.match(/Qtd\.?\s*total\s*de\s*itens\s*[:\s]*([\d,\.]+)/i),m=o.match(/Valor\s*total\s*R\$\s*[:\s]*([\d\.,]+)/i),d=o.match(/Descontos?\s*R\$\s*[:\s]*([\d\.,]+)/i),u=o.match(/Valor\s*a\s*pagar\s*R\$\s*[:\s]*([\d\.,]+)/i)||o.match(/VALOR\s*PAGO\s*R\$\s*[:\s]*([\d\.,]+)/i),c=o.match(/(?:Vale\s*)?Alimenta[çc][ãa]o\s*[:\s]*([\d\.,]+)/i),v=o.match(/(?:Cart[ãa]o\s*de\s*)?Cr[eé]dito\s*[:\s]*([\d\.,]+)/i),p=o.match(/(?:Cart[ãa]o\s*de\s*)?D[eé]bito\s*[:\s]*([\d\.,]+)/i),g=i?R(i[1]):0,f=m?R(m[1]):0,S=d?R(d[1]):0;let L=u?R(u[1]):f-S;const F={valeAlimentacao:c?R(c[1]):0,cartaoCredito:v?R(v[1]):0,cartaoDebito:p?R(p[1]):0},w=[];a.querySelectorAll("tr, .item, .itemNota").forEach(O=>{var xt;const b=O.textContent;if(!/Vl\.\s*Unit|valorUnitario|Qtde?\./i.test(b))return;const E=O.querySelector(".txtTit, .txtTit2, .nomeProd"),B=((xt=E==null?void 0:E.textContent)==null?void 0:xt.trim())||"",at=b.match(/Qtde?\.\s*[:\s]*([\d,\.]+)/i),pt=b.match(/Vl\.\s*Unit\.\s*[:\s]*([\d,\.]+)/i),_=b.match(/Vl\.\s*Total\s*([\d,\.]+)/i),lt=b.match(/C[oó]digo\s*[:\s]*(\d+)/i),dt=b.match(/UN\s*[:\s]*([A-Za-z]+)/i),vt=at?R(at[1]):1,yt=pt?R(pt[1]):0,Kt=_?R(_[1]):yt*vt;B&&yt>0&&w.push({codigo:(lt==null?void 0:lt[1])||"",nome:B,marca:Ce(B),quantidade:vt,unidade:(dt==null?void 0:dt[1])||"Un",valorUnitario:yt,valorTotal:Kt})});const h=new Date(s),I=`${h.getFullYear()}-${String(h.getMonth()+1).padStart(2,"0")}`;return{nomeMercado:n,dataEmissao:s,mesAno:I,qtdTotalItens:g,valorTotal:f,descontoTotal:S,valorAPagar:L,formasPagamento:F,itens:w}}function Ce(t){const e=["BAUDUCCO","BAUD","PANCO","DANONE","NESTLE","QUALITA","SADIA","PERDIGAO","SEARA","CAMIL","TIO JOAO","URBANO","LIZA","SOYA","YPE","PILAO","MELITTA","3 CORACOES","VIGOR","PARMALAT","ITALAC","HEINZ","KRAFT"],a=t.toUpperCase();for(const o of e)if(a.includes(o))return o;return a.split(" ")[0]||"Genérica"}function Se(){const t=document.getElementById("lista-historico");if(!k.length){t.innerHTML='<div class="empty-state">📭 Nenhuma compra cadastrada ainda.</div>';return}t.innerHTML=k.map(e=>{var a,o,n;return`
    <div class="purchase-card">
      <div class="purchase-header" onclick="toggleDetail('${e.id}')">
        <div class="purchase-info">
          <h3>${e.nomeMercado||"Mercado"}</h3>
          <p>📅 ${ut(e.dataEmissao)} &nbsp;•&nbsp; 🛒 ${e.qtdTotalItens||0} itens</p>
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
        ${Jt(e)}
      </div>
    </div>`}).join("")}function Jt(t){return!t.itens||!t.itens.length?'<p class="card-subtext">Nenhum item detalhado registrado.</p>':`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Item</th><th>Marca</th><th class="num">Qtd</th><th class="num">Vl. Unit.</th><th class="num">Vl. Total</th></tr></thead>
    <tbody>${t.itens.map(e=>`<tr>
      <td>${e.nome}</td>
      <td><span class="badge amber">${e.marca||"—"}</span></td>
      <td class="num">${e.quantidade} ${e.unidade||"Un"}</td>
      <td class="num">${l(e.valorUnitario)}</td>
      <td class="num"><strong>${l(e.valorTotal)}</strong></td>
    </tr>`).join("")}</tbody>
  </table></div>`}window.toggleDetail=function(t){let e=document.getElementById("detail-"+t)||document.getElementById(t);!e&&t.startsWith("detail-")&&(e=document.getElementById(t.replace("detail-","")));let a=document.getElementById("chev-"+t)||document.getElementById("chev-"+t.replace("detail-",""));e&&e.classList.toggle("open"),a&&a.classList.toggle("open")};window.toggleGroupMonth=function(t){const e=document.getElementById(t),a=document.getElementById("chev-"+t);if(!e)return;const o=e.style.display==="none"||!e.style.display;e.style.display=o?"block":"none",a&&(o?a.classList.add("open"):a.classList.remove("open"))};window.confirmarExcluirMercado=async function(t){if(confirm("Excluir esta compra de mercado?"))try{await H(T(x,bt,t)),$("🗑️ Compra excluída.")}catch(e){alert("Erro: "+e.message)}};function De(){const t=document.getElementById("lista-comparacao"),e={};k.forEach(o=>{(o.itens||[]).forEach(n=>{var r;const s=((r=n.nome)==null?void 0:r.toLowerCase().trim())||"produto";e[s]||(e[s]={nome:n.nome,marca:n.marca,hist:{}}),e[s].hist[o.mesAno]=n.valorUnitario})});const a=Object.values(e);if(!a.length){t.innerHTML='<div class="empty-state">Adicione notas para ver a comparação de preços unitários.</div>';return}t.innerHTML=`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Produto</th><th>Marca</th><th>Histórico (Unitário)</th><th>Variação</th></tr></thead>
    <tbody>${a.map(o=>{const n=Object.keys(o.hist).sort();let s=n.map(i=>`${i}: <strong>${l(o.hist[i])}</strong>`).join(" → "),r='<span class="badge cyan">Estável</span>';if(n.length>=2){const i=o.hist[n[n.length-2]],d=o.hist[n[n.length-1]]-i,u=(d/i*100).toFixed(1);d>.01?r=`<span class="badge red">+${u}% ↑</span>`:d<-.01&&(r=`<span class="badge green">${u}% ↓</span>`)}return`<tr><td><strong>${o.nome}</strong></td><td><span class="badge amber">${o.marca||"—"}</span></td><td>${s}</td><td>${r}</td></tr>`}).join("")}</tbody>
  </table></div>`}function Le(){const t=document.getElementById("lista-recorrencia"),e=document.getElementById("lista-marcas"),a={},o={};k.forEach(r=>{(r.itens||[]).forEach(i=>{var c;const m=(c=i.nome)==null?void 0:c.toLowerCase().trim();if(!m)return;a[m]||(a[m]={nome:i.nome,marca:i.marca,qtd:0,notas:0,units:[]}),a[m].qtd+=i.quantidade||1,a[m].notas+=1,a[m].units.push(i.valorUnitario||0);const d=(i.nome||"").split(" ")[0].toUpperCase();o[d]||(o[d]={});const u=i.marca||"Genérica";o[d][u]||(o[d][u]=[]),o[d][u].push(i.valorUnitario||0)})});const n=Object.values(a).filter(r=>r.notas>1).sort((r,i)=>i.notas-r.notas);t.innerHTML=n.length?`<div class="table-responsive"><table class="custom-table">
        <thead><tr><th>Item</th><th>Marca</th><th>Compras</th><th class="num">Qtd Total</th><th class="num">Média Unitária</th></tr></thead>
        <tbody>${n.map(r=>{const i=r.units.reduce((m,d)=>m+d,0)/r.units.length;return`<tr>
            <td><strong>${r.nome}</strong></td>
            <td><span class="badge amber">${r.marca||"—"}</span></td>
            <td><span class="badge green">${r.notas}x</span></td>
            <td class="num">${r.qtd}</td>
            <td class="num">${l(i)}</td>
          </tr>`}).join("")}</tbody>
      </table></div>`:'<div class="empty-state">Adicione notas para ver a recorrência de itens.</div>';const s=Object.entries(o).filter(([,r])=>Object.keys(r).length>1).map(([r,i])=>{let m=1/0,d="";const u=Object.entries(i).map(([c,v])=>{const p=v.reduce((g,f)=>g+f,0)/v.length;return p<m&&(m=p,d=c),{marca:c,med:p}});return`<div class="brand-card">
      <div class="brand-card-header">
        <span class="card-title">${r}</span>
        <span class="badge green">🏆 Menor preço: ${d} (${l(m)}/un)</span>
      </div>
      <div class="brands-row">
        ${u.map(c=>`<div class="brand-chip${c.marca===d?" best":""}">
          <div class="bc-name">${c.marca} ${c.marca===d?"✅":""}</div>
          <div class="bc-val">${l(c.med)}<span style="font-size:.7rem;font-weight:400">/un</span></div>
        </div>`).join("")}
      </div>
    </div>`}).join("");e.innerHTML=s||'<div class="empty-state">Ao comprar o mesmo tipo de produto com marcas diferentes, o sistema mostrará qual teve menor preço.</div>'}document.getElementById("btn-modal-close").addEventListener("click",()=>{document.getElementById("modal-cors").classList.remove("active")});
