import Header from "@/components/Header";
import Timeline, { TimelineBar, TimelineLane } from "@/components/Timeline";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { experiences, formatRange, monthIndex, timeline } from "@/data/portfolio";

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

// The Skills section of ~/Riz/Latex/CV/TeukuFazarizBasya_CV.tex. Keep the two in step.
const tools = [
  ["Cloud", "AWS (EC2, VPC, EKS, ECR, S3, IAM, RDS, ElastiCache, Route 53, Secrets Manager, CloudWatch), GCP (GKE)"],
  ["Containers and Kubernetes", "Docker, Kubernetes (EKS, kubeadm, kind), Helm"],
  ["GitOps and CI/CD", "Argo CD, Argo Rollouts, GitLab CI, Bitbucket Pipelines, Jenkins, SonarQube"],
  ["Infrastructure as code", "Terraform, Ansible, Packer"],
  ["Observability", "Grafana, Prometheus, Grafana Alloy, Datadog, k6"],
  ["Platform engineering", "Backstage"],
  ["Databases", "PostgreSQL, Redis"],
  ["Linux and networking", "Ubuntu, systemd, Nginx, DNS, TLS"],
  ["Languages", "Bash, Go, Python"],
];

export default function Home() {
  return (
    <div className="page">
      <Header />
      <main id="main-content">
        <section className="hero grid" aria-label="Introduction" data-shape="0">
          <h1 className="headline">I’m Riz, a DevOps engineer based in Jakarta.</h1>
          <p className="lead">
            I work on CI/CD, Kubernetes and GitOps. Before DevOps I built iOS and Mac apps, and one of them, RiSTOCK,
            is on the App Store.
          </p>
          <p className="avail">Open to DevOps, platform, cloud and SRE roles. Remote, or on-site in Indonesia.</p>
        </section>

        <Timeline
          rows={rows}
          startYear={startYear}
          startMonth={startMonth}
          months={monthIndex(timeline.end) + 1}
          initial="planpal-kubernetes"
        />

        <section className="section grid" aria-labelledby="experience-heading" data-shape="2">
          <h2 id="experience-heading">Experience</h2>
          <div className="list">
            {[...experiences].sort(byStart).reverse().map((exp) => (
              <div className="entry" key={exp.title}>
                <p className="when tab">{formatRange(exp.start, exp.end)}</p>
                <div className="body">
                  <h3>
                    {exp.title}
                    {/* nowrap, not U+2011: keeps "S-Quantum" in one piece and still findable with Ctrl+F */}
                    {exp.host && <span style={{ whiteSpace: "nowrap" }}> @ {exp.host}</span>}
                  </h3>
                  <p className="muted">{exp.role}</p>
                  <p>{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section grid" aria-labelledby="tools-heading" data-shape="3">
          <h2 id="tools-heading">Tools</h2>
          <dl className="list">
            {tools.map(([area, names]) => (
              <div className="entry" key={area}>
                <dt className="when">{area}</dt>
                <dd className="body">{names}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="section grid" aria-labelledby="education-heading" data-shape="4">
          <h2 id="education-heading">Education</h2>
          <div className="list">
            <div className="entry">
              <p className="when tab">2022–2026</p>
              <div className="body">
                <h3>Multimedia Nusantara University</h3>
                <p className="muted">Computer Science (S.Kom), GPA 3.61 / 4.00. Graduated October 2026.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section grid" aria-labelledby="awards-heading" data-shape="5">
          <h2 id="awards-heading">Awards</h2>
          <div className="list">
            <div className="entry">
              <p className="when tab">2026</p>
              <div className="body">
                <h3>Swift Student Challenge winner</h3>
                <p className="muted">Apple. Groove Haven, a digital vinyl experience built with RealityKit.</p>
                <p>
                  <a href="/certificates/swift-student-challenge-2026.pdf" target="_blank" rel="noopener noreferrer">
                    Certificate (PDF)<span aria-hidden="true"> ↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </p>
              </div>
            </div>
            <div className="entry">
              <p className="when tab">2026</p>
              <div className="body">
                <h3>IT Specialist: Networking</h3>
                <p className="muted">Certiport certification.</p>
                <p>
                  <a
                    href="https://www.credly.com/badges/c7262b99-53e7-499e-94d8-bea06c46843a/public_url"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Verify on Credly<span aria-hidden="true"> ↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
