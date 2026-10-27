/* Headache-only extension; no network requests or patient persistence. */
(function haModule(){
'use strict';
const D=window.NeuroHeadacheData,el=id=>document.getElementById(id);
if(!D)throw Error('두통 임상 데이터 로딩 실패');
const safe=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const refs=ids=>'<div class="ha-sources">'+[...new Set(ids)].map(id=>{const s=D.sources[id];return '<a href="'+safe(s.url)+'" target="_blank" rel="noopener noreferrer">'+safe(s.title)+' · '+safe(s.date)+'</a><small> — '+safe(s.access||'확인 범위 검토 필요')+'</small>';}).join('<br>')+'</div>';
const list=xs=>'<ul>'+xs.map(x=>'<li>'+safe(x)+'</li>').join('')+'</ul>';
const mod=NEURO_DATA.headache;
mod.questions=D.questions;
D.questions.forEach(q=>PATIENT_INTAKE_COPY.questions[q.id]=[q.stem,q.options.map(o=>o.text)]);
mod.differentialPathways=D.paths;
mod.redFlags=['벼락두통·새 신경학적 이상·의식 저하·중증 감염/수막 자극·급성 통증성 시력 저하: 즉시 평가','새 고령 두통·암/면역저하·임신/산후 새 두통·외상·자세/발살바 연관·진행/양상 변화: 원인과 긴급도 확인','유두부종·새 약물·진통제 과용 등 SNNOOP10 영역도 진찰·복약력으로 확인'];
mod.clinicalAssessment='활력징후·의식·국소 신경학적 진찰·안저/유두부종·경부/수막 자극 및 상황별 전신 진찰. 문진만으로 정상이나 진단을 확정하지 않습니다.';
mod.followUpSchedule=[{phase:'두통별 계획',interval:'담당의가 개별 결정',checkpoints:'선택 경로의 추적 항목과 두통일지',targets:'두통 부담 감소 및 안전성'}];
Object.entries(D.education).forEach(([id,v])=>EDUCATION_V2[id]=v);
const oldMechanism=getMechanismEducation;
getMechanismEducation=function(sym,id,name){
 if(sym!=='headache')return oldMechanism(sym,id,name);
 const txt=D.education[id]||D.education.secondary_headache_eval;
 const flows={migraine:[['뇌 통증 처리','과민성 변화'],['삼차신경 경로','통증 신호'],['매개물질','CGRP 등'],['두통·동반증상','개별 확인']],tension:[['여러 요인','개별 차이'],['통증 조절 변화','말초·중추'],['조이는 통증','임상 평가'],['다른 원인','배제 필요']],moh:[['기저 두통','진료 확인'],['잦은 약 사용','성분·날짜'],['두통 증가','인과 평가'],['관리 계획','감독하 감량']],cluster:[['조절 회로','리듬 관련'],['삼차신경 통증','심한 편측 통증'],['자율신경','눈물·콧물'],['발작 평가','다른 원인 배제']],headache_trigeminal_neuralgia:[['삼차신경','얼굴 감각'],['접촉 등 유발','짧은 신호'],['전격성 통증','임상 평가'],['원인 확인','MRI 등 검토']],secondary_headache_eval:[['새/다른 두통','병력 확인'],['위험신호','진찰 확인'],['긴급도 판단','의료진 결정'],['원인 평가','검사·전원']]};
 return {title:name+' 설명 도식',svg:buildFlowSvg('환자 설명용 단순화 도식',flows[id]||flows.secondary_headache_eval),points:[txt[0],txt[1],txt[3]]};
};
function fresh(){return {aura:'unknown',frequency:'unknown',criteria:{},tests:[],treatments:[],metrics:{},overuse:{}};}
let state=fresh(),lastKey='',direction=1;
function visible(q,answers=AppState.answers){if(!q.when)return true;const a=answers[q.when];if(!a||a==='건너뜀'||a==='잘 모르겠어요')return false;return q.equals?a===q.equals:a!==q.not;}
function prune(){D.questions.forEach(q=>{if(!visible(q))delete AppState.answers[q.id];});}
const oldQ=renderQuestion;
renderQuestion=function(){
 prune();while(AppState.queueIndex>=0&&AppState.queueIndex<AppState.queue.length){const i=AppState.queue[AppState.queueIndex];if(i.symptomId!=='headache'||visible(i.question))break;AppState.queueIndex+=direction;}
 if(AppState.queueIndex<0)AppState.queueIndex=0;
 oldQ();
 if(AppState.queue.some(i=>i.symptomId==='headache')&&AppState.queueIndex<AppState.queue.length){const qs=AppState.queue.filter(i=>i.symptomId!=='headache'||visible(i.question));const n=qs.indexOf(AppState.queue[AppState.queueIndex])+1;el('wizardStepCount').textContent='문항 '+n+' / '+qs.length+' (답변에 따라 달라질 수 있음)';el('wizardProgressBar').style.width=Math.round(n/qs.length*100)+'%';}
};
const oldPrev=prevQuestion,oldNext=nextQuestion;
prevQuestion=function(){direction=-1;try{oldPrev();}finally{direction=1;}};
nextQuestion=function(){direction=1;oldNext();};
function number(v,min,max){if(v===null||v===undefined||String(v).trim()==='')return null;const n=Number(v);return Number.isFinite(n)&&n>=min&&n<=max?n:null;}
function overuse(v){
 const h=number(v.headacheDays,0,31),d=number(v.days,0,31),m=number(v.months,0,1200),t={simple:15,triptan:10,combination:10,opioid:10,multiple:10}[v.kind];
 if(h===null||d===null||m===null||!t)return {status:'incomplete',text:'확인 필요: 두통일·성분군·사용일·기간을 입력하세요. 미입력은 0이 아닙니다.'};
 if(!Number.isInteger(h)||!Number.isInteger(d))return {status:'invalid',text:'두통일과 사용일은 정수 날짜 수로 입력하세요.'};
 if(v.kind==='multiple'&&v.union!=='yes')return {status:'incomplete',text:'여러 군은 중복 없는 전체 사용일과 개별 약물군 과용 여부를 확인하세요. 날짜 단순 합산 금지.'};
 if(h>=15&&d>=t&&m>3)return {status:'review',text:'빈도·기간 기준 해당: 기존 두통 병력·성분군·다른 원인 확인 후 MOH 병기 여부를 의사가 검토하세요.'};
 return {status:'below',text:'입력값은 MOH 빈도·기간 기준을 모두 충족하지 않습니다. 과용 위험 배제를 뜻하지 않으며 다른 성분군도 확인하세요.'};
}
function response(v){const b=number(v.baseline,0,31),n=number(v.current,0,31);return b===null||n===null||b===0||!Number.isInteger(b)||!Number.isInteger(n)?'계산 불가: 치료 전 월 편두통일은 0 초과, 두 값 모두 0~31의 정수여야 합니다.':'월 편두통일 감소율 '+((b-n)/b*100).toFixed(1)+'%. 기능·급성기 반응·부작용·선호와 함께 평가합니다. 자동 치료 변경 기준이 아닙니다.';}
function priority(a=AppState.answers){return {immediate:['ha_thunderclap','ha_neuro','ha_fever','ha_eye'].filter(id=>a[id]==='예'),review:['ha_age_new','ha_change','ha_context_change','ha_background','ha_injury','ha_position'].filter(id=>a[id]==='예')};}
function ensure(id,parent){let n=el(id);if(!n){n=document.createElement('section');n.id=id;n.className='ha-clinical';el(parent).appendChild(n);}return n;}
function invalidate(){el('visitReviewed').checked=false;el('eduConfirmed').checked=false;toggleEducationPrint();refreshVisitPrint();el('visitPrintSheet').innerHTML='';}
function clearContext(){state={...fresh(),aura:state.aura,frequency:state.frequency};clearVisitDraft();invalidate();}
const current=()=>D.paths.find(p=>p.id===AppState.selectedSubpath.headache)||D.paths[0];
const drugIDs=id=>({migraine:['simple','triptan','gepant','topiramate','cgrp','otherprevent','botox'],tension:['simple','tthdrug'],moh:['topiramate','cgrp'],cluster:['clusterdrug'],headache_trigeminal_neuralgia:['tndrug'],secondary_headache_eval:[]})[id];
function renderPlan(path){
 const checks=D.criteria[path.id].map(([id,t,s])=>'<label>'+safe(t)+' <select data-ha-check="'+id+'" aria-label="'+safe(t)+'"><option value="">미확인</option><option value="yes" '+(state.criteria[id]==='yes'?'selected':'')+'>충족/확인</option><option value="no" '+(state.criteria[id]==='no'?'selected':'')+'>미충족</option></select></label>'+refs([s])).join('');
 const cards=drugIDs(path.id).filter(id=>id!=='botox'||path.id==='moh'||state.frequency==='chronic').map(id=>{const d=D.drugs.find(x=>x.id===id);return '<tr><td><label><input type="checkbox" data-ha-drug="'+id+'" '+(state.treatments.includes(id)?'checked':'')+'> '+safe(d.name)+'</label></td><td>'+safe(d.evidence)+'</td><td>'+safe(d.safety)+(d.dose?'<p>'+safe(d.dose)+'</p>':'')+'</td><td>'+safe(d.kr)+refs(d.sources)+'</td></tr>';}).join('');
 const migraine=path.id==='migraine';
 const facet=migraine?'<label>전조 분류 <select id="haAura"><option value="unknown">미확인</option><option value="without">무전조편두통</option><option value="with">전조편두통</option><option value="both">전조·무전조 발작 공존</option></select></label><label>빈도 분류 <select id="haFrequency"><option value="unknown">미확인</option><option value="episodic">삽화성</option><option value="chronic">만성</option></select></label><p>별도 분류 축을 의사가 선택합니다. 환자 응답으로 자동 진단하지 않습니다. MOH는 필요 시 병기 검토합니다.</p>':'';
 const primary=migraine?'<p><strong>예방치료 검토:</strong> 월 편두통일 또는 중등도 이상 두통일 ≥4일, 혹은 상당한 기능 지장 (AAN/AHS 2026 Level B). 동반질환·임신 가능성·선호·과용·기존 치료를 확인합니다.</p><p>CGRP 표적치료는 1차 선택지가 될 수 있으나 국내 급여 선행 실패 요건과 별개입니다. 외래 경구 치료와 응급실 주사 치료 권고는 구분합니다.</p>'+refs(['prevent','cgrp','acute','ed']):list(path.followUpAndSafety);
 const n=ensure('haPlan','docSubpathContent');
 n.innerHTML='<h3>두통 임상 검토</h3><p>'+safe(D.review)+' · '+D.version+'</p>'+facet+primary+'<details><summary>ICHD-3 확인 체크리스트 (자동 확정 없음)</summary>'+checks+'</details>'+(cards?'<details><summary>치료 후보 비교·주의·국내 상태 — 펼쳐서 선택</summary><p>VA/DoD·SISC/IHS·AAN은 평가 시점·방법·대상·용량이 다릅니다. 서로 다른 권고 등급을 하나로 환산하지 않습니다. 안전성은 제품별 허가사항을 추가 확인합니다.</p><div class="ha-scroll"><table><thead><tr><th>검토 선택</th><th>근거</th><th>주의·감시</th><th>국내 상태·출처</th></tr></thead><tbody>'+cards+'</tbody></table></div></details>':'')+'<p>체크는 검토 후보이며 처방이 아닙니다. 미확인 용량은 제공하지 않습니다.</p><button type="button" id="haApplyPlan" class="btn-subpath">검토 선택을 진료 안내 초안에 반영</button>'+refs(path.source);
 n.querySelectorAll('[data-ha-check]').forEach(x=>x.onchange=()=>{state.criteria[x.getAttribute('data-ha-check')]=x.value;invalidate();});
 n.querySelectorAll('[data-ha-drug]').forEach(x=>x.onchange=()=>{const id=x.getAttribute('data-ha-drug');state.treatments=x.checked?[...new Set([...state.treatments,id])]:state.treatments.filter(v=>v!==id);invalidate();});
 if(migraine){el('haAura').value=state.aura;el('haFrequency').value=state.frequency;['haAura','haFrequency'].forEach(id=>el(id).onchange=()=>{state[id==='haAura'?'aura':'frequency']=el(id).value;clearContext();renderDoctorStage();});}
 el('haApplyPlan').onclick=()=>{
  const a={without:'무전조',with:'전조',both:'전조·무전조 공존',unknown:'미확인'},f={episodic:'삽화성',chronic:'만성',unknown:'미확인'};
  el('visitDiagnosis').value=path.name+(migraine?' (전조: '+a[state.aura]+', 빈도: '+f[state.frequency]+')':'')+' — 담당의 확인 초안';
  el('visitTests').value=state.tests.map(i=>D.tests[path.id][i][0]).join('\n');
  el('visitCare').value=state.treatments.map(id=>D.drugs.find(d=>d.id===id).name+' — 검토 후보; 처방 별도 확인').join('\n');
  ['visitDiagnosis','visitTests','visitCare'].forEach(id=>{const x=el(id);if(typeof Event==='function')x.dispatchEvent(new Event('input',{bubbles:true}));else if(x.dispatch)x.dispatch('input');});
  invalidate();
 };
}
function renderTests(path){
 const n=el('docTestCandidatesList');
 n.innerHTML='<p>현재 경로: <strong>'+safe(path.name)+'</strong> · 검토 후보이며 검사 오더가 아닙니다.</p>'+D.tests[path.id].map((r,i)=>'<div class="test-candidate-card"><label><input type="checkbox" data-ha-test="'+i+'" '+(state.tests.includes(i)?'checked':'')+'> <strong>'+safe(r[0])+'</strong></label><p>'+safe(r[1])+'</p><p>'+safe(r[2])+'</p>'+refs([r[3]])+'</div>').join('');
 n.querySelectorAll('[data-ha-test]').forEach(x=>x.onchange=()=>{const i=Number(x.getAttribute('data-ha-test'));state.tests=x.checked?[...new Set([...state.tests,i])]:state.tests.filter(v=>v!==i);invalidate();});
}
const input=(id,label,v='',max=31)=>'<label>'+label+' <input id="'+id+'" type="number" min="0" max="'+max+'" step="1" value="'+safe(v)+'"></label>';
function renderOveruse(){
 const v=state.overuse,n=ensure('haOveruse','docRedFlagsArea');
 n.innerHTML='<details><summary>약물과용 기준 확인 — 사용일 수동 입력</summary><p>단순 진통제 ≥15일/월, 트립탄·복합제·오피오이드 등 ≥10일/월, >3개월. MOH는 월 두통 ≥15일과 기존 두통 병력이 필요합니다. 같은 날짜 중복 합산 금지.</p>'+input('haOH','월 두통일',v.headacheDays)+input('haOD','월 사용일',v.days)+input('haOM','지속 개월',v.months,1200)+'<label>성분군 <select id="haOK"><option value="">미확인</option><option value="simple">비오피오이드 단순 진통제 전체</option><option value="triptan">트립탄</option><option value="combination">복합 진통제</option><option value="opioid">오피오이드/에르고트</option><option value="multiple">여러 성분군</option></select></label><label><input type="checkbox" id="haOU" '+(v.union==='yes'?'checked':'')+'> 여러 군: 중복 없는 날짜·개별군 확인</label><p id="haOveruseResult" role="status">'+safe(overuse(v).text)+'</p><p>교육·예방치료·중단/감량을 함께 검토합니다. 오피오이드·바르비투르산·진정제는 감독하 점진 감량을 검토합니다.</p>'+refs(['moh'])+'</details>';
 el('haOK').value=v.kind||'';
 const update=()=>{state.overuse={headacheDays:el('haOH').value,days:el('haOD').value,months:el('haOM').value,kind:el('haOK').value,union:el('haOU').checked?'yes':'no'};el('haOveruseResult').textContent=overuse(state.overuse).text;invalidate();};
 ['haOH','haOD','haOM'].forEach(id=>el(id).oninput=update);['haOK','haOU'].forEach(id=>el(id).onchange=update);
}
function renderFollowup(path){
 const n=ensure('haFollowup','docPatientLeafletArea'),v=state.metrics;
 const notes=path.id==='migraine'?['매 방문: 월 두통일·편두통일·급성기 약 사용일·일상 기능·2시간 통증 소실/재발·부작용 확인.','일지와 환자 목표로 평가 (AAN/AHS 15A B, 15B C, 15C A). 50%만을 유일한 성공 기준으로 사용하지 않습니다.','고정 재진 간격은 지정하지 않습니다. 시작/증량·내약성·위험도에 따라 결정합니다. 대부분 예방약은 권장 내약 용량에서 8~12주, onabotulinumtoxinA는 24주 후 효과 평가 (14A/B Level B). 불내약 시 그 전에도 감량/대체를 검토합니다. 안정 후 감량 논의는 권고 17B(6개월) 참고; 개인별 판단 필요.']:path.followUpAndSafety;
 n.innerHTML='<h3>치료 반응·추적 검토</h3>'+list(notes)+(path.id==='migraine'?input('haBaseline','치료 전 월 편두통일',v.baseline)+input('haCurrent','현재 월 편두통일',v.current)+'<p id="haResponse" role="status">'+safe(response(v))+'</p>':'')+'<p>재진 시 새 위험신호·임신 계획·동반약 변경을 확인합니다. 다음 진료일은 기존 안내서 입력란에 담당의가 정합니다.</p>'+refs(path.id==='migraine'?['prevent','acute']:path.source);
 if(path.id==='migraine')for(const id of ['haBaseline','haCurrent'])el(id).oninput=()=>{state.metrics={baseline:el('haBaseline').value,current:el('haCurrent').value};el('haResponse').textContent=response(state.metrics);invalidate();};
}
const oldDoctor=renderDoctorStage;
renderDoctorStage=function(){
 oldDoctor();if(AppState.activeDoctorSymptom!=='headache'){lastKey='';return;}
 const p=current(),key='headache:'+p.id;
 if((lastKey&&lastKey!==key)||(!lastKey&&window.NeuroHeadache.hasRendered)){state=fresh();clearVisitDraft();invalidate();}
 lastKey=key;window.NeuroHeadache.hasRendered=true;prune();
 el('docAnswerTable').innerHTML=D.questions.filter(q=>visible(q)).map(q=>'<tr><th>'+safe(q.stem)+'</th><td>'+safe(AppState.answers[q.id]||'(미응답/직접 확인)')+'</td></tr>').join('');
 const r=priority(),banner=document.createElement('div');banner.className=r.immediate.length?'danger-box':'ha-note';banner.setAttribute('role','status');
 banner.textContent=r.immediate.length?'즉시 의료진 평가: 응급 위험신호 응답 '+r.immediate.length+'개. 일반 치료보다 응급 평가 우선.':r.review.length?'추가 원인·긴급도 검토: 위험신호 응답 '+r.review.length+'개.':'선택된 위험신호 없음 또는 미응답. 위험신호 배제를 뜻하지 않습니다.';
 el('docRedFlagsArea').insertBefore(banner,el('docRedFlagsArea').firstChild);
 renderOveruse();renderTests(p);renderPlan(p);renderFollowup(p);
 const note=document.createElement("p");note.className="ha-art-note";note.textContent="기존 두통 공통 참고 그림입니다. 선택 질환별 설명은 아래 SVG와 교육 문구를 확인하세요.";el("clinicEducationArt").appendChild(note);
};
const oldVisit=getVisitEmrText;
window.getVisitEmrText=function(){let t=oldVisit();if(AppState.activeDoctorSymptom!=='headache')return t;const p=current();return t+'\n■ 두통 의사 검토 (자동 진단/처방 아님):\n경로: '+p.name+'\n전조: '+state.aura+' / 빈도: '+state.frequency+'\n'+D.criteria[p.id].filter(([id])=>state.criteria[id]).map(([id,s])=>'- '+s+': '+(state.criteria[id]==='yes'?'담당의 확인':'미충족')).join('\n')+'\n검토 검사 후보: '+state.tests.map(i=>D.tests[p.id][i][0]).join(' · ')+'\n치료 검토 후보: '+state.treatments.map(id=>D.drugs.find(d=>d.id===id).name).join(' · ')+'\n'+(p.id==='migraine'?response(state.metrics)+'\n':'');};
const oldCopy=copyEmrText;
copyEmrText=function(){if(AppState.activeDoctorSymptom!=='headache'){oldCopy();return;}const qs=mod.questions;mod.questions=qs.filter(q=>visible(q));try{oldCopy();}finally{mod.questions=qs;}};
const oldReset=resetPatientIntake;
resetPatientIntake=function(){state=fresh();lastKey='';window.NeuroHeadache.hasRendered=false;oldReset();};
window.NeuroHeadache={version:D.version,hasRendered:false,visible,overuse,response,priority,getState:()=>JSON.parse(JSON.stringify(state))};
})();
