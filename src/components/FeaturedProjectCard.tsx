"use client";

import Link from "next/link";

interface FeaturedProjectCardProps {
  number: string;
  title: string;
  slug: string;
  role: string;
  description: string;
  technologies: string[];
  year: string;
  imageAlt: string;
}

export default function FeaturedProjectCard({
  number,
  title,
  slug,
  role,
  description,
  technologies,
  year,
}: FeaturedProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`} className="block group">
      <article className="bg-gray-50 dark:bg-neutral-900 border-2 border-black dark:border-white flex flex-col overflow-hidden transition-all duration-200 hover:shadow-[8px_8px_0_0_#000] dark:hover:shadow-[8px_8px_0_0_#fff] hover:-translate-x-1 hover:-translate-y-1 h-full">
        {/* Project Image */}
        <div className="w-full aspect-video bg-gray-200 dark:bg-neutral-800 border-b-2 border-black dark:border-white flex items-center justify-center overflow-hidden">
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-neutral-800 dark:to-neutral-700 text-gray-400 dark:text-gray-500 font-bold text-5xl transition-transform duration-300 group-hover:scale-105">
            {title.charAt(0)}
          </div>
        </div>

        {/* Project Content */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 tracking-widest">
              {number}
            </span>
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              {year}
            </span>
          </div>

          <h3 className="text-2xl font-bold mb-2 leading-tight group-hover:underline underline-offset-4">
            {title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-4">
            {role}
          </p>

          <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-4 flex-grow">
            {description}
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-4">
            {technologies.join(" · ")}
          </p>

          {/* View Details CTA */}
          <div className="mt-auto pt-4 border-t border-gray-200 dark:border-neutral-700">
            <span className="inline-flex items-center gap-2 text-sm font-semibold group-hover:underline underline-offset-4">
              View Project Details
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}