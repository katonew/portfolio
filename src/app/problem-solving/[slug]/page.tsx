import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProblemSolvingDetail } from "@/components/ProblemSolvingDetail";
import { getProblemSolving, getProblemSolvingCases } from "@/lib/problem-solving";
import { getProject } from "@/lib/projects";

type ProblemSolvingPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProblemSolvingCases().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: ProblemSolvingPageProps): Promise<Metadata> {
  const item = getProblemSolving((await params).slug);
  return item ? { title: `${item.title} | Problem Solving`, description: item.summary } : { title: "Problem Solving Not Found" };
}

export default async function ProblemSolvingPage({ params }: ProblemSolvingPageProps) {
  const item = getProblemSolving((await params).slug);
  if (!item) notFound();
  const project = getProject(item.projectSlug);
  if (!project) notFound();
  return <ProblemSolvingDetail item={item} project={project} />;
}
