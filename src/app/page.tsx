import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/Section";
import { ContactDetails } from "@/components/ContactDetails";
import {
  aiDelegatedTasks,
  careerTimeline,
  developerDecisions,
  experienceSummary,
  miniMesAiCase,
  profile,
  projects,
  sanitizedNotice,
  selectedProjectSlugs,
  selectedProjectSummaries
} from "@/data/profile";
import { getProjectProblemSolving, getSelectedProblemSolving } from "@/lib/problem-solving";

// Home은 경력 흐름만 요약하고, 프로젝트별 담당 범위와 기술은 Resume에 유지합니다.
const careerSummaryById: Record<string, string> = {
  "content-cms": "계약·매출·비용·정산 관리자 시스템 개발",
  "inhouse-solution": "데이터 플랫폼 · 레거시 유지보수 · 서버 이전",
  "si-development": "부동산 · ERP · 외부 API 연동"
};

function ProjectEvidence({ evidence }: { evidence: (typeof selectedProjectSummaries)[keyof typeof selectedProjectSummaries]["evidence"] }) {
  return (
    <ol className="case-flow project-evidence" aria-label="프로젝트 핵심 처리 흐름">
      {evidence.steps.map((step) => <li key={step}>{step}</li>)}
    </ol>
  );
}

export default function Home() {
  const featuredProjects = selectedProjectSlugs.map((slug) => {
    const project = projects.find((item) => item.slug === slug);
    if (!project) {
      throw new Error(`Selected project not found: ${slug}`);
    }
    return { ...project, card: selectedProjectSummaries[slug] };
  });
  const stackGroups = profile.techContexts.filter((context) => context.category !== "AI");
  const problemSolvingCases = getSelectedProblemSolving();
  const aiWorkflowCase = getProjectProblemSolving("enterprise-cms-erp").find((item) => item.aiWorkflow);

  return (
    <main className="portfolio-home">
      <div className="intro-scene">
        <section className="document-section intro-section">
          <div className="container hero-layout">
            <div className="hero-copy-block">
              <p className="eyebrow">{profile.name} · {profile.years} 웹 개발자</p>
              <h1>{profile.heroHeadline.map((line) => <span key={line}>{line}</span>)}</h1>
              <dl className="hero-experiences">
                {profile.heroExperiences.map((item) => (
                  <div key={item.title}>
                    <dt>{item.title}</dt>
                    <dd>{item.description}</dd>
                  </div>
                ))}
              </dl>
              <nav className="featured-project-link hero-actions" aria-label="전체 프로젝트와 이력서">
                <Link className="text-link primary-link hero-action" href="/projects/">
                  <span className="cta-label">전체 프로젝트 보기 <span className="cta-arrow" aria-hidden="true">↗</span></span>
                  <span className="hero-action-description">수행한 전체 프로젝트</span>
                </Link>
                <Link className="text-link primary-link hero-action" href="/resume/">
                  <span className="cta-label">이력서 보기 <span className="cta-arrow" aria-hidden="true">↗</span></span>
                  <span className="hero-action-description">경력 · 기술 · 업무 방식</span>
                </Link>
              </nav>
            </div>
            <aside className="profile-aside" aria-label="프로필 사진">
              <div className="profile-photo-frame">
                <Image src="/profile-photo.png" alt="권태형 프로필 사진" width={280} height={340} priority />
              </div>
            </aside>
          </div>
        </section>

        <section className="experience-summary" aria-label="경력 요약">
          <dl className="container experience-summary-grid">
            {experienceSummary.map((item) => (
              <div key={item.value}>
                <dt>{item.value}</dt>
                <dd>{item.description}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      <div className="home-band projects-band">
        <div className="container">
          <Section id="selected-projects" eyebrow="SELECTED WORK" title="대표 프로젝트" description="실제 업무에서 맡았던 시스템과 해결했던 핵심 문제입니다.">
            <div className="featured-projects">
              {featuredProjects.map((project) => (
                <article className={`featured-project${project.slug === "enterprise-cms-erp" ? " featured-project-primary" : ""}`} key={project.slug}>
                  {project.slug === "enterprise-cms-erp" ? (
                    <>
                      <div className="project-overview">
                        <p className="project-category">{project.card.category}</p>
                        <h3>{project.card.title}</h3>
                        <p className="featured-summary">{project.card.description}</p>
                        <p className="project-stack">{project.card.stack.join(" · ")}</p>
                        <div className="featured-project-link">
                          {project.demo && <p><Link className="text-link detail-link" href={project.demo.href}>{project.demo.label} →</Link></p>}
                          <Link className="text-link detail-link" href={`/projects/${project.slug}`} aria-label={`${project.card.title} 상세 보기`}>
                            <span className="cta-label">프로젝트 상세 <span className="cta-arrow" aria-hidden="true">↗</span></span>
                          </Link>
                        </div>
                      </div>
                      <div className="project-message">
                        <p className="project-statement">
                          {project.card.statement.map((line) => <span key={line}>{line}</span>)}
                        </p>
                        <ProjectEvidence evidence={project.card.evidence} />
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="project-category">{project.card.category}</p>
                      <h3>{project.card.title}</h3>
                      <p className="project-statement">
                        {project.card.statement.map((line) => <span key={line}>{line}</span>)}
                      </p>
                      <p className="featured-summary">{project.card.description}</p>
                      <ProjectEvidence evidence={project.card.evidence} />
                      <p className="project-stack">{project.card.stack.join(" · ")}</p>
                      <div className="featured-project-link">
                        {project.demo && (
                          <p>
                            <Link className="text-link detail-link" href={project.demo.href} aria-label={`${project.card.title} ${project.demo.label}`}>
                              <span className="cta-label">{project.demo.label} <span className="cta-arrow" aria-hidden="true">↗</span></span>
                            </Link>
                          </p>
                        )}
                        <Link className="text-link detail-link" href={`/projects/${project.slug}`} aria-label={`${project.card.title} 상세 보기`}>
                          <span className="cta-label">프로젝트 상세 <span className="cta-arrow" aria-hidden="true">↗</span></span>
                        </Link>
                      </div>
                    </>
                  )}
                </article>
              ))}
            </div>
            <div className="featured-project-link section-next">
              <Link className="text-link primary-link" href="/projects/">
                <span className="cta-label">전체 프로젝트 보기 <span className="cta-arrow" aria-hidden="true">↗</span></span>
              </Link>
              <p>수행한 프로젝트 전체를 한눈에 확인합니다.</p>
            </div>
          </Section>
        </div>
      </div>

      <div className="home-band solved-band">
        <div className="container">
          <Section id="problem-solving" title="업무에서 해결한 문제">
            <div className="trouble-grid">
              {problemSolvingCases.map((item) => (
                <article className="trouble-item" key={item.title}>
                  <div className="case-heading">
                    <p className="case-keyword">{item.keyword}</p>
                    <h3>{item.title}</h3>
                  </div>
                  <div className="case-content">
                    <p className="case-conclusion">{item.summary}</p>
                    <Link className="text-link" href={`/problem-solving/${item.slug}/`}>판단과 구현 보기 →</Link>
                  </div>
                </article>
              ))}
            </div>
          </Section>
        </div>
      </div>

      <div className="home-band ai-band">
        <div className="container">
          <Section id="ai-collaboration" title="AI를 사용하는 방식">
            <div className="ai-usage-layout">
              <p className="ai-statement">AI는 구현을 돕고,<br />판단은 제가 합니다.</p>
              <div className="ai-responsibility-grid">
                <div>
                  <h3>AI에게 맡기는 일</h3>
                  <ul>{aiDelegatedTasks.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
                <div>
                  <h3>직접 판단하는 일</h3>
                  <ul>{developerDecisions.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
              </div>
            </div>
            <p className="ai-case-note">{miniMesAiCase.description}</p>
            {aiWorkflowCase && <div className="featured-project-link"><Link className="text-link" href={`/problem-solving/${aiWorkflowCase.slug}/#ai-workflow`}>CMS 공개 재구현의 판단·AI 작업 기록 →</Link></div>}
          </Section>
        </div>
      </div>

      <div className="home-band career-band">
        <div className="container">
          <Section id="career-timeline" title="경력">
            <div className="timeline-list">
              {careerTimeline.map((item) => {
                const summary = careerSummaryById[item.id];
                if (!summary) {
                  throw new Error(`Home career summary not found: ${item.id}`);
                }
                return (
                  <article className="timeline-item" key={item.id}>
                    <div className="timeline-period">{item.period}</div>
                    <div className="timeline-content">
                      <h3>{item.title}</h3>
                      <p className="timeline-role">{item.companyLabel} · {item.role}</p>
                      <p className="career-summary">{summary}</p>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="featured-project-link section-next">
              <Link className="text-link primary-link" href="/resume/">
                <span className="cta-label">전체 이력 보기 <span className="cta-arrow" aria-hidden="true">↗</span></span>
              </Link>
              <p>회사별 프로젝트 · 사용 기술 · 업무 방식을 확인합니다.</p>
            </div>
          </Section>
          <Section id="tech-stack" title="사용 기술">
            <div className="stack-context-list">
              {stackGroups.map((context) => (
                <div className="stack-context-item" key={context.category}>
                  <h3>{context.category}</h3>
                  <ul>{context.items.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>

      <div className="home-band contact-band">
        <div className="container">
          <Section id="contact" title="연락처">
            <ContactDetails />
          </Section>
          <footer className="portfolio-notice">
            <details>
              <summary>공개 범위와 익명화 기준</summary>
              <ul className="inline-list">{sanitizedNotice.map((notice) => <li key={notice}>{notice}</li>)}</ul>
            </details>
          </footer>
        </div>
      </div>
    </main>
  );
}
