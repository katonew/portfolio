type SkillUsage = {
  technologies: string[];
  description: string;
  source: { kind: "project"; slug: string } | { kind: "career-project"; id: string };
};

// 사용 맥락은 아래의 기존 프로젝트 기록에 근거합니다. 회사 관계를 추정하지 않습니다.
export const resumeSkillUsages: SkillUsage[] = [
  {
    technologies: ["Java"],
    description: "CMS / ERP 업무 화면 API 개발",
    source: { kind: "project", slug: "enterprise-cms-erp" }
  },
  {
    technologies: ["Spring Boot", "JPA"],
    description: "데이터 상품·장바구니 API 및 조회 처리",
    source: { kind: "project", slug: "data-market-platform" }
  },
  {
    technologies: ["Spring MVC"],
    description: "앱 API와 관리자 REST 처리",
    source: { kind: "project", slug: "worker-point-admin-api" }
  },
  {
    technologies: ["MyBatis"],
    description: "레거시 DAO·Mapper 조회와 데이터 처리",
    source: { kind: "project", slug: "legacy-maintenance" }
  },
  {
    technologies: ["Oracle"],
    description: "CMS 업무 데이터 조회·저장",
    source: { kind: "project", slug: "enterprise-cms-erp" }
  },
  {
    technologies: ["MySQL"],
    description: "데이터 판매 플랫폼의 데이터 저장소",
    source: { kind: "project", slug: "data-market-platform" }
  },
  {
    technologies: ["MSSQL"],
    description: "앱 API·관리자 화면의 프로시저 기반 데이터 처리",
    source: { kind: "project", slug: "worker-point-admin-api" }
  },
  {
    technologies: ["Thymeleaf"],
    description: "CMS 검색조건·그리드 영역 템플릿",
    source: { kind: "project", slug: "enterprise-cms-erp" }
  },
  {
    technologies: ["JSP"],
    description: "관리자 검색·조회·Excel 다운로드 화면",
    source: { kind: "project", slug: "worker-point-admin-api" }
  },
  {
    technologies: ["JavaScript", "AUIGrid"],
    description: "CMS 대량 편집·변경 행 검증·저장 요청",
    source: { kind: "project", slug: "enterprise-cms-erp" }
  },
  {
    technologies: ["Vue"],
    description: "상품 상세 화면과 장바구니 상태 연동",
    source: { kind: "project", slug: "data-market-platform" }
  },
  {
    technologies: ["Docker", "GitLab", "Jenkins"],
    description: "서버 환경 이전 및 자동 빌드·배포",
    source: { kind: "career-project", id: "server-migration" }
  }
];
