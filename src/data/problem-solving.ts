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
  aiWorkflow?: { summary: string; aiTasks: string[]; developerDecisions: string[]; verification: string };
};

// 本문과 Project 연결의 단일 기준. Home과 Project는 이 데이터를 조회합니다.
export const problemSolvingCases: ProblemSolving[] = [
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

export const selectedProblemSolvingSlugs = ["cms-change-save", "cart-purchase-options", "parcel-selection-state"];
