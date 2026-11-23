/* eSL-IKR: mobile-first layout, preserving original handlers and desktop */
(function(){
  'use strict';
  function ready(){
    const app=document.getElementById('app');if(!app)return;
    const head=app.querySelector(':scope > header');
    const stage=document.getElementById('stage'),views=document.getElementById('views');
    const swstage=document.getElementById('swstage'),swtools=document.getElementById('sw3dControls');
    const frame=document.getElementById('bldf');
    if(!head||!stage||!views||!swstage)return;
    const mq=window.matchMedia('(max-width:1023px)');
    const cameraDock=document.createElement('details');cameraDock.id='eslPcViewDock';
    cameraDock.innerHTML='<summary>Kawalan kamera PC 3D</summary>';
    const swDock=document.createElement('details');swDock.id='eslSwCameraDock';
    swDock.innerHTML='<summary>Kawalan kamera Perisian</summary>';
    stage.after(cameraDock);swstage.after(swDock);
    const aux=document.createElement('details');aux.id='eslPcSettings';
    aux.innerHTML='<summary>Tetapan & fungsi tambahan</summary><div class="esl-aux"></div>';
    head.appendChild(aux);
    const extra=Array.from(head.children).filter(el=>el.id==='qsel'||el.id==='helpBtn'||el.id==='themes'||(el.tagName==='A' && /post-lab/i.test(el.getAttribute('href')||'')));
    const spots=extra.map(el=>{const mark=document.createComment('esl-original-place');el.parentNode.insertBefore(mark,el);return {el,mark}});
    const viewsMark=document.createComment('esl-original-views');views.parentNode.insertBefore(viewsMark,views);
    const swMark=swtools&&document.createComment('esl-original-swcontrols');
    if(swtools)swtools.parentNode.insertBefore(swMark,swtools);
    function switchLayout(){
      if(mq.matches){
        views.parentNode!==cameraDock&&cameraDock.appendChild(views);
        if(swtools&&swtools.parentNode!==swDock)swDock.appendChild(swtools);
        spots.forEach(({el})=>{if(el.parentNode!==aux.querySelector('.esl-aux'))aux.querySelector('.esl-aux').appendChild(el)});
      }else{
        viewsMark.parentNode.insertBefore(views,viewsMark.nextSibling);
        if(swtools)swMark.parentNode.insertBefore(swtools,swMark.nextSibling);
        spots.forEach(({el,mark})=>mark.parentNode.insertBefore(el,mark.nextSibling));
        cameraDock.open=false;swDock.open=false;aux.open=false;
      }
      requestAnimationFrame(()=>window.dispatchEvent(new Event('resize')));
    }
    /* Avoid resize recursion: only respond to viewport breakpoint transitions. */
    mq.addEventListener?.('change',switchLayout);switchLayout();
    function improveBuilder(){
      try{
        const d=frame.contentDocument;if(!d||!d.body||d.getElementById('eslBuilderUX'))return;
        const style=d.createElement('style');style.id='eslBuilderUX';style.textContent=`
        @media(max-width:1023px){
          html,body{height:auto!important;min-height:100%;overflow-x:hidden!important}
          main{height:auto!important;min-height:0!important;display:flex!important;flex-direction:column!important;overflow:visible!important}
          #view{order:0!important;min-height:0!important;height:auto!important;display:flex!important;flex-direction:column!important;overflow:visible!important}
          #cv{width:100%!important;height:clamp(320px,56dvh,680px)!important;min-height:320px!important;max-height:680px!important;flex:none!important}
          #eslBuilderControls{display:block!important;position:static!important;order:1!important;margin:0!important;background:var(--panel)!important;padding:7px 10px!important;border-bottom:1px solid var(--line)!important}
          #eslBuilderControls summary{list-style:none;cursor:pointer;border:1px solid var(--line);background:var(--card);padding:12px;border-radius:10px;min-height:44px;font-weight:700}
          #eslBuilderControls summary::after{content:'⌄';float:right}
          #eslBuilderControls[open] summary::after{content:'⌃'}
          #tools{position:static!important;display:flex!important;flex-wrap:wrap!important;max-width:100%!important;left:auto!important;right:auto!important;bottom:auto!important;padding:8px 0!important;margin:0!important;gap:7px!important}
          #tools button{min-height:42px!important;flex:1 1 auto!important}
          #left{order:2!important;overflow:visible!important;max-width:100%!important;height:auto!important;flex:none!important;padding:12px!important}
          #hint{max-width:65%;font-size:11px!important}
          #picker.open{position:fixed!important;inset:0!important}
        }`;
        d.head.appendChild(style);
        const tools=d.getElementById('tools');const view=d.getElementById('view');
        if(tools&&view){
          const mark=d.createComment('esl-original-builder-tools');tools.parentNode.insertBefore(mark,tools);
          const drawer=d.createElement('details');drawer.id='eslBuilderControls';drawer.innerHTML='<summary>Kawalan 3D, kamera & kesan</summary>';
          const m=frame.contentWindow.matchMedia('(max-width:1023px)');
          view.appendChild(drawer);
          const f=()=>{
            if(m.matches){if(tools.parentNode!==drawer)drawer.appendChild(tools)}
            else {mark.parentNode.insertBefore(tools,mark.nextSibling);drawer.open=false}
            frame.contentWindow.dispatchEvent(new frame.contentWindow.Event('resize'));
          };
          m.addEventListener?.('change',f);f();
        }
      }catch(err){console.warn('eSL-IKR builder mobile layout:',err)}
    }
    if(frame){frame.addEventListener('load',improveBuilder);if(frame.contentDocument?.readyState==='complete')improveBuilder()}
    const panel=document.getElementById('panel');
    let hintQueued=false;
    function hintNext(){
      hintQueued=false;
      panel?.querySelectorAll('.esl-pc-next').forEach(el=>el.classList.remove('esl-pc-next'));
      const training=document.querySelector('#modes button[data-mode="latihan"].on');
      const hardware=document.querySelector('#doms button[data-dom="hw"].on');
      if(!training||!hardware)return;
      (panel?.querySelector('.chip.th.sel')||panel?.querySelector('.chip.th'))?.classList.add('esl-pc-next');
    }
    if(panel){
      new MutationObserver(()=>{if(!hintQueued){hintQueued=true;requestAnimationFrame(hintNext)}}).observe(panel,{childList:true,subtree:true});
      document.getElementById('modes')?.addEventListener('click',()=>requestAnimationFrame(hintNext));
      document.getElementById('doms')?.addEventListener('click',()=>requestAnimationFrame(hintNext));
      hintNext();
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready,{once:true});else ready();
})();
