"use client";

import { Experience } from "@/data/portfolio";

interface ExperienceCardProps extends Omit<Experience, 'projects'> {}

export default function ExperienceCard({
  title,
  role,
  dateRange,
  description,
  achievements = [],
  logoPlaceholder = "💼",
}: ExperienceCardProps) {
  return (
    <article className="relative py-8 transition-all duration-300 group
      before:content-[''] before:absolute before:left-[-49px] before:top-8 
      before:w-4 before:h-4 before:bg-white dark:before:bg-black 
      before:border-[3px] before:border-black dark:before:border-white 
      before:rounded-full before:transition-all before:duration-300 
      before:z-10 before:hidden md:before:block
      hover:before:bg-black dark:hover:before:bg-white hover:before:scale-125">
      
      {/* Logo */}
      <div className="md:absolute md:-left-20 md:top-6 w-14 h-14 md:w-16 md:h-16 
        bg-gray-100 dark:bg-neutral-800 mb-6 md:mb-0
        border-2 border-black dark:border-white rounded-full flex items-center 
        justify-center overflow-hidden transition-all duration-300 group-hover:scale-105">
        <span className="text-xl md:text-2xl font-bold text-gray-600 dark:text-gray-400">
          {logoPlaceholder}
        </span>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start mb-3 gap-2 md:gap-4">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold mb-1 leading-tight text-black dark:text-white">
            {title}
          </h3>
          <p className="text-base text-gray-600 dark:text-gray-400 font-semibold mb-2">
            {role}
          </p>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold whitespace-nowrap md:text-right">
          {dateRange}
        </div>
      </div>

      <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400 mb-4">
        {description}
      </p>

      {achievements.length > 0 && (
        <ul className="list-none pl-0 m-0">
          {achievements.map((achievement, index) => (
            <li 
              key={index}
              className="text-base leading-relaxed text-gray-600 dark:text-gray-400 mb-3 pl-5 relative 
                before:content-['•'] before:absolute before:left-0 before:text-black dark:before:text-white 
                before:font-bold before:text-lg"
              dangerouslySetInnerHTML={{ __html: achievement }}
            />
          ))}
        </ul>
      )}
    </article>
  );
}