import Image from "next/image";
import Link from "next/link";
import { Project, allProjects, experiences, formatRange, paragraphs } from "@/data/portfolio";

interface CaseStudyProps {
  project: Project;
  /** Inside the sheet, paging replaces the history entry so Done returns straight home. */
  inSheet?: boolean;
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="block">
      <h2>{title}</h2>
      <div className="text">{children}</div>
    </div>
  );
}

export default function CaseStudy({ project: p, inSheet = false }: CaseStudyProps) {
  const i = allProjects.indexOf(p);
  const earlier = allProjects[i + 1];
  const later = allProjects[i - 1];
  const context = p.context ?? experiences.find((e) => e.projects.includes(p))?.title;
  const links = [
    p.appStoreUrl && { href: p.appStoreUrl, label: "Mac App Store" },
    p.githubUrl && { href: p.githubUrl, label: "Source on GitHub" },
    p.demoUrl && { href: p.demoUrl, label: "Live demo" },
  ].filter((l): l is { href: string; label: string } => Boolean(l));

  return (
    <article>
      <header className="case-head grid">
        <h1 className="case-title" id="case-title" tabIndex={-1}>
          {p.title}
        </h1>
        <p className="lead">{p.description}</p>
      </header>

      <div className="grid case-body section">
        <dl className="spec">
          <div>
            <dt>Role</dt>
            <dd>{p.role}</dd>
          </div>
          {context && (
            <div>
              <dt>Context</dt>
              <dd>{context}</dd>
            </div>
          )}
          <div>
            <dt>When</dt>
            <dd className="tab">{formatRange(p.start, p.end)}</dd>
          </div>
          <div>
            <dt>Platform</dt>
            <dd>{p.platform}</dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd>
              {p.technologies.map((t) => (
                <span key={t} style={{ display: "block" }}>{t}</span>
              ))}
            </dd>
          </div>
          {links.length > 0 && (
            <div>
              <dt>Links</dt>
              <dd>
                {links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" style={{ display: "block", width: "fit-content" }}>
                    {l.label}
                  </a>
                ))}
              </dd>
            </div>
          )}
        </dl>

        <div className="case-content">
          {p.image && (
            <figure className="fig">
              <div className="media">
                <Image src={p.image} alt={p.imageAlt} fill priority sizes="(max-width: 1024px) 100vw, 900px" />
              </div>
              <figcaption className="cap muted">{p.imageAlt}</figcaption>
            </figure>
          )}
          {p.longDescription && (
            <Block title="About">
              {paragraphs(p.longDescription).map((t) => (
                <p key={t}>{t}</p>
              ))}
            </Block>
          )}
          {p.problem && (
            <Block title="Problem">
              <p>{p.problem}</p>
            </Block>
          )}
          {p.solution && (
            <Block title="Solution">
              <p>{p.solution}</p>
            </Block>
          )}
          {p.keyContributions && (
            <Block title="What I built">
              <ul className="dash">
                {p.keyContributions.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Block>
          )}
        </div>
      </div>

      <nav className="pager" aria-label="More projects">
        {earlier && (
          <Link href={`/projects/${earlier.slug}`} replace={inSheet} scroll={!inSheet} data-pager="prev">
            <span className="cap muted">Earlier</span>
            <span className="pname">{earlier.title}</span>
          </Link>
        )}
        {later && (
          <Link className="next" href={`/projects/${later.slug}`} replace={inSheet} scroll={!inSheet} data-pager="next">
            <span className="cap muted">Later</span>
            <span className="pname">{later.title}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
