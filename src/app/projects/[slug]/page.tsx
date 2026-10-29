import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { allProjects, getProject } from "@/data/portfolio";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CaseStudy from "@/components/CaseStudy";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [
        {
          url: project.image ?? "/og.png",
          width: 1200,
          height: 630,
          alt: project.imageAlt ?? `${project.title} – iOS Project`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [project.image ?? "/og.png"],
    },
  };
}

// A direct visit or reload gets the full page; navigating from the timeline gets the sheet (src/app/@modal).
export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="page">
      <Header />
      <main id="main-content">
        <Link className="crumb" href="/">All work</Link>
        <CaseStudy project={project} />
      </main>
      <Footer />
    </div>
  );
}
