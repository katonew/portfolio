import Link from "next/link";
import type { Project } from "@/data/profile";
import { getProjectProblemSolving } from "@/lib/problem-solving";

export function PdsProjectDetail({ project }: { project: Project }) {
  const cases = getProjectProblemSolving(project.slug);
  return (
    <main className="detail-page cms-detail-page">
      <div className="container">
        <Link className="back-link" href="/projects/">프로젝트 목록으로 돌아가기</Link>
        <header className="cms-project-hero">
          <p className="eyebrow">한국오츠카제약 · PDS</p>
          <h1>{project.title}</h1>
          <p className="cms-hero-description">{project.oneLine}</p>
        </header>

        <section className="case-project-context" aria-labelledby="pds-overview">
          <h2 id="pds-overview" className="case-study-label">Project Overview</h2>
          <p>{project.summary}</p>
          <p className="case-disclosure"><span>공개 범위</span>{project.securityNote}</p>
        </section>

        <section className="cms-case" aria-labelledby="pds-dashboard">
          <p className="case-study-label">Representative Feature</p>
          <h2 id="pds-dashboard">영업 대시보드 신규 개발 · 집계부터 차트 갱신까지</h2>
          <ol className="cms-flow">{project.flow.map((item) => <li key={item}>{item}</li>)}</ol>
          <div className="cms-case-implementation">
            <h3>SQL 집계와 ASP Classic JSON 응답</h3>
            {project.decisionPoints.map((item) => <p key={item}>{item}</p>)}
          </div>
          <div className="cms-case-implementation">
            <h3>비동기 조회와 화면 연동</h3>
            <ul className="cms-technical-details">{project.implementations.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </section>

        <section className="cms-case" aria-labelledby="pds-maintenance">
          <h2 id="pds-maintenance">기술적 문제 해결과 추가 유지보수</h2>
          {cases.map((item) => <div className="cms-case-implementation" id={item.slug} key={item.slug} style={{ scrollMarginTop: "calc(var(--header-height) + 24px)" }}>
            <h3>{item.title}</h3>
            <p>{item.problem}</p>
            <ul className="cms-technical-details">{item.implementation.map((step) => <li key={step}>{step}</li>)}</ul>
            <p>{item.result}</p>
          </div>)}
          {project.features?.map((feature) => <div className="cms-case-implementation" key={feature.title}>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            {feature.flow && <ul className="cms-technical-details">{feature.flow.map((item) => <li key={item}>{item}</li>)}</ul>}
          </div>)}
        </section>

        <section className="cms-case" aria-labelledby="pds-result">
          <h2 id="pds-result">개발 범위와 확인 근거</h2>
          {project.result.map((item) => <p key={item}>{item}</p>)}
          {project.verification.map((item) => <p key={item}>{item}</p>)}
        </section>

        <section className="cms-tech-stack" aria-labelledby="pds-tech">
          <h2 id="pds-tech">Tech / Environment</h2>
          <p>{project.stack.join(" · ")}</p>
          <ul className="cms-technical-details">{project.stackContext.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
      </div>
    </main>
  );
}
