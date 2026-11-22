import json,glob,re,random,collections
import sys
ROOT=(sys.argv[1] if len(sys.argv)>1 else 'buildcores-open-db/open-db')
random.seed(7)
def load(cat):
    for f in glob.glob(f'{ROOT}/{cat}/**/*.json',recursive=True):
        try:yield json.load(open(f))
        except Exception:pass
def sock(s):return re.sub(r'\s+','',s or '')
def nm(d):return re.sub(r'\s+',' ',d['metadata']['name']).strip()
def yr(d):return d['metadata'].get('releaseYear')
def man(d):return (d['metadata'].get('manufacturer') or '').strip()
def pick(items,key,per,total):
    g=collections.defaultdict(list)
    for x in items:g[key(x)].append(x)
    out=[]
    for k in sorted(g,key=str):
        random.shuffle(g[k]);out+=g[k][:per]
    random.shuffle(out);return out[:total]
FF={'ATX':'ATX','Micro ATX':'mATX','Mini-ITX':'ITX'}
OUT={'case':[],'mobo':[],'cpu':[],'cooler':[],'ram':[],'gpu':[],'storage':[],'psu':[]}
def base(d):return {'id':'od-'+d['opendb_id'][:8],'n':nm(d)[:96],'src':'od','odid':d['opendb_id'],'price':None}
SOCK_OK={'AM4','AM5','LGA1700','LGA1851','LGA1200','LGA1151'}
# ---- CPU
cp=[]
for d in load('CPU'):
    n=nm(d);s=sock(d.get('socket'))
    if s not in SOCK_OK or (yr(d) or 0)<2015:continue
    if not (re.match(r'^AMD Ryzen [3579] \d{4}(X3D|X|G|GT)?$',n) or re.match(r'^Intel Core i[3579]-\d{4,5}(K|KF|F|KS)?$',n) or re.match(r'^Intel Core Ultra [579] \d{3}(K|KF|F)?$',n)):continue
    sp=d.get('specifications') or {};cl=(d.get('clocks') or {}).get('performance') or {};co=d.get('cores') or {}
    if not sp.get('tdp') or not co.get('total'):continue
    x=base(d);x.update(sock=s,tdp=sp['tdp'],cores=co['total'],thr=co.get('threads') or co['total'],clk=f"{cl.get('base','?')} - {cl.get('boost','?')} GHz",igpu=bool((sp.get('integratedGraphics') or {}).get('model')))
    cp.append(x)
OUT['cpu']=pick(cp,lambda x:x['sock'],7,40)
# ---- Motherboard
mb=[]
GOOD={'ASUS','MSI','Gigabyte','ASRock'}
for d in load('Motherboard'):
    s=sock(d.get('socket'));ff=FF.get(d.get('form_factor'))
    mem=d.get('memory') or {}
    if s not in SOCK_OK or not ff or man(d) not in GOOD or mem.get('ram_type') not in('DDR4','DDR5') or not mem.get('slots'):continue
    m2=[q for q in (d.get('m2_slots') or []) if q.get('key')=='M']
    x=base(d);x.update(ff=ff,sock=s,mem=mem['ram_type'],slots=mem['slots'],m2=max(1,len(m2)),chip=re.sub(r'^(AMD|Intel) ','',d.get('chipset') or ''),pcb=0xd9dce0 if 'WHITE' in (d.get('color') or []) and 'BLACK' not in (d.get('color') or []) else 0x17191d)
    mb.append(x)
OUT['mobo']=pick(mb,lambda x:(x['sock'],x['ff']),3,46)
# ---- Case
cs=[]
BR={'NZXT','Lian Li','Corsair','Fractal Design','Cooler Master','Phanteks','be quiet!','Montech','DeepCool','Thermaltake','Antec','HYTE','Cougar','Silverstone','Jonsbo','Sama','Zalman','Aerocool','InWin','Gamdias','Darkflash','Ssupd','Kolink','Sharkoon','Xigmatek'}
for d in load('PCCase'):
    dm=d.get('dimensions_mm');gl=d.get('max_video_card_length');ch=d.get('max_cpu_cooler_height')
    sup=[FF[k] for k in ({'ATX':'ATX','Micro ATX':'Micro ATX','Mini-ITX':'Mini-ITX'}) if k in (d.get('supported_motherboard_form_factors') or [])]
    sup=[FF[x] for x in (d.get('supported_motherboard_form_factors') or []) if x in FF]
    if not dm or not gl or not ch or not sup or man(d) not in BR or (yr(d) or 0)<2019:continue
    top='ATX' if 'ATX' in sup else 'mATX' if 'mATX' in sup else 'ITX'
    psu=[p for p in (d.get('supported_power_supply_form_factors') or []) if p in('ATX','SFX','SFX-L')]
    psu=sorted(set('SFX' if p.startswith('SFX') else p for p in psu)) or (['SFX'] if top=='ITX' else ['ATX'])
    ff=d.get('form_factor') or ''
    rad=[120,240] if 'Mini' in ff or top!='ATX' and 'Mid' not in ff else [120,240,280,360]
    L=round(dm['depth']/10,1);H=round(dm['height']/10,1);D=round(dm['width']/10,1)
    if top=='ITX':rad=[120,240,280] if max(L,H,D)>30 else [120]
    x=base(d);x.update(ff=top,sup=sup,dim=[L,H,D],gpu=gl,cool=ch,rad=rad,radEst=True,psu=psu,fans=[3 if 'ARGB' in (d.get('lighting') or []) else 2,12],col=0xe6e8ea if 'WHITE' in (d.get('color') or []) and 'BLACK' not in (d.get('color') or []) else 0x1f2125)
    cs.append(x)
OUT['case']=pick(cs,lambda x:(x['ff'],x['n'].split()[0]),2,36)
# ---- Cooler
cl=[]
for d in load('CPUCooler'):
    ss=sorted(set(sock(s) for s in (d.get('cpu_sockets') or [])) & SOCK_OK)
    if not ss or man(d) not in {'Noctua','DeepCool','Thermalright','Cooler Master','Arctic','be quiet!','Corsair','NZXT','Lian Li','ID-COOLING','Scythe','Thermaltake','MSI','Gigabyte','ASUS','Phanteks','Antec'}:continue
    aio=bool(d.get('water_cooled'))
    if aio and d.get('radiator_size') in(120,240,280,360):
        x=base(d);x.update(type='aio',rad=d['radiator_size'],sock=ss,tdp=None,col=0x1b1d20);cl.append(x)
    elif not aio and d.get('height') and 100<=d['height']<=185:
        x=base(d);x.update(type='air',h=d['height'],sock=ss,tdp=None,col=0x2b2d31,dual='Dual' in nm(d) or 'D15' in nm(d) or 'Dark Rock Pro' in nm(d));cl.append(x)
air=pick([c for c in cl if c['type']=='air'],lambda x:x['n'].split()[0],2,16);aio=pick([c for c in cl if c['type']=='aio'],lambda x:(x['n'].split()[0],x['rad']),1,16)
OUT['cooler']=air+aio
# ---- RAM
rm=[]
for d in load('RAM'):
    md=d.get('modules') or {};ff=d.get('form_factor') or ''
    if d.get('ram_type') not in('DDR4','DDR5') or 'SO' in ff.upper() or not md.get('quantity') or md['quantity'] not in(1,2,4) or (d.get('capacity') or 0)<8 or not d.get('speed'):continue
    if man(d) not in {'Corsair','G.Skill','Kingston','Crucial','TeamGroup','Patriot','ADATA','Lexar','Silicon Power','PNY','Mushkin'}:continue
    x=base(d);x.update(mem=d['ram_type'],gb=d['capacity'],mods=md['quantity'],spd=d['speed'],rgb=bool(d.get('rgb')),col=0x202226);rm.append(x)
OUT['ram']=pick(rm,lambda x:(x['mem'],x['rgb'],x['gb']),2,30)
# ---- GPU
gp=[]
WANT=re.compile(r'(GTX 16[56]\d|RTX (20[67]0|30[5-9]0|40[5-9]0|50[5-9]0)|RX (6[5-9]00|7[6-9]00|90[67]0)|Arc [AB]\d{3}|GT 1030|GT 710)')
for d in load('GPU'):
    ch=d.get('chipset') or '';
    if not WANT.search(ch) or not d.get('length') or not d.get('tdp'):continue
    f=re.search(r'(\d)\s*Fan',d.get('cooling') or '');fans=int(f.group(1)) if f else 2
    sl=d.get('total_slot_width') or d.get('case_expansion_slot_width') or 2
    cm=d.get('chipset_manufacturer') or ''
    x=base(d);x.update(chip=ch,len=d['length'],tdp=d['tdp'],slots=max(1,min(4,round(sl*2)/2)),fans=max(1,min(3,fans)),acc={'NVIDIA':0x76b900,'AMD':0xe4002b}.get(cm,0x0071c5),mem=d.get('memory'));gp.append(x)
OUT['gpu']=pick(gp,lambda x:x['chip'],1,36)
# ---- Storage
st=[]
for d in load('Storage'):
    cap=d.get('capacity') or 0;ff=d.get('form_factor') or ''
    if not(250<=cap<=4000) or man(d) not in {'Samsung','Western Digital','WD','Crucial','Kingston','Seagate','Toshiba','SK hynix','Lexar','TeamGroup','ADATA','Sabrent','Corsair','Gigabyte','Solidigm'}:continue
    if d.get('nvme') and 'M.2' in ff:kind='nvme'
    elif d.get('storage_type')=='SSD' and '2.5' in ff:kind='ssd'
    elif d.get('storage_type')=='HDD' and '3.5' in ff:kind='hdd'
    else:continue
    x=base(d);x.update(kind=kind,gb=cap);st.append(x)
OUT['storage']=pick(st,lambda x:(x['kind'],x['gb']),2,30)
# ---- PSU
ps=[]
for d in load('PSU'):
    w=d.get('wattage') or 0;ff=d.get('form_factor')
    if not(450<=w<=1300) or ff not in('ATX','SFX') or not d.get('length') or man(d) not in {'Corsair','Seasonic','MSI','Cooler Master','be quiet!','Thermaltake','EVGA','Antec','FSP','Gigabyte','DeepCool','NZXT','ASUS','Super Flower','Lian Li','Silverstone'}:continue
    e=(d.get('efficiency_rating') or '').replace('80+ ','') or 'Standard'
    x=base(d);x.update(w=w,ff=ff,eff=e,len=round(d['length']/10,1));ps.append(x)
OUT['psu']=pick(ps,lambda x:(x['ff'],x['w']//150),2,30)
for k,v in OUT.items():print(k,len(v))
meta={'source':'BuildCores OpenDB','url':'https://github.com/buildcores/buildcores-open-db','license':'CC BY-NC-SA 4.0','licenseUrl':'https://creativecommons.org/licenses/by-nc-sa/4.0/','changes':'Dipilih dan ditukar kepada skema ringkas eModul IKR. Medan sokongan radiator casing dan kapasiti penyejuk adalah anggaran; harga tiada.','count':sum(len(v) for v in OUT.values())}
json.dump({'meta':meta,'db':OUT},open('public/pclab/catalog-opendb.json','w'),separators=(',',':'),ensure_ascii=False)
import os;print(os.path.getsize('public/pclab/catalog-opendb.json'),'bait')
