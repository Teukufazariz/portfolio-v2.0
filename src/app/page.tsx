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
        <section className="hero grid" aria-label="Introduction">
          <h1 className="headline">I’m Riz. I get software from a git push to production.</h1>
          <p className="lead">
            I cut a Rust backend’s cold CI pipeline from 47:24 to 18:00 and ran canary releases on Amazon EKS
            through Argo CD and Argo Rollouts. With a team of four, I’m now building a Backstage developer portal at
            Nanovest for about 50 services. Before DevOps I built iOS and Mac apps; one of them, RiSTOCK, is on the
            App Store.
          </p>
        </section>

        <Timeline
          rows={rows}
          startYear={startYear}
          startMonth={startMonth}
          months={monthIndex(timeline.end) + 1}
          initial="planpal-kubernetes"
        />

        <section className="section grid" aria-labelledby="tools-heading">
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

        <section className="section grid" aria-labelledby="education-heading">
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

        <section className="section grid" aria-labelledby="awards-heading">
          <h2 id="awards-heading">Awards</h2>
          <div className="list">
            <div className="entry">
              <p className="when tab">2026</p>
              <div className="body">
                <h3>Swift Student Challenge winner</h3>
                <p className="muted">Apple. Groove Haven, a digital vinyl experience built with RealityKit.</p>
              </div>
            </div>
            <div className="entry">
              <p className="when tab">2026</p>
              <div className="body">
                <h3>IT Specialist: Networking</h3>
                <p className="muted">Certiport certification.</p>
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
