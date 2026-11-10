/* Visit-scoped files and reviewed education. No uploads, persistence, OCR or diagnosis. */
(function(){
'use strict';
const el=id=>document.getElementById(id),safe=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const types=['혈액검사','NCS/EMG','EEG','영상검사','기타'],limits={count:8,file:8*1024*1024,total:32*1024*1024,pixels:40*1000*1000};
let files=[],sequence=0,generation=0,revision=0,pending=0,queue=Promise.resolve(),context='',selection=[],seenContext=false,busy=false,zoomReturn=null;const loading=new Set();
const key=()=>AppState.activeDoctorSymptom?AppState.activeDoctorSymptom+':'+(AppState.selectedSubpath[AppState.activeDoctorSymptom]||''):'';
const path=()=>{const m=NEURO_DATA[AppState.activeDoctorSymptom];return m?.differentialPathways.find(p=>p.id===AppState.selectedSubpath[m.id])||m?.differentialPathways[0];};
const pack=()=>window.NeuroPatientEducation?.paths[path()?.id];
const fields=['visitDiagnosis','visitTests','visitCare','visitReturn','visitCaution'];
function invalidate(){revision++;el('visitReviewed').checked=false;if(el('eduConfirmed'))el('eduConfirmed').checked=false;toggleEducationPrint();refreshVisitPrint();el('visitPrintSheet').innerHTML='';if(el('vmPreview'))el('vmPreview').innerHTML='';window.NeuroFollowupWorkspace?.updateMini();}
function selectedEducation(){const p=pack();if(!p||!selection.length)return '';return '<section class="selected-education"><h2>'+ (el('educationFamily').checked?'환자·보호자 함께 보기':'함께 드리는 교육자료')+'</h2>'+p.sections.filter((s,i)=>selection.includes(i)).map(s=>'<section><h3>'+safe(s.title.replace(/^\d+\.\s*/,''))+'</h3><p>'+safe(s.text)+'</p></section>').join('')+'</section>';}
function attachmentHTML(){return files.filter(f=>f.include).map(f=>'<section class="vm-print-attachment"><h2>'+safe(f.title||'검사 결과')+'</h2><p>'+safe(f.type)+(f.date?' · 검사일 '+safe(f.date):'')+'</p><img src="'+safe(f.url)+'" alt="'+safe(f.title||'첨부한 검사 결과')+'" width="'+f.width+'" height="'+f.height+'"><p class="vm-caption">'+safe(f.description||'설명 미입력 — 담당의에게 확인하세요.')+'</p></section>').join('');}
function handoutVisual(id){
  if(!el('visitIncludeVisuals').checked)return '';
  if(id==='essential_tremor')return "<section class=\"et-daily-art\" aria-label=\"손떨림이 불편한 일상 동작\"><h2>손떨림이 불편한 일상 동작</h2><div class=\"et-scenes\"><figure class=\"et-scene\"><div class=\"et-scene-picture\"><img src=\"assets/ui/tremor-daily.png\" alt=\"컵 손잡이를 잡고 드는 손\"></div><figcaption>컵 들기</figcaption></figure><figure class=\"et-scene et-scene-writing\"><div class=\"et-scene-picture\"><img src=\"assets/ui/tremor-daily.png\" alt=\"펜을 잡고 종이에 글씨를 쓰는 손\"></div><figcaption>글씨 쓰기</figcaption></figure></div></section>";
  const vestibular=window.NeuroDizziness?.getState();
  if(id==='bppv'&&vestibular?.canal==='posterior'&&['left','right'].includes(vestibular.side))return epleyHandout(vestibular.side);
  if(id==='bppv')return horizontalHandout(vestibular);
  return safetySteps(id);
}
// Sources: CDC STEADI Postural Hypotension and CDC First Aid for Seizures.
function safetySteps(id){
  const standing=['orthostatic_hypo','syncope_orthostatic'].includes(id);
  const seizure=['epilepsy_classification','status_seizure_eval'].includes(id);
  if(!standing&&!seizure)return '';
  const title=standing?'어지럼을 줄이며 일어나기':'발작이 날 때 곁에서 돕기';
  const steps=standing?[
    ['상체부터 세우세요','침대에서 바로 서지 말고 먼저 몸을 일으켜 앉으세요.','<path d="M17 60h81v12H17zM31 45l24 12h25m-25 0-11-20"/><circle cx="38" cy="28" r="7"/>'],
    ['침대 가장자리에 앉으세요','발을 바닥에 두고 어지럽지 않은지 잠시 확인하세요.','<path d="M15 58h49v12H15zM54 37v20h20v19m-20-32 17 10"/><circle cx="54" cy="27" r="7"/>'],
    ['잡을 곳을 짚고 서세요','손잡이처럼 단단한 곳을 잡고 천천히 일어나세요. 어지러우면 걷지 마세요.','<path d="M86 25v50M85 46H66l-9-11m0 0v22L48 76m9-19 11 19"/><circle cx="57" cy="25" r="7"/>']
  ]:[
    ['주변을 안전하게','딱딱하거나 날카로운 물건을 치우고 머리 아래에 부드러운 것을 받쳐 주세요.','<path d="M15 69h84M24 63h26v6H24zM46 61h31l14 8"/><circle cx="36" cy="54" r="8"/>'],
    ['옆에 있으면서 시간 확인','누워 있으면 조심스럽게 옆으로 돌려 입이 바닥 쪽을 향하게 해 주세요. 억지로 붙잡거나 입에 아무것도 넣지 마세요.','<path d="M15 69h84M30 60h16l21 3 14 6m-18-5 12-9 12 8"/><ellipse cx="24" cy="57" rx="8" ry="6"/><path d="M21 63v3"/>'],
    ['응급 도움이 필요한 때','5분 이상 계속되거나, 곧 다시 발작하거나, 숨쉬기 어렵거나 깨어나지 않으면 119에 전화하세요. 첫 발작이나 다친 경우, 물속에서 발생한 경우에도 응급 도움을 요청하세요.','<circle cx="59" cy="44" r="23"/><path d="M59 28v17l11 6"/>']
  ];
  return '<section class="handout-treatment"><h2>'+title+'</h2><ol class="epley-steps handout-safety-steps">'+steps.map(([label,body,drawing],index)=>
    '<li><svg viewBox="0 0 116 86" aria-hidden="true"><rect x="7" y="7" width="102" height="72" rx="8" fill="#e1eee9"/><g stroke="#33514e" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none">'+drawing+'</g></svg><h3>'+(index+1)+'. '+label+'</h3><p>'+body+'</p></li>'
  ).join('')+'</ol></section>';
}
// 270° roll: PMID 22855868 and the lateral-canal sequence in the AAO-HNS guideline.
// Side-lying head-up variant: PMCID PMC10471904.
function horizontalHandout(state){
  if(!state||!['left','right'].includes(state.side)||state.therapies.length!==1)return '';
  const [choice]=state.therapies;
  const geo=state.canal==='horizontal_geo';
  const apo=state.canal==='horizontal_apo';
  if(!(geo&&['hcGeoManeuver','hcGeoRoll'].includes(choice)||apo&&choice==='hcApoManeuver'))return '';
  const affected=state.side==='right'?'오른쪽':'왼쪽';
  const other=state.side==='right'?'왼쪽':'오른쪽';
  const direction=state.side==='right'?-1:1;
  const roll=choice==='hcGeoRoll';
  const down=geo?other:affected;
  const name=roll?'바비큐 회전 정복술 (270°)':geo?'구포니 정복술':'아피아니 정복술';
  const steps=roll?[
    ['환측 귀가 아래로','의료진이 '+affected+' 귀가 아래로 가도록 자세를 잡습니다.',90*direction],
    ['등을 대고 눕기',other+' 방향으로 90° 돌아 얼굴이 천장을 향합니다.',0],
    ['반대쪽 귀가 아래로',other+' 방향으로 90° 더 돌아 '+other+' 귀가 아래로 갑니다.',-90*direction],
    ['엎드리기',other+' 방향으로 90° 더 돌아 얼굴이 침대 쪽을 향합니다.',180],
    ['다시 앉기','의료진의 도움을 받아 앉습니다.',null]
  ]:[
    ['침대 가장자리에 앉기','의료진이 몸과 머리를 지지하며 시작합니다.',null],
    [down+'으로 돌아눕기',down+' 귀가 아래로 가도록 눕습니다.',geo?-90*direction:90*direction],
    [geo?'코를 침대 쪽으로 돌리기':'코를 천장 쪽으로 돌리기','몸은 옆으로 누운 채 머리를 '+(geo?'아래로':'위로')+' 45° 돌립니다. 자세는 의료진이 안내한 시간 동안 유지합니다.',(geo?-90*direction:90*direction)+(geo?-45*direction:-45*direction)],
    ['다시 앉기','의료진의 도움을 받아 일어나 앉습니다.',null]
  ];
  function diagram(angle){
    const seated=angle===null;
    const torso=seated?'<path d="M53 64h53M77 49v15h19v11" stroke="#33514e" stroke-width="3" fill="none"/>' :'<g transform="rotate('+(roll?angle:steps[1][2])+' 80 53)"><rect x="62" y="46" width="36" height="14" rx="6" fill="#659b91"/><path d="M67 53h26" stroke="#33514e" stroke-width="1.5"/></g>';
    return '<svg viewBox="0 0 160 86" aria-hidden="true"><rect x="43" y="8" width="74" height="70" rx="7" fill="#e1eee9" stroke="#92b5ac"/>'+torso+'<g transform="rotate('+(angle??0)+' 80 32)"><circle cx="80" cy="32" r="13" fill="#efd4b9" stroke="#33514e"/><path d="M80 32V15m-5 5 5-5 5 5" stroke="#33514e" stroke-width="2" fill="none"/></g></svg>';
  }
  return '<section class="handout-treatment horizontal-treatment"><h2>'+name+' · '+affected+' 수평반고리관 ('+(geo?'향지성':'원지성')+')</h2><p>진료실에서 의료진과 함께 하는 치료입니다. 그림의 화살표는 얼굴이 향하는 방향을 보여줍니다. 몸을 돌리는 쪽은 각 단계의 설명을 읽어주세요.</p><ol class="epley-steps'+(roll?'':' horizontal-four')+'">'+steps.map(([label,body,angle],index)=>'<li>'+diagram(angle)+'<h3>'+(index+1)+'. '+label+'</h3><p>'+body+'</p></li>').join('')+'</ol><p>혼자 따라 하기 전에 본인에게 맞는 술기와 안전한 자세를 의료진에게 확인하세요.</p></section>';
}
function epleyHandout(side){
  const right=side==='right';
  const affected=right?'오른쪽':'왼쪽';
  const opposite=right?'왼쪽':'오른쪽';
  const direction=right?-1:1;
  const steps=[
    ['앉아서 고개 돌리기','침대에 앉아 고개를 '+affected+'으로 45° 돌립니다.'],
    ['고개를 유지하며 눕기','고개 방향을 유지한 채 바로 눕습니다. 베개는 머리가 아니라 어깨 아래에 둡니다. 30초 유지합니다.'],
    ['누운 채 반대로 돌리기','머리를 들지 않고 '+opposite+'으로 90° 돌립니다. 얼굴이 '+opposite+' 45°를 향합니다. 30초 유지합니다.'],
    ['몸도 옆으로 돌리기','머리와 몸을 함께 '+opposite+'으로 90° 더 돌려 코가 침대 쪽을 향하게 합니다. 30초 유지합니다.'],
    ['옆으로 앉기',opposite+'으로 돌아누운 쪽에서 몸을 일으켜 앉습니다.']
  ];
  function pose(index){
    const seated=index===0||index===4;
    const rolled=index===3;
    const angle=index<2?45*direction:index===2?-45*direction:0;
    const head=rolled
      ? '<ellipse cx="80" cy="32" rx="11" ry="13" fill="#efd4b9" stroke="#33514e"/><path d="M80 40v9m-4-4 4 4 4-4" stroke="#33514e" stroke-width="2" fill="none"/>'
      : '<g transform="rotate('+angle+' 80 30)"><circle cx="80" cy="30" r="12" fill="#efd4b9" stroke="#33514e"/><path d="M76 23l4-5 4 5" stroke="#33514e" stroke-width="2" fill="none"/><circle cx="76" cy="29" r="1"/><circle cx="84" cy="29" r="1"/></g>';
    const body=rolled?'<rect x="70" y="43" width="20" height="34" rx="8" fill="#659b91"/>':'<rect x="61" y="43" width="38" height="32" rx="10" fill="#659b91"/>';
    return '<svg viewBox="0 0 160 86" role="img" aria-label="'+safe(steps[index][0])+'"><rect x="43" y="9" width="74" height="72" rx="7" fill="#e1eee9" stroke="#92b5ac"/>'+(seated?'<path d="M51 67h58" stroke="#92b5ac" stroke-width="2"/>':'<rect x="53" y="43" width="54" height="14" rx="4" fill="#faf4e7" stroke="#c6b698"/>')+body+head+'</svg>';
  }
  return '<section class="handout-treatment"><h2>에플리 이석정복술 · '+affected+' 후반고리관</h2><p>진료에서 집에서도 해도 된다고 안내받고 동작을 배운 경우에 따라 하세요. 목·허리 질환이나 움직임 제한이 있으면 먼저 의료진에게 확인하세요.</p><ol class="epley-steps">'+steps.map(([title,body],index)=>'<li>'+pose(index)+'<h3>'+(index+1)+'. '+title+'</h3><p>'+body+'</p></li>').join('')+'</ol><p>그림은 자세를 구분하는 간단한 도식입니다. 반복 횟수는 진료에서 받은 안내를 따르세요.</p></section>';
}
function outputHTML(){
  const current=path();
  if(!current)return '';
  const labels=['오늘의 설명','검사 계획','치료 및 생활 안내','다음 진료','주의사항'];
  const sections=fields.map((id,index)=>{
    const value=el(id).value.trim();
    return value?'<section class="handout-entry"><h3>'+labels[index]+'</h3><p>'+safe(value)+'</p></section>':'';
  });
  const group=(title,content,kind)=>content?'<section class="handout-group '+kind+'"><h2>'+title+'</h2>'+content+'</section>':'';
  const name={'essential_tremor':'본태성 떨림','bppv':'이석증'}[current.id];
  return '<header class="handout-header"><h1>진료 후 안내서</h1>'+(name?'<p>'+name+'</p>':'')+'</header>'
    +group('오늘 정한 계획',sections.slice(0,3).join(''),'handout-plan')
    +attachmentHTML()+handoutVisual(current.id)+selectedEducation()
    +group('다음 진료와 주의사항',sections.slice(3).join(''),'handout-next');
}
function fingerprint(){return JSON.stringify([generation,revision,key(),outputHTML(),window.NeuroHeadache?.getState(),window.NeuroDizziness?.getState(),window.NeuroModuleReview?.getState(),el('dzRevision')?.textContent,el('cmRevision')?.textContent]);}
function updateSelection(){selection=Array.from(document.querySelectorAll('#educationChoices input[data-education]:checked')).map(n=>Number(n.getAttribute('data-education')));invalidate();el('educationPreview').innerHTML=selectedEducation()||'<p>선택한 자료가 없습니다.</p>';renderEducationPrint();}
function renderEducationPrint(){const n=el('vmSelectedEducation');if(n)n.innerHTML=selectedEducation()||'<p>교육 항목을 선택하면 이곳에 표시됩니다.</p>';const a=el('vmSelectedAttachments');if(a)a.innerHTML=attachmentHTML();window.NeuroFollowupWorkspace?.updateMini();}
function renderEducation(){const p=pack();if(!p)return;window.NeuroFollowupWorkspace?.beforeEducationRender();const panel=el('docPatientLeafletArea');const retained=Array.from(panel.children).filter(n=>['ha-clinical','dz-clinical','cm-review'].some(c=>n.classList?.contains(c)));panel.style.whiteSpace='normal';panel.innerHTML='<div class="education-header"><h3>'+safe(path().name)+'</h3></div><div class="no-print vm-education-reference"><p>핵심 항목을 선택하거나 상세 항목을 펼쳐 확인하세요. 접힌 항목도 선택하면 출력됩니다.</p>'+p.sections.map((s,i)=>'<details '+(p.core.includes(i)?'open':'')+'><summary>'+safe(s.title)+'</summary><p>'+safe(s.text)+'</p></details>').join('')+'</div><div id="vmSelectedAttachments"></div><div id="vmSelectedEducation"></div><div class="edu-plan no-print"><label><input id="eduConfirmed" type="checkbox" onchange="toggleEducationPrint()"> 의료진이 선택한 교육·첨부·설명 내용을 확인함</label></div>';
 retained.forEach(n=>panel.appendChild(n));
 el('educationContext').textContent='선택한 교육자료: '+path().name;el('educationChoices').innerHTML='<button type="button" class="btn-subpath" id="vmCore">핵심 교육 선택</button> <button type="button" class="btn-subpath" id="vmNone">교육 선택 해제</button>'+p.sections.map((s,i)=>'<label><input type="checkbox" data-education="'+i+'" '+(selection.includes(i)?'checked':'')+' onchange="changeEducationChoice()"> '+safe(s.title)+(p.core.includes(i)?' · 핵심':'')+'</label>').join('');
 el('vmCore').onclick=()=>{document.querySelectorAll('#educationChoices [data-education]').forEach(n=>n.checked=p.core.includes(Number(n.getAttribute('data-education'))));updateSelection();};el('vmNone').onclick=()=>{document.querySelectorAll('#educationChoices [data-education]').forEach(n=>n.checked=false);updateSelection();};el('educationPreview').innerHTML=selectedEducation()||'<p>선택한 자료가 없습니다. 핵심 교육 선택으로 기본 항목을 추가할 수 있습니다.</p>';renderEducationPrint();toggleEducationPrint();window.NeuroFollowupWorkspace?.arrange();}
function closeZoom(){el('vmZoom').hidden=true;el('vmZoomImage').src='data:,';zoomReturn?.focus?.();}
function renderFiles(){const box=el('vmFileList');box.innerHTML=files.map(f=>'<article class="vm-file" data-vm-id="'+f.id+'"><button type="button" class="vm-thumbnail" data-vm-zoom="'+f.id+'" aria-label="검사 이미지 확대"><img src="'+f.url+'" alt="검사 결과 미리보기"></button><div class="vm-fields"><label>검사 분류<select data-vm-field="type" data-vm-id="'+f.id+'">'+types.map(t=>'<option '+(f.type===t?'selected':'')+'>'+t+'</option>').join('')+'</select></label><label>검사일 (선택)<input type="date" data-vm-field="date" data-vm-id="'+f.id+'" value="'+safe(f.date)+'"></label><label>제목<input maxlength="100" data-vm-field="title" data-vm-id="'+f.id+'" value="'+safe(f.title)+'"></label><label>환자에게 전달할 설명<textarea maxlength="1500" rows="3" data-vm-field="description" data-vm-id="'+f.id+'"></textarea></label><label>의사용 메모 — 화면에서만 표시<textarea maxlength="1000" rows="2" data-vm-field="note" data-vm-id="'+f.id+'"></textarea></label><label><input type="checkbox" data-vm-include="'+f.id+'" '+(f.include?'checked':'')+'> 안내서에 포함</label><div class="vm-row"><button type="button" class="btn-subpath" data-vm-up="'+f.id+'" '+(files.indexOf(f)===0?'disabled':'')+'>위로</button><button type="button" class="btn-subpath" data-vm-down="'+f.id+'" '+(files.indexOf(f)===files.length-1?'disabled':'')+'>아래로</button><button type="button" class="btn-subpath" data-vm-delete="'+f.id+'">삭제</button></div></div></article>').join('')||'<p>첨부한 검사 이미지가 없습니다.</p>';
 box.querySelectorAll('[data-vm-field]').forEach(n=>{const f=files.find(f=>f.id===Number(n.getAttribute('data-vm-id'))),field=n.getAttribute('data-vm-field');if(n.tagName==='TEXTAREA')n.value=f[field];const edit=()=>{let v=n.value;if(field==='type'&&!types.includes(v))v='기타';if(field==='date'&&v){const d=new Date(v+'T00:00:00Z');if(!/^\d{4}-\d{2}-\d{2}$/.test(v)||!Number.isFinite(d.getTime())||d.toISOString().slice(0,10)!==v)v='';}f[field]=v.slice(0,field==='description'?1500:field==='note'?1000:100);invalidate();renderEducationPrint();};if(n.tagName==='SELECT'||field==='date')n.onchange=edit;else n.oninput=edit;});
 box.querySelectorAll('[data-vm-include]').forEach(n=>n.onchange=()=>{files.find(f=>f.id===Number(n.getAttribute('data-vm-include'))).include=n.checked;invalidate();renderEducationPrint();});
 const action=(attr,fn)=>box.querySelectorAll('['+attr+']').forEach(n=>n.onclick=()=>fn(Number(n.getAttribute(attr)),n));
 action('data-vm-delete',id=>{const f=files.find(f=>f.id===id);URL.revokeObjectURL(f.url);files=files.filter(f=>f.id!==id);closeZoom();invalidate();renderFiles();renderEducationPrint();});
 const move=(id,delta)=>{const i=files.findIndex(f=>f.id===id),j=i+delta;if(j<0||j>=files.length)return;[files[i],files[j]]=[files[j],files[i]];invalidate();renderFiles();renderEducationPrint();};action('data-vm-up',id=>move(id,-1));action('data-vm-down',id=>move(id,1));
 action('data-vm-zoom',(id,n)=>{const f=files.find(f=>f.id===id);zoomReturn=n;el('vmZoomImage').src=f.url;el('vmZoomImage').alt=f.title||'첨부 검사 이미지';el('vmZoom').hidden=false;el('vmZoomClose').focus?.();});
 el('vmUsage').textContent=files.length+' / '+limits.count+'장 · '+(files.reduce((n,f)=>n+f.size,0)/1024/1024).toFixed(1)+' / 32 MB';window.NeuroFollowupWorkspace?.updateMini();}
async function decode(url){const img=document.createElement('img');img.src=url;if(img.decode)await img.decode();else await new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=reject;});if(!img.naturalWidth||!img.naturalHeight)throw Error('이미지를 읽지 못했습니다.');if(img.naturalWidth*img.naturalHeight>limits.pixels)throw Error('이미지는 4천만 화소 이하로 준비하세요.');return {width:img.naturalWidth,height:img.naturalHeight};}
async function validate(file){if(!file||!file.size||file.size>limits.file)throw Error('파일은 0바이트 초과, 8 MB 이하여야 합니다.');const ext=(file.name||'').split('.').pop().toLowerCase(),b=new Uint8Array(await file.slice(0,16).arrayBuffer());let mime='';if(b[0]===255&&b[1]===216&&b[2]===255)mime='image/jpeg';if(b.length>=8&&[137,80,78,71,13,10,26,10].every((v,i)=>b[i]===v))mime='image/png';if(b.length>=12&&String.fromCharCode(...b.slice(0,4))==='RIFF'&&String.fromCharCode(...b.slice(8,12))==='WEBP')mime='image/webp';const expected={jpg:'image/jpeg',jpeg:'image/jpeg',png:'image/png',webp:'image/webp'}[ext];if(!expected||expected!==mime||(file.type&&file.type!==mime))throw Error('JPG·PNG·WebP만 지원합니다. PDF·DICOM·SVG와 형식이 다른 파일은 제외됩니다.');}
function acceptFiles(input){const batch=Array.from(input||[]),token=generation;pending++;invalidate();const job=queue.then(async()=>{const errors=[];for(const file of batch){if(token!==generation)break;let url='';try{if(files.length>=limits.count)throw Error('최대 8장까지 첨부할 수 있습니다.');if(files.reduce((n,f)=>n+f.size,0)+file.size>limits.total)throw Error('전체 이미지 합계는 32 MB 이하여야 합니다.');await validate(file);if(token!==generation)break;const signature=[file.name,file.size,file.lastModified].join('|');if(files.some(f=>f.signature===signature))throw Error('이미 첨부한 같은 파일입니다. 삭제 후 다시 추가할 수 있습니다.');url=URL.createObjectURL(file);loading.add(url);const dimensions=await decode(url);if(token!==generation){URL.revokeObjectURL(url);loading.delete(url);break;}loading.delete(url);files.push({id:++sequence,url,size:file.size,signature,...dimensions,type:'기타',date:'',title:'검사 결과 '+sequence,description:'',note:'',include:false});url='';}catch(error){if(url){URL.revokeObjectURL(url);loading.delete(url);}if(token===generation)errors.push(error.message);}}if(token===generation){invalidate();el('vmFileStatus').textContent=errors.length?errors.join(' / '):'첨부 완료. 설명과 출력 포함 여부를 확인하세요.';renderFiles();renderEducationPrint();}}).finally(()=>{pending--;refreshVisitPrint();});queue=job.catch(()=>{});return job;}
async function print(mode='visit'){const approval=mode==='education'?'eduConfirmed':'visitReviewed';if(busy||pending||!path()||!el(approval)?.checked)return;busy=true;const stamp=fingerprint(),sheet=el('visitPrintSheet');sheet.innerHTML=outputHTML();namespaceMechanismMarkers(sheet);try{const images=Array.from(sheet.querySelectorAll('img'));await Promise.all(images.map(img=>img.decode?img.decode():new Promise((resolve,reject)=>{if(img.complete){img.naturalWidth?resolve():reject(Error('image'));return;}img.onload=resolve;img.onerror=reject;})));if(document.fonts?.ready)await document.fonts.ready;if(stamp!==fingerprint()||pending||!el(approval)?.checked)return;document.body.classList.add('visit-printing');window.print();}catch{if(stamp===fingerprint()&&el(approval)?.checked)alert('이미지 파일을 준비하지 못해 인쇄를 중단했습니다. 첨부와 그림 파일을 확인하세요.');}finally{document.body.classList.remove('visit-printing');busy=false;}}
const oldRefresh=refreshVisitPrint;refreshVisitPrint=function(){oldRefresh();if(path()&&el('visitReviewed').checked&&files.some(f=>f.include))el('visitPrint').disabled=false;if(pending)el('visitPrint').disabled=true;};
window.getVisitAttachmentsHTML=attachmentHTML;window.getSelectedEducationHTML=selectedEducation;window.hasEducationSelection=()=>selection.length>0;window.changeEducationChoice=updateSelection;
const oldRender=renderDoctorStage;renderDoctorStage=function(){oldRender();const next=key();if(context!==next){const initial=!!next&&!seenContext;context=next;selection=initial?[...(pack()?.core||[])]:[];if(next)seenContext=true;files.forEach(f=>f.include=false);invalidate();closeZoom();}renderEducation();renderFiles();};
const oldClear=clearVisitDraft;window.clearVisitDraft=function(){oldClear();selection=[];invalidate();renderEducation();};
const oldReset=resetPatientIntake;resetPatientIntake=function(){generation++;files.forEach(f=>URL.revokeObjectURL(f.url));loading.forEach(url=>URL.revokeObjectURL(url));loading.clear();files=[];sequence=0;selection=[];context='';seenContext=false;closeZoom();oldReset();el('vmFileStatus').textContent='';invalidate();renderFiles();};
const ui=document.createElement('section');ui.id='vmEditor';ui.className='card no-print';ui.innerHTML='<h3>검사 결과·첨부자료</h3><p>현재 방문의 JPG·PNG·WebP 캡처를 첨부합니다. 자동 판독·자동 비식별화는 하지 않습니다.</p><p>최대 8장 · 파일당 8 MB · 합계 32 MB · 이미지당 4천만 화소. 이름·등록번호 등은 첨부 전에 직접 확인·제거하세요.</p><label class="vm-upload">검사 이미지 선택<input type="file" id="vmFileInput" accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp" multiple></label><p id="vmUsage"></p><p id="vmFileStatus" role="status" aria-live="polite"></p><div id="vmFileList"></div><button type="button" class="btn-subpath" id="vmPreviewButton">선택한 내용으로 안내서 미리보기</button><p>저장·외부 전송 없이 현재 화면에서만 사용합니다. 새로고침·창 닫기·새 환자 시작 시 사라집니다.</p><div id="vmPreview" class="vm-preview"></div>';
el('docStage_stage5_followup').insertBefore(ui,el('printableArea'));
const zoom=document.createElement('div');zoom.id='vmZoom';zoom.className='vm-zoom no-print';zoom.hidden=true;zoom.setAttribute('role','dialog');zoom.setAttribute('aria-modal','true');zoom.setAttribute('aria-label','검사 이미지 확대');zoom.innerHTML='<button type="button" class="btn-subpath" id="vmZoomClose">확대 닫기</button><img id="vmZoomImage" alt="첨부 검사 이미지">';document.body.appendChild(zoom);el('vmZoomClose').onclick=closeZoom;zoom.onkeydown=event=>{if(event.key==='Escape')closeZoom();if(event.key==='Tab'){event.preventDefault();el('vmZoomClose').focus?.();}};
el('vmFileInput').onchange=()=>{const input=el('vmFileInput'),selected=Array.from(input.files||[]);input.value='';acceptFiles(selected);};
el('vmPreviewButton').onclick=()=>{el('vmPreview').innerHTML=path()?outputHTML():'검토할 증상·질환을 먼저 선택하세요.';namespaceMechanismMarkers(el('vmPreview'));};
fields.forEach(id=>el(id).addEventListener('input',invalidate));el('visitIncludeVisuals').addEventListener('change',invalidate);el('educationFamily').addEventListener('change',()=>{invalidate();renderEducationPrint();el('educationPreview').innerHTML=selectedEducation();});
el('doctorSection').addEventListener('change',event=>{if(['visitReviewed','eduConfirmed'].includes(event.target.id))return;invalidate();});
window.NeuroVisitMaterials={acceptFiles,print,limits,getState:()=>({count:files.length,pending,revision,files:files.map(({signature,url,...f})=>({...f})),selection:[...selection]})};renderFiles();
})();
