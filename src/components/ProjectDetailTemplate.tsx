import Link from "next/link";
import LandDemoClient from "@/app/features/remax-land-demo/LandDemoClient";
import type { Project } from "@/data/profile";
import { cmsProjectDetail, dataMarketProjectDetail, projectDetailContents, realEstateProjectDetail } from "@/data/profile";

type ProjectDetailTemplateProps = {
  project: Project;
};

export function ProjectDetailTemplate({ project }: ProjectDetailTemplateProps) {
  if (project.slug === "enterprise-cms-erp") {
    return <CmsProjectDetail project={project} />;
  }
  if (project.slug === "data-market-platform") {
    return <DataMarketProjectDetail project={project} />;
  }
  if (project.slug === "real-estate-admin-map") {
    return <RealEstateProjectDetail project={project} />;
  }
  const detailContent = projectDetailContents[project.slug];
  return (
    <main className="detail-page">
      <div className="container">
        <Link className="back-link" href="/">메인으로 돌아가기</Link>

        <section className="detail-hero">
          <p className="eyebrow">{project.period}</p>
          <h1>{project.title}</h1>
          <p className="detail-subtitle">{project.oneLine}</p>
          {project.demo && (
            <div className="featured-project-link">
              <Link className="text-link" href={project.demo.href}>{project.demo.label}</Link>
              <p>기존 지도·필지 선택 흐름을 재구성한 데모입니다. 선택 목록과 매물 등록용 데이터를 확인할 수 있습니다.</p>
            </div>
          )}
        </section>

        <div className="detail-layout">
          <article className="detail-content">
            {detailContent ? (
              <>
                <DetailSection title="Project Overview">
                  <p>{project.summary}</p>
                  <DetailTable rows={[
                    { label: "기간", value: project.period },
                    { label: "공개 범위", value: project.securityNote }
                  ]} />
                </DetailSection>
                <DetailSection title="Business Context">
                  <p>{detailContent.businessContext}</p>
                </DetailSection>
                <DetailSection title="My Role">
                  <BulletList items={project.role} />
                </DetailSection>
                <DetailSection title="Technical Challenge">
                  {detailContent.cases.map((item) => <InfoBlock key={item.title} label={item.title} value={item.problem} />)}
                </DetailSection>
                <DetailSection title="Cause">
                  {detailContent.cases.map((item) => <InfoBlock key={item.title} label={item.title} value={item.cause} />)}
                </DetailSection>
                <DetailSection title="Decision / Approach">
                  {detailContent.cases.map((item) => (
                    <div className="case-study-block" key={item.title}>
                      <h3>{item.title}</h3>
                      <BulletList items={item.approach} />
                    </div>
                  ))}
                </DetailSection>
                <DetailSection title="Implementation Flow">
                  {detailContent.cases.map((item) => item.flow && (
                    <div className="case-study-block" key={item.title}>
                      <h3>{item.title}</h3>
                      {item.before && <InfoBlock label="Before" value={item.before} />}
                      <h4>After · 처리 흐름</h4>
                      <ol className="flow-list">
                        {item.flow.map((step) => <li key={step}>{step}</li>)}
                      </ol>
                    </div>
                  ))}
                </DetailSection>
                <DetailSection title="Verification">
                  <BulletList items={detailContent.verification} />
                </DetailSection>
                <DetailSection title="Result">
                  <BulletList items={detailContent.result} />
                </DetailSection>
                <DetailSection title="Tech Stack">
                  <p>{project.stack.join(" / ")}</p>
                </DetailSection>
              </>
            ) : (
              <>
                <DetailSection title="프로젝트 개요">
                  <p>{project.summary}</p>
                  <DetailTable rows={[
                    { label: "기간", value: project.period },
                    { label: "도메인", value: project.domain },
                    { label: "담당 역할", value: project.role.join(" / ") },
                    { label: "주요 기술", value: project.stack.join(" / ") },
                    { label: "공개 범위", value: project.securityNote }
                  ]} />
                </DetailSection>
                {project.detail?.decisionFirst && project.caseStudy && <EngineeringDecision caseStudy={project.caseStudy} />}
                {project.demo && project.detail && <ProjectFlow project={project} title={project.detail.flowTitle} />}
                <DetailSection title={project.detail?.builtTitle ?? "담당 기능"}>
                  <BulletList items={project.implementations} />
                </DetailSection>
                {!project.demo && project.detail && <ProjectFlow project={project} title={project.detail.flowTitle} />}
                {!project.detail?.decisionFirst && project.caseStudy && <EngineeringDecision caseStudy={project.caseStudy} />}
                <DetailSection title="검증과 결과">
                  <BulletList items={project.caseStudy?.verification ?? project.verification} />
                  <div className="stack-lines"><BulletList items={project.result} /></div>
                </DetailSection>
              </>
            )}
          </article>

        </div>
      </div>
    </main>
  );
}

function CmsProjectDetail({ project }: ProjectDetailTemplateProps) {
  const period = project.period.replace(" - ", " — ");

  return (
    <main className="detail-page cms-detail-page">
      <div className="container">
        <Link className="back-link" href="/">메인으로 돌아가기</Link>
        <header className="cms-project-hero">
          <p className="eyebrow">{period}</p>
          <h1>{cmsProjectDetail.title}</h1>
          <p className="cms-hero-description">{cmsProjectDetail.description}</p>
          <p className="cms-featured-statement">
            {cmsProjectDetail.heroStatement.map((line) => <span key={line}>{line}</span>)}
          </p>
          <p className="cms-stack">{cmsProjectDetail.heroStack.join(" · ")}</p>
        </header>

        <ProjectContext id="cms" context={cmsProjectDetail.context} myPart={cmsProjectDetail.myPart} securityNote={project.securityNote} />

        <section className="case-overview" aria-labelledby="cms-overview-title">
          <h2 id="cms-overview-title" className="case-study-label">CASE OVERVIEW</h2>
          {cmsProjectDetail.cases.map((item) => (
            <CaseOverview key={item.id} id={item.id} title={item.title} overview={item.overview}>
              {item.kind === "save" ? (
                <CaseFlow steps={item.overview.after} />
              ) : (
                <ul className="case-overview-branches">
                  {item.overview.after.map((step) => <li key={step}>{step}</li>)}
                </ul>
              )}
            </CaseOverview>
          ))}
        </section>

        {cmsProjectDetail.cases.map((item) => (
          <CmsCaseStudy key={item.id} item={item} />
        ))}

        <ResultRecap id="cms" items={cmsProjectDetail.recap} />

        <section className="cms-tech-stack" aria-labelledby="cms-tech-title">
          <h2 id="cms-tech-title">사용 기술</h2>
          <p>{project.stack.join(" · ")}</p>
        </section>
      </div>
    </main>
  );
}

function CmsCaseStudy({ item }: { item: (typeof cmsProjectDetail.cases)[number] }) {
  return (
    <article className={`cms-case cms-case-${item.kind}`} aria-labelledby={`${item.id}-title`}>
      <header className="cms-case-header">
        <p className="case-keyword">{item.kind === "save" ? "CMS / SAVE" : "SETTLEMENT"}</p>
        <h2 id={`${item.id}-title`}>{item.title}</h2>
      </header>

      <CaseReasoning id={item.id} problem={item.problem} why={item.why} statement={item.statement} decision={item.decision} />

      {item.kind === "save" ? (
        <>
          <section className="cms-case-implementation case-evidence" aria-labelledby={`${item.id}-flow`}>
            <h3 id={`${item.id}-flow`} className="case-study-label">IMPLEMENTATION</h3>
            <CaseFlow steps={item.flow} />
            <ul className="cms-technical-details">
              {item.technicalDetails.map((detail) => <li key={detail}>{detail}</li>)}
            </ul>
            <p className="cms-request-path">{item.requestPath}</p>
          </section>
          <section className="cms-case-verification" aria-labelledby={`${item.id}-verification`}>
            <h3 id={`${item.id}-verification`} className="case-study-label">VERIFICATION</h3>
            <ul className="cms-verification-list">
              {item.verification.map((verification) => <li key={verification}>{verification}</li>)}
            </ul>
          </section>
        </>
      ) : (
        <section className="cms-case-implementation case-evidence" aria-labelledby={`${item.id}-rules`}>
          <h3 id={`${item.id}-rules`} className="case-study-label">IMPLEMENTATION</h3>
          <dl className="cms-comparison">
            {item.comparison.map((row) => (
              <div key={row.source}><dt>{row.source}</dt><dd>{row.target}</dd></div>
            ))}
          </dl>
        </section>
      )}

      <footer className="cms-case-result">
        <h3 className="case-study-label">RESULT</h3>
        <p className="cms-result-statement">{item.result}</p>
        <p>{item.resultNote}</p>
      </footer>
    </article>
  );
}

function DataMarketProjectDetail({ project }: ProjectDetailTemplateProps) {
  const period = project.period.replace(" - ", " — ");
  const caseStudy = dataMarketProjectDetail.caseStudy;

  // CMS 상세의 레이아웃 클래스를 재사용하고, 구매 조건 비교만 전용 스타일로 구성합니다.
  return (
    <main className="detail-page cms-detail-page data-market-detail-page">
      <div className="container">
        <Link className="back-link" href="/">메인으로 돌아가기</Link>
        <header className="cms-project-hero">
          <p className="eyebrow">{period}</p>
          <h1>{project.title}</h1>
          <p className="cms-hero-description">{dataMarketProjectDetail.description}</p>
          <p className="cms-featured-statement">
            {dataMarketProjectDetail.heroStatement.map((line) => <span key={line}>{line}</span>)}
          </p>
          <p className="cms-stack">{dataMarketProjectDetail.heroStack.join(" · ")}</p>
        </header>

        <ProjectContext id="market" context={dataMarketProjectDetail.context} myPart={dataMarketProjectDetail.myPart} securityNote={project.securityNote} />

        <section className="case-overview" aria-labelledby="market-overview-title">
          <h2 id="market-overview-title" className="case-study-label">CASE OVERVIEW</h2>
          <CaseOverview id="market" title={caseStudy.title} overview={caseStudy.overview}>
            <div className="market-criteria-comparison">
              <section aria-labelledby="market-limited-title">
                <h4 id="market-limited-title">{caseStudy.comparison.limitedTitle}</h4>
                <ol className="market-criteria-flow">
                  {caseStudy.comparison.limitedFlow.map((step) => <li key={step}>{step}</li>)}
                </ol>
              </section>
              <section aria-labelledby="market-applied-title">
                <h4 id="market-applied-title">{caseStudy.comparison.appliedTitle}</h4>
                <ul className="market-criteria-conditions">
                  {caseStudy.comparison.conditions.map((condition) => <li key={condition}>{condition}</li>)}
                </ul>
                <p className="market-criteria-conclusion">{caseStudy.comparison.conclusion}</p>
              </section>
            </div>
          </CaseOverview>
        </section>

        <article className="cms-case" aria-labelledby="market-case-title">
          <header className="cms-case-header">
            <p className="case-keyword">DATA PLATFORM</p>
            <h2 id="market-case-title">{caseStudy.title}</h2>
          </header>
          <CaseReasoning id="market" problem={caseStudy.problem} why={caseStudy.why} statement={caseStudy.statement} decision={caseStudy.decision} />

          <section className="cms-case-implementation case-evidence" aria-labelledby="market-flow-title">
            <h3 id="market-flow-title" className="case-study-label">IMPLEMENTATION</h3>
            <CaseFlow steps={caseStudy.flow.steps} />
            <div className="market-response-branches" aria-label="중복 판별 결과">
              {caseStudy.flow.branches.map((branch) => (
                <section key={branch.id} aria-labelledby={`market-response-${branch.id}`}>
                  <h4 id={`market-response-${branch.id}`}>{branch.label}</h4>
                  <CaseFlow steps={branch.steps} className="market-response-path" />
                </section>
              ))}
            </div>
            <ul className="cms-technical-details">
              {caseStudy.technicalDetails.map((detail) => <li key={detail}>{detail}</li>)}
            </ul>
          </section>

          <section className="cms-case-verification" aria-labelledby="market-verification-title">
            <h3 id="market-verification-title" className="case-study-label">VERIFICATION</h3>
            <ul className="cms-verification-list">
              {caseStudy.verification.map((verification) => <li key={verification}>{verification}</li>)}
            </ul>
          </section>
          <footer className="cms-case-result">
            <h3 className="case-study-label">RESULT</h3>
            <p className="cms-result-statement">{caseStudy.result}</p>
          </footer>
        </article>

        <ResultRecap id="market" items={dataMarketProjectDetail.recap} />

        <section className="cms-tech-stack" aria-labelledby="market-tech-title">
          <h2 id="market-tech-title">사용 기술</h2>
          <p>{project.stack.join(" · ")}</p>
        </section>
      </div>
    </main>
  );
}

function RealEstateProjectDetail({ project }: ProjectDetailTemplateProps) {
  const period = project.period.replace(" - ", " — ");
  const caseStudy = realEstateProjectDetail.caseStudy;

  return (
    <main className="detail-page cms-detail-page real-estate-detail-page">
      <div className="container">
        <Link className="back-link" href="/">메인으로 돌아가기</Link>
        <header className="cms-project-hero">
          <p className="eyebrow">{period}</p>
          <h1>{realEstateProjectDetail.title}</h1>
          <p className="cms-hero-description">{realEstateProjectDetail.description}</p>
          <p className="cms-featured-statement">
            {realEstateProjectDetail.heroStatement.map((line) => <span key={line}>{line}</span>)}
          </p>
          <p className="cms-stack">{realEstateProjectDetail.heroStack.join(" · ")}</p>
        </header>

        <ProjectContext id="estate" context={realEstateProjectDetail.context} myPart={realEstateProjectDetail.myPart} securityNote={project.securityNote} />

        <section className="case-overview" aria-labelledby="estate-overview-title">
          <h2 id="estate-overview-title" className="case-study-label">CASE OVERVIEW</h2>
          <CaseOverview id="estate" title={caseStudy.title} overview={caseStudy.overview}>
            {caseStudy.flow.map((group) => (
              <div className="estate-flow-group" key={group.title}>
                <h4>{group.title}</h4>
                <CaseFlow steps={group.steps} />
              </div>
            ))}
          </CaseOverview>
        </section>

        <article className="cms-case" aria-labelledby="estate-case-title">
          <header className="cms-case-header">
            <p className="case-keyword">MAP / PROPERTY</p>
            <h2 id="estate-case-title">{caseStudy.title}</h2>
          </header>
          <CaseReasoning id="estate" problem={caseStudy.problem} why={caseStudy.why} statement={caseStudy.statement} decision={caseStudy.decision} />

          <section className="cms-case-implementation case-evidence" aria-labelledby="estate-mapping-title">
            <h3 className="case-study-label">IMPLEMENTATION</h3>
            <h3 id="estate-mapping-title">외부 데이터와 매물 등록 데이터 연결</h3>
            <div className="estate-mapping-labels" aria-hidden="true">
              <span>외부에서 받은 정보</span><span>내부에서 사용하는 정보</span>
            </div>
            <dl className="cms-comparison estate-mapping">
              {caseStudy.mapping.map((row) => (
                <div key={row.external}><dt>{row.external}</dt><dd>{row.internal}</dd></div>
              ))}
            </dl>
            <p className="estate-mapping-note">{caseStudy.mappingNote}</p>
          </section>

          <section className="cms-case-implementation" aria-labelledby="estate-implementation-title">
            <h3 id="estate-implementation-title">필지 경계 표시와 선택 데이터 처리</h3>
            <ul className="cms-technical-details">
              {caseStudy.technicalDetails.map((detail) => <li key={detail}>{detail}</li>)}
            </ul>
          </section>

          <section className="cms-case-implementation" aria-labelledby="estate-demo-title">
            <p className="case-study-label">LIVE DEMO</p>
            <h3 id="estate-demo-title">지도에서 필지를 선택해 확인해볼 수 있습니다.</h3>
            <p>실제 업무 흐름을 공개 가능한 범위에서 재구성한 지도·필지 선택 데모입니다.</p>
            <div className="featured-project-link">
              <Link className="text-link" href="/features/remax-land-demo/">직접 확인하기 →</Link>
            </div>
            <LandDemoClient embedded />
          </section>

          <section className="cms-case-verification" aria-labelledby="estate-verification-title">
            <h3 id="estate-verification-title" className="case-study-label">VERIFICATION</h3>
            <ul className="cms-verification-list">
              {caseStudy.verification.map((verification) => <li key={verification}>{verification}</li>)}
            </ul>
          </section>
          <footer className="cms-case-result">
            <h3 className="case-study-label">RESULT</h3>
            <p className="cms-result-statement">{caseStudy.result}</p>
          </footer>
        </article>

        <ResultRecap id="estate" items={realEstateProjectDetail.recap} flow />

        <section className="cms-tech-stack" aria-labelledby="estate-tech-title">
          <h2 id="estate-tech-title">사용 기술</h2>
          <p>{project.stack.join(" · ")}</p>
        </section>
      </div>
    </main>
  );
}

function ProjectContext({ id, context, myPart, securityNote }: { id: string; context: string; myPart: string[]; securityNote: string }) {
  return (
    <section className="case-project-context" aria-labelledby={`${id}-context-title`}>
      <div className="cms-case-context">
        <section>
          <h2 id={`${id}-context-title`} className="case-study-label">PROJECT CONTEXT</h2>
          <p>{context}</p>
        </section>
        <section aria-labelledby={`${id}-part-title`}>
          <h2 id={`${id}-part-title`} className="case-study-label">MY PART</h2>
          <ul className="cms-technical-details">
            {myPart.map((part) => <li key={part}>{part}</li>)}
          </ul>
        </section>
      </div>
      <p className="case-disclosure"><span>공개 범위</span>{securityNote}</p>
    </section>
  );
}

function CaseOverview({ id, title, overview, children }: { id: string; title: string; overview: { asIs: string; decision: string }; children: React.ReactNode }) {
  return (
    <article className="case-overview-item" aria-labelledby={`${id}-overview-case-title`}>
      <h3 id={`${id}-overview-case-title`}>{title}</h3>
      <dl className="case-overview-summary">
        <div><dt className="case-study-label">AS-IS</dt><dd>{overview.asIs}</dd></div>
        <div><dt className="case-study-label">DECISION</dt><dd>{overview.decision}</dd></div>
      </dl>
      <div className="case-overview-after case-evidence">
        <h4 className="case-study-label">AFTER</h4>
        {children}
      </div>
    </article>
  );
}

function CaseReasoning({ id, problem, why, statement, decision }: { id: string; problem: string; why: string; statement: string[]; decision: string }) {
  return (
    <>
      <div className="cms-case-context">
        <section aria-labelledby={`${id}-problem-title`}>
          <h3 id={`${id}-problem-title`} className="case-study-label">PROBLEM</h3>
          <p>{problem}</p>
        </section>
        <section aria-labelledby={`${id}-why-title`}>
          <h3 id={`${id}-why-title`} className="case-study-label">WHY</h3>
          <p>{why}</p>
        </section>
      </div>
      <section className="case-decision" aria-labelledby={`${id}-decision-title`}>
        <h3 id={`${id}-decision-title`} className="case-study-label">DECISION</h3>
        <p className="cms-case-statement">
          {statement.map((line) => <span key={line}>{line}</span>)}
        </p>
        <p className="case-decision-context">{decision}</p>
      </section>
    </>
  );
}

function CaseFlow({ steps, className = "" }: { steps: string[]; className?: string }) {
  return <ol className={`cms-flow${className ? ` ${className}` : ""}`}>{steps.map((step) => <li key={step}>{step}</li>)}</ol>;
}

function ResultRecap({ id, items, flow = false }: { id: string; items: string[]; flow?: boolean }) {
  return (
    <section className="case-result-recap" aria-labelledby={`${id}-recap-title`}>
      <h2 id={`${id}-recap-title`} className="case-study-label">{flow ? "WHAT CONNECTED" : "WHAT CHANGED"}</h2>
      {flow ? (
        <div className="case-evidence"><CaseFlow steps={items} /></div>
      ) : (
        <ul className="case-recap-list">
          {items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      )}
    </section>
  );
}

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="detail-section"><h2>{title}</h2>{children}</section>;
}

function BulletList({ items }: { items: string[] }) {
  return <ul className="bullet-list document-list">{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

function DetailTable({ rows }: { rows: { label: string; value: string }[] }) {
  return <dl className="detail-table">{rows.map((row) => <div key={row.label}><dt>{row.label}</dt><dd>{row.value}</dd></div>)}</dl>;
}

function EngineeringDecision({ caseStudy }: { caseStudy: NonNullable<Project["caseStudy"]> }) {
  return (
    <DetailSection title={caseStudy.title}>
      <div className="case-study-block">
        <InfoBlock label="판단이 필요했던 상황" value={caseStudy.problem} />
        <InfoBlock label="원인과 제약" value={caseStudy.cause} />
        <BulletList items={caseStudy.approach} />
      </div>
    </DetailSection>
  );
}

function ProjectFlow({ project, title }: { project: Project; title: string }) {
  return (
    <DetailSection title={title}>
      <ol className="flow-list">
        {(project.caseStudy?.flow ?? project.flow).map((item) => <li key={item}>{item}</li>)}
      </ol>
    </DetailSection>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return <div className="info-block"><h4>{label}</h4><p>{value}</p></div>;
}
