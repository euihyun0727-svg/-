(() => {
'use strict';
const el = id => document.getElementById(id);
const root = el('quickVisit');
const choices = new Map();
const enabled = () => !el('quickDetails').matches('[aria-expanded=true]');
const current = () => choices.get(AppState.activeDoctorSymptom);
const module = () => NEURO_DATA[AppState.activeDoctorSymptom];
const diagnosis = () => module()?.differentialPathways.find(path => path.id === current()?.diagnosis);
const active = () => enabled() && Boolean(module());
const notify = message => { el('quickStatus').textContent = message; };
const option = (name, value = name) => new Option(name, value);
const field = id => el(id).value;
const closeOutput = () => { window.NeuroVisitMaterials.invalidate(); notify(''); el('quickCopyHandout').hidden = true; };
const treatmentInputs = () => Array.from(document.querySelectorAll('#dzPlan [data-dz-therapy]'));
const activeTreatments = () => AppState.activeDoctorSymptom === 'dizziness' && diagnosis()
  ? treatmentInputs().filter(input => input.checked).map(input => input.closest('label').textContent.trim()) : [];

function render() {
  const mod = module();
  const state = current();
  el('doctorSection').classList.toggle('quick-visit-mode', enabled());
  el('doctor5StageNav').classList.toggle('quick-visit-nav-hidden', enabled());
  el('quickVisitFields').hidden = !state;
  for (const button of el('quickSymptoms').children) {
    button.setAttribute('aria-pressed', String(button.dataset.symptom === mod?.id));
  }
  if (!state) return;
  if (!enabled() && state.diagnosis !== AppState.selectedSubpath[mod.id]) {
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
  const group = el('quickSymptomsReported');
  group.replaceChildren(group.firstElementChild);
  const visibility = {headache:window.NeuroHeadache, dizziness:window.NeuroDizziness}[mod.id];
  const visible = mod.questions.filter(q => !visibility || visibility.visible(q));
  const urgent = visible.flatMap(q => q.options.filter(o =>
    (o.redFlag || o.emergency) && AppState.answers[q.id] === o.text).map(o => o.text));
  el('quickWarning').textContent = urgent.length
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
    if (!choices.has(mod.id)) choices.set(mod.id, {diagnosis:'', certainty:'', plan:'', selfCare:false, followup:false, therapies:[]});
    el('doctorIntakeSymptom').value = mod.id;
    el('doctorIntakeAdd').click();
    if (AppState.activeDoctorSymptom === mod.id) switchDocStage('stage1_summary');
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
el('quickDetails').onclick = () => {
  const button = el('quickDetails');
  const show = enabled();
  button.setAttribute('aria-expanded', String(show));
  button.textContent = show ? '빠른 진료로 돌아가기' : '상세 진료 도구';
  closeOutput();
  render();
  if (!show) switchDocStage('stage1_summary');
};
el('quickChart').onclick = () => {
  switchDocStage('stage1_summary');
  copyEmrText();
  el('emrChartPreview').scrollIntoView({block:'start'});
};
el('quickHandout').onclick = () => {
  if (!diagnosis()) return notify('교육자료에 사용할 질환을 선택하세요.');
  if (!window.NeuroPatientEducation.paths[diagnosis().id]) return notify('이 질환의 교육자료는 준비 중입니다.');
  AppState.selectedSubpath[module().id] = diagnosis().id;
  switchDocStage('stage5_followup');
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
const oldReset = resetPatientIntake;
resetPatientIntake = function () {
  choices.clear();
  notify('');
  el('quickDetails').setAttribute('aria-expanded', 'false');
  el('quickDetails').textContent = '상세 진료 도구';
  oldReset();
  render();
};

window.NeuroQuickVisit = {
  handout() {
    const state = current();
    const chosen = diagnosis();
    const isEnabled = active() && Boolean(state);
    return {
      enabled:isEnabled,
      ready:isEnabled && chosen?.id === AppState.selectedSubpath[module().id]
        && Boolean(window.NeuroPatientEducation.paths[chosen.id]),
      paragraphs:state?.plan.trim() ? [state.plan.trim()] : []
    };
  },
  chartText(id) {
    const state = choices.get(id);
    const chosen = NEURO_DATA[id]?.differentialPathways.find(path => path.id === state?.diagnosis);
    if (!state) return '';
    const therapies = chosen && (id === AppState.activeDoctorSymptom ? activeTreatments() : state.therapies);
    const lines = [];
    if (state.certainty === '원인 미확정') lines.push('Assessment: 원인 미확정');
    else if (chosen && state.certainty) lines.push('Assessment: ' + chosen.name + ' (' + state.certainty + ')');
    if (therapies?.length) lines.push('Plan: 검토한 치료 · ' + therapies.join(' / '));
    if (state.plan.trim()) lines.push('Plan: ' + state.plan.trim());
    return lines.length ? '\n' + lines.join('\n') : '';
  }
};
render();
})();
