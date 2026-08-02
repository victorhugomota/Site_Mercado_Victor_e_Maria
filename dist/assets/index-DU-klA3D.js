import{initializeApp as Nt}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";import{getFirestore as Vt,onSnapshot as et,query as kt,collection as q,orderBy as jt,doc as w,setDoc as at,addDoc as it,deleteDoc as G,serverTimestamp as ut}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function a(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(n){if(n.ep)return;n.ep=!0;const s=a(n);fetch(n.href,s)}})();const Et=document.createElement("script");Et.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js";document.head.appendChild(Et);const It=document.createElement("script");It.src="https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js";document.head.appendChild(It);const zt={apiKey:"AIzaSyANpFnEIkyN1XCT6qbtmVR9wx7sQHEsyrE",authDomain:"comprasmercado-23913.firebaseapp.com",projectId:"comprasmercado-23913",storageBucket:"comprasmercado-23913.firebasestorage.app",messagingSenderId:"317518149234",appId:"1:317518149234:web:94f38624d68a2b9a6634eb",measurementId:"G-2XP88EK37S"},Ht=Nt(zt),I=Vt(Ht),pt="compras",ot="entradas",K="faturas",X="boletos",$t="reservas";let C=[],T=[],N=[],V=[],mt={metaMensal:0,valorAtualGuardado:0},ct=null,O=null,D=[],J=0,tt=!1,U=[];function c(t){return Number(t||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}function x(t){if(typeof t=="number")return t;if(!t)return 0;const e=parseFloat(String(t).replace(/R\$\s?/gi,"").replace(/\s/g,"").replace(/\./g,"").replace(",","."));return isNaN(e)?0:e}function lt(t){if(!t)return"—";try{return new Date(t).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}catch{return t}}function v(t,e=3500){const a=document.getElementById("toast");a.textContent=t,a.classList.add("show"),setTimeout(()=>a.classList.remove("show"),e)}function B(t,e="var(--accent-amber)"){const a=document.getElementById("status-msg");a&&(a.textContent=t,a.style.color=e)}function Gt(t){if(!t)return new Date().toISOString().slice(0,16);try{const e=new Date(t);if(isNaN(e.getTime()))return new Date().toISOString().slice(0,16);const a=o=>String(o).padStart(2,"0");return`${e.getFullYear()}-${a(e.getMonth()+1)}-${a(e.getDate())}T${a(e.getHours())}:${a(e.getMinutes())}`}catch{return new Date().toISOString().slice(0,16)}}function Qt(t,e){let a=0;const o=new Date(t,e+1,0).getDate();for(let n=1;n<=o;n++){const s=new Date(t,e,n).getDay();s!==0&&s!==6&&a++}return a}window.goTab=function(t){document.querySelectorAll(".tab-content").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".desktop-nav .nav-item").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".mobile-nav .mob-btn").forEach(a=>a.classList.remove("active"));const e=document.getElementById("tab-"+t);e&&e.classList.add("active"),document.querySelectorAll(`[data-tab="${t}"]`).forEach(a=>a.classList.add("active"))};document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>goTab(t.getAttribute("data-tab")))});document.querySelectorAll(".sub-item").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".sub-item").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".sub-tab-content").forEach(a=>a.style.display="none"),t.classList.add("active");const e=document.getElementById("sub-"+t.getAttribute("data-sub"));e&&(e.style.display="block")})});function xt(){document.getElementById("modal-add-nota").classList.add("active")}function At(){tt&&gt(),document.getElementById("modal-add-nota").classList.remove("active")}var ht;(ht=document.getElementById("btn-open-modal-home"))==null||ht.addEventListener("click",xt);var bt;(bt=document.getElementById("btn-mercado-add-nota"))==null||bt.addEventListener("click",xt);var yt;(yt=document.getElementById("btn-close-modal-add"))==null||yt.addEventListener("click",At);et(kt(q(I,pt),jt("dataEmissao","desc")),t=>{C=t.docs.map(e=>({id:e.id,...e.data()})),nt()},t=>console.error("Firestore Mercado:",t));et(q(I,ot),t=>{T=t.docs.map(e=>({id:e.id,...e.data()})),nt()},t=>console.error("Firestore Entradas:",t));et(q(I,K),t=>{N=t.docs.map(e=>({id:e.id,...e.data()})),nt()},t=>console.error("Firestore Faturas:",t));et(q(I,X),t=>{V=t.docs.map(e=>({id:e.id,...e.data()})),nt()},t=>console.error("Firestore Boletos:",t));et(w(I,$t,"config"),t=>{t.exists()&&(mt=t.data()),nt()},t=>console.error("Firestore Reservas:",t));function nt(){Yt(),Zt(),te(),ne(),ie(),ue(),ve(),ge(),re()}function Yt(){let t=Tt(),e=t>0?t:T.reduce((f,g)=>f+(g.valor||0),0),a=N.reduce((f,g)=>f+(g.valorTotal!==void 0?g.valorTotal:g.valor||0),0),o=V.reduce((f,g)=>f+(g.valorTotal!==void 0?g.valorTotal:g.valor||0),0),n=0,s=0,r=0,l=0,m=0;const d={};C.forEach(f=>{const g=f.valorAPagar||0;l+=f.descontoTotal||0,m+=f.qtdTotalItens||0,f.formasPagamento&&(s+=f.formasPagamento.valeAlimentacao||0,r+=f.formasPagamento.cartaoCredito||0,n+=f.formasPagamento.cartaoDebito||0);const b=f.mesAno||"Outros";d[b]=(d[b]||0)+g});let i=e-a-o-n;document.getElementById("fin-total-entradas").textContent=c(e);const u=document.getElementById("fin-subtext-entradas");u&&(u.textContent="Média Mensal Combinada (Victor + Maria)"),document.getElementById("fin-total-cartoes").textContent=c(a),document.getElementById("fin-total-boletos").textContent=c(o),document.getElementById("fin-mercado-debito").textContent=c(n),document.getElementById("fin-saldo-liquido").textContent=c(i),document.getElementById("dash-alimentacao").textContent=c(s),document.getElementById("dash-credito").textContent=c(r),document.getElementById("dash-debito").textContent=c(n),Bt(d)}function Bt(t){var s;if(typeof Chart>"u")return setTimeout(()=>Bt(t),300);const e=(s=document.getElementById("chart-barras"))==null?void 0:s.getContext("2d");if(!e)return;const a=Object.keys(t).sort(),o=a.map(r=>{const[l,m]=r.split("-");return`${m}/${l}`}),n=a.map(r=>t[r]);ct&&ct.destroy(),ct=new Chart(e,{type:"bar",data:{labels:o.length?o:["Sem compras"],datasets:[{label:"Gasto Mercado R$",data:n.length?n:[0],backgroundColor:"rgba(16,185,129,0.78)",borderColor:"#10b981",borderWidth:2,borderRadius:8}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:r=>` ${c(r.raw)}`}}},scales:{y:{beginAtZero:!0,grid:{color:"rgba(255,255,255,.05)"},ticks:{color:"#94a3b8",callback:r=>"R$"+r}},x:{grid:{display:!1},ticks:{color:"#94a3b8"}}}}})}function wt(t){if(!t)return 0;const e=t.match(/L[íi]quido(?:\s*a\s*receber)?\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/TOTAL\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/SAL[ÁA]RIO\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/VALOR\s*L[IÍ]QUIDO\s*[:\s]*R?\$\s*([\d\.,]+)/i);return e?x(e[1]):0}function _t(){const t=document.getElementById("inp-entradas-mes-ano");if(t&&!t.value){const e=new Date,a=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0");t.value=`${a}-${o}`}}setTimeout(_t,300);document.getElementById("form-holerite-victor").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-entradas-mes-ano").value||new Date().toISOString().slice(0,7),a=document.getElementById("inp-holerite-txt-victor").value;let o=parseFloat(document.getElementById("inp-salario-val-victor").value)||0;if(!o&&a&&(o=wt(a)),!o){v("⚠️ Digite ou cole um holerite válido com valor.");return}const n=`salario_victor_${e}`;await at(w(I,ot,n),{pessoa:"Victor",tipo:"holerite",descricao:`Salário Líquido Victor (${e})`,valor:o,mesAno:e,data:new Date().toISOString()}),v(`✅ Salário do Victor (${e}) salvo!`)});document.getElementById("form-holerite-maria").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-entradas-mes-ano").value||new Date().toISOString().slice(0,7),a=document.getElementById("inp-holerite-txt-maria").value;let o=parseFloat(document.getElementById("inp-salario-val-maria").value)||0;if(!o&&a&&(o=wt(a)),!o){v("⚠️ Digite ou cole um holerite válido com valor.");return}const n=`salario_maria_${e}`;await at(w(I,ot,n),{pessoa:"Maria",tipo:"holerite",descricao:`Salário Líquido Maria (${e})`,valor:o,mesAno:e,data:new Date().toISOString()}),v(`✅ Salário da Maria (${e}) salvo!`)});document.getElementById("form-entrada-manual").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-entradas-mes-ano").value||new Date().toISOString().slice(0,7),a=document.getElementById("inp-ent-desc").value.trim(),o=parseFloat(document.getElementById("inp-ent-val").value)||0,n=document.getElementById("inp-ent-pessoa").value;!a||!o||(await it(q(I,ot),{pessoa:n,tipo:"manual",descricao:a,valor:o,mesAno:e,data:new Date().toISOString()}),t.target.reset(),v(`🎉 Entrada manual (${e}) registrada!`))});function Tt(){if(!T.length)return 0;const t={};T.forEach(o=>{const n=o.mesAno||(o.data?o.data.slice(0,7):"sem-mes");t[n]=(t[n]||0)+(o.valor||0)});const e=Object.keys(t);return e.length?Object.values(t).reduce((o,n)=>o+n,0)/e.length:0}function Zt(){var l,m,d;const t=((l=document.getElementById("inp-entradas-mes-ano"))==null?void 0:l.value)||new Date().toISOString().slice(0,7),e=document.getElementById("lbl-entradas-mes-ref");if(e){const[i,u]=t.split("-"),g=new Date(parseInt(i),parseInt(u)-1,1).toLocaleString("pt-BR",{month:"long"});e.textContent=`Referência: ${g.charAt(0).toUpperCase()+g.slice(1)}/${i}`}const a=((m=T.find(i=>i.pessoa==="Victor"&&i.tipo==="holerite"&&(i.mesAno===t||i.id==="salario_victor")))==null?void 0:m.valor)||0,o=((d=T.find(i=>i.pessoa==="Maria"&&i.tipo==="holerite"&&(i.mesAno===t||i.id==="salario_maria")))==null?void 0:d.valor)||0,s=T.filter(i=>i.mesAno===t||!i.mesAno&&(i.id==="salario_victor"||i.id==="salario_maria")).reduce((i,u)=>i+(u.valor||0),0);Tt(),document.getElementById("val-salario-victor").textContent=c(a),document.getElementById("val-salario-maria").textContent=c(o),document.getElementById("val-entradas-combinado").textContent=`${c(s)}`;const r=document.getElementById("lista-entradas-registradas");if(!T.length){r.innerHTML='<div class="empty-state">Nenhuma entrada cadastrada ainda.</div>';return}r.innerHTML=`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Mês / Ref</th><th>Descrição</th><th>Pessoa</th><th>Tipo</th><th class="num">Valor</th><th>Ação</th></tr></thead>
    <tbody>${T.map(i=>`<tr>
      <td><span class="badge green">${i.mesAno||"—"}</span></td>
      <td><strong>${i.descricao}</strong></td>
      <td><span class="badge ${i.pessoa==="Victor"?"green":i.pessoa==="Maria"?"purple":"cyan"}">${i.pessoa}</span></td>
      <td><span class="badge amber">${i.tipo==="holerite"?"Holerite":"Manual"}</span></td>
      <td class="num" style="color:#34d399"><strong>${c(i.valor)}</strong></td>
      <td><button class="btn-danger" onclick="excluirEntrada('${i.id}')">🗑️</button></td>
    </tr>`).join("")}</tbody>
  </table></div>`}window.excluirEntrada=async function(t){confirm("Excluir esta entrada?")&&(await G(w(I,ot,t)),v("🗑️ Entrada removida."))};let vt="Nubank",$=null;function Wt(){const t=document.getElementById("inp-fatura-vencimento");if(t&&!t.value){const e=new Date,a=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0");t.value=`${a}-${o}-10`,atualizarMesRefFatura()}}setTimeout(Wt,300);window.atualizarMesRefFatura=function(){const t=document.getElementById("inp-fatura-vencimento"),e=document.getElementById("lbl-fatura-mes-ref");if(!(!t||!e))if(t.value){const[a,o]=t.value.split("-"),s=new Date(parseInt(a),parseInt(o)-1,1).toLocaleString("pt-BR",{month:"long"});e.textContent=`Fatura ${s.charAt(0).toUpperCase()+s.slice(1)}/${a}`}else e.textContent="Mês da Fatura"};window.selecionarCartaoFatura=function(t){vt=t,document.querySelectorAll(".btn-card-select").forEach(a=>a.classList.remove("active"));const e=document.querySelector(`.btn-card-select[data-card="${t}"]`);e&&e.classList.add("active"),v(`Cartão selecionado: ${t}`)};window.handleFileFaturaSelect=async function(t){const e=t.target.files[0];if(!e)return;const a=document.getElementById("txt-file-fatura");a&&(a.textContent=`📄 Arquivo: ${e.name}`),v(`⏳ Lendo arquivo da fatura (${e.name})...`);let o="";if(e.type==="application/pdf"||e.name.endsWith(".pdf"))o=await Ct(e);else try{o=await e.text()}catch{o=""}o?(document.getElementById("inp-fatura-txt").value=o,await Mt(o,vt)):v("❌ Não foi possível ler o texto do arquivo da fatura.")};async function Ct(t){try{const e=await t.arrayBuffer();if(typeof pdfjsLib>"u")return v("⚠️ Aguarde a biblioteca de PDF carregar..."),"";pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";let a=pdfjsLib.getDocument({data:e});a.onPassword=(s,r)=>{let l=prompt(`🔒 Este PDF de fatura está protegido por senha.
Digite a senha para abrir (ex: CPF ou Data de Nascimento):`);l?s(l):v("⚠️ Senha não informada. Leitura do PDF cancelada.")};const o=await a.promise;let n="";for(let s=1;s<=o.numPages;s++){const l=await(await o.getPage(s)).getTextContent();let m=null,d="";for(const i of l.items){if(!i.str)continue;const u=i.transform?i.transform[5]:null;m!==null&&Math.abs(u-m)>3?d+=`
`:d.length>0&&!d.endsWith(`
`)&&!d.endsWith(" ")&&(d+=" "),d+=i.str,m=u}n+=d+`
`}return n}catch(e){return e.name==="PasswordException"?v("🔒 O PDF precisa de senha válida para ser aberto."):console.error("Erro ao ler PDF:",e),""}}function Jt(t){if(!t)return null;const e=t.match(/Total\s*a\s*Pagar\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/no\s*valor\s*de\s*R?\$\s*([\d\.,]+)/i)||t.match(/Valor\s*total\s*da\s*fatura\s*[:\s]*R?\$\s*([\d\.,]+)/i)||t.match(/Total\s*da\s*fatura\s*[:\s]*R?\$\s*([\d\.,]+)/i);if(e){const a=x(e[1]);if(a>0)return a}return null}function Kt(t){if(!t)return null;const e=t.match(/Vencimento\s*[:\s]*(\d{2}[\/\.-]\d{2}[\/\.-]\d{4})/i)||t.match(/Data\s*de\s*vencimento\s*[:\s]*(\d{2})\s+([A-Za-z]{3})\s+(\d{4})/i)||t.match(/FATURA\s+(\d{2})\s+([A-Za-z]{3})\s+(\d{4})/i);if(e){if(e[2]&&e[3]){const a=e[1],o=e[2].toUpperCase(),n=e[3],r={JAN:"01",FEB:"02",MAR:"03",ABR:"04",APR:"04",MAI:"05",MAY:"05",JUN:"06",JUL:"07",AGO:"08",AUG:"08",SET:"09",SEP:"09",OUT:"10",OCT:"10",NOV:"11",DEZ:"12",DEC:"12"}[o]||"07";return`${n}-${r}-${a.padStart(2,"0")}`}else if(e[1]){const[a,o,n]=e[1].split(/[\/\.-]/);return`${n}-${o.padStart(2,"0")}-${a.padStart(2,"0")}`}}return null}window.importarFaturaManualOuArquivo=async function(){const t=document.getElementById("inp-fatura-txt").value.trim();if(!t){v("⚠️ Selecione o arquivo da fatura (.pdf, .csv) ou cole o texto da fatura.");return}await Mt(t,vt)};async function Mt(t,e){const a=Kt(t);a&&(document.getElementById("inp-fatura-vencimento").value=a,atualizarMesRefFatura());const o=Jt(t),n=Xt(t);if(!n.length&&!o){v(`⚠️ Nenhuma compra individual identificada na fatura do ${e}.`);return}const s=document.getElementById("inp-fatura-vencimento").value||new Date().toISOString().slice(0,10),r=s.slice(0,7),l=n.reduce((d,i)=>d+i.valor,0),m=o||l;$={cartao:e,dataVencimento:s,mesAno:r,valorTotal:m,qtdItens:n.length,itens:n},St(),v(`✅ ${n.length} compras encontradas! Fatura total: ${c(m)}.`)}window.atualizarValorTotalRevisaoFatura=function(){var e;if(!$)return;const t=parseFloat((e=document.getElementById("inp-revisao-fatura-val"))==null?void 0:e.value)||0;$.valorTotal=t,document.getElementById("badge-total-preview-fatura").textContent=c(t)};function St(){if(!$)return;const{valorTotal:t,itens:e}=$;document.getElementById("badge-total-preview-fatura").textContent=c(t);const a=document.getElementById("lista-preview-fatura-itens");!e||!e.length?a.innerHTML='<div class="empty-state">Nenhum item individual extraído. O valor total acima será considerado.</div>':a.innerHTML=e.map((n,s)=>`
      <div style="display:flex; justify-content:space-between; align-items:center; padding:.4rem 0; border-bottom:1px dashed var(--border-color); font-size:.82rem;">
        <span><strong>${n.dataCompra||"—"}</strong> — ${n.descricao}</span>
        <div style="display:flex; align-items:center; gap:.75rem;">
          <span style="color:#fb7185; font-weight:700;">${c(n.valor)}</span>
          <button type="button" class="btn-danger" style="padding:.15rem .45rem; font-size:.75rem;" onclick="removerItemRevisaoFatura(${s})">🗑️</button>
        </div>
      </div>
    `).join("");const o=document.getElementById("box-revisao-fatura");o.style.display="block",o.scrollIntoView({behavior:"smooth"})}window.removerItemRevisaoFatura=function(t){if(!$||!$.itens)return;$.itens.splice(t,1);const e=$.itens.reduce((a,o)=>a+o.valor,0);e>0&&($.valorTotal=e),$.qtdItens=$.itens.length,St(),v("🗑️ Item removido da revisão da fatura.")};window.confirmarEGravarFaturaDocumento=async function(){if(!$)return;const t=document.getElementById("inp-fatura-vencimento").value||new Date().toISOString().slice(0,10);if(!$.valorTotal){v("⚠️ A fatura não possui valor total.");return}$.dataVencimento=t,$.mesAno=t.slice(0,7);try{await it(q(I,K),{...$,createdAt:ut()}),document.getElementById("box-revisao-fatura").style.display="none",document.getElementById("inp-fatura-txt").value="";const a=document.getElementById("txt-file-fatura");a&&(a.textContent="Clique para Selecionar o Arquivo da Fatura");const o=c($.valorTotal);$=null,v(`🎉 Fatura de ${o} salva com sucesso!`)}catch(a){alert("Erro ao salvar fatura: "+a.message)}};function Xt(t){if(!t)return[];const e=[],a=/(?:[@\)\(\*•\s]+)?(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+(?:(\d{2}\/\d{2})\s+)?(-?R?\$\s*[\d\.]+,\d{2}|-?[\d\.]+,\d{2})/gi;if(t.split(`
`).forEach(n=>{const s=n.trim();if(!s||/EMISS[ÃA]O|TRANSA[ÇC][ÕO]ES|RESUMO|PAGAMENTO DE FATURA|TOTAL DA FATURA|FATURA ANTERIOR|SALDO ANTERIOR|LIMITE DISPON[ÍI]VEL|OPÇÕES DE PAGAMENTO|ALTERNATIVAS DE PAGAMENTO|PAGAMENTO E DEMAIS|PARCELAMENTOS|DESPESAS|HISTÓRICO DE FATURAS|SUPERCRÉDITO|SAQUE À CRÉDITO|COMPRA DATA DESCRIÇÃO/i.test(s))return;const r=/(?:[@\)\(\*•\s]+)?(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+(?:(\d{2}\/\d{2})\s+)?(-?R?\$\s*[\d\.]+,\d{2}|-?[\d\.]+,\d{2})$/i,l=s.match(r)||s.match(/(?:[@\)\(\*•\s]+)?(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\d{2}\s+[A-Za-z]{3})\s+(.+?)\s+(?:(\d{2}\/\d{2})\s+)?(-?R?\$\s*[\d\.]+,\d{2}|-?[\d\.]+,\d{2})/i);if(l){const m=l[1];let d=l[2].trim();const i=l[3],u=l[4];if(u.includes("-")||/DEB AUTOM|PAGAMENTO|PAGTO|CR[ÉE]DITO FATURA/i.test(d))return;const f=x(u);i&&(d+=` (${i})`),d&&f>0&&d.length>2&&!/fatura|limite|pagamento|saldo|alternativas|opções|período|emissão|vencimento/i.test(d)&&e.push({dataCompra:m,descricao:d,valor:f})}}),e.length===0){let n;for(;(n=a.exec(t))!==null;){const s=n[1];let r=n[2].trim();const l=n[3],m=n[4];if(m.includes("-")||/DEB AUTOM|PAGAMENTO|PAGTO|CR[ÉE]DITO FATURA/i.test(r))continue;const d=x(m);l&&(r+=` (${l})`),r&&d>0&&r.length>2&&!/fatura|limite|pagamento|saldo|alternativas|opções|período|emissão|vencimento/i.test(r)&&e.push({dataCompra:s,descricao:r,valor:d})}}return e}function te(){const t=N.reduce((a,o)=>a+(o.valorTotal!==void 0?o.valorTotal:o.valor||0),0);document.getElementById("badge-total-cartoes").textContent=`${c(t)} total`;const e=document.getElementById("lista-faturas-registradas");if(!N.length){e.innerHTML='<div class="empty-state">Nenhuma fatura cadastrada ainda.</div>';return}e.innerHTML=N.map(a=>{var i;const o=a.valorTotal!==void 0?a.valorTotal:a.valor||0,n=a.cartao||"Cartão",s=n.toLowerCase().includes("nubank"),r=s?"purple":"red",l=s?"🟣":"🔴",m=a.dataVencimento?lt(a.dataVencimento).split(",")[0]:"—",d=a.mesAno||"—";return`
      <div class="purchase-card">
        <div class="purchase-header" onclick="toggleDetail('fat-${a.id}')">
          <div class="purchase-info">
            <h3><span class="badge ${r}">${l} ${n}</span> — Vencimento: ${m}</h3>
            <p>📅 Mês Referência: <strong>${d}</strong> &nbsp;•&nbsp; 🛒 ${a.qtdItens||((i=a.itens)==null?void 0:i.length)||1} itens contemplados</p>
          </div>
          <div class="purchase-values">
            <div class="pv-total" style="color:#fb7185">${c(o)}</div>
            <div class="pv-sub">Fatura do Mês</div>
          </div>
          <svg class="chevron" id="chev-fat-${a.id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="purchase-details" id="detail-fat-${a.id}">
          <div class="details-toolbar">
            <span class="card-subtext">Detalhamento dos Lançamentos da Fatura</span>
            <button class="btn-danger" onclick="excluirFaturaDocumento('${a.id}')">🗑️ Excluir Fatura</button>
          </div>
          ${ee(a)}
        </div>
      </div>
    `}).join("")}function ee(t){return t.itens&&t.itens.length>0?`<div class="table-responsive"><table class="custom-table">
      <thead><tr><th>Data Compra</th><th>Descrição do Lançamento</th><th class="num">Valor</th><th>Ação</th></tr></thead>
      <tbody>${t.itens.map((e,a)=>`<tr>
        <td><strong>${e.dataCompra||"—"}</strong></td>
        <td>${e.descricao}</td>
        <td class="num" style="color:#fb7185"><strong>${c(e.valor)}</strong></td>
        <td><button class="btn-danger" style="padding:.2rem .5rem; font-size:.78rem;" onclick="removerItemFaturaCadastrada('${t.id}', ${a})">🗑️ Excluir</button></td>
      </tr>`).join("")}</tbody>
    </table></div>`:`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Descrição</th><th class="num">Valor</th><th>Ação</th></tr></thead>
    <tbody><tr>
      <td>${t.descricao||"Fatura do Cartão"}</td>
      <td class="num" style="color:#fb7185"><strong>${c(t.valor||t.valorTotal)}</strong></td>
      <td><button class="btn-danger" style="padding:.2rem .5rem; font-size:.78rem;" onclick="excluirFaturaDocumento('${t.id}')">🗑️ Excluir</button></td>
    </tr></tbody>
  </table></div>`}window.removerItemFaturaCadastrada=async function(t,e){const a=N.find(s=>s.id===t);if(!a||!a.itens||!confirm("Remover este item da fatura?"))return;const o=[...a.itens];o.splice(e,1);const n=o.reduce((s,r)=>s+(r.valor||0),0);o.length===0?(await G(w(I,K,t)),v("🗑️ Fatura excluída pois todos os itens foram removidos.")):(await at(w(I,K,t),{...a,itens:o,valorTotal:n,qtdItens:o.length}),v("🗑️ Item removido da fatura."))};window.excluirFaturaDocumento=async function(t){confirm("Excluir esta fatura e todos os seus lançamentos?")&&(await G(w(I,K,t)),v("🗑️ Fatura removida com sucesso."))};let E=null;function ae(){const t=document.getElementById("inp-boleto-vencimento");if(t&&!t.value){const e=new Date,a=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0");t.value=`${a}-${o}-10`,atualizarMesRefBoleto()}}setTimeout(ae,300);window.atualizarMesRefBoleto=function(){const t=document.getElementById("inp-boleto-vencimento"),e=document.getElementById("lbl-boleto-mes-ref");if(!(!t||!e))if(t.value){const[a,o]=t.value.split("-"),s=new Date(parseInt(a),parseInt(o)-1,1).toLocaleString("pt-BR",{month:"long"});e.textContent=`Boleto ${s.charAt(0).toUpperCase()+s.slice(1)}/${a}`}else e.textContent="Mês do Boleto"};window.handleFileBoletoSelect=async function(t){const e=t.target.files[0];if(!e)return;const a=document.getElementById("txt-file-boleto");a&&(a.textContent=`📄 Arquivo: ${e.name}`),v(`⏳ Lendo arquivo do boleto (${e.name})...`);let o="";if(e.type==="application/pdf"||e.name.endsWith(".pdf"))o=await Ct(e);else try{o=await e.text()}catch{o=""}o?(document.getElementById("inp-boleto-txt").value=o,await Dt(o,e.name)):v("❌ Não foi possível ler o texto do arquivo do boleto.")};window.importarBoletoManualOuArquivo=async function(){const t=document.getElementById("inp-boleto-txt").value.trim();if(!t){v("⚠️ Selecione o arquivo do boleto (.pdf, .txt) ou cole o texto do boleto.");return}await Dt(t,"Boleto")};async function Dt(t,e){const a=oe(t);a.vencimento&&(document.getElementById("inp-boleto-vencimento").value=a.vencimento,atualizarMesRefBoleto());const o=document.getElementById("inp-boleto-vencimento").value||new Date().toISOString().slice(0,10),n=o.slice(0,7),s=a.beneficiario||e.replace(/\.[^/.]+$/,"")||"Boleto / Conta",r=a.itens.reduce((m,d)=>m+d.valor,0),l=a.valorTotal||r||0;document.getElementById("inp-revisao-boleto-desc").value=s,document.getElementById("inp-revisao-boleto-val").value=l?l.toFixed(2):"",E={descricao:s,dataVencimento:o,mesAno:n,valorTotal:l,qtdItens:a.itens.length,itens:a.itens},Lt(),v("✅ Boleto identificado! Confira a descrição, valor e itens antes de salvar.")}window.atualizarValorTotalRevisaoBoleto=function(){if(!E)return;const t=parseFloat(document.getElementById("inp-revisao-boleto-val").value)||0;E.valorTotal=t,document.getElementById("badge-total-preview-boleto").textContent=c(t)};function Lt(){if(!E)return;const{valorTotal:t,itens:e}=E;document.getElementById("badge-total-preview-boleto").textContent=c(t);const a=document.getElementById("lista-preview-boleto-itens");!e||!e.length?a.innerHTML='<div class="empty-state">Nenhum encargo/item individual extraído. O valor total acima será considerado.</div>':a.innerHTML=e.map((n,s)=>`
      <div style="display:flex; justify-content:space-between; align-items:center; padding:.4rem 0; border-bottom:1px dashed var(--border-color); font-size:.82rem;">
        <span><strong>${n.dataBoleto||"—"}</strong> — ${n.descricao}</span>
        <div style="display:flex; align-items:center; gap:.75rem;">
          <span style="color:#c084fc; font-weight:700;">${c(n.valor)}</span>
          <button type="button" class="btn-danger" style="padding:.15rem .45rem; font-size:.75rem;" onclick="removerItemRevisaoBoleto(${s})">🗑️</button>
        </div>
      </div>
    `).join("");const o=document.getElementById("box-revisao-boleto");o.style.display="block",o.scrollIntoView({behavior:"smooth"})}window.removerItemRevisaoBoleto=function(t){if(!E||!E.itens)return;E.itens.splice(t,1);const e=E.itens.reduce((a,o)=>a+o.valor,0);e>0&&(E.valorTotal=e,document.getElementById("inp-revisao-boleto-val").value=e.toFixed(2)),E.qtdItens=E.itens.length,Lt(),v("🗑️ Item removido da revisão do boleto.")};window.confirmarEGravarBoletoDocumento=async function(){if(!E)return;const t=document.getElementById("inp-revisao-boleto-desc").value.trim(),e=parseFloat(document.getElementById("inp-revisao-boleto-val").value)||0,a=document.getElementById("inp-boleto-vencimento").value||new Date().toISOString().slice(0,10);if(!e){v("⚠️ Digite ou confirme o valor total do boleto.");return}E.descricao=t||"Boleto / Conta",E.valorTotal=e,E.dataVencimento=a,E.mesAno=a.slice(0,7);try{await it(q(I,X),{...E,createdAt:ut()}),document.getElementById("box-revisao-boleto").style.display="none",document.getElementById("inp-boleto-txt").value="";const o=document.getElementById("txt-file-boleto");o&&(o.textContent="Clique para Selecionar o Arquivo do Boleto");const n=c(E.valorTotal);E=null,v(`🎉 Boleto de ${n} salvo com sucesso!`)}catch(o){alert("Erro ao salvar boleto: "+o.message)}};function oe(t){if(!t)return{beneficiario:"",valorTotal:0,vencimento:null,itens:[]};let e="",a=0,o=null;const n=[],s=t.match(/Vencimento\s*[:\s]*(\d{2}[\/\.-]\d{2}[\/\.-]\d{4})/i)||t.match(/Vencimento\s*[:\s]*(\d{2})\s+([A-Za-z]{3})\s+(\d{4})/i)||t.match(/Data\s*de\s*Vencimento\s*[:\s]*(\d{2}[\/\.-]\d{2}[\/\.-]\d{4})/i);if(s){if(s[2]&&s[3]){const d=s[1],i=s[2].toUpperCase();o=`${s[3]}-${{JAN:"01",FEB:"02",MAR:"03",ABR:"04",APR:"04",MAI:"05",MAY:"05",JUN:"06",JUL:"07",AGO:"08",AUG:"08",SET:"09",SEP:"09",OUT:"10",OCT:"10",NOV:"11",DEZ:"12",DEC:"12"}[i]||"07"}-${d.padStart(2,"0")}`}else if(s[1]){const[d,i,u]=s[1].split(/[\/\.-]/);o=`${u}-${i.padStart(2,"0")}-${d.padStart(2,"0")}`}}const r=t.match(/Benefici[áa]rio\s*[:\s]*([^\n\r]+)/i)||t.match(/Nome\s*do\s*Cedente\s*[:\s]*([^\n\r]+)/i)||t.match(/Raz[ãa]o\s*Social\s*[:\s]*([^\n\r]+)/i);r&&(e=r[1].trim().replace(/\s{2,}/g," "));const l=t.match(/Valor\s*do\s*Documento\s*[:\s]*R?\$\s*([\d\.]+,\d{2})/i)||t.match(/\(=\)\s*Valor\s*Cobrado\s*[:\s]*R?\$\s*([\d\.]+,\d{2})/i)||t.match(/Valor\s*Cobrado\s*[:\s]*R?\$\s*([\d\.]+,\d{2})/i)||t.match(/Valor\s*R?\$\s*([\d\.]+,\d{2})/i);return l&&(a=x(l[1])),t.split(`
`).forEach(d=>{const i=d.trim();if(!i||/vencimento|beneficiário|cedente|nosso\s*número|agência|código|autenticação|instruções/i.test(i))return;const u=i.match(/(\d{2}[\/\.-]\d{2}(?:[\/\.-]\d{2,4})?|\b[A-Za-z]{3}\b)?\s*(.+?)\s+R?\$\s*([\d\.]+,\d{2})$/i);if(u){const f=u[1]||"Boleto",g=u[2].trim(),b=x(u[3]);g&&b>0&&g.length>2&&!/valor|total|documento|cobrado/i.test(g)&&n.push({dataBoleto:f,descricao:g,valor:b})}}),{beneficiario:e,valorTotal:a,vencimento:o,itens:n}}function ne(){const t=V.reduce((a,o)=>a+(o.valorTotal!==void 0?o.valorTotal:o.valor||0),0);document.getElementById("badge-total-boletos").textContent=`${c(t)} total`;const e=document.getElementById("lista-boletos-registrados");if(!V.length){e.innerHTML='<div class="empty-state">Nenhum boleto cadastrado ainda.</div>';return}e.innerHTML=V.map(a=>{var l;const o=a.valorTotal!==void 0?a.valorTotal:a.valor||0,n=a.dataVencimento?lt(a.dataVencimento).split(",")[0]:"—",s=a.mesAno||"—",r=a.descricao||"Boleto / Conta";return`
      <div class="purchase-card">
        <div class="purchase-header" onclick="toggleDetail('bol-${a.id}')">
          <div class="purchase-info">
            <h3><span class="badge purple">📄 ${r}</span> — Vencimento: ${n}</h3>
            <p>📅 Mês Referência: <strong>${s}</strong> &nbsp;•&nbsp; 🛒 ${a.qtdItens||((l=a.itens)==null?void 0:l.length)||1} itens / encargos</p>
          </div>
          <div class="purchase-values">
            <div class="pv-total" style="color:#c084fc">${c(o)}</div>
            <div class="pv-sub">Boleto do Mês</div>
          </div>
          <svg class="chevron" id="chev-bol-${a.id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="purchase-details" id="detail-bol-${a.id}">
          <div class="details-toolbar">
            <span class="card-subtext">Detalhamento dos Itens / Encargos do Boleto</span>
            <button class="btn-danger" onclick="excluirBoletoDocumento('${a.id}')">🗑️ Excluir Boleto</button>
          </div>
          ${se(a)}
        </div>
      </div>
    `}).join("")}function se(t){return t.itens&&t.itens.length>0?`<div class="table-responsive"><table class="custom-table">
      <thead><tr><th>Data</th><th>Descrição / Item</th><th class="num">Valor</th><th>Ação</th></tr></thead>
      <tbody>${t.itens.map((e,a)=>`<tr>
        <td><strong>${e.dataBoleto||"—"}</strong></td>
        <td>${e.descricao}</td>
        <td class="num" style="color:#c084fc"><strong>${c(e.valor)}</strong></td>
        <td><button class="btn-danger" style="padding:.2rem .5rem; font-size:.78rem;" onclick="removerItemBoletoCadastrado('${t.id}', ${a})">🗑️ Excluir</button></td>
      </tr>`).join("")}</tbody>
    </table></div>`:`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Descrição</th><th class="num">Valor</th><th>Ação</th></tr></thead>
    <tbody><tr>
      <td>${t.descricao||"Boleto"}</td>
      <td class="num" style="color:#c084fc"><strong>${c(t.valor||t.valorTotal)}</strong></td>
      <td><button class="btn-danger" style="padding:.2rem .5rem; font-size:.78rem;" onclick="excluirBoletoDocumento('${t.id}')">🗑️ Excluir</button></td>
    </tr></tbody>
  </table></div>`}window.removerItemBoletoCadastrado=async function(t,e){const a=V.find(s=>s.id===t);if(!a||!a.itens||!confirm("Remover este item do boleto?"))return;const o=[...a.itens];o.splice(e,1);const n=o.reduce((s,r)=>s+(r.valor||0),0);o.length===0?(await G(w(I,X,t)),v("🗑️ Boleto excluído pois todos os itens foram removidos.")):(await at(w(I,X,t),{...a,itens:o,valorTotal:n,qtdItens:o.length}),v("🗑️ Item removido do boleto."))};window.excluirBoletoDocumento=async function(t){confirm("Excluir este boleto e todos os seus itens?")&&(await G(w(I,X,t)),v("🗑️ Boleto removido com sucesso."))};document.getElementById("form-config-reservas").addEventListener("submit",async t=>{t.preventDefault();const e=parseFloat(document.getElementById("inp-meta-mensal").value)||0,a=parseFloat(document.getElementById("inp-saldo-guardado").value)||0;await at(w(I,$t,"config"),{metaMensal:e,valorAtualGuardado:a,dataAtualizacao:new Date().toISOString()}),v("✅ Reservas e economias atualizadas!")});function re(){const t=mt.metaMensal||0,e=mt.valorAtualGuardado||0;document.getElementById("val-meta-reserva").textContent=c(t),document.getElementById("val-real-guardado").textContent=c(e);const a=T.reduce((i,u)=>i+(u.valor||0),0),o=N.reduce((i,u)=>i+(u.valorTotal!==void 0?u.valorTotal:u.valor||0),0),n=V.reduce((i,u)=>i+(u.valorTotal!==void 0?u.valorTotal:u.valor||0),0);let s=0;C.forEach(i=>{i.formasPagamento&&(s+=i.formasPagamento.cartaoDebito||0)});const r=a-o-n-s,l=r>0?Math.max(r*.5,a*.2):0;document.getElementById("val-recomendacao-reserva").textContent=c(l);const m=document.getElementById("box-analise-reserva-detalhes");if(a===0){m.innerHTML='<p class="empty-state">Cadastre seus salários e entradas na aba "Salários & Entradas" para gerar o diagnóstico inteligente de economias.</p>';return}const d=t>0?Math.min(100,e/t*100).toFixed(1):0;m.innerHTML=`
    <p> Com base nos seus <strong>${c(a)}</strong> de Entradas, <strong>${c(o)}</strong> de Faturas de Cartão e <strong>${c(s)}</strong> de Mercado no Débito:</p>
    <div style="background:rgba(15,23,42,0.6);padding:1rem;border-radius:10px;margin:.75rem 0;border:1px solid var(--border-color)">
      <div style="display:flex;justify-content:space-between;margin-bottom:.4rem">
        <span>💰 Saldo Livre em Conta: <strong>${c(r)}</strong></span>
        <span>💡 Recomendação de Reserva: <strong style="color:#c084fc">${c(l)}/mês</strong></span>
      </div>
      <div class="progress-bar-bg">
        <div class="progress-bar-fill" style="width:${d}%"></div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:.78rem;color:var(--text-muted);margin-top:.4rem">
        <span>Guardado: ${c(e)}</span>
        <span>Meta Pessoal: ${c(t)} (${d}%)</span>
      </div>
    </div>
    <p style="font-size:.84rem;color:var(--text-muted)">
      💡 <strong>Dica de Inteligência Financeira:</strong> Como o Vale Alimentação e o Crédito no Mercado não saem do seu salário em conta, eles protegem sua renda real! O sistema recomenda destinar pelo menos 50% do seu saldo livre líquido (<strong>${c(l)}</strong>) para sua reserva de emergência e investimentos.
    </p>
  `}function ie(){const t=document.getElementById("lista-mensal-container");if(!t)return;const e=new Date,a=new Date(e.getFullYear(),e.getMonth()+1,1),o=a.toLocaleString("pt-BR",{month:"long"}),n=a.getFullYear(),s=`${o.charAt(0).toUpperCase()+o.slice(1)} de ${n}`,r=Qt(a.getFullYear(),a.getMonth()),l=31.8,m=20,d=r*l,i=r*m,u={};let f=0;C.forEach(p=>{const h=p.valorAPagar||0;f+=h;const y=p.mesAno||"Outros";u[y]=(u[y]||0)+h});const g=Math.max(1,Object.keys(u).length),b=f/g,A={};C.forEach(p=>{(p.itens||[]).forEach(h=>{const y=(h.nome||"").toLowerCase().trim();y&&(A[y]||(A[y]={nome:h.nome,marca:h.marca||"Geral",qtdTotal:0,frequenciaNotas:0,valoresUnitarios:[]}),A[y].qtdTotal+=h.quantidade||1,A[y].frequenciaNotas+=1,h.valorUnitario&&A[y].valoresUnitarios.push(h.valorUnitario))})});const L=Object.values(A).map(p=>{const h=p.valoresUnitarios.length>0?p.valoresUnitarios.reduce((W,rt)=>W+rt,0)/p.valoresUnitarios.length:0,y=p.qtdTotal/g,H=g/Math.max(1,p.frequenciaNotas),st=p.frequenciaNotas/g;let S=0;st>=.35||y>=.7?S=Math.ceil(y):S=Math.round(y),S<1&&p.frequenciaNotas>=g&&(S=1);const Z=S*h;return{nome:p.nome,marca:p.marca,frequenciaNotas:p.frequenciaNotas,intervaloMeses:H,qtdMensalTaxa:y,totalEstimadoUnidades:S,valorUnitario:h,subtotalCalculado:Z}}).filter(p=>p.totalEstimadoUnidades>0);L.sort((p,h)=>h.frequenciaNotas-p.frequenciaNotas);const M=L.reduce((p,h)=>p+h.subtotalCalculado,0),Q=b>0?b*1.05:M;let Y=1;M>Q&&b>0&&(Y=Q/M);const _=L.map(p=>({...p,subtotalFinal:p.subtotalCalculado*Y})),k=b>0?Math.min(M,Q):M;let R=k;const j=Math.min(R,d);R-=j;const z=Math.min(R,i);R-=z;const P=R>0?R:0;let F=`
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
          <div class="p-val" style="color:#34d399;">${c(j)} <span style="font-size:0.75rem;font-weight:normal;color:var(--text-muted)">/ ${c(d)}</span></div>
        </div>
        <div class="payment-item" style="border-color: rgba(99,102,241,0.4);">
          <div class="p-label">💳 Cartão Crédito (${r}d × R$ 20,00)</div>
          <div class="p-val" style="color:#818cf8;">${c(z)} <span style="font-size:0.75rem;font-weight:normal;color:var(--text-muted)">/ ${c(i)}</span></div>
        </div>
        <div class="payment-item" style="border-color: ${P>0?"rgba(244,63,94,0.5)":"var(--border-color)"};">
          <div class="p-label">💳 Débito Necessário (Excedente)</div>
          <div class="p-val" style="color: ${P>0?"#fb7185":"var(--text-muted)"};">${c(P)}</div>
        </div>
      </div>

      <div style="margin-top:1.25rem; padding-top:1rem; border-top:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
        <div>
          <span style="font-size:0.85rem; color:var(--text-muted);">Total Estimado da Lista de Compras:</span>
          <p style="font-size:0.75rem; color:#60a5fa;">Média Histórica de Gastos: ${c(b)}</p>
        </div>
        <span style="font-size:1.6rem; font-weight:800; color:var(--primary);">${c(k)}</span>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-title">Lista de Itens com Frequência e Total Estimado</span>
        <span class="badge amber">${_.length} itens cadastrados</span>
      </div>
      <p class="card-subtext" style="margin-bottom:1rem;">
        O <strong>Total Estimado</strong> arredonda o consumo médio para cima (unidades inteiras exatas), pois os produtos são comprados por unidade no mercado.
      </p>
  `;window.dadosListaMensalCache={mesAnoStr:s,diasUteis:r,totalGeralEstimado:k,cobertoAlim:j,cobertoCred:z,cobertoDeb:P,alimDisponivel:d,credDisponivel:i,lista:_},_.length===0?F+='<div class="empty-state">Adicione notas fiscais para que o sistema gere automaticamente sua lista mensal de compras.</div></div>':F+=`
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
            ${_.map(p=>{const h=p.intervaloMeses>1.2?`A cada ${p.intervaloMeses.toFixed(1)} meses`:`Todo mês (${p.frequenciaNotas}x)`,y=p.qtdMensalTaxa<1?p.qtdMensalTaxa.toFixed(2):p.qtdMensalTaxa.toFixed(1),H=p.totalEstimadoUnidades.toFixed(1);return`
                <tr>
                  <td><strong>${p.nome}</strong></td>
                  <td><span class="badge amber">${p.marca}</span></td>
                  <td><span class="badge cyan">${h}</span></td>
                  <td class="num">${y} un/mês</td>
                  <td class="num"><span class="badge green" style="font-size:0.82rem;">${H}</span></td>
                  <td class="num">${c(p.valorUnitario)}</td>
                  <td class="num"><strong>${c(p.subtotalFinal)}</strong></td>
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
    </div>`,t.innerHTML=F}window.exportarPDFListaMensal=function(){if(!window.dadosListaMensalCache||!window.dadosListaMensalCache.lista.length){v("⚠️ Nenhuma lista mensal disponível para exportar.");return}const{mesAnoStr:t,diasUteis:e,totalGeralEstimado:a,cobertoAlim:o,cobertoCred:n,cobertoDeb:s,lista:r}=window.dadosListaMensalCache,l=window.open("","_blank","width=900,height=750");if(!l){alert("Permita pop-ups no navegador para gerar o PDF da lista.");return}const m=`
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
          <div class="val">${c(o)}</div>
        </div>
        <div class="res-item">
          <div class="label">💳 Cartão Crédito</div>
          <div class="val">${c(n)}</div>
        </div>
        <div class="res-item">
          <div class="label">💳 Débito (Excedente)</div>
          <div class="val">${c(s)}</div>
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
              <td class="num">${c(d.valorUnitario)}</td>
              <td class="num"><strong>${c(d.subtotalFinal)}</strong></td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <div class="total-footer">
        <span>Total Estimado da Compra:</span>
        <span style="font-size:18px; color:#059669;">${c(a)}</span>
      </div>

      <script>
        window.onload = function() {
          setTimeout(function() { window.print(); }, 350);
        };
      <\/script>
    </body>
    </html>
  `;l.document.open(),l.document.write(m),l.document.close()};document.getElementById("btn-start-cam").addEventListener("click",Rt);document.getElementById("btn-switch-cam").addEventListener("click",le);document.getElementById("btn-stop-cam").addEventListener("click",gt);async function Rt(){if(typeof Html5Qrcode>"u")return B("Carregando biblioteca de câmera, aguarde..."),setTimeout(Rt,600);try{O||(O=new Html5Qrcode("qr-reader")),D=await Html5Qrcode.getCameras();let t;if(D&&D.length>0){const e=D.findIndex(a=>/back|traseira|rear|environment/i.test(a.label));J=e>=0?e:0,t=D[J].id}else t={facingMode:"environment"};await O.start(t,{fps:10,qrbox:{width:240,height:240}},Ft,()=>{}),tt=!0,document.getElementById("btn-start-cam").style.display="none",document.getElementById("btn-switch-cam").style.display=D.length>1?"inline-flex":"none",document.getElementById("btn-stop-cam").style.display="inline-flex"}catch(t){B("❌ Não foi possível acessar a câmera. Verifique as permissões do navegador."),console.error(t)}}async function le(){if(!(!O||!tt))try{await O.stop(),D.length>1&&(J=(J+1)%D.length,await O.start(D[J].id,{fps:10,qrbox:{width:240,height:240}},Ft,()=>{}))}catch(t){console.error("switchCam:",t)}}async function gt(){if(O&&tt)try{await O.stop()}catch{}tt=!1,document.getElementById("btn-start-cam").style.display="inline-flex",document.getElementById("btn-switch-cam").style.display="none",document.getElementById("btn-stop-cam").style.display="none"}async function Ft(t){gt(),document.getElementById("inp-url").value=t,B("✅ QR Code lido! Processando..."),await qt(t)}document.getElementById("btn-carregar-dados").addEventListener("click",async()=>{const t=document.getElementById("inp-url").value.trim(),e=document.getElementById("inp-html").value.trim();if(!t&&!e){B("⚠️ Cole a URL do QR Code ou o conteúdo da página para ler a nota fiscal.");return}if(t&&!e){B("⏳ Consultando nota fiscal..."),await qt(t);return}if(e){B("⏳ Processando conteúdo..."),await Pt(e);return}});document.getElementById("btn-preencher-manual").addEventListener("click",()=>{Ot({nomeMercado:"",dataEmissao:new Date().toISOString(),valorTotal:0,descontoTotal:0,valorAPagar:0,qtdTotalItens:0,formasPagamento:{valeAlimentacao:0,cartaoCredito:0,cartaoDebito:0},itens:[]}),B("✍️ Preencha os dados da compra abaixo e clique em Salvar Nota Fiscal.","var(--accent-cyan)")});function Ot(t){var s,r,l;document.getElementById("inp-mercado").value=t.nomeMercado||"",document.getElementById("inp-data").value=Gt(t.dataEmissao),document.getElementById("inp-vtotal").value=t.valorTotal!==void 0?t.valorTotal:0,document.getElementById("inp-desconto").value=t.descontoTotal!==void 0?t.descontoTotal:0,document.getElementById("inp-pagar").value=t.valorAPagar!==void 0?t.valorAPagar:0,document.getElementById("inp-qtd").value=t.qtdTotalItens!==void 0?t.qtdTotalItens:0,document.getElementById("inp-alim").value=((s=t.formasPagamento)==null?void 0:s.valeAlimentacao)||0,document.getElementById("inp-cred").value=((r=t.formasPagamento)==null?void 0:r.cartaoCredito)||0,document.getElementById("inp-deb").value=((l=t.formasPagamento)==null?void 0:l.cartaoDebito)||0,U=t.itens||[];const e=document.getElementById("form-nfce");e.style.display="block";const a=document.getElementById("preview-itens-box"),o=document.getElementById("count-preview-itens"),n=document.getElementById("lista-preview-itens");U.length>0?(a.style.display="block",o.textContent=U.length,n.innerHTML=U.map(m=>`
      <div style="display:flex; justify-content:space-between; padding: 0.35rem 0; border-bottom: 1px dashed var(--border-color);">
        <span><strong>${m.nome}</strong> (${m.quantidade} ${m.unidade||"Un"})</span>
        <span>${c(m.valorUnitario)}/un = <strong>${c(m.valorTotal)}</strong></span>
      </div>
    `).join("")):a.style.display="none",e.scrollIntoView({behavior:"smooth"})}document.getElementById("form-nfce").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-mercado").value.trim()||"Mercado",a=document.getElementById("inp-data").value||new Date().toISOString(),o=parseFloat(document.getElementById("inp-vtotal").value)||0,n=parseFloat(document.getElementById("inp-desconto").value)||0,s=parseFloat(document.getElementById("inp-pagar").value)||0,r=parseInt(document.getElementById("inp-qtd").value)||0,l=parseFloat(document.getElementById("inp-alim").value)||0,m=parseFloat(document.getElementById("inp-cred").value)||0,d=parseFloat(document.getElementById("inp-deb").value)||0,i=new Date(a).toISOString().slice(0,16),u=C.find(b=>{const A=new Date(b.dataEmissao).toISOString().slice(0,16),L=Math.abs((b.valorAPagar||0)-s)<.05,M=(b.nomeMercado||"").toLowerCase().trim()===e.toLowerCase().trim();return A===i&&L&&M});if(u){B(`⚠️ Esta nota fiscal já existe no sistema (Cadastrada em ${lt(u.dataEmissao)} no valor de ${c(u.valorAPagar)}). Nota não adicionada!`,"#fb7185"),v("⚠️ Nota fiscal já cadastrada! Operação cancelada.");return}const f=new Date(a),g=`${f.getFullYear()}-${String(f.getMonth()+1).padStart(2,"0")}`;B("⏳ Salvando nota fiscal no banco...");try{await it(q(I,pt),{nomeMercado:e,dataEmissao:a,mesAno:g,qtdTotalItens:r||U.length,valorTotal:o,descontoTotal:n,valorAPagar:s,formasPagamento:{valeAlimentacao:l,cartaoCredito:m,cartaoDebito:d},itens:U,createdAt:ut()}),B("✅ Nota salva com sucesso!","#34d399"),document.getElementById("form-nfce").style.display="none",document.getElementById("form-nfce").reset(),document.getElementById("inp-url").value="",document.getElementById("inp-html").value="",U=[],At(),goTab("dashboard"),v("🎉 Nota fiscal registrada no Firebase!")}catch(b){B("❌ Erro ao salvar: "+b.message,"#fb7185")}});async function qt(t){const e=[a=>`https://api.allorigins.win/raw?url=${encodeURIComponent(a)}`,a=>`https://corsproxy.io/?${encodeURIComponent(a)}`];for(const a of e)try{const o=await fetch(a(t),{signal:AbortSignal.timeout(8e3)});if(o.ok){const n=await o.text();if(n&&n.length>200){await Pt(n);return}}}catch{}de(t)}function de(t){document.getElementById("modal-link").href=t,document.getElementById("modal-cors").classList.add("active"),B("⚠️ Abra o link, copie o conteúdo da página e cole no campo de texto abaixo.")}async function Pt(t){const e=ce(t);Ot(e),B("✅ Nota lida com sucesso! Confira os valores abaixo e altere se necessário antes de Salvar.","#34d399")}function ce(t){var j,z,P;const a=new DOMParser().parseFromString(t,"text/html"),o=((j=a.body)==null?void 0:j.textContent)||t;let n=((P=(z=a.querySelector(".txtTopo, .nomeEmit, h1"))==null?void 0:z.textContent)==null?void 0:P.trim())||"Mercado",s=new Date().toISOString();const r=o.match(/Emiss[ãa]o\s*[:\-]?\s*(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})?/i)||o.match(/(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})/);if(r){const[F,p,h]=r[1].split("/");s=`${h}-${p}-${F}T${r[2]||"12:00:00"}`}const l=o.match(/Qtd\.?\s*total\s*de\s*itens\s*[:\s]*([\d,\.]+)/i),m=o.match(/Valor\s*total\s*R\$\s*[:\s]*([\d\.,]+)/i),d=o.match(/Descontos?\s*R\$\s*[:\s]*([\d\.,]+)/i),i=o.match(/Valor\s*a\s*pagar\s*R\$\s*[:\s]*([\d\.,]+)/i)||o.match(/VALOR\s*PAGO\s*R\$\s*[:\s]*([\d\.,]+)/i),u=o.match(/(?:Vale\s*)?Alimenta[çc][ãa]o\s*[:\s]*([\d\.,]+)/i),f=o.match(/(?:Cart[ãa]o\s*de\s*)?Cr[eé]dito\s*[:\s]*([\d\.,]+)/i),g=o.match(/(?:Cart[ãa]o\s*de\s*)?D[eé]bito\s*[:\s]*([\d\.,]+)/i),b=l?x(l[1]):0,A=m?x(m[1]):0,L=d?x(d[1]):0;let M=i?x(i[1]):A-L;const Q={valeAlimentacao:u?x(u[1]):0,cartaoCredito:f?x(f[1]):0,cartaoDebito:g?x(g[1]):0},Y=[];a.querySelectorAll("tr, .item, .itemNota").forEach(F=>{var ft;const p=F.textContent;if(!/Vl\.\s*Unit|valorUnitario|Qtde?\./i.test(p))return;const h=F.querySelector(".txtTit, .txtTit2, .nomeProd"),y=((ft=h==null?void 0:h.textContent)==null?void 0:ft.trim())||"",H=p.match(/Qtde?\.\s*[:\s]*([\d,\.]+)/i),st=p.match(/Vl\.\s*Unit\.\s*[:\s]*([\d,\.]+)/i),S=p.match(/Vl\.\s*Total\s*([\d,\.]+)/i),Z=p.match(/C[oó]digo\s*[:\s]*(\d+)/i),W=p.match(/UN\s*[:\s]*([A-Za-z]+)/i),rt=H?x(H[1]):1,dt=st?x(st[1]):0,Ut=S?x(S[1]):dt*rt;y&&dt>0&&Y.push({codigo:(Z==null?void 0:Z[1])||"",nome:y,marca:me(y),quantidade:rt,unidade:(W==null?void 0:W[1])||"Un",valorUnitario:dt,valorTotal:Ut})});const k=new Date(s),R=`${k.getFullYear()}-${String(k.getMonth()+1).padStart(2,"0")}`;return{nomeMercado:n,dataEmissao:s,mesAno:R,qtdTotalItens:b,valorTotal:A,descontoTotal:L,valorAPagar:M,formasPagamento:Q,itens:Y}}function me(t){const e=["BAUDUCCO","BAUD","PANCO","DANONE","NESTLE","QUALITA","SADIA","PERDIGAO","SEARA","CAMIL","TIO JOAO","URBANO","LIZA","SOYA","YPE","PILAO","MELITTA","3 CORACOES","VIGOR","PARMALAT","ITALAC","HEINZ","KRAFT"],a=t.toUpperCase();for(const o of e)if(a.includes(o))return o;return a.split(" ")[0]||"Genérica"}function ue(){const t=document.getElementById("lista-historico");if(!C.length){t.innerHTML='<div class="empty-state">📭 Nenhuma compra cadastrada ainda.</div>';return}t.innerHTML=C.map(e=>{var a,o,n;return`
    <div class="purchase-card">
      <div class="purchase-header" onclick="toggleDetail('${e.id}')">
        <div class="purchase-info">
          <h3>${e.nomeMercado||"Mercado"}</h3>
          <p>📅 ${lt(e.dataEmissao)} &nbsp;•&nbsp; 🛒 ${e.qtdTotalItens||0} itens</p>
        </div>
        <div class="purchase-values">
          <div class="pv-total">${c(e.valorAPagar)}</div>
          <div class="pv-sub">Desc: ${c(e.descontoTotal)}</div>
        </div>
        <svg class="chevron" id="chev-${e.id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      <div class="purchase-details" id="detail-${e.id}">
        <div class="details-toolbar">
          <span class="card-subtext">Pagamentos: Alimentação ${c((a=e.formasPagamento)==null?void 0:a.valeAlimentacao)} · Crédito ${c((o=e.formasPagamento)==null?void 0:o.cartaoCredito)} · Débito ${c((n=e.formasPagamento)==null?void 0:n.cartaoDebito)}</span>
          <button class="btn-danger" onclick="confirmarExcluirMercado('${e.id}')">🗑️ Excluir</button>
        </div>
        ${pe(e)}
      </div>
    </div>`}).join("")}function pe(t){return!t.itens||!t.itens.length?'<p class="card-subtext">Nenhum item detalhado registrado.</p>':`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Item</th><th>Marca</th><th class="num">Qtd</th><th class="num">Vl. Unit.</th><th class="num">Vl. Total</th></tr></thead>
    <tbody>${t.itens.map(e=>`<tr>
      <td>${e.nome}</td>
      <td><span class="badge amber">${e.marca||"—"}</span></td>
      <td class="num">${e.quantidade} ${e.unidade||"Un"}</td>
      <td class="num">${c(e.valorUnitario)}</td>
      <td class="num"><strong>${c(e.valorTotal)}</strong></td>
    </tr>`).join("")}</tbody>
  </table></div>`}window.toggleDetail=function(t){const e=document.getElementById("detail-"+t),a=document.getElementById("chev-"+t);e&&e.classList.toggle("open"),a&&a.classList.toggle("open")};window.confirmarExcluirMercado=async function(t){if(confirm("Excluir esta compra de mercado?"))try{await G(w(I,pt,t)),v("🗑️ Compra excluída.")}catch(e){alert("Erro: "+e.message)}};function ve(){const t=document.getElementById("lista-comparacao"),e={};C.forEach(o=>{(o.itens||[]).forEach(n=>{var r;const s=((r=n.nome)==null?void 0:r.toLowerCase().trim())||"produto";e[s]||(e[s]={nome:n.nome,marca:n.marca,hist:{}}),e[s].hist[o.mesAno]=n.valorUnitario})});const a=Object.values(e);if(!a.length){t.innerHTML='<div class="empty-state">Adicione notas para ver a comparação de preços unitários.</div>';return}t.innerHTML=`<div class="table-responsive"><table class="custom-table">
    <thead><tr><th>Produto</th><th>Marca</th><th>Histórico (Unitário)</th><th>Variação</th></tr></thead>
    <tbody>${a.map(o=>{const n=Object.keys(o.hist).sort();let s=n.map(l=>`${l}: <strong>${c(o.hist[l])}</strong>`).join(" → "),r='<span class="badge cyan">Estável</span>';if(n.length>=2){const l=o.hist[n[n.length-2]],d=o.hist[n[n.length-1]]-l,i=(d/l*100).toFixed(1);d>.01?r=`<span class="badge red">+${i}% ↑</span>`:d<-.01&&(r=`<span class="badge green">${i}% ↓</span>`)}return`<tr><td><strong>${o.nome}</strong></td><td><span class="badge amber">${o.marca||"—"}</span></td><td>${s}</td><td>${r}</td></tr>`}).join("")}</tbody>
  </table></div>`}function ge(){const t=document.getElementById("lista-recorrencia"),e=document.getElementById("lista-marcas"),a={},o={};C.forEach(r=>{(r.itens||[]).forEach(l=>{var u;const m=(u=l.nome)==null?void 0:u.toLowerCase().trim();if(!m)return;a[m]||(a[m]={nome:l.nome,marca:l.marca,qtd:0,notas:0,units:[]}),a[m].qtd+=l.quantidade||1,a[m].notas+=1,a[m].units.push(l.valorUnitario||0);const d=(l.nome||"").split(" ")[0].toUpperCase();o[d]||(o[d]={});const i=l.marca||"Genérica";o[d][i]||(o[d][i]=[]),o[d][i].push(l.valorUnitario||0)})});const n=Object.values(a).filter(r=>r.notas>1).sort((r,l)=>l.notas-r.notas);t.innerHTML=n.length?`<div class="table-responsive"><table class="custom-table">
        <thead><tr><th>Item</th><th>Marca</th><th>Compras</th><th class="num">Qtd Total</th><th class="num">Média Unitária</th></tr></thead>
        <tbody>${n.map(r=>{const l=r.units.reduce((m,d)=>m+d,0)/r.units.length;return`<tr>
            <td><strong>${r.nome}</strong></td>
            <td><span class="badge amber">${r.marca||"—"}</span></td>
            <td><span class="badge green">${r.notas}x</span></td>
            <td class="num">${r.qtd}</td>
            <td class="num">${c(l)}</td>
          </tr>`}).join("")}</tbody>
      </table></div>`:'<div class="empty-state">Adicione notas para ver a recorrência de itens.</div>';const s=Object.entries(o).filter(([,r])=>Object.keys(r).length>1).map(([r,l])=>{let m=1/0,d="";const i=Object.entries(l).map(([u,f])=>{const g=f.reduce((b,A)=>b+A,0)/f.length;return g<m&&(m=g,d=u),{marca:u,med:g}});return`<div class="brand-card">
      <div class="brand-card-header">
        <span class="card-title">${r}</span>
        <span class="badge green">🏆 Menor preço: ${d} (${c(m)}/un)</span>
      </div>
      <div class="brands-row">
        ${i.map(u=>`<div class="brand-chip${u.marca===d?" best":""}">
          <div class="bc-name">${u.marca} ${u.marca===d?"✅":""}</div>
          <div class="bc-val">${c(u.med)}<span style="font-size:.7rem;font-weight:400">/un</span></div>
        </div>`).join("")}
      </div>
    </div>`}).join("");e.innerHTML=s||'<div class="empty-state">Ao comprar o mesmo tipo de produto com marcas diferentes, o sistema mostrará qual teve menor preço.</div>'}document.getElementById("btn-modal-close").addEventListener("click",()=>{document.getElementById("modal-cors").classList.remove("active")});
