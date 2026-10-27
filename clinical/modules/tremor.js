/* Source-linked factual summaries; specialist review pending. */
window.NeuroClinicalModules=window.NeuroClinicalModules||{};
window.NeuroClinicalModules["tremor"]={
  "id": "tremor",
  "name": "떨림·운동장애",
  "urgentText": "급성 신경 변화·고열/심한 경직·약 급중단 후 악화·연하/호흡 위험 우선 평가",
  "extraQuestions": [
    {
      "id": "cr_trm_acute",
      "stem": "떨림이나 몸 굳음과 함께 갑자기 말·힘·의식이 달라지거나 고열이 있나요?",
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
      "id": "cr_trm_meds",
      "stem": "약을 새로 쓰거나 줄인 뒤 떨림·움직임이 달라졌나요?",
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
      "id": "cr_trm_meds_detail",
      "stem": "어떤 약 변화인지 알고 있나요?",
      "options": [
        {
          "text": "구역·정신건강 관련 약"
        },
        {
          "text": "움직임 치료약 중단/누락"
        },
        {
          "text": "기타 약/잘 모르겠어요"
        }
      ],
      "when": "cr_trm_meds",
      "equals": "예"
    },
    {
      "id": "cr_trm_function",
      "stem": "떨림 때문에 식사·글쓰기·옷 입기나 걷기가 불편한가요?",
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
      "id": "essential_tremor",
      "name": "본태떨림(ET)·ET-plus 분류 검토",
      "desc": "양측 상지 활동떨림과 기간·동반 신경 소견을 분류",
      "definition": "양측 상지 활동떨림과 기간·동반 신경 소견을 분류",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "tremor",
        "et2019",
        "et2026",
        "neuro"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "활동떨림 분포·기간(ET 분류 ≥3년) 확인",
          "source": "tremor"
        },
        {
          "id": "criterion1",
          "text": "다른 명확 신경 징후·약/대사/근긴장이상 감별",
          "source": "tremor"
        },
        {
          "id": "criterion2",
          "text": "ET-plus·기간 미달을 독립 확정 질환으로 자동 분류 안 함",
          "source": "tremor"
        }
      ],
      "history": [
        "기간·가족·기능·약/카페인/음주·불안"
      ],
      "exam": [
        "자세/활동·안정 떨림·근긴장·서동/보행"
      ],
      "tests": [
        {
          "id": "tremorWorkup",
          "name": "임상 분류·선택 갑상선/약 검토",
          "indications": "증상 분포·유발 약·대사 원인",
          "limitations": "모든 떨림에 MRI/도파민 영상 자동 적용 안 함",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "tremor",
            "et2019",
            "et2026",
            "neuro"
          ]
        }
      ],
      "nonPharmTx": [
        "기능 보조·유발 약/자극 검토·작업 조정"
      ],
      "preConfirmChecks": [
        "활동떨림 분포·기간(ET 분류 ≥3년) 확인",
        "다른 명확 신경 징후·약/대사/근긴장이상 감별",
        "ET-plus·기간 미달을 독립 확정 질환으로 자동 분류 안 함"
      ],
      "therapies": [
        {
          "id": "etMeds",
          "name": "Propranolol / primidone 등 개별 검토",
          "evidence": "MDS 2019는 clinically useful로 평가했으나 2026의 수정 GRADE 검토는 저/매우 낮은 확실성으로 효능 결론 불충분. 무효 판정과 다름.",
          "safety": "맥박/혈압·심폐 금기, 진정/낙상·인지·병용약·임신/고령 위험 및 제품 허가 확인. 숫자 용량 추정 안 함.",
          "sourceIds": [
            "et2019",
            "et2026"
          ],
          "dose": "수치 용량·증량 미확인: 해당 품목 허가사항 검토 후 결정",
          "domestic": "국내 해당 적응증·허가·급여·공급 미확인. 해외 권고와 구분"
        }
      ],
      "pharmPrinciples": [
        "Propranolol / primidone 등 개별 검토: MDS 2019는 clinically useful로 평가했으나 2026의 수정 GRADE 검토는 저/매우 낮은 확실성으로 효능 결론 불충분. 무효 판정과 다름."
      ],
      "followUpAndSafety": [
        "기능 목표·떨림 부담·내약성·새 서동/근긴장 변화 평가"
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
        "떨림을 줄이는 목표는 식사·글쓰기 등 생활의 불편을 덜고 약의 불편을 피하는 것입니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "떨림을 줄이는 목표는 식사·글쓰기 등 생활의 불편을 덜고 약의 불편을 피하는 것입니다.",
      "canonical": "essential_tremor",
      "png": false
    },
    {
      "id": "parkinson_disease",
      "name": "파킨슨병 임상 평가",
      "desc": "서동과 강직/안정떨림 및 경과·감별을 전문 평가",
      "definition": "서동과 강직/안정떨림 및 경과·감별을 전문 평가",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "pd"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "서동 등 파킨슨증 확인",
          "source": "pd"
        },
        {
          "id": "criterion1",
          "text": "약물·혈관·비전형/다른 원인 감별",
          "source": "pd"
        },
        {
          "id": "criterion2",
          "text": "떨림만으로 확정 안 함",
          "source": "pd"
        }
      ],
      "history": [
        "약·운동/비운동·낙상·환각·수면·변동"
      ],
      "exam": [
        "서동/강직·떨림·보행/균형·기립"
      ],
      "tests": [
        {
          "id": "pdAssess",
          "name": "전문 임상 진찰·선택 검사",
          "indications": "진단 불확실·다른 원인에 맞게",
          "limitations": "구조 MRI로 PD 확정하지 않음",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "pd"
          ]
        }
      ],
      "nonPharmTx": [
        "운동·물리/작업·언어/연하·낙상/기립 지원"
      ],
      "preConfirmChecks": [
        "서동 등 파킨슨증 확인",
        "약물·혈관·비전형/다른 원인 감별",
        "떨림만으로 확정 안 함"
      ],
      "therapies": [
        {
          "id": "levodopa",
          "name": "Levodopa 중심 개별 선택",
          "evidence": "NICE: 초기 운동 증상이 삶의 질에 영향 시 levodopa 제공 권고.",
          "safety": "기립저혈압·환각·졸림·운동 변동·이상운동·시간표·병용약 감시. 임의 급중단/약 휴일 금지.",
          "sourceIds": [
            "pd"
          ],
          "dose": "수치 용량·증량 미확인: 해당 품목 허가사항 검토 후 결정",
          "domestic": "국내 해당 적응증·허가·급여·공급 미확인. 해외 권고와 구분"
        },
        {
          "id": "dopamineAdjunct",
          "name": "도파민 작용제/MAO-B 등 선택",
          "evidence": "증상·변동·환자 목표에 따른 전문 선택.",
          "safety": "충동조절·수면발작·환각·부종/기립 문제, 상호작용·중단 증상 설명.",
          "sourceIds": [
            "pd"
          ],
          "dose": "수치 용량·증량 미확인: 해당 품목 허가사항 검토 후 결정",
          "domestic": "국내 해당 적응증·허가·급여·공급 미확인. 해외 권고와 구분"
        }
      ],
      "pharmPrinciples": [
        "Levodopa 중심 개별 선택: NICE: 초기 운동 증상이 삶의 질에 영향 시 levodopa 제공 권고.",
        "도파민 작용제/MAO-B 등 선택: 증상·변동·환자 목표에 따른 전문 선택."
      ],
      "followUpAndSafety": [
        "운동/기능·변동·환각·충동·수면발작·기립·낙상·복약시간 평가"
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
        "움직임뿐 아니라 잠·어지럼·기분과 약의 불편도 함께 관리하며 약을 갑자기 끊지 않습니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "움직임뿐 아니라 잠·어지럼·기분과 약의 불편도 함께 관리하며 약을 갑자기 끊지 않습니다.",
      "canonical": "parkinson",
      "png": false
    },
    {
      "id": "drug_induced_parkinsonism",
      "name": "약물유발 파킨슨증 평가",
      "desc": "약 노출과 시간 관계·공존 PD 가능성 확인",
      "definition": "약 노출과 시간 관계·공존 PD 가능성 확인",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "pd",
        "neuro"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "항도파민 등 약/증상 관계",
          "source": "pd"
        },
        {
          "id": "criterion1",
          "text": "약물 중단 후 경과·동반 PD 감별",
          "source": "pd"
        }
      ],
      "history": [
        "약 이름·시작/증량·치료 이유·이전 증상"
      ],
      "exam": [
        "파킨슨증·비대칭·지연운동/근긴장·보행"
      ],
      "tests": [
        {
          "id": "dip",
          "name": "복약 대조·전문 경과 평가",
          "indications": "원인 약과 대체 치료 필요성",
          "limitations": "대칭/비대칭만으로 원인 확정 안 함",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "pd",
            "neuro"
          ]
        }
      ],
      "nonPharmTx": [
        "처방 의료진과 원인 약의 대체/감량 협의"
      ],
      "preConfirmChecks": [
        "항도파민 등 약/증상 관계",
        "약물 중단 후 경과·동반 PD 감별"
      ],
      "therapies": [],
      "pharmPrinciples": [
        "일률적 levodopa/항콜린제 자동 투여 안 함. 처방 목적과 인지/낙상 위험을 고려한 전문 검토."
      ],
      "followUpAndSafety": [
        "원인 약 조정 후 기능·운동·정신증상 및 지속 여부 확인"
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
        "약의 영향인지 살펴보되 치료 중인 다른 병의 약을 혼자 끊지 마세요.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "약의 영향인지 살펴보되 치료 중인 다른 병의 약을 혼자 끊지 마세요.",
      "canonical": "drug_induced_parkinsonism",
      "png": false
    },
    {
      "id": "atypical_parkinsonism",
      "name": "비전형 파킨슨증 감별",
      "desc": "PSP/MSA/CBS 등 아형별 추가 기준은 전문 평가",
      "definition": "PSP/MSA/CBS 등 아형별 추가 기준은 전문 평가",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "pd",
        "neuro"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "조기 낙상·주시 제한·심한 자율신경/축성·피질 징후 확인",
          "source": "pd"
        },
        {
          "id": "criterion1",
          "text": "단일 red flag로 아형 확정 안 함",
          "source": "pd"
        }
      ],
      "history": [
        "낙상 시점·연하/호흡·기립/배뇨·약 반응"
      ],
      "exam": [
        "안구운동·축성/사지·피질·기립·보행"
      ],
      "tests": [
        {
          "id": "atypicalTests",
          "name": "뇌 MRI·선택 자율신경/전문 평가",
          "indications": "아형·치료/안전 계획에 도움될 때",
          "limitations": "도파민 약 반응만으로 PD/비전형 확정 안 함",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "pd",
            "neuro"
          ]
        }
      ],
      "nonPharmTx": [
        "낙상·연하/영양·의사소통·기립 지원"
      ],
      "preConfirmChecks": [
        "조기 낙상·주시 제한·심한 자율신경/축성·피질 징후 확인",
        "단일 red flag로 아형 확정 안 함"
      ],
      "therapies": [],
      "pharmPrinciples": [
        "원인 확인 후 개별 치료. 이 경로에 자동 약물 후보를 지정하지 않습니다."
      ],
      "followUpAndSafety": [
        "빠른 기능 변화·호흡/연하·자율신경 및 돌봄 목표"
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
        "비슷한 움직임 변화라도 원인과 경과가 달라 안전과 생활 목표에 맞춰 평가합니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "비슷한 움직임 변화라도 원인과 경과가 달라 안전과 생활 목표에 맞춰 평가합니다.",
      "canonical": "atypical_parkinsonism",
      "png": false
    },
    {
      "id": "dystonic_tremor",
      "name": "근긴장이상성 떨림",
      "desc": "비정상 자세와 떨림의 부위/관계 확인",
      "definition": "비정상 자세와 떨림의 부위/관계 확인",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "tremor",
        "neuro"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "지속/과제 특이 자세·감각 trick 등 양성 소견",
          "source": "tremor"
        },
        {
          "id": "criterion1",
          "text": "ET·PD·약물 감별",
          "source": "tremor"
        }
      ],
      "history": [
        "작업/자세·통증·약·부위"
      ],
      "exam": [
        "비정상 자세·떨림·근긴장·다른 신경 소견"
      ],
      "tests": [
        {
          "id": "dystoniaAssess",
          "name": "운동장애 전문 평가",
          "indications": "진단과 주사/재활 적합성",
          "limitations": "모든 떨림을 동일 약제로 치료 안 함",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "tremor",
            "neuro"
          ]
        }
      ],
      "nonPharmTx": [
        "작업·자세·통증/기능 지원"
      ],
      "preConfirmChecks": [
        "지속/과제 특이 자세·감각 trick 등 양성 소견",
        "ET·PD·약물 감별"
      ],
      "therapies": [
        {
          "id": "dystoniaToxin",
          "name": "선택 보툴리눔 치료 의뢰",
          "evidence": "NICE는 의심 근긴장이상의 전문 평가/보툴리눔 검토 안내.",
          "safety": "부위·근육·제형별 용량과 연하/약화 위험을 전문 시행자가 결정.",
          "sourceIds": [
            "neuro"
          ],
          "dose": "수치 용량·증량 미확인: 해당 품목 허가사항 검토 후 결정",
          "domestic": "국내 해당 적응증·허가·급여·공급 미확인. 해외 권고와 구분"
        }
      ],
      "pharmPrinciples": [
        "선택 보툴리눔 치료 의뢰: NICE는 의심 근긴장이상의 전문 평가/보툴리눔 검토 안내."
      ],
      "followUpAndSafety": [
        "작업 기능·통증·약화/연하 부작용 추적"
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
        "떨림과 함께 굳어지는 자세가 있는지 보고 작업과 통증을 줄이는 방법을 정합니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "떨림과 함께 굳어지는 자세가 있는지 보고 작업과 통증을 줄이는 방법을 정합니다.",
      "canonical": "dystonic_tremor",
      "png": false
    },
    {
      "id": "functional_tremor",
      "name": "기능성 떨림 평가",
      "desc": "주의 전환·동조 등 양성 진찰 소견으로 평가",
      "definition": "주의 전환·동조 등 양성 진찰 소견으로 평가",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "tremor",
        "neuro"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "양성 기능성 징후를 전문 진찰로 확인",
          "source": "tremor"
        },
        {
          "id": "criterion1",
          "text": "불안·정상 검사·변동만으로 진단 안 함",
          "source": "tremor"
        },
        {
          "id": "criterion2",
          "text": "기질 질환 공존/새 증상은 별도 평가",
          "source": "tremor"
        }
      ],
      "history": [
        "증상 양상·기능·유발 맥락·이전 진단"
      ],
      "exam": [
        "동조/주의 전환·동시수축 등 전문 진찰"
      ],
      "tests": [
        {
          "id": "functionalMotor",
          "name": "양성 소견 기반 평가",
          "indications": "진단 설명·재활 계획",
          "limitations": "정상 MRI만으로 확정하지 않음",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "tremor",
            "neuro"
          ]
        }
      ],
      "nonPharmTx": [
        "비난 없는 진단 설명·운동 재훈련·필요 시 심리 지원"
      ],
      "preConfirmChecks": [
        "양성 기능성 징후를 전문 진찰로 확인",
        "불안·정상 검사·변동만으로 진단 안 함",
        "기질 질환 공존/새 증상은 별도 평가"
      ],
      "therapies": [],
      "pharmPrinciples": [
        "원인 확인 후 개별 치료. 이 경로에 자동 약물 후보를 지정하지 않습니다."
      ],
      "followUpAndSafety": [
        "기능 목표·활동 복귀·새 객관 징후 재평가"
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
        "증상은 실제이며 진찰에서 확인한 특징을 설명받고 움직임을 회복하는 방법을 함께 정합니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "증상은 실제이며 진찰에서 확인한 특징을 설명받고 움직임을 회복하는 방법을 함께 정합니다.",
      "canonical": "functional_tremor",
      "png": false
    }
  ],
  "version": "2026-10-27",
  "review": "신경과 전문의 최종 검수 전",
  "sources": {
    "tremor": {
      "title": "MDS Consensus Statement on Classification of Tremors",
      "date": "2018",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6530552/",
      "access": "공식 논문 검색 본문 확인",
      "type": "진단 분류 합의문",
      "checked": "2026-10-27"
    },
    "et2019": {
      "title": "MDS Evidence-Based Review of Treatments for Essential Tremor",
      "date": "2019",
      "url": "https://www.movementdisorders.org/MDS-Files1/PDFs/EBM-Papers/Ferreira_et_al-2019-Movement_Disorders.pdf",
      "access": "공식 PDF 검색 본문 확인; 2026 방법 변경과 비교",
      "type": "근거 검토",
      "checked": "2026-10-27"
    },
    "et2026": {
      "title": "Update on Medical Treatments for Essential Tremor: MDS EBM Review",
      "date": "2026",
      "url": "https://movementdisorders.onlinelibrary.wiley.com/doi/10.1002/mds.70184",
      "access": "출판사 색인 본문·결론 확인; 직접 본문 403. 저/매우 낮은 확실성 및 결론 불충분을 표시",
      "type": "최신 근거 검토; 약물 무효 판정 아님",
      "checked": "2026-10-27"
    },
    "neuro": {
      "title": "NICE NG127 Suspected neurological conditions: recognition and referral",
      "date": "2019, 현행 웹 권고 확인",
      "url": "https://www.nice.org.uk/guidance/ng127/chapter/Recommendations-for-adults-aged-over-16",
      "access": "공식 권고 검색 본문 확인; 직접 페이지 접근 제한",
      "type": "진료지침/공식 권고",
      "checked": "2026-10-27"
    },
    "pd": {
      "title": "NICE NG71 Parkinson’s disease in adults",
      "date": "2017 / 2025 웹 개정",
      "url": "https://www.nice.org.uk/guidance/ng71/chapter/Recommendations",
      "access": "공식 권고 검색 본문 확인",
      "type": "진료지침/공식 권고",
      "checked": "2026-10-27"
    }
  }
};
