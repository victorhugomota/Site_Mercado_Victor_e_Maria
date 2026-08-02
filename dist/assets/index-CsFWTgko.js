import{initializeApp as Bt}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";import{getFirestore as Mt,onSnapshot as X,query as Lt,collection as j,orderBy as St,doc as F,setDoc as ot,addDoc as nt,deleteDoc as st,serverTimestamp as Dt}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const d of s)if(d.type==="childList")for(const o of d.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function a(s){const d={};return s.integrity&&(d.integrity=s.integrity),s.referrerPolicy&&(d.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?d.credentials="include":s.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function n(s){if(s.ep)return;s.ep=!0;const d=a(s);fetch(s.href,d)}})();const gt=document.createElement("script");gt.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js";document.head.appendChild(gt);const vt=document.createElement("script");vt.src="https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js";document.head.appendChild(vt);const Tt={apiKey:"AIzaSyANpFnEIkyN1XCT6qbtmVR9wx7sQHEsyrE",authDomain:"comprasmercado-23913.firebaseapp.com",projectId:"comprasmercado-23913",storageBucket:"comprasmercado-23913.firebasestorage.app",messagingSenderId:"317518149234",appId:"1:317518149234:web:94f38624d68a2b9a6634eb",measurementId:"G-2XP88EK37S"},qt=Bt(Tt),I=Mt(qt),rt="compras",Z="entradas",dt="faturas",ft="reservas";let C=[],D=[],N=[],at={metaMensal:0,valorAtualGuardado:0},et=null,T=null,B=[],Y=0,_=!1,O=[];function r(t){return Number(t||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}function x(t){if(typeof t=="number")return t;if(!t)return 0;const e=parseFloat(String(t).replace(/R\$\s?/gi,"").replace(/\s/g,"").replace(/\./g,"").replace(",","."));return isNaN(e)?0:e}function it(t){if(!t)return"—";try{return new Date(t).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}catch{return t}}function b(t,e=3500){const a=document.getElementById("toast");a.textContent=t,a.classList.add("show"),setTimeout(()=>a.classList.remove("show"),e)}function E(t,e="var(--accent-amber)"){const a=document.getElementById("status-msg");a&&(a.textContent=t,a.style.color=e)}function Ot(t){if(!t)return new Date().toISOString().slice(0,16);try{const e=new Date(t);if(isNaN(e.getTime()))return new Date().toISOString().slice(0,16);const a=n=>String(n).padStart(2,"0");return`${e.getFullYear()}-${a(e.getMonth()+1)}-${a(e.getDate())}T${a(e.getHours())}:${a(e.getMinutes())}`}catch{return new Date().toISOString().slice(0,16)}}function Ft(t,e){let a=0;const n=new Date(t,e+1,0).getDate();for(let s=1;s<=n;s++){const d=new Date(t,e,s).getDay();d!==0&&d!==6&&a++}return a}window.goTab=function(t){document.querySelectorAll(".tab-content").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".desktop-nav .nav-item").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".mobile-nav .mob-btn").forEach(a=>a.classList.remove("active"));const e=document.getElementById("tab-"+t);e&&e.classList.add("active"),document.querySelectorAll(`[data-tab="${t}"]`).forEach(a=>a.classList.add("active"))};document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>goTab(t.getAttribute("data-tab")))});document.querySelectorAll(".sub-item").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".sub-item").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".sub-tab-content").forEach(a=>a.style.display="none"),t.classList.add("active");const e=document.getElementById("sub-"+t.getAttribute("data-sub"));e&&(e.style.display="block")})});function ht(){document.getElementById("modal-add-nota").classList.add("active")}function bt(){_&&ct(),document.getElementById("modal-add-nota").classList.remove("active")}var mt;(mt=document.getElementById("btn-open-modal-home"))==null||mt.addEventListener("click",ht);var ut;(ut=document.getElementById("btn-mercado-add-nota"))==null||ut.addEventListener("click",ht);var pt;(pt=document.getElementById("btn-close-modal-add"))==null||pt.addEventListener("click",bt);X(Lt(j(I,rt),St("dataEmissao","desc")),t=>{C=t.docs.map(e=>({id:e.id,...e.data()})),J()},t=>console.error("Firestore Mercado:",t));X(j(I,Z),t=>{D=t.docs.map(e=>({id:e.id,...e.data()})),J()},t=>console.error("Firestore Entradas:",t));X(j(I,dt),t=>{N=t.docs.map(e=>({id:e.id,...e.data()})),J()},t=>console.error("Firestore Faturas:",t));X(F(I,ft,"config"),t=>{t.exists()&&(at=t.data()),J()},t=>console.error("Firestore Reservas:",t));function J(){Pt(),Rt(),kt(),jt(),Gt(),_t(),Zt(),Nt()}function Pt(){let t=D.reduce((i,u)=>i+(u.valor||0),0),e=N.reduce((i,u)=>i+(u.valor||0),0),a=0,n=0,s=0,d=0,o=0;const c={};C.forEach(i=>{const u=i.valorAPagar||0;d+=i.descontoTotal||0,o+=i.qtdTotalItens||0,i.formasPagamento&&(n+=i.formasPagamento.valeAlimentacao||0,s+=i.formasPagamento.cartaoCredito||0,a+=i.formasPagamento.cartaoDebito||0);const p=i.mesAno||"Outros";c[p]=(c[p]||0)+u});let m=t-e-a;document.getElementById("fin-total-entradas").textContent=r(t),document.getElementById("fin-total-cartoes").textContent=r(e),document.getElementById("fin-mercado-debito").textContent=r(a),document.getElementById("fin-saldo-liquido").textContent=r(m),document.getElementById("dash-alimentacao").textContent=r(n),document.getElementById("dash-credito").textContent=r(s),document.getElementById("dash-debito").textContent=r(a),yt(c)}function yt(t){var d;if(typeof Chart>"u")return setTimeout(()=>yt(t),300);const e=(d=document.getElementById("chart-barras"))==null?void 0:d.getContext("2d");if(!e)return;const a=Object.keys(t).sort(),n=a.map(o=>{const[c,m]=o.split("-");return`${m}/${c}`}),s=a.map(o=>t[o]);et&&et.destroy(),et=new Chart(e,{type:"bar",data:{labels:n.length?n:["Sem compras"],datasets:[{label:"Gasto Mercado R$",data:s.length?s:[0],backgroundColor:"rgba(16,185,129,0.78)",borderColor:"#10b981",borderWidth:2,borderRadius:8}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:o=>` ${r(o.raw)}`}}},scales:{y:{beginAtZero:!0,grid:{color:"rgba(255,255,255,.05)"},ticks:{color:"#94a3b8",callback:o=>"R$"+o}},x:{grid:{display:!1},ticks:{color:"#94a3b8"}}}}})}function Et(t){if(!t)return 0;const e=t.match(/L[íi]quido(?:\s*a\s*receber)?\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/TOTAL\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/SAL[ÁA]RIO\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/VALOR\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i);return e?x(e[1]):0}document.getElementById("form-holerite-victor").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-holerite-txt-victor").value;let a=parseFloat(document.getElementById("inp-salario-val-victor").value)||0;if(!a&&e&&(a=Et(e)),!a){b("⚠️ Digite ou cole um holerite válido com valor.");return}await ot(F(I,Z,"salario_victor"),{pessoa:"Victor",tipo:"holerite",descricao:"Salário Líquido Victor",valor:a,data:new Date().toISOString()}),b("✅ Salário do Victor salvo!")});document.getElementById("form-holerite-maria").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-holerite-txt-maria").value;let a=parseFloat(document.getElementById("inp-salario-val-maria").value)||0;if(!a&&e&&(a=Et(e)),!a){b("⚠️ Digite ou cole um holerite válido com valor.");return}await ot(F(I,Z,"salario_maria"),{pessoa:"Maria",tipo:"holerite",descricao:"Salário Líquido Maria",valor:a,data:new Date().toISOString()}),b("✅ Salário da Maria salvo!")});document.getElementById("form-entrada-manual").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-ent-desc").value.trim(),a=parseFloat(document.getElementById("inp-ent-val").value)||0,n=document.getElementById("inp-ent-pessoa").value;!e||!a||(await nt(j(I,Z),{pessoa:n,tipo:"manual",descricao:e,valor:a,data:new Date().toISOString()}),t.target.reset(),b("🎉 Entrada manual registrada!"))});function Rt(){var s,d;const t=((s=D.find(o=>o.id==="salario_victor"))==null?void 0:s.valor)||0,e=((d=D.find(o=>o.id==="salario_maria"))==null?void 0:d.valor)||0,a=D.reduce((o,c)=>o+(c.valor||0),0);document.getElementById("val-salario-victor").textContent=r(t),document.getElementById("val-salario-maria").textContent=r(e),document.getElementById("val-entradas-combinado").textContent=r(a);const n=document.getElementById("lista-entradas-registradas");if(!D.length){n.innerHTML='<div class="empty-state">Nenhuma entrada cadastrada ainda.</div>';return}n.innerHTML=`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Descrição</th><th>Pessoa</th><th>Tipo</th><th class="num">Valor</th><th>Ação</th></tr></thead>
    <tbody>${D.map(o=>`<tr>
      <td><strong>${o.descricao}</strong></td>
      <td><span class="badge ${o.pessoa==="Victor"?"green":o.pessoa==="Maria"?"purple":"cyan"}">${o.pessoa}</span></td>
      <td><span class="badge amber">${o.tipo==="holerite"?"Holerite":"Manual"}</span></td>
      <td class="num" style="color:#34d399"><strong>${r(o.valor)}</strong></td>
      <td><button class="btn-danger" onclick="excluirEntrada('${o.id}')">🗑️</button></td>
    </tr>`).join("")}</tbody>
  </table></div>`}window.excluirEntrada=async function(t){confirm("Excluir esta entrada?")&&(await st(F(I,Z,t)),b("🗑️ Entrada removida."))};function Ut(t,e){const a=[],n=t.split(`
`),s=/(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+R?\$\s*([\d\.,]+)/i;return n.forEach(d=>{const o=d.trim().match(s);if(o){const c=o[2].trim(),m=x(o[3]);c&&m>0&&a.push({cartao:e||"Cartão",descricao:c,valor:m,data:new Date().toISOString()})}}),a}document.getElementById("form-fatura-cartao").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-cartao-nome").value,a=document.getElementById("inp-fatura-txt").value,n=Ut(a,e);if(!n.length){b('⚠️ Nenhuma compra identificada no texto da fatura. Cole o texto da fatura no formato "05/08 Uber R$ 24,90".');return}for(const s of n)await nt(j(I,dt),s);document.getElementById("inp-fatura-txt").value="",b(`🎉 ${n.length} compras da fatura do ${e} importadas!`)});function kt(){const t=N.reduce((a,n)=>a+(n.valor||0),0);document.getElementById("badge-total-cartoes").textContent=`${r(t)} total`;const e=document.getElementById("lista-faturas-registradas");if(!N.length){e.innerHTML='<div class="empty-state">Nenhuma fatura ou compra em cartão importada ainda.</div>';return}e.innerHTML=`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Cartão</th><th>Descrição</th><th>Data</th><th class="num">Valor</th><th>Ação</th></tr></thead>
    <tbody>${N.map(a=>`<tr>
      <td><span class="badge rose">${a.cartao||"Cartão"}</span></td>
      <td><strong>${a.descricao}</strong></td>
      <td>${it(a.data)}</td>
      <td class="num" style="color:#fb7185"><strong>${r(a.valor)}</strong></td>
      <td><button class="btn-danger" onclick="excluirFatura('${a.id}')">🗑️</button></td>
    </tr>`).join("")}</tbody>
  </table></div>`}window.excluirFatura=async function(t){confirm("Excluir este lançamento de cartão?")&&(await st(F(I,dt,t)),b("🗑️ Lançamento de cartão removido."))};document.getElementById("form-config-reservas").addEventListener("submit",async t=>{t.preventDefault();const e=parseFloat(document.getElementById("inp-meta-mensal").value)||0,a=parseFloat(document.getElementById("inp-saldo-guardado").value)||0;await ot(F(I,ft,"config"),{metaMensal:e,valorAtualGuardado:a,dataAtualizacao:new Date().toISOString()}),b("✅ Reservas e economias atualizadas!")});function Nt(){const t=at.metaMensal||0,e=at.valorAtualGuardado||0;document.getElementById("val-meta-reserva").textContent=r(t),document.getElementById("val-real-guardado").textContent=r(e);const a=D.reduce((i,u)=>i+(u.valor||0),0),n=N.reduce((i,u)=>i+(u.valor||0),0);let s=0;C.forEach(i=>{i.formasPagamento&&(s+=i.formasPagamento.cartaoDebito||0)});const d=a-n-s,o=d>0?Math.max(d*.5,a*.2):0;document.getElementById("val-recomendacao-reserva").textContent=r(o);const c=document.getElementById("box-analise-reserva-detalhes");if(a===0){c.innerHTML='<p class="empty-state">Cadastre seus salários e entradas na aba "Salários & Entradas" para gerar o diagnóstico inteligente de economias.</p>';return}const m=t>0?Math.min(100,e/t*100).toFixed(1):0;c.innerHTML=`
    <p> Com base nos seus <strong>${r(a)}</strong> de Entradas, <strong>${r(n)}</strong> de Faturas de Cartão e <strong>${r(s)}</strong> de Mercado no Débito:</p>
    <div style="background:rgba(15,23,42,0.6);padding:1rem;border-radius:10px;margin:.75rem 0;border:1px solid var(--border-color)">
      <div style="display:flex;justify-content:space-between;margin-bottom:.4rem">
        <span>💰 Saldo Livre em Conta: <strong>${r(d)}</strong></span>
        <span>💡 Recomendação de Reserva: <strong style="color:#c084fc">${r(o)}/mês</strong></span>
      </div>
      <div class="progress-bar-bg">
        <div class="progress-bar-fill" style="width:${m}%"></div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:.78rem;color:var(--text-muted);margin-top:.4rem">
        <span>Guardado: ${r(e)}</span>
        <span>Meta Pessoal: ${r(t)} (${m}%)</span>
      </div>
    </div>
    <p style="font-size:.84rem;color:var(--text-muted)">
      💡 <strong>Dica de Inteligência Financeira:</strong> Como o Vale Alimentação e o Crédito no Mercado não saem do seu salário em conta, eles protegem sua renda real! O sistema recomenda destinar pelo menos 50% do seu saldo livre líquido (<strong>${r(o)}</strong>) para sua reserva de emergência e investimentos.
    </p>
  `}function jt(){const t=document.getElementById("lista-mensal-container");if(!t)return;const e=new Date,a=new Date(e.getFullYear(),e.getMonth()+1,1),n=a.toLocaleString("pt-BR",{month:"long"}),s=a.getFullYear(),d=`${n.charAt(0).toUpperCase()+n.slice(1)} de ${s}`,o=Ft(a.getFullYear(),a.getMonth()),c=31.8,m=20,i=o*c,u=o*m,p={};let $=0;C.forEach(l=>{const g=l.valorAPagar||0;$+=g;const v=l.mesAno||"Outros";p[v]=(p[v]||0)+g});const h=Math.max(1,Object.keys(p).length),f=$/h,y={};C.forEach(l=>{(l.itens||[]).forEach(g=>{const v=(g.nome||"").toLowerCase().trim();v&&(y[v]||(y[v]={nome:g.nome,marca:g.marca||"Geral",qtdTotal:0,frequenciaNotas:0,valoresUnitarios:[]}),y[v].qtdTotal+=g.quantidade||1,y[v].frequenciaNotas+=1,g.valorUnitario&&y[v].valoresUnitarios.push(g.valorUnitario))})});const M=Object.values(y).map(l=>{const g=l.valoresUnitarios.length>0?l.valoresUnitarios.reduce((G,W)=>G+W,0)/l.valoresUnitarios.length:0,v=l.qtdTotal/h,k=h/Math.max(1,l.frequenciaNotas),K=l.frequenciaNotas/h;let A=0;K>=.35||v>=.7?A=Math.ceil(v):A=Math.round(v),A<1&&l.frequenciaNotas>=h&&(A=1);const Q=A*g;return{nome:l.nome,marca:l.marca,frequenciaNotas:l.frequenciaNotas,intervaloMeses:k,qtdMensalTaxa:v,totalEstimadoUnidades:A,valorUnitario:g,subtotalCalculado:Q}}).filter(l=>l.totalEstimadoUnidades>0);M.sort((l,g)=>g.frequenciaNotas-l.frequenciaNotas);const w=M.reduce((l,g)=>l+g.subtotalCalculado,0),H=f>0?f*1.05:w;let V=1;w>H&&f>0&&(V=H/w);const z=M.map(l=>({...l,subtotalFinal:l.subtotalCalculado*V})),P=f>0?Math.min(w,H):w;let L=P;const R=Math.min(L,i);L-=R;const U=Math.min(L,u);L-=U;const q=L>0?L:0;let S=`
    <div class="card" style="margin-bottom:1.5rem; background: linear-gradient(135deg, rgba(30,41,59,0.9), rgba(15,23,42,0.95)); border: 1px solid #3b82f6;">
      <div class="card-header">
        <div>
          <span class="card-title" style="color:#60a5fa;">📅 Previsão de Compras — ${d}</span>
          <p class="card-subtext" style="color:#cbd5e1; margin-top:0.25rem;">
            Calculado com unidades inteiras exatas (${o} dias úteis em ${n}).
          </p>
        </div>
        <span class="badge green" style="font-size:0.8rem; padding:0.4rem 0.75rem;">${o} Dias Úteis</span>
      </div>

      <div class="payment-grid" style="margin-top:1rem;">
        <div class="payment-item" style="border-color: rgba(16,185,129,0.4);">
          <div class="p-label">🍽️ Vale Alimentação (${o}d × R$ 31,80)</div>
          <div class="p-val" style="color:#34d399;">${r(R)} <span style="font-size:0.75rem;font-weight:normal;color:var(--text-muted)">/ ${r(i)}</span></div>
        </div>
        <div class="payment-item" style="border-color: rgba(99,102,241,0.4);">
          <div class="p-label">💳 Cartão Crédito (${o}d × R$ 20,00)</div>
          <div class="p-val" style="color:#818cf8;">${r(U)} <span style="font-size:0.75rem;font-weight:normal;color:var(--text-muted)">/ ${r(u)}</span></div>
        </div>
        <div class="payment-item" style="border-color: ${q>0?"rgba(244,63,94,0.5)":"var(--border-color)"};">
          <div class="p-label">💳 Débito Necessário (Excedente)</div>
          <div class="p-val" style="color: ${q>0?"#fb7185":"var(--text-muted)"};">${r(q)}</div>
        </div>
      </div>

      <div style="margin-top:1.25rem; padding-top:1rem; border-top:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
        <div>
          <span style="font-size:0.85rem; color:var(--text-muted);">Total Estimado da Lista de Compras:</span>
          <p style="font-size:0.75rem; color:#60a5fa;">Média Histórica de Gastos: ${r(f)}</p>
        </div>
        <span style="font-size:1.6rem; font-weight:800; color:var(--primary);">${r(P)}</span>
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
  `;window.dadosListaMensalCache={mesAnoStr:d,diasUteis:o,totalGeralEstimado:P,cobertoAlim:R,cobertoCred:U,cobertoDeb:q,alimDisponivel:i,credDisponivel:u,lista:z},z.length===0?S+='<div class="empty-state">Adicione notas fiscais para que o sistema gere automaticamente sua lista mensal de compras.</div></div>':S+=`
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
            ${z.map(l=>{const g=l.intervaloMeses>1.2?`A cada ${l.intervaloMeses.toFixed(1)} meses`:`Todo mês (${l.frequenciaNotas}x)`,v=l.qtdMensalTaxa<1?l.qtdMensalTaxa.toFixed(2):l.qtdMensalTaxa.toFixed(1),k=l.totalEstimadoUnidades.toFixed(1);return`
                <tr>
                  <td><strong>${l.nome}</strong></td>
                  <td><span class="badge amber">${l.marca}</span></td>
                  <td><span class="badge cyan">${g}</span></td>
                  <td class="num">${v} un/mês</td>
                  <td class="num"><span class="badge green" style="font-size:0.82rem;">${k}</span></td>
                  <td class="num">${r(l.valorUnitario)}</td>
                  <td class="num"><strong>${r(l.subtotalFinal)}</strong></td>
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
    </div>`,t.innerHTML=S}window.exportarPDFListaMensal=function(){if(!window.dadosListaMensalCache||!window.dadosListaMensalCache.lista.length){b("⚠️ Nenhuma lista mensal disponível para exportar.");return}const{mesAnoStr:t,diasUteis:e,totalGeralEstimado:a,cobertoAlim:n,cobertoCred:s,cobertoDeb:d,lista:o}=window.dadosListaMensalCache,c=window.open("","_blank","width=900,height=750");if(!c){alert("Permita pop-ups no navegador para gerar o PDF da lista.");return}const m=`
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
          <div class="val">${r(n)}</div>
        </div>
        <div class="res-item">
          <div class="label">💳 Cartão Crédito</div>
          <div class="val">${r(s)}</div>
        </div>
        <div class="res-item">
          <div class="label">💳 Débito (Excedente)</div>
          <div class="val">${r(d)}</div>
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
          ${o.map(i=>`
            <tr>
              <td class="check-col"><div class="chk-box"></div></td>
              <td><strong>${i.nome}</strong></td>
              <td>${i.marca}</td>
              <td class="num"><strong>${i.totalEstimadoUnidades.toFixed(1)} un</strong></td>
              <td class="num">${r(i.valorUnitario)}</td>
              <td class="num"><strong>${r(i.subtotalFinal)}</strong></td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <div class="total-footer">
        <span>Total Estimado da Compra:</span>
        <span style="font-size:18px; color:#059669;">${r(a)}</span>
      </div>

      <script>
        window.onload = function() {
          setTimeout(function() { window.print(); }, 350);
        };
      <\/script>
    </body>
    </html>
  `;c.document.open(),c.document.write(m),c.document.close()};document.getElementById("btn-start-cam").addEventListener("click",It);document.getElementById("btn-switch-cam").addEventListener("click",Ht);document.getElementById("btn-stop-cam").addEventListener("click",ct);async function It(){if(typeof Html5Qrcode>"u")return E("Carregando biblioteca de câmera, aguarde..."),setTimeout(It,600);try{T||(T=new Html5Qrcode("qr-reader")),B=await Html5Qrcode.getCameras();let t;if(B&&B.length>0){const e=B.findIndex(a=>/back|traseira|rear|environment/i.test(a.label));Y=e>=0?e:0,t=B[Y].id}else t={facingMode:"environment"};await T.start(t,{fps:10,qrbox:{width:240,height:240}},xt,()=>{}),_=!0,document.getElementById("btn-start-cam").style.display="none",document.getElementById("btn-switch-cam").style.display=B.length>1?"inline-flex":"none",document.getElementById("btn-stop-cam").style.display="inline-flex"}catch(t){E("❌ Não foi possível acessar a câmera. Verifique as permissões do navegador."),console.error(t)}}async function Ht(){if(!(!T||!_))try{await T.stop(),B.length>1&&(Y=(Y+1)%B.length,await T.start(B[Y].id,{fps:10,qrbox:{width:240,height:240}},xt,()=>{}))}catch(t){console.error("switchCam:",t)}}async function ct(){if(T&&_)try{await T.stop()}catch{}_=!1,document.getElementById("btn-start-cam").style.display="inline-flex",document.getElementById("btn-switch-cam").style.display="none",document.getElementById("btn-stop-cam").style.display="none"}async function xt(t){ct(),document.getElementById("inp-url").value=t,E("✅ QR Code lido! Processando..."),await Ct(t)}document.getElementById("btn-carregar-dados").addEventListener("click",async()=>{const t=document.getElementById("inp-url").value.trim(),e=document.getElementById("inp-html").value.trim();if(!t&&!e){E("⚠️ Cole a URL do QR Code ou o conteúdo da página para ler a nota fiscal.");return}if(t&&!e){E("⏳ Consultando nota fiscal..."),await Ct(t);return}if(e){E("⏳ Processando conteúdo..."),await wt(e);return}});document.getElementById("btn-preencher-manual").addEventListener("click",()=>{$t({nomeMercado:"",dataEmissao:new Date().toISOString(),valorTotal:0,descontoTotal:0,valorAPagar:0,qtdTotalItens:0,formasPagamento:{valeAlimentacao:0,cartaoCredito:0,cartaoDebito:0},itens:[]}),E("✍️ Preencha os dados da compra abaixo e clique em Salvar Nota Fiscal.","var(--accent-cyan)")});function $t(t){var d,o,c;document.getElementById("inp-mercado").value=t.nomeMercado||"",document.getElementById("inp-data").value=Ot(t.dataEmissao),document.getElementById("inp-vtotal").value=t.valorTotal!==void 0?t.valorTotal:0,document.getElementById("inp-desconto").value=t.descontoTotal!==void 0?t.descontoTotal:0,document.getElementById("inp-pagar").value=t.valorAPagar!==void 0?t.valorAPagar:0,document.getElementById("inp-qtd").value=t.qtdTotalItens!==void 0?t.qtdTotalItens:0,document.getElementById("inp-alim").value=((d=t.formasPagamento)==null?void 0:d.valeAlimentacao)||0,document.getElementById("inp-cred").value=((o=t.formasPagamento)==null?void 0:o.cartaoCredito)||0,document.getElementById("inp-deb").value=((c=t.formasPagamento)==null?void 0:c.cartaoDebito)||0,O=t.itens||[];const e=document.getElementById("form-nfce");e.style.display="block";const a=document.getElementById("preview-itens-box"),n=document.getElementById("count-preview-itens"),s=document.getElementById("lista-preview-itens");O.length>0?(a.style.display="block",n.textContent=O.length,s.innerHTML=O.map(m=>`
      <div style="display:flex; justify-content:space-between; padding: 0.35rem 0; border-bottom: 1px dashed var(--border-color);">
        <span><strong>${m.nome}</strong> (${m.quantidade} ${m.unidade||"Un"})</span>
        <span>${r(m.valorUnitario)}/un = <strong>${r(m.valorTotal)}</strong></span>
      </div>
    `).join("")):a.style.display="none",e.scrollIntoView({behavior:"smooth"})}document.getElementById("form-nfce").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-mercado").value.trim()||"Mercado",a=document.getElementById("inp-data").value||new Date().toISOString(),n=parseFloat(document.getElementById("inp-vtotal").value)||0,s=parseFloat(document.getElementById("inp-desconto").value)||0,d=parseFloat(document.getElementById("inp-pagar").value)||0,o=parseInt(document.getElementById("inp-qtd").value)||0,c=parseFloat(document.getElementById("inp-alim").value)||0,m=parseFloat(document.getElementById("inp-cred").value)||0,i=parseFloat(document.getElementById("inp-deb").value)||0,u=new Date(a).toISOString().slice(0,16),p=C.find(f=>{const y=new Date(f.dataEmissao).toISOString().slice(0,16),M=Math.abs((f.valorAPagar||0)-d)<.05,w=(f.nomeMercado||"").toLowerCase().trim()===e.toLowerCase().trim();return y===u&&M&&w});if(p){E(`⚠️ Esta nota fiscal já existe no sistema (Cadastrada em ${it(p.dataEmissao)} no valor de ${r(p.valorAPagar)}). Nota não adicionada!`,"#fb7185"),b("⚠️ Nota fiscal já cadastrada! Operação cancelada.");return}const $=new Date(a),h=`${$.getFullYear()}-${String($.getMonth()+1).padStart(2,"0")}`;E("⏳ Salvando nota fiscal no banco...");try{await nt(j(I,rt),{nomeMercado:e,dataEmissao:a,mesAno:h,qtdTotalItens:o||O.length,valorTotal:n,descontoTotal:s,valorAPagar:d,formasPagamento:{valeAlimentacao:c,cartaoCredito:m,cartaoDebito:i},itens:O,createdAt:Dt()}),E("✅ Nota salva com sucesso!","#34d399"),document.getElementById("form-nfce").style.display="none",document.getElementById("form-nfce").reset(),document.getElementById("inp-url").value="",document.getElementById("inp-html").value="",O=[],bt(),goTab("dashboard"),b("🎉 Nota fiscal registrada no Firebase!")}catch(f){E("❌ Erro ao salvar: "+f.message,"#fb7185")}});async function Ct(t){const e=[a=>`https://api.allorigins.win/raw?url=${encodeURIComponent(a)}`,a=>`https://corsproxy.io/?${encodeURIComponent(a)}`];for(const a of e)try{const n=await fetch(a(t),{signal:AbortSignal.timeout(8e3)});if(n.ok){const s=await n.text();if(s&&s.length>200){await wt(s);return}}}catch{}Vt(t)}function Vt(t){document.getElementById("modal-link").href=t,document.getElementById("modal-cors").classList.add("active"),E("⚠️ Abra o link, copie o conteúdo da página e cole no campo de texto abaixo.")}async function wt(t){const e=zt(t);$t(e),E("✅ Nota lida com sucesso! Confira os valores abaixo e altere se necessário antes de Salvar.","#34d399")}function zt(t){var R,U,q;const a=new DOMParser().parseFromString(t,"text/html"),n=((R=a.body)==null?void 0:R.textContent)||t;let s=((q=(U=a.querySelector(".txtTopo, .nomeEmit, h1"))==null?void 0:U.textContent)==null?void 0:q.trim())||"Mercado",d=new Date().toISOString();const o=n.match(/Emiss[ãa]o\s*[:\-]?\s*(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})?/i)||n.match(/(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})/);if(o){const[S,l,g]=o[1].split("/");d=`${g}-${l}-${S}T${o[2]||"12:00:00"}`}const c=n.match(/Qtd\.?\s*total\s*de\s*itens\s*[:\s]*([\d,\.]+)/i),m=n.match(/Valor\s*total\s*R\$\s*[:\s]*([\d\.,]+)/i),i=n.match(/Descontos?\s*R\$\s*[:\s]*([\d\.,]+)/i),u=n.match(/Valor\s*a\s*pagar\s*R\$\s*[:\s]*([\d\.,]+)/i)||n.match(/VALOR\s*PAGO\s*R\$\s*[:\s]*([\d\.,]+)/i),p=n.match(/(?:Vale\s*)?Alimenta[çc][ãa]o\s*[:\s]*([\d\.,]+)/i),$=n.match(/(?:Cart[ãa]o\s*de\s*)?Cr[eé]dito\s*[:\s]*([\d\.,]+)/i),h=n.match(/(?:Cart[ãa]o\s*de\s*)?D[eé]bito\s*[:\s]*([\d\.,]+)/i),f=c?x(c[1]):0,y=m?x(m[1]):0,M=i?x(i[1]):0;let w=u?x(u[1]):y-M;const H={valeAlimentacao:p?x(p[1]):0,cartaoCredito:$?x($[1]):0,cartaoDebito:h?x(h[1]):0},V=[];a.querySelectorAll("tr, .item, .itemNota").forEach(S=>{var lt;const l=S.textContent;if(!/Vl\.\s*Unit|valorUnitario|Qtde?\./i.test(l))return;const g=S.querySelector(".txtTit, .txtTit2, .nomeProd"),v=((lt=g==null?void 0:g.textContent)==null?void 0:lt.trim())||"",k=l.match(/Qtde?\.\s*[:\s]*([\d,\.]+)/i),K=l.match(/Vl\.\s*Unit\.\s*[:\s]*([\d,\.]+)/i),A=l.match(/Vl\.\s*Total\s*([\d,\.]+)/i),Q=l.match(/C[oó]digo\s*[:\s]*(\d+)/i),G=l.match(/UN\s*[:\s]*([A-Za-z]+)/i),W=k?x(k[1]):1,tt=K?x(K[1]):0,At=A?x(A[1]):tt*W;v&&tt>0&&V.push({codigo:(Q==null?void 0:Q[1])||"",nome:v,marca:Qt(v),quantidade:W,unidade:(G==null?void 0:G[1])||"Un",valorUnitario:tt,valorTotal:At})});const P=new Date(d),L=`${P.getFullYear()}-${String(P.getMonth()+1).padStart(2,"0")}`;return{nomeMercado:s,dataEmissao:d,mesAno:L,qtdTotalItens:f,valorTotal:y,descontoTotal:M,valorAPagar:w,formasPagamento:H,itens:V}}function Qt(t){const e=["BAUDUCCO","BAUD","PANCO","DANONE","NESTLE","QUALITA","SADIA","PERDIGAO","SEARA","CAMIL","TIO JOAO","URBANO","LIZA","SOYA","YPE","PILAO","MELITTA","3 CORACOES","VIGOR","PARMALAT","ITALAC","HEINZ","KRAFT"],a=t.toUpperCase();for(const n of e)if(a.includes(n))return n;return a.split(" ")[0]||"Genérica"}function Gt(){const t=document.getElementById("lista-historico");if(!C.length){t.innerHTML='<div class="empty-state">📭 Nenhuma compra cadastrada ainda.</div>';return}t.innerHTML=C.map(e=>{var a,n,s;return`
    <div class="purchase-card">
      <div class="purchase-header" onclick="toggleDetail('${e.id}')">
        <div class="purchase-info">
          <h3>${e.nomeMercado||"Mercado"}</h3>
          <p>📅 ${it(e.dataEmissao)} &nbsp;•&nbsp; 🛒 ${e.qtdTotalItens||0} itens</p>
        </div>
        <div class="purchase-values">
          <div class="pv-total">${r(e.valorAPagar)}</div>
          <div class="pv-sub">Desc: ${r(e.descontoTotal)}</div>
        </div>
        <svg class="chevron" id="chev-${e.id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      <div class="purchase-details" id="detail-${e.id}">
        <div class="details-toolbar">
          <span class="card-subtext">Pagamentos: Alimentação ${r((a=e.formasPagamento)==null?void 0:a.valeAlimentacao)} · Crédito ${r((n=e.formasPagamento)==null?void 0:n.cartaoCredito)} · Débito ${r((s=e.formasPagamento)==null?void 0:s.cartaoDebito)}</span>
          <button class="btn-danger" onclick="confirmarExcluirMercado('${e.id}')">🗑️ Excluir</button>
        </div>
        ${Yt(e)}
      </div>
    </div>`}).join("")}function Yt(t){return!t.itens||!t.itens.length?'<p class="card-subtext">Nenhum item detalhado registrado.</p>':`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Item</th><th>Marca</th><th class="num">Qtd</th><th class="num">Vl. Unit.</th><th class="num">Vl. Total</th></tr></thead>
    <tbody>${t.itens.map(e=>`<tr>
      <td>${e.nome}</td>
      <td><span class="badge amber">${e.marca||"—"}</span></td>
      <td class="num">${e.quantidade} ${e.unidade||"Un"}</td>
      <td class="num">${r(e.valorUnitario)}</td>
      <td class="num"><strong>${r(e.valorTotal)}</strong></td>
    </tr>`).join("")}</tbody>
  </table></div>`}window.toggleDetail=function(t){const e=document.getElementById("detail-"+t),a=document.getElementById("chev-"+t);e&&e.classList.toggle("open"),a&&a.classList.toggle("open")};window.confirmarExcluirMercado=async function(t){if(confirm("Excluir esta compra de mercado?"))try{await st(F(I,rt,t)),b("🗑️ Compra excluída.")}catch(e){alert("Erro: "+e.message)}};function _t(){const t=document.getElementById("lista-comparacao"),e={};C.forEach(n=>{(n.itens||[]).forEach(s=>{var o;const d=((o=s.nome)==null?void 0:o.toLowerCase().trim())||"produto";e[d]||(e[d]={nome:s.nome,marca:s.marca,hist:{}}),e[d].hist[n.mesAno]=s.valorUnitario})});const a=Object.values(e);if(!a.length){t.innerHTML='<div class="empty-state">Adicione notas para ver a comparação de preços unitários.</div>';return}t.innerHTML=`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Produto</th><th>Marca</th><th>Histórico (Unitário)</th><th>Variação</th></tr></thead>
    <tbody>${a.map(n=>{const s=Object.keys(n.hist).sort();let d=s.map(c=>`${c}: <strong>${r(n.hist[c])}</strong>`).join(" → "),o='<span class="badge cyan">Estável</span>';if(s.length>=2){const c=n.hist[s[s.length-2]],i=n.hist[s[s.length-1]]-c,u=(i/c*100).toFixed(1);i>.01?o=`<span class="badge red">+${u}% ↑</span>`:i<-.01&&(o=`<span class="badge green">${u}% ↓</span>`)}return`<tr><td><strong>${n.nome}</strong></td><td><span class="badge amber">${n.marca||"—"}</span></td><td>${d}</td><td>${o}</td></tr>`}).join("")}</tbody>
  </table></div>`}function Zt(){const t=document.getElementById("lista-recorrencia"),e=document.getElementById("lista-marcas"),a={},n={};C.forEach(o=>{(o.itens||[]).forEach(c=>{var p;const m=(p=c.nome)==null?void 0:p.toLowerCase().trim();if(!m)return;a[m]||(a[m]={nome:c.nome,marca:c.marca,qtd:0,notas:0,units:[]}),a[m].qtd+=c.quantidade||1,a[m].notas+=1,a[m].units.push(c.valorUnitario||0);const i=(c.nome||"").split(" ")[0].toUpperCase();n[i]||(n[i]={});const u=c.marca||"Genérica";n[i][u]||(n[i][u]=[]),n[i][u].push(c.valorUnitario||0)})});const s=Object.values(a).filter(o=>o.notas>1).sort((o,c)=>c.notas-o.notas);t.innerHTML=s.length?`<div class="table-responsive"><table class="custom-table">
        <thead><tr><th>Item</th><th>Marca</th><th>Compras</th><th class="num">Qtd Total</th><th class="num">Média Unitária</th></tr></thead>
        <tbody>${s.map(o=>{const c=o.units.reduce((m,i)=>m+i,0)/o.units.length;return`<tr>
            <td><strong>${o.nome}</strong></td>
            <td><span class="badge amber">${o.marca||"—"}</span></td>
            <td><span class="badge green">${o.notas}x</span></td>
            <td class="num">${o.qtd}</td>
            <td class="num">${r(c)}</td>
          </tr>`}).join("")}</tbody>
      </table></div>`:'<div class="empty-state">Adicione notas para ver a recorrência de itens.</div>';const d=Object.entries(n).filter(([,o])=>Object.keys(o).length>1).map(([o,c])=>{let m=1/0,i="";const u=Object.entries(c).map(([p,$])=>{const h=$.reduce((f,y)=>f+y,0)/$.length;return h<m&&(m=h,i=p),{marca:p,med:h}});return`<div class="brand-card">
      <div class="brand-card-header">
        <span class="card-title">${o}</span>
        <span class="badge green">🏆 Menor preço: ${i} (${r(m)}/un)</span>
      </div>
      <div class="brands-row">
        ${u.map(p=>`<div class="brand-chip${p.marca===i?" best":""}">
          <div class="bc-name">${p.marca} ${p.marca===i?"✅":""}</div>
          <div class="bc-val">${r(p.med)}<span style="font-size:.7rem;font-weight:400">/un</span></div>
        </div>`).join("")}
      </div>
    </div>`}).join("");e.innerHTML=d||'<div class="empty-state">Ao comprar o mesmo tipo de produto com marcas diferentes, o sistema mostrará qual teve menor preço.</div>'}document.getElementById("btn-modal-close").addEventListener("click",()=>{document.getElementById("modal-cors").classList.remove("active")});
