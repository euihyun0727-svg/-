
var fs=await import('node:fs/promises'),vm=await import('node:vm');
var voidTags=new Set(['input','img','br','hr','meta','link','source','area','wbr']);
function esc(v){return String(v).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
class TestNode{
 constructor(tag,doc){this.tagName=tag.toUpperCase();this.doc=doc;this.attrs={};this.children=[];this.parentNode=null;this._style={};this._value='';this.checked=false;this.disabled=false;this.listeners={};if(tag.toLowerCase()==='img'){this.complete=true;this.naturalWidth=1;this.decode=()=>Promise.resolve();}}
 get id(){return this.attrs.id||'';}set id(v){this.attrs.id=v;}
 get className(){return this.attrs.class||'';}set className(v){this.attrs.class=v;}
 get classList(){const self=this;return {add(...xs){self.className=[...new Set([...self.className.split(/\s+/).filter(Boolean),...xs])].join(' ')},remove(...xs){self.className=self.className.split(/\s+/).filter(x=>x&&!xs.includes(x)).join(' ')},contains(x){return self.className.split(/\s+/).includes(x)},toggle(x,force){const yes=force===undefined?!this.contains(x):force;yes?this.add(x):this.remove(x);return yes}};}
 get style(){return this._style;}set style(v){this._style=typeof v==='string'?Object.fromEntries(v.split(';').filter(x=>x.includes(':')).map(x=>{const i=x.indexOf(':');return [x.slice(0,i).trim().replace(/-([a-z])/g,(_,c)=>c.toUpperCase()),x.slice(i+1).trim()]})):v;}
 get value(){return this._value;}set value(v){this._value=String(v);}
 get hidden(){return 'hidden' in this.attrs;}set hidden(v){if(v)this.attrs.hidden='';else delete this.attrs.hidden;}
 setAttribute(k,v){this.attrs[k]=String(v);if(k==='style')this.style=String(v);if(k==='value')this._value=String(v);if(k==='checked')this.checked=true;if(k==='disabled')this.disabled=true;}
 getAttribute(k){return this.attrs[k]??null;}
 appendChild(n){if(n.parentNode)n.remove();this.children.push(n);n.parentNode=this;return n;}
 insertBefore(n,b){const i=this.children.indexOf(b);if(i<0)return this.appendChild(n);n.parentNode=this;this.children.splice(i,0,n);return n;}
 get firstChild(){return this.children[0]||null;}
 remove(){if(this.parentNode){const a=this.parentNode.children;a.splice(a.indexOf(this),1);this.parentNode=null;}}
 get textContent(){return this.tagName==='#TEXT'?this.text||'':this.children.map(n=>n.textContent).join('');}
 set textContent(v){this.children=[];const n=new TestNode('#text',this.doc);n.text=String(v);this.appendChild(n);}
 get innerText(){return this.textContent;}set innerText(v){this.textContent=v;}
 get innerHTML(){return this.children.map(n=>n.outerHTML).join('');}
 set innerHTML(s){for(const n of this.children)n.parentNode=null;this.children=[];parseInto(String(s),this,this.doc);}
 get outerHTML(){if(this.tagName==='#TEXT')return this.text||'';const tag=this.tagName.toLowerCase();return '<'+tag+Object.entries(this.attrs).map(([k,v])=>' '+k+'="'+esc(v)+'"').join('')+'>'+this.innerHTML+(voidTags.has(tag)?'':'</'+tag+'>');}
 querySelectorAll(s){return select(this,s);}querySelector(s){return this.querySelectorAll(s)[0]||null;}
 addEventListener(k,f){(this.listeners[k]??=[]).push(f);}
 dispatch(k){for(const f of this.listeners[k]||[])f({target:this});}
 click(){if(this.disabled)return;if(this.tagName==='INPUT'&&this.attrs.type==='checkbox')this.checked=!this.checked;if(this.onclick)this.onclick({target:this});this.dispatch('click');}
}
function parseInto(html,root,doc){
 const tokens=html.match(/<!--[\s\S]*?-->|<![^>]*>|<\/?[^>]+>|[^<]+/g)||[];const stack=[root];
 for(const tok of tokens){
 if(tok.startsWith('<!--')||tok.startsWith('<!'))continue;
 if(tok.startsWith('</')){const tag=tok.slice(2).replace(/>.*/,'').trim().toUpperCase();for(let i=stack.length-1;i>0;i--)if(stack[i].tagName===tag){stack.length=i;break;}continue;}
 if(tok.startsWith('<')){const m=tok.match(/^<([\w:-]+)([\s\S]*?)\/?>$/);if(!m)continue;const n=new TestNode(m[1],doc);for(const a of m[2].matchAll(/([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g))n.setAttribute(a[1],a[2]??a[3]??a[4]??'');stack[stack.length-1].appendChild(n);if(!voidTags.has(m[1].toLowerCase())&&!tok.endsWith('/>'))stack.push(n);}
 else{const n=new TestNode('#text',doc);n.text=tok;stack[stack.length-1].appendChild(n);}
 }
}
function descendants(root){const out=[];function walk(r){for(const n of r.children){out.push(n);walk(n)}}walk(root);return out;}
function simple(n,sel){
 if(n.tagName==='#TEXT')return false;
 if(sel.includes(':checked')&&!n.checked)return false;
 sel=sel.replace(':checked','');
 for(const a of sel.matchAll(/\[([^\]=]+)(?:=["']?([^\]"']+)["']?)?\]/g)){if(!(a[1] in n.attrs))return false;if(a[2]!==undefined&&n.attrs[a[1]]!==a[2])return false;}
 sel=sel.replace(/\[[^\]]+\]/g,'');
 const id=sel.match(/#([\w-]+)/);if(id&&n.id!==id[1])return false;
 for(const c of sel.matchAll(/\.([\w-]+)/g))if(!n.classList.contains(c[1]))return false;
 const tag=sel.match(/^[\w-]+/);return !tag||n.tagName===tag[0].toUpperCase();
}
function select(root,selector){return descendants(root).filter(n=>selector.split(',').some(part=>{const chunks=part.trim().split(/\s+/);if(!simple(n,chunks.pop()))return false;let p=n.parentNode;while(chunks.length){const target=chunks.pop();while(p&&!simple(p,target))p=p.parentNode;if(!p)return false;p=p.parentNode;}return true;}));}
function makeEnv(source, storageMode='normal'){
 const root=new TestNode('document',null);const doc={root,getElementById(id){return descendants(root).find(n=>n.id===id)||null},createElement(tag){return new TestNode(tag,doc)},querySelectorAll(s){return root.querySelectorAll(s)},querySelector(s){return root.querySelector(s)},addEventListener(){},fonts:{ready:Promise.resolve()}};
 root.doc=doc;parseInto(source.replace(/<script[^>]*>[\s\S]*?<\/script>/g,'').replace(/<style[^>]*>[\s\S]*?<\/style>/g,''),root,doc);doc.body=root.querySelector('body');
 const timers=new Map(),alerts=[],clips=[],events={};let tick=0,prints=0;
 const memory=new Map();
 const ctx={URL,localStorage:{getItem:k=>{if(storageMode==='blocked')throw Error('blocked');return storageMode==='corrupt'?'broken-json':memory.get(k)??null},setItem:(k,v)=>{if(storageMode==='blocked')throw Error('blocked');memory.set(k,String(v))}},document:doc,console,Promise,Date,Math,alert:m=>alerts.push(m),navigator:{clipboard:{writeText:t=>{clips.push(t);return Promise.resolve()}}},setTimeout:f=>{const id=++tick;timers.set(id,f);return id},clearTimeout:id=>timers.delete(id),addEventListener:(k,f)=>(events[k]??=[]).push(f),print:()=>prints++};
 ctx.window=ctx;vm.createContext(ctx);
 for(const [i,b]of [...source.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)].entries()){const src=b[1].match(/src="([^"]+)"/);const code=src?externalScripts[src[1]]:b[2];if(src&&!code)throw Error('Missing local script '+src[1]);new vm.Script(code,{filename:src?src[1]:'index-script-'+i}).runInContext(ctx);}
 ctx.onload();for(const f of events.load||[])f({});
 return {ctx,doc,alerts,clips,timers,eval:s=>vm.runInContext(s,ctx),flush(){const fs=[...timers.values()];timers.clear();fs.forEach(f=>f())},get prints(){return prints}};
}
var checks=[];
function check(name,condition){if(!condition)throw Error(name);checks.push(name);}
function radio(env,name,value){for(const n of env.doc.querySelectorAll('input[name="'+name+'"]'))n.checked=n.value===value;}

var html=await fs.readFile(new URL('../index.html',import.meta.url),'utf8');
var externalScripts={};
for(const path of ['scales/catalog.js','scales/library.js','clinical/headache-data.js','clinical/headache.js','clinical/dizziness-data.js','clinical/dizziness.js'])externalScripts[path]=await fs.readFile(new URL('../'+path,import.meta.url),'utf8');


var env=makeEnv(html);
check('12 symptom cards',env.doc.querySelectorAll('.symptom-card').length===12);
check('no startup error',!env.doc.getElementById('neuroLoadError'));
env.ctx.switchMode('doctor');check('no synthetic headache',env.eval('AppState.selectedSymptoms.length')===0);
check('empty print disabled',env.doc.getElementById('visitPrint').disabled);
env.ctx.switchMode('patient');env.ctx.toggleSymptom('headache');env.ctx.startPatientIntake();
var opt=env.doc.querySelector('#optList button');opt.click();opt.click();check('one pending timer',env.timers.size===1);env.flush();
check('double click advances once',env.eval('AppState.queueIndex')===1);
check('one answer',env.eval('Object.keys(AppState.answers).length')===1);
env.doc.querySelector('#optList button').click();env.flush();check('emergency waits',env.eval('AppState.queueIndex')===1);
check('emergency warning',!!env.doc.getElementById('questionEmergencyNotice'));env.ctx.nextQuestion();
check('manual next',env.eval('AppState.queueIndex')===2);
env.doc.querySelector('#optList button').click();env.ctx.nextQuestion();env.flush();check('answer and next once',env.eval('AppState.queueIndex')===3);
env.doc.querySelector('#optList button').click();env.ctx.prevQuestion();env.flush();check('previous cancels timer',env.eval('AppState.queueIndex')===2);
env.doc.querySelector('#optList button').click();env.ctx.resetPatientIntake();env.flush();
check('reset queue and answers',env.eval('AppState.queue.length===0&&AppState.queueIndex===0&&Object.keys(AppState.answers).length===0'));
check('reset hides questionnaire',env.doc.getElementById('screenQuestionnaire').style.display==='none');
check('reset clears doctor and art',env.doc.getElementById('docSubpathContent').innerHTML===''&&env.doc.getElementById('clinicEducationArt').hidden);
env.ctx.toggleSymptom('sleep');env.ctx.switchMode('doctor');var snapshot=env.eval('JSON.stringify(AppState)');env.ctx.runAutomatedIntegrityTest();
check('integrity preserves state',env.eval('JSON.stringify(AppState)')===snapshot);
check('integrity no reported failures',!env.doc.getElementById('testOutputLog').innerHTML.includes('[실패]'));
env.ctx.switchDocStage('stage4_scales');env.ctx.NeuroScaleLibrary.open('phq9');var score=env.doc.getElementById('scaleManual');score.value='12';score.oninput();env.ctx.switchDocStage('stage1_summary');env.ctx.switchDocStage('stage4_scales');
check('score retained',env.doc.getElementById('scaleManual').value==='12');
env.ctx.switchDocStage('stage5_followup');env.doc.getElementById('eduConfirmed').checked=true;env.ctx.toggleEducationPrint();
check('legacy approval enables print',!env.doc.getElementById('eduPrintButton').disabled);
env.eval("AppState.selectedSubpath.sleep='osa'");env.ctx.renderDoctorStage();
check('legacy invalidates on path switch',env.doc.getElementById('eduPrintButton').disabled&&!env.doc.getElementById('eduConfirmed').checked);
check('safety followup restored',env.doc.getElementById('docFollowupTableBody').textContent.includes('양압기 순응도'));
check('original schedule reference retained',env.doc.getElementById('docFollowupTableBody').textContent.includes('증상군 참고'));
check('root image path',env.doc.querySelector('#clinicEducationArt img').getAttribute('src')==='sleep.png');


var e=makeEnv(html);
e.ctx.toggleSymptom('sleep');radio(e,'experienceType','return');radio(e,'returnCourse','악화');radio(e,'returnMedicine','불편감 있음');radio(e,'returnNew','새 증상 있음');e.doc.getElementById('returnNote').value='검증용 변화 메모';
e.ctx.startPatientIntake();check('return worsening detailed',e.doc.getElementById('screenQuestionnaire').style.display==='block'&&e.eval('AppState.queue.length')===4);
e.ctx.switchMode('doctor');check('detailed summary accurate',e.doc.getElementById('experienceSummary').textContent.includes('상세 문진을 함께 진행'));
e.ctx.copyEmrText();await Promise.resolve();check('EMR return note',e.clips[0].includes('검증용 변화 메모')&&e.clips[0].includes('약 사용 중 불편감: 불편감 있음'));
check('full EMR question',e.clips[0].includes('코골이가 심하거나 자다가 숨이 컥 하고 멈춘다는 말을 듣습니까?'));
e.ctx.resetPatientIntake();e.ctx.toggleSymptom('sleep');radio(e,'experienceType','return');radio(e,'returnCourse','호전');radio(e,'returnMedicine','불편감 없음');radio(e,'returnNew','새 증상 없음');e.ctx.startPatientIntake();
check('stable return brief',e.doc.getElementById('screenPatientFinish').style.display==='block'&&e.eval('AppState.queue.length')===0);
e.ctx.switchMode('doctor');e.ctx.switchDocStage('stage5_followup');e.doc.querySelector('[data-education]').checked=true;e.ctx.changeEducationChoice();e.doc.getElementById('visitReviewed').checked=true;e.ctx.refreshVisitPrint();
check('confirmed selection printable',!e.doc.getElementById('visitPrint').disabled);
var selected=e.ctx.getSelectedEducationHTML();await e.ctx.printVisitSheet();
check('selected education in sheet',e.doc.getElementById('visitPrintSheet').innerHTML.includes(selected));
check('print called and class cleared',e.prints===1&&!e.doc.body.classList.contains('visit-printing'));
e.doc.getElementById('visitDiagnosis').value='검증용 안내';e.doc.getElementById('visitDiagnosis').dispatch('input');
check('editing invalidates',!e.doc.getElementById('visitReviewed').checked&&e.doc.getElementById('visitPrint').disabled);
e.eval("AppState.selectedSubpath.sleep='osa'");e.ctx.renderDoctorStage();check('disease isolates draft and selection',e.doc.getElementById('visitDiagnosis').value===''&&!e.ctx.hasEducationSelection());
e.eval("AppState.selectedSubpath.sleep='insomnia'");e.ctx.renderDoctorStage();check('same disease restores draft',e.doc.getElementById('visitDiagnosis').value==='검증용 안내'&&e.ctx.hasEducationSelection());
check('restored draft unapproved',!e.doc.getElementById('visitReviewed').checked);
e.doc.getElementById('visitReviewed').checked=true;e.ctx.refreshVisitPrint();var release;e.doc.fonts.ready=new Promise(r=>release=r);var pending=e.ctx.printVisitSheet();
e.doc.getElementById('visitCare').value='변경된 안내';e.doc.getElementById('visitCare').dispatch('input');e.doc.getElementById('visitReviewed').checked=true;e.ctx.refreshVisitPrint();release();await pending;
check('stale print snapshot aborts',e.prints===1);
e.doc.fonts.ready=Promise.resolve();e.doc.getElementById('visitReviewed').checked=true;e.ctx.refreshVisitPrint();var count=e.prints;await Promise.all([e.ctx.printVisitSheet(),e.ctx.printVisitSheet()]);check('double print guard',e.prints===count+1);
e.doc.getElementById('eduConfirmed').checked=true;e.ctx.toggleEducationPrint();await e.ctx.printEducationSheet();check('legacy print waits then prints',e.prints===count+2);
e.doc.querySelector('#clinicEducationArt img').decode=()=>Promise.reject(Error('mock missing image'));await e.ctx.printEducationSheet();check('legacy image failure stops print',e.prints===count+2&&e.alerts.some(t=>t.includes('이미지 파일')));
e.ctx.resetPatientIntake();check('new patient clears score memory',e.eval('Object.keys(AppState.scaleScores).length')===0);
check('new patient clears draft and education',!e.ctx.hasEducationSelection()&&e.doc.getElementById('visitDiagnosis').value==='');
check('new patient clears old completion',e.doc.getElementById('patientSummaryCard').innerHTML==='');


var all=makeEnv(html);var ids=all.eval('Object.keys(NEURO_DATA)');var pathCount=0;
for(const id of ids){
 all.eval('AppState.selectedSymptoms=['+JSON.stringify(id)+'];AppState.activeDoctorSymptom='+JSON.stringify(id));all.ctx.initDoctorDashboard();
 check(id+' image file',all.doc.querySelector('#clinicEducationArt img').getAttribute('src')===id+'.png');
 for(const sub of all.eval('NEURO_DATA['+JSON.stringify(id)+'].differentialPathways.map(p=>p.id)')){
 all.eval('AppState.selectedSubpath['+JSON.stringify(id)+']='+JSON.stringify(sub));all.ctx.renderDoctorStage();
 check(sub+' treatment and education',all.doc.getElementById('docSubpathContent').textContent.trim().length>0&&all.doc.getElementById('docPatientLeafletArea').textContent.includes('질환이 생기는 원리'));pathCount++;
 }}
var svg1=all.ctx.buildFlowSvg('검증',[['A','a'],['B','b']]),svg2=all.ctx.buildFlowSvg('검증',[['A','a'],['B','b']]);
check('unique SVG marker ID',svg1.match(/marker id="([^"]+)"/)[1]!==svg2.match(/marker id="([^"]+)"/)[1]);
var proof=makeEnv(html);proof.ctx.toggleSymptom('headache');proof.ctx.startPatientIntake();proof.ctx.skipQuestion();proof.ctx.switchMode('doctor');
check('skip not counted as answer',proof.doc.getElementById('visitQuickSummary').textContent.includes('응답 0/'+proof.eval('NEURO_DATA.headache.questions.length')));
proof.ctx.navigator.clipboard.writeText=()=>Promise.reject(Error('denied'));proof.ctx.copyEmrText();await Promise.resolve();await Promise.resolve();check('clipboard rejection reported',proof.alerts.some(t=>t.includes('복사하지 못했습니다')));
proof.ctx.navigator.clipboard=undefined;proof.ctx.copyEmrText();check('missing clipboard reported',proof.alerts.some(t=>t.includes('복사를 사용할 수 없습니다')));
proof.ctx.switchMode('patient');var b=proof.doc.querySelector('#optList button');b.click();proof.ctx.switchMode('doctor');proof.flush();check('switching mode cancels advance',proof.eval('AppState.queueIndex')===1);proof.ctx.switchMode('patient');check('question buttons usable on return',!proof.doc.querySelector('#optList button').disabled);
var blocks=[...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]);blocks.forEach(b=>new vm.Script(b));check('all inline scripts parse',blocks.length>0);
check('print header has important override',html.includes('#visitPrintSheet header{display:block!important;'));


var z=makeEnv(html);z.ctx.toggleSymptom('headache');z.ctx.startPatientIntake();z.ctx.skipQuestion();z.doc.querySelector('#optList button').click();z.ctx.switchMode('doctor');z.ctx.switchMode('patient');
check('emergency warning retained after mode switch',!!z.doc.getElementById('questionEmergencyNotice'));
z.ctx.switchMode('doctor');z.ctx.switchDocStage('stage5_followup');z.doc.getElementById('visitDiagnosis').value='검증용';z.doc.getElementById('visitReviewed').checked=true;z.ctx.refreshVisitPrint();await z.ctx.printVisitSheet();
var originalId=z.doc.querySelector('#docMechanismArea marker').id,printId=z.doc.querySelector('#visitPrintSheet marker').id;
check('copied SVG has separate marker namespace',originalId!==printId);
check('copied arrows target copied marker',z.doc.querySelector('#visitPrintSheet line').getAttribute('marker-end')==='url(#'+printId+')');
console.log(JSON.stringify({passed:checks.length,paths:pathCount,scope:'DOM simulation; image decode, clipboard and print mocked'},null,2));

const regressionSummary={passed:checks.length,paths:pathCount};
export { makeEnv, regressionSummary };
