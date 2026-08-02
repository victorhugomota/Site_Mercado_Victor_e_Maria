import{initializeApp as pt}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";import{getFirestore as gt,query as vt,collection as tt,orderBy as ft,onSnapshot as ht,addDoc as yt,serverTimestamp as bt,deleteDoc as Et,doc as It}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function a(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(s){if(s.ep)return;s.ep=!0;const r=a(s);fetch(s.href,r)}})();const et=document.createElement("script");et.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js";document.head.appendChild(et);const at=document.createElement("script");at.src="https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js";document.head.appendChild(at);const $t={apiKey:"AIzaSyANpFnEIkyN1XCT6qbtmVR9wx7sQHEsyrE",authDomain:"comprasmercado-23913.firebaseapp.com",projectId:"comprasmercado-23913",storageBucket:"comprasmercado-23913.firebasestorage.app",messagingSenderId:"317518149234",appId:"1:317518149234:web:94f38624d68a2b9a6634eb",measurementId:"G-2XP88EK37S"},Ct=pt($t),z=gt(Ct),G="compras";let B=[],V=null,M=null,x=[],U=0,N=!1,L=[];function l(t){return Number(t||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}function C(t){if(typeof t=="number")return t;if(!t)return 0;const e=parseFloat(String(t).replace(/R\$\s?/gi,"").replace(/\s/g,"").replace(/\./g,"").replace(",","."));return isNaN(e)?0:e}function ot(t){if(!t)return"—";try{return new Date(t).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}catch{return t}}function Q(t,e=3500){const a=document.getElementById("toast");a.textContent=t,a.classList.add("show"),setTimeout(()=>a.classList.remove("show"),e)}function b(t,e="var(--accent-amber)"){const a=document.getElementById("status-msg");a&&(a.textContent=t,a.style.color=e)}function Bt(t){if(!t)return new Date().toISOString().slice(0,16);try{const e=new Date(t);if(isNaN(e.getTime()))return new Date().toISOString().slice(0,16);const a=o=>String(o).padStart(2,"0");return`${e.getFullYear()}-${a(e.getMonth()+1)}-${a(e.getDate())}T${a(e.getHours())}:${a(e.getMinutes())}`}catch{return new Date().toISOString().slice(0,16)}}function xt(t,e){let a=0;const o=new Date(t,e+1,0).getDate();for(let s=1;s<=o;s++){const r=new Date(t,e,s).getDay();r!==0&&r!==6&&a++}return a}function nt(t){document.querySelectorAll(".tab-content").forEach(a=>a.classList.remove("active")),document.querySelectorAll("[data-tab]").forEach(a=>a.classList.remove("active"));const e=document.getElementById("tab-"+t);e&&e.classList.add("active"),document.querySelectorAll(`[data-tab="${t}"]`).forEach(a=>a.classList.add("active"))}document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>nt(t.getAttribute("data-tab")))});function At(){document.getElementById("modal-add-nota").classList.add("active")}function st(){N&&Y(),document.getElementById("modal-add-nota").classList.remove("active")}var X;(X=document.getElementById("btn-open-modal-home"))==null||X.addEventListener("click",At);var _;(_=document.getElementById("btn-close-modal-add"))==null||_.addEventListener("click",st);const wt=vt(tt(z,G),ft("dataEmissao","desc"));ht(wt,t=>{B=t.docs.map(e=>({id:e.id,...e.data()})),Lt(),qt(),Ut(),Ft(),Rt()},t=>console.error("Firestore:",t));async function Mt(t){return yt(tt(z,G),{...t,createdAt:bt()})}async function Tt(t){return Et(It(z,G,t))}function Lt(){let t=0,e=0,a=0,o=0,s=0,r=0;const n={};B.forEach(u=>{const p=u.valorAPagar||0,h=u.descontoTotal||0;t+=p,e+=h,r+=u.qtdTotalItens||0,u.formasPagamento&&(a+=u.formasPagamento.valeAlimentacao||0,o+=u.formasPagamento.cartaoCredito||0,s+=u.formasPagamento.cartaoDebito||0);const f=u.mesAno||"Outros";n[f]=(n[f]||0)+p});const c=Math.max(1,Object.keys(n).length),i=t/c;document.getElementById("dash-total").textContent=l(t),document.getElementById("dash-media-mensal").textContent=l(i),document.getElementById("dash-media-subtext").textContent=`Média calculada em ${c} mês(es)`,document.getElementById("dash-desconto").textContent=l(e);const m=t+e>0?(e/(t+e)*100).toFixed(1):0;document.getElementById("dash-pct").textContent=`${m}% economizado no geral`,document.getElementById("dash-qtd-notas").textContent=B.length,document.getElementById("dash-qtd-itens").textContent=`${r} itens no total`,document.getElementById("dash-alimentacao").textContent=l(a),document.getElementById("dash-credito").textContent=l(o),document.getElementById("dash-debito").textContent=l(s),rt(n)}function rt(t){var r;if(typeof Chart>"u")return setTimeout(()=>rt(t),300);const e=(r=document.getElementById("chart-barras"))==null?void 0:r.getContext("2d");if(!e)return;const a=Object.keys(t).sort(),o=a.map(n=>{const[c,i]=n.split("-");return`${i}/${c}`}),s=a.map(n=>t[n]);V&&V.destroy(),V=new Chart(e,{type:"bar",data:{labels:o.length?o:["Sem compras"],datasets:[{label:"Gasto R$",data:s.length?s:[0],backgroundColor:"rgba(16,185,129,0.78)",borderColor:"#10b981",borderWidth:2,borderRadius:8}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:n=>` ${l(n.raw)}`}}},scales:{y:{beginAtZero:!0,grid:{color:"rgba(255,255,255,.05)"},ticks:{color:"#94a3b8",callback:n=>"R$"+n}},x:{grid:{display:!1},ticks:{color:"#94a3b8"}}}}})}function qt(){const t=document.getElementById("lista-mensal-container");if(!t)return;const e=new Date,a=new Date(e.getFullYear(),e.getMonth()+1,1),o=a.toLocaleString("pt-BR",{month:"long"}),s=a.getFullYear(),r=`${o.charAt(0).toUpperCase()+o.slice(1)} de ${s}`,n=xt(a.getFullYear(),a.getMonth()),c=31.8,i=20,m=n*c,u=n*i,p={};let h=0;B.forEach(d=>{const g=d.valorAPagar||0;h+=g;const v=d.mesAno||"Outros";p[v]=(p[v]||0)+g});const f=Math.max(1,Object.keys(p).length),E=h/f,y={};B.forEach(d=>{(d.itens||[]).forEach(g=>{const v=(g.nome||"").toLowerCase().trim();v&&(y[v]||(y[v]={nome:g.nome,marca:g.marca||"Geral",qtdTotal:0,frequenciaNotas:0,valoresUnitarios:[]}),y[v].qtdTotal+=g.quantidade||1,y[v].frequenciaNotas+=1,g.valorUnitario&&y[v].valoresUnitarios.push(g.valorUnitario))})});const $=Object.values(y).map(d=>{const g=d.valoresUnitarios.length>0?d.valoresUnitarios.reduce((O,F)=>O+F,0)/d.valoresUnitarios.length:0,v=d.qtdTotal/f,w=f/Math.max(1,d.frequenciaNotas),I=Math.ceil(v),T=I*g;return{nome:d.nome,marca:d.marca,frequenciaNotas:d.frequenciaNotas,intervaloMeses:w,qtdMensalTaxa:v,totalEstimadoUnidades:I,valorUnitario:g,subtotalFinal:T}});$.sort((d,g)=>g.frequenciaNotas-d.frequenciaNotas);const q=$.reduce((d,g)=>d+g.subtotalFinal,0);let A=q;const D=Math.min(A,m);A-=D;const R=Math.min(A,u);A-=R;const S=A>0?A:0;let P=`
    <div class="card" style="margin-bottom:1.5rem; background: linear-gradient(135deg, rgba(30,41,59,0.9), rgba(15,23,42,0.95)); border: 1px solid #3b82f6;">
      <div class="card-header">
        <div>
          <span class="card-title" style="color:#60a5fa;">📅 Previsão de Compras — ${r}</span>
          <p class="card-subtext" style="color:#cbd5e1; margin-top:0.25rem;">
            Calculado com unidades inteiras exatas (${n} dias úteis em ${o}).
          </p>
        </div>
        <span class="badge green" style="font-size:0.8rem; padding:0.4rem 0.75rem;">${n} Dias Úteis</span>
      </div>

      <div class="payment-grid" style="margin-top:1rem;">
        <div class="payment-item" style="border-color: rgba(16,185,129,0.4);">
          <div class="p-label">🍽️ Vale Alimentação (${n}d × R$ 31,80)</div>
          <div class="p-val" style="color:#34d399;">${l(D)} <span style="font-size:0.75rem;font-weight:normal;color:var(--text-muted)">/ ${l(m)}</span></div>
        </div>
        <div class="payment-item" style="border-color: rgba(99,102,241,0.4);">
          <div class="p-label">💳 Cartão Crédito (${n}d × R$ 20,00)</div>
          <div class="p-val" style="color:#818cf8;">${l(R)} <span style="font-size:0.75rem;font-weight:normal;color:var(--text-muted)">/ ${l(u)}</span></div>
        </div>
        <div class="payment-item" style="border-color: ${S>0?"rgba(244,63,94,0.5)":"var(--border-color)"};">
          <div class="p-label">💳 Débito Necessário (Excedente)</div>
          <div class="p-val" style="color: ${S>0?"#fb7185":"var(--text-muted)"};">${l(S)}</div>
        </div>
      </div>

      <div style="margin-top:1.25rem; padding-top:1rem; border-top:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
        <div>
          <span style="font-size:0.85rem; color:var(--text-muted);">Total Estimado da Lista de Compras:</span>
          <p style="font-size:0.75rem; color:#60a5fa;">Média Histórica de Gastos: ${l(E)}</p>
        </div>
        <span style="font-size:1.6rem; font-weight:800; color:var(--primary);">${l(q)}</span>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-title">Lista de Itens com Frequência e Total Estimado</span>
        <span class="badge amber">${$.length} itens cadastrados</span>
      </div>
      <p class="card-subtext" style="margin-bottom:1rem;">
        O <strong>Total Estimado</strong> arredonda o consumo médio para cima (unidades inteiras exatas), pois os produtos são comprados por unidade no mercado.
      </p>
  `;$.length===0?P+='<div class="empty-state">Adicione notas fiscais para que o sistema gere automaticamente sua lista mensal de compras.</div></div>':P+=`
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
            ${$.map(d=>{const g=d.intervaloMeses>1.2?`A cada ${d.intervaloMeses.toFixed(1)} meses`:`Todo mês (${d.frequenciaNotas}x)`,v=d.qtdMensalTaxa<1?d.qtdMensalTaxa.toFixed(2):d.qtdMensalTaxa.toFixed(1),w=d.totalEstimadoUnidades.toFixed(1);return`
                <tr>
                  <td><strong>${d.nome}</strong></td>
                  <td><span class="badge amber">${d.marca}</span></td>
                  <td><span class="badge cyan">${g}</span></td>
                  <td class="num">${v} un/mês</td>
                  <td class="num"><span class="badge green" style="font-size:0.82rem;">${w}</span></td>
                  <td class="num">${l(d.valorUnitario)}</td>
                  <td class="num"><strong>${l(d.subtotalFinal)}</strong></td>
                </tr>
              `}).join("")}
          </tbody>
        </table>
      </div>
    </div>`,t.innerHTML=P}document.getElementById("btn-start-cam").addEventListener("click",ct);document.getElementById("btn-switch-cam").addEventListener("click",St);document.getElementById("btn-stop-cam").addEventListener("click",Y);async function ct(){if(typeof Html5Qrcode>"u")return b("Carregando biblioteca de câmera, aguarde..."),setTimeout(ct,600);try{M||(M=new Html5Qrcode("qr-reader")),x=await Html5Qrcode.getCameras();let t;if(x&&x.length>0){const e=x.findIndex(a=>/back|traseira|rear|environment/i.test(a.label));U=e>=0?e:0,t=x[U].id}else t={facingMode:"environment"};await M.start(t,{fps:10,qrbox:{width:240,height:240}},dt,()=>{}),N=!0,document.getElementById("btn-start-cam").style.display="none",document.getElementById("btn-switch-cam").style.display=x.length>1?"inline-flex":"none",document.getElementById("btn-stop-cam").style.display="inline-flex"}catch(t){b("❌ Não foi possível acessar a câmera. Verifique as permissões do navegador."),console.error(t)}}async function St(){if(!(!M||!N))try{await M.stop(),x.length>1&&(U=(U+1)%x.length,await M.start(x[U].id,{fps:10,qrbox:{width:240,height:240}},dt,()=>{}))}catch(t){console.error("switchCam:",t)}}async function Y(){if(M&&N)try{await M.stop()}catch{}N=!1,document.getElementById("btn-start-cam").style.display="inline-flex",document.getElementById("btn-switch-cam").style.display="none",document.getElementById("btn-stop-cam").style.display="none"}async function dt(t){Y(),document.getElementById("inp-url").value=t,b("✅ QR Code lido! Processando..."),await lt(t)}document.getElementById("btn-carregar-dados").addEventListener("click",async()=>{const t=document.getElementById("inp-url").value.trim(),e=document.getElementById("inp-html").value.trim();if(!t&&!e){b("⚠️ Cole a URL do QR Code ou o conteúdo da página para ler a nota fiscal.");return}if(t&&!e){b("⏳ Consultando nota fiscal..."),await lt(t);return}if(e){b("⏳ Processando conteúdo..."),await mt(e);return}});document.getElementById("btn-preencher-manual").addEventListener("click",()=>{it({nomeMercado:"",dataEmissao:new Date().toISOString(),valorTotal:0,descontoTotal:0,valorAPagar:0,qtdTotalItens:0,formasPagamento:{valeAlimentacao:0,cartaoCredito:0,cartaoDebito:0},itens:[]}),b("✍️ Preencha os dados da compra abaixo e clique em Salvar Nota Fiscal.","var(--accent-cyan)")});function it(t){var r,n,c;document.getElementById("inp-mercado").value=t.nomeMercado||"",document.getElementById("inp-data").value=Bt(t.dataEmissao),document.getElementById("inp-vtotal").value=t.valorTotal!==void 0?t.valorTotal:0,document.getElementById("inp-desconto").value=t.descontoTotal!==void 0?t.descontoTotal:0,document.getElementById("inp-pagar").value=t.valorAPagar!==void 0?t.valorAPagar:0,document.getElementById("inp-qtd").value=t.qtdTotalItens!==void 0?t.qtdTotalItens:0,document.getElementById("inp-alim").value=((r=t.formasPagamento)==null?void 0:r.valeAlimentacao)||0,document.getElementById("inp-cred").value=((n=t.formasPagamento)==null?void 0:n.cartaoCredito)||0,document.getElementById("inp-deb").value=((c=t.formasPagamento)==null?void 0:c.cartaoDebito)||0,L=t.itens||[];const e=document.getElementById("form-nfce");e.style.display="block";const a=document.getElementById("preview-itens-box"),o=document.getElementById("count-preview-itens"),s=document.getElementById("lista-preview-itens");L.length>0?(a.style.display="block",o.textContent=L.length,s.innerHTML=L.map(i=>`
      <div style="display:flex; justify-content:space-between; padding: 0.35rem 0; border-bottom: 1px dashed var(--border-color);">
        <span><strong>${i.nome}</strong> (${i.quantidade} ${i.unidade||"Un"})</span>
        <span>${l(i.valorUnitario)}/un = <strong>${l(i.valorTotal)}</strong></span>
      </div>
    `).join("")):a.style.display="none",e.scrollIntoView({behavior:"smooth"})}document.getElementById("form-nfce").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-mercado").value.trim()||"Mercado",a=document.getElementById("inp-data").value||new Date().toISOString(),o=parseFloat(document.getElementById("inp-vtotal").value)||0,s=parseFloat(document.getElementById("inp-desconto").value)||0,r=parseFloat(document.getElementById("inp-pagar").value)||0,n=parseInt(document.getElementById("inp-qtd").value)||0,c=parseFloat(document.getElementById("inp-alim").value)||0,i=parseFloat(document.getElementById("inp-cred").value)||0,m=parseFloat(document.getElementById("inp-deb").value)||0,u=new Date(a).toISOString().slice(0,16),p=B.find(E=>{const y=new Date(E.dataEmissao).toISOString().slice(0,16),$=Math.abs((E.valorAPagar||0)-r)<.05,q=(E.nomeMercado||"").toLowerCase().trim()===e.toLowerCase().trim();return y===u&&$&&q});if(p){b(`⚠️ Esta nota fiscal já existe no sistema (Cadastrada em ${ot(p.dataEmissao)} no valor de ${l(p.valorAPagar)}). Nota não adicionada!`,"#fb7185"),Q("⚠️ Nota fiscal já cadastrada! Operação cancelada.");return}const h=new Date(a),f=`${h.getFullYear()}-${String(h.getMonth()+1).padStart(2,"0")}`;b("⏳ Salvando nota fiscal no banco...");try{await Mt({nomeMercado:e,dataEmissao:a,mesAno:f,qtdTotalItens:n||L.length,valorTotal:o,descontoTotal:s,valorAPagar:r,formasPagamento:{valeAlimentacao:c,cartaoCredito:i,cartaoDebito:m},itens:L}),b("✅ Nota salva com sucesso!","#34d399"),document.getElementById("form-nfce").style.display="none",document.getElementById("form-nfce").reset(),document.getElementById("inp-url").value="",document.getElementById("inp-html").value="",L=[],st(),nt("dashboard"),Q("🎉 Nota fiscal registrada no Firebase!")}catch(E){b("❌ Erro ao salvar: "+E.message,"#fb7185")}});async function lt(t){const e=[a=>`https://api.allorigins.win/raw?url=${encodeURIComponent(a)}`,a=>`https://corsproxy.io/?${encodeURIComponent(a)}`];for(const a of e)try{const o=await fetch(a(t),{signal:AbortSignal.timeout(8e3)});if(o.ok){const s=await o.text();if(s&&s.length>200){await mt(s);return}}}catch{}Dt(t)}function Dt(t){document.getElementById("modal-link").href=t,document.getElementById("modal-cors").classList.add("active"),b("⚠️ Abra o link, copie o conteúdo da página e cole no campo de texto abaixo.")}async function mt(t){const e=Pt(t);it(e),b("✅ Nota lida com sucesso! Confira os valores abaixo e altere se necessário antes de Salvar.","#34d399")}function Pt(t){var d,g,v;const a=new DOMParser().parseFromString(t,"text/html"),o=((d=a.body)==null?void 0:d.textContent)||t;let s=((v=(g=a.querySelector(".txtTopo, .nomeEmit, h1"))==null?void 0:g.textContent)==null?void 0:v.trim())||"Mercado",r=new Date().toISOString();const n=o.match(/Emiss[ãa]o\s*[:\-]?\s*(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})?/i)||o.match(/(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})/);if(n){const[w,I,T]=n[1].split("/");r=`${T}-${I}-${w}T${n[2]||"12:00:00"}`}const c=o.match(/Qtd\.?\s*total\s*de\s*itens\s*[:\s]*([\d,\.]+)/i),i=o.match(/Valor\s*total\s*R\$\s*[:\s]*([\d\.,]+)/i),m=o.match(/Descontos?\s*R\$\s*[:\s]*([\d\.,]+)/i),u=o.match(/Valor\s*a\s*pagar\s*R\$\s*[:\s]*([\d\.,]+)/i)||o.match(/VALOR\s*PAGO\s*R\$\s*[:\s]*([\d\.,]+)/i),p=o.match(/(?:Vale\s*)?Alimenta[çc][ãa]o\s*[:\s]*([\d\.,]+)/i),h=o.match(/(?:Cart[ãa]o\s*de\s*)?Cr[eé]dito\s*[:\s]*([\d\.,]+)/i),f=o.match(/(?:Cart[ãa]o\s*de\s*)?D[eé]bito\s*[:\s]*([\d\.,]+)/i),E=c?C(c[1]):0,y=i?C(i[1]):0,$=m?C(m[1]):0;let q=u?C(u[1]):y-$;const A={valeAlimentacao:p?C(p[1]):0,cartaoCredito:h?C(h[1]):0,cartaoDebito:f?C(f[1]):0},D=[];a.querySelectorAll("tr, .item, .itemNota").forEach(w=>{var W;const I=w.textContent;if(!/Vl\.\s*Unit|valorUnitario|Qtde?\./i.test(I))return;const T=w.querySelector(".txtTit, .txtTit2, .nomeProd"),O=((W=T==null?void 0:T.textContent)==null?void 0:W.trim())||"",F=I.match(/Qtde?\.\s*[:\s]*([\d,\.]+)/i),K=I.match(/Vl\.\s*Unit\.\s*[:\s]*([\d,\.]+)/i),Z=I.match(/Vl\.\s*Total\s*([\d,\.]+)/i),k=I.match(/C[oó]digo\s*[:\s]*(\d+)/i),j=I.match(/UN\s*[:\s]*([A-Za-z]+)/i),J=F?C(F[1]):1,H=K?C(K[1]):0,ut=Z?C(Z[1]):H*J;O&&H>0&&D.push({codigo:(k==null?void 0:k[1])||"",nome:O,marca:Ot(O),quantidade:J,unidade:(j==null?void 0:j[1])||"Un",valorUnitario:H,valorTotal:ut})});const S=new Date(r),P=`${S.getFullYear()}-${String(S.getMonth()+1).padStart(2,"0")}`;return{nomeMercado:s,dataEmissao:r,mesAno:P,qtdTotalItens:E,valorTotal:y,descontoTotal:$,valorAPagar:q,formasPagamento:A,itens:D}}function Ot(t){const e=["BAUDUCCO","BAUD","PANCO","DANONE","NESTLE","QUALITA","SADIA","PERDIGAO","SEARA","CAMIL","TIO JOAO","URBANO","LIZA","SOYA","YPE","PILAO","MELITTA","3 CORACOES","VIGOR","PARMALAT","ITALAC","HEINZ","KRAFT"],a=t.toUpperCase();for(const o of e)if(a.includes(o))return o;return a.split(" ")[0]||"Genérica"}function Ut(){const t=document.getElementById("lista-historico");if(!B.length){t.innerHTML='<div class="empty-state">📭 Nenhuma compra cadastrada ainda.</div>';return}t.innerHTML=B.map(e=>{var a,o,s;return`
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
        ${Nt(e)}
      </div>
    </div>`}).join("")}function Nt(t){return!t.itens||!t.itens.length?'<p class="card-subtext">Nenhum item detalhado registrado.</p>':`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Item</th><th>Marca</th><th class="num">Qtd</th><th class="num">Vl. Unit.</th><th class="num">Vl. Total</th></tr></thead>
    <tbody>${t.itens.map(e=>`<tr>
      <td>${e.nome}</td>
      <td><span class="badge amber">${e.marca||"—"}</span></td>
      <td class="num">${e.quantidade} ${e.unidade||"Un"}</td>
      <td class="num">${l(e.valorUnitario)}</td>
      <td class="num"><strong>${l(e.valorTotal)}</strong></td>
    </tr>`).join("")}</tbody>
  </table></div>`}window.toggleDetail=function(t){const e=document.getElementById("detail-"+t),a=document.getElementById("chev-"+t);e&&e.classList.toggle("open"),a&&a.classList.toggle("open")};window.confirmarExcluir=async function(t){if(confirm("Excluir esta compra? Esta ação não pode ser desfeita."))try{await Tt(t),Q("🗑️ Compra excluída.")}catch(e){alert("Erro: "+e.message)}};function Ft(){const t=document.getElementById("lista-comparacao"),e={};B.forEach(o=>{(o.itens||[]).forEach(s=>{var n;const r=((n=s.nome)==null?void 0:n.toLowerCase().trim())||"produto";e[r]||(e[r]={nome:s.nome,marca:s.marca,hist:{}}),e[r].hist[o.mesAno]=s.valorUnitario})});const a=Object.values(e);if(!a.length){t.innerHTML='<div class="empty-state">Adicione notas com itens detalhados para ver a comparação de preços unitários.</div>';return}t.innerHTML=`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Produto</th><th>Marca</th><th>Histórico (Unitário)</th><th>Variação</th></tr></thead>
    <tbody>${a.map(o=>{const s=Object.keys(o.hist).sort();let r=s.map(c=>`${c}: <strong>${l(o.hist[c])}</strong>`).join(" → "),n='<span class="badge cyan">Estável</span>';if(s.length>=2){const c=o.hist[s[s.length-2]],m=o.hist[s[s.length-1]]-c,u=(m/c*100).toFixed(1);m>.01?n=`<span class="badge red">+${u}% ↑</span>`:m<-.01&&(n=`<span class="badge green">${u}% ↓</span>`)}return`<tr><td><strong>${o.nome}</strong></td><td><span class="badge amber">${o.marca||"—"}</span></td><td>${r}</td><td>${n}</td></tr>`}).join("")}</tbody>
  </table></div>`}function Rt(){const t=document.getElementById("lista-recorrencia"),e=document.getElementById("lista-marcas"),a={},o={};B.forEach(n=>{(n.itens||[]).forEach(c=>{var p;const i=(p=c.nome)==null?void 0:p.toLowerCase().trim();if(!i)return;a[i]||(a[i]={nome:c.nome,marca:c.marca,qtd:0,notas:0,units:[]}),a[i].qtd+=c.quantidade||1,a[i].notas+=1,a[i].units.push(c.valorUnitario||0);const m=(c.nome||"").split(" ")[0].toUpperCase();o[m]||(o[m]={});const u=c.marca||"Genérica";o[m][u]||(o[m][u]=[]),o[m][u].push(c.valorUnitario||0)})});const s=Object.values(a).filter(n=>n.notas>1).sort((n,c)=>c.notas-n.notas);t.innerHTML=s.length?`<div class="table-responsive"><table class="custom-table">
        <thead><tr><th>Item</th><th>Marca</th><th>Compras</th><th class="num">Qtd Total</th><th class="num">Média Unitária</th></tr></thead>
        <tbody>${s.map(n=>{const c=n.units.reduce((i,m)=>i+m,0)/n.units.length;return`<tr>
            <td><strong>${n.nome}</strong></td>
            <td><span class="badge amber">${n.marca||"—"}</span></td>
            <td><span class="badge green">${n.notas}x</span></td>
            <td class="num">${n.qtd}</td>
            <td class="num">${l(c)}</td>
          </tr>`}).join("")}</tbody>
      </table></div>`:'<div class="empty-state">Adicione notas diferentes para calcular recorrência dos itens.</div>';const r=Object.entries(o).filter(([,n])=>Object.keys(n).length>1).map(([n,c])=>{let i=1/0,m="";const u=Object.entries(c).map(([p,h])=>{const f=h.reduce((E,y)=>E+y,0)/h.length;return f<i&&(i=f,m=p),{marca:p,med:f}});return`<div class="brand-card">
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
    </div>`}).join("");e.innerHTML=r||'<div class="empty-state">Ao comprar o mesmo tipo de produto com marcas diferentes (ex: Arroz Camil vs Tio João), o sistema mostrará qual teve menor preço unitário.</div>'}document.getElementById("btn-modal-close").addEventListener("click",()=>{document.getElementById("modal-cors").classList.remove("active")});
