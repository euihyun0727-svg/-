/* Source-linked factual summaries; specialist review pending. */
window.NeuroClinicalModules=window.NeuroClinicalModules||{};
window.NeuroClinicalModules["other"]={
  "id": "other",
  "name": "기타 신경과 증상",
  "urgentText": "급성 얼굴/팔다리 마비·말/시력 변화·호흡/연하·의식 변화는 긴급 평가",
  "extraQuestions": [
    {
      "id": "cr_oth_acute",
      "stem": "얼굴 증상과 함께 갑자기 한쪽 힘·말·시력·의식이 달라졌나요?",
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
      "id": "cr_oth_faceweak",
      "stem": "한쪽 얼굴에 힘이 빠지거나 눈이 잘 감기지 않나요?",
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
      "id": "cr_oth_eye",
      "stem": "눈이 아프거나 빨갛거나 시력이 달라졌나요?",
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
      "when": "cr_oth_faceweak",
      "equals": "예",
      "risk": true,
      "emergency": true
    },
    {
      "id": "cr_oth_trigger",
      "stem": "얼굴 통증이 만지기·씹기·양치 같은 동작으로 짧게 생기나요?",
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
      "id": "trigeminal_neuralgia",
      "name": "삼차신경통",
      "desc": "짧은 전격성 삼차 분포 통증과 유발·이차 원인을 평가",
      "definition": "짧은 전격성 삼차 분포 통증과 유발·이차 원인을 평가",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "tn"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "편측 분포·짧고 심한 전격 통증·무해 자극 유발",
          "source": "tn"
        },
        {
          "id": "criterion1",
          "text": "감각/신경 소견·이차 원인 확인",
          "source": "tn"
        },
        {
          "id": "criterion2",
          "text": "영상 혈관 접촉만으로 확정 안 함",
          "source": "tn"
        }
      ],
      "history": [
        "분포·유발·기간·치과·감각 저하·섭식"
      ],
      "exam": [
        "삼차 감각·다른 뇌신경·구강/치과"
      ],
      "tests": [
        {
          "id": "tnMRI",
          "name": "고해상도 MRI 등 전문 평가",
          "indications": "원인·신경혈관 관계 확인",
          "limitations": "접촉만으로 확정/수술 결정 안 함",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "tn"
          ]
        }
      ],
      "nonPharmTx": [
        "섭식·구강 관리·유발/통증 기록"
      ],
      "preConfirmChecks": [
        "편측 분포·짧고 심한 전격 통증·무해 자극 유발",
        "감각/신경 소견·이차 원인 확인",
        "영상 혈관 접촉만으로 확정 안 함"
      ],
      "therapies": [
        {
          "id": "tnDrugs",
          "name": "Carbamazepine / oxcarbazepine",
          "evidence": "EAN 2019: carbamazepine 강한/중등도, oxcarbazepine 강한/매우 낮은 근거.",
          "safety": "졸림·발진/과민·간/혈액·저나트륨·상호작용 및 제품별 감시 확인. 용량 추정 안 함.",
          "sourceIds": [
            "tn"
          ],
          "dose": "수치 용량·증량 미확인: 해당 품목 허가사항 검토 후 결정",
          "domestic": "국내 해당 적응증·허가·급여·공급 미확인. 해외 권고와 구분"
        }
      ],
      "pharmPrinciples": [
        "Carbamazepine / oxcarbazepine: EAN 2019: carbamazepine 강한/중등도, oxcarbazepine 강한/매우 낮은 근거."
      ],
      "followUpAndSafety": [
        "통증·식사·부작용/검사 감시",
        "불응/불내약 시 전문 수술 상담"
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
        "얼굴 신경의 짧고 강한 통증은 원인을 확인하고 약의 도움과 발진·어지럼 같은 불편을 살핍니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "얼굴 신경의 짧고 강한 통증은 원인을 확인하고 약의 도움과 발진·어지럼 같은 불편을 살핍니다.",
      "canonical": "trigeminal_neuralgia",
      "png": false
    },
    {
      "id": "hemifacial_spasm",
      "name": "반측성 안면경련 평가",
      "desc": "한쪽 안면근 비자발 수축을 tic·눈꺼풀/얼굴 근긴장이상 등과 구분",
      "definition": "한쪽 안면근 비자발 수축을 tic·눈꺼풀/얼굴 근긴장이상 등과 구분",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "neuro",
        "hfs",
        "hfs2026"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "분포/반복 수축·다른 신경 소견 확인",
          "source": "neuro"
        },
        {
          "id": "criterion1",
          "text": "얼굴 실룩임만으로 구조 원인 확정 안 함",
          "source": "neuro"
        }
      ],
      "history": [
        "시작·눈/볼 분포·안면마비력·약·기능"
      ],
      "exam": [
        "안면/뇌신경·수축 양상·청각"
      ],
      "tests": [
        {
          "id": "hfsImaging",
          "name": "전문 진찰·필요 시 뇌 MRI",
          "indications": "이차 원인/신경혈관 및 치료 계획",
          "limitations": "영상 접촉 자체로 증상 원인 확정 안 함",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "neuro",
            "hfs",
            "hfs2026"
          ]
        }
      ],
      "nonPharmTx": [
        "눈/운전·기능 부담 지원·전문 평가"
      ],
      "preConfirmChecks": [
        "분포/반복 수축·다른 신경 소견 확인",
        "얼굴 실룩임만으로 구조 원인 확정 안 함"
      ],
      "therapies": [
        {
          "id": "hfsBotox",
          "name": "보툴리눔 주사·필요 시 수술 상담",
          "evidence": "2020 Cochrane은 적격 위약대조 RCT 부재. 2026 제형 비교 검토는 해당 비교 근거로 구분; 모든 효과/용량 동등성을 보장하지 않음.",
          "safety": "안검하수·얼굴 약화·건조/각막·연하 등 부위/제형 위험, 제품별 용량은 전문 시행자 확인. 단위 자동 환산 안 함.",
          "sourceIds": [
            "hfs",
            "hfs2026"
          ],
          "dose": "수치 용량·증량 미확인: 해당 품목 허가사항 검토 후 결정",
          "domestic": "국내 해당 적응증·허가·급여·공급 미확인. 해외 권고와 구분"
        }
      ],
      "pharmPrinciples": [
        "보툴리눔 주사·필요 시 수술 상담: 2020 Cochrane은 적격 위약대조 RCT 부재. 2026 제형 비교 검토는 해당 비교 근거로 구분; 모든 효과/용량 동등성을 보장하지 않음."
      ],
      "followUpAndSafety": [
        "수축/기능·안구/약화 부작용·지속 효과·재시술 필요성 평가"
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
        "한쪽 얼굴이 반복해서 움직이면 원인과 눈의 불편을 확인하고 전문 치료의 이득·불편을 상의합니다.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "한쪽 얼굴이 반복해서 움직이면 원인과 눈의 불편을 확인하고 전문 치료의 이득·불편을 상의합니다.",
      "canonical": "hemifacial_spasm",
      "png": false
    },
    {
      "id": "peripheral_facial_palsy",
      "name": "말초 안면마비·Bell 마비 감별",
      "desc": "급성 안면 약화에서 중추·이차 원인을 먼저 구분",
      "definition": "급성 안면 약화에서 중추·이차 원인을 먼저 구분",
      "classification": "질환/증후군 및 감별 경로 — 의사 확인",
      "sources": [
        "bell",
        "neuro"
      ],
      "criteria": [
        {
          "id": "criterion0",
          "text": "얼굴 전체 분포·다른 신경 소견 확인",
          "source": "bell"
        },
        {
          "id": "criterion1",
          "text": "대상포진/감염/외상·재발·비전형 감별",
          "source": "bell"
        },
        {
          "id": "criterion2",
          "text": "이마 움직임 하나로 뇌졸중 배제 안 함",
          "source": "bell"
        }
      ],
      "history": [
        "시작·이통/수포·청력·눈 감김·임신/당뇨"
      ],
      "exam": [
        "안면·뇌신경·이경·각막/눈"
      ],
      "tests": [
        {
          "id": "facialEval",
          "name": "임상·안구 보호·필요 전문 검사",
          "indications": "급성 원인/각막 위험과 비전형 소견 평가",
          "limitations": "전형 Bell에 일률적 검사/영상 아님;비전형/진행은 재평가",
          "site": "원내 시행/외부 의뢰·수가 확인 필요",
          "sourceIds": [
            "bell",
            "neuro"
          ]
        }
      ],
      "nonPharmTx": [
        "불완전 눈감김의 각막 보호·눈 증상 신속 평가"
      ],
      "preConfirmChecks": [
        "얼굴 전체 분포·다른 신경 소견 확인",
        "대상포진/감염/외상·재발·비전형 감별",
        "이마 움직임 하나로 뇌졸중 배제 안 함"
      ],
      "therapies": [
        {
          "id": "bellSteroid",
          "name": "성인 초기 steroid 적합성",
          "evidence": "AAO-HNS: 16세 이상 Bell 마비 발병 72시간 내 경구 steroid 강한 권고.",
          "safety": "당뇨/임신·감염·위장관·정신·기존 약 등 위험 확인. 항바이러스 단독을 대체 치료로 자동 제시하지 않음.",
          "sourceIds": [
            "bell"
          ],
          "dose": "수치 용량·증량 미확인: 해당 품목 허가사항 검토 후 결정",
          "domestic": "국내 해당 적응증·허가·급여·공급 미확인. 해외 권고와 구분"
        }
      ],
      "pharmPrinciples": [
        "성인 초기 steroid 적합성: AAO-HNS: 16세 이상 Bell 마비 발병 72시간 내 경구 steroid 강한 권고."
      ],
      "followUpAndSafety": [
        "얼굴/눈 회복·새 신경/안구 증상·진행/회복 불충분 시 전문 재평가"
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
        "눈이 잘 안 감기면 각막을 보호하고 눈 통증·시력 변화는 바로 알려주세요.",
        "갑자기 힘이 빠지거나 말·의식·호흡·삼키기에 변화가 생기면 즉시 의료진에게 알리세요.",
        "복용 중인 약과 새로 생긴 불편을 알려주세요. 약의 시작·변경·중단은 의료진과 상의합니다.",
        "증상의 빈도·일상생활 변화·넘어짐·치료 후 불편을 기록해 다음 진료에서 확인합니다."
      ],
      "patientLeaflet": "눈이 잘 안 감기면 각막을 보호하고 눈 통증·시력 변화는 바로 알려주세요.",
      "canonical": "peripheral_facial_palsy",
      "png": false
    }
  ],
  "version": "2026-10-27",
  "review": "신경과 전문의 최종 검수 전",
  "sources": {
    "tn": {
      "title": "EAN guideline on trigeminal neuralgia",
      "date": "2019-03-12",
      "url": "https://onlinelibrary.wiley.com/doi/10.1111/ene.13950",
      "access": "앞선 두통 모듈에서 본문 확인; 공통 근거 재사용",
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
    "hfs": {
      "title": "Cochrane Botulinum toxin type A for hemifacial spasm",
      "date": "2020",
      "url": "https://www.cochrane.org/evidence/CD004899_botulinum-toxin-injections-unilateral-involuntary-contractions-facial-muscles",
      "access": "공식 요약 본문 확인; 적격 위약대조 RCT 부재",
      "type": "체계적 문헌고찰",
      "checked": "2026-10-27"
    },
    "hfs2026": {
      "title": "Comparative efficacy and safety of BoNT-A in blepharospasm and hemifacial spasm",
      "date": "2026-09",
      "url": "https://pubmed.ncbi.nlm.nih.gov/42313173/",
      "access": "발표 논문 초록/비교 대상 확인; 제형 간 용량 동등성 자동 환산 안 함",
      "type": "체계적 문헌고찰",
      "checked": "2026-10-27"
    },
    "bell": {
      "title": "AAO-HNS Clinical Practice Guideline: Bell’s Palsy",
      "date": "2013",
      "url": "https://www.entnet.org/quality-practice/quality-products/clinical-practice-guidelines/bells-palsy/",
      "access": "공식 지침 페이지·발표 요약 권고 검색 본문 확인; 전체판 직접 403",
      "type": "진료지침/공식 권고",
      "checked": "2026-10-27"
    }
  }
};
