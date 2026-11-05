/* ZORX scene: layered parallax, mouse-following eyes and occasional ear twitch.
   No telemetry; the ordinary SVG image stays as a fallback. */
(() => {
'use strict';
const scene=document.querySelector('.hero'), cat=document.querySelector('.cat-wrap');
if(!scene||!cat)return;
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
let pending=false;
function updateParallax(){
 pending=false;
 const offset=reduced.matches?0:Math.max(-scene.offsetHeight,Math.min(scene.offsetHeight,-scene.getBoundingClientRect().top));
 for(const cloud of scene.querySelectorAll('[data-cloud-depth]')){
   const depth=Number(cloud.dataset.cloudDepth)||0;
   cloud.style.transform='translate3d(0,'+(offset*depth).toFixed(1)+'px,0)';
 }
}
function scheduleParallax(){if(!pending){pending=true;requestAnimationFrame(updateParallax)}}
addEventListener('scroll',scheduleParallax,{passive:true});
addEventListener('resize',scheduleParallax,{passive:true});
reduced.addEventListener?.('change',scheduleParallax);
scheduleParallax();
let alive=true,earTimer=0,mouseFrame=0,latestPointer=null;
let svg=null,eyeLeft=null,eyeRight=null,earLeft=null,earRight=null;
function moveEyes(){
 mouseFrame=0;
 if(!svg||!eyeLeft||!eyeRight)return;
 if(!latestPointer||reduced.matches){
   eyeLeft.removeAttribute('transform');eyeRight.removeAttribute('transform');return;
 }
 const rect=svg.getBoundingClientRect();
 const cx=rect.left+rect.width*.5,cy=rect.top+rect.height*.44;
 const nx=Math.max(-1,Math.min(1,(latestPointer.x-cx)/Math.max(rect.width*.28,90)));
 const ny=Math.max(-1,Math.min(1,(latestPointer.y-cy)/Math.max(rect.height*.3,90)));
 const transform='translate('+(nx*8.5).toFixed(2)+' '+(ny*5.5).toFixed(2)+')';
 eyeLeft.setAttribute('transform',transform);eyeRight.setAttribute('transform',transform);
}
function queueGaze(){if(!mouseFrame)mouseFrame=requestAnimationFrame(moveEyes)}
window.addEventListener('pointermove',event=>{if(!alive||reduced.matches)return;latestPointer={x:event.clientX,y:event.clientY};queueGaze()},{passive:true});
window.addEventListener('blur',()=>{latestPointer=null;queueGaze()});
reduced.addEventListener?.('change',()=>{if(reduced.matches){latestPointer=null;queueGaze();clearTimeout(earTimer)}else queueEar()});
function queueEar(){
 clearTimeout(earTimer);
 if(!alive||reduced.matches)return;
 earTimer=setTimeout(()=>{
   if(!alive)return;
   if(!document.hidden && (earLeft||earRight)){
     const ear=Math.random()<.5?earLeft:earRight;
     const amount=(ear===earLeft?-1:1)*(3+Math.random()*5);
     ear?.animate([
       {transform:'rotate(0deg)'},
       {transform:'rotate('+amount+'deg)',offset:.28},
       {transform:'rotate('+(-amount*.35)+'deg)',offset:.62},
       {transform:'rotate(0deg)'}
     ],{duration:380+Math.random()*180,easing:'ease-in-out',iterations:1});
   }
   queueEar();
 },2300+Math.random()*5100);
}
document.addEventListener('visibilitychange',()=>{if(!document.hidden){scheduleParallax();queueEar();queueGaze()}else clearTimeout(earTimer)});
async function hydrateMascot(){
 const img=cat.querySelector('img.mascot-drawn');if(!img)return;
 try{
   const response=await fetch('assets/zorx-observer.svg',{cache:'force-cache'});
   if(!response.ok)throw Error('Mascot fetch '+response.status);
   const xml=new DOMParser().parseFromString(await response.text(),'image/svg+xml');
   if(xml.querySelector('parsererror'))throw Error('SVG parse failed');
   const loaded=document.importNode(xml.documentElement,true);
   loaded.classList.add('mascot-drawn');loaded.setAttribute('role','img');
   loaded.setAttribute('aria-label','Seated ZORX kitten whose eyes follow the cursor and ears twitch');
   if(!alive)return;
   img.replaceWith(loaded);
   svg=loaded;eyeLeft=loaded.querySelector('#pupil-left');eyeRight=loaded.querySelector('#pupil-right');
   earLeft=loaded.querySelector('#ear-left');earRight=loaded.querySelector('#ear-right');
   queueGaze();queueEar();
 }catch(error){console.info('ZORX mascot remains in static fallback mode.',error)}
}
hydrateMascot();
addEventListener('pagehide',()=>{
 alive=false;clearTimeout(earTimer);
 if(mouseFrame)cancelAnimationFrame(mouseFrame);
},{once:true});
})();
