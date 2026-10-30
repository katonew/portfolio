import { ProjectEvidenceImage } from "@/components/ProjectEvidenceImage";
import Link from "next/link";
import type { Project } from "@/data/profile";
import { getProjectProblemSolving } from "@/lib/problem-solving";

const sourceRoot = "https://github.com/katonew/mini_mes/blob/main/";
const documents = [
  { file: "mini_mes_prd.md", path: "docs/mini_mes_prd.md", role: "목표·MVP 범위·수용 기준을 정의하고 미확정 정책을 표시" },
  { file: "business-rules.md", path: "docs/business-rules.md", role: "상태·수량·LOT·소비·반환의 허용 조건과 예외를 정의" },
  { file: "erd-design.md", path: "docs/erd-design.md", role: "계획·실행·LOT·이력의 개념과 관계, 보존 대상을 모델링" },
  { file: "database-design.md", path: "docs/database-design.md", role: "테이블·키·자료형·제약과 부모 잠금·요청 처리 계약을 구체화" },
  { file: "schema.sql", path: "db/schema.sql", role: "FK·CHECK·UNIQUE로 DB가 보장할 행·참조·유일성 규칙을 구현" },
  { file: "AGENTS.md", path: "AGENTS.md", role: "업무 규칙 우선, 책임 경계, 미확정 정책의 결정 요청, 변경·검증 범위를 Agent 작업 기준으로 고정" }
];

const screens = {
  trace: { file: "11-traceability-summary.png", width: 1296, height: 1458, variant: "trace", title: "완제품 LOT의 생산 근거", caption: "완제품 LOT에서 당시 작업지시와 확정 Routing, 누적 생산실적을 역으로 확인합니다." },
  material: { file: "12-traceability-materials.png", width: 1296, height: 1908, variant: "material", title: "실제 소비와 연결된 반환", caption: "원소비에 연결된 반환을 확인하고, 원자재 LOT별 소비·반환·순소비를 집계합니다." },
  bom: { file: "12-traceability-materials.png", width: 1296, height: 1908, variant: "bom", title: "확정 BOM의 예상량과 실제 순소비", caption: "당시 확정 BOM의 예상 소요량과 실제 소비에서 반환을 뺀 순소비를 비교합니다." },
  quality: { file: "10-quality-inspection-core.png", width: 1296, height: 741, variant: "quality", title: "확정 대상에 대한 회차별 품질검사", caption: "완료 시 확정한 검사 대상량을 기준으로 회차별 합격·불합격 수량을 누적합니다." }
} as const;

const developmentScope = ["PRD", "Business Rules", "ERD", "DB Design", "Backend", "UI", "Verification", "Deploy"];
const designStages = ["PRD", "Business Rules", "Logical ERD", "Physical DB Design", "DB Constraints"];
const ownership = [
  { title: "Domain & Planning", items: ["제조 업무 흐름·MVP 범위", "PRD·Business Rules", "상태·수량·소비·반환 정책"] },
  { title: "Data & Architecture", items: ["논리 ERD·물리 DB 설계", "schema.sql / FK·CHECK·UNIQUE", "적용 BOM·Routing 보존"] },
  { title: "Implementation", items: ["Spring Boot / MyBatis", "Thymeleaf / JavaScript", "Transaction / Lock / Idempotency"] },
  { title: "Verification & Delivery", items: ["업무 규칙 테스트·검증 기록", "DB 미접속 테스트 실행 기록", "Docker 배포 구성·공개 Demo"] }
];

const rules = [
  "작업지시당 완제품 LOT은 최대 1개입니다. 최초 생산실적에서 생성하고 후속 실적은 같은 LOT에 연결합니다.",
  "생산수량은 양품+불량이며, 누적 생산량은 작업지시 수량을 초과할 수 없습니다.",
  "누적 생산량이 지시수량과 같을 때 완료할 수 있습니다. 완료 시 누적 양품을 최종검사 대상으로 확정합니다.",
  "최종검사는 COMPLETED 작업지시의 LOT만 대상으로 하며, 누적 검사량은 확정 대상량을 초과할 수 없습니다.",
  "BOM 예상 소요량과 실제 소비 원장은 분리합니다. 작업지시에 적용한 BOM 버전·Routing 개정을 보존합니다.",
  "반환은 원소비를 참조합니다. 원소비 수량에서 누적 반환량을 뺀 잔여량 안에서만 재고를 복원합니다.",
  "같은 요청 키·같은 입력은 최초 성공 결과를 재사용합니다. 같은 키의 다른 입력은 거절하며 원장·재고·Receipt를 함께 커밋하거나 롤백합니다."
];

export function MiniMesProjectDetail({ project }: { project: Project }) {
  const cases = getProjectProblemSolving(project.slug);
  const screen = (variant: keyof typeof screens) => {
    const evidence = screens[variant];
    return <ProjectEvidenceImage src={`/mini-mes/${evidence.file}`} alt={evidence.title} title={evidence.title} width={evidence.width} height={evidence.height} variant={evidence.variant} caption={evidence.caption} />;
  };
  return (
    <main className="detail-page cms-detail-page mes-detail-page">
      <div className="container">
        <Link className="back-link" href="/projects/">프로젝트 목록으로 돌아가기</Link>
        <header className="cms-project-hero mes-case-hero mes-wide">
          <div className="mes-hero-copy">
            <p className="eyebrow">개인 사이드 프로젝트<br />기획·설계·구현·배포 직접 수행</p>
            <h1>Mini MES</h1>
            <p className="cms-hero-description">제조 업무 규칙과 PRD부터 DB·Spring·화면·배포까지 직접 설계하고 구현한 개인 MES 프로젝트입니다.</p>
            <div className="mes-hero-meta">
              <p className="project-stack">{project.stack.join(" · ")}</p>
              <nav className="featured-project-link mes-actions" aria-label="Mini MES 프로젝트 증거">
                {project.demo && <a className="text-link primary-link" href={project.demo.href}>Live Demo ↗</a>}
                {project.github && <a className="text-link" href={project.github}>GitHub ↗</a>}
                <a className="text-link" href="#mes-owned">직접 설계·구현한 범위 ↓</a>
              </nav>
            </div>
          </div>
          <ProjectEvidenceImage
            id="mes-hero-dashboard"
            src="/mini-mes/01-dashboard.png"
            alt="Mini MES 사이드바와 상단 작업지시·생산·품질 현황"
            width={1585} height={3101} variant="dashboard"
            caption="작업지시 상태와 생산·품질 현황을 하나의 운영 흐름에서 조회합니다."
            sizes="(max-width: 1100px) 100vw, 65vw"
            priority
          />
        </header>

        <nav className="mes-ownership-process" aria-labelledby="mes-ownership-statement">
          <p className="case-study-label">End-to-End Ownership</p>
          <h2 id="mes-ownership-statement">처음부터 끝까지 직접 설계하고 구현했습니다.</h2>
          <ol>{developmentScope.map((step, index) => <li key={step}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{step}</li>)}</ol>
        </nav>

        <section className="cms-case mes-owned-section" id="mes-owned" aria-labelledby="mes-owned-title">
          <p className="case-study-label">What I Owned</p>
          <h2 id="mes-owned-title">업무의 기준부터 화면과 배포까지</h2>
          <p>{project.summary}</p>
          <dl className="mes-ownership-list">{ownership.map((area) => <div key={area.title}><dt>{area.title}</dt><dd><ul>{area.items.map((item) => <li key={item}>{item}</li>)}</ul></dd></div>)}</dl>
          <p className="case-disclosure">Independent Design &amp; Implementation · 회사에서 맡은 일부 기능이 아닌 개인 프로젝트입니다. 회사 경력 기간에 포함하지 않습니다. DB 미접속 테스트 실행 기록은 확인했으며, 실제 MySQL·브라우저 검증의 성공 여부는 확인하지 않았습니다.</p>
        </section>

        <div id="product-screens" className="mes-feature-stories mes-wide">
          <section className="cms-case" aria-labelledby="mes-flow">
            <p className="case-study-label">Manufacturing Flow</p>
            <h2 id="mes-flow">하나의 생산 흐름, 연결된 이력</h2>
            <ol className="mes-process">{project.flow.map((step, index) => <li key={step}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{step}</li>)}</ol>
            <p>원자재 소비·반환과 생산실적은 진행 중인 작업지시에서 처리합니다. 생산 완료 이후에는 확정된 양품 수량을 기준으로 최종검사를 수행합니다.</p>
          </section>

          <section className="mes-feature-story mes-production-story" aria-labelledby="mes-production-story">
            <header><p className="case-study-label">01 / Production Overview</p><h2 id="mes-production-story">작업지시에서 생산·품질까지, 하나의 업무 화면</h2></header>
            <ProjectEvidenceImage
              src="/mini-mes/01-dashboard.png"
              alt="Mini MES 사이드바와 상단 작업지시·생산·품질 현황"
              width={1585} height={3101} variant="dashboard"
              title="생산 현황"
              caption="작업지시 상태와 누적 생산·양품률·최종검사 현황을 같은 업무 흐름에서 조회합니다."
              sizes="(max-width: 1440px) 100vw, 1360px"
            />
            <div className="mes-production-explanation">
              <p>작업지시 상태와 누적 생산, 양품·불량과 최종검사 현황을 연결해 확인합니다.</p>
              <Link className="text-link" href="#mes-rules">이 화면의 기반이 된 업무 규칙 ↓</Link>
            </div>
          </section>
          <section className="mes-feature-story mes-material-story" aria-labelledby="mes-material-story">
            <header><p className="case-study-label">02 / Material Traceability</p><h2 id="mes-material-story">소비·반환 원장과 확정 BOM을 나란히 확인</h2></header>
            <div className="mes-story-editorial mes-material-editorial">
              {screen("material")}
              <div className="mes-story-explanation">
                <h3>원소비와 반환을 연결한 원장</h3>
                <p>원소비와 연결된 반환을 보존하고, LOT별 소비·반환·순소비를 집계합니다. 같은 수량처럼 보여도 실제 소비 이력과 BOM의 예상 소요량은 구분합니다.</p>
                <Link className="text-link" href="/problem-solving/mes-material-idempotency/">멱등성과 재고 원자성의 판단 →</Link>
              </div>
            </div>
            <div className="mes-story-followup"><p>작업 당시 확정한 BOM을 기준으로 예상량을 계산하고, 실제 소비에서 반환을 뺀 순소비와 비교합니다.</p>{screen("bom")}</div>
          </section>

          <section className="mes-feature-story mes-lot-story" aria-labelledby="mes-lot-story">
            <header><p className="case-study-label">03 / Finished Goods LOT Traceability</p><h2 id="mes-lot-story">완제품 LOT을 기준으로 제조 근거를 역추적</h2></header>
            <div className="mes-story-editorial mes-lot-editorial">
              {screen("trace")}
              <div className="mes-story-explanation">
                <h3>생산 당시 기준과 실제 이력</h3>
                <p>완제품 LOT에서 WorkOrder가 보존한 BOM·Routing과 실제 생산실적을 연결합니다. 현재 기준정보로 과거 이력을 추정하지 않습니다.</p>
                <ol><li>완제품 LOT</li><li>WorkOrder · 확정 BOM / Routing</li><li>Production Result</li><li>Inspection</li></ol>
                <Link className="text-link" href="/problem-solving/mes-lot-traceability/">역추적의 설계 판단 →</Link>
              </div>
            </div>
            <div className="mes-story-followup mes-secondary-evidence"><p>작업지시 완료 시 확정한 양품 수량을 검사 대상으로 사용하고, 검사 결과는 생산실적을 덮어쓰지 않고 회차별로 누적합니다.</p>{screen("quality")}</div>
          </section>

          <section className="cms-case" aria-labelledby="mes-built">
            <h2 id="mes-built">What I Built</h2>
            <dl className="mes-scope">{project.features?.map((feature) => <div key={feature.title}><dt>{feature.title}</dt><dd>{feature.description}</dd></div>)}</dl>
            <p className="case-disclosure">Controller·Service·Mapper XML·Thymeleaf 소스 기준으로 확인한 구현 범위입니다. 설비통신, 창고·출하, 재검사·재작업, 로그인·역할별 권한은 이 범위에 포함하지 않습니다.</p>
          </section>

          <section className="cms-case" id="mes-rules" aria-labelledby="mes-rules-title">
            <p className="case-study-label">Business Rules</p>
            <h2 id="mes-rules-title">저장 가능한 상태를 먼저 정의했습니다</h2>
            <ol className="mes-rules">{rules.map((rule) => <li key={rule}>{rule}</li>)}</ol>
          </section>
        </div>

        <section className="cms-case mes-problem-section" aria-labelledby="mes-problems">
          <p className="case-study-label">Engineering Decisions · Problem Solving</p>
          <h2 id="mes-problems">제조 흐름 안의 세 가지 설계 판단</h2>
          <ol className="mes-problem-list">
            {cases.map((item, index) => <li key={item.slug}>
              <span className="mes-case-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{item.title}</h3>
                <dl className="mes-engineering-decision">
                  <div><dt>Problem</dt><dd>{item.problem}</dd></div>
                  <div className="mes-my-decision"><dt>My Decision</dt><dd>{item.decision}</dd></div>
                  {item.why && <div><dt>Why</dt><dd>{item.why}</dd></div>}
                  <div><dt>Implementation</dt><dd><Link className="text-link" href={`/problem-solving/${item.slug}/#implementation`}>구현 경로와 처리 순서 →</Link></dd></div>
                  <div><dt>Verification</dt><dd><Link className="text-link" href={`/problem-solving/${item.slug}/#evidence`}>검증 근거와 한계 →</Link></dd></div>
                </dl>
                <nav className="mes-related-evidence" aria-label={`${item.title} 상세와 관련 업무 화면`}>
                  {item.relatedEvidence?.map((evidence) => <Link className="text-link" key={evidence.href} href={evidence.href}>{evidence.label} ↓</Link>)}
                </nav>
              </div>
            </li>)}
          </ol>
        </section>

        <section className="cms-case" aria-labelledby="mes-architecture">
          <h2 id="mes-architecture">Architecture / Data Design</h2>
          <p>도메인별 모듈형 모놀리스에서 Controller는 요청·응답, Service는 업무 규칙·상태 전이·트랜잭션, MyBatis Mapper는 조회·변경을 담당합니다. Thymeleaf와 JavaScript로 화면을 연결했습니다.</p>
          <a className="text-link" href="#mes-owned">앞에서 정의한 설계 기준 ↑</a>
          <div className="mes-design-origin">
            <h3>업무 규칙을 DB와 Service의 보장으로 연결</h3>
            <ol>{documents.slice(0, 5).map((doc, index) => <li key={doc.file}><strong>{designStages[index]}</strong><a href={`${sourceRoot}${doc.path}`}>{doc.file} ↗</a></li>)}<li><strong>Service Validation</strong><span>상태·누적 수량 검증</span></li><li><strong>Transaction Boundary</strong><span>잠금·원장·수량의 원자성</span></li></ol>
          </div>
          <ol className="cms-flow"><li>Controller</li><li>Service / Transaction</li><li>MyBatis Mapper XML</li><li>MySQL</li></ol>
          <dl className="mes-scope">
            <div><dt>DB가 보장하는 규칙</dt><dd>작업지시·LOT·원장 사이의 FK, 작업지시당 완제품 LOT의 UNIQUE, 요청 scope/key와 결과 Receipt의 UNIQUE, 수량 양수·양품+불량 등 행 내부 CHECK를 schema.sql에 정의했습니다.</dd></div>
            <div><dt>Service가 보장하는 규칙</dt><dd>누적 수량과 상태는 행 하나의 CHECK로 해결되지 않습니다. WorkOrder 부모 잠금 이후 최신 합계를 확인하고, 원자재 LOT 잠금·조건부 UPDATE의 영향행수까지 검사합니다.</dd></div>
            <div><dt>생산 당시 기준 보존</dt><dd>작업지시가 BOM 버전·Routing 개정을 참조합니다. 역추적은 현재 BOM으로 추정하지 않고 저장된 연결과 실제 소비·반환 이력을 읽습니다.</dd></div>
            <div><dt>배포 구성</dt><dd>Docker Compose에서 Java 17 JRE 컨테이너로 JAR를 실행하고 외부 MySQL·Proxy 네트워크를 연결합니다. 공개 Demo의 HTTP 응답을 확인했으며 운영 가용률이나 부하 성능은 측정하지 않았습니다.</dd></div>
          </dl>
        </section>

        <section className="cms-case mes-supporting-section" aria-labelledby="mes-documents">
          <p className="case-study-label">PRD → Design → Implementation</p>
          <h2 id="mes-documents">요구사항을 코드의 판단 기준으로</h2>
          <ol className="mes-document-flow"><li>목표·범위 결정</li><li>PRD</li><li>Business Rules</li><li>ERD</li><li>Physical DB Design</li><li>DDL</li><li>구현·검증</li><li>규칙 보완</li></ol>
          <p>PRD는 기능 범위, Business Rules는 허용되는 상태와 수량, ERD와 물리 설계는 이를 보존할 관계와 제약을 정의합니다. 설계 문서의 추천안·미확정 정책을 구현 완료로 취급하지 않고 Source와 대조합니다.</p>
          <dl className="mes-documents">{documents.map((doc) => <div key={doc.file}><dt><a className="text-link" href={`${sourceRoot}${doc.path}`}>{doc.file} ↗</a></dt><dd>{doc.role}</dd></div>)}</dl>
        </section>

        <section className="cms-case" aria-labelledby="mes-why">
          <h2 id="mes-why">Why I Built This</h2>
          <p>단순히 데이터를 등록하는 화면보다, 생산 이력을 설명하고 변경의 영향을 추적할 수 있는 시스템을 만드는 데 목표를 두었습니다. 제조 흐름의 상태·수량 규칙을 정의하고, 이를 DB 제약과 Service 트랜잭션으로 연결하는 경험을 실제 코드로 보여주고자 했습니다.</p>
          <p className="case-disclosure">PRD의 프로젝트 목적과 AGENTS.md의 구현·검증 기준에 근거합니다.</p>
        </section>

        <section className="cms-case mes-supporting-section" id="ai-workflow" aria-labelledby="mes-ai">
          <p className="case-study-label">AI-assisted Engineering · Supporting Evidence</p>
          <h2 id="mes-ai">How I Worked with AI</h2>
          <p>업무 정책·데이터 구조·트랜잭션·상태 전이의 최종 결정자는 개발자입니다. AI는 문서화·구현·코드 탐색과 검토를 보조하며, 미확정 정책을 임의로 채우지 않도록 AGENTS.md에 기준을 고정했습니다.</p>
          <ol className="mes-workflow">
            <li><h3>Define / Document</h3><p>개발자가 MES 목표와 범위를 정하고 PRD → Business Rules → ERD → Physical DB Design → DDL로 구체화합니다.</p></li>
            <li><h3>Control / Implement</h3><p>AGENTS.md에 업무 규칙 우선순위와 계층별 책임·변경 범위를 고정하고 Codex가 기존 문서와 패턴 안에서 구현하도록 합니다. 미확정 사항은 개발자에게 결정을 요청합니다.</p></li>
            <li><h3>Explore / Review</h3><p>Source와 문서를 비교하고 Graphify로 관련 코드의 참조 관계를 탐색합니다. 예를 들어 LotTraceController → LotTraceService → MaterialConsumptionMapper 연결을 확인합니다.</p></li>
            <li><h3>Verify / Publish Evidence</h3><p>테스트 코드·DB 검증·화면 확인은 각각 실행 근거를 구분합니다. 공개 Demo와 실제 Screenshot을 먼저 제시하고, 이후 Figma MCP로 Web/PDF Portfolio의 Evidence 레이아웃을 구성합니다.</p></li>
          </ol>
          <div className="cms-case-implementation"><h3>AGENTS.md가 고정한 경계</h3><p>Business Rule → Data Integrity → Historical Traceability 순서를 우선합니다. Controller·SQL·화면에 업무 정책을 숨기거나 null·기본값으로 오류를 우회하지 않습니다. 문서가 미확정인 상태 전이·수량 정책은 개발자의 결정 없이 구현하지 않습니다. Graphify는 관련 탐색에 우선 활용하고 빌드·테스트는 승인된 범위에서 실행하도록 규정합니다.</p></div>
          <div className="cms-case-implementation"><h3>실제 검토와 수정 기록</h3><p>작업지시 폼 오류 화면에서 선택값이 사라지고 공통 pageshow 처리가 업무상 비활성 버튼을 활성화하는 문제를 Controller·Thymeleaf·JavaScript 대조로 확인했습니다. 제출 ID와 등록 가능 상태를 보존하도록 수정한 기록이 있습니다. 이 기록의 브라우저 재현·테스트 실행은 미확인으로 남깁니다.</p><a className="text-link" href={`${sourceRoot}docs/ai/failures/work-order-form-state-preservation.md`}>AI 제안의 문제·검토·수정 기록 ↗</a></div>
        </section>

        <section className="cms-case mes-supporting-section" aria-labelledby="mes-tools">
          <h2 id="mes-tools">Engineering / Portfolio Production Workflow</h2>
          <dl className="mes-scope">
            <div><dt>Engineering · Graphify</dt><dd>graph.json과 탐색 우선 규칙, hook 설정이 존재합니다. 로컬 query/path 조회로 Controller·Service·Mapper 참조 관계를 확인했습니다. 그래프는 관련 Source를 찾는 보조 자료로 사용하고 실제 규칙은 원문 코드에서 검토합니다. 이 근거를 Graphify MCP 사용 이력으로 확대하지 않습니다.</dd></div>
            <div><dt>Engineering · Superpowers</dt><dd>원자재 반환의 설계 문서와 구현 계획에서 요구사항·재고 복원·잠금·검증 범위를 먼저 정리했습니다. 계획에는 executing-plans를 통한 구현 지침이 명시되어 있습니다. 문서에 기록된 설계·계획과 실행 지침 범위만 설명하며, 개별 Skill 호출이나 모든 검증 완료를 추정하지 않습니다.</dd></div>
            <div><dt>Portfolio Production · Figma MCP</dt><dd>개발자 제공 작업 이력 기준으로 ChatGPT와 Figma MCP를 연결해 새 Portfolio 파일, Web Home 초안과 A4 PDF 8페이지를 구성했습니다. 실제 Mini MES Screenshot을 PDF에 배치하고 Evidence 레이아웃을 설계했습니다. Mini MES Source 구현에 사용한 도구로 표현하지 않습니다.</dd></div>
          </dl>
          <div className="featured-project-link"><a className="text-link" href={`${sourceRoot}docs/superpowers/specs/2026-10-28-material-return-design.md`}>반환 설계 문서 ↗</a><a className="text-link" href={`${sourceRoot}docs/superpowers/plans/2026-10-28-material-return.md`}>구현 계획·검증 기준 ↗</a></div>
        </section>

        <section className="cms-case" aria-labelledby="mes-verification">
          <h2 id="mes-verification">Verification / Evidence</h2>
          <dl className="mes-scope">
            <div><dt>공개 Demo / 실제 화면</dt><dd>2026-10-30에 공개 주소의 HTTP 200과 대시보드 제목을 확인했습니다. 이 페이지의 네 화면은 실제 프로젝트 캡처입니다. HTTP 응답 확인은 브라우저 조작·전체 기능 검증을 의미하지 않습니다.</dd></div>
            <div><dt>Source 정적 확인</dt><dd>Service의 요청 Receipt·부모 잠금·상태·수량 검증, Mapper의 FOR UPDATE·조건부 재고 변경, 화면과 LOT 역추적 조회 연결을 확인했습니다.</dd></div>
            <div><dt>과거 테스트 실행 기록</dt><dd>material-return-verification.md에는 DB 미접속 14개 테스트 클래스 83건 통과와 MySQL 테스트 소스 컴파일 기록이 있습니다. 반환·소비·RawLot·WorkOrder 회귀 범위이며 전체 MES 기능이나 실제 MySQL 동시성 통과로 확대하지 않습니다.</dd></div>
            <div><dt>검증의 한계</dt><dd>MySQL 통합 테스트에는 동시 요청·완료 경합·롤백 시나리오가 작성되어 있으나 확인한 문서에서 실행 성공 근거는 없습니다. 이번 Portfolio 작업에서 MES의 테스트·운영 DB·브라우저 검증을 재실행하지 않았습니다.</dd></div>
          </dl>
          <a className="text-link" href={`${sourceRoot}docs/material-return-verification.md`}>테스트 실행 범위와 미실행 항목 ↗</a>
        </section>

        <footer className="cms-case mes-footer"><h2>직접 확인하기</h2><p>업무 흐름은 Demo에서, 구현 판단은 Source와 세 가지 Problem Solving에서 확인할 수 있습니다.</p><div className="featured-project-link">{project.demo && <a className="text-link primary-link" href={project.demo.href}>Live Demo ↗</a>}{project.github && <a className="text-link" href={project.github}>GitHub ↗</a>}</div></footer>
      </div>
    </main>
  );
}
