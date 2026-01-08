"use client";

import Link from "next/link";
import Image from "next/image";

interface ProjectCardProps {
  number: string;
  title: string;
  slug: string;
  role: string;
  description: string;
  technologies: string[];
  year: string;
  imageAlt: string;
  image?: string;
}

export default function ProjectCard({
  number,
  title,
  slug,
  role,
  description,
  technologies,
  year,
  image,
  imageAlt,
}: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`} className="block group">
      <article className="bg-gray-50 dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 flex flex-col overflow-hidden transition-all duration-200 hover:shadow-[4px_4px_0_0_rgb(209,213,219)] dark:hover:shadow-[4px_4px_0_0_rgb(209,213,219)] hover:-translate-x-0.5 hover:-translate-y-0.5 h-full">
        {/* Project Image */}
        <div className="w-full aspect-video bg-gray-200 dark:bg-neutral-800 border-b border-gray-300 dark:border-neutral-700 flex items-center justify-center overflow-hidden relative">
          {image ? (
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-neutral-800 dark:to-neutral-700 text-gray-400 dark:text-gray-500 font-bold text-3xl transition-transform duration-300 group-hover:scale-105">
              {title.charAt(0)}
            </div>
          )}
        </div>

        {/* Project Content */}
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 tracking-widest">
              {number}
            </span>
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              {year}
            </span>
          </div>

          <h4 className="text-xl font-bold mb-1 leading-tight group-hover:underline underline-offset-4">
            {title}
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-3">
            {role}
          </p>

          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 flex-grow">
            {description}
          </p>

          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-4">
            {technologies.join(" · ")}
          </p>

          {/* View Details CTA */}
          <div className="mt-auto pt-3 border-t border-gray-200 dark:border-neutral-700">
            <span className="inline-flex items-center gap-2 text-xs font-semibold group-hover:underline underline-offset-4">
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