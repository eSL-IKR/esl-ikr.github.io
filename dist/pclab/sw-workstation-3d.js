/* 3D workstation adapted from user's eSL-IKR_PC_Workstation_3D(2).html.
   Preserves existing Windows step content in #scr and original sidebar engine. */
(function(){'use strict';
const el=id=>document.getElementById(id);let threeOK=false,started=false,renderer,scene,camera,controls,canvas,root,screenObj,usb,portPos,usbHome,drag=null,focusTween=null,usbTween=null,fans=[],state={connected:false,busy:false,help:false},flags={},lastMode='',toastTimer=0;
let screenBounds=null;const SCREEN={w:3.5,h:1.97},SWP=960,SHP=540;
function notice(m){const x=el('sw3dToast');if(!x)return;x.textContent=m;x.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>x.classList.remove('show'),2400)}
function mat(c,rough=.6,metal=.1){return new THREE.MeshStandardMaterial({color:c,roughness:rough,metalness:metal})}
function box(group,w,h,d,x,y,z,m){const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;group.add(mesh);return mesh}
function cylinder(group,r,d,x,y,z,m,axis='z'){let mesh=new THREE.Mesh(new THREE.CylinderGeometry(r,r,d,36),m);if(axis==='z')mesh.rotation.x=Math.PI/2;if(axis==='x')mesh.rotation.z=Math.PI/2;mesh.position.set(x,y,z);mesh.castShadow=true;group.add(mesh);return mesh}
function fan(parent,x,y,z,r,color){const g=new THREE.Group();g.position.set(x,y,z);parent.add(g);const ring=new THREE.Mesh(new THREE.TorusGeometry(r,.025,8,36),new THREE.MeshBasicMaterial({color,transparent:true,opacity:.8}));g.add(ring);let spinner=new THREE.Group();g.add(spinner);for(let i=0;i<7;i++){const wing=box(spinner,r*.38,r*.8,.023,0,r*.38,0,mat(i%2?0x45576d:0x58708b,.46,.22));wing.rotation.z=.37;wing.rotation.z+=i*.01;const arm=new THREE.Group();arm.rotation.z=i*Math.PI*2/7;spinner.remove(wing);arm.add(wing);spinner.add(arm)}cylinder(g,r*.16,.024,0,0,.019,mat(0xb0c8de,.3,.6));fans.push(spinner);return g}
function makeScene(){
const T=window.THREE;if(!T)throw Error('Three.js tidak dimuatkan');
canvas=el('sw3dCanvas');root=el('sw3dWork');
renderer=new T.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance'});
const lowPower=window.innerWidth<700 || (window.matchMedia&&matchMedia('(pointer:coarse)').matches);
renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,lowPower?1.15:1.45));renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=.82;renderer.outputEncoding=T.sRGBEncoding;
scene=new T.Scene();scene.background=new T.Color(0x0f1814);
camera=new T.PerspectiveCamera(38,1,.05,130);camera.position.set(3.55,3.43,8.30);
controls=new T.OrbitControls(camera,canvas);controls.enableDamping=true;controls.dampingFactor=.065;controls.minDistance=3;controls.maxDistance=17;
controls.maxPolarAngle=Math.PI*.495;controls.target.set(0,2.43,-.17);controls.update();

// High-quality studio materials: every visible surface remains a real 3D mesh.
const M={
 carbon:new T.MeshStandardMaterial({color:0x11151c,roughness:.39,metalness:.76}),
 shell:new T.MeshPhysicalMaterial({color:0x14191f,roughness:.25,metalness:.82,clearcoat:.68,clearcoatRoughness:.17}),
 matte:new T.MeshStandardMaterial({color:0x11151d,roughness:.68,metalness:.2}),
 bezel:new T.MeshPhysicalMaterial({color:0x080b11,roughness:.24,metalness:.72,clearcoat:.92,clearcoatRoughness:.12}),
 silver:new T.MeshStandardMaterial({color:0x87909e,roughness:.23,metalness:.9}),
 grill:new T.MeshStandardMaterial({color:0x080b10,roughness:.81,metalness:.45,side:T.DoubleSide}),
 PCB:new T.MeshStandardMaterial({color:0x111923,roughness:.74,metalness:.22}),
 gold:new T.MeshStandardMaterial({color:0xc2a16a,roughness:.28,metalness:.84}),
 blue:new T.MeshStandardMaterial({color:0x32c9ff,emissive:0x1391e2,emissiveIntensity:1.55,roughness:.32,metalness:.32}),
 violet:new T.MeshStandardMaterial({color:0xab79ff,emissive:0x7e40e6,emissiveIntensity:1.22,roughness:.35,metalness:.3}),
 pink:new T.MeshStandardMaterial({color:0xff53cb,emissive:0xd6248e,emissiveIntensity:1.0,roughness:.4,metalness:.2}),
 glass:new T.MeshPhysicalMaterial({color:0x99b3ce,roughness:.06,metalness:.08,transparent:true,opacity:.18,depthWrite:false,side:T.DoubleSide,clearcoat:1,clearcoatRoughness:.05}),
 desk:new T.MeshPhysicalMaterial({color:0x2d3b34,roughness:.52,metalness:.28,clearcoat:.22,clearcoatRoughness:.24})
};
const lightStrip=(parent,a,b,col,r=.014)=>{
 const from=new T.Vector3(...a),to=new T.Vector3(...b),v=to.clone().sub(from),obj=new T.Mesh(new T.CylinderGeometry(r,r,v.length(),7),new T.MeshBasicMaterial({color:col,transparent:true,opacity:.9}));
 obj.position.copy(from.add(to).multiplyScalar(.5));obj.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),v.normalize());parent.add(obj);return obj;
};
const rounded=(parent,w,h,d,x,y,z,m,r=.08)=>{
 const rr=Math.min(r,w/2-.001,h/2-.001),shape=new T.Shape(),x0=-w/2,y0=-h/2,x1=w/2,y1=h/2;
 shape.moveTo(x0+rr,y0);shape.lineTo(x1-rr,y0);shape.quadraticCurveTo(x1,y0,x1,y0+rr);shape.lineTo(x1,y1-rr);shape.quadraticCurveTo(x1,y1,x1-rr,y1);shape.lineTo(x0+rr,y1);shape.quadraticCurveTo(x0,y1,x0,y1-rr);shape.lineTo(x0,y0+rr);shape.quadraticCurveTo(x0,y0,x0+rr,y0);
 const geom=new T.ExtrudeGeometry(shape,{depth:Math.max(.005,d-.012),bevelEnabled:true,bevelSegments:2,steps:1,curveSegments:4,bevelThickness:.006,bevelSize:.007});geom.translate(0,0,-d/2+.006);
 const ob=new T.Mesh(geom,m);ob.position.set(x,y,z);ob.castShadow=true;ob.receiveShadow=true;parent.add(ob);return ob;
};
const torus=(parent,r,t,x,y,z,m,rotX=0,rotY=0)=>{let o=new T.Mesh(new T.TorusGeometry(r,t,10,64),m);o.rotation.set(rotX,rotY,0);o.position.set(x,y,z);parent.add(o);return o};
const cyl=(parent,r,h,x,y,z,m,axis='z')=>cylinder(parent,r,h,x,y,z,m,axis);
const label=(parent,words,w,h,x,y,z,color='#eef5ff',sz=88,rotation=0)=>{
 const c=document.createElement('canvas');c.width=640;c.height=160;const ctx=c.getContext('2d');
 ctx.clearRect(0,0,c.width,c.height);ctx.fillStyle=color;ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='900 '+sz+'px Arial, Helvetica, sans-serif';ctx.fillText(words,320,81,610);
 let tex=new T.CanvasTexture(c);tex.anisotropy=renderer.capabilities.getMaxAnisotropy();
 const mesh=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({map:tex,transparent:true,side:T.DoubleSide,depthWrite:false}));mesh.position.set(x,y,z);mesh.rotation.y=rotation;mesh.renderOrder=3;parent.add(mesh);return mesh;
};
// Six-curved-blade addressable RGB fans, with moving physical rotors.
const gamerFan=(parent,x,y,z,r,theme=0,axis='z')=>{
 let g=new T.Group();g.position.set(x,y,z);if(axis==='x')g.rotation.y=Math.PI/2;if(axis==='top')g.rotation.x=-Math.PI/2;parent.add(g);
 let square=rounded(g,2*r+.16,2*r+.16,.08,0,0,-.07,M.matte,.085);
 const ringMat=new T.MeshBasicMaterial({color:theme%2?0x8f77ff:0x40cbff});
 torus(g,r*.96,.027,0,0,.04,ringMat);torus(g,r*.77,.027,0,0,.058,new T.MeshBasicMaterial({color:theme%2?0x38dfff:0xe15eff}));
 let rotor=new T.Group();g.add(rotor);
 let bladeMaterial=new T.MeshPhysicalMaterial({color:0x283341,roughness:.23,metalness:.65,clearcoat:.85});
 for(let i=0;i<7;i++){
  const sh=new T.Shape();sh.moveTo(.065,0);sh.bezierCurveTo(.22,.0,r*.92,.10,r*.75,r*.36);sh.bezierCurveTo(r*.52,r*.56,.11,r*.55,.065,0);
  let geo=new T.ExtrudeGeometry(sh,{depth:.015,bevelEnabled:false,curveSegments:8}),mesh=new T.Mesh(geo,bladeMaterial);
  mesh.rotation.z=i*2*Math.PI/7;mesh.position.z=.065;rotor.add(mesh);
 }
 cyl(rotor,r*.185,.08,0,0,.09,M.silver);torus(g,r*.18,.014,0,0,.136,M.carbon);
 for(let i=0;i<4;i++){let a=i*Math.PI/2;lightStrip(g,[Math.cos(a)*(r+.035),Math.sin(a)*(r+.035),-.055],[Math.cos(a)*r*.67,Math.sin(a)*r*.67,-.05],0x596474,.016)}
 fans.push(rotor);return g;
};
// Studio sweep and ground, rather than a dated tan office table.
const bgC=document.createElement('canvas');bgC.width=1024;bgC.height=512;
let bx=bgC.getContext('2d'),grad=bx.createLinearGradient(0,0,0,512);
grad.addColorStop(0,'#0f1814');grad.addColorStop(.58,'#18261f');grad.addColorStop(1,'#23362d');bx.fillStyle=grad;bx.fillRect(0,0,1024,512);
let glow=bx.createRadialGradient(530,255,20,530,255,480);glow.addColorStop(0,'rgba(86,129,105,.07)');glow.addColorStop(1,'rgba(40,63,51,0)');bx.fillStyle=glow;bx.fillRect(0,0,1024,512);
const bgTex=new T.CanvasTexture(bgC),back=new T.Mesh(new T.PlaneGeometry(32,18),new T.MeshBasicMaterial({map:bgTex,depthWrite:false}));back.position.set(0,6,-11);scene.add(back);
scene.add(new T.HemisphereLight(0x93b4a1,0x0d1411,.58));
const key=new T.DirectionalLight(0xfff1dc,1.18);key.position.set(-5.5,8.4,7.2);key.castShadow=true;key.shadow.mapSize.set(lowPower?768:1536,lowPower?768:1536);key.shadow.camera.left=-12;key.shadow.camera.right=12;key.shadow.camera.top=11;key.shadow.camera.bottom=-9;key.shadow.bias=-.00016;scene.add(key);
const rim=new T.DirectionalLight(0x7ca69a,.64);rim.position.set(6,6,-6);scene.add(rim);
const fill=new T.DirectionalLight(0xb3cbbf,.32);fill.position.set(7,4,8);scene.add(fill);
const ambRGB=new T.PointLight(0x6ba889,.24,4.5);ambRGB.position.set(3.2,3.2,1.6);scene.add(ambRGB);
let floor=box(scene,26,.12,19,0,.16,0,new T.MeshPhysicalMaterial({color:0x1e2a25,roughness:.9,metalness:.02}));
// Forest Green studio tabletop and slim metal legs.
rounded(scene,10.65,4.28,.16,.10,.90,.15,M.desk,.045).rotation.x=-Math.PI/2;
// The roundRect is constructed in its local xy plane; the tabletop's large dimensions are x/z after rotation.
for(let x of [-4.65,4.88])for(let z of [-1.62,1.94])box(scene,.10,.68,.10,x,.50,z,M.shell);
const edgeLit=box(scene,10.47,.017,.02,.10,.92,2.31,new T.MeshBasicMaterial({color:0x405667}));

// ASUS-style gaming monitor: black narrow bezel, red accent and broad V stand.
const mon=new T.Group();mon.position.set(-1.77,0,-1.16);scene.add(mon);
rounded(mon,3.96,2.34,.12,0,2.70,-.04,M.bezel,.073);
rounded(mon,3.78,2.13,.025,0,2.73,.028,M.matte,.018);
const screen=new T.Mesh(new T.PlaneGeometry(SCREEN.w,SCREEN.h),new T.MeshBasicMaterial({color:0x070e19,side:T.DoubleSide}));screen.position.set(0,2.74,.059);mon.add(screen);screenObj=screen;
// Subtle illuminated side trims, panel buttons, logo, red centre neck.
lightStrip(mon,[-1.93,1.59,.023],[-1.93,3.77,.023],0x172e55,.008);
lightStrip(mon,[1.93,1.59,.023],[1.93,3.77,.023],0x172e55,.008);
label(mon,'ASUS',.45,.09,0,1.57,.065,'#e5e7ef',88);
box(mon,.22,.55,.21,0,1.25,-.09,M.shell);box(mon,.07,.27,.015,0,1.28,.025,M.pink);
const stand=new T.Group();stand.position.set(0,1.01,0);mon.add(stand);
box(stand,1.45,.065,.42,0,0,.15,M.bezel);box(stand,.12,.064,.55,-.73,0,.38,M.shell);box(stand,.12,.064,.55,.73,0,.38,M.shell);
cyl(mon,.028,.025,1.84,1.58,.082,new T.MeshBasicMaterial({color:0xf12d4c}));

// Black high-end double-chamber ROG tower with a real transparent side panel.
const tower=new T.Group();tower.position.set(2.45,0,-.76);tower.rotation.y=-.38;scene.add(tower);
const W=1.89,D=1.93,H=3.40,Y=2.75,F=D/2;
// Internal frame, chassis feet and outer top/bottom.
box(tower,W,.14,D,0,Y-H/2,0,M.shell);box(tower,W,.13,D,0,Y+H/2,0,M.shell);
for(let x of [-W/2+.06,W/2-.06])for(let z of [-D/2+.06,D/2-.06])box(tower,.09,H,.09,x,Y,z,M.shell);
for(let x of [-.64,.64])for(let z of [-.71,.71])box(tower,.22,.12,.25,x,1.025,z,M.carbon);
box(tower,.085,H-.19,D-.15,-W/2,Y,0,M.shell);box(tower,W,H-.20,.08,0,Y,-D/2,M.carbon);
// ASUS ROG motherboard on a dark PCB visible through the side glass.
box(tower,.065,2.15,1.43,.16,3.07,-.23,M.PCB);
// PCB copper traces, capacitors and heatsinks.
for(let i=0;i<22;i++){
 const yy=2.09+(i%11)*.161,zz=-.82+(i*7%13)*.105;
 box(tower,.007,.010,.38,.204,yy,zz,new T.MeshStandardMaterial({color:i%2?0x83704e:0x526079,roughness:.55,metalness:.7}));
}
for(let i=0;i<17;i++)cyl(tower,.035,.075,.28,2.1+(i%8)*.24,-.84+Math.floor(i/8)*.26,M.silver,'x');
box(tower,.13,.50,.41,.28,3.66,-.73,M.shell);for(let i=0;i<7;i++)box(tower,.14,.015,.36,.36,3.43+i*.055,-.73,M.silver);
// Square AIO cooling block + concentric luminous pump ring and screen logo, side-facing.
const pump=new T.Group();pump.position.set(.33,3.07,-.24);tower.add(pump);
box(pump,.22,.56,.55,0,0,0,M.bezel);
const AIO=new T.MeshBasicMaterial({color:0x568bff});torus(pump,.223,.033,.13,0,0,AIO,0,Math.PI/2);
torus(pump,.167,.018,.153,0,0,M.pink,0,Math.PI/2);label(pump,'ROG',.38,.19,.17,0,0,'#f0e9ff',92,Math.PI/2);
// Twin RGB DDR sticks behind cooler, with diffused strips.
for(let i=0;i<2;i++){
 let zz=.29+i*.23;box(tower,.10,.89,.13,.43,3.39,zz,M.shell);box(tower,.031,.74,.127,.50,3.40,zz,i===0?M.blue:M.violet);
}
// Full-length GEForce GPU, translucent windows, multi-heatpipe shroud.
box(tower,.29,.39,1.57,.38,2.13,-.12,M.shell);
box(tower,.31,.13,1.64,.38,2.39,-.12,M.carbon);
label(tower,'GEFORCE RTX',.89,.13,.545,2.29,-.16,'#def4ff',68,Math.PI/2);
for(let j=0;j<2;j++){
 let z=-.57+j*.72;torus(tower,.155,.025,.55,2.12,z,M.silver,0,Math.PI/2);
 let blades=new T.Group();blades.position.set(.57,2.12,z);blades.rotation.y=Math.PI/2;tower.add(blades);
 for(let k=0;k<6;k++){
  let sh=new T.Shape();sh.moveTo(.02,.02);sh.quadraticCurveTo(.11,.00,.135,.09);sh.quadraticCurveTo(.01,.14,.02,.02);
  let b=new T.Mesh(new T.ShapeGeometry(sh),M.carbon);b.rotation.z=k*Math.PI/3;blades.add(b);
 }
}
// PSU shroud, graphics rails and drive bays.
box(tower,.94,.47,1.55,-.10,1.42,-.06,M.carbon);
lightStrip(tower,[-.35,1.72,.73],[.48,1.72,.73],0x803fff,.024);
label(tower,'ROG',.43,.17,.50,1.43,-.12,'#d8dbec',75,Math.PI/2);
for(let i=0;i<3;i++)box(tower,.12,.12,.33,-.55,1.58,-.52+i*.43,M.shell);
// Realistic braided AIO hoses along a CatmullRom path.
for(let j=0;j<2;j++){
 let pts=[new T.Vector3(.39,3.0,-.46+j*.06),new T.Vector3(.40,3.68,-.58+j*.08),new T.Vector3(.03,4.03,-.69+j*.13),new T.Vector3(-.24,4.1,-.70+j*.13)];
 const curve=new T.CatmullRomCurve3(pts),geom=new T.TubeGeometry(curve,40,.037,8,false),line=new T.Mesh(geom,M.matte);tower.add(line);
}
// Upper RGB radiator fans, plus three prominent front intake RGB fans.
for(let i=0;i<3;i++){
 let f=gamerFan(tower,-.48+i*.48,4.27,-.13,.185,i,'top');
}
for(let i=0;i<3;i++)gamerFan(tower,.02,1.64+i*.97,F-.02,.35,i);
gamerFan(tower,-.50,3.37,-D/2+.17,.27,1);
// Front perforated mesh with charcoal tint and geometric borders; leave RGB fan visibility clear.
let meshFront=new T.Mesh(new T.PlaneGeometry(W-.13,H-.18,1,1),new T.MeshPhysicalMaterial({color:0x10151d,transparent:true,opacity:.22,roughness:.4,metalness:.5,side:T.DoubleSide,depthWrite:false}));
meshFront.position.set(0,Y,F+.055);tower.add(meshFront);
for(let x of [-.88,.88])lightStrip(tower,[x,1.18,F+.075],[x,4.24,F+.075],x>0?0x92283a:0x292c38,.014);
for(let y of [1.14,4.32])lightStrip(tower,[-.86,y,F+.067],[.86,y,F+.067],0x1c2232,.019);
// Smoked glass side panel with visible frame and thin RGB rail.
let glass=box(tower,.025,H-.22,D-.13,W/2+.028,Y,-.02,M.glass);glass.castShadow=false;
for(let z of [-.92,.92])lightStrip(tower,[W/2+.052,1.16,z],[W/2+.052,4.29,z],z>0?0x8944ee:0x2e445e,.014);
label(tower,'ROG',.36,.16,W/2+.079,3.91,-.68,'#d1d5e7',86,Math.PI/2);
// Thin glossy roof with perforations.
for(let i=0;i<16;i++)box(tower,1.36,.012,.018,0,4.48,-.76+i*.098,M.grill);
// Power + actual USB Type-A socket at front upper strip. Preserve original software bridge.
box(tower,.60,.20,.085,-.38,4.23,F+.095,M.shell);
cyl(tower,.048,.018,-.69,4.25,F+.149,M.blue);
const port=new T.Group();port.position.set(-.18,4.25,F+.11);tower.add(port);
box(port,.26,.12,.04,0,0,0,M.silver);box(port,.20,.077,.04,0,0,.027,M.grill);box(port,.177,.018,.014,0,-.018,.050,M.blue);
for(let i=0;i<4;i++)box(port,.012,.012,.012,-.059+i*.039,.016,.058,M.gold);
const ring=new T.Mesh(new T.BoxGeometry(.37,.20,.035),new T.MeshBasicMaterial({color:0x62dfff,transparent:true,opacity:0,wireframe:true}));ring.position.z=.065;port.add(ring);window.__sw3dPortRing=ring;
tower.updateMatrixWorld(true);portPos=tower.localToWorld(new T.Vector3(-.18,4.25,F+.11+.14));
// Mechanical ROG keyboard: individual sculpted floating keycaps + RGB underglow.
const kb=new T.Group();kb.position.set(-1.76,1.05,1.65);kb.rotation.x=-.06;scene.add(kb);
rounded(kb,2.88,.75,.12,0,.01,0,M.bezel,.075).rotation.x=-Math.PI/2;
// key block uses boxes aligned to xz tabletop. Board keys are individually modeled.
const keyMaterials=[new T.MeshPhysicalMaterial({color:0x2a303e,roughness:.35,metalness:.18,clearcoat:.35}),new T.MeshPhysicalMaterial({color:0x121822,roughness:.35,metalness:.18,clearcoat:.35})];
for(let r=0;r<5;r++)for(let c=0;c<18;c++){
 let ww=.126; if(r===4&&c>=6&&c<=10){if(c!==6)continue;ww=.72;}
 let xx=-1.33+c*.154+(ww>.2?.29:0),zz=-.27+r*.138;
 box(kb,ww,.052,.103,xx,.105,zz,keyMaterials[(r+c)%5===0?0:1]);
 if((c+r)%3===0)box(kb,Math.min(.064,ww-.012),.003,.008,xx,.137,zz-.024,new T.MeshBasicMaterial({color:[0x247eff,0xbf55ff,0x26d6df][(c+r)%3]}));
}
for(let x of [-1.43,1.43])lightStrip(kb,[x,.045,-.39],[x,.045,.39],0x745bff,.015);
lightStrip(kb,[-1.38,.04,.40],[1.38,.04,.40],0x368eff,.018);
// Sculpted high-resolution gaming mouse, RGB scrollwheel and lighting rails.
const mouse=new T.Group();mouse.position.set(.45,1.12,1.68);scene.add(mouse);
const mouseBody=new T.Mesh(new T.SphereGeometry(1,32,24),M.bezel);mouseBody.scale.set(.185,.095,.29);mouse.add(mouseBody);
const mouseTop=new T.Mesh(new T.SphereGeometry(1,24,20),M.shell);mouseTop.scale.set(.154,.040,.225);mouseTop.position.y=.043;mouse.add(mouseTop);
lightStrip(mouse,[-.155,0,.05],[-.11,.005,.23],0x3388ff,.010);lightStrip(mouse,[.155,0,.05],[.11,.005,.23],0xb84aff,.010);
box(mouse,.027,.035,.065,0,.099,-.05,M.blue);label(mouse,'ROG',.17,.07,0,.102,.13,'#d9b0ff',82);
// Physical USB stick on desk; user can still drag/snap into PC.
usbHome=new T.Vector3(.96,1.085,1.46);usb=new T.Group();usb.position.copy(usbHome);scene.add(usb);
rounded(usb,.29,.37,.14,0,.02,.12,M.bezel,.045).rotation.x=-Math.PI/2;
box(usb,.22,.07,.21,0,.004,-.20,M.silver);box(usb,.15,.035,.12,0,.002,-.31,M.blue);
for(let i=0;i<4;i++)box(usb,.013,.005,.05,-.04+i*.027,.024,-.32,M.gold);
label(usb,'USB',.23,.08,0,.093,.07,'#bcdcff',75);
usb.traverse(o=>{if(o.isMesh)o.userData.swusb=true});
// Realistically broad shadows, soft cool reflections and premium contrast.
scene.traverse(o=>{if(o.isMesh){o.receiveShadow=true;if(o.material===M.glass)o.castShadow=false}});
function resize(){const rw=root.clientWidth,rh=root.clientHeight;if(rw<2||rh<2)return;camera.aspect=rw/rh;camera.zoom=Math.min(1,Math.max(.55,camera.aspect/1.48));camera.updateProjectionMatrix();renderer.setSize(rw,rh,false)}
resize();window.addEventListener('resize',resize);if(window.ResizeObserver){let obs=new ResizeObserver(resize);obs.observe(root)}
const rcast=new THREE.Raycaster();function pointer(e){const rect=canvas.getBoundingClientRect();return{x:e.clientX-rect.left,y:e.clientY-rect.top,rect}}
function cast(e){const p=pointer(e);let ndc=new THREE.Vector2(p.x/p.rect.width*2-1,1-p.y/p.rect.height*2);rcast.setFromCamera(ndc,camera);const hits=rcast.intersectObject(usb,true);return hits.length>0}
function project(v){const p=v.clone().project(camera);return{x:(p.x+1)*root.clientWidth*.5,y:(1-p.y)*root.clientHeight*.5,z:p.z}}
canvas.addEventListener('pointerdown',e=>{if(state.busy||!cast(e))return;drag={id:e.pointerId,start:pointer(e),orig:usb.position.clone(),near:false,moved:0};controls.enabled=false;canvas.setPointerCapture(e.pointerId);e.preventDefault()});
canvas.addEventListener('pointermove',e=>{if(!drag||drag.id!==e.pointerId)return;const p=pointer(e),dx=p.x-drag.start.x,dy=p.y-drag.start.y;drag.moved=Math.hypot(dx,dy);let pt=project(portPos);drag.near=Math.hypot(pt.x-p.x,pt.y-p.y)<Math.max(55,Math.min(root.clientWidth,root.clientHeight)*.12);
if(drag.near){usb.position.lerp(new THREE.Vector3(portPos.x,portPos.y,portPos.z+.40),.27)}else{usb.position.set(Math.max(-4,Math.min(4.2,drag.orig.x+dx*.008)),Math.max(1.08,Math.min(4.0,drag.orig.y-dy*.008)),1.42)}e.preventDefault()});
canvas.addEventListener('pointerup',e=>{if(!drag||drag.id!==e.pointerId)return;let d=drag;drag=null;controls.enabled=true;try{canvas.releasePointerCapture(e.pointerId)}catch(err){};
if(d.near&&d.moved>12&&!state.connected){state.connected=true;usbTween={from:usb.position.clone(),to:new THREE.Vector3(portPos.x,portPos.y,portPos.z+.29),t:performance.now(),len:650};notice('✓ Pendrive melekat pada port USB 3D.');if(window.__ESL_SW_BRIDGE__)window.__ESL_SW_BRIDGE__.usbInsert();}
else if(d.moved>12){usbTween={from:usb.position.clone(),to:usbHome.clone(),t:performance.now(),len:420};notice('Lepaskan pendrive pada port USB yang diserlahkan.')}else if(!state.connected)notice('Seret pendrive ke port USB pada casing PC.');
});canvas.addEventListener('pointercancel',()=>{drag=null;if(controls)controls.enabled=true;if(usb&&!state.connected)usb.position.copy(usbHome)});
function setView(m){lastMode=m;const presets={overview:{p:[3.55,3.43,8.30],t:[0,2.43,-.17]},monitor:{p:[-1.55,3.15,4.90],t:[-1.77,2.74,-1.13]},pc:{p:[5.20,3.60,3.65],t:[2.45,2.82,-.70]},port:{p:[3.20,4.78,2.5],t:[portPos.x,portPos.y,portPos.z]}};let s=presets[m]||presets.overview;focusTween={p:camera.position.clone(),q:new THREE.Vector3(...s.p),from:controls.target.clone(),to:new THREE.Vector3(...s.t),start:performance.now(),len:750};document.querySelectorAll('[data-swc]').forEach(b=>b.classList.toggle('on',b.dataset.swc===m))}
function screenTransform(){const target=el('sw3dScreen');if(!target||!root.clientWidth||!root.clientHeight)return;
const world=screenObj.getWorldPosition(new THREE.Vector3());const n=new THREE.Vector3(0,0,1).applyQuaternion(screenObj.getWorldQuaternion(new THREE.Quaternion()));if(camera.position.clone().sub(world).dot(n)<.10){target.style.visibility='hidden';return}target.style.visibility='visible';
const corners=[[-SCREEN.w/2,SCREEN.h/2],[SCREEN.w/2,SCREEN.h/2],[SCREEN.w/2,-SCREEN.h/2],[-SCREEN.w/2,-SCREEN.h/2]].map(([x,y])=>project(screenObj.localToWorld(new THREE.Vector3(x,y,0))));
// Quad homography from 960x540 HTML content to perspective-projected monitor in WebGL.
const A=[];const B=[];[[0,0],[SWP,0],[SWP,SHP],[0,SHP]].forEach(([x,y],i)=>{let X=corners[i].x,Y=corners[i].y;A.push([x,y,1,0,0,0,-X*x,-X*y]);B.push(X);A.push([0,0,0,x,y,1,-Y*x,-Y*y]);B.push(Y)});
for(let j=0;j<8;j++){let m=j;for(let k=j+1;k<8;k++)if(Math.abs(A[k][j])>Math.abs(A[m][j]))m=k;[A[j],A[m]]=[A[m],A[j]];[B[j],B[m]]=[B[m],B[j]];let v=A[j][j];if(Math.abs(v)<1e-8)return;for(let k=j;k<8;k++)A[j][k]/=v;B[j]/=v;for(let i=0;i<8;i++)if(i!==j){let z=A[i][j];for(let k=j;k<8;k++)A[i][k]-=z*A[j][k];B[i]-=z*B[j]}}
const h=B;target.style.transform='matrix3d('+[h[0],h[3],0,h[6],h[1],h[4],0,h[7],0,0,1,0,h[2],h[5],0,1].join(',')+')';}
function tick(t){requestAnimationFrame(tick);if(el('swstage').hidden||!renderer||!root.clientWidth||!root.clientHeight)return;
for(let f of fans)f.rotation.z+=.023;
if(focusTween){let k=Math.min(1,(t-focusTween.start)/focusTween.len),z=1-Math.pow(1-k,3);camera.position.lerpVectors(focusTween.p,focusTween.q,z);controls.target.lerpVectors(focusTween.from,focusTween.to,z);if(k>=1)focusTween=null}
if(usbTween){let k=Math.min(1,(t-usbTween.t)/usbTween.len),z=k*k*(3-2*k);usb.position.lerpVectors(usbTween.from,usbTween.to,z);if(k>=1)usbTween=null}
if(window.__sw3dPortRing)window.__sw3dPortRing.material.opacity=(state.help||drag?.near)?.92:0;
controls.update();renderer.render(scene,camera);screenTransform();}
let buttons=document.querySelectorAll('[data-swc]');buttons.forEach(b=>b.addEventListener('click',()=>setView(b.dataset.swc)));
el('sw3dHelp').addEventListener('click',()=>{state.help=!state.help;el('sw3dHelp').classList.toggle('on',state.help);if(state.help){setView('port');notice('Port USB Type-A ditandakan. Seret pendrive dari meja.') }});
el('sw3dFull').addEventListener('click',()=>{const m=el('sw3dModal');m.hidden=false;renderModal();el('sw3dClose').focus()});el('sw3dClose').addEventListener('click',()=>el('sw3dModal').hidden=true);el('sw3dModal').addEventListener('click',e=>{if(e.target===el('sw3dModal'))el('sw3dModal').hidden=true});
window.addEventListener('keydown',e=>{if(e.key==='Escape')el('sw3dModal').hidden=true});
started=threeOK=true;setView('overview');requestAnimationFrame(tick);
}
function renderModal(){const dest=el('sw3dModalScr');if(!dest)return;dest.innerHTML=el('scr').innerHTML;let inner=el('sw3dModal').querySelector('.sw3d-modalwindow');let scale=inner.clientWidth/960;dest.style.transform='scale('+scale+')';}
function sync(o){flags=o||{};if(!started){try{makeScene()}catch(e){console.error('Perisian Workstation WebGL',e);el('sw3dFallback').classList.add('show');el('sw3dFallback').textContent='Paparan WebGL tidak dapat dimulakan: '+e.message;return}}
state.connected=!!o.usb;if(usb&&!drag&&!usbTween)usb.position.copy(state.connected?new THREE.Vector3(portPos.x,portPos.y,portPos.z+.29):usbHome);
el('sw3dStatus').textContent=state.connected?'● USB terpasang':'○ USB belum disambung';el('swDragHint').textContent=o.pick?'Seret pendrive 3D ke port USB untuk memasang.':'';
if(o.stepId==='usbin'&&!o.usb&&o.mode!=='belajar'){state.help=true;}else if(o.stepId!=='usbin'){state.help=false;}
if(!el('sw3dModal').hidden)renderModal();}
window.ESLSW3D={sync,renderModal,getStatus:()=>({started,connected:state.connected,realWebGL:!!renderer,screen3D:!!screenObj})};
})();
