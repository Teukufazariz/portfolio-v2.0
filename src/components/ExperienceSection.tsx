import ExperienceCard from "./ExperienceCard";

interface Project {
  number: string;
  title: string;
  role: string;
  description: string;
  technologies: string;
  year: string;
  imageAlt: string;
}

interface Experience {
  title: string;
  role: string;
  dateRange: string;
  description: string;
  keyProjects: string[];
  projects: Project[];
}

interface ExperienceSectionProps {
  experiences: Experience[];
}

export default function ExperienceSection({
  experiences,
}: ExperienceSectionProps) {
  return (
    <section className="mb-20" id="projects" aria-labelledby="experience-heading">
      <div className="mb-10 pb-5 border-b-2 border-black dark:border-white">
        <h2
          id="experience-heading"
          className="text-4xl md:text-5xl font-bold leading-tight mb-3"
        >
          Experience
        </h2>
        <p className="text-base text-gray-500 dark:text-gray-400">
          Selected work and projects
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {experiences.map((experience, index) => (
          <ExperienceCard key={index} {...experience} />
        ))}
      </div>
    </section>
  );
}