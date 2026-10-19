import Link from "next/link";
import type { ProblemSolving } from "@/data/problem-solving";
import type { Project } from "@/data/profile";

export function ProblemSolvingDetail({ item, project }: { item: ProblemSolving; project: Project }) {
  return <main className="detail-page cms-detail-page"><div className="container">
    <Link className="back-link" href={`/projects/${project.slug}/`}>{project.title}로 돌아가기</Link>
    <header className="cms-project-hero"><p className="eyebrow">Problem Solving · {item.keyword}</p><h1>{item.title}</h1><p className="cms-hero-description">{item.summary}</p></header>
    <article>
      <section className="cms-case" aria-labelledby="problem"><h2 id="problem">Problem</h2><p>{item.problem}</p></section>
      <section className="cms-case case-decision" aria-labelledby="decision"><h2 id="decision">Decision</h2><p className="case-decision-context">{item.decision}</p></section>
      <section className="cms-case" aria-labelledby="implementation"><h2 id="implementation">Implementation / Action</h2>
        <ol className="cms-flow">{item.flow.map((step) => <li key={step}>{step}</li>)}</ol>
        <ul className="cms-technical-details">{item.implementation.map((step) => <li key={step}>{step}</li>)}</ul>
      </section>
      <section className="cms-case" aria-labelledby="result"><h2 id="result">Result</h2><p>{item.result}</p></section>
      <section className="cms-case" aria-labelledby="evidence"><h2 id="evidence">Evidence / Verification</h2>
        {project.demo && <div className="featured-project-link"><Link className="text-link" href={project.demo.href}>{project.demo.label} →</Link></div>}
        <ul className="cms-verification-list">{item.verification.map((evidence) => <li key={evidence}>{evidence}</li>)}</ul>
      </section>
      {item.aiWorkflow && <section className="cms-case" aria-labelledby="ai-workflow"><h2 id="ai-workflow">AI Workflow · Supporting Evidence</h2>
        <p>{item.aiWorkflow.summary}</p>
        <div className="cms-case-implementation"><h3>AI가 수행한 일</h3><ul className="cms-technical-details">{item.aiWorkflow.aiTasks.map((task) => <li key={task}>{task}</li>)}</ul></div>
        <div className="cms-case-implementation"><h3>개발자가 결정한 일</h3><ul className="cms-technical-details">{item.aiWorkflow.developerDecisions.map((decision) => <li key={decision}>{decision}</li>)}</ul></div>
        <p className="case-disclosure">{item.aiWorkflow.verification}</p>
      </section>}
    </article>
  </div></main>;
}
