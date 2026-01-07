"use client";

import { useState } from "react";
import Link from "next/link";
import ExperienceCard from "./ExperienceCard";
import FeaturedProjectCard from "./FeaturedProjectCard";
import ProjectCard from "./ProjectCard";
import { Experience } from "@/data/portfolio";

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
      <div className="mb-10 pb-5 ">
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
                  <ProjectCard key={project.number} {...project} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Experience Section */}
      <div className="mt-16 pt-16 border-t-2 border-black dark:border-white">
        <h3 className="text-4xl md:text-5xl font-bold mb-3">Experience</h3>

        <p className="text-base text-gray-500 dark:text-gray-400 mb-4">
          Highlighting my best work from Apple Developer Academy and professional
          experience
        </p>
        
        <div className="relative md:pl-20 flex flex-col gap-0">
          {/* Timeline vertical line */}
          <div 
            className="hidden md:block absolute left-[31px] top-8 bottom-8 w-0.5 bg-black dark:bg-white"
            aria-hidden="true"
          />
          
          {experiences.map((experience, index) => (
            <div key={index} className="relative">
              <ExperienceCard {...experience} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}