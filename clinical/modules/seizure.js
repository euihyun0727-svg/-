/* Source-linked factual summaries; specialist review pending. */
window.NeuroClinicalModules=window.NeuroClinicalModules||{};
window.NeuroClinicalModules["seizure"]={
  "id": "seizure",
  "name": "발작·뇌전증",
  "urgentText": "5분 이상 지속/회복 전 반복·호흡 문제·심한 손상·의식 미회복은 즉시 응급 평가",
  "extraQuestions": [
    {
      "id": "cr_sez_status",
      "stem": "지금 경련이 5분 이상 이어지거나, 깨어나기 전에 다시 반복되거나, 숨쉬기 어렵나요?",
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
      "id": "cr_sez_context",
      "stem": "열·새 약/중단·음주 중단·저혈당 같은 변화 뒤 발생했나요?",
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
      "id": "cr_sez_context_detail",
      "stem": "어떤 변화가 있었나요?",
      "options": [
        {
          "text": "열/감염"
        },
        {
          "text": "약/음주 변화"
        },
        {
          "text": "저혈당/다른 몸 상태"
        },
        {
          "text": "잘 모르겠어요"
        }
      ],
      "when": "cr_sez_context",
      "equals": "예"
    },
    {
      "id": "cr_sez_pregnancy",
      "stem": "현재 임신 중이거나 최근 출산했나요?",
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
      "id": "cr_sez_recovered",
      "stem": "지금 평소처럼 의식과 몸 상태가 돌아왔나요?",
      "options": [
        {
          "text": "아니요",
          "redFlag": true,
          "emergency": true
        },
        {
          "text": "예"
        },
        {
          "text": "잘 모르겠어요"
        }
      ],
      "risk": true,
      "emergency": true
    }
  ],
  "paths": [
    {
      "id": "first_unprovoked_seizure",
      "name": "첫 비유발 발작 평가",
      "desc": "첫 사건의 진위·유발 원인·재발 위험을 평가",
      "definition": "첫 사건의 진위·유발 원인·재발 위험을 평가",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "epilepsy",
        "syncope"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "목격/영상과 사건 전후 확인",
          "source": "epilepsy"
        },
        {
          "id": "criterion1",
          "text": "급성 유발·실신/기능성 등 감별",
          "source": "epilepsy"
        },
        {
          "id": "criterion2",
          "text": "정상 EEG로 뇌전증 배제 안 함",
          "source": "epilepsy"
        }
      ],
      "history": [
        "지속·회복·유발·약·수면·가족·기존뇌병"
      ],
      "exam": [
        "활력·신경·심장/손상"
      ],
      "tests": [
        {
          "id": "firstTests",
          "name": "ECG·원인 검사·EEG/뇌 MRI 적합성",
          "indications": "사건 감별과 재발 위험·구조 원인",
          "limitations": "검사 하나로 확정/배제 안 함. 단순 실신에 EEG 자동 적용 안 함",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "epilepsy",
            "syncope"
          ]
        }
      ],
      "nonPharmTx": [
        "운전/목욕·물/높이/작업 안전·응급 행동·수면"
      ],
      "preConfirmChecks": [
        "목격/영상과 사건 전후 확인",
        "급성 유발·실신/기능성 등 감별",
        "정상 EEG로 뇌전증 배제 안 함"
      ],
      "therapies": [
        {
          "id": "firstASM",
          "name": "항발작약 시작 여부 공동 결정",
          "evidence": "발작 확실성·재발 위험·구조/EEG·선호에 따라 결정. 첫 사건 모두 자동 시작 아님.",
          "safety": "발작 종류·임신 가능성·신장/간·기분·상호작용·발진 등 약제별 감시 확인.",
          "sourceIds": [
            "epilepsy"
          ],
          "dose": "수치 용량·증량 미확인: 해당 품목 허가사항 검토 후 결정",
          "domestic": "국내 해당 적응증·허가·급여·공급 미확인. 해외 권고와 구분"
        }
      ],
      "pharmPrinciples": [
        "항발작약 시작 여부 공동 결정: 발작 확실성·재발 위험·구조/EEG·선호에 따라 결정. 첫 사건 모두 자동 시작 아님."
      ],
      "followUpAndSafety": [
        "재발·검사 결과·기능/안전·약 내약성을 조기 확인"
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
        "처음 생긴 사건의 모습과 앞뒤 상황을 확인하고 재발 위험과 약의 이득·불편을 상의합니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "처음 생긴 사건의 모습과 앞뒤 상황을 확인하고 재발 위험과 약의 이득·불편을 상의합니다.",
      "canonical": "first_unprovoked_seizure",
      "png": false
    },
    {
      "id": "acute_symptomatic_seizure",
      "name": "급성 증상성 발작 평가",
      "desc": "급성 뇌/전신 질환 또는 물질/약 변화와의 관계 확인",
      "definition": "급성 뇌/전신 질환 또는 물질/약 변화와의 관계 확인",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "epilepsy"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "급성 대사/독성·감염·뇌 손상 시간 관계",
          "source": "epilepsy"
        },
        {
          "id": "criterion1",
          "text": "장기 뇌전증 진단과 구분",
          "source": "epilepsy"
        },
        {
          "id": "criterion2",
          "text": "의식 미회복/지속이면 응급 경로",
          "source": "epilepsy"
        }
      ],
      "history": [
        "열·저혈당·전해질·약/음주·뇌손상"
      ],
      "exam": [
        "활력/의식·신경·전신"
      ],
      "tests": [
        {
          "id": "provokedTests",
          "name": "응급 원인별 혈당/대사·감염·영상 등",
          "indications": "유발 원인 확인과 즉시 교정",
          "limitations": "원인 불명인데 외래 약 처방만으로 지연 안 함",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "epilepsy"
          ]
        }
      ],
      "nonPharmTx": [
        "응급 원인 치료와 보호·전문 의뢰"
      ],
      "preConfirmChecks": [
        "급성 대사/독성·감염·뇌 손상 시간 관계",
        "장기 뇌전증 진단과 구분",
        "의식 미회복/지속이면 응급 경로"
      ],
      "therapies": [],
      "pharmPrinciples": [
        "원인 확인 후 개별 치료. 이 경로에 자동 약물 후보를 지정하지 않습니다."
      ],
      "followUpAndSafety": [
        "유발 원인 해결·재발·장기 약 필요성을 전문 팀과 재평가"
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
        "몸이나 뇌의 급한 변화로 생긴 발작인지 확인하고 그 원인부터 치료합니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "몸이나 뇌의 급한 변화로 생긴 발작인지 확인하고 그 원인부터 치료합니다.",
      "canonical": "acute_symptomatic_seizure",
      "png": false
    },
    {
      "id": "epilepsy_classification",
      "name": "뇌전증 발작 분류·장기 관리",
      "desc": "ILAE 2025의 국소/전신/국소·전신 불명/미분류를 구분",
      "definition": "ILAE 2025의 국소/전신/국소·전신 불명/미분류를 구분",
      "classification": "ILAE 2025 분류 축",
      "sources": [
        "seizureClass",
        "epilepsy"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "시간 순 증상·의식(인식과 반응성)·증후군 대조",
          "source": "seizureClass"
        },
        {
          "id": "criterion1",
          "text": "국소에서 양측 강직간대로 진행 가능",
          "source": "seizureClass"
        },
        {
          "id": "criterion2",
          "text": "목격된 큰 경련만으로 전신 분류 확정 안 함",
          "source": "seizureClass"
        }
      ],
      "history": [
        "사건 순서·의식/회복·주기·수면·약/임신"
      ],
      "exam": [
        "신경 진찰·약 부작용/기능"
      ],
      "tests": [
        {
          "id": "classify",
          "name": "EEG·MRI·필요 시 영상 EEG",
          "indications": "발작/증후군과 원인에 맞춰 선택",
          "limitations": "분류 불확실 시 강제 라벨·처방 안 함",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "seizureClass",
            "epilepsy"
          ]
        }
      ],
      "nonPharmTx": [
        "수면/복약·SUDEP 등 개인별 안전 교육·임신 계획 상담"
      ],
      "preConfirmChecks": [
        "시간 순 증상·의식(인식과 반응성)·증후군 대조",
        "국소에서 양측 강직간대로 진행 가능",
        "목격된 큰 경련만으로 전신 분류 확정 안 함"
      ],
      "therapies": [
        {
          "id": "focalASM",
          "name": "국소 발작: lamotrigine/levetiracetam 등",
          "evidence": "NICE는 해당 성인 국소 발작의 1차 단독 선택지로 고려. 전신·미분류에 자동 복제 안 함.",
          "safety": "발진/느린 증량·기분/행동·신기능·호르몬/임신·병용약을 제품별 확인.",
          "sourceIds": [
            "epilepsy"
          ],
          "dose": "수치 용량·증량 미확인: 해당 품목 허가사항 검토 후 결정",
          "domestic": "국내 해당 적응증·허가·급여·공급 미확인. 해외 권고와 구분"
        },
        {
          "id": "generalASM",
          "name": "전신 발작: 종류별 전문 선택",
          "evidence": "근간대·결신·강직간대 등 종류별 약제가 다름.",
          "safety": "Valproate 생식/임신 위험과 국가별 제한 확인. 영국 MHRA 규정을 한국 법/허가로 표시하지 않음.",
          "sourceIds": [
            "epilepsy"
          ],
          "dose": "수치 용량·증량 미확인: 해당 품목 허가사항 검토 후 결정",
          "domestic": "국내 해당 적응증·허가·급여·공급 미확인. 해외 권고와 구분"
        }
      ],
      "pharmPrinciples": [
        "국소 발작: lamotrigine/levetiracetam 등: NICE는 해당 성인 국소 발작의 1차 단독 선택지로 고려. 전신·미분류에 자동 복제 안 함.",
        "전신 발작: 종류별 전문 선택: 근간대·결신·강직간대 등 종류별 약제가 다름."
      ],
      "followUpAndSafety": [
        "발작일/손상·순응/부작용·임신 계획·기능·재발 시 분류/약 재평가"
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
        "발작의 모습과 순서를 구분해 맞는 약을 정하고 임의로 끊지 않습니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "발작의 모습과 순서를 구분해 맞는 약을 정하고 임의로 끊지 않습니다.",
      "canonical": "epilepsy_classification",
      "png": false,
      "facets": "seizure"
    },
    {
      "id": "functional_seizures",
      "name": "기능성 발작 평가·관리",
      "desc": "양성 임상 특징·가능한 영상 EEG 등 전문 진단과 설명",
      "definition": "양성 임상 특징·가능한 영상 EEG 등 전문 진단과 설명",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "functionalSeizure"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "일반 영상/EEG 정상만으로 확정 안 함",
          "source": "functionalSeizure"
        },
        {
          "id": "criterion1",
          "text": "뇌전증 공존·사건 유형별 증거 확인",
          "source": "functionalSeizure"
        },
        {
          "id": "criterion2",
          "text": "새 응급 사건은 확정 기능성으로 간주해 치료 지연 안 함",
          "source": "functionalSeizure"
        }
      ],
      "history": [
        "목격·전형 사건·이전 진단·약·기능/정신건강"
      ],
      "exam": [
        "증거 기반 전문 평가·동반 질환"
      ],
      "tests": [
        {
          "id": "vEEG",
          "name": "필요 시 전형 사건 영상 EEG/전문 평가",
          "indications": "기능성·뇌전증 공존과 사건별 확실성",
          "limitations": "한 음성 EEG/불안만으로 확정 안 함",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "functionalSeizure"
          ]
        }
      ],
      "nonPharmTx": [
        "존중하는 설명·심리 치료·가족 동의하 지원"
      ],
      "preConfirmChecks": [
        "일반 영상/EEG 정상만으로 확정 안 함",
        "뇌전증 공존·사건 유형별 증거 확인",
        "새 응급 사건은 확정 기능성으로 간주해 치료 지연 안 함"
      ],
      "therapies": [],
      "pharmPrinciples": [
        "AAN Level B: 동반 뇌전증/다른 적응증 없는 확정 기능성 발작에 benzodiazepine/항발작약을 쓰지 않음. 기존 약 감량은 의료진 감독; 급성 미확정 응급 발작에 이 제한을 자동 적용하지 않음."
      ],
      "followUpAndSafety": [
        "사건/기능·치료 참여·동반 뇌전증·약 감량 안전 추적"
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
        "증상은 실제이며 진단 근거를 설명받고 회복을 위한 치료와 지지를 함께 정합니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "증상은 실제이며 진단 근거를 설명받고 회복을 위한 치료와 지지를 함께 정합니다.",
      "canonical": "functional_seizures",
      "png": false
    },
    {
      "id": "status_seizure_eval",
      "name": "지속·반복 발작 응급 평가",
      "desc": "지속 경련·회복 전 반복·호흡/손상 위험은 긴급 경로",
      "definition": "지속 경련·회복 전 반복·호흡/손상 위험은 긴급 경로",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "epilepsy"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "지속시간·회복·호흡·반복 확인",
          "source": "epilepsy"
        },
        {
          "id": "criterion1",
          "text": "응급 진단/치료를 우선",
          "source": "epilepsy"
        }
      ],
      "history": [
        "시작 시각·기존 구조약/계획·복용/중단·유발"
      ],
      "exam": [
        "기도/호흡·혈당/활력·의식·손상"
      ],
      "tests": [
        {
          "id": "status",
          "name": "응급 처치·원인/EEG 등 전문 평가",
          "indications": "현재 지속/회복 미흡·비경련성 의심",
          "limitations": "외래 EEG 예약이나 분류 체크 때문에 처치 지연 금지",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "epilepsy"
          ]
        }
      ],
      "nonPharmTx": [
        "주변 위험 제거·시간 기록·구강에 물건/음료 넣지 않기·응급 도움"
      ],
      "preConfirmChecks": [
        "지속시간·회복·호흡·반복 확인",
        "응급 진단/치료를 우선"
      ],
      "therapies": [],
      "pharmPrinciples": [
        "원인 확인 후 개별 치료. 이 경로에 자동 약물 후보를 지정하지 않습니다."
      ],
      "followUpAndSafety": [
        "응급 평가 후 원인·구조 계획·복약/안전 재정비"
      ],
      "referralCriteria": [
        "5분 이상 경련·회복 전 반복·호흡 문제 등은 즉시 응급 이송. 이 앱에서 구조약 정량 투여 지시를 생성하지 않음."
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
        "오래 이어지거나 깨어나기 전에 반복되는 경련은 즉시 도움을 요청하고 시작 시간을 알려주세요.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "오래 이어지거나 깨어나기 전에 반복되는 경련은 즉시 도움을 요청하고 시작 시간을 알려주세요.",
      "canonical": "status_seizure_eval",
      "png": false
    }
  ],
  "version": "2026-10-27",
  "review": "신경과 전문의 최종 검수 전",
  "sources": {
    "epilepsy": {
      "title": "NICE NG217 Epilepsies: diagnosis and treatment",
      "date": "2022 / 2025 개정",
      "url": "https://www.nice.org.uk/guidance/ng217/chapter/5-Treating-epileptic-seizures-in-children-young-people-and-adults",
      "access": "공식 진단·치료 검색 본문 확인; 일부 직접 장 접근 실패",
      "type": "진료지침/공식 권고",
      "checked": "2026-10-27"
    },
    "syncope": {
      "title": "NICE CG109 Transient loss of consciousness in over 16s",
      "date": "2010 / 2023 개정",
      "url": "https://www.nice.org.uk/guidance/cg109/chapter/Recommendations",
      "access": "공식 권고 검색 본문 확인",
      "type": "진료지침/공식 권고",
      "checked": "2026-10-27"
    },
    "seizureClass": {
      "title": "ILAE Updated classification of epileptic seizures",
      "date": "2025-04-23",
      "url": "https://www.ilae.org/guidelines/definition-and-classification/updated-classification-of-epileptic-seizures-2025",
      "access": "공식 학회 본문 확인; 의견수렴 초안 아닌 최종 분류",
      "type": "공식 분류 입장문",
      "checked": "2026-10-27"
    },
    "functionalSeizure": {
      "title": "AAN Management of Functional Seizures",
      "date": "2025 승인 / 2026 발표",
      "url": "https://aanfiles.blob.core.windows.net/guidelines/2cceae40-edcf-484d-9054-bbdf76206bca/25_FunctionalSeizure-ClinGL_v03b.pdf",
      "access": "발표된 공식 의료진 권고 요약 확인",
      "type": "진료지침/공식 권고",
      "checked": "2026-10-27"
    }
  }
};
