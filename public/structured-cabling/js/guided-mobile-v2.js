/* Guided arrows and optional user-started timer; does not change mission scoring. */
import * as S from './state.js';
import { mission1Step } from './missions.js';
const byId=id=>document.getElementById(id);
const box=byId('eslTimeBox'),select=byId('eslTimeChoice'),start=byId('eslTimeStart'),status=byId('eslTimerStatus');
let timer=null,remaining=0,lastStep=-1;
function stopClock(){if(timer!==null){clearInterval(timer);timer=null}}
function fmt(seconds){const m=Math.floor(seconds/60),s=seconds%60;return String(m).padStart(2,'0')+':'+String(s).padStart(2,'0')}
function tick(){if(document.hidden)return;if(remaining<=0){stopClock();status.textContent='Masa tamat · latihan boleh diteruskan';status.setAttribute('role','status');return}remaining--;status.textContent='Baki '+fmt(remaining);if(remaining===0){stopClock();status.textContent='Masa tamat · latihan boleh diteruskan';status.setAttribute('role','status')}}
const custom=byId('eslTimeCustom');
select?.addEventListener('change',()=>{if(custom)custom.hidden=select.value!=='custom'});
start?.addEventListener('click',()=>{const minutes=select?.value==='custom'?Number(custom?.value):Number(select?.value||0);stopClock();if(!Number.isInteger(minutes)||minutes<1||minutes>180){status.textContent='Pilih tempoh masa dahulu.';return}remaining=minutes*60;status.textContent='Baki '+fmt(remaining);timer=setInterval(tick,1000)});
function refresh(){
 const s=S.state(),guided=s.mode==='guided',step=mission1Step(s);
 if(box){box.setAttribute('aria-hidden',guided?'false':'true');if(!guided&&timer!==null){stopClock();status.textContent='Belum dimulakan'}}
 document.querySelectorAll('.esl-next-target').forEach(e=>e.classList.remove('esl-next-target'));
 if(!guided||s.mission!==0)return;
 const list=Array.from(byId('m-steps')?.children||[]);
 list.forEach((li,i)=>{li.classList.toggle('done',i<step);li.classList.toggle('cur',i===step);li.classList.toggle('locked',i>step);if(i>step)li.setAttribute('aria-disabled','true');else li.removeAttribute('aria-disabled')});
 const dock=byId('dock'),tabs=byId('tabs'),cards=byId('cards');
 let target=null;
 if(step===0||step===1||step===2){
  const label=step===0?'Kabel':'Komponen';
  target=Array.from(tabs?.querySelectorAll('button')||[]).find(e=>e.textContent.trim()===label);
  if(dock&&!dock.classList.contains('open'))byId('dock-handle')?.classList.add('esl-next-target');
  if(step===1||step===2){
    const shield=['cat6a','cat7','cat8'].includes(s.cable.id);
    const q=step===1?(shield?'Plug RJ45 Berperisai':'Plug RJ45 UTP'):(shield?'Patch Panel Berperisai':'Patch Panel Cat6 UTP');
    const card=Array.from(cards?.querySelectorAll('.card-item')||[]).find(e=>e.textContent.includes(q));
    if(card)target=card;
  }else{
    const card=Array.from(cards?.querySelectorAll('.card-item')||[]).find(e=>e.textContent.includes('Kabel Cat6 UTP'));
    if(card)target=card;
  }
 }else if(step===3)target=byId('btn-confirm');else if(step===4)target=byId('btn-next');
 target?.classList.add('esl-next-target');
 lastStep=step;
}
function schedule(){requestAnimationFrame(refresh)}
S.subscribe(schedule);
const obs=new MutationObserver(schedule);
const list=byId('m-steps');if(list)obs.observe(list,{childList:true});
const dock=byId('dock');dock?.addEventListener('click',schedule);
document.querySelectorAll('.mode').forEach(b=>b.addEventListener('click',schedule));
window.addEventListener('pageshow',schedule);
schedule();
