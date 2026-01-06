"use client";

import { useState } from "react";
import ExperienceCard from "./ExperienceCard";
import FeaturedProjectCard from "./FeaturedProjectCard";

interface Project {
  number: string;
  title: string;
  role: string;
  description: string;
  technologies: string;
  year: string;
  imageAlt: string;
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
}

interface Experience {
  title: string;
  role: string;
  dateRange: string;
  description: string;
  achievements?: string[];
  logoPlaceholder?: string;
  projects: Project[];
}

interface ExperienceSectionProps {
  experiences: Experience[];
}

export default function ExperienceSection({
  experiences,
}: ExperienceSectionProps) {
  const [showAll, setShowAll] = useState(false);

  // Collect all projects and separate featured from others
  const allProjects = experiences.flatMap((exp) => exp.projects);
  const featuredProjects = allProjects.filter((p) => p.featured);
  const otherProjects = allProjects.filter((p) => !p.featured);

  return (
    <section className="mb-20" id="projects" aria-labelledby="experience-heading">
      {/* Section Header */}
      <div className="mb-10 pb-5 border-b-2 border-black dark:border-white">
        <h2
          id="experience-heading"
          className="text-4xl md:text-5xl font-bold leading-tight mb-3"
        >
          Selected Projects
        </h2>
        <p className="text-base text-gray-500 dark:text-gray-400">
          Highlighting my best work from Apple Developer Academy and professional
          experience
        </p>
      </div>

      {/* Featured Projects */}
      <div className="mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredProjects.map((project) => (
            <FeaturedProjectCard key={project.number} {...project} />
          ))}
        </div>
      </div>

      {/* Other Projects - Expandable */}
      {otherProjects.length > 0 && (
        <div>
          <button
            onClick={() => setShowAll(!showAll)}
            className="mb-6 flex items-center gap-2 text-lg font-semibold hover:underline underline-offset-4 transition-all duration-200"
            aria-expanded={showAll}
          >
            {showAll ? "Hide" : "View"} more projects ({otherProjects.length})
            <span
              className={`transition-transform duration-200 ${
                showAll ? "rotate-180" : ""
              }`}
            >
              ↓
            </span>
          </button>

          <div
            className={`grid transition-all duration-200 ease-in-out ${
              showAll
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {otherProjects.map((project) => (
                  <article
                    key={project.number}
                    className="bg-gray-50 dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 flex flex-col overflow-hidden transition-all duration-200 hover:shadow-[4px_4px_0_0_#000] dark:hover:shadow-[4px_4px_0_0_#fff] hover:-translate-x-0.5 hover:-translate-y-0.5"
                  >
                    {/* Smaller Project Image */}
                    <div className="w-full h-48 bg-gray-200 dark:bg-neutral-800 border-b border-gray-300 dark:border-neutral-700 flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-neutral-800 dark:to-neutral-700 text-gray-400 dark:text-gray-500 font-bold text-3xl">
                        {project.title.charAt(0)}
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-gray-400 dark:text-gray-500 tracking-widest">
                          {project.number}
                        </span>
                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                          {project.year}
                        </span>
                      </div>

                      <h4 className="text-xl font-bold mb-1 leading-tight">
                        {project.title}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-3">
                        {project.role}
                      </p>

                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 flex-grow">
                        {project.description}
                      </p>

                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-4">
                        {project.technologies}
                      </p>

                      {/* Action Links */}
                      <div className="flex gap-2 mt-auto">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 text-xs font-semibold border border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-200"
                          >
                            GitHub
                          </a>
                        )}
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 text-xs font-semibold bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white transition-all duration-200"
                          >
                            View
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Experience Section */}
      <div className="mt-16 pt-16 border-t-2 border-black dark:border-white">
        <h3 className="text-3xl font-bold mb-12">Experience</h3>
        
        <div className="relative md:pl-20 flex flex-col gap-0">
          {/* Timeline vertical line */}
          <div 
            className="hidden md:block absolute left-[31px] top-8 bottom-8 w-0.5 bg-black dark:bg-white"
            aria-hidden="true"
          />
          
          {experiences.map((experience, index) => (
            <div key={index} className="relative">
              {/* Timeline dot/connector */}
              <div 
                className="hidden md:flex absolute left-[-52px] top-6 w-4 h-4 rounded-full bg-black dark:bg-white border-4 border-white dark:border-neutral-900 z-10"
                aria-hidden="true"
              />
              <ExperienceCard {...experience} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}