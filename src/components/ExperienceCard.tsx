"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";

interface Project {
  number: string;
  title: string;
  role: string;
  description: string;
  technologies: string;
  year: string;
  imageAlt: string;
}

interface ExperienceCardProps {
  title: string;
  role: string;
  dateRange: string;
  description: string;
  keyProjects: string[];
  projects: Project[];
}

export default function ExperienceCard({
  title,
  role,
  dateRange,
  description,
  keyProjects,
  projects,
}: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-2 border-black dark:border-white bg-white dark:bg-neutral-900">
      {/* Card Header - Always Visible */}
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-1">{title}</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
              {role}
            </p>
          </div>
          <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 whitespace-nowrap">
            {dateRange}
          </span>
        </div>

        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
          {description}
        </p>

      
        {/* <div className="mb-6">
          <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            Key Projects
          </p>
          <div className="flex flex-wrap gap-2">
            {keyProjects.map((project, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 dark:bg-neutral-800 text-sm font-medium border border-gray-300 dark:border-neutral-700"
              >
                {project}
              </span>
            ))}
          </div>
        </div> */}

        {/* Expand/Collapse Button */}
        {/* <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-sm font-semibold hover:underline underline-offset-4 transition-all duration-200"
          aria-expanded={isExpanded}
        >
          {isExpanded ? "Hide project details" : "View project details"}
          <span 
            className={`transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
          >
            ↓
          </span>
        </button> */}
      </div>

      {/* Expandable Projects Section */}
      <div
        className={`grid transition-all duration-200 ease-in-out ${
          isExpanded
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t-2 border-black dark:border-white p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.number} {...project} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}