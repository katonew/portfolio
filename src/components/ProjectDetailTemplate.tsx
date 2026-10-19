import Link from "next/link";
import LandDemoClient from "@/app/features/remax-land-demo/LandDemoClient";
import type { Project } from "@/data/profile";
import { realEstateFeature } from "@/data/profile";
import { getProjectProblemSolving } from "@/lib/problem-solving";

export function ProjectDetailTemplate({ project }: { project: Project }) {
  const cases = getProjectProblemSolving(project.slug);
  const isProperty = project.slug === "real-estate-admin-map";

  return (
    <main className={`detail-page cms-detail-page${isProperty ? " real-estate-detail-page" : ""}`}>
      <div className="container">
        <Link className="back-link" href="/projects/">프로젝트 목록으로 돌아가기</Link>
        <header className="cms-project-hero">
          {project.period && <p className="eyebrow">{project.period.replace(" - ", " — ")}</p>}
          <h1>{project.title}</h1>
          <p className="cms-hero-description">{project.oneLine}</p>
        </header>

        <section className="case-project-context" aria-labelledby="project-overview">
          <h2 id="project-overview" className="case-study-label">Overview</h2>
          <p>{project.summary}</p>
          <p className="case-disclosure"><span>공개 범위</span>{project.securityNote}</p>
        </section>

        <section className="cms-case" aria-labelledby="project-role">
          <h2 id="project-role">My Part</h2>
          <ul className="cms-technical-details">{project.role.map((role) => <li key={role}>{role}</li>)}</ul>
        </section>

        <section className="cms-case" aria-labelledby="project-work">
          <h2 id="project-work">What I Worked On</h2>
          <ul className="cms-technical-details">{project.implementations.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>

        {project.features && <section className="cms-case" aria-labelledby="project-features">
          <h2 id="project-features">Representative Features</h2>
          {project.features.map((feature) => <div className="cms-case-implementation" key={feature.title}>
            <h3>{feature.title}</h3><p>{feature.description}</p>
            {feature.flow && <ol className="cms-flow">{feature.flow.map((step) => <li key={step}>{step}</li>)}</ol>}
          </div>)}
        </section>}

        {isProperty && <section className="cms-case" aria-labelledby="property-feature">
          <p className="case-study-label">Representative Feature</p>
          <h2 id="property-feature">{realEstateFeature.title}</h2>
          {realEstateFeature.flow.map((group) => <div className="cms-case-implementation" key={group.title}>
            <h3>{group.title}</h3><ol className="cms-flow">{group.steps.map((step) => <li key={step}>{step}</li>)}</ol>
          </div>)}
          <div className="cms-case-implementation"><h3>외부 공간정보를 매물 입력 데이터로 연결</h3>
            <dl className="cms-comparison estate-mapping">{realEstateFeature.mapping.map((row) => <div key={row.external}><dt>{row.external}</dt><dd>{row.internal}</dd></div>)}</dl>
            <p className="estate-mapping-note">{realEstateFeature.mappingNote}</p>
          </div>
        </section>}

        {project.demo && <section className="cms-case" aria-labelledby="project-demo">
          <p className="case-study-label">Live Demo</p><h2 id="project-demo">직접 확인할 수 있는 기능</h2>
          <div className="featured-project-link"><Link className="text-link" href={project.demo.href}>{project.demo.label} →</Link></div>
          {isProperty && <><p>지도에서 필지를 선택하고 경계·선택 목록·면적과 공시지가 합계·매물 입력 데이터를 확인합니다.</p><LandDemoClient embedded /></>}
        </section>}

        {cases.length > 0 && <section className="cms-case" aria-labelledby="project-problems">
          <p className="case-study-label">Problem Solving</p><h2 id="project-problems">이 프로젝트에서 살펴볼 판단</h2>
          {cases.map((item) => <div className="cms-case-implementation" key={item.slug}>
            <h3><Link className="text-link" href={`/problem-solving/${item.slug}/`}>{item.title} →</Link></h3><p>{item.summary}</p>
          </div>)}
        </section>}

        <section className="cms-tech-stack" aria-labelledby="project-tech"><h2 id="project-tech">Tech / Environment</h2>
          <p>{project.stack.join(" · ")}</p><ul className="cms-technical-details">{project.stackContext.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
      </div>
    </main>
  );
}
