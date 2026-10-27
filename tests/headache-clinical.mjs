import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import {makeEnv} from './neurodesk-regression.mjs';
const html=await fs.readFile(new URL('../index.html',import.meta.url),'utf8');
const baseline=JSON.parse(await fs.readFile(new URL('./headache-preservation.json',import.meta.url),'utf8'));
let checks=0;const cases=[];
function ok(n,v){if(!v)throw Error(n);checks++;}
const hash=v=>crypto.createHash('sha256').update(v).digest('hex');
const e=makeEnv(html),D=e.ctx.NeuroHeadacheData;
const set=(e,id,v)=>{const n=e.doc.getElementById(id);n.value=v;n.onchange();};
const path=(e,id)=>{e.eval('AppState.selectedSubpath.headache='+JSON.stringify(id));e.ctx.renderDoctorStage();};
function patient(answers={}){
 const e=makeEnv(html);e.ctx.toggleSymptom('headache');e.ctx.startPatientIntake();let guard=0,shown=[];
 while(e.eval('AppState.queueIndex<AppState.queue.length')){
  if(++guard>70)throw Error('intake loop');const q=e.eval('AppState.queue[AppState.queueIndex].question');shown.push(q.id);
  ok('neutral '+q.id,!/편두통|약물과용|군발두통|삼차신경통/.test(e.doc.getElementById('wizardQuestionBlock').textContent));
  const i=answers[q.id]===undefined?q.options.length-1:q.options.findIndex(o=>o.text===answers[q.id]);
  if(i<0)throw Error('test answer '+q.id);
  const old=e.eval('AppState.queueIndex');e.doc.querySelectorAll('#optList button')[i].click();e.flush();if(e.eval('AppState.queueIndex')===old)e.ctx.nextQuestion();
 }
 e.ctx.switchMode('doctor');return {e,shown};
}
ok('12 symptoms',e.eval('Object.keys(NEURO_DATA).length')===12);
ok('other11 unchanged',hash(e.eval("JSON.stringify(Object.fromEntries(Object.entries(NEURO_DATA).filter(([id])=>id!=='headache'&&(!window.NeuroDizziness||id!=='dizziness'))))"))===(e.ctx.NeuroDizziness?baseline.otherSymptomsExceptDizziness:baseline.otherSymptoms));
ok('other education unchanged',hash(e.eval("JSON.stringify(Object.fromEntries(Object.entries(EDUCATION_V2).filter(([id])=>!['migraine','tension','moh','cluster','headache_trigeminal_neuralgia','secondary_headache_eval'].includes(id)&&(!window.NeuroDizziness||!window.NeuroDizzinessData.paths.some(p=>p.id===id)))))"))===(e.ctx.NeuroDizziness?baseline.otherEducationExceptDizziness:baseline.otherEducation));
for(const [p,h] of Object.entries(baseline.scales))ok(p+' unchanged',hash(await fs.readFile(new URL('../'+p,import.meta.url)))===h);
ok('six paths original3 preserved',D.paths.map(p=>p.id).join(',')==='migraine,tension,moh,cluster,headache_trigeminal_neuralgia,secondary_headache_eval');
for(const s of Object.values(D.sources))ok('source fields',s.title&&s.date&&new URL(s.url).protocol==='https:');
for(const p of D.paths){ok('criteria refs '+p.id,D.criteria[p.id].every(c=>D.sources[c[2]]));ok('path refs '+p.id,p.source.every(s=>D.sources[s]));}
for(const d of D.drugs)ok('drug refs '+d.id,d.sources.every(s=>D.sources[s]));
const a=patient({ha_freq:'4~7일',ha_aura:'아니요',ha_med_freq:'0일',ha_prevent:'아니요'});
ok('conditional exclusion',!a.shown.includes('ha_aura_course')&&!a.shown.includes('ha_med_type')&&!a.shown.includes('ha_prevent_change'));
set(a.e,'haAura','without');set(a.e,'haFrequency','episodic');
ok('episodic facets',a.e.ctx.NeuroHeadache.getState().frequency==='episodic'&&a.e.ctx.NeuroHeadache.getState().aura==='without');
ok('no toxin episodic',!a.e.doc.querySelector('[data-ha-drug="botox"]'));ok('no autodiagnosis',Object.keys(a.e.ctx.NeuroHeadache.getState().criteria).length===0);cases.push({case:'삽화편두통',status:'PASS'});
const b=patient({ha_freq:'15~31일'});set(b.e,'haFrequency','chronic');
ok('chronic toxin',!!b.e.doc.querySelector('[data-ha-drug="botox"]'));ok('chronic8day criterion',b.e.doc.getElementById('haPlan').textContent.includes('≥8일'));cases.push({case:'만성편두통',status:'PASS'});
const c=patient({ha_aura:'예',ha_aura_course:'예'});ok('aura branch',c.shown.includes('ha_aura_course'));set(c.e,'haAura','with');set(c.e,'haFrequency','episodic');ok('aura independent',c.e.ctx.NeuroHeadache.getState().aura==='with');cases.push({case:'전조편두통',status:'PASS'});
const m=patient({ha_med_freq:'10~14일',ha_med_type:'처방받은 두통 발작약',ha_med_months:'예'});ok('drug branch',m.shown.includes('ha_med_type'));path(m.e,'moh');const calc=m.e.ctx.NeuroHeadache.overuse;
for(const [kind,t] of [['simple',15],['triptan',10],['combination',10],['opioid',10]]){
 ok(kind+' threshold',calc({kind,headacheDays:15,days:t,months:4}).status==='review');
 ok(kind+' below',calc({kind,headacheDays:15,days:t-1,months:4}).status==='below');
}
ok('duration>3',calc({kind:'triptan',headacheDays:15,days:10,months:3}).status==='below');
ok('headache>=15',calc({kind:'triptan',headacheDays:14,days:10,months:4}).status==='below');
ok('missing',calc({kind:'triptan',headacheDays:15,days:'',months:4}).status==='incomplete');
ok('fraction rejected',calc({kind:'triptan',headacheDays:15,days:10.5,months:4}).status==='invalid');
ok('mixed union required',calc({kind:'multiple',headacheDays:15,days:10,months:4}).status==='incomplete');
ok('mixed confirmed',calc({kind:'multiple',headacheDays:15,days:10,months:4,union:'yes'}).status==='review');
ok('31 days',calc({kind:'simple',headacheDays:31,days:31,months:4}).status==='review');
ok('32 invalid',calc({kind:'simple',headacheDays:32,days:31,months:4}).status==='incomplete');
for(const [id,v] of [['haOH','20'],['haOD','12'],['haOM','4']]){const n=m.e.doc.getElementById(id);n.value=v;n.oninput();}
set(m.e,'haOK','triptan');ok('calculator UI',m.e.doc.getElementById('haOveruseResult').textContent.includes('기준 해당'));cases.push({case:'약물과용두통',status:'PASS'});
const cl=patient({ha_autonomic:'예'});path(cl.e,'cluster');ok('cluster criteria',cl.e.doc.getElementById('haPlan').textContent.includes('15~180분'));
ok('cluster ECG',cl.e.doc.getElementById('docTestCandidatesList').textContent.includes('심전도'));ok('no migraine drug',!cl.e.doc.querySelector('[data-ha-drug="topiramate"]'));cases.push({case:'군발두통',status:'PASS'});
const th=makeEnv(html);th.ctx.toggleSymptom('headache');th.ctx.startPatientIntake();th.ctx.skipQuestion();th.doc.querySelector('#optList button').click();th.flush();ok('thunder stops',th.eval('AppState.queueIndex')===1);ok('emergency warning',!!th.doc.getElementById('questionEmergencyNotice'));th.ctx.switchMode('doctor');ok('urgent banner',th.doc.getElementById('docRedFlagsArea').textContent.includes('즉시 의료진 평가'));path(th,'secondary_headache_eval');ok('secondary no drug',th.doc.querySelectorAll('[data-ha-drug]').length===0);cases.push({case:'벼락두통',status:'PASS'});
const ret=makeEnv(html);ret.ctx.toggleSymptom('headache');for(const [name,value] of [['experienceType','return'],['returnCourse','호전'],['returnMedicine','불편감 없음'],['returnNew','새 증상 없음']])for(const n of ret.doc.querySelectorAll('input[name="'+name+'"]'))n.checked=n.value===value;
ret.ctx.startPatientIntake();ret.ctx.switchMode('doctor');ok('brief return',ret.eval('AppState.queue.length')===0);
ret.doc.getElementById('haBaseline').value='8';ret.doc.getElementById('haCurrent').value='4';ret.doc.getElementById('haCurrent').oninput();ok('response50%',ret.doc.getElementById('haResponse').textContent.includes('50.0%'));ok('zero',ret.ctx.NeuroHeadache.response({baseline:0,current:0}).includes('계산 불가'));ok('response fractional rejected',ret.ctx.NeuroHeadache.response({baseline:4.5,current:2}).includes('계산 불가'));ok('worse negative',ret.ctx.NeuroHeadache.response({baseline:4,current:8}).includes('-100.0%'));cases.push({case:'예방약 복용 중 재진',status:'PASS'});
const old=patient({ha_age_new:'예',ha_onset:'며칠 이내 새로 시작'});ok('elderly new priority',old.e.ctx.NeuroHeadache.priority().review.includes('ha_age_new'));cases.push({case:'고령자의 새 두통',status:'PASS'});
const tn=patient({ha_features:'전기가 오듯 찌르거나 쏘는 느낌',ha_touch:'예'});ok('touch branch',tn.shown.includes('ha_touch'));path(tn.e,'headache_trigeminal_neuralgia');ok('TN drug',!!tn.e.doc.querySelector('[data-ha-drug="tndrug"]'));ok('canonical preserved',tn.e.eval("NEURO_DATA.other.differentialPathways.some(p=>p.id==='trigeminal_neuralgia')"));
const hidden=makeEnv(html);hidden.eval("AppState.answers={ha_aura:'아니요',ha_aura_course:'예'}");hidden.ctx.renderQuestion();ok('stale conditional answer removed',hidden.eval("!('ha_aura_course' in AppState.answers)"));
const prev=a.e;prev.eval("AppState.queueIndex=AppState.queue.findIndex(i=>i.question.id==='ha_med_freq')");prev.ctx.renderQuestion();prev.ctx.prevQuestion();ok('previous skips hidden touch',prev.eval("AppState.queue[AppState.queueIndex].question.id")==='ha_autonomic');
const s=a.e;const t=s.doc.querySelector('[data-ha-test="0"]');t.checked=true;t.onchange();const d=s.doc.querySelector('[data-ha-drug="simple"]');d.checked=true;d.onchange();s.doc.getElementById('haApplyPlan').click();
ok('test draft',s.doc.getElementById('visitTests').value.includes('신경학적'));ok('drug draft',s.doc.getElementById('visitCare').value.includes('NSAID'));
s.doc.querySelector('[data-ha-check="attack"]').value='yes';s.doc.querySelector('[data-ha-check="attack"]').onchange();s.ctx.copyEmrText();await Promise.resolve();ok('EMR manual criteria',s.clips.at(-1).includes('담당의 확인'));
s.ctx.switchDocStage('stage5_followup');s.doc.querySelector('[data-education]').checked=true;s.ctx.changeEducationChoice();s.doc.getElementById('visitReviewed').checked=true;s.ctx.refreshVisitPrint();await s.ctx.printVisitSheet();ok('A4 mock print',s.prints===1);ok('selected education in print',s.doc.getElementById('visitPrintSheet').innerHTML.includes('편두통은 뇌'));
path(s,'cluster');ok('switch clears memory',s.ctx.NeuroHeadache.getState().tests.length===0&&s.ctx.NeuroHeadache.getState().treatments.length===0&&Object.keys(s.ctx.NeuroHeadache.getState().criteria).length===0);
ok('switch clears draft and education',s.doc.getElementById('visitTests').value===''&&s.doc.getElementById('visitCare').value===''&&!s.ctx.hasEducationSelection()&&!s.doc.getElementById('visitReviewed').checked&&s.doc.getElementById('visitPrintSheet').innerHTML==='');
ok('no old mechanism',!s.doc.getElementById('docMechanismArea').textContent.includes('CGRP'));path(s,'migraine');ok('return old path cleared',s.doc.getElementById('visitTests').value===''&&!s.ctx.hasEducationSelection());
set(s,'haFrequency','chronic');s.doc.getElementById('visitCare').value='stale';s.doc.getElementById('visitCare').dispatch('input');set(s,'haFrequency','episodic');ok('facet clears old draft',s.doc.getElementById('visitCare').value===''&&!s.doc.querySelector('[data-ha-drug="botox"]'));
s.ctx.resetPatientIntake();ok('reset clinical state',s.ctx.NeuroHeadache.getState().aura==='unknown'&&Object.keys(s.ctx.NeuroHeadache.getState().metrics).length===0);
ok('no network/storage',!/\bfetch\s*\(|XMLHttpRequest|localStorage|sessionStorage|indexedDB/.test(await fs.readFile(new URL('../clinical/headache.js',import.meta.url),'utf8')));
console.log(JSON.stringify({headacheChecks:checks,cases,FAIL:0,NOT_TESTED:['real browser/layout','PNG decoding','clipboard permissions','A4 visual layout','Netlify deployment','clinical sign-off','2026 Korean coverage criteria']},null,2));
