import { notFound } from "next/navigation";
import { Metadata } from "next";
import { experiences } from "@/data/portfolio";
import ProjectDetail from "@/components/ProjectDetail";

function getProject(slug: string) {
  for (const exp of experiences) {
    const project = exp.projects.find((p) => p.slug === slug);
    if (project) return project;
  }
  return null;
}

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const allProjects = experiences.flatMap((exp) => exp.projects);
  return allProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} — Teuku Fazariz Basya`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}