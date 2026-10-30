import type { Metadata } from "next";
import Link from "next/link";
import { getArchiveProjects, getSelectedArchiveProjects } from "@/lib/projects";
import styles from "./projects.module.css";

export const metadata: Metadata = {
  title: "Projects | 권태형",
  description: "Mini MES 개인 설계·구현과 기업 업무 시스템 개발, 유지보수·서버 이전 프로젝트"
};

type ArchiveProject = ReturnType<typeof getArchiveProjects>[number];
type SelectedProject = ReturnType<typeof getSelectedArchiveProjects>[number];

function ProjectRow({ project, summary }: { project: ArchiveProject; summary?: SelectedProject["summary"] }) {
  return (
    <article className={styles.project}>
      <div className={styles.projectMain}>
        <h3>{project.title}</h3>
        <p className={styles.scope}>{summary ? summary.description : project.description}</p>
        {!summary && project.sub && <p className={styles.sub}>{project.sub}</p>}
      </div>
      <dl className={styles.metadata}>
        {project.period !== null && <div><dt>수행 기간</dt><dd>{project.period}</dd></div>}
        <div><dt>{project.careerId === null ? "구분" : "소속"}</dt><dd>{project.companyLabel}</dd></div>
      </dl>
      <div className={styles.projectFooter}>
        <p className={styles.stack}>{(summary ? summary.stack : project.stack).join(" · ")}</p>
        {project.demo && <Link className={`${styles.detailLink} detail-link`} href={project.demo.href}>{project.demo.label} →</Link>}
        {project.slug !== null && (
          <Link className={`${styles.detailLink} detail-link`} href={`/projects/${project.slug}/`} aria-label={`${project.title} 프로젝트 보기`}>
            <span className="cta-label">프로젝트 보기 <span className="cta-arrow" aria-hidden="true">↗</span></span>
          </Link>
        )}
      </div>
    </article>
  );
}

export default function ProjectsPage() {
  const selected = getSelectedArchiveProjects();
  const archive = getArchiveProjects();

  return (
    <main className={styles.page}>
      <div className={styles.document}>
        <header className={styles.heading}>
          <h1>Projects</h1>
          <p>프로젝트별 담당 범위와 사용 기술을 정리했습니다.</p>
        </header>
        <section className={styles.section} aria-labelledby="selected-work-title">
          <h2 id="selected-work-title">Selected Work</h2>
          <ul className={styles.selectedList}>
            {selected.map((project) => (
              <li key={project.id}><ProjectRow project={project} summary={project.summary} /></li>
            ))}
          </ul>
        </section>
        <section className={styles.section} aria-labelledby="all-projects-title">
          <h2 id="all-projects-title">All Projects</h2>
          <ul className={styles.projectList}>
            {archive.map((project) => <li key={project.id}><ProjectRow project={project} /></li>)}
          </ul>
        </section>
      </div>
    </main>
  );
}
