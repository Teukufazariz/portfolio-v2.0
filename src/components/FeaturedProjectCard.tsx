"use client";

import Link from "next/link";
import { Project } from "@/data/portfolio";

interface FeaturedProjectCardProps extends Project {}

export default function FeaturedProjectCard({
  number,
  title,
  slug,
  role,
  description,
  technologies,
  year,
  imageAlt,
  githubUrl,
  demoUrl,
}: FeaturedProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`} className="block group">
      <article className="bg-gray-50 dark:bg-neutral-900 border-2 border-black dark:border-white flex flex-col overflow-hidden transition-all duration-200 hover:shadow-[8px_8px_0_0_#000] dark:hover:shadow-[8px_8px_0_0_#fff] hover:-translate-x-1 hover:-translate-y-1">
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
            {technologies.join(' · ')}
          </p>

          {/* Action Links - prevent navigation when clicking these */}
          <div className="flex gap-3 mt-auto">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="px-4 py-2 text-sm font-semibold border-2 border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-200"
              >
                GitHub
              </a>
            )}
            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="px-4 py-2 text-sm font-semibold bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white transition-all duration-200"
              >
                View Project
              </a>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}