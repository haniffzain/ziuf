/* ZORX CAT JUMP — offline-capable HTML Canvas runner, no dependencies or tracking. */
(() => {
  'use strict';
  const canvas = document.getElementById('zorx-jump-canvas');
  const start = document.getElementById('zorx-jump-start');
  const jumpBtn = document.getElementById('zorx-jump-button');
  const status = document.getElementById('zorx-jump-status');
  const scoreText = document.getElementById('zorx-jump-score');
  const bestText = document.getElementById('zorx-jump-best');
  if (!canvas || !start || !jumpBtn || !status || !scoreText || !bestText) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const W = 800, H = 360, FLOOR = 300, G = 1950, IMPULSE = -720;
  canvas.width = W; canvas.height = H;
  ctx.imageSmoothingEnabled = false;
  let state = 'ready', score = 0, best = 0, speed = 255, spawnIn = 1.25, elapsed = 0, last = 0, raf = 0;
  const cat = {x:120, y:FLOOR-76, w:67, h:76, vy:0, grounded:true};
  let spikes = [], particles = [], clouds = [];
  for(let i=0;i<7;i++) clouds.push({x:i*160+35,y:40+i%3*33,s:0.8+i%3*.4});
  function reset() {
    score=0;speed=255;spawnIn=1.08;elapsed=0;spikes=[];particles=[];
    cat.y=FLOOR-cat.h;cat.vy=0;cat.grounded=true;
    scoreText.textContent='0000';state='running';start.textContent='↻ RESTART';
    status.textContent='RUNNING — jump over the spikes!';
    last=0;
    if(!raf) raf=requestAnimationFrame(frame);
  }
  function action(){
    if(state!=='running'){reset();return;}
    if(cat.grounded){
      cat.vy=IMPULSE;cat.grounded=false;
      for(let i=0;i<7;i++)particles.push({x:cat.x+cat.w/2,y:FLOOR-4,vx:(Math.random()-.5)*115,vy:-Math.random()*85,life:.38});
    }
  }
  start.addEventListener('click',reset);
  jumpBtn.addEventListener('click',action);
  canvas.addEventListener('pointerdown',e=>{e.preventDefault();canvas.focus();action();});
  document.addEventListener('keydown',e=>{
    if(!['Space','ArrowUp','KeyW'].includes(e.code)||e.repeat||e.altKey||e.ctrlKey||e.metaKey) return;
    const target=e.target;
    if(target instanceof Element && (target.closest('input,textarea,select,[contenteditable="true"]') || (target.closest('button') && target!==start && target!==jumpBtn))) return;
    const inView=canvas.getBoundingClientRect().top<innerHeight*.85&&canvas.getBoundingClientRect().bottom>innerHeight*.15;
    if(!inView && document.activeElement!==canvas) return;
    e.preventDefault();action();
  });
  const rr=(x,y,w,h,r,color)=>{ctx.fillStyle=color;ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill()};
  function poly(points,fill,stroke='#070707',sw=4){
    ctx.beginPath();ctx.moveTo(points[0][0],points[0][1]);
    for(let i=1;i<points.length;i++)ctx.lineTo(points[i][0],points[i][1]);
    ctx.closePath();ctx.fillStyle=fill;ctx.fill();
    if(sw){ctx.strokeStyle=stroke;ctx.lineWidth=sw;ctx.lineJoin='round';ctx.stroke();}
  }
  function circle(x,y,r,color,stroke,sw=3){ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle=color;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=sw;ctx.stroke();}}
  function catDrawing(t){
    const jumpTilt=cat.grounded?Math.sin(t*9)*.035:-.09;
    const stride=cat.grounded?Math.sin(t*13)*4:0;
    const x=cat.x+cat.w/2,y=cat.y+cat.h/2;
    ctx.save();ctx.translate(x,y);ctx.rotate(jumpTilt);
    // Tail curls, ears, plush body, white tummy and tiny paws.
    ctx.strokeStyle='#111';ctx.lineWidth=10;ctx.beginPath();ctx.moveTo(17,14);ctx.bezierCurveTo(56,20,50,-16,32,-10);ctx.stroke();
    ctx.strokeStyle='#eaeaea';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(17,14);ctx.bezierCurveTo(56,20,50,-16,32,-10);ctx.stroke();
    ctx.fillStyle='#a3a3a3';ctx.strokeStyle='#090909';ctx.lineWidth=3;
    ctx.beginPath();ctx.ellipse(0,15,25,31,0,0,Math.PI*2);ctx.fill();ctx.stroke();
    circle(0,20,17,'#fff');
    poly([[-27,-16],[-26,-53],[-5,-38]],'#aaa','#111',3);
    poly([[6,-38],[29,-54],[27,-13]],'#aaa','#111',3);
    poly([[-24,-23],[-24,-45],[-8,-31]],'#f9f9f9','#111',1.5);
    poly([[10,-31],[25,-45],[24,-23]],'#f9f9f9','#111',1.5);
    circle(0,-17,32,'#a3a3a3','#111',3);
    // white nose bridge and fluffy cheeks
    poly([[-9,-35],[0,-48],[9,-35],[9,-9],[-9,-9]],'#f6f6f6','#f6f6f6',0);
    circle(-16,-7,17,'#f6f6f6');circle(16,-7,17,'#f6f6f6');
    circle(-13,-20,9,'#111');circle(14,-20,9,'#111');
    circle(-16,-24,3.7,'#fff');circle(11,-24,3.7,'#fff');
    circle(0,-6,3,'#111');
    ctx.strokeStyle='#111';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(0,-3);ctx.lineTo(-5,1);ctx.moveTo(0,-3);ctx.lineTo(5,1);ctx.stroke();
    // little Z scarf and headphones
    rr(-25,3,50,12,4,'#111');
    ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-4,6);ctx.lineTo(4,6);ctx.lineTo(-4,12);ctx.lineTo(4,12);ctx.stroke();
    rr(24,-30,10,24,5,'#111');rr(27,-25,5,14,2,'#fff');
    // Goggles above eyes
    rr(-26,-45,22,9,4,'#111');rr(4,-45,22,9,4,'#111');
    rr(-20,-43,10,2,1,'#fff');rr(10,-43,10,2,1,'#fff');
    // rounded feet
    rr(-26,38+stride,24,10,5,'#fff');rr(4,38-stride,24,10,5,'#fff');
    ctx.restore();
  }
  function paint(){
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle='#111';ctx.fillRect(0,0,W,H);
    // deterministic starfield
    for(let i=0;i<52;i++){let x=(i*127+47)%W,y=(i*73+19)%215;
      ctx.fillStyle=i%4===0?'#eee':'#777';ctx.fillRect(x,y,i%7===0?3:2,i%7===0?3:2);}
    // Moon and cloud parallax
    circle(648,88,49,'#eee',null);circle(636,73,11,'#c9c9c9',null);circle(667,104,7,'#c9c9c9',null);
    for(const c of clouds){const x=((c.x-elapsed*speed*.11*c.s)%990+990)%990-100;rr(x,c.y,100*c.s,12,2,'#424242');rr(x+22*c.s,c.y-13,55*c.s,13,3,'#424242');}
    const off=(elapsed*speed*.2)%210;
    for(let i=-1;i<6;i++){let x=i*210-off;poly([[x,277],[x+99,158],[x+197,277]],'#3a3a3a','#3a3a3a',0);}
    const off2=(elapsed*speed*.42)%165;
    for(let i=-1;i<7;i++){let x=i*165-off2;poly([[x,302],[x+80,223],[x+164,302]],'#6f6f6f','#6f6f6f',0);}
    rr(0,FLOOR,W,H-FLOOR,0,'#f2f2f2');
    ctx.fillStyle='#111';ctx.fillRect(0,FLOOR,W,5);
    const floorMove=(elapsed*speed)%38;
    for(let x=-38;x<W;x+=38){ctx.fillStyle='#777';ctx.fillRect(x-floorMove,FLOOR+23,20,4)}
    // Spikes with high-contrast outlines.
    for(const obstacle of spikes){
      for(let i=0;i<obstacle.count;i++){
        const x=obstacle.x+i*obstacle.size;
        poly([[x,FLOOR],[x+obstacle.size*.5,FLOOR-obstacle.size],[x+obstacle.size,FLOOR]],'#f5f5f5','#111',4);
      }
    }
    for(const p of particles){ctx.fillStyle='#eee';ctx.fillRect(p.x,p.y,4,4);}
    catDrawing(elapsed);
    ctx.fillStyle='#fff';ctx.font='bold 17px monospace';ctx.fillText('ZORX CAT JUMP',20,28);
    ctx.font='bold 15px monospace';ctx.fillText('SCORE '+String(Math.floor(score)).padStart(4,'0'),20,50);
    if(state!=='running'){
      ctx.fillStyle='rgba(0,0,0,.64)';ctx.fillRect(0,70,W,180);
      ctx.fillStyle='#fff';ctx.textAlign='center';ctx.font='bold 32px monospace';
      ctx.fillText(state==='over'?'GAME OVER':'READY TO JUMP?',W/2,132);
      ctx.font='17px monospace';
      ctx.fillText(state==='over'?'Press SPACE or RESTART':'SPACE / ↑ / TAP to jump',W/2,172);
      ctx.font='14px monospace';ctx.fillText('Avoid spikes • Keep running',W/2,199);ctx.textAlign='left';
    }
  }
  function frame(timestamp){
    raf=0;if(document.hidden){last=0;return;}
    if(!last)last=timestamp;
    const dt=Math.min((timestamp-last)/1000,.032);last=timestamp;
    if(state==='running'){
      elapsed+=dt;score+=dt*10;speed=Math.min(520,255+Math.floor(score/60)*19);
      cat.vy+=G*dt;cat.y+=cat.vy*dt;
      if(cat.y+cat.h>=FLOOR){cat.y=FLOOR-cat.h;cat.vy=0;cat.grounded=true;}
      spawnIn-=dt;
      if(spawnIn<=0){
        const size=30+Math.round(Math.random()*8),count=(score>85&&Math.random()>.65)?2:1;
        spikes.push({x:W+20,size,count});
        spawnIn=Math.max(.8,1.35-Math.min(score/500,.4))+Math.random()*.47;
      }
      for(const s of spikes)s.x-=speed*dt;
      spikes=spikes.filter(s=>s.x+s.size*s.count>0);
      for(const p of particles){p.x+=p.vx*dt;p.y+=p.vy*dt;p.life-=dt;}
      particles=particles.filter(p=>p.life>0);
      // AABB with generous pixel-art hitboxes (avoid unfair invisible edges).
      const box={l:cat.x+12,r:cat.x+cat.w-10,t:cat.y+16,b:cat.y+cat.h-5};
      for(const s of spikes)for(let i=0;i<s.count;i++){
        const sx=s.x+i*s.size;
        if(box.r>sx+7 && box.l<sx+s.size-7 && box.b>FLOOR-s.size+9 && box.t<FLOOR-4){
          state='over';best=Math.max(best,Math.floor(score));bestText.textContent=String(best).padStart(4,'0');
          status.textContent='GAME OVER! Score '+Math.floor(score)+'. Press Restart or Space.';start.textContent='↻ PLAY AGAIN';
        }
      }
      scoreText.textContent=String(Math.floor(score)).padStart(4,'0');
    }
    paint();
    if(state==='running')raf=requestAnimationFrame(frame);
  }
  document.addEventListener('visibilitychange',()=>{if(!document.hidden&&state==='running'&&!raf){last=0;raf=requestAnimationFrame(frame);}});
  paint();
})();
