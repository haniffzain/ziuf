/**
 * ZORX_ procedural cat — monochrome, code-built WebGL mascot.
 * Progressive enhancement: the inline SVG remains visible if WebGL or the CDN is unavailable.
 */
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js';

const mount = document.querySelector('.hero-art');
const holder = document.querySelector('.cat-wrap');
if (!mount || !holder || !window.WebGLRenderingContext) {
  // CSS/SVG fallback remains active.
} else {
  try {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(31, 1, .1, 100);
    camera.position.set(0, .5, 11.5);
    const renderer = new THREE.WebGLRenderer({alpha:true, antialias:true, powerPreference:'low-power'});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.className = 'zorx-webgl-cat';
    renderer.domElement.setAttribute('aria-hidden','true');
    renderer.domElement.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none;opacity:0;transition:opacity .5s;';
    holder.appendChild(renderer.domElement);

    const white = new THREE.MeshStandardMaterial({color:0xffffff, roughness:.78});
    const paper = new THREE.MeshStandardMaterial({color:0xeeeeee, roughness:.8});
    const grey = new THREE.MeshStandardMaterial({color:0xaaaaaa, roughness:.78});
    const black = new THREE.MeshStandardMaterial({color:0x151515, roughness:.68});
    const dark = new THREE.MeshStandardMaterial({color:0x343434, roughness:.6});
    const gloss = new THREE.MeshStandardMaterial({color:0x070707, roughness:.18, metalness:.12});
    const highlight = new THREE.MeshBasicMaterial({color:0xffffff});
    const cat = new THREE.Group(); scene.add(cat);

    function ellipsoid(parent, mat, x,y,z, sx,sy,sz) {
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(1,24,16), mat);
      mesh.position.set(x,y,z); mesh.scale.set(sx,sy,sz); parent.add(mesh); return mesh;
    }
    function lineTube(parent,points,r,mat){
      const curve=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)));
      const mesh=new THREE.Mesh(new THREE.TubeGeometry(curve,30,r,8,false),mat); parent.add(mesh); return mesh;
    }
    function ear(x,tilt){
      const earG=new THREE.Group(); earG.position.set(x,1.57,0);earG.rotation.z=tilt;cat.add(earG);
      const outer=new THREE.Mesh(new THREE.ConeGeometry(.55,1.15,4,1),black);outer.position.y=.24;outer.rotation.y=Math.PI/4; earG.add(outer);
      const inner=new THREE.Mesh(new THREE.ConeGeometry(.39,.8,4,1),white);inner.position.set(0,.2,.115);inner.rotation.y=Math.PI/4;earG.add(inner);
    }
    // Rounded body and oversized spherical head are deliberately chibi proportions.
    ellipsoid(cat,white,0,-.75,-.05,.93,1.0,.7);
    ear(-.88,.26);ear(.88,-.26);
    ellipsoid(cat,black,0,1.05,-.11,1.55,1.3,.96);
    ellipsoid(cat,white,0,1.02,.02,1.44,1.18,1.03);
    // Pixel-like forehead hair and tiny nose.
    ellipsoid(cat,paper,0,1.88,.43,.51,.14,.11);
    ellipsoid(cat,black,0,.64,1.02,.11,.073,.065);
    // Large shiny eyes, highlights and rosy cheeks rendered only as shades.
    for (const side of [-1,1]) {
      const eyeX=side*.54;
      ellipsoid(cat,gloss,eyeX,1.17,.91,.235,.345,.15);
      ellipsoid(cat,highlight,eyeX-.08,1.32,1.045,.07,.1,.026);
      ellipsoid(cat,highlight,eyeX+.075,1.055,1.044,.031,.043,.016);
      ellipsoid(cat,grey,side*1.06,.67,.72,.23,.105,.055);
      // subtle cheek stripes
      for(let i=0;i<2;i++){
        lineTube(cat,[[side*.88,.7-i*.09,.86],[side*1.12,.75-i*.09,.75]],.013,dark);
      }
    }
    lineTube(cat,[[-.17,.48,1.016],[0,.40,1.072],[.17,.48,1.016]],.023,black);
    // Goggles sit above the forehead.
    for(const side of [-1,1]){
      ellipsoid(cat,black,side*.55,2.03,.52,.53,.28,.18);
      ellipsoid(cat,grey,side*.55,2.05,.69,.40,.20,.08);
      ellipsoid(cat,paper,side*.57,2.12,.76,.18,.055,.023);
    }
    lineTube(cat,[[-1.01,2.13,.41],[0,2.27,.4],[1.02,2.13,.4]],.075,black);
    // Left-right headphones and Z emblem.
    for (const side of [-1,1]){
      ellipsoid(cat,black,side*1.48,1.18,.08,.3,.51,.28);
      ellipsoid(cat,grey,side*1.70,1.20,.13,.18,.32,.23);
    }
    // Scarf, small centre 'Z' as raised vector strokes.
    ellipsoid(cat,black,0,-.33,.35,1.02,.27,.65);
    lineTube(cat,[[-.15,-.25,1],[.16,-.25,1],[-.14,-.43,1],[.16,-.43,1]],.033,white);
    // Paws with visible toes.
    for(const side of [-1,1]){
      ellipsoid(cat,white,side*.65,-1.45,.49,.42,.3,.5);
      for(let i=0;i<2;i++)lineTube(cat,[[side*.65+(i-.5)*.15,-1.58,.91],[side*.65+(i-.5)*.15,-1.40,.9]],.015,grey);
    }
    const tail=lineTube(cat,[[.67,-1.13,-.25],[1.42,-.85,-.38],[1.68,-.13,-.35],[1.96,.1,-.31]],.18,white);
    // Tail tip; no skin-tone or accent colours.
    ellipsoid(cat,white,1.96,.1,-.31,.22,.23,.22);
    cat.rotation.y=-.12;cat.position.y=-.12;

    scene.add(new THREE.HemisphereLight(0xffffff,0x555555,2.6));
    const key = new THREE.DirectionalLight(0xffffff,3);key.position.set(-4,6,8);scene.add(key);
    const rim = new THREE.DirectionalLight(0xffffff,1.5);rim.position.set(4,1,-5);scene.add(rim);

    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let pointerX=0,pointerY=0,scrollYNow=0,visible=true,raf=0,started=false;
    const resize=()=>{const rect=holder.getBoundingClientRect(); if(rect.width<10||rect.height<10)return;camera.aspect=rect.width/rect.height;camera.updateProjectionMatrix();renderer.setSize(rect.width,rect.height,false)};
    const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible&&started&&!reduced&&!raf)raf=requestAnimationFrame(animate)}, {threshold:.01});
    observer.observe(holder);
    const onPointer=e=>{const r=mount.getBoundingClientRect();pointerX=Math.max(-1,Math.min(1,((e.clientX-r.left)/r.width-.5)*2));pointerY=Math.max(-1,Math.min(1,((e.clientY-r.top)/r.height-.5)*2))};
    mount.addEventListener('pointermove',onPointer,{passive:true});
    addEventListener('scroll',()=>{scrollYNow=Math.min(scrollY,1300)},{passive:true});
    const ro = new ResizeObserver(resize);ro.observe(holder);resize();

    let frame=0;const clock=new THREE.Clock();
    function animate(){
      raf=0;if(!visible||document.hidden)return;
      const t=clock.getElapsedTime();frame++;
      cat.rotation.y += ((reduced?-.12:pointerX*.33+Math.min(scrollYNow/1600,.25)) -cat.rotation.y)*.045;
      cat.rotation.x += ((reduced?0:-pointerY*.1)-cat.rotation.x)*.045;
      cat.position.y= -.13+(reduced?0:Math.sin(t*1.9)*.095);
      cat.rotation.z=reduced?0:Math.sin(t*1.15)*.025;
      renderer.render(scene,camera);if(!reduced)raf=requestAnimationFrame(animate);
    }
    renderer.render(scene,camera);renderer.domElement.style.opacity='1';holder.classList.add('webgl-active');started=true;
    if(!reduced)raf=requestAnimationFrame(animate);
    document.addEventListener('visibilitychange',()=>{if(!document.hidden&&visible&&!reduced&&!raf)raf=requestAnimationFrame(animate)});
    window.addEventListener('pagehide',()=>{if(raf)cancelAnimationFrame(raf);ro.disconnect();observer.disconnect();renderer.dispose()},{once:true});
  }catch(err){console.warn('3D mascot unavailable; keeping SVG fallback.',err);}
}
