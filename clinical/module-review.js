/* Common review engine for explicitly registered modules. No patient persistence or automatic requests. */
(function moduleReview(){
'use strict';
const configs=window.NeuroClinicalModules||{},ids=Object.keys(configs),el=id=>document.getElementById(id);
const safe=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const list=xs=>'<ul>'+(xs||[]).map(t=>'<li>'+safe(t)+'</li>').join('')+'</ul>';
const originalPaths=new Set();
ids.forEach(id=>{
 const m=NEURO_DATA[id],c=configs[id];if(!m)throw Error('Unknown clinical module '+id);
 m.differentialPathways.forEach(p=>originalPaths.add(id+':'+p.id));
 // Preserve original question IDs and safety flags, while storing the same neutral words the patient sees.
 m.questions.forEach(q=>{const copy=PATIENT_INTAKE_COPY.questions[q.id];q.options.forEach((o,i)=>{if(copy?.[1]?.[i])o.text=copy[1][i];});
 if(!q.options.some(o=>o.text==='잘 모르겠어요')){q.options.push({text:'잘 모르겠어요'});copy[1].push('잘 모르겠어요');}});
 const urgent=c.extraQuestions.filter(q=>q.emergency&&!q.when),rest=c.extraQuestions.filter(q=>!urgent.includes(q));
 m.questions=[...urgent,...m.questions,...rest];
 c.extraQuestions.forEach(q=>PATIENT_INTAKE_COPY.questions[q.id]=[q.stem,q.options.map(o=>o.text)]);
 m.differentialPathways=c.paths;m.redFlags=[c.urgentText,'응답/선별검사만으로 위험 원인·진단을 배제하지 않습니다.'];
 m.clinicalAssessment='선택 질환의 병력·진찰·감별 기준을 아래에서 직접 확인합니다. 환자 보고·미확인·의사 확인을 구분하며 자동 진단/처방하지 않습니다.';
 m.testConsiderations=c.paths[0].tests.map(t=>({name:t.name,why:t.indications,indications:t.indications,caveats:t.limitations}));
 m.followUpSchedule=[{phase:'질환별 추적',interval:'담당의가 개별 결정',checkpoints:'아래 선택 질환의 반응·안전·기능 지표',targets:'환자 목표와 안전'}];
 c.paths.forEach(p=>EDUCATION_V2[p.id]=p.education);
});
const active=()=>configs[AppState.activeDoctorSymptom];
const currentPath=()=>active()?.paths.find(p=>p.id===AppState.selectedSubpath[AppState.activeDoctorSymptom])||active()?.paths[0];
const refs=(c,keys)=>'<div class="cm-sources">'+[...new Set(keys)].map(k=>{const s=c.sources[k];if(!s)throw Error('Missing source '+k);return '<a href="'+safe(s.url)+'" target="_blank" rel="noopener noreferrer">'+safe(s.title)+' · '+safe(s.date)+'</a><small> — '+safe(s.type||'근거')+' / '+safe(s.access)+'</small>';}).join('<br>')+'</div>';
const fresh=()=>({facet:'unknown',criteria:{},tests:[],therapies:[],metrics:{days:'',note:''}});
let state=fresh(),lastKey='',seen=false,direction=1,revision=0,printDepth=0;
function visible(q,a=AppState.answers){if(!q.when)return true;const v=a[q.when];if(!v||v==='건너뜀'||v==='잘 모르겠어요')return false;return q.oneOf?q.oneOf.includes(v):v===q.equals;}
function prune(){ids.forEach(id=>configs[id].extraQuestions.forEach(q=>{if(!visible(q))delete AppState.answers[q.id];}));}
function queueVisible(i){if(configs[i.symptomId])return visible(i.question);if(i.symptomId==='headache'&&window.NeuroHeadache)return window.NeuroHeadache.visible(i.question);if(i.symptomId==='dizziness'&&window.NeuroDizziness)return window.NeuroDizziness.visible(i.question);return true;}
const oldQuestion=renderQuestion,oldPrev=prevQuestion,oldNext=nextQuestion;
renderQuestion=function(){prune();while(AppState.queueIndex>=0&&AppState.queueIndex<AppState.queue.length&&!queueVisible(AppState.queue[AppState.queueIndex]))AppState.queueIndex+=direction;if(AppState.queueIndex<0)AppState.queueIndex=0;oldQuestion();
 if(AppState.queue.some(i=>configs[i.symptomId])&&AppState.queueIndex<AppState.queue.length){const q=AppState.queue.filter(queueVisible),n=q.indexOf(AppState.queue[AppState.queueIndex])+1;el('wizardStepCount').textContent='문항 '+n+' / '+q.length+' (답변에 따라 달라질 수 있음)';el('wizardProgressBar').style.width=Math.round(n/q.length*100)+'%';}
};
prevQuestion=function(){direction=-1;try{oldPrev();}finally{direction=1;}};
nextQuestion=function(){direction=1;oldNext();};
function ensure(id,parent){let n=el(id);if(!n){n=document.createElement('section');n.id=id;n.className='cm-review';el(parent).appendChild(n);}return n;}
function invalidate(){revision++;let n=el('cmRevision');if(!n&&el('cmFollowup')){n=document.createElement('span');n.id='cmRevision';n.hidden=true;el('cmFollowup').appendChild(n);}if(n)n.textContent=String(revision);el('visitReviewed').checked=false;el('eduConfirmed').checked=false;toggleEducationPrint();refreshVisitPrint();el('visitPrintSheet').innerHTML='';}
function count(v){if(v===null||v===undefined||String(v).trim()==='')return null;const n=Number(v);return Number.isInteger(n)&&n>=0&&n<=30?n:null;}
function priority(id=AppState.activeDoctorSymptom,a=AppState.answers){const m=NEURO_DATA[id];if(!configs[id]||!m)return {urgent:[],review:[]};const urgent=[],review=[];m.questions.forEach(q=>{if(!visible(q,a))return;const o=q.options.find(o=>o.text===a[q.id]);if(o?.emergency)urgent.push(q.id);else if(o?.redFlag)review.push(q.id);});return {urgent,review};}
function candidates(p){if(p.facets!=='seizure')return p.therapies;return p.therapies.filter(t=>t.id==='focalASM'?state.facet==='focal':t.id==='generalASM'?state.facet==='general':false);}
const facetLabels={unknown:'미확인',focal:'국소',general:'전신',unknownOrigin:'국소/전신 불명',unclassified:'미분류'};
function renderPlan(c,p){
 const box=ensure('cmPlan','docSubpathContent');
 const facet=p.facets==='seizure'?'<label>ILAE 2025 발작 분류 <select id="cmFacet">'+Object.entries(facetLabels).map(([k,v])=>'<option value="'+k+'" '+(state.facet===k?'selected':'')+'>'+v+'</option>').join('')+'</select></label><p>분류는 담당의 확인입니다. 불명/미분류에 국소 또는 전신 약물을 자동 연결하지 않습니다.</p>':'';
 const scaleLinks=(c.scales||[]).filter(id=>window.NeuroScaleLibrary?.canUseElectronic(id)).map(id=>'<button type="button" class="btn-subpath" data-cm-scale="'+id+'">기존 허용 척도: '+safe(window.NEURO_SCALE_CATALOG.scales.find(s=>s.id===id)?.name||id)+'</button>').join('');
 const criteria=p.criteria.map(x=>'<label>'+safe(x.text)+' <select data-cm-criterion="'+x.id+'" aria-label="'+safe(x.text)+'"><option value="">미확인</option><option value="yes" '+(state.criteria[x.id]==='yes'?'selected':'')+'>의사 확인/충족</option><option value="no" '+(state.criteria[x.id]==='no'?'selected':'')+'>미충족</option></select></label>').join('');
 const tx=candidates(p).map(t=>'<tr><td><label><input type="checkbox" data-cm-therapy="'+t.id+'" '+(state.therapies.includes(t.id)?'checked':'')+'> '+safe(t.name)+'</label></td><td>'+safe(t.evidence)+refs(c,t.sourceIds)+'</td><td>'+safe(t.safety)+'<p>'+safe(t.dose)+'</p></td><td>'+safe(t.domestic)+'</td></tr>').join('');
 box.innerHTML='<h3>질환별 의사 검토</h3><p>'+safe(c.review)+' · 기준 '+c.version+'</p>'+scaleLinks+facet+
 '<details><summary>정의·진단 확인·병력·진찰·감별</summary><p>아래는 핵심 검토 항목이며 공식 진단기준 전문을 대체하지 않습니다. 신경과 전문의 최종 검수가 필요합니다.</p><p>'+safe(p.classification)+'</p><p>'+safe(p.definition)+'</p><h4>진단 확인</h4>'+criteria+'<h4>병력</h4>'+list(p.history)+'<h4>진찰</h4>'+list(p.exam)+'<h4>감별</h4>'+list(p.differential)+'</details>'+
 '<details><summary>약물 비교·금기/감시·국내 확인 상태</summary>'+list(p.pharmPrinciples)+(tx?'<div class="cm-scroll"><table><thead><tr><th>검토 후보</th><th>근거</th><th>안전·용량</th><th>국내</th></tr></thead><tbody>'+tx+'</tbody></table></div>':'<p>현재 경로의 자동 약물 후보 없음. 원인·전문 평가 후 개별 계획을 정합니다.</p>')+'<h4>특수 상황</h4>'+list(p.special)+'<p>'+safe(p.korea)+'</p></details>'+
 '<button type="button" class="btn-subpath" id="cmApply">의사 검토 선택을 안내 초안에 반영</button>'+refs(c,p.sources);
 box.querySelectorAll('[data-cm-scale]').forEach(n=>n.onclick=()=>{const id=n.getAttribute('data-cm-scale');switchDocStage('stage4_scales');window.NeuroScaleLibrary.open(id);});
 box.querySelectorAll('[data-cm-criterion]').forEach(n=>n.onchange=()=>{state.criteria[n.getAttribute('data-cm-criterion')]=n.value;invalidate();});
 box.querySelectorAll('[data-cm-therapy]').forEach(n=>n.onchange=()=>{const id=n.getAttribute('data-cm-therapy');state.therapies=n.checked?[...new Set([...state.therapies,id])]:state.therapies.filter(v=>v!==id);invalidate();});
 if(el('cmFacet'))el('cmFacet').onchange=()=>{const facet=el('cmFacet').value;state={...fresh(),facet};clearVisitDraft();invalidate();renderDoctorStage();};
 el('cmApply').onclick=()=>{el('visitDiagnosis').value=p.name+(p.facets==='seizure'?' / '+facetLabels[state.facet]:'')+' — 담당의 확인 초안';el('visitTests').value=p.tests.filter(t=>state.tests.includes(t.id)).map(t=>t.name+' — 검토 후보').join('\n');el('visitCare').value=candidates(p).filter(t=>state.therapies.includes(t.id)).map(t=>t.name+' — 검토 후보; 실제 처방/시행 별도 확인').join('\n');['visitDiagnosis','visitTests','visitCare'].forEach(id=>{const n=el(id);if(typeof Event==='function')n.dispatchEvent(new Event('input',{bubbles:true}));else if(n.dispatch)n.dispatch('input');});invalidate();};
}
function renderTests(c,p){const box=el('docTestCandidatesList');box.innerHTML='<p>선택 검토 경로: <strong>'+safe(p.name)+'</strong> · 검사 오더/진단 확정 아님</p>'+p.tests.map(t=>'<div class="test-candidate-card"><label><input type="checkbox" data-cm-test="'+t.id+'" '+(state.tests.includes(t.id)?'checked':'')+'> <strong>'+safe(t.name)+'</strong></label><p>'+safe(t.indications)+'</p><p>'+safe(t.limitations)+'</p><p>'+safe(t.site)+'</p>'+refs(c,t.sourceIds)+'</div>').join('');box.querySelectorAll('[data-cm-test]').forEach(n=>n.onchange=()=>{const id=n.getAttribute('data-cm-test');state.tests=n.checked?[...new Set([...state.tests,id])]:state.tests.filter(v=>v!==id);invalidate();});}
function renderFollowup(c,p){
 el('docFollowupTableBody').innerHTML='<tr><td>'+safe(p.name)+'</td><td>위험·치료·내약성에 맞춰 담당의 결정</td><td>'+safe(p.followUpAndSafety.join(' '))+'</td></tr>';
 const box=ensure('cmFollowup','docPatientLeafletArea'),v=count(state.metrics.days);
 box.innerHTML='<h3>추적·반응 평가</h3>'+list(p.followUpAndSafety)+'<p>'+safe(p.followupDecision)+'</p><label>최근 30일 중 증상으로 불편했던 날 <input type="number" id="cmDays" min="0" max="30" step="1" value="'+safe(state.metrics.days)+'"></label><p id="cmCount" role="status">'+(v===null?'미입력/오류: 0~30의 정수 날짜를 확인하세요.':'입력 '+v+'일. 이 수치만으로 진단/중증도/치료 성공을 판정하지 않습니다.')+'</p><label>기능·치료 반응·부작용·추적 목표 (환자 식별정보 입력하지 마세요)<textarea id="cmNote" rows="3" maxlength="1000"></textarea></label><p>다음 날짜는 기존 안내서에 입력합니다. 검토 내용은 현재 화면 메모리만 사용합니다.</p>'+refs(c,p.sources);
 el('cmNote').value=state.metrics.note;
 el('cmDays').oninput=()=>{state.metrics.days=el('cmDays').value;const n=count(state.metrics.days);el('cmCount').textContent=n===null?'미입력/오류: 0~30의 정수 날짜를 확인하세요.':'입력 '+n+'일. 단독 진단/치료 변경 기준이 아닙니다.';invalidate();};
 el('cmNote').oninput=()=>{state.metrics.note=el('cmNote').value.slice(0,1000);invalidate();};
}
const oldMechanism=getMechanismEducation;
getMechanismEducation=function(id,pid,name){const c=configs[id],p=c?.paths.find(p=>p.id===pid);if(!p)return oldMechanism(id,pid,name);
 return {title:name+' 평가·관리 흐름',svg:buildFlowSvg('환자 설명용 평가 흐름 — 확정 병태생리/검사 결과 아님',[['변화 확인','증상·기능·경과'],['원인 평가','병력·진찰·선택 검사'],['의사와 계획','이득·위험·선호'],['경과 점검','기능·안전·반응']]),points:[p.education[0],p.education[1],p.education[3]]};
};
const oldRender=renderDoctorStage;
renderDoctorStage=function(){
 oldRender();const c=active();if(!c){lastKey='';return;}const p=currentPath(),key=c.id+':'+p.id;
 if((lastKey&&lastKey!==key)||(!lastKey&&seen)){state=fresh();clearVisitDraft();invalidate();}
 lastKey=key;seen=true;prune();
 el('docAnswerTable').innerHTML=NEURO_DATA[c.id].questions.filter(q=>visible(q)).map(q=>'<tr><th>'+safe(q.stem)+'</th><td>'+safe(AppState.answers[q.id]||'(미응답/직접 확인)')+'</td></tr>').join('');
 const r=priority(),banner=document.createElement('div');banner.className=r.urgent.length?'danger-box':'cm-note';banner.setAttribute('role','status');banner.textContent=r.urgent.length?'즉시 의료진 평가: 응급 위험신호 응답 '+r.urgent.length+'개. '+c.urgentText:r.review.length?'추가 위험/원인 검토 응답 '+r.review.length+'개. '+c.urgentText:'선택된 위험신호 없음 또는 미응답. 응급 원인 배제를 뜻하지 않습니다.';el('docRedFlagsArea').insertBefore(banner,el('docRedFlagsArea').firstChild);
 renderTests(c,p);renderPlan(c,p);renderFollowup(c,p);
 const art=el('clinicEducationArt');if(!p.png&&!originalPaths.has(c.id+':'+p.id)){art.innerHTML='';art.hidden=true;}else{const note=document.createElement('p');note.textContent='기존 증상군 공통 참고 그림이며 선택 질환의 확정 기전이나 개인 검사 결과가 아닙니다. 의료진이 적합성을 확인해 선택하세요.';art.appendChild(note);}
};
const oldVisit=getVisitEmrText;
window.getVisitEmrText=function(){let t=oldVisit();const c=active(),p=currentPath();if(!c||!p)return t;return t+'\n■ '+c.name+' 의사 검토 (자동 진단/처방 아님)\n경로: '+p.name+(p.facets==='seizure'?' / '+facetLabels[state.facet]:'')+'\n'+p.criteria.filter(x=>state.criteria[x.id]).map(x=>'- '+x.text+': '+(state.criteria[x.id]==='yes'?'의사 확인':'미충족')).join('\n')+'\n검토 검사: '+p.tests.filter(x=>state.tests.includes(x.id)).map(x=>x.name).join(' · ')+'\n검토 치료: '+candidates(p).filter(x=>state.therapies.includes(x.id)).map(x=>x.name).join(' · ')+'\n최근 30일 증상일: '+(count(state.metrics.days)??'미확인')+'\n추적 검토: '+(state.metrics.note||'미입력')+'\n';};
const oldCopy=copyEmrText;
copyEmrText=function(){const c=active();if(!c){oldCopy();return;}const m=NEURO_DATA[c.id],qs=m.questions;m.questions=qs.filter(q=>visible(q));try{oldCopy();}finally{m.questions=qs;}};
const oldEducation=getSelectedEducationHTML;
window.getSelectedEducationHTML=function(){const h=oldEducation();return active()&&printDepth>0?h+'<!-- clinical-review:'+revision+' -->':h;};
const oldPrint=printVisitSheet;
window.printVisitSheet=async function(){if(!active())return oldPrint();printDepth++;try{return await oldPrint();}finally{printDepth--;}};
const oldReset=resetPatientIntake;
resetPatientIntake=function(){revision++;state=fresh();lastKey='';seen=false;oldReset();};
window.NeuroModuleReview={ids,changedEducationIds:ids.flatMap(id=>configs[id].paths.map(p=>p.id)),getState:()=>JSON.parse(JSON.stringify(state)),visible,priority,count};
})();
