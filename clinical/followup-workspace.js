/* Presentation only: keep existing controls, handlers and visit state. */
(function(){
  'use strict';
  const el=id=>document.getElementById(id);
  // Summary only. It never changes approvals or feeds the print document.
  function updateMini(){
    if(!el('ndBrandMini'))return;
    const state=window.NeuroVisitMaterials?.getState();
    const module=NEURO_DATA[AppState.activeDoctorSymptom];
    const selected=module?.differentialPathways.find(p=>p.id===AppState.selectedSubpath[module.id])||module?.differentialPathways[0];
    const education=window.NeuroPatientEducation?.paths[selected?.id];
    const indices=state?.selection||[];
    el('ndMiniToday').textContent=el('visitDiagnosis').value.trim()||'오늘의 설명 미입력';
    el('ndMiniPlan').innerHTML='';
    [['visitTests','검사 계획'],['visitCare','치료 및 생활 안내'],['visitReturn','다음 진료'],['visitCaution','주의사항']].forEach(([id,label])=>{
      const value=el(id).value.trim();if(!value)return;
      const heading=document.createElement('h4'),text=document.createElement('p');
      heading.textContent=label;text.textContent=value;el('ndMiniPlan').appendChild(heading);el('ndMiniPlan').appendChild(text);
    });
    function list(id,items,empty){
      el(id).innerHTML='';
      (items.length?items:[empty]).forEach(text=>{const item=document.createElement('li');item.textContent=text;el(id).appendChild(item);});
    }
    const files=(state?.files||[]).filter(file=>file.include);
    list('ndMiniAttachments',files.map(file=>file.title||'검사 결과'),'선택한 검사 이미지 없음');
    const sections=education?.sections.filter((item,index)=>indices.includes(index))||[];
    list('ndMiniEducation',sections.map(item=>item.title.replace(/^\d+\.\s*/,'')),'선택한 교육자료 없음');
    el('ndMiniCount').textContent='교육 '+sections.length+'개 · 첨부 '+files.length+'장';
  }
  function arrange(){
    const editor=el('docStage_stage5_followup').querySelector('.visit-editor');
    const files=el('vmEditor');
    if(files&&files.parentNode!==editor){
      files.remove();
      editor.insertBefore(files,editor.querySelector('.education-picker'));
    }
    const previewButton=el('vmPreviewButton');
    if(previewButton&&previewButton.parentNode!==el('ndPreviewAction'))el('ndPreviewAction').appendChild(previewButton);
    const preview=el('vmPreview');
    if(preview&&preview.parentNode!==el('ndPreviewArea'))el('ndPreviewArea').appendChild(preview);
    const approval=el('docPatientLeafletArea').querySelector('.edu-plan');
    if(approval)el('ndEducationApproval').appendChild(approval);
    syncChrome();
    updateMini();
  }
  function syncChrome(){
    const active=el('btnModeDoctor').classList.contains('active')&&AppState.activeDocStage==='stage5_followup';
    document.body.classList.toggle('nd-followup-workspace',active);
    document.querySelectorAll('#doctor5StageNav .nav-btn').forEach((button,index)=>{
      if(button.classList.contains('active'))button.setAttribute('aria-current','step');
      else button.setAttribute('aria-current','false');
      button.setAttribute('data-step',String(index+1).padStart(2,'0'));
    });
  }
  window.NeuroFollowupWorkspace={arrange,updateMini,beforeEducationRender(){
    const previous=el('ndEducationApproval').querySelector('.edu-plan');
    if(previous)previous.remove();
  }};
  const oldMode=switchMode;
  switchMode=function(mode){oldMode(mode);syncChrome();};
  const oldRender=renderDoctorStage;
  renderDoctorStage=function(){oldRender();syncChrome();};
  window.addEventListener('load',arrange);
})();
