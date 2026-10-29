import { notFound } from "next/navigation";
import { allProjects, getProject } from "@/data/portfolio";
import CaseStudy from "@/components/CaseStudy";

export async function generateStaticParams() {
  return allProjects.map((project) => ({ slug: project.slug }));
}

// Intercepts /projects/[slug] when it is opened from the timeline and shows it as a sheet.
export default async function ProjectSheet({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return <CaseStudy project={project} inSheet />;
}
