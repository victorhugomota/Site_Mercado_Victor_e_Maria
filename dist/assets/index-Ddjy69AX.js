import{initializeApp as pt}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";import{getFirestore as gt,query as ft,collection as tt,orderBy as ht,onSnapshot as vt,addDoc as bt,serverTimestamp as yt,deleteDoc as Et,doc as It}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const c of s)if(c.type==="childList")for(const n of c.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function a(s){const c={};return s.integrity&&(c.integrity=s.integrity),s.referrerPolicy&&(c.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?c.credentials="include":s.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(s){if(s.ep)return;s.ep=!0;const c=a(s);fetch(s.href,c)}})();const et=document.createElement("script");et.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js";document.head.appendChild(et);const at=document.createElement("script");at.src="https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js";document.head.appendChild(at);const $t={apiKey:"AIzaSyANpFnEIkyN1XCT6qbtmVR9wx7sQHEsyrE",authDomain:"comprasmercado-23913.firebaseapp.com",projectId:"comprasmercado-23913",storageBucket:"comprasmercado-23913.firebasestorage.app",messagingSenderId:"317518149234",appId:"1:317518149234:web:94f38624d68a2b9a6634eb",measurementId:"G-2XP88EK37S"},Ct=pt($t),K=gt(Ct),Z="compras";let $=[],G=null,T=null,B=[],k=0,j=!1,q=[];function l(t){return Number(t||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}function I(t){if(typeof t=="number")return t;if(!t)return 0;const e=parseFloat(String(t).replace(/R\$\s?/gi,"").replace(/\s/g,"").replace(/\./g,"").replace(",","."));return isNaN(e)?0:e}function ot(t){if(!t)return"—";try{return new Date(t).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}catch{return t}}function Y(t,e=3500){const a=document.getElementById("toast");a.textContent=t,a.classList.add("show"),setTimeout(()=>a.classList.remove("show"),e)}function E(t,e="var(--accent-amber)"){const a=document.getElementById("status-msg");a&&(a.textContent=t,a.style.color=e)}function At(t){if(!t)return new Date().toISOString().slice(0,16);try{const e=new Date(t);if(isNaN(e.getTime()))return new Date().toISOString().slice(0,16);const a=o=>String(o).padStart(2,"0");return`${e.getFullYear()}-${a(e.getMonth()+1)}-${a(e.getDate())}T${a(e.getHours())}:${a(e.getMinutes())}`}catch{return new Date().toISOString().slice(0,16)}}function Bt(t,e){let a=0;const o=new Date(t,e+1,0).getDate();for(let s=1;s<=o;s++){const c=new Date(t,e,s).getDay();c!==0&&c!==6&&a++}return a}function nt(t){document.querySelectorAll(".tab-content").forEach(a=>a.classList.remove("active")),document.querySelectorAll("[data-tab]").forEach(a=>a.classList.remove("active"));const e=document.getElementById("tab-"+t);e&&e.classList.add("active"),document.querySelectorAll(`[data-tab="${t}"]`).forEach(a=>a.classList.add("active"))}document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>nt(t.getAttribute("data-tab")))});function xt(){document.getElementById("modal-add-nota").classList.add("active")}function st(){j&&J(),document.getElementById("modal-add-nota").classList.remove("active")}var X;(X=document.getElementById("btn-open-modal-home"))==null||X.addEventListener("click",xt);var _;(_=document.getElementById("btn-close-modal-add"))==null||_.addEventListener("click",st);const wt=ft(tt(K,Z),ht("dataEmissao","desc"));vt(wt,t=>{$=t.docs.map(e=>({id:e.id,...e.data()})),qt(),Lt(),Nt(),Ft(),Rt()},t=>console.error("Firestore:",t));async function Mt(t){return bt(tt(K,Z),{...t,createdAt:yt()})}async function Tt(t){return Et(It(K,Z,t))}function qt(){let t=0,e=0,a=0,o=0,s=0,c=0;const n={};$.forEach(u=>{const p=u.valorAPagar||0,b=u.descontoTotal||0;t+=p,e+=b,c+=u.qtdTotalItens||0,u.formasPagamento&&(a+=u.formasPagamento.valeAlimentacao||0,o+=u.formasPagamento.cartaoCredito||0,s+=u.formasPagamento.cartaoDebito||0);const h=u.mesAno||"Outros";n[h]=(n[h]||0)+p});const d=Math.max(1,Object.keys(n).length),i=t/d;document.getElementById("dash-total").textContent=l(t),document.getElementById("dash-media-mensal").textContent=l(i),document.getElementById("dash-media-subtext").textContent=`Média calculada em ${d} mês(es)`,document.getElementById("dash-desconto").textContent=l(e);const m=t+e>0?(e/(t+e)*100).toFixed(1):0;document.getElementById("dash-pct").textContent=`${m}% economizado no geral`,document.getElementById("dash-qtd-notas").textContent=$.length,document.getElementById("dash-qtd-itens").textContent=`${c} itens no total`,document.getElementById("dash-alimentacao").textContent=l(a),document.getElementById("dash-credito").textContent=l(o),document.getElementById("dash-debito").textContent=l(s),rt(n)}function rt(t){var c;if(typeof Chart>"u")return setTimeout(()=>rt(t),300);const e=(c=document.getElementById("chart-barras"))==null?void 0:c.getContext("2d");if(!e)return;const a=Object.keys(t).sort(),o=a.map(n=>{const[d,i]=n.split("-");return`${i}/${d}`}),s=a.map(n=>t[n]);G&&G.destroy(),G=new Chart(e,{type:"bar",data:{labels:o.length?o:["Sem compras"],datasets:[{label:"Gasto R$",data:s.length?s:[0],backgroundColor:"rgba(16,185,129,0.78)",borderColor:"#10b981",borderWidth:2,borderRadius:8}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:n=>` ${l(n.raw)}`}}},scales:{y:{beginAtZero:!0,grid:{color:"rgba(255,255,255,.05)"},ticks:{color:"#94a3b8",callback:n=>"R$"+n}},x:{grid:{display:!1},ticks:{color:"#94a3b8"}}}}})}function Lt(){const t=document.getElementById("lista-mensal-container");if(!t)return;const e=new Date,a=new Date(e.getFullYear(),e.getMonth()+1,1),o=a.toLocaleString("pt-BR",{month:"long"}),s=a.getFullYear(),c=`${o.charAt(0).toUpperCase()+o.slice(1)} de ${s}`,n=Bt(a.getFullYear(),a.getMonth()),d=31.8,i=20,m=n*d,u=n*i,p={};let b=0;$.forEach(r=>{const g=r.valorAPagar||0;b+=g;const f=r.mesAno||"Outros";p[f]=(p[f]||0)+g});const h=Math.max(1,Object.keys(p).length),v=b/h,y={};$.forEach(r=>{(r.itens||[]).forEach(g=>{const f=(g.nome||"").toLowerCase().trim();f&&(y[f]||(y[f]={nome:g.nome,marca:g.marca||"Geral",qtdTotal:0,frequenciaNotas:0,valoresUnitarios:[]}),y[f].qtdTotal+=g.quantidade||1,y[f].frequenciaNotas+=1,g.valorUnitario&&y[f].valoresUnitarios.push(g.valorUnitario))})});const x=Object.values(y).map(r=>{const g=r.valoresUnitarios.length>0?r.valoresUnitarios.reduce((R,Q)=>R+Q,0)/r.valoresUnitarios.length:0,f=r.qtdTotal/h,S=h/Math.max(1,r.frequenciaNotas),V=r.frequenciaNotas/h;let A=0;V>=.35||f>=.7?A=Math.ceil(f):A=Math.round(f),A<1&&r.frequenciaNotas>=h&&(A=1);const F=A*g;return{nome:r.nome,marca:r.marca,frequenciaNotas:r.frequenciaNotas,intervaloMeses:S,qtdMensalTaxa:f,totalEstimadoUnidades:A,valorUnitario:g,subtotalCalculado:F}}).filter(r=>r.totalEstimadoUnidades>0);x.sort((r,g)=>g.frequenciaNotas-r.frequenciaNotas);const C=x.reduce((r,g)=>r+g.subtotalCalculado,0),D=v>0?v*1.05:C;let P=1;C>D&&v>0&&(P=D/C);const H=x.map(r=>({...r,subtotalFinal:r.subtotalCalculado*P})),O=v>0?Math.min(C,D):C;let w=O;const N=Math.min(w,m);w-=N;const U=Math.min(w,u);w-=U;const L=w>0?w:0;let M=`
    <div class="card" style="margin-bottom:1.5rem; background: linear-gradient(135deg, rgba(30,41,59,0.9), rgba(15,23,42,0.95)); border: 1px solid #3b82f6;">
      <div class="card-header">
        <div>
          <span class="card-title" style="color:#60a5fa;">📅 Previsão de Compras — ${c}</span>
          <p class="card-subtext" style="color:#cbd5e1; margin-top:0.25rem;">
            Calculado com unidades inteiras exatas (${n} dias úteis em ${o}).
          </p>
        </div>
        <span class="badge green" style="font-size:0.8rem; padding:0.4rem 0.75rem;">${n} Dias Úteis</span>
      </div>

      <div class="payment-grid" style="margin-top:1rem;">
        <div class="payment-item" style="border-color: rgba(16,185,129,0.4);">
          <div class="p-label">🍽️ Vale Alimentação (${n}d × R$ 31,80)</div>
          <div class="p-val" style="color:#34d399;">${l(N)} <span style="font-size:0.75rem;font-weight:normal;color:var(--text-muted)">/ ${l(m)}</span></div>
        </div>
        <div class="payment-item" style="border-color: rgba(99,102,241,0.4);">
          <div class="p-label">💳 Cartão Crédito (${n}d × R$ 20,00)</div>
          <div class="p-val" style="color:#818cf8;">${l(U)} <span style="font-size:0.75rem;font-weight:normal;color:var(--text-muted)">/ ${l(u)}</span></div>
        </div>
        <div class="payment-item" style="border-color: ${L>0?"rgba(244,63,94,0.5)":"var(--border-color)"};">
          <div class="p-label">💳 Débito Necessário (Excedente)</div>
          <div class="p-val" style="color: ${L>0?"#fb7185":"var(--text-muted)"};">${l(L)}</div>
        </div>
      </div>

      <div style="margin-top:1.25rem; padding-top:1rem; border-top:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
        <div>
          <span style="font-size:0.85rem; color:var(--text-muted);">Total Estimado da Lista de Compras:</span>
          <p style="font-size:0.75rem; color:#60a5fa;">Média Histórica de Gastos: ${l(v)}</p>
        </div>
        <span style="font-size:1.6rem; font-weight:800; color:var(--primary);">${l(O)}</span>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-title">Lista de Itens com Frequência e Total Estimado</span>
        <span class="badge amber">${H.length} itens cadastrados</span>
      </div>
      <p class="card-subtext" style="margin-bottom:1rem;">
        O <strong>Total Estimado</strong> arredonda o consumo médio para cima (unidades inteiras exatas), pois os produtos são comprados por unidade no mercado.
      </p>
  `;H.length===0?M+='<div class="empty-state">Adicione notas fiscais para que o sistema gere automaticamente sua lista mensal de compras.</div></div>':M+=`
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
            ${H.map(r=>{const g=r.intervaloMeses>1.2?`A cada ${r.intervaloMeses.toFixed(1)} meses`:`Todo mês (${r.frequenciaNotas}x)`,f=r.qtdMensalTaxa<1?r.qtdMensalTaxa.toFixed(2):r.qtdMensalTaxa.toFixed(1),S=r.totalEstimadoUnidades.toFixed(1);return`
                <tr>
                  <td><strong>${r.nome}</strong></td>
                  <td><span class="badge amber">${r.marca}</span></td>
                  <td><span class="badge cyan">${g}</span></td>
                  <td class="num">${f} un/mês</td>
                  <td class="num"><span class="badge green" style="font-size:0.82rem;">${S}</span></td>
                  <td class="num">${l(r.valorUnitario)}</td>
                  <td class="num"><strong>${l(r.subtotalFinal)}</strong></td>
                </tr>
              `}).join("")}
          </tbody>
        </table>
      </div>
    </div>`,t.innerHTML=M}document.getElementById("btn-start-cam").addEventListener("click",ct);document.getElementById("btn-switch-cam").addEventListener("click",St);document.getElementById("btn-stop-cam").addEventListener("click",J);async function ct(){if(typeof Html5Qrcode>"u")return E("Carregando biblioteca de câmera, aguarde..."),setTimeout(ct,600);try{T||(T=new Html5Qrcode("qr-reader")),B=await Html5Qrcode.getCameras();let t;if(B&&B.length>0){const e=B.findIndex(a=>/back|traseira|rear|environment/i.test(a.label));k=e>=0?e:0,t=B[k].id}else t={facingMode:"environment"};await T.start(t,{fps:10,qrbox:{width:240,height:240}},dt,()=>{}),j=!0,document.getElementById("btn-start-cam").style.display="none",document.getElementById("btn-switch-cam").style.display=B.length>1?"inline-flex":"none",document.getElementById("btn-stop-cam").style.display="inline-flex"}catch(t){E("❌ Não foi possível acessar a câmera. Verifique as permissões do navegador."),console.error(t)}}async function St(){if(!(!T||!j))try{await T.stop(),B.length>1&&(k=(k+1)%B.length,await T.start(B[k].id,{fps:10,qrbox:{width:240,height:240}},dt,()=>{}))}catch(t){console.error("switchCam:",t)}}async function J(){if(T&&j)try{await T.stop()}catch{}j=!1,document.getElementById("btn-start-cam").style.display="inline-flex",document.getElementById("btn-switch-cam").style.display="none",document.getElementById("btn-stop-cam").style.display="none"}async function dt(t){J(),document.getElementById("inp-url").value=t,E("✅ QR Code lido! Processando..."),await lt(t)}document.getElementById("btn-carregar-dados").addEventListener("click",async()=>{const t=document.getElementById("inp-url").value.trim(),e=document.getElementById("inp-html").value.trim();if(!t&&!e){E("⚠️ Cole a URL do QR Code ou o conteúdo da página para ler a nota fiscal.");return}if(t&&!e){E("⏳ Consultando nota fiscal..."),await lt(t);return}if(e){E("⏳ Processando conteúdo..."),await mt(e);return}});document.getElementById("btn-preencher-manual").addEventListener("click",()=>{it({nomeMercado:"",dataEmissao:new Date().toISOString(),valorTotal:0,descontoTotal:0,valorAPagar:0,qtdTotalItens:0,formasPagamento:{valeAlimentacao:0,cartaoCredito:0,cartaoDebito:0},itens:[]}),E("✍️ Preencha os dados da compra abaixo e clique em Salvar Nota Fiscal.","var(--accent-cyan)")});function it(t){var c,n,d;document.getElementById("inp-mercado").value=t.nomeMercado||"",document.getElementById("inp-data").value=At(t.dataEmissao),document.getElementById("inp-vtotal").value=t.valorTotal!==void 0?t.valorTotal:0,document.getElementById("inp-desconto").value=t.descontoTotal!==void 0?t.descontoTotal:0,document.getElementById("inp-pagar").value=t.valorAPagar!==void 0?t.valorAPagar:0,document.getElementById("inp-qtd").value=t.qtdTotalItens!==void 0?t.qtdTotalItens:0,document.getElementById("inp-alim").value=((c=t.formasPagamento)==null?void 0:c.valeAlimentacao)||0,document.getElementById("inp-cred").value=((n=t.formasPagamento)==null?void 0:n.cartaoCredito)||0,document.getElementById("inp-deb").value=((d=t.formasPagamento)==null?void 0:d.cartaoDebito)||0,q=t.itens||[];const e=document.getElementById("form-nfce");e.style.display="block";const a=document.getElementById("preview-itens-box"),o=document.getElementById("count-preview-itens"),s=document.getElementById("lista-preview-itens");q.length>0?(a.style.display="block",o.textContent=q.length,s.innerHTML=q.map(i=>`
      <div style="display:flex; justify-content:space-between; padding: 0.35rem 0; border-bottom: 1px dashed var(--border-color);">
        <span><strong>${i.nome}</strong> (${i.quantidade} ${i.unidade||"Un"})</span>
        <span>${l(i.valorUnitario)}/un = <strong>${l(i.valorTotal)}</strong></span>
      </div>
    `).join("")):a.style.display="none",e.scrollIntoView({behavior:"smooth"})}document.getElementById("form-nfce").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-mercado").value.trim()||"Mercado",a=document.getElementById("inp-data").value||new Date().toISOString(),o=parseFloat(document.getElementById("inp-vtotal").value)||0,s=parseFloat(document.getElementById("inp-desconto").value)||0,c=parseFloat(document.getElementById("inp-pagar").value)||0,n=parseInt(document.getElementById("inp-qtd").value)||0,d=parseFloat(document.getElementById("inp-alim").value)||0,i=parseFloat(document.getElementById("inp-cred").value)||0,m=parseFloat(document.getElementById("inp-deb").value)||0,u=new Date(a).toISOString().slice(0,16),p=$.find(v=>{const y=new Date(v.dataEmissao).toISOString().slice(0,16),x=Math.abs((v.valorAPagar||0)-c)<.05,C=(v.nomeMercado||"").toLowerCase().trim()===e.toLowerCase().trim();return y===u&&x&&C});if(p){E(`⚠️ Esta nota fiscal já existe no sistema (Cadastrada em ${ot(p.dataEmissao)} no valor de ${l(p.valorAPagar)}). Nota não adicionada!`,"#fb7185"),Y("⚠️ Nota fiscal já cadastrada! Operação cancelada.");return}const b=new Date(a),h=`${b.getFullYear()}-${String(b.getMonth()+1).padStart(2,"0")}`;E("⏳ Salvando nota fiscal no banco...");try{await Mt({nomeMercado:e,dataEmissao:a,mesAno:h,qtdTotalItens:n||q.length,valorTotal:o,descontoTotal:s,valorAPagar:c,formasPagamento:{valeAlimentacao:d,cartaoCredito:i,cartaoDebito:m},itens:q}),E("✅ Nota salva com sucesso!","#34d399"),document.getElementById("form-nfce").style.display="none",document.getElementById("form-nfce").reset(),document.getElementById("inp-url").value="",document.getElementById("inp-html").value="",q=[],st(),nt("dashboard"),Y("🎉 Nota fiscal registrada no Firebase!")}catch(v){E("❌ Erro ao salvar: "+v.message,"#fb7185")}});async function lt(t){const e=[a=>`https://api.allorigins.win/raw?url=${encodeURIComponent(a)}`,a=>`https://corsproxy.io/?${encodeURIComponent(a)}`];for(const a of e)try{const o=await fetch(a(t),{signal:AbortSignal.timeout(8e3)});if(o.ok){const s=await o.text();if(s&&s.length>200){await mt(s);return}}}catch{}Dt(t)}function Dt(t){document.getElementById("modal-link").href=t,document.getElementById("modal-cors").classList.add("active"),E("⚠️ Abra o link, copie o conteúdo da página e cole no campo de texto abaixo.")}async function mt(t){const e=Pt(t);it(e),E("✅ Nota lida com sucesso! Confira os valores abaixo e altere se necessário antes de Salvar.","#34d399")}function Pt(t){var N,U,L;const a=new DOMParser().parseFromString(t,"text/html"),o=((N=a.body)==null?void 0:N.textContent)||t;let s=((L=(U=a.querySelector(".txtTopo, .nomeEmit, h1"))==null?void 0:U.textContent)==null?void 0:L.trim())||"Mercado",c=new Date().toISOString();const n=o.match(/Emiss[ãa]o\s*[:\-]?\s*(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})?/i)||o.match(/(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})/);if(n){const[M,r,g]=n[1].split("/");c=`${g}-${r}-${M}T${n[2]||"12:00:00"}`}const d=o.match(/Qtd\.?\s*total\s*de\s*itens\s*[:\s]*([\d,\.]+)/i),i=o.match(/Valor\s*total\s*R\$\s*[:\s]*([\d\.,]+)/i),m=o.match(/Descontos?\s*R\$\s*[:\s]*([\d\.,]+)/i),u=o.match(/Valor\s*a\s*pagar\s*R\$\s*[:\s]*([\d\.,]+)/i)||o.match(/VALOR\s*PAGO\s*R\$\s*[:\s]*([\d\.,]+)/i),p=o.match(/(?:Vale\s*)?Alimenta[çc][ãa]o\s*[:\s]*([\d\.,]+)/i),b=o.match(/(?:Cart[ãa]o\s*de\s*)?Cr[eé]dito\s*[:\s]*([\d\.,]+)/i),h=o.match(/(?:Cart[ãa]o\s*de\s*)?D[eé]bito\s*[:\s]*([\d\.,]+)/i),v=d?I(d[1]):0,y=i?I(i[1]):0,x=m?I(m[1]):0;let C=u?I(u[1]):y-x;const D={valeAlimentacao:p?I(p[1]):0,cartaoCredito:b?I(b[1]):0,cartaoDebito:h?I(h[1]):0},P=[];a.querySelectorAll("tr, .item, .itemNota").forEach(M=>{var W;const r=M.textContent;if(!/Vl\.\s*Unit|valorUnitario|Qtde?\./i.test(r))return;const g=M.querySelector(".txtTit, .txtTit2, .nomeProd"),f=((W=g==null?void 0:g.textContent)==null?void 0:W.trim())||"",S=r.match(/Qtde?\.\s*[:\s]*([\d,\.]+)/i),V=r.match(/Vl\.\s*Unit\.\s*[:\s]*([\d,\.]+)/i),A=r.match(/Vl\.\s*Total\s*([\d,\.]+)/i),F=r.match(/C[oó]digo\s*[:\s]*(\d+)/i),R=r.match(/UN\s*[:\s]*([A-Za-z]+)/i),Q=S?I(S[1]):1,z=V?I(V[1]):0,ut=A?I(A[1]):z*Q;f&&z>0&&P.push({codigo:(F==null?void 0:F[1])||"",nome:f,marca:Ot(f),quantidade:Q,unidade:(R==null?void 0:R[1])||"Un",valorUnitario:z,valorTotal:ut})});const O=new Date(c),w=`${O.getFullYear()}-${String(O.getMonth()+1).padStart(2,"0")}`;return{nomeMercado:s,dataEmissao:c,mesAno:w,qtdTotalItens:v,valorTotal:y,descontoTotal:x,valorAPagar:C,formasPagamento:D,itens:P}}function Ot(t){const e=["BAUDUCCO","BAUD","PANCO","DANONE","NESTLE","QUALITA","SADIA","PERDIGAO","SEARA","CAMIL","TIO JOAO","URBANO","LIZA","SOYA","YPE","PILAO","MELITTA","3 CORACOES","VIGOR","PARMALAT","ITALAC","HEINZ","KRAFT"],a=t.toUpperCase();for(const o of e)if(a.includes(o))return o;return a.split(" ")[0]||"Genérica"}function Nt(){const t=document.getElementById("lista-historico");if(!$.length){t.innerHTML='<div class="empty-state">📭 Nenhuma compra cadastrada ainda.</div>';return}t.innerHTML=$.map(e=>{var a,o,s;return`
    <div class="purchase-card">
      <div class="purchase-header" onclick="toggleDetail('${e.id}')">
        <div class="purchase-info">
          <h3>${e.nomeMercado||"Mercado"}</h3>
          <p>📅 ${ot(e.dataEmissao)} &nbsp;•&nbsp; 🛒 ${e.qtdTotalItens||0} itens</p>
        </div>
        <div class="purchase-values">
          <div class="pv-total">${l(e.valorAPagar)}</div>
          <div class="pv-sub">Desc: ${l(e.descontoTotal)}</div>
        </div>
        <svg class="chevron" id="chev-${e.id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      <div class="purchase-details" id="detail-${e.id}">
        <div class="details-toolbar">
          <span class="card-subtext">Pagamentos: Alimentação ${l((a=e.formasPagamento)==null?void 0:a.valeAlimentacao)} · Crédito ${l((o=e.formasPagamento)==null?void 0:o.cartaoCredito)} · Débito ${l((s=e.formasPagamento)==null?void 0:s.cartaoDebito)}</span>
          <button class="btn-danger" onclick="confirmarExcluir('${e.id}')">🗑️ Excluir</button>
        </div>
        ${Ut(e)}
      </div>
    </div>`}).join("")}function Ut(t){return!t.itens||!t.itens.length?'<p class="card-subtext">Nenhum item detalhado registrado.</p>':`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Item</th><th>Marca</th><th class="num">Qtd</th><th class="num">Vl. Unit.</th><th class="num">Vl. Total</th></tr></thead>
    <tbody>${t.itens.map(e=>`<tr>
      <td>${e.nome}</td>
      <td><span class="badge amber">${e.marca||"—"}</span></td>
      <td class="num">${e.quantidade} ${e.unidade||"Un"}</td>
      <td class="num">${l(e.valorUnitario)}</td>
      <td class="num"><strong>${l(e.valorTotal)}</strong></td>
    </tr>`).join("")}</tbody>
  </table></div>`}window.toggleDetail=function(t){const e=document.getElementById("detail-"+t),a=document.getElementById("chev-"+t);e&&e.classList.toggle("open"),a&&a.classList.toggle("open")};window.confirmarExcluir=async function(t){if(confirm("Excluir esta compra? Esta ação não pode ser desfeita."))try{await Tt(t),Y("🗑️ Compra excluída.")}catch(e){alert("Erro: "+e.message)}};function Ft(){const t=document.getElementById("lista-comparacao"),e={};$.forEach(o=>{(o.itens||[]).forEach(s=>{var n;const c=((n=s.nome)==null?void 0:n.toLowerCase().trim())||"produto";e[c]||(e[c]={nome:s.nome,marca:s.marca,hist:{}}),e[c].hist[o.mesAno]=s.valorUnitario})});const a=Object.values(e);if(!a.length){t.innerHTML='<div class="empty-state">Adicione notas com itens detalhados para ver a comparação de preços unitários.</div>';return}t.innerHTML=`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Produto</th><th>Marca</th><th>Histórico (Unitário)</th><th>Variação</th></tr></thead>
    <tbody>${a.map(o=>{const s=Object.keys(o.hist).sort();let c=s.map(d=>`${d}: <strong>${l(o.hist[d])}</strong>`).join(" → "),n='<span class="badge cyan">Estável</span>';if(s.length>=2){const d=o.hist[s[s.length-2]],m=o.hist[s[s.length-1]]-d,u=(m/d*100).toFixed(1);m>.01?n=`<span class="badge red">+${u}% ↑</span>`:m<-.01&&(n=`<span class="badge green">${u}% ↓</span>`)}return`<tr><td><strong>${o.nome}</strong></td><td><span class="badge amber">${o.marca||"—"}</span></td><td>${c}</td><td>${n}</td></tr>`}).join("")}</tbody>
  </table></div>`}function Rt(){const t=document.getElementById("lista-recorrencia"),e=document.getElementById("lista-marcas"),a={},o={};$.forEach(n=>{(n.itens||[]).forEach(d=>{var p;const i=(p=d.nome)==null?void 0:p.toLowerCase().trim();if(!i)return;a[i]||(a[i]={nome:d.nome,marca:d.marca,qtd:0,notas:0,units:[]}),a[i].qtd+=d.quantidade||1,a[i].notas+=1,a[i].units.push(d.valorUnitario||0);const m=(d.nome||"").split(" ")[0].toUpperCase();o[m]||(o[m]={});const u=d.marca||"Genérica";o[m][u]||(o[m][u]=[]),o[m][u].push(d.valorUnitario||0)})});const s=Object.values(a).filter(n=>n.notas>1).sort((n,d)=>d.notas-n.notas);t.innerHTML=s.length?`<div class="table-responsive"><table class="custom-table">
        <thead><tr><th>Item</th><th>Marca</th><th>Compras</th><th class="num">Qtd Total</th><th class="num">Média Unitária</th></tr></thead>
        <tbody>${s.map(n=>{const d=n.units.reduce((i,m)=>i+m,0)/n.units.length;return`<tr>
            <td><strong>${n.nome}</strong></td>
            <td><span class="badge amber">${n.marca||"—"}</span></td>
            <td><span class="badge green">${n.notas}x</span></td>
            <td class="num">${n.qtd}</td>
            <td class="num">${l(d)}</td>
          </tr>`}).join("")}</tbody>
      </table></div>`:'<div class="empty-state">Adicione notas diferentes para calcular recorrência dos itens.</div>';const c=Object.entries(o).filter(([,n])=>Object.keys(n).length>1).map(([n,d])=>{let i=1/0,m="";const u=Object.entries(d).map(([p,b])=>{const h=b.reduce((v,y)=>v+y,0)/b.length;return h<i&&(i=h,m=p),{marca:p,med:h}});return`<div class="brand-card">
      <div class="brand-card-header">
        <span class="card-title">${n}</span>
        <span class="badge green">🏆 Menor preço: ${m} (${l(i)}/un)</span>
      </div>
      <div class="brands-row">
        ${u.map(p=>`<div class="brand-chip${p.marca===m?" best":""}">
          <div class="bc-name">${p.marca} ${p.marca===m?"✅":""}</div>
          <div class="bc-val">${l(p.med)}<span style="font-size:.7rem;font-weight:400">/un</span></div>
        </div>`).join("")}
      </div>
    </div>`}).join("");e.innerHTML=c||'<div class="empty-state">Ao comprar o mesmo tipo de produto com marcas diferentes (ex: Arroz Camil vs Tio João), o sistema mostrará qual teve menor preço unitário.</div>'}document.getElementById("btn-modal-close").addEventListener("click",()=>{document.getElementById("modal-cors").classList.remove("active")});
