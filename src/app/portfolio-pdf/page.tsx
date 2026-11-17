import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import inspection from "../../../public/mini-mes/10-quality-inspection-core.png";
import trace from "../../../public/mini-mes/11-traceability-summary.png";
import materials from "../../../public/mini-mes/12-traceability-materials.png";
import dashboard from "../../../public/portfolio-pdf/mini-mes-dashboard.png";
import parcelMap from "../../../public/portfolio-pdf/property-parcel-demo.png";
import profilePhoto from "../../../public/profile-photo.png";
import { careerTimeline, profile, realEstateFeature } from "@/data/profile";
import { getProblemSolving } from "@/lib/problem-solving";
import { getProject } from "@/lib/projects";
import styles from "./portfolio-pdf.module.css";

export const metadata: Metadata = {
  title: `${profile.name} | 웹개발자 포트폴리오 2026`,
  description: "Java/Spring 웹개발자 채용 제출용 포트폴리오",
  robots: { index: false, follow: false }
};

const portfolioUrl = "https://katonew.kro.kr";
const miniMes = getProject("mini-mes")!;
const cms = getProject("enterprise-cms-erp")!;
const property = getProject("real-estate-admin-map")!;
const sourceRoot = `${miniMes.github}/blob/main/`;

const contents = [
  ["02", "프로필 · 실무 경력"],
  ["03–05", "Mini MES · 개인 설계 및 구현"],
  ["06", "CMS / ERP · 비용 정산"],
  ["07", "Data Platform · 외부 주문 수집"],
  ["08", "Property · 지도와 필지 선택"],
  ["09", "문제 해결 사례"],
  ["10", "개발 방식 · 연락처"]
];

const engineering = [
  {
    slug: "mes-material-idempotency",
    title: "소비·반환 멱등성과 재고 원자성",
    problem: "요청 재전송과 같은 LOT의 동시 변경은 재고에 중복 반영될 수 있습니다.",
    decision: "요청 ID·Receipt로 재전송을 구분하고, RawLot 잠금과 조건부 UPDATE로 재고를 변경했습니다.",
    evidence: "원장·재고·Receipt의 단일 트랜잭션 경로와 테스트 시나리오를 확인했습니다."
  },
  {
    slug: "mes-work-order-lock",
    title: "WorkOrder 부모 잠금으로 실적·완료 직렬화",
    problem: "실적 등록과 완료 요청이 같은 이전 생산합을 읽을 수 있습니다.",
    decision: "공유 부모인 WorkOrder를 먼저 잠그고 잠금 이후의 상태·누적 생산량으로 판단했습니다.",
    evidence: "생산 상한·첫 LOT 생성·완료 판단이 같은 잠금 경계를 사용하는 코드 경로를 확인했습니다."
  },
  {
    slug: "mes-lot-traceability",
    title: "완제품 LOT에서 제조 이력 역추적",
    problem: "현재 BOM으로 과거 생산을 설명하면 기준이 달라질 수 있습니다.",
    decision: "WorkOrder에 보존한 확정 BOM·Routing과 실제 원장을 연결했습니다.",
    evidence: "완제품 LOT에서 생산·자재·검사 이력을 함께 조회하는 소스와 화면을 확인했습니다."
  }
];

const highlights = [
  {
    slug: "mes-material-idempotency",
    category: "MES / INVENTORY",
    title: "재전송과 재고 경쟁을 구분",
    problem: "재전송·동시 요청으로 재고 중복 반영 가능.",
    decision: "Receipt로 요청을 식별하고 LOT 잠금·조건부 UPDATE로 재고를 변경했습니다.",
    evidence: "Service·Mapper의 원장·재고 동시 커밋 확인."
  },
  {
    slug: "cms-change-save",
    category: "CMS / SAVE",
    title: "변경 행과 마스킹 상태를 따로 판단",
    problem: "미변경 행과 마스킹된 값이 저장될 위험.",
    decision: "Grid의 변경 목록과 마스킹 해제 여부를 각각 검사해 저장 요청을 구성했습니다.",
    evidence: "화면 JS의 저장 차단·재조회 경로 확인."
  },
  {
    slug: "cart-purchase-options",
    category: "DATA / CART",
    title: "구매 조건 조합으로 장바구니 중복 판별",
    problem: "같은 상품도 선택 옵션에 따라 다른 구매 항목.",
    decision: "구매자 유형·사용자·데이터·옵션 조합으로 서버에서 중복을 판별했습니다.",
    evidence: "중복은 HTTP 409, 성공 후 Vue 상태 재조회."
  },
  {
    slug: "parcel-selection-state",
    category: "MAP / PROPERTY",
    title: "PNU로 지도 표시와 저장 기준 분리",
    problem: "지도 경계와 매물 저장용 목록의 역할이 다름.",
    decision: "Polygon은 화면 표시에, PNU 선택 목록은 면적·공시지가 합계와 저장에 사용했습니다.",
    evidence: "Demo에서 필지 선택 시 합계·저장 행 수 갱신."
  }
];

function Sheet({ number, label, title, summary, children }: {
  number: number;
  label: string;
  title?: string;
  summary?: string;
  children: ReactNode;
}) {
  return (
    <section className={styles.sheet} aria-labelledby={`pdf-title-${number}`} data-pdf-page={number}>
      <div className={styles.sheetContent} data-pdf-content>
        <header className={styles.runningHead}><span>권태형 / 개발 포트폴리오</span><span>{label}</span></header>
        {title && (
          <div className={styles.pageTitle}>
            <h2 id={`pdf-title-${number}`}>{title}</h2>
            {summary && <p className={styles.lead}>{summary}</p>}
          </div>
        )}
        {children}
      </div>
      <footer className={styles.folio}><span>KWON TAEHYUNG · 2026</span><span>{String(number).padStart(2, "0")} / 10</span></footer>
    </section>
  );
}

function Flow({ steps, columns }: { steps: string[]; columns?: number }) {
  const columnCount = columns ?? steps.length;
  return <ol className={styles.flow} style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}>
    {steps.map((step, index) => {
      const wraps = (index + 1) % columnCount === 0;
      return <li key={step}>{step}{index < steps.length - 1 &&
        <span className={wraps ? styles.flowWrap : undefined} aria-hidden="true">{wraps ? "↴" : "→"}</span>}
      </li>;
    })}
  </ol>;
}

function ProjectPipeline({ steps, label }: {
  steps: { title: string; detail?: string; kind?: "decision" | "external" }[];
  label: string;
}) {
  return (
    <ol className={styles.pipeline} aria-label={label}>
      {steps.map(({ title, detail, kind }) => (
        <li key={title} data-step-kind={kind}>
          <strong>{title}</strong>
          {detail && <span>{detail}</span>}
        </li>
      ))}
    </ol>
  );
}

function EvidenceImage({ image, alt, caption, crop }: {
  image: StaticImageData;
  alt: string;
  caption?: string;
  crop?: { x?: number; y: number; width?: number; height: number };
}) {
  const width = crop?.width ?? image.width;
  const height = crop?.height ?? image.height;
  const availableHeight = image.height - height;
  const objectPosition = availableHeight > 0 ? `center ${100 * (crop?.y ?? 0) / availableHeight}%` : "center";
  return (
    <figure className={styles.figure}>
      <div className={styles.imageFrame} style={{ aspectRatio: `${width} / ${height}` }}>
        <Image
          src={image}
          alt={alt}
          loading="eager"
          style={{
            width: `${100 * image.width / width}%`,
            left: `${-100 * (crop?.x ?? 0) / width}%`,
            objectPosition
          }}
        />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

function EvidenceColumns({ image, y, height, columns }: {
  image: StaticImageData;
  y: number;
  height: number;
  columns: { x: number; width: number; alt: string }[];
}) {
  return (
    <div className={styles.evidenceColumns}
      style={{ gridTemplateColumns: columns.map(({ width }) => `minmax(0, ${width}fr)`).join(" ") }}>
      {columns.map(({ x, width, alt }) => <EvidenceImage key={x} image={image} alt={alt} crop={{ x, y, width, height }} />)}
    </div>
  );
}

export default function PortfolioPdfPage() {
  return (
    <main className={styles.document} data-portfolio-pdf>
      <Sheet number={1} label="채용 제출용">
        <div className={styles.cover}>
          <div>
            <p className={styles.coverLabel}>JAVA / SPRING · WEB DEVELOPMENT</p>
            <h1 id="pdf-title-1">{profile.name}<br /><span>웹개발자 포트폴리오</span></h1>
            <p className={styles.coverLead}>제조 IT · MES · 기업 업무 시스템</p>
            <p className={styles.coverDescription}>작업지시부터 생산·품질·LOT 이력을 잇는 개인 Mini MES와 기업 업무 시스템 개발 경험을 담았습니다.</p>
          </div>
          <div>
            <Image className={styles.coverPortrait} src={profilePhoto} alt={`${profile.name} 프로필 사진`} loading="eager" />
            <p className={styles.coverContact}>
              <a href={portfolioUrl}>katonew.kro.kr</a>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </p>
          </div>
        </div>
        <h2 className={styles.sectionTitle}>목차</h2>
        <dl className={styles.contents}>
          {contents.map(([page, title]) => <div key={page}><dt>{page}</dt><dd>{title}</dd></div>)}
        </dl>
      </Sheet>

      <Sheet number={2} label="PROFILE / EXPERIENCE" title={`${profile.name} · ${profile.years} 웹개발자`}
        summary="Java/Spring 기반 업무 시스템의 신규 기능을 개발하고, 레거시 유지보수와 운영·배포를 담당했습니다.">
        <div className={styles.columns}>
          {profile.heroExperiences.map(({ title, description }) => <div key={title}><h3>{title}</h3><p>{description}</p></div>)}
        </div>
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>회사 경력</h3>
          <div>
            {careerTimeline.map((entry) => (
              <article className={styles.timelineRow} key={entry.id}>
                <div><p className={styles.mono}>{entry.period}</p><p>{entry.companyLabel}</p></div>
                <div>
                  <h4>{entry.title}</h4>
                  <p>{entry.projects[0].description}</p>
                  {entry.id === "inhouse-solution" && <p>제약 영업 대시보드 신규 개발, 기존 PHP 시스템 유지보수, 서버 이전도 수행했습니다.</p>}
                  {entry.id === "si-development" && <p>웹·앱 API 개발, 기업 관리자 화면 유지보수와 외부 API 연동을 수행했습니다.</p>}
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>기술과 사용 맥락</h3>
          <dl className={styles.techList}>
            {profile.techContexts.filter(({ category }) => category !== "AI").map(({ category, items }) =>
              <div key={category}><dt>{category}</dt><dd>{items.join(" · ")}</dd></div>
            )}
          </dl>
        </section>
        <aside className={styles.note}><strong>개인 프로젝트 · Mini MES</strong><p>제조 업무 규칙과 데이터 모델을 정리하고, 서버·화면 구현과 검증 및 Docker 배포까지 직접 수행했습니다.</p></aside>
      </Sheet>

      <Sheet number={3} label="MINI MES / END-TO-END OWNERSHIP">
        <div className={styles.pageTitle}>
          <p className={styles.eyebrow}>PERSONAL SIDE PROJECT</p>
          <h2 id="pdf-title-3">Mini MES</h2>
          <p className={styles.lead}>제조 업무 규칙 정의부터 PRD, ERD, DB 설계, Spring 구현, 검증과 배포까지 직접 수행한 개인 MES 프로젝트입니다.</p>
          <p className={styles.stack}>{miniMes.stack.join(" · ")}</p>
        </div>
        <EvidenceImage image={dashboard} alt="사이드바와 작업지시·생산 지표, 일별 생산 및 품질검사 차트가 보이는 Mini MES 대시보드"
          crop={{ y: 0, height: 1018 }} caption="공개 Demo 대시보드 · 작업지시 상태, 일별 생산실적, 누적 품질검사 결과" />
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>End-to-End Ownership</h3>
          <Flow steps={["PRD", "Business Rules", "ERD", "DB Design", "Backend", "UI", "Verification", "Deploy"]} />
          <dl className={styles.ownership}>
            <div><dt>Domain &amp; Planning</dt><dd>제조 업무 흐름 · PRD/Business Rules · 상태·수량·LOT 정책</dd></div>
            <div><dt>Data &amp; Architecture</dt><dd>논리 ERD·물리 DB · DDL과 제약 · 적용 BOM·Routing 보존</dd></div>
            <div><dt>Implementation</dt><dd>Spring Boot/MyBatis · Thymeleaf/JavaScript · 트랜잭션·잠금·멱등성</dd></div>
            <div><dt>Verification &amp; Delivery</dt><dd>업무 규칙 테스트·DB 검증 범위 문서화 · Docker 배포 · 공개 Demo</dd></div>
          </dl>
          <p className={styles.links}><a href={miniMes.demo!.href}>Mini MES Live Demo</a><a href={miniMes.github}>GitHub Source</a></p>
        </section>
      </Sheet>

      <Sheet number={4} label="MINI MES / PRODUCT EVIDENCE" title="Product Evidence"
        summary="작업지시부터 실제 자재 사용량과 완제품 LOT의 검사 이력까지 연결한 화면입니다.">
        <section className={styles.productEvidence}>
          <h3><span>01</span> Production Overview</h3>
          <EvidenceImage image={dashboard} alt="일별 양품·불량 누적 생산량 막대 차트와 품질검사 합격·불합격 비율 도넛 차트"
            crop={{ x: 286, y: 700, width: 1260, height: 321 }}
            caption="일별 양품·불량 생산량과 누적 품질검사 합격·불합격을 차트로 확인합니다." />
        </section>
        <section className={styles.productEvidence}>
          <h3><span>02</span> Material Traceability</h3>
          <EvidenceImage image={materials} alt="원자재 LOT과 소비·반환·순소비 수량, 같은 소비 행에 연결된 반환 이력"
            crop={{ x: 350, y: 80, width: 915, height: 122 }} />
          <div className={styles.materialComparison}>
            <EvidenceImage image={materials} alt="확정 BOM의 기준 소요량·예상 소요량·실제 순소비·예상 대비 차이"
              crop={{ x: 581, y: 1530, width: 695, height: 116 }} />
            <p className={styles.caption}>소비 행에서 반환 이력을 확인하고, 확정 BOM의 예상량을 실제 순소비와 비교합니다.</p>
          </div>
        </section>
        <section className={styles.productEvidence}>
          <h3><span>03</span> Finished Goods LOT Traceability</h3>
          <div className={styles.evidencePair}>
            <div className={styles.evidenceStack}>
              <p>완제품 LOT · 생산 근거</p>
              <EvidenceColumns image={trace} y={513} height={111} columns={[
                { x: 24, width: 164, alt: "완제품 LOT·제품·작업지시 항목" },
                { x: 341, width: 312, alt: "완제품 LOT 번호와 제품명, 완료 작업지시" }
              ]} />
              <EvidenceColumns image={trace} y={731} height={72} columns={[
                { x: 24, width: 164, alt: "확정 BOM 버전과 Routing 개정 항목" },
                { x: 341, width: 312, alt: "해당 작업지시에 적용한 BOM 버전과 Routing 개정값" }
              ]} />
              <EvidenceImage image={trace} alt="누적 생산수량과 양품·불량 수량"
                crop={{ x: 24, y: 1276, width: 468, height: 106 }} />
            </div>
            <div className={styles.evidenceStack}>
              <p>LOT 검사 수량</p>
              <EvidenceColumns image={inspection} y={181} height={67} columns={[
                { x: 26, width: 185, alt: "확정 검사 대상과 누적 검사·합격·불합격 항목" },
                { x: 442, width: 143, alt: "확정 검사 대상과 누적 검사·합격·불합격 수량" }
              ]} />
              <div className={styles.inspectionHistory}>
                <p>회차별 검사 이력</p>
                <EvidenceColumns image={inspection} y={544} height={166} columns={[
                  { x: 23, width: 136, alt: "검사 이력의 검사 회차 열" },
                  { x: 662, width: 185, alt: "같은 이력의 회차별 검사·합격·불합격 수량 열" }
                ]} />
              </div>
            </div>
          </div>
          <p className={styles.caption}>Finished Goods LOT → WorkOrder → Routing → Production Result → Inspection</p>
        </section>
      </Sheet>

      <Sheet number={5} label="MINI MES / ENGINEERING" title="Engineering Decisions"
        summary="재고 변경과 생산 완료의 동시성 경계를 정하고, 생산 당시의 기준으로 LOT 이력을 조회하도록 구현했습니다.">
        <div className={styles.decisions}>
          {engineering.map((entry, index) => {
            const source = getProblemSolving(entry.slug)!.sources![0];
            return <article key={entry.slug}>
              <h3><span>{String(index + 1).padStart(2, "0")}</span> {entry.title}</h3>
              <dl className={styles.decisionList}>
                <div><dt>Problem</dt><dd>{entry.problem}</dd></div>
                <div className={styles.keyDecision}><dt>Decision</dt><dd>{entry.decision}</dd></div>
                <div><dt>Evidence</dt><dd>{entry.evidence} <a href={source.href}>소스</a></dd></div>
              </dl>
            </article>;
          })}
        </div>
        <section className={styles.engineeringContext}>
          <h3 className={styles.sectionTitle}>PRD에서 구현·검증까지</h3>
          <p className={styles.documentTrail}>
            <a href={`${sourceRoot}docs/mini_mes_prd.md`}>mini_mes_prd.md</a> → <a href={`${sourceRoot}docs/business-rules.md`}>business-rules.md</a> → <a href={`${sourceRoot}docs/erd-design.md`}>erd-design.md</a> → <a href={`${sourceRoot}docs/database-design.md`}>database-design.md</a> → <a href={`${sourceRoot}db/schema.sql`}>schema.sql</a> → Spring 구현 → <a href={`${sourceRoot}docs/material-return-verification.md`}>검증 기록</a>
          </p>
          <h4 className={styles.aiWorkflowTitle}>AI-assisted Engineering</h4>
          <dl className={styles.aiWorkflow}>
            <div><dt>ChatGPT</dt><dd>업무 규칙·설계 검토</dd></div>
            <div><dt>Codex</dt><dd>문서·AGENTS.md 기준 구현</dd></div>
            <div><dt>Graphify</dt><dd>Controller → Service → Mapper 관계 탐색</dd></div>
            <div><dt>Superpowers</dt><dd>반환 설계·계획과 검증 범위 정리</dd></div>
          </dl>
          <p className={styles.caption}><strong>Portfolio Production</strong> · Figma MCP로 웹 초안과 PDF 증거 화면 배치 검토.</p>
        </section>
      </Sheet>

      <Sheet number={6} label="COMPANY PROJECT / CMS · ERP" title="CMS / ERP"
        summary={cms.oneLine}>
        <p className={styles.stack}>{cms.period} · {cms.stack.join(" · ")}</p>
        <p>정산 조회·편집 화면을 개발하고, 공통 AUIGrid와 기존 저장 API를 연결했습니다.</p>
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>비용 정산 상세 편집</h3>
          <ProjectPipeline label="비용 정산 조회부터 저장 후 재조회까지" steps={[
            { title: "정산 조회", detail: "Header · 상세 비용" },
            { title: "AUIGrid 편집", detail: "추가 · 수정 · 삭제" },
            { title: "변경 행 선별", detail: "변경 상세만 추출", kind: "decision" },
            { title: "마스킹 상태 검사", detail: "미해제 시 요청 중단", kind: "decision" },
            { title: "저장 판단·요청", detail: "검사 통과 시 전송", kind: "decision" },
            { title: "Controller / Service", detail: "기존 정산 저장 경로" },
            { title: "DB 저장", detail: "Oracle" },
            { title: "재조회", detail: "편집 행 위치 복원" }
          ]} />
        </section>
        <section className={styles.projectDetails} aria-label="정산 편집에서 담당한 처리">
          <div className={styles.columns}>
            <div><h4>01 변경 행 선별</h4><p>공통 AUIGrid의 추가·수정·삭제 목록에서 변경된 상세만 요청에 포함했습니다.</p></div>
            <div><h4>02 마스킹 검사</h4><p>변경 목록과 별개로 마스킹 해제 여부를 검사했습니다. 미해제 상태에선 요청을 보내기 전에 중단했습니다.</p></div>
            <div><h4>03 저장 후 재조회</h4><p>기존 Controller·Service 저장 경로를 사용하고, 성공하면 재조회 후 편집 행 위치를 복원했습니다.</p></div>
          </div>
        </section>
        <aside className={styles.note}>
          <h3>확인 근거</h3>
          <p>공통 Grid의 변경 목록 추출, 화면 JS의 마스킹 검사 분기, 저장 완료 후 재조회 호출을 정적으로 확인했습니다. 회사 원본 소스와 업무 화면은 비공개입니다.</p>
          <a href={`${portfolioUrl}/problem-solving/cms-change-save/`}>비용 정산 저장 사례</a>
        </aside>
      </Sheet>

      <Sheet number={7} label="COMPANY PROJECT / DATA PLATFORM" title="Data Platform"
        summary="제휴 사이트에서 전달한 주문 데이터를 수집하고, 분류 결과를 주문과 함께 저장하는 서버 흐름입니다.">
        <p className={styles.stack}>Java · Spring Boot · Spring Data JPA · MySQL</p>
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>외부 주문 수집과 분류 API 연동</h3>
          <ul className={styles.pipelineLegend}>
            <li>Spring 주문 처리·저장</li>
            <li data-step-kind="external">외부 시스템</li>
          </ul>
          <ProjectPipeline label="제휴사 주문 수신부터 분류 결과 저장까지" steps={[
            { title: "Partner Sender", detail: "제휴 주문 전송", kind: "external" },
            { title: "POST /api/order", detail: "Spring 주문 수신" },
            { title: "Partner Auth", detail: "Site Key + IP" },
            { title: "Normalize Order Data", detail: "주문 속성 표준화" },
            { title: "Classification API", detail: "/predict · 상품명 전달", kind: "external" },
            { title: "Classification Result", detail: "분류 코드·분류 단계" },
            { title: "OrderEntity", detail: "주문에 분류값 매핑" },
            { title: "MySQL", detail: "주문·분류 결과 저장" }
          ]} />
        </section>
        <section className={styles.projectDetails} aria-label="주문 처리 단계별 설명">
          <dl className={styles.dataDetails}>
            <div><dt>수집</dt><dd>제휴 사이트가 보낸 주문을 Spring Controller에서 수신합니다.</dd></div>
            <div><dt>인증</dt><dd>사이트 키와 발신 IP 조합으로 등록된 제휴사를 확인합니다.</dd></div>
            <div><dt>표준화·분류</dt><dd>지역·결제수단 등을 표준화하고, 상품명으로 분류 API를 호출합니다.</dd></div>
            <div><dt>저장·조회</dt><dd>주문과 분류값을 저장하고, 제휴 사이트와 사이트 식별자로 조회합니다.</dd></div>
          </dl>
        </section>
        <aside className={styles.note}>
          <h3>확인 근거</h3>
          <p>Spring Controller의 수신·분류 API 호출, 제휴사 인증·정규화 로직, JPA 저장 코드의 연결을 정적으로 대조했습니다.</p>
        </aside>
      </Sheet>

      <Sheet number={8} label="COMPANY PROJECT / PROPERTY" title="Property System"
        summary={property.oneLine}>
        <p className={styles.stack}>{property.period} · 카카오맵 · VWorld · JavaScript</p>
        <EvidenceImage image={parcelMap} alt="실제 공개 데모에서 카카오맵 위에 표시된 선택 필지 Polygon과 PNU·면적·공시지가 결과"
          caption="포트폴리오의 실제 재구성 Demo · 지도에 표시한 선택 필지 경계와 우측 선택 결과. 지도 © Kakao." />
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>PNU로 연결하는 필지 선택과 매물 입력</h3>
          <Flow columns={4} steps={["지도 클릭", "좌표", "주소·PNU", "Polygon", "선택 필지", "면적·공시지가", "매물 입력 데이터"]} />
          <ul className={styles.list}>{realEstateFeature.technicalDetails.map((item) => <li key={item}>{item}</li>)}</ul>
          <p className={styles.links}><a href={`${portfolioUrl}${property.demo!.href}`}>실제 지도·필지 Demo</a></p>
        </section>
      </Sheet>

      <Sheet number={9} label="PROBLEM SOLVING" title="문제 해결 사례"
        summary="업무 규칙을 적용할 기준을 정하고, 저장과 화면에서 그 기준이 이어지는 경로를 확인했습니다.">
        <div className={styles.highlights}>
          {highlights.map((entry) => (
            <article key={entry.slug}>
              <p className={styles.eyebrow}>{entry.category}</p>
              <h3>{entry.title}</h3>
              <dl className={styles.decisionList}>
                <div><dt>Problem</dt><dd>{entry.problem}</dd></div>
                <div className={styles.keyDecision}><dt>Decision</dt><dd>{entry.decision}</dd></div>
                <div><dt>Evidence</dt><dd>{entry.evidence}</dd></div>
              </dl>
              <a href={`${portfolioUrl}/problem-solving/${entry.slug}/`}>상세 사례</a>
            </article>
          ))}
        </div>
      </Sheet>

      <Sheet number={10} label="WORKFLOW / CONTACT" title="개발 방식과 연락처"
        summary="업무 규칙과 변경 범위는 직접 정하고, AI를 설계 검토·구현 보조·코드 탐색에 활용했습니다.">
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>AI-assisted Engineering</h3>
          <dl className={styles.workflow}>
            <div><dt>Define</dt><dd>제조 업무 흐름을 정의하고 상태·수량·LOT의 허용 조건과 예외를 결정합니다.</dd></div>
            <div><dt>Document</dt><dd>PRD·업무 규칙·ERD·DB 문서와 AGENTS.md에 구현 기준을 남깁니다. ChatGPT로 규칙과 설계를 검토합니다.</dd></div>
            <div><dt>Implement</dt><dd>Codex의 구현을 승인된 변경 범위와 도메인 문서에 맞춰 검토합니다. 반환 설계·계획은 Superpowers 지침으로 정리했습니다.</dd></div>
            <div><dt>Explore</dt><dd>Graphify 로컬 그래프로 Controller·Service·Mapper의 관계를 찾고 해당 소스를 확인합니다.</dd></div>
            <div><dt>Review</dt><dd>변경된 API, 서비스, SQL, 화면의 연결을 대조해 업무 규칙과 기존 호출 흐름이 맞는지 확인합니다.</dd></div>
            <div><dt>Verify</dt><dd>실행한 테스트, 정적 소스 확인, 실제 화면 증거를 구분해 남깁니다.</dd></div>
          </dl>
        </section>
        <section className={styles.contact}>
          <p className={styles.eyebrow}>CONTACT</p>
          <h3>{profile.name} · {profile.role}</h3>
          <dl className={styles.techList}>
            <div><dt>Portfolio</dt><dd><a href={portfolioUrl}>katonew.kro.kr</a></dd></div>
            <div><dt>GitHub</dt><dd><a href="https://github.com/katonew">github.com/katonew</a></dd></div>
            <div><dt>Email</dt><dd><a href={`mailto:${profile.email}`}>{profile.email}</a></dd></div>
          </dl>
        </section>
      </Sheet>
    </main>
  );
}
