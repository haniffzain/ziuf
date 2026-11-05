/* Ziuf mini-desktop: local-only interactive website demonstration. */
(() => {
'use strict';
const root=document.getElementById('ziuf-desktop');
if(!root)return;
const $=(id)=>root.querySelector('#'+id);
const menu=$('zd-startmenu'),start=$('zd-start'),note=$('zd-note');
const notesBtn=$('zd-task-notes'),clockEl=$('zd-clock'),area=$('zd-note-text'),save=$('zd-save');
const noteStatus=$('zd-note-status'),titlebar=$('zd-titlebar');
const key='ziuf-pixel-demo-note-v1';
let z=8, drag=null, saveTimer=null;
const initial='Welcome to Ziuf Notes! 🐈\n\nA tiny editable app inside our pixel desktop.\n\n• Click Z to open the Start Menu.\n• Drag this window by its titlebar.\n• Minimize, maximize or close it.\n• Your text is saved locally in this browser.\n\nBuilt with HTML, CSS & JavaScript.';
try{area.value=localStorage.getItem(key)??initial;}catch{area.value=initial;noteStatus.textContent='Local saving unavailable';}
function showNote(){note.hidden=false;notesBtn.setAttribute('aria-pressed','true');note.style.zIndex=++z;menu.hidden=true;start.setAttribute('aria-expanded','false');}
function hideNote(){note.hidden=true;notesBtn.setAttribute('aria-pressed','false');}
function toggleMenu(force){const open=typeof force==='boolean'?force:menu.hidden;menu.hidden=!open;start.setAttribute('aria-expanded',String(open));}
function setClock(){const now=new Date();clockEl.textContent=new Intl.DateTimeFormat(undefined,{hour:'2-digit',minute:'2-digit',hour12:false}).format(now);clockEl.title=new Intl.DateTimeFormat(undefined,{dateStyle:'full',timeStyle:'long'}).format(now);}
setClock();const clockTimer=setInterval(()=>{if(!document.hidden)setClock()},1000);
start.addEventListener('click',()=>toggleMenu());
root.querySelectorAll('[data-zd-open="notes"]').forEach(el=>el.addEventListener('click',showNote));
root.querySelectorAll('[data-zd-open="clock"]').forEach(el=>el.addEventListener('click',()=>{setClock();toggleMenu(false);clockEl.focus();}));
notesBtn.addEventListener('click',()=>note.hidden?showNote():hideNote());
$('zd-min').addEventListener('click',hideNote);
$('zd-close').addEventListener('click',hideNote);
$('zd-max').addEventListener('click',()=>{note.classList.toggle('maxed');note.style.left='';note.style.top='';note.style.right='';note.style.bottom='';note.style.width='';note.style.height='';note.style.zIndex=++z;});
note.addEventListener('pointerdown',()=>note.style.zIndex=++z);
function persist(){try{localStorage.setItem(key,area.value);noteStatus.textContent='Saved locally ✓';}catch{noteStatus.textContent='Not saved (browser storage unavailable)';}}
area.addEventListener('input',()=>{noteStatus.textContent='Editing…';clearTimeout(saveTimer);saveTimer=setTimeout(persist,400);});
save.addEventListener('click',persist);
root.addEventListener('pointerdown',e=>{if(!menu.hidden&&!e.target.closest('#zd-startmenu,#zd-start'))toggleMenu(false);});
root.addEventListener('keydown',e=>{if(e.key==='Escape'){toggleMenu(false);if(note.classList.contains('maxed'))note.classList.remove('maxed');}});
titlebar.addEventListener('pointerdown',e=>{
if(e.button!==0||e.target.closest('button')||note.classList.contains('maxed'))return;
e.preventDefault();note.style.zIndex=++z;
const parent=root.getBoundingClientRect(),rect=note.getBoundingClientRect();
drag={id:e.pointerId,sx:e.clientX,sy:e.clientY,x:rect.left-parent.left,y:rect.top-parent.top};
titlebar.setPointerCapture(e.pointerId);
});
titlebar.addEventListener('pointermove',e=>{
if(!drag||drag.id!==e.pointerId)return;
const width=note.getBoundingClientRect().width,height=note.getBoundingClientRect().height;
const nx=Math.min(Math.max(0,drag.x+e.clientX-drag.sx),Math.max(0,root.clientWidth-width));
const ny=Math.min(Math.max(0,drag.y+e.clientY-drag.sy),Math.max(0,root.clientHeight-45-height));
note.style.left=nx+'px';note.style.top=ny+'px';note.style.right='auto';note.style.bottom='auto';
});
function endDrag(){drag=null;}
titlebar.addEventListener('pointerup',endDrag);titlebar.addEventListener('pointercancel',endDrag);
window.addEventListener('pagehide',()=>{if(saveTimer){clearTimeout(saveTimer);persist();}clearInterval(clockTimer);},{once:true});
})();
