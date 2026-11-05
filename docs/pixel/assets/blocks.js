/* ZORX BLOCKS — original monochrome falling-block puzzle demo.
 * Runs entirely in a GitHub Pages browser; not a Ziuf OS gaming benchmark. */
(() => {
'use strict';
const canvas=document.getElementById('blocks-canvas');
const start=document.getElementById('blocks-start');
const pause=document.getElementById('blocks-pause');
const scoreLabel=document.getElementById('blocks-score');
const linesLabel=document.getElementById('blocks-lines');
const levelLabel=document.getElementById('blocks-level');
const status=document.getElementById('blocks-status');
const nextCanvas=document.getElementById('blocks-next');
if(!canvas||!start||!pause||!scoreLabel||!linesLabel||!levelLabel||!status)return;
const ctx=canvas.getContext('2d');
const nextCtx=nextCanvas?.getContext('2d');
if(!ctx)return;
const COLS=10,ROWS=20,CELL=30;
canvas.width=COLS*CELL;canvas.height=ROWS*CELL;
const forms=[
  [[1,1,1,1]],
  [[2,2],[2,2]],
  [[0,3,0],[3,3,3]],
  [[0,4,4],[4,4,0]],
  [[5,5,0],[0,5,5]],
  [[6,0,0],[6,6,6]],
  [[0,0,7],[7,7,7]]
];
const tones=['','#fff','#c8c8c8','#e0e0e0','#8c8c8c','#b2b2b2','#dedede','#757575'];
let board=[],current=null,next=null,state='ready',score=0,lines=0,level=1,elapsed=0,last=0,raf=0;
const freshBoard=()=>Array.from({length:ROWS},()=>Array(COLS).fill(0));
function choose(){const index=Math.floor(Math.random()*forms.length);return forms[index].map(row=>row.slice())}
function newPiece(matrix){
  return {grid:matrix,x:Math.floor((COLS-matrix[0].length)/2),y:0};
}
function collides(grid,x,y){
  for(let r=0;r<grid.length;r++)for(let c=0;c<grid[r].length;c++){
    if(!grid[r][c])continue;
    const nx=x+c,ny=y+r;
    if(nx<0||nx>=COLS||ny>=ROWS)return true;
    if(ny>=0&&board[ny][nx])return true;
  }
  return false;
}
function announce(message){status.textContent=message}
function updateStats(){
  scoreLabel.textContent=String(score).padStart(5,'0');
  linesLabel.textContent=String(lines).padStart(2,'0');
  levelLabel.textContent=String(level).padStart(2,'0');
}
function spawn(){
  current=newPiece(next||choose());next=choose();
  drawNext();
  if(collides(current.grid,current.x,current.y)){
    state='over';announce('GAME OVER — select New Game to retry');start.textContent='↻ NEW GAME';
  }
}
function reset(){
  board=freshBoard();score=0;lines=0;level=1;elapsed=0;last=0;
  next=choose();spawn();state='playing';updateStats();
  start.textContent='↻ RESTART';pause.textContent='Ⅱ PAUSE';announce('Playing • Arrow keys / touch controls');
  draw();startLoop();canvas.focus({preventScroll:true});
}
function move(dx,dy){
  if(state!=='playing'||!current)return false;
  if(!collides(current.grid,current.x+dx,current.y+dy)){
    current.x+=dx;current.y+=dy;draw();return true;
  }
  if(dy>0)lockPiece();
  return false;
}
function spin(){
  if(state!=='playing'||!current)return;
  const src=current.grid;
  const rotated=src[0].map((_,i)=>src.map(row=>row[i]).reverse());
  for(const kick of [0,-1,1,-2,2]){
    if(!collides(rotated,current.x+kick,current.y)){
      current.x+=kick;current.grid=rotated;draw();return;
    }
  }
}
function fall(){
  if(state!=='playing'||!current)return;
  let distance=0;
  while(!collides(current.grid,current.x,current.y+1)){current.y++;distance++}
  score+=distance*2;lockPiece();updateStats();draw();
}
function lockPiece(){
  if(!current)return;
  for(let r=0;r<current.grid.length;r++)for(let c=0;c<current.grid[r].length;c++){
    const value=current.grid[r][c];if(!value)continue;
    const y=current.y+r,x=current.x+c;
    if(y>=0&&y<ROWS)board[y][x]=value;
  }
  let cleared=0;
  for(let row=ROWS-1;row>=0;row--){
    if(board[row].every(Boolean)){
      board.splice(row,1);board.unshift(Array(COLS).fill(0));cleared++;row++;
    }
  }
  if(cleared){
    score+=[0,100,300,500,800][cleared]*level;
    lines+=cleared;level=1+Math.floor(lines/10);
  }
  updateStats();spawn();
}
function hardDrop(){if(state!=='playing')return;fall()}
function togglePause(){
  if(state==='playing'){
    state='paused';pause.textContent='▶ RESUME';announce('Paused');if(raf)cancelAnimationFrame(raf);raf=0;draw();
  }else if(state==='paused'){
    state='playing';pause.textContent='Ⅱ PAUSE';announce('Playing');last=0;startLoop();
  }
}
function square(target,x,y,id,size=CELL,alpha=1){
  if(!id)return;
  target.save();target.globalAlpha=alpha;
  target.fillStyle=tones[id];target.fillRect(x+1,y+1,size-2,size-2);
  target.strokeStyle='#111';target.lineWidth=1.5;target.strokeRect(x+2,y+2,size-4,size-4);
  target.fillStyle='#ffffff66';target.fillRect(x+4,y+4,size-9,3);
  target.restore();
}
function paintPiece(piece,alpha=1){
  if(!piece)return;
  piece.grid.forEach((row,r)=>row.forEach((v,c)=>{if(v&&piece.y+r>=0)square(ctx,(piece.x+c)*CELL,(piece.y+r)*CELL,v,CELL,alpha)}));
}
function drawNext(){
  if(!nextCtx||!nextCanvas)return;
  nextCtx.clearRect(0,0,nextCanvas.width,nextCanvas.height);
  nextCtx.fillStyle='#101010';nextCtx.fillRect(0,0,nextCanvas.width,nextCanvas.height);
  if(!next)return;
  const size=20,x0=(nextCanvas.width-next[0].length*size)/2,y0=(nextCanvas.height-next.length*size)/2;
  next.forEach((row,r)=>row.forEach((v,c)=>{if(v)square(nextCtx,x0+c*size,y0+r*size,v,size)}));
}
function draw(){
  ctx.fillStyle='#111';ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.strokeStyle='#333';ctx.lineWidth=.65;
  for(let i=1;i<COLS;i++){ctx.beginPath();ctx.moveTo(i*CELL,0);ctx.lineTo(i*CELL,600);ctx.stroke()}
  for(let i=1;i<ROWS;i++){ctx.beginPath();ctx.moveTo(0,i*CELL);ctx.lineTo(300,i*CELL);ctx.stroke()}
  board.forEach((row,y)=>row.forEach((v,x)=>{if(v)square(ctx,x*CELL,y*CELL,v)}));
  if(current){
    if(state==='playing'){
      const ghost={...current};
      while(!collides(ghost.grid,ghost.x,ghost.y+1))ghost.y++;
      paintPiece(ghost,.24);
    }
    paintPiece(current);
  }
  if(state!=='playing'){
    ctx.fillStyle='#000c';ctx.fillRect(0,210,300,155);
    ctx.textAlign='center';ctx.fillStyle='#fff';
    ctx.font='bold 21px monospace';ctx.fillText(state==='ready'?'ZORX BLOCKS':state==='over'?'GAME OVER':'PAUSED',150,258);
    ctx.font='13px monospace';ctx.fillText(state==='ready'?'PRESS START':state==='paused'?'PRESS RESUME':'TRY AGAIN',150,286);
    ctx.font='11px monospace';ctx.fillText('MINI BROWSER DEMO',150,314);ctx.textAlign='left';
  }
}
function frame(time){
  raf=0;if(state!=='playing'||document.hidden)return;
  if(!last)last=time;
  elapsed+=Math.min(100,time-last);last=time;
  const interval=Math.max(115,730-(level-1)*53);
  if(elapsed>=interval){elapsed=0;move(0,1)}
  draw();
  if(state==='playing')raf=requestAnimationFrame(frame);
}
function startLoop(){if(!raf&&state==='playing')raf=requestAnimationFrame(frame)}
start.addEventListener('click',reset);
pause.addEventListener('click',togglePause);
const controls={
 left:()=>move(-1,0),right:()=>move(1,0),down:()=>{move(0,1);score++;updateStats()},
 rotate:spin,drop:hardDrop,pause:togglePause
};
document.querySelectorAll('[data-block-action]').forEach(button=>{
  button.addEventListener('click',()=>{const fn=controls[button.dataset.blockAction];if(fn)fn()});
});
document.addEventListener('keydown',event=>{
  if(!['ArrowLeft','ArrowRight','ArrowDown','ArrowUp','Space','KeyP'].includes(event.code)||event.repeat||event.altKey||event.ctrlKey||event.metaKey)return;
  const active=document.activeElement;
  if(active instanceof Element && active.closest('input,textarea,select,[contenteditable="true"]'))return;
  const r=canvas.getBoundingClientRect();
  const inView=r.top<innerHeight*.8&&r.bottom>innerHeight*.1;
  if(!inView&&active!==canvas)return;
  event.preventDefault();
  if(state==='ready'&&event.code==='Space'){reset();return}
  const command={ArrowLeft:'left',ArrowRight:'right',ArrowDown:'down',ArrowUp:'rotate',Space:'drop',KeyP:'pause'}[event.code];
  if(command&&controls[command])controls[command]();
});
document.addEventListener('visibilitychange',()=>{
  if(document.hidden && state==='playing'){state='paused';pause.textContent='▶ RESUME';announce('Paused while tab was hidden');if(raf)cancelAnimationFrame(raf);raf=0;draw()}
});
board=freshBoard();
// A static arrangement makes the minigame look like part of the landing-page art before play.
for(let y=17;y<ROWS;y++)for(let x=0;x<COLS;x++){if((x*7+y*3)%11<4)board[y][x]=1+(x+y)%7}
current={grid:forms[2].map(row=>row.slice()),x:4,y:7};
next=forms[1].map(row=>row.slice());
updateStats();drawNext();draw();
})();
