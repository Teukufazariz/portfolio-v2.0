import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { experiences } from "@/data/portfolio";

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

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back Navigation */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm font-semibold mb-8 hover:underline underline-offset-4 transition-all duration-200"
        >
          <span>←</span>
          Back to Projects
        </Link>

        {/* Project Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 leading-tight">
            {project.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {project.description}
          </p>
        </header>

        {/* Primary Visual */}
        <div className="w-full aspect-video bg-gray-200 dark:bg-neutral-800 border-2 border-black dark:border-white mb-8 flex items-center justify-center overflow-hidden">
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-neutral-800 dark:to-neutral-700 text-gray-400 dark:text-gray-500 font-bold text-6xl">
            {project.title.charAt(0)}
          </div>
        </div>

        {/* Project Meta */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-6 bg-gray-50 dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700">
          <div>
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
              Role
            </h3>
            <p className="text-base font-semibold">{project.role}</p>
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
              Context
            </h3>
            <p className="text-base font-semibold">{project.context || "Personal Project"}</p>
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
              Timeframe
            </h3>
            <p className="text-base font-semibold">{project.dateRange || project.year}</p>
          </div>
        </div>

        {/* Links */}
        {(project.githubUrl || project.demoUrl) && (
          <div className="flex gap-4 mb-12">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 text-sm font-semibold border-2 border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-200"
              >
                GitHub
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 text-sm font-semibold bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white transition-all duration-200"
              >
                View Live
              </a>
            )}
          </div>
        )}

        {/* Description */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">About the Project</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400 whitespace-pre-line">
              {project.longDescription || project.description}
            </p>
          </div>
        </section>

        {/* Technologies */}
        <section className="pt-8 border-t border-gray-300 dark:border-neutral-700">
          <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
            Technologies
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-sm font-medium bg-gray-100 dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}