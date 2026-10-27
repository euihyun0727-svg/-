/* Dizziness-only extension. No automatic requests or persisted patient data. */
(function dizzinessModule(){
'use strict';
const D=window.NeuroDizzinessData,el=id=>document.getElementById(id);
if(!D)throw Error('어지럼 임상 데이터 로딩 실패');
const safe=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const list=xs=>'<ul>'+xs.map(x=>'<li>'+safe(x)+'</li>').join('')+'</ul>';
const refs=ids=>'<div class="dz-sources">'+[...new Set(ids)].map(id=>{const s=D.sources[id];return '<a href="'+safe(s.url)+'" target="_blank" rel="noopener noreferrer">'+safe(s.title)+' · '+safe(s.date)+'</a><small> — '+safe(s.type)+' / '+safe(s.access)+'</small>';}).join('<br>')+'</div>';
const mod=NEURO_DATA.dizziness;
mod.questions=D.questions;mod.differentialPathways=D.paths;
D.questions.forEach(q=>PATIENT_INTAKE_COPY.questions[q.id]=[q.stem,q.options.map(o=>o.text)]);
mod.redFlags=['새 마비·복시·구음/연하 이상·의식 변화·서기/걷기 불가·심한 새 머리/경부 통증: 즉시 의료진 평가','급성 어지럼과 새 난청: 신속한 청각/중추 원인 평가; 말초 질환으로 단정하지 않음','흉통·호흡곤란·실신/출혈·중증 탈수 등 전신 원인도 우선 평가'];
mod.clinicalAssessment='시간 경과·유발 요인을 먼저 확인하고 신경·안구운동·청력·보행/체간·기립 혈압을 목적에 맞게 평가합니다. HINTS는 현재 급성 지속성 전정증후군과 안진이 있고 훈련된 검사자가 있을 때 검토합니다. 모든 어지럼·체위성 삽화·환자 자가검사에 적용하지 않습니다.';
mod.testConsiderations=D.paths[0].tests.map(t=>({name:t.name,why:t.indications,indications:t.indications,caveats:t.limitations}));
mod.followUpSchedule=[{phase:'질환별 추적',interval:'아래 선택 경로 확인',checkpoints:'증상·기능·청력·낙상·약 부작용',targets:'안전한 일상 복귀; 다음 날짜는 담당의 결정'}];
Object.entries(D.education).forEach(([id,v])=>EDUCATION_V2[id]=v);
const oldMechanism=getMechanismEducation;
getMechanismEducation=function(sym,id,name){
 if(sym!=='dizziness')return oldMechanism(sym,id,name);
 const text=D.education[id]||D.education.central_dizziness_eval;
 const flows={
 bppv:[['귀 속 작은 입자','위치 변화'],['머리 자세 변화','잘못된 자극'],['짧은 어지럼','안진 검사'],['아형·환측 확인','맞는 정복술']],
 vestibular_migraine:[['감각 처리 변화','여러 요인'],['전정·두통 연관','개별 양상'],['반복 어지럼','동반 증상'],['임상 평가','다른 원인 구분']],
 orthostatic_hypo:[['일어서기','혈액 재분포'],['보상 반응','혈압 조절'],['보상 부족 가능','어지럼'],['실측·원인 확인','개별 관리']],
 meniere:[['귀의 기능 변화','복합 기전'],['균형·청각 영향','개별 차이'],['발작·귀 증상','청력 변화'],['검사·경과 확인','개별 관리']],
 auvp:[['한쪽 전정 기능','급성 저하'],['좌우 신호 불균형','안진·어지럼'],['중추·청각 감별','진찰 우선'],['보상·재활','안전 회복']],
 pppd:[['선행 요인','전정·기타 질환'],['감각 처리 변화','복합 기전'],['자세·시각 민감','지속 불편'],['개별 관리','활동 회복']],
 bilateral_vestibulopathy:[['양쪽 전정 기능','VOR 저하'],['시선·균형 영향','움직임 중'],['동요시·불균형','어둠에서 악화'],['원인·기능 평가','맞춤 재활']],
 central_dizziness_eval:[['어지럼 증후군','시간·유발 확인'],['신경·보행 평가','위험신호'],['긴급도 판단','담당의 결정'],['원인별 평가','검사·전원']]
 };
 return {title:name+' 설명 도식',svg:buildFlowSvg('설명용 단순화 도식 — 진단 또는 개인 검사 결과 아님',flows[id]||flows.central_dizziness_eval),points:[text[0],text[1],text[3]]};
};
function fresh(){return {canal:'unknown',side:'unknown',certainty:'unknown',criteria:{},tests:[],therapies:[],hints:{avs:'',nystagmus:'',trained:''},bp:{},metrics:{}};}
let state=fresh(),lastKey='',hasRendered=false,direction=1,revision=0,printDepth=0;
function visible(q,a=AppState.answers){
 if(!q.when)return true;const v=a[q.when];
 if(!v||v==='건너뜀'||v==='잘 모르겠어요')return false;
 return q.oneOf?q.oneOf.includes(v):v===q.equals;
}
function prune(){D.questions.forEach(q=>{if(!visible(q))delete AppState.answers[q.id];});}
function queueVisible(i){if(i.symptomId==='dizziness')return visible(i.question);if(i.symptomId==='headache'&&window.NeuroHeadache)return window.NeuroHeadache.visible(i.question);return true;}
const oldQ=renderQuestion,oldPrev=prevQuestion,oldNext=nextQuestion;
renderQuestion=function(){
 prune();while(AppState.queueIndex>=0&&AppState.queueIndex<AppState.queue.length&&!queueVisible(AppState.queue[AppState.queueIndex]))AppState.queueIndex+=direction;
 if(AppState.queueIndex<0)AppState.queueIndex=0;oldQ();
 if(AppState.queue.some(i=>i.symptomId==='dizziness')&&AppState.queueIndex<AppState.queue.length){const q=AppState.queue.filter(queueVisible),n=q.indexOf(AppState.queue[AppState.queueIndex])+1;el('wizardStepCount').textContent='문항 '+n+' / '+q.length+' (답변에 따라 달라질 수 있음)';el('wizardProgressBar').style.width=Math.round(n/q.length*100)+'%';}
};
prevQuestion=function(){direction=-1;try{oldPrev();}finally{direction=1;}};
nextQuestion=function(){direction=1;oldNext();};
function hints(v){return v.avs==='yes'&&v.nystagmus==='yes'&&v.trained==='yes'
 ?{status:'review',text:'적용 조건을 확인했습니다. 훈련된 의료진의 직접 HINTS 평가를 검토할 수 있습니다. 이 화면은 결과를 채점하거나 뇌졸중을 배제하지 않습니다. 중추/불명확 소견은 MRI/MRA 등 신속 평가를 검토합니다.'}
 :{status:'notEligible',text:'HINTS 적용 조건 미충족 또는 미확인. 급성 지속성 AVS·현재 안진·검사자 훈련을 모두 확인해야 합니다. 무안진에서는 보행 불안정 등 신경 평가, 다른 증후군에서는 해당 진찰/의뢰를 검토합니다. 이 상태로 말초성 또는 안전하다고 결론내리지 마세요.'};}
function bp(v){
 const names=['supineS','supineD','standingS','standingD','minutes'];
 if(names.some(k=>v[k]===undefined||v[k]===null||String(v[k]).trim()===''||!Number.isFinite(Number(v[k]))))return {status:'incomplete',text:'혈압·측정 시각·측정 조건을 모두 확인하세요. 결측을 정상이나 0으로 처리하지 않습니다.'};
 const [s,d,ss,sd,m]=names.map(k=>Number(v[k]));
 if(s<=d||ss<=sd||d<=0||sd<=0||s>400||ss>400||m<=0)return {status:'invalid',text:'입력 오류: 양수 혈압과 수축기>이완기, 측정 시각을 확인하세요. 수축기 입력 상한 400은 입력 검사용이며 정상 범위가 아닙니다.'};
 if(v.protocol!=='confirmed'||m>3)return {status:'protocol',text:'이 비교는 앙와위 5~10분 안정 후 기립 3분 이내 측정을 확인한 경우만 다룹니다. 초기/지연성 이상은 별도 평가하며 이 값으로 배제하지 않습니다.'};
 const ds=s-ss,dd=d-sd,hit=ds>=20||dd>=10;
 return {status:hit?'review':'below',dropS:ds,dropD:dd,text:'수축기 감소 '+ds+' / 이완기 감소 '+dd+' mmHg. '+(hit?'수치 역치 해당: 지속 여부·반복 측정·증상·원인 확인 후 담당의가 판단하세요.':'이 시점의 수치 역치 미충족. 초기/지연성 OH 또는 다른 원인 배제를 뜻하지 않습니다.')+' 자동 진단이 아닙니다.'};
}
function metric(v){if(v===undefined||v===null||String(v).trim()==='')return null;const n=Number(v);return Number.isInteger(n)&&n>=0&&n<=30?n:null;}
function priority(a=AppState.answers){return {urgent:['diz_redflags','diz_walk','diz_headneck','diz_chest'].filter(id=>a[id]==='예'),hearing:a.diz_hearing==='예'};}
function ensure(id,parent){let n=el(id);if(!n){n=document.createElement('section');n.id=id;n.className='dz-clinical';el(parent).appendChild(n);}return n;}
function invalidate(){revision++;let stamp=el('dzRevision');if(!stamp&&el('dzFollowup')){stamp=document.createElement('span');stamp.id='dzRevision';stamp.hidden=true;el('dzFollowup').appendChild(stamp);}if(stamp)stamp.textContent=String(revision);el('visitReviewed').checked=false;el('eduConfirmed').checked=false;toggleEducationPrint();refreshVisitPrint();el('visitPrintSheet').innerHTML='';}
function clearContext(){const {canal,side,certainty}=state;state={...fresh(),canal,side,certainty};clearVisitDraft();invalidate();}
const certaintyLabel=()=>({unknown:'미확인',definite:'확실형 기준 검토',probable:'가능성 높은 분류 검토'}[state.certainty]);
const path=()=>D.paths.find(p=>p.id===AppState.selectedSubpath.dizziness)||D.paths[0];
function select(id,label,options,value){return '<label>'+safe(label)+' <select id="'+id+'">'+options.map(([v,t])=>'<option value="'+v+'" '+(v===value?'selected':'')+'>'+safe(t)+'</option>').join('')+'</select></label>';}
const yesOptions=[['','미확인'],['yes','예 — 의료진 확인'],['no','아니요']];
function renderHints(){
 const n=ensure('dzHints','docClinicalAssessmentBox');
 n.innerHTML='<details><summary>HINTS 적용 대상·훈련 확인 — 의사용</summary><p>Head impulse·안진 양상·skew를 직접 평가하고 청력도 함께 확인합니다. 개별 소견 하나로 뇌졸중을 배제하지 않습니다.</p><p>현재 증상이 있는 급성 지속성 전정증후군의 안진 환자에 훈련된 검사자가 사용하는 검사입니다. 단순 체위성 삽화, 증상 소실 후, 환자 자가 시행에 적용하지 않습니다.</p>'+select('dzAvs','현재 급성 지속성 AVS인가?',yesOptions,state.hints.avs)+select('dzNystagmus','현재 안진이 확인됐는가?',yesOptions,state.hints.nystagmus)+select('dzTrained','훈련된 검사자가 직접 시행 가능한가?',yesOptions,state.hints.trained)+'<p id="dzHintsResult" role="status">'+safe(hints(state.hints).text)+'</p><p>새 신경 이상·보행 불가 등 응급 우려가 있으면 위 확인과 관계없이 우선 평가합니다. HINTS 및 중추/불명확 소견에서 MRI/MRA 권고의 근거 확실성은 높음, 무안진 보행 평가의 확실성은 중등도입니다. GRACE-3는 응급실 지침이며 의원의 검사 역량 부족 시 전원을 지연하지 않습니다.</p>'+refs(['grace'])+'</details>';
 ['dzAvs','dzNystagmus','dzTrained'].forEach(id=>el(id).onchange=()=>{state.hints={avs:el('dzAvs').value,nystagmus:el('dzNystagmus').value,trained:el('dzTrained').value};el('dzHintsResult').textContent=hints(state.hints).text;invalidate();});
}
function candidates(p){
 if(p.id!=='bppv')return p.therapies;
 return state.side!=='unknown'&&state.side!=='bilateral'?(D.bppvTherapies[state.canal]||[]):[];
}
function chosenCriteria(p){return [...p.criteria,...(p.id==='bppv'?(D.bppvCriteria[state.canal]||[]):[])];}
function renderPlan(p){
 const n=ensure('dzPlan','docSubpathContent');
 let facets='';
 if(p.id==='bppv')facets=select('dzCanal','반고리관·안진형',[['unknown','미확인'],['posterior','후반고리관'],['horizontal_geo','수평반고리관 — 향지성'],['horizontal_apo','수평반고리관 — 원지성'],['other','다반고리관/비전형 — 전문 검토']],state.canal)+select('dzSide','진찰로 확인한 환측',[['unknown','미확인'],['right','오른쪽'],['left','왼쪽'],['bilateral','양측/복합 — 전문 검토']],state.side)+'<p>환자가 말한 유발 방향으로 자동 선택하지 않습니다. 아형·단일 환측을 확인한 뒤 술기 후보를 표시합니다.</p>';
 if(['vestibular_migraine','meniere'].includes(p.id))facets=select('dzCertainty','진단 분류 검토',[['unknown','미확인'],['definite','확실형 기준 검토'],['probable','가능성 높은 분류 검토']],state.certainty)+'<p>분류 선택은 진단 확정이 아닙니다. 해당 기준과 배제 진단을 확인하세요.</p>';
 const checks=chosenCriteria(p).map(c=>'<label>'+safe(c.text)+' <select data-dz-criterion="'+c.id+'" aria-label="'+safe(c.text)+'"><option value="">미확인</option><option value="yes" '+(state.criteria[c.id]==='yes'?'selected':'')+'>의사 확인/충족</option><option value="no" '+(state.criteria[c.id]==='no'?'selected':'')+'>미충족</option></select></label>'+refs([c.source])).join('');
 const rows=candidates(p).map(t=>'<tr><td><label><input type="checkbox" data-dz-therapy="'+t.id+'" '+(state.therapies.includes(t.id)?'checked':'')+'> '+safe(t.name)+'</label><p>'+safe(t.role)+'</p></td><td>'+safe(t.evidence)+refs(t.sourceIds)+'</td><td>'+safe(t.safety)+'<p>'+safe(t.dose)+'</p></td><td>'+safe(t.domestic)+'</td></tr>').join('');
 n.innerHTML='<h3>어지럼 임상 검토</h3><p>'+D.version+' · '+safe(D.review)+'</p>'+facets+'<details><summary>질환별 병력·진찰·진단 확인</summary><h4>병력</h4>'+list(p.history)+'<h4>진찰</h4>'+list(p.exam)+checks+'</details><details><summary>치료 비교·근거·국내 확인 상태</summary>'+(rows?'<div class="dz-scroll"><table><thead><tr><th>검토 후보</th><th>근거</th><th>안전·감시</th><th>국내 상태</th></tr></thead><tbody>'+rows+'</tbody></table></div>':'<p>자동 약물/술기 후보 없음. 필요한 분류·환측·긴급도와 담당의 계획을 먼저 확인하세요.</p>')+'<p>진단 합의문·지침·개별 시험·문헌고찰의 근거를 구분합니다. 국내 적응증·급여·품목별 금기와 용량은 공식 확인 전 미확인으로 표시합니다.</p></details><button class="btn-subpath" type="button" id="dzApply">선택한 검토 내용을 진료 안내 초안에 반영</button>'+refs(p.sources);
 n.querySelectorAll('[data-dz-criterion]').forEach(x=>x.onchange=()=>{state.criteria[x.getAttribute('data-dz-criterion')]=x.value;invalidate();});
 n.querySelectorAll('[data-dz-therapy]').forEach(x=>x.onchange=()=>{const id=x.getAttribute('data-dz-therapy');state.therapies=x.checked?[...new Set([...state.therapies,id])]:state.therapies.filter(v=>v!==id);invalidate();});
 for(const [id,k]of [['dzCanal','canal'],['dzSide','side'],['dzCertainty','certainty']])if(el(id))el(id).onchange=()=>{state[k]=el(id).value;clearContext();renderDoctorStage();};
 el('dzApply').onclick=()=>{
 const tests=selectedTests(p),tx=candidates(p);
 el('visitDiagnosis').value=p.name+(p.id==='bppv'?' / '+facetLabel():['vestibular_migraine','meniere'].includes(p.id)?' / '+certaintyLabel():'')+' — 담당의 확인 초안';
 el('visitTests').value=tests.filter(t=>state.tests.includes(t.id)).map(t=>t.name+' — 검토 후보').join('\n');
 el('visitCare').value=tx.filter(t=>state.therapies.includes(t.id)).map(t=>t.name+' — 검토 후보; 실제 시행/처방 별도 확인').join('\n');
 ['visitDiagnosis','visitTests','visitCare'].forEach(id=>{const x=el(id);if(typeof Event==='function')x.dispatchEvent(new Event('input',{bubbles:true}));else if(x.dispatch)x.dispatch('input');});invalidate();
 };
}
function facetLabel(){
 const c={unknown:'아형 미확인',posterior:'후반고리관',horizontal_geo:'수평 향지성',horizontal_apo:'수평 원지성',other:'비전형/복합'};
 const s={unknown:'환측 미확인',right:'우측',left:'좌측',bilateral:'양측/복합'};
 return c[state.canal]+' / '+s[state.side];
}
function selectedTests(p){return p.tests.filter(t=>t.id!=='avoidImaging'&&t.id!=='avoidEcoG');}
function renderTests(p){
 const n=el('docTestCandidatesList');
 n.innerHTML='<p>현재 경로: <strong>'+safe(p.name)+'</strong> · 의사의 검토 후보이며 오더가 아닙니다.</p>'+p.tests.map(t=>'<div class="test-candidate-card">'+(t.id.startsWith('avoid')?'<strong>관행적 시행 제한: '+safe(t.name)+'</strong>':'<label><input type="checkbox" data-dz-test="'+t.id+'" '+(state.tests.includes(t.id)?'checked':'')+'> <strong>'+safe(t.name)+'</strong></label>')+'<p>'+safe(t.indications)+'</p><p>'+safe(t.limitations)+'</p><p>'+safe(t.site)+'</p>'+refs(t.sourceIds)+'</div>').join('');
 n.querySelectorAll('[data-dz-test]').forEach(x=>x.onchange=()=>{const id=x.getAttribute('data-dz-test');state.tests=x.checked?[...new Set([...state.tests,id])]:state.tests.filter(v=>v!==id);invalidate();});
}
function numberInput(id,label,value='',max=400){return '<label>'+safe(label)+' <input id="'+id+'" type="number" min="0" max="'+max+'" value="'+safe(value)+'"></label>';}
function renderBP(){
 const n=ensure('dzBP','docTestCandidatesList'),v=state.bp;
 n.innerHTML='<details><summary>기립 혈압 차이 수동 확인 — 진단 확정 아님</summary>'+select('dzBPProtocol','앙와위 5~10분 안정 후 기립 측정 확인',[['','미확인'],['confirmed','의료진 확인']],v.protocol||'')+numberInput('dzSupineS','앙와위 수축기',v.supineS)+numberInput('dzSupineD','앙와위 이완기',v.supineD)+numberInput('dzStandingS','기립 수축기',v.standingS)+numberInput('dzStandingD','기립 이완기',v.standingD)+numberInput('dzMinutes','기립 후 측정 시각 (분)',v.minutes,60)+'<p id="dzBPResult" role="status">'+safe(bp(v).text)+'</p><p>실측 증상·맥박·지속 여부·다른 측정 시점은 별도로 확인합니다. 이 계산은 POTS·신경성 원인 또는 안전성을 판정하지 않습니다.</p>'+refs(['aha','orthostatic'])+'</details>';
 const update=()=>{state.bp={supineS:el('dzSupineS').value,supineD:el('dzSupineD').value,standingS:el('dzStandingS').value,standingD:el('dzStandingD').value,minutes:el('dzMinutes').value,protocol:el('dzBPProtocol').value};el('dzBPResult').textContent=bp(state.bp).text;invalidate();};
 ['dzSupineS','dzSupineD','dzStandingS','dzStandingD','dzMinutes'].forEach(id=>el(id).oninput=update);el('dzBPProtocol').onchange=update;
}
function renderFollowup(p){
 el('docFollowupTableBody').innerHTML='<tr><td>'+safe(p.name)+'</td><td>'+(p.id==='bppv'?'관찰/치료 후 1개월 이내 재평가':'위험도·치료·내약성에 따라 담당의 결정')+'</td><td>'+safe(p.followUpAndSafety.join(' '))+'</td></tr>';
 const n=ensure('dzFollowup','docPatientLeafletArea'),v=state.metrics;
 n.innerHTML='<h3>추적 지표 — 현재 화면 메모리만 사용</h3>'+list(p.followUpAndSafety)+numberInput('dzDays','최근 30일 중 어지러운 날',v.days,30)+'<p id="dzDaysResult" role="status">'+(metric(v.days)===null?'미입력/오류: 0~30의 정수 날짜를 입력하세요.':'입력한 어지럼일 '+metric(v.days)+'일. 횟수만으로 호전·진단을 판정하지 않습니다.')+'</p><label>진료 시 확인할 기능·낙상·청력·부작용/목표 <textarea id="dzMetricNote" rows="3" maxlength="1000" aria-label="어지럼 추적 검토 메모"></textarea></label><p>새 신경/청각 증상·보행 악화는 예정 재진을 기다리지 말고 평가합니다. 환자 식별정보를 입력하지 마세요. 다음 진료일은 기존 안내서에 담당의가 입력합니다.</p>'+refs(p.sources);
 el('dzMetricNote').value=v.note||'';
 el('dzDays').oninput=()=>{state.metrics.days=el('dzDays').value;const value=metric(state.metrics.days);el('dzDaysResult').textContent=value===null?'미입력/오류: 0~30의 정수 날짜를 입력하세요.':'입력한 어지럼일 '+value+'일. 횟수만으로 호전·진단을 판정하지 않습니다.';invalidate();};
 el('dzMetricNote').oninput=()=>{state.metrics.note=el('dzMetricNote').value.slice(0,1000);invalidate();};
}
const oldDoctor=renderDoctorStage;
renderDoctorStage=function(){
 oldDoctor();if(AppState.activeDoctorSymptom!=='dizziness'){lastKey='';return;}
 const p=path(),key='dizziness:'+p.id;
 if((lastKey&&lastKey!==key)||(!lastKey&&hasRendered)){state=fresh();clearVisitDraft();invalidate();}
 lastKey=key;hasRendered=true;prune();
 el('docAnswerTable').innerHTML=D.questions.filter(q=>visible(q)).map(q=>'<tr><th>'+safe(q.stem)+'</th><td>'+safe(AppState.answers[q.id]||'(미응답/직접 확인)')+'</td></tr>').join('');
 const r=priority(),banner=document.createElement('div');banner.className=r.urgent.length?'danger-box':'dz-note';banner.setAttribute('role','status');
 banner.textContent=r.urgent.length?'즉시 의료진 평가: 응급 위험신호 응답 '+r.urgent.length+'개. 통상 외래 치료보다 긴급 평가 우선.':r.hearing?'급성 난청 응답: 신속한 청각/중추 원인 평가가 필요합니다. 단순 말초 어지럼으로 단정하지 마세요.':'선택된 위험신호 없음 또는 미응답. 응급 원인 배제를 뜻하지 않습니다.';
 el('docRedFlagsArea').insertBefore(banner,el('docRedFlagsArea').firstChild);
 renderHints();renderTests(p);if(p.id==='orthostatic_hypo')renderBP();renderPlan(p);renderFollowup(p);
 const art=el('clinicEducationArt');if(['vestibular_migraine','pppd','orthostatic_hypo','central_dizziness_eval'].includes(p.id)){art.innerHTML='';art.hidden=true;}else{const note=document.createElement('p');note.className='dz-art-note';note.textContent='기존 어지럼 공통 귀 구조 참고 그림입니다. 선택 질환이나 개인의 확정 기전 그림이 아닙니다. 아래 질환별 SVG·설명을 확인하세요.';art.appendChild(note);}
};
const oldVisit=getVisitEmrText;
window.getVisitEmrText=function(){
 let t=oldVisit();if(AppState.activeDoctorSymptom!=='dizziness')return t;const p=path();
 return t+'\n■ 어지럼 의사 검토 (자동 진단/처방 아님)\n경로: '+p.name+(p.id==='bppv'?' / '+facetLabel():['vestibular_migraine','meniere'].includes(p.id)?' / '+certaintyLabel():'')+'\n'+chosenCriteria(p).filter(c=>state.criteria[c.id]).map(c=>'- '+c.text+': '+(state.criteria[c.id]==='yes'?'의사 확인':'미충족')).join('\n')+'\n검토 검사 후보: '+selectedTests(p).filter(x=>state.tests.includes(x.id)).map(x=>x.name).join(' · ')+'\n검토 치료 후보: '+candidates(p).filter(x=>state.therapies.includes(x.id)).map(x=>x.name).join(' · ')+'\n최근 30일 어지럼일: '+(metric(state.metrics.days)??'미확인')+'\n추적 검토 메모: '+(state.metrics.note||'미입력')+'\n';
};
const oldEducationHTML=getSelectedEducationHTML;
window.getSelectedEducationHTML=function(){const html=oldEducationHTML();return AppState.activeDoctorSymptom==='dizziness'&&printDepth>0?html+'<!-- dizziness-review:'+revision+' -->':html;};
const oldPrint=printVisitSheet;
window.printVisitSheet=async function(){if(AppState.activeDoctorSymptom!=='dizziness')return oldPrint();printDepth++;try{return await oldPrint();}finally{printDepth--;}};
const oldCopy=copyEmrText;
copyEmrText=function(){if(AppState.activeDoctorSymptom!=='dizziness'){oldCopy();return;}const qs=mod.questions;mod.questions=qs.filter(q=>visible(q));try{oldCopy();}finally{mod.questions=qs;}};
const oldReset=resetPatientIntake;
resetPatientIntake=function(){revision++;state=fresh();lastKey='';hasRendered=false;oldReset();};
window.NeuroDizziness={version:D.version,visible,hints,bp,metric,priority,getState:()=>JSON.parse(JSON.stringify(state))};
})();
