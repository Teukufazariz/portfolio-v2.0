import { CaseHead, Figure, Next, Page, Part } from "@/components/parts";
import { caseStudyMetadata } from "@/app/share";
import architecture from "@/assets/work/aform-architecture.png";
import cloudwatch from "@/assets/work/aform-cloudwatch.jpg";
import monitor from "@/assets/work/aform-monitor.png";
import privateTier from "@/assets/work/aform-private.png";
import publicTier from "@/assets/work/aform-public.png";

export const generateMetadata = caseStudyMetadata(
  "aform",
  "aform",
  "Case study of a web app taken from a laptop to two AWS servers with Bash scripts, then given a team pipeline that tests every change and releases it to dev, staging and production.",
);

export default function Aform() {
  return (
    <Page mood="aform">
      <CaseHead
        kicker="Case study 03 · Institute challenges 1 and 2 · Apr – Jun 2026"
        title="aform"
        lede={
          <>
            aform is a web app for building forms, written by the program’s facilitators. It ran only on laptops. I
            put it on <em>two AWS servers</em> with my own scripts, then built the team’s <em>pipeline</em> that tests
            every change and releases it to dev, staging and production.
          </>
        }
        facts={[
          ["When", "Apr – Jun 2026, two challenges"],
          ["Team", "Three people each time, with different teammates"],
          ["My part", "The server setup scripts, the pipeline, and the deploy, promote and rollback scripts. I ran staging."],
          ["Stack", "AWS EC2, Bash, Nginx, systemd, PostgreSQL, Redis, RabbitMQ, Secrets Manager, S3, Bitbucket Pipelines, SonarQube, k6"],
        ]}
      />

      <Part label="The problem">
        <h2>An app that ran only on laptops</h2>
        <p>
          The first brief was to run the app on a Linux cloud server on a small budget. It had to be reachable,
          secure, monitored and documented.
        </p>
        <p>
          The second brief was to automate its releases across three environments, so that nobody deploys by hand.
        </p>
        <p>
          One thing about the app shaped the setup. A form submission doesn’t wait for the database. The server puts
          it on a queue and answers at once, and a separate worker saves it.
        </p>
      </Part>

      <Part label="01 · Two servers">
        <h2>Two servers, set up by one script</h2>
        <p>
          The group of three shared one design, and each of us deployed it with our own scripts. Mine used two small
          servers in AWS Jakarta. The web server and the app sit on a public one. The database, cache and queue sit
          on a private one with no public address.
        </p>
        <p>
          One script launches both servers. Another builds the app on my laptop and copies it over. Then I log in to
          the public server and run <code>server.sh</code>, which sets up everything, the private server included,
          and leaves no secrets file behind.
        </p>
        <ol className="flow files">
          <li><b>ec2Setup.sh</b>Launches both servers and gives the public one a fixed address.</li>
          <li><b>deploy.sh</b>Builds the app for the servers’ ARM chips and copies it over.</li>
          <li className="hi"><b>server.sh</b>Reads three secrets through the server’s own role, locks down SSH, then sets up the private server.</li>
          <li><b>db.sh, ssl_setup.sh</b>Install the database, cache and queue, create a private certificate authority and turn on TLS for all three.</li>
          <li><b>server.sh, continued</b>Database migrations, services, Nginx, an HTTPS certificate, the firewall and monitoring.</li>
        </ol>

        <h3>What the scripts guarantee</h3>
        <ul>
          <li>Secrets live in AWS Secrets Manager. Nothing secret is written to disk.</li>
          <li>Only the public server has an AWS role. A reviewer asked for that, and I changed the script the same day.</li>
          <li>Everything between the two servers is encrypted, with certificates from my own certificate authority.</li>
          <li>Nginx serves HTTPS and limits each address to 10 requests a second.</li>
          <li>The restore script checks a backup’s checksum before restoring it. I tested a restore.</li>
        </ul>

        <div className="pair">
          <Figure
            src={monitor}
            alt="Terminal output of a monitor script listing CPU and memory for the database, cache, queue, app server, worker and Nginx."
            caption="My monitor script during a local load test. The app stayed under 200 MB, which is why 2 GB servers were enough."
          />
          <Figure
            src={cloudwatch}
            alt="CloudWatch dashboard with graphs for CPU, memory, disk, network, uptime, throughput, error rate and response times."
            caption="The CloudWatch dashboard the script creates, with 13 graphs for the server and the app."
          />
        </div>
      </Part>

      <Part label="02 · The pipeline">
        <h2>One build, three environments</h2>
        <p>
          In the next challenge a new team of three ran one environment each. I ran staging. A teammate committed a
          template pipeline file. I replaced it that afternoon and wrote 56 of the commits to it that followed, along
          with the deploy, promote and rollback scripts every environment used.
        </p>
        <ol className="flow">
          <li><b>Check</b>Lint and unit tests on every push.</li>
          <li><b>Gate</b>Fails below 90% test coverage, then a SonarQube scan.</li>
          <li><b>Build</b>One build for each version tag.</li>
          <li><b>Store</b>Saved in S3 by environment and version.</li>
          <li className="hi"><b>Deploy</b>Each server pulls its build with its own role. Production waits for a click.</li>
        </ol>
        <p>
          The app is built once. Promoting it copies that same build from one environment’s folder to the next, so
          what was tested in dev is exactly what reaches production.
        </p>
        <p>
          The deploy script runs on the server. It installs the new version, restarts the app and checks it up to
          five times. If the check fails it puts the previous version back and fails the pipeline. Rolling back by
          hand is one pipeline for each environment.
        </p>

        <Figure
          src={architecture}
          alt="Architecture diagram. A browser reaches Nginx over HTTPS, the web server puts submissions on a queue, a worker saves them to PostgreSQL, Redis holds sessions, and S3 and Secrets Manager sit outside the network."
          caption="Each environment has two servers in one private network. The data services can only be reached from the public server."
        />
        <div className="pair">
          <Figure src={publicTier} alt="Diagram of the public server with Nginx, the app server and worker, and the monitoring agent." caption="The public server" />
          <Figure src={privateTier} alt="Diagram of the private server with PostgreSQL, Redis and RabbitMQ, each over TLS." caption="The private server" />
        </div>
      </Part>

      <section className="scene" data-scene="" aria-labelledby="s-coverage">
        <div className="pin solo">
          <h2 className="label scene-head" id="s-coverage"><b>Test coverage</b> · the gate raised in four steps</h2>
          <p className="numeral" aria-hidden="true">
            <span data-scrub="pct1" data-from="16.7" data-to="94.4" data-at="0.06,0.7">94.4</span><small>%</small>
          </p>
          <p className="numeral-note"><span className="sr-only">94.4% </span>of the app’s code covered by 182 tests, up from 16.7%</p>
          <div className="rule"><i /></div>
          <div className="cols four">
            <div data-at="0.06,0.16">
              <h3 className="label">16.7% · gate 15</h3>
              <p>Models, settings, CSV export and image storage.</p>
            </div>
            <div data-at="0.2,0.3">
              <h3 className="label">37.1% · gate 35</h3>
              <p>Services, tested against a stand-in database.</p>
            </div>
            <div data-at="0.31,0.41">
              <h3 className="label">49.4% · gate 45</h3>
              <p>Code that talks to real services split from code that can be tested.</p>
            </div>
            <div data-at="0.58,0.72">
              <h3 className="label">94.4% · gate 90</h3>
              <p>Request handlers and middleware.</p>
            </div>
          </div>
        </div>
      </section>

      <Part label="Result">
        <h2>Releases that check themselves</h2>
        <ul>
          <li>A change that drops test coverage below 90% fails the pipeline.</li>
          <li>A release that fails its health check is rolled back automatically.</li>
          <li>The team timed a fresh server going live over HTTPS at about 9 minutes with my setup script.</li>
        </ul>

        <h3>Problems on the way</h3>
        <ul>
          <li>Our own build machine was ARM and the SonarQube scanner only ran on Intel, so that step crashed. It ran on Bitbucket’s machines until 28 May.</li>
          <li>The scanner rejected SonarQube’s certificate. I first skipped the check, then replaced that with a proper trust store.</li>
          <li>The first promote script copied dev builds into production under their dev names. I added a rename.</li>
        </ul>

        <h3>The tests</h3>
        <p>
          Claude Code wrote the tests. My part was the plan. I split the code that talks to real services from the
          code that can be tested, put small interfaces in front of it, and raised the gate step by step. The four
          steps took about 17 hours.
        </p>

        <h3>The team’s work, not mine</h3>
        <p>
          A teammate built the monitoring side, with tracing, dashboards and the pipelines that stop and start
          servers. Another owned the write-ups, including a cost audit I co-authored. It found a shared NAT gateway
          missing from our proposal, at about $52.54 a month, and four savings projected at about 18%. Whether they
          were applied isn’t recorded.
        </p>

        <h3>What it doesn’t do</h3>
        <ul>
          <li>The network was created by hand in the AWS console, not by a script.</li>
          <li>Backups ran by hand. I never scheduled them.</li>
          <li>The pipeline’s AWS credentials are stored repository variables, and deploys go over SSH.</li>
          <li>A release restarts the app in place. There is no second copy to switch over to.</li>
          <li>The app’s cache and queue connections are encrypted but don’t verify the server’s certificate.</li>
          <li>My first deploy script matched a teammate’s from the same afternoon. The health check, the automatic rollback and promotion are what I added.</li>
        </ul>
      </Part>

      <Next href="/work/nanovest" title="Nanovest" />
    </Page>
  );
}
