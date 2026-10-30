export type ProblemSolving = {
  slug: string;
  projectSlug: string;
  keyword: string;
  title: string;
  summary: string;
  problem: string;
  decision: string;
  implementation: string[];
  flow: string[];
  result: string;
  verification: string[];
  limitations?: string[];
  sources?: { label: string; href: string }[];
  aiWorkflow?: { summary: string; aiTasks: string[]; developerDecisions: string[]; verification: string };
};

// 本문과 Project 연결의 단일 기준. Home과 Project는 이 데이터를 조회합니다.
export const problemSolvingCases: ProblemSolving[] = [
  {
    slug: "mes-material-idempotency",
    projectSlug: "mini-mes",
    keyword: "MES / INVENTORY CONSISTENCY",
    title: "원자재 소비·반환의 멱등성과 재고 원자성",
    summary: "같은 요청의 재전송과 서로 다른 재고 변경 요청을 구분하고, 소비·반환 원장과 재고를 하나의 트랜잭션으로 처리했습니다.",
    problem: "응답을 받지 못한 소비·반환 요청을 다시 보내면 재고가 중복 변경될 수 있습니다. 서로 다른 요청이 같은 LOT을 사용하거나 같은 원소비를 반환할 때는 최신 재고·반환 잔여량을 기준으로 판단해야 합니다.",
    decision: "버튼 비활성화만으로 중복을 막지 않고 scope/key UNIQUE Receipt와 정규화 입력 fingerprint로 같은 업무 요청을 식별했습니다. 재전송은 최초 성공을 재사용하고 새 요청은 부모·원소비·LOT 잠금 안에서 최신 상태와 잔여량을 다시 검증합니다.",
    implementation: [
      "MaterialConsumptionTransactionService와 MaterialReturnTransactionService의 별도 Bean에서 REQUIRES_NEW / READ_COMMITTED 트랜잭션을 시작합니다.",
      "소비는 Receipt 선점 → WorkOrder 잠금 → 확정 BOM 검증 → RawLot 잠금 → 조건부 차감 → 소비 INSERT → 성공 snapshot 기록 순서입니다.",
      "반환은 원소비의 부모를 조회한 뒤 WorkOrder → 원소비 → RawLot 순서로 잠급니다. 최신 반환합과 원소비 잔여량, 등록수량 상한을 확인하고 조건부 복원·반환 INSERT를 함께 처리합니다.",
      "Receipt UNIQUE 충돌은 실패한 트랜잭션을 종료한 뒤 새 읽기 트랜잭션에서 처리합니다. 같은 fingerprint면 최초 결과를 재사용하고 다른 입력은 거절합니다.",
      "조건부 UPDATE 영향행수와 결과 연결을 확인합니다. 어느 단계든 실패하면 Receipt·재고·원장을 함께 롤백하며 원소비는 수정·삭제하지 않습니다."
    ],
    flow: ["요청 키 선점", "부모·LOT 잠금", "상태·수량 검증", "재고·원장 변경", "성공 기록 / 전체 롤백"],
    result: "정적 Source에서 동일 요청의 성공 재사용과 신규 요청의 재검증, 원장·재고의 트랜잭션 경계를 확인했습니다.",
    verification: [
      "Service와 Mapper XML에서 FOR UPDATE, 재고 상한 조건과 영향행수 검증, 중복 Receipt 처리 경로를 대조했습니다.",
      "반환 검증 문서에는 DB 미접속 14개 클래스 83건 통과 기록이 있습니다. 반환 계약·Service·Controller·MyBatis 파싱 및 기존 소비·RawLot·WorkOrder 회귀 범위입니다.",
      "MySQL 통합 테스트 소스에는 동일 UUID 경합, 동시 소비·반환, CHECK 실패와 잠금 대기 timeout 롤백 사례가 있습니다. 작성된 시나리오와 실행 결과를 구분합니다."
    ],
    limitations: ["확인한 기록에서 실제 MySQL 통합 테스트는 미실행입니다. 실제 DB 경합·롤백 통과를 주장하지 않습니다.", "실제 물리적 반환과 입력 오류 교정은 다른 업무입니다. 반환을 임의 재고 보정이나 원소비 정정 기능으로 사용하지 않습니다."],
    sources: [
      { label: "소비 TransactionService", href: "https://github.com/katonew/mini_mes/blob/main/src/main/java/com/taehyung/mes/lot/MaterialConsumptionTransactionService.java" },
      { label: "반환 TransactionService", href: "https://github.com/katonew/mini_mes/blob/main/src/main/java/com/taehyung/mes/lot/MaterialReturnTransactionService.java" },
      { label: "반환 검증 기록", href: "https://github.com/katonew/mini_mes/blob/main/docs/material-return-verification.md" }
    ]
  },
  {
    slug: "mes-work-order-lock",
    projectSlug: "mini-mes",
    keyword: "MES / CONCURRENCY BOUNDARY",
    title: "WorkOrder 부모 잠금으로 생산실적·완료 처리 직렬화",
    summary: "생산실적 등록과 완료 처리가 같은 WorkOrder를 잠그고 최신 합계·상태를 판단하도록 동시성 경계를 맞췄습니다.",
    problem: "실적 등록과 완료 요청이 잠금 없이 같은 이전 상태·합계를 읽으면 생산 상한이나 완료 조건 판단이 어긋날 수 있습니다. 최초 실적 두 건이 동시에 들어오면 LOT 생성도 경쟁합니다.",
    decision: "실적 행이나 LOT만 잠그는 대신, 두 업무가 공유하는 WorkOrder 부모 행을 먼저 잠그도록 했습니다. 등록과 완료가 같은 경계를 통과한 후 최신 합계로 판단하게 하여 순서를 정합니다.",
    implementation: [
      "ProductionResultTransactionService는 Receipt 선점 후 WorkOrderMapper.findByIdForUpdate로 부모를 잠그고 IN_PROGRESS·제품 단위·현재 생산합을 확인합니다.",
      "신규 수량을 합한 생산합이 지시수량을 넘으면 거절합니다. 첫 실적에서만 완제품 LOT을 만들고 이후 같은 작업지시의 LOT에 실적을 연결합니다. DB UNIQUE도 작업지시당 LOT 1개를 보호합니다.",
      "WorkOrderService.complete도 READ_COMMITTED 트랜잭션에서 같은 부모를 잠근 뒤 실적을 재집계합니다. 누적 생산=지시수량과 생산=양품+불량을 확인한 후 COMPLETED·검사 대상 양품·완료 이력을 함께 저장합니다.",
      "완료 요청이 먼저 잠금을 얻으면 당시 합계로 완료 가능 여부를 판단합니다. 실적이 먼저 반영되면 완료는 갱신된 합계를 읽고, 완료 이후 새 실적은 상태 검사에서 거절합니다."
    ],
    flow: ["WorkOrder FOR UPDATE", "최신 상태·실적합", "등록 상한 / 완료 조건", "실적 또는 완료 반영", "커밋"],
    result: "등록과 완료 코드가 동일 부모 잠금·최신 합계 확인 경계를 사용하는 것을 확인했습니다. 설계 의도를 DB 경합 테스트 시나리오와 연결했습니다.",
    verification: [
      "WorkOrderService.complete, ProductionResultTransactionService.create, WorkOrderMapper XML의 잠금·집계·완료 UPDATE를 정적으로 대조했습니다.",
      "ProductionResultMysqlIntegrationTests에 concurrentFirstRequestsCannotCreateTwoLots와 completionAndFinalResultRaceKeepsStateAndQuantityConsistent 시나리오가 작성되어 있습니다.",
      "통합 테스트는 전용 로컬 스키마와 opt-in 환경변수가 필요한 기본 비활성 테스트입니다. 생산실적 검증 문서에서 작성 단계의 테스트 미실행을 확인했습니다."
    ],
    limitations: ["테스트 코드의 존재는 실제 InnoDB 경합 검증 통과를 의미하지 않습니다.", "이 경계는 해당 Service를 통과하는 업무 흐름에 적용됩니다. DB 직접 변경이나 별도 경로까지 자동으로 보호한다고 주장하지 않습니다."],
    sources: [
      { label: "생산실적 TransactionService", href: "https://github.com/katonew/mini_mes/blob/main/src/main/java/com/taehyung/mes/production/ProductionResultTransactionService.java" },
      { label: "WorkOrderService", href: "https://github.com/katonew/mini_mes/blob/main/src/main/java/com/taehyung/mes/workorder/WorkOrderService.java" },
      { label: "동시성 테스트 코드", href: "https://github.com/katonew/mini_mes/blob/main/src/test/java/com/taehyung/mes/production/ProductionResultMysqlIntegrationTests.java" }
    ]
  },
  {
    slug: "mes-lot-traceability",
    projectSlug: "mini-mes",
    keyword: "MES / HISTORICAL TRACEABILITY",
    title: "완제품 LOT에서 생산·원자재·품질 이력 역추적",
    summary: "생산 당시 확정한 BOM·Routing과 실제 소비·반환·실적·검사를 연결해 완제품 LOT의 제조 근거를 조회합니다.",
    problem: "완제품의 생산 수량만 보면 어떤 기준과 원자재로 생산됐는지 설명하기 어렵습니다. 현재 BOM으로 과거 소비를 추정하거나 여러 원장을 단순 JOIN하면 기준이 바뀌거나 수량이 중복 집계될 수 있습니다.",
    decision: "완제품 LOT → WorkOrder가 보존한 BOM 버전·Routing 개정을 조회하고, 실제 원장은 각각 읽어 연결·집계합니다. 예상 소요량과 실제 순소비를 별도 값으로 유지하고 한 읽기 트랜잭션에서 조회합니다.",
    implementation: [
      "LotTraceController에서 LOT ID를 받아 LotTraceService로 전달합니다. Service는 readOnly / REPEATABLE_READ로 같은 읽기 범위를 사용합니다.",
      "ProductionResultMapper에서 LOT과 실적을, WorkOrderMapper에서 부모 작업지시를 읽습니다. BomMapper·RoutingMapper로 적용 버전과 공정 구성을 조회합니다.",
      "MaterialConsumptionMapper·MaterialReturnMapper의 실제 소비·반환을 연결해 LOT별 사용량과 순소비를 집계하고, 확정 BOM의 예상량과 비교합니다.",
      "QualityInspectionMapper에서 해당 완제품 LOT의 회차별 검사를 조회해 확정 검사 대상·누적 합격·불합격을 표시합니다.",
      "연결된 기준정보가 없거나 정합성을 확인할 수 없으면 경고를 표시합니다. 조회에서 원본을 보정하거나 현재 BOM으로 빈 이력을 채우지 않습니다."
    ],
    flow: ["완제품 LOT", "작업지시", "확정 BOM·Routing", "실제 소비·반환", "생산실적·품질검사"],
    result: "실제 역추적 화면에서 LOT의 생산 근거와 소비·반환·BOM 비교를 제시합니다. Source에서 저장된 관계를 따라 읽는 조회 흐름을 확인했습니다.",
    verification: [
      "LotTraceService와 연관 Mapper, trace/detail.html에서 적용 기준·실제 원장·집계·경고 표시의 연결을 확인했습니다.",
      "Project Detail의 traceability-summary와 traceability-materials Screenshot으로 조회 결과의 구성을 제시합니다.",
      "Live Demo는 연결되어 있으며 HTTP 응답을 확인했습니다. 이번 작업에서 브라우저로 특정 LOT을 선택하거나 수량을 대조하지 않았습니다."
    ],
    limitations: ["조회 대상은 시스템에 저장된 업무 이력입니다. 물리적 원자재 사용 사실이나 개별 제품 시리얼 단위 추적을 보증하지 않습니다.", "완제품 LOT 기준 역추적 범위이며 원자재 LOT 정방향 추적·LOT 분할·병합을 구현 완료로 표현하지 않습니다."],
    sources: [
      { label: "LotTraceService", href: "https://github.com/katonew/mini_mes/blob/main/src/main/java/com/taehyung/mes/trace/LotTraceService.java" },
      { label: "업무 규칙과 실제 화면", href: "/projects/mini-mes/#product-screens" }
    ]
  },
  {
    slug: "cms-change-save",
    projectSlug: "enterprise-cms-erp",
    keyword: "CMS / SAVE",
    title: "변경 행과 마스킹 상태를 구분해 비용 저장 요청 구성",
    summary: "여러 비용 중 변경된 행을 요청으로 만들고, 마스킹 상태와 업무 조건을 따로 확인하는 저장 흐름입니다.",
    problem: "화면에 표시된 여러 행 중 실제 변경된 행을 구분해야 했고, 민감정보가 마스킹된 상태에서도 저장 요청을 판단해야 했습니다.",
    decision: "그리드의 변경 목록과 화면의 마스킹 해제 여부를 각각 검사한 뒤 저장 요청을 구성했습니다.",
    implementation: [
      "그리드가 관리하는 수정·추가·삭제 행 목록을 저장 요청에 포함했습니다.",
      "마스킹이 해제되지 않은 경우 요청을 보내기 전에 저장을 중단했습니다.",
      "기존 공통 Grid의 변경 목록을 Header·Detail 저장 요청과 연결하는 구조를 다뤘습니다.",
      "원본의 신규 상세 분기에는 이미 저장된 법인카드 연계 키를 조회하고 중복이면 예외 처리하는 경로가 있습니다. 이를 전체 증빙 정책이나 단독 구현 범위로 확대하지 않습니다."
    ],
    flow: [
      "조회",
      "사용자 편집",
      "변경 여부 확인",
      "마스킹 검사",
      "변경 행 선별",
      "저장 요청"
    ],
    result: "변경 행을 구분하는 요청 구성과 마스킹 상태의 저장 차단 경로를 정적 코드에서 확인했습니다.",
    verification: [
      "공통 그리드의 변경 목록 추출 함수와 저장 요청의 연결을 정적으로 추적했습니다.",
      "마스킹 상태 검사 분기와 저장 콜백의 재조회 호출 경로를 확인했습니다. 실제 운영 DB의 저장 결과를 실행 검증한 기록과는 구분합니다."
    ]
  },
  {
    slug: "cms-latest-state",
    projectSlug: "enterprise-cms-erp",
    keyword: "CMS / PUBLIC IMPROVEMENT",
    title: "편집 중 상태 변경을 저장 시 최신 상태 검사로 처리",
    summary: "기존 상세 수정 분기의 검사 차이를 재검토하고 공개 재구현에서 저장 허용 정책을 정의한 후속 개선입니다.",
    problem: "화면의 상태 검사와 달리 확인한 상세 수정 서버 분기의 전표 상태 검사 호출은 비활성화되어 있었습니다. 실제 운영 장애가 발생했다는 증거는 아닙니다.",
    decision: "공개 Case에서 저장소의 최신 상태가 허용할 때만 요청을 반영하도록 정했습니다. 요청 전체 성공·실패, 거절 시 입력 유지, 자동 재시도 없음은 원본 회사 정책으로 소급하지 않습니다.",
    implementation: [
      "기존 분기 재구성과 개선 저장 함수를 독립된 메모리 저장소로 비교했습니다.",
      "비용 편집·변경 선별·카드 내역 선택을 Main으로 재구성하고 최신 상태 비교는 하단 보조 사례로 이동했습니다."
    ],
    flow: [
      "비용 편집",
      "변경 요청",
      "최신 상태 확인",
      "저장 또는 전체 미반영"
    ],
    result: "공개 Case 로컬 기록에서 자동 테스트 49개 통과와 TypeScript·Vite build 성공, 대표 흐름의 실제 브라우저 검증을 확인했습니다. 원격 push·배포는 완료되지 않았습니다.",
    verification: [
      "CMS 공개 재구현의 2026-10-19 README·AI-WORKFLOW 기록을 읽어 확인했습니다. 이번 Portfolio 작업에서 해당 테스트와 브라우저 검증을 재실행하지 않았습니다.",
      "메모리 저장소의 결과는 실제 DB 트랜잭션·잠금·동시성 보장의 증거가 아닙니다."
    ],
    aiWorkflow: {
      summary: "초기 AI 결과의 방향을 사용자 판단으로 재검토하고 업무 기능 중심으로 다시 구성했습니다.",
      aiTasks: [
        "기존 근거 정리와 설계·구현 보조",
        "연결 코드 검토와 테스트·브라우저 검증 수행"
      ],
      developerDecisions: [
        "Demo의 Main Story를 비용 정산 업무로 재정의",
        "전체 성공·실패와 입력 보존 정책 결정",
        "최신 상태 비교를 보조 Evidence로 이동"
      ],
      verification: "실제 Skill 사용·채택·검증 기록은 공개 재구현의 AI-WORKFLOW에 남아 있습니다. 배포되지 않은 문서·Source의 가짜 링크는 추가하지 않았습니다."
    }
  },
  {
    slug: "cart-purchase-options",
    projectSlug: "data-market-platform",
    keyword: "DATA / CART",
    title: "구매 조건 조합을 기준으로 장바구니 중복 판별",
    summary: "같은 상품의 다른 데이터 유형·옵션을 구분하기 위해 실제 구매 조건을 서버 중복 판단에 사용했습니다.",
    problem: "상품 ID만으로 장바구니 중복 여부를 판단하면 같은 상품에서 서로 다른 데이터 유형이나 옵션을 선택한 경우에도 동일한 구매 항목으로 처리될 수 있었습니다.",
    decision: "구매자 유형·사용자 ID·데이터·옵션 조합을 함께 고려하고, 화면 상태가 아닌 서버에서 받은 구매 조건을 기준으로 중복 여부를 판별했습니다.",
    implementation: [
      "로그인 여부와 필수 선택값을 확인한 후 데이터 유형과 옵션 조합을 포함해 요청 데이터를 구성했습니다.",
      "Service에서 구매자 유형·사용자 ID·데이터·옵션 조합을 기준으로 기존 장바구니 항목과 비교했습니다.",
      "신규 등록 성공 후 서버의 장바구니 데이터를 다시 조회해 화면 상태를 갱신하도록 구성했습니다."
    ],
    flow: [
      "Vue 선택값",
      "Controller",
      "Service 중복 판별",
      "중복: HTTP 409",
      "신규: 저장 후 Vue 재조회"
    ],
    result: "서버에서 구매 조건 조합을 기준으로 중복 요청과 신규 등록 요청을 구분했습니다.",
    verification: [
      "로그인·필수값 검증 후 데이터 유형과 선택 옵션이 API 요청에 포함되는 흐름을 확인했습니다.",
      "동일 구매 조건의 중복 판별과 HTTP 409 CONFLICT 응답 처리를 확인했습니다.",
      "신규 등록 성공 시 Vue에서 서버 기준 장바구니 상태를 다시 조회하는 흐름을 확인했습니다.",
      "기존 자료의 코드 확인 범위입니다. 이번 작업에서 원본 실행·운영 결과·성능을 검증하지 않았습니다."
    ]
  },
  {
    slug: "parcel-selection-state",
    projectSlug: "real-estate-admin-map",
    keyword: "MAP / PROPERTY",
    title: "지도 표시 객체와 PNU 기준 선택 데이터를 분리해 매물 입력 연결",
    summary: "경계 표시와 저장용 선택 목록의 역할을 구분하고 PNU로 필지 선택·해제와 합계를 연결했습니다.",
    problem: "지도에 경계를 표시하는 객체와 매물 등록에 사용할 필지 목록은 역할과 데이터 형태가 다릅니다.",
    decision: "지도 객체는 경계 표시를 맡고, PNU 기준 선택 목록은 선택·해제·합계·매물 입력 데이터의 기준으로 사용했습니다.",
    implementation: [
      "조회한 필지 경계 좌표를 Polygon 표시용으로 가공하고, 지도 표시 객체와 선택 필지 목록을 분리했습니다.",
      "조회한 PNU를 필지 식별 기준으로 사용해 선택·해제 상태를 관리했습니다.",
      "면적·공시지가 문자열을 숫자로 변환해 선택 목록의 합계 계산에 사용했습니다."
    ],
    flow: [
      "외부 필지 조회",
      "경계 표시 객체",
      "PNU 기준 선택 목록",
      "합계·매물 입력 데이터"
    ],
    result: "외부 공간정보를 단순 조회에 그치지 않고 실제 매물 등록에 사용할 수 있는 데이터 흐름으로 연결했습니다.",
    verification: [
      "기존 기록에서 클릭 좌표의 주소·PNU 조회와 필지 경계의 Polygon 표시 흐름을 확인했습니다.",
      "재구성 데모의 검증 기록에는 선택·해제 시 필지 목록, 면적·공시지가 합계, 저장용 데이터 행 수 갱신이 기재되어 있습니다.",
      "기존 기록에서 API 키 누락, 주소·필지 조회 또는 경계 조회 실패 시 상태 메시지를 표시하는 처리를 확인했습니다."
    ]
  },
];

export const selectedProblemSolvingSlugs = ["mes-material-idempotency", "mes-work-order-lock", "mes-lot-traceability", "cms-change-save", "cart-purchase-options", "parcel-selection-state"];
