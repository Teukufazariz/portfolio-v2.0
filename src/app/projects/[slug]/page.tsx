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

function getAdjacentProjects(slug: string) {
  const allProjects = experiences.flatMap((exp) => exp.projects);
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);

  if (currentIndex === -1) return { previous: null, next: null };

  const previous = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const next = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return { previous, next };
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

export async function generateMetadata(
  { params }: ProjectPageProps
): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [
        {
          url: project.image ?? "/og.png",
          width: 1200,
          height: 630,
          alt: project.imageAlt ?? `${project.title} – iOS Project`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [project.image ?? "/og.png"],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  const { previous, next } = getAdjacentProjects(slug);

  if (!project) {
    notFound();
  }

  return (
    <main id="main-content">
      <ProjectDetail project={project} previousProject={previous || undefined} nextProject={next || undefined} />
    </main>
  );
}