import { profile } from "@/data/profile";
import { resumeSkillUsages } from "@/data/resume";
import { getArchiveProjects, getProject } from "@/lib/projects";

export function getResumeSkillGroups() {
  const archive = getArchiveProjects();
  for (const usage of resumeSkillUsages) {
    const source = usage.source;
    const project = source.kind === "project"
      ? getProject(source.slug)
      : archive.find((item) => item.id === source.id);

    if (!project || usage.technologies.some((technology) => !project.stack.includes(technology))) {
      throw new Error(`Skill usage source does not match: ${usage.technologies.join(", ")}`);
    }
  }

  return profile.techContexts.filter((context) => context.category !== "AI").map((context) => {
    const usages = resumeSkillUsages
      .map((usage) => ({
        technologies: usage.technologies.filter((technology) => context.items.includes(technology)),
        description: usage.description
      }))
      .filter((usage) => usage.technologies.length > 0);
    const described = new Set(usages.flatMap((usage) => usage.technologies));

    return {
      category: context.category,
      usages,
      technologiesOnly: context.items.filter((technology) => !described.has(technology))
    };
  });
}
