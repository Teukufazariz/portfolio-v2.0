import ProjectCard from "./ProjectCard";
import { Project } from "@/data/portfolio";

interface ProjectsSectionProps {
  title: string;
  meta: string;
  projects: Project[];
  headingId: string;
}

export default function ProjectsSection({
  title,
  meta,
  projects,
  headingId,
}: ProjectsSectionProps) {
  return (
    <section className="mb-20" id="projects" aria-labelledby={headingId}>
      <div className="mb-10 pb-5 border-b-2 border-black dark:border-white">
        <h2
          id={headingId}
          className="text-4xl md:text-5xl font-bold leading-tight mb-3"
        >
          {title}
        </h2>
        <p className="text-base text-gray-500 dark:text-gray-400">{meta}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.number} {...project} />
        ))}
      </div>
    </section>
  );
}