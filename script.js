// CURSOR
const cur=document.getElementById('cur'),cur2=document.getElementById('cur2');
let mx=0,my=0,cx2=0,cy2=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px';});
(function animCur(){cur2.style.left=cx2+=(mx-cx2)*0.12+'px'||mx+'px';cur2.style.top=cy2+=(my-cy2)*0.12+'px'||my+'px';requestAnimationFrame(animCur);})();
 
// CARDS DATA
const CARDS=[
  {id:1,name:'NOVA',type:'Star Entity',rarity:'legendary',number:'#001',
   stats:{power:98,speed:87,energy:92},
   attrs:{STR:98,AGI:87,INT:92,DEF:74,LCK:95},
   desc:'Born from the collapse of a supergiant star. Commands stellar winds and gravitational forces.',
   bg:'linear-gradient(135deg,#1a0a2e 0%,#2d1854 50%,#0a1628 100%)',
   artColor:'#7c3aed',artColor2:'#06b6d4',artSymbol:'✦',
   statColor:'#ffd700'},
  {id:2,name:'CIPHER',type:'Data Wraith',rarity:'epic',number:'#002',
   stats:{power:82,speed:95,energy:78},
   attrs:{STR:72,AGI:95,INT:88,DEF:65,LCK:80},
   desc:'An entity of pure information, capable of rewriting reality at the binary level.',
   bg:'linear-gradient(135deg,#0a1628 0%,#162040 50%,#0a0f1e 100%)',
   artColor:'#a855f7',artColor2:'#ec4899',artSymbol:'◈',
   statColor:'#bf7fff'},
  {id:3,name:'AXIOM',type:'Logic Core',rarity:'rare',number:'#003',
   stats:{power:75,speed:68,energy:89},
   attrs:{STR:65,AGI:68,INT:95,DEF:88,LCK:72},
   desc:'A philosophical construct that transforms abstract thought into kinetic energy.',
   bg:'linear-gradient(135deg,#062818 0%,#0f3d28 50%,#041810 100%)',
   artColor:'#10b981',artColor2:'#06b6d4',artSymbol:'⬡',
   statColor:'#5ab4ff'},
  {id:4,name:'SOLSTICE',type:'Solar Mage',rarity:'legendary',number:'#004',
   stats:{power:94,speed:71,energy:99},
   attrs:{STR:88,AGI:71,INT:99,DEF:82,LCK:90},
   desc:'Channels the raw energy of twin suns, wielding light itself as a weapon.',
   bg:'linear-gradient(135deg,#1e0a00 0%,#3d1a00 50%,#1e0800 100%)',
   artColor:'#f59e0b',artColor2:'#ef4444',artSymbol:'☀',
   statColor:'#ffd700'},
  {id:5,name:'VOID',type:'Null Entity',rarity:'epic',number:'#005',
   stats:{power:88,speed:88,energy:88},
   attrs:{STR:88,AGI:88,INT:88,DEF:88,LCK:88},
   desc:'Exists in the space between dimensions. Its true form is unknowable.',
   bg:'linear-gradient(135deg,#080808 0%,#101020 50%,#060610 100%)',
   artColor:'rgba(255,255,255,0.3)',artColor2:'rgba(200,200,255,0.4)',artSymbol:'∅',
   statColor:'#bf7fff'},
  {id:6,name:'STORM',type:'Weather God',rarity:'rare',number:'#006',
   stats:{power:86,speed:93,energy:81},
   attrs:{STR:86,AGI:93,INT:75,DEF:70,LCK:85},
   desc:'Controls atmospheric phenomena across planetary scales. Fears nothing.',
   bg:'linear-gradient(135deg,#0a1428 0%,#101e3c 50%,#060e1e 100%)',
   artColor:'#38bdf8',artColor2:'#818cf8',artSymbol:'⚡',
   statColor:'#5ab4ff'},
];
 
function createCardArt(card) {
  // Generate SVG art based on card theme
  const s=card.artSymbol;
  return `<svg width="100%" height="100%" viewBox="0 0 260 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="ag${card.id}" cx="50%" cy="50%">
        <stop offset="0%" stop-color="${card.artColor}" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="${card.artColor2}" stop-opacity="0"/>
      </radialGradient>
      <filter id="glow${card.id}"><feGaussianBlur stdDeviation="3" result="blur"/><feComposite in="SourceGraphic" in2="blur" operator="over"/></filter>
    </defs>
    <!-- Background circles -->
    <circle cx="130" cy="100" r="90" fill="url(#ag${card.id})"/>
    <circle cx="130" cy="100" r="65" fill="none" stroke="${card.artColor}" stroke-width="0.5" stroke-opacity="0.3"/>
    <circle cx="130" cy="100" r="45" fill="none" stroke="${card.artColor}" stroke-width="0.5" stroke-opacity="0.2"/>
    <!-- Rotating lines -->
    ${Array.from({length:8},(_,i)=>`<line x1="130" y1="100" x2="${130+85*Math.cos(i*Math.PI/4)}" y2="${100+85*Math.sin(i*Math.PI/4)}" stroke="${card.artColor}" stroke-width="0.5" stroke-opacity="0.25"/>`).join('')}
    <!-- Symbol -->
    <text x="130" y="115" text-anchor="middle" font-size="50" fill="${card.artColor}" filter="url(#glow${card.id})" opacity="0.9">${s}</text>
    <!-- Corner marks -->
    <rect x="20" y="20" width="12" height="1" fill="${card.artColor}" opacity="0.4"/>
    <rect x="20" y="20" width="1" height="12" fill="${card.artColor}" opacity="0.4"/>
    <rect x="228" y="20" width="12" height="1" fill="${card.artColor}" opacity="0.4"/>
    <rect x="239" y="20" width="1" height="12" fill="${card.artColor}" opacity="0.4"/>
  </svg>`;
}
 
function buildCard(card) {
  const div=document.createElement('div');
  div.className='holo-card';
  div.dataset.rarity=card.rarity;
  div.innerHTML=`
    <div class="card-base" style="background:${card.bg}"></div>
    <div class="holo-foil"></div>
    <div class="holo-shine"></div>
    <div class="holo-rainbow"></div>
    <div class="holo-border"></div>
    <div class="card-content">
      <div class="card-header">
        <div class="card-number">${card.number}</div>
        <div class="card-rarity rarity-${card.rarity}">${card.rarity}</div>
      </div>
      <div class="card-art">${createCardArt(card)}</div>
      <div class="card-footer">
        <div class="card-name">${card.name}</div>
        <div class="card-type">${card.type}</div>
        <div class="card-stats">
          <div class="stat"><div class="stat-val" style="color:${card.statColor}">${card.stats.power}</div><div class="stat-label">PWR</div></div>
          <div class="stat"><div class="stat-val" style="color:${card.statColor}">${card.stats.speed}</div><div class="stat-label">SPD</div></div>
          <div class="stat"><div class="stat-val" style="color:${card.statColor}">${card.stats.energy}</div><div class="stat-label">NRG</div></div>
        </div>
      </div>
    </div>`;
 
  // 3D tilt effect
  div.addEventListener('mousemove',e=>{
    const rect=div.getBoundingClientRect();
    const px=(e.clientX-rect.left)/rect.width;
    const py=(e.clientY-rect.top)/rect.height;
    const rx=(py-0.5)*24;
    const ry=(px-0.5)*-24;
    div.style.transform=`perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.04,1.04,1.04)`;
    div.querySelector('.holo-shine').style.setProperty('--mx',px*100+'%');
    div.querySelector('.holo-shine').style.setProperty('--my',py*100+'%');
    div.querySelector('.holo-rainbow').style.setProperty('--mx',px*100+'%');
    div.querySelector('.holo-rainbow').style.setProperty('--my',py*100+'%');
    div.querySelector('.holo-rainbow').style.setProperty('--angle',(px*360)+'deg');
    div.querySelector('.holo-border').style.setProperty('--angle',(px*360)+'deg');
    document.body.classList.add('card-hover');
  });
  div.addEventListener('mouseleave',()=>{
    div.style.transform='perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)';
    document.body.classList.remove('card-hover');
  });
  div.addEventListener('click',()=>openModal(card));
  return div;
}
 
// RENDER
const grid=document.getElementById('card-grid');
CARDS.forEach(c=>grid.appendChild(buildCard(c)));
 
// FILTER
document.querySelectorAll('.filter-btn').forEach(btn=>btn.addEventListener('click',function(){
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  this.classList.add('active');
  const f=this.dataset.filter;
  document.querySelectorAll('.holo-card').forEach(c=>{
    c.style.display=(f==='all'||c.dataset.rarity===f)?'':'none';
  });
}));
 
// MODAL
function openModal(card) {
  const colors={legendary:'#ffd700',epic:'#bf7fff',rare:'#5ab4ff',common:'rgba(255,255,255,0.5)'};
  const rc=colors[card.rarity];
  document.getElementById('modal-content').innerHTML=`
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;">
      <div style="width:56px;height:56px;border-radius:14px;background:${card.bg};border:1px solid rgba(255,255,255,0.1);display:grid;place-items:center;font-size:24px">${card.artSymbol}</div>
      <div>
        <div style="font-family:'Bebas Neue',cursive;font-size:28px;letter-spacing:0.04em">${card.name}</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.4);font-family:'Space Mono',monospace;margin-top:2px">${card.number} · ${card.type}</div>
      </div>
      <span style="margin-left:auto;font-size:10px;padding:4px 12px;border-radius:100px;background:${rc}22;color:${rc};border:1px solid ${rc}44;font-family:'Space Mono',monospace">${card.rarity}</span>
    </div>
    <p style="font-size:13px;color:rgba(255,255,255,0.5);line-height:1.7;margin-bottom:20px;">${card.desc}</p>
    <div style="font-size:10px;letter-spacing:0.2em;color:rgba(255,255,255,0.25);margin-bottom:10px;">ATTRIBUTES</div>
    <div class="attr-list" id="attrs"></div>
  `;
  const attrs=document.getElementById('attrs');
  Object.entries(card.attrs).forEach(([k,v])=>{
    attrs.innerHTML+=`<div class="attr-row"><div class="attr-name" style="font-family:'Space Mono',monospace">${k}</div><div class="attr-track"><div class="attr-fill" data-w="${v}" style="width:0%;background:${card.statColor}"></div></div><div class="attr-val">${v}</div></div>`;
  });
  document.getElementById('modal-overlay').classList.add('open');
  setTimeout(()=>{
    document.querySelectorAll('.attr-fill').forEach(f=>{f.style.width=f.dataset.w+'%';});
  },100);
}
document.getElementById('modal-close').onclick=()=>document.getElementById('modal-overlay').classList.remove('open');
document.getElementById('modal-overlay').addEventListener('click',function(e){if(e.target===this)this.classList.remove('open');});
document.addEventListener('keydown',e=>{if(e.key==='Escape')document.getElementById('modal-overlay').classList.remove('open');});
