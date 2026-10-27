# NeuroDesk Clinical — 잔여 10개 모듈 확장 결과

기준일: 2026-10-27. 사용자의 전체 구현·병합 승인에 따라 모듈별 브랜치/PR로 진행했습니다. 어지럼(PR4) 다음 인지·수면·말초신경·운동장애·실신·발작·보행·근력·이명·기타 순서입니다.

## 범위와 파일

12개 증상군 유지. 기존 전체 28개 경로에서 72개 경로(44개 추가), 이번 10개 증상군은 14개에서 58개로 확장했습니다. 경로는 질환·증후군·응급 감별을 포함하므로 72개 독립 질환을 뜻하지 않습니다. 기존 경로 ID를 유지했습니다.

- `index.html`: 추가 CSS/모듈 스크립트 연결
- `clinical/module-review.js`, `clinical/module-review.css`: 추가 질환의 의사 검토·수동 선택·추적·출력 연동
- `clinical/modules/*.js`: 10개 모듈의 독립 데이터
- `tests/`: 보존 기준·모의 실행 검사
- `docs/*-clinical-review.md`, `docs/*-test-results.json`: 모듈별 근거/열람 범위/국내 상태/실제 결과

완료된 두통·어지럼 런타임 6파일과 척도 런타임 3파일은 기준 main과 SHA256 일치를 검사했습니다. PNG 원본도 수정하지 않았습니다. 공통 PNG는 증상군 참고이며 새 질환에 부정확하게 붙이지 않고 평가·관리 흐름 SVG를 제공합니다. 실제 이미지 디코딩은 미시험입니다.

## 모듈별 경로와 검토 문서

|모듈|기존 → 현재 경로|상세|
|---|---|---|
|인지장애|2 → 9|[cognition](cognition-clinical-review.md)|
|수면장애|2 → 8|[sleep](sleep-clinical-review.md)|
|저림·말초신경|2 → 6|[numbness](numbness-clinical-review.md)|
|떨림·운동장애|2 → 6|[tremor](tremor-clinical-review.md)|
|실신·자율신경|1 → 4|[syncope](syncope-clinical-review.md)|
|발작·뇌전증|1 → 5|[seizure](seizure-clinical-review.md)|
|보행·균형|1 → 7|[gait](gait-clinical-review.md)|
|근력저하|1 → 6|[weakness](weakness-clinical-review.md)|
|이명|1 → 4|[tinnitus](tinnitus-clinical-review.md)|
|기타 신경과 증상|1 → 3|[other](other-clinical-review.md)|

## 주요 권고 차이와 안전 처리

|영역|반영 내용·한계|
|---|---|
|인지|MCI/섬망/치매 원인 구분, DLB와 FTD 치료 혼동 방지, NPH 음성 탭 검사만으로 배제 안 함|
|수면|CBT-I 우선, OSA 검사 적응증, RLS 2025 도파민계 표준 사용 반대/augmentation 주의, CSA ASV는 전문기관 조건부 검토|
|본태떨림|MDS 2019 유용성 평가와 2026 modified GRADE의 낮은 확실성을 구분. 2026 결론을 약물 무효로 해석하지 않음|
|실신|ECG·심장성 위험 우선, POTS 수치 기준 미검증 부분은 직접 확인 필요|
|발작|ILAE 2025 분류, 기원 불명/미분류는 국소·전신 약물 후보 자동 연결 안 함. 기능성 발작과 동반 뇌전증 감별|
|급성 약화/지속발작|영상/외래검사로 전원을 지연하지 않는 응급 평가 경로. 재관류·응급 약물 수치 용량 자동 제공 안 함|
|이명|비박동/박동/편측·비대칭 난청/돌발성 난청 구분, 모든 이명 영상 검사나 betahistine 치료 연결 안 함|
|기타|삼차신경통 기존 연결 유지, 반측성 안면경련 근거 종류와 안면마비 치료 시간창/안구 보호 구분|

## 출처 관리

새 10개 모듈에서 사용하는 고유 출처 40개. 아래는 실제 열람 범위입니다. 공식 검색 본문·초록·요약만 확인한 자료를 원문 전체 열람으로 표시하지 않았습니다. 최신 공식 자료를 우선했지만 모든 질환의 최신 약제/권고를 완전 수집했다고 주장하지 않습니다. 권고 등급은 확인한 경우만 기록했습니다.

- [Alzheimer’s Association DETeCD-ADRD primary-care executive recommendations](https://pmc.ncbi.nlm.nih.gov/articles/PMC12173843/) — 2024-12-23 / 2025 권호 / 진단 가이드라인 / 공식 논문 검색 본문/초록 확인
- [NICE NG97 Dementia: assessment, management and support](https://www.nice.org.uk/guidance/ng97/chapter/Recommendations) — 2018, 현행 웹 권고 확인 / 진료지침/공식 권고 / 공식 권고 검색 본문 확인; 직접 페이지 접근 제한
- [식약처 아도페정5mg 품목 201907443 허가사항](https://nedrug.mfds.go.kr/pbp/CCBBB01/getItemDetailCache?cacheSeq=201907443aupdateTs2026-09-18+22%3A39%3A22.0b) — 2026-09-18 캐시, 2026-10-27 확인 / 대한민국 품목 허가 / 적응증·용량·금기·주의 본문 확인. 급여 인정기준 확인과 별개
- [FDA: Additional earlier MRI monitoring for Leqembi](https://www.fda.gov/drugs/drug-safety-communications/fda-recommend-additional-earlier-mri-monitoring-patients-alzheimers-disease-taking-leqembi-lecanemab) — 2025 / 미국 안전성 공지 / FDA 공식 검색 본문 확인; 국내 허가/급여 주장 아님
- [Guidelines for Management of Idiopathic Normal Pressure Hydrocephalus, Third Edition](https://pmc.ncbi.nlm.nih.gov/articles/PMC7905302/) — 2021 / 일본학회 지침 / 공식 논문 검색 본문 확인; PMC 직접 접근 CAPTCHA
- [NICE CG103 Delirium: assessment and diagnosis update](https://www.nice.org.uk/guidance/cg103/resources/delirium-prevention-diagnosis-and-management-35109327290821) — 2023 / 진료지침/공식 권고 / 공식 권고 PDF 검색 본문 확인
- [European Insomnia Guideline 2023](https://doi.org/10.1111/jsr.14035) — 2023 / 진료지침/공식 권고 / 공식 논문 권고표 검색 본문·ESRS 지침 목록 확인; 직접 본문 403
- [AASM Diagnostic Testing for Adult OSA](https://aasm.org/resources/clinicalguidelines/diagnostic-testing-osa.pdf) — 2017 / 진료지침/공식 권고 / 공식 지침 PDF 검색 본문 확인
- [AASM Treatment of Adult OSA with Positive Airway Pressure](https://pmc.ncbi.nlm.nih.gov/articles/PMC6374094/) — 2019 / 진료지침/공식 권고 / 공식 논문 권고 검색 본문 확인
- [AASM Treatment of RLS and PLMD](https://www.irlssg.org/wp-content/uploads/2025/05/Tx-of-RLS-and-PLMD-2025.pdf) — 2025 / 진료지침/공식 권고 / 발표된 지침 권고/등급 검색 본문 확인; 공개 의견수렴 초안 사용 안 함
- [AASM Management of REM Sleep Behavior Disorder](https://pmc.ncbi.nlm.nih.gov/articles/PMC10071384/) — 2023 / 진료지침/공식 권고 / 공식 논문 검색 본문 확인; 직접 페이지 CAPTCHA
- [AASM Treatment of Central Disorders of Hypersomnolence](https://aasm.org/wp-content/uploads/2022/03/Treatment_Central_Disorders_Hypersomnolence_Guideline_at_a_Glance.pdf) — 2021 / 진료지침/공식 권고 / 공식 요약의 약제·권고 강도 확인
- [AASM Intrinsic Circadian Rhythm Sleep-Wake Disorders](https://aasm.org/resources/clinicalguidelines/crswd-intrinsic.pdf) — 2015 / 진료지침/공식 권고 / 공식 지침 검색 본문·대상별 제한 확인
- [AASM Treatment of Central Sleep Apnea in Adults](https://aasm.org/wp-content/uploads/2026/02/central-sleep-apnea-guideline-AASM-2025.pdf) — 2025-12 / 진료지침/공식 권고 / 공식 PDF 본문·ASV HFrEF 제한 확인
- [Diagnosis and management of patients with polyneuropathy](https://www.cmaj.ca/content/cmaj/195/6/E227.full.pdf) — 2023-02-13 / 임상 종설; 진료지침 자체 아님 / 논문 본문 검색 확인
- [AAN Oral and Topical Treatment of Painful Diabetic Polyneuropathy](https://www.aan.com/Guidelines/home/GetGuidelineContent/1055) — 2021-12-27 / 2022 권호 / 진료지침/공식 권고 / 공식 의료진 요약 PDF 본문 확인
- [NICE NG127 Suspected neurological conditions: recognition and referral](https://www.nice.org.uk/guidance/ng127/chapter/Recommendations-for-adults-aged-over-16) — 2019, 현행 웹 권고 확인 / 진료지침/공식 권고 / 공식 권고 검색 본문 확인; 직접 페이지 접근 제한
- [AAOS Management of Carpal Tunnel Syndrome](https://www.aaos.org/globalassets/quality-and-practice-resources/carpal-tunnel/orthoguidelines_infographic_cts-6-5-24.pdf) — 2024 / 진료지침/공식 권고 / 발표된 공식 권고 요약 확인
- [EAN/PNS Guideline on diagnosis and treatment of Guillain–Barré syndrome](https://onlinelibrary.wiley.com/doi/10.1111/ene.16073) — 2023 / 진료지침/공식 권고 / 발표된 최종 논문 본문 확인; 의견수렴 초안 미사용
- [MDS Consensus Statement on Classification of Tremors](https://pmc.ncbi.nlm.nih.gov/articles/PMC6530552/) — 2018 / 진단 분류 합의문 / 공식 논문 검색 본문 확인
- [MDS Evidence-Based Review of Treatments for Essential Tremor](https://www.movementdisorders.org/MDS-Files1/PDFs/EBM-Papers/Ferreira_et_al-2019-Movement_Disorders.pdf) — 2019 / 근거 검토 / 공식 PDF 검색 본문 확인; 2026 방법 변경과 비교
- [Update on Medical Treatments for Essential Tremor: MDS EBM Review](https://movementdisorders.onlinelibrary.wiley.com/doi/10.1002/mds.70184) — 2026 / 최신 근거 검토; 약물 무효 판정 아님 / 출판사 색인 본문·결론 확인; 직접 본문 403. 저/매우 낮은 확실성 및 결론 불충분을 표시
- [NICE NG71 Parkinson’s disease in adults](https://www.nice.org.uk/guidance/ng71/chapter/Recommendations) — 2017 / 2025 웹 개정 / 진료지침/공식 권고 / 공식 권고 검색 본문 확인
- [NICE CG109 Transient loss of consciousness in over 16s](https://www.nice.org.uk/guidance/cg109/chapter/Recommendations) — 2010 / 2023 개정 / 진료지침/공식 권고 / 공식 권고 검색 본문 확인
- [Orthostatic Hypotension in Adults With Hypertension: A Scientific Statement From the AHA](https://pmc.ncbi.nlm.nih.gov/articles/PMC11067441/) — 2024 / AHA 과학적 성명 / PMC 본문 확인; AHA 직접 페이지 403
- [Diagnosis and management of POTS](https://pmc.ncbi.nlm.nih.gov/articles/PMC8920526/) — 2022-03-14 / 합의문 기반 임상 종설 / 공식 논문 검색 본문 확인; 직접 페이지 CAPTCHA
- [NICE NG217 Epilepsies: diagnosis and treatment](https://www.nice.org.uk/guidance/ng217/chapter/5-Treating-epileptic-seizures-in-children-young-people-and-adults) — 2022 / 2025 개정 / 진료지침/공식 권고 / 공식 진단·치료 검색 본문 확인; 일부 직접 장 접근 실패
- [ILAE Updated classification of epileptic seizures](https://www.ilae.org/guidelines/definition-and-classification/updated-classification-of-epileptic-seizures-2025) — 2025-04-23 / 공식 분류 입장문 / 공식 학회 본문 확인; 의견수렴 초안 아닌 최종 분류
- [AAN Management of Functional Seizures](https://aanfiles.blob.core.windows.net/guidelines/2cceae40-edcf-484d-9054-bbdf76206bca/25_FunctionalSeizure-ClinGL_v03b.pdf) — 2025 승인 / 2026 발표 / 진료지침/공식 권고 / 발표된 공식 의료진 권고 요약 확인
- [NICE NG249 Falls assessment and prevention](https://www.nice.org.uk/guidance/ng249/chapter/Recommendations) — 2025-04-29 / 진료지침/공식 권고 / 공식 권고 검색 본문 확인
- [AHA/ASA Early Management of Acute Ischemic Stroke](https://www.ahajournals.org/doi/10.1161/STR.0000000000000513) — 2026-01-26 / 진료지침/공식 권고 / 공식 발표·AHA 요약 확인; 상세 투여 프로토콜 미구현
- [Bilateral vestibulopathy: Diagnostic criteria](https://journals.sagepub.com/doi/10.3233/VES-170619) — 2017-09-23 온라인 / 공식 합의문 / 본문 확인
- [Vestibular Rehabilitation for Peripheral Vestibular Hypofunction: An Updated Clinical Practice Guideline](https://pmc.ncbi.nlm.nih.gov/articles/PMC8920012/) — 2022-04 권호 / ANPT/APTA 진료지침 / 공식 논문 검색 본문 및 ANPT 현행 지침 목록 확인
- [Clinical Practice Guideline for Degenerative Cervical Myelopathy](https://pmc.ncbi.nlm.nih.gov/articles/5684840/) — 2017-09-05 / 진료지침/공식 권고 / 발표된 지침 권고/강도 검색 본문 확인
- [International Consensus Guidance for Management of Myasthenia Gravis: 2020 Update](https://pmc.ncbi.nlm.nih.gov/articles/pmid/33144515/) — 2020 온라인 / 2021-01-19 권호 / 진료지침/공식 권고 / 발표된 국제 합의 권고 검색 본문 확인; 신약 전체 비교는 미확인
- [NICE NG155 Tinnitus: assessment and management](https://www.nice.org.uk/guidance/ng155/chapter/Recommendations) — 2020 / 진료지침/공식 권고 / 공식 권고 검색 본문 확인; 직접 페이지 403
- [EAN guideline on trigeminal neuralgia](https://onlinelibrary.wiley.com/doi/10.1111/ene.13950) — 2019-03-12 / 진료지침/공식 권고 / 앞선 두통 모듈에서 본문 확인; 공통 근거 재사용
- [Cochrane Botulinum toxin type A for hemifacial spasm](https://www.cochrane.org/evidence/CD004899_botulinum-toxin-injections-unilateral-involuntary-contractions-facial-muscles) — 2020 / 체계적 문헌고찰 / 공식 요약 본문 확인; 적격 위약대조 RCT 부재
- [Comparative efficacy and safety of BoNT-A in blepharospasm and hemifacial spasm](https://pubmed.ncbi.nlm.nih.gov/42313173/) — 2026-09 / 체계적 문헌고찰 / 발표 논문 초록/비교 대상 확인; 제형 간 용량 동등성 자동 환산 안 함
- [AAO-HNS Clinical Practice Guideline: Bell’s Palsy](https://www.entnet.org/quality-practice/quality-products/clinical-practice-guidelines/bells-palsy/) — 2013 / 진료지침/공식 권고 / 공식 지침 페이지·발표 요약 권고 검색 본문 확인; 전체판 직접 403

## 대한민국 허가·급여

아도페정 품목 201907443의 AD 증상 치료 허가 및 제품 용법·주의 일부를 식약처 공식 품목 자료로 확인했습니다. 다른 donepezil 품목이나 모든 AChE 억제제로 확대 적용하지 않습니다. 저체중 85세 이상 여성의 해당 품목 용량 제한을 별도 표시했습니다. 그 외 수치 용량은 미확인 상태로 남겼습니다.

환자별 급여 인정·조건·공급, 다른 약제의 국내 허가/적응증은 미확인입니다. 약가 등재만으로 적응증 급여를 인정하지 않습니다. 해외 규제·급여 조건은 국내 법적 기준으로 표시하지 않습니다. 원내/외부 검사 시행 여부도 확인 필요입니다.

## 실제 실행 결과

Node VM + 모의 DOM 실행이며 브라우저 UI 시험이 아닙니다. `other-test-results.json`에 최종 전체 결과를 보관했습니다. 기본 회귀가 각 검사 파일에서 반복 실행되는 중복 횟수는 총합에 한 번만 계산했습니다.

|검사|PASS|
|---|---:|
|regression|137|
|remaining|1261|
|headache|247|
|dizziness|388|
|scales|594|
|중복 회귀 제외 총합|2627|

신규 10개 모듈 사례 88개, 두통 8개, 어지럼 11개 PASS. FAIL 0. 이는 코드 동작 확인이며 임상적 유효성 검증을 뜻하지 않습니다.

조건부 질문 숨김/응답 제거, 위험 응답·의료진 안내, 경로별 검사/치료/교육, 선택 후 안내 초안·EMR, 경로 변경·복귀 초기화, 미입력/경계값, 재진·새 환자, 승인 후 내용 변경/비동기 인쇄 취소, 기존 척도 연결과 파일 참조를 검사했습니다.

NOT TESTED: 실제 브라우저/모바일/접근성, PNG 표시·디코딩, OS 클립보드 권한, A4 레이아웃·실제 프린터, 외부 링크 클릭 이동, Netlify 배포, 전문의 임상 검수, 미확인 국내 허가/급여.

## 전문의 최종 검수 항목

1. 질환별 핵심 확인 항목의 충분성, 감별·의뢰·긴급도. 진단 체크는 공식 기준 전문이 아님.
2. 약제 선택과 금기·상호작용·고령/신장/임신 상황의 누락, 국내 제품별 실제 처방/급여.
3. 질환별 환자 교육과 공통 경고/추적 문구의 충분성, 새 SVG와 기존 PNG 적합성.
4. POTS·비전형 파킨슨증·급속 인지저하·중추성 과다졸림·신경근접합부 등 전문 평가 경로의 상세화 필요성.
5. 실제 진료 환경의 모바일·출력·배포 화면 확인.

단일 HTML 내장 배포가 아닙니다. index.html, clinical/, scales/, 루트 PNG를 포함한 저장소 전체가 필요합니다. GitHub 병합은 Netlify 실제 배포 검증과 별개입니다.
