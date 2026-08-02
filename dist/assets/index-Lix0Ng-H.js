import{initializeApp as pt}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";import{getFirestore as gt,query as vt,collection as tt,orderBy as ft,onSnapshot as ht,addDoc as bt,serverTimestamp as yt,deleteDoc as Et,doc as It}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function a(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(o){if(o.ep)return;o.ep=!0;const r=a(o);fetch(o.href,r)}})();const et=document.createElement("script");et.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js";document.head.appendChild(et);const at=document.createElement("script");at.src="https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js";document.head.appendChild(at);const $t={apiKey:"AIzaSyANpFnEIkyN1XCT6qbtmVR9wx7sQHEsyrE",authDomain:"comprasmercado-23913.firebaseapp.com",projectId:"comprasmercado-23913",storageBucket:"comprasmercado-23913.firebasestorage.app",messagingSenderId:"317518149234",appId:"1:317518149234:web:94f38624d68a2b9a6634eb",measurementId:"G-2XP88EK37S"},Ct=pt($t),Q=gt(Ct),z="compras";let A=[],H=null,w=null,C=[],M=0,D=!1,x=[];function d(t){return Number(t||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}function I(t){if(typeof t=="number")return t;if(!t)return 0;const e=parseFloat(String(t).replace(/R\$\s?/gi,"").replace(/\s/g,"").replace(/\./g,"").replace(",","."));return isNaN(e)?0:e}function nt(t){if(!t)return"—";try{return new Date(t).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}catch{return t}}function V(t,e=3500){const a=document.getElementById("toast");a.textContent=t,a.classList.add("show"),setTimeout(()=>a.classList.remove("show"),e)}function f(t,e="var(--accent-amber)"){const a=document.getElementById("status-msg");a&&(a.textContent=t,a.style.color=e)}function At(t){if(!t)return new Date().toISOString().slice(0,16);try{const e=new Date(t);if(isNaN(e.getTime()))return new Date().toISOString().slice(0,16);const a=n=>String(n).padStart(2,"0");return`${e.getFullYear()}-${a(e.getMonth()+1)}-${a(e.getDate())}T${a(e.getHours())}:${a(e.getMinutes())}`}catch{return new Date().toISOString().slice(0,16)}}function Bt(t,e){let a=0;const n=new Date(t,e+1,0).getDate();for(let o=1;o<=n;o++){const r=new Date(t,e,o).getDay();r!==0&&r!==6&&a++}return a}function ot(t){document.querySelectorAll(".tab-content").forEach(a=>a.classList.remove("active")),document.querySelectorAll("[data-tab]").forEach(a=>a.classList.remove("active"));const e=document.getElementById("tab-"+t);e&&e.classList.add("active"),document.querySelectorAll(`[data-tab="${t}"]`).forEach(a=>a.classList.add("active"))}document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>ot(t.getAttribute("data-tab")))});function wt(){document.getElementById("modal-add-nota").classList.add("active")}function st(){D&&G(),document.getElementById("modal-add-nota").classList.remove("active")}var X;(X=document.getElementById("btn-open-modal-home"))==null||X.addEventListener("click",wt);var _;(_=document.getElementById("btn-close-modal-add"))==null||_.addEventListener("click",st);const xt=vt(tt(Q,z),ft("dataEmissao","desc"));ht(xt,t=>{A=t.docs.map(e=>({id:e.id,...e.data()})),Tt(),Mt(),Ut(),Nt(),kt()},t=>console.error("Firestore:",t));async function St(t){return bt(tt(Q,z),{...t,createdAt:yt()})}async function Lt(t){return Et(It(Q,z,t))}function Tt(){let t=0,e=0,a=0,n=0,o=0,r=0;const s={};A.forEach(c=>{const l=c.valorAPagar||0,p=c.descontoTotal||0;t+=l,e+=p,r+=c.qtdTotalItens||0,c.formasPagamento&&(a+=c.formasPagamento.valeAlimentacao||0,n+=c.formasPagamento.cartaoCredito||0,o+=c.formasPagamento.cartaoDebito||0);const m=c.mesAno||"Outros";s[m]=(s[m]||0)+l}),document.getElementById("dash-total").textContent=d(t),document.getElementById("dash-desconto").textContent=d(e);const i=t+e>0?(e/(t+e)*100).toFixed(1):0;document.getElementById("dash-pct").textContent=`${i}% economizado no geral`,document.getElementById("dash-qtd-notas").textContent=A.length,document.getElementById("dash-qtd-itens").textContent=`${r} itens no total`,document.getElementById("dash-alimentacao").textContent=d(a),document.getElementById("dash-credito").textContent=d(n),document.getElementById("dash-debito").textContent=d(o),rt(s)}function rt(t){var r;if(typeof Chart>"u")return setTimeout(()=>rt(t),300);const e=(r=document.getElementById("chart-barras"))==null?void 0:r.getContext("2d");if(!e)return;const a=Object.keys(t).sort(),n=a.map(s=>{const[i,c]=s.split("-");return`${c}/${i}`}),o=a.map(s=>t[s]);H&&H.destroy(),H=new Chart(e,{type:"bar",data:{labels:n.length?n:["Sem compras"],datasets:[{label:"Gasto R$",data:o.length?o:[0],backgroundColor:"rgba(16,185,129,0.78)",borderColor:"#10b981",borderWidth:2,borderRadius:8}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:s=>` ${d(s.raw)}`}}},scales:{y:{beginAtZero:!0,grid:{color:"rgba(255,255,255,.05)"},ticks:{color:"#94a3b8",callback:s=>"R$"+s}},x:{grid:{display:!1},ticks:{color:"#94a3b8"}}}}})}function Mt(){const t=document.getElementById("lista-mensal-container");if(!t)return;const e=new Date,a=new Date(e.getFullYear(),e.getMonth()+1,1),n=a.toLocaleString("pt-BR",{month:"long"}),o=a.getFullYear(),r=`${n.charAt(0).toUpperCase()+n.slice(1)} de ${o}`,s=Bt(a.getFullYear(),a.getMonth()),i=31.8,c=20,l=s*i,p=s*c,m={},b=new Set;A.forEach(u=>{u.mesAno&&b.add(u.mesAno),(u.itens||[]).forEach(v=>{const h=(v.nome||"").toLowerCase().trim();h&&(m[h]||(m[h]={nome:v.nome,marca:v.marca||"Geral",qtdTotal:0,frequencia:0,valoresUnitarios:[]}),m[h].qtdTotal+=v.quantidade||1,m[h].frequencia+=1,v.valorUnitario&&m[h].valoresUnitarios.push(v.valorUnitario))})});const E=Math.max(1,b.size),g=Object.values(m).map(u=>{const v=u.valoresUnitarios.length>0?u.valoresUnitarios.reduce((O,U)=>O+U,0)/u.valoresUnitarios.length:0,h=Math.max(1,Math.ceil(u.qtdTotal/E));return{nome:u.nome,marca:u.marca,frequencia:u.frequencia,qtdSugerida:h,valorUnitario:v,subtotal:h*v}});g.sort((u,v)=>v.frequencia-u.frequencia);const $=g.reduce((u,v)=>u+v.subtotal,0);let y=$;const S=Math.min(y,l);y-=S;const q=Math.min(y,p);y-=q;const L=y>0?y:0;let P=`
    <div class="card" style="margin-bottom:1.5rem; background: linear-gradient(135deg, rgba(30,41,59,0.9), rgba(15,23,42,0.95)); border: 1px solid #3b82f6;">
      <div class="card-header">
        <div>
          <span class="card-title" style="color:#60a5fa;">📅 Previsão de Compras — ${r}</span>
          <p class="card-subtext" style="color:#cbd5e1; margin-top:0.25rem;">
            Orçamento gerado para os <strong>${s} dias úteis</strong> de ${n}.
          </p>
        </div>
        <span class="badge green" style="font-size:0.8rem; padding:0.4rem 0.75rem;">${s} Dias Úteis</span>
      </div>

      <div class="payment-grid" style="margin-top:1rem;">
        <div class="payment-item" style="border-color: rgba(16,185,129,0.4);">
          <div class="p-label">🍽️ Vale Alimentação (${s}d × R$ 31,80)</div>
          <div class="p-val" style="color:#34d399;">${d(S)} <span style="font-size:0.75rem;font-weight:normal;color:var(--text-muted)">/ ${d(l)}</span></div>
        </div>
        <div class="payment-item" style="border-color: rgba(99,102,241,0.4);">
          <div class="p-label">💳 Cartão Crédito (${s}d × R$ 20,00)</div>
          <div class="p-val" style="color:#818cf8;">${d(q)} <span style="font-size:0.75rem;font-weight:normal;color:var(--text-muted)">/ ${d(p)}</span></div>
        </div>
        <div class="payment-item" style="border-color: ${L>0?"rgba(244,63,94,0.5)":"var(--border-color)"};">
          <div class="p-label">💳 Débito Necessário (Excedente)</div>
          <div class="p-val" style="color: ${L>0?"#fb7185":"var(--text-muted)"};">${d(L)}</div>
        </div>
      </div>

      <div style="margin-top:1.25rem; padding-top:1rem; border-top:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
        <span style="font-size:0.9rem; font-weight:600; color:var(--text-muted);">Total Estimado da Lista de Compras:</span>
        <span style="font-size:1.6rem; font-weight:800; color:var(--primary);">${d($)}</span>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-title">Lista Sugerida para ${n}</span>
        <span class="badge amber">${g.length} itens previstos</span>
      </div>
      <p class="card-subtext" style="margin-bottom:1rem;">
        Esta aba é apenas uma estimativa para o próximo mês e <strong>não altera</strong> os gastos reais exibidos na página inicial.
      </p>
  `;g.length===0?P+='<div class="empty-state">Adicione notas fiscais para que o sistema gere automaticamente sua lista mensal de compras.</div></div>':P+=`
      <div class="table-responsive">
        <table class="custom-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Marca</th>
              <th class="num">Qtd. Sugerida</th>
              <th class="num">Preço Unit. Médio</th>
              <th class="num">Subtotal Previsto</th>
            </tr>
          </thead>
          <tbody>
            ${g.map(u=>`
              <tr>
                <td><strong>${u.nome}</strong></td>
                <td><span class="badge amber">${u.marca}</span></td>
                <td class="num">${u.qtdSugerida} un</td>
                <td class="num">${d(u.valorUnitario)}</td>
                <td class="num"><strong>${d(u.subtotal)}</strong></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>`,t.innerHTML=P}document.getElementById("btn-start-cam").addEventListener("click",ct);document.getElementById("btn-switch-cam").addEventListener("click",Dt);document.getElementById("btn-stop-cam").addEventListener("click",G);async function ct(){if(typeof Html5Qrcode>"u")return f("Carregando biblioteca de câmera, aguarde..."),setTimeout(ct,600);try{w||(w=new Html5Qrcode("qr-reader")),C=await Html5Qrcode.getCameras();let t;if(C&&C.length>0){const e=C.findIndex(a=>/back|traseira|rear|environment/i.test(a.label));M=e>=0?e:0,t=C[M].id}else t={facingMode:"environment"};await w.start(t,{fps:10,qrbox:{width:240,height:240}},it,()=>{}),D=!0,document.getElementById("btn-start-cam").style.display="none",document.getElementById("btn-switch-cam").style.display=C.length>1?"inline-flex":"none",document.getElementById("btn-stop-cam").style.display="inline-flex"}catch(t){f("❌ Não foi possível acessar a câmera. Verifique as permissões do navegador."),console.error(t)}}async function Dt(){if(!(!w||!D))try{await w.stop(),C.length>1&&(M=(M+1)%C.length,await w.start(C[M].id,{fps:10,qrbox:{width:240,height:240}},it,()=>{}))}catch(t){console.error("switchCam:",t)}}async function G(){if(w&&D)try{await w.stop()}catch{}D=!1,document.getElementById("btn-start-cam").style.display="inline-flex",document.getElementById("btn-switch-cam").style.display="none",document.getElementById("btn-stop-cam").style.display="none"}async function it(t){G(),document.getElementById("inp-url").value=t,f("✅ QR Code lido! Processando..."),await lt(t)}document.getElementById("btn-carregar-dados").addEventListener("click",async()=>{const t=document.getElementById("inp-url").value.trim(),e=document.getElementById("inp-html").value.trim();if(!t&&!e){f("⚠️ Cole a URL do QR Code ou o conteúdo da página para ler a nota fiscal.");return}if(t&&!e){f("⏳ Consultando nota fiscal..."),await lt(t);return}if(e){f("⏳ Processando conteúdo..."),await mt(e);return}});document.getElementById("btn-preencher-manual").addEventListener("click",()=>{dt({nomeMercado:"",dataEmissao:new Date().toISOString(),valorTotal:0,descontoTotal:0,valorAPagar:0,qtdTotalItens:0,formasPagamento:{valeAlimentacao:0,cartaoCredito:0,cartaoDebito:0},itens:[]}),f("✍️ Preencha os dados da compra abaixo e clique em Salvar Nota Fiscal.","var(--accent-cyan)")});function dt(t){var r,s,i;document.getElementById("inp-mercado").value=t.nomeMercado||"",document.getElementById("inp-data").value=At(t.dataEmissao),document.getElementById("inp-vtotal").value=t.valorTotal!==void 0?t.valorTotal:0,document.getElementById("inp-desconto").value=t.descontoTotal!==void 0?t.descontoTotal:0,document.getElementById("inp-pagar").value=t.valorAPagar!==void 0?t.valorAPagar:0,document.getElementById("inp-qtd").value=t.qtdTotalItens!==void 0?t.qtdTotalItens:0,document.getElementById("inp-alim").value=((r=t.formasPagamento)==null?void 0:r.valeAlimentacao)||0,document.getElementById("inp-cred").value=((s=t.formasPagamento)==null?void 0:s.cartaoCredito)||0,document.getElementById("inp-deb").value=((i=t.formasPagamento)==null?void 0:i.cartaoDebito)||0,x=t.itens||[];const e=document.getElementById("form-nfce");e.style.display="block";const a=document.getElementById("preview-itens-box"),n=document.getElementById("count-preview-itens"),o=document.getElementById("lista-preview-itens");x.length>0?(a.style.display="block",n.textContent=x.length,o.innerHTML=x.map(c=>`
      <div style="display:flex; justify-content:space-between; padding: 0.35rem 0; border-bottom: 1px dashed var(--border-color);">
        <span><strong>${c.nome}</strong> (${c.quantidade} ${c.unidade||"Un"})</span>
        <span>${d(c.valorUnitario)}/un = <strong>${d(c.valorTotal)}</strong></span>
      </div>
    `).join("")):a.style.display="none",e.scrollIntoView({behavior:"smooth"})}document.getElementById("form-nfce").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-mercado").value.trim()||"Mercado",a=document.getElementById("inp-data").value||new Date().toISOString(),n=parseFloat(document.getElementById("inp-vtotal").value)||0,o=parseFloat(document.getElementById("inp-desconto").value)||0,r=parseFloat(document.getElementById("inp-pagar").value)||0,s=parseInt(document.getElementById("inp-qtd").value)||0,i=parseFloat(document.getElementById("inp-alim").value)||0,c=parseFloat(document.getElementById("inp-cred").value)||0,l=parseFloat(document.getElementById("inp-deb").value)||0,p=new Date(a).toISOString().slice(0,16),m=A.find(g=>{const $=new Date(g.dataEmissao).toISOString().slice(0,16),y=Math.abs((g.valorAPagar||0)-r)<.05,S=(g.nomeMercado||"").toLowerCase().trim()===e.toLowerCase().trim();return $===p&&y&&S});if(m){f(`⚠️ Esta nota fiscal já existe no sistema (Cadastrada em ${nt(m.dataEmissao)} no valor de ${d(m.valorAPagar)}). Nota não adicionada!`,"#fb7185"),V("⚠️ Nota fiscal já cadastrada! Operação cancelada.");return}const b=new Date(a),E=`${b.getFullYear()}-${String(b.getMonth()+1).padStart(2,"0")}`;f("⏳ Salvando nota fiscal no banco...");try{await St({nomeMercado:e,dataEmissao:a,mesAno:E,qtdTotalItens:s||x.length,valorTotal:n,descontoTotal:o,valorAPagar:r,formasPagamento:{valeAlimentacao:i,cartaoCredito:c,cartaoDebito:l},itens:x}),f("✅ Nota salva com sucesso!","#34d399"),document.getElementById("form-nfce").style.display="none",document.getElementById("form-nfce").reset(),document.getElementById("inp-url").value="",document.getElementById("inp-html").value="",x=[],st(),ot("dashboard"),V("🎉 Nota fiscal registrada no Firebase!")}catch(g){f("❌ Erro ao salvar: "+g.message,"#fb7185")}});async function lt(t){const e=[a=>`https://api.allorigins.win/raw?url=${encodeURIComponent(a)}`,a=>`https://corsproxy.io/?${encodeURIComponent(a)}`];for(const a of e)try{const n=await fetch(a(t),{signal:AbortSignal.timeout(8e3)});if(n.ok){const o=await n.text();if(o&&o.length>200){await mt(o);return}}}catch{}qt(t)}function qt(t){document.getElementById("modal-link").href=t,document.getElementById("modal-cors").classList.add("active"),f("⚠️ Abra o link, copie o conteúdo da página e cole no campo de texto abaixo.")}async function mt(t){const e=Pt(t);dt(e),f("✅ Nota lida com sucesso! Confira os valores abaixo e altere se necessário antes de Salvar.","#34d399")}function Pt(t){var h,O,U;const a=new DOMParser().parseFromString(t,"text/html"),n=((h=a.body)==null?void 0:h.textContent)||t;let o=((U=(O=a.querySelector(".txtTopo, .nomeEmit, h1"))==null?void 0:O.textContent)==null?void 0:U.trim())||"Mercado",r=new Date().toISOString();const s=n.match(/Emiss[ãa]o\s*[:\-]?\s*(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})?/i)||n.match(/(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})/);if(s){const[R,B,T]=s[1].split("/");r=`${T}-${B}-${R}T${s[2]||"12:00:00"}`}const i=n.match(/Qtd\.?\s*total\s*de\s*itens\s*[:\s]*([\d,\.]+)/i),c=n.match(/Valor\s*total\s*R\$\s*[:\s]*([\d\.,]+)/i),l=n.match(/Descontos?\s*R\$\s*[:\s]*([\d\.,]+)/i),p=n.match(/Valor\s*a\s*pagar\s*R\$\s*[:\s]*([\d\.,]+)/i)||n.match(/VALOR\s*PAGO\s*R\$\s*[:\s]*([\d\.,]+)/i),m=n.match(/(?:Vale\s*)?Alimenta[çc][ãa]o\s*[:\s]*([\d\.,]+)/i),b=n.match(/(?:Cart[ãa]o\s*de\s*)?Cr[eé]dito\s*[:\s]*([\d\.,]+)/i),E=n.match(/(?:Cart[ãa]o\s*de\s*)?D[eé]bito\s*[:\s]*([\d\.,]+)/i),g=i?I(i[1]):0,$=c?I(c[1]):0,y=l?I(l[1]):0;let S=p?I(p[1]):$-y;const q={valeAlimentacao:m?I(m[1]):0,cartaoCredito:b?I(b[1]):0,cartaoDebito:E?I(E[1]):0},L=[];a.querySelectorAll("tr, .item, .itemNota").forEach(R=>{var W;const B=R.textContent;if(!/Vl\.\s*Unit|valorUnitario|Qtde?\./i.test(B))return;const T=R.querySelector(".txtTit, .txtTit2, .nomeProd"),N=((W=T==null?void 0:T.textContent)==null?void 0:W.trim())||"",Y=B.match(/Qtde?\.\s*[:\s]*([\d,\.]+)/i),K=B.match(/Vl\.\s*Unit\.\s*[:\s]*([\d,\.]+)/i),Z=B.match(/Vl\.\s*Total\s*([\d,\.]+)/i),k=B.match(/C[oó]digo\s*[:\s]*(\d+)/i),j=B.match(/UN\s*[:\s]*([A-Za-z]+)/i),J=Y?I(Y[1]):1,F=K?I(K[1]):0,ut=Z?I(Z[1]):F*J;N&&F>0&&L.push({codigo:(k==null?void 0:k[1])||"",nome:N,marca:Ot(N),quantidade:J,unidade:(j==null?void 0:j[1])||"Un",valorUnitario:F,valorTotal:ut})});const u=new Date(r),v=`${u.getFullYear()}-${String(u.getMonth()+1).padStart(2,"0")}`;return{nomeMercado:o,dataEmissao:r,mesAno:v,qtdTotalItens:g,valorTotal:$,descontoTotal:y,valorAPagar:S,formasPagamento:q,itens:L}}function Ot(t){const e=["BAUDUCCO","BAUD","PANCO","DANONE","NESTLE","QUALITA","SADIA","PERDIGAO","SEARA","CAMIL","TIO JOAO","URBANO","LIZA","SOYA","YPE","PILAO","MELITTA","3 CORACOES","VIGOR","PARMALAT","ITALAC","HEINZ","KRAFT"],a=t.toUpperCase();for(const n of e)if(a.includes(n))return n;return a.split(" ")[0]||"Genérica"}function Ut(){const t=document.getElementById("lista-historico");if(!A.length){t.innerHTML='<div class="empty-state">📭 Nenhuma compra cadastrada ainda.</div>';return}t.innerHTML=A.map(e=>{var a,n,o;return`
    <div class="purchase-card">
      <div class="purchase-header" onclick="toggleDetail('${e.id}')">
        <div class="purchase-info">
          <h3>${e.nomeMercado||"Mercado"}</h3>
          <p>📅 ${nt(e.dataEmissao)} &nbsp;•&nbsp; 🛒 ${e.qtdTotalItens||0} itens</p>
        </div>
        <div class="purchase-values">
          <div class="pv-total">${d(e.valorAPagar)}</div>
          <div class="pv-sub">Desc: ${d(e.descontoTotal)}</div>
        </div>
        <svg class="chevron" id="chev-${e.id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      <div class="purchase-details" id="detail-${e.id}">
        <div class="details-toolbar">
          <span class="card-subtext">Pagamentos: Alimentação ${d((a=e.formasPagamento)==null?void 0:a.valeAlimentacao)} · Crédito ${d((n=e.formasPagamento)==null?void 0:n.cartaoCredito)} · Débito ${d((o=e.formasPagamento)==null?void 0:o.cartaoDebito)}</span>
          <button class="btn-danger" onclick="confirmarExcluir('${e.id}')">🗑️ Excluir</button>
        </div>
        ${Rt(e)}
      </div>
    </div>`}).join("")}function Rt(t){return!t.itens||!t.itens.length?'<p class="card-subtext">Nenhum item detalhado registrado.</p>':`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Item</th><th>Marca</th><th class="num">Qtd</th><th class="num">Vl. Unit.</th><th class="num">Vl. Total</th></tr></thead>
    <tbody>${t.itens.map(e=>`<tr>
      <td>${e.nome}</td>
      <td><span class="badge amber">${e.marca||"—"}</span></td>
      <td class="num">${e.quantidade} ${e.unidade||"Un"}</td>
      <td class="num">${d(e.valorUnitario)}</td>
      <td class="num"><strong>${d(e.valorTotal)}</strong></td>
    </tr>`).join("")}</tbody>
  </table></div>`}window.toggleDetail=function(t){const e=document.getElementById("detail-"+t),a=document.getElementById("chev-"+t);e&&e.classList.toggle("open"),a&&a.classList.toggle("open")};window.confirmarExcluir=async function(t){if(confirm("Excluir esta compra? Esta ação não pode ser desfeita."))try{await Lt(t),V("🗑️ Compra excluída.")}catch(e){alert("Erro: "+e.message)}};function Nt(){const t=document.getElementById("lista-comparacao"),e={};A.forEach(n=>{(n.itens||[]).forEach(o=>{var s;const r=((s=o.nome)==null?void 0:s.toLowerCase().trim())||"produto";e[r]||(e[r]={nome:o.nome,marca:o.marca,hist:{}}),e[r].hist[n.mesAno]=o.valorUnitario})});const a=Object.values(e);if(!a.length){t.innerHTML='<div class="empty-state">Adicione notas com itens detalhados para ver a comparação de preços unitários.</div>';return}t.innerHTML=`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Produto</th><th>Marca</th><th>Histórico (Unitário)</th><th>Variação</th></tr></thead>
    <tbody>${a.map(n=>{const o=Object.keys(n.hist).sort();let r=o.map(i=>`${i}: <strong>${d(n.hist[i])}</strong>`).join(" → "),s='<span class="badge cyan">Estável</span>';if(o.length>=2){const i=n.hist[o[o.length-2]],l=n.hist[o[o.length-1]]-i,p=(l/i*100).toFixed(1);l>.01?s=`<span class="badge red">+${p}% ↑</span>`:l<-.01&&(s=`<span class="badge green">${p}% ↓</span>`)}return`<tr><td><strong>${n.nome}</strong></td><td><span class="badge amber">${n.marca||"—"}</span></td><td>${r}</td><td>${s}</td></tr>`}).join("")}</tbody>
  </table></div>`}function kt(){const t=document.getElementById("lista-recorrencia"),e=document.getElementById("lista-marcas"),a={},n={};A.forEach(s=>{(s.itens||[]).forEach(i=>{var m;const c=(m=i.nome)==null?void 0:m.toLowerCase().trim();if(!c)return;a[c]||(a[c]={nome:i.nome,marca:i.marca,qtd:0,notas:0,units:[]}),a[c].qtd+=i.quantidade||1,a[c].notas+=1,a[c].units.push(i.valorUnitario||0);const l=(i.nome||"").split(" ")[0].toUpperCase();n[l]||(n[l]={});const p=i.marca||"Genérica";n[l][p]||(n[l][p]=[]),n[l][p].push(i.valorUnitario||0)})});const o=Object.values(a).filter(s=>s.notas>1).sort((s,i)=>i.notas-s.notas);t.innerHTML=o.length?`<div class="table-responsive"><table class="custom-table">
        <thead><tr><th>Item</th><th>Marca</th><th>Compras</th><th class="num">Qtd Total</th><th class="num">Média Unitária</th></tr></thead>
        <tbody>${o.map(s=>{const i=s.units.reduce((c,l)=>c+l,0)/s.units.length;return`<tr>
            <td><strong>${s.nome}</strong></td>
            <td><span class="badge amber">${s.marca||"—"}</span></td>
            <td><span class="badge green">${s.notas}x</span></td>
            <td class="num">${s.qtd}</td>
            <td class="num">${d(i)}</td>
          </tr>`}).join("")}</tbody>
      </table></div>`:'<div class="empty-state">Adicione notas diferentes para calcular recorrência dos itens.</div>';const r=Object.entries(n).filter(([,s])=>Object.keys(s).length>1).map(([s,i])=>{let c=1/0,l="";const p=Object.entries(i).map(([m,b])=>{const E=b.reduce((g,$)=>g+$,0)/b.length;return E<c&&(c=E,l=m),{marca:m,med:E}});return`<div class="brand-card">
      <div class="brand-card-header">
        <span class="card-title">${s}</span>
        <span class="badge green">🏆 Menor preço: ${l} (${d(c)}/un)</span>
      </div>
      <div class="brands-row">
        ${p.map(m=>`<div class="brand-chip${m.marca===l?" best":""}">
          <div class="bc-name">${m.marca} ${m.marca===l?"✅":""}</div>
          <div class="bc-val">${d(m.med)}<span style="font-size:.7rem;font-weight:400">/un</span></div>
        </div>`).join("")}
      </div>
    </div>`}).join("");e.innerHTML=r||'<div class="empty-state">Ao comprar o mesmo tipo de produto com marcas diferentes (ex: Arroz Camil vs Tio João), o sistema mostrará qual teve menor preço unitário.</div>'}document.getElementById("btn-modal-close").addEventListener("click",()=>{document.getElementById("modal-cors").classList.remove("active")});
