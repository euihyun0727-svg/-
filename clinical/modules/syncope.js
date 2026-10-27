/* Source-linked factual summaries; specialist review pending. */
window.NeuroClinicalModules=window.NeuroClinicalModules||{};
window.NeuroClinicalModules["syncope"]={
  "id": "syncope",
  "name": "실신·자율신경",
  "urgentText": "운동/누운 자세 실신·흉통/호흡곤란·회복 지연·심장 질환 위험은 신속한 평가",
  "extraQuestions": [
    {
      "id": "cr_syn_urgent",
      "stem": "현재 가슴 통증·숨참·회복되지 않는 멍함이 있거나 크게 다쳤나요?",
      "options": [
        {
          "text": "예",
          "redFlag": true,
          "emergency": true
        },
        {
          "text": "아니요"
        },
        {
          "text": "잘 모르겠어요"
        }
      ],
      "risk": true,
      "emergency": true
    },
    {
      "id": "cr_syn_family",
      "stem": "젊은 나이에 갑자기 사망한 가족이나 본인의 심장질환이 있나요?",
      "options": [
        {
          "text": "예",
          "redFlag": true,
          "emergency": false
        },
        {
          "text": "아니요"
        },
        {
          "text": "잘 모르겠어요"
        }
      ],
      "risk": true
    },
    {
      "id": "cr_syn_standing",
      "stem": "일어서거나 오래 서 있을 때 두근거림·아득함이 반복되나요?",
      "options": [
        {
          "text": "예"
        },
        {
          "text": "아니요"
        },
        {
          "text": "잘 모르겠어요"
        }
      ]
    },
    {
      "id": "cr_syn_relieved",
      "stem": "누우면 나아지고 약·더위·수분 부족과 관계가 있나요?",
      "options": [
        {
          "text": "예"
        },
        {
          "text": "아니요"
        },
        {
          "text": "잘 모르겠어요"
        }
      ],
      "when": "cr_syn_standing",
      "equals": "예"
    }
  ],
  "paths": [
    {
      "id": "vasovagal",
      "name": "반사성·상황성 실신",
      "desc": "유발 상황·전구 증상·회복과 심장성 위험을 대조",
      "definition": "유발 상황·전구 증상·회복과 심장성 위험을 대조",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "syncope"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "전형 유발/전구·회복 확인",
          "source": "syncope"
        },
        {
          "id": "criterion1",
          "text": "심장/발작·약/출혈 원인 감별",
          "source": "syncope"
        },
        {
          "id": "criterion2",
          "text": "짧은 경련 동반만으로 뇌전증 확정 안 함",
          "source": "syncope"
        }
      ],
      "history": [
        "목격·자세/유발·전구·회복·가족/심장·약"
      ],
      "exam": [
        "활력·심혈관/신경·필요 시 기립 혈압"
      ],
      "tests": [
        {
          "id": "ecg",
          "name": "12유도 ECG·원인별 검사",
          "indications": "실신 기본 평가·심장 위험 확인",
          "limitations": "관행적 EEG·영상·tilt를 모든 실신에 적용 안 함",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "syncope"
          ]
        }
      ],
      "nonPharmTx": [
        "유발/전구 인지·누워 안전 확보·대항압박법 적합성·수분은 심장/신기능 고려"
      ],
      "preConfirmChecks": [
        "전형 유발/전구·회복 확인",
        "심장/발작·약/출혈 원인 감별",
        "짧은 경련 동반만으로 뇌전증 확정 안 함"
      ],
      "therapies": [],
      "pharmPrinciples": [
        "원인 확인 후 개별 치료. 이 경로에 자동 약물 후보를 지정하지 않습니다."
      ],
      "followUpAndSafety": [
        "재발·손상·전구/양상 변화·운전/작업 위험 재평가"
      ],
      "referralCriteria": [
        "새 국소 신경 증상·의식 변화·호흡/연하 문제·급격한 악화는 신속 평가. 검사 때문에 전원을 지연하지 않음."
      ],
      "differential": [
        "다른 원인·가역적 요인·약물 및 공존 질환을 직접 감별합니다."
      ],
      "special": [
        "고령·임신/수유·신장/간기능·낙상·동반약은 제품별 적합성과 금기 확인 필요. 미확인 상태를 안전으로 간주하지 않음."
      ],
      "followupDecision": "반응·순응도·부작용·진단 적합성·환자 목표에 따라 유지/변경을 의사가 결정. 고정 자동 처방 없음.",
      "korea": "품목별 허가·급여 현행 인정기준 미확인",
      "review": "신경과 전문의 최종 검수 전",
      "education": [
        "기절 전 느낌과 상황을 알아두고 안전하게 눕는 방법을 배웁니다. 위험한 다른 원인은 먼저 확인합니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "기절 전 느낌과 상황을 알아두고 안전하게 눕는 방법을 배웁니다. 위험한 다른 원인은 먼저 확인합니다.",
      "canonical": "vasovagal",
      "png": false
    },
    {
      "id": "syncope_orthostatic",
      "name": "기립성저혈압 관련 실신",
      "desc": "기립 실측·증상·원인으로 혈역학적 사건 평가",
      "definition": "기립 실측·증상·원인으로 혈역학적 사건 평가",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "aha",
        "syncope"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "기립 혈압·맥박/시간·증상 확인",
          "source": "aha"
        },
        {
          "id": "criterion1",
          "text": "일회 음성으로 초기/지연성 배제 안 함",
          "source": "aha"
        },
        {
          "id": "criterion2",
          "text": "심장/약/출혈/탈수 감별",
          "source": "aha"
        }
      ],
      "history": [
        "약·식후/더위·수분·실신·누운 고혈압"
      ],
      "exam": [
        "안전 기립·심장/신경"
      ],
      "tests": [
        {
          "id": "orthostatic",
          "name": "앙와위/기립 혈압·맥박",
          "indications": "증상-혈압 관계와 원인",
          "limitations": "측정 조건·지속 여부 확인. 자세만으로 확정 안 함",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "aha",
            "syncope"
          ]
        }
      ],
      "nonPharmTx": [
        "약 검토·느린 기립·낙상 예방·수분/염분 개별 조정"
      ],
      "preConfirmChecks": [
        "기립 혈압·맥박/시간·증상 확인",
        "일회 음성으로 초기/지연성 배제 안 함",
        "심장/약/출혈/탈수 감별"
      ],
      "therapies": [
        {
          "id": "pressor",
          "name": "필요 시 승압제 전문 검토",
          "evidence": "보존 조치 후 증상성 OH에 원인별 선택.",
          "safety": "누운 자세 고혈압·심장/신기능·부종/전해질·병용약 감시. 항고혈압제 자동 중단 안 함.",
          "sourceIds": [
            "aha"
          ],
          "dose": "수치 용량·증량 미확인: 해당 품목 허가사항 검토 후 결정",
          "domestic": "국내 해당 적응증·허가·급여·공급 미확인. 해외 권고와 구분"
        }
      ],
      "pharmPrinciples": [
        "필요 시 승압제 전문 검토: 보존 조치 후 증상성 OH에 원인별 선택."
      ],
      "followUpAndSafety": [
        "기립/누운 혈압·증상·낙상·약 반응 추적"
      ],
      "referralCriteria": [
        "새 국소 신경 증상·의식 변화·호흡/연하 문제·급격한 악화는 신속 평가. 검사 때문에 전원을 지연하지 않음."
      ],
      "differential": [
        "다른 원인·가역적 요인·약물 및 공존 질환을 직접 감별합니다."
      ],
      "special": [
        "고령·임신/수유·신장/간기능·낙상·동반약은 제품별 적합성과 금기 확인 필요. 미확인 상태를 안전으로 간주하지 않음."
      ],
      "followupDecision": "반응·순응도·부작용·진단 적합성·환자 목표에 따라 유지/변경을 의사가 결정. 고정 자동 처방 없음.",
      "korea": "품목별 허가·급여 현행 인정기준 미확인",
      "review": "신경과 전문의 최종 검수 전",
      "education": [
        "일어설 때 혈압과 증상을 함께 재고 약·수분 조절은 의료진과 정합니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "일어설 때 혈압과 증상을 함께 재고 약·수분 조절은 의료진과 정합니다.",
      "canonical": "orthostatic",
      "png": false
    },
    {
      "id": "cardiac_syncope_eval",
      "name": "심장성 실신 위험 평가",
      "desc": "부정맥/구조 심장질환을 우선 확인하는 감별 경로",
      "definition": "부정맥/구조 심장질환을 우선 확인하는 감별 경로",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "syncope"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "운동/누운 자세·무전구·가족 돌연사·심장질환·ECG 확인",
          "source": "syncope"
        },
        {
          "id": "criterion1",
          "text": "짧은 회복만으로 위험 배제 안 함",
          "source": "syncope"
        }
      ],
      "history": [
        "심계항진·흉통·호흡곤란·약·가족력"
      ],
      "exam": [
        "활력·심잡음/심부전·신경"
      ],
      "tests": [
        {
          "id": "cardiac",
          "name": "ECG·빈도에 맞는 장기 심전도·선택 심초음파",
          "indications": "의심 부정맥/구조 원인 평가",
          "limitations": "낮은 빈도 사건에 짧은 Holter 음성만으로 배제 안 함",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "syncope"
          ]
        }
      ],
      "nonPharmTx": [
        "평가 전 운동·운전/위험 작업 안전 계획"
      ],
      "preConfirmChecks": [
        "운동/누운 자세·무전구·가족 돌연사·심장질환·ECG 확인",
        "짧은 회복만으로 위험 배제 안 함"
      ],
      "therapies": [],
      "pharmPrinciples": [
        "원인 확인 후 개별 치료. 이 경로에 자동 약물 후보를 지정하지 않습니다."
      ],
      "followUpAndSafety": [
        "전문 평가 결과·재발·심장 증상에 따라 조기 추적"
      ],
      "referralCriteria": [
        "새 국소 신경 증상·의식 변화·호흡/연하 문제·급격한 악화는 신속 평가. 검사 때문에 전원을 지연하지 않음."
      ],
      "differential": [
        "다른 원인·가역적 요인·약물 및 공존 질환을 직접 감별합니다."
      ],
      "special": [
        "고령·임신/수유·신장/간기능·낙상·동반약은 제품별 적합성과 금기 확인 필요. 미확인 상태를 안전으로 간주하지 않음."
      ],
      "followupDecision": "반응·순응도·부작용·진단 적합성·환자 목표에 따라 유지/변경을 의사가 결정. 고정 자동 처방 없음.",
      "korea": "품목별 허가·급여 현행 인정기준 미확인",
      "review": "신경과 전문의 최종 검수 전",
      "education": [
        "운동 중이나 누워 있을 때 이유 없이 쓰러지면 심장 원인을 빨리 확인해야 합니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "운동 중이나 누워 있을 때 이유 없이 쓰러지면 심장 원인을 빨리 확인해야 합니다.",
      "canonical": "cardiac_syncope_eval",
      "png": false
    },
    {
      "id": "pots_eval",
      "name": "POTS·기립불내성 평가",
      "desc": "만성 기립 증상과 빈맥·OH 부재·다른 원인을 확인",
      "definition": "만성 기립 증상과 빈맥·OH 부재·다른 원인을 확인",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "pots",
        "syncope"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "기립 중 지속적 맥박 변화와 증상·기간·연령별 기준 대조",
          "source": "pots"
        },
        {
          "id": "criterion1",
          "text": "탈수/빈혈·약·내분비 등 빈맥 원인 배제",
          "source": "pots"
        },
        {
          "id": "criterion2",
          "text": "일회 맥박 증가만으로 확정 안 함",
          "source": "pots"
        }
      ],
      "history": [
        "증상 기간·약·수분/출혈·감염 후 변화·운동 내약"
      ],
      "exam": [
        "안전한 기립 혈압/맥박·심혈관/신경"
      ],
      "tests": [
        {
          "id": "pots",
          "name": "기립 연속/반복 활력·원인 검사",
          "indications": "필요 프로토콜로 빈맥/OH 및 다른 원인 구분",
          "limitations": "어지럼 모듈의 단일 혈압 차이 계산기로 POTS 진단 안 함",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "pots",
            "syncope"
          ]
        }
      ],
      "nonPharmTx": [
        "심장/신기능 고려 수분/염분·압박·단계적 운동을 개별 검토"
      ],
      "preConfirmChecks": [
        "기립 중 지속적 맥박 변화와 증상·기간·연령별 기준 대조",
        "탈수/빈혈·약·내분비 등 빈맥 원인 배제",
        "일회 맥박 증가만으로 확정 안 함"
      ],
      "therapies": [],
      "pharmPrinciples": [
        "원인 확인 후 개별 치료. 이 경로에 자동 약물 후보를 지정하지 않습니다."
      ],
      "followUpAndSafety": [
        "기립 증상·활동/기능·맥박/혈압·동반 질환과 약 내약성 추적"
      ],
      "referralCriteria": [
        "새 국소 신경 증상·의식 변화·호흡/연하 문제·급격한 악화는 신속 평가. 검사 때문에 전원을 지연하지 않음."
      ],
      "differential": [
        "다른 원인·가역적 요인·약물 및 공존 질환을 직접 감별합니다."
      ],
      "special": [
        "고령·임신/수유·신장/간기능·낙상·동반약은 제품별 적합성과 금기 확인 필요. 미확인 상태를 안전으로 간주하지 않음."
      ],
      "followupDecision": "반응·순응도·부작용·진단 적합성·환자 목표에 따라 유지/변경을 의사가 결정. 고정 자동 처방 없음.",
      "korea": "품목별 허가·급여 현행 인정기준 미확인",
      "review": "신경과 전문의 최종 검수 전",
      "education": [
        "서 있을 때 반복되는 두근거림은 맥박뿐 아니라 기간과 다른 원인을 함께 확인합니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "서 있을 때 반복되는 두근거림은 맥박뿐 아니라 기간과 다른 원인을 함께 확인합니다.",
      "canonical": "pots_eval",
      "png": false
    }
  ],
  "version": "2026-10-27",
  "review": "신경과 전문의 최종 검수 전",
  "sources": {
    "syncope": {
      "title": "NICE CG109 Transient loss of consciousness in over 16s",
      "date": "2010 / 2023 개정",
      "url": "https://www.nice.org.uk/guidance/cg109/chapter/Recommendations",
      "access": "공식 권고 검색 본문 확인",
      "type": "진료지침/공식 권고",
      "checked": "2026-10-27"
    },
    "aha": {
      "title": "Orthostatic Hypotension in Adults With Hypertension: A Scientific Statement From the AHA",
      "date": "2024",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11067441/",
      "access": "PMC 본문 확인; AHA 직접 페이지 403",
      "type": "AHA 과학적 성명",
      "checked": "2026-10-27"
    },
    "pots": {
      "title": "Diagnosis and management of POTS",
      "date": "2022-03-14",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8920526/",
      "access": "공식 논문 검색 본문 확인; 직접 페이지 CAPTCHA",
      "type": "합의문 기반 임상 종설",
      "checked": "2026-10-27"
    }
  }
};
