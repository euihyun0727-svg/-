/* 공개 한국어 전자 평가 허용 근거를 확인한 도구만 포함. Reviewed 2026-10-27. */
window.NEURO_SCALE_CATALOG = {
  "schemaVersion": 2,
  "reviewed": "2026-10-27",
  "deploymentScope": "한국어·공개 정적 웹앱",
  "groups": {
    "headache": "두통",
    "dizziness": "어지럼·전정",
    "cognition": "치매·인지",
    "sleep": "수면",
    "mood": "우울·불안",
    "other": "기타 신경과"
  },
  "sources": {
    "phq": {
      "label": "Pfizer PHQ Screeners",
      "url": "https://www.phqscreeners.com/select-screener",
      "access": "본문 확인",
      "kind": "권리자 공식 안내",
      "note": "PHQ/GAD 및 번역의 복제·표시·배포 허용 안내 확인. 한국어는 INfORM 승인 27Oct2019 번역판을 사용."
    },
    "phqManual": {
      "label": "PHQ/GAD 공식 사용 설명서",
      "url": "https://www.phqscreeners.com/images/sites/g/files/g10016261/f/201412/instructions.pdf",
      "access": "PDF 본문 확인",
      "kind": "개발자 공식 설명서",
      "note": "p.3·6·7: 범위·합산·선별 기준과 번역판의 PHQ-2/8·GAD-2 구성 허용 확인. 진단 자동화는 하지 않음."
    },
    "fourat": {
      "label": "4AT 한국어 공식 배포",
      "url": "https://www.the4at.com/4at-korean",
      "access": "본문·연결 PDF 본문 확인",
      "kind": "개발자 공식 배포",
      "note": "한국어 v1.2 배포 확인. 번역자·개별 한국어 검증 논문은 확인 필요."
    },
    "fouratPdf": {
      "label": "4AT 한국어 v1.2 원본",
      "url": "https://www.the4at.com/wp-content/uploads/2026/07/4AT_Korean_version.pdf",
      "access": "PDF 1쪽 본문 확인",
      "kind": "공식 한국어 원본",
      "note": "4개 항목·선택지·배점·총점 구간을 원본과 대조. PDF 시각 검증은 미실시."
    },
    "fouratTerms": {
      "label": "4AT CC BY 4.0 이용 조건",
      "url": "https://www.the4at.com/attribution",
      "access": "본문 확인",
      "kind": "권리자 이용 조건",
      "note": "복제·공유·각색 및 상업적 이용 허용. 출처·라이선스·변경사항 표시 및 면책 유지."
    },
    "fouratGuide": {
      "label": "4AT 공식 채점 안내",
      "url": "https://www.the4at.com/userguide",
      "access": "본문 확인",
      "kind": "개발자",
      "note": "0~12, 4 이상 섬망 가능, 1~3 인지장애 가능. 0점도 배제 진단 아님."
    },
    "informKo": {
      "label": "INfORM 한국어 평가도구 · 27Oct2019",
      "url": "https://inform-iadr.com/wp-content/uploads/2024/03/DC-TMD-Korean-Assessment-Instruments_2019_10_27.pdf",
      "access": "공식 번역 목록 연결 및 PDF 텍스트 확인 · 화면 이미지 대조는 미완료",
      "kind": "한국어 번역 배포 학술 컨소시엄",
      "note": "PHQ-4 p.48 / PHQ-9 p.50 / GAD-7 p.52(인쇄된 쪽 번호). 해당 한국어 페이지의 복제·번역·표시·배포 허용 문구와 번역자 표시를 확인. 이 웹 구현의 별도 임상 검증은 아님."
    },
    "informTranslations": {
      "label": "INfORM 공식 번역 목록",
      "url": "https://inform-iadr.com/index.php/tmd-assessmentdiagnosis/dc-tmd-translations/",
      "access": "본문 및 한국어 PDF 링크 확인",
      "kind": "번역판 공식 배포 목록",
      "note": "Korean Completed Oct2019 · Jin-Woo Chung, Ji-Woon Park."
    },
    "phqTerms": {
      "label": "PHQ Screeners 이용 조건",
      "url": "https://www.phqscreeners.com/terms",
      "access": "본문 확인",
      "kind": "권리자",
      "note": "PHQ 자료의 일반 저작권 제한 예외와 임상의 확인·임상 진단 필요 조건 확인."
    }
  },
  "scales": [
    {
      "id": "phq9",
      "abbr": "PHQ-9",
      "name": "Patient Health Questionnaire-9",
      "groups": [
        "mood",
        "cognition",
        "sleep",
        "headache",
        "other"
      ],
      "purpose": "우울 증상 선별과 중증도",
      "method": "환자 자가보고 · 의료진이 원문을 읽고 환자의 응답을 입력할 수 있음",
      "items": "9",
      "duration": "확인 필요",
      "scoreRange": "0~27",
      "interpretation": "공식 매뉴얼 근거 구간만 표시 · 확정 진단 아님",
      "korean": "INfORM 27Oct2019 한국어 번역판 확인 · 이 판본의 독립 검증 연구/웹 구현 임상 검증은 미확인",
      "grade": "A",
      "license": "한국어 페이지에 복제·번역·표시·배포의 별도 허가 불필요 명시 · 출처·저작권·번역자 표시 유지",
      "electronic": "한국어 해당 판본의 복제·표시·배포 허용 문구에 근거해 공개 웹 입력 UI 제공",
      "internalUse": "해당 판본의 명시적 허용 조건에 따라 제공",
      "insurance": "확인 필요 · 수가·인정기준 미검증",
      "paper": "보유",
      "source": "informKo",
      "sourceScope": "공식 INfORM 한국어 번역판 해당 페이지의 명시적 허용 문구·번역자 확인; Pfizer 공식 일반 조건·채점 매뉴얼 함께 확인",
      "evidence": [
        "informTranslations",
        "phq",
        "phqTerms",
        "phqManual"
      ],
      "reviewed": "2026-10-27",
      "manual": {
        "min": 0,
        "max": 27,
        "step": 1,
        "unit": "점",
        "interpretation": "phq9",
        "evidence": "https://www.phqscreeners.com/images/sites/g/files/g10016261/f/201412/instructions.pdf"
      },
      "rightsVerified": true,
      "electronicLanguage": "ko",
      "electronicVersion": "INfORM-27Oct2019",
      "sourceUrl": "https://inform-iadr.com/wp-content/uploads/2024/03/DC-TMD-Korean-Assessment-Instruments_2019_10_27.pdf#page=50"
    },
    {
      "id": "phq2",
      "abbr": "PHQ-2",
      "name": "Patient Health Questionnaire-2",
      "groups": [
        "mood",
        "cognition",
        "sleep",
        "other"
      ],
      "purpose": "우울 증상 단축 선별",
      "method": "환자 자가보고 · 의료진이 원문을 읽고 환자의 응답을 입력할 수 있음",
      "items": "2",
      "duration": "확인 필요",
      "scoreRange": "0~6",
      "interpretation": "공식 매뉴얼 근거 구간만 표시 · 확정 진단 아님",
      "korean": "INfORM 27Oct2019 한국어 번역판 확인 · 이 판본의 독립 검증 연구/웹 구현 임상 검증은 미확인",
      "grade": "A",
      "license": "한국어 페이지에 복제·번역·표시·배포의 별도 허가 불필요 명시 · 출처·저작권·번역자 표시 유지",
      "electronic": "한국어 해당 판본의 복제·표시·배포 허용 문구에 근거해 공개 웹 입력 UI 제공",
      "internalUse": "해당 판본의 명시적 허용 조건에 따라 제공",
      "insurance": "확인 필요 · 수가·인정기준 미검증",
      "paper": "미보유",
      "source": "informKo",
      "sourceScope": "공식 INfORM 한국어 번역판 해당 페이지의 명시적 허용 문구·번역자 확인; Pfizer 공식 일반 조건·채점 매뉴얼 함께 확인",
      "evidence": [
        "informTranslations",
        "phq",
        "phqTerms",
        "phqManual"
      ],
      "reviewed": "2026-10-27",
      "manual": {
        "min": 0,
        "max": 6,
        "step": 1,
        "unit": "점",
        "interpretation": "phq2",
        "evidence": "https://www.phqscreeners.com/images/sites/g/files/g10016261/f/201412/instructions.pdf"
      },
      "rightsVerified": true,
      "electronicLanguage": "ko",
      "electronicVersion": "INfORM-27Oct2019",
      "sourceUrl": "https://inform-iadr.com/wp-content/uploads/2024/03/DC-TMD-Korean-Assessment-Instruments_2019_10_27.pdf#page=50"
    },
    {
      "id": "gad7",
      "abbr": "GAD-7",
      "name": "Generalized Anxiety Disorder-7",
      "groups": [
        "mood",
        "headache",
        "dizziness",
        "sleep",
        "other"
      ],
      "purpose": "불안 증상 선별과 중증도",
      "method": "환자 자가보고 · 의료진이 원문을 읽고 환자의 응답을 입력할 수 있음",
      "items": "7",
      "duration": "확인 필요",
      "scoreRange": "0~21",
      "interpretation": "공식 매뉴얼 근거 구간만 표시 · 확정 진단 아님",
      "korean": "INfORM 27Oct2019 한국어 번역판 확인 · 이 판본의 독립 검증 연구/웹 구현 임상 검증은 미확인",
      "grade": "A",
      "license": "한국어 페이지에 복제·번역·표시·배포의 별도 허가 불필요 명시 · 출처·저작권·번역자 표시 유지",
      "electronic": "한국어 해당 판본의 복제·표시·배포 허용 문구에 근거해 공개 웹 입력 UI 제공",
      "internalUse": "해당 판본의 명시적 허용 조건에 따라 제공",
      "insurance": "확인 필요 · 수가·인정기준 미검증",
      "paper": "미보유",
      "source": "informKo",
      "sourceScope": "공식 INfORM 한국어 번역판 해당 페이지의 명시적 허용 문구·번역자 확인; Pfizer 공식 일반 조건·채점 매뉴얼 함께 확인",
      "evidence": [
        "informTranslations",
        "phq",
        "phqTerms",
        "phqManual"
      ],
      "reviewed": "2026-10-27",
      "manual": {
        "min": 0,
        "max": 21,
        "step": 1,
        "unit": "점",
        "interpretation": "gad7",
        "evidence": "https://www.phqscreeners.com/images/sites/g/files/g10016261/f/201412/instructions.pdf"
      },
      "rightsVerified": true,
      "electronicLanguage": "ko",
      "electronicVersion": "INfORM-27Oct2019",
      "sourceUrl": "https://inform-iadr.com/wp-content/uploads/2024/03/DC-TMD-Korean-Assessment-Instruments_2019_10_27.pdf#page=52"
    },
    {
      "id": "gad2",
      "abbr": "GAD-2",
      "name": "Generalized Anxiety Disorder-2",
      "groups": [
        "mood",
        "other"
      ],
      "purpose": "불안 증상 단축 선별",
      "method": "환자 자가보고 · 의료진이 원문을 읽고 환자의 응답을 입력할 수 있음",
      "items": "2",
      "duration": "확인 필요",
      "scoreRange": "0~6",
      "interpretation": "공식 매뉴얼 근거 구간만 표시 · 확정 진단 아님",
      "korean": "INfORM 27Oct2019 한국어 번역판 확인 · 이 판본의 독립 검증 연구/웹 구현 임상 검증은 미확인",
      "grade": "A",
      "license": "한국어 페이지에 복제·번역·표시·배포의 별도 허가 불필요 명시 · 출처·저작권·번역자 표시 유지",
      "electronic": "한국어 해당 판본의 복제·표시·배포 허용 문구에 근거해 공개 웹 입력 UI 제공",
      "internalUse": "해당 판본의 명시적 허용 조건에 따라 제공",
      "insurance": "확인 필요 · 수가·인정기준 미검증",
      "paper": "미보유",
      "source": "informKo",
      "sourceScope": "공식 INfORM 한국어 번역판 해당 페이지의 명시적 허용 문구·번역자 확인; Pfizer 공식 일반 조건·채점 매뉴얼 함께 확인",
      "evidence": [
        "informTranslations",
        "phq",
        "phqTerms",
        "phqManual"
      ],
      "reviewed": "2026-10-27",
      "manual": {
        "min": 0,
        "max": 6,
        "step": 1,
        "unit": "점",
        "interpretation": "gad2",
        "evidence": "https://www.phqscreeners.com/images/sites/g/files/g10016261/f/201412/instructions.pdf"
      },
      "rightsVerified": true,
      "electronicLanguage": "ko",
      "electronicVersion": "INfORM-27Oct2019",
      "sourceUrl": "https://inform-iadr.com/wp-content/uploads/2024/03/DC-TMD-Korean-Assessment-Instruments_2019_10_27.pdf#page=52"
    },
    {
      "id": "phq4",
      "abbr": "PHQ-4",
      "name": "Patient Health Questionnaire-4",
      "groups": [
        "mood",
        "other"
      ],
      "purpose": "우울·불안 초단축 선별",
      "method": "환자 자가보고 · 의료진이 원문을 읽고 환자의 응답을 입력할 수 있음",
      "items": "4",
      "duration": "확인 필요",
      "scoreRange": "0~12",
      "interpretation": "공식 매뉴얼 근거 구간만 표시 · 확정 진단 아님",
      "korean": "INfORM 27Oct2019 한국어 번역판 확인 · 이 판본의 독립 검증 연구/웹 구현 임상 검증은 미확인",
      "grade": "A",
      "license": "한국어 페이지에 복제·번역·표시·배포의 별도 허가 불필요 명시 · 출처·저작권·번역자 표시 유지",
      "electronic": "한국어 해당 판본의 복제·표시·배포 허용 문구에 근거해 공개 웹 입력 UI 제공",
      "internalUse": "해당 판본의 명시적 허용 조건에 따라 제공",
      "insurance": "확인 필요 · 수가·인정기준 미검증",
      "paper": "미보유",
      "source": "informKo",
      "sourceScope": "공식 INfORM 한국어 번역판 해당 페이지의 명시적 허용 문구·번역자 확인; Pfizer 공식 일반 조건·채점 매뉴얼 함께 확인",
      "evidence": [
        "informTranslations",
        "phq",
        "phqTerms",
        "phqManual"
      ],
      "reviewed": "2026-10-27",
      "manual": {
        "min": 0,
        "max": 12,
        "step": 1,
        "unit": "점",
        "interpretation": "phq4",
        "evidence": "https://www.phqscreeners.com/images/sites/g/files/g10016261/f/201412/instructions.pdf"
      },
      "rightsVerified": true,
      "electronicLanguage": "ko",
      "electronicVersion": "INfORM-27Oct2019",
      "sourceUrl": "https://inform-iadr.com/wp-content/uploads/2024/03/DC-TMD-Korean-Assessment-Instruments_2019_10_27.pdf#page=48"
    },
    {
      "id": "phq8",
      "abbr": "PHQ-8",
      "name": "Patient Health Questionnaire-8",
      "groups": [
        "mood",
        "other"
      ],
      "purpose": "우울 증상 중증도 · 자해 문항 없음",
      "method": "환자 자가보고 · 의료진이 원문을 읽고 환자의 응답을 입력할 수 있음",
      "items": "8",
      "duration": "확인 필요",
      "scoreRange": "0~24",
      "interpretation": "공식 매뉴얼 근거 구간만 표시 · 확정 진단 아님",
      "korean": "INfORM 27Oct2019 한국어 번역판 확인 · 이 판본의 독립 검증 연구/웹 구현 임상 검증은 미확인",
      "grade": "A",
      "license": "한국어 페이지에 복제·번역·표시·배포의 별도 허가 불필요 명시 · 출처·저작권·번역자 표시 유지",
      "electronic": "한국어 해당 판본의 복제·표시·배포 허용 문구에 근거해 공개 웹 입력 UI 제공",
      "internalUse": "해당 판본의 명시적 허용 조건에 따라 제공",
      "insurance": "확인 필요 · 수가·인정기준 미검증",
      "paper": "미보유",
      "source": "informKo",
      "sourceScope": "공식 INfORM 한국어 번역판 해당 페이지의 명시적 허용 문구·번역자 확인; Pfizer 공식 일반 조건·채점 매뉴얼 함께 확인",
      "evidence": [
        "informTranslations",
        "phq",
        "phqTerms",
        "phqManual"
      ],
      "reviewed": "2026-10-27",
      "manual": {
        "min": 0,
        "max": 24,
        "step": 1,
        "unit": "점",
        "interpretation": "phq9",
        "evidence": "https://www.phqscreeners.com/images/sites/g/files/g10016261/f/201412/instructions.pdf"
      },
      "rightsVerified": true,
      "electronicLanguage": "ko",
      "electronicVersion": "INfORM-27Oct2019",
      "sourceUrl": "https://inform-iadr.com/wp-content/uploads/2024/03/DC-TMD-Korean-Assessment-Instruments_2019_10_27.pdf#page=50"
    },
    {
      "id": "fourat",
      "abbr": "4AT",
      "name": "4AT: Rapid Assessment Test for Delirium and Cognitive Impairment",
      "groups": [
        "cognition",
        "other"
      ],
      "purpose": "섬망·인지장애 신속 선별",
      "method": "의료진 시행 · 판본별 시행지침 확인 필요",
      "items": "4",
      "duration": "약 2분",
      "scoreRange": "0~12",
      "interpretation": "확인 필요 · 자동 해석 미제공",
      "korean": "공식 사이트의 한국어 v1.2 확인 · 번역자/한국어 개별 검증 논문은 확인 필요",
      "grade": "A",
      "license": "CC BY 4.0 · 출처·라이선스·변경사항·면책 표시 조건",
      "electronic": "한국어 v1.2 문항과 배점의 전자 표시 허용 확인",
      "internalUse": "CC BY 4.0 조건하 사용 가능",
      "insurance": "확인 필요 · 수가·인정기준 미검증",
      "paper": "미보유",
      "source": "fourat",
      "sourceScope": "개발자 한국어 배포·원본 PDF·이용조건 확인",
      "evidence": [
        "fouratPdf",
        "fouratTerms",
        "fouratGuide"
      ],
      "reviewed": "2026-10-27",
      "manual": {
        "min": 0,
        "max": 12,
        "step": 1,
        "unit": "점",
        "interpretation": "fourat",
        "evidence": "https://www.the4at.com/userguide"
      },
      "electronicLanguage": "ko",
      "electronicVersion": "1.2",
      "rightsVerified": true
    }
  ]
};
window.NEURO_SCALE_FORMS = {
  "fourat": {
    "language": "ko",
    "version": "1.2",
    "source": "https://www.the4at.com/wp-content/uploads/2026/07/4AT_Korean_version.pdf",
    "license": "https://creativecommons.org/licenses/by/4.0/",
    "attribution": "4AT © 2011–2014 Alasdair MacLullich, Tracy Ryan and Helen Cash. Licensed under CC BY 4.0.",
    "questions": [
      {
        "id": "alertness",
        "label": "[1] ALERTNESS (의식)",
        "instructions": [
          "현저하게 졸려하는(drowsy)환자 (환자평가 중 깨어나기 힘들거나 명백하게 졸려함) 또는 안절부절 /과활동성인 환자를 포함함",
          "환자를 관찰한 뒤, 자고 있다면 어깨를 살짝 건드리거나 말을 걸어 봄",
          "환자에게 자신의 이름을 말하게 하고 앞으로 묻는 질문에 답하라고 설명함."
        ],
        "options": [
          {
            "text": "정상 (평가하는 동안 완전히 명료함. 안절부절하지 않음)",
            "score": 0
          },
          {
            "text": "깨어난 뒤 10초 이내로 약간 졸려하나, 그 후 정상",
            "score": 0
          },
          {
            "text": "명백하게 비정상",
            "score": 4
          }
        ]
      },
      {
        "id": "amt4",
        "label": "[2] AMT4 (지남력)",
        "instructions": [
          "나이, 생일, 장소(건물 혹은 병원이름), 현재년도"
        ],
        "options": [
          {
            "text": "실수 없음",
            "score": 0
          },
          {
            "text": "실수 1개",
            "score": 1
          },
          {
            "text": "실수 2개 이상/측정불가",
            "score": 2
          }
        ]
      },
      {
        "id": "attention",
        "label": "[3] ATTENTION",
        "instructions": [
          "환자에게 “한 해의 달을 12월부터 거꾸로 얘기 해주세요.”라고 질문",
          "대답을 돕기 위해 “12월 전 달이 몇 월이죠?”라고 질문 가능"
        ],
        "options": [
          {
            "text": "한 해의 달을 거꾸로 말하기 7개 이상 정답",
            "score": 0
          },
          {
            "text": "대답하였으나 6개 이하 정답/ 대답 거부",
            "score": 1
          },
          {
            "text": "측정불가 (대답 불가한 상태(unwell), 졸려함, 집중 못함)",
            "score": 2
          }
        ]
      },
      {
        "id": "change",
        "label": "[4] ACUTE CHANGE OR FLUCTUATING COURSE (급성변화 또는 변동성)",
        "instructions": [
          "의식, 인지, 다른 정신기능(예; 편집증, 환각)의 중요한 변화나 변동이 보임",
          "2 주 이내 발생하였으며 최근 24 시간 이내 위 증상이 보임"
        ],
        "options": [
          {
            "text": "없음",
            "score": 0
          },
          {
            "text": "있음",
            "score": 4
          }
        ]
      }
    ],
    "max": 12,
    "instructions": [],
    "licenseLabel": "CC BY 4.0",
    "administration": "의료진이 관찰·질문·보호자 정보를 종합해 공식 지침에 따라 평가합니다.",
    "notes": "공식 한국어 v1.2 · 번역자 정보와 해당 번역판의 별도 검증 연구는 확인 필요.",
    "changes": "웹 입력·자동 합산 UI 추가, 개인정보 기입란 제외. 문항·선택지·배점 유지. 원 개발자의 보증·승인을 의미하지 않습니다. No warranty is given as to accuracy or fitness for purpose.",
    "footnote": "0점은 섬망과 인지장애를 확실히 배제하지는 못한다: 임상 상황에 따라 더욱 세부적인 평가가 필요할 수 있다."
  },
  "phq9": {
    "language": "ko",
    "version": "INfORM-27Oct2019",
    "source": "https://inform-iadr.com/wp-content/uploads/2024/03/DC-TMD-Korean-Assessment-Instruments_2019_10_27.pdf",
    "license": "https://www.phqscreeners.com/select-screener",
    "attribution": "Copyright Pfizer Inc. No permission required to reproduce, translate, display, or distribute. Korean translation by Jin-Woo Chung and Ji-Woon Park (Seoul National University).",
    "instructions": [
      "지난 2주 동안, 다음의 문제로 얼마나 자주 괴로웠습니까?"
    ],
    "administration": "자가보고 문항을 의료진이 원문대로 읽고 환자의 답을 입력합니다. 의료진의 추정으로 대신 답하지 마세요.",
    "notes": "한국어 INfORM 27Oct2019 번역판입니다. 국내 다른 번역판이나 국가건강검진 판본과 동일하다고 간주하지 마세요. 원문은 새로 번역하지 않았으며 줄바꿈만 화면에 맞췄습니다.",
    "changes": "선택 입력·합산 UI 추가, 상자 표시 지시를 화면 선택으로 대체, 개인정보 기입란 제외. 척도 문항·선택지·배점 유지. 번역판의 심리측정 검증과 이 웹 구현의 임상 검증은 별개입니다.",
    "licenseLabel": "복제·표시·배포 조건",
    "difficulty": {
      "label": "어떠한 문제라도 체크하였다면, 이러한 문제들이 당신이 일하거나, 집안일 하거나, 다른 사람과 어울릴 때 얼마나 어렵게 하였습니까?",
      "options": [
        "전혀 어렵지 않다.",
        "다소 어렵다.",
        "매우 어렵다.",
        "극히 심하게 어렵다."
      ]
    },
    "max": 27,
    "questions": [
      {
        "id": "q1",
        "label": "1. 무엇인가를 하는데 있어 즐거움이나 흥미가 거의 없음",
        "instructions": [],
        "options": [
          {
            "text": "전혀 아니다",
            "score": 0
          },
          {
            "text": "며칠",
            "score": 1
          },
          {
            "text": "날들의 반 이상",
            "score": 2
          },
          {
            "text": "거의 매일",
            "score": 3
          }
        ]
      },
      {
        "id": "q2",
        "label": "2. 기분이 슬프거나 우울하거나, 희망이 없음",
        "instructions": [],
        "options": [
          {
            "text": "전혀 아니다",
            "score": 0
          },
          {
            "text": "며칠",
            "score": 1
          },
          {
            "text": "날들의 반 이상",
            "score": 2
          },
          {
            "text": "거의 매일",
            "score": 3
          }
        ]
      },
      {
        "id": "q3",
        "label": "3. 잠들기 또는 잠자는 상태를 유지하기 어렵거나, 너무 많이 잔다.",
        "instructions": [],
        "options": [
          {
            "text": "전혀 아니다",
            "score": 0
          },
          {
            "text": "며칠",
            "score": 1
          },
          {
            "text": "날들의 반 이상",
            "score": 2
          },
          {
            "text": "거의 매일",
            "score": 3
          }
        ]
      },
      {
        "id": "q4",
        "label": "4. 피곤하거나 에너지가 별로 없다.",
        "instructions": [],
        "options": [
          {
            "text": "전혀 아니다",
            "score": 0
          },
          {
            "text": "며칠",
            "score": 1
          },
          {
            "text": "날들의 반 이상",
            "score": 2
          },
          {
            "text": "거의 매일",
            "score": 3
          }
        ]
      },
      {
        "id": "q5",
        "label": "5. 식욕이 떨어지거나 과식한다",
        "instructions": [],
        "options": [
          {
            "text": "전혀 아니다",
            "score": 0
          },
          {
            "text": "며칠",
            "score": 1
          },
          {
            "text": "날들의 반 이상",
            "score": 2
          },
          {
            "text": "거의 매일",
            "score": 3
          }
        ]
      },
      {
        "id": "q6",
        "label": "6. 스스로에 대하여 좋지 않게 생각되거나 자신이 실패자라는 생각이 들거나 자신이나 가족을 실망시켰다는 생각이 든다.",
        "instructions": [],
        "options": [
          {
            "text": "전혀 아니다",
            "score": 0
          },
          {
            "text": "며칠",
            "score": 1
          },
          {
            "text": "날들의 반 이상",
            "score": 2
          },
          {
            "text": "거의 매일",
            "score": 3
          }
        ]
      },
      {
        "id": "q7",
        "label": "7. 예를 들어 신문을 읽거나 텔레비전을 보는 것과 같은 일에 집중하는 것이 어렵다.",
        "instructions": [],
        "options": [
          {
            "text": "전혀 아니다",
            "score": 0
          },
          {
            "text": "며칠",
            "score": 1
          },
          {
            "text": "날들의 반 이상",
            "score": 2
          },
          {
            "text": "거의 매일",
            "score": 3
          }
        ]
      },
      {
        "id": "q8",
        "label": "8. 다른 사람들이 알아차릴 정도로 느리게 움직이거나 말한다. 혹은 반대로 가만히 있지 못하고 평상 시 보다 더 많이 움직인다.",
        "instructions": [],
        "options": [
          {
            "text": "전혀 아니다",
            "score": 0
          },
          {
            "text": "며칠",
            "score": 1
          },
          {
            "text": "날들의 반 이상",
            "score": 2
          },
          {
            "text": "거의 매일",
            "score": 3
          }
        ]
      },
      {
        "id": "q9",
        "label": "9. 자신이 죽어버리거나 스스로를 다치게 하는 것이 낫다고 생각한다.",
        "instructions": [],
        "options": [
          {
            "text": "전혀 아니다",
            "score": 0
          },
          {
            "text": "며칠",
            "score": 1
          },
          {
            "text": "날들의 반 이상",
            "score": 2
          },
          {
            "text": "거의 매일",
            "score": 3
          }
        ]
      }
    ],
    "safetyItem": 8
  },
  "gad7": {
    "language": "ko",
    "version": "INfORM-27Oct2019",
    "source": "https://inform-iadr.com/wp-content/uploads/2024/03/DC-TMD-Korean-Assessment-Instruments_2019_10_27.pdf",
    "license": "https://www.phqscreeners.com/select-screener",
    "attribution": "Copyright Pfizer Inc. No permission required to reproduce, translate, display, or distribute. Korean translation by Jin-Woo Chung and Ji-Woon Park (Seoul National University).",
    "instructions": [
      "지난 2주 동안, 다음의 문제로 얼마나 자주 괴로웠습니까?"
    ],
    "administration": "자가보고 문항을 의료진이 원문대로 읽고 환자의 답을 입력합니다. 의료진의 추정으로 대신 답하지 마세요.",
    "notes": "한국어 INfORM 27Oct2019 번역판입니다. 국내 다른 번역판이나 국가건강검진 판본과 동일하다고 간주하지 마세요. 원문은 새로 번역하지 않았으며 줄바꿈만 화면에 맞췄습니다.",
    "changes": "선택 입력·합산 UI 추가, 상자 표시 지시를 화면 선택으로 대체, 개인정보 기입란 제외. 척도 문항·선택지·배점 유지. 번역판의 심리측정 검증과 이 웹 구현의 임상 검증은 별개입니다.",
    "licenseLabel": "복제·표시·배포 조건",
    "difficulty": {
      "label": "어떠한 문제라도 체크했다면, 이러한 문제들이 당신이 일하거나, 집안일 하거나, 다른 사람과 어울릴 때 얼마나 어려움을 줍니까?",
      "options": [
        "전혀 어렵지 않다.",
        "다소 어렵다.",
        "매우 어렵다.",
        "극히 심하게 어렵다."
      ]
    },
    "max": 21,
    "questions": [
      {
        "id": "q1",
        "label": "1. 긴장되거나, 불안하거나, 초조함",
        "instructions": [],
        "options": [
          {
            "text": "전혀 아니다",
            "score": 0
          },
          {
            "text": "며칠",
            "score": 1
          },
          {
            "text": "반 이상의 날",
            "score": 2
          },
          {
            "text": "거의 매일",
            "score": 3
          }
        ]
      },
      {
        "id": "q2",
        "label": "2. 걱정을 조절하거나 멈출 수 없음",
        "instructions": [],
        "options": [
          {
            "text": "전혀 아니다",
            "score": 0
          },
          {
            "text": "며칠",
            "score": 1
          },
          {
            "text": "반 이상의 날",
            "score": 2
          },
          {
            "text": "거의 매일",
            "score": 3
          }
        ]
      },
      {
        "id": "q3",
        "label": "3. 다양한 일에 관하여 너무 많이 걱정함",
        "instructions": [],
        "options": [
          {
            "text": "전혀 아니다",
            "score": 0
          },
          {
            "text": "며칠",
            "score": 1
          },
          {
            "text": "반 이상의 날",
            "score": 2
          },
          {
            "text": "거의 매일",
            "score": 3
          }
        ]
      },
      {
        "id": "q4",
        "label": "4. 긴장을 푸는 것이 어려움",
        "instructions": [],
        "options": [
          {
            "text": "전혀 아니다",
            "score": 0
          },
          {
            "text": "며칠",
            "score": 1
          },
          {
            "text": "반 이상의 날",
            "score": 2
          },
          {
            "text": "거의 매일",
            "score": 3
          }
        ]
      },
      {
        "id": "q5",
        "label": "5. 안절부절 못해서 가만히 앉아 있기 힘듦",
        "instructions": [],
        "options": [
          {
            "text": "전혀 아니다",
            "score": 0
          },
          {
            "text": "며칠",
            "score": 1
          },
          {
            "text": "반 이상의 날",
            "score": 2
          },
          {
            "text": "거의 매일",
            "score": 3
          }
        ]
      },
      {
        "id": "q6",
        "label": "6. 쉽게 짜증이 나거나 화가 남.",
        "instructions": [],
        "options": [
          {
            "text": "전혀 아니다",
            "score": 0
          },
          {
            "text": "며칠",
            "score": 1
          },
          {
            "text": "반 이상의 날",
            "score": 2
          },
          {
            "text": "거의 매일",
            "score": 3
          }
        ]
      },
      {
        "id": "q7",
        "label": "7. 무언가 안 좋은 일이 일어날 것 같아 두려움",
        "instructions": [],
        "options": [
          {
            "text": "전혀 아니다",
            "score": 0
          },
          {
            "text": "며칠",
            "score": 1
          },
          {
            "text": "반 이상의 날",
            "score": 2
          },
          {
            "text": "거의 매일",
            "score": 3
          }
        ]
      }
    ]
  },
  "phq2": {
    "language": "ko",
    "version": "INfORM-27Oct2019",
    "source": "https://inform-iadr.com/wp-content/uploads/2024/03/DC-TMD-Korean-Assessment-Instruments_2019_10_27.pdf",
    "license": "https://www.phqscreeners.com/select-screener",
    "attribution": "Copyright Pfizer Inc. No permission required to reproduce, translate, display, or distribute. Korean translation by Jin-Woo Chung and Ji-Woon Park (Seoul National University).",
    "instructions": [
      "지난 2주 동안, 다음의 문제로 얼마나 자주 괴로웠습니까?"
    ],
    "administration": "자가보고 문항을 의료진이 원문대로 읽고 환자의 답을 입력합니다. 의료진의 추정으로 대신 답하지 마세요.",
    "notes": "한국어 INfORM 27Oct2019 번역판입니다. 국내 다른 번역판이나 국가건강검진 판본과 동일하다고 간주하지 마세요. 원문은 새로 번역하지 않았으며 줄바꿈만 화면에 맞췄습니다.",
    "changes": "선택 입력·합산 UI 추가, 상자 표시 지시를 화면 선택으로 대체, 개인정보 기입란 제외. 척도 문항·선택지·배점 유지. 번역판의 심리측정 검증과 이 웹 구현의 임상 검증은 별개입니다.",
    "licenseLabel": "복제·표시·배포 조건",
    "difficulty": null,
    "max": 6,
    "questions": [
      {
        "id": "q1",
        "label": "1. 무엇인가를 하는데 있어 즐거움이나 흥미가 거의 없음",
        "instructions": [],
        "options": [
          {
            "text": "전혀 아니다",
            "score": 0
          },
          {
            "text": "며칠",
            "score": 1
          },
          {
            "text": "날들의 반 이상",
            "score": 2
          },
          {
            "text": "거의 매일",
            "score": 3
          }
        ]
      },
      {
        "id": "q2",
        "label": "2. 기분이 슬프거나 우울하거나, 희망이 없음",
        "instructions": [],
        "options": [
          {
            "text": "전혀 아니다",
            "score": 0
          },
          {
            "text": "며칠",
            "score": 1
          },
          {
            "text": "날들의 반 이상",
            "score": 2
          },
          {
            "text": "거의 매일",
            "score": 3
          }
        ]
      }
    ],
    "derivation": "공식 PHQ 매뉴얼 p.3·7에 따라 같은 한국어 PHQ-9의 앞 2문항으로 구성. 독립된 한국어 PHQ-2 배포본이나 검증판이라고 주장하지 않습니다."
  },
  "gad2": {
    "language": "ko",
    "version": "INfORM-27Oct2019",
    "source": "https://inform-iadr.com/wp-content/uploads/2024/03/DC-TMD-Korean-Assessment-Instruments_2019_10_27.pdf",
    "license": "https://www.phqscreeners.com/select-screener",
    "attribution": "Copyright Pfizer Inc. No permission required to reproduce, translate, display, or distribute. Korean translation by Jin-Woo Chung and Ji-Woon Park (Seoul National University).",
    "instructions": [
      "지난 2주 동안, 다음의 문제로 얼마나 자주 괴로웠습니까?"
    ],
    "administration": "자가보고 문항을 의료진이 원문대로 읽고 환자의 답을 입력합니다. 의료진의 추정으로 대신 답하지 마세요.",
    "notes": "한국어 INfORM 27Oct2019 번역판입니다. 국내 다른 번역판이나 국가건강검진 판본과 동일하다고 간주하지 마세요. 원문은 새로 번역하지 않았으며 줄바꿈만 화면에 맞췄습니다.",
    "changes": "선택 입력·합산 UI 추가, 상자 표시 지시를 화면 선택으로 대체, 개인정보 기입란 제외. 척도 문항·선택지·배점 유지. 번역판의 심리측정 검증과 이 웹 구현의 임상 검증은 별개입니다.",
    "licenseLabel": "복제·표시·배포 조건",
    "difficulty": null,
    "max": 6,
    "questions": [
      {
        "id": "q1",
        "label": "1. 긴장되거나, 불안하거나, 초조함",
        "instructions": [],
        "options": [
          {
            "text": "전혀 아니다",
            "score": 0
          },
          {
            "text": "며칠",
            "score": 1
          },
          {
            "text": "반 이상의 날",
            "score": 2
          },
          {
            "text": "거의 매일",
            "score": 3
          }
        ]
      },
      {
        "id": "q2",
        "label": "2. 걱정을 조절하거나 멈출 수 없음",
        "instructions": [],
        "options": [
          {
            "text": "전혀 아니다",
            "score": 0
          },
          {
            "text": "며칠",
            "score": 1
          },
          {
            "text": "반 이상의 날",
            "score": 2
          },
          {
            "text": "거의 매일",
            "score": 3
          }
        ]
      }
    ],
    "derivation": "공식 PHQ 매뉴얼 p.3·7에 따라 같은 한국어 GAD-7의 앞 2문항으로 구성. 독립된 한국어 GAD-2 검증판이라고 주장하지 않습니다."
  },
  "phq8": {
    "language": "ko",
    "version": "INfORM-27Oct2019",
    "source": "https://inform-iadr.com/wp-content/uploads/2024/03/DC-TMD-Korean-Assessment-Instruments_2019_10_27.pdf",
    "license": "https://www.phqscreeners.com/select-screener",
    "attribution": "Copyright Pfizer Inc. No permission required to reproduce, translate, display, or distribute. Korean translation by Jin-Woo Chung and Ji-Woon Park (Seoul National University).",
    "instructions": [
      "지난 2주 동안, 다음의 문제로 얼마나 자주 괴로웠습니까?"
    ],
    "administration": "자가보고 문항을 의료진이 원문대로 읽고 환자의 답을 입력합니다. 의료진의 추정으로 대신 답하지 마세요.",
    "notes": "한국어 INfORM 27Oct2019 번역판입니다. 국내 다른 번역판이나 국가건강검진 판본과 동일하다고 간주하지 마세요. 원문은 새로 번역하지 않았으며 줄바꿈만 화면에 맞췄습니다.",
    "changes": "선택 입력·합산 UI 추가, 상자 표시 지시를 화면 선택으로 대체, 개인정보 기입란 제외. 척도 문항·선택지·배점 유지. 번역판의 심리측정 검증과 이 웹 구현의 임상 검증은 별개입니다.",
    "licenseLabel": "복제·표시·배포 조건",
    "difficulty": null,
    "max": 24,
    "questions": [
      {
        "id": "q1",
        "label": "1. 무엇인가를 하는데 있어 즐거움이나 흥미가 거의 없음",
        "instructions": [],
        "options": [
          {
            "text": "전혀 아니다",
            "score": 0
          },
          {
            "text": "며칠",
            "score": 1
          },
          {
            "text": "날들의 반 이상",
            "score": 2
          },
          {
            "text": "거의 매일",
            "score": 3
          }
        ]
      },
      {
        "id": "q2",
        "label": "2. 기분이 슬프거나 우울하거나, 희망이 없음",
        "instructions": [],
        "options": [
          {
            "text": "전혀 아니다",
            "score": 0
          },
          {
            "text": "며칠",
            "score": 1
          },
          {
            "text": "날들의 반 이상",
            "score": 2
          },
          {
            "text": "거의 매일",
            "score": 3
          }
        ]
      },
      {
        "id": "q3",
        "label": "3. 잠들기 또는 잠자는 상태를 유지하기 어렵거나, 너무 많이 잔다.",
        "instructions": [],
        "options": [
          {
            "text": "전혀 아니다",
            "score": 0
          },
          {
            "text": "며칠",
            "score": 1
          },
          {
            "text": "날들의 반 이상",
            "score": 2
          },
          {
            "text": "거의 매일",
            "score": 3
          }
        ]
      },
      {
        "id": "q4",
        "label": "4. 피곤하거나 에너지가 별로 없다.",
        "instructions": [],
        "options": [
          {
            "text": "전혀 아니다",
            "score": 0
          },
          {
            "text": "며칠",
            "score": 1
          },
          {
            "text": "날들의 반 이상",
            "score": 2
          },
          {
            "text": "거의 매일",
            "score": 3
          }
        ]
      },
      {
        "id": "q5",
        "label": "5. 식욕이 떨어지거나 과식한다",
        "instructions": [],
        "options": [
          {
            "text": "전혀 아니다",
            "score": 0
          },
          {
            "text": "며칠",
            "score": 1
          },
          {
            "text": "날들의 반 이상",
            "score": 2
          },
          {
            "text": "거의 매일",
            "score": 3
          }
        ]
      },
      {
        "id": "q6",
        "label": "6. 스스로에 대하여 좋지 않게 생각되거나 자신이 실패자라는 생각이 들거나 자신이나 가족을 실망시켰다는 생각이 든다.",
        "instructions": [],
        "options": [
          {
            "text": "전혀 아니다",
            "score": 0
          },
          {
            "text": "며칠",
            "score": 1
          },
          {
            "text": "날들의 반 이상",
            "score": 2
          },
          {
            "text": "거의 매일",
            "score": 3
          }
        ]
      },
      {
        "id": "q7",
        "label": "7. 예를 들어 신문을 읽거나 텔레비전을 보는 것과 같은 일에 집중하는 것이 어렵다.",
        "instructions": [],
        "options": [
          {
            "text": "전혀 아니다",
            "score": 0
          },
          {
            "text": "며칠",
            "score": 1
          },
          {
            "text": "날들의 반 이상",
            "score": 2
          },
          {
            "text": "거의 매일",
            "score": 3
          }
        ]
      },
      {
        "id": "q8",
        "label": "8. 다른 사람들이 알아차릴 정도로 느리게 움직이거나 말한다. 혹은 반대로 가만히 있지 못하고 평상 시 보다 더 많이 움직인다.",
        "instructions": [],
        "options": [
          {
            "text": "전혀 아니다",
            "score": 0
          },
          {
            "text": "며칠",
            "score": 1
          },
          {
            "text": "날들의 반 이상",
            "score": 2
          },
          {
            "text": "거의 매일",
            "score": 3
          }
        ]
      }
    ],
    "derivation": "공식 PHQ 매뉴얼 p.3·7에 따라 같은 한국어 PHQ-9에서 9번 문항을 제외한 형태. 자해·자살 생각 문항을 포함하지 않아 이를 확인하는 검사로 사용할 수 없습니다."
  },
  "phq4": {
    "language": "ko",
    "version": "INfORM-27Oct2019",
    "source": "https://inform-iadr.com/wp-content/uploads/2024/03/DC-TMD-Korean-Assessment-Instruments_2019_10_27.pdf",
    "license": "https://www.phqscreeners.com/select-screener",
    "attribution": "Copyright Pfizer Inc. No permission required to reproduce, translate, display, or distribute. Korean translation by Jin-Woo Chung and Ji-Woon Park (Seoul National University).",
    "instructions": [
      "지난 2주 동안, 다음의 문제로 얼마나 자주 괴로웠습니까?"
    ],
    "administration": "자가보고 문항을 의료진이 원문대로 읽고 환자의 답을 입력합니다. 의료진의 추정으로 대신 답하지 마세요.",
    "notes": "한국어 INfORM 27Oct2019 번역판입니다. 국내 다른 번역판이나 국가건강검진 판본과 동일하다고 간주하지 마세요. 원문은 새로 번역하지 않았으며 줄바꿈만 화면에 맞췄습니다.",
    "changes": "선택 입력·합산 UI 추가, 상자 표시 지시를 화면 선택으로 대체, 개인정보 기입란 제외. 척도 문항·선택지·배점 유지. 번역판의 심리측정 검증과 이 웹 구현의 임상 검증은 별개입니다.",
    "licenseLabel": "복제·표시·배포 조건",
    "difficulty": {
      "label": "어떠한 문제라도 체크하였다면, 이러한 문제들이 당신이 일하거나, 집안일 하거나, 다른 사람과 어울릴 때 얼마나 어렵게 하였습니까?",
      "options": [
        "전혀 어렵지 않다.",
        "다소 어렵다.",
        "매우 어렵다.",
        "극히 심하게 어렵다."
      ]
    },
    "max": 12,
    "questions": [
      {
        "id": "q1",
        "label": "1. 긴장되거나, 불안하거나, 초조함",
        "instructions": [],
        "options": [
          {
            "text": "전혀 아니다",
            "score": 0
          },
          {
            "text": "며칠",
            "score": 1
          },
          {
            "text": "반이상",
            "score": 2
          },
          {
            "text": "거의매일",
            "score": 3
          }
        ]
      },
      {
        "id": "q2",
        "label": "2. 걱정을 조절하거나 멈출 수 없음",
        "instructions": [],
        "options": [
          {
            "text": "전혀 아니다",
            "score": 0
          },
          {
            "text": "며칠",
            "score": 1
          },
          {
            "text": "반이상",
            "score": 2
          },
          {
            "text": "거의매일",
            "score": 3
          }
        ]
      },
      {
        "id": "q3",
        "label": "3. 일을 하는데 있어 즐거움이나 흥미가 없음",
        "instructions": [],
        "options": [
          {
            "text": "전혀 아니다",
            "score": 0
          },
          {
            "text": "며칠",
            "score": 1
          },
          {
            "text": "반이상",
            "score": 2
          },
          {
            "text": "거의매일",
            "score": 3
          }
        ]
      },
      {
        "id": "q4",
        "label": "4. 기분이 나쁘거나 우울하거나, 희망이 없음",
        "instructions": [],
        "options": [
          {
            "text": "전혀 아니다",
            "score": 0
          },
          {
            "text": "며칠",
            "score": 1
          },
          {
            "text": "반이상",
            "score": 2
          },
          {
            "text": "거의매일",
            "score": 3
          }
        ]
      }
    ],
    "subscales": {
      "anxiety": [
        0,
        1
      ],
      "depression": [
        2,
        3
      ]
    }
  }
};
