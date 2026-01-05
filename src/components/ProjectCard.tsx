interface ProjectCardProps {
  number: string;
  title: string;
  role: string;
  description: string;
  technologies: string;
  year: string;
  imageAlt: string;
}

export default function ProjectCard({
  number,
  title,
  role,
  description,
  technologies,
  year,
  imageAlt,
}: ProjectCardProps) {
  return (
    <article className="bg-gray-100 dark:bg-neutral-900 border-2 border-black dark:border-white flex flex-col overflow-hidden transition-all duration-200 hover:shadow-[8px_8px_0_0_#000] dark:hover:shadow-[8px_8px_0_0_#fff] hover:-translate-x-1 hover:-translate-y-1">
      <div className="w-full h-64 md:h-72 bg-gray-200 dark:bg-neutral-800 border-b-2 border-black dark:border-white flex items-center justify-center overflow-hidden">
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-neutral-800 dark:to-neutral-700 text-gray-500 dark:text-gray-400 font-bold text-4xl">
          {title.charAt(0)}
        </div>
      </div>
      <div className="p-8 md:p-12 flex flex-col flex-grow">
        <div className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-4 tracking-widest">
          {number}
        </div>
        <h3 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
          {title}
        </h3>
        <p className="text-base text-gray-500 dark:text-gray-400 font-semibold mb-5">
          {role}
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6 flex-grow">
          {description}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold mb-6">
          {technologies}
        </p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-base font-bold">{year}</span>
          <a
            href="#"
            className="px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold border-2 border-black dark:border-white hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white transition-all duration-200"
            aria-label={`View ${title} project details`}
          >
            View Project
          </a>
        </div>
      </div>
    </article>
  );
}