import{initializeApp as pt}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";import{getFirestore as gt,query as ft,collection as tt,orderBy as vt,onSnapshot as ht,addDoc as bt,serverTimestamp as yt,deleteDoc as Et,doc as It}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function a(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(s){if(s.ep)return;s.ep=!0;const r=a(s);fetch(s.href,r)}})();const et=document.createElement("script");et.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js";document.head.appendChild(et);const at=document.createElement("script");at.src="https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js";document.head.appendChild(at);const $t={apiKey:"AIzaSyANpFnEIkyN1XCT6qbtmVR9wx7sQHEsyrE",authDomain:"comprasmercado-23913.firebaseapp.com",projectId:"comprasmercado-23913",storageBucket:"comprasmercado-23913.firebasestorage.app",messagingSenderId:"317518149234",appId:"1:317518149234:web:94f38624d68a2b9a6634eb",measurementId:"G-2XP88EK37S"},Bt=pt($t),Y=gt(Bt),K="compras";let $=[],z=null,w=null,A=[],P=0,O=!1,M=[];function i(t){return Number(t||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}function I(t){if(typeof t=="number")return t;if(!t)return 0;const e=parseFloat(String(t).replace(/R\$\s?/gi,"").replace(/\s/g,"").replace(/\./g,"").replace(",","."));return isNaN(e)?0:e}function ot(t){if(!t)return"—";try{return new Date(t).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}catch{return t}}function G(t,e=3500){const a=document.getElementById("toast");a.textContent=t,a.classList.add("show"),setTimeout(()=>a.classList.remove("show"),e)}function E(t,e="var(--accent-amber)"){const a=document.getElementById("status-msg");a&&(a.textContent=t,a.style.color=e)}function Ct(t){if(!t)return new Date().toISOString().slice(0,16);try{const e=new Date(t);if(isNaN(e.getTime()))return new Date().toISOString().slice(0,16);const a=o=>String(o).padStart(2,"0");return`${e.getFullYear()}-${a(e.getMonth()+1)}-${a(e.getDate())}T${a(e.getHours())}:${a(e.getMinutes())}`}catch{return new Date().toISOString().slice(0,16)}}function At(t,e){let a=0;const o=new Date(t,e+1,0).getDate();for(let s=1;s<=o;s++){const r=new Date(t,e,s).getDay();r!==0&&r!==6&&a++}return a}function nt(t){document.querySelectorAll(".tab-content").forEach(a=>a.classList.remove("active")),document.querySelectorAll("[data-tab]").forEach(a=>a.classList.remove("active"));const e=document.getElementById("tab-"+t);e&&e.classList.add("active"),document.querySelectorAll(`[data-tab="${t}"]`).forEach(a=>a.classList.add("active"))}document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>nt(t.getAttribute("data-tab")))});function xt(){document.getElementById("modal-add-nota").classList.add("active")}function st(){O&&Z(),document.getElementById("modal-add-nota").classList.remove("active")}var X;(X=document.getElementById("btn-open-modal-home"))==null||X.addEventListener("click",xt);var _;(_=document.getElementById("btn-close-modal-add"))==null||_.addEventListener("click",st);const wt=ft(tt(Y,K),vt("dataEmissao","desc"));ht(wt,t=>{$=t.docs.map(e=>({id:e.id,...e.data()})),qt(),Lt(),Nt(),Rt(),Ft()},t=>console.error("Firestore:",t));async function Mt(t){return bt(tt(Y,K),{...t,createdAt:yt()})}async function Tt(t){return Et(It(Y,K,t))}function qt(){let t=0,e=0,a=0,o=0,s=0,r=0;const n={};$.forEach(p=>{const g=p.valorAPagar||0,b=p.descontoTotal||0;t+=g,e+=b,r+=p.qtdTotalItens||0,p.formasPagamento&&(a+=p.formasPagamento.valeAlimentacao||0,o+=p.formasPagamento.cartaoCredito||0,s+=p.formasPagamento.cartaoDebito||0);const h=p.mesAno||"Outros";n[h]=(n[h]||0)+g});const d=Math.max(1,Object.keys(n).length),l=t/d;document.getElementById("dash-total").textContent=i(t),document.getElementById("dash-media-mensal").textContent=i(l),document.getElementById("dash-media-subtext").textContent=`Média calculada em ${d} mês(es)`,document.getElementById("dash-desconto").textContent=i(e);const u=t+e>0?(e/(t+e)*100).toFixed(1):0;document.getElementById("dash-pct").textContent=`${u}% economizado no geral`,document.getElementById("dash-qtd-notas").textContent=$.length,document.getElementById("dash-qtd-itens").textContent=`${r} itens no total`,document.getElementById("dash-alimentacao").textContent=i(a),document.getElementById("dash-credito").textContent=i(o),document.getElementById("dash-debito").textContent=i(s),rt(n)}function rt(t){var r;if(typeof Chart>"u")return setTimeout(()=>rt(t),300);const e=(r=document.getElementById("chart-barras"))==null?void 0:r.getContext("2d");if(!e)return;const a=Object.keys(t).sort(),o=a.map(n=>{const[d,l]=n.split("-");return`${l}/${d}`}),s=a.map(n=>t[n]);z&&z.destroy(),z=new Chart(e,{type:"bar",data:{labels:o.length?o:["Sem compras"],datasets:[{label:"Gasto R$",data:s.length?s:[0],backgroundColor:"rgba(16,185,129,0.78)",borderColor:"#10b981",borderWidth:2,borderRadius:8}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:n=>` ${i(n.raw)}`}}},scales:{y:{beginAtZero:!0,grid:{color:"rgba(255,255,255,.05)"},ticks:{color:"#94a3b8",callback:n=>"R$"+n}},x:{grid:{display:!1},ticks:{color:"#94a3b8"}}}}})}function Lt(){const t=document.getElementById("lista-mensal-container");if(!t)return;const e=new Date,a=new Date(e.getFullYear(),e.getMonth()+1,1),o=a.toLocaleString("pt-BR",{month:"long"}),s=a.getFullYear(),r=`${o.charAt(0).toUpperCase()+o.slice(1)} de ${s}`,n=At(a.getFullYear(),a.getMonth()),d=31.8,l=20,u=n*d,p=n*l,g={};let b=0;$.forEach(c=>{const m=c.valorAPagar||0;b+=m;const f=c.mesAno||"Outros";g[f]=(g[f]||0)+m});const h=Math.max(1,Object.keys(g).length),v=b/h,y={};$.forEach(c=>{(c.itens||[]).forEach(m=>{const f=(m.nome||"").toLowerCase().trim();f&&(y[f]||(y[f]={nome:m.nome,marca:m.marca||"Geral",qtdTotal:0,frequenciaNotas:0,valoresUnitarios:[]}),y[f].qtdTotal+=m.quantidade||1,y[f].frequenciaNotas+=1,m.valorUnitario&&y[f].valoresUnitarios.push(m.valorUnitario))})});const x=Object.values(y).map(c=>{const m=c.valoresUnitarios.length>0?c.valoresUnitarios.reduce((F,j)=>F+j,0)/c.valoresUnitarios.length:0,f=c.qtdTotal/h,D=h/Math.max(1,c.frequenciaNotas),R=f*m;return{nome:c.nome,marca:c.marca,frequenciaNotas:c.frequenciaNotas,intervaloMeses:D,qtdMensalTaxa:f,valorUnitario:m,subtotalBruto:R}});x.sort((c,m)=>m.frequenciaNotas-c.frequenciaNotas);const B=x.reduce((c,m)=>c+m.subtotalBruto,0);let N=1;B>0&&v>0&&B>v&&(N=v/B);const T=x.map(c=>({...c,subtotalFinal:c.subtotalBruto*N})),k=v>0?Math.min(B,v):B;let C=k;const U=Math.min(C,u);C-=U;const S=Math.min(C,p);C-=S;const q=C>0?C:0;let L=`
    <div class="card" style="margin-bottom:1.5rem; background: linear-gradient(135deg, rgba(30,41,59,0.9), rgba(15,23,42,0.95)); border: 1px solid #3b82f6;">
      <div class="card-header">
        <div>
          <span class="card-title" style="color:#60a5fa;">📅 Previsão de Compras — ${r}</span>
          <p class="card-subtext" style="color:#cbd5e1; margin-top:0.25rem;">
            Balizada na sua <strong>média histórica de ${i(v)}/mês</strong> (${n} dias úteis em ${o}).
          </p>
        </div>
        <span class="badge green" style="font-size:0.8rem; padding:0.4rem 0.75rem;">${n} Dias Úteis</span>
      </div>

      <div class="payment-grid" style="margin-top:1rem;">
        <div class="payment-item" style="border-color: rgba(16,185,129,0.4);">
          <div class="p-label">🍽️ Vale Alimentação (${n}d × R$ 31,80)</div>
          <div class="p-val" style="color:#34d399;">${i(U)} <span style="font-size:0.75rem;font-weight:normal;color:var(--text-muted)">/ ${i(u)}</span></div>
        </div>
        <div class="payment-item" style="border-color: rgba(99,102,241,0.4);">
          <div class="p-label">💳 Cartão Crédito (${n}d × R$ 20,00)</div>
          <div class="p-val" style="color:#818cf8;">${i(S)} <span style="font-size:0.75rem;font-weight:normal;color:var(--text-muted)">/ ${i(p)}</span></div>
        </div>
        <div class="payment-item" style="border-color: ${q>0?"rgba(244,63,94,0.5)":"var(--border-color)"};">
          <div class="p-label">💳 Débito Necessário (Excedente)</div>
          <div class="p-val" style="color: ${q>0?"#fb7185":"var(--text-muted)"};">${i(q)}</div>
        </div>
      </div>

      <div style="margin-top:1.25rem; padding-top:1rem; border-top:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
        <div>
          <span style="font-size:0.85rem; color:var(--text-muted);">Estimativa Ajustada para o Mês:</span>
          <p style="font-size:0.75rem; color:#60a5fa;">Média Histórica: ${i(v)}</p>
        </div>
        <span style="font-size:1.6rem; font-weight:800; color:var(--primary);">${i(k)}</span>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-title">Lista de Itens com Frequência e Consumo Mensal</span>
        <span class="badge amber">${T.length} itens cadastrados</span>
      </div>
      <p class="card-subtext" style="margin-bottom:1rem;">
        O consumo mensal considera a frequência em que o item reaparece nas compras (ex: itens comprados a cada 2 ou 3 meses são fracionados proporcionalmente).
      </p>
  `;T.length===0?L+='<div class="empty-state">Adicione notas fiscais para que o sistema gere automaticamente sua lista mensal de compras.</div></div>':L+=`
      <div class="table-responsive">
        <table class="custom-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Marca</th>
              <th>Frequência de Compra</th>
              <th class="num">Consumo Estimado/Mês</th>
              <th class="num">Preço Unit. Médio</th>
              <th class="num">Subtotal Mensal</th>
            </tr>
          </thead>
          <tbody>
            ${T.map(c=>{const m=c.intervaloMeses>1.2?`A cada ${c.intervaloMeses.toFixed(1)} meses`:`Todo mês (${c.frequenciaNotas}x)`,f=c.qtdMensalTaxa<1?c.qtdMensalTaxa.toFixed(2):c.qtdMensalTaxa.toFixed(1);return`
                <tr>
                  <td><strong>${c.nome}</strong></td>
                  <td><span class="badge amber">${c.marca}</span></td>
                  <td><span class="badge cyan">${m}</span></td>
                  <td class="num">${f} un/mês</td>
                  <td class="num">${i(c.valorUnitario)}</td>
                  <td class="num"><strong>${i(c.subtotalFinal)}</strong></td>
                </tr>
              `}).join("")}
          </tbody>
        </table>
      </div>
    </div>`,t.innerHTML=L}document.getElementById("btn-start-cam").addEventListener("click",ct);document.getElementById("btn-switch-cam").addEventListener("click",St);document.getElementById("btn-stop-cam").addEventListener("click",Z);async function ct(){if(typeof Html5Qrcode>"u")return E("Carregando biblioteca de câmera, aguarde..."),setTimeout(ct,600);try{w||(w=new Html5Qrcode("qr-reader")),A=await Html5Qrcode.getCameras();let t;if(A&&A.length>0){const e=A.findIndex(a=>/back|traseira|rear|environment/i.test(a.label));P=e>=0?e:0,t=A[P].id}else t={facingMode:"environment"};await w.start(t,{fps:10,qrbox:{width:240,height:240}},dt,()=>{}),O=!0,document.getElementById("btn-start-cam").style.display="none",document.getElementById("btn-switch-cam").style.display=A.length>1?"inline-flex":"none",document.getElementById("btn-stop-cam").style.display="inline-flex"}catch(t){E("❌ Não foi possível acessar a câmera. Verifique as permissões do navegador."),console.error(t)}}async function St(){if(!(!w||!O))try{await w.stop(),A.length>1&&(P=(P+1)%A.length,await w.start(A[P].id,{fps:10,qrbox:{width:240,height:240}},dt,()=>{}))}catch(t){console.error("switchCam:",t)}}async function Z(){if(w&&O)try{await w.stop()}catch{}O=!1,document.getElementById("btn-start-cam").style.display="inline-flex",document.getElementById("btn-switch-cam").style.display="none",document.getElementById("btn-stop-cam").style.display="none"}async function dt(t){Z(),document.getElementById("inp-url").value=t,E("✅ QR Code lido! Processando..."),await lt(t)}document.getElementById("btn-carregar-dados").addEventListener("click",async()=>{const t=document.getElementById("inp-url").value.trim(),e=document.getElementById("inp-html").value.trim();if(!t&&!e){E("⚠️ Cole a URL do QR Code ou o conteúdo da página para ler a nota fiscal.");return}if(t&&!e){E("⏳ Consultando nota fiscal..."),await lt(t);return}if(e){E("⏳ Processando conteúdo..."),await mt(e);return}});document.getElementById("btn-preencher-manual").addEventListener("click",()=>{it({nomeMercado:"",dataEmissao:new Date().toISOString(),valorTotal:0,descontoTotal:0,valorAPagar:0,qtdTotalItens:0,formasPagamento:{valeAlimentacao:0,cartaoCredito:0,cartaoDebito:0},itens:[]}),E("✍️ Preencha os dados da compra abaixo e clique em Salvar Nota Fiscal.","var(--accent-cyan)")});function it(t){var r,n,d;document.getElementById("inp-mercado").value=t.nomeMercado||"",document.getElementById("inp-data").value=Ct(t.dataEmissao),document.getElementById("inp-vtotal").value=t.valorTotal!==void 0?t.valorTotal:0,document.getElementById("inp-desconto").value=t.descontoTotal!==void 0?t.descontoTotal:0,document.getElementById("inp-pagar").value=t.valorAPagar!==void 0?t.valorAPagar:0,document.getElementById("inp-qtd").value=t.qtdTotalItens!==void 0?t.qtdTotalItens:0,document.getElementById("inp-alim").value=((r=t.formasPagamento)==null?void 0:r.valeAlimentacao)||0,document.getElementById("inp-cred").value=((n=t.formasPagamento)==null?void 0:n.cartaoCredito)||0,document.getElementById("inp-deb").value=((d=t.formasPagamento)==null?void 0:d.cartaoDebito)||0,M=t.itens||[];const e=document.getElementById("form-nfce");e.style.display="block";const a=document.getElementById("preview-itens-box"),o=document.getElementById("count-preview-itens"),s=document.getElementById("lista-preview-itens");M.length>0?(a.style.display="block",o.textContent=M.length,s.innerHTML=M.map(l=>`
      <div style="display:flex; justify-content:space-between; padding: 0.35rem 0; border-bottom: 1px dashed var(--border-color);">
        <span><strong>${l.nome}</strong> (${l.quantidade} ${l.unidade||"Un"})</span>
        <span>${i(l.valorUnitario)}/un = <strong>${i(l.valorTotal)}</strong></span>
      </div>
    `).join("")):a.style.display="none",e.scrollIntoView({behavior:"smooth"})}document.getElementById("form-nfce").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-mercado").value.trim()||"Mercado",a=document.getElementById("inp-data").value||new Date().toISOString(),o=parseFloat(document.getElementById("inp-vtotal").value)||0,s=parseFloat(document.getElementById("inp-desconto").value)||0,r=parseFloat(document.getElementById("inp-pagar").value)||0,n=parseInt(document.getElementById("inp-qtd").value)||0,d=parseFloat(document.getElementById("inp-alim").value)||0,l=parseFloat(document.getElementById("inp-cred").value)||0,u=parseFloat(document.getElementById("inp-deb").value)||0,p=new Date(a).toISOString().slice(0,16),g=$.find(v=>{const y=new Date(v.dataEmissao).toISOString().slice(0,16),x=Math.abs((v.valorAPagar||0)-r)<.05,B=(v.nomeMercado||"").toLowerCase().trim()===e.toLowerCase().trim();return y===p&&x&&B});if(g){E(`⚠️ Esta nota fiscal já existe no sistema (Cadastrada em ${ot(g.dataEmissao)} no valor de ${i(g.valorAPagar)}). Nota não adicionada!`,"#fb7185"),G("⚠️ Nota fiscal já cadastrada! Operação cancelada.");return}const b=new Date(a),h=`${b.getFullYear()}-${String(b.getMonth()+1).padStart(2,"0")}`;E("⏳ Salvando nota fiscal no banco...");try{await Mt({nomeMercado:e,dataEmissao:a,mesAno:h,qtdTotalItens:n||M.length,valorTotal:o,descontoTotal:s,valorAPagar:r,formasPagamento:{valeAlimentacao:d,cartaoCredito:l,cartaoDebito:u},itens:M}),E("✅ Nota salva com sucesso!","#34d399"),document.getElementById("form-nfce").style.display="none",document.getElementById("form-nfce").reset(),document.getElementById("inp-url").value="",document.getElementById("inp-html").value="",M=[],st(),nt("dashboard"),G("🎉 Nota fiscal registrada no Firebase!")}catch(v){E("❌ Erro ao salvar: "+v.message,"#fb7185")}});async function lt(t){const e=[a=>`https://api.allorigins.win/raw?url=${encodeURIComponent(a)}`,a=>`https://corsproxy.io/?${encodeURIComponent(a)}`];for(const a of e)try{const o=await fetch(a(t),{signal:AbortSignal.timeout(8e3)});if(o.ok){const s=await o.text();if(s&&s.length>200){await mt(s);return}}}catch{}Dt(t)}function Dt(t){document.getElementById("modal-link").href=t,document.getElementById("modal-cors").classList.add("active"),E("⚠️ Abra o link, copie o conteúdo da página e cole no campo de texto abaixo.")}async function mt(t){const e=Pt(t);it(e),E("✅ Nota lida com sucesso! Confira os valores abaixo e altere se necessário antes de Salvar.","#34d399")}function Pt(t){var S,q,L;const a=new DOMParser().parseFromString(t,"text/html"),o=((S=a.body)==null?void 0:S.textContent)||t;let s=((L=(q=a.querySelector(".txtTopo, .nomeEmit, h1"))==null?void 0:q.textContent)==null?void 0:L.trim())||"Mercado",r=new Date().toISOString();const n=o.match(/Emiss[ãa]o\s*[:\-]?\s*(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})?/i)||o.match(/(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})/);if(n){const[c,m,f]=n[1].split("/");r=`${f}-${m}-${c}T${n[2]||"12:00:00"}`}const d=o.match(/Qtd\.?\s*total\s*de\s*itens\s*[:\s]*([\d,\.]+)/i),l=o.match(/Valor\s*total\s*R\$\s*[:\s]*([\d\.,]+)/i),u=o.match(/Descontos?\s*R\$\s*[:\s]*([\d\.,]+)/i),p=o.match(/Valor\s*a\s*pagar\s*R\$\s*[:\s]*([\d\.,]+)/i)||o.match(/VALOR\s*PAGO\s*R\$\s*[:\s]*([\d\.,]+)/i),g=o.match(/(?:Vale\s*)?Alimenta[çc][ãa]o\s*[:\s]*([\d\.,]+)/i),b=o.match(/(?:Cart[ãa]o\s*de\s*)?Cr[eé]dito\s*[:\s]*([\d\.,]+)/i),h=o.match(/(?:Cart[ãa]o\s*de\s*)?D[eé]bito\s*[:\s]*([\d\.,]+)/i),v=d?I(d[1]):0,y=l?I(l[1]):0,x=u?I(u[1]):0;let B=p?I(p[1]):y-x;const N={valeAlimentacao:g?I(g[1]):0,cartaoCredito:b?I(b[1]):0,cartaoDebito:h?I(h[1]):0},T=[];a.querySelectorAll("tr, .item, .itemNota").forEach(c=>{var W;const m=c.textContent;if(!/Vl\.\s*Unit|valorUnitario|Qtde?\./i.test(m))return;const f=c.querySelector(".txtTit, .txtTit2, .nomeProd"),D=((W=f==null?void 0:f.textContent)==null?void 0:W.trim())||"",R=m.match(/Qtde?\.\s*[:\s]*([\d,\.]+)/i),F=m.match(/Vl\.\s*Unit\.\s*[:\s]*([\d,\.]+)/i),j=m.match(/Vl\.\s*Total\s*([\d,\.]+)/i),H=m.match(/C[oó]digo\s*[:\s]*(\d+)/i),V=m.match(/UN\s*[:\s]*([A-Za-z]+)/i),J=R?I(R[1]):1,Q=F?I(F[1]):0,ut=j?I(j[1]):Q*J;D&&Q>0&&T.push({codigo:(H==null?void 0:H[1])||"",nome:D,marca:Ot(D),quantidade:J,unidade:(V==null?void 0:V[1])||"Un",valorUnitario:Q,valorTotal:ut})});const C=new Date(r),U=`${C.getFullYear()}-${String(C.getMonth()+1).padStart(2,"0")}`;return{nomeMercado:s,dataEmissao:r,mesAno:U,qtdTotalItens:v,valorTotal:y,descontoTotal:x,valorAPagar:B,formasPagamento:N,itens:T}}function Ot(t){const e=["BAUDUCCO","BAUD","PANCO","DANONE","NESTLE","QUALITA","SADIA","PERDIGAO","SEARA","CAMIL","TIO JOAO","URBANO","LIZA","SOYA","YPE","PILAO","MELITTA","3 CORACOES","VIGOR","PARMALAT","ITALAC","HEINZ","KRAFT"],a=t.toUpperCase();for(const o of e)if(a.includes(o))return o;return a.split(" ")[0]||"Genérica"}function Nt(){const t=document.getElementById("lista-historico");if(!$.length){t.innerHTML='<div class="empty-state">📭 Nenhuma compra cadastrada ainda.</div>';return}t.innerHTML=$.map(e=>{var a,o,s;return`
    <div class="purchase-card">
      <div class="purchase-header" onclick="toggleDetail('${e.id}')">
        <div class="purchase-info">
          <h3>${e.nomeMercado||"Mercado"}</h3>
          <p>📅 ${ot(e.dataEmissao)} &nbsp;•&nbsp; 🛒 ${e.qtdTotalItens||0} itens</p>
        </div>
        <div class="purchase-values">
          <div class="pv-total">${i(e.valorAPagar)}</div>
          <div class="pv-sub">Desc: ${i(e.descontoTotal)}</div>
        </div>
        <svg class="chevron" id="chev-${e.id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      <div class="purchase-details" id="detail-${e.id}">
        <div class="details-toolbar">
          <span class="card-subtext">Pagamentos: Alimentação ${i((a=e.formasPagamento)==null?void 0:a.valeAlimentacao)} · Crédito ${i((o=e.formasPagamento)==null?void 0:o.cartaoCredito)} · Débito ${i((s=e.formasPagamento)==null?void 0:s.cartaoDebito)}</span>
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
      <td class="num">${i(e.valorUnitario)}</td>
      <td class="num"><strong>${i(e.valorTotal)}</strong></td>
    </tr>`).join("")}</tbody>
  </table></div>`}window.toggleDetail=function(t){const e=document.getElementById("detail-"+t),a=document.getElementById("chev-"+t);e&&e.classList.toggle("open"),a&&a.classList.toggle("open")};window.confirmarExcluir=async function(t){if(confirm("Excluir esta compra? Esta ação não pode ser desfeita."))try{await Tt(t),G("🗑️ Compra excluída.")}catch(e){alert("Erro: "+e.message)}};function Rt(){const t=document.getElementById("lista-comparacao"),e={};$.forEach(o=>{(o.itens||[]).forEach(s=>{var n;const r=((n=s.nome)==null?void 0:n.toLowerCase().trim())||"produto";e[r]||(e[r]={nome:s.nome,marca:s.marca,hist:{}}),e[r].hist[o.mesAno]=s.valorUnitario})});const a=Object.values(e);if(!a.length){t.innerHTML='<div class="empty-state">Adicione notas com itens detalhados para ver a comparação de preços unitários.</div>';return}t.innerHTML=`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Produto</th><th>Marca</th><th>Histórico (Unitário)</th><th>Variação</th></tr></thead>
    <tbody>${a.map(o=>{const s=Object.keys(o.hist).sort();let r=s.map(d=>`${d}: <strong>${i(o.hist[d])}</strong>`).join(" → "),n='<span class="badge cyan">Estável</span>';if(s.length>=2){const d=o.hist[s[s.length-2]],u=o.hist[s[s.length-1]]-d,p=(u/d*100).toFixed(1);u>.01?n=`<span class="badge red">+${p}% ↑</span>`:u<-.01&&(n=`<span class="badge green">${p}% ↓</span>`)}return`<tr><td><strong>${o.nome}</strong></td><td><span class="badge amber">${o.marca||"—"}</span></td><td>${r}</td><td>${n}</td></tr>`}).join("")}</tbody>
  </table></div>`}function Ft(){const t=document.getElementById("lista-recorrencia"),e=document.getElementById("lista-marcas"),a={},o={};$.forEach(n=>{(n.itens||[]).forEach(d=>{var g;const l=(g=d.nome)==null?void 0:g.toLowerCase().trim();if(!l)return;a[l]||(a[l]={nome:d.nome,marca:d.marca,qtd:0,notas:0,units:[]}),a[l].qtd+=d.quantidade||1,a[l].notas+=1,a[l].units.push(d.valorUnitario||0);const u=(d.nome||"").split(" ")[0].toUpperCase();o[u]||(o[u]={});const p=d.marca||"Genérica";o[u][p]||(o[u][p]=[]),o[u][p].push(d.valorUnitario||0)})});const s=Object.values(a).filter(n=>n.notas>1).sort((n,d)=>d.notas-n.notas);t.innerHTML=s.length?`<div class="table-responsive"><table class="custom-table">
        <thead><tr><th>Item</th><th>Marca</th><th>Compras</th><th class="num">Qtd Total</th><th class="num">Média Unitária</th></tr></thead>
        <tbody>${s.map(n=>{const d=n.units.reduce((l,u)=>l+u,0)/n.units.length;return`<tr>
            <td><strong>${n.nome}</strong></td>
            <td><span class="badge amber">${n.marca||"—"}</span></td>
            <td><span class="badge green">${n.notas}x</span></td>
            <td class="num">${n.qtd}</td>
            <td class="num">${i(d)}</td>
          </tr>`}).join("")}</tbody>
      </table></div>`:'<div class="empty-state">Adicione notas diferentes para calcular recorrência dos itens.</div>';const r=Object.entries(o).filter(([,n])=>Object.keys(n).length>1).map(([n,d])=>{let l=1/0,u="";const p=Object.entries(d).map(([g,b])=>{const h=b.reduce((v,y)=>v+y,0)/b.length;return h<l&&(l=h,u=g),{marca:g,med:h}});return`<div class="brand-card">
      <div class="brand-card-header">
        <span class="card-title">${n}</span>
        <span class="badge green">🏆 Menor preço: ${u} (${i(l)}/un)</span>
      </div>
      <div class="brands-row">
        ${p.map(g=>`<div class="brand-chip${g.marca===u?" best":""}">
          <div class="bc-name">${g.marca} ${g.marca===u?"✅":""}</div>
          <div class="bc-val">${i(g.med)}<span style="font-size:.7rem;font-weight:400">/un</span></div>
        </div>`).join("")}
      </div>
    </div>`}).join("");e.innerHTML=r||'<div class="empty-state">Ao comprar o mesmo tipo de produto com marcas diferentes (ex: Arroz Camil vs Tio João), o sistema mostrará qual teve menor preço unitário.</div>'}document.getElementById("btn-modal-close").addEventListener("click",()=>{document.getElementById("modal-cors").classList.remove("active")});
