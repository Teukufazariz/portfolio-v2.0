interface ProjectCardProps {
  number: string;
  title: string;
  role: string;
  description: string;
  technologies: string;
  year: string;
  imageAlt: string;
  githubUrl?: string;
  demoUrl?: string;
}

export default function ProjectCard({
  number,
  title,
  role,
  description,
  technologies,
  year,
  imageAlt,
  githubUrl,
  demoUrl,
}: ProjectCardProps) {
  return (
    <article className="bg-gray-50 dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 flex flex-col overflow-hidden transition-all duration-200 hover:shadow-[4px_4px_0_0_#000] dark:hover:shadow-[4px_4px_0_0_#fff] hover:-translate-x-0.5 hover:-translate-y-0.5">
      {/* Project Image */}
      <div className="w-full h-48 bg-gray-200 dark:bg-neutral-800 border-b border-gray-300 dark:border-neutral-700 flex items-center justify-center overflow-hidden">
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-neutral-800 dark:to-neutral-700 text-gray-400 dark:text-gray-500 font-bold text-3xl">
          {title.charAt(0)}
        </div>
      </div>

      {/* Project Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-gray-400 dark:text-gray-500 tracking-widest">
            {number}
          </span>
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
            {year}
          </span>
        </div>

        <h4 className="text-xl font-bold mb-1 leading-tight">{title}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-3">
          {role}
        </p>

        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 flex-grow">
          {description}
        </p>

        {/* Tech Stack */}
        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-4">
          {technologies}
        </p>

        {/* Action Links */}
        <div className="flex gap-2 mt-auto">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-xs font-semibold border border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-200"
              aria-label={`View ${title} on GitHub`}
            >
              GitHub
            </a>
          )}
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-xs font-semibold bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white transition-all duration-200"
              aria-label={`View ${title} demo`}
            >
              Demo
            </a>
          )}
          {!githubUrl && !demoUrl && (
            <span className="px-3 py-1.5 text-xs font-medium text-gray-400 dark:text-gray-500 border border-gray-300 dark:border-neutral-700">
              Coming Soon
            </span>
          )}
        </div>
      </div>
    </article>
  );
}