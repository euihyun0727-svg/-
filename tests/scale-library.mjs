import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { makeEnv } from './neurodesk-regression.mjs';
const html=await fs.readFile(new URL('../index.html',import.meta.url),'utf8');
const catalogJS=await fs.readFile(new URL('../scales/catalog.js',import.meta.url),'utf8');
const libraryJS=await fs.readFile(new URL('../scales/library.js',import.meta.url),'utf8');
const css=await fs.readFile(new URL('../scales/library.css',import.meta.url),'utf8');
const context={window:{}};vm.runInNewContext(catalogJS,context);
const forms=context.window.NEURO_SCALE_FORMS;
const env=makeEnv(html),api=env.ctx.NeuroScaleLibrary,scales=api.catalog.scales;
const expected=['phq9','phq2','gad7','gad2','phq4','phq8','fourat'];
let passed=0;
function check(name,condition){assert.ok(condition,name);passed++;}
function answer(id,indices){
 api.open(id);
 indices.forEach((v,i)=>{const el=env.doc.getElementById('scaleAnswer'+i);el.value=v===null?'':String(v);el.onchange();});
}
check('only seven enabled tools',JSON.stringify(scales.map(s=>s.id))===JSON.stringify(expected));
check('only enabled forms are shipped',JSON.stringify(Object.keys(forms).sort())===JSON.stringify([...expected].sort()));
check('catalog does not ship excluded metadata',!catalogJS.includes('"id": "mmse"')&&!catalogJS.includes('"id": "hit6"')&&!catalogJS.includes('"id": "dhi"'));
check('no unused legacy scale records',(html.match(/        scales: \[\],/g)||[]).length===12);
check('A only',scales.every(s=>s.grade==='A'&&s.rightsVerified===true&&s.electronicLanguage==='ko'));
check('no excluded grade controls',!libraryJS.includes('별도 허가 필요')&&!libraryJS.includes('전체 등급'));
check('paper PHQ9 only by user report',api.getPaperStatus('phq9')==='보유'&&scales.filter(s=>s.id!=='phq9').every(s=>api.getPaperStatus(s.id)==='미보유'));
check('local scale references remain valid',html.includes('href="scales/library.css"')&&html.includes('src="scales/catalog.js"')&&html.includes('src="scales/library.js"')&&css.length>0);
check('external API absent',!/(?:fetch|XMLHttpRequest|WebSocket|sendBeacon)\s*\(/.test(libraryJS+catalogJS));
check('patient answers not serialized',!libraryJS.includes('JSON.stringify(AppState')&&(libraryJS.match(/localStorage.setItem/g)||[]).length===1);
check('source URLs HTTPS',Object.values(api.catalog.sources).every(s=>s.url.startsWith('https://')));
check('manual derivation approved reference included',api.catalog.sources.phqManual.note.includes('PHQ-2/8'));
check('PHQ2 exact first two translated PHQ9 items',JSON.stringify(forms.phq2.questions)===JSON.stringify(forms.phq9.questions.slice(0,2)));
check('GAD2 exact first two translated GAD7 items',JSON.stringify(forms.gad2.questions)===JSON.stringify(forms.gad7.questions.slice(0,2)));
check('PHQ8 exact translated PHQ9 minus item9',JSON.stringify(forms.phq8.questions)===JSON.stringify(forms.phq9.questions.slice(0,8)));
check('PHQ8 explicitly excludes self-harm assessment',forms.phq8.derivation.includes('자해·자살 생각'));
check('translation attribution',expected.filter(id=>id!=='fourat').every(id=>forms[id].attribution.includes('Jin-Woo Chung and Ji-Woon Park')));
check('PHQ4 uses source anxiety-first order',forms.phq4.subscales.anxiety.join(',')==='0,1'&&forms.phq4.subscales.depression.join(',')==='2,3');
for(const id of expected){
 const s=scales.find(s=>s.id===id),form=forms[id],n=form.questions.length;
 check(id+' gate allowed',api.canUseElectronic(id));
 check(id+' metadata complete',['name','purpose','method','items','duration','scoreRange','korean','license','electronic','internalUse','insurance','paper'].every(k=>typeof s[k]==='string'&&s[k].length>0));
 check(id+' version matches',s.electronicVersion===form.version&&form.language==='ko');
 check(id+' all questions have options',n>0&&form.questions.every(q=>q.label&&Array.isArray(q.instructions)&&q.options.length>=2&&q.options.every(o=>Number.isFinite(o.score)&&o.text)));
 for(const invalid of [undefined,null,{},[],new Array(n),Array(n).fill(null),Array(n).fill('0'),Array(n).fill(NaN),Array(n).fill(-1),Array(n).fill(99),Array(n+1).fill(0)]){
  check(id+' rejects incomplete or invalid '+String(invalid),!api.calculateElectronic(id,invalid).valid);
 }
 const zeros=Array(n).fill(0),maxima=form.questions.map(q=>q.options.length-1);
 check(id+' zero',api.calculateElectronic(id,zeros).valid&&api.calculateElectronic(id,zeros).score===0);
 check(id+' max',api.calculateElectronic(id,maxima).valid&&api.calculateElectronic(id,maxima).score===form.max);
 for(let i=0;i<n;i++)for(let j=0;j<form.questions[i].options.length;j++){
  const input=Array(n).fill(0);input[i]=j;
  const result=api.calculateElectronic(id,input);
  check(id+' item '+i+' option '+j,result.valid&&result.score===form.questions[i].options[j].score);
 }
 const partial=Array(n).fill(0);partial[n-1]=null;
 check(id+' no partial total',api.calculateElectronic(id,partial).score===undefined);
 for(const v of ['',-1,s.manual.max+1,'1.5','Infinity','NaN','1e2']){
  check(id+' bad manual '+v,!api.validateManual(id,v).valid);
 }
 check(id+' manual lower',api.validateManual(id,'0').valid);
 check(id+' manual upper',api.validateManual(id,String(s.manual.max)).valid);
}
for(const id of ['mmse','hit6','dhi','moca','mdsupdrs','missing']){
 check(id+' denied',!api.canUseElectronic(id)&&!api.calculateElectronic(id,[0]).valid&&!api.validateManual(id,'0').valid);
}
const phqCases=[[0,'None-minimal'],[4,'None-minimal'],[5,'Mild'],[9,'Mild'],[10,'Moderate'],[14,'Moderate'],[15,'Moderately Severe'],[19,'Moderately Severe'],[20,'Severe'],[27,'Severe']];
for(const [score,label] of phqCases)check('PHQ9 boundary '+score,api.validateManual('phq9',score).message.endsWith(label));
for(const [score,label] of [[0,'Minimal'],[4,'Minimal'],[5,'Mild'],[9,'Mild'],[10,'Moderate'],[14,'Moderate'],[15,'Severe'],[21,'Severe']])check('GAD7 boundary '+score,api.validateManual('gad7',score).message.endsWith(label));
for(const id of ['phq2','gad2']){
 check(id+' below 3',api.validateManual(id,2).message.includes('기준(≥3) 미만'));
 check(id+' at 3',api.validateManual(id,3).message.includes('기준(≥3)에 해당'));
}
for(const id of ['phq9','phq8','gad7','phq2','gad2','phq4']){
 const n=forms[id].questions.length;
 for(let total=0;total<=forms[id].max;total++){
  let remaining=total;const input=Array.from({length:n},()=>{const v=Math.min(3,remaining);remaining-=v;return v;});
  const result=api.calculateElectronic(id,input);check(id+' total '+total,result.valid&&result.score===total);
 }
}
let combinations=0;
for(let a=0;a<3;a++)for(let b=0;b<3;b++)for(let c=0;c<3;c++)for(let d=0;d<2;d++){
 const expectedScore=[0,0,4][a]+[0,1,2][b]+[0,1,2][c]+[0,4][d],result=api.calculateElectronic('fourat',[a,b,c,d]);combinations++;
 check('4AT combination '+[a,b,c,d],result.valid&&result.score===expectedScore);
}
for(const [answers,anxiety,depression] of [[[3,0,0,0],3,0],[[0,0,1,2],0,3],[[3,3,3,3],6,6],[[0,0,0,0],0,0]]){
 const r=api.calculateElectronic('phq4',answers);check('PHQ4 distinct subscales '+answers,r.subscores.anxiety===anxiety&&r.subscores.depression===depression);
}
const partial9=Array(9).fill(null);partial9[8]=1;
check('PHQ9 positive item9 warns before total',!api.calculateElectronic('phq9',partial9).valid&&api.calculateElectronic('phq9',partial9).requiresSafetyReview);
check('PHQ9 item9 zero no positive marker',!api.calculateElectronic('phq9',Array(9).fill(0)).requiresSafetyReview);
check('PHQ9 low total still safety marker',api.calculateElectronic('phq9',[0,0,0,0,0,0,0,0,1]).score===1&&api.calculateElectronic('phq9',[0,0,0,0,0,0,0,0,1]).requiresSafetyReview);
check('PHQ8 no implied item9 assessment',!api.calculateElectronic('phq8',Array(8).fill(3)).requiresSafetyReview);
env.ctx.switchMode('doctor');env.ctx.switchDocStage('stage4_scales');
check('browse without symptoms',env.doc.getElementById('scaleCount').textContent.includes('7 / 7'));
check('does not invent patient symptom',env.eval('AppState.selectedSymptoms.length')===0);
for(const id of expected){
 api.open(id);
 check(id+' all actual question selectors present',forms[id].questions.every((q,i)=>env.doc.getElementById('scaleAnswer'+i)));
 check(id+' question text displayed',env.doc.getElementById('scaleElectronic').textContent.includes(forms[id].questions[0].label));
 check(id+' questionnaire precedes metadata',env.doc.getElementById('scaleDetail').children[1].id==='scaleElectronic');
 check(id+' source safe new tab',env.doc.getElementById('scaleElectronic').querySelectorAll('a').every(a=>a.getAttribute('target')==='_blank'&&a.getAttribute('rel')==='noopener noreferrer'&&a.getAttribute('href').startsWith('https://')));
}
answer('phq9',[null,null,null,null,null,null,null,null,1]);
check('UI incomplete no total',!env.doc.getElementById('scaleElectronicResult').textContent.includes('총점:'));
check('UI partial safety notice visible',!env.doc.getElementById('scaleSafetyNotice').hidden&&env.doc.getElementById('scaleSafetyNotice').textContent.includes('9번'));
answer('phq9',Array(9).fill(3));
check('UI PHQ9 sum27',env.doc.getElementById('scaleElectronicResult').textContent.includes('27 / 27'));
const difficulty=env.doc.getElementById('scaleDifficulty');difficulty.value='3';difficulty.onchange();
check('difficulty not scored',env.doc.getElementById('scaleElectronicResult').textContent.includes('27 / 27'));
api.open('gad7');check('switch clears prior safety display',env.doc.getElementById('scaleSafetyNotice').hidden);
answer('gad7',Array(7).fill(0));api.open('phq9');
check('answers retained by scale',env.doc.getElementById('scaleAnswer0').value==='3'&&env.doc.getElementById('scaleElectronicResult').textContent.includes('27 / 27'));
check('difficulty retained',env.doc.getElementById('scaleDifficulty').value==='3');
env.ctx.switchDocStage('stage1_summary');env.ctx.switchDocStage('stage4_scales');
check('stage return retains answers',env.doc.getElementById('scaleAnswer8').value==='3');
env.doc.getElementById('scaleClear').click();
check('clear resets questions',env.doc.getElementById('scaleAnswer0').value==='');
check('clear resets difficulty',env.doc.getElementById('scaleDifficulty').value==='');
check('clear hides safety warning',env.doc.getElementById('scaleSafetyNotice').hidden);
answer('phq4',[3,0,0,3]);
check('UI PHQ4 both subscales',env.doc.getElementById('scaleElectronicResult').textContent.includes('불안 3 / 6 · 우울 3 / 6'));
check('search only approved tools',api.filteredScales({query:'MMSE',group:''}).length===0&&api.filteredScales({query:'PHQ',group:''}).length===4);
const search=env.doc.getElementById('scaleSearch');search.value='GAD';search.oninput();
check('UI search count',env.doc.getElementById('scaleCount').textContent.includes('2 / 7'));
check('filtered-out detail cleared',!env.doc.getElementById('scaleAnswer0'));
env.doc.getElementById('scaleSearchAll').click();api.open('gad7');
check('whole library restored',env.doc.getElementById('scaleCount').textContent.includes('7 / 7'));
const firstFavorite=env.doc.getElementById('scaleLibraryList').querySelector('button.scale-favorite');firstFavorite.click();
const raw=env.ctx.localStorage.getItem('neurodesk.scale-preferences.v1'),prefs=JSON.parse(raw);
check('preferences only allowed fields',Object.keys(prefs).sort().join(',')==='favorites,paper');
check('answers not in localStorage',!raw.includes('answers')&&!raw.includes('difficulty')&&!raw.includes('manual'));
env.doc.getElementById('scalePaper').value='보유';env.doc.getElementById('scalePaper').onchange();
check('paper preference editable',api.getPaperStatus('gad7')==='보유');
env.ctx.resetPatientIntake();
check('new patient clears all result memory',env.eval('Object.keys(AppState.scaleScores).length')===0);
api.render(null);api.open('phq9');
check('new patient questionnaire blank',env.doc.getElementById('scaleAnswer8').value==='');
for(const mode of ['blocked','corrupt']){
 const x=makeEnv(html,mode);x.ctx.switchMode('doctor');x.ctx.switchDocStage('stage4_scales');x.ctx.NeuroScaleLibrary.open('phq9');
 check(mode+' storage does not prevent questionnaire',!!x.doc.getElementById('scaleAnswer8'));
}
const gated=makeEnv(html);gated.ctx.NEURO_SCALE_CATALOG.scales.find(s=>s.id==='phq9').grade='C';
check('runtime unverified grade denied',!gated.ctx.NeuroScaleLibrary.canUseElectronic('phq9'));
gated.ctx.NEURO_SCALE_CATALOG.scales.find(s=>s.id==='phq9').grade='A';gated.ctx.NEURO_SCALE_FORMS.phq9.language='en';
check('wrong language denied',!gated.ctx.NeuroScaleLibrary.canUseElectronic('phq9'));
gated.ctx.NEURO_SCALE_FORMS.phq9.language='ko';gated.ctx.NEURO_SCALE_FORMS.phq9.version='other';
check('wrong version denied',!gated.ctx.NeuroScaleLibrary.canUseElectronic('phq9'));
console.log(JSON.stringify({scaleChecks:passed,fourATCombinations:combinations,regressionChecks:85,browserUI:'not tested',externalLinkNavigation:'not tested; URLs/attributes checked',imageAndPrint:'mocked'},null,2));
