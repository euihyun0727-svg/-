/* Source-linked factual summaries; specialist review pending. */
window.NeuroClinicalModules=window.NeuroClinicalModules||{};
window.NeuroClinicalModules["cognition"]={
  "id": "cognition",
  "name": "인지장애",
  "scales": [
    "fourat"
  ],
  "urgentText": "갑작스러운 혼돈·의식/국소 신경 변화는 섬망·뇌졸중 등 긴급 원인 평가 우선",
  "extraQuestions": [
    {
      "id": "cr_cog_acute",
      "stem": "평소와 달리 갑자기 멍해지거나, 정신이 흐려지거나, 한쪽 힘·말하기에 변화가 있나요?",
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
      "id": "cr_cog_fluctuation",
      "stem": "하루 중 정신이 또렷한 정도가 크게 달라지거나 없는 것이 보이나요?",
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
      "id": "cr_cog_hallucination",
      "stem": "언제 생기고 약을 바꾼 뒤 달라졌는지 알고 있나요?",
      "options": [
        {
          "text": "최근 약 변경 뒤"
        },
        {
          "text": "그 전부터 있었어요"
        },
        {
          "text": "잘 모르겠어요"
        }
      ],
      "when": "cr_cog_fluctuation",
      "equals": "예"
    },
    {
      "id": "cr_cog_sleepmed",
      "stem": "수면 문제, 우울감, 새 약이나 음주 변화가 있나요?",
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
    }
  ],
  "paths": [
    {
      "id": "subjective_cognitive_decline",
      "name": "주관적인지저하",
      "desc": "인지 불편이 있으나 객관적 저하·기능 변화 여부를 아직 구분해야 하는 상태",
      "definition": "인지 불편이 있으나 객관적 저하·기능 변화 여부를 아직 구분해야 하는 상태",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "detect",
        "dementia"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "주관 보고와 객관 검사·일상 기능을 분리",
          "source": "detect"
        },
        {
          "id": "criterion1",
          "text": "보호자 정보·감각/기분/수면/약 요인 확인",
          "source": "detect"
        }
      ],
      "history": [
        "발병·진행·교육/직업·가족 관찰·운전/약 관리"
      ],
      "exam": [
        "신경 진찰·청각/시각·기분·기능 평가"
      ],
      "tests": [
        {
          "id": "clinical",
          "name": "인지·기능 면담/검사",
          "indications": "불편과 객관 기능을 대조",
          "limitations": "정상 단일 점수로 향후 변화 배제 안 함",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "detect",
            "dementia"
          ]
        }
      ],
      "nonPharmTx": [
        "수면·감각·기분·혈관 위험과 활동을 개별 관리"
      ],
      "preConfirmChecks": [
        "주관 보고와 객관 검사·일상 기능을 분리",
        "보호자 정보·감각/기분/수면/약 요인 확인"
      ],
      "therapies": [],
      "pharmPrinciples": [
        "원인 확인 후 개별 치료. 이 경로에 자동 약물 후보를 지정하지 않습니다."
      ],
      "followUpAndSafety": [
        "새 기능 저하·빠른 진행 시 재평가",
        "추적 간격은 기능·경과와 환자 우려에 맞춰 결정"
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
        "기억이 불편하다는 느낌과 검사·생활 능력은 다를 수 있어 함께 살펴봅니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "기억이 불편하다는 느낌과 검사·생활 능력은 다를 수 있어 함께 살펴봅니다.",
      "canonical": "subjective_cognitive_decline",
      "png": true
    },
    {
      "id": "mci",
      "name": "경도인지장애",
      "desc": "객관적 저하와 생활 독립성의 상대적 보존을 확인하는 임상 증후군",
      "definition": "객관적 저하와 생활 독립성의 상대적 보존을 확인하는 임상 증후군",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "detect",
        "dementia"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "본인/보호자 변화 + 객관 저하 확인",
          "source": "detect"
        },
        {
          "id": "criterion1",
          "text": "기본 독립성·기능 저하 원인 확인",
          "source": "detect"
        },
        {
          "id": "criterion2",
          "text": "섬망·우울·약물/감각 등 감별",
          "source": "detect"
        }
      ],
      "history": [
        "이전 기능 대비 변화·보조 필요·수면/기분·혈관 위험"
      ],
      "exam": [
        "인지 영역·보행·국소 소견·일상 기능"
      ],
      "tests": [
        {
          "id": "labs",
          "name": "원인별 혈액검사·인지 평가",
          "indications": "가역 요인과 객관 저하 확인",
          "limitations": "동일 패널·단일 점수로 원인 확정 안 함",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "detect",
            "dementia"
          ]
        },
        {
          "id": "imaging",
          "name": "구조 영상 검토",
          "indications": "증후군·국소 소견·원인 감별에 따라 결정",
          "limitations": "영상 정상으로 신경퇴행 배제 안 함",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "detect",
            "dementia"
          ]
        }
      ],
      "nonPharmTx": [
        "활동·수면·기분·감각·혈관 위험 관리 및 가족 목표 설정"
      ],
      "preConfirmChecks": [
        "본인/보호자 변화 + 객관 저하 확인",
        "기본 독립성·기능 저하 원인 확인",
        "섬망·우울·약물/감각 등 감별"
      ],
      "therapies": [],
      "pharmPrinciples": [
        "비특이적 MCI에 알츠하이머 약물 또는 항아밀로이드를 자동 연결하지 않음. 원인·적합성 전문 검토."
      ],
      "followUpAndSafety": [
        "기능/인지 경과·안전·새 증상 추적",
        "기능 저하 또는 빠른 진행 시 진단 재평가"
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
        "검사에서 변화가 있어도 일상생활을 어느 정도 독립적으로 하는지 함께 확인합니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "검사에서 변화가 있어도 일상생활을 어느 정도 독립적으로 하는지 함께 확인합니다.",
      "canonical": "mci",
      "png": false
    },
    {
      "id": "alzheimer",
      "name": "알츠하이머병 관련 인지장애",
      "desc": "임상 증후군과 원인 질환을 구분해 확인",
      "definition": "임상 증후군과 원인 질환을 구분해 확인",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "dementia",
        "detect",
        "donepezilKR",
        "amyloid"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "경과·기억 등 영역 저하와 기능 장애 확인",
          "source": "dementia"
        },
        {
          "id": "criterion1",
          "text": "섬망/다른 원인 감별",
          "source": "dementia"
        },
        {
          "id": "criterion2",
          "text": "바이오마커는 관리 변경에 도움이 되는 상황에서 전문 검토",
          "source": "dementia"
        }
      ],
      "history": [
        "보호자 병력·복약·실신/서맥·체중·행동·운전"
      ],
      "exam": [
        "인지·기능·신경 진찰·맥박/체중"
      ],
      "tests": [
        {
          "id": "workup",
          "name": "원인 검사·구조 영상",
          "indications": "임상 증후군·대체 원인 확인",
          "limitations": "영상/선별검사만으로 AD 확정 안 함",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "dementia",
            "detect",
            "donepezilKR",
            "amyloid"
          ]
        },
        {
          "id": "biomarker",
          "name": "아밀로이드 등 전문 검사",
          "indications": "선택 치료 적합성·진단 불확실 시 전문 판단",
          "limitations": "모든 환자 일괄 시행 아님",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "dementia",
            "detect",
            "donepezilKR",
            "amyloid"
          ]
        }
      ],
      "nonPharmTx": [
        "인지 자극·기능 지원·보호자 교육·안전 계획"
      ],
      "preConfirmChecks": [
        "경과·기억 등 영역 저하와 기능 장애 확인",
        "섬망/다른 원인 감별",
        "바이오마커는 관리 변경에 도움이 되는 상황에서 전문 검토"
      ],
      "therapies": [
        {
          "id": "donepezil",
          "name": "Donepezil 등 AChE 억제제",
          "evidence": "NICE: 경도~중등도 AD 선택지. 국내 아래 특정 품목 허가 확인.",
          "safety": "과민반응·임신/수유 금기, 서맥/전도장애·실신·위장관/체중·수면·병용약 확인. 저체중 고령 여성 제한 대조.",
          "sourceIds": [
            "dementia",
            "donepezilKR"
          ],
          "dose": "품목 201907443 성인: 5 mg 1일 1회 취침 전 4~6주 후 반응/내약성에 따라 10 mg 검토. 저체중 85세 이상 여성은 5 mg 초과하지 않음. 자동 처방 아님.",
          "domestic": "해당 아도페정 품목의 AD 증상 치료 허가 확인; 해당 환자 급여·공급 미확인"
        },
        {
          "id": "memantine",
          "name": "Memantine 검토",
          "evidence": "NICE: 중등도에서 AChE 부적합 또는 중증 AD 등 상황별 선택.",
          "safety": "신기능·인지/행동·상호작용 및 국내 품목별 용량 확인.",
          "sourceIds": [
            "dementia"
          ],
          "dose": "수치 용량·증량 미확인: 해당 품목 허가사항 검토 후 결정",
          "domestic": "국내 해당 적응증·허가·급여·공급 미확인. 해외 권고와 구분"
        },
        {
          "id": "amyloid",
          "name": "항아밀로이드 치료 적합성 의뢰",
          "evidence": "초기 AD의 원인 확인·전문 선택/감시 필요. 보편적 MCI 치료 아님.",
          "safety": "ARIA·뇌출혈 위험 및 MRI 감시, 병용 항응고/혈관 위험을 전문 팀이 검토. FDA 공지는 국내 허가/급여가 아님.",
          "sourceIds": [
            "amyloid"
          ],
          "dose": "수치 용량·증량 미확인: 해당 품목 허가사항 검토 후 결정",
          "domestic": "국내 해당 적응증·허가·급여·공급 미확인. 해외 권고와 구분"
        }
      ],
      "pharmPrinciples": [
        "Donepezil 등 AChE 억제제: NICE: 경도~중등도 AD 선택지. 국내 아래 특정 품목 허가 확인.",
        "Memantine 검토: NICE: 중등도에서 AChE 부적합 또는 중증 AD 등 상황별 선택.",
        "항아밀로이드 치료 적합성 의뢰: 초기 AD의 원인 확인·전문 선택/감시 필요. 보편적 MCI 치료 아님."
      ],
      "followUpAndSafety": [
        "인지·기능·행동·보호자 부담과 약 내약성 평가",
        "체중/맥박·실신·수면 문제로 변경 검토"
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
      "korea": "아도페정 품목 201907443의 AD 증상 치료 허가 확인. 다른 품목/적응증 및 환자별 급여·공급은 미확인.",
      "review": "신경과 전문의 최종 검수 전",
      "education": [
        "기억과 생활 능력의 변화를 함께 살피며 약의 도움과 불편을 정기적으로 확인합니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "기억과 생활 능력의 변화를 함께 살피며 약의 도움과 불편을 정기적으로 확인합니다.",
      "canonical": "alzheimer",
      "png": false
    },
    {
      "id": "vascular_cognitive_impairment",
      "name": "혈관성인지장애",
      "desc": "혈관 병변과 인지/기능의 관련성을 평가",
      "definition": "혈관 병변과 인지/기능의 관련성을 평가",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "dementia"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "뇌혈관 사건·영역 저하·기능과 시간 관계 확인",
          "source": "dementia"
        },
        {
          "id": "criterion1",
          "text": "백질 병변량만으로 진단 안 함",
          "source": "dementia"
        }
      ],
      "history": [
        "뇌졸중·혈압/당뇨·약·보행·기능"
      ],
      "exam": [
        "국소 신경 소견·인지/보행"
      ],
      "tests": [
        {
          "id": "mri",
          "name": "뇌 MRI/가능한 대체 영상",
          "indications": "혈관성 원인·다른 원인 감별",
          "limitations": "영상 변화만으로 확정 안 함",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "dementia"
          ]
        }
      ],
      "nonPharmTx": [
        "혈관 위험 관리·재활·안전/기능 지원"
      ],
      "preConfirmChecks": [
        "뇌혈관 사건·영역 저하·기능과 시간 관계 확인",
        "백질 병변량만으로 진단 안 함"
      ],
      "therapies": [],
      "pharmPrinciples": [
        "AChE 억제제/memantine은 동반 AD·DLB·PDD 의심 등이 있을 때만 별도 검토. 자동 공통 AD 약물 적용 안 함."
      ],
      "followUpAndSafety": [
        "재발 신경 증상·기능·혈관 위험 추적"
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
        "혈액순환 관련 뇌 변화가 생활 능력에 영향을 줄 수 있어 다른 원인과 함께 확인합니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "혈액순환 관련 뇌 변화가 생활 능력에 영향을 줄 수 있어 다른 원인과 함께 확인합니다.",
      "canonical": "vascular_cognitive_impairment",
      "png": false
    },
    {
      "id": "dlb",
      "name": "루이소체 치매(DLB) 평가",
      "desc": "인지 변동·시각 환각·파킨슨증·RBD 및 기능을 통합 평가",
      "definition": "인지 변동·시각 환각·파킨슨증·RBD 및 기능을 통합 평가",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "dementia"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "핵심 임상 특징·기능·공존 질환 확인",
          "source": "dementia"
        },
        {
          "id": "criterion1",
          "text": "항정신병약 중증 민감성 위험 확인",
          "source": "dementia"
        }
      ],
      "history": [
        "인지 변동·환각·수면 행동·낙상/자율신경·약"
      ],
      "exam": [
        "인지·파킨슨증·기립 혈압·보행"
      ],
      "tests": [
        {
          "id": "dlbTests",
          "name": "구조 영상·선택 전문 검사",
          "indications": "불확실하면 진단/관리 변경에 도움이 되는 검사 선택",
          "limitations": "정상 특정 검사 하나로 DLB 배제 안 함",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "dementia"
          ]
        }
      ],
      "nonPharmTx": [
        "환경·수면 안전·보호자 지원"
      ],
      "preConfirmChecks": [
        "핵심 임상 특징·기능·공존 질환 확인",
        "항정신병약 중증 민감성 위험 확인"
      ],
      "therapies": [
        {
          "id": "dlbAChE",
          "name": "Donepezil/rivastigmine 등 전문 검토",
          "evidence": "NICE DLB 권고는 국내 AD 허가와 구분.",
          "safety": "서맥·실신·위장관/체중·기립 증상 및 항정신병약 민감성 주의.",
          "sourceIds": [
            "dementia"
          ],
          "dose": "수치 용량·증량 미확인: 해당 품목 허가사항 검토 후 결정",
          "domestic": "국내 해당 적응증·허가·급여·공급 미확인. 해외 권고와 구분"
        }
      ],
      "pharmPrinciples": [
        "Donepezil/rivastigmine 등 전문 검토: NICE DLB 권고는 국내 AD 허가와 구분."
      ],
      "followUpAndSafety": [
        "인지·환각의 고통/위험·기립·낙상·보호자 부담 추적"
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
        "정신이 또렷한 정도·잠버릇·움직임 변화와 약에 예민한 반응을 함께 살핍니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "정신이 또렷한 정도·잠버릇·움직임 변화와 약에 예민한 반응을 함께 살핍니다.",
      "canonical": "dlb",
      "png": false
    },
    {
      "id": "ftd",
      "name": "전두측두엽 치매(FTD) 평가",
      "desc": "행동/성격 또는 언어 우세 변화의 원인을 평가",
      "definition": "행동/성격 또는 언어 우세 변화의 원인을 평가",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "dementia"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "진행성 행동/언어 및 기능 변화",
          "source": "dementia"
        },
        {
          "id": "criterion1",
          "text": "AD·정신질환·가역 요인과 감별",
          "source": "dementia"
        }
      ],
      "history": [
        "충동·식습관·언어·사회 판단·가족력"
      ],
      "exam": [
        "행동/언어·운동신경·기능"
      ],
      "tests": [
        {
          "id": "ftdTests",
          "name": "구조 영상·신경심리/선택 전문 검사",
          "indications": "임상 아형·다른 원인 감별",
          "limitations": "정상 영상 하나로 배제하지 않음",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "dementia"
          ]
        }
      ],
      "nonPharmTx": [
        "의사소통·행동 환경 조정·가족 안전·유전 상담 필요 검토"
      ],
      "preConfirmChecks": [
        "진행성 행동/언어 및 기능 변화",
        "AD·정신질환·가역 요인과 감별"
      ],
      "therapies": [],
      "pharmPrinciples": [
        "NICE는 FTD에 AChE 억제제/memantine을 제공하지 않도록 권고. AD 공통 템플릿 자동 적용 금지."
      ],
      "followUpAndSafety": [
        "행동/언어·섭식·기능·안전 변화 추적"
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
        "말이나 행동의 변화가 중심이 될 수 있어 가족의 관찰이 진료에 도움이 됩니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "말이나 행동의 변화가 중심이 될 수 있어 가족의 관찰이 진료에 도움이 됩니다.",
      "canonical": "ftd",
      "png": false
    },
    {
      "id": "nph_cognition",
      "name": "정상압수두증 관련 인지 평가",
      "desc": "보행·인지·배뇨와 영상/CSF 평가를 통합하는 가역 원인 감별",
      "definition": "보행·인지·배뇨와 영상/CSF 평가를 통합하는 가역 원인 감별",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "nph"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "보행 중심 임상 양상·인지/배뇨·뇌실확대 등 대조",
          "source": "nph"
        },
        {
          "id": "criterion1",
          "text": "삼징 모두 존재를 필수 자동 조건으로 사용 안 함",
          "source": "nph"
        }
      ],
      "history": [
        "보행 선후·낙상·배뇨·기능·수막염/출혈력"
      ],
      "exam": [
        "보행/회전·인지·배뇨·다른 신경 소견"
      ],
      "tests": [
        {
          "id": "nphMRI",
          "name": "뇌 영상 및 전문 CSF/tap 평가",
          "indications": "임상·영상과 치료 적합성 검토",
          "limitations": "tap 음성 하나로 배제하지 않음",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "nph"
          ]
        }
      ],
      "nonPharmTx": [
        "낙상·기능 보호 및 전문 의뢰"
      ],
      "preConfirmChecks": [
        "보행 중심 임상 양상·인지/배뇨·뇌실확대 등 대조",
        "삼징 모두 존재를 필수 자동 조건으로 사용 안 함"
      ],
      "therapies": [],
      "pharmPrinciples": [
        "원인 확인 후 개별 치료. 이 경로에 자동 약물 후보를 지정하지 않습니다."
      ],
      "followUpAndSafety": [
        "치료 전후 보행·기능·인지·배뇨 변화를 같은 방식으로 평가"
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
        "뇌척수액 순환과 관련한 문제인지 살펴보고 보행과 생활 능력 변화를 함께 확인합니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "뇌척수액 순환과 관련한 문제인지 살펴보고 보행과 생활 능력 변화를 함께 확인합니다.",
      "canonical": "nph",
      "png": false
    },
    {
      "id": "delirium",
      "name": "섬망·급성 혼돈 평가",
      "desc": "시간/일 단위 급성 변화와 변동은 원인 확인 우선",
      "definition": "시간/일 단위 급성 변화와 변동은 원인 확인 우선",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "delirium"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "급성/변동성 주의·의식/인지 변화",
          "source": "delirium"
        },
        {
          "id": "criterion1",
          "text": "기저 치매와 공존 가능",
          "source": "delirium"
        },
        {
          "id": "criterion2",
          "text": "감염·약·대사·저산소 등 원인 평가",
          "source": "delirium"
        }
      ],
      "history": [
        "평소 대비 변화·약·통증·탈수·감염·수면"
      ],
      "exam": [
        "활력/의식·주의·국소 신경·전신 진찰"
      ],
      "tests": [
        {
          "id": "urgentCauses",
          "name": "긴급 원인별 평가 및 4AT 참고",
          "indications": "숙련된 평가와 임상 최종 판단",
          "limitations": "4AT 총점만으로 확정/응급 원인 배제 안 함",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "delirium"
          ]
        }
      ],
      "nonPharmTx": [
        "안전·지남력 지원·감각 보조·수면/수분/통증 원인 관리"
      ],
      "preConfirmChecks": [
        "급성/변동성 주의·의식/인지 변화",
        "기저 치매와 공존 가능",
        "감염·약·대사·저산소 등 원인 평가"
      ],
      "therapies": [],
      "pharmPrinciples": [
        "원인 확인 후 개별 치료. 이 경로에 자동 약물 후보를 지정하지 않습니다."
      ],
      "followUpAndSafety": [
        "안정 여부와 원인 치료 반응을 조기에 재평가",
        "외래 통상 치매 추적보다 급성 평가 우선"
      ],
      "referralCriteria": [
        "급성 혼돈·의식 저하·전신/국소 위험 소견은 즉시 평가/전원. 원인 불확실하면 관찰만으로 지연하지 않음."
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
        "갑자기 멍해지거나 평소와 달라진 상태는 원인을 빨리 확인해야 합니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "갑자기 멍해지거나 평소와 달라진 상태는 원인을 빨리 확인해야 합니다.",
      "canonical": "delirium",
      "png": false
    },
    {
      "id": "rapid_cognitive_decline",
      "name": "급속진행성 인지저하 평가",
      "desc": "수주~수개월 빠른 악화의 치료 가능 원인·감염·자가면역 등을 전문 평가",
      "definition": "수주~수개월 빠른 악화의 치료 가능 원인·감염·자가면역 등을 전문 평가",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "dementia",
        "detect"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "기능/인지의 빠른 변화 확인",
          "source": "dementia"
        },
        {
          "id": "criterion1",
          "text": "일반 AD로 단정하지 않음",
          "source": "dementia"
        }
      ],
      "history": [
        "진행 속도·발작·감염·약/독성·전신/행동 변화"
      ],
      "exam": [
        "의식·신경 진찰·운동/보행"
      ],
      "tests": [
        {
          "id": "rpd",
          "name": "신속한 MRI·CSF/EEG 등 전문 평가",
          "indications": "의심 원인에 따라 전문 팀 선택",
          "limitations": "일률적 항체/종양 패널 자동 주문 아님",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "dementia",
            "detect"
          ]
        }
      ],
      "nonPharmTx": [
        "낙상·식사·보호자 안전 지원 및 신속 의뢰"
      ],
      "preConfirmChecks": [
        "기능/인지의 빠른 변화 확인",
        "일반 AD로 단정하지 않음"
      ],
      "therapies": [],
      "pharmPrinciples": [
        "원인 확인 후 개별 치료. 이 경로에 자동 약물 후보를 지정하지 않습니다."
      ],
      "followUpAndSafety": [
        "원인 평가 결과·안전·악화 속도에 맞춰 조기 추적"
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
        "짧은 기간에 기억과 생활 능력이 빠르게 바뀌면 다른 치료 가능한 원인을 확인해야 합니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "짧은 기간에 기억과 생활 능력이 빠르게 바뀌면 다른 치료 가능한 원인을 확인해야 합니다.",
      "canonical": "rapid_cognitive_decline",
      "png": false
    }
  ],
  "version": "2026-10-27",
  "review": "신경과 전문의 최종 검수 전",
  "sources": {
    "detect": {
      "title": "Alzheimer’s Association DETeCD-ADRD primary-care executive recommendations",
      "date": "2024-12-23 / 2025 권호",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC12173843/",
      "access": "공식 논문 검색 본문/초록 확인",
      "type": "진단 가이드라인",
      "checked": "2026-10-27"
    },
    "dementia": {
      "title": "NICE NG97 Dementia: assessment, management and support",
      "date": "2018, 현행 웹 권고 확인",
      "url": "https://www.nice.org.uk/guidance/ng97/chapter/Recommendations",
      "access": "공식 권고 검색 본문 확인; 직접 페이지 접근 제한",
      "type": "진료지침/공식 권고",
      "checked": "2026-10-27"
    },
    "donepezilKR": {
      "title": "식약처 아도페정5mg 품목 201907443 허가사항",
      "date": "2026-09-18 캐시, 2026-10-27 확인",
      "url": "https://nedrug.mfds.go.kr/pbp/CCBBB01/getItemDetailCache?cacheSeq=201907443aupdateTs2026-09-18+22%3A39%3A22.0b",
      "access": "적응증·용량·금기·주의 본문 확인. 급여 인정기준 확인과 별개",
      "type": "대한민국 품목 허가",
      "checked": "2026-10-27"
    },
    "amyloid": {
      "title": "FDA: Additional earlier MRI monitoring for Leqembi",
      "date": "2025",
      "url": "https://www.fda.gov/drugs/drug-safety-communications/fda-recommend-additional-earlier-mri-monitoring-patients-alzheimers-disease-taking-leqembi-lecanemab",
      "access": "FDA 공식 검색 본문 확인; 국내 허가/급여 주장 아님",
      "type": "미국 안전성 공지",
      "checked": "2026-10-27"
    },
    "nph": {
      "title": "Guidelines for Management of Idiopathic Normal Pressure Hydrocephalus, Third Edition",
      "date": "2021",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7905302/",
      "access": "공식 논문 검색 본문 확인; PMC 직접 접근 CAPTCHA",
      "type": "일본학회 지침",
      "checked": "2026-10-27"
    },
    "delirium": {
      "title": "NICE CG103 Delirium: assessment and diagnosis update",
      "date": "2023",
      "url": "https://www.nice.org.uk/guidance/cg103/resources/delirium-prevention-diagnosis-and-management-35109327290821",
      "access": "공식 권고 PDF 검색 본문 확인",
      "type": "진료지침/공식 권고",
      "checked": "2026-10-27"
    }
  }
};
