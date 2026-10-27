/* Source-linked factual summaries; specialist review pending. */
window.NeuroClinicalModules=window.NeuroClinicalModules||{};
window.NeuroClinicalModules["weakness"]={
  "id": "weakness",
  "name": "근력저하",
  "urgentText": "갑작스러운 편측 마비·호흡/연하·빠른 상행 약화·새 배뇨/회음부 변화는 즉시 평가",
  "extraQuestions": [
    {
      "id": "cr_wek_breath",
      "stem": "가만히 있어도 숨이 차거나, 누우면 숨이 더 차거나, 침·음식을 삼키기 어렵나요?",
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
      "id": "cr_wek_bladder",
      "stem": "힘이 빠지면서 새 배뇨/대변 조절이나 회음부 감각 변화가 있나요?",
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
      "id": "cr_wek_fatigable",
      "stem": "쉬면 나아지고 오래 쓰면 더 힘이 빠지거나 눈꺼풀·겹보임이 달라지나요?",
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
      "id": "cr_wek_fatigable_detail",
      "stem": "주로 어느 활동에서 달라지나요?",
      "options": [
        {
          "text": "눈·말하기/씹기"
        },
        {
          "text": "팔·다리 활동"
        },
        {
          "text": "여러 부위/잘 모르겠어요"
        }
      ],
      "when": "cr_wek_fatigable",
      "equals": "예"
    },
    {
      "id": "cr_wek_painmed",
      "stem": "근육통·진한 소변·새 약/격한 운동과 관련이 있나요?",
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
    }
  ],
  "paths": [
    {
      "id": "acute_stroke_eval",
      "name": "급성 뇌졸중·국소 신경 응급 평가",
      "desc": "급성 국소 결손의 허혈/출혈/모방 질환을 신속 구분",
      "definition": "급성 국소 결손의 허혈/출혈/모방 질환을 신속 구분",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "stroke",
        "neuro"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "발병/마지막 정상 시각·국소 결손·의식 확인",
          "source": "stroke"
        },
        {
          "id": "criterion1",
          "text": "외래 답변으로 허혈 확정/출혈 배제 안 함",
          "source": "stroke"
        }
      ],
      "history": [
        "정상 시각·항응고/수술·혈당·기왕력"
      ],
      "exam": [
        "기도/호흡·혈당·신경/활력"
      ],
      "tests": [
        {
          "id": "strokeTransfer",
          "name": "응급 뇌/혈관 영상·뇌졸중 센터 평가",
          "indications": "허혈/출혈·재관류 적합성",
          "limitations": "외래 검사·설문 완료 때문에 전원 지연 금지",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "stroke",
            "neuro"
          ]
        }
      ],
      "nonPharmTx": [
        "응급 이송·마지막 정상 시각과 약 목록 전달"
      ],
      "preConfirmChecks": [
        "발병/마지막 정상 시각·국소 결손·의식 확인",
        "외래 답변으로 허혈 확정/출혈 배제 안 함"
      ],
      "therapies": [],
      "pharmPrinciples": [
        "영상 전 aspirin·항응고·혈전용해제 자동 안내 없음. 2026 AHA/ASA 재관류 선택은 전문 센터가 판단."
      ],
      "followUpAndSafety": [
        "급성 치료 후 원인·재활·재발 예방 계획으로 연결"
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
        "한쪽 힘이나 말이 갑자기 달라지면 시작 시간을 알려주고 즉시 도움을 요청하세요.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "한쪽 힘이나 말이 갑자기 달라지면 시작 시간을 알려주고 즉시 도움을 요청하세요.",
      "canonical": "acute_stroke_eval",
      "png": false
    },
    {
      "id": "weak_spinal",
      "name": "척수·마미 관련 약화 평가",
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
      "id": "weak_neuropathy",
      "name": "말초신경·신경근성 약화 평가",
      "desc": "길이 의존적 양측 감각/운동 증후군과 원인을 평가",
      "definition": "길이 의존적 양측 감각/운동 증후군과 원인을 평가",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "neuropathy",
        "gbs",
        "neuro"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "분포·진행·반사/감각·운동을 대조",
          "source": "neuropathy"
        },
        {
          "id": "criterion1",
          "text": "급성·비대칭·운동 우세·전신 징후는 다른 경로",
          "source": "neuropathy"
        }
      ],
      "history": [
        "당뇨·영양/B12·음주·가족·약/항암·신장"
      ],
      "exam": [
        "근력·반사·통각/진동/위치·보행·발 피부"
      ],
      "tests": [
        {
          "id": "dspLabs",
          "name": "원인별 혈액검사",
          "indications": "혈당·B12·신장/단백 등 병력별 선별",
          "limitations": "무차별 자가면역 패널·척추 MRI를 관행적으로 적용 안 함",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "neuropathy",
            "pdn",
            "neuro"
          ]
        },
        {
          "id": "dspEdx",
          "name": "필요 시 NCS/EMG",
          "indications": "축삭/탈수초·분포 및 비전형 평가",
          "limitations": "원인 명확한 모든 경증 감각형에 일률적 검사 아님",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "neuropathy",
            "pdn",
            "neuro"
          ]
        }
      ],
      "nonPharmTx": [
        "원인 교정·발 보호·낙상 예방·혈당/생활 관리"
      ],
      "preConfirmChecks": [
        "분포·진행·반사/감각·운동을 대조",
        "급성·비대칭·운동 우세·전신 징후는 다른 경로"
      ],
      "therapies": [],
      "pharmPrinciples": [
        "운동 우세·빠른 진행·반사/자율신경 소견은 긴급 신경근 평가. 통증성 당뇨 약제를 근력 회복약으로 자동 적용하지 않음."
      ],
      "followUpAndSafety": [
        "통증뿐 아니라 기능·수면/기분·발 병변·부작용·진행을 평가"
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
        "말초신경은 여러 원인으로 손상될 수 있어 약으로 통증을 줄이는 일과 원인 관리를 함께 합니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "말초신경은 여러 원인으로 손상될 수 있어 약으로 통증을 줄이는 일과 원인 관리를 함께 합니다.",
      "canonical": "polyneuropathy",
      "png": false
    },
    {
      "id": "neuromuscular_junction",
      "name": "신경근접합부질환·근무력증 평가",
      "desc": "변동/피로성 약화와 호흡/연하 위험을 확인",
      "definition": "변동/피로성 약화와 호흡/연하 위험을 확인",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "mg",
        "neuro"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "피로성·안구/연수·분포 확인",
          "source": "mg"
        },
        {
          "id": "criterion1",
          "text": "호흡/연하 악화는 긴급",
          "source": "mg"
        },
        {
          "id": "criterion2",
          "text": "항체 음성/검사 하나로 배제하지 않음",
          "source": "mg"
        }
      ],
      "history": [
        "변동·악화 약/감염·호흡·연하·흉선"
      ],
      "exam": [
        "피로성·눈/구음·사지·호흡/연하"
      ],
      "tests": [
        {
          "id": "mgTests",
          "name": "항체·반복자극/SFEMG·흉선/호흡 전문 평가",
          "indications": "임상형·항체·중증도에 맞게",
          "limitations": "검사 예약 때문에 호흡 위험 관리 지연 금지",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "mg",
            "neuro"
          ]
        }
      ],
      "nonPharmTx": [
        "악화 약 검토·식사/호흡 안전·전문 신경근 진료"
      ],
      "preConfirmChecks": [
        "피로성·안구/연수·분포 확인",
        "호흡/연하 악화는 긴급",
        "항체 음성/검사 하나로 배제하지 않음"
      ],
      "therapies": [
        {
          "id": "mgTx",
          "name": "증상약·면역치료/흉선·위기 치료 의뢰",
          "evidence": "국제 합의: 임상형·항체·중증도·반응에 따른 선택.",
          "safety": "콜린성 부작용·감염·약 초기 악화 및 면역제/생물학제 특이 감시를 전문 팀이 결정. 최신 신약 전체 비교·국내 조건 미확인.",
          "sourceIds": [
            "mg"
          ],
          "dose": "수치 용량·증량 미확인: 해당 품목 허가사항 검토 후 결정",
          "domestic": "국내 해당 적응증·허가·급여·공급 미확인. 해외 권고와 구분"
        }
      ],
      "pharmPrinciples": [
        "증상약·면역치료/흉선·위기 치료 의뢰: 국제 합의: 임상형·항체·중증도·반응에 따른 선택."
      ],
      "followUpAndSafety": [
        "근력/기능·호흡/연하·악화/감염·치료 내약성 추적"
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
        "사용하면 더 힘이 빠지는 양상을 확인하고 숨·삼키기 변화는 즉시 알리세요.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "사용하면 더 힘이 빠지는 양상을 확인하고 숨·삼키기 변화는 즉시 알리세요.",
      "canonical": "neuromuscular_junction",
      "png": false
    },
    {
      "id": "myopathy_eval",
      "name": "근육질환·약물/대사성 근병증 평가",
      "desc": "근위부 약화·근육통·CK/전신 소견의 원인을 구분",
      "definition": "근위부 약화·근육통·CK/전신 소견의 원인을 구분",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "neuro"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "진성 약화와 통증/피로 구분",
          "source": "neuro"
        },
        {
          "id": "criterion1",
          "text": "염증·약/독성·내분비/대사·유전 원인 감별",
          "source": "neuro"
        }
      ],
      "history": [
        "근육통/소변·운동·약·발진·가족/전신"
      ],
      "exam": [
        "근위/경부 힘·피부·호흡/연하"
      ],
      "tests": [
        {
          "id": "myopathy",
          "name": "CK·전해질/신장/갑상선·선택 EMG/생검",
          "indications": "원인/중증도·전문 치료 적합성",
          "limitations": "일률적 steroid 처방 전 원인 확인. 진한 소변/심한 급성통·약화는 신속 평가",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "neuro"
          ]
        }
      ],
      "nonPharmTx": [
        "원인 약/전신 문제 검토·호흡/기능·안전 지원"
      ],
      "preConfirmChecks": [
        "진성 약화와 통증/피로 구분",
        "염증·약/독성·내분비/대사·유전 원인 감별"
      ],
      "therapies": [],
      "pharmPrinciples": [
        "원인 확인 후 개별 치료. 이 경로에 자동 약물 후보를 지정하지 않습니다."
      ],
      "followUpAndSafety": [
        "CK/신기능 등 원인 지표·근력/연하·기능 추적"
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
        "근육 자체 문제인지 약이나 몸 상태의 영향인지 확인하며 통증·소변 변화도 알려주세요.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "근육 자체 문제인지 약이나 몸 상태의 영향인지 확인하며 통증·소변 변화도 알려주세요.",
      "canonical": "myopathy_eval",
      "png": false
    },
    {
      "id": "motor_neuron_eval",
      "name": "운동신경원질환 등 진행성 약화 감별",
      "desc": "진행성 운동 소견과 모방 질환을 전문 평가",
      "definition": "진행성 운동 소견과 모방 질환을 전문 평가",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "neuro"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "상/하위운동신경·분포/진행 확인",
          "source": "neuro"
        },
        {
          "id": "criterion1",
          "text": "감각/구조·접합부·근육 원인 감별",
          "source": "neuro"
        },
        {
          "id": "criterion2",
          "text": "떨림/근육실룩만으로 확정 안 함",
          "source": "neuro"
        }
      ],
      "history": [
        "진행·연하/말·호흡/체중·경련/가족"
      ],
      "exam": [
        "근력·위축/반사·연수·호흡"
      ],
      "tests": [
        {
          "id": "mnd",
          "name": "NCS/EMG·구조/원인 검사·호흡 평가",
          "indications": "진단과 치료 가능한 모방 질환 평가",
          "limitations": "급성 호흡/연하 문제에 외래 추적만 하지 않음",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "neuro"
          ]
        }
      ],
      "nonPharmTx": [
        "조기 다학제·영양/연하·호흡·의사소통 지원"
      ],
      "preConfirmChecks": [
        "상/하위운동신경·분포/진행 확인",
        "감각/구조·접합부·근육 원인 감별",
        "떨림/근육실룩만으로 확정 안 함"
      ],
      "therapies": [],
      "pharmPrinciples": [
        "원인 확인 후 개별 치료. 이 경로에 자동 약물 후보를 지정하지 않습니다."
      ],
      "followUpAndSafety": [
        "호흡·연하·체중·기능·돌봄 목표 추적"
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
        "지속적으로 힘이 줄면 여러 원인을 구분하고 숨과 식사·생활의 도움을 함께 준비합니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "지속적으로 힘이 줄면 여러 원인을 구분하고 숨과 식사·생활의 도움을 함께 준비합니다.",
      "canonical": "motor_neuron_eval",
      "png": false
    }
  ],
  "version": "2026-10-27",
  "review": "신경과 전문의 최종 검수 전",
  "sources": {
    "stroke": {
      "title": "AHA/ASA Early Management of Acute Ischemic Stroke",
      "date": "2026-01-26",
      "url": "https://www.ahajournals.org/doi/10.1161/STR.0000000000000513",
      "access": "공식 발표·AHA 요약 확인; 상세 투여 프로토콜 미구현",
      "type": "진료지침/공식 권고",
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
    "myelopathy": {
      "title": "Clinical Practice Guideline for Degenerative Cervical Myelopathy",
      "date": "2017-09-05",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/5684840/",
      "access": "발표된 지침 권고/강도 검색 본문 확인",
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
    "gbs": {
      "title": "EAN/PNS Guideline on diagnosis and treatment of Guillain–Barré syndrome",
      "date": "2023",
      "url": "https://onlinelibrary.wiley.com/doi/10.1111/ene.16073",
      "access": "발표된 최종 논문 본문 확인; 의견수렴 초안 미사용",
      "type": "진료지침/공식 권고",
      "checked": "2026-10-27"
    },
    "pdn": {
      "title": "AAN Oral and Topical Treatment of Painful Diabetic Polyneuropathy",
      "date": "2021-12-27 / 2022 권호",
      "url": "https://www.aan.com/Guidelines/home/GetGuidelineContent/1055",
      "access": "공식 의료진 요약 PDF 본문 확인",
      "type": "진료지침/공식 권고",
      "checked": "2026-10-27"
    },
    "mg": {
      "title": "International Consensus Guidance for Management of Myasthenia Gravis: 2020 Update",
      "date": "2020 온라인 / 2021-01-19 권호",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/pmid/33144515/",
      "access": "발표된 국제 합의 권고 검색 본문 확인; 신약 전체 비교는 미확인",
      "type": "진료지침/공식 권고",
      "checked": "2026-10-27"
    }
  }
};
