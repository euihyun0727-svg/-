/* Presentation only: keep existing controls, handlers and visit state. */
(function(){
  'use strict';
  const el=id=>document.getElementById(id);
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
  window.NeuroFollowupWorkspace={arrange,beforeEducationRender(){
    const previous=el('ndEducationApproval').querySelector('.edu-plan');
    if(previous)previous.remove();
  }};
  const oldMode=switchMode;
  switchMode=function(mode){oldMode(mode);syncChrome();};
  const oldRender=renderDoctorStage;
  renderDoctorStage=function(){oldRender();syncChrome();};
  window.addEventListener('load',arrange);
})();
