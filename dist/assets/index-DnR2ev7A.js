import{initializeApp as ee}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";import{getFirestore as ae,onSnapshot as rt,query as oe,collection as J,orderBy as ne,doc as L,deleteDoc as Z,setDoc as H,addDoc as ft,serverTimestamp as $t}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function a(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(n){if(n.ep)return;n.ep=!0;const s=a(n);fetch(n.href,s)}})();const Mt=document.createElement("script");Mt.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js";document.head.appendChild(Mt);const St=document.createElement("script");St.src="https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js";document.head.appendChild(St);const se={apiKey:"AIzaSyANpFnEIkyN1XCT6qbtmVR9wx7sQHEsyrE",authDomain:"comprasmercado-23913.firebaseapp.com",projectId:"comprasmercado-23913",storageBucket:"comprasmercado-23913.firebasestorage.app",messagingSenderId:"317518149234",appId:"1:317518149234:web:94f38624d68a2b9a6634eb",measurementId:"G-2XP88EK37S"},re=ee(se),B=ae(re),bt="compras",it="entradas",nt="faturas",ot="boletos",Dt="reservas",tt="estimativas";let U=[],Q=[],V=[],N=[],K=[],_={valorAtualGuardado:0},ht=null,X=null,Y=[],mt=0,ut=!1,at=[];function i(e){return Number(e||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}function q(e){if(typeof e=="number")return e;if(!e)return 0;const t=parseFloat(String(e).replace(/R\$\s?/gi,"").replace(/\s/g,"").replace(/\./g,"").replace(",","."));return isNaN(t)?0:t}function pt(e){if(!e)return"—";try{return new Date(e).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}catch{return e}}function I(e,t=3500){const a=document.getElementById("toast");a.textContent=e,a.classList.add("show"),setTimeout(()=>a.classList.remove("show"),t)}function G(e,t="var(--accent-amber)"){const a=document.getElementById("status-msg");a&&(a.textContent=e,a.style.color=t)}function ie(e){if(!e)return new Date().toISOString().slice(0,16);try{const t=new Date(e);if(isNaN(t.getTime()))return new Date().toISOString().slice(0,16);const a=o=>String(o).padStart(2,"0");return`${t.getFullYear()}-${a(t.getMonth()+1)}-${a(t.getDate())}T${a(t.getHours())}:${a(t.getMinutes())}`}catch{return new Date().toISOString().slice(0,16)}}function le(e,t){let a=0;const o=new Date(e,t+1,0).getDate();for(let n=1;n<=o;n++){const s=new Date(e,t,n).getDay();s!==0&&s!==6&&a++}return a}window.goTab=function(e){document.querySelectorAll(".tab-content").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".desktop-nav .nav-item").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".mobile-nav .mob-btn").forEach(a=>a.classList.remove("active"));const t=document.getElementById("tab-"+e);t&&t.classList.add("active"),document.querySelectorAll(`[data-tab="${e}"]`).forEach(a=>a.classList.add("active"))};document.querySelectorAll("[data-tab]").forEach(e=>{e.addEventListener("click",()=>goTab(e.getAttribute("data-tab")))});document.querySelectorAll(".sub-item").forEach(e=>{e.addEventListener("click",()=>{document.querySelectorAll(".sub-item").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".sub-tab-content").forEach(a=>a.style.display="none"),e.classList.add("active");const t=document.getElementById("sub-"+e.getAttribute("data-sub"));t&&(t.style.display="block")})});function Ot(){document.getElementById("modal-add-nota").classList.add("active")}function Lt(){ut&&At(),document.getElementById("modal-add-nota").classList.remove("active")}var wt;(wt=document.getElementById("btn-open-modal-home"))==null||wt.addEventListener("click",Ot);var Bt;(Bt=document.getElementById("btn-mercado-add-nota"))==null||Bt.addEventListener("click",Ot);var Tt;(Tt=document.getElementById("btn-close-modal-add"))==null||Tt.addEventListener("click",Lt);rt(oe(J(B,bt),ne("dataEmissao","desc")),e=>{U=e.docs.map(t=>({id:t.id,...t.data()})),W()},e=>console.error("Firestore Mercado:",e));rt(J(B,it),e=>{Q=e.docs.map(t=>({id:t.id,...t.data()})),W()},e=>console.error("Firestore Entradas:",e));rt(J(B,nt),e=>{V=e.docs.map(t=>({id:t.id,...t.data()})),W()},e=>console.error("Firestore Faturas:",e));rt(J(B,ot),e=>{N=e.docs.map(t=>({id:t.id,...t.data()})),W()},e=>console.error("Firestore Boletos:",e));rt(L(B,Dt,"config"),e=>{e.exists()&&(_=e.data()),W()},e=>console.error("Firestore Reservas:",e));rt(J(B,tt),e=>{K=e.docs.map(t=>({id:t.id,...t.data()})),W()},e=>console.error("Firestore Estimativas:",e));let E=new Date().toISOString().slice(0,7);const Rt=new Set;function lt(){const e=new Set,t=new Date().toISOString().slice(0,7);e.add(t);const a=new Date,o=new Date(a.getFullYear(),a.getMonth()+1,1),n=r=>String(r).padStart(2,"0"),s=`${o.getFullYear()}-${n(o.getMonth()+1)}`;return e.add(s),E&&e.add(E),Q.forEach(r=>{r.mesAno&&e.add(r.mesAno)}),V.forEach(r=>{r.mesAno&&e.add(r.mesAno)}),N.forEach(r=>{r.mesAno&&e.add(r.mesAno)}),U.forEach(r=>{r.mesAno&&e.add(r.mesAno)}),K.forEach(r=>{r.mesAno&&e.add(r.mesAno)}),Array.from(e).filter(r=>!Rt.has(r)).sort().reverse()}window.excluirMesSelecionadoAtual=function(){window.excluirDadosDoMes(E)};window.selecionarMesGlobal=function(e){if(!e)return;E=e;const t=document.getElementById("inp-seletor-mes-global");t&&(t.value=e);const a=document.getElementById("inp-entradas-mes-ano");a&&(a.value=e);const o=document.getElementById("inp-fatura-vencimento");o&&(o.value=`${e}-10`,typeof atualizarMesRefFatura=="function"&&atualizarMesRefFatura());const n=document.getElementById("inp-boleto-vencimento");n&&(n.value=`${e}-10`,typeof atualizarMesRefBoleto=="function"&&atualizarMesRefBoleto()),W()};window.verMesEIrParaControle=function(e){selecionarMesGlobal(e),typeof goTab=="function"&&goTab("mensal")};function de(){const e=document.getElementById("seletor-meses-bar"),t=document.getElementById("seletor-meses-bar-salarios"),a=document.getElementById("seletor-meses-bar-estimativa"),o=lt();o.includes(E)||(E=o[0]||new Date().toISOString().slice(0,7));const n=document.getElementById("inp-seletor-mes-global");n&&n.value!==E&&(n.value=E);const s=document.getElementById("inp-entradas-mes-ano");s&&s.value!==E&&(s.value=E);const r=o.map(d=>{const[m,c]=d.split("-"),u=new Date(parseInt(m),parseInt(c)-1,1).toLocaleString("pt-BR",{month:"short"}).toUpperCase().replace(".",""),y=d===E;return`
      <button class="sub-item ${y?"active":""}" onclick="selecionarMesGlobal('${d}')" style="${y?"background:var(--secondary);color:#fff;border-color:var(--secondary);box-shadow:0 0 10px rgba(99,102,241,0.4);font-weight:700":"background:rgba(15,23,42,.6);color:var(--text-muted);border:1px solid var(--border-color)"}; display:inline-flex;align-items:center;gap:.35rem">
        📅 ${u}/${m}
      </button>
    `}).join("");e&&(e.innerHTML=r),t&&(t.innerHTML=r),a&&(a.innerHTML=r)}window.switchMensalSub=function(e){document.querySelectorAll("[data-mensal-sub]").forEach(o=>o.classList.remove("active")),document.querySelectorAll(".mensal-sub-content").forEach(o=>o.style.display="none");const t=document.querySelector(`[data-mensal-sub="${e}"]`);t&&t.classList.add("active");const a=document.getElementById(e);a&&(a.style.display="block")};function W(){de(),ue(),ce(),Pt(),Ee(),Ae(),Be(),Te(),Oe(),Le(),Re(),xe()}function ce(){const e=E,t=Q.filter(h=>h.mesAno===e),a=V.filter(h=>h.mesAno===e),o=N.filter(h=>h.mesAno===e),n=U.filter(h=>h.mesAno===e),s=t.reduce((h,A)=>h+(A.valor||0),0),r=a.reduce((h,A)=>h+(A.valorTotal!==void 0?A.valorTotal:A.valor||0),0),d=o.reduce((h,A)=>h+(A.valorTotal!==void 0?A.valorTotal:A.valor||0),0);let m=0;n.forEach(h=>{h.formasPagamento&&(m+=h.formasPagamento.cartaoDebito||0)});const c=s-r-d-m,p=document.getElementById("m-total-entradas");p&&(p.textContent=i(s));const u=document.getElementById("m-total-cartoes");u&&(u.textContent=i(r));const y=document.getElementById("m-total-boletos");y&&(y.textContent=i(d));const l=document.getElementById("m-mercado-debito");l&&(l.textContent=i(m));const v=document.getElementById("m-saldo-liquido");v&&(v.textContent=i(c),v.style.color=c>=0?"#60a5fa":"#fb7185");const[g,T]=e.split("-"),P=new Date(parseInt(g),parseInt(T)-1,1).toLocaleString("pt-BR",{month:"long"}),w=P.charAt(0).toUpperCase()+P.slice(1),x=document.getElementById("m-lbl-saldo-liquido");x&&(x.textContent=`Saldo Líquido (${w}/${g})`),me(t,a,o,n)}function me(e,t,a,o){const n=document.getElementById("content-salarios-mes");n&&(n.innerHTML=`
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header">
          <span class="card-title">💵 Entradas Registradas em ${E}</span>
          <span class="badge green">Total: ${i(e.reduce((m,c)=>m+(c.valor||0),0))}</span>
        </div>
        ${e.length?`<div class="table-responsive"><table class="custom-table">
              <thead><tr><th>Pessoa</th><th>Descrição</th><th>Tipo</th><th class="num">Valor</th><th>Ação</th></tr></thead>
              <tbody>${e.map(m=>`<tr>
                <td><span class="badge ${m.pessoa==="Victor"?"green":m.pessoa==="Maria"?"purple":"cyan"}">${m.pessoa}</span></td>
                <td><strong>${m.descricao}</strong></td>
                <td><span class="badge amber">${m.tipo==="holerite"?"Holerite":"Manual"}</span></td>
                <td class="num" style="color:#34d399"><strong>${i(m.valor)}</strong></td>
                <td><button class="btn-danger" onclick="excluirEntrada('${m.id}')">🗑️</button></td>
              </tr>`).join("")}</tbody>
            </table></div>`:`<div class="empty-state">Nenhuma entrada cadastrada para ${E}. Use a aba "Salários & Entradas" para cadastrar.</div>`}
      </div>
    `);const s=document.getElementById("content-cartoes-mes");if(s){const m=t.reduce((p,u)=>p+(u.valorTotal||0),0),c=t.length?Vt(t,"mes_"+E):"";s.innerHTML=`
      ${c}
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header">
          <span class="card-title">💳 Faturas de Cartão Vencendo em ${E}</span>
          <span class="badge rose">Total: ${i(m)}</span>
        </div>
        ${t.length?t.map(p=>`
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
                  ${Gt(p)}
                </div>
              </div>
            `).join(""):`<div class="empty-state">Nenhuma fatura cadastrada com vencimento em ${E}. Use a aba "Cartões de Crédito" para importar.</div>`}
      </div>
    `}const r=document.getElementById("content-boletos-mes");if(r){const m=a.reduce((c,p)=>c+(p.valorTotal||0),0);r.innerHTML=`
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header">
          <span class="card-title">📄 Boletos Vencendo em ${E}</span>
          <span class="badge purple">Total: ${i(m)}</span>
        </div>
        ${a.length?a.map(c=>`
              <div class="purchase-card" style="margin-bottom:1rem">
                <div class="purchase-header" onclick="toggleDetail('bol-m-${c.id}')">
                  <div class="purchase-info">
                    <h3>📄 ${st(c)}</h3>
                    <p>Vencimento: <strong>${c.dataVencimento||"—"}</strong> • ${c.qtdItens||(c.itens?c.itens.length:0)} encargos</p>
                  </div>
                  <div class="purchase-values" style="display:flex;align-items:center;gap:.5rem">
                    <div style="text-align:right">
                      <div class="pv-total" style="color:#c084fc">${i(c.valorTotal)}</div>
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
                  ${Qt(c)}
                </div>
              </div>
            `).join(""):`<div class="empty-state">Nenhum boleto cadastrado para ${E}. Use a aba "Boletos" para importar.</div>`}
      </div>
    `}const d=document.getElementById("content-mercado-mes");if(d){let m=0,c=0,p=0;o.forEach(u=>{u.formasPagamento?(m+=u.formasPagamento.valeAlimentacao||0,c+=u.formasPagamento.cartaoCredito||0,p+=u.formasPagamento.cartaoDebito||0):p+=u.valorAPagar||0}),d.innerHTML=`
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem">
          <span class="card-title">🛒 Compras de Mercado em ${E}</span>
          <div style="display:flex;gap:.4rem;align-items:center;flex-wrap:wrap">
            ${m>0?`<span class="badge green">🥗 Alimentação: ${i(m)}</span>`:""}
            ${c>0?`<span class="badge blue">💳 Crédito: ${i(c)}</span>`:""}
            ${p>0?`<span class="badge amber">💵 Débito: ${i(p)}</span>`:""}
            <span class="badge purple">${o.length} notas cadastradas</span>
          </div>
        </div>
        ${o.length?o.map(u=>`
              <div class="purchase-card" style="margin-bottom:1rem">
                <div class="purchase-header" onclick="toggleDetail('mer-m-${u.id}')">
                  <div class="purchase-info">
                    <h3>🛒 ${u.nomeMercado||"Mercado"}</h3>
                    <p>Data: <strong>${pt(u.dataEmissao)}</strong> • ${u.qtdTotalItens||0} itens</p>
                  </div>
                  <div class="purchase-values">
                    <div class="pv-total" style="color:#fbbf24">${i(u.valorAPagar)}</div>
                    <div class="pv-sub">Clique para ver itens <span class="chevron" id="chev-mer-m-${u.id}">▼</span></div>
                  </div>
                </div>
                <div id="detail-mer-m-${u.id}" class="purchase-details">
                  <div class="details-toolbar">
                    <span style="font-weight:700;font-size:.9rem;color:var(--text-muted)">Itens da Nota</span>
                    <button class="btn-danger" onclick="excluirCompraDocumento('${u.id}')">🗑️ Excluir Nota</button>
                  </div>
                  ${Xt(u)}
                </div>
              </div>
            `).join(""):`<div class="empty-state">Nenhuma nota de mercado cadastrada para ${E}.</div>`}
      </div>
    `}}function ue(){const e=lt();let t=0,a=0,o=0,n=0,s=0;e.forEach(l=>{const v=Q.filter(w=>w.mesAno===l).reduce((w,x)=>w+(x.valor||0),0),g=V.filter(w=>w.mesAno===l).reduce((w,x)=>w+(x.valorTotal!==void 0?x.valorTotal:x.valor||0),0),T=N.filter(w=>w.mesAno===l).reduce((w,x)=>w+(x.valorTotal!==void 0?x.valorTotal:x.valor||0),0);let C=0;U.filter(w=>w.mesAno===l).forEach(w=>{w.formasPagamento&&(C+=w.formasPagamento.cartaoDebito||0)});const P=v-g-T-C;t+=v,a+=g,o+=T,n+=C,s+=P});let r=0,d=0;const m={};U.forEach(l=>{const v=l.valorAPagar||0;l.formasPagamento&&(r+=l.formasPagamento.valeAlimentacao||0,d+=l.formasPagamento.cartaoCredito||0);const g=l.mesAno||"Outros";m[g]=(m[g]||0)+v});const c=_&&_.valorAtualGuardado!==void 0?_.valorAtualGuardado:3e3,p=s+c;document.getElementById("fin-total-entradas").textContent=i(t);const u=document.getElementById("fin-subtext-entradas");u&&(u.textContent="Soma Total das Entradas da Tabela Mensal"),document.getElementById("fin-total-cartoes").textContent=i(a),document.getElementById("fin-total-boletos").textContent=i(o),document.getElementById("fin-mercado-debito").textContent=i(n),document.getElementById("fin-saldo-liquido").textContent=i(s),document.getElementById("fin-saldo-liquido").style.color=s>=0?"#60a5fa":"#fb7185";const y=document.getElementById("fin-subtext-saldo");y&&(y.innerHTML=`Saldo Líquido + Reserva Guardada (${i(c)}): <strong style="color:#34d399">${i(p)}</strong>`),document.getElementById("dash-alimentacao").textContent=i(r),document.getElementById("dash-credito").textContent=i(d),document.getElementById("dash-debito").textContent=i(n),pe(),Ft(m)}function pe(){const e=document.getElementById("tabela-resumo-mensal");if(!e)return;const t=lt();if(!t.length){e.innerHTML='<div class="empty-state">Nenhum dado cadastrado ainda.</div>';return}const a=t.map(o=>{const n=Q.filter(v=>v.mesAno===o).reduce((v,g)=>v+(g.valor||0),0),s=V.filter(v=>v.mesAno===o).reduce((v,g)=>v+(g.valorTotal!==void 0?g.valorTotal:g.valor||0),0),r=N.filter(v=>v.mesAno===o).reduce((v,g)=>v+(g.valorTotal!==void 0?g.valorTotal:g.valor||0),0);let d=0;U.filter(v=>v.mesAno===o).forEach(v=>{v.formasPagamento&&(d+=v.formasPagamento.cartaoDebito||0)});const m=n-s-r-d,[c,p]=o.split("-"),y=new Date(parseInt(c),parseInt(p)-1,1).toLocaleString("pt-BR",{month:"short"}).toUpperCase().replace(".","");return`
      <tr style="${o===E?"background:rgba(99,102,241,0.1)":""}">
        <td><strong>📅 ${y}/${c}</strong></td>
        <td style="color:#34d399"><strong>${i(n)}</strong></td>
        <td style="color:#fb7185">${i(s)}</td>
        <td style="color:#c084fc">${i(r)}</td>
        <td style="color:#fbbf24">${i(d)}</td>
        <td style="color:${m>=0?"#60a5fa":"#fb7185"}; font-weight:800">${i(m)}</td>
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
    `}).join("");e.innerHTML=`
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
  `}window.excluirDadosDoMes=async function(e){const t=e||E;if(!t)return;const[a,o]=t.split("-"),s=new Date(parseInt(a),parseInt(o)-1,1).toLocaleString("pt-BR",{month:"long"}),r=`${s.charAt(0).toUpperCase()+s.slice(1)} de ${a}`,d=Q.filter(l=>l.mesAno===t),m=V.filter(l=>l.mesAno===t),c=N.filter(l=>l.mesAno===t),p=U.filter(l=>l.mesAno===t),u=K.filter(l=>l.id===t),y=`⚠️ TEM CERTEZA QUE DESEJA EXCLUIR O MÊS ${r.toUpperCase()} (${t})?

Isso irá APAGAR PERMANENTEMENTE todos os registros vinculados a este mês:
• ${d.length} Salário(s) / Entrada(s)
• ${m.length} Fatura(s) de Cartão
• ${c.length} Boleto(s) & Conta(s)
• ${p.length} Nota(s) de Mercado
• Estimativa orçamentária do mês

Esta ação é irreversível. Confirmar exclusão do mês?`;if(confirm(y))try{const l=[];d.forEach(g=>l.push(Z(L(B,it,g.id)))),m.forEach(g=>l.push(Z(L(B,nt,g.id)))),c.forEach(g=>l.push(Z(L(B,ot,g.id)))),p.forEach(g=>l.push(Z(L(B,bt,g.id)))),u.forEach(g=>l.push(Z(L(B,tt,g.id)))),l.length>0&&await Promise.all(l),Rt.add(t),I(`🗑️ O mês ${r} e todos os seus dados foram excluídos com sucesso!`),E=lt()[0]||new Date().toISOString().slice(0,7),W()}catch(l){alert("Erro ao excluir dados do mês: "+l.message)}};function Ft(e){var s;if(typeof Chart>"u")return setTimeout(()=>Ft(e),300);const t=(s=document.getElementById("chart-barras"))==null?void 0:s.getContext("2d");if(!t)return;const a=Object.keys(e).sort(),o=a.map(r=>{const[d,m]=r.split("-");return`${m}/${d}`}),n=a.map(r=>e[r]);ht&&ht.destroy(),ht=new Chart(t,{type:"bar",data:{labels:o.length?o:["Sem compras"],datasets:[{label:"Gasto Mercado R$",data:n.length?n:[0],backgroundColor:"rgba(16,185,129,0.78)",borderColor:"#10b981",borderWidth:2,borderRadius:8}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:r=>` ${i(r.raw)}`}}},scales:{y:{beginAtZero:!0,grid:{color:"rgba(255,255,255,.05)"},ticks:{color:"#94a3b8",callback:r=>"R$"+r}},x:{grid:{display:!1},ticks:{color:"#94a3b8"}}}}})}function zt(e){if(!e)return 0;const t=e.match(/L[íi]quido(?:\s*a\s*receber)?\s*[:\s]*R?\$\s*([\d\.,]+)/i)||e.match(/TOTAL\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i)||e.match(/SAL[ÁA]RIO\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i)||e.match(/VALOR\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i);return t?q(t[1]):0}function ve(){const e=document.getElementById("inp-entradas-mes-ano");if(e&&!e.value){const t=new Date,a=t.getFullYear(),o=String(t.getMonth()+1).padStart(2,"0");e.value=`${a}-${o}`}}setTimeout(ve,300);let et="mes";window.toggleFiltroEntradasTabela=function(e){et=e,Pt()};document.getElementById("form-holerite-victor").addEventListener("submit",async e=>{e.preventDefault();const t=E||document.getElementById("inp-entradas-mes-ano").value||new Date().toISOString().slice(0,7),a=document.getElementById("inp-holerite-txt-victor").value;let o=parseFloat(document.getElementById("inp-salario-val-victor").value)||0;if(!o&&a&&(o=zt(a)),!o){I("⚠️ Digite ou cole um holerite válido com valor.");return}const n=`salario_victor_${t}`;await H(L(B,it,n),{pessoa:"Victor",tipo:"holerite",descricao:`Salário Líquido Victor (${t})`,valor:o,mesAno:t,data:new Date().toISOString()}),document.getElementById("inp-holerite-txt-victor").value="",document.getElementById("inp-salario-val-victor").value="",I(`✅ Salário do Victor (${t}) salvo com sucesso!`)});document.getElementById("form-holerite-maria").addEventListener("submit",async e=>{e.preventDefault();const t=E||document.getElementById("inp-entradas-mes-ano").value||new Date().toISOString().slice(0,7),a=document.getElementById("inp-holerite-txt-maria").value;let o=parseFloat(document.getElementById("inp-salario-val-maria").value)||0;if(!o&&a&&(o=zt(a)),!o){I("⚠️ Digite ou cole um holerite válido com valor.");return}const n=`salario_maria_${t}`;await H(L(B,it,n),{pessoa:"Maria",tipo:"holerite",descricao:`Salário Líquido Maria (${t})`,valor:o,mesAno:t,data:new Date().toISOString()}),document.getElementById("inp-holerite-txt-maria").value="",document.getElementById("inp-salario-val-maria").value="",I(`✅ Salário da Maria (${t}) salvo com sucesso!`)});document.getElementById("form-entrada-manual").addEventListener("submit",async e=>{e.preventDefault();const t=E||document.getElementById("inp-entradas-mes-ano").value||new Date().toISOString().slice(0,7),a=document.getElementById("inp-ent-desc").value.trim(),o=parseFloat(document.getElementById("inp-ent-val").value)||0,n=document.getElementById("inp-ent-pessoa").value;!a||!o||(await ft(J(B,it),{pessoa:n,tipo:"manual",descricao:a,valor:o,mesAno:t,data:new Date().toISOString()}),e.target.reset(),I(`🎉 Entrada manual (${t}) registrada!`))});function Pt(){var m,c,p;const e=E||((m=document.getElementById("inp-entradas-mes-ano"))==null?void 0:m.value)||new Date().toISOString().slice(0,7),t=document.getElementById("lbl-entradas-mes-ref");if(t){const[u,y]=e.split("-"),v=new Date(parseInt(u),parseInt(y)-1,1).toLocaleString("pt-BR",{month:"long"}),g=v.charAt(0).toUpperCase()+v.slice(1);t.textContent=`Visualizando e inserindo entradas para: ${g} de ${u}`}const a=((c=Q.find(u=>u.pessoa==="Victor"&&u.tipo==="holerite"&&u.mesAno===e))==null?void 0:c.valor)||0,o=((p=Q.find(u=>u.pessoa==="Maria"&&u.tipo==="holerite"&&u.mesAno===e))==null?void 0:p.valor)||0,n=Q.filter(u=>u.mesAno===e),s=n.reduce((u,y)=>u+(y.valor||0),0);document.getElementById("val-salario-victor").textContent=i(a),document.getElementById("val-salario-maria").textContent=i(o),document.getElementById("val-entradas-combinado").textContent=`${i(s)}`;const r=document.getElementById("lista-entradas-registradas");if(!r)return;const d=et==="mes"?n:Q;if(!d.length){r.innerHTML=`
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;flex-wrap:wrap;gap:.5rem">
        <span style="font-size:.84rem;color:var(--text-muted)">Modo de Exibição da Tabela:</span>
        <div style="display:flex;gap:.35rem">
          <button type="button" class="btn-secondary" style="padding:.25rem .6rem;font-size:.78rem;${et==="mes"?"background:var(--secondary);color:#fff":""}" onclick="toggleFiltroEntradasTabela('mes')">📅 Mês (${e})</button>
          <button type="button" class="btn-secondary" style="padding:.25rem .6rem;font-size:.78rem;${et==="todos"?"background:var(--secondary);color:#fff":""}" onclick="toggleFiltroEntradasTabela('todos')">🌐 Todas as Entradas</button>
        </div>
      </div>
      <div class="empty-state">Nenhuma entrada registrada para ${et==="mes"?"o mês "+e:"o sistema"}.</div>
    `;return}r.innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.75rem;flex-wrap:wrap;gap:.5rem">
      <span style="font-size:.84rem;color:var(--text-muted);font-weight:600">Exibindo ${d.length} entrada(s) em tabela:</span>
      <div style="display:flex;gap:.35rem">
        <button type="button" class="btn-secondary" style="padding:.25rem .6rem;font-size:.78rem;${et==="mes"?"background:var(--secondary);color:#fff":""}" onclick="toggleFiltroEntradasTabela('mes')">📅 Mês ${e}</button>
        <button type="button" class="btn-secondary" style="padding:.25rem .6rem;font-size:.78rem;${et==="todos"?"background:var(--secondary);color:#fff":""}" onclick="toggleFiltroEntradasTabela('todos')">🌐 Todas</button>
      </div>
    </div>
    <div class="table-responsive"><table class="custom-table">
      <thead><tr><th>Mês / Ref</th><th>Descrição</th><th>Pessoa</th><th>Tipo</th><th class="num">Valor</th><th>Ação</th></tr></thead>
      <tbody>${d.map(u=>`<tr>
        <td><span class="badge green">${u.mesAno||"—"}</span></td>
        <td><strong>${u.descricao}</strong></td>
        <td><span class="badge ${u.pessoa==="Victor"?"green":u.pessoa==="Maria"?"purple":"cyan"}">${u.pessoa}</span></td>
        <td><span class="badge amber">${u.tipo==="holerite"?"Holerite":"Manual"}</span></td>
        <td class="num" style="color:#34d399"><strong>${i(u.valor)}</strong></td>
        <td><button class="btn-danger" onclick="excluirEntrada('${u.id}')">🗑️</button></td>
      </tr>`).join("")}</tbody>
    </table></div>
  `}window.excluirEntrada=async function(e){confirm("Excluir esta entrada?")&&(await Z(L(B,it,e)),I("🗑️ Entrada removida."))};let It="Nubank",z=null;function ge(){const e=document.getElementById("inp-fatura-vencimento");if(e&&!e.value){const t=new Date,a=t.getFullYear(),o=String(t.getMonth()+1).padStart(2,"0");e.value=`${a}-${o}-10`,atualizarMesRefFatura()}}setTimeout(ge,300);window.atualizarMesRefFatura=function(){const e=document.getElementById("inp-fatura-vencimento"),t=document.getElementById("lbl-fatura-mes-ref");if(!(!e||!t))if(e.value){const[a,o]=e.value.split("-"),s=new Date(parseInt(a),parseInt(o)-1,1).toLocaleString("pt-BR",{month:"long"});t.textContent=`Fatura ${s.charAt(0).toUpperCase()+s.slice(1)}/${a}`}else t.textContent="Mês da Fatura"};window.selecionarCartaoFatura=function(e){It=e,document.querySelectorAll(".btn-card-select").forEach(a=>a.classList.remove("active"));const t=document.querySelector(`.btn-card-select[data-card="${e}"]`);t&&t.classList.add("active"),I(`Cartão selecionado: ${e}`)};window.handleFileFaturaSelect=async function(e){const t=e.target.files[0];if(!t)return;const a=document.getElementById("txt-file-fatura");a&&(a.textContent=`📄 Arquivo: ${t.name}`),I(`⏳ Lendo arquivo da fatura (${t.name})...`);let o="";if(t.type==="application/pdf"||t.name.endsWith(".pdf"))o=await kt(t);else try{o=await t.text()}catch{o=""}o?(document.getElementById("inp-fatura-txt").value=o,await qt(o,It)):I("❌ Não foi possível ler o texto do arquivo da fatura.")};async function kt(e){try{const t=await e.arrayBuffer();if(typeof pdfjsLib>"u")return I("⚠️ Aguarde a biblioteca de PDF carregar..."),"";pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";let a=pdfjsLib.getDocument({data:t});a.onPassword=(s,r)=>{let d=prompt(`🔒 Este PDF de fatura está protegido por senha.
Digite a senha para abrir (ex: CPF ou Data de Nascimento):`);d?s(d):I("⚠️ Senha não informada. Leitura do PDF cancelada.")};const o=await a.promise;let n="";for(let s=1;s<=o.numPages;s++){const d=await(await o.getPage(s)).getTextContent();let m=null,c="";for(const p of d.items){if(!p.str)continue;const u=p.transform?p.transform[5]:null;m!==null&&Math.abs(u-m)>3?c+=`
`:c.length>0&&!c.endsWith(`
`)&&!c.endsWith(" ")&&(c+=" "),c+=p.str,m=u}n+=c+`
`}return n}catch(t){return t.name==="PasswordException"?I("🔒 O PDF precisa de senha válida para ser aberto."):console.error("Erro ao ler PDF:",t),""}}function fe(e){if(!e)return null;const t=e.match(/Total\s*a\s*Pagar\s*[:\s]*R?\$\s*([\d\.,]+)/i)||e.match(/no\s*valor\s*de\s*R?\$\s*([\d\.,]+)/i)||e.match(/Valor\s*total\s*da\s*fatura\s*[:\s]*R?\$\s*([\d\.,]+)/i)||e.match(/Total\s*da\s*fatura\s*[:\s]*R?\$\s*([\d\.,]+)/i);if(t){const a=q(t[1]);if(a>0)return a}return null}function be(e){if(!e)return null;const t=e.match(/Vencimento\s*[:\s]*(\d{2}[\/\.-]\d{2}[\/\.-]\d{4})/i)||e.match(/Data\s*de\s*vencimento\s*[:\s]*(\d{2})\s+([A-Za-z]{3})\s+(\d{4})/i)||e.match(/FATURA\s+(\d{2})\s+([A-Za-z]{3})\s+(\d{4})/i);if(t){if(t[2]&&t[3]){const a=t[1],o=t[2].toUpperCase(),n=t[3],r={JAN:"01",FEB:"02",MAR:"03",ABR:"04",APR:"04",MAI:"05",MAY:"05",JUN:"06",JUL:"07",AGO:"08",AUG:"08",SET:"09",SEP:"09",OUT:"10",OCT:"10",NOV:"11",DEZ:"12",DEC:"12"}[o]||"07";return`${n}-${r}-${a.padStart(2,"0")}`}else if(t[1]){const[a,o,n]=t[1].split(/[\/\.-]/);return`${n}-${o.padStart(2,"0")}-${a.padStart(2,"0")}`}}return null}window.importarFaturaManualOuArquivo=async function(){const e=document.getElementById("inp-fatura-txt").value.trim();if(!e){I("⚠️ Selecione o arquivo da fatura (.pdf, .csv) ou cole o texto da fatura.");return}await qt(e,It)};async function qt(e,t){const a=be(e);a&&(document.getElementById("inp-fatura-vencimento").value=a,atualizarMesRefFatura());const o=fe(e),n=ye(e),s=document.getElementById("inp-fatura-vencimento").value||new Date().toISOString().slice(0,10),r=s.slice(0,7),d=n.reduce((y,l)=>y+l.valor,0),m=o||d||0,c=t?`Cartão ${t}`:"Fatura Cartão";z={cartao:t||"Nubank",descricao:c,dataVencimento:s,mesAno:r,valorTotal:m,qtdItens:n.length,itens:n};const p=document.getElementById("inp-revisao-fatura-desc");p&&(p.value=c);const u=document.getElementById("inp-revisao-fatura-val");u&&(u.value=m?m.toFixed(2):""),Nt(),n.length>0?I(`✅ ${n.length} compras encontradas! Fatura total: ${i(m)}.`):I("ℹ️ Fatura pronta para revisão. Confirme o valor total e o cartão abaixo.")}window.atualizarValorTotalRevisaoFatura=function(){var t;if(!z)return;const e=parseFloat((t=document.getElementById("inp-revisao-fatura-val"))==null?void 0:t.value)||0;z.valorTotal=e,document.getElementById("badge-total-preview-fatura").textContent=i(e)};function Nt(){if(!z)return;const{valorTotal:e,itens:t,cartao:a,descricao:o}=z;document.getElementById("badge-total-preview-fatura").textContent=i(e);const n=document.getElementById("inp-revisao-fatura-desc");n&&(!n.value||n.value==="Fatura Cartão")&&(n.value=o||`Cartão ${a||"Nubank"}`);const s=document.getElementById("inp-revisao-fatura-val");s&&(!s.value||parseFloat(s.value)===0)&&(s.value=e?e.toFixed(2):"");const r=document.getElementById("lista-preview-fatura-itens");!t||!t.length?r.innerHTML='<div class="empty-state">Nenhum item individual extraído. O valor total acima será considerado.</div>':r.innerHTML=t.map((m,c)=>`
      <div style="display:flex; justify-content:space-between; align-items:center; padding:.4rem 0; border-bottom:1px dashed var(--border-color); font-size:.82rem;">
        <span><strong>${m.dataCompra||"—"}</strong> — ${m.descricao}</span>
        <div style="display:flex; align-items:center; gap:.75rem;">
          <span style="color:#fb7185; font-weight:700;">${i(m.valor)}</span>
          <button type="button" class="btn-danger" style="padding:.15rem .45rem; font-size:.75rem;" onclick="removerItemRevisaoFatura(${c})">🗑️</button>
        </div>
      </div>
    `).join("");const d=document.getElementById("box-revisao-fatura");d.style.display="block",d.scrollIntoView({behavior:"smooth"})}window.removerItemRevisaoFatura=function(e){if(!z||!z.itens)return;z.itens.splice(e,1);const t=z.itens.reduce((a,o)=>a+o.valor,0);if(t>0){z.valorTotal=t;const a=document.getElementById("inp-revisao-fatura-val");a&&(a.value=t.toFixed(2))}z.qtdItens=z.itens.length,Nt(),I("🗑️ Item removido da revisão da fatura.")};window.confirmarEGravarFaturaDocumento=async function(){var o,n;if(!z)return;const e=(o=document.getElementById("inp-revisao-fatura-desc"))==null?void 0:o.value.trim(),t=parseFloat((n=document.getElementById("inp-revisao-fatura-val"))==null?void 0:n.value)||0,a=document.getElementById("inp-fatura-vencimento").value||new Date().toISOString().slice(0,10);if(!t){I("⚠️ Digite ou confirme o valor total da fatura.");return}z.cartao=e||z.cartao||"Cartão",z.valorTotal=t,z.dataVencimento=a,z.mesAno=a.slice(0,7);try{await ft(J(B,nt),{...z,createdAt:$t()}),document.getElementById("box-revisao-fatura").style.display="none",document.getElementById("inp-fatura-txt").value="";const s=document.getElementById("txt-file-fatura");s&&(s.textContent="Clique para Selecionar o Arquivo da Fatura");const r=i(z.valorTotal);z=null,I(`🎉 Fatura de ${r} salva com sucesso!`)}catch(s){alert("Erro ao salvar fatura: "+s.message)}};function ye(e){if(!e)return[];const t=[],a=/(?:[@\)\(\*•\s]+)?(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+(?:(\d{2}\/\d{2})\s+)?(-?R?\$\s*[\d\.]+,\d{2}|-?[\d\.]+,\d{2})/gi;if(e.split(`
`).forEach(n=>{const s=n.trim();if(!s||/EMISS[ÃA]O|TRANSA[ÇC][ÕO]ES|RESUMO|PAGAMENTO DE FATURA|TOTAL DA FATURA|FATURA ANTERIOR|SALDO ANTERIOR|LIMITE DISPON[ÍI]VEL|OPÇÕES DE PAGAMENTO|ALTERNATIVAS DE PAGAMENTO|PAGAMENTO E DEMAIS|PARCELAMENTOS|DESPESAS|HISTÓRICO DE FATURAS|SUPERCRÉDITO|SAQUE À CRÉDITO|COMPRA DATA DESCRIÇÃO/i.test(s))return;const r=/(?:[@\)\(\*•\s]+)?(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+(?:(\d{2}\/\d{2})\s+)?(-?R?\$\s*[\d\.]+,\d{2}|-?[\d\.]+,\d{2})$/i,d=s.match(r)||s.match(/(?:[@\)\(\*•\s]+)?(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+(?:(\d{2}\/\d{2})\s+)?(-?R?\$\s*[\d\.]+,\d{2}|-?[\d\.]+,\d{2})/i);if(d){const m=d[1];let c=d[2].trim();const p=d[3],u=d[4];if(u.includes("-")||/DEB AUTOM|PAGAMENTO|PAGTO|CR[ÉE]DITO FATURA/i.test(c))return;const y=q(u);p&&(c+=` (${p})`),c&&y>0&&c.length>2&&!/fatura|limite|pagamento|saldo|alternativas|opções|período|emissão|vencimento/i.test(c)&&t.push({dataCompra:m,descricao:c,valor:y})}}),t.length===0){let n;for(;(n=a.exec(e))!==null;){const s=n[1];let r=n[2].trim();const d=n[3],m=n[4];if(m.includes("-")||/DEB AUTOM|PAGAMENTO|PAGTO|CR[ÉE]DITO FATURA/i.test(r))continue;const c=q(m);d&&(r+=` (${d})`),r&&c>0&&r.length>2&&!/fatura|limite|pagamento|saldo|alternativas|opções|período|emissão|vencimento/i.test(r)&&t.push({dataCompra:s,descricao:r,valor:c})}}return t}window.ultimosLocaisAnalisados={};function Ut(e){if(!e)return"DIVERSOS";let t=e.replace(/\(\d{1,2}\/\d{1,2}\)/gi,"").replace(/\b\d{1,2}\/\d{1,2}\b/gi,"").replace(/\b\d{1,2}x\b/gi,"").trim();return t=t.replace(/\s+/g," "),t.toUpperCase()}function jt(e){const t={};(Array.isArray(e)?e:[e]).forEach(n=>{!n||!n.itens||!Array.isArray(n.itens)||n.itens.forEach(s=>{if(!s.descricao||!s.valor)return;const r=Ut(s.descricao);t[r]||(t[r]={nome:r,qtd:0,valorTotal:0,compras:[]}),t[r].qtd+=1,t[r].valorTotal+=s.valor||0,t[r].compras.push({dataCompra:s.dataCompra||"—",descricao:s.descricao,valor:s.valor||0,cartao:n.cartao||"Cartão",mesAno:n.mesAno||"—"})})});const o=Object.values(t).filter(n=>n.qtd>=2);return o.sort((n,s)=>s.valorTotal-n.valorTotal),o}function Vt(e,t="geral"){const a=jt(e);if(a.forEach(n=>{window.ultimosLocaisAnalisados[`${t}_${n.nome}`]=n}),!a.length)return`
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
        <span class="badge rose" style="font-size:.85rem; padding:.35rem .75rem">Soma Repetidos: ${i(o)}</span>
      </div>

      <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap:0.85rem; margin-top:.5rem">
        ${a.map(n=>`
            <div style="background:rgba(15,23,42,0.85); border:1px solid rgba(251,113,133,0.35); border-radius:10px; padding:.85rem 1rem; display:flex; justify-content:space-between; align-items:center; cursor:pointer; transition:all .2s; box-shadow:0 2px 8px rgba(0,0,0,0.3)"
                 onclick="abrirModalComprasEstabelecimento('${`${t}_${n.nome}`}')"
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
  `}window.abrirModalComprasEstabelecimento=function(e){const t=window.ultimosLocaisAnalisados[e];if(!t){I("⚠️ Não foi possível carregar os detalhes do estabelecimento.");return}let a=document.getElementById("modal-detalhes-estabelecimento");if(!a){const n=document.createElement("div");n.id="modal-detalhes-estabelecimento",n.className="modal-overlay",n.innerHTML=`
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
    `,document.body.appendChild(n),a=n,a.addEventListener("click",s=>{s.target===a&&fecharModalEstabelecimento()})}document.getElementById("modal-est-titulo").innerHTML=`🏬 Estabelecimento: <span style="color:#fff">${t.nome}</span>`,document.getElementById("modal-est-subtitulo").textContent=`${t.qtd} compra(s) somando o valor total de ${i(t.valorTotal)}`;const o=document.getElementById("modal-est-body");o.innerHTML=`
    <div style="margin-bottom:1rem; background:rgba(251,113,133,0.08); border:1px dashed rgba(251,113,133,0.3); border-radius:8px; padding:.75rem 1rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:.5rem">
      <div>
        <span style="font-size:.82rem; color:var(--text-muted)">Total de Lançamentos:</span>
        <strong style="color:#fff; margin-left:.3rem; font-size:.95rem">${t.qtd} compras</strong>
      </div>
      <div>
        <span style="font-size:.82rem; color:var(--text-muted)">Soma Total Gasta:</span>
        <strong style="color:#fb7185; margin-left:.3rem; font-size:1.1rem">${i(t.valorTotal)}</strong>
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
          ${t.compras.map(n=>`
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
  `,a.style.display="flex"};window.fecharModalEstabelecimento=function(){const e=document.getElementById("modal-detalhes-estabelecimento");e&&(e.style.display="none")};function Et(e){if(!e)return{nome:"Outros & Diversos",icone:"📦",cor:"blue"};const t=e.toUpperCase();return t.includes("ZARA")||t.includes("RENNER")||t.includes("C&A")||t.includes("RIACHUELO")||t.includes("ROUPA")||t.includes("VESTUARIO")||t.includes("SAPATO")||t.includes("CALCADO")||t.includes("CENTAURO")||t.includes("NIKE")||t.includes("ADIDAS")||t.includes("SHEIN")||t.includes("DAFITI")?{nome:"Vestuário & Roupas",icone:"👗",cor:"rose"}:t.includes("VIAGEM")||t.includes("AIRBNB")||t.includes("BOOKING")||t.includes("HOTEL")||t.includes("POUSADA")||t.includes("DECOLAR")||t.includes("LATAM")||t.includes("GOL")||t.includes("AZUL")||t.includes("FLIGHT")||t.includes("PASSAGEM")||t.includes("PASSAGENS")?{nome:"Viagens & Hospedagem",icone:"✈️",cor:"purple"}:t.includes("AUTOPOSTO")||t.includes("POSTO")||t.includes("UBER")||t.includes("99")||t.includes("SHELL")||t.includes("IPIRANGA")||t.includes("PETROBRAS")||t.includes("COMBUSTIVEL")||t.includes("PEDAGIO")?{nome:"Transporte & Combustível",icone:"⛽",cor:"amber"}:t.includes("SAVEGNAGO")||t.includes("TONELLI")||t.includes("SUPERMERCADO")||t.includes("MERCADO")||t.includes("ATACADAO")||t.includes("CARREFOUR")||t.includes("PAO DE ACUCAR")||t.includes("MARTINS")?{nome:"Supermercado & Alimentação",icone:"🛒",cor:"green"}:t.includes("SORVETERIA")||t.includes("PIZZA")||t.includes("BURGER")||t.includes("IFOOD")||t.includes("RESTAURANTE")||t.includes("BAR")||t.includes("PUB")||t.includes("DELICIAS")||t.includes("CHOCOLATE")||t.includes("CINEMA")||t.includes("OUTBACK")||t.includes("MC DONALDS")||t.includes("KFC")?{nome:"Restaurantes & Lazer",icone:"🍕",cor:"orange"}:t.includes("COSMETICO")||t.includes("COSMETICOS")||t.includes("FARMACIA")||t.includes("DROGARIA")||t.includes("DROGASIL")||t.includes("PAGUE MENOS")||t.includes("PERFUMARIA")||t.includes("NATURA")||t.includes("BOTICARIO")||t.includes("ESSENCIA")?{nome:"Saúde & Cosméticos",icone:"💄",cor:"pink"}:t.includes("AMAZON")||t.includes("MERCADO LIVRE")||t.includes("MAGALU")||t.includes("MAGAZINE")||t.includes("SHOPEE")||t.includes("ALIEXPRESS")||t.includes("FAST SHOP")||t.includes("APPLE")||t.includes("KABUM")?{nome:"Eletrônicos & Shopping",icone:"📱",cor:"cyan"}:{nome:"Outros & Diversos",icone:"📦",cor:"blue"}}function he(e){if(!e||!e.length)return"";const t=[];e.forEach(l=>{l.itens&&Array.isArray(l.itens)&&l.itens.forEach(v=>{v.descricao&&v.valor&&t.push({...v,cartao:l.cartao||"Cartão",mesAno:l.mesAno||"Outros"})})});const a=e.reduce((l,v)=>l+(v.valorTotal!==void 0?v.valorTotal:v.valor||0),0),o={};t.forEach(l=>{const v=Ut(l.descricao);o[v]||(o[v]={nome:v,valorTotal:0,qtd:0}),o[v].valorTotal+=l.valor,o[v].qtd+=1});const n=Object.values(o).sort((l,v)=>v.valorTotal-l.valorTotal).slice(0,5),s={};t.forEach(l=>{const v=Et(l.descricao);s[v.nome]||(s[v.nome]={...v,valorTotal:0,qtd:0}),s[v.nome].valorTotal+=l.valor,s[v.nome].qtd+=1});const r=Object.values(s).sort((l,v)=>v.valorTotal-l.valorTotal),d={};e.forEach(l=>{const v=l.mesAno||"Outros";d[v]||(d[v]=[]),d[v].push(l)});const m=Object.keys(d).sort((l,v)=>v.localeCompare(l)),c=m[0],p=m[1];let u="",y="";if(c&&p){let w=function(f){if(!f||!f.includes("-"))return f;const[$,R]=f.split("-"),O=new Date(parseInt($),parseInt(R)-1,1).toLocaleString("pt-BR",{month:"long"});return`${O.charAt(0).toUpperCase()+O.slice(1)}/${$}`};const l=d[c]||[],v=d[p]||[],g=l.reduce((f,$)=>f+($.valorTotal!==void 0?$.valorTotal:$.valor||0),0),T=v.reduce((f,$)=>f+($.valorTotal!==void 0?$.valorTotal:$.valor||0),0),C=g-T,P=T>0?(C/T*100).toFixed(1):0,x=w(c),h=w(p),A={},M={};l.forEach(f=>{f.itens&&f.itens.forEach($=>{const R=Et($.descricao).nome;A[R]=(A[R]||0)+($.valor||0)})}),v.forEach(f=>{f.itens&&f.itens.forEach($=>{const R=Et($.descricao).nome;M[R]=(M[R]||0)+($.valor||0)})});const j=Array.from(new Set([...Object.keys(A),...Object.keys(M)])),F=[];j.forEach(f=>{const $=A[f]||0,R=M[f]||0,D=$-R;if(D>50){const O=R>0?(D/R*100).toFixed(0):"100+";F.push({categoria:f,vAtual:$,vAnterior:R,difCat:D,pctCat:O})}}),F.sort((f,$)=>$.difCat-f.difCat);let S=C>0?"📈":"📉",b=C>0?"+":"";u=`
      <div style="background:rgba(15,23,42,0.7); border:1px solid var(--border-color); border-radius:10px; padding:.85rem 1rem; margin-bottom:1rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:.75rem">
        <div>
          <span style="font-size:.82rem; color:var(--text-muted); display:block">⚖️ Comparativo Mês Atual (${x}) vs Mês Anterior (${h})</span>
          <div style="font-size:1.05rem; font-weight:700; color:#f8fafc; margin-top:.2rem">
            ${i(g)} <span style="font-size:.82rem; font-weight:400; color:var(--text-muted)">em ${x}</span> vs ${i(T)} <span style="font-size:.82rem; font-weight:400; color:var(--text-muted)">em ${h}</span>
          </div>
        </div>
        <div style="text-align:right">
          <span class="badge ${C>0?"rose":"green"}" style="font-size:.88rem; padding:.35rem .75rem">
            ${S} Variação: ${b}${i(C)} (${b}${P}%)
          </span>
        </div>
      </div>
    `,F.length>0?y=`
        <div style="margin-top:1rem; background:rgba(251,113,133,0.08); border:1px dashed rgba(251,113,133,0.35); border-radius:10px; padding:.85rem 1rem">
          <div style="font-weight:700; font-size:.9rem; color:#fb7185; margin-bottom:.5rem; display:flex; align-items:center; gap:.4rem">
            💡 DICAS DE ECONOMIA & RECOMENDAÇÕES (Categorias com Aumento em ${x}):
          </div>
          <div style="display:flex; flex-direction:column; gap:.5rem">
            ${F.map(f=>`
              <div style="font-size:.83rem; color:#f1f5f9; background:rgba(15,23,42,0.8); border-left:3px solid #fb7185; padding:.5rem .75rem; border-radius:4px">
                🚨 <strong>${f.categoria}</strong>: Gastos subiram <strong style="color:#fb7185">+${i(f.difCat)} (+${f.pctCat}%)</strong> em relação a ${h} (${i(f.vAtual)} vs ${i(f.vAnterior)}).
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
        <span class="badge purple" style="font-size:.85rem; padding:.35rem .75rem">Total em Cartões: ${i(a)}</span>
      </div>

      ${u}

      <!-- Grid 2 Colunas: Top Locais vs Categorias -->
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:1rem; margin-top:1rem">
        
        <!-- Coluna 1: Top 5 Locais em R$ -->
        <div style="background:rgba(15,23,42,0.6); border:1px solid var(--border-color); border-radius:10px; padding:.85rem 1rem">
          <div style="font-weight:700; font-size:.9rem; color:#c084fc; margin-bottom:.75rem; display:flex; justify-content:space-between; align-items:center">
            <span>🏆 Locais Onde Mais Foi Gasto (Top R$)</span>
            <span style="font-size:.75rem; color:var(--text-muted)">Maiores valores</span>
          </div>
          <div style="display:flex; flex-direction:column; gap:.6rem">
            ${n.map((l,v)=>{const g=a>0?(l.valorTotal/a*100).toFixed(1):0;return`
                <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(30,41,59,0.7); border-radius:6px; padding:.5rem .75rem">
                  <div style="display:flex; align-items:center; gap:.5rem">
                    <span style="font-size:1rem; font-weight:700">${v===0?"🥇":v===1?"🥈":v===2?"🥉":`#${v+1}`}</span>
                    <div>
                      <strong style="font-size:.85rem; color:#f8fafc">${l.nome}</strong>
                      <span style="font-size:.72rem; color:var(--text-muted); display:block">${l.qtd} compra${l.qtd>1?"s":""} • ${g}% do cartão</span>
                    </div>
                  </div>
                  <strong style="color:#fb7185; font-size:.95rem">${i(l.valorTotal)}</strong>
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
            ${r.map(l=>{const v=a>0?(l.valorTotal/a*100).toFixed(1):0;return`
                <div>
                  <div style="display:flex; justify-content:space-between; align-items:center; font-size:.83rem; margin-bottom:.2rem">
                    <span>${l.icone} <strong>${l.nome}</strong> <span style="font-size:.72rem; color:var(--text-muted)">(${l.qtd} itens)</span></span>
                    <strong style="color:#f8fafc">${i(l.valorTotal)} <span style="font-size:.72rem; color:var(--text-muted)">(${v}%)</span></strong>
                  </div>
                  <div class="progress-bar-bg" style="height:6px; border-radius:3px; background:rgba(255,255,255,0.08); overflow:hidden">
                    <div class="progress-bar-fill" style="width:${v}%; height:100%; background:var(--accent-purple); border-radius:3px"></div>
                  </div>
                </div>
              `}).join("")}
          </div>
        </div>

      </div>

      ${y}

    </div>
  `}function Ee(){const e=V.reduce((d,m)=>d+(m.valorTotal!==void 0?m.valorTotal:m.valor||0),0);document.getElementById("badge-total-cartoes").textContent=`${i(e)} total`;const t=document.getElementById("lista-faturas-registradas");if(!V.length){t.innerHTML='<div class="empty-state">Nenhuma fatura cadastrada ainda.</div>';return}const a=he(V),o=Vt(V,"geral"),n={};V.forEach(d=>{const m=d.mesAno||"Outros";n[m]||(n[m]=[]),n[m].push(d)});const r=Object.keys(n).sort((d,m)=>m.localeCompare(d)).map((d,m)=>{const c=n[d],p=c.reduce((l,v)=>l+(v.valorTotal!==void 0?v.valorTotal:v.valor||0),0);let u=d;if(d!=="Outros"&&d.includes("-")){const[l,v]=d.split("-"),T=new Date(parseInt(l),parseInt(v)-1,1).toLocaleString("pt-BR",{month:"long"});u=`${T.charAt(0).toUpperCase()+T.slice(1)} de ${l}`}const y=m===0;return`
      <div class="card" style="margin-bottom:1.25rem;background:rgba(15,23,42,0.45);border:1px solid var(--border-color)">
        <div class="card-header" style="cursor:pointer;user-select:none;display:flex;justify-content:space-between;align-items:center" onclick="toggleGroupMonth('fat-group-${d}')">
          <span class="card-title" style="font-size:1.05rem">📅 Faturas de ${u}</span>
          <div style="display:flex;align-items:center;gap:.75rem">
            <span class="badge blue" style="font-size:.85rem">Total: ${i(p)} (${c.length} fatura${c.length>1?"s":""})</span>
            <span class="chevron ${y?"open":""}" id="chev-fat-group-${d}">▼</span>
          </div>
        </div>
        <div id="fat-group-${d}" class="purchase-details ${y?"open":""}" style="padding:.75rem 1rem;display:${y?"block":"none"}">
          ${c.map(l=>{var h;const v=l.valorTotal!==void 0?l.valorTotal:l.valor||0,g=l.cartao||"Cartão",T=g.toLowerCase().includes("nubank"),C=T?"purple":"red",P=T?"🟣":"🔴",w=l.dataVencimento?pt(l.dataVencimento).split(",")[0]:"—",x=l.mesAno||"—";return`
              <div class="purchase-card" style="margin-bottom:1rem">
                <div class="purchase-header" onclick="toggleDetail('fat-${l.id}')">
                  <div class="purchase-info">
                    <h3><span class="badge ${C}">${P} ${g}</span> — Vencimento: ${w}</h3>
                    <p>📅 Mês Referência: <strong>${x}</strong> &nbsp;•&nbsp; 🛒 ${l.qtdItens||((h=l.itens)==null?void 0:h.length)||1} itens contemplados</p>
                  </div>
                  <div class="purchase-values" style="display:flex;align-items:center;gap:.75rem">
                    <div style="text-align:right">
                      <div class="pv-total" style="color:#fb7185">${i(v)}</div>
                      <div class="pv-sub">Fatura do Mês</div>
                    </div>
                    <button type="button" class="btn-danger" style="padding:.35rem .65rem;font-size:.78rem;margin-left:.25rem" onclick="event.stopPropagation(); excluirFaturaDocumento('${l.id}')" title="Excluir esta fatura de todos os lugares do sistema">
                      🗑️ Excluir
                    </button>
                  </div>
                  <svg class="chevron" id="chev-fat-${l.id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
                <div class="purchase-details" id="detail-fat-${l.id}">
                  <div class="details-toolbar">
                    <span class="card-subtext">Detalhamento dos Lançamentos da Fatura</span>
                    <button class="btn-danger" onclick="excluirFaturaDocumento('${l.id}')">🗑️ Excluir Fatura</button>
                  </div>
                  ${Gt(l)}
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `}).join("");t.innerHTML=a+o+r}function Gt(e){if(e.itens&&e.itens.length>0){const t=jt([e]),a=`fatura_${e.id}`;t.forEach(n=>{window.ultimosLocaisAnalisados[`${a}_${n.nome}`]=n});let o="";return t.length>0&&(o=`
        <div style="background:rgba(251,113,133,0.08); border:1px dashed rgba(251,113,133,0.35); border-radius:8px; padding:.75rem 1rem; margin-bottom:1rem">
          <div style="font-weight:700; font-size:.84rem; color:#fb7185; margin-bottom:.5rem">
            🏬 Locais com 2 ou mais compras nesta fatura (${t.length} estabelecimentos - clique para ver):
          </div>
          <div style="display:flex; flex-wrap:wrap; gap:.5rem">
            ${t.map(n=>`
                <span style="background:rgba(15,23,42,0.9); border:1px solid rgba(251,113,133,0.4); border-radius:6px; padding:.3rem .6rem; font-size:.78rem; color:#f1f5f9; display:inline-flex; align-items:center; gap:.35rem; cursor:pointer"
                      onclick="event.stopPropagation(); abrirModalComprasEstabelecimento('${`${a}_${n.nome}`}')"
                      title="Clique para ver detalhadamente as compras de ${n.nome}">
                  🏬 <strong>${n.nome}</strong>: <span class="badge rose" style="font-size:.7rem">${n.qtd}x compras</span> <strong style="color:#fb7185; margin-left:.25rem">${i(n.valorTotal)}</strong>
                </span>
              `).join("")}
          </div>
        </div>
      `),`
      ${o}
      <div class="table-responsive"><table class="custom-table">
        <thead><tr><th>Data Compra</th><th>Descrição do Lançamento</th><th class="num">Valor</th><th>Ação</th></tr></thead>
        <tbody>${e.itens.map((n,s)=>`<tr>
          <td><strong>${n.dataCompra||"—"}</strong></td>
          <td>${n.descricao}</td>
          <td class="num" style="color:#fb7185"><strong>${i(n.valor)}</strong></td>
          <td><button class="btn-danger" style="padding:.2rem .5rem; font-size:.78rem;" onclick="removerItemFaturaCadastrada('${e.id}', ${s})">🗑️ Excluir</button></td>
        </tr>`).join("")}</tbody>
      </table></div>
    `}return`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Descrição</th><th class="num">Valor</th><th>Ação</th></tr></thead>
    <tbody><tr>
      <td>${e.descricao||"Fatura do Cartão"}</td>
      <td class="num" style="color:#fb7185"><strong>${i(e.valor||e.valorTotal)}</strong></td>
      <td><button class="btn-danger" style="padding:.2rem .5rem; font-size:.78rem;" onclick="excluirFaturaDocumento('${e.id}')">🗑️ Excluir</button></td>
    </tr></tbody>
  </table></div>`}window.removerItemFaturaCadastrada=async function(e,t){const a=V.find(s=>s.id===e);if(!a||!a.itens||!confirm("Remover este item da fatura?"))return;const o=[...a.itens];o.splice(t,1);const n=o.reduce((s,r)=>s+(r.valor||0),0);o.length===0?(await Z(L(B,nt,e)),I("🗑️ Fatura excluída pois todos os itens foram removidos.")):(await H(L(B,nt,e),{...a,itens:o,valorTotal:n,qtdItens:o.length}),I("🗑️ Item removido da fatura."))};window.excluirFaturaDocumento=async function(e){confirm("Excluir esta fatura e todos os seus lançamentos?")&&(await Z(L(B,nt,e)),I("🗑️ Fatura removida com sucesso."))};let k=null;function $e(){const e=document.getElementById("inp-boleto-vencimento");if(e&&!e.value){const t=new Date,a=t.getFullYear(),o=String(t.getMonth()+1).padStart(2,"0");e.value=`${a}-${o}-10`,atualizarMesRefBoleto()}}setTimeout($e,300);window.atualizarMesRefBoleto=function(){const e=document.getElementById("inp-boleto-vencimento"),t=document.getElementById("lbl-boleto-mes-ref");if(!(!e||!t))if(e.value){const[a,o]=e.value.split("-"),s=new Date(parseInt(a),parseInt(o)-1,1).toLocaleString("pt-BR",{month:"long"});t.textContent=`Boleto ${s.charAt(0).toUpperCase()+s.slice(1)}/${a}`}else t.textContent="Mês do Boleto"};window.handleFileBoletoSelect=async function(e){const t=e.target.files[0];if(!t)return;const a=document.getElementById("txt-file-boleto");a&&(a.textContent=`📄 Arquivo: ${t.name}`),I(`⏳ Lendo arquivo do boleto (${t.name})...`);let o="";if(t.type==="application/pdf"||t.name.endsWith(".pdf"))o=await kt(t);else try{o=await t.text()}catch{o=""}o?(document.getElementById("inp-boleto-txt").value=o,await Ht(o,t.name)):I("❌ Não foi possível ler o texto do arquivo do boleto.")};window.importarBoletoManualOuArquivo=async function(){const e=document.getElementById("inp-boleto-txt").value.trim();if(!e){I("⚠️ Selecione o arquivo do boleto (.pdf, .txt) ou cole o texto do boleto.");return}await Ht(e,"Boleto")};async function Ht(e,t){const a=Ie(e);a.vencimento&&(document.getElementById("inp-boleto-vencimento").value=a.vencimento,atualizarMesRefBoleto());const o=document.getElementById("inp-boleto-vencimento").value||new Date().toISOString().slice(0,10),n=o.slice(0,7),s=a.beneficiario||t.replace(/\.[^/.]+$/,"")||"Boleto / Conta",r=a.itens.reduce((m,c)=>m+c.valor,0),d=a.valorTotal||r||0;document.getElementById("inp-revisao-boleto-desc").value=s,document.getElementById("inp-revisao-boleto-val").value=d?d.toFixed(2):"",k={descricao:s,dataVencimento:o,mesAno:n,valorTotal:d,qtdItens:a.itens.length,itens:a.itens},_t(),I("✅ Boleto identificado! Confira a descrição, valor e itens antes de salvar.")}window.atualizarValorTotalRevisaoBoleto=function(){if(!k)return;const e=parseFloat(document.getElementById("inp-revisao-boleto-val").value)||0;k.valorTotal=e,document.getElementById("badge-total-preview-boleto").textContent=i(e)};function _t(){if(!k)return;const{valorTotal:e,itens:t}=k;document.getElementById("badge-total-preview-boleto").textContent=i(e);const a=document.getElementById("lista-preview-boleto-itens");!t||!t.length?a.innerHTML='<div class="empty-state">Nenhum encargo/item individual extraído. O valor total acima será considerado.</div>':a.innerHTML=t.map((n,s)=>`
      <div style="display:flex; justify-content:space-between; align-items:center; padding:.4rem 0; border-bottom:1px dashed var(--border-color); font-size:.82rem;">
        <span><strong>${n.dataBoleto||"—"}</strong> — ${n.descricao}</span>
        <div style="display:flex; align-items:center; gap:.75rem;">
          <span style="color:#c084fc; font-weight:700;">${i(n.valor)}</span>
          <button type="button" class="btn-danger" style="padding:.15rem .45rem; font-size:.75rem;" onclick="removerItemRevisaoBoleto(${s})">🗑️</button>
        </div>
      </div>
    `).join("");const o=document.getElementById("box-revisao-boleto");o.style.display="block",o.scrollIntoView({behavior:"smooth"})}window.removerItemRevisaoBoleto=function(e){if(!k||!k.itens)return;k.itens.splice(e,1);const t=k.itens.reduce((a,o)=>a+o.valor,0);t>0&&(k.valorTotal=t,document.getElementById("inp-revisao-boleto-val").value=t.toFixed(2)),k.qtdItens=k.itens.length,_t(),I("🗑️ Item removido da revisão do boleto.")};window.confirmarEGravarBoletoDocumento=async function(){if(!k)return;const e=document.getElementById("inp-revisao-boleto-desc").value.trim(),t=parseFloat(document.getElementById("inp-revisao-boleto-val").value)||0,a=document.getElementById("inp-boleto-vencimento").value||new Date().toISOString().slice(0,10);if(!t){I("⚠️ Digite ou confirme o valor total do boleto.");return}k.descricao=e||"Boleto / Conta",k.valorTotal=t,k.dataVencimento=a,k.mesAno=a.slice(0,7);try{await ft(J(B,ot),{...k,createdAt:$t()}),document.getElementById("box-revisao-boleto").style.display="none",document.getElementById("inp-boleto-txt").value="";const o=document.getElementById("txt-file-boleto");o&&(o.textContent="Clique para Selecionar o Arquivo do Boleto");const n=i(k.valorTotal);k=null,I(`🎉 Boleto de ${n} salvo com sucesso!`)}catch(o){alert("Erro ao salvar boleto: "+o.message)}};function Ie(e){if(!e)return{beneficiario:"",valorTotal:0,vencimento:null,itens:[]};let t="",a=0,o=null;const n=[],s=e.match(/Vencimento\s*[:\s]*(\d{2}[\/\.-]\d{2}[\/\.-]\d{4})/i)||e.match(/Vencimento\s*[:\s]*(\d{2})\s+([A-Za-z]{3})\s+(\d{4})/i)||e.match(/Data\s*de\s*Vencimento\s*[:\s]*(\d{2}[\/\.-]\d{2}[\/\.-]\d{4})/i);if(s){if(s[2]&&s[3]){const c=s[1],p=s[2].toUpperCase();o=`${s[3]}-${{JAN:"01",FEB:"02",MAR:"03",ABR:"04",APR:"04",MAI:"05",MAY:"05",JUN:"06",JUL:"07",AGO:"08",AUG:"08",SET:"09",SEP:"09",OUT:"10",OCT:"10",NOV:"11",DEZ:"12",DEC:"12"}[p]||"07"}-${c.padStart(2,"0")}`}else if(s[1]){const[c,p,u]=s[1].split(/[\/\.-]/);o=`${u}-${p.padStart(2,"0")}-${c.padStart(2,"0")}`}}const r=e.match(/Benefici[áa]rio\s*[:\s]*([^\n\r]+)/i)||e.match(/Nome\s*do\s*Cedente\s*[:\s]*([^\n\r]+)/i)||e.match(/Raz[ãa]o\s*Social\s*[:\s]*([^\n\r]+)/i);r&&(t=r[1].trim().replace(/\s{2,}/g," "));const d=e.match(/Valor\s*do\s*Documento\s*[:\s]*R?\$\s*([\d\.]+,\d{2})/i)||e.match(/\(=\)\s*Valor\s*Cobrado\s*[:\s]*R?\$\s*([\d\.]+,\d{2})/i)||e.match(/Valor\s*Cobrado\s*[:\s]*R?\$\s*([\d\.]+,\d{2})/i)||e.match(/Valor\s*R?\$\s*([\d\.]+,\d{2})/i);return d&&(a=q(d[1])),e.split(`
`).forEach(c=>{const p=c.trim();if(!p||/vencimento|beneficiário|cedente|nosso\s*número|agência|código|autenticação|instruções/i.test(p))return;const u=p.match(/(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\b[A-Za-z]{3}\b)?\s*(.+?)\s+R?\$\s*([\d\.]+,\d{2})$/i);if(u){const y=u[1]||"Boleto",l=u[2].trim(),v=q(u[3]);l&&v>0&&l.length>2&&!/valor|total|documento|cobrado/i.test(l)&&n.push({dataBoleto:y,descricao:l,valor:v})}}),{beneficiario:t,valorTotal:a,vencimento:o,itens:n}}function Ae(){const e=N.reduce((n,s)=>n+(s.valorTotal!==void 0?s.valorTotal:s.valor||0),0);document.getElementById("badge-total-boletos").textContent=`${i(e)} total`;const t=document.getElementById("lista-boletos-registrados");if(!N.length){t.innerHTML='<div class="empty-state">Nenhum boleto cadastrado ainda.</div>';return}const a={};N.forEach(n=>{const s=n.mesAno||"Outros";a[s]||(a[s]=[]),a[s].push(n)});const o=Object.keys(a).sort((n,s)=>s.localeCompare(n));t.innerHTML=o.map((n,s)=>{const r=a[n];r.sort((p,u)=>{const y=p.dataVencimento?new Date(p.dataVencimento).getTime():0;return(u.dataVencimento?new Date(u.dataVencimento).getTime():0)-y});const d=r.reduce((p,u)=>p+(u.valorTotal!==void 0?u.valorTotal:u.valor||0),0);let m=n;if(n!=="Outros"&&n.includes("-")){const[p,u]=n.split("-"),l=new Date(parseInt(p),parseInt(u)-1,1).toLocaleString("pt-BR",{month:"long"});m=`${l.charAt(0).toUpperCase()+l.slice(1)} de ${p}`}const c=s===0;return`
      <div class="card" style="margin-bottom:1.25rem;background:rgba(15,23,42,0.45);border:1px solid var(--border-color)">
        <div class="card-header" style="cursor:pointer;user-select:none;display:flex;justify-content:space-between;align-items:center" onclick="toggleGroupMonth('bol-group-${n}')">
          <span class="card-title" style="font-size:1.05rem">📄 Boletos de ${m}</span>
          <div style="display:flex;align-items:center;gap:.75rem">
            <span class="badge purple" style="font-size:.85rem">Total: ${i(d)} (${r.length} boleto${r.length>1?"s":""})</span>
            <span class="chevron ${c?"open":""}" id="chev-bol-group-${n}">▼</span>
          </div>
        </div>
        <div id="bol-group-${n}" class="purchase-details ${c?"open":""}" style="padding:.75rem 1rem;display:${c?"block":"none"}">
          ${r.map(p=>{var g;const u=p.valorTotal!==void 0?p.valorTotal:p.valor||0,y=p.dataVencimento?pt(p.dataVencimento).split(",")[0]:"—",l=p.mesAno||"—",v=st(p);return`
              <div class="purchase-card" style="margin-bottom:1rem">
                <div class="purchase-header" onclick="toggleDetail('bol-${p.id}')">
                  <div class="purchase-info">
                    <h3><span class="badge purple">📄 ${v}</span> — Vencimento: ${y}</h3>
                    <p>📅 Mês Referência: <strong>${l}</strong> &nbsp;•&nbsp; 🛒 ${p.qtdItens||((g=p.itens)==null?void 0:g.length)||1} itens / encargos</p>
                  </div>
                  <div class="purchase-values" style="display:flex;align-items:center;gap:.5rem">
                    <div style="text-align:right">
                      <div class="pv-total" style="color:#c084fc">${i(u)}</div>
                      <div class="pv-sub">Boleto do Mês</div>
                    </div>
                    <button type="button" class="btn-secondary" style="padding:.35rem .65rem;font-size:.78rem;margin-left:.25rem" onclick="event.stopPropagation(); editarValorBoletoDocumento('${p.id}')" title="Editar valor do boleto">
                      ✏️ Editar
                    </button>
                    <button type="button" class="btn-danger" style="padding:.35rem .65rem;font-size:.78rem" onclick="event.stopPropagation(); excluirBoletoDocumento('${p.id}')" title="Excluir este boleto de todos os lugares do sistema">
                      🗑️ Excluir
                    </button>
                  </div>
                  <svg class="chevron" id="chev-bol-${p.id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
                <div class="purchase-details" id="detail-bol-${p.id}">
                  <div class="details-toolbar">
                    <span class="card-subtext">Detalhamento dos Itens / Encargos do Boleto</span>
                    <div style="display:flex;gap:.35rem">
                      <button class="btn-secondary" onclick="editarValorBoletoDocumento('${p.id}')">✏️ Editar Valor</button>
                      <button class="btn-danger" onclick="excluirBoletoDocumento('${p.id}')">🗑️ Excluir Boleto</button>
                    </div>
                  </div>
                  ${Qt(p)}
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `}).join("")}function st(e){if(!e)return"Boleto";let t=e.descricao;return(!t||t==="Boleto"||t==="Boleto / Conta")&&(e.itens&&e.itens.length>0&&e.itens[0].descricao?t=e.itens[0].descricao:e.beneficiario?t=e.beneficiario:t="Boleto"),t=t.trim().replace(/[-–—\s]+$/,"").trim(),t||"Boleto"}function Qt(e){return e.itens&&e.itens.length>0?`<div class="table-responsive"><table class="custom-table">
      <thead><tr><th>Data</th><th>Descrição / Item</th><th class="num">Valor</th><th>Ação</th></tr></thead>
      <tbody>${e.itens.map((t,a)=>`<tr>
        <td><strong>${t.dataBoleto||"—"}</strong></td>
        <td>${t.descricao}</td>
        <td class="num" style="color:#c084fc"><strong>${i(t.valor)}</strong></td>
        <td>
          <div style="display:flex;gap:.35rem;align-items:center">
            <button class="btn-secondary" style="padding:.2rem .5rem; font-size:.78rem;" onclick="editarItemBoleto('${e.id}', ${a})" title="Editar valor deste item">✏️ Editar</button>
            <button class="btn-danger" style="padding:.2rem .5rem; font-size:.78rem;" onclick="removerItemBoletoCadastrado('${e.id}', ${a})">🗑️ Excluir</button>
          </div>
        </td>
      </tr>`).join("")}</tbody>
    </table></div>`:`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Descrição</th><th class="num">Valor</th><th>Ação</th></tr></thead>
    <tbody><tr>
      <td>${e.descricao||"Boleto"}</td>
      <td class="num" style="color:#c084fc"><strong>${i(e.valor||e.valorTotal)}</strong></td>
      <td>
        <div style="display:flex;gap:.35rem;align-items:center">
          <button class="btn-secondary" style="padding:.2rem .5rem; font-size:.78rem;" onclick="editarValorBoletoDocumento('${e.id}')" title="Editar valor do boleto">✏️ Editar</button>
          <button class="btn-danger" style="padding:.2rem .5rem; font-size:.78rem;" onclick="excluirBoletoDocumento('${e.id}')">🗑️ Excluir</button>
        </div>
      </td>
    </tr></tbody>
  </table></div>`}window.editarValorBoletoDocumento=function(e){const t=N.find(s=>s.id===e);if(!t)return;const a=t.valorTotal!==void 0?t.valorTotal:t.valor||0,o=typeof st=="function"?st(t):t.descricao||"Boleto";document.getElementById("inp-edit-boleto-id").value=e,document.getElementById("inp-edit-item-index").value="",document.getElementById("inp-edit-boleto-desc").value=o,document.getElementById("inp-edit-boleto-valor").value=a.toFixed(2),document.getElementById("titulo-modal-editar-boleto").textContent="✏️ Editar Valor do Boleto";const n=document.getElementById("modal-editar-boleto");n&&(n.classList.add("active"),setTimeout(()=>{const s=document.getElementById("inp-edit-boleto-valor");s&&(s.focus(),s.select())},100))};window.editarItemBoleto=function(e,t){const a=N.find(r=>r.id===e);if(!a||!a.itens||!a.itens[t])return;const o=a.itens[t],n=o.valor||0;document.getElementById("inp-edit-boleto-id").value=e,document.getElementById("inp-edit-item-index").value=t,document.getElementById("inp-edit-boleto-desc").value=o.descricao||(typeof st=="function"?st(a):"Item"),document.getElementById("inp-edit-boleto-valor").value=n.toFixed(2),document.getElementById("titulo-modal-editar-boleto").textContent="✏️ Editar Valor do Item";const s=document.getElementById("modal-editar-boleto");s&&(s.classList.add("active"),setTimeout(()=>{const r=document.getElementById("inp-edit-boleto-valor");r&&(r.focus(),r.select())},100))};window.fecharModalEditarBoleto=function(){const e=document.getElementById("modal-editar-boleto");e&&e.classList.remove("active")};document.getElementById("form-editar-boleto").addEventListener("submit",async e=>{e.preventDefault();const t=document.getElementById("inp-edit-boleto-id").value,a=document.getElementById("inp-edit-item-index").value,o=document.getElementById("inp-edit-boleto-valor").value,n=parseFloat(o);if(!t||isNaN(n)||n<=0){alert("Por favor, informe um valor numérico válido maior que zero.");return}const s=N.find(r=>r.id===t);if(s)try{const r=L(B,ot,t);if(a===""){const d={valorTotal:n,valor:n,dataAtualizacao:new Date().toISOString()};if(s.itens&&s.itens.length>0){const m=[...s.itens];m[0]={...m[0],valor:n},d.itens=m}await H(r,d,{merge:!0}),I(`✏️ Valor do boleto atualizado para ${i(n)} em todo o sistema!`)}else{const d=parseInt(a);if(s.itens&&s.itens[d]){const m=[...s.itens];m[d]={...m[d],valor:n};const c=m.reduce((p,u)=>p+(u.valor||0),0);await H(r,{...s,itens:m,valorTotal:c,valor:c,dataAtualizacao:new Date().toISOString()},{merge:!0}),I(`✏️ Item do boleto atualizado para ${i(n)} em todo o sistema!`)}}fecharModalEditarBoleto()}catch(r){alert("Erro ao atualizar valor do boleto: "+r.message)}});window.removerItemBoletoCadastrado=async function(e,t){const a=N.find(s=>s.id===e);if(!a||!a.itens||!confirm("Remover este item do boleto?"))return;const o=[...a.itens];o.splice(t,1);const n=o.reduce((s,r)=>s+(r.valor||0),0);o.length===0?(await Z(L(B,ot,e)),I("🗑️ Boleto excluído pois todos os itens foram removidos.")):(await H(L(B,ot,e),{...a,itens:o,valorTotal:n,qtdItens:o.length}),I("🗑️ Item removido do boleto."))};window.excluirBoletoDocumento=async function(e){const t=N.find(n=>n.id===e),a=t?t.descricao||"Boleto / Conta":"este boleto",o=t?i(t.valorTotal!==void 0?t.valorTotal:t.valor||0):"";confirm(`⚠️ Deseja realmente excluir ${a} ${o?"("+o+")":""}?

Este boleto será removido permanentemente de todos os meses, resumos e relatórios do sistema.`)&&(await Z(L(B,ot,e)),I("🗑️ Boleto removido de todo o sistema com sucesso."))};document.getElementById("form-config-reservas").addEventListener("submit",async e=>{e.preventDefault();const t=parseFloat(document.getElementById("inp-meta-anual").value)||0,a=parseFloat(document.getElementById("inp-saldo-guardado").value)||0;_.metaAnual=t,_.valorAtualGuardado=a,await H(L(B,Dt,"config"),{metaAnual:t,valorAtualGuardado:a,dataAtualizacao:new Date().toISOString()}),I("✅ Reservas e configurações de economias salvas!"),W()});function xe(){const e=_&&_.metaAnual!==void 0?_.metaAnual:15e3,t=_&&_.valorAtualGuardado!==void 0?_.valorAtualGuardado:3e3,a=document.getElementById("inp-meta-anual");a&&document.activeElement!==a&&(a.value=e);const o=document.getElementById("inp-saldo-guardado");o&&document.activeElement!==o&&(o.value=t);const s=new Date().getMonth()+1,r=Math.max(1,12-s+1),d=Math.max(0,e-t),m=d>0?d/r:0;document.getElementById("val-meta-reserva").textContent=i(m);const c=document.getElementById("subtext-meta-reserva");c&&(c.textContent=`Faltam ${i(d)} p/ Meta Anual de ${i(e)} (${r} mês(es) até o fim do ano)`),document.getElementById("val-real-guardado").textContent=i(t);const p=lt();let u=0,y=0,l=0,v=0;p.forEach(S=>{const b=Q.filter(D=>D.mesAno===S).reduce((D,O)=>D+(O.valor||0),0),f=V.filter(D=>D.mesAno===S).reduce((D,O)=>D+(O.valorTotal!==void 0?O.valorTotal:O.valor||0),0),$=N.filter(D=>D.mesAno===S).reduce((D,O)=>D+(O.valorTotal!==void 0?O.valorTotal:O.valor||0),0);let R=0;U.filter(D=>D.mesAno===S).forEach(D=>{D.formasPagamento&&(R+=D.formasPagamento.cartaoDebito||0)}),u+=b,y+=f,l+=$,v+=R});const g=y+l+v,T=u-g,C=Math.max(1,p.length),P=u/C,w=g/C,x=T/C,h=x>0?x:0,A=h*r,M=t+A;document.getElementById("val-recomendacao-reserva").textContent=i(M);const j=document.getElementById("subtext-recomendacao");if(j)if(M>=e)j.innerHTML=`✅ Projeção de <strong style="color:#34d399">${i(M)}</strong> até Dez/2026 supera sua Meta Anual de ${i(e)}!`;else{const S=e-M;j.innerHTML=`⚠️ Sobra média de ${i(h)}/mês. Projeção de ${i(M)} fica <strong style="color:#fb7185">${i(S)}</strong> abaixo da Meta de ${i(e)}.`}const F=document.getElementById("box-analise-reserva-detalhes");if(F)if(u===0)F.innerHTML='<p class="empty-state">Cadastre seus salários e entradas na aba "Salários & Entradas" para gerar o diagnóstico inteligente de economias.</p>';else{const S=e>0?Math.min(100,t/e*100).toFixed(1):0,b=M>=e;let f="";if(b)f=`
          <div style="background:rgba(16,185,129,0.12);border:1px solid rgba(16,185,129,0.35);border-radius:8px;padding:.85rem 1rem;margin-top:.85rem">
            <span style="color:#34d399;font-weight:700;font-size:.9rem">✅ DIAGNÓSTICO: META ANUAL TOTALMENTE ATINGÍVEL!</span>
            <p style="font-size:.85rem;color:#f1f5f9;margin-top:.35rem;line-height:1.45">
              Com base na sua média de sobra mensal livre de <strong style="color:#34d399">${i(x)}/mês</strong> (Entradas: ${i(P)} vs Saídas: ${i(w)}), a projeção é acumular <strong style="color:#34d399">${i(M)}</strong> até o fim do ano.
              Isso <strong>SUPERA a sua Meta Anual de ${i(e)}</strong> (contemplando o valor já guardado de ${i(t)})!
            </p>
          </div>
        `;else if(x>0){const $=Math.max(0,m-x);f=`
          <div style="background:rgba(245,158,11,0.12);border:1px solid rgba(245,158,11,0.35);border-radius:8px;padding:.85rem 1rem;margin-top:.85rem">
            <span style="color:#fbbf24;font-weight:700;font-size:.9rem">⚠️ DIAGNÓSTICO: META DESAFIADORA (AJUSTE DE ECONOMIA NECESSÁRIO)</span>
            <p style="font-size:.85rem;color:#f1f5f9;margin-top:.35rem;line-height:1.45">
              Com a sua sobra média mensal atual de <strong style="color:#fbbf24">${i(x)}/mês</strong>, o sistema projeta acumular <strong style="color:#60a5fa">${i(M)}</strong> até o fim do ano (somando os ${i(t)} já guardados).
              Para alcançar a sua Meta de <strong>${i(e)}</strong> (faltam ${i(d)}), é necessário guardar <strong style="color:#fb7185">${i(m)}/mês</strong> nos próximos ${r} meses (um incremento de <strong>${i($)}/mês</strong> em relação à sua média).
            </p>
          </div>
        `}else f=`
          <div style="background:rgba(251,113,133,0.12);border:1px solid rgba(251,113,133,0.35);border-radius:8px;padding:.85rem 1rem;margin-top:.85rem">
            <span style="color:#fb7185;font-weight:700;font-size:.9rem">🚨 DIAGNÓSTICO: ALERTA DE VIABILIDADE (SAÍDAS SUPERARAM ENTRADAS)</span>
            <p style="font-size:.85rem;color:#f1f5f9;margin-top:.35rem;line-height:1.45">
              No histórico dos ${C} meses registrados, suas saídas (${i(g)}) superaram as entradas (${i(u)}), com saldo médio negativo de ${i(x)}/mês.
              A projeção do sistema prevê apenas a manutenção dos <strong style="color:#34d399">${i(t)}</strong> já guardados. Para atingir sua Meta Anual de <strong>${i(e)}</strong> (faltam <strong>${i(d)}</strong>), você precisará guardar <strong style="color:#fb7185">${i(m)}/mês</strong> nos próximos ${r} mês(es).
            </p>
          </div>
        `;F.innerHTML=`
        <p style="margin-bottom:.5rem;font-weight:600">
          Com base no histórico dos ${C} mês(es) registrados (Média Entradas: <strong>${i(P)}</strong> vs Saídas: <strong>${i(w)}</strong>):
        </p>
        <div style="background:rgba(15,23,42,0.6);padding:1.1rem;border-radius:10px;margin:.75rem 0;border:1px solid var(--border-color)">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem;flex-wrap:wrap;gap:.75rem">
            <div>
              <span style="font-size:.82rem;color:var(--text-muted);display:block">💰 Saldo Líquido no Período</span>
              <strong style="font-size:1.15rem;color:${T>=0?"#60a5fa":"#fb7185"}">${i(T)}</strong>
            </div>
            <div>
              <span style="font-size:.82rem;color:var(--text-muted);display:block">🏦 Total Guardado na Reserva</span>
              <strong style="font-size:1.15rem;color:#34d399">${i(t)}</strong>
            </div>
            <div>
              <span style="font-size:.82rem;color:var(--text-muted);display:block">🎯 Meta Anual Desejada</span>
              <strong style="font-size:1.15rem;color:#a5b4fc">${i(e)}</strong>
            </div>
          </div>

          <div class="progress-bar-bg" style="height:12px;border-radius:6px;background:rgba(255,255,255,0.08);overflow:hidden;margin:.75rem 0 .4rem 0">
            <div class="progress-bar-fill" style="width:${S}%;height:100%;background:linear-gradient(90deg,#10b981,#34d399);border-radius:6px"></div>
          </div>

          <div style="display:flex;justify-content:space-between;font-size:.82rem;color:var(--text-muted);margin-top:.4rem;flex-wrap:wrap;gap:.5rem">
            <span>Progresso Atual: <strong style="color:#34d399">${i(t)}</strong> de ${i(e)} (<strong>${S}%</strong> concluído)</span>
            <span>Faltam guardar: <strong style="color:#fb7185">${i(d)}</strong> em ${r} mês(es)</span>
          </div>
        </div>

        ${f}
      `}we()}function we(){const e=document.getElementById("container-analise-mensal-lista");if(!e)return;const t=lt();if(!t.length){e.innerHTML='<div class="empty-state">Nenhum mês registrado para gerar a análise mensal.</div>';return}const a=t.map(o=>{const s=Q.filter(h=>h.mesAno===o).reduce((h,A)=>h+(A.valor||0),0),r=V.filter(h=>h.mesAno===o),d=r.reduce((h,A)=>h+(A.valorTotal!==void 0?A.valorTotal:A.valor||0),0),m=N.filter(h=>h.mesAno===o),c=m.reduce((h,A)=>h+(A.valorTotal!==void 0?A.valorTotal:A.valor||0),0),p=U.filter(h=>h.mesAno===o);let u=0;p.forEach(h=>{h.formasPagamento&&(u+=h.formasPagamento.cartaoDebito||0)});const y=d+c+u,l=s-y,v=l>=0,[g,T]=o.split("-"),P=new Date(parseInt(g),parseInt(T)-1,1).toLocaleString("pt-BR",{month:"long"}),w=P.charAt(0).toUpperCase()+P.slice(1);let x="";if(v){const h=l*.5;x=`
        <div style="background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.25); border-radius:10px; padding:.85rem 1rem; margin-top:1rem">
          <div style="font-weight:700; font-size:.88rem; color:#34d399; margin-bottom:.2rem">
            🎉 Mês Positivo! Capacidade de Poupança Excelente
          </div>
          <p style="font-size:.8rem; color:var(--text-muted); margin:0">
            Neste mês sobraram <strong>${i(l)}</strong> em conta. O sistema sugere destinar pelo menos <strong style="color:#34d399">${i(h)}</strong> para sua reserva!
          </p>
        </div>
      `}else{const h=Math.abs(l);let A="Cartão de Crédito",M=d;c>M&&(A="Boletos & Contas",M=c),u>M&&(A="Mercado no Débito",M=u);const j=y>0?(M/y*100).toFixed(1):0;let F="",S=0;r.forEach(b=>{const f=b.valorTotal!==void 0?b.valorTotal:b.valor||0;f>S&&(S=f,F=`Fatura do ${b.cartao||"Cartão"}`)}),m.forEach(b=>{const f=b.valorTotal!==void 0?b.valorTotal:b.valor||0;f>S&&(S=f,F=`Boleto ${b.descricao||"de Conta"}`)}),x=`
        <div style="background:rgba(244,63,94,0.1); border:1px solid rgba(244,63,94,0.3); border-radius:10px; padding:.85rem 1rem; margin-top:1rem">
          <div style="font-weight:700; font-size:.88rem; color:#fb7185; margin-bottom:.4rem; display:flex; align-items:center; gap:.4rem">
            ⚠️ O que causou o déficit em ${w}/${g}?
          </div>
          <p style="font-size:.82rem; color:var(--text-main); margin-bottom:.5rem; line-height:1.5">
            As saídas (<strong>${i(y)}</strong>) superaram as entradas (<strong>${i(s)}</strong>) em <strong style="color:#fb7185">${i(h)}</strong>.
          </p>
          <div style="font-size:.78rem; color:var(--text-muted); line-height:1.5">
            • <strong>Vilão Principal:</strong> A categoria <strong style="color:#f8fafc">${A}</strong> representou <strong>${j}%</strong> de todas as saídas do mês (${i(M)}).
            ${F?`<br>• <strong>Maior Despesa Registrada:</strong> ${F} no valor de <strong style="color:#fb7185">${i(S)}</strong>.`:""}
          </div>
        </div>
      `}return`
      <div class="card" style="margin-bottom:1.25rem; border-color:${v?"rgba(52,211,153,0.3)":"rgba(251,113,133,0.4)"}">
        <div class="card-header" style="flex-wrap:wrap; gap:.5rem">
          <div style="display:flex; align-items:center; gap:.5rem">
            <span class="card-title" style="font-size:1rem; color:#f8fafc">📅 ${w} de ${g}</span>
            <span class="badge ${v?"green":"red"}">${v?"🟢 Superávit":"🔴 Déficit"}</span>
          </div>
          <button type="button" class="btn-secondary" style="padding:.25rem .6rem; font-size:.78rem" onclick="verMesEIrParaControle('${o}')">
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
            <div style="font-weight:700; font-size:1rem; color:#fb7185">${i(d)}</div>
          </div>

          <div style="background:rgba(15,23,42,0.6); padding:.6rem .8rem; border-radius:8px; border:1px solid var(--border-color)">
            <div style="font-size:.75rem; color:var(--text-muted)">Boletos & Contas</div>
            <div style="font-weight:700; font-size:1rem; color:#c084fc">${i(c)}</div>
          </div>

          <div style="background:rgba(15,23,42,0.6); padding:.6rem .8rem; border-radius:8px; border:1px solid var(--border-color)">
            <div style="font-size:.75rem; color:var(--text-muted)">Mercado (Débito)</div>
            <div style="font-weight:700; font-size:1rem; color:#fbbf24">${i(u)}</div>
          </div>

          <div style="background:rgba(15,23,42,0.8); padding:.6rem .8rem; border-radius:8px; border:1px solid ${v?"#34d399":"#fb7185"}">
            <div style="font-size:.75rem; color:var(--text-muted)">Saldo Líquido no Mês</div>
            <div style="font-weight:800; font-size:1.05rem; color:${v?"#60a5fa":"#fb7185"}">${i(l)}</div>
          </div>
        </div>

        ${x}
      </div>
    `}).join("");e.innerHTML=`
    <div class="card" style="margin-top:1.5rem; background:linear-gradient(135deg,rgba(30,41,59,.9),rgba(15,23,42,.95)); border-color:var(--secondary)">
      <div class="card-header">
        <span class="card-title" style="color:#a5b4fc; font-size:1.05rem">📊 Análise Geral Mês a Mês (Capacidade de Economia & Diagnóstico)</span>
        <span class="badge purple">${t.length} meses analisados</span>
      </div>
      <p style="font-size:.78rem; color:var(--text-muted); margin-bottom:1rem">
        Abaixo está o raio-x financeiro de cada mês com o diagnóstico automático do que gerou superávit ou déficit:
      </p>
      ${a}
    </div>
  `}const gt=[{id:"est_1",nome:"Corte de Cabelo Victor",quantidade:2,valorUnitario:70},{id:"est_2",nome:"Compra Programada Tunico",quantidade:1,valorUnitario:150},{id:"est_3",nome:"Sobrancelha Maria",quantidade:1,valorUnitario:50},{id:"est_4",nome:"Unha Maria",quantidade:1,valorUnitario:90},{id:"est_5",nome:"Banho Tunico",quantidade:1,valorUnitario:65},{id:"est_6",nome:"Saída Simples",quantidade:2,valorUnitario:100},{id:"est_7",nome:"Saída Premiun",quantidade:1,valorUnitario:150},{id:"est_8",nome:"Saída Premiun Plus",quantidade:1,valorUnitario:200},{id:"est_9",nome:"Mercado Pontual",quantidade:4,valorUnitario:70},{id:"est_10",nome:"Farmacia",quantidade:2,valorUnitario:35},{id:"est_11",nome:"Padaria 3D",quantidade:10,valorUnitario:10}];window.abrirModalAddEstimativa=function(e=null){const t=document.getElementById("modal-add-estimativa");if(t){if(document.getElementById("inp-est-id").value=e||"",e){document.getElementById("titulo-modal-estimativa").textContent="✏️ Editar Gastos Previsto";const a=K.find(n=>n.id===E),o=((a==null?void 0:a.itens)||[]).find(n=>n.id===e);o&&(document.getElementById("inp-est-nome").value=o.nome||"",document.getElementById("inp-est-qtd").value=o.quantidade||1,document.getElementById("inp-est-val").value=o.valorUnitario||0)}else document.getElementById("titulo-modal-estimativa").textContent="➕ Adicionar Gastos Previsto",document.getElementById("inp-est-nome").value="",document.getElementById("inp-est-qtd").value=1,document.getElementById("inp-est-val").value="";t.classList.add("active")}};window.fecharModalAddEstimativa=function(){var e;(e=document.getElementById("modal-add-estimativa"))==null||e.classList.remove("active")};var Ct;(Ct=document.getElementById("form-item-estimativa"))==null||Ct.addEventListener("submit",async e=>{e.preventDefault();const t=document.getElementById("inp-est-id").value,a=document.getElementById("inp-est-nome").value.trim(),o=parseFloat(document.getElementById("inp-est-qtd").value)||1,n=parseFloat(document.getElementById("inp-est-val").value)||0;if(!a){alert("Preencha a descrição do gasto.");return}const s=K.find(d=>d.id===E);let r=s?[...s.itens||[]]:[...gt];t?r=r.map(d=>d.id===t?{...d,nome:a,quantidade:o,valorUnitario:n}:d):r.push({id:"est_"+Date.now(),nome:a,quantidade:o,valorUnitario:n}),await H(L(B,tt,E),{mesAno:E,itens:r,ultimaAtualizacao:new Date().toISOString()}),fecharModalAddEstimativa(),I("✅ Estimativa atualizada!")});window.atualizarQtdItemEstimativa=async function(e,t){const a=K.find(s=>s.id===E);if(!a)return;const o=Math.max(1,parseInt(t)||1),n=(a.itens||[]).map(s=>s.id===e?{...s,quantidade:o}:s);await H(L(B,tt,E),{mesAno:E,itens:n,ultimaAtualizacao:new Date().toISOString()})};window.atualizarValorItemEstimativa=async function(e,t){const a=K.find(s=>s.id===E);if(!a)return;const o=Math.max(0,parseFloat(t)||0),n=(a.itens||[]).map(s=>s.id===e?{...s,valorUnitario:o}:s);await H(L(B,tt,E),{mesAno:E,itens:n,ultimaAtualizacao:new Date().toISOString()})};window.excluirItemEstimativa=async function(e){if(!confirm("Remover este item da estimativa do mês?"))return;const t=K.find(o=>o.id===E);if(!t)return;const a=(t.itens||[]).filter(o=>o.id!==e);await H(L(B,tt,E),{mesAno:E,itens:a,ultimaAtualizacao:new Date().toISOString()}),I("🗑️ Item removido da estimativa.")};window.resetarItensEstimativaPadrao=async function(){confirm(`Deseja carregar/resetar os 11 itens padrão de previsão para ${E}?`)&&(await H(L(B,tt,E),{mesAno:E,itens:gt,ultimaAtualizacao:new Date().toISOString()}),I("🔄 Itens padrão de estimativa carregados!"))};function Be(){const e=document.getElementById("container-lista-estimativa");if(!e)return;const t=K.find(l=>l.id===E);let a=[];t&&Array.isArray(t.itens)?a=t.itens:(a=gt,H(L(B,tt,E),{mesAno:E,itens:gt,ultimaAtualizacao:new Date().toISOString()}).catch(l=>console.error("Auto init estimativa error:",l)));let o=0;a.forEach(l=>{o+=(l.quantidade||0)*(l.valorUnitario||0)});const n=document.getElementById("val-total-estimativa-mes");n&&(n.textContent=i(o));const[s,r]=E.split("-"),m=new Date(parseInt(s),parseInt(r)-1,1).toLocaleString("pt-BR",{month:"long"}),c=m.charAt(0).toUpperCase()+m.slice(1),p=document.getElementById("subtext-estimativa-mes");p&&(p.textContent=`Total previsto para ${c} de ${s} (${a.length} itens cadastrados)`);const u=document.getElementById("badge-count-estimativa");if(u&&(u.textContent=`${a.length} itens previstos`),!a.length){e.innerHTML=`
      <div class="empty-state">
        <p>Nenhum gasto estimado para ${E}.</p>
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
          ${a.map(l=>{const v=(l.quantidade||0)*(l.valorUnitario||0);return`
              <tr>
                <td>
                  <strong style="color:#f8fafc">${l.nome}</strong>
                </td>
                <td class="num">
                  <input type="number" min="1" step="1" class="form-control" style="width:70px;padding:.2rem .4rem;font-size:.82rem;text-align:center" value="${l.quantidade}" onchange="atualizarQtdItemEstimativa('${l.id}', this.value)">
                </td>
                <td class="num">
                  <input type="number" min="0" step="0.01" class="form-control" style="width:95px;padding:.2rem .4rem;font-size:.82rem;text-align:right" value="${l.valorUnitario}" onchange="atualizarValorItemEstimativa('${l.id}', this.value)">
                </td>
                <td class="num">
                  <strong style="color:#a5b4fc">${i(v)}</strong>
                </td>
                <td style="text-align:right">
                  <div style="display:flex;gap:.35rem;justify-content:flex-end">
                    <button type="button" class="btn-secondary" style="padding:.2rem .4rem;font-size:.75rem" onclick="abrirModalAddEstimativa('${l.id}')" title="Editar">✏️</button>
                    <button type="button" class="btn-danger" style="padding:.2rem .4rem;font-size:.75rem" onclick="excluirItemEstimativa('${l.id}')" title="Excluir">🗑️</button>
                  </div>
                </td>
              </tr>
            `}).join("")}
        </tbody>
      </table>
    </div>
  `;e.innerHTML=y}function Te(){const e=document.getElementById("lista-mensal-container");if(!e)return;const t=new Date,a=new Date(t.getFullYear(),t.getMonth()+1,1),o=a.toLocaleString("pt-BR",{month:"long"}),n=a.getFullYear(),s=`${o.charAt(0).toUpperCase()+o.slice(1)} de ${n}`,r=le(a.getFullYear(),a.getMonth()),d=31.8,m=20,c=r*d,p=r*m,u={};let y=0;U.forEach(b=>{const f=b.valorAPagar||0;y+=f;const $=b.mesAno||"Outros";u[$]=(u[$]||0)+f});const l=Math.max(1,Object.keys(u).length),v=y/l,g={};U.forEach(b=>{(b.itens||[]).forEach(f=>{const $=(f.nome||"").toLowerCase().trim();$&&(g[$]||(g[$]={nome:f.nome,marca:f.marca||"Geral",qtdTotal:0,frequenciaNotas:0,valoresUnitarios:[]}),g[$].qtdTotal+=f.quantidade||1,g[$].frequenciaNotas+=1,f.valorUnitario&&g[$].valoresUnitarios.push(f.valorUnitario))})});const T=Object.values(g).map(b=>{const f=b.valoresUnitarios.length>0?b.valoresUnitarios.reduce((ct,vt)=>ct+vt,0)/b.valoresUnitarios.length:0,$=b.qtdTotal/l,R=l/Math.max(1,b.frequenciaNotas),D=b.frequenciaNotas/l;let O=0;D>=.35||$>=.7?O=Math.ceil($):O=Math.round($),O<1&&b.frequenciaNotas>=l&&(O=1);const dt=O*f;return{nome:b.nome,marca:b.marca,frequenciaNotas:b.frequenciaNotas,intervaloMeses:R,qtdMensalTaxa:$,totalEstimadoUnidades:O,valorUnitario:f,subtotalCalculado:dt}}).filter(b=>b.totalEstimadoUnidades>0);T.sort((b,f)=>f.frequenciaNotas-b.frequenciaNotas);const C=T.reduce((b,f)=>b+f.subtotalCalculado,0),P=v>0?v*1.05:C;let w=1;C>P&&v>0&&(w=P/C);const x=T.map(b=>({...b,subtotalFinal:b.subtotalCalculado*w})),h=v>0?Math.min(C,P):C;let A=h;const M=Math.min(A,c);A-=M;const j=Math.min(A,p);A-=j;const F=A>0?A:0;let S=`
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
          <div class="p-val" style="color:#34d399;">${i(M)} <span style="font-size:0.75rem;font-weight:normal;color:var(--text-muted)">/ ${i(c)}</span></div>
        </div>
        <div class="payment-item" style="border-color: rgba(99,102,241,0.4);">
          <div class="p-label">💳 Cartão Crédito (${r}d × R$ 20,00)</div>
          <div class="p-val" style="color:#818cf8;">${i(j)} <span style="font-size:0.75rem;font-weight:normal;color:var(--text-muted)">/ ${i(p)}</span></div>
        </div>
        <div class="payment-item" style="border-color: ${F>0?"rgba(244,63,94,0.5)":"var(--border-color)"};">
          <div class="p-label">💳 Débito Necessário (Excedente)</div>
          <div class="p-val" style="color: ${F>0?"#fb7185":"var(--text-muted)"};">${i(F)}</div>
        </div>
      </div>

      <div style="margin-top:1.25rem; padding-top:1rem; border-top:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
        <div>
          <span style="font-size:0.85rem; color:var(--text-muted);">Total Estimado da Lista de Compras:</span>
          <p style="font-size:0.75rem; color:#60a5fa;">Média Histórica de Gastos: ${i(v)}</p>
        </div>
        <span style="font-size:1.6rem; font-weight:800; color:var(--primary);">${i(h)}</span>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-title">Lista de Itens com Frequência e Total Estimado</span>
        <span class="badge amber">${x.length} itens cadastrados</span>
      </div>
      <p class="card-subtext" style="margin-bottom:1rem;">
        O <strong>Total Estimado</strong> arredonda o consumo médio para cima (unidades inteiras exatas), pois os produtos são comprados por unidade no mercado.
      </p>
  `;window.dadosListaMensalCache={mesAnoStr:s,diasUteis:r,totalGeralEstimado:h,cobertoAlim:M,cobertoCred:j,cobertoDeb:F,alimDisponivel:c,credDisponivel:p,lista:x},x.length===0?S+='<div class="empty-state">Adicione notas fiscais para que o sistema gere automaticamente sua lista mensal de compras.</div></div>':S+=`
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
            ${x.map(b=>{const f=b.intervaloMeses>1.2?`A cada ${b.intervaloMeses.toFixed(1)} meses`:`Todo mês (${b.frequenciaNotas}x)`,$=b.qtdMensalTaxa<1?b.qtdMensalTaxa.toFixed(2):b.qtdMensalTaxa.toFixed(1),R=b.totalEstimadoUnidades.toFixed(1);return`
                <tr>
                  <td><strong>${b.nome}</strong></td>
                  <td><span class="badge amber">${b.marca}</span></td>
                  <td><span class="badge cyan">${f}</span></td>
                  <td class="num">${$} un/mês</td>
                  <td class="num"><span class="badge green" style="font-size:0.82rem;">${R}</span></td>
                  <td class="num">${i(b.valorUnitario)}</td>
                  <td class="num"><strong>${i(b.subtotalFinal)}</strong></td>
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
    </div>`,e.innerHTML=S}window.exportarPDFListaMensal=function(){if(!window.dadosListaMensalCache||!window.dadosListaMensalCache.lista.length){I("⚠️ Nenhuma lista mensal disponível para exportar.");return}const{mesAnoStr:e,diasUteis:t,totalGeralEstimado:a,cobertoAlim:o,cobertoCred:n,cobertoDeb:s,lista:r}=window.dadosListaMensalCache,d=window.open("","_blank","width=900,height=750");if(!d){alert("Permita pop-ups no navegador para gerar o PDF da lista.");return}const m=`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>Lista de Compras - ${e}</title>
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
          <p>Previsão para <strong>${e}</strong> (${t} dias úteis)</p>
        </div>
        <div style="text-align:right;">
          <p style="font-size:11px; color:#64748b;">Victor & Maria</p>
        </div>
      </div>

      <div class="box-resumo">
        <div class="res-item">
          <div class="label">🍽️ Vale Alimentação</div>
          <div class="val">${i(o)}</div>
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
          ${r.map(c=>`
            <tr>
              <td class="check-col"><div class="chk-box"></div></td>
              <td><strong>${c.nome}</strong></td>
              <td>${c.marca}</td>
              <td class="num"><strong>${c.totalEstimadoUnidades.toFixed(1)} un</strong></td>
              <td class="num">${i(c.valorUnitario)}</td>
              <td class="num"><strong>${i(c.subtotalFinal)}</strong></td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <div class="total-footer">
        <span>Total Estimado da Compra:</span>
        <span style="font-size:18px; color:#059669;">${i(a)}</span>
      </div>

      <script>
        window.onload = function() {
          setTimeout(function() { window.print(); }, 350);
        };
      <\/script>
    </body>
    </html>
  `;d.document.open(),d.document.write(m),d.document.close()};document.getElementById("btn-start-cam").addEventListener("click",Zt);document.getElementById("btn-switch-cam").addEventListener("click",Ce);document.getElementById("btn-stop-cam").addEventListener("click",At);async function Zt(){if(typeof Html5Qrcode>"u")return G("Carregando biblioteca de câmera, aguarde..."),setTimeout(Zt,600);try{X||(X=new Html5Qrcode("qr-reader")),Y=await Html5Qrcode.getCameras();let e;if(Y&&Y.length>0){const t=Y.findIndex(a=>/back|traseira|rear|environment/i.test(a.label));mt=t>=0?t:0,e=Y[mt].id}else e={facingMode:"environment"};await X.start(e,{fps:10,qrbox:{width:240,height:240}},Yt,()=>{}),ut=!0,document.getElementById("btn-start-cam").style.display="none",document.getElementById("btn-switch-cam").style.display=Y.length>1?"inline-flex":"none",document.getElementById("btn-stop-cam").style.display="inline-flex"}catch(e){G("❌ Não foi possível acessar a câmera. Verifique as permissões do navegador."),console.error(e)}}async function Ce(){if(!(!X||!ut))try{await X.stop(),Y.length>1&&(mt=(mt+1)%Y.length,await X.start(Y[mt].id,{fps:10,qrbox:{width:240,height:240}},Yt,()=>{}))}catch(e){console.error("switchCam:",e)}}async function At(){if(X&&ut)try{await X.stop()}catch{}ut=!1,document.getElementById("btn-start-cam").style.display="inline-flex",document.getElementById("btn-switch-cam").style.display="none",document.getElementById("btn-stop-cam").style.display="none"}async function Yt(e){At(),document.getElementById("inp-url").value=e,G("✅ QR Code lido! Processando..."),await Kt(e)}document.getElementById("btn-carregar-dados").addEventListener("click",async()=>{const e=document.getElementById("inp-url").value.trim(),t=document.getElementById("inp-html").value.trim();if(!e&&!t){G("⚠️ Cole a URL do QR Code ou o conteúdo da página para ler a nota fiscal.");return}if(e&&!t){G("⏳ Consultando nota fiscal..."),await Kt(e);return}if(t){G("⏳ Processando conteúdo..."),await Wt(t);return}});document.getElementById("btn-preencher-manual").addEventListener("click",()=>{Jt({nomeMercado:"",dataEmissao:new Date().toISOString(),valorTotal:0,descontoTotal:0,valorAPagar:0,qtdTotalItens:0,formasPagamento:{valeAlimentacao:0,cartaoCredito:0,cartaoDebito:0},itens:[]}),G("✍️ Preencha os dados da compra abaixo e clique em Salvar Nota Fiscal.","var(--accent-cyan)")});function Jt(e){var s,r,d;document.getElementById("inp-mercado").value=e.nomeMercado||"",document.getElementById("inp-data").value=ie(e.dataEmissao),document.getElementById("inp-vtotal").value=e.valorTotal!==void 0?e.valorTotal:0,document.getElementById("inp-desconto").value=e.descontoTotal!==void 0?e.descontoTotal:0,document.getElementById("inp-pagar").value=e.valorAPagar!==void 0?e.valorAPagar:0,document.getElementById("inp-qtd").value=e.qtdTotalItens!==void 0?e.qtdTotalItens:0,document.getElementById("inp-alim").value=((s=e.formasPagamento)==null?void 0:s.valeAlimentacao)||0,document.getElementById("inp-cred").value=((r=e.formasPagamento)==null?void 0:r.cartaoCredito)||0,document.getElementById("inp-deb").value=((d=e.formasPagamento)==null?void 0:d.cartaoDebito)||0,at=e.itens||[];const t=document.getElementById("form-nfce");t.style.display="block";const a=document.getElementById("preview-itens-box"),o=document.getElementById("count-preview-itens"),n=document.getElementById("lista-preview-itens");at.length>0?(a.style.display="block",o.textContent=at.length,n.innerHTML=at.map(m=>`
      <div style="display:flex; justify-content:space-between; padding: 0.35rem 0; border-bottom: 1px dashed var(--border-color);">
        <span><strong>${m.nome}</strong> (${m.quantidade} ${m.unidade||"Un"})</span>
        <span>${i(m.valorUnitario)}/un = <strong>${i(m.valorTotal)}</strong></span>
      </div>
    `).join("")):a.style.display="none",t.scrollIntoView({behavior:"smooth"})}document.getElementById("form-nfce").addEventListener("submit",async e=>{e.preventDefault();const t=document.getElementById("inp-mercado").value.trim()||"Mercado",a=document.getElementById("inp-data").value||new Date().toISOString(),o=parseFloat(document.getElementById("inp-vtotal").value)||0,n=parseFloat(document.getElementById("inp-desconto").value)||0,s=parseFloat(document.getElementById("inp-pagar").value)||0,r=parseInt(document.getElementById("inp-qtd").value)||0,d=parseFloat(document.getElementById("inp-alim").value)||0,m=parseFloat(document.getElementById("inp-cred").value)||0,c=parseFloat(document.getElementById("inp-deb").value)||0,p=new Date(a).toISOString().slice(0,16),u=U.find(v=>{const g=new Date(v.dataEmissao).toISOString().slice(0,16),T=Math.abs((v.valorAPagar||0)-s)<.05,C=(v.nomeMercado||"").toLowerCase().trim()===t.toLowerCase().trim();return g===p&&T&&C});if(u){G(`⚠️ Esta nota fiscal já existe no sistema (Cadastrada em ${pt(u.dataEmissao)} no valor de ${i(u.valorAPagar)}). Nota não adicionada!`,"#fb7185"),I("⚠️ Nota fiscal já cadastrada! Operação cancelada.");return}const y=new Date(a),l=`${y.getFullYear()}-${String(y.getMonth()+1).padStart(2,"0")}`;G("⏳ Salvando nota fiscal no banco...");try{await ft(J(B,bt),{nomeMercado:t,dataEmissao:a,mesAno:l,qtdTotalItens:r||at.length,valorTotal:o,descontoTotal:n,valorAPagar:s,formasPagamento:{valeAlimentacao:d,cartaoCredito:m,cartaoDebito:c},itens:at,createdAt:$t()}),G("✅ Nota salva com sucesso!","#34d399"),document.getElementById("form-nfce").style.display="none",document.getElementById("form-nfce").reset(),document.getElementById("inp-url").value="",document.getElementById("inp-html").value="",at=[],Lt(),goTab("dashboard"),I("🎉 Nota fiscal registrada no Firebase!")}catch(v){G("❌ Erro ao salvar: "+v.message,"#fb7185")}});async function Kt(e){const t=[a=>`https://api.allorigins.win/raw?url=${encodeURIComponent(a)}`,a=>`https://corsproxy.io/?${encodeURIComponent(a)}`];for(const a of t)try{const o=await fetch(a(e),{signal:AbortSignal.timeout(8e3)});if(o.ok){const n=await o.text();if(n&&n.length>200){await Wt(n);return}}}catch{}Me(e)}function Me(e){document.getElementById("modal-link").href=e,document.getElementById("modal-cors").classList.add("active"),G("⚠️ Abra o link, copie o conteúdo da página e cole no campo de texto abaixo.")}async function Wt(e){const t=Se(e);Jt(t),G("✅ Nota lida com sucesso! Confira os valores abaixo e altere se necessário antes de Salvar.","#34d399")}function Se(e){var M,j,F;const a=new DOMParser().parseFromString(e,"text/html"),o=((M=a.body)==null?void 0:M.textContent)||e;let n=((F=(j=a.querySelector(".txtTopo, .nomeEmit, h1"))==null?void 0:j.textContent)==null?void 0:F.trim())||"Mercado",s=new Date().toISOString();const r=o.match(/Emiss[ãa]o\s*[:\-]?\s*(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})?/i)||o.match(/(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})/);if(r){const[S,b,f]=r[1].split("/");s=`${f}-${b}-${S}T${r[2]||"12:00:00"}`}const d=o.match(/Qtd\.?\s*total\s*de\s*itens\s*[:\s]*([\d,\.]+)/i),m=o.match(/Valor\s*total\s*R\$\s*[:\s]*([\d\.,]+)/i),c=o.match(/Descontos?\s*R\$\s*[:\s]*([\d\.,]+)/i),p=o.match(/Valor\s*a\s*pagar\s*R\$\s*[:\s]*([\d\.,]+)/i)||o.match(/VALOR\s*PAGO\s*R\$\s*[:\s]*([\d\.,]+)/i),u=o.match(/(?:Vale\s*)?Alimenta[çc][ãa]o\s*[:\s]*([\d\.,]+)/i),y=o.match(/(?:Cart[ãa]o\s*de\s*)?Cr[eé]dito\s*[:\s]*([\d\.,]+)/i),l=o.match(/(?:Cart[ãa]o\s*de\s*)?D[eé]bito\s*[:\s]*([\d\.,]+)/i),v=d?q(d[1]):0,g=m?q(m[1]):0,T=c?q(c[1]):0;let C=p?q(p[1]):g-T;const P={valeAlimentacao:u?q(u[1]):0,cartaoCredito:y?q(y[1]):0,cartaoDebito:l?q(l[1]):0},w=[];a.querySelectorAll("tr, .item, .itemNota").forEach(S=>{var xt;const b=S.textContent;if(!/Vl\.\s*Unit|valorUnitario|Qtde?\./i.test(b))return;const f=S.querySelector(".txtTit, .txtTit2, .nomeProd"),$=((xt=f==null?void 0:f.textContent)==null?void 0:xt.trim())||"",R=b.match(/Qtde?\.\s*[:\s]*([\d,\.]+)/i),D=b.match(/Vl\.\s*Unit\.\s*[:\s]*([\d,\.]+)/i),O=b.match(/Vl\.\s*Total\s*([\d,\.]+)/i),dt=b.match(/C[oó]digo\s*[:\s]*(\d+)/i),ct=b.match(/UN\s*[:\s]*([A-Za-z]+)/i),vt=R?q(R[1]):1,yt=D?q(D[1]):0,te=O?q(O[1]):yt*vt;$&&yt>0&&w.push({codigo:(dt==null?void 0:dt[1])||"",nome:$,marca:De($),quantidade:vt,unidade:(ct==null?void 0:ct[1])||"Un",valorUnitario:yt,valorTotal:te})});const h=new Date(s),A=`${h.getFullYear()}-${String(h.getMonth()+1).padStart(2,"0")}`;return{nomeMercado:n,dataEmissao:s,mesAno:A,qtdTotalItens:v,valorTotal:g,descontoTotal:T,valorAPagar:C,formasPagamento:P,itens:w}}function De(e){const t=["BAUDUCCO","BAUD","PANCO","DANONE","NESTLE","QUALITA","SADIA","PERDIGAO","SEARA","CAMIL","TIO JOAO","URBANO","LIZA","SOYA","YPE","PILAO","MELITTA","3 CORACOES","VIGOR","PARMALAT","ITALAC","HEINZ","KRAFT"],a=e.toUpperCase();for(const o of t)if(a.includes(o))return o;return a.split(" ")[0]||"Genérica"}function Oe(){const e=document.getElementById("lista-historico");if(!U.length){e.innerHTML='<div class="empty-state">📭 Nenhuma compra cadastrada ainda.</div>';return}e.innerHTML=U.map(t=>{var a,o,n;return`
    <div class="purchase-card">
      <div class="purchase-header" onclick="toggleDetail('${t.id}')">
        <div class="purchase-info">
          <h3>${t.nomeMercado||"Mercado"}</h3>
          <p>📅 ${pt(t.dataEmissao)} &nbsp;•&nbsp; 🛒 ${t.qtdTotalItens||0} itens</p>
        </div>
        <div class="purchase-values">
          <div class="pv-total">${i(t.valorAPagar)}</div>
          <div class="pv-sub">Desc: ${i(t.descontoTotal)}</div>
        </div>
        <svg class="chevron" id="chev-${t.id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      <div class="purchase-details" id="detail-${t.id}">
        <div class="details-toolbar">
          <span class="card-subtext">Pagamentos: Alimentação ${i((a=t.formasPagamento)==null?void 0:a.valeAlimentacao)} · Crédito ${i((o=t.formasPagamento)==null?void 0:o.cartaoCredito)} · Débito ${i((n=t.formasPagamento)==null?void 0:n.cartaoDebito)}</span>
          <button class="btn-danger" onclick="confirmarExcluirMercado('${t.id}')">🗑️ Excluir</button>
        </div>
        ${Xt(t)}
      </div>
    </div>`}).join("")}function Xt(e){return!e.itens||!e.itens.length?'<p class="card-subtext">Nenhum item detalhado registrado.</p>':`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Item</th><th>Marca</th><th class="num">Qtd</th><th class="num">Vl. Unit.</th><th class="num">Vl. Total</th></tr></thead>
    <tbody>${e.itens.map(t=>`<tr>
      <td>${t.nome}</td>
      <td><span class="badge amber">${t.marca||"—"}</span></td>
      <td class="num">${t.quantidade} ${t.unidade||"Un"}</td>
      <td class="num">${i(t.valorUnitario)}</td>
      <td class="num"><strong>${i(t.valorTotal)}</strong></td>
    </tr>`).join("")}</tbody>
  </table></div>`}window.toggleDetail=function(e){let t=document.getElementById("detail-"+e)||document.getElementById(e);!t&&e.startsWith("detail-")&&(t=document.getElementById(e.replace("detail-","")));let a=document.getElementById("chev-"+e)||document.getElementById("chev-"+e.replace("detail-",""));t&&t.classList.toggle("open"),a&&a.classList.toggle("open")};window.toggleGroupMonth=function(e){const t=document.getElementById(e),a=document.getElementById("chev-"+e);if(!t)return;const o=t.style.display==="none"||!t.style.display;t.style.display=o?"block":"none",a&&(o?a.classList.add("open"):a.classList.remove("open"))};window.confirmarExcluirMercado=async function(e){if(confirm("Excluir esta compra de mercado?"))try{await Z(L(B,bt,e)),I("🗑️ Compra excluída.")}catch(t){alert("Erro: "+t.message)}};function Le(){const e=document.getElementById("lista-comparacao"),t={};U.forEach(o=>{(o.itens||[]).forEach(n=>{var r;const s=((r=n.nome)==null?void 0:r.toLowerCase().trim())||"produto";t[s]||(t[s]={nome:n.nome,marca:n.marca,hist:{}}),t[s].hist[o.mesAno]=n.valorUnitario})});const a=Object.values(t);if(!a.length){e.innerHTML='<div class="empty-state">Adicione notas para ver a comparação de preços unitários.</div>';return}e.innerHTML=`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Produto</th><th>Marca</th><th>Histórico (Unitário)</th><th>Variação</th></tr></thead>
    <tbody>${a.map(o=>{const n=Object.keys(o.hist).sort();let s=n.map(d=>`${d}: <strong>${i(o.hist[d])}</strong>`).join(" → "),r='<span class="badge cyan">Estável</span>';if(n.length>=2){const d=o.hist[n[n.length-2]],c=o.hist[n[n.length-1]]-d,p=(c/d*100).toFixed(1);c>.01?r=`<span class="badge red">+${p}% ↑</span>`:c<-.01&&(r=`<span class="badge green">${p}% ↓</span>`)}return`<tr><td><strong>${o.nome}</strong></td><td><span class="badge amber">${o.marca||"—"}</span></td><td>${s}</td><td>${r}</td></tr>`}).join("")}</tbody>
  </table></div>`}function Re(){const e=document.getElementById("lista-recorrencia"),t=document.getElementById("lista-marcas"),a={},o={};U.forEach(r=>{(r.itens||[]).forEach(d=>{var u;const m=(u=d.nome)==null?void 0:u.toLowerCase().trim();if(!m)return;a[m]||(a[m]={nome:d.nome,marca:d.marca,qtd:0,notas:0,units:[]}),a[m].qtd+=d.quantidade||1,a[m].notas+=1,a[m].units.push(d.valorUnitario||0);const c=(d.nome||"").split(" ")[0].toUpperCase();o[c]||(o[c]={});const p=d.marca||"Genérica";o[c][p]||(o[c][p]=[]),o[c][p].push(d.valorUnitario||0)})});const n=Object.values(a).filter(r=>r.notas>1).sort((r,d)=>d.notas-r.notas);e.innerHTML=n.length?`<div class="table-responsive"><table class="custom-table">
        <thead><tr><th>Item</th><th>Marca</th><th>Compras</th><th class="num">Qtd Total</th><th class="num">Média Unitária</th></tr></thead>
        <tbody>${n.map(r=>{const d=r.units.reduce((m,c)=>m+c,0)/r.units.length;return`<tr>
            <td><strong>${r.nome}</strong></td>
            <td><span class="badge amber">${r.marca||"—"}</span></td>
            <td><span class="badge green">${r.notas}x</span></td>
            <td class="num">${r.qtd}</td>
            <td class="num">${i(d)}</td>
          </tr>`}).join("")}</tbody>
      </table></div>`:'<div class="empty-state">Adicione notas para ver a recorrência de itens.</div>';const s=Object.entries(o).filter(([,r])=>Object.keys(r).length>1).map(([r,d])=>{let m=1/0,c="";const p=Object.entries(d).map(([u,y])=>{const l=y.reduce((v,g)=>v+g,0)/y.length;return l<m&&(m=l,c=u),{marca:u,med:l}});return`<div class="brand-card">
      <div class="brand-card-header">
        <span class="card-title">${r}</span>
        <span class="badge green">🏆 Menor preço: ${c} (${i(m)}/un)</span>
      </div>
      <div class="brands-row">
        ${p.map(u=>`<div class="brand-chip${u.marca===c?" best":""}">
          <div class="bc-name">${u.marca} ${u.marca===c?"✅":""}</div>
          <div class="bc-val">${i(u.med)}<span style="font-size:.7rem;font-weight:400">/un</span></div>
        </div>`).join("")}
      </div>
    </div>`}).join("");t.innerHTML=s||'<div class="empty-state">Ao comprar o mesmo tipo de produto com marcas diferentes, o sistema mostrará qual teve menor preço.</div>'}document.getElementById("btn-modal-close").addEventListener("click",()=>{document.getElementById("modal-cors").classList.remove("active")});
