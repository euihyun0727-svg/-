/* NeuroDesk Stage 4 only. Scores/answers stay in AppState memory.
   Browser storage contains only scale IDs and paper-availability preferences. */
(function () {
  'use strict';
  const catalog = window.NEURO_SCALE_CATALOG;
  const approved = window.NEURO_SCALE_FORMS;
  const $ = id => document.getElementById(id);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const key = 'neurodesk.scale-preferences.v1';
  let preferences = { favorites: [], paper: {} };
  let preferencesNotice = '';
  let query = '', group = '', rights = '', favoritesOnly = false, activeId = '', lastSymptom = null;
  const byId = id => catalog.scales.find(scale => scale.id === id);
  const safeUrl = value => {
    try { const u = new URL(value); return u.protocol === 'https:' ? u.href : ''; } catch { return ''; }
  };
  const sourceFor = scale => catalog.sources[scale.source];
  const sourceUrl = scale => scale.sourceUrl || sourceFor(scale).url;
  const storage = () => AppState.scaleScores;
  const patientKey = id => 'scale-library:' + id;
  const paperStatus = id => preferences.paper[id] || byId(id)?.paper || '확인 필요';
  const gradeLabel = grade => grade==='A'?'한국어 전자 평가 · 이용 조건 확인':'미등록';
  function loadPreferences() {
    try {
      const raw = JSON.parse(localStorage.getItem(key) || 'null');
      if (raw && typeof raw === 'object') {
        preferences.favorites = Array.isArray(raw.favorites) ? [...new Set(raw.favorites.filter(id => typeof id === 'string' && byId(id)))] : [];
        if (raw.paper && typeof raw.paper === 'object') {
          for (const [id,value] of Object.entries(raw.paper)) if (byId(id) && ['보유','미보유','확인 필요'].includes(value)) preferences.paper[id] = value;
        }
      }
    } catch {
      preferencesNotice = '브라우저 설정을 읽지 못했습니다. 즐겨찾기·보유 표시는 현재 창에서만 유지됩니다.';
    }
  }
  function savePreferences() {
    try {
      // Deliberately allowlist non-patient preferences; never serialize AppState.
      localStorage.setItem(key, JSON.stringify({ favorites: preferences.favorites, paper: preferences.paper }));
    } catch {
      preferencesNotice = '브라우저 저장을 사용할 수 없습니다. 즐겨찾기·보유 표시는 현재 창에서만 유지됩니다.';
    }
    if ($('scalePreferencesNotice')) $('scalePreferencesNotice').textContent = preferencesNotice;
  }
  function filteredScales(options = {}) {
    const q = String(options.query ?? query).trim().toLocaleLowerCase('ko');
    const g = options.group ?? group, r = options.rights ?? rights, f = options.favoritesOnly ?? favoritesOnly;
    return catalog.scales.filter(scale => (!g || scale.groups.includes(g)) && (!r || scale.grade === r) &&
      (!f || preferences.favorites.includes(scale.id)) &&
      (!q || [scale.abbr,scale.name,scale.purpose,...scale.groups.map(id=>catalog.groups[id])].join(' ').toLocaleLowerCase('ko').includes(q)));
  }
  function interpret(scale, score) {
    switch (scale.manual?.interpretation) {
      case 'phq9': return score<5?'None-minimal':score<10?'Mild':score<15?'Moderate':score<20?'Moderately Severe':'Severe';
      case 'gad2': return score>=3?'공식 매뉴얼: GAD-7 시행 및 임상 면담을 위한 선별 기준(≥3)에 해당':'공식 매뉴얼의 선별 기준(≥3) 미만 · 배제 진단 아님';
      case 'phq4': return '0~12점 합계 · 전자 문항 평가에서는 불안·우울 소척도를 각각 계산합니다. 확정 진단 아님';
      case 'phq2': return score>=3?'공식 매뉴얼: PHQ-9 시행 및 임상 면담을 위한 선별 기준(≥3)에 해당':'공식 매뉴얼의 선별 기준(≥3) 미만 · 배제 진단 아님';
      case 'gad7': return score<5?'Minimal':score<10?'Mild':score<15?'Moderate':'Severe';
      case 'fourat': return score>=4?'4점 이상 : 섬망 가능 +/- 인지 장애':score>=1?'1 – 3 : 인지장애 가능':'0 : 섬망, 인지장애 가능성 낮음 (그러나 [4]번 항목을 평가하지 않은 경우엔 섬망 가능성 존재)';
      default: return '확인 필요 · 검증된 해석 규칙을 등록하지 않아 자동 해석하지 않습니다.';
    }
  }
  function validateManual(id, value) {
    const scale = byId(id);
    if (!scale) return {valid:false,message:'등록되지 않은 척도입니다.'};
    const raw = String(value ?? '').trim();
    if (!raw) return {valid:false,message:'종이 설문에서 산출한 결과를 입력해 주세요.'};
    if (!/^[+-]?(?:\d+\.?\d*|\.\d+)$/.test(raw)) return {valid:false,message:'유한한 숫자로 입력해 주세요.'};
    const score = Number(raw), rule=scale.manual;
    if (!Number.isFinite(score)) return {valid:false,message:'유한한 숫자로 입력해 주세요.'};
    if (!rule) return {valid:true,score,verified:false,message:'수동 입력값: '+score+' · 판본·단위·범위 확인 필요. 유효한 척도 점수로 검증한 결과가 아닙니다.'};
    if ((rule.exclusiveMin?score<=rule.min:score<rule.min) || (rule.max!==null&&score>rule.max) ||
        (rule.step!== 'any' && Math.abs((score-rule.min)/rule.step-Math.round((score-rule.min)/rule.step))>1e-9)) {
      return {valid:false,message:'공식 확인 범위·단위에 맞지 않습니다: '+scale.scoreRange};
    }
    return {valid:true,score,verified:true,message:score+' '+rule.unit+' · '+interpret(scale,score)};
  }
  function calculateSpeed(distance, seconds) {
    const a=String(distance??'').trim(),b=String(seconds??'').trim();
    if (!/^(?:\d+\.?\d*|\.\d+)$/.test(a)||!/^(?:\d+\.?\d*|\.\d+)$/.test(b)) return {valid:false,message:'실제 측정 거리(m)와 시간(초)을 입력해 주세요.'};
    const d=Number(a),t=Number(b),speed=d/t;
    if (![d,t,speed].every(Number.isFinite)||d<=0||t<=0||speed<=0) return {valid:false,message:'거리와 시간은 0보다 큰 유한한 숫자여야 합니다.'};
    return {valid:true,speed,message:'보행 속도: '+speed.toFixed(3)+' m/s · 측정거리 ÷ 시간. 프로토콜·가속구간은 시행자가 확인하며 자동 위험도 판정은 하지 않습니다.'};
  }
  function canUseElectronic(id) {
    const scale=byId(id),form=approved[id];
    return !!(scale && scale.grade==='A' && scale.rightsVerified===true && scale.electronicLanguage==='ko' &&
      form && form.language==='ko' && form.version===scale.electronicVersion && safeUrl(form.source) && safeUrl(form.license));
  }
  function calculateElectronic(id, selections) {
    if (!canUseElectronic(id)) return {valid:false,message:'전자 문항 이용허락이 확인되지 않았습니다.'};
    const form=approved[id], scale=byId(id);
    const dense=Array.isArray(selections)?Array.from(selections):[];
    const answeredCount=dense.reduce((n,index,i)=>n+(Number.isInteger(index)&&!!form.questions[i]?.options[index]?1:0),0);
    const safetyIndex=Number.isInteger(form.safetyItem)&&Array.isArray(selections)?selections[form.safetyItem]:null;
    const requiresSafetyReview=Number.isInteger(safetyIndex)&&form.questions[form.safetyItem]?.options[safetyIndex]?.score>0;
    const safetyNotice=requiresSafetyReview?'PHQ-9 9번 양성 응답: 총점과 무관하게 의료진이 현재 자해·자살 생각과 위험을 직접 면담해 확인하세요. 자동 위험도 판정이 아닙니다.':'';
    const status={answeredCount,requiresSafetyReview,safetyNotice};
    if (!Array.isArray(selections)||selections.length!==form.questions.length ||
        dense.some((index,i)=>!Number.isInteger(index)||!form.questions[i].options[index])) {
      return {valid:false,...status,message:'평가 '+answeredCount+' / '+form.questions.length+' · 모든 항목에 응답해야 총점을 계산합니다. 미응답은 0점으로 처리하지 않습니다.'};
    }
    const values=selections.map((index,i)=>form.questions[i].options[index].score);
    const score=values.reduce((sum,value)=>sum+value,0);
    const subscores=form.subscales?Object.fromEntries(Object.entries(form.subscales).map(([name,indices])=>[name,indices.reduce((sum,i)=>sum+values[i],0)])):null;
    const detail=subscores?'불안 '+subscores.anxiety+' / 6 · 우울 '+subscores.depression+' / 6 · 각 소척도 3점 이상이면 추가 평가를 검토합니다. 확정 진단 아님.':interpret(scale,score);
    return {valid:true,...status,score,subscores,message:scale.abbr+' 총점: '+score+' / '+form.max+' · '+detail};
  }
  function renderElectronic(scale,saved) {
    const electronic=$('scaleElectronic');
    if(!canUseElectronic(scale.id)){electronic.textContent='사용 조건이 확인된 전자 평가를 선택해 주세요.';return;}
    const form=approved[scale.id];
    electronic.innerHTML='<h4>문항별 평가 · '+esc(scale.abbr)+'</h4>'+
      '<p>'+esc(form.administration)+'</p>'+
      (form.instructions||[]).map(text=>'<p class="scale-instruction">'+esc(text)+'</p>').join('')+
      (form.derivation?'<p class="scale-note">'+esc(form.derivation)+'</p>':'')+
      '<p class="scale-note">응답과 점수는 현재 창의 메모리에만 유지되며 새 환자·새로고침 시 지워집니다.</p>'+
      form.questions.map((q,i)=>'<fieldset><legend>'+esc(q.label)+'</legend>'+q.instructions.map(t=>'<p>'+esc(t)+'</p>').join('')+
        '<label>환자 응답 / 평가 결과 <select id="scaleAnswer'+i+'" aria-label="'+esc(q.label)+'"><option value="">평가 선택</option>'+
        q.options.map((o,j)=>'<option value="'+j+'">'+esc(o.text)+' ('+o.score+')</option>').join('')+'</select></label></fieldset>').join('')+
      '<p id="scaleElectronicProgress" role="status"></p><p id="scaleSafetyNotice" class="scale-safety" role="alert" hidden></p>'+
      '<p id="scaleElectronicResult" role="status" aria-live="polite"></p><p class="scale-note">점수만으로 진단하거나 치료를 결정하지 않습니다. 환자가 문항을 이해했는지 확인하고 임상 면담·진찰 결과와 함께 판단하세요.</p>'+
      (form.difficulty?'<fieldset><legend>일상 기능 · 총점에 포함하지 않는 추가 문항</legend><p>'+esc(form.difficulty.label)+'</p>'+
        '<select id="scaleDifficulty" aria-label="일상 기능 · 비채점"><option value="">응답 선택 / 해당하지 않으면 비워 두기</option>'+
        form.difficulty.options.map((text,i)=>'<option value="'+i+'">'+esc(text)+'</option>').join('')+'</select></fieldset>':'')+
      (form.footnote?'<p class="scale-note">'+esc(form.footnote)+'</p>':'')+
      '<p class="scale-note">'+esc(form.notes)+'</p><p class="scale-note">'+esc(form.attribution)+'</p>'+
      '<p>'+link(form.source,'한국어 문항 원본')+' · '+link(form.license,form.licenseLabel||'이용 조건')+'</p>'+
      '<p class="scale-note">판본: '+esc(form.version)+' · '+esc(form.changes)+'</p>';
    const answers=Array.isArray(saved.answers)?saved.answers:[];
    const update=()=>{
      const values=form.questions.map((q,i)=>$('scaleAnswer'+i).value===''?null:Number($('scaleAnswer'+i).value));
      const state=storage()[patientKey(scale.id)]||{};
      if(values.some(Number.isInteger))state.answers=values;else delete state.answers;
      if(Object.keys(state).length)storage()[patientKey(scale.id)]=state;else delete storage()[patientKey(scale.id)];
      const result=calculateElectronic(scale.id,values);
      $('scaleElectronicProgress').textContent='평가 '+result.answeredCount+' / '+form.questions.length;
      $('scaleElectronicResult').textContent=result.message;
      $('scaleSafetyNotice').textContent=result.safetyNotice;
      $('scaleSafetyNotice').hidden=!result.requiresSafetyReview;
    };
    form.questions.forEach((q,i)=>{const value=answers[i];$('scaleAnswer'+i).value=Number.isInteger(value)&&q.options[value]?String(value):'';$('scaleAnswer'+i).onchange=update;});
    if(form.difficulty){
      $('scaleDifficulty').value=Number.isInteger(saved.difficulty)&&form.difficulty.options[saved.difficulty]?String(saved.difficulty):'';
      $('scaleDifficulty').onchange=()=>{const state=storage()[patientKey(scale.id)]||{};state.difficulty=$('scaleDifficulty').value===''?null:Number($('scaleDifficulty').value);storage()[patientKey(scale.id)]=state;};
    }
    update();
  }
  function link(url,label) {
    const safe=safeUrl(url);
    return safe?'<a href="'+esc(safe)+'" target="_blank" rel="noopener noreferrer">'+esc(label)+'</a>':'<span>공식 URL 확인 필요</span>';
  }
  function drawList() {
    const list=$('scaleLibraryList');if(!list)return;
    list.innerHTML='';
    const items=filteredScales();
    $('scaleCount').textContent=items.length+' / '+catalog.scales.length+'개 · 검토일 '+catalog.reviewed;
    if (!items.some(scale=>scale.id===activeId)) activeId='';
    if (!items.length) {drawDetail();list.textContent='조건에 맞는 척도가 없습니다. 전체 검색 또는 필터 해제를 사용하세요.';return;}
    for(const scale of items) {
      const row=document.createElement('div');row.className='scale-list-row';
      const button=document.createElement('button');button.type='button';button.className='scale-open';
      button.textContent=scale.abbr+' · '+scale.name;button.setAttribute('aria-pressed',String(activeId===scale.id));
      button.onclick=()=>{activeId=scale.id;drawList();};
      const meta=document.createElement('p');meta.textContent=gradeLabel(scale.grade)+' · 종이 '+paperStatus(scale.id);
      const favorite=document.createElement('button');favorite.type='button';favorite.className='scale-favorite';
      favorite.textContent=preferences.favorites.includes(scale.id)?'★ 즐겨찾기 해제':'☆ 즐겨찾기';
      favorite.setAttribute('aria-label',scale.abbr+' 즐겨찾기');favorite.setAttribute('aria-pressed',String(preferences.favorites.includes(scale.id)));
      favorite.onclick=()=>{preferences.favorites=preferences.favorites.includes(scale.id)?preferences.favorites.filter(id=>id!==scale.id):[...preferences.favorites,scale.id];savePreferences();drawList();};
      row.appendChild(button);row.appendChild(meta);row.appendChild(favorite);list.appendChild(row);
    }
    drawDetail();
  }
  function drawDetail() {
    const panel=$('scaleDetail');if(!panel)return;
    const scale=byId(activeId);panel.innerHTML='';
    if(!scale){panel.textContent='목록에서 척도를 선택하면 질문과 답변 선택지가 표시됩니다.';return;}
    const src=sourceFor(scale);
    const fields=[
      ['정식 명칭',scale.name],['적용 질환·증상',scale.groups.map(id=>catalog.groups[id]).join(' · ')],
      ['평가 목적',scale.purpose],['시행 방법',scale.method],['문항 수',scale.items],['시행 시간',scale.duration],
      ['점수 범위',scale.scoreRange],['점수 해석','문항 평가 결과에서 공식 매뉴얼 근거만 표시 · 확정 진단 아님'],
      ['한국어판',scale.korean],['원문 이용 등급',gradeLabel(scale.grade)],['사용권·라이선스',scale.license],
      ['전자 복제·공개',scale.electronic],['의료기관 내부 사용',scale.internalUse],['건강보험 수가·인정기준',scale.insurance],
      ['출처 확인 범위',scale.sourceScope],['출처 접근 결과',src.access],['출처 유형',src.kind]
    ];
    panel.innerHTML='<h3>'+esc(scale.abbr)+'</h3><section id="scaleElectronic"></section><details><summary>척도 정보·이용 조건·공식 출처</summary><dl class="scale-metadata">'+fields.map(([k,v])=>'<dt>'+esc(k)+'</dt><dd>'+esc(v)+'</dd>').join('')+'</dl>'+
      '<p>'+link(sourceUrl(scale),src.label+' 열기')+'</p><p class="scale-note">'+esc(src.note)+'</p>'+
      scale.evidence.map(id=>'<p>'+link(catalog.sources[id].url,catalog.sources[id].label)+' · '+esc(catalog.sources[id].access)+'</p>').join('')+
      '<label class="scale-paper-label">원내 종이 설문 보유 여부 <select id="scalePaper" aria-label="원내 종이 설문 보유 여부">'+['보유','미보유','확인 필요'].map(v=>'<option value="'+v+'" '+(paperStatus(scale.id)===v?'selected':'')+'>'+v+'</option>').join('')+'</select></label>'+
      '<p class="scale-note">보유 표시는 원장님 확인을 기반으로 합니다. 종이 보유와 전자 구현 이용 조건은 별개입니다.</p></details>'+
      '<section class="scale-calculator"><h4>종이 설문 결과 수동 입력</h4><p>공식 종이 검사에서 산출한 결과만 입력하세요. 문항별 채점 대체 기능이 아닙니다. 이름·생년월일·환자번호를 입력하지 마세요. 결과는 현재 창의 메모리에만 유지되며 새 환자·새로고침 시 지워집니다.</p>'+
      (scale.id==='phq9'?'<p class="scale-note">총점만으로 9번 문항의 응답을 알 수 없습니다. 종이 설문의 9번과 현재 위험은 별도로 확인하세요.</p>':'')+'<label>결과 값 <input type="number" id="scaleManual" aria-label="'+esc(scale.abbr)+' 종이 결과" step="'+esc(scale.manual?.step??'any')+'"></label><p id="scaleManualResult" role="status" aria-live="polite"></p>'+
      (scale.manual?'<p>'+link(scale.manual.evidence,'범위·해석 근거 열기')+' · 한국어판의 진단 절단값·보험 기준을 확인했다는 뜻은 아닙니다.</p>':'<p>공식 범위·단위 미확인: 숫자 기록만 제공하며 척도 점수의 유효성·중증도를 판정하지 않습니다.</p>')+
      '<button type="button" id="scaleClear" class="btn-subpath">현재 척도 결과 지우기</button></section>'+
      (scale.calculator==='speed'?'<section class="scale-calculator"><h4>실제 측정값의 속도 계산</h4><p>프로토콜 원문은 복제하지 않습니다. 가속·감속 구간을 제외한 실제 측정 거리를 입력하세요.</p><label>측정 거리(m) <input type="number" id="scaleDistance" step="any"></label><label>소요 시간(초) <input type="number" id="scaleSeconds" step="any"></label><p id="scaleSpeedResult" role="status"></p></section>':'')+
      '';
    $('scalePaper').onchange=()=>{preferences.paper[scale.id]=$('scalePaper').value;savePreferences();drawList();};
    const saved=storage()[patientKey(scale.id)]||{};
    $('scaleManual').value=saved.manual??'';
    $('scaleManual').oninput=()=>{
      const state=storage()[patientKey(scale.id)]||{};state.manual=$('scaleManual').value;storage()[patientKey(scale.id)]=state;
      $('scaleManualResult').textContent=validateManual(scale.id,state.manual).message;
    };
    if($('scaleManual').value!=='')$('scaleManual').oninput();
    $('scaleClear').onclick=()=>{delete storage()[patientKey(scale.id)];drawDetail();};
    if(scale.calculator==='speed'){
      $('scaleDistance').value=saved.distance??'';$('scaleSeconds').value=saved.seconds??'';
      const update=()=>{const state=storage()[patientKey(scale.id)]||{};state.distance=$('scaleDistance').value;state.seconds=$('scaleSeconds').value;storage()[patientKey(scale.id)]=state;$('scaleSpeedResult').textContent=calculateSpeed(state.distance,state.seconds).message;};
      $('scaleDistance').oninput=update;$('scaleSeconds').oninput=update;
      if(saved.distance||saved.seconds)update();
    }
    renderElectronic(scale,saved);
  }

  function render(symptom) {
    const root=$('docScalesList');if(!root)return;
    if(lastSymptom!==symptom){group=catalog.groups[symptom]?symptom:'';lastSymptom=symptom;}
    if(!$('scaleToolbar')){
      root.innerHTML='<div id="scaleToolbar" class="scale-toolbar"><label>전체 척도 검색 <input id="scaleSearch" type="search" placeholder="약어·정식 명칭·목적 검색"></label>'+
        '<label>증상군 <select id="scaleGroup"><option value="">전체 증상군</option>'+Object.entries(catalog.groups).map(([id,name])=>'<option value="'+id+'">'+esc(name)+'</option>').join('')+'</select></label>'+

        '<label><input id="scaleFavoritesOnly" type="checkbox"> 즐겨찾기만</label><button type="button" class="btn-subpath" id="scaleSearchAll">전체 검색</button></div>'+
        '<p id="scaleCount" role="status" aria-live="polite"></p><p id="scalePreferencesNotice" class="scale-note"></p>'+
        '<div class="scale-columns"><section id="scaleLibraryList" aria-label="척도 목록"></section><section id="scaleDetail" aria-label="척도 상세"></section></div>';
      $('scaleSearch').oninput=()=>{query=$('scaleSearch').value;group='';$('scaleGroup').value='';drawList();};
      $('scaleGroup').onchange=()=>{group=$('scaleGroup').value;drawList();};
      $('scaleFavoritesOnly').onchange=()=>{favoritesOnly=$('scaleFavoritesOnly').checked;drawList();};
      $('scaleSearchAll').onclick=()=>{query='';group='';rights='';favoritesOnly=false;$('scaleSearch').value='';$('scaleGroup').value='';$('scaleFavoritesOnly').checked=false;drawList();};
    }
    $('scaleSearch').value=query;$('scaleGroup').value=group;$('scaleFavoritesOnly').checked=favoritesOnly;
    $('scalePreferencesNotice').textContent=preferencesNotice;
    drawList();
    // Rebuild only this stage's detail; patient values are recovered from memory.
    drawDetail();
  }
  loadPreferences();
  window.NeuroScaleLibrary=Object.freeze({render,filteredScales,validateManual,calculateSpeed,canUseElectronic,calculateElectronic,
    catalog,open(id){if(!byId(id))return;activeId=id;drawList();drawDetail();},getPaperStatus:paperStatus});
})();
