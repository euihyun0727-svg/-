import fs from 'node:fs/promises';
import {makeEnv,regressionSummary} from './neurodesk-regression.mjs';
import {base,hash,preserved} from './clinical-preservation.mjs';
const html=await fs.readFile(new URL('../index.html',import.meta.url),'utf8');
let checks=0;const cases=[];
function ok(n,v){if(!v)throw Error(n);checks++;}
const e=makeEnv(html),configs=e.ctx.NeuroClinicalModules||{},active=Object.keys(configs);
function doctor(id){const e=makeEnv(html);e.ctx.toggleSymptom(id);e.ctx.switchMode('doctor');return e;}
function path(e,id,pid){e.eval('AppState.selectedSubpath['+JSON.stringify(id)+']='+JSON.stringify(pid));e.ctx.renderDoctorStage();}
function input(e,id,value){const n=e.doc.getElementById(id);n.value=value;n.oninput();}
function patient(id,answers={},selected=[id]){
 const e=makeEnv(html);selected.forEach(id=>e.ctx.toggleSymptom(id));e.ctx.startPatientIntake();let guard=0;const shown=[],stops=[];
 while(e.eval('AppState.queueIndex<AppState.queue.length')){
  if(++guard>350)throw Error('queue loop');
  const item=e.eval('AppState.queue[AppState.queueIndex]'),q=item.question;shown.push(q.id);
  if(configs[item.symptomId])ok('patient neutral '+q.id,!/의심|알츠하이머형|복합부분발작|파킨슨형/.test(e.doc.getElementById('wizardQuestionBlock').textContent));
  const i=answers[q.id]===undefined?q.options.length-1:q.options.findIndex(o=>o.text===answers[q.id]);
  if(i<0)throw Error('bad fixture answer '+q.id);
  const old=e.eval('AppState.queueIndex');e.doc.querySelectorAll('#optList button')[i].click();e.flush();
  if(e.eval('AppState.queueIndex')===old){stops.push(q.id);ok('urgent waits '+q.id,!!e.doc.getElementById('questionEmergencyNotice'));e.ctx.nextQuestion();}
 }
 e.ctx.switchMode('doctor');return {e,shown,stops};
}
ok('at least one registered module',active.length>0);
ok('12 symptom groups retained',e.eval('Object.keys(NEURO_DATA).length')===12);
ok('unexpanded clinical data preserved',preserved(e,'modules'));
ok('unexpanded education preserved',preserved(e,'education'));
ok('unexpanded patient copy preserved',preserved(e,'copy'));
for(const [file,h]of Object.entries(base.files))ok('protected file '+file,hash(await fs.readFile(new URL('../'+file,import.meta.url)))===h);
for(const m of html.matchAll(/<(?:script|link)\b[^>]*(?:src|href)="([^"]+)"/g))if(!/^(https?:|data:|#)/.test(m[1]))ok('local asset '+m[1],(await fs.stat(new URL('../'+m[1],import.meta.url))).size>0);
for(const id of active){
 const c=configs[id],d=doctor(id);
 ok(id+' paths registered',d.eval('NEURO_DATA['+JSON.stringify(id)+'].differentialPathways.length')===c.paths.length);
 ok(id+' original IDs retained',JSON.parse(await fs.readFile(new URL('./clinical-original-paths.json',import.meta.url),'utf8'))[id].every(pid=>c.paths.some(p=>p.id===pid)));
 for(const s of Object.values(c.sources))ok(id+' source complete',s.title&&s.date&&s.access&&new URL(s.url).protocol==='https:');
 const newQs=c.extraQuestions;
 const q=newQs.find(q=>q.when);
 if(q){
  const parent=newQs.find(x=>x.id===q.when),positive=q.equals||q.oneOf?.[0];
  const flow=patient(id,{[q.when]:positive});ok(id+' conditional shown',flow.shown.includes(q.id));
  flow.e.eval('AppState.answers['+JSON.stringify(q.when)+']="잘 모르겠어요";AppState.answers['+JSON.stringify(q.id)+']="가상 이전 응답"');flow.e.ctx.renderDoctorStage();
  ok(id+' hidden answer cleared',flow.e.eval('AppState.answers['+JSON.stringify(q.id)+']')===undefined);
  flow.e.ctx.copyEmrText();await Promise.resolve();ok(id+' hidden question not in EMR',!flow.e.clips.at(-1).includes(q.stem));
 }
 const mdata=d.eval('NEURO_DATA['+JSON.stringify(id)+'].questions');
 const risk=mdata.find(q=>q.options.some(o=>o.emergency));
 if(risk){const opt=risk.options.find(o=>o.emergency);const flow=patient(id,{[risk.id]:opt.text});ok(id+' urgent stop',flow.stops.includes(risk.id));ok(id+' urgent banner',flow.e.doc.getElementById('docRedFlagsArea').textContent.includes('즉시 의료진 평가'));cases.push({module:id,case:'응급 위험 응답',result:'PASS'});}
 else{const q=newQs.find(q=>q.risk);const flow=patient(id,{[q.id]:q.options[0].text});ok(id+' review risk banner',flow.e.doc.getElementById('docRedFlagsArea').textContent.includes('추가 위험'));cases.push({module:id,case:'수면/부상 안전 위험 응답',result:'PASS'});}
 // Full patient flow with unknowns must not pre-fill diagnoses or medical confirmations.
 const normal=patient(id);ok(id+' no automatic confirmations',Object.keys(normal.e.ctx.NeuroModuleReview.getState().criteria).length===0);
 cases.push({module:id,case:'문진·조건 분기·미확인',result:'PASS'});
 for(const p of c.paths){
  path(d,id,p.id);ok(p.id+' independent clinical fields',['definition','criteria','history','exam','tests','nonPharmTx','pharmPrinciples','followUpAndSafety','differential','special','review'].every(k=>p[k]!==undefined));
  ok(p.id+' source refs',p.sources.every(s=>c.sources[s])&&p.criteria.every(x=>c.sources[x.source])&&p.tests.every(x=>x.sourceIds.every(s=>c.sources[s]))&&p.therapies.every(x=>x.sourceIds.every(s=>c.sources[s])));
  ok(p.id+' render',d.doc.getElementById('cmPlan').textContent.includes('질환별 의사 검토'));
  ok(p.id+' own followup',d.doc.getElementById('docFollowupTableBody').textContent.includes(p.name));
  ok(p.id+' own education',d.doc.getElementById('docPatientLeafletArea').textContent.includes(p.education[0]));
  ok(p.id+' SVG',!!d.doc.querySelector('#docMechanismArea svg'));
  ok(p.id+' private new path image policy',!d.doc.getElementById('clinicEducationArt').hidden||!d.doc.querySelector('#clinicEducationArt img'));
  const choices=d.doc.querySelectorAll('[data-cm-criterion]');ok(p.id+' unchecked criteria',choices.every(n=>n.value===''));
  if(p.facets==='seizure'){
   ok('unknown class no focal/general drugs',d.doc.querySelectorAll('[data-cm-therapy]').length===0);
   const f=d.doc.getElementById('cmFacet');f.value='focal';f.onchange();ok('focal specific candidate',!!d.doc.querySelector('[data-cm-therapy="focalASM"]')&&!d.doc.querySelector('[data-cm-therapy="generalASM"]'));
   d.doc.getElementById('cmFacet').value='general';d.doc.getElementById('cmFacet').onchange();ok('general specific candidate',!!d.doc.querySelector('[data-cm-therapy="generalASM"]')&&!d.doc.querySelector('[data-cm-therapy="focalASM"]'));
  }
  const criterion=d.doc.querySelector('[data-cm-criterion]');criterion.value='yes';criterion.onchange();
  const tx=d.doc.querySelector('[data-cm-therapy]');if(tx){tx.checked=true;tx.onchange();}
  const t=d.doc.querySelector('[data-cm-test]');if(t){t.checked=true;t.onchange();}
  d.doc.getElementById('cmApply').click();ok(p.id+' manual draft',d.doc.getElementById('visitDiagnosis').value.includes(p.name));
  d.ctx.copyEmrText();await Promise.resolve();ok(p.id+' manual EMR',d.clips.at(-1).includes('의사 확인')&&d.clips.at(-1).includes(p.name));
  d.ctx.switchDocStage('stage5_followup');d.doc.querySelector('[data-education]').checked=true;d.ctx.changeEducationChoice();d.doc.getElementById('visitReviewed').checked=true;d.ctx.refreshVisitPrint();const before=d.prints;await d.ctx.printVisitSheet();ok(p.id+' mock A4',d.prints===before+1&&d.doc.getElementById('visitPrintSheet').innerHTML.includes(p.education[0]));
  const next=c.paths.find(x=>x.id!==p.id);path(d,id,next.id);ok(p.id+' switch clears selection/draft/education',d.ctx.NeuroModuleReview.getState().tests.length===0&&d.ctx.NeuroModuleReview.getState().therapies.length===0&&d.doc.getElementById('visitCare').value===''&&!d.ctx.hasEducationSelection());
  path(d,id,p.id);ok(p.id+' return no stale draft',d.doc.getElementById('visitDiagnosis').value===''&&!d.ctx.hasEducationSelection());
  cases.push({module:id,case:p.id+' 검토·검사·치료·교육·모의 인쇄',result:'PASS'});
 }
 // Stable return retains the existing brief pathway.
 const ret=makeEnv(html);ret.ctx.toggleSymptom(id);
 for(const [name,value]of [['experienceType','return'],['returnCourse','호전'],['returnMedicine','불편감 없음'],['returnNew','새 증상 없음']])for(const n of ret.doc.querySelectorAll('input[name="'+name+'"]'))n.checked=n.value===value;
 ret.ctx.startPatientIntake();ret.ctx.switchMode('doctor');ok(id+' brief return preserved',ret.eval('AppState.queue.length')===0);
 input(ret,'cmDays','7');input(ret,'cmNote','가상 기능 변화');ret.ctx.copyEmrText();await Promise.resolve();ok(id+' followup in EMR',ret.clips.at(-1).includes('증상일: 7')&&ret.clips.at(-1).includes('가상 기능 변화'));
 ret.ctx.resetPatientIntake();ok(id+' reset clears clinical memory',ret.ctx.NeuroModuleReview.getState().metrics.note===''&&ret.ctx.NeuroModuleReview.getState().tests.length===0&&ret.doc.getElementById('visitDiagnosis').value==='');
 cases.push({module:id,case:'안정 재진·추적·새 환자 초기화',result:'PASS'});
}
// The same engine composes with existing headache/dizziness conditional navigation.
const mixed=patient(active[0],{},['headache','dizziness',...active]);
ok('mixed full queue unique',new Set(mixed.shown).size===mixed.shown.length);
for(const [v,want]of [['',null],[-1,null],[31,null],[1.5,null],[0,0],[30,30],['bad',null]])ok('count boundary '+v,e.ctx.NeuroModuleReview.count(v)===want);
// Waiting prints must abort even if the clinical checklist is changed and then reapproved.
const pd=doctor(active[0]);pd.doc.getElementById('visitDiagnosis').value='가상 인쇄';pd.doc.getElementById('visitReviewed').checked=true;pd.ctx.refreshVisitPrint();let release;pd.doc.fonts.ready=new Promise(r=>release=r);const pending=pd.ctx.printVisitSheet();const cr=pd.doc.querySelector('[data-cm-criterion]');cr.value='yes';cr.onchange();pd.doc.getElementById('visitReviewed').checked=true;pd.ctx.refreshVisitPrint();release();await pending;ok('clinical change cancels old pending guide',pd.prints===0);pd.doc.fonts.ready=Promise.resolve();await pd.ctx.printVisitSheet();ok('fresh guide works',pd.prints===1);
const legacy=doctor(active[0]);legacy.ctx.switchDocStage('stage5_followup');legacy.doc.getElementById('eduConfirmed').checked=true;legacy.ctx.toggleEducationPrint();let release2;legacy.doc.fonts.ready=new Promise(r=>release2=r);const pending2=legacy.ctx.printEducationSheet();const cr2=legacy.doc.querySelector('[data-cm-criterion]');cr2.value='yes';cr2.onchange();legacy.doc.getElementById('eduConfirmed').checked=true;legacy.ctx.toggleEducationPrint();release2();await pending2;ok('clinical change cancels old pending education',legacy.prints===0);
if(configs.cognition){const cg=doctor('cognition');const n=cg.doc.querySelector('[data-cm-scale="fourat"]');ok('4AT existing permitted link',!!n);n.click();ok('4AT opens existing library',!!cg.doc.getElementById('scaleAnswer0'));}
const engine=await fs.readFile(new URL('../clinical/module-review.js',import.meta.url),'utf8');ok('no automatic requests/patient persistence',!/\bfetch\s*\(|XMLHttpRequest|localStorage|sessionStorage|indexedDB/.test(engine));
for(const id of active)for(const src of Object.values(configs[id].sources))ok('only verified source metadata '+id,src.access&&!/확인했다고 가정/.test(src.access));
const report={modules:active,pathCount:active.reduce((n,id)=>n+configs[id].paths.length,0),clinicalChecks:checks,regressionChecks:regressionSummary.passed,cases,FAIL:0,NOT_TESTED:['actual browser/mobile/accessibility','real PNG decode','OS clipboard permission','A4 visual pagination','Netlify deployment','clinical sign-off','unverified Korean indications/coverage']};
console.log(JSON.stringify(report,null,2));
export const clinicalSummary=report;
