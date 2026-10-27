/* Source-linked factual summaries; specialist review pending. */
window.NeuroClinicalModules=window.NeuroClinicalModules||{};
window.NeuroClinicalModules["gait"]={
  "id": "gait",
  "name": "보행·균형",
  "urgentText": "갑작스러운 보행 불가·국소 신경 변화·호흡/연하·마미/척수 신호는 긴급 평가",
  "extraQuestions": [
    {
      "id": "cr_gait_acute",
      "stem": "갑자기 혼자 서거나 걷지 못하거나, 말·한쪽 힘·의식이 달라졌나요?",
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
      "id": "cr_gait_urine",
      "stem": "새 배뇨/대변 변화, 회음부 감각 변화나 빠른 다리 약화가 있나요?",
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
      "id": "cr_gait_injury",
      "stem": "넘어져 머리를 다쳤거나 의식을 잃었나요?",
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
      "id": "cr_gait_vision",
      "stem": "어둡거나 울퉁불퉁한 곳에서 더 불안하거나 시야가 흔들리나요?",
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
      "id": "cr_gait_aids",
      "stem": "지팡이·부축·집 안 환경 등 도움이 필요한가요?",
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
      "id": "nph_eval",
      "name": "정상압수두증(NPH) 평가",
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
      "id": "gait_parkinsonian",
      "name": "파킨슨성 보행 평가",
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
        "보행 동결·회전·낙상·약 시각·기립/인지 변화"
      ],
      "exam": [
        "서동/강직·보행/회전·자세·이중과제 및 낙상 안전"
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
      "id": "sensory_ataxia",
      "name": "감각실조성 보행 평가",
      "desc": "큰 섬유/후주 감각 입력 이상과 시각 의존을 평가",
      "definition": "큰 섬유/후주 감각 입력 이상과 시각 의존을 평가",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "neuropathy",
        "neuro",
        "falls"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "위치/진동 저하·반사·보행을 대조",
          "source": "neuropathy"
        },
        {
          "id": "criterion1",
          "text": "양측 전정/소뇌·척수 및 시력 감별",
          "source": "neuropathy"
        }
      ],
      "history": [
        "감각 변화·어둠 악화·영양·당뇨/약"
      ],
      "exam": [
        "위치/진동·반사·Romberg·근력·보행"
      ],
      "tests": [
        {
          "id": "sensoryTests",
          "name": "원인 혈액검사·NCS/선택 척수 영상",
          "indications": "감각 이상 위치/원인에 따라",
          "limitations": "Romberg 양성만으로 원인 확정 안 함",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "neuropathy",
            "neuro",
            "falls"
          ]
        }
      ],
      "nonPharmTx": [
        "발/관절 보호·조명·보조기·원인 교정"
      ],
      "preConfirmChecks": [
        "위치/진동 저하·반사·보행을 대조",
        "양측 전정/소뇌·척수 및 시력 감별"
      ],
      "therapies": [],
      "pharmPrinciples": [
        "원인 확인 후 개별 치료. 이 경로에 자동 약물 후보를 지정하지 않습니다."
      ],
      "followUpAndSafety": [
        "기능·낙상·감각/근력 진행과 원인 치료 반응"
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
        "발과 다리의 위치 감각이 줄면 어두운 곳에서 더 불안할 수 있어 원인과 안전을 살핍니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "발과 다리의 위치 감각이 줄면 어두운 곳에서 더 불안할 수 있어 원인과 안전을 살핍니다.",
      "canonical": "sensory_ataxia",
      "png": false
    },
    {
      "id": "cerebellar_gait",
      "name": "소뇌성 보행·실조 평가",
      "desc": "체간·사지·안구 소견과 급성/진행 원인을 구분",
      "definition": "체간·사지·안구 소견과 급성/진행 원인을 구분",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "neuro",
        "stroke",
        "falls"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "보행/체간 및 협응 소견 확인",
          "source": "neuro"
        },
        {
          "id": "criterion1",
          "text": "급성은 뇌혈관/독성 등 우선",
          "source": "neuro"
        },
        {
          "id": "criterion2",
          "text": "진행형은 구조·대사·유전 등 전문 평가",
          "source": "neuro"
        }
      ],
      "history": [
        "발병 속도·음주/약·가족·두통/구토"
      ],
      "exam": [
        "안구운동·구음·사지 협응·보행/체간"
      ],
      "tests": [
        {
          "id": "ataxiaTests",
          "name": "급성 영상·원인별 전문 검사",
          "indications": "발병·진찰에 따른 선택",
          "limitations": "재활 예약 때문에 급성 원인 평가 지연 금지",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "neuro",
            "stroke",
            "falls"
          ]
        }
      ],
      "nonPharmTx": [
        "낙상·삼킴·의사소통 및 맞춤 재활 지원"
      ],
      "preConfirmChecks": [
        "보행/체간 및 협응 소견 확인",
        "급성은 뇌혈관/독성 등 우선",
        "진행형은 구조·대사·유전 등 전문 평가"
      ],
      "therapies": [],
      "pharmPrinciples": [
        "원인 확인 후 개별 치료. 이 경로에 자동 약물 후보를 지정하지 않습니다."
      ],
      "followUpAndSafety": [
        "원인 결과·보행/협응·연하·재활 반응"
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
        "균형과 팔다리 조절에 관련된 변화인지 살피고 갑자기 시작했다면 먼저 급한 원인을 확인합니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "균형과 팔다리 조절에 관련된 변화인지 살피고 갑자기 시작했다면 먼저 급한 원인을 확인합니다.",
      "canonical": "cerebellar_gait",
      "png": false
    },
    {
      "id": "vestibular_gait",
      "name": "전정성 불균형·양측 전정병증 연결",
      "desc": "보행 중 시선/균형과 전정기능을 함께 평가",
      "definition": "보행 중 시선/균형과 전정기능을 함께 평가",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "bilateral",
        "rehab"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "동요시·어둠/지면 악화·정지시 완화 및 VOR 대조",
          "source": "bilateral"
        },
        {
          "id": "criterion1",
          "text": "감각/소뇌·약물 감별",
          "source": "bilateral"
        }
      ],
      "history": [
        "어지럼·이독성 노출·낙상·시야 흔들림"
      ],
      "exam": [
        "VOR·감각/소뇌·보행"
      ],
      "tests": [
        {
          "id": "gaitVor",
          "name": "vHIT·선택 전정 기능검사",
          "indications": "양측 기능 저하 등 임상 목적",
          "limitations": "동요시/안진 한 소견만으로 확정하지 않음",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "bilateral",
            "rehab"
          ]
        }
      ],
      "nonPharmTx": [
        "원인 관리·시선/균형/보행 맞춤 전정재활"
      ],
      "preConfirmChecks": [
        "동요시·어둠/지면 악화·정지시 완화 및 VOR 대조",
        "감각/소뇌·약물 감별"
      ],
      "therapies": [
        {
          "id": "vestibRehab",
          "name": "말초 전정저하의 재활",
          "evidence": "ANPT/APTA 말초 일측/양측 기능저하에 강한 권고.",
          "safety": "낙상·경추/시각·인지와 내약성에 맞춰 전문 지도. 중추성 모든 실조에 같은 근거 외삽 안 함.",
          "sourceIds": [
            "rehab"
          ],
          "dose": "수치 용량·증량 미확인: 해당 품목 허가사항 검토 후 결정",
          "domestic": "국내 해당 적응증·허가·급여·공급 미확인. 해외 권고와 구분"
        }
      ],
      "pharmPrinciples": [
        "말초 전정저하의 재활: ANPT/APTA 말초 일측/양측 기능저하에 강한 권고."
      ],
      "followUpAndSafety": [
        "보행·동요시·낙상·재활 목표/내약성 추적"
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
        "귀의 균형 기능과 눈·몸의 움직임을 확인해 안전한 맞춤 운동을 정합니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "귀의 균형 기능과 눈·몸의 움직임을 확인해 안전한 맞춤 운동을 정합니다.",
      "canonical": "bilateral_vestibulopathy",
      "png": false
    },
    {
      "id": "gait_myelopathy",
      "name": "척수병증 관련 보행 평가",
      "desc": "보행·손 기능·상위운동신경·배뇨와 척수 영상 대조",
      "definition": "보행·손 기능·상위운동신경·배뇨와 척수 영상 대조",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "myelopathy",
        "neuro"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "과반사/병적 반사·손/보행·감각 수준 확인",
          "source": "myelopathy"
        },
        {
          "id": "criterion1",
          "text": "새 배뇨/빠른 약화는 긴급",
          "source": "myelopathy"
        },
        {
          "id": "criterion2",
          "text": "압박 영상만으로 임상 중증도 확정 안 함",
          "source": "myelopathy"
        }
      ],
      "history": [
        "목/등·손 조작·양하지·배뇨·진행"
      ],
      "exam": [
        "근력/반사·감각 수준·손 기능·보행"
      ],
      "tests": [
        {
          "id": "cordMRI",
          "name": "척수 MRI·전문 평가",
          "indications": "척수 임상 소견·원인/수술 적합성",
          "limitations": "급성 척수/마미 신호는 일상 재활보다 우선",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "myelopathy",
            "neuro"
          ]
        }
      ],
      "nonPharmTx": [
        "낙상/기능 보호·척추 전문 평가"
      ],
      "preConfirmChecks": [
        "과반사/병적 반사·손/보행·감각 수준 확인",
        "새 배뇨/빠른 약화는 긴급",
        "압박 영상만으로 임상 중증도 확정 안 함"
      ],
      "therapies": [
        {
          "id": "cordSurgery",
          "name": "감압/수술 적합성 의뢰",
          "evidence": "2017 지침: 중등도·중증 DCM 수술 강한 권고;경증은 수술/감독 재활, 악화 시 재평가.",
          "safety": "임상 중증도·영상·환자 목표·수술 위험은 전문 판단. 증상 없는 압박에 자동 수술 권고 안 함.",
          "sourceIds": [
            "myelopathy"
          ],
          "dose": "수치 용량·증량 미확인: 해당 품목 허가사항 검토 후 결정",
          "domestic": "국내 해당 적응증·허가·급여·공급 미확인. 해외 권고와 구분"
        }
      ],
      "pharmPrinciples": [
        "감압/수술 적합성 의뢰: 2017 지침: 중등도·중증 DCM 수술 강한 권고;경증은 수술/감독 재활, 악화 시 재평가."
      ],
      "followUpAndSafety": [
        "신경 진행·손/보행·배뇨·치료 후 기능 추적"
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
        "척수 문제로 손과 걸음이 함께 불편한지 확인하고 힘이나 배뇨가 달라지면 빨리 평가합니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "척수 문제로 손과 걸음이 함께 불편한지 확인하고 힘이나 배뇨가 달라지면 빨리 평가합니다.",
      "canonical": "myelopathy",
      "png": false
    },
    {
      "id": "multifactorial_gait",
      "name": "다요인성 보행·낙상 관리",
      "desc": "여러 감각/근력·약·인지·혈압·환경 요인의 합을 평가",
      "definition": "여러 감각/근력·약·인지·혈압·환경 요인의 합을 평가",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "falls"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "낙상 상세·손상·기능·다요인 평가",
          "source": "falls"
        },
        {
          "id": "criterion1",
          "text": "단일 점수로 낙상 가능성 확정하지 않음",
          "source": "falls"
        }
      ],
      "history": [
        "약·시력/청력·발·어지럼/실신·집 환경"
      ],
      "exam": [
        "보행·근력/균형·기립·감각·인지"
      ],
      "tests": [
        {
          "id": "fallsAssess",
          "name": "개별 낙상·기능 평가",
          "indications": "변경 가능한 요인·운동 계획 확인",
          "limitations": "NICE 2025: 예측 점수만으로 낙상 위험 판정하지 않음",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "falls"
          ]
        }
      ],
      "nonPharmTx": [
        "맞춤 근력/균형 운동·약 검토·주거 환경·보조기"
      ],
      "preConfirmChecks": [
        "낙상 상세·손상·기능·다요인 평가",
        "단일 점수로 낙상 가능성 확정하지 않음"
      ],
      "therapies": [],
      "pharmPrinciples": [
        "원인 확인 후 개별 치료. 이 경로에 자동 약물 후보를 지정하지 않습니다."
      ],
      "followUpAndSafety": [
        "낙상/손상·활동/기능·기립/약·운동 안전 추적"
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
        "넘어짐은 여러 요인이 겹쳐 생길 수 있어 약과 집 안 환경, 근력과 균형을 함께 살핍니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "넘어짐은 여러 요인이 겹쳐 생길 수 있어 약과 집 안 환경, 근력과 균형을 함께 살핍니다.",
      "canonical": "multifactorial_gait",
      "png": false
    }
  ],
  "version": "2026-10-27",
  "review": "신경과 전문의 최종 검수 전",
  "sources": {
    "nph": {
      "title": "Guidelines for Management of Idiopathic Normal Pressure Hydrocephalus, Third Edition",
      "date": "2021",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7905302/",
      "access": "공식 논문 검색 본문 확인; PMC 직접 접근 CAPTCHA",
      "type": "일본학회 지침",
      "checked": "2026-10-27"
    },
    "pd": {
      "title": "NICE NG71 Parkinson’s disease in adults",
      "date": "2017 / 2025 웹 개정",
      "url": "https://www.nice.org.uk/guidance/ng71/chapter/Recommendations",
      "access": "공식 권고 검색 본문 확인",
      "type": "진료지침/공식 권고",
      "checked": "2026-10-27"
    },
    "neuropathy": {
      "title": "Diagnosis and management of patients with polyneuropathy",
      "date": "2023-02-13",
      "url": "https://www.cmaj.ca/content/cmaj/195/6/E227.full.pdf",
      "access": "논문 본문 검색 확인",
      "type": "임상 종설; 진료지침 자체 아님",
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
    "falls": {
      "title": "NICE NG249 Falls assessment and prevention",
      "date": "2025-04-29",
      "url": "https://www.nice.org.uk/guidance/ng249/chapter/Recommendations",
      "access": "공식 권고 검색 본문 확인",
      "type": "진료지침/공식 권고",
      "checked": "2026-10-27"
    },
    "stroke": {
      "title": "AHA/ASA Early Management of Acute Ischemic Stroke",
      "date": "2026-01-26",
      "url": "https://www.ahajournals.org/doi/10.1161/STR.0000000000000513",
      "access": "공식 발표·AHA 요약 확인; 상세 투여 프로토콜 미구현",
      "type": "진료지침/공식 권고",
      "checked": "2026-10-27"
    },
    "bilateral": {
      "title": "Bilateral vestibulopathy: Diagnostic criteria",
      "date": "2017-09-23 온라인",
      "url": "https://journals.sagepub.com/doi/10.3233/VES-170619",
      "access": "본문 확인",
      "type": "공식 합의문",
      "checked": "2026-10-27"
    },
    "rehab": {
      "title": "Vestibular Rehabilitation for Peripheral Vestibular Hypofunction: An Updated Clinical Practice Guideline",
      "date": "2022-04 권호",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8920012/",
      "access": "공식 논문 검색 본문 및 ANPT 현행 지침 목록 확인",
      "type": "ANPT/APTA 진료지침",
      "checked": "2026-10-27"
    },
    "myelopathy": {
      "title": "Clinical Practice Guideline for Degenerative Cervical Myelopathy",
      "date": "2017-09-05",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/5684840/",
      "access": "발표된 지침 권고/강도 검색 본문 확인",
      "type": "진료지침/공식 권고",
      "checked": "2026-10-27"
    }
  }
};
