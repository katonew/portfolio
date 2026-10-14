import type { Metadata } from "next";
import Image from "next/image";
import { ContactDetails } from "@/components/ContactDetails";
import { PrintButton } from "@/components/PrintButton";
import {
  aiDelegatedTasks,
  careerTimeline,
  developerDecisions,
  miniMesAiCase,
  profile,
  workingPrinciples
} from "@/data/profile";
import { getResumeSkillGroups } from "@/lib/resume";
import styles from "./resume.module.css";

export const metadata: Metadata = {
  title: "Resume | 권태형",
  description: "권태형의 경력, 프로젝트 담당 범위, 사용 기술과 업무 방식"
};

export default function ResumePage() {
  const skillGroups = getResumeSkillGroups();
  const aiTools = profile.techContexts.find((context) => context.category === "AI");

  return (
    <main className={`${styles.page} resume-document`}>
      <div className={styles.document}>
        <header className={`${styles.profile} resume-profile`}>
          <div className={styles.identity}>
            <p className={styles.meta}>Resume · {profile.years} 웹 개발자</p>
            <h1>{profile.name}</h1>
            <p className={styles.role}>{profile.role}</p>
            <p>{profile.subheadline}</p>
            <address className={styles.contactLinks}>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <a href={`tel:${profile.phone.replace(/-/g, "")}`}>{profile.phone}</a>
            </address>
            <div className={`${styles.actions} resume-actions`}><PrintButton /></div>
          </div>
          <Image className={styles.photo} src="/profile-photo.png" alt="권태형 프로필 사진" width={280} height={340} priority />
        </header>

        <section className={`${styles.section} resume-section`} aria-labelledby="resume-career-title">
          <h2 id="resume-career-title">Career</h2>
          {careerTimeline.map((career) => (
            <article className={`${styles.career} resume-career`} key={career.id}>
              <header className={`${styles.careerHeading} resume-career-heading`}>
                <h3>{career.companyLabel}</h3>
                <p className={styles.meta}>재직 기간 · {career.period}</p>
                <p>{career.title} · {career.role}</p>
              </header>
              <ul className={styles.careerProjects}>
                {career.projects.map((project) => (
                  <li className="resume-project" key={project.id}>
                    <h4>{project.title}</h4>
                    <p>{project.description}</p>
                    {project.sub && <p className={styles.meta}>{project.sub}</p>}
                    <p className={styles.stack}>{project.stack.join(" · ")}</p>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className={`${styles.section} resume-section`} aria-labelledby="resume-skills-title">
          <h2 id="resume-skills-title">Skills</h2>
          {skillGroups.map((group) => (
            <div className={`${styles.skillGroup} resume-skill-group`} key={group.category}>
              <h3>{group.category}</h3>
              <div>
                <dl className={styles.skillUsages}>
                  {group.usages.map((usage) => (
                    <div className="resume-skill-usage" key={usage.technologies.join("-")}>
                      <dt>{usage.technologies.join(" · ")}</dt>
                      <dd>{usage.description}</dd>
                    </div>
                  ))}
                </dl>
                {group.technologiesOnly.length > 0 && <p className={styles.technologiesOnly}>{group.technologiesOnly.join(" · ")}</p>}
              </div>
            </div>
          ))}
        </section>

        <section className={`${styles.section} resume-section`} aria-labelledby="resume-working-style-title">
          <h2 id="resume-working-style-title">Working Style</h2>
          <p>{profile.introduction}</p>
          <dl className={styles.principles}>
            {workingPrinciples.map((principle) => (
              <div className="resume-working-note" key={principle.title}>
                <dt>{principle.title}</dt>
                <dd>{principle.description}</dd>
              </div>
            ))}
          </dl>
          <div className={`${styles.responsibilities} resume-responsibilities`}>
            <div className="resume-working-note">
              <h3>AI에게 맡기는 일</h3>
              <ul>{aiDelegatedTasks.map((task) => <li key={task}>{task}</li>)}</ul>
            </div>
            <div className="resume-working-note">
              <h3>직접 판단하는 일</h3>
              <ul>{developerDecisions.map((decision) => <li key={decision}>{decision}</li>)}</ul>
            </div>
          </div>
          {aiTools && <p className={styles.aiTools}>AI 도구 · {aiTools.items.join(" · ")}</p>}
          <p className={styles.aiNote}>{miniMesAiCase.description}</p>
        </section>

        <section className={`${styles.section} resume-section resume-contact`} aria-labelledby="resume-contact-title">
          <h2 id="resume-contact-title">Contact</h2>
          <ContactDetails />
        </section>
      </div>
    </main>
  );
}
