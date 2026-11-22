const copy={
 ms:{
 back:'← Makmal PC', view:'Meja diagnostik', schematic:'Rajah', step:'Langkah', phases:[
 ['Mengapa PC ini gagal POST?','Selepas RAM ditukar, kipas berputar tetapi skrin kosong. Jalankan diagnosis semasa ujian kendiri permulaan (POST). Anggaran masa 90 saat.'],
 ['Baca petunjuk papan induk','Lampu diagnostik DRAM kekal menyala. Pilih komponen pertama untuk diperiksa.'],
 ['Jajarkan takuk RAM','Kuasa telah diputuskan dan RAM dikeluarkan untuk pemeriksaan. Bandingkan takuk pada tepi sentuhan emas dengan kunci pada slot.'],
 ['Uji selepas pemasangan','Kedua-dua klip terkunci. Sambungkan semula kuasa dan uji sama ada papan induk mengesan memori.'],
 ['POST berjaya','Papan induk kini mengesan RAM. Dalam kes ini RAM tidak terpasang kemas. Penjajaran takuk membolehkan modul masuk sepenuhnya dan klip menguncinya.']],
 actions:['Mulakan diagnosis','Periksa kabel monitor','Putuskan kuasa dan periksa RAM','Periksa pemacu sistem','Pasang RAM','Putar RAM 180°','Sambung kuasa dan jalankan POST','Cuba semula'],
 notes:['Kabel monitor boleh menyebabkan skrin kosong. Lampu DRAM menunjukkan ujian memori belum selesai.','Pemacu sistem digunakan selepas POST. Periksa memori dahulu.','Takuk tidak sejajar. Jangan paksa modul masuk.','Takuk dan kunci sejajar.','Takuk berada di sebelah bertentangan.'],
 readings:['Tiada paparan','DRAM • menyala','Kuasa diputuskan','RAM terpasang • kuasa diputuskan','POST OK • memori dikesan'],time:'Masa',errors:'Percubaan tersasar'},
 en:{
 back:'← PC lab',view:'Diagnostic bench',schematic:'Diagram',step:'Step',phases:[
 ['Why did this PC fail POST?','After a RAM change the fans spin, but the display stays blank. Diagnose the failure during the power-on self-test (POST). Allow about 90 seconds.'],
 ['Read the board indicator','The DRAM diagnostic light stays on. Choose which component to inspect first.'],
 ['Align the memory notch','Power has been disconnected and the module removed for inspection. Compare the notch on the gold contact edge with the key in the slot.'],
 ['Test the installation','Both retaining clips are closed. Restore power and test whether the board detects the memory.'],
 ['POST passed','The board now detects RAM. In this case the module was not fully seated. Aligning the notch allowed the module to seat and the clips to lock.']],
 actions:['Start diagnosis','Inspect the display cable','Disconnect power and inspect RAM','Inspect the system drive','Seat the RAM','Rotate RAM 180°','Restore power and run POST','Try again'],
 notes:['A cable fault can cause a blank display. The DRAM light tells you the memory test has not completed.','The system drive is used after POST. Check the memory first.','The notch does not match the key. Do not force the module.','The notch and key are aligned.','The notch is on the opposite side.'],
 readings:['No display','DRAM • lit','Power disconnected','RAM seated • power disconnected','POST OK • memory detected'],time:'Time',errors:'Incorrect attempts'}
};
const get=id=>document.getElementById(id);
let phase=0,aligned=false,errors=0,started=0,elapsed=0,note=null,mode=false;
const language=get('lang');
if(new URLSearchParams(location.search).get('lang')==='en')language.value='en';
const draw=createPostStage(active=>{mode=active;get('viewMode').textContent=active?'3D':copy[language.value].schematic;});
function render(focus=false){
 const t=copy[language.value];document.documentElement.lang=language.value;
 get('back').textContent=t.back;get('viewTitle').textContent=t.view;get('viewMode').textContent=mode?'3D':t.schematic;
 get('step').textContent=t.step+' '+(phase+1)+' / 5';get('title').textContent=t.phases[phase][0];get('desc').textContent=t.phases[phase][1];
 get('readout').textContent=t.readings[phase];get('feedback').textContent=note===null?'':t.notes[note];
 get('result').textContent=phase===4?t.time+' '+elapsed+' s · '+t.errors+' '+errors:'';
 const actions=get('actions');actions.replaceChildren();
 for(const id of [[0],[1,2,3],[4,5],[6],[7]][phase]){
   const button=document.createElement('button');button.textContent=t.actions[id];
   button.onclick=()=>act(id);actions.append(button);
 }
 if(focus){get('title').tabIndex=-1;get('title').focus({preventScroll:true});}
 draw(phase,aligned);
}
function act(id){
 const before=phase;note=null;
 switch(id){
 case 0:started=performance.now();phase=1;break;
 case 1:case 3:errors++;note=id===1?0:1;break;
 case 2:phase=2;break;
 case 4:if(aligned)phase=3;else{errors++;note=2;}break;
 case 5:aligned=!aligned;note=aligned?3:4;break;
 case 6:elapsed=Math.round((performance.now()-started)/1000);phase=4;break;
 case 7:phase=0;aligned=false;errors=0;elapsed=0;break;
 }
 render(before!==phase);
 if(before===phase)get('actions').children[[[0],[1,2,3],[4,5],[6],[7]][phase].indexOf(id)]?.focus();
}
language.onchange=()=>render();render();
