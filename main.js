(()=>{const RM=matchMedia('(prefers-reduced-motion: reduce)').matches,$=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s),D=window.I18N||{};
const OK=l=>l==='th'||l==='en';let lang=null;
const qp=(new URLSearchParams(location.search).get('lang')||'').toLowerCase().slice(0,2);
if(OK(qp))lang=qp;else{try{const sv=localStorage.getItem('pureedit.lang');if(OK(sv))lang=sv}catch(e){}}
if(!lang)lang=/^th/i.test(navigator.language||'')?'th':'en';
function apply(l){lang=l;const d=D[l]||{};document.documentElement.lang=l;
$$('[data-i18n]').forEach(e=>{const v=d[e.dataset.i18n];if(v!=null)e.innerHTML=v});
$$('#lang span').forEach(s=>s.classList.toggle('on',s.dataset.l===l));
try{localStorage.setItem('pureedit.lang',l)}catch(e){}}
apply(lang);const lb=$('#lang');lb&&lb.addEventListener('click',()=>apply(lang==='th'?'en':'th'));
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('on');io.unobserve(x.target)}}),{threshold:.12});
$$('.reveal').forEach(el=>RM?el.classList.add('on'):io.observe(el));
const nav=$('.nav'),pb=$('#progress');let tk=0;
function onS(){tk=0;const y=scrollY,m=document.documentElement.scrollHeight-innerHeight;nav&&nav.classList.toggle('shrink',y>40);pb&&(pb.style.transform='scaleX('+(m>0?y/m:0)+')')}
addEventListener('scroll',()=>{if(!tk){tk=1;requestAnimationFrame(onS)}},{passive:true});onS();
const cv=$('#aurora');if(cv&&!RM){const x=cv.getContext('2d');let w,h,P=[],run=true,raf;const dpr=Math.min(devicePixelRatio||1,1.5);
function rs(){w=cv.width=innerWidth*dpr;h=cv.height=innerHeight*dpr;const n=Math.min(70,Math.round(innerWidth/22));P=Array.from({length:n},()=>({x:Math.random()*w,y:Math.random()*h,r:(Math.random()*1.4+.4)*dpr,vx:(Math.random()-.5)*.15*dpr,vy:(Math.random()-.5)*.15*dpr,a:Math.random()*.5+.2}))}
let t=0;function fr(){if(!run)return;t+=.003;x.clearRect(0,0,w,h);
[[.25,.15,'0,230,118'],[.75,.35,'16,185,129']].forEach(([px,py,c],i)=>{const cx=w*(px+.08*Math.sin(t+i*2)),cy=h*(py+.06*Math.cos(t*1.3+i)),g=x.createRadialGradient(cx,cy,0,cx,cy,Math.max(w,h)*.45);g.addColorStop(0,`rgba(${c},.10)`);g.addColorStop(1,`rgba(${c},0)`);x.fillStyle=g;x.fillRect(0,0,w,h)});
P.forEach(p=>{p.x=(p.x+p.vx+w)%w;p.y=(p.y+p.vy+h)%h;x.beginPath();x.arc(p.x,p.y,p.r,0,6.283);x.fillStyle=`rgba(200,255,225,${p.a})`;x.fill()});raf=requestAnimationFrame(fr)}
rs();addEventListener('resize',rs);fr();document.addEventListener('visibilitychange',()=>{run=!document.hidden;if(run){cancelAnimationFrame(raf);fr()}})}
// version.json → download buttons
fetch('version.json').then(r=>r.json()).then(v=>{
  const url=v.apkUrl||('PureEdit-'+v.versionName+'.apk');
  ['hero-dl','final-dl','nav-dl'].forEach(id=>{const a=document.getElementById(id);if(a)a.href=url});
  const pill=document.querySelector('[data-i18n="hero.pill"]');
}).catch(()=>{});
})();
