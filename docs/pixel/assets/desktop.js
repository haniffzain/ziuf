/* Ziuf mini desktop: local-only WYSIWYG Notes, taskbar, start menu and a real local clock. */
(() => {
'use strict';
const root=document.getElementById('ziuf-desktop');if(!root)return;
const $=(id)=>root.querySelector('#'+id);
const menu=$('zd-startmenu'),start=$('zd-start'),note=$('zd-note');
const notesBtn=$('zd-task-notes'),clockEl=$('zd-clock'),editor=$('zd-note-editor'),save=$('zd-save');
const noteStatus=$('zd-note-status'),titlebar=$('zd-titlebar');
if(!menu||!start||!note||!notesBtn||!clockEl||!editor||!save||!noteStatus||!titlebar)return;
const key='ziuf-pixel-demo-rich-note-v1',oldKey='ziuf-pixel-demo-note-v1';
let z=8,drag=null,saveTimer=null;
const allowed=new Set(['B','STRONG','I','EM','U','H3','P','DIV','BR','UL','OL','LI']);
const banned=new Set(['SCRIPT','STYLE','IFRAME','OBJECT','EMBED','SVG','MATH','FORM','LINK','META']);
function cleanNode(node,depth=0){
 if(depth>25)return document.createTextNode('');
 if(node.nodeType===Node.TEXT_NODE)return document.createTextNode(node.textContent||'');
 if(node.nodeType!==Node.ELEMENT_NODE)return document.createDocumentFragment();
 const tag=node.tagName;
 if(banned.has(tag))return document.createDocumentFragment();
 const out=allowed.has(tag)?document.createElement(tag.toLowerCase()):document.createDocumentFragment();
 for(const child of node.childNodes)out.appendChild(cleanNode(child,depth+1));
 return out;
}
function sanitizedHTML(value){
 const template=document.createElement('template');template.innerHTML=value;
 const safe=document.createElement('div');
 for(const node of template.content.childNodes)safe.appendChild(cleanNode(node));
 return safe.innerHTML.slice(0,65000);
}
function loadNotes(){
 try{
   const existing=localStorage.getItem(key);
   if(existing!==null){
     const safe=document.createElement('template');
     safe.innerHTML=sanitizedHTML(existing);
     editor.appendChild(safe.content.cloneNode(true));
     return;
   }
   const previous=localStorage.getItem(oldKey);
   if(previous!==null){editor.textContent=previous;return}
 }catch{noteStatus.textContent='Browser storage unavailable';}
 const heading=document.createElement('h3');heading.textContent='Welcome to Ziuf Notes 🐾';
 const para=document.createElement('p');para.textContent='A tiny WYSIWYG editor. Select some text and press B, I, U, or List to see it change immediately.';
 const para2=document.createElement('p');para2.textContent='Open Start, move this window, or save a note locally. This is a website demo—not a released Ziuf application.';
 editor.append(heading,para,para2);
}
loadNotes();
function showNote(){note.hidden=false;notesBtn.setAttribute('aria-pressed','true');note.style.zIndex=++z;toggleMenu(false);}
function hideNote(){note.hidden=true;notesBtn.setAttribute('aria-pressed','false');}
function toggleMenu(force){const open=typeof force==='boolean'?force:menu.hidden;menu.hidden=!open;start.setAttribute('aria-expanded',String(open));}
function setClock(){
 const now=new Date();
 clockEl.textContent=new Intl.DateTimeFormat(undefined,{hour:'2-digit',minute:'2-digit',hour12:false}).format(now);
 clockEl.title=new Intl.DateTimeFormat(undefined,{dateStyle:'full',timeStyle:'long'}).format(now);
}
setClock();
const clockTimer=setInterval(()=>{if(!document.hidden)setClock()},1000);
start.addEventListener('click',()=>toggleMenu());
root.querySelectorAll('[data-zd-open="notes"]').forEach(el=>el.addEventListener('click',showNote));
root.querySelectorAll('[data-zd-open="clock"]').forEach(el=>el.addEventListener('click',()=>{setClock();toggleMenu(false);clockEl.focus();}));
notesBtn.addEventListener('click',()=>note.hidden?showNote():hideNote());
$('zd-min').addEventListener('click',hideNote);$('zd-close').addEventListener('click',hideNote);
$('zd-max').addEventListener('click',()=>{
 note.classList.toggle('maxed');
 note.style.left='';note.style.top='';note.style.right='';note.style.bottom='';
 note.style.width='';note.style.height='';note.style.zIndex=++z;
});
note.addEventListener('pointerdown',()=>note.style.zIndex=++z);
function persist(){
 clearTimeout(saveTimer);saveTimer=null;
 try{
   if(editor.textContent.length>35000){noteStatus.textContent='Note too long to save (35,000-character limit)';return}
   localStorage.setItem(key,sanitizedHTML(editor.innerHTML));
   noteStatus.textContent='Saved in this browser ✓';
 }catch{noteStatus.textContent='Not saved — browser storage unavailable';}
}
function scheduleSave(){
 noteStatus.textContent='Editing…';
 clearTimeout(saveTimer);saveTimer=setTimeout(persist,450);
}
editor.addEventListener('input',scheduleSave);
save.addEventListener('click',persist);
// Paste text only, so third-party HTML or scripts cannot enter this miniature editor.
editor.addEventListener('paste',e=>{
 e.preventDefault();
 const text=(e.clipboardData?.getData('text/plain')||'').slice(0,35000);
 const selection=window.getSelection();
 if(!selection||!selection.rangeCount||!editor.contains(selection.anchorNode))return;
 const range=selection.getRangeAt(0);
 range.deleteContents();
 const node=document.createTextNode(text);
 range.insertNode(node);
 range.setStartAfter(node);range.collapse(true);
 selection.removeAllRanges();selection.addRange(range);
 scheduleSave();
});
root.querySelectorAll('[data-zd-format]').forEach(button=>{
 button.addEventListener('pointerdown',e=>e.preventDefault());
 button.addEventListener('click',()=>{
   const selection=window.getSelection();
   if(!selection||!selection.rangeCount||!editor.contains(selection.anchorNode)){
     noteStatus.textContent='Select text inside Notes first';editor.focus();return;
   }
   const command=button.dataset.zdFormat;
   const allowedCommands={bold:['bold',null],italic:['italic',null],underline:['underline',null],list:['insertUnorderedList',null],heading:['formatBlock','H3'],plain:['removeFormat',null]};
   const settings=allowedCommands[command];if(!settings)return;
   editor.focus();
   // execCommand is legacy browser functionality, used only for the bounded website demo.
   const applied=document.execCommand?.(settings[0],false,settings[1]);
   if(!applied){noteStatus.textContent='Formatting unsupported by this browser';return}
   scheduleSave();
 });
});
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
function endDrag(){drag=null}
titlebar.addEventListener('pointerup',endDrag);titlebar.addEventListener('pointercancel',endDrag);
window.addEventListener('pagehide',()=>{
 if(saveTimer)persist();
 clearInterval(clockTimer);
},{once:true});
})();