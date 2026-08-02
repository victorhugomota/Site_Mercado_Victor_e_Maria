import{initializeApp as Kt}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";import{getFirestore as Xt,onSnapshot as ot,query as te,collection as _,orderBy as ee,doc as A,deleteDoc as V,setDoc as j,addDoc as vt,serverTimestamp as yt}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function o(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(n){if(n.ep)return;n.ep=!0;const s=o(n);fetch(n.href,s)}})();const Ct=document.createElement("script");Ct.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js";document.head.appendChild(Ct);const Tt=document.createElement("script");Tt.src="https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js";document.head.appendChild(Tt);const ae={apiKey:"AIzaSyANpFnEIkyN1XCT6qbtmVR9wx7sQHEsyrE",authDomain:"comprasmercado-23913.firebaseapp.com",projectId:"comprasmercado-23913",storageBucket:"comprasmercado-23913.firebasestorage.app",messagingSenderId:"317518149234",appId:"1:317518149234:web:94f38624d68a2b9a6634eb",measurementId:"G-2XP88EK37S"},oe=Kt(ae),x=Xt(oe),gt="compras",nt="entradas",et="faturas",at="boletos",Mt="reservas",J="estimativas";let D=[],N=[],P=[],z=[],Q=[],ht={valorAtualGuardado:0},bt=null,Z=null,G=[],it=0,lt=!1,X=[];function l(t){return Number(t||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}function M(t){if(typeof t=="number")return t;if(!t)return 0;const e=parseFloat(String(t).replace(/R\$\s?/gi,"").replace(/\s/g,"").replace(/\./g,"").replace(",","."));return isNaN(e)?0:e}function dt(t){if(!t)return"—";try{return new Date(t).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}catch{return t}}function $(t,e=3500){const o=document.getElementById("toast");o.textContent=t,o.classList.add("show"),setTimeout(()=>o.classList.remove("show"),e)}function k(t,e="var(--accent-amber)"){const o=document.getElementById("status-msg");o&&(o.textContent=t,o.style.color=e)}function ne(t){if(!t)return new Date().toISOString().slice(0,16);try{const e=new Date(t);if(isNaN(e.getTime()))return new Date().toISOString().slice(0,16);const o=a=>String(a).padStart(2,"0");return`${e.getFullYear()}-${o(e.getMonth()+1)}-${o(e.getDate())}T${o(e.getHours())}:${o(e.getMinutes())}`}catch{return new Date().toISOString().slice(0,16)}}function se(t,e){let o=0;const a=new Date(t,e+1,0).getDate();for(let n=1;n<=a;n++){const s=new Date(t,e,n).getDay();s!==0&&s!==6&&o++}return o}window.goTab=function(t){document.querySelectorAll(".tab-content").forEach(o=>o.classList.remove("active")),document.querySelectorAll(".desktop-nav .nav-item").forEach(o=>o.classList.remove("active")),document.querySelectorAll(".mobile-nav .mob-btn").forEach(o=>o.classList.remove("active"));const e=document.getElementById("tab-"+t);e&&e.classList.add("active"),document.querySelectorAll(`[data-tab="${t}"]`).forEach(o=>o.classList.add("active"))};document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>goTab(t.getAttribute("data-tab")))});document.querySelectorAll(".sub-item").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".sub-item").forEach(o=>o.classList.remove("active")),document.querySelectorAll(".sub-tab-content").forEach(o=>o.style.display="none"),t.classList.add("active");const e=document.getElementById("sub-"+t.getAttribute("data-sub"));e&&(e.style.display="block")})});function St(){document.getElementById("modal-add-nota").classList.add("active")}function Dt(){lt&&$t(),document.getElementById("modal-add-nota").classList.remove("active")}var It;(It=document.getElementById("btn-open-modal-home"))==null||It.addEventListener("click",St);var wt;(wt=document.getElementById("btn-mercado-add-nota"))==null||wt.addEventListener("click",St);var At;(At=document.getElementById("btn-close-modal-add"))==null||At.addEventListener("click",Dt);ot(te(_(x,gt),ee("dataEmissao","desc")),t=>{D=t.docs.map(e=>({id:e.id,...e.data()})),W()},t=>console.error("Firestore Mercado:",t));ot(_(x,nt),t=>{N=t.docs.map(e=>({id:e.id,...e.data()})),W()},t=>console.error("Firestore Entradas:",t));ot(_(x,et),t=>{P=t.docs.map(e=>({id:e.id,...e.data()})),W()},t=>console.error("Firestore Faturas:",t));ot(_(x,at),t=>{z=t.docs.map(e=>({id:e.id,...e.data()})),W()},t=>console.error("Firestore Boletos:",t));ot(A(x,Mt,"config"),t=>{t.exists()&&(ht=t.data()),W()},t=>console.error("Firestore Reservas:",t));ot(_(x,J),t=>{Q=t.docs.map(e=>({id:e.id,...e.data()})),W()},t=>console.error("Firestore Estimativas:",t));let f=new Date().toISOString().slice(0,7);const Lt=new Set;function ct(){const t=new Set,e=new Date().toISOString().slice(0,7);t.add(e);const o=new Date,a=new Date(o.getFullYear(),o.getMonth()+1,1),n=r=>String(r).padStart(2,"0"),s=`${a.getFullYear()}-${n(a.getMonth()+1)}`;return t.add(s),f&&t.add(f),N.forEach(r=>{r.mesAno&&t.add(r.mesAno)}),P.forEach(r=>{r.mesAno&&t.add(r.mesAno)}),z.forEach(r=>{r.mesAno&&t.add(r.mesAno)}),D.forEach(r=>{r.mesAno&&t.add(r.mesAno)}),Q.forEach(r=>{r.mesAno&&t.add(r.mesAno)}),Array.from(t).filter(r=>!Lt.has(r)).sort().reverse()}window.excluirMesSelecionadoAtual=function(){window.excluirDadosDoMes(f)};window.selecionarMesGlobal=function(t){if(!t)return;f=t;const e=document.getElementById("inp-seletor-mes-global");e&&(e.value=t);const o=document.getElementById("inp-entradas-mes-ano");o&&(o.value=t);const a=document.getElementById("inp-fatura-vencimento");a&&(a.value=`${t}-10`,typeof atualizarMesRefFatura=="function"&&atualizarMesRefFatura());const n=document.getElementById("inp-boleto-vencimento");n&&(n.value=`${t}-10`,typeof atualizarMesRefBoleto=="function"&&atualizarMesRefBoleto()),W()};window.verMesEIrParaControle=function(t){selecionarMesGlobal(t),typeof goTab=="function"&&goTab("mensal")};function re(){const t=document.getElementById("seletor-meses-bar"),e=document.getElementById("seletor-meses-bar-salarios"),o=document.getElementById("seletor-meses-bar-estimativa"),a=ct();a.includes(f)||(f=a[0]||new Date().toISOString().slice(0,7));const n=document.getElementById("inp-seletor-mes-global");n&&n.value!==f&&(n.value=f);const s=document.getElementById("inp-entradas-mes-ano");s&&s.value!==f&&(s.value=f);const r=a.map(c=>{const[d,i]=c.split("-"),u=new Date(parseInt(d),parseInt(i)-1,1).toLocaleString("pt-BR",{month:"short"}).toUpperCase().replace(".",""),E=c===f;return`
      <button class="sub-item ${E?"active":""}" onclick="selecionarMesGlobal('${c}')" style="${E?"background:var(--secondary);color:#fff;border-color:var(--secondary);box-shadow:0 0 10px rgba(99,102,241,0.4);font-weight:700":"background:rgba(15,23,42,.6);color:var(--text-muted);border:1px solid var(--border-color)"}; display:inline-flex;align-items:center;gap:.35rem">
        📅 ${u}/${d}
      </button>
    `}).join("");t&&(t.innerHTML=r),e&&(e.innerHTML=r),o&&(o.innerHTML=r)}window.switchMensalSub=function(t){document.querySelectorAll("[data-mensal-sub]").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".mensal-sub-content").forEach(a=>a.style.display="none");const e=document.querySelector(`[data-mensal-sub="${t}"]`);e&&e.classList.add("active");const o=document.getElementById(t);o&&(o.style.display="block")};function W(){re(),de(),ie(),qt(),be(),Ee(),Ie(),we(),Me(),Se(),De(),$e()}function ie(){const t=f,e=N.filter(b=>b.mesAno===t),o=P.filter(b=>b.mesAno===t),a=z.filter(b=>b.mesAno===t),n=D.filter(b=>b.mesAno===t),s=e.reduce((b,h)=>b+(h.valor||0),0),r=o.reduce((b,h)=>b+(h.valorTotal!==void 0?h.valorTotal:h.valor||0),0),c=a.reduce((b,h)=>b+(h.valorTotal!==void 0?h.valorTotal:h.valor||0),0);let d=0;n.forEach(b=>{b.formasPagamento&&(d+=b.formasPagamento.cartaoDebito||0)});const i=s-r-c-d,m=document.getElementById("m-total-entradas");m&&(m.textContent=l(s));const u=document.getElementById("m-total-cartoes");u&&(u.textContent=l(r));const E=document.getElementById("m-total-boletos");E&&(E.textContent=l(c));const p=document.getElementById("m-mercado-debito");p&&(p.textContent=l(d));const v=document.getElementById("m-saldo-liquido");v&&(v.textContent=l(i),v.style.color=i>=0?"#60a5fa":"#fb7185");const[y,L]=t.split("-"),R=new Date(parseInt(y),parseInt(L)-1,1).toLocaleString("pt-BR",{month:"long"}),O=R.charAt(0).toUpperCase()+R.slice(1),S=document.getElementById("m-lbl-saldo-liquido");S&&(S.textContent=`Saldo Líquido (${O}/${y})`),le(e,o,a,n)}function le(t,e,o,a){const n=document.getElementById("content-salarios-mes");n&&(n.innerHTML=`
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header">
          <span class="card-title">💵 Entradas Registradas em ${f}</span>
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
            </table></div>`:`<div class="empty-state">Nenhuma entrada cadastrada para ${f}. Use a aba "Salários & Entradas" para cadastrar.</div>`}
      </div>
    `);const s=document.getElementById("content-cartoes-mes");if(s){const d=e.reduce((m,u)=>m+(u.valorTotal||0),0),i=e.length?Ut(e,"mes_"+f):"";s.innerHTML=`
      ${i}
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header">
          <span class="card-title">💳 Faturas de Cartão Vencendo em ${f}</span>
          <span class="badge rose">Total: ${l(d)}</span>
        </div>
        ${e.length?e.map(m=>`
              <div class="purchase-card" style="margin-bottom:1rem">
                <div class="purchase-header" onclick="toggleDetail('fat-m-${m.id}')">
                  <div class="purchase-info">
                    <h3>${m.cartao==="Nubank"?"🟣 Nubank":m.cartao==="Santander"?"🔴 Santander":"💳 "+(m.descricao||m.cartao)}</h3>
                    <p>Vencimento: <strong>${m.dataVencimento||"—"}</strong> • ${m.qtdItens||(m.itens?m.itens.length:0)} lançamentos</p>
                  </div>
                  <div class="purchase-values" style="display:flex;align-items:center;gap:.75rem">
                    <div style="text-align:right">
                      <div class="pv-total" style="color:#fb7185">${l(m.valorTotal)}</div>
                      <div class="pv-sub">Clique para ver itens <span class="chevron">▼</span></div>
                    </div>
                    <button type="button" class="btn-danger" style="padding:.35rem .65rem;font-size:.78rem;margin-left:.25rem" onclick="event.stopPropagation(); excluirFaturaDocumento('${m.id}')" title="Excluir esta fatura de todos os lugares do sistema">
                      🗑️ Excluir
                    </button>
                  </div>
                </div>
                <div id="fat-m-${m.id}" class="purchase-details">
                  <div class="details-toolbar">
                    <span style="font-weight:700;font-size:.9rem;color:var(--text-muted)">Lançamentos da Fatura</span>
                    <button class="btn-danger" onclick="excluirFaturaDocumento('${m.id}')">🗑️ Excluir Fatura</button>
                  </div>
                  ${Nt(m)}
                </div>
              </div>
            `).join(""):`<div class="empty-state">Nenhuma fatura cadastrada com vencimento em ${f}. Use a aba "Cartões de Crédito" para importar.</div>`}
      </div>
    `}const r=document.getElementById("content-boletos-mes");if(r){const d=o.reduce((i,m)=>i+(m.valorTotal||0),0);r.innerHTML=`
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header">
          <span class="card-title">📄 Boletos Vencendo em ${f}</span>
          <span class="badge purple">Total: ${l(d)}</span>
        </div>
        ${o.length?o.map(i=>`
              <div class="purchase-card" style="margin-bottom:1rem">
                <div class="purchase-header" onclick="toggleDetail('bol-m-${i.id}')">
                  <div class="purchase-info">
                    <h3>📄 ${i.descricao||"Boleto / Conta"}</h3>
                    <p>Vencimento: <strong>${i.dataVencimento||"—"}</strong> • ${i.qtdItens||(i.itens?i.itens.length:0)} encargos</p>
                  </div>
                  <div class="purchase-values" style="display:flex;align-items:center;gap:.75rem">
                    <div style="text-align:right">
                      <div class="pv-total" style="color:#c084fc">${l(i.valorTotal)}</div>
                      <div class="pv-sub">Clique para ver detalhes <span class="chevron">▼</span></div>
                    </div>
                    <button type="button" class="btn-danger" style="padding:.35rem .65rem;font-size:.78rem;margin-left:.25rem" onclick="event.stopPropagation(); excluirBoletoDocumento('${i.id}')" title="Excluir este boleto de todos os lugares do sistema">
                      🗑️ Excluir
                    </button>
                  </div>
                </div>
                <div id="bol-m-${i.id}" class="purchase-details">
                  <div class="details-toolbar">
                    <span style="font-weight:700;font-size:.9rem;color:var(--text-muted)">Detalhamento do Boleto</span>
                    <button class="btn-danger" onclick="excluirBoletoDocumento('${i.id}')">🗑️ Excluir Boleto</button>
                  </div>
                  ${Ht(i)}
                </div>
              </div>
            `).join(""):`<div class="empty-state">Nenhum boleto cadastrado para ${f}. Use a aba "Boletos" para importar.</div>`}
      </div>
    `}const c=document.getElementById("content-mercado-mes");c&&(c.innerHTML=`
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header">
          <span class="card-title">🛒 Compras de Mercado em ${f}</span>
          <span class="badge amber">${a.length} notas cadastradas</span>
        </div>
        ${a.length?a.map(d=>`
              <div class="purchase-card" style="margin-bottom:1rem">
                <div class="purchase-header" onclick="toggleDetail('mer-m-${d.id}')">
                  <div class="purchase-info">
                    <h3>🛒 ${d.nomeMercado||"Mercado"}</h3>
                    <p>Data: <strong>${dt(d.dataEmissao)}</strong> • ${d.qtdTotalItens||0} itens</p>
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
                  ${Jt(d)}
                </div>
              </div>
            `).join(""):`<div class="empty-state">Nenhuma nota de mercado cadastrada para ${f}.</div>`}
      </div>
    `)}function de(){let t=N.reduce((i,m)=>i+(m.valor||0),0),e=P.reduce((i,m)=>i+(m.valorTotal!==void 0?m.valorTotal:m.valor||0),0),o=z.reduce((i,m)=>i+(m.valorTotal!==void 0?m.valorTotal:m.valor||0),0),a=0,n=0,s=0;const r={};D.forEach(i=>{const m=i.valorAPagar||0;i.formasPagamento&&(n+=i.formasPagamento.valeAlimentacao||0,s+=i.formasPagamento.cartaoCredito||0,a+=i.formasPagamento.cartaoDebito||0);const u=i.mesAno||"Outros";r[u]=(r[u]||0)+m});let c=t-e-o-a;document.getElementById("fin-total-entradas").textContent=l(t);const d=document.getElementById("fin-subtext-entradas");d&&(d.textContent="Total de Entradas Cadastradas"),document.getElementById("fin-total-cartoes").textContent=l(e),document.getElementById("fin-total-boletos").textContent=l(o),document.getElementById("fin-mercado-debito").textContent=l(a),document.getElementById("fin-saldo-liquido").textContent=l(c),document.getElementById("dash-alimentacao").textContent=l(n),document.getElementById("dash-credito").textContent=l(s),document.getElementById("dash-debito").textContent=l(a),ce(),Ft(r)}function ce(){const t=document.getElementById("tabela-resumo-mensal");if(!t)return;const e=ct();if(!e.length){t.innerHTML='<div class="empty-state">Nenhum dado cadastrado ainda.</div>';return}const o=e.map(a=>{const n=N.filter(v=>v.mesAno===a).reduce((v,y)=>v+(y.valor||0),0),s=P.filter(v=>v.mesAno===a).reduce((v,y)=>v+(y.valorTotal!==void 0?y.valorTotal:y.valor||0),0),r=z.filter(v=>v.mesAno===a).reduce((v,y)=>v+(y.valorTotal!==void 0?y.valorTotal:y.valor||0),0);let c=0;D.filter(v=>v.mesAno===a).forEach(v=>{v.formasPagamento&&(c+=v.formasPagamento.cartaoDebito||0)});const d=n-s-r-c,[i,m]=a.split("-"),E=new Date(parseInt(i),parseInt(m)-1,1).toLocaleString("pt-BR",{month:"short"}).toUpperCase().replace(".","");return`
      <tr style="${a===f?"background:rgba(99,102,241,0.1)":""}">
        <td><strong>📅 ${E}/${i}</strong></td>
        <td style="color:#34d399"><strong>${l(n)}</strong></td>
        <td style="color:#fb7185">${l(s)}</td>
        <td style="color:#c084fc">${l(r)}</td>
        <td style="color:#fbbf24">${l(c)}</td>
        <td style="color:${d>=0?"#60a5fa":"#fb7185"}; font-weight:800">${l(d)}</td>
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
  `}window.excluirDadosDoMes=async function(t){const e=t||f;if(!e)return;const[o,a]=e.split("-"),s=new Date(parseInt(o),parseInt(a)-1,1).toLocaleString("pt-BR",{month:"long"}),r=`${s.charAt(0).toUpperCase()+s.slice(1)} de ${o}`,c=N.filter(p=>p.mesAno===e),d=P.filter(p=>p.mesAno===e),i=z.filter(p=>p.mesAno===e),m=D.filter(p=>p.mesAno===e),u=Q.filter(p=>p.id===e),E=`⚠️ TEM CERTEZA QUE DESEJA EXCLUIR O MÊS ${r.toUpperCase()} (${e})?

Isso irá APAGAR PERMANENTEMENTE todos os registros vinculados a este mês:
• ${c.length} Salário(s) / Entrada(s)
• ${d.length} Fatura(s) de Cartão
• ${i.length} Boleto(s) & Conta(s)
• ${m.length} Nota(s) de Mercado
• Estimativa orçamentária do mês

Esta ação é irreversível. Confirmar exclusão do mês?`;if(confirm(E))try{const p=[];c.forEach(y=>p.push(V(A(x,nt,y.id)))),d.forEach(y=>p.push(V(A(x,et,y.id)))),i.forEach(y=>p.push(V(A(x,at,y.id)))),m.forEach(y=>p.push(V(A(x,gt,y.id)))),u.forEach(y=>p.push(V(A(x,J,y.id)))),p.length>0&&await Promise.all(p),Lt.add(e),$(`🗑️ O mês ${r} e todos os seus dados foram excluídos com sucesso!`),f=ct()[0]||new Date().toISOString().slice(0,7),W()}catch(p){alert("Erro ao excluir dados do mês: "+p.message)}};function Ft(t){var s;if(typeof Chart>"u")return setTimeout(()=>Ft(t),300);const e=(s=document.getElementById("chart-barras"))==null?void 0:s.getContext("2d");if(!e)return;const o=Object.keys(t).sort(),a=o.map(r=>{const[c,d]=r.split("-");return`${d}/${c}`}),n=o.map(r=>t[r]);bt&&bt.destroy(),bt=new Chart(e,{type:"bar",data:{labels:a.length?a:["Sem compras"],datasets:[{label:"Gasto Mercado R$",data:n.length?n:[0],backgroundColor:"rgba(16,185,129,0.78)",borderColor:"#10b981",borderWidth:2,borderRadius:8}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:r=>` ${l(r.raw)}`}}},scales:{y:{beginAtZero:!0,grid:{color:"rgba(255,255,255,.05)"},ticks:{color:"#94a3b8",callback:r=>"R$"+r}},x:{grid:{display:!1},ticks:{color:"#94a3b8"}}}}})}function Rt(t){if(!t)return 0;const e=t.match(/L[íi]quido(?:\s*a\s*receber)?\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/TOTAL\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/SAL[ÁA]RIO\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/VALOR\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i);return e?M(e[1]):0}function me(){const t=document.getElementById("inp-entradas-mes-ano");if(t&&!t.value){const e=new Date,o=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0");t.value=`${o}-${a}`}}setTimeout(me,300);let K="mes";window.toggleFiltroEntradasTabela=function(t){K=t,qt()};document.getElementById("form-holerite-victor").addEventListener("submit",async t=>{t.preventDefault();const e=f||document.getElementById("inp-entradas-mes-ano").value||new Date().toISOString().slice(0,7),o=document.getElementById("inp-holerite-txt-victor").value;let a=parseFloat(document.getElementById("inp-salario-val-victor").value)||0;if(!a&&o&&(a=Rt(o)),!a){$("⚠️ Digite ou cole um holerite válido com valor.");return}const n=`salario_victor_${e}`;await j(A(x,nt,n),{pessoa:"Victor",tipo:"holerite",descricao:`Salário Líquido Victor (${e})`,valor:a,mesAno:e,data:new Date().toISOString()}),document.getElementById("inp-holerite-txt-victor").value="",document.getElementById("inp-salario-val-victor").value="",$(`✅ Salário do Victor (${e}) salvo com sucesso!`)});document.getElementById("form-holerite-maria").addEventListener("submit",async t=>{t.preventDefault();const e=f||document.getElementById("inp-entradas-mes-ano").value||new Date().toISOString().slice(0,7),o=document.getElementById("inp-holerite-txt-maria").value;let a=parseFloat(document.getElementById("inp-salario-val-maria").value)||0;if(!a&&o&&(a=Rt(o)),!a){$("⚠️ Digite ou cole um holerite válido com valor.");return}const n=`salario_maria_${e}`;await j(A(x,nt,n),{pessoa:"Maria",tipo:"holerite",descricao:`Salário Líquido Maria (${e})`,valor:a,mesAno:e,data:new Date().toISOString()}),document.getElementById("inp-holerite-txt-maria").value="",document.getElementById("inp-salario-val-maria").value="",$(`✅ Salário da Maria (${e}) salvo com sucesso!`)});document.getElementById("form-entrada-manual").addEventListener("submit",async t=>{t.preventDefault();const e=f||document.getElementById("inp-entradas-mes-ano").value||new Date().toISOString().slice(0,7),o=document.getElementById("inp-ent-desc").value.trim(),a=parseFloat(document.getElementById("inp-ent-val").value)||0,n=document.getElementById("inp-ent-pessoa").value;!o||!a||(await vt(_(x,nt),{pessoa:n,tipo:"manual",descricao:o,valor:a,mesAno:e,data:new Date().toISOString()}),t.target.reset(),$(`🎉 Entrada manual (${e}) registrada!`))});function qt(){var d,i,m;const t=f||((d=document.getElementById("inp-entradas-mes-ano"))==null?void 0:d.value)||new Date().toISOString().slice(0,7),e=document.getElementById("lbl-entradas-mes-ref");if(e){const[u,E]=t.split("-"),v=new Date(parseInt(u),parseInt(E)-1,1).toLocaleString("pt-BR",{month:"long"}),y=v.charAt(0).toUpperCase()+v.slice(1);e.textContent=`Visualizando e inserindo entradas para: ${y} de ${u}`}const o=((i=N.find(u=>u.pessoa==="Victor"&&u.tipo==="holerite"&&u.mesAno===t))==null?void 0:i.valor)||0,a=((m=N.find(u=>u.pessoa==="Maria"&&u.tipo==="holerite"&&u.mesAno===t))==null?void 0:m.valor)||0,n=N.filter(u=>u.mesAno===t),s=n.reduce((u,E)=>u+(E.valor||0),0);document.getElementById("val-salario-victor").textContent=l(o),document.getElementById("val-salario-maria").textContent=l(a),document.getElementById("val-entradas-combinado").textContent=`${l(s)}`;const r=document.getElementById("lista-entradas-registradas");if(!r)return;const c=K==="mes"?n:N;if(!c.length){r.innerHTML=`
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;flex-wrap:wrap;gap:.5rem">
        <span style="font-size:.84rem;color:var(--text-muted)">Modo de Exibição da Tabela:</span>
        <div style="display:flex;gap:.35rem">
          <button type="button" class="btn-secondary" style="padding:.25rem .6rem;font-size:.78rem;${K==="mes"?"background:var(--secondary);color:#fff":""}" onclick="toggleFiltroEntradasTabela('mes')">📅 Mês (${t})</button>
          <button type="button" class="btn-secondary" style="padding:.25rem .6rem;font-size:.78rem;${K==="todos"?"background:var(--secondary);color:#fff":""}" onclick="toggleFiltroEntradasTabela('todos')">🌐 Todas as Entradas</button>
        </div>
      </div>
      <div class="empty-state">Nenhuma entrada registrada para ${K==="mes"?"o mês "+t:"o sistema"}.</div>
    `;return}r.innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.75rem;flex-wrap:wrap;gap:.5rem">
      <span style="font-size:.84rem;color:var(--text-muted);font-weight:600">Exibindo ${c.length} entrada(s) em tabela:</span>
      <div style="display:flex;gap:.35rem">
        <button type="button" class="btn-secondary" style="padding:.25rem .6rem;font-size:.78rem;${K==="mes"?"background:var(--secondary);color:#fff":""}" onclick="toggleFiltroEntradasTabela('mes')">📅 Mês ${t}</button>
        <button type="button" class="btn-secondary" style="padding:.25rem .6rem;font-size:.78rem;${K==="todos"?"background:var(--secondary);color:#fff":""}" onclick="toggleFiltroEntradasTabela('todos')">🌐 Todas</button>
      </div>
    </div>
    <div class="table-responsive"><table class="custom-table">
      <thead><tr><th>Mês / Ref</th><th>Descrição</th><th>Pessoa</th><th>Tipo</th><th class="num">Valor</th><th>Ação</th></tr></thead>
      <tbody>${c.map(u=>`<tr>
        <td><span class="badge green">${u.mesAno||"—"}</span></td>
        <td><strong>${u.descricao}</strong></td>
        <td><span class="badge ${u.pessoa==="Victor"?"green":u.pessoa==="Maria"?"purple":"cyan"}">${u.pessoa}</span></td>
        <td><span class="badge amber">${u.tipo==="holerite"?"Holerite":"Manual"}</span></td>
        <td class="num" style="color:#34d399"><strong>${l(u.valor)}</strong></td>
        <td><button class="btn-danger" onclick="excluirEntrada('${u.id}')">🗑️</button></td>
      </tr>`).join("")}</tbody>
    </table></div>
  `}window.excluirEntrada=async function(t){confirm("Excluir esta entrada?")&&(await V(A(x,nt,t)),$("🗑️ Entrada removida."))};let Et="Nubank",B=null;function ue(){const t=document.getElementById("inp-fatura-vencimento");if(t&&!t.value){const e=new Date,o=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0");t.value=`${o}-${a}-10`,atualizarMesRefFatura()}}setTimeout(ue,300);window.atualizarMesRefFatura=function(){const t=document.getElementById("inp-fatura-vencimento"),e=document.getElementById("lbl-fatura-mes-ref");if(!(!t||!e))if(t.value){const[o,a]=t.value.split("-"),s=new Date(parseInt(o),parseInt(a)-1,1).toLocaleString("pt-BR",{month:"long"});e.textContent=`Fatura ${s.charAt(0).toUpperCase()+s.slice(1)}/${o}`}else e.textContent="Mês da Fatura"};window.selecionarCartaoFatura=function(t){Et=t,document.querySelectorAll(".btn-card-select").forEach(o=>o.classList.remove("active"));const e=document.querySelector(`.btn-card-select[data-card="${t}"]`);e&&e.classList.add("active"),$(`Cartão selecionado: ${t}`)};window.handleFileFaturaSelect=async function(t){const e=t.target.files[0];if(!e)return;const o=document.getElementById("txt-file-fatura");o&&(o.textContent=`📄 Arquivo: ${e.name}`),$(`⏳ Lendo arquivo da fatura (${e.name})...`);let a="";if(e.type==="application/pdf"||e.name.endsWith(".pdf"))a=await Ot(e);else try{a=await e.text()}catch{a=""}a?(document.getElementById("inp-fatura-txt").value=a,await Pt(a,Et)):$("❌ Não foi possível ler o texto do arquivo da fatura.")};async function Ot(t){try{const e=await t.arrayBuffer();if(typeof pdfjsLib>"u")return $("⚠️ Aguarde a biblioteca de PDF carregar..."),"";pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";let o=pdfjsLib.getDocument({data:e});o.onPassword=(s,r)=>{let c=prompt(`🔒 Este PDF de fatura está protegido por senha.
Digite a senha para abrir (ex: CPF ou Data de Nascimento):`);c?s(c):$("⚠️ Senha não informada. Leitura do PDF cancelada.")};const a=await o.promise;let n="";for(let s=1;s<=a.numPages;s++){const c=await(await a.getPage(s)).getTextContent();let d=null,i="";for(const m of c.items){if(!m.str)continue;const u=m.transform?m.transform[5]:null;d!==null&&Math.abs(u-d)>3?i+=`
`:i.length>0&&!i.endsWith(`
`)&&!i.endsWith(" ")&&(i+=" "),i+=m.str,d=u}n+=i+`
`}return n}catch(e){return e.name==="PasswordException"?$("🔒 O PDF precisa de senha válida para ser aberto."):console.error("Erro ao ler PDF:",e),""}}function pe(t){if(!t)return null;const e=t.match(/Total\s*a\s*Pagar\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/no\s*valor\s*de\s*R?\$\s*([\d\.,]+)/i)||t.match(/Valor\s*total\s*da\s*fatura\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/Total\s*da\s*fatura\s*[:\s]*R?\$\s*([\d\.,]+)/i);if(e){const o=M(e[1]);if(o>0)return o}return null}function ve(t){if(!t)return null;const e=t.match(/Vencimento\s*[:\s]*(\d{2}[\/\.-]\d{2}[\/\.-]\d{4})/i)||t.match(/Data\s*de\s*vencimento\s*[:\s]*(\d{2})\s+([A-Za-z]{3})\s+(\d{4})/i)||t.match(/FATURA\s+(\d{2})\s+([A-Za-z]{3})\s+(\d{4})/i);if(e){if(e[2]&&e[3]){const o=e[1],a=e[2].toUpperCase(),n=e[3],r={JAN:"01",FEB:"02",MAR:"03",ABR:"04",APR:"04",MAI:"05",MAY:"05",JUN:"06",JUL:"07",AGO:"08",AUG:"08",SET:"09",SEP:"09",OUT:"10",OCT:"10",NOV:"11",DEZ:"12",DEC:"12"}[a]||"07";return`${n}-${r}-${o.padStart(2,"0")}`}else if(e[1]){const[o,a,n]=e[1].split(/[\/\.-]/);return`${n}-${a.padStart(2,"0")}-${o.padStart(2,"0")}`}}return null}window.importarFaturaManualOuArquivo=async function(){const t=document.getElementById("inp-fatura-txt").value.trim();if(!t){$("⚠️ Selecione o arquivo da fatura (.pdf, .csv) ou cole o texto da fatura.");return}await Pt(t,Et)};async function Pt(t,e){const o=ve(t);o&&(document.getElementById("inp-fatura-vencimento").value=o,atualizarMesRefFatura());const a=pe(t),n=ge(t),s=document.getElementById("inp-fatura-vencimento").value||new Date().toISOString().slice(0,10),r=s.slice(0,7),c=n.reduce((E,p)=>E+p.valor,0),d=a||c||0,i=e?`Cartão ${e}`:"Fatura Cartão";B={cartao:e||"Nubank",descricao:i,dataVencimento:s,mesAno:r,valorTotal:d,qtdItens:n.length,itens:n};const m=document.getElementById("inp-revisao-fatura-desc");m&&(m.value=i);const u=document.getElementById("inp-revisao-fatura-val");u&&(u.value=d?d.toFixed(2):""),kt(),n.length>0?$(`✅ ${n.length} compras encontradas! Fatura total: ${l(d)}.`):$("ℹ️ Fatura pronta para revisão. Confirme o valor total e o cartão abaixo.")}window.atualizarValorTotalRevisaoFatura=function(){var e;if(!B)return;const t=parseFloat((e=document.getElementById("inp-revisao-fatura-val"))==null?void 0:e.value)||0;B.valorTotal=t,document.getElementById("badge-total-preview-fatura").textContent=l(t)};function kt(){if(!B)return;const{valorTotal:t,itens:e,cartao:o,descricao:a}=B;document.getElementById("badge-total-preview-fatura").textContent=l(t);const n=document.getElementById("inp-revisao-fatura-desc");n&&(!n.value||n.value==="Fatura Cartão")&&(n.value=a||`Cartão ${o||"Nubank"}`);const s=document.getElementById("inp-revisao-fatura-val");s&&(!s.value||parseFloat(s.value)===0)&&(s.value=t?t.toFixed(2):"");const r=document.getElementById("lista-preview-fatura-itens");!e||!e.length?r.innerHTML='<div class="empty-state">Nenhum item individual extraído. O valor total acima será considerado.</div>':r.innerHTML=e.map((d,i)=>`
      <div style="display:flex; justify-content:space-between; align-items:center; padding:.4rem 0; border-bottom:1px dashed var(--border-color); font-size:.82rem;">
        <span><strong>${d.dataCompra||"—"}</strong> — ${d.descricao}</span>
        <div style="display:flex; align-items:center; gap:.75rem;">
          <span style="color:#fb7185; font-weight:700;">${l(d.valor)}</span>
          <button type="button" class="btn-danger" style="padding:.15rem .45rem; font-size:.75rem;" onclick="removerItemRevisaoFatura(${i})">🗑️</button>
        </div>
      </div>
    `).join("");const c=document.getElementById("box-revisao-fatura");c.style.display="block",c.scrollIntoView({behavior:"smooth"})}window.removerItemRevisaoFatura=function(t){if(!B||!B.itens)return;B.itens.splice(t,1);const e=B.itens.reduce((o,a)=>o+a.valor,0);if(e>0){B.valorTotal=e;const o=document.getElementById("inp-revisao-fatura-val");o&&(o.value=e.toFixed(2))}B.qtdItens=B.itens.length,kt(),$("🗑️ Item removido da revisão da fatura.")};window.confirmarEGravarFaturaDocumento=async function(){var a,n;if(!B)return;const t=(a=document.getElementById("inp-revisao-fatura-desc"))==null?void 0:a.value.trim(),e=parseFloat((n=document.getElementById("inp-revisao-fatura-val"))==null?void 0:n.value)||0,o=document.getElementById("inp-fatura-vencimento").value||new Date().toISOString().slice(0,10);if(!e){$("⚠️ Digite ou confirme o valor total da fatura.");return}B.cartao=t||B.cartao||"Cartão",B.valorTotal=e,B.dataVencimento=o,B.mesAno=o.slice(0,7);try{await vt(_(x,et),{...B,createdAt:yt()}),document.getElementById("box-revisao-fatura").style.display="none",document.getElementById("inp-fatura-txt").value="";const s=document.getElementById("txt-file-fatura");s&&(s.textContent="Clique para Selecionar o Arquivo da Fatura");const r=l(B.valorTotal);B=null,$(`🎉 Fatura de ${r} salva com sucesso!`)}catch(s){alert("Erro ao salvar fatura: "+s.message)}};function ge(t){if(!t)return[];const e=[],o=/(?:[@\)\(\*•\s]+)?(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+(?:(\d{2}\/\d{2})\s+)?(-?R?\$\s*[\d\.]+,\d{2}|-?[\d\.]+,\d{2})/gi;if(t.split(`
`).forEach(n=>{const s=n.trim();if(!s||/EMISS[ÃA]O|TRANSA[ÇC][ÕO]ES|RESUMO|PAGAMENTO DE FATURA|TOTAL DA FATURA|FATURA ANTERIOR|SALDO ANTERIOR|LIMITE DISPON[ÍI]VEL|OPÇÕES DE PAGAMENTO|ALTERNATIVAS DE PAGAMENTO|PAGAMENTO E DEMAIS|PARCELAMENTOS|DESPESAS|HISTÓRICO DE FATURAS|SUPERCRÉDITO|SAQUE À CRÉDITO|COMPRA DATA DESCRIÇÃO/i.test(s))return;const r=/(?:[@\)\(\*•\s]+)?(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+(?:(\d{2}\/\d{2})\s+)?(-?R?\$\s*[\d\.]+,\d{2}|-?[\d\.]+,\d{2})$/i,c=s.match(r)||s.match(/(?:[@\)\(\*•\s]+)?(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+(?:(\d{2}\/\d{2})\s+)?(-?R?\$\s*[\d\.]+,\d{2}|-?[\d\.]+,\d{2})/i);if(c){const d=c[1];let i=c[2].trim();const m=c[3],u=c[4];if(u.includes("-")||/DEB AUTOM|PAGAMENTO|PAGTO|CR[ÉE]DITO FATURA/i.test(i))return;const E=M(u);m&&(i+=` (${m})`),i&&E>0&&i.length>2&&!/fatura|limite|pagamento|saldo|alternativas|opções|período|emissão|vencimento/i.test(i)&&e.push({dataCompra:d,descricao:i,valor:E})}}),e.length===0){let n;for(;(n=o.exec(t))!==null;){const s=n[1];let r=n[2].trim();const c=n[3],d=n[4];if(d.includes("-")||/DEB AUTOM|PAGAMENTO|PAGTO|CR[ÉE]DITO FATURA/i.test(r))continue;const i=M(d);c&&(r+=` (${c})`),r&&i>0&&r.length>2&&!/fatura|limite|pagamento|saldo|alternativas|opções|período|emissão|vencimento/i.test(r)&&e.push({dataCompra:s,descricao:r,valor:i})}}return e}window.ultimosLocaisAnalisados={};function fe(t){if(!t)return"DIVERSOS";let e=t.replace(/\(\d{1,2}\/\d{1,2}\)/gi,"").replace(/\b\d{1,2}\/\d{1,2}\b/gi,"").replace(/\b\d{1,2}x\b/gi,"").trim();return e=e.replace(/\s+/g," "),e.toUpperCase()}function zt(t){const e={};(Array.isArray(t)?t:[t]).forEach(n=>{!n||!n.itens||!Array.isArray(n.itens)||n.itens.forEach(s=>{if(!s.descricao||!s.valor)return;const r=fe(s.descricao);e[r]||(e[r]={nome:r,qtd:0,valorTotal:0,compras:[]}),e[r].qtd+=1,e[r].valorTotal+=s.valor||0,e[r].compras.push({dataCompra:s.dataCompra||"—",descricao:s.descricao,valor:s.valor||0,cartao:n.cartao||"Cartão",mesAno:n.mesAno||"—"})})});const a=Object.values(e).filter(n=>n.qtd>=2);return a.sort((n,s)=>s.valorTotal-n.valorTotal),a}function Ut(t,e="geral"){const o=zt(t);if(o.forEach(n=>{window.ultimosLocaisAnalisados[`${e}_${n.nome}`]=n}),!o.length)return`
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
        <span class="badge rose" style="font-size:.85rem; padding:.35rem .75rem">Soma Repetidos: ${l(a)}</span>
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
                <div style="font-weight:800; font-size:1.08rem; color:#fb7185">${l(n.valorTotal)}</div>
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
    `,document.body.appendChild(n),o=n,o.addEventListener("click",s=>{s.target===o&&fecharModalEstabelecimento()})}document.getElementById("modal-est-titulo").innerHTML=`🏬 Estabelecimento: <span style="color:#fff">${e.nome}</span>`,document.getElementById("modal-est-subtitulo").textContent=`${e.qtd} compra(s) somando o valor total de ${l(e.valorTotal)}`;const a=document.getElementById("modal-est-body");a.innerHTML=`
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
  `,o.style.display="flex"};window.fecharModalEstabelecimento=function(){const t=document.getElementById("modal-detalhes-estabelecimento");t&&(t.style.display="none")};function be(){const t=P.reduce((a,n)=>a+(n.valorTotal!==void 0?n.valorTotal:n.valor||0),0);document.getElementById("badge-total-cartoes").textContent=`${l(t)} total`;const e=document.getElementById("lista-faturas-registradas");if(!P.length){e.innerHTML='<div class="empty-state">Nenhuma fatura cadastrada ainda.</div>';return}const o=Ut(P,"geral");e.innerHTML=o+P.map(a=>{var u;const n=a.valorTotal!==void 0?a.valorTotal:a.valor||0,s=a.cartao||"Cartão",r=s.toLowerCase().includes("nubank"),c=r?"purple":"red",d=r?"🟣":"🔴",i=a.dataVencimento?dt(a.dataVencimento).split(",")[0]:"—",m=a.mesAno||"—";return`
      <div class="purchase-card" style="margin-bottom:1rem">
        <div class="purchase-header" onclick="toggleDetail('fat-${a.id}')">
          <div class="purchase-info">
            <h3><span class="badge ${c}">${d} ${s}</span> — Vencimento: ${i}</h3>
            <p>📅 Mês Referência: <strong>${m}</strong> &nbsp;•&nbsp; 🛒 ${a.qtdItens||((u=a.itens)==null?void 0:u.length)||1} itens contemplados</p>
          </div>
          <div class="purchase-values" style="display:flex;align-items:center;gap:.75rem">
            <div style="text-align:right">
              <div class="pv-total" style="color:#fb7185">${l(n)}</div>
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
          ${Nt(a)}
        </div>
      </div>
    `}).join("")}function Nt(t){if(t.itens&&t.itens.length>0){const e=zt([t]),o=`fatura_${t.id}`;e.forEach(n=>{window.ultimosLocaisAnalisados[`${o}_${n.nome}`]=n});let a="";return e.length>0&&(a=`
        <div style="background:rgba(251,113,133,0.08); border:1px dashed rgba(251,113,133,0.35); border-radius:8px; padding:.75rem 1rem; margin-bottom:1rem">
          <div style="font-weight:700; font-size:.84rem; color:#fb7185; margin-bottom:.5rem">
            🏬 Locais com 2 ou mais compras nesta fatura (${e.length} estabelecimentos - clique para ver):
          </div>
          <div style="display:flex; flex-wrap:wrap; gap:.5rem">
            ${e.map(n=>`
                <span style="background:rgba(15,23,42,0.9); border:1px solid rgba(251,113,133,0.4); border-radius:6px; padding:.3rem .6rem; font-size:.78rem; color:#f1f5f9; display:inline-flex; align-items:center; gap:.35rem; cursor:pointer"
                      onclick="event.stopPropagation(); abrirModalComprasEstabelecimento('${`${o}_${n.nome}`}')"
                      title="Clique para ver detalhadamente as compras de ${n.nome}">
                  🏬 <strong>${n.nome}</strong>: <span class="badge rose" style="font-size:.7rem">${n.qtd}x compras</span> <strong style="color:#fb7185; margin-left:.25rem">${l(n.valorTotal)}</strong>
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
  </table></div>`}window.removerItemFaturaCadastrada=async function(t,e){const o=P.find(s=>s.id===t);if(!o||!o.itens||!confirm("Remover este item da fatura?"))return;const a=[...o.itens];a.splice(e,1);const n=a.reduce((s,r)=>s+(r.valor||0),0);a.length===0?(await V(A(x,et,t)),$("🗑️ Fatura excluída pois todos os itens foram removidos.")):(await j(A(x,et,t),{...o,itens:a,valorTotal:n,qtdItens:a.length}),$("🗑️ Item removido da fatura."))};window.excluirFaturaDocumento=async function(t){confirm("Excluir esta fatura e todos os seus lançamentos?")&&(await V(A(x,et,t)),$("🗑️ Fatura removida com sucesso."))};let T=null;function he(){const t=document.getElementById("inp-boleto-vencimento");if(t&&!t.value){const e=new Date,o=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0");t.value=`${o}-${a}-10`,atualizarMesRefBoleto()}}setTimeout(he,300);window.atualizarMesRefBoleto=function(){const t=document.getElementById("inp-boleto-vencimento"),e=document.getElementById("lbl-boleto-mes-ref");if(!(!t||!e))if(t.value){const[o,a]=t.value.split("-"),s=new Date(parseInt(o),parseInt(a)-1,1).toLocaleString("pt-BR",{month:"long"});e.textContent=`Boleto ${s.charAt(0).toUpperCase()+s.slice(1)}/${o}`}else e.textContent="Mês do Boleto"};window.handleFileBoletoSelect=async function(t){const e=t.target.files[0];if(!e)return;const o=document.getElementById("txt-file-boleto");o&&(o.textContent=`📄 Arquivo: ${e.name}`),$(`⏳ Lendo arquivo do boleto (${e.name})...`);let a="";if(e.type==="application/pdf"||e.name.endsWith(".pdf"))a=await Ot(e);else try{a=await e.text()}catch{a=""}a?(document.getElementById("inp-boleto-txt").value=a,await Vt(a,e.name)):$("❌ Não foi possível ler o texto do arquivo do boleto.")};window.importarBoletoManualOuArquivo=async function(){const t=document.getElementById("inp-boleto-txt").value.trim();if(!t){$("⚠️ Selecione o arquivo do boleto (.pdf, .txt) ou cole o texto do boleto.");return}await Vt(t,"Boleto")};async function Vt(t,e){const o=ye(t);o.vencimento&&(document.getElementById("inp-boleto-vencimento").value=o.vencimento,atualizarMesRefBoleto());const a=document.getElementById("inp-boleto-vencimento").value||new Date().toISOString().slice(0,10),n=a.slice(0,7),s=o.beneficiario||e.replace(/\.[^/.]+$/,"")||"Boleto / Conta",r=o.itens.reduce((d,i)=>d+i.valor,0),c=o.valorTotal||r||0;document.getElementById("inp-revisao-boleto-desc").value=s,document.getElementById("inp-revisao-boleto-val").value=c?c.toFixed(2):"",T={descricao:s,dataVencimento:a,mesAno:n,valorTotal:c,qtdItens:o.itens.length,itens:o.itens},jt(),$("✅ Boleto identificado! Confira a descrição, valor e itens antes de salvar.")}window.atualizarValorTotalRevisaoBoleto=function(){if(!T)return;const t=parseFloat(document.getElementById("inp-revisao-boleto-val").value)||0;T.valorTotal=t,document.getElementById("badge-total-preview-boleto").textContent=l(t)};function jt(){if(!T)return;const{valorTotal:t,itens:e}=T;document.getElementById("badge-total-preview-boleto").textContent=l(t);const o=document.getElementById("lista-preview-boleto-itens");!e||!e.length?o.innerHTML='<div class="empty-state">Nenhum encargo/item individual extraído. O valor total acima será considerado.</div>':o.innerHTML=e.map((n,s)=>`
      <div style="display:flex; justify-content:space-between; align-items:center; padding:.4rem 0; border-bottom:1px dashed var(--border-color); font-size:.82rem;">
        <span><strong>${n.dataBoleto||"—"}</strong> — ${n.descricao}</span>
        <div style="display:flex; align-items:center; gap:.75rem;">
          <span style="color:#c084fc; font-weight:700;">${l(n.valor)}</span>
          <button type="button" class="btn-danger" style="padding:.15rem .45rem; font-size:.75rem;" onclick="removerItemRevisaoBoleto(${s})">🗑️</button>
        </div>
      </div>
    `).join("");const a=document.getElementById("box-revisao-boleto");a.style.display="block",a.scrollIntoView({behavior:"smooth"})}window.removerItemRevisaoBoleto=function(t){if(!T||!T.itens)return;T.itens.splice(t,1);const e=T.itens.reduce((o,a)=>o+a.valor,0);e>0&&(T.valorTotal=e,document.getElementById("inp-revisao-boleto-val").value=e.toFixed(2)),T.qtdItens=T.itens.length,jt(),$("🗑️ Item removido da revisão do boleto.")};window.confirmarEGravarBoletoDocumento=async function(){if(!T)return;const t=document.getElementById("inp-revisao-boleto-desc").value.trim(),e=parseFloat(document.getElementById("inp-revisao-boleto-val").value)||0,o=document.getElementById("inp-boleto-vencimento").value||new Date().toISOString().slice(0,10);if(!e){$("⚠️ Digite ou confirme o valor total do boleto.");return}T.descricao=t||"Boleto / Conta",T.valorTotal=e,T.dataVencimento=o,T.mesAno=o.slice(0,7);try{await vt(_(x,at),{...T,createdAt:yt()}),document.getElementById("box-revisao-boleto").style.display="none",document.getElementById("inp-boleto-txt").value="";const a=document.getElementById("txt-file-boleto");a&&(a.textContent="Clique para Selecionar o Arquivo do Boleto");const n=l(T.valorTotal);T=null,$(`🎉 Boleto de ${n} salvo com sucesso!`)}catch(a){alert("Erro ao salvar boleto: "+a.message)}};function ye(t){if(!t)return{beneficiario:"",valorTotal:0,vencimento:null,itens:[]};let e="",o=0,a=null;const n=[],s=t.match(/Vencimento\s*[:\s]*(\d{2}[\/\.-]\d{2}[\/\.-]\d{4})/i)||t.match(/Vencimento\s*[:\s]*(\d{2})\s+([A-Za-z]{3})\s+(\d{4})/i)||t.match(/Data\s*de\s*Vencimento\s*[:\s]*(\d{2}[\/\.-]\d{2}[\/\.-]\d{4})/i);if(s){if(s[2]&&s[3]){const i=s[1],m=s[2].toUpperCase();a=`${s[3]}-${{JAN:"01",FEB:"02",MAR:"03",ABR:"04",APR:"04",MAI:"05",MAY:"05",JUN:"06",JUL:"07",AGO:"08",AUG:"08",SET:"09",SEP:"09",OUT:"10",OCT:"10",NOV:"11",DEZ:"12",DEC:"12"}[m]||"07"}-${i.padStart(2,"0")}`}else if(s[1]){const[i,m,u]=s[1].split(/[\/\.-]/);a=`${u}-${m.padStart(2,"0")}-${i.padStart(2,"0")}`}}const r=t.match(/Benefici[áa]rio\s*[:\s]*([^\n\r]+)/i)||t.match(/Nome\s*do\s*Cedente\s*[:\s]*([^\n\r]+)/i)||t.match(/Raz[ãa]o\s*Social\s*[:\s]*([^\n\r]+)/i);r&&(e=r[1].trim().replace(/\s{2,}/g," "));const c=t.match(/Valor\s*do\s*Documento\s*[:\s]*R?\$\s*([\d\.]+,\d{2})/i)||t.match(/\(=\)\s*Valor\s*Cobrado\s*[:\s]*R?\$\s*([\d\.]+,\d{2})/i)||t.match(/Valor\s*Cobrado\s*[:\s]*R?\$\s*([\d\.]+,\d{2})/i)||t.match(/Valor\s*R?\$\s*([\d\.]+,\d{2})/i);return c&&(o=M(c[1])),t.split(`
`).forEach(i=>{const m=i.trim();if(!m||/vencimento|beneficiário|cedente|nosso\s*número|agência|código|autenticação|instruções/i.test(m))return;const u=m.match(/(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\b[A-Za-z]{3}\b)?\s*(.+?)\s+R?\$\s*([\d\.]+,\d{2})$/i);if(u){const E=u[1]||"Boleto",p=u[2].trim(),v=M(u[3]);p&&v>0&&p.length>2&&!/valor|total|documento|cobrado/i.test(p)&&n.push({dataBoleto:E,descricao:p,valor:v})}}),{beneficiario:e,valorTotal:o,vencimento:a,itens:n}}function Ee(){const t=z.reduce((a,n)=>a+(n.valorTotal!==void 0?n.valorTotal:n.valor||0),0);document.getElementById("badge-total-boletos").textContent=`${l(t)} total`;const e=document.getElementById("lista-boletos-registrados");if(!z.length){e.innerHTML='<div class="empty-state">Nenhum boleto cadastrado ainda.</div>';return}const o=[...z].sort((a,n)=>{const s=a.dataVencimento?new Date(a.dataVencimento).getTime():a.mesAno?new Date(a.mesAno+"-01").getTime():0;return(n.dataVencimento?new Date(n.dataVencimento).getTime():n.mesAno?new Date(n.mesAno+"-01").getTime():0)-s});e.innerHTML=o.map(a=>{var d;const n=a.valorTotal!==void 0?a.valorTotal:a.valor||0,s=a.dataVencimento?dt(a.dataVencimento).split(",")[0]:"—",r=a.mesAno||"—",c=a.descricao||"Boleto / Conta";return`
      <div class="purchase-card">
        <div class="purchase-header" onclick="toggleDetail('bol-${a.id}')">
          <div class="purchase-info">
            <h3><span class="badge purple">📄 ${c}</span> — Vencimento: ${s}</h3>
            <p>📅 Mês Referência: <strong>${r}</strong> &nbsp;•&nbsp; 🛒 ${a.qtdItens||((d=a.itens)==null?void 0:d.length)||1} itens / encargos</p>
          </div>
          <div class="purchase-values" style="display:flex;align-items:center;gap:.75rem">
            <div style="text-align:right">
              <div class="pv-total" style="color:#c084fc">${l(n)}</div>
              <div class="pv-sub">Boleto do Mês</div>
            </div>
            <button type="button" class="btn-danger" style="padding:.35rem .65rem;font-size:.78rem;margin-left:.25rem" onclick="event.stopPropagation(); excluirBoletoDocumento('${a.id}')" title="Excluir este boleto de todos os lugares do sistema">
              🗑️ Excluir
            </button>
          </div>
          <svg class="chevron" id="chev-bol-${a.id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="purchase-details" id="detail-bol-${a.id}">
          <div class="details-toolbar">
            <span class="card-subtext">Detalhamento dos Itens / Encargos do Boleto</span>
            <button class="btn-danger" onclick="excluirBoletoDocumento('${a.id}')">🗑️ Excluir Boleto</button>
          </div>
          ${Ht(a)}
        </div>
      </div>
    `}).join("")}function Ht(t){return t.itens&&t.itens.length>0?`<div class="table-responsive"><table class="custom-table">
      <thead><tr><th>Data</th><th>Descrição / Item</th><th class="num">Valor</th><th>Ação</th></tr></thead>
      <tbody>${t.itens.map((e,o)=>`<tr>
        <td><strong>${e.dataBoleto||"—"}</strong></td>
        <td>${e.descricao}</td>
        <td class="num" style="color:#c084fc"><strong>${l(e.valor)}</strong></td>
        <td><button class="btn-danger" style="padding:.2rem .5rem; font-size:.78rem;" onclick="removerItemBoletoCadastrado('${t.id}', ${o})">🗑️ Excluir</button></td>
      </tr>`).join("")}</tbody>
    </table></div>`:`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Descrição</th><th class="num">Valor</th><th>Ação</th></tr></thead>
    <tbody><tr>
      <td>${t.descricao||"Boleto"}</td>
      <td class="num" style="color:#c084fc"><strong>${l(t.valor||t.valorTotal)}</strong></td>
      <td><button class="btn-danger" style="padding:.2rem .5rem; font-size:.78rem;" onclick="excluirBoletoDocumento('${t.id}')">🗑️ Excluir</button></td>
    </tr></tbody>
  </table></div>`}window.removerItemBoletoCadastrado=async function(t,e){const o=z.find(s=>s.id===t);if(!o||!o.itens||!confirm("Remover este item do boleto?"))return;const a=[...o.itens];a.splice(e,1);const n=a.reduce((s,r)=>s+(r.valor||0),0);a.length===0?(await V(A(x,at,t)),$("🗑️ Boleto excluído pois todos os itens foram removidos.")):(await j(A(x,at,t),{...o,itens:a,valorTotal:n,qtdItens:a.length}),$("🗑️ Item removido do boleto."))};window.excluirBoletoDocumento=async function(t){const e=z.find(n=>n.id===t),o=e?e.descricao||"Boleto / Conta":"este boleto",a=e?l(e.valorTotal!==void 0?e.valorTotal:e.valor||0):"";confirm(`⚠️ Deseja realmente excluir ${o} ${a?"("+a+")":""}?

Este boleto será removido permanentemente de todos os meses, resumos e relatórios do sistema.`)&&(await V(A(x,at,t)),$("🗑️ Boleto removido de todo o sistema com sucesso."))};document.getElementById("form-config-reservas").addEventListener("submit",async t=>{t.preventDefault();const e=parseFloat(document.getElementById("inp-meta-anual").value)||0,o=parseFloat(document.getElementById("inp-saldo-guardado").value)||0;await j(A(x,Mt,"config"),{metaAnual:e,valorAtualGuardado:o,dataAtualizacao:new Date().toISOString()}),$("✅ Reservas e configurações de economias salvas!")});function $e(){const t=ht.metaAnual||15e3,e=ht.valorAtualGuardado||3e3,o=document.getElementById("inp-meta-anual");o&&!o.value&&t&&(o.value=t);const a=document.getElementById("inp-saldo-guardado");a&&!a.value&&e&&(a.value=e);const s=new Date().getMonth()+1,r=Math.max(1,12-s+1),c=Math.max(0,t-e),d=c>0?c/r:0;document.getElementById("val-meta-reserva").textContent=l(d);const i=document.getElementById("subtext-meta-reserva");i&&(i.textContent=`Faltam ${l(c)} p/ Meta Anual de ${l(t)} (${r} mês(es) até o fim do ano)`),document.getElementById("val-real-guardado").textContent=l(e);const m=N.reduce((h,w)=>h+(w.valor||0),0),u=P.reduce((h,w)=>h+(w.valorTotal!==void 0?w.valorTotal:w.valor||0),0),E=z.reduce((h,w)=>h+(w.valorTotal!==void 0?w.valorTotal:w.valor||0),0);let p=0;D.forEach(h=>{h.formasPagamento?p+=(h.formasPagamento.cartaoDebito||0)+(h.formasPagamento.dinheiro||0)+(h.formasPagamento.pix||0):p+=h.valorAPagar||0});const v=u+E+p,y=m-v,L=Math.max(1,ct().length),F=y/L,R=F>0?F*.5:0,O=R*12;document.getElementById("val-recomendacao-reserva").textContent=l(O);const S=document.getElementById("subtext-recomendacao");S&&(S.textContent=`Sugerido poupar ${l(R)}/mês (${l(O)} no ano)`);const b=document.getElementById("box-analise-reserva-detalhes");if(b)if(m===0)b.innerHTML='<p class="empty-state">Cadastre seus salários e entradas na aba "Salários & Entradas" para gerar o diagnóstico inteligente de economias.</p>';else{const h=t>0?Math.min(100,e/t*100).toFixed(1):0;b.innerHTML=`
        <p>Com base na soma acumulada de todos os meses (<strong>${l(m)}</strong> Entradas vs <strong>${l(v)}</strong> Saídas Totais):</p>
        <div style="background:rgba(15,23,42,0.6);padding:1rem;border-radius:10px;margin:.75rem 0;border:1px solid var(--border-color)">
          <div style="display:flex;justify-content:space-between;margin-bottom:.4rem;flex-wrap:wrap;gap:.5rem">
            <span>💰 Saldo Livre Acumulado no Sistema: <strong>${l(y)}</strong></span>
            <span>🎯 Meta Anual Desejada: <strong>${l(t)}</strong></span>
          </div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width:${h}%"></div>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:.78rem;color:var(--text-muted);margin-top:.4rem">
            <span>Guardado: ${l(e)} (${h}%)</span>
            <span>Faltam guardar: ${l(c)} nos próximos ${r} meses</span>
          </div>
        </div>
        <p style="font-size:.84rem;color:var(--text-muted)">
          💡 <strong>Planejamento do Sistema:</strong> Guardando <strong>${l(d)}/mês</strong> durante os próximos <strong>${r} meses</strong>, você atingirá com 100% de precisão sua Meta Anual de <strong>${l(t)}</strong>!
        </p>
      `}xe()}function xe(){const t=document.getElementById("container-analise-mensal-lista");if(!t)return;const e=ct();if(!e.length){t.innerHTML='<div class="empty-state">Nenhum mês registrado para gerar a análise mensal.</div>';return}const o=e.map(a=>{const s=N.filter(b=>b.mesAno===a).reduce((b,h)=>b+(h.valor||0),0),r=P.filter(b=>b.mesAno===a),c=r.reduce((b,h)=>b+(h.valorTotal!==void 0?h.valorTotal:h.valor||0),0),d=z.filter(b=>b.mesAno===a),i=d.reduce((b,h)=>b+(h.valorTotal!==void 0?h.valorTotal:h.valor||0),0),m=D.filter(b=>b.mesAno===a);let u=0;m.forEach(b=>{b.formasPagamento&&(u+=b.formasPagamento.cartaoDebito||0)});const E=c+i+u,p=s-E,v=p>=0,[y,L]=a.split("-"),R=new Date(parseInt(y),parseInt(L)-1,1).toLocaleString("pt-BR",{month:"long"}),O=R.charAt(0).toUpperCase()+R.slice(1);let S="";if(v){const b=p*.5;S=`
        <div style="background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.25); border-radius:10px; padding:.85rem 1rem; margin-top:1rem">
          <div style="font-weight:700; font-size:.88rem; color:#34d399; margin-bottom:.2rem">
            🎉 Mês Positivo! Capacidade de Poupança Excelente
          </div>
          <p style="font-size:.8rem; color:var(--text-muted); margin:0">
            Neste mês sobraram <strong>${l(p)}</strong> em conta. O sistema sugere destinar pelo menos <strong style="color:#34d399">${l(b)}</strong> para sua reserva!
          </p>
        </div>
      `}else{const b=Math.abs(p);let h="Cartão de Crédito",w=c;i>w&&(h="Boletos & Contas",w=i),u>w&&(h="Mercado no Débito",w=u);const Y=E>0?(w/E*100).toFixed(1):0;let U="",q=0;r.forEach(g=>{const I=g.valorTotal!==void 0?g.valorTotal:g.valor||0;I>q&&(q=I,U=`Fatura do ${g.cartao||"Cartão"}`)}),d.forEach(g=>{const I=g.valorTotal!==void 0?g.valorTotal:g.valor||0;I>q&&(q=I,U=`Boleto ${g.descricao||"de Conta"}`)}),S=`
        <div style="background:rgba(244,63,94,0.1); border:1px solid rgba(244,63,94,0.3); border-radius:10px; padding:.85rem 1rem; margin-top:1rem">
          <div style="font-weight:700; font-size:.88rem; color:#fb7185; margin-bottom:.4rem; display:flex; align-items:center; gap:.4rem">
            ⚠️ O que causou o déficit em ${O}/${y}?
          </div>
          <p style="font-size:.82rem; color:var(--text-main); margin-bottom:.5rem; line-height:1.5">
            As saídas (<strong>${l(E)}</strong>) superaram as entradas (<strong>${l(s)}</strong>) em <strong style="color:#fb7185">${l(b)}</strong>.
          </p>
          <div style="font-size:.78rem; color:var(--text-muted); line-height:1.5">
            • <strong>Vilão Principal:</strong> A categoria <strong style="color:#f8fafc">${h}</strong> representou <strong>${Y}%</strong> de todas as saídas do mês (${l(w)}).
            ${U?`<br>• <strong>Maior Despesa Registrada:</strong> ${U} no valor de <strong style="color:#fb7185">${l(q)}</strong>.`:""}
          </div>
        </div>
      `}return`
      <div class="card" style="margin-bottom:1.25rem; border-color:${v?"rgba(52,211,153,0.3)":"rgba(251,113,133,0.4)"}">
        <div class="card-header" style="flex-wrap:wrap; gap:.5rem">
          <div style="display:flex; align-items:center; gap:.5rem">
            <span class="card-title" style="font-size:1rem; color:#f8fafc">📅 ${O} de ${y}</span>
            <span class="badge ${v?"green":"red"}">${v?"🟢 Superávit":"🔴 Déficit"}</span>
          </div>
          <button type="button" class="btn-secondary" style="padding:.25rem .6rem; font-size:.78rem" onclick="verMesEIrParaControle('${a}')">
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
            <div style="font-weight:700; font-size:1rem; color:#fbbf24">${l(u)}</div>
          </div>

          <div style="background:rgba(15,23,42,0.8); padding:.6rem .8rem; border-radius:8px; border:1px solid ${v?"#34d399":"#fb7185"}">
            <div style="font-size:.75rem; color:var(--text-muted)">Saldo Líquido no Mês</div>
            <div style="font-weight:800; font-size:1.05rem; color:${v?"#60a5fa":"#fb7185"}">${l(p)}</div>
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
      ${o}
    </div>
  `}const pt=[{id:"est_1",nome:"Corte de Cabelo Victor",quantidade:2,valorUnitario:70},{id:"est_2",nome:"Compra Programada Tunico",quantidade:1,valorUnitario:150},{id:"est_3",nome:"Sobrancelha Maria",quantidade:1,valorUnitario:50},{id:"est_4",nome:"Unha Maria",quantidade:1,valorUnitario:90},{id:"est_5",nome:"Banho Tunico",quantidade:1,valorUnitario:65},{id:"est_6",nome:"Saída Simples",quantidade:2,valorUnitario:100},{id:"est_7",nome:"Saída Premiun",quantidade:1,valorUnitario:150},{id:"est_8",nome:"Saída Premiun Plus",quantidade:1,valorUnitario:200},{id:"est_9",nome:"Mercado Pontual",quantidade:4,valorUnitario:70},{id:"est_10",nome:"Farmacia",quantidade:2,valorUnitario:35},{id:"est_11",nome:"Padaria 3D",quantidade:10,valorUnitario:10}];window.abrirModalAddEstimativa=function(t=null){const e=document.getElementById("modal-add-estimativa");if(e){if(document.getElementById("inp-est-id").value=t||"",t){document.getElementById("titulo-modal-estimativa").textContent="✏️ Editar Gastos Previsto";const o=Q.find(n=>n.id===f),a=((o==null?void 0:o.itens)||[]).find(n=>n.id===t);a&&(document.getElementById("inp-est-nome").value=a.nome||"",document.getElementById("inp-est-qtd").value=a.quantidade||1,document.getElementById("inp-est-val").value=a.valorUnitario||0)}else document.getElementById("titulo-modal-estimativa").textContent="➕ Adicionar Gastos Previsto",document.getElementById("inp-est-nome").value="",document.getElementById("inp-est-qtd").value=1,document.getElementById("inp-est-val").value="";e.classList.add("active")}};window.fecharModalAddEstimativa=function(){var t;(t=document.getElementById("modal-add-estimativa"))==null||t.classList.remove("active")};var Bt;(Bt=document.getElementById("form-item-estimativa"))==null||Bt.addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-est-id").value,o=document.getElementById("inp-est-nome").value.trim(),a=parseFloat(document.getElementById("inp-est-qtd").value)||1,n=parseFloat(document.getElementById("inp-est-val").value)||0;if(!o){alert("Preencha a descrição do gasto.");return}const s=Q.find(c=>c.id===f);let r=s?[...s.itens||[]]:[...pt];e?r=r.map(c=>c.id===e?{...c,nome:o,quantidade:a,valorUnitario:n}:c):r.push({id:"est_"+Date.now(),nome:o,quantidade:a,valorUnitario:n}),await j(A(x,J,f),{mesAno:f,itens:r,ultimaAtualizacao:new Date().toISOString()}),fecharModalAddEstimativa(),$("✅ Estimativa atualizada!")});window.atualizarQtdItemEstimativa=async function(t,e){const o=Q.find(s=>s.id===f);if(!o)return;const a=Math.max(1,parseInt(e)||1),n=(o.itens||[]).map(s=>s.id===t?{...s,quantidade:a}:s);await j(A(x,J,f),{mesAno:f,itens:n,ultimaAtualizacao:new Date().toISOString()})};window.atualizarValorItemEstimativa=async function(t,e){const o=Q.find(s=>s.id===f);if(!o)return;const a=Math.max(0,parseFloat(e)||0),n=(o.itens||[]).map(s=>s.id===t?{...s,valorUnitario:a}:s);await j(A(x,J,f),{mesAno:f,itens:n,ultimaAtualizacao:new Date().toISOString()})};window.excluirItemEstimativa=async function(t){if(!confirm("Remover este item da estimativa do mês?"))return;const e=Q.find(a=>a.id===f);if(!e)return;const o=(e.itens||[]).filter(a=>a.id!==t);await j(A(x,J,f),{mesAno:f,itens:o,ultimaAtualizacao:new Date().toISOString()}),$("🗑️ Item removido da estimativa.")};window.resetarItensEstimativaPadrao=async function(){confirm(`Deseja carregar/resetar os 11 itens padrão de previsão para ${f}?`)&&(await j(A(x,J,f),{mesAno:f,itens:pt,ultimaAtualizacao:new Date().toISOString()}),$("🔄 Itens padrão de estimativa carregados!"))};function Ie(){const t=document.getElementById("container-lista-estimativa");if(!t)return;const e=Q.find(p=>p.id===f);let o=[];e&&Array.isArray(e.itens)?o=e.itens:(o=pt,j(A(x,J,f),{mesAno:f,itens:pt,ultimaAtualizacao:new Date().toISOString()}).catch(p=>console.error("Auto init estimativa error:",p)));let a=0;o.forEach(p=>{a+=(p.quantidade||0)*(p.valorUnitario||0)});const n=document.getElementById("val-total-estimativa-mes");n&&(n.textContent=l(a));const[s,r]=f.split("-"),d=new Date(parseInt(s),parseInt(r)-1,1).toLocaleString("pt-BR",{month:"long"}),i=d.charAt(0).toUpperCase()+d.slice(1),m=document.getElementById("subtext-estimativa-mes");m&&(m.textContent=`Total previsto para ${i} de ${s} (${o.length} itens cadastrados)`);const u=document.getElementById("badge-count-estimativa");if(u&&(u.textContent=`${o.length} itens previstos`),!o.length){t.innerHTML=`
      <div class="empty-state">
        <p>Nenhum gasto estimado para ${f}.</p>
        <button class="btn-secondary" onclick="resetarItensEstimativaPadrao()" style="margin-top:.5rem">
          🔄 Carregar Itens Padrão
        </button>
      </div>
    `;return}const E=`
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
          ${o.map(p=>{const v=(p.quantidade||0)*(p.valorUnitario||0);return`
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
                  <strong style="color:#a5b4fc">${l(v)}</strong>
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
  `;t.innerHTML=E}function we(){const t=document.getElementById("lista-mensal-container");if(!t)return;const e=new Date,o=new Date(e.getFullYear(),e.getMonth()+1,1),a=o.toLocaleString("pt-BR",{month:"long"}),n=o.getFullYear(),s=`${a.charAt(0).toUpperCase()+a.slice(1)} de ${n}`,r=se(o.getFullYear(),o.getMonth()),c=31.8,d=20,i=r*c,m=r*d,u={};let E=0;D.forEach(g=>{const I=g.valorAPagar||0;E+=I;const C=g.mesAno||"Outros";u[C]=(u[C]||0)+I});const p=Math.max(1,Object.keys(u).length),v=E/p,y={};D.forEach(g=>{(g.itens||[]).forEach(I=>{const C=(I.nome||"").toLowerCase().trim();C&&(y[C]||(y[C]={nome:I.nome,marca:I.marca||"Geral",qtdTotal:0,frequenciaNotas:0,valoresUnitarios:[]}),y[C].qtdTotal+=I.quantidade||1,y[C].frequenciaNotas+=1,I.valorUnitario&&y[C].valoresUnitarios.push(I.valorUnitario))})});const L=Object.values(y).map(g=>{const I=g.valoresUnitarios.length>0?g.valoresUnitarios.reduce((rt,ut)=>rt+ut,0)/g.valoresUnitarios.length:0,C=g.qtdTotal/p,tt=p/Math.max(1,g.frequenciaNotas),mt=g.frequenciaNotas/p;let H=0;mt>=.35||C>=.7?H=Math.ceil(C):H=Math.round(C),H<1&&g.frequenciaNotas>=p&&(H=1);const st=H*I;return{nome:g.nome,marca:g.marca,frequenciaNotas:g.frequenciaNotas,intervaloMeses:tt,qtdMensalTaxa:C,totalEstimadoUnidades:H,valorUnitario:I,subtotalCalculado:st}}).filter(g=>g.totalEstimadoUnidades>0);L.sort((g,I)=>I.frequenciaNotas-g.frequenciaNotas);const F=L.reduce((g,I)=>g+I.subtotalCalculado,0),R=v>0?v*1.05:F;let O=1;F>R&&v>0&&(O=R/F);const S=L.map(g=>({...g,subtotalFinal:g.subtotalCalculado*O})),b=v>0?Math.min(F,R):F;let h=b;const w=Math.min(h,i);h-=w;const Y=Math.min(h,m);h-=Y;const U=h>0?h:0;let q=`
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
          <div class="p-val" style="color:#34d399;">${l(w)} <span style="font-size:0.75rem;font-weight:normal;color:var(--text-muted)">/ ${l(i)}</span></div>
        </div>
        <div class="payment-item" style="border-color: rgba(99,102,241,0.4);">
          <div class="p-label">💳 Cartão Crédito (${r}d × R$ 20,00)</div>
          <div class="p-val" style="color:#818cf8;">${l(Y)} <span style="font-size:0.75rem;font-weight:normal;color:var(--text-muted)">/ ${l(m)}</span></div>
        </div>
        <div class="payment-item" style="border-color: ${U>0?"rgba(244,63,94,0.5)":"var(--border-color)"};">
          <div class="p-label">💳 Débito Necessário (Excedente)</div>
          <div class="p-val" style="color: ${U>0?"#fb7185":"var(--text-muted)"};">${l(U)}</div>
        </div>
      </div>

      <div style="margin-top:1.25rem; padding-top:1rem; border-top:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
        <div>
          <span style="font-size:0.85rem; color:var(--text-muted);">Total Estimado da Lista de Compras:</span>
          <p style="font-size:0.75rem; color:#60a5fa;">Média Histórica de Gastos: ${l(v)}</p>
        </div>
        <span style="font-size:1.6rem; font-weight:800; color:var(--primary);">${l(b)}</span>
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
  `;window.dadosListaMensalCache={mesAnoStr:s,diasUteis:r,totalGeralEstimado:b,cobertoAlim:w,cobertoCred:Y,cobertoDeb:U,alimDisponivel:i,credDisponivel:m,lista:S},S.length===0?q+='<div class="empty-state">Adicione notas fiscais para que o sistema gere automaticamente sua lista mensal de compras.</div></div>':q+=`
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
            ${S.map(g=>{const I=g.intervaloMeses>1.2?`A cada ${g.intervaloMeses.toFixed(1)} meses`:`Todo mês (${g.frequenciaNotas}x)`,C=g.qtdMensalTaxa<1?g.qtdMensalTaxa.toFixed(2):g.qtdMensalTaxa.toFixed(1),tt=g.totalEstimadoUnidades.toFixed(1);return`
                <tr>
                  <td><strong>${g.nome}</strong></td>
                  <td><span class="badge amber">${g.marca}</span></td>
                  <td><span class="badge cyan">${I}</span></td>
                  <td class="num">${C} un/mês</td>
                  <td class="num"><span class="badge green" style="font-size:0.82rem;">${tt}</span></td>
                  <td class="num">${l(g.valorUnitario)}</td>
                  <td class="num"><strong>${l(g.subtotalFinal)}</strong></td>
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
    </div>`,t.innerHTML=q}window.exportarPDFListaMensal=function(){if(!window.dadosListaMensalCache||!window.dadosListaMensalCache.lista.length){$("⚠️ Nenhuma lista mensal disponível para exportar.");return}const{mesAnoStr:t,diasUteis:e,totalGeralEstimado:o,cobertoAlim:a,cobertoCred:n,cobertoDeb:s,lista:r}=window.dadosListaMensalCache,c=window.open("","_blank","width=900,height=750");if(!c){alert("Permita pop-ups no navegador para gerar o PDF da lista.");return}const d=`
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
          <div class="val">${l(a)}</div>
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
        <span style="font-size:18px; color:#059669;">${l(o)}</span>
      </div>

      <script>
        window.onload = function() {
          setTimeout(function() { window.print(); }, 350);
        };
      <\/script>
    </body>
    </html>
  `;c.document.open(),c.document.write(d),c.document.close()};document.getElementById("btn-start-cam").addEventListener("click",Gt);document.getElementById("btn-switch-cam").addEventListener("click",Ae);document.getElementById("btn-stop-cam").addEventListener("click",$t);async function Gt(){if(typeof Html5Qrcode>"u")return k("Carregando biblioteca de câmera, aguarde..."),setTimeout(Gt,600);try{Z||(Z=new Html5Qrcode("qr-reader")),G=await Html5Qrcode.getCameras();let t;if(G&&G.length>0){const e=G.findIndex(o=>/back|traseira|rear|environment/i.test(o.label));it=e>=0?e:0,t=G[it].id}else t={facingMode:"environment"};await Z.start(t,{fps:10,qrbox:{width:240,height:240}},_t,()=>{}),lt=!0,document.getElementById("btn-start-cam").style.display="none",document.getElementById("btn-switch-cam").style.display=G.length>1?"inline-flex":"none",document.getElementById("btn-stop-cam").style.display="inline-flex"}catch(t){k("❌ Não foi possível acessar a câmera. Verifique as permissões do navegador."),console.error(t)}}async function Ae(){if(!(!Z||!lt))try{await Z.stop(),G.length>1&&(it=(it+1)%G.length,await Z.start(G[it].id,{fps:10,qrbox:{width:240,height:240}},_t,()=>{}))}catch(t){console.error("switchCam:",t)}}async function $t(){if(Z&&lt)try{await Z.stop()}catch{}lt=!1,document.getElementById("btn-start-cam").style.display="inline-flex",document.getElementById("btn-switch-cam").style.display="none",document.getElementById("btn-stop-cam").style.display="none"}async function _t(t){$t(),document.getElementById("inp-url").value=t,k("✅ QR Code lido! Processando..."),await Yt(t)}document.getElementById("btn-carregar-dados").addEventListener("click",async()=>{const t=document.getElementById("inp-url").value.trim(),e=document.getElementById("inp-html").value.trim();if(!t&&!e){k("⚠️ Cole a URL do QR Code ou o conteúdo da página para ler a nota fiscal.");return}if(t&&!e){k("⏳ Consultando nota fiscal..."),await Yt(t);return}if(e){k("⏳ Processando conteúdo..."),await Zt(e);return}});document.getElementById("btn-preencher-manual").addEventListener("click",()=>{Qt({nomeMercado:"",dataEmissao:new Date().toISOString(),valorTotal:0,descontoTotal:0,valorAPagar:0,qtdTotalItens:0,formasPagamento:{valeAlimentacao:0,cartaoCredito:0,cartaoDebito:0},itens:[]}),k("✍️ Preencha os dados da compra abaixo e clique em Salvar Nota Fiscal.","var(--accent-cyan)")});function Qt(t){var s,r,c;document.getElementById("inp-mercado").value=t.nomeMercado||"",document.getElementById("inp-data").value=ne(t.dataEmissao),document.getElementById("inp-vtotal").value=t.valorTotal!==void 0?t.valorTotal:0,document.getElementById("inp-desconto").value=t.descontoTotal!==void 0?t.descontoTotal:0,document.getElementById("inp-pagar").value=t.valorAPagar!==void 0?t.valorAPagar:0,document.getElementById("inp-qtd").value=t.qtdTotalItens!==void 0?t.qtdTotalItens:0,document.getElementById("inp-alim").value=((s=t.formasPagamento)==null?void 0:s.valeAlimentacao)||0,document.getElementById("inp-cred").value=((r=t.formasPagamento)==null?void 0:r.cartaoCredito)||0,document.getElementById("inp-deb").value=((c=t.formasPagamento)==null?void 0:c.cartaoDebito)||0,X=t.itens||[];const e=document.getElementById("form-nfce");e.style.display="block";const o=document.getElementById("preview-itens-box"),a=document.getElementById("count-preview-itens"),n=document.getElementById("lista-preview-itens");X.length>0?(o.style.display="block",a.textContent=X.length,n.innerHTML=X.map(d=>`
      <div style="display:flex; justify-content:space-between; padding: 0.35rem 0; border-bottom: 1px dashed var(--border-color);">
        <span><strong>${d.nome}</strong> (${d.quantidade} ${d.unidade||"Un"})</span>
        <span>${l(d.valorUnitario)}/un = <strong>${l(d.valorTotal)}</strong></span>
      </div>
    `).join("")):o.style.display="none",e.scrollIntoView({behavior:"smooth"})}document.getElementById("form-nfce").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-mercado").value.trim()||"Mercado",o=document.getElementById("inp-data").value||new Date().toISOString(),a=parseFloat(document.getElementById("inp-vtotal").value)||0,n=parseFloat(document.getElementById("inp-desconto").value)||0,s=parseFloat(document.getElementById("inp-pagar").value)||0,r=parseInt(document.getElementById("inp-qtd").value)||0,c=parseFloat(document.getElementById("inp-alim").value)||0,d=parseFloat(document.getElementById("inp-cred").value)||0,i=parseFloat(document.getElementById("inp-deb").value)||0,m=new Date(o).toISOString().slice(0,16),u=D.find(v=>{const y=new Date(v.dataEmissao).toISOString().slice(0,16),L=Math.abs((v.valorAPagar||0)-s)<.05,F=(v.nomeMercado||"").toLowerCase().trim()===e.toLowerCase().trim();return y===m&&L&&F});if(u){k(`⚠️ Esta nota fiscal já existe no sistema (Cadastrada em ${dt(u.dataEmissao)} no valor de ${l(u.valorAPagar)}). Nota não adicionada!`,"#fb7185"),$("⚠️ Nota fiscal já cadastrada! Operação cancelada.");return}const E=new Date(o),p=`${E.getFullYear()}-${String(E.getMonth()+1).padStart(2,"0")}`;k("⏳ Salvando nota fiscal no banco...");try{await vt(_(x,gt),{nomeMercado:e,dataEmissao:o,mesAno:p,qtdTotalItens:r||X.length,valorTotal:a,descontoTotal:n,valorAPagar:s,formasPagamento:{valeAlimentacao:c,cartaoCredito:d,cartaoDebito:i},itens:X,createdAt:yt()}),k("✅ Nota salva com sucesso!","#34d399"),document.getElementById("form-nfce").style.display="none",document.getElementById("form-nfce").reset(),document.getElementById("inp-url").value="",document.getElementById("inp-html").value="",X=[],Dt(),goTab("dashboard"),$("🎉 Nota fiscal registrada no Firebase!")}catch(v){k("❌ Erro ao salvar: "+v.message,"#fb7185")}});async function Yt(t){const e=[o=>`https://api.allorigins.win/raw?url=${encodeURIComponent(o)}`,o=>`https://corsproxy.io/?${encodeURIComponent(o)}`];for(const o of e)try{const a=await fetch(o(t),{signal:AbortSignal.timeout(8e3)});if(a.ok){const n=await a.text();if(n&&n.length>200){await Zt(n);return}}}catch{}Be(t)}function Be(t){document.getElementById("modal-link").href=t,document.getElementById("modal-cors").classList.add("active"),k("⚠️ Abra o link, copie o conteúdo da página e cole no campo de texto abaixo.")}async function Zt(t){const e=Ce(t);Qt(e),k("✅ Nota lida com sucesso! Confira os valores abaixo e altere se necessário antes de Salvar.","#34d399")}function Ce(t){var w,Y,U;const o=new DOMParser().parseFromString(t,"text/html"),a=((w=o.body)==null?void 0:w.textContent)||t;let n=((U=(Y=o.querySelector(".txtTopo, .nomeEmit, h1"))==null?void 0:Y.textContent)==null?void 0:U.trim())||"Mercado",s=new Date().toISOString();const r=a.match(/Emiss[ãa]o\s*[:\-]?\s*(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})?/i)||a.match(/(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})/);if(r){const[q,g,I]=r[1].split("/");s=`${I}-${g}-${q}T${r[2]||"12:00:00"}`}const c=a.match(/Qtd\.?\s*total\s*de\s*itens\s*[:\s]*([\d,\.]+)/i),d=a.match(/Valor\s*total\s*R\$\s*[:\s]*([\d\.,]+)/i),i=a.match(/Descontos?\s*R\$\s*[:\s]*([\d\.,]+)/i),m=a.match(/Valor\s*a\s*pagar\s*R\$\s*[:\s]*([\d\.,]+)/i)||a.match(/VALOR\s*PAGO\s*R\$\s*[:\s]*([\d\.,]+)/i),u=a.match(/(?:Vale\s*)?Alimenta[çc][ãa]o\s*[:\s]*([\d\.,]+)/i),E=a.match(/(?:Cart[ãa]o\s*de\s*)?Cr[eé]dito\s*[:\s]*([\d\.,]+)/i),p=a.match(/(?:Cart[ãa]o\s*de\s*)?D[eé]bito\s*[:\s]*([\d\.,]+)/i),v=c?M(c[1]):0,y=d?M(d[1]):0,L=i?M(i[1]):0;let F=m?M(m[1]):y-L;const R={valeAlimentacao:u?M(u[1]):0,cartaoCredito:E?M(E[1]):0,cartaoDebito:p?M(p[1]):0},O=[];o.querySelectorAll("tr, .item, .itemNota").forEach(q=>{var xt;const g=q.textContent;if(!/Vl\.\s*Unit|valorUnitario|Qtde?\./i.test(g))return;const I=q.querySelector(".txtTit, .txtTit2, .nomeProd"),C=((xt=I==null?void 0:I.textContent)==null?void 0:xt.trim())||"",tt=g.match(/Qtde?\.\s*[:\s]*([\d,\.]+)/i),mt=g.match(/Vl\.\s*Unit\.\s*[:\s]*([\d,\.]+)/i),H=g.match(/Vl\.\s*Total\s*([\d,\.]+)/i),st=g.match(/C[oó]digo\s*[:\s]*(\d+)/i),rt=g.match(/UN\s*[:\s]*([A-Za-z]+)/i),ut=tt?M(tt[1]):1,ft=mt?M(mt[1]):0,Wt=H?M(H[1]):ft*ut;C&&ft>0&&O.push({codigo:(st==null?void 0:st[1])||"",nome:C,marca:Te(C),quantidade:ut,unidade:(rt==null?void 0:rt[1])||"Un",valorUnitario:ft,valorTotal:Wt})});const b=new Date(s),h=`${b.getFullYear()}-${String(b.getMonth()+1).padStart(2,"0")}`;return{nomeMercado:n,dataEmissao:s,mesAno:h,qtdTotalItens:v,valorTotal:y,descontoTotal:L,valorAPagar:F,formasPagamento:R,itens:O}}function Te(t){const e=["BAUDUCCO","BAUD","PANCO","DANONE","NESTLE","QUALITA","SADIA","PERDIGAO","SEARA","CAMIL","TIO JOAO","URBANO","LIZA","SOYA","YPE","PILAO","MELITTA","3 CORACOES","VIGOR","PARMALAT","ITALAC","HEINZ","KRAFT"],o=t.toUpperCase();for(const a of e)if(o.includes(a))return a;return o.split(" ")[0]||"Genérica"}function Me(){const t=document.getElementById("lista-historico");if(!D.length){t.innerHTML='<div class="empty-state">📭 Nenhuma compra cadastrada ainda.</div>';return}t.innerHTML=D.map(e=>{var o,a,n;return`
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
          <span class="card-subtext">Pagamentos: Alimentação ${l((o=e.formasPagamento)==null?void 0:o.valeAlimentacao)} · Crédito ${l((a=e.formasPagamento)==null?void 0:a.cartaoCredito)} · Débito ${l((n=e.formasPagamento)==null?void 0:n.cartaoDebito)}</span>
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
  </table></div>`}window.toggleDetail=function(t){const e=document.getElementById("detail-"+t),o=document.getElementById("chev-"+t);e&&e.classList.toggle("open"),o&&o.classList.toggle("open")};window.confirmarExcluirMercado=async function(t){if(confirm("Excluir esta compra de mercado?"))try{await V(A(x,gt,t)),$("🗑️ Compra excluída.")}catch(e){alert("Erro: "+e.message)}};function Se(){const t=document.getElementById("lista-comparacao"),e={};D.forEach(a=>{(a.itens||[]).forEach(n=>{var r;const s=((r=n.nome)==null?void 0:r.toLowerCase().trim())||"produto";e[s]||(e[s]={nome:n.nome,marca:n.marca,hist:{}}),e[s].hist[a.mesAno]=n.valorUnitario})});const o=Object.values(e);if(!o.length){t.innerHTML='<div class="empty-state">Adicione notas para ver a comparação de preços unitários.</div>';return}t.innerHTML=`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Produto</th><th>Marca</th><th>Histórico (Unitário)</th><th>Variação</th></tr></thead>
    <tbody>${o.map(a=>{const n=Object.keys(a.hist).sort();let s=n.map(c=>`${c}: <strong>${l(a.hist[c])}</strong>`).join(" → "),r='<span class="badge cyan">Estável</span>';if(n.length>=2){const c=a.hist[n[n.length-2]],i=a.hist[n[n.length-1]]-c,m=(i/c*100).toFixed(1);i>.01?r=`<span class="badge red">+${m}% ↑</span>`:i<-.01&&(r=`<span class="badge green">${m}% ↓</span>`)}return`<tr><td><strong>${a.nome}</strong></td><td><span class="badge amber">${a.marca||"—"}</span></td><td>${s}</td><td>${r}</td></tr>`}).join("")}</tbody>
  </table></div>`}function De(){const t=document.getElementById("lista-recorrencia"),e=document.getElementById("lista-marcas"),o={},a={};D.forEach(r=>{(r.itens||[]).forEach(c=>{var u;const d=(u=c.nome)==null?void 0:u.toLowerCase().trim();if(!d)return;o[d]||(o[d]={nome:c.nome,marca:c.marca,qtd:0,notas:0,units:[]}),o[d].qtd+=c.quantidade||1,o[d].notas+=1,o[d].units.push(c.valorUnitario||0);const i=(c.nome||"").split(" ")[0].toUpperCase();a[i]||(a[i]={});const m=c.marca||"Genérica";a[i][m]||(a[i][m]=[]),a[i][m].push(c.valorUnitario||0)})});const n=Object.values(o).filter(r=>r.notas>1).sort((r,c)=>c.notas-r.notas);t.innerHTML=n.length?`<div class="table-responsive"><table class="custom-table">
        <thead><tr><th>Item</th><th>Marca</th><th>Compras</th><th class="num">Qtd Total</th><th class="num">Média Unitária</th></tr></thead>
        <tbody>${n.map(r=>{const c=r.units.reduce((d,i)=>d+i,0)/r.units.length;return`<tr>
            <td><strong>${r.nome}</strong></td>
            <td><span class="badge amber">${r.marca||"—"}</span></td>
            <td><span class="badge green">${r.notas}x</span></td>
            <td class="num">${r.qtd}</td>
            <td class="num">${l(c)}</td>
          </tr>`}).join("")}</tbody>
      </table></div>`:'<div class="empty-state">Adicione notas para ver a recorrência de itens.</div>';const s=Object.entries(a).filter(([,r])=>Object.keys(r).length>1).map(([r,c])=>{let d=1/0,i="";const m=Object.entries(c).map(([u,E])=>{const p=E.reduce((v,y)=>v+y,0)/E.length;return p<d&&(d=p,i=u),{marca:u,med:p}});return`<div class="brand-card">
      <div class="brand-card-header">
        <span class="card-title">${r}</span>
        <span class="badge green">🏆 Menor preço: ${i} (${l(d)}/un)</span>
      </div>
      <div class="brands-row">
        ${m.map(u=>`<div class="brand-chip${u.marca===i?" best":""}">
          <div class="bc-name">${u.marca} ${u.marca===i?"✅":""}</div>
          <div class="bc-val">${l(u.med)}<span style="font-size:.7rem;font-weight:400">/un</span></div>
        </div>`).join("")}
      </div>
    </div>`}).join("");e.innerHTML=s||'<div class="empty-state">Ao comprar o mesmo tipo de produto com marcas diferentes, o sistema mostrará qual teve menor preço.</div>'}document.getElementById("btn-modal-close").addEventListener("click",()=>{document.getElementById("modal-cors").classList.remove("active")});
