import Link from "next/link";
import Image from "next/image";
import { Project } from "@/data/portfolio";

interface ProjectDetailProps {
  project: Project;
  previousProject?: Project;
  nextProject?: Project;
}

export default function ProjectDetail({ project, previousProject, nextProject }: ProjectDetailProps) {
  const hasLinks = project.githubUrl || project.demoUrl || project.appStoreUrl;

  return (
    <article className="max-w-[1000px] mx-auto px-10 py-15">
      {/* Back Navigation */}
      <Link 
        href="/#projects" 
        className="inline-flex items-center gap-2 text-base font-semibold mb-12 transition-all duration-200 hover:text-[var(--accent-color)] hover:-translate-x-1"
      >
        ← Back to Projects
      </Link>

      {/* Project Header */}
      <header className="mb-12">
        <h1 className="text-3xl md:text-[64px] font-bold leading-none mb-4">
          {project.title}
        </h1>
        <p className="text-base md:text-lg leading-relaxed text-[var(--text-secondary)] max-w-[800px]">
          {project.description}
        </p>
      </header>

      {/* Hero Image */}
      <div className="mb-15">
        <div className="w-full aspect-video border-2 border-[var(--border-color)] overflow-hidden bg-[var(--bg-secondary)] relative">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[120px] font-bold text-[var(--text-secondary)] bg-gradient-to-br from-[var(--bg-secondary)] to-gray-300">
              {project.title.charAt(0)}
            </div>
          )}
        </div>
      </div>

      {/* Project Meta */}
      <div className="border-t-2 border-b-2 border-[var(--border-color)] py-8 mb-10">
        <div className="grid grid-cols-3 gap-4 md:gap-10">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">
              Role
            </span>
            <span className="text-sm md:text-lg font-semibold leading-snug">
              {project.role}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">
              Context
            </span>
            <span className="text-sm md:text-lg font-semibold leading-snug">
              {project.context || "Personal Project"}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">
              Timeframe
            </span>
            {/* Show year only on mobile, full date range on desktop */}
            <span className="text-sm md:text-lg font-semibold leading-snug md:hidden">
              {project.year}
            </span>
            <span className="text-sm md:text-lg font-semibold leading-snug hidden md:block">
              {project.dateRange || project.year}
            </span>
          </div>
        </div>
      </div>

      {/* Call to Action Links */}
      {hasLinks && (
        <div className="mb-20">
          <div className="flex gap-4 flex-wrap">
            {project.githubUrl && (
              <a 
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 md:px-7 md:py-3.5 text-base font-semibold border-2 border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] transition-all duration-200 hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_var(--text-primary)]"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
            )}
            {project.appStoreUrl && (
              <a 
                href={project.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 md:px-7 md:py-3.5 text-base font-semibold border-2 border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--bg-primary)] transition-all duration-200 hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_var(--text-primary)]"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Download on App Store
              </a>
            )}
            {project.demoUrl && (
              <a 
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 md:px-7 md:py-3.5 text-base font-semibold border-2 border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] transition-all duration-200 hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_var(--text-primary)]"
              >
                View Live Demo
              </a>
            )}
          </div>
        </div>
      )}

      {/* Detailed Description */}
      <section className="mb-8">
        <h2 className="text-2xl md:text-[32px] font-bold mb-6">
          About the Project
        </h2>
        <div className="text-base md:text-lg leading-relaxed text-[var(--text-secondary)]">
          <p className="mb-5 last:mb-0">
            {project.longDescription || project.description}
          </p>
        </div>
      </section>

      {/* Problem Section - Optional */}
      {project.problem && (
        <section className="mb-8">
          <h2 className="text-2xl md:text-[32px] font-bold mb-6">
            The Problem
          </h2>
          <div className="text-base md:text-lg leading-relaxed text-[var(--text-secondary)]">
            <p className="mb-5 last:mb-0">
              {project.problem}
            </p>
          </div>
        </section>
      )}

      {/* Solution Section - Optional */}
      {project.solution && (
        <section className="mb-15">
          <h2 className="text-2xl md:text-[32px] font-bold mb-6">
            The Solution
          </h2>
          <div className="text-base md:text-lg leading-relaxed text-[var(--text-secondary)]">
            <p className="mb-5 last:mb-0">
              {project.solution}
            </p>
          </div>
        </section>
      )}

      {/* Key Contributions Section - Optional */}
      {project.keyContributions && project.keyContributions.length > 0 && (
        <section className="mb-15">
          <h2 className="text-2xl md:text-[32px] font-bold mb-6">
            Key Contributions
          </h2>
          <ul className="list-none">
            {project.keyContributions.map((contribution, index) => (
              <li 
                key={index}
                className="text-base md:text-lg leading-relaxed text-[var(--text-secondary)] mb-4 pl-8 relative 
                  before:content-['→'] before:absolute before:left-0 before:text-[var(--text-primary)] 
                  before:font-bold"
              >
                {contribution}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Technologies */}
      <section className="mb-15">
        <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-5">
          Technologies
        </h3>
        <div className="flex flex-wrap gap-3">
          {project.technologies.map((tech) => (
            <span 
              key={tech} 
              className="px-5 py-2.5 text-sm font-semibold border-2 border-[var(--border-color)] bg-[var(--bg-secondary)] transition-all duration-200 hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] hover:-translate-y-0.5"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Simplified Navigation to Previous/Next Projects */}
      {(previousProject || nextProject) && (
        <nav className="mt-20 pt-10 border-t-2 border-[var(--border-color)]">
          <div className="flex justify-between items-center">
            {/* Previous Project */}
            {previousProject ? (
              <Link
                href={`/projects/${previousProject.slug}`}
                className="group inline-flex items-center gap-3 text-lg font-semibold transition-all duration-200 hover:text-[var(--accent-color)]"
              >
                <span className="text-2xl group-hover:-translate-x-1 transition-transform duration-200">←</span>
                <span>{previousProject.title}</span>
              </Link>
            ) : (
              <div /> // Empty div to maintain layout
            )}

            {/* Next Project */}
            {nextProject && (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group inline-flex items-center gap-3 text-lg font-semibold transition-all duration-200 hover:text-[var(--accent-color)]"
              >
                <span>{nextProject.title}</span>
                <span className="text-2xl group-hover:translate-x-1 transition-transform duration-200">→</span>
              </Link>
            )}
          </div>
        </nav>
      )}
    </article>
  );
}