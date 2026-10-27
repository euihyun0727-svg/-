/* Source-linked factual summaries; specialist review pending. */
window.NeuroClinicalModules=window.NeuroClinicalModules||{};
window.NeuroClinicalModules["tinnitus"]={
  "id": "tinnitus",
  "name": "이명",
  "urgentText": "갑작스러운 난청·새 신경 증상·심한 어지럼 또는 심각한 정신적 고통은 신속 평가",
  "extraQuestions": [
    {
      "id": "cr_tin_neuro",
      "stem": "귀 소리와 함께 갑자기 말·한쪽 힘·의식·서기 능력이 달라졌나요?",
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
      "id": "cr_tin_side",
      "stem": "주로 어디에서 들리나요?",
      "options": [
        {
          "text": "오른쪽"
        },
        {
          "text": "왼쪽"
        },
        {
          "text": "양쪽/머릿속"
        },
        {
          "text": "잘 모르겠어요"
        }
      ]
    },
    {
      "id": "cr_tin_impact",
      "stem": "소리 때문에 잠·일상생활이나 마음 상태가 많이 힘든가요?",
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
      "id": "cr_tin_impact_detail",
      "stem": "가장 불편한 점은 무엇인가요?",
      "options": [
        {
          "text": "잠"
        },
        {
          "text": "듣기/집중"
        },
        {
          "text": "불안/마음 상태"
        },
        {
          "text": "여러 가지/잘 모르겠어요"
        }
      ],
      "when": "cr_tin_impact",
      "equals": "예"
    }
  ],
  "paths": [
    {
      "id": "sensorineural_tin",
      "name": "주관적 비박동성 이명",
      "desc": "소리 양상과 청력·기능/고통·다른 원인을 평가",
      "definition": "소리 양상과 청력·기능/고통·다른 원인을 평가",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "tinnitus"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "박동·편측/비대칭·청력/신경 증상 구분",
          "source": "tinnitus"
        },
        {
          "id": "criterion1",
          "text": "청력/이과 및 고통 평가",
          "source": "tinnitus"
        },
        {
          "id": "criterion2",
          "text": "단순 이명만으로 기전 확정 안 함",
          "source": "tinnitus"
        }
      ],
      "history": [
        "소음/약·기간·청력·수면/기분·기능"
      ],
      "exam": [
        "이경·청력·신경·필요 중이 평가"
      ],
      "tests": [
        {
          "id": "audiology",
          "name": "청각 평가",
          "indications": "청력/이과 원인 확인",
          "limitations": "대칭 비박동·관련 이상 없는 경우 관행 영상 불필요",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "tinnitus"
          ]
        }
      ],
      "nonPharmTx": [
        "설명·청력 보조 적합성·이명 관련 CBT/수면/기능 지원"
      ],
      "preConfirmChecks": [
        "박동·편측/비대칭·청력/신경 증상 구분",
        "청력/이과 및 고통 평가",
        "단순 이명만으로 기전 확정 안 함"
      ],
      "therapies": [],
      "pharmPrinciples": [
        "이명 자체에 betahistine 등 일률적 약물 처방 안 함. 동반 질환 약물은 적응증/근거를 별도 확인."
      ],
      "followUpAndSafety": [
        "청력·고통/기능·수면·새 박동/편측/신경 변화 평가"
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
        "귀 소리의 크기뿐 아니라 듣기와 잠·일상에 미치는 영향을 확인해 부담을 줄이는 방법을 정합니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "귀 소리의 크기뿐 아니라 듣기와 잠·일상에 미치는 영향을 확인해 부담을 줄이는 방법을 정합니다.",
      "canonical": "sensorineural_tin",
      "png": true
    },
    {
      "id": "pulsatile_tinnitus",
      "name": "박동성 이명 평가",
      "desc": "맥박 동기성·혈관/중이 등 원인을 구분",
      "definition": "맥박 동기성·혈관/중이 등 원인을 구분",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "tinnitus"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "맥박 동기·편측·신경/시력·진찰 대조",
          "source": "tinnitus"
        },
        {
          "id": "criterion1",
          "text": "일반 감각신경성 이명으로 자동 처리 안 함",
          "source": "tinnitus"
        }
      ],
      "history": [
        "시작·혈관/심장·두통/시력·소음 양상"
      ],
      "exam": [
        "이경·혈관/신경·청각"
      ],
      "tests": [
        {
          "id": "pulseImaging",
          "name": "원인별 MRI/MRA·CT 등",
          "indications": "NICE: 박동성 이명 영상 평가; 혈관/골성 의심에 맞게",
          "limitations": "특정 검사 하나를 모든 환자에 자동 선택하지 않음",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "tinnitus"
          ]
        }
      ],
      "nonPharmTx": [
        "원인 평가·불안/수면 부담 지원"
      ],
      "preConfirmChecks": [
        "맥박 동기·편측·신경/시력·진찰 대조",
        "일반 감각신경성 이명으로 자동 처리 안 함"
      ],
      "therapies": [],
      "pharmPrinciples": [
        "원인 확인 후 개별 치료. 이 경로에 자동 약물 후보를 지정하지 않습니다."
      ],
      "followUpAndSafety": [
        "원인 결과·새 신경/시력·박동 양상·기능 추적"
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
        "맥박에 맞춰 들리는 소리는 원인에 따라 검사가 달라 따로 평가합니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "맥박에 맞춰 들리는 소리는 원인에 따라 검사가 달라 따로 평가합니다.",
      "canonical": "pulsatile_tinnitus",
      "png": false
    },
    {
      "id": "unilateral_tinnitus",
      "name": "편측 이명·비대칭 난청 평가",
      "desc": "청력과 편측/비대칭 이과·신경 소견에 맞는 감별",
      "definition": "청력과 편측/비대칭 이과·신경 소견에 맞는 감별",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "tinnitus"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "편측/비대칭·객관 청력·신경/이과 확인",
          "source": "tinnitus"
        },
        {
          "id": "criterion1",
          "text": "영상 필요성과 청력 관리 구분",
          "source": "tinnitus"
        }
      ],
      "history": [
        "발병·청력·어지럼·신경 증상"
      ],
      "exam": [
        "이경·청각·뇌신경"
      ],
      "tests": [
        {
          "id": "unilateralHearing",
          "name": "청각 평가·내이도 MRI 검토",
          "indications": "NICE: 편측/비대칭 비박동 이명 등에 적합성 검토",
          "limitations": "대칭 단순 이명과 같은 영상 정책 적용 안 함",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "tinnitus"
          ]
        }
      ],
      "nonPharmTx": [
        "청력/기능 지원·원인 평가"
      ],
      "preConfirmChecks": [
        "편측/비대칭·객관 청력·신경/이과 확인",
        "영상 필요성과 청력 관리 구분"
      ],
      "therapies": [],
      "pharmPrinciples": [
        "원인 확인 후 개별 치료. 이 경로에 자동 약물 후보를 지정하지 않습니다."
      ],
      "followUpAndSafety": [
        "청력과 동반 증상·검사 결과 및 기능"
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
        "한쪽 귀 소리나 양쪽 청력 차이를 확인해 필요한 검사와 듣기 도움을 정합니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "한쪽 귀 소리나 양쪽 청력 차이를 확인해 필요한 검사와 듣기 도움을 정합니다.",
      "canonical": "unilateral_tinnitus",
      "png": false
    },
    {
      "id": "sudden_hearing_eval",
      "name": "돌발성 난청 동반 이명 — 긴급 평가",
      "desc": "갑작스러운 청력 변화는 별도 신속 평가 경로",
      "definition": "갑작스러운 청력 변화는 별도 신속 평가 경로",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "tinnitus"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "시작 시각·청력 변화·신경/전정/이과 위험 확인",
          "source": "tinnitus"
        },
        {
          "id": "criterion1",
          "text": "일반 이명 추적으로 지연 안 함",
          "source": "tinnitus"
        }
      ],
      "history": [
        "시작·통증/감염·어지럼·신경·약"
      ],
      "exam": [
        "이경·청력·신경/보행"
      ],
      "tests": [
        {
          "id": "suddenHearing",
          "name": "신속 청력·이비인후/필요 응급 평가",
          "indications": "감각신경성/전음성·중추 위험 구분",
          "limitations": "이명 완화 약만 주고 청력 평가 지연하지 않음",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "tinnitus"
          ]
        }
      ],
      "nonPharmTx": [
        "신속 의뢰와 손상/운전 안전"
      ],
      "preConfirmChecks": [
        "시작 시각·청력 변화·신경/전정/이과 위험 확인",
        "일반 이명 추적으로 지연 안 함"
      ],
      "therapies": [],
      "pharmPrinciples": [
        "원인 확인 후 개별 치료. 이 경로에 자동 약물 후보를 지정하지 않습니다."
      ],
      "followUpAndSafety": [
        "청력·치료 반응·원인 평가 결과를 조기 추적"
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
        "귀가 갑자기 잘 안 들리면 소리 때문이라고 넘기지 말고 바로 평가받으세요.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "귀가 갑자기 잘 안 들리면 소리 때문이라고 넘기지 말고 바로 평가받으세요.",
      "canonical": "sudden_hearing_eval",
      "png": false
    }
  ],
  "version": "2026-10-27",
  "review": "신경과 전문의 최종 검수 전",
  "sources": {
    "tinnitus": {
      "title": "NICE NG155 Tinnitus: assessment and management",
      "date": "2020",
      "url": "https://www.nice.org.uk/guidance/ng155/chapter/Recommendations",
      "access": "공식 권고 검색 본문 확인; 직접 페이지 403",
      "type": "진료지침/공식 권고",
      "checked": "2026-10-27"
    }
  }
};
