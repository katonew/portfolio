

export type Project = {
  kind?: "side-project";
  github?: string;
  slug: string;
  title: string;
  period: string | null;
  domain: string;
  oneLine: string;
  summary: string;
  decisionPoints: string[];
  role: string[];
  implementations: string[];
  features?: { title: string; description: string; flow?: string[] }[];
  difficulties: string[];
  verification: string[];
  result: string[];
  stack: string[];
  stackContext: string[];
  flow: string[];
  securityNote: string;
  portfolioSentences: string[];
  featured?: boolean;
  demo?: { href: string; label: string };
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
    slug: "mini-mes",
    kind: "side-project",
    title: "Mini MES",
    period: null,
    domain: "제조 / 생산관리 / LOT 역추적",
    oneLine: "제조 업무 규칙과 데이터 무결성을 Spring Boot로 구현한 생산관리 사이드 프로젝트",
    summary: "작업지시부터 원자재 소비·반환, 생산실적, 완제품 LOT, 최종 품질검사와 역추적까지 연결한 개인 프로젝트입니다. 요구사항·업무 규칙·데이터 구조를 정의하고 Java 17 / Spring Boot / MyBatis로 구현했습니다.",
    decisionPoints: ["업무 규칙과 DB 제약의 책임 분리", "부모 잠금과 요청 멱등성", "생산 당시 BOM·Routing 보존"],
    role: ["Independent Design & Implementation · 개인 설계·구현", "PRD·업무 규칙·ERD·물리 DB 설계", "서버·Thymeleaf 화면 구현 및 Docker 배포 구성"],
    implementations: ["품목·BOM 버전·공정·Routing 개정 관리", "생산계획·작업지시와 상태 전이", "원자재 LOT·실제 소비·원소비에 연결된 반환", "생산실적·완제품 LOT·작업지시 완료", "완료 시 확정 대상에 대한 회차별 품질검사", "완제품 LOT 기준 생산·자재·품질 역추적"],
    features: [
      { title: "기준정보", description: "품목, BOM 버전, 공정과 Routing 개정을 관리하고 작업지시에 적용한 버전을 보존합니다." },
      { title: "생산과 자재", description: "생산계획·작업지시에서 원자재 LOT 소비·반환과 생산실적을 연결합니다. 첫 생산실적에서 완제품 LOT을 만들고 후속 실적은 같은 LOT에 연결합니다." },
      { title: "품질과 역추적", description: "완료 시 확정한 검사 대상에 회차별 합격·불합격을 누적하고, 완제품 LOT에서 확정 BOM·Routing과 실제 소비·반환·생산·검사 이력을 조회합니다." }
    ],
    difficulties: [],
    verification: ["Controller·Service·Mapper·SQL·화면·테스트 코드를 정적으로 확인했습니다.", "반환 검증 문서의 DB 미접속 테스트 통과 기록과 MySQL 통합 테스트 미실행 범위를 구분합니다."],
    result: ["공개 Demo와 실제 화면을 통해 생산·자재·품질의 연결을 제시합니다."],
    stack: ["Java 17", "Spring Boot", "MyBatis", "MySQL", "Thymeleaf", "JavaScript", "Docker"],
    stackContext: ["도메인별 모듈형 모놀리스 · Controller → Service → Mapper XML", "Service의 상태·수량 검증과 Transaction, DB의 FK·CHECK·UNIQUE 제약을 함께 사용", "Docker Compose의 Java 실행 컨테이너와 외부 DB·Proxy 연결 구성"],
    flow: ["작업지시", "원자재 소비", "필요 시 반환", "생산실적", "완제품 LOT", "작업지시 완료", "최종 품질검사", "LOT 역추적"],
    securityNote: "개인 Side Project입니다. 회사 프로젝트나 경력 기간에 포함하지 않습니다.",
    portfolioSentences: [],
    featured: true,
    demo: { href: "http://mes.katonew.kro.kr/", label: "Live Demo" },
    github: "https://github.com/katonew/mini_mes"
  },
  {
    slug: "enterprise-cms-erp",
    features: [
      { title: "비용 정산 상세 편집", description: "Header 아래 여러 비용을 편집하고 공통 Grid의 변경 목록을 저장 API와 연결하는 흐름입니다.", flow: ["비용 편집", "변경 행 구분", "업무 검증", "저장·재조회"] },
      { title: "업무 조건과 저장 처리", description: "기존 정산 흐름에는 계약·예산·증빙·전표 상태에 따른 검사 경로가 있습니다. 공통·기존 로직을 포함한 구조이며 전체의 단독 구현을 뜻하지 않습니다." }
    ],
    title: "내부 CMS/ERP 관리자 화면 개발",
    period: "2025.11 - 2026.05",
    domain: "계약 / 매출 / 비용 / 정산 / 관리자 화면",
    oneLine: "계약·매출·비용·정산 데이터를 다루는 내부 업무 시스템",
    summary:
      "Spring 기반 내부 CMS/ERP에서 계약, 매출, 비용, 정산 화면을 개발했습니다. 화면, 그리드, 저장 로직을 연결해 조회·편집·저장 흐름을 맞췄습니다.",
    decisionPoints: [
      "화면의 마스킹 상태와 그리드의 변경 목록을 각각 확인했습니다.",
      "대량 편집 화면이라 변경된 행만 정확히 추출되는지가 핵심이었습니다.",
      "저장 후 재조회 시 운영자가 작업하던 위치를 잃지 않도록 흐름을 설계했습니다."
    ],
    role: ["운영자 검색·조회·편집 화면 개발 및 유지보수","기존 공통 Grid와 화면 JS·Controller·Service·SQL 저장 흐름 연계","기존 마스킹 상태 검사와 편집·재조회 흐름 보완"],
    implementations: [
      "공통 코드 기반 검색조건 로딩과 조회 API 연동",
      "AUIGrid 행 추가, 복사, 삭제, 선택 행 메일 전송, Excel 다운로드 처리",
      "변경된 행만 추출해 저장 API로 보내는 편집 흐름 구성",
      "저장 후 재조회와 현재 행 위치 복원 처리"
    ],
    difficulties: [
      "대량 편집 화면에서 변경 행만 안정적으로 저장해야 했습니다.",
      "마스킹된 민감정보가 표시값 그대로 저장될 위험이 있었습니다.",
      "저장 후 조회 시 사용자가 작업하던 위치가 사라지면 운영 효율이 떨어질 수 있었습니다."
    ],
    verification: [
      "저장 전 마스킹 해제 여부를 검사하고, 해제되지 않으면 저장을 막는 화면 JS 로직을 확인했습니다.",
      "저장 후 재조회 호출과 현재 행 위치 복원의 코드 경로를 확인했습니다."
    ],
    result: [
      "변경 행 선별과 마스킹 상태 검사를 거쳐 저장 요청을 구성했습니다."
    ],
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
      "Service에서 Oracle 조회·저장 로직을 호출하고 화면 콜백에서 재조회로 연결"
    ],
    securityNote:
      "실제 회사명, 내부 시스템명, 연동 전문, 계정/코드값은 모두 제외하고 업무 성격만 기술했습니다.",
    portfolioSentences: [
      "Spring 기반 내부 CMS/ERP에서 Thymeleaf와 AUIGrid 기반 관리자 화면을 개발했습니다. 계약, 매출, 비용, 정산 도메인의 조회·편집·저장 흐름을 화면, 서비스, SQL 계층으로 분리해 구현했습니다.",
      "그리드의 변경 행 선별과 마스킹 상태 검사를 저장 요청에 연결했습니다."
    ],
    featured: true
  },
  {
    slug: "data-market-platform",
    features: [
      { title: "데이터 상품 조회와 옵션 선택", description: "상품 목록·상세 API와 데이터 유형에 따른 행·열·값 선택 UI를 연결했습니다.", flow: ["상품 조회", "데이터 유형", "옵션 선택", "구매 요청"] },
      { title: "장바구니 API와 화면 상태 연동", description: "로그인·선택값 검사, 서버 응답 처리와 성공 후 장바구니 상태 재조회를 연결했습니다." }
    ],
    title: "데이터 판매 플랫폼",
    period: "2024.12 - 2025.10",
    domain: "데이터 상품 / 옵션 선택 / 장바구니 / 구매",
    oneLine: "데이터 상품 조회와 구매 옵션·장바구니를 연결하는 판매 플랫폼",
    summary:
      "데이터 상품을 조회하고 구매 조건을 선택해 장바구니에 담는 판매 플랫폼입니다. Spring Boot/JPA 기반 상품·장바구니 API와 Vue 화면 연동을 담당했습니다.",
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
    featured: true
  },
  {
    slug: "real-estate-admin-map",
    demo: { href: "/features/remax-land-demo/", label: "지도·필지 Demo 보기" },
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
  },
  {
    slug: "server-migration",
    title: "기존 프로젝트의 서버 이전과 빌드·배포 구성",
    period: null,
    domain: "서버 이전 / 실행 환경 / 자동 빌드·배포",
    oneLine: "프로젝트와 실행 환경을 함께 옮기고 빌드·배포 흐름을 연결한 작업",
    summary: "기존 프로젝트를 신규 서버 환경으로 이전하고 Rocky Linux·Docker·GitLab·Jenkins·MySQL 환경과 자동 빌드·배포 흐름을 구성한 경험입니다. 별도 프로젝트 수행 기간은 현재 기록에서 확인되지 않아 재직 기간으로 대체하지 않았습니다.",
    decisionPoints: [],
    role: [
      "기존 프로젝트의 신규 서버 이전",
      "서버 실행 환경 및 GitLab·Jenkins 빌드·배포 연동 구성"
    ],
    implementations: [
      "Rocky Linux·Docker 기반 실행 환경 구성",
      "MySQL을 포함한 프로젝트 이전 환경 구성",
      "GitLab·Jenkins 연동 자동 빌드·배포 구성"
    ],
    difficulties: [],
    verification: [
      "기존 경력 기록에서 이전 환경과 빌드·배포 구성 범위를 확인했습니다. 실제 파이프라인 로그·운영 가동 결과는 이번 작업에서 확인하지 않았습니다."
    ],
    result: [
      "기존 프로젝트를 신규 서버 환경으로 이전하고 자동 빌드·배포 흐름을 구성했습니다."
    ],
    stack: [
      "Rocky Linux",
      "Docker",
      "GitLab",
      "Jenkins",
      "MySQL"
    ],
    stackContext: [
      "서버 환경·프로젝트 이전·자동 빌드와 배포의 연결"
    ],
    flow: [
      "기존 프로젝트",
      "신규 실행 환경",
      "GitLab·Jenkins",
      "빌드·배포"
    ],
    securityNote: "운영 서버 주소·계정·파이프라인 인증정보는 공개하지 않습니다.",
    portfolioSentences: []
  }
];

// 메인 카드용 요약. 상세 프로젝트의 역할·어려움·해결 기록을 기준으로 작성합니다.
export const selectedProjectSummaries = {
  "mini-mes": {
    category: "SIDE PROJECT · INDEPENDENT DESIGN & IMPLEMENTATION",
    title: "Mini MES",
    description: "작업지시의 상태·수량 규칙부터 원자재 소비·반환, 생산실적, 품질검사, 완제품 LOT 역추적까지 하나의 제조 흐름으로 연결했습니다.",
    statement: ["제조 업무 규칙을 정의하고,", "생산 이력을 코드와 데이터로 연결했습니다."],
    evidence: { kind: "flow" as const, steps: ["작업지시", "소비·반환", "생산·LOT", "검사·역추적"] },
    stack: ["Java 17", "Spring Boot", "MyBatis", "MySQL"]
  },
  "enterprise-cms-erp": {
    category: "BUSINESS SYSTEM",
    title: "CMS / ERP 관리자 시스템",
    description: "영화 계약·매출·비용·정산 데이터를 관리하는 사내 업무 시스템",
    statement: ["계약·매출·비용·정산의", "조회·편집·저장을 다뤘습니다."],
    evidence: {
      kind: "flow" as const,
      steps: ["업무 조회", "상세 편집", "검증·저장", "재조회"]
    },
    stack: ["Java", "Spring", "Oracle", "AUIGrid"]
  },
  "data-market-platform": {
    category: "DATA PLATFORM",
    title: "데이터 판매 플랫폼",
    description: "데이터 상품 목록·상세 API, 구매 옵션 선택과 장바구니 화면을 연결한 판매 플랫폼",
    statement: ["상품 조회부터 구매 옵션 선택,", "장바구니 API까지 연결했습니다."],
    evidence: {
      kind: "flow" as const,
      steps: ["상품 조회", "구매 옵션", "장바구니", "화면 연동"]
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
  "mini-mes",
  "enterprise-cms-erp",
  "data-market-platform",
  "real-estate-admin-map"
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
        slug: "server-migration",
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

export const miniMesAiCase = {
  description: "Mini MES에서는 업무 규칙·DB·상태 전이를 먼저 정의하고 AGENTS.md로 Agent 작업 기준을 고정했습니다. Codex의 구현 결과는 문서와 Source를 대조해 검토하며, 미확정 정책과 최종 판단은 개발자가 맡습니다."
};

export const realEstateFeature = {
  title: "PNU 기준 필지 선택과 외부 공간정보 연동",
  flow: [
    {
      title: "필지 식별",
      steps: [
        "지도 클릭",
        "좌표 획득",
        "주소·PNU 조회"
      ]
    },
    {
      title: "매물 등록 데이터 구성",
      steps: [
        "PNU 기준 필지 정보",
        "필지 경계 조회",
        "Polygon 표시",
        "필지 선택",
        "면적·공시지가 처리",
        "매물 등록 데이터"
      ]
    }
  ],
  mapping: [
    {
      external: "위도·경도",
      internal: "주소·필지 조회 기준"
    },
    {
      external: "주소·PNU 등 필지 정보",
      internal: "PNU 기준 선택 필지 목록"
    },
    {
      external: "필지 경계 좌표",
      internal: "지도에 표시할 Polygon"
    },
    {
      external: "면적 응답값",
      internal: "숫자 변환 및 선택 필지 면적 합계"
    },
    {
      external: "공시지가 응답값",
      internal: "숫자 변환 및 선택 필지 공시지가 합계"
    }
  ],
  mappingNote: "선택 필지 목록의 주소·PNU·면적 정보를 매물 등록용 저장 데이터로 변환했습니다.",
  technicalDetails: [
    "조회한 필지 경계 좌표를 Polygon 표시용으로 가공하고, 지도 표시 객체와 선택 필지 목록을 분리했습니다.",
    "조회한 PNU를 필지 식별 기준으로 사용해 선택·해제 상태를 관리했습니다.",
    "면적·공시지가 문자열을 숫자로 변환해 선택 목록의 합계 계산에 사용했습니다."
  ]
};
