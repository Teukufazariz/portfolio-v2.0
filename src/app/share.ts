import type { Metadata, ResolvingMetadata } from "next";
import { site } from "@/content";

// Next merges metadata shallowly: a page that sets openGraph or twitter replaces the
// layout's whole object, so the shared fields live here.
export const openGraphBase = { siteName: site.name, locale: "en_US", type: "website" } as const;

/** generateMetadata for one case study: its own title, description, canonical URL and link preview. */
export function caseStudyMetadata(slug: string, name: string, description: string) {
  return async (_: unknown, parent: ResolvingMetadata): Promise<Metadata> => {
    const url = `/work/${slug}`;
    const title = `${name} · ${site.name}`;
    // The image is src/app/opengraph-image.tsx, which only the root segment carries; Twitter copies it from here.
    const { openGraph } = await parent;
    return {
      title: name,
      description,
      alternates: { canonical: url },
      openGraph: { ...openGraphBase, title, description, url, images: openGraph?.images },
      twitter: { card: "summary_large_image", title, description },
    };
  };
}
