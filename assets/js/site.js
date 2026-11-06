(function(){const q=s=>document.querySelector(s);
const qm=q("#qm"),qg=q("#qg");
if(qm){const f=()=>{const m=+qm.value||0,g=+qg.value||0,ok=m>0&&g>0,n=ok?g-m*1.32-g*.07:0,pm=ok?n/m:0,a=q("#qn"),b=q("#qp");a.textContent="$"+n.toFixed(2);b.textContent="$"+pm.toFixed(2)+" / mi";a.className=b.className=n<0?"neg":"pos"};qm.oninput=qg.oninput=f}
const t=q("#tv");
if(t&&"IntersectionObserver"in window){new IntersectionObserver((e,o)=>{if(!e[0].isIntersecting)return;o.disconnect();
["TVC:USOIL","TVC:UKOIL"].forEach(s=>{const d=document.createElement("div");d.className="tradingview-widget-container";d.innerHTML='<div class="tradingview-widget-container__widget"></div>';
const j=document.createElement("script");j.src="https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";j.async=true;j.text=JSON.stringify({symbol:s,width:"100%",height:"70",colorTheme:"dark",isTransparent:true,locale:"en"});d.appendChild(j);t.appendChild(d)})}).observe(t)}
const m=new URLSearchParams(location.search).get("msg"),ta=q("#msg");if(m&&ta)ta.value=m;
const hs=q("#hubsel");
if(hs){const rs=[...document.querySelectorAll("#hubs tbody tr")];hs.innerHTML='<option value="">-- Choose Hub / City --</option>'+rs.map((r,i)=>'<option value="'+i+'">'+r.cells[0].textContent+'</option>').join("");
hs.onchange=()=>{const r=rs[hs.value],o=q("#hubres");if(!r){o.hidden=true;return}o.hidden=false;o.textContent=r.cells[0].textContent+": "+r.cells[1].textContent+"/gal diesel, about "+r.cells[2].textContent+" per mile in fuel at 6.5 MPG. Trend: "+r.cells[3].textContent+"."}}
})();
