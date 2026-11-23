/* RJ45 training controls outside canvas on small screens, animated next-action pointer */
(function(){'use strict';
 function ready(){
  const stage=document.querySelector('.stage');const bar=document.querySelector('.scene-bottom');
  const camera=bar?.querySelector('.camera-tray'),command=bar?.querySelector('.command');
  const workspace=document.querySelector('.workspace');
  if(!stage||!bar||!camera||!command||!workspace)return;
  const markCam=document.createComment('esl-crimp-camera-origin');camera.parentNode.insertBefore(markCam,camera);
  const markCmd=document.createComment('esl-crimp-command-origin');command.parentNode.insertBefore(markCmd,command);
  const mobile=document.createElement('div');mobile.id='eslCrimpAction';
  mobile.innerHTML='<details id="eslCrimpCameras"><summary>Sudut kamera dan fokus 3D</summary></details>';
  stage.after(mobile);
  const mq=matchMedia('(max-width:1023px)');
  function layout(){if(mq.matches){
   mobile.prepend(command);mobile.querySelector('details').appendChild(camera);
  }else{
   markCam.parentNode.insertBefore(camera,markCam.nextSibling);
   markCmd.parentNode.insertBefore(command,markCmd.nextSibling);
   mobile.querySelector('details').open=false;
  }
  window.dispatchEvent(new Event('resize'))}
  mq.addEventListener?.('change',layout);layout();
  const act=document.getElementById('mainAction');const steps=document.getElementById('steps');
  function guidance(){
    // ESL-IKR-ISU-123-V1: only point to the live task button, not a hidden tool.
    document.querySelectorAll('.esl-crimp-target').forEach(e=>e.classList.remove('esl-crimp-target'));
    const task=act;
    if(!task||task.disabled||!task.isConnected)return;
    const r=task.getBoundingClientRect();
    if(r.width<25||r.height<20)return;
    task.classList.add('esl-crimp-target');
    // Active step gets the same cue. Locked steps remain muted.
    steps?.querySelector('.step-item.active')?.classList.add('esl-crimp-current');
  }
  const observer=new MutationObserver(()=>requestAnimationFrame(guidance));
  if(act)observer.observe(act,{childList:true,characterData:true,subtree:true,attributes:true,attributeFilter:['disabled']});
  if(steps)observer.observe(steps,{childList:true});
  guidance();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready,{once:true});else ready();
})();
