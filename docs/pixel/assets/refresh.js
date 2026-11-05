/* Responsive ZORX visual scene — SVG kitten waves autonomously, parallax is progressively enhanced. */
(() => {
'use strict';
const scene=document.querySelector('.hero');
const wave=document.getElementById('zorx-wave');
const cat=document.querySelector('.cat-wrap');
if(!scene||!cat)return;
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
let pending=false;
function parallax(){
 pending=false;
 if(reduce.matches){scene.style.setProperty('--scene-scroll','0px');return;}
 const r=scene.getBoundingClientRect();
 const offset=Math.max(-scene.offsetHeight,Math.min(scene.offsetHeight,-r.top));
 const clouds=scene.querySelectorAll('[data-cloud-depth]');
 for(const cloud of clouds){
   const depth=Number(cloud.dataset.cloudDepth)||0;
   cloud.style.transform='translate3d(0,'+(offset*depth).toFixed(1)+'px,0)';
 }
}
function requestUpdate(){if(!pending){pending=true;requestAnimationFrame(parallax);}}
window.addEventListener('scroll',requestUpdate,{passive:true});
window.addEventListener('resize',requestUpdate,{passive:true});
reduce.addEventListener?.('change',requestUpdate);
requestUpdate();
if(wave){
 wave.addEventListener('click',()=>{
    cat.classList.remove('hello');
    void cat.offsetWidth;
    cat.classList.add('hello');
    const mascot=cat.querySelector('img.mascot-drawn');
    if(mascot&&!reduce.matches){
      // Reload the tiny same-origin SVG to restart its self-contained waving animation.
      const url=new URL(mascot.getAttribute('src'),window.location.href);
      url.searchParams.set('wave',String(Date.now()));
      mascot.setAttribute('src',url.pathname+url.search);
    }
 });
 cat.addEventListener('animationend',()=>cat.classList.remove('hello'));
}
})();
