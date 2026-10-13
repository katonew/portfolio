import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/Section";
import {
  aiDelegatedTasks,
  careerTimeline,
  developerDecisions,
  experienceSummary,
  miniMesAiCase,
  problemSolvingCases,
  profile,
  projects,
  sanitizedNotice,
  selectedProjectSlugs,
  selectedProjectSummaries
} from "@/data/profile";

function ProjectEvidence({ evidence }: { evidence: (typeof selectedProjectSummaries)[keyof typeof selectedProjectSummaries]["evidence"] }) {
  if (evidence.kind === "comparison") {
    return (
      <dl className="project-evidence project-evidence-comparison" aria-label="중복 판별 기준 비교">
        <div><dt>{evidence.before}</dt><dd>{evidence.after}</dd></div>
      </dl>
    );
  }

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
  const aiTools = profile.techContexts.find((context) => context.category === "AI");

  return (
    <main className="portfolio-home">
      <section className="document-section">
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

      <div className="home-band projects-band">
        <div className="container">
          <Section id="selected-projects" title="대표 프로젝트" description="실제 업무에서 맡았던 시스템과 해결했던 핵심 문제입니다.">
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
                          <Link className="text-link" href={`/projects/${project.slug}`} aria-label={`${project.card.title} 상세 보기`}>프로젝트 상세 →</Link>
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
                        <Link className="text-link" href={`/projects/${project.slug}`} aria-label={`${project.card.title} 상세 보기`}>프로젝트 상세 →</Link>
                      </div>
                    </>
                  )}
                </article>
              ))}
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
                    <p className="case-conclusion">{item.conclusion}</p>
                    <ul className={`case-flow${item.flowKind === "parallel" ? " case-flow-branches" : ""}`} aria-label={`${item.title} 처리 흐름`}>
                      {item.flow.map((step) => <li key={step}>{step}</li>)}
                    </ul>
                    <p className="case-description">{item.description}</p>
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
          </Section>
        </div>
      </div>

      <div className="home-band career-band">
        <div className="container">
          <Section id="career-timeline" title="경력">
            <div className="timeline-list">
              {careerTimeline.map((item) => (
                <article className="timeline-item" key={`${item.period}-${item.companyLabel}`}>
                  <div className="timeline-period">{item.period}</div>
                  <div className="timeline-content">
                    <h3>{item.title}</h3>
                    <p className="timeline-role">{item.companyLabel} · {item.role}</p>
                    <ul className="career-project-list">
                      {item.projects.map((project) => (
                        <li key={project.title}>
                          <h4>{project.title}</h4>
                          <p className="career-summary">{project.description}</p>
                          {project.sub && <p className="career-project-sub">{project.sub}</p>}
                          <p className="project-stack">
                            {project.stack.map((tech, index) => (
                              <span key={tech}>
                                {index > 0 && " · "}
                                <span className="career-project-tech">{tech}</span>
                              </span>
                            ))}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
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
            {aiTools && <p className="ai-tools"><span>AI 도구</span>{aiTools.items.join(" · ")}</p>}
          </Section>
        </div>
      </div>

      <div className="home-band contact-band">
        <div className="container">
          <Section id="contact" title="연락처">
            <div className="contact-layout">
              <div className="profile-caption">
                <p className="contact-label">이메일</p>
                <a className="text-link" href={`mailto:${profile.email}`}>{profile.email}</a>
                <p className="contact-label">전화</p>
                <a className="text-link" href={`tel:${profile.phone.replace(/-/g, "")}`}>{profile.phone}</a>
              </div>
              <a className="profile-contact-qr" href="/contact.vcf" download>
                <Image src="/contact-qr.png" alt="권태형 연락처 저장용 QR 코드" width={120} height={120} />
                <span>연락처 QR</span>
              </a>
            </div>
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
