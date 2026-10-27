/* Source-linked factual summaries; specialist review pending. */
window.NeuroClinicalModules=window.NeuroClinicalModules||{};
window.NeuroClinicalModules["numbness"]={
  "id": "numbness",
  "name": "저림·말초신경",
  "urgentText": "급성 편측 감각/힘 변화·빠른 상행 마비·호흡/연하·배뇨/회음부 변화는 긴급 평가",
  "extraQuestions": [
    {
      "id": "cr_num_breath",
      "stem": "저림과 함께 새로 숨쉬거나 삼키기 어렵거나, 힘이 빠지는 부위가 빠르게 퍼지나요?",
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
      "id": "cr_num_course",
      "stem": "얼마나 지속되고 있나요?",
      "options": [
        {
          "text": "갑자기 시작"
        },
        {
          "text": "며칠~몇 주"
        },
        {
          "text": "몇 달 이상"
        },
        {
          "text": "잘 모르겠어요"
        }
      ]
    },
    {
      "id": "cr_num_exposure",
      "stem": "당뇨·영양 부족·음주·새 약/항암치료와 관련이 있나요?",
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
      "id": "cr_num_exposure_detail",
      "stem": "관련된 내용을 알고 있나요?",
      "options": [
        {
          "text": "당뇨/콩팥 질환"
        },
        {
          "text": "영양·음주"
        },
        {
          "text": "새 약/항암치료"
        },
        {
          "text": "잘 모르겠어요"
        }
      ],
      "when": "cr_num_exposure",
      "equals": "예"
    }
  ],
  "paths": [
    {
      "id": "polyneuropathy",
      "name": "원위부 대칭성 다발신경병증",
      "desc": "길이 의존적 양측 감각/운동 증후군과 원인을 평가",
      "definition": "길이 의존적 양측 감각/운동 증후군과 원인을 평가",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "neuropathy",
        "pdn",
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
      "therapies": [
        {
          "id": "pdnPain",
          "name": "통증성 당뇨 신경병의 증상 약물",
          "evidence": "AAN: TCA/SNRI/gabapentinoid/나트륨통로 계열 선택·다른 계열 전환 검토(Level B), opioid 사용 반대(Level B).",
          "safety": "통증 원인이 당뇨인지 확인. 신기능·진정/호흡·낙상·기분·병용약·심혈관/항콜린 부담에 따라 선택. 다른 신경병 원인에 같은 등급 자동 외삽 안 함.",
          "sourceIds": [
            "pdn",
            "neuropathy"
          ],
          "dose": "수치 용량·증량 미확인: 해당 품목 허가사항 검토 후 결정",
          "domestic": "국내 해당 적응증·허가·급여·공급 미확인. 해외 권고와 구분"
        }
      ],
      "pharmPrinciples": [
        "통증성 당뇨 신경병의 증상 약물: AAN: TCA/SNRI/gabapentinoid/나트륨통로 계열 선택·다른 계열 전환 검토(Level B), opioid 사용 반대(Level B)."
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
      "id": "small_fiber_neuropathy",
      "name": "소섬유신경병증 평가",
      "desc": "통증/온도·자율신경 위주의 이상을 객관 평가",
      "definition": "통증/온도·자율신경 위주의 이상을 객관 평가",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "neuropathy",
        "neuro"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "소섬유 양상과 큰 섬유/중추·피부 원인 감별",
          "source": "neuropathy"
        },
        {
          "id": "criterion1",
          "text": "정상 NCS로 배제 안 함",
          "source": "neuropathy"
        }
      ],
      "history": [
        "화끈거림·온도·발한/기립·당뇨/약·전신 질환"
      ],
      "exam": [
        "통각/온도·큰 섬유/반사·피부"
      ],
      "tests": [
        {
          "id": "sfn",
          "name": "피부생검/자율신경 등 전문 평가",
          "indications": "소섬유 손상·원인 확인이 관리에 도움이 될 때",
          "limitations": "검사별 정상치/한계 확인. 정상 NCS=정상 신경으로 단정 안 함",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "neuropathy",
            "neuro"
          ]
        }
      ],
      "nonPharmTx": [
        "원인·피부/발 안전·기능 관리"
      ],
      "preConfirmChecks": [
        "소섬유 양상과 큰 섬유/중추·피부 원인 감별",
        "정상 NCS로 배제 안 함"
      ],
      "therapies": [],
      "pharmPrinciples": [
        "원인 확인 후 개별 치료. 이 경로에 자동 약물 후보를 지정하지 않습니다."
      ],
      "followUpAndSafety": [
        "통증·자율신경/기능 변화·큰 섬유/운동 징후 재평가"
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
        "일반 신경검사가 정상이어도 통증과 온도 감각에 관련된 작은 신경을 더 살펴볼 수 있습니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "일반 신경검사가 정상이어도 통증과 온도 감각에 관련된 작은 신경을 더 살펴볼 수 있습니다.",
      "canonical": "small_fiber_neuropathy",
      "png": false
    },
    {
      "id": "cts",
      "name": "수근관증후군",
      "desc": "손목 부위 정중신경 포착과 중증도를 평가",
      "definition": "손목 부위 정중신경 포착과 중증도를 평가",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "cts",
        "neuro"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "정중 분포·야간/사용 관련·무지구 약화 대조",
          "source": "cts"
        },
        {
          "id": "criterion1",
          "text": "경추/다른 포착·전신신경병 감별",
          "source": "cts"
        }
      ],
      "history": [
        "손 사용·야간·지속 감각저하·근력·당뇨/임신"
      ],
      "exam": [
        "분포·유발·무지구 힘/위축"
      ],
      "tests": [
        {
          "id": "ctsAssess",
          "name": "임상 평가·선택 NCS/초음파",
          "indications": "불확실·중증/수술 계획 등 목적에 맞게",
          "limitations": "CTS-6 권고가 있어도 권리 확인 없는 원문 문항은 추가 안 함. MRI 관행 사용 안 함",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "cts",
            "neuro"
          ]
        }
      ],
      "nonPharmTx": [
        "부목/손목 부담 조정 등 보존적 관리 적합성 검토"
      ],
      "preConfirmChecks": [
        "정중 분포·야간/사용 관련·무지구 약화 대조",
        "경추/다른 포착·전신신경병 감별"
      ],
      "therapies": [
        {
          "id": "ctsTx",
          "name": "주사/감압술 의뢰 검토",
          "evidence": "AAOS 2024: 스테로이드 주사는 장기 개선 근거 없음(강한 근거). 지속/중증·약화는 감압 평가.",
          "safety": "일시 효과와 장기 효과 구분, 주사/수술 위험·당뇨·신경 손상·재발 및 전문 시행 적합성 검토.",
          "sourceIds": [
            "cts",
            "neuro"
          ],
          "dose": "수치 용량·증량 미확인: 해당 품목 허가사항 검토 후 결정",
          "domestic": "국내 해당 적응증·허가·급여·공급 미확인. 해외 권고와 구분"
        }
      ],
      "pharmPrinciples": [
        "주사/감압술 의뢰 검토: AAOS 2024: 스테로이드 주사는 장기 개선 근거 없음(강한 근거). 지속/중증·약화는 감압 평가."
      ],
      "followUpAndSafety": [
        "야간 증상·감각·무지구 힘/기능과 보존 치료 실패를 재평가"
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
        "손목에서 신경이 눌리는지 확인하고 감각과 엄지 힘이 나빠지면 치료 계획을 다시 봅니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "손목에서 신경이 눌리는지 확인하고 감각과 엄지 힘이 나빠지면 치료 계획을 다시 봅니다.",
      "canonical": "cts",
      "png": true
    },
    {
      "id": "ulnar_neuropathy",
      "name": "척골신경병증 평가",
      "desc": "팔꿈치/손목 포착 위치와 다른 원인을 구분",
      "definition": "팔꿈치/손목 포착 위치와 다른 원인을 구분",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "neuro",
        "neuropathy"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "척골 분포·손 내재근·포착 위치 대조",
          "source": "neuro"
        },
        {
          "id": "criterion1",
          "text": "C8/T1·전신 신경병 감별",
          "source": "neuro"
        }
      ],
      "history": [
        "팔꿈치 압박/굽힘·손 사용·근력·외상"
      ],
      "exam": [
        "감각 분포·손 내재근·근위/경추 진찰"
      ],
      "tests": [
        {
          "id": "ulnarEdx",
          "name": "선택 NCS/EMG·초음파",
          "indications": "위치/중증도·다른 원인 구분",
          "limitations": "단일 유발검사만으로 확정하지 않음",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "neuro",
            "neuropathy"
          ]
        }
      ],
      "nonPharmTx": [
        "압박·지속 굽힘·작업 자세 조정"
      ],
      "preConfirmChecks": [
        "척골 분포·손 내재근·포착 위치 대조",
        "C8/T1·전신 신경병 감별"
      ],
      "therapies": [],
      "pharmPrinciples": [
        "원인 확인 후 개별 치료. 이 경로에 자동 약물 후보를 지정하지 않습니다."
      ],
      "followUpAndSafety": [
        "감각·집기/손 힘·위축·지속 악화로 전문 감압 평가"
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
        "팔꿈치나 손목에서 신경이 눌리는 위치와 손 힘의 변화를 살핍니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "팔꿈치나 손목에서 신경이 눌리는 위치와 손 힘의 변화를 살핍니다.",
      "canonical": "ulnar_neuropathy",
      "png": false
    },
    {
      "id": "radiculopathy",
      "name": "신경근병증",
      "desc": "목/허리에서 뻗치는 증상과 신경근 소견의 일치를 확인",
      "definition": "목/허리에서 뻗치는 증상과 신경근 소견의 일치를 확인",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "neuro"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "통증/감각·근절 근력·반사 대조",
          "source": "neuro"
        },
        {
          "id": "criterion1",
          "text": "척수병증/마미·포착신경 감별",
          "source": "neuro"
        }
      ],
      "history": [
        "방사통·힘·보행·회음부/배뇨·암/감염"
      ],
      "exam": [
        "근력/반사·감각·척수/하지 소견"
      ],
      "tests": [
        {
          "id": "radicularImaging",
          "name": "선택 MRI/NCS·EMG",
          "indications": "진행 약화·중추/마미 우려·결과가 치료에 영향 시",
          "limitations": "안정 경증에 일률적 영상/전원 아님. 진행·배뇨 이상은 지연 금지",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "neuro"
          ]
        }
      ],
      "nonPharmTx": [
        "안전한 활동·재활·자세·작업 조정"
      ],
      "preConfirmChecks": [
        "통증/감각·근절 근력·반사 대조",
        "척수병증/마미·포착신경 감별"
      ],
      "therapies": [],
      "pharmPrinciples": [
        "원인 확인 후 개별 치료. 이 경로에 자동 약물 후보를 지정하지 않습니다."
      ],
      "followUpAndSafety": [
        "통증·기능·객관 약화/반사와 새로운 척수/마미 신호 추적"
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
        "목이나 허리의 신경과 증상이 맞는지 보고 힘이나 배뇨가 달라지면 빨리 평가받습니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "목이나 허리의 신경과 증상이 맞는지 보고 힘이나 배뇨가 달라지면 빨리 평가받습니다.",
      "canonical": "radiculopathy",
      "png": false
    },
    {
      "id": "acute_neuropathy_eval",
      "name": "급성 진행성 신경병증·GBS 위험 평가",
      "desc": "빠른 신경근성 악화와 호흡/자율신경 위험의 응급 감별",
      "definition": "빠른 신경근성 악화와 호흡/자율신경 위험의 응급 감별",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "gbs",
        "neuro"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "빠른 대칭 약화·반사·감각/뇌신경 확인",
          "source": "gbs"
        },
        {
          "id": "criterion1",
          "text": "호흡·연하·자율신경 우선",
          "source": "gbs"
        },
        {
          "id": "criterion2",
          "text": "초기 검사 정상만으로 배제 안 함",
          "source": "gbs"
        }
      ],
      "history": [
        "최근 감염·진행 속도·보행/호흡·심계항진"
      ],
      "exam": [
        "호흡/연하·사지 힘/반사·자율신경"
      ],
      "tests": [
        {
          "id": "gbsWorkup",
          "name": "응급 호흡·심혈관/CSF·NCS 평가",
          "indications": "입원/ICU 필요성과 원인 확립",
          "limitations": "외래 신경검사 예약 때문에 전원 지연 금지",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "gbs",
            "neuro"
          ]
        }
      ],
      "nonPharmTx": [
        "안전 보호·신속한 응급/신경근 전문 의뢰"
      ],
      "preConfirmChecks": [
        "빠른 대칭 약화·반사·감각/뇌신경 확인",
        "호흡·연하·자율신경 우선",
        "초기 검사 정상만으로 배제 안 함"
      ],
      "therapies": [
        {
          "id": "gbsTx",
          "name": "입원 IVIg 또는 혈장교환 적합성",
          "evidence": "EAN/PNS 2023: 진행·보행·호흡/연하·기간에 따른 전문 치료. 경구 steroid는 권고하지 않음.",
          "safety": "IVIg/PE의 신장·혈전·순환 위험과 호흡/자율신경 감시를 전문 팀이 결정. 외래 용량 오더 생성 없음.",
          "sourceIds": [
            "gbs"
          ],
          "dose": "수치 용량·증량 미확인: 해당 품목 허가사항 검토 후 결정",
          "domestic": "국내 해당 적응증·허가·급여·공급 미확인. 해외 권고와 구분"
        }
      ],
      "pharmPrinciples": [
        "입원 IVIg 또는 혈장교환 적합성: EAN/PNS 2023: 진행·보행·호흡/연하·기간에 따른 전문 치료. 경구 steroid는 권고하지 않음."
      ],
      "followUpAndSafety": [
        "입원 평가 결과와 회복·재활·호흡/자율신경 상태 추적"
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
        "힘이 빠지는 부위가 빠르게 퍼지거나 숨·삼키기가 불편하면 검사를 기다리지 말고 즉시 알리세요.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "힘이 빠지는 부위가 빠르게 퍼지거나 숨·삼키기가 불편하면 검사를 기다리지 말고 즉시 알리세요.",
      "canonical": "acute_neuropathy_eval",
      "png": false
    }
  ],
  "version": "2026-10-27",
  "review": "신경과 전문의 최종 검수 전",
  "sources": {
    "neuropathy": {
      "title": "Diagnosis and management of patients with polyneuropathy",
      "date": "2023-02-13",
      "url": "https://www.cmaj.ca/content/cmaj/195/6/E227.full.pdf",
      "access": "논문 본문 검색 확인",
      "type": "임상 종설; 진료지침 자체 아님",
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
    "neuro": {
      "title": "NICE NG127 Suspected neurological conditions: recognition and referral",
      "date": "2019, 현행 웹 권고 확인",
      "url": "https://www.nice.org.uk/guidance/ng127/chapter/Recommendations-for-adults-aged-over-16",
      "access": "공식 권고 검색 본문 확인; 직접 페이지 접근 제한",
      "type": "진료지침/공식 권고",
      "checked": "2026-10-27"
    },
    "cts": {
      "title": "AAOS Management of Carpal Tunnel Syndrome",
      "date": "2024",
      "url": "https://www.aaos.org/globalassets/quality-and-practice-resources/carpal-tunnel/orthoguidelines_infographic_cts-6-5-24.pdf",
      "access": "발표된 공식 권고 요약 확인",
      "type": "진료지침/공식 권고",
      "checked": "2026-10-27"
    },
    "gbs": {
      "title": "EAN/PNS Guideline on diagnosis and treatment of Guillain–Barré syndrome",
      "date": "2023",
      "url": "https://onlinelibrary.wiley.com/doi/10.1111/ene.16073",
      "access": "발표된 최종 논문 본문 확인; 의견수렴 초안 미사용",
      "type": "진료지침/공식 권고",
      "checked": "2026-10-27"
    }
  }
};
