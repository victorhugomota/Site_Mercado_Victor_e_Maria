import{initializeApp as Mt}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";import{getFirestore as St,onSnapshot as X,query as Tt,collection as j,orderBy as Dt,doc as P,setDoc as ot,addDoc as nt,deleteDoc as st,serverTimestamp as qt}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const d of s)if(d.type==="childList")for(const n of d.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function a(s){const d={};return s.integrity&&(d.integrity=s.integrity),s.referrerPolicy&&(d.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?d.credentials="include":s.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function o(s){if(s.ep)return;s.ep=!0;const d=a(s);fetch(s.href,d)}})();const vt=document.createElement("script");vt.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js";document.head.appendChild(vt);const ft=document.createElement("script");ft.src="https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js";document.head.appendChild(ft);const Ft={apiKey:"AIzaSyANpFnEIkyN1XCT6qbtmVR9wx7sQHEsyrE",authDomain:"comprasmercado-23913.firebaseapp.com",projectId:"comprasmercado-23913",storageBucket:"comprasmercado-23913.firebasestorage.app",messagingSenderId:"317518149234",appId:"1:317518149234:web:94f38624d68a2b9a6634eb",measurementId:"G-2XP88EK37S"},Pt=Mt(Ft),x=St(Pt),rt="compras",W="entradas",it="faturas",ht="reservas";let w=[],T=[],N=[],at={metaMensal:0,valorAtualGuardado:0},et=null,D=null,B=[],Y=0,_=!1,F=[];function i(t){return Number(t||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}function I(t){if(typeof t=="number")return t;if(!t)return 0;const e=parseFloat(String(t).replace(/R\$\s?/gi,"").replace(/\s/g,"").replace(/\./g,"").replace(",","."));return isNaN(e)?0:e}function dt(t){if(!t)return"—";try{return new Date(t).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}catch{return t}}function f(t,e=3500){const a=document.getElementById("toast");a.textContent=t,a.classList.add("show"),setTimeout(()=>a.classList.remove("show"),e)}function E(t,e="var(--accent-amber)"){const a=document.getElementById("status-msg");a&&(a.textContent=t,a.style.color=e)}function Ot(t){if(!t)return new Date().toISOString().slice(0,16);try{const e=new Date(t);if(isNaN(e.getTime()))return new Date().toISOString().slice(0,16);const a=o=>String(o).padStart(2,"0");return`${e.getFullYear()}-${a(e.getMonth()+1)}-${a(e.getDate())}T${a(e.getHours())}:${a(e.getMinutes())}`}catch{return new Date().toISOString().slice(0,16)}}function Rt(t,e){let a=0;const o=new Date(t,e+1,0).getDate();for(let s=1;s<=o;s++){const d=new Date(t,e,s).getDay();d!==0&&d!==6&&a++}return a}window.goTab=function(t){document.querySelectorAll(".tab-content").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".desktop-nav .nav-item").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".mobile-nav .mob-btn").forEach(a=>a.classList.remove("active"));const e=document.getElementById("tab-"+t);e&&e.classList.add("active"),document.querySelectorAll(`[data-tab="${t}"]`).forEach(a=>a.classList.add("active"))};document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>goTab(t.getAttribute("data-tab")))});document.querySelectorAll(".sub-item").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".sub-item").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".sub-tab-content").forEach(a=>a.style.display="none"),t.classList.add("active");const e=document.getElementById("sub-"+t.getAttribute("data-sub"));e&&(e.style.display="block")})});function bt(){document.getElementById("modal-add-nota").classList.add("active")}function yt(){_&&lt(),document.getElementById("modal-add-nota").classList.remove("active")}var ut;(ut=document.getElementById("btn-open-modal-home"))==null||ut.addEventListener("click",bt);var pt;(pt=document.getElementById("btn-mercado-add-nota"))==null||pt.addEventListener("click",bt);var gt;(gt=document.getElementById("btn-close-modal-add"))==null||gt.addEventListener("click",yt);X(Tt(j(x,rt),Dt("dataEmissao","desc")),t=>{w=t.docs.map(e=>({id:e.id,...e.data()})),J()},t=>console.error("Firestore Mercado:",t));X(j(x,W),t=>{T=t.docs.map(e=>({id:e.id,...e.data()})),J()},t=>console.error("Firestore Entradas:",t));X(j(x,it),t=>{N=t.docs.map(e=>({id:e.id,...e.data()})),J()},t=>console.error("Firestore Faturas:",t));X(P(x,ht,"config"),t=>{t.exists()&&(at=t.data()),J()},t=>console.error("Firestore Reservas:",t));function J(){kt(),Ut(),Ht(),zt(),Wt(),Kt(),Xt(),Vt()}function kt(){let t=T.reduce((r,u)=>r+(u.valor||0),0),e=N.reduce((r,u)=>r+(u.valor||0),0),a=0,o=0,s=0,d=0,n=0;const c={};w.forEach(r=>{const u=r.valorAPagar||0;d+=r.descontoTotal||0,n+=r.qtdTotalItens||0,r.formasPagamento&&(o+=r.formasPagamento.valeAlimentacao||0,s+=r.formasPagamento.cartaoCredito||0,a+=r.formasPagamento.cartaoDebito||0);const p=r.mesAno||"Outros";c[p]=(c[p]||0)+u});let m=t-e-a;document.getElementById("fin-total-entradas").textContent=i(t),document.getElementById("fin-total-cartoes").textContent=i(e),document.getElementById("fin-mercado-debito").textContent=i(a),document.getElementById("fin-saldo-liquido").textContent=i(m),document.getElementById("dash-alimentacao").textContent=i(o),document.getElementById("dash-credito").textContent=i(s),document.getElementById("dash-debito").textContent=i(a),Et(c)}function Et(t){var d;if(typeof Chart>"u")return setTimeout(()=>Et(t),300);const e=(d=document.getElementById("chart-barras"))==null?void 0:d.getContext("2d");if(!e)return;const a=Object.keys(t).sort(),o=a.map(n=>{const[c,m]=n.split("-");return`${m}/${c}`}),s=a.map(n=>t[n]);et&&et.destroy(),et=new Chart(e,{type:"bar",data:{labels:o.length?o:["Sem compras"],datasets:[{label:"Gasto Mercado R$",data:s.length?s:[0],backgroundColor:"rgba(16,185,129,0.78)",borderColor:"#10b981",borderWidth:2,borderRadius:8}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:n=>` ${i(n.raw)}`}}},scales:{y:{beginAtZero:!0,grid:{color:"rgba(255,255,255,.05)"},ticks:{color:"#94a3b8",callback:n=>"R$"+n}},x:{grid:{display:!1},ticks:{color:"#94a3b8"}}}}})}function xt(t){if(!t)return 0;const e=t.match(/L[íi]quido(?:\s*a\s*receber)?\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/TOTAL\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/SAL[ÁA]RIO\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/VALOR\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i);return e?I(e[1]):0}document.getElementById("form-holerite-victor").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-holerite-txt-victor").value;let a=parseFloat(document.getElementById("inp-salario-val-victor").value)||0;if(!a&&e&&(a=xt(e)),!a){f("⚠️ Digite ou cole um holerite válido com valor.");return}await ot(P(x,W,"salario_victor"),{pessoa:"Victor",tipo:"holerite",descricao:"Salário Líquido Victor",valor:a,data:new Date().toISOString()}),f("✅ Salário do Victor salvo!")});document.getElementById("form-holerite-maria").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-holerite-txt-maria").value;let a=parseFloat(document.getElementById("inp-salario-val-maria").value)||0;if(!a&&e&&(a=xt(e)),!a){f("⚠️ Digite ou cole um holerite válido com valor.");return}await ot(P(x,W,"salario_maria"),{pessoa:"Maria",tipo:"holerite",descricao:"Salário Líquido Maria",valor:a,data:new Date().toISOString()}),f("✅ Salário da Maria salvo!")});document.getElementById("form-entrada-manual").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-ent-desc").value.trim(),a=parseFloat(document.getElementById("inp-ent-val").value)||0,o=document.getElementById("inp-ent-pessoa").value;!e||!a||(await nt(j(x,W),{pessoa:o,tipo:"manual",descricao:e,valor:a,data:new Date().toISOString()}),t.target.reset(),f("🎉 Entrada manual registrada!"))});function Ut(){var s,d;const t=((s=T.find(n=>n.id==="salario_victor"))==null?void 0:s.valor)||0,e=((d=T.find(n=>n.id==="salario_maria"))==null?void 0:d.valor)||0,a=T.reduce((n,c)=>n+(c.valor||0),0);document.getElementById("val-salario-victor").textContent=i(t),document.getElementById("val-salario-maria").textContent=i(e),document.getElementById("val-entradas-combinado").textContent=i(a);const o=document.getElementById("lista-entradas-registradas");if(!T.length){o.innerHTML='<div class="empty-state">Nenhuma entrada cadastrada ainda.</div>';return}o.innerHTML=`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Descrição</th><th>Pessoa</th><th>Tipo</th><th class="num">Valor</th><th>Ação</th></tr></thead>
    <tbody>${T.map(n=>`<tr>
      <td><strong>${n.descricao}</strong></td>
      <td><span class="badge ${n.pessoa==="Victor"?"green":n.pessoa==="Maria"?"purple":"cyan"}">${n.pessoa}</span></td>
      <td><span class="badge amber">${n.tipo==="holerite"?"Holerite":"Manual"}</span></td>
      <td class="num" style="color:#34d399"><strong>${i(n.valor)}</strong></td>
      <td><button class="btn-danger" onclick="excluirEntrada('${n.id}')">🗑️</button></td>
    </tr>`).join("")}</tbody>
  </table></div>`}window.excluirEntrada=async function(t){confirm("Excluir esta entrada?")&&(await st(P(x,W,t)),f("🗑️ Entrada removida."))};let ct="Nubank";window.selecionarCartaoFatura=function(t){ct=t,document.querySelectorAll(".btn-card-select").forEach(a=>a.classList.remove("active"));const e=document.querySelector(`.btn-card-select[data-card="${t}"]`);e&&e.classList.add("active"),f(`Cartão selecionado: ${t}`)};window.handleFileFaturaSelect=async function(t){const e=t.target.files[0];if(!e)return;const a=document.getElementById("txt-file-fatura");a&&(a.textContent=`📄 Arquivo: ${e.name}`),f(`⏳ Lendo arquivo da fatura (${e.name})...`);let o="";if(e.type==="application/pdf"||e.name.endsWith(".pdf"))o=await Nt(e);else try{o=await e.text()}catch{o=""}o?(document.getElementById("inp-fatura-txt").value=o,await It(o,ct)):f("❌ Não foi possível ler o texto do arquivo da fatura.")};async function Nt(t){try{const e=await t.arrayBuffer();if(typeof pdfjsLib>"u")return f("⚠️ Aguarde a biblioteca de PDF carregar..."),"";pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";const a=await pdfjsLib.getDocument({data:e}).promise;let o="";for(let s=1;s<=a.numPages;s++){const c=(await(await a.getPage(s)).getTextContent()).items.map(m=>m.str);o+=c.join(" ")+`
`}return o}catch(e){return console.error("Erro ao ler PDF:",e),""}}window.importarFaturaManualOuArquivo=async function(){const t=document.getElementById("inp-fatura-txt").value.trim();if(!t){f("⚠️ Selecione o arquivo da fatura (.pdf, .csv) ou cole o texto da fatura.");return}await It(t,ct)};async function It(t,e){const a=jt(t,e);if(!a.length){f(`⚠️ Nenhuma compra identificada no arquivo/texto da fatura do ${e}.`);return}for(const s of a)await nt(j(x,it),s);document.getElementById("inp-fatura-txt").value="";const o=document.getElementById("txt-file-fatura");o&&(o.textContent="Clique para Selecionar o Arquivo da Fatura"),f(`🎉 ${a.length} lançamentos do ${e} importados com sucesso!`)}function jt(t,e){const a=[],o=t.split(`
`),s=/(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+R?\$\s*([\d\.,]+)/i;return o.forEach(d=>{const n=d.trim();if(!n)return;const c=n.match(s);if(c){const m=c[2].trim(),r=I(c[3]);m&&r>0&&!/pagamento|total\s*fatura|fatura\s*anterior|saldo/i.test(m)&&a.push({cartao:e||"Nubank",descricao:m,valor:r,data:new Date().toISOString()})}}),a}function Ht(){const t=N.reduce((a,o)=>a+(o.valor||0),0);document.getElementById("badge-total-cartoes").textContent=`${i(t)} total`;const e=document.getElementById("lista-faturas-registradas");if(!N.length){e.innerHTML='<div class="empty-state">Nenhuma fatura ou compra em cartão importada ainda.</div>';return}e.innerHTML=`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Cartão</th><th>Descrição</th><th>Data</th><th class="num">Valor</th><th>Ação</th></tr></thead>
    <tbody>${N.map(a=>`<tr>
      <td><span class="badge rose">${a.cartao||"Cartão"}</span></td>
      <td><strong>${a.descricao}</strong></td>
      <td>${dt(a.data)}</td>
      <td class="num" style="color:#fb7185"><strong>${i(a.valor)}</strong></td>
      <td><button class="btn-danger" onclick="excluirFatura('${a.id}')">🗑️</button></td>
    </tr>`).join("")}</tbody>
  </table></div>`}window.excluirFatura=async function(t){confirm("Excluir este lançamento de cartão?")&&(await st(P(x,it,t)),f("🗑️ Lançamento de cartão removido."))};document.getElementById("form-config-reservas").addEventListener("submit",async t=>{t.preventDefault();const e=parseFloat(document.getElementById("inp-meta-mensal").value)||0,a=parseFloat(document.getElementById("inp-saldo-guardado").value)||0;await ot(P(x,ht,"config"),{metaMensal:e,valorAtualGuardado:a,dataAtualizacao:new Date().toISOString()}),f("✅ Reservas e economias atualizadas!")});function Vt(){const t=at.metaMensal||0,e=at.valorAtualGuardado||0;document.getElementById("val-meta-reserva").textContent=i(t),document.getElementById("val-real-guardado").textContent=i(e);const a=T.reduce((r,u)=>r+(u.valor||0),0),o=N.reduce((r,u)=>r+(u.valor||0),0);let s=0;w.forEach(r=>{r.formasPagamento&&(s+=r.formasPagamento.cartaoDebito||0)});const d=a-o-s,n=d>0?Math.max(d*.5,a*.2):0;document.getElementById("val-recomendacao-reserva").textContent=i(n);const c=document.getElementById("box-analise-reserva-detalhes");if(a===0){c.innerHTML='<p class="empty-state">Cadastre seus salários e entradas na aba "Salários & Entradas" para gerar o diagnóstico inteligente de economias.</p>';return}const m=t>0?Math.min(100,e/t*100).toFixed(1):0;c.innerHTML=`
    <p> Com base nos seus <strong>${i(a)}</strong> de Entradas, <strong>${i(o)}</strong> de Faturas de Cartão e <strong>${i(s)}</strong> de Mercado no Débito:</p>
    <div style="background:rgba(15,23,42,0.6);padding:1rem;border-radius:10px;margin:.75rem 0;border:1px solid var(--border-color)">
      <div style="display:flex;justify-content:space-between;margin-bottom:.4rem">
        <span>💰 Saldo Livre em Conta: <strong>${i(d)}</strong></span>
        <span>💡 Recomendação de Reserva: <strong style="color:#c084fc">${i(n)}/mês</strong></span>
      </div>
      <div class="progress-bar-bg">
        <div class="progress-bar-fill" style="width:${m}%"></div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:.78rem;color:var(--text-muted);margin-top:.4rem">
        <span>Guardado: ${i(e)}</span>
        <span>Meta Pessoal: ${i(t)} (${m}%)</span>
      </div>
    </div>
    <p style="font-size:.84rem;color:var(--text-muted)">
      💡 <strong>Dica de Inteligência Financeira:</strong> Como o Vale Alimentação e o Crédito no Mercado não saem do seu salário em conta, eles protegem sua renda real! O sistema recomenda destinar pelo menos 50% do seu saldo livre líquido (<strong>${i(n)}</strong>) para sua reserva de emergência e investimentos.
    </p>
  `}function zt(){const t=document.getElementById("lista-mensal-container");if(!t)return;const e=new Date,a=new Date(e.getFullYear(),e.getMonth()+1,1),o=a.toLocaleString("pt-BR",{month:"long"}),s=a.getFullYear(),d=`${o.charAt(0).toUpperCase()+o.slice(1)} de ${s}`,n=Rt(a.getFullYear(),a.getMonth()),c=31.8,m=20,r=n*c,u=n*m,p={};let $=0;w.forEach(l=>{const g=l.valorAPagar||0;$+=g;const v=l.mesAno||"Outros";p[v]=(p[v]||0)+g});const b=Math.max(1,Object.keys(p).length),h=$/b,y={};w.forEach(l=>{(l.itens||[]).forEach(g=>{const v=(g.nome||"").toLowerCase().trim();v&&(y[v]||(y[v]={nome:g.nome,marca:g.marca||"Geral",qtdTotal:0,frequenciaNotas:0,valoresUnitarios:[]}),y[v].qtdTotal+=g.quantidade||1,y[v].frequenciaNotas+=1,g.valorUnitario&&y[v].valoresUnitarios.push(g.valorUnitario))})});const L=Object.values(y).map(l=>{const g=l.valoresUnitarios.length>0?l.valoresUnitarios.reduce((Q,K)=>Q+K,0)/l.valoresUnitarios.length:0,v=l.qtdTotal/b,U=b/Math.max(1,l.frequenciaNotas),Z=l.frequenciaNotas/b;let A=0;Z>=.35||v>=.7?A=Math.ceil(v):A=Math.round(v),A<1&&l.frequenciaNotas>=b&&(A=1);const G=A*g;return{nome:l.nome,marca:l.marca,frequenciaNotas:l.frequenciaNotas,intervaloMeses:U,qtdMensalTaxa:v,totalEstimadoUnidades:A,valorUnitario:g,subtotalCalculado:G}}).filter(l=>l.totalEstimadoUnidades>0);L.sort((l,g)=>g.frequenciaNotas-l.frequenciaNotas);const C=L.reduce((l,g)=>l+g.subtotalCalculado,0),H=h>0?h*1.05:C;let V=1;C>H&&h>0&&(V=H/C);const z=L.map(l=>({...l,subtotalFinal:l.subtotalCalculado*V})),O=h>0?Math.min(C,H):C;let M=O;const R=Math.min(M,r);M-=R;const k=Math.min(M,u);M-=k;const q=M>0?M:0;let S=`
    <div class="card" style="margin-bottom:1.5rem; background: linear-gradient(135deg, rgba(30,41,59,0.9), rgba(15,23,42,0.95)); border: 1px solid #3b82f6;">
      <div class="card-header">
        <div>
          <span class="card-title" style="color:#60a5fa;">📅 Previsão de Compras — ${d}</span>
          <p class="card-subtext" style="color:#cbd5e1; margin-top:0.25rem;">
            Calculado com unidades inteiras exatas (${n} dias úteis em ${o}).
          </p>
        </div>
        <span class="badge green" style="font-size:0.8rem; padding:0.4rem 0.75rem;">${n} Dias Úteis</span>
      </div>

      <div class="payment-grid" style="margin-top:1rem;">
        <div class="payment-item" style="border-color: rgba(16,185,129,0.4);">
          <div class="p-label">🍽️ Vale Alimentação (${n}d × R$ 31,80)</div>
          <div class="p-val" style="color:#34d399;">${i(R)} <span style="font-size:0.75rem;font-weight:normal;color:var(--text-muted)">/ ${i(r)}</span></div>
        </div>
        <div class="payment-item" style="border-color: rgba(99,102,241,0.4);">
          <div class="p-label">💳 Cartão Crédito (${n}d × R$ 20,00)</div>
          <div class="p-val" style="color:#818cf8;">${i(k)} <span style="font-size:0.75rem;font-weight:normal;color:var(--text-muted)">/ ${i(u)}</span></div>
        </div>
        <div class="payment-item" style="border-color: ${q>0?"rgba(244,63,94,0.5)":"var(--border-color)"};">
          <div class="p-label">💳 Débito Necessário (Excedente)</div>
          <div class="p-val" style="color: ${q>0?"#fb7185":"var(--text-muted)"};">${i(q)}</div>
        </div>
      </div>

      <div style="margin-top:1.25rem; padding-top:1rem; border-top:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
        <div>
          <span style="font-size:0.85rem; color:var(--text-muted);">Total Estimado da Lista de Compras:</span>
          <p style="font-size:0.75rem; color:#60a5fa;">Média Histórica de Gastos: ${i(h)}</p>
        </div>
        <span style="font-size:1.6rem; font-weight:800; color:var(--primary);">${i(O)}</span>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-title">Lista de Itens com Frequência e Total Estimado</span>
        <span class="badge amber">${z.length} itens cadastrados</span>
      </div>
      <p class="card-subtext" style="margin-bottom:1rem;">
        O <strong>Total Estimado</strong> arredonda o consumo médio para cima (unidades inteiras exatas), pois os produtos são comprados por unidade no mercado.
      </p>
  `;window.dadosListaMensalCache={mesAnoStr:d,diasUteis:n,totalGeralEstimado:O,cobertoAlim:R,cobertoCred:k,cobertoDeb:q,alimDisponivel:r,credDisponivel:u,lista:z},z.length===0?S+='<div class="empty-state">Adicione notas fiscais para que o sistema gere automaticamente sua lista mensal de compras.</div></div>':S+=`
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
            ${z.map(l=>{const g=l.intervaloMeses>1.2?`A cada ${l.intervaloMeses.toFixed(1)} meses`:`Todo mês (${l.frequenciaNotas}x)`,v=l.qtdMensalTaxa<1?l.qtdMensalTaxa.toFixed(2):l.qtdMensalTaxa.toFixed(1),U=l.totalEstimadoUnidades.toFixed(1);return`
                <tr>
                  <td><strong>${l.nome}</strong></td>
                  <td><span class="badge amber">${l.marca}</span></td>
                  <td><span class="badge cyan">${g}</span></td>
                  <td class="num">${v} un/mês</td>
                  <td class="num"><span class="badge green" style="font-size:0.82rem;">${U}</span></td>
                  <td class="num">${i(l.valorUnitario)}</td>
                  <td class="num"><strong>${i(l.subtotalFinal)}</strong></td>
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
    </div>`,t.innerHTML=S}window.exportarPDFListaMensal=function(){if(!window.dadosListaMensalCache||!window.dadosListaMensalCache.lista.length){f("⚠️ Nenhuma lista mensal disponível para exportar.");return}const{mesAnoStr:t,diasUteis:e,totalGeralEstimado:a,cobertoAlim:o,cobertoCred:s,cobertoDeb:d,lista:n}=window.dadosListaMensalCache,c=window.open("","_blank","width=900,height=750");if(!c){alert("Permita pop-ups no navegador para gerar o PDF da lista.");return}const m=`
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
          <div class="val">${i(o)}</div>
        </div>
        <div class="res-item">
          <div class="label">💳 Cartão Crédito</div>
          <div class="val">${i(s)}</div>
        </div>
        <div class="res-item">
          <div class="label">💳 Débito (Excedente)</div>
          <div class="val">${i(d)}</div>
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
          ${n.map(r=>`
            <tr>
              <td class="check-col"><div class="chk-box"></div></td>
              <td><strong>${r.nome}</strong></td>
              <td>${r.marca}</td>
              <td class="num"><strong>${r.totalEstimadoUnidades.toFixed(1)} un</strong></td>
              <td class="num">${i(r.valorUnitario)}</td>
              <td class="num"><strong>${i(r.subtotalFinal)}</strong></td>
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
  `;c.document.open(),c.document.write(m),c.document.close()};document.getElementById("btn-start-cam").addEventListener("click",$t);document.getElementById("btn-switch-cam").addEventListener("click",Gt);document.getElementById("btn-stop-cam").addEventListener("click",lt);async function $t(){if(typeof Html5Qrcode>"u")return E("Carregando biblioteca de câmera, aguarde..."),setTimeout($t,600);try{D||(D=new Html5Qrcode("qr-reader")),B=await Html5Qrcode.getCameras();let t;if(B&&B.length>0){const e=B.findIndex(a=>/back|traseira|rear|environment/i.test(a.label));Y=e>=0?e:0,t=B[Y].id}else t={facingMode:"environment"};await D.start(t,{fps:10,qrbox:{width:240,height:240}},wt,()=>{}),_=!0,document.getElementById("btn-start-cam").style.display="none",document.getElementById("btn-switch-cam").style.display=B.length>1?"inline-flex":"none",document.getElementById("btn-stop-cam").style.display="inline-flex"}catch(t){E("❌ Não foi possível acessar a câmera. Verifique as permissões do navegador."),console.error(t)}}async function Gt(){if(!(!D||!_))try{await D.stop(),B.length>1&&(Y=(Y+1)%B.length,await D.start(B[Y].id,{fps:10,qrbox:{width:240,height:240}},wt,()=>{}))}catch(t){console.error("switchCam:",t)}}async function lt(){if(D&&_)try{await D.stop()}catch{}_=!1,document.getElementById("btn-start-cam").style.display="inline-flex",document.getElementById("btn-switch-cam").style.display="none",document.getElementById("btn-stop-cam").style.display="none"}async function wt(t){lt(),document.getElementById("inp-url").value=t,E("✅ QR Code lido! Processando..."),await At(t)}document.getElementById("btn-carregar-dados").addEventListener("click",async()=>{const t=document.getElementById("inp-url").value.trim(),e=document.getElementById("inp-html").value.trim();if(!t&&!e){E("⚠️ Cole a URL do QR Code ou o conteúdo da página para ler a nota fiscal.");return}if(t&&!e){E("⏳ Consultando nota fiscal..."),await At(t);return}if(e){E("⏳ Processando conteúdo..."),await Bt(e);return}});document.getElementById("btn-preencher-manual").addEventListener("click",()=>{Ct({nomeMercado:"",dataEmissao:new Date().toISOString(),valorTotal:0,descontoTotal:0,valorAPagar:0,qtdTotalItens:0,formasPagamento:{valeAlimentacao:0,cartaoCredito:0,cartaoDebito:0},itens:[]}),E("✍️ Preencha os dados da compra abaixo e clique em Salvar Nota Fiscal.","var(--accent-cyan)")});function Ct(t){var d,n,c;document.getElementById("inp-mercado").value=t.nomeMercado||"",document.getElementById("inp-data").value=Ot(t.dataEmissao),document.getElementById("inp-vtotal").value=t.valorTotal!==void 0?t.valorTotal:0,document.getElementById("inp-desconto").value=t.descontoTotal!==void 0?t.descontoTotal:0,document.getElementById("inp-pagar").value=t.valorAPagar!==void 0?t.valorAPagar:0,document.getElementById("inp-qtd").value=t.qtdTotalItens!==void 0?t.qtdTotalItens:0,document.getElementById("inp-alim").value=((d=t.formasPagamento)==null?void 0:d.valeAlimentacao)||0,document.getElementById("inp-cred").value=((n=t.formasPagamento)==null?void 0:n.cartaoCredito)||0,document.getElementById("inp-deb").value=((c=t.formasPagamento)==null?void 0:c.cartaoDebito)||0,F=t.itens||[];const e=document.getElementById("form-nfce");e.style.display="block";const a=document.getElementById("preview-itens-box"),o=document.getElementById("count-preview-itens"),s=document.getElementById("lista-preview-itens");F.length>0?(a.style.display="block",o.textContent=F.length,s.innerHTML=F.map(m=>`
      <div style="display:flex; justify-content:space-between; padding: 0.35rem 0; border-bottom: 1px dashed var(--border-color);">
        <span><strong>${m.nome}</strong> (${m.quantidade} ${m.unidade||"Un"})</span>
        <span>${i(m.valorUnitario)}/un = <strong>${i(m.valorTotal)}</strong></span>
      </div>
    `).join("")):a.style.display="none",e.scrollIntoView({behavior:"smooth"})}document.getElementById("form-nfce").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-mercado").value.trim()||"Mercado",a=document.getElementById("inp-data").value||new Date().toISOString(),o=parseFloat(document.getElementById("inp-vtotal").value)||0,s=parseFloat(document.getElementById("inp-desconto").value)||0,d=parseFloat(document.getElementById("inp-pagar").value)||0,n=parseInt(document.getElementById("inp-qtd").value)||0,c=parseFloat(document.getElementById("inp-alim").value)||0,m=parseFloat(document.getElementById("inp-cred").value)||0,r=parseFloat(document.getElementById("inp-deb").value)||0,u=new Date(a).toISOString().slice(0,16),p=w.find(h=>{const y=new Date(h.dataEmissao).toISOString().slice(0,16),L=Math.abs((h.valorAPagar||0)-d)<.05,C=(h.nomeMercado||"").toLowerCase().trim()===e.toLowerCase().trim();return y===u&&L&&C});if(p){E(`⚠️ Esta nota fiscal já existe no sistema (Cadastrada em ${dt(p.dataEmissao)} no valor de ${i(p.valorAPagar)}). Nota não adicionada!`,"#fb7185"),f("⚠️ Nota fiscal já cadastrada! Operação cancelada.");return}const $=new Date(a),b=`${$.getFullYear()}-${String($.getMonth()+1).padStart(2,"0")}`;E("⏳ Salvando nota fiscal no banco...");try{await nt(j(x,rt),{nomeMercado:e,dataEmissao:a,mesAno:b,qtdTotalItens:n||F.length,valorTotal:o,descontoTotal:s,valorAPagar:d,formasPagamento:{valeAlimentacao:c,cartaoCredito:m,cartaoDebito:r},itens:F,createdAt:qt()}),E("✅ Nota salva com sucesso!","#34d399"),document.getElementById("form-nfce").style.display="none",document.getElementById("form-nfce").reset(),document.getElementById("inp-url").value="",document.getElementById("inp-html").value="",F=[],yt(),goTab("dashboard"),f("🎉 Nota fiscal registrada no Firebase!")}catch(h){E("❌ Erro ao salvar: "+h.message,"#fb7185")}});async function At(t){const e=[a=>`https://api.allorigins.win/raw?url=${encodeURIComponent(a)}`,a=>`https://corsproxy.io/?${encodeURIComponent(a)}`];for(const a of e)try{const o=await fetch(a(t),{signal:AbortSignal.timeout(8e3)});if(o.ok){const s=await o.text();if(s&&s.length>200){await Bt(s);return}}}catch{}Qt(t)}function Qt(t){document.getElementById("modal-link").href=t,document.getElementById("modal-cors").classList.add("active"),E("⚠️ Abra o link, copie o conteúdo da página e cole no campo de texto abaixo.")}async function Bt(t){const e=Yt(t);Ct(e),E("✅ Nota lida com sucesso! Confira os valores abaixo e altere se necessário antes de Salvar.","#34d399")}function Yt(t){var R,k,q;const a=new DOMParser().parseFromString(t,"text/html"),o=((R=a.body)==null?void 0:R.textContent)||t;let s=((q=(k=a.querySelector(".txtTopo, .nomeEmit, h1"))==null?void 0:k.textContent)==null?void 0:q.trim())||"Mercado",d=new Date().toISOString();const n=o.match(/Emiss[ãa]o\s*[:\-]?\s*(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})?/i)||o.match(/(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})/);if(n){const[S,l,g]=n[1].split("/");d=`${g}-${l}-${S}T${n[2]||"12:00:00"}`}const c=o.match(/Qtd\.?\s*total\s*de\s*itens\s*[:\s]*([\d,\.]+)/i),m=o.match(/Valor\s*total\s*R\$\s*[:\s]*([\d\.,]+)/i),r=o.match(/Descontos?\s*R\$\s*[:\s]*([\d\.,]+)/i),u=o.match(/Valor\s*a\s*pagar\s*R\$\s*[:\s]*([\d\.,]+)/i)||o.match(/VALOR\s*PAGO\s*R\$\s*[:\s]*([\d\.,]+)/i),p=o.match(/(?:Vale\s*)?Alimenta[çc][ãa]o\s*[:\s]*([\d\.,]+)/i),$=o.match(/(?:Cart[ãa]o\s*de\s*)?Cr[eé]dito\s*[:\s]*([\d\.,]+)/i),b=o.match(/(?:Cart[ãa]o\s*de\s*)?D[eé]bito\s*[:\s]*([\d\.,]+)/i),h=c?I(c[1]):0,y=m?I(m[1]):0,L=r?I(r[1]):0;let C=u?I(u[1]):y-L;const H={valeAlimentacao:p?I(p[1]):0,cartaoCredito:$?I($[1]):0,cartaoDebito:b?I(b[1]):0},V=[];a.querySelectorAll("tr, .item, .itemNota").forEach(S=>{var mt;const l=S.textContent;if(!/Vl\.\s*Unit|valorUnitario|Qtde?\./i.test(l))return;const g=S.querySelector(".txtTit, .txtTit2, .nomeProd"),v=((mt=g==null?void 0:g.textContent)==null?void 0:mt.trim())||"",U=l.match(/Qtde?\.\s*[:\s]*([\d,\.]+)/i),Z=l.match(/Vl\.\s*Unit\.\s*[:\s]*([\d,\.]+)/i),A=l.match(/Vl\.\s*Total\s*([\d,\.]+)/i),G=l.match(/C[oó]digo\s*[:\s]*(\d+)/i),Q=l.match(/UN\s*[:\s]*([A-Za-z]+)/i),K=U?I(U[1]):1,tt=Z?I(Z[1]):0,Lt=A?I(A[1]):tt*K;v&&tt>0&&V.push({codigo:(G==null?void 0:G[1])||"",nome:v,marca:_t(v),quantidade:K,unidade:(Q==null?void 0:Q[1])||"Un",valorUnitario:tt,valorTotal:Lt})});const O=new Date(d),M=`${O.getFullYear()}-${String(O.getMonth()+1).padStart(2,"0")}`;return{nomeMercado:s,dataEmissao:d,mesAno:M,qtdTotalItens:h,valorTotal:y,descontoTotal:L,valorAPagar:C,formasPagamento:H,itens:V}}function _t(t){const e=["BAUDUCCO","BAUD","PANCO","DANONE","NESTLE","QUALITA","SADIA","PERDIGAO","SEARA","CAMIL","TIO JOAO","URBANO","LIZA","SOYA","YPE","PILAO","MELITTA","3 CORACOES","VIGOR","PARMALAT","ITALAC","HEINZ","KRAFT"],a=t.toUpperCase();for(const o of e)if(a.includes(o))return o;return a.split(" ")[0]||"Genérica"}function Wt(){const t=document.getElementById("lista-historico");if(!w.length){t.innerHTML='<div class="empty-state">📭 Nenhuma compra cadastrada ainda.</div>';return}t.innerHTML=w.map(e=>{var a,o,s;return`
    <div class="purchase-card">
      <div class="purchase-header" onclick="toggleDetail('${e.id}')">
        <div class="purchase-info">
          <h3>${e.nomeMercado||"Mercado"}</h3>
          <p>📅 ${dt(e.dataEmissao)} &nbsp;•&nbsp; 🛒 ${e.qtdTotalItens||0} itens</p>
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
          <button class="btn-danger" onclick="confirmarExcluirMercado('${e.id}')">🗑️ Excluir</button>
        </div>
        ${Zt(e)}
      </div>
    </div>`}).join("")}function Zt(t){return!t.itens||!t.itens.length?'<p class="card-subtext">Nenhum item detalhado registrado.</p>':`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Item</th><th>Marca</th><th class="num">Qtd</th><th class="num">Vl. Unit.</th><th class="num">Vl. Total</th></tr></thead>
    <tbody>${t.itens.map(e=>`<tr>
      <td>${e.nome}</td>
      <td><span class="badge amber">${e.marca||"—"}</span></td>
      <td class="num">${e.quantidade} ${e.unidade||"Un"}</td>
      <td class="num">${i(e.valorUnitario)}</td>
      <td class="num"><strong>${i(e.valorTotal)}</strong></td>
    </tr>`).join("")}</tbody>
  </table></div>`}window.toggleDetail=function(t){const e=document.getElementById("detail-"+t),a=document.getElementById("chev-"+t);e&&e.classList.toggle("open"),a&&a.classList.toggle("open")};window.confirmarExcluirMercado=async function(t){if(confirm("Excluir esta compra de mercado?"))try{await st(P(x,rt,t)),f("🗑️ Compra excluída.")}catch(e){alert("Erro: "+e.message)}};function Kt(){const t=document.getElementById("lista-comparacao"),e={};w.forEach(o=>{(o.itens||[]).forEach(s=>{var n;const d=((n=s.nome)==null?void 0:n.toLowerCase().trim())||"produto";e[d]||(e[d]={nome:s.nome,marca:s.marca,hist:{}}),e[d].hist[o.mesAno]=s.valorUnitario})});const a=Object.values(e);if(!a.length){t.innerHTML='<div class="empty-state">Adicione notas para ver a comparação de preços unitários.</div>';return}t.innerHTML=`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Produto</th><th>Marca</th><th>Histórico (Unitário)</th><th>Variação</th></tr></thead>
    <tbody>${a.map(o=>{const s=Object.keys(o.hist).sort();let d=s.map(c=>`${c}: <strong>${i(o.hist[c])}</strong>`).join(" → "),n='<span class="badge cyan">Estável</span>';if(s.length>=2){const c=o.hist[s[s.length-2]],r=o.hist[s[s.length-1]]-c,u=(r/c*100).toFixed(1);r>.01?n=`<span class="badge red">+${u}% ↑</span>`:r<-.01&&(n=`<span class="badge green">${u}% ↓</span>`)}return`<tr><td><strong>${o.nome}</strong></td><td><span class="badge amber">${o.marca||"—"}</span></td><td>${d}</td><td>${n}</td></tr>`}).join("")}</tbody>
  </table></div>`}function Xt(){const t=document.getElementById("lista-recorrencia"),e=document.getElementById("lista-marcas"),a={},o={};w.forEach(n=>{(n.itens||[]).forEach(c=>{var p;const m=(p=c.nome)==null?void 0:p.toLowerCase().trim();if(!m)return;a[m]||(a[m]={nome:c.nome,marca:c.marca,qtd:0,notas:0,units:[]}),a[m].qtd+=c.quantidade||1,a[m].notas+=1,a[m].units.push(c.valorUnitario||0);const r=(c.nome||"").split(" ")[0].toUpperCase();o[r]||(o[r]={});const u=c.marca||"Genérica";o[r][u]||(o[r][u]=[]),o[r][u].push(c.valorUnitario||0)})});const s=Object.values(a).filter(n=>n.notas>1).sort((n,c)=>c.notas-n.notas);t.innerHTML=s.length?`<div class="table-responsive"><table class="custom-table">
        <thead><tr><th>Item</th><th>Marca</th><th>Compras</th><th class="num">Qtd Total</th><th class="num">Média Unitária</th></tr></thead>
        <tbody>${s.map(n=>{const c=n.units.reduce((m,r)=>m+r,0)/n.units.length;return`<tr>
            <td><strong>${n.nome}</strong></td>
            <td><span class="badge amber">${n.marca||"—"}</span></td>
            <td><span class="badge green">${n.notas}x</span></td>
            <td class="num">${n.qtd}</td>
            <td class="num">${i(c)}</td>
          </tr>`}).join("")}</tbody>
      </table></div>`:'<div class="empty-state">Adicione notas para ver a recorrência de itens.</div>';const d=Object.entries(o).filter(([,n])=>Object.keys(n).length>1).map(([n,c])=>{let m=1/0,r="";const u=Object.entries(c).map(([p,$])=>{const b=$.reduce((h,y)=>h+y,0)/$.length;return b<m&&(m=b,r=p),{marca:p,med:b}});return`<div class="brand-card">
      <div class="brand-card-header">
        <span class="card-title">${n}</span>
        <span class="badge green">🏆 Menor preço: ${r} (${i(m)}/un)</span>
      </div>
      <div class="brands-row">
        ${u.map(p=>`<div class="brand-chip${p.marca===r?" best":""}">
          <div class="bc-name">${p.marca} ${p.marca===r?"✅":""}</div>
          <div class="bc-val">${i(p.med)}<span style="font-size:.7rem;font-weight:400">/un</span></div>
        </div>`).join("")}
      </div>
    </div>`}).join("");e.innerHTML=d||'<div class="empty-state">Ao comprar o mesmo tipo de produto com marcas diferentes, o sistema mostrará qual teve menor preço.</div>'}document.getElementById("btn-modal-close").addEventListener("click",()=>{document.getElementById("modal-cors").classList.remove("active")});
