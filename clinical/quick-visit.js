(() => {
'use strict';
const el = id => document.getElementById(id);

const choices = new Map();
const enabled = () => true;
const current = () => choices.get(AppState.activeDoctorSymptom);
const module = () => NEURO_DATA[AppState.activeDoctorSymptom];
const diagnosis = () => module()?.differentialPathways.find(path => path.id === current()?.diagnosis);
const active = () => enabled() && Boolean(module());
const notify = message => { el('quickStatus').textContent = message; };
const option = (name, value = name) => new Option(name, value);
const field = id => el(id).value;
const chartOpen = () => { el('emrChartPreview').open = true; };
const reviewStages = [
  ['stage2_tests','검사 근거 자세히 보기'],
  ['stage3_tx','진단·치료 근거 자세히 보기'],
  ['stage4_scales','임상척도 자세히 보기']
];
for (const [id, title] of reviewStages) {
  const stage = el('docStage_' + id);
  const details = document.createElement('details');
  const summary = document.createElement('summary');
  details.className = 'single-visit-detail';
  summary.textContent = title;
  stage.before(details);
  details.append(summary, stage);
}
el('docStage_stage1_summary').after(el('singleVisitTests'));
const followup = el('docStage_stage5_followup');
const title = document.createElement('h2');
title.textContent = '환자교육자료';
followup.prepend(title);
const handoutActions = document.createElement('div');
handoutActions.className = 'single-visit-actions';
handoutActions.append(el('quickHandout'), el('quickCopyHandout'), el('quickStatus'));
title.after(handoutActions);
const handoutOptions = document.createElement('div');
handoutOptions.id = 'singleVisitHandoutOptions';
handoutOptions.innerHTML = "<div id=\"quickTreatment\"></div>\n          <label><input type=\"checkbox\" id=\"quickSelfCare\"> 생활관리 안내 포함</label>\n          <label><input type=\"checkbox\" id=\"quickFollowup\"> 추적관리 안내 포함</label>\n          <label>추가 관리 계획 <input id=\"quickPlan\" maxlength=\"500\"></label>";
title.after(handoutOptions);

const closeOutput = () => { window.NeuroVisitMaterials.invalidate(); notify(''); el('quickCopyHandout').hidden = true; };
const treatmentInputs = () => Array.from(document.querySelectorAll('#dzPlan [data-dz-therapy]'));
const activeTreatments = () => AppState.activeDoctorSymptom === 'dizziness' && diagnosis()
  ? treatmentInputs().filter(input => input.checked).map(input => input.closest('label').textContent.trim()) : [];

function render() {
  const mod = module();
  if (mod && !el('emrChartPreview').hidden && !choices.has(mod.id)) {
    choices.set(mod.id, {diagnosis:'', certainty:'', plan:'', selfCare:false, followup:false, therapies:[], tests:new Map()});
    chartOpen();
  }
  const state = current();
  el('doctorSection').classList.toggle('quick-visit-mode', enabled());
  el('doctor5StageNav').classList.toggle('quick-visit-nav-hidden', enabled());
  el('quickVisitFields').hidden = !state;
  for (const button of el('quickSymptoms').children) {
    button.setAttribute('aria-pressed', String(button.dataset.symptom === mod?.id));
  }
  el('singleVisitTests').hidden = !state;
  if (!state) return;
  if (state.diagnosis && state.diagnosis !== AppState.selectedSubpath[mod.id]) {
    state.diagnosis = '';
    state.certainty = '';
    state.therapies = [];
  }
  const select = el('quickDiagnosis');
  select.replaceChildren(option('질환 선택', ''),
    ...mod.differentialPathways.map(path => option(path.name, path.id)));
  select.value = state.diagnosis;
  el('quickCertainty').value = state.certainty;
  el('quickPlan').value = state.plan;
  el('quickSelfCare').checked = state.selfCare;
  el('quickFollowup').checked = state.followup;
  const group = el('singleVisitPrimary');
  group.replaceChildren();
  const visibility = {headache:window.NeuroHeadache, dizziness:window.NeuroDizziness}[mod.id];
  const visible = mod.questions.filter(q => !visibility || visibility.visible(q));
  const urgent = visible.flatMap(q => q.options.filter(o =>
    (o.redFlag || o.emergency) && AppState.answers[q.id] === o.text).map(o => o.text));
  el('singleVisitWarning').textContent = urgent.length
    ? '위험신호 응답 · ' + urgent.join(' / ')
    : '위험신호는 상세 문진에서 확인할 수 있습니다.';
  for (const question of visible.filter(q => !q.when).slice(0, 3)) {
    const copy = PATIENT_INTAKE_COPY.questions[question.id];
    const label = document.createElement('label');
    label.append((copy?.[0] || question.stem) + ' ');
    const select = document.createElement('select');
    select.add(option('미확인', ''));
    question.options.forEach((o, i) => select.add(option(copy?.[1]?.[i] || o.text, o.text)));
    select.value = AppState.answers[question.id] || '';
    select.onchange = () => {
      const radio = Array.from(document.getElementsByName('doctor-intake-' + question.id))
        .find((input, i) => (i ? question.options[i - 1].text : '') === select.value);
      if (radio) { radio.checked = true; radio.onchange(); }
      closeOutput();
      render();
      group.querySelector('[data-question="' + question.id + '"]')?.focus();
    };
    select.dataset.question = question.id;
    label.append(select);
    group.append(label);
  }
  renderTreatment();
  renderTests(mod);
}

// Patient explanations reviewed against Johns Hopkins BPPV and ACR/RSNA RadiologyInfo.
const testGuides = {
  positional: {
    source:'https://www.hopkinsmedicine.org/health/conditions-and-diseases/benign-paroxysmal-positional-vertigo-bppv',
    text:'자세에 따라 어지럼이 생기는 이유를 살펴봅니다. 의료진이 머리와 몸의 자세를 바꾸면서 눈의 움직임을 관찰해 이석증 여부를 확인합니다.'
  },
  mri: {
    source:'https://www.radiologyinfo.org/en/info/mri-brain',
    text:'뇌의 구조를 자세히 살펴볼 필요가 있을 때 시행합니다. 검사대에 누워 자석과 전파로 뇌의 영상을 얻습니다. 몸에 금속이나 삽입 기기가 있으면 검사 전에 알려주세요.'
  },
  ct: {
    source:'https://www.radiologyinfo.org/en/info/headct',
    text:'머리 안의 출혈 등 확인이 필요한 변화를 살펴봅니다. 검사대에 누워 여러 방향에서 촬영한 엑스레이로 머리 안쪽의 단면 영상을 얻습니다.'
  }
};
function guideFor(name) {
  if (/Dix.Hallpike/i.test(name) && !/roll/i.test(name)) return testGuides.positional;
  if (/MRI/i.test(name) && !/MRA|CTA|CT\b/i.test(name)) return testGuides.mri;
  if (/CT\b/i.test(name) && !/CTA|MRI|MRA/i.test(name)) return testGuides.ct;
}
function renderTests(mod) {
  const box = el('singleVisitTestChoices');
  box.replaceChildren();
  const state = current();
  for (const test of mod.testConsiderations || []) {
    const row = document.createElement('section');
    const label = document.createElement('label');
    const check = document.createElement('input');
    check.type = 'checkbox';
    check.checked = state.tests.has(test.name);
    label.append(check, ' ' + test.name);
    row.append(label);
    if (check.checked) {
      const guide = guideFor(test.name);
      const text = document.createElement('p');
      text.textContent = guide?.text || '환자용 검사 설명 준비 중';
      row.append(text);
      if (guide) {
        const include = document.createElement('input');
        include.type = 'checkbox';
        include.checked = state.tests.get(test.name);
        include.onchange = () => { state.tests.set(test.name, include.checked); closeOutput(); };
        const label = document.createElement('label');
        label.append(include, ' 검사 설명을 안내서에 포함');
        row.append(label);
      }
    }
    check.onchange = () => {
      if (check.checked) state.tests.set(test.name, false);
      else state.tests.delete(test.name);
      closeOutput();
      renderTests(mod);
    };
    box.append(row);
  }
}
function renderTreatment() {
  const box = el('quickTreatment');
  box.replaceChildren();
  if (!diagnosis() || AppState.activeDoctorSymptom !== 'dizziness') return;
  if (diagnosis().id === 'bppv') {
    for (const id of ['dzCanal', 'dzSide']) {
      const source = el(id);
      if (!source) continue;
      const label = document.createElement('label');
      label.append(id === 'dzCanal' ? '반고리관·안진형 ' : '진찰로 확인한 환측 ');
      const select = document.createElement('select');
      for (const item of source.options) select.add(option(item.text, item.value));
      select.value = source.value;
      select.onchange = () => {
        source.value = select.value;
        source.onchange();
        current().therapies = activeTreatments();
        closeOutput();
        render();
      };
      label.append(select);
      box.append(label);
    }
  }
  for (const source of treatmentInputs()) {
    const label = document.createElement('label');
    const check = document.createElement('input');
    check.type = 'checkbox';
    check.checked = source.checked;
    check.onchange = () => {
      source.checked = check.checked;
      source.onchange();
      current().therapies = activeTreatments();
      closeOutput();
      renderTreatment();
    };
    label.append(check, ' ' + source.closest('label').textContent.trim());
    box.append(label);
  }
}

for (const mod of Object.values(NEURO_DATA)) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'btn-subpath';
  button.dataset.symptom = mod.id;
  button.textContent = mod.name;
  button.onclick = () => {
    if (!choices.has(mod.id)) choices.set(mod.id, {diagnosis:'', certainty:'', plan:'', selfCare:false, followup:false, therapies:[], tests:new Map()});
    el('doctorIntakeSymptom').value = mod.id;
    el('doctorIntakeAdd').click();
    if (AppState.activeDoctorSymptom === mod.id) chartOpen();
    closeOutput();
    render();
    notify(el('doctorIntakeStatus').textContent);
  };
  el('quickSymptoms').append(button);
}

el('quickDiagnosis').onchange = () => {
  const state = current();
  state.diagnosis = field('quickDiagnosis');
  state.certainty = '';
  state.plan = '';
  state.selfCare = false;
  state.followup = false;
  state.therapies = [];
  if (state.diagnosis) AppState.selectedSubpath[module().id] = state.diagnosis;
  renderDoctorStage();
  closeOutput();
};
el('quickCertainty').onchange = () => { current().certainty = field('quickCertainty'); closeOutput(); };
for (const [id, key] of [['quickSelfCare','selfCare'], ['quickFollowup','followup']]) {
  el(id).onchange = () => { current()[key] = el(id).checked; closeOutput(); };
}
el('quickPlan').oninput = () => { current().plan = field('quickPlan'); closeOutput(); };
el('quickReset').onclick = () => { resetPatientIntake(); switchMode('doctor'); };
el('quickHandout').onclick = () => {
  if (!diagnosis()) return notify('교육자료에 사용할 질환을 선택하세요.');
  if (!window.NeuroPatientEducation.paths[diagnosis().id]) return notify('이 질환의 교육자료는 준비 중입니다.');
  AppState.selectedSubpath[module().id] = diagnosis().id;
  renderDoctorStage();
  el('vmCore')?.click();
  const pack = window.NeuroPatientEducation.paths[diagnosis().id];
  const match = title => (current().selfCare && /생활/.test(title)) || (current().followup && /경과 관찰|다음 진료|추적/.test(title));
  for (const input of document.querySelectorAll('#educationChoices [data-education]')) {
    if (match(pack.sections[Number(input.dataset.education)].title)) input.checked = true;
  }
  changeEducationChoice();
  el('vmPreviewButton').click();
  el('quickCopyHandout').hidden = false;
  el('vmPreview').scrollIntoView({block:'start'});
};

el('quickCopyHandout').onclick = async () => {
  const preview = el('vmPreview');
  if (!preview.innerText.trim()) return notify('교육자료 미리보기를 다시 열어 주세요.');
  try {
    await navigator.clipboard.writeText(preview.innerText);
    notify('안내서 텍스트를 복사했습니다.');
  } catch {
    notify('브라우저의 클립보드 권한을 확인해 주세요.');
  }
};
const oldRender = renderDoctorStage;
renderDoctorStage = function () { oldRender(); render(); };
const oldStart = startPatientIntake;
startPatientIntake = function () {
  if (!AppState.selectedSymptoms.length) return oldStart();
  oldStart();
  if (el('screenQuestionnaire').style.display === 'block') choices.clear();
};
const oldReset = resetPatientIntake;
resetPatientIntake = function () {
  choices.clear();
  notify('');
  el('singleVisitTests').hidden = true;
  oldReset();
  render();
};

window.NeuroQuickVisit = {
  historyLines(id, questions) {
    const labels = {headache:'두통', dizziness:'어지럼'};
    const reports = questions.map(q => {
      const answer = AppState.answers[q.id];
      const index = q.options.findIndex(o => o.text === answer);
      return PATIENT_INTAKE_COPY.questions[q.id]?.[1]?.[index] || answer;
    });
    if (!labels[id]) return reports.map(value => '- ' + value);
    const symptom = labels[id];
    return reports.length ? [symptom + ' 관련 진술: ' + reports.map(value => value.replace(/[.!?。]+$/, '')).join(' · ') + '.'] : [];
  },
  handout() {
    const state = current();
    const chosen = diagnosis();
    const isEnabled = active() && Boolean(state);
    return {
      enabled:isEnabled,
      ready:isEnabled && chosen?.id === AppState.selectedSubpath[module().id]
        && Boolean(window.NeuroPatientEducation.paths[chosen.id]),
      paragraphs:state?.plan.trim() ? [state.plan.trim()] : [],
      tests: state ? Array.from(state.tests).filter(([name, include]) => include && guideFor(name))
        .map(([name]) => [name, guideFor(name).text]) : []
    };
  },
  soap(id) {
    const state = choices.get(id);
    const chosen = NEURO_DATA[id]?.differentialPathways.find(path => path.id === state?.diagnosis);
    if (!state) return '';
    const therapies = chosen && (id === AppState.activeDoctorSymptom ? activeTreatments() : state.therapies);
    const assessment = state.certainty === '원인 미확정' ? state.certainty
      : chosen && state.certainty ? chosen.name + ' (' + state.certainty + ')' : '';
    const lines = [];
    if (therapies?.length) lines.push('검토한 치료 · ' + therapies.join(' / '));
    if (state.tests.size) lines.push('검사 계획: ' + Array.from(state.tests.keys()).join(' / '));
    if (state.plan.trim()) lines.push('' + state.plan.trim());
    return {assessment, plan:lines.join('\n')};
  }
};
render();
})();
