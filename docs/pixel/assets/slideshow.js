/* Accessible carousel: five documented chapters. Native scrolling supports touch/swipe. */
(() => {
'use strict';
const root=document.getElementById('journey-carousel');
if(!root)return;
const viewport=document.getElementById('journey-viewport');
const slides=Array.from(root.querySelectorAll('#journey-track .journey-step'));
const dots=Array.from(root.querySelectorAll('[data-journey-index]'));
const count=root.querySelector('#journey-count');
const prev=root.querySelector('#journey-prev');
const next=root.querySelector('#journey-next');
if(!viewport||!slides.length||!count||!prev||!next)return;
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
let current=0, pending=0;
function update(index,scroll=true){
 current=Math.min(slides.length-1,Math.max(0,index));
 slides.forEach((slide,i)=>{
   const selected=i===current;slide.classList.toggle('is-active',selected);
   slide.setAttribute('aria-hidden',String(!selected));
 });
 dots.forEach((button,i)=>button.setAttribute('aria-current',String(i===current)));
 count.textContent=String(current+1).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0');
 prev.disabled=current===0;next.disabled=current===slides.length-1;
 if(scroll)viewport.scrollTo({left:viewport.clientWidth*current,behavior:reduce.matches?'instant':'smooth'});
}
prev.addEventListener('click',()=>update(current-1));
next.addEventListener('click',()=>update(current+1));
dots.forEach(button=>button.addEventListener('click',()=>update(Number(button.dataset.journeyIndex))));
viewport.addEventListener('keydown',event=>{
 if(event.key!=='ArrowLeft'&&event.key!=='ArrowRight'&&event.key!=='Home'&&event.key!=='End')return;
 event.preventDefault();event.stopPropagation();
 update(event.key==='ArrowLeft'?current-1:event.key==='ArrowRight'?current+1:event.key==='Home'?0:slides.length-1);
});
viewport.addEventListener('scroll',()=>{
 if(pending)cancelAnimationFrame(pending);
 pending=requestAnimationFrame(()=>{
   pending=0;
   const index=Math.round(viewport.scrollLeft/Math.max(1,viewport.clientWidth));
   if(index!==current)update(index,false);
 });
},{passive:true});
new ResizeObserver(()=>viewport.scrollTo({left:current*viewport.clientWidth,behavior:'instant'})).observe(viewport);
update(0,false);
})();
