import { careerTimeline, projects, selectedProjectSlugs, selectedProjectSummaries } from "@/data/profile";

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectSlugs() {
  return projects.map((project) => project.slug);
}

// 회사 재직 기간을 프로젝트 수행 기간으로 대체하지 않습니다.
export function getArchiveProjects() {
  const careerProjects = careerTimeline.flatMap((career) => career.projects.map((project) => {
    const detail = project.slug === null ? undefined : getProject(project.slug);
    if (project.slug !== null && !detail) {
      throw new Error(`Archive project detail not found: ${project.slug}`);
    }

    return {
      ...project,
      careerId: career.id,
      companyLabel: career.companyLabel,
      period: detail ? detail.period : null,
      demo: detail?.demo,
      isSelected: selectedProjectSlugs.some((slug) => slug === project.slug)
    };
  }));
  const sideProjects = projects.filter((project) => project.kind === "side-project").map((project) => ({
    id: project.slug,
    slug: project.slug,
    title: project.title,
    description: project.summary,
    sub: "Independent Design & Implementation",
    stack: project.stack,
    careerId: null,
    companyLabel: "Side Project · 개인 설계·구현",
    period: project.period,
    demo: project.demo,
    isSelected: selectedProjectSlugs.some((slug) => slug === project.slug)
  }));
  return [...sideProjects, ...careerProjects];
}

export function getSelectedArchiveProjects() {
  const archive = getArchiveProjects();
  return selectedProjectSlugs.map((slug) => {
    const project = archive.find((item) => item.slug === slug);
    if (!project) {
      throw new Error(`Selected archive project not found: ${slug}`);
    }
    return { ...project, slug, summary: selectedProjectSummaries[slug] };
  });
}
