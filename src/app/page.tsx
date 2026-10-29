import Header from "@/components/Header";
import Timeline, { TimelineBar, TimelineLane } from "@/components/Timeline";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { allProjects, experiences, formatRange, monthIndex, timeline } from "@/data/portfolio";

const byStart = (a: { start: string }, b: { start: string }) => a.start.localeCompare(b.start);

// Each employer as a lane, followed by the projects made there, oldest first.
const rows = [...experiences].sort(byStart).flatMap((exp): (TimelineLane | TimelineBar)[] => [
  { kind: "lane", title: exp.title, role: exp.role, start: monthIndex(exp.start), end: monthIndex(exp.end) },
  ...[...exp.projects].sort(byStart).map((p): TimelineBar => ({
    kind: "bar",
    slug: p.slug,
    title: p.title,
    tagline: p.tagline,
    when: formatRange(p.start, p.end),
    platform: p.platform,
    role: p.role,
    context: p.context ?? exp.title,
    image: p.image,
    imageAlt: p.imageAlt,
    appStoreUrl: p.appStoreUrl,
    start: monthIndex(p.start),
    end: monthIndex(p.end),
  })),
]);

const [startYear, startMonth] = timeline.start.split("-").map(Number);

export default function Home() {
  return (
    <div className="page">
      <Header />
      <main id="main-content">
        <section className="hero grid" aria-label="Introduction">
          <h1 className="headline">I’m Riz. I build native apps for iPhone and Mac.</h1>
          <p className="lead">
            At the Apple Developer Academy I helped ship RiSTOCK, now on the Mac App Store. This is everything
            I’ve built since January 2025.
          </p>
        </section>

        <Timeline
          rows={rows}
          startYear={startYear}
          startMonth={startMonth}
          months={monthIndex(timeline.end) + 1}
          initial={allProjects[0].slug}
        />

        <section className="section grid" aria-labelledby="education-heading">
          <h2 id="education-heading">Education</h2>
          <div className="edu">
            <p className="when tab">2022–2026</p>
            <div className="body">
              <h3>Multimedia Nusantara University</h3>
              <p className="muted">Computer Science, GPA 3.63 / 4.00</p>
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
