/* Source-linked factual summaries; specialist review pending. */
window.NeuroClinicalModules=window.NeuroClinicalModules||{};
window.NeuroClinicalModules["sleep"]={
  "id": "sleep",
  "name": "수면장애",
  "urgentText": "심한 졸림의 운전/작업 위험·호흡 곤란·부상 위험을 먼저 확인",
  "extraQuestions": [
    {
      "id": "cr_slp_driving",
      "stem": "졸려서 운전·작업 중 위험했거나, 자다가 다친 일이 있나요?",
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
      "id": "cr_slp_long",
      "stem": "잠 문제와 낮의 불편이 3개월 이상 이어졌나요?",
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
      "id": "cr_slp_schedule",
      "stem": "교대근무나 원하는 시각과 실제 잠드는 시각의 차이가 큰가요?",
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
      "id": "cr_slp_schedule_time",
      "stem": "어떤 차이가 있나요?",
      "options": [
        {
          "text": "너무 늦게 자고 늦게 일어나요"
        },
        {
          "text": "너무 일찍 잠들고 일어나요"
        },
        {
          "text": "근무/생활 시간이 자주 바뀌어요"
        },
        {
          "text": "잘 모르겠어요"
        }
      ],
      "when": "cr_slp_schedule",
      "equals": "예"
    },
    {
      "id": "cr_slp_cataplexy",
      "stem": "충분히 잤는데도 자꾸 잠들거나, 웃을 때 갑자기 힘이 풀리나요?",
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
      "id": "insomnia",
      "name": "만성 불면장애",
      "desc": "수면 기회가 있어도 잠·낮 기능이 지속적으로 불편한지 확인",
      "definition": "수면 기회가 있어도 잠·낮 기능이 지속적으로 불편한지 확인",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "insomnia"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "수면 기회·환경·기간·주간 기능 확인",
          "source": "insomnia"
        },
        {
          "id": "criterion1",
          "text": "약·기분·OSA/RLS/리듬 등 감별",
          "source": "insomnia"
        }
      ],
      "history": [
        "수면일지·생활/근무·물질/약·기분"
      ],
      "exam": [
        "호흡 위험·신경/기분 및 졸림 안전 평가"
      ],
      "tests": [
        {
          "id": "sleepDiary",
          "name": "수면일지·원인 면담",
          "indications": "양상과 수면 기회/낮 기능 확인",
          "limitations": "관행적 PSG가 모든 불면에 필수는 아님",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "insomnia"
          ]
        }
      ],
      "nonPharmTx": [
        "CBT-I 우선(A): 단순 수면위생만으로 대체하지 않음",
        "수면 제한 등은 졸림·양극성/발작 위험 등 개인 안전을 고려해 지도"
      ],
      "preConfirmChecks": [
        "수면 기회·환경·기간·주간 기능 확인",
        "약·기분·OSA/RLS/리듬 등 감별"
      ],
      "therapies": [
        {
          "id": "insomniaMed",
          "name": "필요 시 불면 약물 단기/개별 검토",
          "evidence": "European 2023: CBT-I 불충분 시 약물 선택.",
          "safety": "진정·낙상·인지·의존/금단·호흡·병용약·임신/고령 검토. 장기 동일 처방 자동화 안 함.",
          "sourceIds": [
            "insomnia"
          ],
          "dose": "수치 용량·증량 미확인: 해당 품목 허가사항 검토 후 결정",
          "domestic": "국내 해당 적응증·허가·급여·공급 미확인. 해외 권고와 구분"
        }
      ],
      "pharmPrinciples": [
        "필요 시 불면 약물 단기/개별 검토: European 2023: CBT-I 불충분 시 약물 선택."
      ],
      "followUpAndSafety": [
        "수면/낮 기능·CBT-I 실행·부작용·약 지속 필요 재평가"
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
        "잠의 습관과 생각·행동을 조절하는 치료를 먼저 검토하고 낮의 기능까지 함께 확인합니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "잠의 습관과 생각·행동을 조절하는 치료를 먼저 검토하고 낮의 기능까지 함께 확인합니다.",
      "canonical": "insomnia",
      "png": false
    },
    {
      "id": "osa",
      "name": "폐쇄성 수면무호흡증(OSA)",
      "desc": "호흡 사건의 객관 검사와 졸림·동반질환을 통합 평가",
      "definition": "호흡 사건의 객관 검사와 졸림·동반질환을 통합 평가",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "osa",
        "pap"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "문진/설문만으로 확정 안 함",
          "source": "osa"
        },
        {
          "id": "criterion1",
          "text": "PSG 또는 적합한 비복잡 성인의 HSAT",
          "source": "osa"
        },
        {
          "id": "criterion2",
          "text": "음성/불확실 HSAT의 잔여 의심 시 PSG",
          "source": "osa"
        }
      ],
      "history": [
        "코골이·목격 무호흡·졸림·운전·심폐/신경근·약"
      ],
      "exam": [
        "기도·체중·혈압·저환기/동반 질환"
      ],
      "tests": [
        {
          "id": "psg",
          "name": "PSG / 대상에 맞는 HSAT",
          "indications": "객관적 호흡 진단",
          "limitations": "중요 심폐/신경근·뇌졸중·오피오이드·심한 불면 등은 PSG 적합성 검토",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "osa",
            "pap"
          ]
        }
      ],
      "nonPharmTx": [
        "체중/자세·음주/진정제·운전 위험 조정",
        "양압기 교육·마스크/비강 불편 지원"
      ],
      "preConfirmChecks": [
        "문진/설문만으로 확정 안 함",
        "PSG 또는 적합한 비복잡 성인의 HSAT",
        "음성/불확실 HSAT의 잔여 의심 시 PSG"
      ],
      "therapies": [
        {
          "id": "pap",
          "name": "PAP/CPAP·APAP 검토",
          "evidence": "AASM: 과다 졸림 OSA에 PAP 강한 권고.",
          "safety": "기기 방식·설정·적합성·잔여 사건/사용시간은 수면 전문 평가. 압력을 자동 산출하지 않음.",
          "sourceIds": [
            "pap",
            "osa"
          ],
          "dose": "수치 용량·증량 미확인: 해당 품목 허가사항 검토 후 결정",
          "domestic": "국내 해당 적응증·허가·급여·공급 미확인. 해외 권고와 구분"
        }
      ],
      "pharmPrinciples": [
        "PAP/CPAP·APAP 검토: AASM: 과다 졸림 OSA에 PAP 강한 권고."
      ],
      "followUpAndSafety": [
        "사용시간·잔여 사건·졸림·운전 안전·마스크/비강 불편 평가"
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
        "자는 동안 숨이 막히는지 검사로 확인하고 치료가 잘 맞는지 낮의 졸림도 살핍니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "자는 동안 숨이 막히는지 검사로 확인하고 치료가 잘 맞는지 낮의 졸림도 살핍니다.",
      "canonical": "osa",
      "png": false
    },
    {
      "id": "rls",
      "name": "하지불안증후군(RLS)",
      "desc": "움직이고 싶은 다리 불편의 휴식/저녁 악화와 운동 완화 확인",
      "definition": "움직이고 싶은 다리 불편의 휴식/저녁 악화와 운동 완화 확인",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "rls"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "움직임 충동·휴식 악화·움직임 완화·저녁/밤 우세",
          "source": "rls"
        },
        {
          "id": "criterion1",
          "text": "쥐·신경병·정좌불능 등 모방 질환 배제",
          "source": "rls"
        }
      ],
      "history": [
        "철 상태·출혈·신장·임신·약·카페인·OSA"
      ],
      "exam": [
        "신경/말초 상태 및 모방 원인"
      ],
      "tests": [
        {
          "id": "iron",
          "name": "Ferritin·TSAT 등 철 상태",
          "indications": "치료 전 적절한 철 상태와 원인 확인",
          "limitations": "일반 빈혈 기준만으로 보충 적합성 판단 안 함",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "rls"
          ]
        }
      ],
      "nonPharmTx": [
        "악화 약/카페인·음주·OSA 검토",
        "철 상태/원인에 맞는 보충 여부 판단"
      ],
      "preConfirmChecks": [
        "움직임 충동·휴식 악화·움직임 완화·저녁/밤 우세",
        "쥐·신경병·정좌불능 등 모방 질환 배제"
      ],
      "therapies": [
        {
          "id": "rlsAlpha2",
          "name": "Gabapentin 계열 등 α2δ 약제 검토",
          "evidence": "AASM 2025: 해당 gabapentinoid 선택지 강한 권고.",
          "safety": "신기능·호흡 억제/오피오이드 병용·진정/낙상·남용 위험 확인.",
          "sourceIds": [
            "rls"
          ],
          "dose": "수치 용량·증량 미확인: 해당 품목 허가사항 검토 후 결정",
          "domestic": "국내 해당 적응증·허가·급여·공급 미확인. 해외 권고와 구분"
        },
        {
          "id": "rlsIron",
          "name": "철 보충 선택",
          "evidence": "철 상태에 맞는 제형별 권고가 다름.",
          "safety": "수치·원인·철 과잉·주입 반응과 제품 허가 확인. 임의 정량 보충 안 함.",
          "sourceIds": [
            "rls"
          ],
          "dose": "수치 용량·증량 미확인: 해당 품목 허가사항 검토 후 결정",
          "domestic": "국내 해당 적응증·허가·급여·공급 미확인. 해외 권고와 구분"
        }
      ],
      "pharmPrinciples": [
        "Gabapentin 계열 등 α2δ 약제 검토: AASM 2025: 해당 gabapentinoid 선택지 강한 권고.",
        "철 보충 선택: 철 상태에 맞는 제형별 권고가 다름.",
        "AASM 2025는 도파민 작용제/levodopa의 표준 일상 사용에 조건부 반대. 기존 약은 augmentation·금단을 고려해 의료진이 조정하며 임의 급중단하지 않음."
      ],
      "followUpAndSafety": [
        "증상·수면·철 상태·진정/낙상 평가",
        "도파민 약 사용 시 augmentation·충동 문제를 확인하고 임의 급중단 금지"
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
        "쉬거나 밤에 다리가 불편하고 움직이면 나아지는지 확인하며 철 상태와 약의 영향을 살핍니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "쉬거나 밤에 다리가 불편하고 움직이면 나아지는지 확인하며 철 상태와 약의 영향을 살핍니다.",
      "canonical": "rls",
      "png": false
    },
    {
      "id": "plmd",
      "name": "주기성 사지운동장애(PLMD) 평가",
      "desc": "검사상의 움직임과 수면/낮 기능 장애의 인과를 확인",
      "definition": "검사상의 움직임과 수면/낮 기능 장애의 인과를 확인",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "rls"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "PSG 사지운동과 임상 장애 확인",
          "source": "rls"
        },
        {
          "id": "criterion1",
          "text": "RLS·OSA·RBD·약 등 대체 원인 감별",
          "source": "rls"
        },
        {
          "id": "criterion2",
          "text": "PLMS 수치만으로 PLMD 확정 안 함",
          "source": "rls"
        }
      ],
      "history": [
        "수면 문제·낮 기능·동반 증상·약"
      ],
      "exam": [
        "다른 수면/신경 원인"
      ],
      "tests": [
        {
          "id": "plmPSG",
          "name": "필요 시 PSG",
          "indications": "움직임과 수면/호흡 관계 평가",
          "limitations": "사지운동 지표만으로 진단/처방 안 함",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "rls"
          ]
        }
      ],
      "nonPharmTx": [
        "동반 원인·수면 일정 조정"
      ],
      "preConfirmChecks": [
        "PSG 사지운동과 임상 장애 확인",
        "RLS·OSA·RBD·약 등 대체 원인 감별",
        "PLMS 수치만으로 PLMD 확정 안 함"
      ],
      "therapies": [],
      "pharmPrinciples": [
        "AASM 2025 성인 PLMD에서 triazolam·valproate 사용에 조건부 반대. RLS 약물을 PLMD에 자동 복제하지 않음."
      ],
      "followUpAndSafety": [
        "수면/기능과 원인 관리 반응 추적"
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
        "자는 동안 다리 움직임이 보여도 그것이 불편의 원인인지 다른 잠 문제와 함께 확인합니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "자는 동안 다리 움직임이 보여도 그것이 불편의 원인인지 다른 잠 문제와 함께 확인합니다.",
      "canonical": "plmd",
      "png": false
    },
    {
      "id": "rbd",
      "name": "렘수면행동장애(RBD) 평가",
      "desc": "꿈 행동과 REM 수면 근긴장 소실 이상을 확인",
      "definition": "꿈 행동과 REM 수면 근긴장 소실 이상을 확인",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "rbd"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "환자/목격자 행동·부상·약 확인",
          "source": "rbd"
        },
        {
          "id": "criterion1",
          "text": "PSG 등으로 모방/OSA·발작 감별",
          "source": "rbd"
        }
      ],
      "history": [
        "침대/도구·보호자 부상·새 약·인지/운동 변화"
      ],
      "exam": [
        "신경 진찰·수면/낙상 위험"
      ],
      "tests": [
        {
          "id": "rbdPSG",
          "name": "영상 PSG 전문 검토",
          "indications": "꿈 행동과 수면 단계/근긴장·모방 원인 확인",
          "limitations": "문진만으로 확정하지 않음",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "rbd"
          ]
        }
      ],
      "nonPharmTx": [
        "위험 물건 제거·낮은 침대/보호 환경 등 본인·동침자 안전"
      ],
      "preConfirmChecks": [
        "환자/목격자 행동·부상·약 확인",
        "PSG 등으로 모방/OSA·발작 감별"
      ],
      "therapies": [
        {
          "id": "rbdMed",
          "name": "즉방 melatonin 또는 clonazepam 전문 검토",
          "evidence": "AASM 2023: 상황별 조건부 권고.",
          "safety": "Clonazepam의 졸림·낙상·인지·OSA/호흡, 제형 차이 및 고령자 위험을 검토.",
          "sourceIds": [
            "rbd"
          ],
          "dose": "수치 용량·증량 미확인: 해당 품목 허가사항 검토 후 결정",
          "domestic": "국내 해당 적응증·허가·급여·공급 미확인. 해외 권고와 구분"
        }
      ],
      "pharmPrinciples": [
        "즉방 melatonin 또는 clonazepam 전문 검토: AASM 2023: 상황별 조건부 권고."
      ],
      "followUpAndSafety": [
        "부상·야간 행동·약 부작용·인지/운동 변화 추적"
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
        "꿈을 꾸며 움직여 다치지 않도록 잠자리 환경부터 안전하게 바꿉니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "꿈을 꾸며 움직여 다치지 않도록 잠자리 환경부터 안전하게 바꿉니다.",
      "canonical": "rbd",
      "png": false
    },
    {
      "id": "narcolepsy",
      "name": "기면병·중추성 과다졸림 평가",
      "desc": "만성 과다졸림과 탈력발작 등 증상을 전문 평가",
      "definition": "만성 과다졸림과 탈력발작 등 증상을 전문 평가",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "hypersomnia",
        "osa"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "수면 부족·리듬·OSA·진정제 배제",
          "source": "hypersomnia"
        },
        {
          "id": "criterion1",
          "text": "탈력 등 병력·PSG/MSLT의 시행 조건 대조",
          "source": "hypersomnia"
        }
      ],
      "history": [
        "수면시간·근무·약/물질·운전·탈력"
      ],
      "exam": [
        "수면/신경 및 기능"
      ],
      "tests": [
        {
          "id": "mslt",
          "name": "PSG 후 MSLT 등 전문 검사",
          "indications": "수면량·약 영향·검사 프로토콜을 맞춰 선택",
          "limitations": "임의 약물 중단·단독 졸림 점수로 진단 안 함",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "hypersomnia",
            "osa"
          ]
        }
      ],
      "nonPharmTx": [
        "운전/위험 작업 제한 필요 상담·수면 일정"
      ],
      "preConfirmChecks": [
        "수면 부족·리듬·OSA·진정제 배제",
        "탈력 등 병력·PSG/MSLT의 시행 조건 대조"
      ],
      "therapies": [
        {
          "id": "narcolepsyMed",
          "name": "Modafinil 등 각성 촉진 치료 전문 검토",
          "evidence": "AASM 2021 성인 기면병 해당 약제 강한 권고.",
          "safety": "임신·호르몬 피임 상호작용·피부/정신/심혈관 위험·병용약 확인. 국내 품목별 적응증/관리 조건 별도.",
          "sourceIds": [
            "hypersomnia"
          ],
          "dose": "수치 용량·증량 미확인: 해당 품목 허가사항 검토 후 결정",
          "domestic": "국내 해당 적응증·허가·급여·공급 미확인. 해외 권고와 구분"
        }
      ],
      "pharmPrinciples": [
        "Modafinil 등 각성 촉진 치료 전문 검토: AASM 2021 성인 기면병 해당 약제 강한 권고."
      ],
      "followUpAndSafety": [
        "졸림·탈력·기능/안전·수면량·부작용 평가"
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
        "충분히 자도 참기 어려운 졸림은 원인을 검사하고 운전·작업 안전을 먼저 챙깁니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "충분히 자도 참기 어려운 졸림은 원인을 검사하고 운전·작업 안전을 먼저 챙깁니다.",
      "canonical": "narcolepsy",
      "png": false
    },
    {
      "id": "circadian_sleep",
      "name": "일주기리듬 수면각성장애",
      "desc": "원하는 시각과 실제 수면 리듬의 반복적 불일치를 평가",
      "definition": "원하는 시각과 실제 수면 리듬의 반복적 불일치를 평가",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "circadian"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "수면일지/가능한 활동기록으로 위상 확인",
          "source": "circadian"
        },
        {
          "id": "criterion1",
          "text": "수면 부족·불면/기분·약 감별",
          "source": "circadian"
        }
      ],
      "history": [
        "빛 노출·근무·주말/평일·약/멜라토닌"
      ],
      "exam": [
        "수면/기분·시각 질환"
      ],
      "tests": [
        {
          "id": "rhythm",
          "name": "수면일지·필요 시 활동기록",
          "indications": "리듬과 시간대 확인",
          "limitations": "한 가지 취침 시각을 모두에게 적용하지 않음",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "circadian"
          ]
        }
      ],
      "nonPharmTx": [
        "아형별 빛·생활 시각 계획"
      ],
      "preConfirmChecks": [
        "수면일지/가능한 활동기록으로 위상 확인",
        "수면 부족·불면/기분·약 감별"
      ],
      "therapies": [
        {
          "id": "timedMelatonin",
          "name": "아형별 시각 조정·melatonin 검토",
          "evidence": "AASM 2015는 특정 아형/대상에 조건부 권고.",
          "safety": "투여/빛의 시각이 핵심. 시각질환·광과민 약·양극성·임신 등 검토. 용량/시각 일괄 처방 안 함.",
          "sourceIds": [
            "circadian"
          ],
          "dose": "수치 용량·증량 미확인: 해당 품목 허가사항 검토 후 결정",
          "domestic": "국내 해당 적응증·허가·급여·공급 미확인. 해외 권고와 구분"
        }
      ],
      "pharmPrinciples": [
        "아형별 시각 조정·melatonin 검토: AASM 2015는 특정 아형/대상에 조건부 권고."
      ],
      "followUpAndSafety": [
        "리듬·낮 기능·실행 가능성·기분 변화 추적"
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
        "몸의 잠드는 시각을 확인해 빛과 생활 시간을 개인에 맞게 조절합니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "몸의 잠드는 시각을 확인해 빛과 생활 시간을 개인에 맞게 조절합니다.",
      "canonical": "circadian_sleep",
      "png": false
    },
    {
      "id": "central_sleep_apnea",
      "name": "중추성 수면무호흡(CSA) 전문 평가",
      "desc": "호흡 노력 감소와 원인 질환에 따른 전문 분류",
      "definition": "호흡 노력 감소와 원인 질환에 따른 전문 분류",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "csa"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "객관 수면 검사와 심부전·약/물질·신경 원인 확인",
          "source": "csa"
        },
        {
          "id": "criterion1",
          "text": "OSA와 치료 발생 CSA 등을 구분",
          "source": "csa"
        }
      ],
      "history": [
        "심부전·오피오이드·고도 노출·기기 사용"
      ],
      "exam": [
        "심폐/신경·저환기 징후"
      ],
      "tests": [
        {
          "id": "csaPSG",
          "name": "PSG·원인 심폐 평가",
          "indications": "원인/호흡 노력·치료 방식 결정",
          "limitations": "단순 코골이/자동 기기 수치로 확정 안 함",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "csa"
          ]
        }
      ],
      "nonPharmTx": [
        "원인 질환 최적화·기기 적합성 전문 상담"
      ],
      "preConfirmChecks": [
        "객관 수면 검사와 심부전·약/물질·신경 원인 확인",
        "OSA와 치료 발생 CSA 등을 구분"
      ],
      "therapies": [
        {
          "id": "csaTherapy",
          "name": "원인별 PAP/ASV 등 전문 의뢰",
          "evidence": "AASM 2025는 방식·원인별 조건부 권고.",
          "safety": "HFrEF에서 ASV는 경험 있는 센터·공동 의사결정·면밀 감시로 제한. 가정 자동 설정 기능 없음.",
          "sourceIds": [
            "csa"
          ],
          "dose": "수치 용량·증량 미확인: 해당 품목 허가사항 검토 후 결정",
          "domestic": "국내 해당 적응증·허가·급여·공급 미확인. 해외 권고와 구분"
        }
      ],
      "pharmPrinciples": [
        "원인별 PAP/ASV 등 전문 의뢰: AASM 2025는 방식·원인별 조건부 권고."
      ],
      "followUpAndSafety": [
        "원인 치료·호흡 사건·증상/기기 내약성·심부전 상태 추적"
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
        "잠 중 호흡 조절 문제는 원인과 기기 방식에 따라 치료가 달라 전문 평가가 필요합니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "잠 중 호흡 조절 문제는 원인과 기기 방식에 따라 치료가 달라 전문 평가가 필요합니다.",
      "canonical": "central_sleep_apnea",
      "png": false
    }
  ],
  "version": "2026-10-27",
  "review": "신경과 전문의 최종 검수 전",
  "sources": {
    "insomnia": {
      "title": "European Insomnia Guideline 2023",
      "date": "2023",
      "url": "https://doi.org/10.1111/jsr.14035",
      "access": "공식 논문 권고표 검색 본문·ESRS 지침 목록 확인; 직접 본문 403",
      "type": "진료지침/공식 권고",
      "checked": "2026-10-27"
    },
    "osa": {
      "title": "AASM Diagnostic Testing for Adult OSA",
      "date": "2017",
      "url": "https://aasm.org/resources/clinicalguidelines/diagnostic-testing-osa.pdf",
      "access": "공식 지침 PDF 검색 본문 확인",
      "type": "진료지침/공식 권고",
      "checked": "2026-10-27"
    },
    "pap": {
      "title": "AASM Treatment of Adult OSA with Positive Airway Pressure",
      "date": "2019",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6374094/",
      "access": "공식 논문 권고 검색 본문 확인",
      "type": "진료지침/공식 권고",
      "checked": "2026-10-27"
    },
    "rls": {
      "title": "AASM Treatment of RLS and PLMD",
      "date": "2025",
      "url": "https://www.irlssg.org/wp-content/uploads/2025/05/Tx-of-RLS-and-PLMD-2025.pdf",
      "access": "발표된 지침 권고/등급 검색 본문 확인; 공개 의견수렴 초안 사용 안 함",
      "type": "진료지침/공식 권고",
      "checked": "2026-10-27"
    },
    "rbd": {
      "title": "AASM Management of REM Sleep Behavior Disorder",
      "date": "2023",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10071384/",
      "access": "공식 논문 검색 본문 확인; 직접 페이지 CAPTCHA",
      "type": "진료지침/공식 권고",
      "checked": "2026-10-27"
    },
    "hypersomnia": {
      "title": "AASM Treatment of Central Disorders of Hypersomnolence",
      "date": "2021",
      "url": "https://aasm.org/wp-content/uploads/2022/03/Treatment_Central_Disorders_Hypersomnolence_Guideline_at_a_Glance.pdf",
      "access": "공식 요약의 약제·권고 강도 확인",
      "type": "진료지침/공식 권고",
      "checked": "2026-10-27"
    },
    "circadian": {
      "title": "AASM Intrinsic Circadian Rhythm Sleep-Wake Disorders",
      "date": "2015",
      "url": "https://aasm.org/resources/clinicalguidelines/crswd-intrinsic.pdf",
      "access": "공식 지침 검색 본문·대상별 제한 확인",
      "type": "진료지침/공식 권고",
      "checked": "2026-10-27"
    },
    "csa": {
      "title": "AASM Treatment of Central Sleep Apnea in Adults",
      "date": "2025-12",
      "url": "https://aasm.org/wp-content/uploads/2026/02/central-sleep-apnea-guideline-AASM-2025.pdf",
      "access": "공식 PDF 본문·ASV HFrEF 제한 확인",
      "type": "진료지침/공식 권고",
      "checked": "2026-10-27"
    }
  }
};
