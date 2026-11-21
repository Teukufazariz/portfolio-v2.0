import Link from "next/link";
import { Figure, Kinetic, Page, Reveal, Words } from "@/components/parts";
import { earlier, experience, site, tools } from "@/content";
import aformArchitecture from "@/assets/work/aform-architecture.png";
import planpalEks from "@/assets/work/planpal-eks.jpg";

export default function Home() {
  return (
    <Page mood="home">
      <section className="hero">
        <p className="label hero-kicker">{site.role} · {site.place}</p>
        <h1 className="display">
          <Words>
            I’m Riz. I get code from{" "}
            <Link href="/work/aform" data-print="/prints/aform.jpg" data-print-caption="aform · a pipeline that tests, builds and deploys each change"><em>a&nbsp;commit</em></Link>{" "}
            to{" "}
            <Link href="/work/planpal" data-print="/prints/planpal-eks.jpg" data-print-caption="PlanPal · my deployment on Amazon EKS"><em>a&nbsp;running service</em></Link>,
            and make it easy to{" "}
            <Link href="/work/nanovest" data-print="/prints/nanovest.jpg" data-print-caption="Nanovest · one page per service"><em>see what it’s doing</em></Link>.
          </Words>
        </h1>
        <div className="hero-sub">
          <div className="hero-bio">
            <p>
              I started out building web and iOS apps, then moved to infrastructure at the Apple Developer Institute
              for DevOps, where I worked with Kubernetes, AWS, Terraform, and CI/CD.
            </p>
            <p>Open to DevOps, platform, cloud, and SRE roles, remote or in Indonesia.</p>
          </div>
          <p className="links label">
            <a href={site.cv}>CV (PDF) ↗</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={site.github}>GitHub ↗</a>
            <a href={site.linkedin}>LinkedIn ↗</a>
          </p>
        </div>
      </section>

      <section className="section" id="work">
        <h2 className="label">Work · 2026</h2>
        <Reveal className="display intro-line">
          Three projects from the <em>Apple Developer Institute for DevOps</em>, a full-time program that ran from March
          to November 2026. Newest first.
        </Reveal>
        <p className="note">Each was built in a small team. The case studies say which parts are mine.</p>
      </section>

      <section className="scene" data-scene="" aria-labelledby="w-nanovest">
        <div className="pin">
          <div className="scene-main">
            <p className="label scene-head">01 · Capstone at Nanovest, team of four · Sep – Nov 2026</p>
            <h2 className="scene-title" id="w-nanovest">A developer portal for Nanovest’s 41 services</h2>
            <p className="scene-what">
              Each service gets one page with its deployments, pods, monitoring, logs and owner. Read-only, for all
              four environments.
            </p>
            <p className="numeral" aria-hidden="true">
              <span className="was" data-at="0.1,0.56">27</span>
              <svg className="arrow" viewBox="0 0 70 50"><path d="M2 25h64M48 7l18 18-18 18" /></svg>
              <span className="now" data-at="0.4,0.62">1</span>
            </p>
            <p className="numeral-note"><span className="sr-only">From up to 27 down to 1: </span>places to look for one service</p>
            <div className="rule"><i /></div>
            <div className="cols">
              <div data-at="0.1,0.28">
                <h3 className="label">The problem</h3>
                <p>Up to 27 places: eight tools, most of them once for each of four environments.</p>
              </div>
              <div data-at="0.28,0.46">
                <h3 className="label">What we built</h3>
                <p>Four of us built it on Backstage in eight weeks. It only reads; it can’t change anything.</p>
              </div>
              <div data-at="0.46,0.64">
                <h3 className="label">My part</h3>
                <p>The Datadog, Database, Scheduler and Logs tabs, four-environment support on every tab, and the fix for hung deploys.</p>
              </div>
            </div>
            <Link className="label more" href="/work/nanovest">Read the Nanovest case study →</Link>
          </div>
          <ul className="sources" aria-label="The eight tools one service was spread over, and what replaced them">
            <li data-at="0.08,0.16">Bitbucket <small>code</small></li>
            <li data-at="0.13,0.21">Jenkins <small>builds, deploys</small></li>
            <li data-at="0.18,0.26">Argo CD <small>sync status</small></li>
            <li data-at="0.23,0.31">GKE <small>pods</small></li>
            <li data-at="0.28,0.36">Datadog <small>monitors, traces</small></li>
            <li data-at="0.33,0.41">Cloud Logging <small>logs</small></li>
            <li data-at="0.38,0.46">Cloud SQL <small>database</small></li>
            <li data-at="0.43,0.51">Cloud Scheduler <small>jobs</small></li>
            <li className="one" data-at="0.48,0.64">one page per service</li>
          </ul>
        </div>
      </section>

      <section className="scene" data-scene="" aria-labelledby="w-planpal">
        <div className="pin">
          <div className="scene-main">
            <p className="label scene-head">02 · Challenges 3 and 4, teams of three · Jun – Sep 2026</p>
            <h2 className="scene-title" id="w-planpal">PlanPal: a meeting scheduler, run on AWS and Kubernetes</h2>
            <p className="scene-what">
              In a team of three, we put its AWS infrastructure into Terraform and Ansible. Then I built my own
              Kubernetes deployment of it, from a laptop to Amazon EKS.
            </p>
            <p className="numeral" aria-hidden="true">
              <span data-scrub="mmss" data-from="2844" data-to="1080" data-at="0.06,0.6">18:00</span>
            </p>
            <p className="numeral-note"><span className="sr-only">18:00 </span>minutes to test and build the backend from scratch, down from 47:24</p>
            <div className="rule"><i /></div>
            <div className="cols">
              <div data-at="0.1,0.28">
                <h3 className="label">The problem</h3>
                <p>Every run compiled the Rust backend twice, about 590 crates each time, on a 2-core machine.</p>
              </div>
              <div data-at="0.28,0.46">
                <h3 className="label">What I changed</h3>
                <p>One job that compiles once, on a larger spot machine.</p>
              </div>
              <div data-at="0.46,0.64">
                <h3 className="label">Result</h3>
                <p>18 minutes instead of 47, on a machine that lists at about $22 a month instead of $38.</p>
              </div>
            </div>
            <Link className="label more" href="/work/planpal">Read the PlanPal case study →</Link>
          </div>
          <Figure
            src={planpalEks}
            alt="AWS architecture diagram of the PlanPal EKS deployment across three availability zones, with an ALB, an EKS node group and RDS."
            caption="My EKS deployment: three zones, ALB in public subnets, RDS with no internet route"
            at="0.18,0.66"
          />
        </div>
      </section>

      <section className="scene" data-scene="" aria-labelledby="w-aform">
        <div className="pin">
          <div className="scene-main">
            <p className="label scene-head">03 · Challenges 1 and 2, teams of three · Apr – Jun 2026</p>
            <h2 className="scene-title" id="w-aform">aform: a web app, from a laptop to three environments</h2>
            <p className="scene-what">
              I deployed a Go form builder to two AWS servers with my own Bash scripts. Then I built the team’s
              pipeline, which tests every change and releases to dev, staging and production.
            </p>
            <p className="numeral" aria-hidden="true">
              <span data-scrub="pct1" data-from="16.7" data-to="94.4" data-at="0.06,0.6">94.4</span><small>%</small>
            </p>
            <p className="numeral-note"><span className="sr-only">94.4% </span>of the app’s code covered by tests, up from 16.7%</p>
            <div className="rule"><i /></div>
            <div className="cols">
              <div data-at="0.1,0.28">
                <h3 className="label">The problem</h3>
                <p>The app ran only on laptops, and nothing checked a change before release.</p>
              </div>
              <div data-at="0.28,0.46">
                <h3 className="label">What I built</h3>
                <p>Scripts that set up two servers from nothing, then a pipeline that builds once and promotes that same build.</p>
              </div>
              <div data-at="0.46,0.64">
                <h3 className="label">Result</h3>
                <p>The pipeline fails any change below 90% coverage, and a release that fails its health check rolls back by itself.</p>
              </div>
            </div>
            <Link className="label more" href="/work/aform">Read the aform case study →</Link>
          </div>
          <Figure
            src={aformArchitecture}
            alt="Architecture diagram of aform: Nginx, the Go web server and worker in a public subnet; RabbitMQ, PostgreSQL and Redis in a private subnet."
            caption="aform in each environment: a stateless and a stateful tier in one VPC"
            at="0.18,0.66"
          />
        </div>
      </section>

      <section className="section" id="earlier">
        <h2 className="label">Earlier work · 2025 · Apple Developer Academy and an internship</h2>
        <div className="rows">
          {earlier.map((e) => (
            <article className="row" key={e.name} data-print={e.print?.src} data-print-caption={e.print?.caption}>
              <div>
                <h3>{e.name}</h3>
                <p className="label meta">{e.dates}</p>
              </div>
              <p>{e.text}</p>
              <div className="label side">
                <div>{e.role}</div>
                <div>{e.stack}</div>
                {e.link && <a href={e.link.href}>{e.link.label} ↗</a>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="experience">
        <h2 className="label">Experience</h2>
        <div className="rows wide">
          {experience.map((x) => (
            <article className="row" key={x.org}>
              <div>
                <h3>{x.org}</h3>
                <p className="label meta">{x.dates}</p>
              </div>
              <div>
                <p className="role">{x.role}</p>
                <p>{x.text}</p>
              </div>
              <div className="label side">{x.place}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="label">Education</h2>
        <div className="rows wide">
          <article className="row">
            <div>
              <h3>Multimedia Nusantara University</h3>
              <p className="label meta">Aug 2022 – Oct 2026</p>
            </div>
            <p>
              Bachelor of Computer Science (S.Kom), GPA 3.61 of 4.00.
            </p>
            <div />
          </article>
        </div>
      </section>

      <section className="section">
        <h2 className="label">Awards and certifications</h2>
        <div className="rows wide">
          <article className="row">
            <div>
              <h3>Swift Student Challenge winner</h3>
              <p className="label meta">Apple · 2026</p>
            </div>
            <p>
              For Groove Haven, a digital vinyl experience built with RealityKit.{" "}
              <a href="/certificates/swift-student-challenge-2026.pdf">Certificate (PDF)</a>
            </p>
            <div className="label side">Award</div>
          </article>
          <article className="row">
            <div>
              <h3>IT Specialist: Networking</h3>
              <p className="label meta">Certiport · 2026</p>
            </div>
            <div />
            <div className="label side">Certification</div>
          </article>
        </div>
      </section>

      <section className="section">
        <h2 className="label">Tools</h2>
        <dl className="tools">
          {tools.map(([group, list]) => (
            <div key={group} style={{ display: "contents" }}>
              <dt className="label">{group}</dt>
              <dd>{list}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section contact" id="contact">
        <h2 className="label">Contact</h2>
        <a className="mail" href={`mailto:${site.email}`} aria-label={`Email ${site.email}`}>
          <Kinetic text="teukufazarizbasya" />
          <br />
          <Kinetic text="@gmail.com" />
        </a>
        <p className="links label">
          <a href={site.cv}>CV (PDF) ↗</a>
          <a href={site.linkedin}>LinkedIn ↗</a>
          <a href={site.github}>GitHub ↗</a>
        </p>
      </section>
    </Page>
  );
}
