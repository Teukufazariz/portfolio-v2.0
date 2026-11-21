import { CaseHead, Figure, Next, Page, Part } from "@/components/parts";
import { caseStudyMetadata } from "@/app/share";
import beforeAfter from "@/assets/work/nanovest-before-after.png";

export const generateMetadata = caseStudyMetadata(
  "nanovest",
  "Nanovest",
  "Case study of an internal developer portal built on Backstage by a team of four as a capstone at Nanovest. Each service gets one page, read-only, for all four environments.",
);

export default function Nanovest() {
  return (
    <Page mood="nanovest">
      <CaseHead
        kicker="Case study 01 · Institute capstone · Sep – Nov 2026"
        title="Nanovest"
        lede={
          <>
            An internal developer portal for Nanovest, built on <em>Backstage</em> by a team of four in eight weeks.
            Each service gets <em>one page</em> that shows its deployments, pods, monitoring, logs and owner. It only
            reads, across all four environments.
          </>
        }
        facts={[
          ["When", "Sep – Nov 2026"],
          ["Team", "Four, with two mentors"],
          ["Access", "View-only on every system the portal reads"],
          ["Stack", "Backstage, GKE, Cloud SQL, Argo CD, Jenkins, Datadog, Bitbucket"],
        ]}
      />

      <Part label="The problem">
        <h2>One service, eight tools, four environments</h2>
        <p>
          To check on one service, an engineer had to open eight tools. Bitbucket held the code, Jenkins the builds and
          deploys, Argo CD the sync status, GKE the pods, Datadog the monitors and traces, Cloud Logging the logs,
          Cloud SQL the database and Cloud Scheduler the jobs.
        </p>
        <p>
          Six of those have a separate copy for each of the four environments (dev, QA, staging and production). Datadog has two,
          and Bitbucket has one. That is up to 27 places to look for one service.
        </p>
        <p>
          The service list also didn’t say who owned what. Every one of the 41 services carried the same team name.
        </p>
        <Figure
          src={beforeAfter}
          alt="On the left, eight tools with a square for each environment they have to be checked in, 27 squares in all. On the right, one page per service with a dev, QA, staging and production switch and a tab for each tool."
          caption="Where the answer lived, and where it lives now. Each square is one place to look."
        />
      </Part>

      <Part label="What we built">
        <h2>One page per service</h2>
        <p>
          The portal lists all 41 services by itself. It reads the infrastructure repository every 30 minutes, so
          nobody writes the list by hand. Each service page has a tab for deploys, pods, monitors, logs, database and
          scheduled jobs, and a switch for dev, QA, staging and production.
        </p>
        <p>
          It can’t deploy, sync or delete anything. The browser only talks to the portal, and the portal only reads
          from each tool.
        </p>
        <ol className="flow">
          <li><b>Engineer</b>In a browser on the company VPN, signed in with Google.</li>
          <li className="hi"><b>Portal</b>One Backstage pod in the development cluster.</li>
          <li><b>Reads only</b>Bitbucket, Jenkins, Argo CD, GKE, Datadog, Cloud Logging, Cloud SQL, Cloud Scheduler.</li>
          <li><b>In four environments</b>Dev, QA, staging and production.</li>
        </ol>
        <p>
          We chose Backstage because a portal written from scratch didn’t fit two months. Backstage is open source and
          already has plugins for Kubernetes, Argo CD and Jenkins. It is deployed the same way as every other Nanovest
          service. Jenkins builds the image and Argo CD syncs it.
        </p>
      </Part>

      <Part label="My part">
        <h2>Four tabs, four environments, and getting it running</h2>
        <ul>
          <li>
            The Datadog tab, which nobody assigned to me. It shows a service’s monitors with the worst state first,
            its request rate, error rate and slowest endpoints, and recent errors and traces.
          </li>
          <li>The Database tab, the Logs tab, and the Scheduler tab for a service’s scheduled jobs.</li>
          <li>
            Four environments on every tab. The Backstage plugins expect one of each tool, so each tab had to be
            pointed at four.
          </li>
          <li>
            A safer route to Datadog. The first version passed along any read request using the portal’s key. I
            replaced it with one that allows only the requests the tabs make.
          </li>
          <li>
            Getting it running on the cluster. That meant the production settings, a build that couldn’t start
            because it asked for machines that didn’t exist, and the portal’s connection to Argo CD.
          </li>
          <li>
            A rule that shows a service’s tabs only to its owning team. It is built and tested, and switched off for
            now.
          </li>
        </ul>
      </Part>

      <section className="scene" data-scene="" aria-labelledby="s-incident">
        <div className="pin solo">
          <h2 className="label scene-head" id="s-incident"><b>A problem I fixed</b> · deploys that hung, October 2026</h2>
          <p className="numeral gauge" aria-hidden="true">
            <span className="over" data-scrub="int" data-from="20" data-to="40" data-at="0.08,0.6">40</span>
            <span className="of">/ 25</span>
          </p>
          <p className="numeral-note"><span className="sr-only">About 40 </span>database connections wanted during a deploy, against 25 allowed</p>
          <div className="rule"><i /></div>
          <div className="cols">
            <div data-at="0.1,0.26">
              <h3 className="label">The limit</h3>
              <p>The database allowed 25 connections and two other apps shared it. One portal pod used about 20.</p>
            </div>
            <div data-at="0.3,0.46">
              <h3 className="label">The deploy</h3>
              <p>Each deploy started the new pod before stopping the old one, so for a while two pods wanted about 40.</p>
            </div>
            <div data-at="0.5,0.66">
              <h3 className="label">Why it stayed down</h3>
              <p>The new pod failed to start but kept running, so Kubernetes saw nothing to restart.</p>
            </div>
          </div>
        </div>
      </section>

      <Part label="The fix">
        <h2>Two deploys that never finished</h2>
        <p>
          In October two deploys hung, the second for 21 hours. I traced it to the overlap above. Nanovest’s
          infrastructure team raised the limit to 50, since my access was view-only.
        </p>
        <p>
          My change makes the old pod stop before the new one starts, and caps how many connections each part of the
          portal opens. The cost is a short outage on each deploy.
        </p>
      </Part>

      <Part label="Result">
        <h2>27 places to look became one page</h2>
        <ul>
          <li>All 41 services are listed, and the list is generated, not written by hand.</li>
          <li>All four environments are on one page, production included.</li>
          <li>24 of the 41 services show an owning team. 17 don’t yet.</li>
        </ul>
        <h3>What an engineer can do now</h3>
        <ul>
          <li>Follow a deploy from dev to production in one tab.</li>
          <li>Read production logs without opening the GCP console.</li>
          <li>See the owning team on the service page.</li>
        </ul>
        <h3>What it doesn’t do</h3>
        <ul>
          <li>We didn’t collect usage numbers. There was no time.</li>
          <li>It runs as one pod in the development cluster. It reads production but doesn’t run there.</li>
          <li>The owning-team rule is switched off, so any signed-in engineer can open any service.</li>
        </ul>
        <h3>The team’s work, not mine</h3>
        <p>
          Teammates built the generator that lists the services, the theme and sign-in, the Kubernetes tab, usage
          analytics and the documentation site. Across the four of us the project came to 65 merged pull requests and
          over 500 automated tests.
        </p>
      </Part>

      <Next href="/work/planpal" title="PlanPal" />
    </Page>
  );
}
