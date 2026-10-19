import { problemSolvingCases, selectedProblemSolvingSlugs } from "@/data/problem-solving";
import { getProject } from "@/lib/projects";

export function getProblemSolvingCases() {
  const slugs = new Set<string>();
  for (const item of problemSolvingCases) {
    if (slugs.has(item.slug)) throw new Error(`Duplicate problem solving slug: ${item.slug}`);
    if (!getProject(item.projectSlug)) throw new Error(`Problem solving project not found: ${item.projectSlug}`);
    slugs.add(item.slug);
  }
  return problemSolvingCases;
}

export function getProblemSolving(slug: string) {
  return getProblemSolvingCases().find((item) => item.slug === slug);
}

export function getProjectProblemSolving(projectSlug: string) {
  return getProblemSolvingCases().filter((item) => item.projectSlug === projectSlug);
}

export function getSelectedProblemSolving() {
  const cases = getProblemSolvingCases();
  return selectedProblemSolvingSlugs.map((slug) => {
    const item = cases.find((entry) => entry.slug === slug);
    if (!item) throw new Error(`Selected problem solving not found: ${slug}`);
    return item;
  });
}
