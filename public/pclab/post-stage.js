function createPostStage(onMode) {
  const canvas=document.querySelector('#scene'), diagram=document.querySelector('#diagram');
  let phase=0, aligned=false, ready=false, frame=0, threeD=false;
  let renderer,scene,camera,bench,dimm,caseModel,clips=[],lamp;
  const moving=!matchMedia('(prefers-reduced-motion: reduce)').matches;
  function schematic() {
    const w=diagram.clientWidth,h=diagram.clientHeight;
    diagram.width=w*devicePixelRatio;diagram.height=h*devicePixelRatio;
    const ctx=diagram.getContext('2d');
    const unit=Math.min(w/400,h/220);
    ctx.scale(devicePixelRatio,devicePixelRatio);ctx.translate(w/2,h/2);ctx.scale(unit,unit);
    const seated=phase>=3, notch=(aligned?-1:1)*19, y=seated?18:-15;
    ctx.fillStyle='#225647';ctx.fillRect(-155,y-42,310,42);
    ctx.fillStyle='#111b21';for(let i=0;i<8;i++)ctx.fillRect(-145+i*38,y-33,24,21);
    ctx.fillStyle='#d4ae62';for(let i=-150;i<151;i+=5)if(Math.abs(i-notch)>5)ctx.fillRect(i,y,3,9);
    ctx.fillStyle='#758483';ctx.fillRect(-162,28,324,9);
    ctx.fillStyle='#f8cb86';ctx.fillRect(-22,18,6,10);
    ctx.strokeStyle='#94a8a4';ctx.lineWidth=2;ctx.strokeRect(-170,37,340,15);
  }
  function fallback() {
    threeD=false;canvas.hidden=true;diagram.hidden=false;cancelAnimationFrame(frame);
    onMode(false);schematic();
  }
  function update(instant=false) {
    if(!ready||!threeD)return;
    const overview=phase===0 && !!caseModel;
    bench.visible=!overview;if(caseModel)caseModel.visible=overview;
    const seated=phase>=3;
    const height = seated ? .065 : phase === 2 ? .41 : .24;
    const blend=instant||!moving?1:.095;
    dimm.position.y+=(height-dimm.position.y)*blend;
    dimm.rotation.y+=((aligned?0:Math.PI)-dimm.rotation.y)*blend;
    clips.forEach((clip,i)=>clip.rotation.z=((seated?0:.40)*(i===0?1:-1)));
    lamp.material.color.setHex(phase===4?0x7bedac:phase>=2&&phase<4?0x40484c:0xf5a85b);
    const portrait=camera.aspect<1.35?1.35/Math.max(.3,camera.aspect):1;
    const pose=overview?[2.3,1.15,3.4]:phase===2?[.11,.70,1.95]:[.66,.85,2.08];
    camera.position.lerp(new THREE.Vector3(...pose).multiplyScalar(portrait),blend);
    camera.lookAt(0,overview?0:.29,0);renderer.render(scene,camera);
  }
  function transition(){
    cancelAnimationFrame(frame);
    const until=performance.now()+(moving?1050:0);
    function tick(now){
      update(now>=until);
      if(now<until)frame=requestAnimationFrame(tick);
    }
    frame=requestAnimationFrame(tick);
  }
  function resize(){
    if(!threeD){schematic();return;}
    const w=canvas.clientWidth,h=canvas.clientHeight;
    renderer.setSize(w,h,false);camera.aspect=w/Math.max(1,h);camera.updateProjectionMatrix();update(true);
  }
  try {
    renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});
    renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputEncoding=THREE.sRGBEncoding;
    renderer.toneMapping=THREE.ACESFilmicToneMapping;
    scene=new THREE.Scene();camera=new THREE.PerspectiveCamera(34,1,.02,30);
    lightStudio(renderer,scene);
    scene.add(new THREE.HemisphereLight(0xf4f7ff,0x45505c,.9));
    const key=new THREE.DirectionalLight(0xffefd9,1.7);key.position.set(-2,4,3);scene.add(key);
    bench=new THREE.Group();scene.add(bench);
    function box(parent,x,y,z,w,h,d,color,metalness=0){
      const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),new THREE.MeshStandardMaterial({color,metalness,roughness:.47}));
      mesh.position.set(x,y,z);parent.add(mesh);return mesh;
    }
    box(bench,0,-.06,0,1.85,.065,.87,0x17463a);
    for(const z of [-.21,.0]){
      for(const side of [-1,1])box(bench,0,.036,z+side*.043,1.48,.12,.028,0x333a41);
      box(bench,-.085,.072,z,.029,.087,.061,0xbfa576);
    }
    for(const side of [-1,1])clips.push(box(bench,side*.735,.085,0,.045,.14,.098,0xc5c8bc));
    lamp=box(bench,.69,.002,.29,.038,.012,.026,0xf5a85b);
    dimm=new THREE.Group();bench.add(dimm);
    const loader=new THREE.GLTFLoader();
    loader.load('models/components/ram-blue.glb',asset=>{
      detailTrainingDimm(asset.scene);
      asset.scene.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(
        new THREE.Vector3(0,0,1),new THREE.Vector3(1,0,0),new THREE.Vector3(0,1,0)));
      dimm.add(asset.scene);ready=true;threeD=true;diagram.hidden=true;canvas.hidden=false;onMode(true);resize();
      update(true);
    },undefined,fallback);
    loader.load('models/FOIFKIN_F600.glb',asset=>{
      caseModel=asset.scene;
      const bounds=new THREE.Box3().setFromObject(caseModel),size=bounds.getSize(new THREE.Vector3());
      const scale=1.9/Math.max(size.x,size.y,size.z);
      caseModel.scale.multiplyScalar(scale);caseModel.position.sub(bounds.getCenter(new THREE.Vector3()).multiplyScalar(scale));
      scene.add(caseModel);update(true);
    });
    canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();ready=false;fallback();});
  }catch{fallback();}
  if(!ready)fallback();
  new ResizeObserver(resize).observe(canvas.parentElement);
  return (nextPhase,nextAligned)=>{phase=nextPhase;aligned=nextAligned;if(!threeD)schematic();else transition();};
}
