export type Troubleshooting = {
  title: string;
  problem: string;
  cause: string;
  analysis: {
    confirmed: string[];
    inferred: string[];
  };
  solution: string;
  prevention: string;
  result: string;
};

export type Project = {
  slug: string;
  title: string;
  period: string;
  domain: string;
  oneLine: string;
  summary: string;
  decisionPoints: string[];
  role: string[];
  implementations: string[];
  difficulties: string[];
  verification: string[];
  result: string[];
  caseStudy?: {
    title: string;
    problem: string;
    cause: string;
    approach: string[];
    flow: string[];
    verification: string[];
  };
  stack: string[];
  stackContext: string[];
  flow: string[];
  securityNote: string;
  portfolioSentences: string[];
  troubleshooting?: Troubleshooting[];
  featured?: boolean;
  demo?: { href: string; label: string };
  detail?: { builtTitle: string; flowTitle: string; decisionFirst?: boolean };
};

export type PortfolioTroubleshooting = {
  title: string;
  problem: string;
  cause: string;
  analysis: string;
  solution: string;
  verification: string;
};

export type ProjectDetailContent = {
  businessContext: string;
  cases: {
    title: string;
    problem: string;
    cause: string;
    approach: string[];
    before?: string;
    flow?: string[];
  }[];
  verification: string[];
  result: string[];
};

export type TimelineItem = {
  id: string;
  period: string;
  companyLabel: string;
  title: string;
  role: string;
  projects: {
    id: string;
    slug: string | null;
    title: string;
    description: string;
    sub?: string;
    stack: string[];
  }[];
};

export const profile = {
  name: "권태형",
  email: "katonew98@gmail.com",
  phone: "010-2123-8969",
  heroHeadline: ["신규 개발 · 레거시 유지보수", "운영 · 배포"],
  heroExperiences: [
    {
      title: "업무 시스템 개발",
      description: "CMS/ERP, 데이터 플랫폼, 부동산 관리자 시스템을 개발했습니다."
    },
    {
      title: "기존 시스템 유지보수",
      description: "Spring Legacy, ASP, PHP 기반 시스템을 분석하고 기능을 개선했습니다."
    },
    {
      title: "개발부터 배포까지",
      description: "DB·API 연동과 서버 이전, 자동 빌드·배포를 직접 구성했습니다."
    }
  ],
  subheadline:
    "Oracle·MySQL·MSSQL 기반 업무 데이터 처리와 외부 API 연동을 담당했습니다.",
  years: "4년차",
  role: "Backend / Web Developer",
  coreStack: "Java / Spring",
  databases: "Oracle · MySQL · MSSQL",
  workDomains: "SI / Solution / 업무 시스템",
  maintenance: "Legacy / API / 서버 운영",
  aiDevelopment: "AI-assisted Development",
  introduction:
    "AI는 코드 탐색과 구현 보조에 활용하고, 결과는 기존 구조와 비즈니스 로직을 기준으로 직접 검증합니다.",
  techContexts: [
    {
      category: "Backend",
      items: ["Java", "Spring Boot", "Spring MVC", "MyBatis", "JPA"]
    },
    {
      category: "Database",
      items: ["Oracle", "MySQL", "MSSQL"]
    },
    {
      category: "Frontend",
      items: ["Thymeleaf", "JSP", "JavaScript", "Vue", "AUIGrid"]
    },
    {
      category: "Infra",
      items: ["Linux", "Docker", "Nginx", "Jenkins", "GitLab"]
    },
    {
      category: "AI",
      items: ["ChatGPT", "Codex", "Claude Code", "Cursor"]
    }
  ]
};

export const workingPrinciples = [
  {
    title: "기존 구조부터 파악",
    description: "기존 코드와 유사 기능, DB 호출 흐름을 먼저 확인하고 프로젝트의 구현 패턴을 유지합니다.",
    evidence: "레거시 유지보수에서 Controller·DAO·Mapper·프로시저를 분석하고 세션 기반 조회 범위를 점검했습니다.",
    projectSlug: "legacy-maintenance"
  },
  {
    title: "먼저 확인하고 질문",
    description: "코드와 요청값으로 확인할 내용을 먼저 조사합니다. 업무 결정이 필요하면 확인한 내용과 선택지를 정리해 질문합니다.",
    evidence: "데이터 판매 플랫폼에서는 상품 ID 외에 데이터 유형과 옵션 조합까지 서버 중복 판단 기준에 포함되는지 확인했습니다.",
    projectSlug: "data-market-platform"
  },
  {
    title: "흐름 단위로 확인",
    description: "화면 상태, 요청 데이터, 서버 처리와 저장 후 재조회 결과를 연결해 확인합니다.",
    evidence: "CMS/ERP에서 마스킹 해제·변경 행 검증을 저장 API와 Oracle 저장 흐름에 연결하고 재조회와 행 위치 복원을 확인했습니다.",
    projectSlug: "enterprise-cms-erp"
  },
  {
    title: "입력에 사용할 결과까지 연결",
    description: "연동 응답을 받은 뒤 실제 업무 입력에 사용할 형태로 가공하고 선택 결과와 예외 처리를 확인합니다.",
    evidence: "부동산 프로젝트에서 외부 필지 정보를 선택 목록·면적 합계·매물 등록용 데이터로 연결했습니다. 재구성한 데모에서 선택 결과를 확인할 수 있습니다.",
    projectSlug: "real-estate-admin-map"
  }
];

export const aiDevelopmentProcess = [
  "Requirements",
  "Context",
  "AI Analysis",
  "Task",
  "AI Implementation",
  "Diff Review",
  "Test",
  "DB / SQL / Log",
  "Developer Decision"
];

export const aiDelegatedTasks = [
  "코드 탐색", "유사 구현 분석", "구현 초안", "SQL 초안", "테스트 후보"
];

export const developerDecisions = [
  "업무 규칙", "DB 구조", "트랜잭션", "상태 전이", "데이터 정합성", "최종 검증"
];

export const aiCodeVerification = [
  "기존 코드 컨벤션 비교",
  "Diff 리뷰",
  "빌드",
  "기능 테스트",
  "SQL 결과 확인",
  "로그 확인",
  "기존 업무 흐름 회귀 확인"
];

export const projects: Project[] = [
  {
    slug: "enterprise-cms-erp",
    detail: { builtTitle: "업무 화면과 저장 처리", flowTitle: "화면 상태에서 저장·재조회까지", decisionFirst: true },
    title: "내부 CMS/ERP 관리자 화면 개발",
    period: "2025.11 - 2026.05",
    domain: "계약 / 매출 / 비용 / 정산 / 관리자 화면",
    oneLine: "표시값과 저장 대상의 경계를 정리한 CMS/ERP 관리자 화면",
    summary:
      "Spring 기반 내부 CMS/ERP에서 계약, 매출, 비용, 정산 화면을 개발했습니다. 화면, 그리드, 저장 로직을 연결해 조회·편집·저장 흐름을 맞췄습니다.",
    decisionPoints: [
      "저장 전 검증이 화면 상태에만 의존하지 않는지 먼저 확인했습니다.",
      "대량 편집 화면이라 변경된 행만 정확히 추출되는지가 핵심이었습니다.",
      "저장 후 재조회 시 운영자가 작업하던 위치를 잃지 않도록 흐름을 설계했습니다."
    ],
    role: [
      "운영자용 조회/편집 화면의 검색조건, 공통코드, 그리드 상태 관리 구현",
      "화면 JS와 Controller, Service, SQL 저장 흐름 연결",
      "민감정보 마스킹 상태와 저장 가능 조건을 제어하는 화면 로직 보완"
    ],
    implementations: [
      "공통 코드 기반 검색조건 로딩과 조회 API 연동",
      "AUIGrid 행 추가, 복사, 삭제, 선택 행 메일 전송, Excel 다운로드 처리",
      "변경된 행만 추출해 저장 API로 보내는 편집 흐름 구성",
      "정산 저장 흐름의 입력 유지 항목과 서버 재집계 대상 구분",
      "저장 후 재조회와 현재 행 위치 복원 처리"
    ],
    difficulties: [
      "대량 편집 화면에서 변경 행만 안정적으로 저장해야 했습니다.",
      "마스킹된 민감정보가 표시값 그대로 저장될 위험이 있었습니다.",
      "저장 후 조회 시 사용자가 작업하던 위치가 사라지면 운영 효율이 떨어질 수 있었습니다."
    ],
    verification: [
      "저장 전 마스킹 해제 여부를 검사하고, 해제되지 않으면 저장을 막는 화면 JS 로직을 확인했습니다.",
      "저장 성공 후 재조회와 현재 위치 복원 로직으로 저장 결과와 화면 상태를 확인했습니다."
    ],
    result: [
      "표시값이나 불필요한 행이 저장되는 위험을 줄이고, 편집 후 화면 이탈 없이 작업을 이어갈 수 있도록 했습니다."
    ],
    caseStudy: {
      title: "표시 상태와 실제 저장 대상을 구분한 기준",
      problem:
        "대량 편집 화면에서 변경하지 않은 값이나 마스킹된 표시값까지 저장될 가능성이 있었습니다.",
      cause:
        "조회 상태, 선택 상태, 수정 상태, 마스킹 상태가 하나의 저장 흐름에 함께 관리되고 있었습니다.",
      approach: [
        "마스킹된 표시값을 그대로 저장하지 않도록 해제 여부를 검사하고, 변경된 행만 요청 데이터로 구성했습니다.",
        "화면 JS에서 저장 전 마스킹 해제 여부, 변경 여부, 필수값을 순서대로 검사하도록 구성했습니다.",
        "확인된 처리 흐름은 화면 JS → Controller → Service → Oracle 저장 SQL입니다."
      ],
      flow: [
        "화면에서 마스킹 해제 여부·변경 여부·필수값 검증",
        "변경 행을 추출해 저장 요청 데이터 구성",
        "Controller에서 요청을 받아 Service로 전달",
        "Service에서 Oracle 저장 SQL 호출",
        "저장 후 재조회 및 현재 위치 복원"
      ],
      verification: [
        "저장 성공 후 재조회와 현재 위치 복원 로직으로 저장 결과와 화면 상태를 확인했습니다."
      ]
    },
    stack: ["Java", "Spring", "Thymeleaf", "Oracle", "JavaScript", "AUIGrid", "EAI"],
    stackContext: [
      "Spring Controller/Service 구조로 업무 화면 API를 분리",
      "AUIGrid로 대량 편집과 선택 행 작업을 처리",
      "Oracle 기반 저장 로직과 내부 연동성 작업을 서비스 계층에서 조합"
    ],
    flow: [
      "Thymeleaf 템플릿에서 검색조건과 그리드 영역 렌더링",
      "화면 JS에서 검색 파라미터 수집, 그리드 변경 여부 검사, 저장 대상 행 추출",
      "Controller에서 조회/저장/삭제/메일 전송 API를 제공",
      "Service에서 Oracle 조회·저장 로직을 호출하고 저장 후 재조회를 수행"
    ],
    securityNote:
      "실제 회사명, 내부 시스템명, 연동 전문, 계정/코드값은 모두 제외하고 업무 성격만 기술했습니다.",
    portfolioSentences: [
      "Spring 기반 내부 CMS/ERP에서 Thymeleaf와 AUIGrid 기반 관리자 화면을 개발했습니다. 계약, 매출, 비용, 정산 도메인의 조회·편집·저장 흐름을 화면, 서비스, SQL 계층으로 분리해 구현했습니다.",
      "민감정보 마스킹 상태, 변경 행 추출, 저장 후 재조회와 현재 위치 복원까지 고려해 운영형 그리드 화면의 사용성과 안정성을 개선했습니다."
    ],
    troubleshooting: [
      {
        title: "그리드 변경 데이터와 마스킹 상태 충돌",
        problem:
          "운영자 화면에서 마스킹된 계좌/개인정보가 표시값 그대로 저장되거나, 변경하지 않은 행까지 함께 저장될 수 있는 구조였습니다.",
        cause:
          "그리드가 조회 데이터, 선택 행, 수정 상태, 마스킹 상태를 모두 프론트에서 관리하고 있었기 때문입니다.",
        analysis: {
          confirmed: [
            "저장 전 마스킹 해제 여부를 검사하고, 해제되지 않으면 저장을 막는 로직을 화면 JS에서 처리했습니다.",
            "그리드 변경 여부를 검사한 뒤 변경된 행만 추출해 저장 API로 전달하도록 구성했습니다.",
            "저장 성공 후 재조회와 현재 위치 복원 로직을 구현했습니다."
          ],
          inferred: [
            "대량 편집과 민감정보 표시가 함께 있는 운영 화면에서 저장 기준을 더 명확히 정리할 필요가 있었습니다."
          ]
        },
        solution:
          "저장 전 마스킹 해제 여부, 변경 여부, 필수값 검증을 순서대로 수행하고 변경 행만 서버에 전송하도록 흐름을 정리했습니다.",
        prevention:
          "프론트 검증 외에도 서버 API에서 원본값 저장 여부와 권한을 다시 확인하는 방어 로직을 두는 것이 안전합니다.",
        result:
          "운영자가 실수로 표시값을 저장하거나 불필요한 행을 함께 저장하는 위험을 줄이고, 편집 후 화면 이탈 없이 계속 작업할 수 있도록 개선했습니다."
      }
    ],
    featured: true
  },
  {
    slug: "data-market-platform",
    detail: { builtTitle: "상품 API와 옵션 선택·장바구니", flowTitle: "옵션 선택과 서버 응답 처리", decisionFirst: true },
    title: "데이터 판매 플랫폼",
    period: "2024.12 - 2025.10",
    domain: "데이터 상품 / 옵션 선택 / 장바구니 / 구매",
    oneLine: "데이터 유형과 옵션 조합을 구매 단위로 처리한 상품·장바구니 API",
    summary:
      "Vue와 Spring Boot/JPA 구조에서 데이터 상품 상세, 옵션 선택, 장바구니 흐름을 구현했습니다. 구매 항목을 상품 ID가 아니라 선택한 데이터 유형과 옵션 조합 기준으로 다뤘습니다.",
    decisionPoints: [
      "같은 상품이라도 데이터 유형과 행/열/값 선택이 달라지면 다른 구매 항목으로 봐야 했습니다.",
      "화면에서 선택한 옵션 조합이 장바구니 API 요청과 서버 중복 검증 기준에 같은 형태로 전달되는지 확인했습니다.",
      "서버가 중복을 거절한 경우 화면 장바구니 상태를 성공처럼 갱신하지 않도록 응답 처리 흐름을 맞췄습니다."
    ],
    role: [
      "데이터 상품 목록/상세 API와 화면 연동",
      "분석 데이터 옵션 선택 UI와 장바구니 요청 포맷 설계",
      "장바구니 중복 검사 및 전역 상태 갱신 흐름 보완"
    ],
    implementations: [
      "데이터 상품 상세 조회와 제휴사 목록 조회 API 연결",
      "상품 속성에 따라 행/열/값 선택 옵션을 동적으로 구성",
      "장바구니 추가 전 로그인 여부와 필수 선택값 검증",
      "중복 장바구니 요청에 대해 409 응답과 사용자 메시지 처리"
    ],
    difficulties: [
      "원천 데이터와 분석 데이터의 장바구니 중복 기준이 단순 상품 ID가 아니었습니다.",
      "같은 상품 안에서도 데이터 구분, 행, 열, 값 선택 조합에 따라 구매 항목이 달라졌습니다.",
      "프론트 임시 데이터와 실제 API 연동 상태가 섞여 있을 때 화면 메시지와 서버 상태가 어긋날 수 있었습니다.",
      "상세 화면, 헤더, 장바구니 목록이 같은 전역 상태를 공유해야 했습니다."
    ],
    verification: [
      "Controller에서 중복 요청에 409 CONFLICT를 반환하고, Service에서 구매자 유형, 사용자 ID, 데이터, 옵션 조합 기준으로 중복을 판별하는 흐름을 확인했습니다.",
      "로그인 여부와 필수 선택값 검증 후에만 장바구니 API를 호출하도록 화면 흐름을 확인했습니다.",
      "Vue 화면은 성공 응답일 때 장바구니 전역 상태를 다시 조회하도록 구성했습니다."
    ],
    result: [
      "중복 저장 가능성을 낮추고, 장바구니 아이콘과 목록 상태가 서버 데이터와 맞도록 흐름을 정리했습니다."
    ],
    stack: ["Java", "Spring Boot", "JPA", "QueryDSL", "MySQL", "Vue"],
    stackContext: [
      "JPA로 데이터 상품과 장바구니 조회 로직 구성",
      "Vue에서 상세 화면과 전역 장바구니 상태를 연결",
      "REST API에서 옵션 조합 단위의 중복 검사를 처리"
    ],
    flow: [
      "Vue 상세 페이지에서 원천/분석 데이터 선택과 구매 버튼 제공",
      "computed 로직으로 데이터 속성에 맞는 옵션 목록 생성",
      "장바구니 API에 데이터 구분, 행, 열, 값 조합 전달",
      "Controller에서 로그인 사용자와 요청값을 받아 Service로 전달",
      "Service에서 구매자 유형, 사용자 ID, 데이터, 옵션 조합 기준으로 중복 여부 판별",
      "중복이 아니면 JPA 기반 장바구니 저장·조회 흐름으로 연결",
      "성공 응답 후 Vue 전역 장바구니 상태 재조회"
    ],
    securityNote:
      "상품 원본 데이터, 고객사 식별정보, 실제 판매 데이터는 모두 제외하고 화면/로직 구조만 설명했습니다.",
    portfolioSentences: [
      "Vue와 Spring Boot/JPA 기반 데이터 판매 플랫폼에서 데이터 상품 상세, 분석 옵션 선택, 장바구니 추가 API 흐름을 구현했습니다.",
      "상품 속성에 따라 행·열·값 선택 옵션을 동적으로 구성하고, 백엔드에서는 장바구니 중복 검증을 옵션 조합 단위로 처리했습니다."
    ],
    troubleshooting: [
      {
        title: "장바구니 중복 추가와 화면 상태 불일치",
        problem:
          "동일 데이터 상품과 동일 분석 옵션을 여러 번 담을 때 중복 저장이 생기거나, 서버는 거절했는데 화면은 성공처럼 보일 수 있었습니다.",
        cause:
          "장바구니 중복 기준이 상품 ID 하나가 아니라 데이터 구분, 행, 열, 값 선택 조합 전체였기 때문입니다.",
        analysis: {
          confirmed: [
            "서버 Controller에서 중복 여부를 먼저 확인하고 409 CONFLICT를 반환하도록 처리했습니다.",
            "Service에서 구매자 유형, 사용자 ID, 데이터, 옵션 조합으로 중복 여부를 판별했습니다.",
            "Vue 화면에서 성공 시 장바구니 전역 상태를 다시 조회하도록 구성했습니다."
          ],
          inferred: [
            "개발 단계에서는 화면 상태와 실제 API 응답이 어긋나지 않도록 분기 처리를 함께 점검할 필요가 있었습니다."
          ]
        },
        solution:
          "서버에서 동일 조합을 먼저 차단하고, 프론트는 성공 응답일 때만 장바구니 상태를 갱신하도록 정리했습니다.",
        prevention:
          "DB Unique 제약으로 최종 방어선을 두고, 운영 빌드 전 임시 하드코딩 분기를 제거하는 배포 체크리스트가 필요합니다.",
        result:
          "중복 저장 가능성을 낮추고, 장바구니 아이콘과 목록 상태가 실제 서버 데이터와 맞도록 흐름을 안정화했습니다."
      }
    ],
    caseStudy: {
      title: "옵션 조합 단위 장바구니 중복 검증",
      problem:
        "상품 ID만으로 장바구니 중복을 판단하면 같은 상품의 다른 데이터 유형이나 행·열·값 선택까지 같은 구매 항목으로 처리될 수 있었습니다.",
      cause:
        "데이터 판매 플랫폼의 구매 단위가 상품 하나가 아니라 데이터 구분, 행, 열, 값 선택 조합까지 포함한 항목이었기 때문입니다.",
      approach: [
        "동일 구매 항목 여부를 구매자 유형, 사용자 ID, 데이터, 옵션 조합 기준으로 판단하도록 정리했습니다.",
        "Vue 상세 화면에서 선택한 데이터 유형과 행·열·값 조합을 장바구니 API 요청에 포함했습니다.",
        "Controller는 중복 요청에 409 CONFLICT를 반환하고, Service는 사용자와 옵션 조합 기준으로 중복 여부를 판별하도록 연결했습니다.",
        "로그인하지 않은 상태나 필수 선택값이 빠진 경우에는 장바구니 요청 전 화면에서 먼저 차단했습니다."
      ],
      flow: [
        "데이터 상품 상세 조회",
        "데이터 유형 선택",
        "행·열·값 옵션 조합 생성",
        "로그인 여부와 필수 선택값 검증",
        "장바구니 API 요청",
        "Controller에서 요청 수신",
        "Service에서 구매자 유형·사용자 ID·데이터·옵션 조합 기준 중복 판별",
        "중복 시 409 CONFLICT 반환",
        "중복이 아니면 장바구니 저장",
        "성공 응답 후 Vue 전역 장바구니 상태 재조회"
      ],
      verification: [
        "동일 상품이라도 선택한 데이터 유형과 행·열·값 조합이 서버 중복 기준에 함께 전달되는지 확인했습니다.",
        "중복 요청은 409 CONFLICT로 처리하고, 화면은 성공 응답일 때만 장바구니 상태를 갱신하도록 확인했습니다.",
        "로그인 여부와 필수 선택값 누락 같은 예외 상황은 API 요청 전 화면 검증과 서버 응답 처리 흐름으로 확인했습니다."
      ]
    },
    featured: true
  },
  {
    slug: "real-estate-admin-map",
    demo: { href: "/features/remax-land-demo", label: "Live Demo · 지도에서 필지 선택하기" },
    detail: { builtTitle: "외부 필지 데이터와 매물 등록 연결", flowTitle: "지도 좌표에서 매물 등록용 데이터까지" },
    title: "부동산 매물 관리 및 지도 API 연동",
    period: "2024.05 - 2024.09",
    domain: "매물 관리 / 계약 / 지도 API / 관리자 시스템",
    oneLine: "외부 지도·필지 정보를 매물 등록에 사용할 내부 입력 데이터로 변환",
    summary:
      "부동산 관리자 페이지에서 계약, 매물 등록, 지도 연동 기능을 개발했습니다. 카카오맵 클릭 좌표와 VWorld 필지 정보를 연결해 선택 필지를 저장 데이터로 정리하는 흐름을 구성했습니다.",
    decisionPoints: [
      "지도 클릭 좌표를 주소와 PNU 기준 필지 정보로 변환하는 흐름을 먼저 정리했습니다.",
      "VWorld 응답에서 면적, 공시지가, 용도지역, Polygon 좌표를 추출해 내부 입력 데이터와 연결했습니다.",
      "지도 객체는 Polygon과 CustomOverlay 표시를 담당하고, 선택 필지 목록은 저장 payload 생성 기준으로 분리했습니다."
    ],
    role: [
      "관리자 페이지 내 매물 등록 및 계약 정보 처리 로직 개발 참여",
      "카카오맵 클릭 이벤트와 지오코더 연동",
      "VWorld 필지·토지이용·공시지가·경계 조회 API 연동",
      "선택 필지 목록과 매물 등록용 저장 데이터 연결"
    ],
    implementations: [
      "매물 등록과 계약 정보 입력 화면 처리",
      "카카오맵 주소 검색, 좌표 이동, 클릭 좌표 처리",
      "VWorld 주소 검색과 필지 상세 조회 JSONP 호출",
      "Polygon 렌더링, 선택 필지 토글, 면적·공시지가 합계 계산",
      "선택 필지를 저장 payload 형태로 변환"
    ],
    difficulties: [
      "지도 클릭 좌표만으로는 매물 등록에 필요한 필지 식별값과 면적 데이터를 바로 얻을 수 없었습니다.",
      "카카오맵 주소 결과, VWorld PNU 검색 결과, 토지 정보, Polygon 응답 형식이 서로 달라 매핑 기준이 필요했습니다.",
      "업무 데이터와 지도 기반 부가 정보를 하나의 입력 화면에서 함께 처리해야 해 선택 상태와 저장 데이터 생성 기준을 분리해야 했습니다."
    ],
    verification: [
      "카카오맵 클릭 후 coord2Address 결과로 주소를 얻고, VWorld 주소 검색에서 PNU와 좌표를 가져오는 흐름을 확인했습니다.",
      "VWorld 필지 정보, 토지이용, 공시지가, Polygon 응답을 조합해 선택 필지 목록과 저장 payload에 반영되는지 확인했습니다.",
      "API 키 누락, 주소 검색 실패, Polygon 조회 실패는 상태 메시지와 예외 메시지로 사용자에게 노출되도록 처리했습니다."
    ],
    result: [
      "지도에서 선택한 필지의 PNU, 주소, 면적, 공시지가, 용도지역 정보를 매물 등록 데이터로 연결할 수 있게 정리했습니다.",
      "여러 필지를 선택·해제하면서 총 면적과 총 공시지가를 계산하고, 저장 payload로 확인할 수 있게 구성했습니다."
    ],
    stack: ["Java", "Spring Boot", "MySQL", "JavaScript", "지도 API"],
    stackContext: [
      "Spring Boot 기반 관리자 기능 개발",
      "카카오맵 SDK로 지도 객체, 클릭 이벤트, 지오코더, Polygon, CustomOverlay 처리",
      "VWorld API로 주소 검색, 필지 정보, 토지이용, 공시지가, 경계 데이터를 조회",
      "업무성 매물 데이터와 지도 기반 부가 데이터를 함께 처리"
    ],
    flow: [
      "카카오맵 초기화 및 지오코더 생성",
      "지도 클릭 이벤트에서 위도·경도 획득",
      "coord2Address로 클릭 좌표의 주소 조회",
      "VWorld /req/search로 주소 기반 PNU와 기준 좌표 조회",
      "VWorld 필지 정보·토지이용·공시지가·경계 API 병렬 호출",
      "Polygon 좌표와 면적·공시지가 데이터를 화면 모델로 가공",
      "PNU 기준으로 선택 필지 추가 또는 해제",
      "선택 필지 목록에서 총 면적·총 공시지가 계산",
      "선택 결과를 매물 등록용 저장 payload로 변환"
    ],
    securityNote:
      "고객사명, 실제 매물 데이터, 연동 API 식별정보는 제외하고 업무 도메인과 담당 역할 중심으로 기술했습니다.",
    portfolioSentences: [
      "부동산 매물 관리 관리자 페이지에서 계약과 매물 등록 기능을 개발하고, 지도/면적 계열 외부 API를 연동해 업무 입력 화면의 활용도를 높였습니다."
    ],
    caseStudy: {
      title: "지도 클릭 기반 관련지번 선택과 저장 데이터 연결",
      problem:
        "매물 등록 화면에서 지도에서 선택한 필지를 업무 데이터로 쓰려면 좌표, 주소, PNU, 면적, 공시지가, 경계 데이터를 하나의 흐름으로 연결해야 했습니다.",
      cause:
        "지도 클릭 이벤트는 위도·경도만 제공하고, 매물 등록에 필요한 필지 식별값과 토지 정보는 카카오 지오코더와 VWorld 응답을 조합해야 했기 때문입니다.",
      approach: [
        "카카오맵 클릭 좌표를 coord2Address로 주소로 변환한 뒤, VWorld 주소 검색으로 PNU와 기준 좌표를 확보했습니다.",
        "PNU와 기준 좌표로 VWorld의 면적·용도지역·이용계획·공시지가·경계 정보를 조회했습니다.",
        "응답 데이터는 Polygon 또는 MultiPolygon 좌표를 Kakao LatLng 배열로 변환하고, 면적과 공시지가 문자열은 숫자로 변환해 합계 계산에 사용했습니다.",
        "지도 객체에는 Polygon과 CustomOverlay를 표시하고, 선택 필지 배열은 저장 payload와 총 면적·총 공시지가 계산의 기준으로 사용했습니다.",
        "카카오 SDK 키 누락, 주소 검색 실패, VWorld JSONP 실패, Polygon 조회 실패는 예외 메시지를 상태 영역에 표시하도록 처리했습니다."
      ],
      flow: [
        "지도 클릭 좌표를 카카오 지오코더로 주소 변환",
        "VWorld 주소 검색으로 PNU와 기준 좌표 확보",
        "필지·토지이용·공시지가·경계 응답 조회",
        "경계 좌표를 지도 표시용으로, 면적·공시지가를 계산용 숫자로 변환",
        "PNU 기준 선택 목록을 갱신하고 면적·공시지가 합계 계산",
        "선택 목록을 매물 등록용 저장 데이터로 변환"
      ],
      verification: [
        "선택 필지 목록에서 PNU, 주소, 면적, 공시지가, 용도지역, 이용계획, 공시일자가 표시되는지 확인했습니다.",
        "선택 필지 수, 총 면적, 총 공시지가, 저장 payload 행 수가 선택 상태와 함께 갱신되는지 확인했습니다.",
        "주소 검색 실패나 VWorld 응답 실패는 화면 상태 메시지로 확인할 수 있게 처리했습니다."
      ]
    },
    troubleshooting: [],
    featured: true
  },
  {
    slug: "worker-point-admin-api",
    title: "포인트 API 및 관리자 시스템",
    period: "2023.11 - 2024.05",
    domain: "포인트 / 관리자 / 앱 API / Excel",
    oneLine:
      "포인트 앱 API와 관리자 조회·엑셀 다운로드를 함께 개발한 프로젝트",
    summary:
      "Spring Boot API와 JSP 관리자 화면에서 포인트 조회와 Excel 다운로드를 구현했습니다. Stored Procedure 결과를 앱 API와 관리자 화면에 맞게 나눠 처리했습니다.",
    decisionPoints: [
      "목록 조회와 Excel 다운로드가 같은 검색조건을 쓰는지 먼저 확인했습니다.",
      "프로시저 결과를 앱 API용 응답과 관리자 화면용 데이터로 어떻게 나눌지 기준을 정리했습니다.",
      "외부 포인트 API 연동 구간은 암복호화와 예외 응답 처리를 함께 점검했습니다."
    ],
    role: [
      "앱 API 응답 DTO 구성",
      "관리자 조회/페이징/엑셀 다운로드 흐름 구현",
      "Stored Procedure 호출 계층과 검색조건 처리 연결"
    ],
    implementations: [
      "회원번호 기반 포인트 미션, 지원, 근무, 이용내역 API 구현",
      "관리자 포인트 내역 검색 화면 기본 기간 세팅",
      "Datatable 기반 원격 페이징 API 구성",
      "목록 조회와 동일한 검색조건을 사용하는 Excel 다운로드 기능 구현",
      "외부 포인트 API 암복호화 요청/응답 처리"
    ],
    difficulties: [
      "목록 조회와 Excel 다운로드 API가 분리되어 검색조건이 어긋날 수 있었습니다.",
      "Stored Procedure 결과를 앱 API DTO와 관리자 테이블 포맷으로 각각 변환해야 했습니다.",
      "암복호화가 필요한 외부 포인트 API 응답을 안정적으로 처리해야 했습니다."
    ],
    verification: [
      "JSP에서 날짜와 휴대폰번호를 가공해 REST API에 전달하고, Controller에서 같은 검색조건으로 목록과 Excel 다운로드를 처리하는 흐름을 확인했습니다."
    ],
    result: [
      "관리자 목록과 Excel 다운로드에 동일한 검색조건을 적용했습니다."
    ],
    stack: ["Java", "Spring Boot", "Spring MVC", "JSP", "MSSQL", "Stored Procedure", "Apache POI"],
    stackContext: [
      "Spring MVC로 앱 API와 관리자 REST를 분리",
      "Stored Procedure 결과를 서비스 계층에서 재가공",
      "JSP + Datatable + Excel 다운로드 흐름을 운영자 화면에 연결"
    ],
    flow: [
      "JSP 검색 폼에서 날짜, 회원번호, 이름, 휴대폰번호 입력",
      "JavaScript에서 검색조건을 정규화해 목록 API 호출",
      "REST Controller에서 파라미터 길이와 기본값 검증",
      "Service에서 Stored Procedure를 호출하고 결과를 목록 또는 Excel 데이터로 변환"
    ],
    securityNote:
      "실제 회원번호 체계, 내부 DB 구조, 포인트 연동 키와 서버 정보는 모두 제외했습니다.",
    portfolioSentences: [
      "모바일 앱용 포인트 API와 관리자 화면을 함께 개발했습니다. 회원번호 검증, Stored Procedure 호출, DTO 응답 변환으로 앱 API를 구성했고, 관리자에서는 검색조건과 Ajax Datatable을 연결해 포인트 변동내역 조회 및 Excel 다운로드를 구현했습니다."
    ],

    featured: true
  },
  {
    slug: "legacy-maintenance",
    title: "레거시 업무 시스템 유지보수",
    period: "2023.08 - 2023.11",
    domain: "JSP / Spring Legacy / 프로시저 / 주문 승인",
    oneLine:
      "주문 승인, 조회 필터, 프로시저 흐름을 유지보수한 레거시 프로젝트",
    summary:
      "Spring Legacy, JSP, MyBatis 기반 업무 시스템에서 주문 승인과 조회 필터 흐름을 유지보수했습니다. 기존 구조를 유지한 채 필요한 조건과 처리 단계를 보완했습니다.",
    decisionPoints: [
      "변경이 Controller와 DAO 어디까지 영향을 주는지 먼저 확인했습니다.",
      "세션 기반 데이터 범위와 조회 필터가 실제 권한 범위와 맞는지 점검했습니다.",
      "기존 프로시저 중심 구조를 깨지 않고 수정 범위를 최소화하는 방향으로 접근했습니다."
    ],
    role: [
      "레거시 Controller, DAO, Mapper 기반 업무 흐름 유지보수",
      "조회 필터와 세션 기반 데이터 범위 처리",
      "운영자가 사용하는 목록/엑셀 기능 보완"
    ],
    implementations: [
      "미승인 주문 목록 조회와 승인 처리 흐름 점검",
      "브랜드/연령/월/타겟 등 필터 데이터 조회 연결",
      "세션 기반 사업장별 데이터 제한과 조회 조건 반영",
      "Excel 다운로드 양식 보완"
    ],
    difficulties: [
      "Controller에 업무 분기와 DAO 호출이 밀집돼 변경 영향 범위가 넓었습니다.",
      "프로시저/DAO 중심 구조라 화면 변경이 데이터 처리 로직과 강하게 결합돼 있었습니다."
    ],
    verification: [
      "세션 기반 데이터 범위와 조회 필터가 권한 범위에 맞는지 점검하고, Controller에서 조합한 조건이 DAO/Mapper 조회에 반영되는 흐름을 확인했습니다."
    ],
    result: [
      "기존 구조를 유지하면서 세션 기반 권한 범위와 운영 화면의 조회·Excel 흐름을 보완했습니다."
    ],
    stack: ["Java", "Spring Legacy", "JSP", "MyBatis", "MSSQL", "Apache POI"],
    stackContext: [
      "레거시 MVC 구조에서 화면과 DAO 호출을 유지한 채 기능 수정",
      "MyBatis/프로시저 중심 데이터 처리 유지보수",
      "운영자용 조회와 다운로드 화면 개선"
    ],
    flow: [
      "JSP 목록 화면 진입",
      "Controller에서 세션값, 필터값, 페이징 정보 조합",
      "DAO/Mapper에서 목록과 필터 데이터 조회",
      "필요 시 Excel 양식으로 내보내기"
    ],
    securityNote:
      "실제 회사명, 테이블명, 코드값, 주문 데이터는 제외하고 레거시 유지보수 성격만 기술했습니다.",
    portfolioSentences: [
      "Spring Legacy 기반 업무 시스템에서 주문 승인과 조회 필터, DAO/프로시저 흐름을 유지보수했습니다. 기존 구조를 유지하면서 세션 기반 권한 범위와 운영 화면의 조회/엑셀 흐름을 보완해 실제 업무 처리에 필요한 기능을 안정적으로 개선했습니다."
    ],
    featured: true
  }
];

// 메인 카드용 요약. 상세 프로젝트의 역할·어려움·해결 기록을 기준으로 작성합니다.
export const selectedProjectSummaries = {
  "enterprise-cms-erp": {
    category: "BUSINESS SYSTEM",
    title: "CMS / ERP 관리자 시스템",
    description: "영화 계약·매출·비용·정산 데이터를 관리하는 사내 업무 시스템",
    statement: ["대량 편집 화면에서", "‘보이는 값’과", "‘저장해야 하는 값’을 분리했습니다."],
    evidence: {
      kind: "flow" as const,
      steps: ["변경 여부", "마스킹 확인", "필수값 검증", "변경 행 추출"]
    },
    stack: ["Java", "Spring", "Oracle", "AUIGrid"]
  },
  "data-market-platform": {
    category: "DATA PLATFORM",
    title: "데이터 판매 플랫폼",
    description: "상품 ID만으로 중복을 판정하지 않고 실제 구매 단위가 되는 옵션 조합을 서버에서 비교했습니다.",
    statement: ["같은 상품인지가 아니라", "같은 옵션 조합인지 판단했습니다."],
    evidence: {
      kind: "comparison" as const,
      before: "상품 ID만 비교",
      after: "구매자 유형·사용자 ID + 데이터·옵션 조합"
    },
    stack: ["Spring Boot", "JPA", "MySQL", "Vue"]
  },
  "real-estate-admin-map": {
    category: "MAP / PROPERTY",
    title: "부동산 관리자 시스템",
    description: "지도 좌표 → 필지 조회 → Polygon → 선택 필지 → 매물 등록 흐름을 연결했습니다.",
    statement: ["외부 공간정보를", "실제 매물 입력 데이터로 연결했습니다."],
    evidence: {
      kind: "flow" as const,
      steps: ["지도 클릭", "PNU", "Polygon", "필지 선택", "매물 등록"]
    },
    stack: ["Spring Boot", "MySQL", "JavaScript", "외부 지도 API"]
  }
};

export const selectedProjectSlugs: (keyof typeof selectedProjectSummaries)[] = [
  "enterprise-cms-erp",
  "data-market-platform",
  "real-estate-admin-map"
];

export const portfolioTroubleshooting: PortfolioTroubleshooting[] = [
  {
    title: "표시값과 저장 대상을 구분한 CMS/ERP 저장 기준",
    problem:
      "대량 편집 화면에서 변경하지 않은 행이나 마스킹된 표시값이 저장 대상으로 포함될 수 있었습니다.",
    cause:
      "조회 데이터, 선택 상태, 수정 상태, 마스킹 상태가 하나의 저장 흐름에서 함께 관리되고 있었습니다.",
    analysis:
      "저장 요청을 만들기 전 화면 JS에서 행별 변경 여부, 마스킹 해제 여부, 필수값 검사 순서를 확인했습니다.",
    solution:
      "마스킹 해제·변경 여부·필수값을 확인한 뒤 변경 행만 요청 데이터로 구성했습니다. Controller → Service → Oracle 저장 SQL로 연결하고 저장 후 재조회하도록 구성했습니다.",
    verification:
      "저장 성공 후 데이터를 재조회하고 편집 중이던 현재 행 위치를 복원해 저장 결과와 화면 상태를 확인했습니다."
  },
  {
    title: "상품 ID 대신 옵션 조합을 기준으로 구매 항목 판단",
    problem: "같은 상품도 데이터 유형과 행·열·값 선택에 따라 다른 구매 항목이 됩니다.",
    cause: "상품 ID만 비교하면 서로 다른 옵션을 같은 항목으로 처리할 수 있었습니다.",
    analysis: "화면의 옵션 선택값이 API 요청과 Service의 구매자·데이터·옵션 조합 검사에 전달되는지 확인했습니다.",
    solution: "서버에서 조합 기준으로 중복을 판단하고, Vue 전역 장바구니 상태는 성공 응답일 때만 재조회했습니다.",
    verification: "옵션 조합 전달과 중복 응답 처리, 성공 시 장바구니 상태 갱신 흐름을 확인했습니다."
  },
  {
    title: "외부 필지 정보를 매물 등록용 입력 데이터로 변환",
    problem: "지도 클릭 좌표만으로는 매물 등록에 필요한 필지 식별값과 면적을 얻을 수 없었습니다.",
    cause: "주소·PNU·필지 정보·경계 좌표가 서로 다른 API 응답에 나뉘어 있었습니다.",
    analysis: "카카오 지오코더와 VWorld 응답에서 식별값, 숫자 데이터와 경계 좌표를 연결하는 흐름을 정리했습니다.",
    solution: "지도 표시 객체와 선택 필지 목록을 분리하고, PNU 기준 선택 목록을 합계 계산과 매물 등록용 데이터 생성에 사용했습니다.",
    verification: "선택·해제에 따른 필지 목록, 합계와 저장용 데이터 행 수의 갱신 흐름을 확인했습니다."
  }
];

export const careerTimeline: TimelineItem[] = [
  {
    id: "content-cms",
    period: "2025.11 - 2026.06",
    companyLabel: "콘텐츠 CMS 개발사",
    title: "사내 CMS / ERP 개발",
    role: "콘텐츠 CMS 개발자",
    projects: [
      {
        id: "cms-erp",
        slug: "enterprise-cms-erp",
        title: "CMS / ERP 관리자 시스템",
        description: "계약·매출·비용·정산 업무를 관리하는 사내 관리자 시스템을 개발했습니다.",
        sub: "관리자 화면 · 대량 편집 · 업무 데이터 처리",
        stack: ["Spring", "Oracle", "JavaScript", "AUIGrid"]
      }
    ]
  },
  {
    id: "inhouse-solution",
    period: "2024.09 - 2025.11",
    companyLabel: "사내 솔루션 개발사",
    title: "사내 솔루션 개발",
    role: "솔루션 개발자",
    projects: [
      {
        id: "data-platform",
        slug: "data-market-platform",
        title: "데이터 판매 플랫폼",
        description: "데이터 상품 등록·조회 API와 Vue 화면을 연동하고, 구매 조건 조합을 기준으로 장바구니 중복 처리를 구현했습니다.",
        stack: ["Spring Boot", "JPA", "MySQL", "Vue"]
      },
      {
        id: "otsuka-maintenance",
        slug: null,
        title: "한국오츠카제약 사내 시스템 유지보수",
        description: "ASP Classic과 Spring Legacy 기반 기존 시스템의 영업 일정·지출·성과 관련 내부 페이지를 유지보수했습니다.",
        stack: ["ASP Classic", "Spring Legacy"]
      },
      {
        id: "konkuk-orders",
        slug: null,
        title: "건국유업 주문 시스템 유지보수",
        description: "PHP CodeIgniter 기반 기존 주문 시스템의 기능 유지보수와 운영 대응을 수행했습니다.",
        stack: ["PHP", "CodeIgniter"]
      },
      {
        id: "server-migration",
        slug: null,
        title: "서버 환경 이전 및 배포 자동화",
        description: "Rocky Linux, Docker, GitLab, Jenkins, MySQL 환경을 구성하고 기존 프로젝트를 이전했습니다. GitLab/Jenkins 연동으로 자동 빌드·배포까지 구성했습니다.",
        stack: ["Rocky Linux", "Docker", "GitLab", "Jenkins", "MySQL"]
      }
    ]
  },
  {
    id: "si-development",
    period: "2023.07 - 2024.09",
    companyLabel: "SI 개발사",
    title: "SI 웹 시스템 개발",
    role: "SI 개발자",
    projects: [
      {
        id: "property-admin",
        slug: "real-estate-admin-map",
        title: "부동산 관리자 시스템",
        description: "지도 클릭 좌표와 외부 공간정보를 연동하고, PNU 기준 필지 선택·Polygon 표시·매물 등록 데이터 연결 기능을 개발했습니다.",
        stack: ["Spring Boot", "MySQL", "JavaScript", "지도 API"]
      },
      {
        id: "newworker",
        slug: null,
        title: "인크루트 뉴워커",
        description: "일당직 근무자 앱에서 사용하는 API 개발과 기존 관리자 페이지 유지보수를 수행했습니다.",
        stack: ["Spring Boot", "MSSQL"]
      },
      {
        id: "motrex-erp",
        slug: null,
        title: "모트렉스 ERP",
        description: "자동차 부품 주문·출고·재고를 관리하는 웹 기능을 개발했습니다.",
        stack: ["JSP", "Spring Legacy", "MSSQL"]
      },
      {
        id: "shopping-point-integration",
        slug: null,
        title: "사내 쇼핑몰 포인트 연동",
        description: "기존 사내 쇼핑몰에서 타 업체 포인트를 사용할 수 있도록 외부 API를 연동했습니다.",
        stack: ["Spring Boot", "MySQL"]
      }
    ]
  }
];

export const sanitizedNotice = [
  "회사명, 고객사명, 내부 시스템명, 내부 URL, 계정정보, API Key, DB 접속정보는 제외했습니다.",
  "프로젝트명은 실제 명칭 대신 업무 도메인 기준으로 재구성했습니다.",
  "기술적 판단 사례는 실제 담당 업무와 기존에 기록된 처리 흐름을 기준으로 정리했습니다."
];

export const experienceSummary = [
  { value: "4년차", description: "Java / Spring" },
  { value: "신규 + 레거시", description: "개발 / 유지보수" },
  { value: "업무 데이터", description: "Oracle · MySQL · MSSQL" },
  { value: "App → Server", description: "개발부터 운영·배포까지" }
];

export const problemSolvingCases = [
  {
    keyword: "CMS / SAVE",
    title: "대량 편집 화면의 저장 기준 분리",
    conclusion: "변경된 행만 서버로 보냅니다.",
    flow: ["조회", "변경 여부", "마스킹 확인", "필수값 검증", "변경 행 추출", "저장"],
    flowKind: "sequence",
    description: "미변경 데이터와 표시용 값이 저장되는 위험을 줄였습니다."
  },
  {
    keyword: "SETTLEMENT",
    title: "수기 입력값과 재계산 값 분리",
    conclusion: "수기 입력은 유지하고, 계산 대상만 다시 집계합니다.",
    flow: ["수기 입력값 → 유지", "계산 대상값 → 서버 재집계"],
    flowKind: "parallel",
    description: "서로 다른 성격의 데이터를 같은 갱신 흐름에서 처리하지 않도록 구분했습니다. 결과 검증 기록은 추가 확인이 필요합니다."
  },
  {
    keyword: "INFRA / DEPLOY",
    title: "기존 프로젝트의 신규 서버 환경 이전",
    conclusion: "프로젝트와 실행 환경을 함께 이전했습니다.",
    flow: ["Rocky Linux", "Docker", "GitLab", "Jenkins", "MySQL", "자동 빌드·배포"],
    flowKind: "sequence",
    description: "기존 프로젝트를 신규 서버 환경으로 이전하고 빌드·배포 과정을 자동화했습니다."
  }
];

export const miniMesAiCase = {
  description: "진행 중인 Mini MES에서는 미확정 업무 정책을 AI가 임의로 결정하지 못하도록 작업 규칙을 설계하고 있습니다."
};

type CmsCase = {
  id: string;
  title: string;
  statement: string[];
  problem: string;
  why: string;
  decision: string;
  overview: { asIs: string; decision: string; after: string[] };
  result: string;
  resultNote: string;
} & (
  | {
      kind: "save";
      flow: string[];
      technicalDetails: string[];
      requestPath: string;
      verification: string[];
    }
  | {
      kind: "settlement";
      comparison: { source: string; target: string }[];
    }
);

// CMS 상세는 사례별로 묶고, 확인되지 않은 정산 결과는 구분합니다.
export const cmsProjectDetail = {
  title: "내부 CMS / ERP 관리자 화면 개발",
  heroStatement: ["계약부터 정산까지,", "사내 업무 데이터를 다루는 관리자 시스템을 개발했습니다."],
  description: "영화 계약·매출·비용·정산 데이터를 관리하는 사내 업무 시스템의 조회·편집·저장 기능을 개발했습니다.",
  heroStack: ["Spring", "Oracle", "JavaScript", "AUIGrid"],
  context: "영화 계약·매출·비용·정산 데이터를 관리하는 사내 CMS / ERP 관리자 시스템입니다.",
  myPart: ["관리자 화면 조회·검색·편집·저장", "대량 편집 저장·마스킹 처리", "정산 데이터 입력·재계산 처리 기준 구분", "Oracle 기반 업무 데이터 조회·저장"],
  recap: ["변경된 행만 저장", "표시용·마스킹 값과 저장 데이터 분리", "수기 입력값 유지", "계산 대상 서버 재집계"],
  cases: [
    {
      id: "save-criteria",
      kind: "save",
      title: "대량 편집 화면의 저장 기준 분리",
      statement: ["화면에 보이는 값과", "실제 저장해야 하는 값을 분리했습니다."],
      problem: "조회·선택·변경·마스킹 상태가 하나의 저장 흐름에 섞여 있어 수정하지 않은 데이터나 표시용 값이 저장 요청에 포함될 위험이 있었습니다.",
      why: "조회용 표시값과 실제 저장 대상은 동일하게 취급할 수 없습니다.",
      decision: "변경 여부, 마스킹 상태, 필수값 검증을 분리하고 검증을 통과한 변경 행만 저장 요청에 포함하도록 구성했습니다.",
      overview: {
        asIs: "화면에 보이는 값과 실제 저장해야 하는 값이 같은 흐름에 섞여 있었습니다.",
        decision: "변경된 행만 저장 대상으로 분리했습니다.",
        after: ["변경 여부", "마스킹 확인", "필수값 검증", "변경 행 추출", "저장"]
      },
      flow: ["조회", "사용자 수정", "변경 여부 확인", "마스킹 확인", "필수값 검증", "변경 행 추출", "API 요청", "Oracle 저장", "재조회"],
      technicalDetails: [
        "변경 여부와 마스킹 해제 상태를 확인해 저장 가능한 데이터를 판별했습니다.",
        "필수값 검증을 통과한 변경 행만 요청 데이터로 구성했습니다.",
        "Controller와 Service를 거쳐 Oracle 저장 로직을 호출했습니다.",
        "저장 후 데이터를 재조회하고 사용자가 편집하던 행 위치를 복원했습니다."
      ],
      requestPath: "JavaScript → Controller → Service → Oracle",
      verification: [
        "마스킹이 해제되지 않으면 저장을 막는 화면 JS 로직을 확인했습니다.",
        "변경 여부를 검사하고 변경된 행만 저장 API로 전달하는 흐름을 확인했습니다.",
        "저장 성공 후 재조회와 현재 행 위치 복원 로직을 확인했습니다."
      ],
      result: "변경된 행만 저장 대상으로 구성해 불필요한 데이터 갱신 위험을 줄였습니다.",
      resultNote: "저장 후 재조회와 현재 행 위치 복원을 통해 연속적인 편집 작업을 지원했습니다."
    },
    {
      id: "settlement-rules",
      kind: "settlement",
      title: "정산 데이터의 입력값과 재계산 값 분리",
      statement: ["입력값을 유지할 영역과", "다시 집계할 영역을 나눴습니다."],
      problem: "정산 데이터를 저장하는 과정에서 사용자가 직접 입력한 항목과 서버에서 다시 계산해야 하는 항목을 함께 처리해야 했습니다.",
      why: "사용자 입력값과 서버 계산 결과는 갱신 기준이 다릅니다.",
      decision: "입력값을 유지할 항목과 서버에서 재집계할 항목을 구분해 각각 다른 처리 기준을 적용했습니다.",
      overview: {
        asIs: "수기 입력값과 서버에서 다시 계산해야 하는 값의 처리 기준이 달랐습니다.",
        decision: "입력 유지와 서버 재집계 대상을 구분했습니다.",
        after: ["수기 입력값 → 유지", "계산 대상값 → 서버 재집계"]
      },
      comparison: [
        { source: "수기 입력 영역", target: "입력값 유지" },
        { source: "재계산 영역", target: "서버 재집계" }
      ],
      result: "정산 저장 시 입력 유지 항목과 서버 재집계 대상의 처리 기준을 구분했습니다.",
      resultNote: "실제 필드·계산식과 저장 방식은 현재 자료만으로 확인되지 않습니다."
    }
  ] satisfies CmsCase[]
};

// 데이터 판매 플랫폼 상세 전용. 기존 기록에서 확인된 구매 조건과 응답 흐름입니다.
export const dataMarketProjectDetail = {
  description: "데이터 상품과 선택 옵션을 처리하는 판매 플랫폼의 백엔드 기능을 담당했습니다.",
  heroStatement: ["데이터 상품 조회부터", "옵션별 장바구니 처리까지 API를 개발했습니다."],
  heroStack: ["Spring Boot", "JPA", "MySQL", "Vue"],
  context: "데이터 상품을 조회하고 구매 조건을 선택해 장바구니에 담을 수 있는 데이터 판매 플랫폼입니다.",
  myPart: ["데이터 상품 목록·상세 API", "데이터 유형·옵션 선택값을 포함한 장바구니 API", "Vue 화면 연동", "구매 조건 조합 기준 중복 판별"],
  recap: ["상품 ID만으로 중복 판단하지 않음", "구매 조건 조합 기준으로 동일 항목 판별", "중복·신규 요청을 서버에서 분기", "저장 후 Vue 상태 재조회"],
  caseStudy: {
    title: "구매 조건 조합을 기준으로 장바구니 중복 판별",
    statement: ["상품 ID가 아니라,", "실제 구매 조건을 기준으로 중복 여부를 판단했습니다."],
    problem: "상품 ID만으로 장바구니 중복 여부를 판단하면 같은 상품에서 서로 다른 데이터 유형이나 옵션을 선택한 경우에도 동일한 구매 항목으로 처리될 수 있었습니다.",
    why: "실제 구매 항목의 동일성은 상품 ID만으로 결정되지 않습니다.",
    decision: "구매자 유형·사용자 ID·데이터·옵션 조합을 함께 고려하고, 화면 상태가 아닌 서버에서 받은 구매 조건을 기준으로 중복 여부를 판별했습니다.",
    overview: {
      asIs: "상품 ID만 비교하면 같은 상품의 다른 옵션 조합까지 중복으로 볼 수 있습니다.",
      decision: "상품 자체가 아니라 실제 구매 조건 조합을 기준으로 판단했습니다."
    },
    comparison: {
      limitedTitle: "상품 ID만 비교할 경우",
      limitedFlow: ["상품 ID", "같은 상품이면 중복으로 판단", "서로 다른 옵션 조합도 구분하지 못할 위험"],
      appliedTitle: "실제 적용한 구매 조건 기준",
      conditions: ["구매자 유형 · 사용자 ID", "데이터 상품 · 데이터 유형", "선택 옵션 조합"],
      conclusion: "동일한 구매 항목인지 판별"
    },
    flow: {
      steps: ["Vue 선택값", "Controller", "Service 중복 판별"],
      branches: [
        { id: "duplicate", label: "중복 요청", steps: ["HTTP 409 CONFLICT"] },
        { id: "new", label: "신규 요청", steps: ["장바구니 저장", "Vue 상태 재조회"] }
      ]
    },
    technicalDetails: [
      "로그인 여부와 필수 선택값을 확인한 후 데이터 유형과 옵션 조합을 포함해 요청 데이터를 구성했습니다.",
      "Service에서 구매자 유형·사용자 ID·데이터·옵션 조합을 기준으로 기존 장바구니 항목과 비교했습니다.",
      "신규 등록 성공 후 서버의 장바구니 데이터를 다시 조회해 화면 상태를 갱신하도록 구성했습니다."
    ],
    verification: [
      "로그인·필수값 검증 후 데이터 유형과 선택 옵션이 API 요청에 포함되는 흐름을 확인했습니다.",
      "동일 구매 조건의 중복 판별과 HTTP 409 CONFLICT 응답 처리를 확인했습니다.",
      "신규 등록 성공 시 Vue에서 서버 기준 장바구니 상태를 다시 조회하는 흐름을 확인했습니다."
    ],
    result: "서버에서 구매 조건 조합을 기준으로 중복 요청과 신규 등록 요청을 구분했습니다."
  }
};

// 부동산 상세 전용. 지도 표시 데이터와 매물 등록용 선택 데이터를 연결한 기록입니다.
export const realEstateProjectDetail = {
  title: "부동산 관리자 시스템",
  description: "부동산 매물 등록 과정에서 지도·필지 정보를 연동하는 관리자 기능을 개발했습니다.",
  heroStatement: ["부동산 매물 등록과", "지도·필지 정보 연동 기능을 개발했습니다."],
  heroStack: ["Spring Boot", "MySQL", "JavaScript", "외부 지도 API"],
  context: "부동산 매물을 등록하고 지도와 외부 공간정보를 연동하는 관리자 시스템입니다.",
  myPart: ["매물 등록·계약 정보 처리 및 지도 클릭 위치 연결", "주소·PNU 조회 연동", "필지 경계 Polygon 표시", "선택 필지·면적 데이터를 매물 등록 정보로 연결"],
  recap: ["지도 위치", "PNU", "필지 경계", "선택 필지", "면적·공시지가", "매물 등록 데이터"],
  caseStudy: {
    title: "PNU 기준 필지 선택과 외부 공간정보 연동",
    statement: ["지도에서 선택한 위치를", "실제 매물 등록 데이터로 연결했습니다."],
    problem: "클릭한 위치를 기준으로 외부 공간정보를 조회하고, 그 결과를 내부 매물 등록 데이터와 연결해야 했습니다.",
    why: "지도에서 위치를 선택하는 것만으로는 매물 등록에 필요한 필지 정보와 경계 데이터를 바로 사용할 수 없었습니다.",
    decision: "선택한 위치에서 주소와 필지 정보를 조회하고, PNU를 기준으로 선택 필지를 관리했습니다. 조회한 경계·면적 관련 정보는 지도 표시와 매물 등록에 필요한 데이터로 나눠 사용했습니다.",
    overview: {
      asIs: "지도에서 확인한 위치 정보가 그 자체로는 매물 등록 데이터가 되지 않습니다.",
      decision: "좌표와 PNU를 기준으로 외부 공간정보를 실제 입력 데이터로 연결했습니다."
    },
    flow: [
      { title: "필지 식별", steps: ["지도 클릭", "좌표 획득", "주소·PNU 조회"] },
      { title: "매물 등록 데이터 구성", steps: ["PNU 기준 필지 정보", "필지 경계 조회", "Polygon 표시", "필지 선택", "면적·공시지가 처리", "매물 등록 데이터"] }
    ],
    mapping: [
      { external: "위도·경도", internal: "주소·필지 조회 기준" },
      { external: "주소·PNU 등 필지 정보", internal: "PNU 기준 선택 필지 목록" },
      { external: "필지 경계 좌표", internal: "지도에 표시할 Polygon" },
      { external: "면적 응답값", internal: "숫자 변환 및 선택 필지 면적 합계" },
      { external: "공시지가 응답값", internal: "숫자 변환 및 선택 필지 공시지가 합계" }
    ],
    mappingNote: "선택 필지 목록의 주소·PNU·면적 정보를 매물 등록용 저장 데이터로 변환했습니다.",
    technicalDetails: [
      "조회한 필지 경계 좌표를 Polygon 표시용으로 가공하고, 지도 표시 객체와 선택 필지 목록을 분리했습니다.",
      "조회한 PNU를 필지 식별 기준으로 사용해 선택·해제 상태를 관리했습니다.",
      "면적·공시지가 문자열을 숫자로 변환해 선택 목록의 합계 계산에 사용했습니다."
    ],
    verification: [
      "기존 기록에서 클릭 좌표의 주소·PNU 조회와 필지 경계의 Polygon 표시 흐름을 확인했습니다.",
      "재구성 데모의 검증 기록에는 선택·해제 시 필지 목록, 면적·공시지가 합계, 저장용 데이터 행 수 갱신이 기재되어 있습니다.",
      "기존 기록에서 API 키 누락, 주소·필지 조회 또는 경계 조회 실패 시 상태 메시지를 표시하는 처리를 확인했습니다."
    ],
    result: "외부 공간정보를 단순 조회에 그치지 않고 실제 매물 등록에 사용할 수 있는 데이터 흐름으로 연결했습니다."
  }
};

// 상세 전용 기록. 메인 카드와 다른 프로젝트의 상세 구조에는 적용하지 않습니다.
export const projectDetailContents: Partial<Record<string, ProjectDetailContent>> = {
};
