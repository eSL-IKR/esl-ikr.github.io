/* The RAM GLBs are authored with length on Y and the contact edge on -Z. */
function detailTrainingDimm(model) {
  const pcb = model.getObjectByName('memory_pcb_1');
  if (!pcb) return;
  const board = pcb.material;
  pcb.visible = false;
  model.traverse(node => { if (node.name.startsWith('contact_')) node.visible = false; });
  function plate(length, height, y, z) {
    const part = new THREE.Mesh(new THREE.BoxGeometry(.052, length, height), board);
    part.position.set(0, y, z);
    model.add(part);
  }
  plate(1.33, .255, 0, .1775);
  const key = -.085, gap = .016;
  for (const [left, right] of [[-.665, key-gap], [key+gap, .665]]) {
    plate(right-left, .055, (left+right)/2, .0225);
  }
  const positions = [];
  for (let i=0; i<124; i++) {
    const y = -.646 + i*.0105;
    if (Math.abs(y-key) > gap+.005) positions.push(y);
  }
  const fingers = new THREE.InstancedMesh(new THREE.BoxGeometry(.054,.007,.04),
    new THREE.MeshStandardMaterial({color:0xcfa653,metalness:.82,roughness:.31}),positions.length);
  positions.forEach((y,i) => fingers.setMatrixAt(i,new THREE.Matrix4().makeTranslation(0,y,.017)));
  model.add(fingers);
}
function lightStudio(renderer, scene) {
  const room = new THREE.RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const target = pmrem.fromScene(room,.04);
  scene.environment = target.texture;
  pmrem.dispose();
  const resources = new Set();
  room.traverse(node => { if(node.isMesh){resources.add(node.geometry);resources.add(node.material);} });
  resources.forEach(resource => resource.dispose());
  return target;
}
