import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import dashboard from "../../../public/mini-mes/01-dashboard.png";
import inspection from "../../../public/mini-mes/10-quality-inspection-core.png";
import trace from "../../../public/mini-mes/11-traceability-summary.png";
import materials from "../../../public/mini-mes/12-traceability-materials.png";
import parcelMap from "../../../public/portfolio-pdf/property-parcel-demo.png";
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
    problem: "응답 유실 후 재전송과 같은 LOT에 대한 동시 변경으로 재고가 중복 반영될 수 있었습니다.",
    decision: "요청 키와 입력 fingerprint로 재전송을 식별하고, 새 요청은 잠금 안에서 최신 잔량을 검증했습니다.",
    implementation: "Receipt 선점 → WorkOrder·원소비(반환 시)·RawLot 잠금 → 조건부 재고 변경 → 원장·Receipt 동시 커밋.",
    verification: "Service·Mapper 정적 대조. 반환 검증 기록에서 DB 미접속 14개 클래스 83건 통과. MySQL 경합·롤백 시나리오는 작성됐으며 실행 성공 근거 미확인."
  },
  {
    slug: "mes-work-order-lock",
    title: "WorkOrder 부모 잠금으로 실적·완료 직렬화",
    problem: "실적 등록과 완료가 같은 이전 합계를 읽으면 생산 상한·완료 판단과 최초 LOT 생성이 경합합니다.",
    decision: "두 요청이 공유하는 WorkOrder 행을 먼저 잠그고 잠금 이후의 상태와 생산합을 사용했습니다.",
    implementation: "FOR UPDATE 이후 등록 상한·완료 조건 확인. 첫 실적에 LOT 생성, 완료 시 양품 수량을 검사 대상으로 확정.",
    verification: "실적 등록과 완료의 잠금·집계 경로를 정적으로 대조. 최초 LOT 생성·완료 경합 테스트 시나리오 확인."
  },
  {
    slug: "mes-lot-traceability",
    title: "완제품 LOT에서 제조 이력 역추적",
    problem: "현재 BOM으로 과거 생산을 설명하면 기준이 달라지고, 여러 원장을 단순 JOIN하면 수량이 중복 집계될 수 있습니다.",
    decision: "WorkOrder에 보존한 BOM·Routing 버전을 조회하고 실제 원장을 따로 읽어 한 조회로 연결했습니다.",
    implementation: "readOnly / REPEATABLE_READ 범위에서 생산실적·검사와 소비·반환을 조회해 예상량과 순소비를 비교.",
    verification: "LotTraceService·Mapper·템플릿 정적 대조 및 실제 역추적 화면 확인."
  }
];

const highlights = [
  {
    slug: "mes-material-idempotency",
    title: "재전송과 재고 경쟁을 구분",
    problem: "요청이 다시 들어오거나 다른 요청이 같은 원자재 LOT을 변경할 수 있었습니다.",
    decision: "요청 식별은 Receipt·fingerprint에 맡기고, 재고 변경은 LOT 잠금과 조건부 UPDATE 안에서 처리했습니다.",
    evidence: "Service와 Mapper에서 동일 요청 결과 재사용, 원장과 재고의 동시 커밋·롤백 경로를 확인했습니다."
  },
  {
    slug: "cms-change-save",
    title: "변경 행과 마스킹 상태를 따로 판단",
    problem: "대량 편집에서 미변경 행과 마스킹된 표시값을 저장 대상으로 포함할 수 있었습니다.",
    decision: "공통 Grid의 변경 목록과 화면의 마스킹 해제 여부를 각각 확인해 저장 요청을 구성했습니다.",
    evidence: "화면 JS에서 저장 차단 분기와 저장 후 재조회 호출을 정적으로 확인했습니다."
  },
  {
    slug: "cart-purchase-options",
    title: "구매 조건 조합으로 장바구니 중복 판별",
    problem: "같은 상품이라도 데이터 유형과 행·열·값 옵션에 따라 다른 구매 항목이 됩니다.",
    decision: "구매자 유형·사용자·데이터·옵션 조합을 서버 중복 기준으로 사용했습니다.",
    evidence: "중복 요청은 HTTP 409를 반환하고, 신규 등록 성공 시 Vue가 서버의 장바구니 상태를 다시 조회합니다."
  },
  {
    slug: "parcel-selection-state",
    title: "지도 표시와 매물 저장 데이터의 기준 분리",
    problem: "지도 경계를 그리는 객체와 매물 등록용 필지 목록의 역할과 형태가 달랐습니다.",
    decision: "Polygon은 지도 표시에 사용하고, PNU로 관리하는 선택 목록을 합계와 저장 데이터의 기준으로 삼았습니다.",
    evidence: "재구성 Demo에서 선택 필지의 경계와 면적·공시지가·저장 데이터 행 수가 함께 갱신됩니다."
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

export default function PortfolioPdfPage() {
  return (
    <main className={styles.document} data-portfolio-pdf>
      <Sheet number={1} label="채용 제출용">
        <div className={styles.cover}>
          <p className={styles.coverLabel}>JAVA / SPRING · WEB DEVELOPMENT</p>
          <h1 id="pdf-title-1">{profile.name}<br /><span>웹개발자 포트폴리오</span></h1>
          <p className={styles.coverLead}>제조 IT · MES · 기업 업무 시스템</p>
          <p className={styles.coverDescription}>작업지시부터 생산·품질·LOT 이력을 잇는 개인 Mini MES와 기업 업무 시스템 개발 경험을 담았습니다.</p>
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
        <EvidenceImage image={dashboard} alt="사이드바, 작업지시 상태, 생산·품질 지표가 보이는 Mini MES 대시보드"
          crop={{ y: 0, height: 1025 }} caption="공개 Demo 대시보드 · 작업지시 상태와 누적 생산·품질검사 현황" />
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
          <EvidenceImage image={dashboard} alt="작업지시 상태별 건수와 누적 생산수량·양품·불량"
            crop={{ x: 278, y: 236, width: 1290, height: 376 }}
            caption="대시보드에서 작업지시 상태별 건수와 생산량을 조회하고 품질검사 현황으로 이어집니다." />
        </section>
        <section className={styles.productEvidence}>
          <h3><span>02</span> Material Traceability</h3>
          <EvidenceImage image={materials} alt="원자재 LOT별 소비·반환·순소비 합계"
            crop={{ x: 24, y: 531, width: 1245, height: 194 }} />
          <EvidenceImage image={materials} alt="확정 BOM의 예상 소요량과 실제 순소비 비교"
            crop={{ x: 24, y: 1407, width: 1245, height: 252 }}
            caption="원소비에 반환을 연결하고 LOT별 순소비를 집계합니다. 생산 당시 확정한 BOM 기준의 예상량을 실제 순소비와 비교합니다." />
        </section>
        <section className={styles.productEvidence}>
          <h3><span>03</span> Finished Goods LOT Traceability</h3>
          <div className={styles.evidencePair}>
            <EvidenceImage image={trace} alt="완제품 LOT, 작업지시, 적용 BOM과 Routing 정보"
              crop={{ x: 22, y: 464, width: 686, height: 343 }} />
            <EvidenceImage image={inspection} alt="완제품 LOT의 확정 검사 대상 수량과 합격·불합격 수량"
              crop={{ x: 22, y: 24, width: 765, height: 250 }} />
          </div>
          <p className={styles.caption}>완제품 LOT → 작업지시 → 확정 Routing → 생산실적 → 품질검사. 완료 시 확정한 대상과 누적 합격·불합격 수량을 조회합니다.</p>
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
                <div><dt>My Decision</dt><dd>{entry.decision}</dd></div>
                <div><dt>Implementation</dt><dd>{entry.implementation}</dd></div>
                <div><dt>Verification</dt><dd>{entry.verification} <a href={source.href}>소스</a></dd></div>
              </dl>
            </article>;
          })}
        </div>
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>PRD에서 구현·검증까지</h3>
          <p className={styles.documentTrail}>
            <a href={`${sourceRoot}docs/mini_mes_prd.md`}>mini_mes_prd.md</a> → <a href={`${sourceRoot}docs/business-rules.md`}>business-rules.md</a> → <a href={`${sourceRoot}docs/erd-design.md`}>erd-design.md</a> → <a href={`${sourceRoot}docs/database-design.md`}>database-design.md</a> → <a href={`${sourceRoot}db/schema.sql`}>schema.sql</a> → Spring 구현 → <a href={`${sourceRoot}docs/material-return-verification.md`}>검증 기록</a>
          </p>
          <p className={styles.caption}>ChatGPT로 업무 규칙·설계를 검토하고, Codex 구현은 문서와 AGENTS.md를 기준으로 검토했습니다. Graphify로 Controller → Service → Mapper 관계를 탐색했고, Superpowers는 반환 설계 문서·구현 계획·검증 범위 정리에 사용했습니다.</p>
          <p className={styles.caption}><strong>Portfolio Production</strong> · Figma MCP는 웹 초안과 PDF의 실제 화면 배치에 활용했습니다.</p>
        </section>
      </Sheet>

      <Sheet number={6} label="COMPANY PROJECT / CMS · ERP" title="CMS / ERP"
        summary={cms.oneLine}>
        <p className={styles.stack}>{cms.period} · {cms.stack.join(" · ")}</p>
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>담당 범위</h3>
          <p>{cms.summary}</p>
          <ul className={styles.list}>{cms.role.map((role) => <li key={role}>{role}</li>)}</ul>
        </section>
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>비용 정산 상세 편집</h3>
          <Flow steps={["정산 조회", "그리드 편집", "변경 행 선별", "마스킹 검사", "저장 판단", "재조회"]} />
          <dl className={styles.explainedRows}>
            <div><dt>변경 행 선별</dt><dd>공통 AUIGrid의 추가·수정·삭제 목록을 읽어 Header 아래 변경된 상세만 요청에 포함했습니다.</dd></div>
            <div><dt>마스킹 검사</dt><dd>그리드의 변경 상태와 별개로 마스킹 해제 여부를 확인하고, 해제되지 않았으면 요청 전 저장을 중단했습니다.</dd></div>
            <div><dt>저장 판단과 재조회</dt><dd>화면의 검사 이후 기존 Controller·Service의 정산 저장 경로에 연결했습니다. 성공 콜백에서 재조회하고 편집했던 행 위치를 복원했습니다.</dd></div>
          </dl>
        </section>
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>운영자가 사용한 기능</h3>
          <div className={styles.columns}>
            <div><h4>검색·조회</h4><p>공통 코드 기반 검색조건을 구성하고 조회 API와 연결했습니다.</p></div>
            <div><h4>다건 편집</h4><p>AUIGrid에서 비용 행의 추가·복사·삭제를 처리했습니다.</p></div>
            <div><h4>후속 작업</h4><p>선택 행 메일 전송과 Excel 다운로드 기능을 연결했습니다.</p></div>
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
          <Flow columns={4} steps={["Partner Sender", "POST /api/order", "Site Key + IP", "주문값 표준화", "/predict", "분류 결과", "OrderEntity", "MySQL"]} />
          <dl className={styles.explainedRows}>
            <div><dt>수집·인증</dt><dd>Spring에서 주문 요청을 수신합니다. 요청의 사이트 키와 발신 IP 조합으로 등록된 제휴사를 확인합니다.</dd></div>
            <div><dt>주문값 표준화</dt><dd>배송 지역, 결제수단, 연령대, 성별 입력을 표준 값으로 변환해 후속 처리에 사용합니다.</dd></div>
            <div><dt>분류 API 연동</dt><dd>상품명을 분류 API에 전달하고, 응답의 분류 코드와 대·중·소·세분류 값을 주문 모델에 매핑합니다.</dd></div>
            <div><dt>저장·조회</dt><dd>제휴사·주문 정보와 분류 결과를 OrderEntity로 구성해 MySQL에 저장합니다. 조회 코드에서는 제휴 사이트와 사이트 식별자로 주문을 찾습니다.</dd></div>
          </dl>
        </section>
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>분류 응답과 주문 저장</h3>
          <p>분류 응답을 받으면 주문과 함께 보존하고, 호출이나 파싱 실패 시 기존 수집 로직은 분류 결과 없이 주문 저장을 시도합니다. 배송 지역·결제수단 등 표준화된 주문 속성과 분류 결과는 이후 조회·분석에 사용할 수 있습니다.</p>
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
          {highlights.map((entry) => {
            const item = getProblemSolving(entry.slug)!;
            return <article key={entry.slug}>
              <p className={styles.eyebrow}>{item.keyword}</p>
              <h3>{entry.title}</h3>
              <dl className={styles.decisionList}>
                <div><dt>Problem</dt><dd>{entry.problem}</dd></div>
                <div><dt>Decision</dt><dd>{entry.decision}</dd></div>
                <div><dt>Evidence</dt><dd>{entry.evidence}</dd></div>
              </dl>
              <a href={`${portfolioUrl}/problem-solving/${entry.slug}/`}>상세 사례</a>
            </article>;
          })}
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
