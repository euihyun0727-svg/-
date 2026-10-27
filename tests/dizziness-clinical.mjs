import {preserved} from './clinical-preservation.mjs';
import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import {makeEnv,regressionSummary} from './neurodesk-regression.mjs';
const html=await fs.readFile(new URL('../index.html',import.meta.url),'utf8');
const expected=JSON.parse(await fs.readFile(new URL('./dizziness-preservation.json',import.meta.url),'utf8'));
const hash=v=>crypto.createHash('sha256').update(v).digest('hex');
let checks=0;const cases=[];
function ok(n,v){if(!v)throw Error(n);checks++;}
const e=makeEnv(html),D=e.ctx.NeuroDizzinessData;
function choose(e,id,v){const n=e.doc.getElementById(id);ok(id+' exists',!!n);n.value=v;n.onchange();}
function path(e,id){e.eval('AppState.selectedSubpath.dizziness='+JSON.stringify(id));e.ctx.renderDoctorStage();}
function doctor(){const e=makeEnv(html);e.ctx.toggleSymptom('dizziness');e.ctx.switchMode('doctor');return e;}
function patient(answers={},ids=['dizziness']){
 const e=makeEnv(html);ids.forEach(id=>e.ctx.toggleSymptom(id));e.ctx.startPatientIntake();let guard=0;const shown=[];
 while(e.eval('AppState.queueIndex<AppState.queue.length')){
  if(++guard>160)throw Error('intake loop');
  const item=e.eval('AppState.queue[AppState.queueIndex]'),q=item.question;shown.push(q.id);
  if(item.symptomId==='dizziness')ok('neutral '+q.id,!/BPPV|이석증|메니에르|전정편두통|전정신경염|기립성저혈압|PPPD|의심/.test(e.doc.getElementById('wizardQuestionBlock').textContent));
  const i=answers[q.id]===undefined?q.options.length-1:q.options.findIndex(o=>o.text===answers[q.id]);
  if(i<0)throw Error('unknown test answer '+q.id);
  const old=e.eval('AppState.queueIndex');e.doc.querySelectorAll('#optList button')[i].click();e.flush();if(e.eval('AppState.queueIndex')===old)e.ctx.nextQuestion();
 }
 e.ctx.switchMode('doctor');return {e,shown};
}
ok('12 groups',e.eval('Object.keys(NEURO_DATA).length')===12);
ok('unexpanded clinical data unchanged',preserved(e,'modules',["dizziness"]));
ok('unexpanded education unchanged',preserved(e,'education',["dizziness"]));
for(const [name,h]of Object.entries(expected.files))ok('unchanged '+name,hash(await fs.readFile(new URL('../'+name,import.meta.url)))===h);
ok('unexpanded patient wording unchanged',preserved(e,'copy',["dizziness"]));
ok('8 paths / original3 retained',D.paths.length===8&&['bppv','vestibular_migraine','orthostatic_hypo'].every(id=>D.paths.some(p=>p.id===id)));
for(const source of Object.values(D.sources))ok('source metadata',source.title&&source.date&&source.access&&new URL(source.url).protocol==='https:');
for(const p of D.paths){
 ok(p.id+' criteria source',p.criteria.every(c=>D.sources[c.source]));
 ok(p.id+' tests source',p.tests.every(t=>t.sourceIds.every(id=>D.sources[id])));
 ok(p.id+' therapies source',p.therapies.every(t=>t.sourceIds.every(id=>D.sources[id])));
 ok(p.id+' independent clinical fields',['history','exam','criteria','nonPharmTx','pharmPrinciples','followUpAndSafety','referralCriteria','tests','therapies'].every(k=>Array.isArray(p[k])));
}
for(const m of html.matchAll(/<(?:script|link)\b[^>]*(?:src|href)="([^"]+)"/g))if(!/^(https?:|data:|#)/.test(m[1])){ok('local code asset '+m[1],(await fs.stat(new URL('../'+m[1],import.meta.url))).size>0);}
ok('all symptom PNGs tracked',e.eval('Object.keys(NEURO_DATA)').every(id=>expected.assets.some(a=>a.path===id+'.png')));
for(const img of expected.assets)ok('root PNG tracked '+img.path,img.size>0&&img.sha.length===40);
const p=patient({diz_trigger:'예',diz_position_side:'오른쪽으로 돌아누울 때',diz_chronic:'아니요',diz_medicine:'없음 / 잘 모르겠어요'});
ok('positional branch',p.shown.includes('diz_position_side'));
ok('hidden chronic/med branches',!p.shown.includes('diz_visual')&&!p.shown.includes('diz_dark')&&!p.shown.includes('diz_response'));
ok('no patient side auto-selection',p.e.ctx.NeuroDizziness.getState().side==='unknown');
ok('no unknown Epley',!p.e.doc.querySelector('[data-dz-therapy="epley"]'));
choose(p.e,'dzCanal','posterior');ok('no unknown-side Epley',!p.e.doc.querySelector('[data-dz-therapy="epley"]'));choose(p.e,'dzSide','right');
ok('posterior Epley candidate',!!p.e.doc.querySelector('[data-dz-therapy="epley"]'));
ok('posterior correct nystagmus',p.e.doc.getElementById('dzPlan').textContent.includes('회선-상향'));
ok('no automatic diagnostic criteria',Object.keys(p.e.ctx.NeuroDizziness.getState().criteria).length===0);cases.push({name:'후반고리관 BPPV',result:'PASS'});
const hc=doctor();choose(hc,'dzCanal','horizontal_geo');choose(hc,'dzSide','left');
ok('horizontal geo correct maneuver',!!hc.doc.querySelector('[data-dz-therapy="hcGeoManeuver"]')&&!hc.doc.querySelector('[data-dz-therapy="epley"]'));
choose(hc,'dzCanal','horizontal_apo');ok('horizontal apo independent',!!hc.doc.querySelector('[data-dz-therapy="hcApoManeuver"]')&&!hc.doc.querySelector('[data-dz-therapy="hcGeoManeuver"]'));
ok('apo no automatic cupulolithiasis',hc.doc.getElementById('dzPlan').textContent.includes('단정하지 않음'));
choose(hc,'dzSide','bilateral');ok('complex side requires specialist',hc.doc.querySelectorAll('[data-dz-therapy]').length===0);cases.push({name:'수평 향지성·원지성 BPPV',result:'PASS'});
const vm=patient({diz_pattern:'몇 차례 나타났다가 사이에는 괜찮아요',diz_migraine_features:'예',diz_headache_history:'예'});path(vm.e,'vestibular_migraine');ok('migraine branch',vm.shown.includes('diz_headache_history'));ok('VM5to72 criterion',vm.e.doc.getElementById('dzPlan').textContent.includes('5분~72시간'));ok('VM limited evidence',vm.e.doc.getElementById('dzPlan').textContent.includes('단순 외삽'));choose(vm.e,'dzCertainty','probable');ok('VM classification manual',vm.e.ctx.NeuroDizziness.getState().certainty==='probable');cases.push({name:'전정편두통',result:'PASS'});
const md=patient({diz_ear:'예',diz_ear_side:'왼쪽'});path(md.e,'meniere');ok('ear branch',md.shown.includes('diz_ear_side'));ok('MD hearing candidate',!!md.e.doc.querySelector('[data-dz-test="audiogram"]'));ok('unnecessary EcoG not selectable',!md.e.doc.querySelector('[data-dz-test="avoidEcoG"]'));ok('MD no VM treatment',!md.e.doc.querySelector('[data-dz-therapy="vmCgrp"]'));cases.push({name:'메니에르병',result:'PASS'});
const av=patient({diz_pattern:'갑자기 시작해 쉬고 있어도 계속돼요',diz_duration:'하루 이상'});path(av.e,'auvp');ok('AVS route',av.e.doc.getElementById('docSubpathContent').textContent.includes('≥24시간'));ok('steroid very low',av.e.doc.getElementById('dzPlan').textContent.includes('매우 낮은'));
let combinations=0;for(const avs of ['','yes','no'])for(const nystagmus of ['','yes','no'])for(const trained of ['','yes','no']){ok('HINTS applicability '+(++combinations),av.e.ctx.NeuroDizziness.hints({avs,nystagmus,trained}).status===(avs==='yes'&&nystagmus==='yes'&&trained==='yes'?'review':'notEligible'));}
choose(av.e,'dzAvs','yes');choose(av.e,'dzNystagmus','yes');choose(av.e,'dzTrained','yes');ok('HINTS never rules out stroke',av.e.doc.getElementById('dzHintsResult').textContent.includes('배제하지 않습니다'));
choose(av.e,'dzNystagmus','no');ok('no-nystagmus restriction',av.e.doc.getElementById('dzHintsResult').textContent.includes('미충족'));cases.push({name:'급성 일측 전정병증·HINTS 적용 조건',result:'PASS'});
const pp=patient({diz_chronic:'예',diz_visual:'예'});path(pp.e,'pppd');ok('chronic branches',pp.shown.includes('diz_visual')&&pp.shown.includes('diz_dark'));ok('PPPD no normal-test diagnosis',pp.e.doc.getElementById('docTestCandidatesList').textContent.includes('정상 영상/전정검사만으로 확정하지 않음'));ok('PPPD evidence distinction',pp.e.doc.getElementById('dzPlan').textContent.includes('2023')&&pp.e.doc.getElementById('dzPlan').textContent.includes('2025'));cases.push({name:'PPPD',result:'PASS'});
path(pp.e,'bilateral_vestibulopathy');ok('bilateral criteria',pp.e.doc.getElementById('dzPlan').innerHTML.includes('&lt;0.6'));ok('bilateral rehab candidate',!!pp.e.doc.querySelector('[data-dz-therapy="rehab"]'));ok('no BPPV maneuver inherited',!pp.e.doc.querySelector('[data-dz-therapy="epley"]'));cases.push({name:'양측 전정병증',result:'PASS'});
const oh=patient({diz_standing:'예',diz_standing_context:'약을 바꾼 뒤'});path(oh.e,'orthostatic_hypo');ok('standing branch',oh.shown.includes('diz_standing_context'));
const calc=oh.e.ctx.NeuroDizziness.bp,base={supineS:140,supineD:80,standingS:120,standingD:75,minutes:3,protocol:'confirmed'};
ok('SBP20 threshold',calc(base).status==='review');ok('SBP19 below',calc({...base,standingS:121}).status==='below');
ok('DBP10 threshold',calc({...base,standingS:135,standingD:70}).status==='review');ok('DBP9 below',calc({...base,standingS:135,standingD:71}).status==='below');
ok('missing BP not zero',calc({...base,supineS:''}).status==='incomplete');ok('NaN invalid',calc({...base,supineS:'bad'}).status==='incomplete');ok('infinity invalid',calc({...base,supineS:Infinity}).status==='incomplete');
ok('BP inverted invalid',calc({...base,standingS:65}).status==='invalid');ok('negative invalid',calc({...base,standingD:-1}).status==='invalid');ok('protocol unknown',calc({...base,protocol:''}).status==='protocol');ok('delayed not excluded',calc({...base,minutes:4}).status==='protocol');ok('0min invalid',calc({...base,minutes:0}).status==='invalid');
for(const [id,v]of [['dzSupineS','140'],['dzSupineD','80'],['dzStandingS','120'],['dzStandingD','75'],['dzMinutes','3']]){const n=oh.e.doc.getElementById(id);n.value=v;n.oninput();}choose(oh.e,'dzBPProtocol','confirmed');ok('BP UI delta',oh.e.doc.getElementById('dzBPResult').textContent.includes('수축기 감소 20'));cases.push({name:'기립성저혈압·실측 계산',result:'PASS'});
const emerg=makeEnv(html);emerg.ctx.toggleSymptom('dizziness');emerg.ctx.startPatientIntake();emerg.ctx.skipQuestion();emerg.doc.querySelector('#optList button').click();emerg.flush();ok('emergency no auto-advance',emerg.eval('AppState.queueIndex')===1);ok('emergency warning',!!emerg.doc.getElementById('questionEmergencyNotice'));emerg.ctx.switchMode('doctor');path(emerg,'central_dizziness_eval');ok('central emergency banner',emerg.doc.getElementById('docRedFlagsArea').textContent.includes('즉시 의료진 평가'));ok('central no treatment auto',emerg.doc.querySelectorAll('[data-dz-therapy]').length===0);cases.push({name:'중추성 위험신호·전원 우선',result:'PASS'});
const hear=patient({diz_hearing:'예'});ok('new hearing banner',hear.e.doc.getElementById('docRedFlagsArea').textContent.includes('급성 난청'));cases.push({name:'급성 난청 동반 어지럼',result:'PASS'});
const ret=makeEnv(html);ret.ctx.toggleSymptom('dizziness');for(const [name,value]of [['experienceType','return'],['returnCourse','호전'],['returnMedicine','불편감 없음'],['returnNew','새 증상 없음']])for(const n of ret.doc.querySelectorAll('input[name="'+name+'"]'))n.checked=n.value===value;
ret.ctx.startPatientIntake();ret.ctx.switchMode('doctor');ok('stable brief return retained',ret.eval('AppState.queue.length')===0);
for(const [v,result]of [['',null],[-1,null],[31,null],[1.5,null],[0,0],[30,30]])ok('metric boundary '+v,ret.ctx.NeuroDizziness.metric(v)===result);
ret.doc.getElementById('dzDays').value='8';ret.doc.getElementById('dzDays').oninput();ret.doc.getElementById('dzMetricNote').value='가상 검증: 보행 호전';ret.doc.getElementById('dzMetricNote').oninput();ret.ctx.copyEmrText();await Promise.resolve();ok('follow-up EMR',ret.clips.at(-1).includes('어지럼일: 8')&&ret.clips.at(-1).includes('가상 검증'));cases.push({name:'안정 재진·추적 지표',result:'PASS'});
// Invalidated child answers, including unknown/skip, must disappear in doctor and EMR.
const hidden=doctor();hidden.eval("AppState.answers={diz_trigger:'아니요',diz_position_side:'오른쪽으로 돌아누울 때',diz_chronic:'잘 모르겠어요',diz_visual:'예',diz_medicine:'건너뜀',diz_response:'좋아졌어요'}");hidden.ctx.renderDoctorStage();ok('hidden answers pruned',hidden.eval("!AppState.answers.diz_position_side&&!AppState.answers.diz_visual&&!AppState.answers.diz_response"));hidden.ctx.copyEmrText();await Promise.resolve();ok('EMR no hidden question',!hidden.clips.at(-1).includes('어떤 움직임에서 더 잘 생기나요?'));
// Mixed module queues preserve both headache and dizziness conditional navigation.
const mixed=patient({ha_aura:'아니요',ha_med_freq:'0일',ha_prevent:'아니요',diz_trigger:'아니요',diz_chronic:'아니요',diz_medicine:'없음 / 잘 모르겠어요'},['headache','dizziness','sleep']);
ok('mixed questions unique',new Set(mixed.shown).size===mixed.shown.length);
mixed.e.eval("AppState.queueIndex=AppState.queue.findIndex(i=>i.question.id==='diz_onset')");mixed.e.ctx.renderQuestion();mixed.e.ctx.prevQuestion();ok('previous crosses hidden headache child',mixed.e.eval('AppState.queue[AppState.queueIndex].question.id')==='ha_prevent');
mixed.e.eval("AppState.queueIndex=AppState.queue.findIndex(i=>i.symptomId==='sleep')");mixed.e.ctx.renderQuestion();mixed.e.ctx.prevQuestion();ok('previous crosses hidden dizziness child',mixed.e.eval('AppState.queue[AppState.queueIndex].question.id')==='diz_medicine');
const reverse=patient({diz_medicine:'없음 / 잘 모르겠어요'},['dizziness','headache']);reverse.e.eval("AppState.queueIndex=AppState.queue.findIndex(i=>i.symptomId==='headache')");reverse.e.ctx.renderQuestion();reverse.e.ctx.prevQuestion();ok('reverse mixed boundary',reverse.e.eval('AppState.queue[AppState.queueIndex].question.id')==='diz_medicine');
// Explicit selection -> draft/EMR/selected-education mock A4.
const s=p.e,tx=s.doc.querySelector('[data-dz-therapy="epley"]'),test=s.doc.querySelector('[data-dz-test="positional"]');tx.checked=true;tx.onchange();test.checked=true;test.onchange();const check=s.doc.querySelector('[data-dz-criterion="pcNystagmus"]');check.value='yes';check.onchange();s.doc.getElementById('dzApply').click();ok('manual draft test',s.doc.getElementById('visitTests').value.includes('체위'));ok('manual draft tx',s.doc.getElementById('visitCare').value.includes('Epley'));s.ctx.copyEmrText();await Promise.resolve();ok('manual criterion in EMR',s.clips.at(-1).includes('의사 확인'));
s.ctx.switchDocStage('stage5_followup');s.doc.querySelector('[data-education]').checked=true;s.ctx.changeEducationChoice();s.doc.getElementById('visitReviewed').checked=true;s.ctx.refreshVisitPrint();await s.ctx.printVisitSheet();ok('A4 mock print',s.prints===1);ok('selected education printed',s.doc.getElementById('visitPrintSheet').innerHTML.includes('귀의 균형기관'));
choose(s,'dzCanal','horizontal_geo');ok('subtype clears selections/draft/education',s.ctx.NeuroDizziness.getState().tests.length===0&&s.ctx.NeuroDizziness.getState().therapies.length===0&&s.doc.getElementById('visitCare').value===''&&!s.ctx.hasEducationSelection());ok('subtype invalidates print',!s.doc.getElementById('visitReviewed').checked&&s.doc.getElementById('visitPrintSheet').innerHTML==='');
path(s,'meniere');ok('disease clears clinical memory',Object.keys(s.ctx.NeuroDizziness.getState().criteria).length===0&&s.ctx.NeuroDizziness.getState().canal==='unknown');ok('meniere no prior mechanism',!s.doc.getElementById('docMechanismArea').textContent.includes('정복술'));path(s,'bppv');ok('return path draft/education empty',s.doc.getElementById('visitCare').value===''&&!s.ctx.hasEducationSelection());
s.eval("AppState.selectedSymptoms=['dizziness','headache'];AppState.activeDoctorSymptom='headache'");s.ctx.renderDoctorStage();ok('headache not overwritten',!!s.doc.getElementById('haPlan')&&!s.doc.getElementById('dzPlan'));
s.eval("AppState.activeDoctorSymptom='dizziness'");s.ctx.renderDoctorStage();ok('return symptom no stale draft',s.doc.getElementById('visitCare').value==='');
for(const a of s.doc.querySelectorAll('.dz-sources a'))ok('safe official source anchor',a.getAttribute('target')==='_blank'&&a.getAttribute('rel').includes('noopener')&&new URL(a.getAttribute('href')).protocol==='https:');
s.ctx.resetPatientIntake();ok('new patient clears dizziness memory',s.ctx.NeuroDizziness.getState().canal==='unknown'&&Object.keys(s.ctx.NeuroDizziness.getState().metrics).length===0&&Object.keys(s.ctx.NeuroDizziness.getState().bp).length===0);ok('new patient no stale draft',s.doc.getElementById('visitCare').value==='');
const pendingEnv=doctor();pendingEnv.doc.getElementById('visitDiagnosis').value='가상 안내';pendingEnv.doc.getElementById('visitReviewed').checked=true;pendingEnv.ctx.refreshVisitPrint();let release;pendingEnv.doc.fonts.ready=new Promise(r=>release=r);const pending=pendingEnv.ctx.printVisitSheet();pendingEnv.doc.querySelector('[data-dz-criterion=\"positional\"]').value='yes';pendingEnv.doc.querySelector('[data-dz-criterion=\"positional\"]').onchange();pendingEnv.doc.getElementById('visitReviewed').checked=true;pendingEnv.ctx.refreshVisitPrint();release();await pending;ok('clinical change aborts pending A4 despite reapproval',pendingEnv.prints===0);pendingEnv.doc.fonts.ready=Promise.resolve();await pendingEnv.ctx.printVisitSheet();ok('fresh A4 after clinical change works',pendingEnv.prints===1);

const legacy=doctor();legacy.ctx.switchDocStage('stage5_followup');legacy.doc.getElementById('eduConfirmed').checked=true;legacy.ctx.toggleEducationPrint();let releaseLegacy;legacy.doc.fonts.ready=new Promise(r=>releaseLegacy=r);const legacyPending=legacy.ctx.printEducationSheet();legacy.doc.querySelector('[data-dz-criterion="positional"]').value='yes';legacy.doc.querySelector('[data-dz-criterion="positional"]').onchange();legacy.doc.getElementById('eduConfirmed').checked=true;legacy.ctx.toggleEducationPrint();releaseLegacy();await legacyPending;ok('legacy clinical change aborts pending print',legacy.prints===0);legacy.doc.fonts.ready=Promise.resolve();await legacy.ctx.printEducationSheet();ok('legacy fresh print succeeds',legacy.prints===1);
const vmemr=doctor();path(vmemr,'vestibular_migraine');choose(vmemr,'dzCertainty','probable');vmemr.doc.getElementById('dzApply').click();ok('classification in draft',vmemr.doc.getElementById('visitDiagnosis').value.includes('가능성 높은'));vmemr.ctx.copyEmrText();await Promise.resolve();ok('classification in EMR',vmemr.clips.at(-1).includes('가능성 높은'));

const art=doctor();for(const id of ['vestibular_migraine','pppd','orthostatic_hypo','central_dizziness_eval']){path(art,id);ok('unmatched ear PNG hidden '+id,art.doc.getElementById('clinicEducationArt').hidden&&!art.doc.querySelector('#clinicEducationArt img'));ok('path SVG retained '+id,!!art.doc.querySelector('#docMechanismArea svg'));}for(const id of ['bppv','meniere','auvp','bilateral_vestibulopathy']){path(art,id);ok('appropriate ear structure reference '+id,!art.doc.getElementById('clinicEducationArt').hidden&&art.doc.querySelector('#clinicEducationArt img').getAttribute('src')==='dizziness.png');}
const script=await fs.readFile(new URL('../clinical/dizziness.js',import.meta.url),'utf8');ok('no networking or patient persistence',!/\bfetch\s*\(|XMLHttpRequest|localStorage|sessionStorage|indexedDB/.test(script));
console.log(JSON.stringify({dizzinessChecks:checks,hintsCombinations:combinations,cases,regressionChecks:regressionSummary.passed,FAIL:0,NOT_TESTED:['real browser/mobile/accessibility','real PNG decode','OS clipboard permission','A4 visual pagination','source link click navigation','Netlify deployment','clinical sign-off','Korean approvals/coverage']},null,2));
export const dizzinessSummary={passed:checks,cases};
