import { CaseHead, Figure, Next, Page, Part } from "@/components/parts";
import { caseStudyMetadata } from "@/app/share";
import eks from "@/assets/work/planpal-eks.jpg";
import iac from "@/assets/work/planpal-iac.png";

export const generateMetadata = caseStudyMetadata(
  "planpal",
  "PlanPal",
  "Case study of a meeting scheduler whose AWS infrastructure a team of three put into Terraform, Ansible and Packer, followed by my own Kubernetes deployment of it from a laptop to Amazon EKS.",
);

export default function PlanPal() {
  return (
    <Page mood="planpal">
      <CaseHead
        kicker="Case study 02 · Institute challenges 3 and 4 · Jun – Sep 2026"
        title="PlanPal"
        lede={
          <>
            PlanPal is a meeting scheduler with an AI chat. It has a Rust backend, a web app and an iOS app. In a team
            of three, we put its AWS infrastructure into <em>Terraform, Ansible and Packer</em>. Then I built my own
            deployment of it on <em>Kubernetes</em>, from a laptop to Amazon EKS.
          </>
        }
        facts={[
          ["When", "Jun – Sep 2026, two challenges"],
          ["Team", "Three people each time, with different teammates"],
          ["My part", "In the infrastructure, the database tier, network rules, DNS and monitoring. On Kubernetes, one of three parallel deployments, mine end to end."],
          ["Stack", "Terraform, Ansible, Packer, AWS (RDS, ElastiCache, EKS, ECR), Helm, Argo CD, Argo Rollouts, GitLab CI, k6"],
        ]}
      />

      <Part label="The problem">
        <h2>Everything in code, then everything in containers</h2>
        <p>
          The first brief was that nobody should click in the AWS console. Every resource and every server setting
          had to be written as code.
        </p>
        <p>
          The second was that the app should grow with traffic, restart itself when it crashes, and survive a bad
          release.
        </p>
      </Part>

      <Part label="01 · Infrastructure as code" id="iac">
        <h2>Bake once, set up at first boot</h2>
        <p>
          The team built staging and production in Terraform, with a tool called Atlantis running every change from a
          pull request. My part was the database tier and the monitoring stack.
        </p>
        <Figure
          src={iac}
          alt="AWS architecture diagram for PlanPal. A CDN and a load balancer sit in front of staging and production servers, with a message queue, workers, a database, a cache and a monitoring server."
          caption="The AWS layout the team’s Terraform builds, redrawn for this site."
        />

        <h3>What I wrote</h3>
        <ul>
          <li>The database module. It creates encrypted PostgreSQL with no public access and 7 days of backups. Production also runs a standby copy and can’t be deleted by accident.</li>
          <li>The first module for network rules, and the private DNS zone.</li>
          <li>The monitoring stack as Ansible roles for Grafana, Alloy, Prometheus, Loki, Tempo, a NATS exporter and OpenVPN. Seven of the thirteen roles on main are mine.</li>
          <li>Machine images that carry no secrets. On first boot the Grafana server fetches its admin password from Secrets Manager, and the VPN server generates its own keys.</li>
          <li>A limit on what servers report. Alloy forwards about 15 kinds of metric and drops the rest, because in the previous challenge one unbounded label took the cohort’s shared Grafana from about 338 series to about 998,000.</li>
          <li>Tests. 37 Python tests for the role templates and 7 Terraform test runs. The Python tests ran locally and were never wired into the pipeline.</li>
          <li>For the iOS app, build settings for each environment and 91 unit tests, with a coverage check at 80%.</li>
        </ul>

        <h3>Not mine, and not merged</h3>
        <ul>
          <li>Teammates built the base network with Atlantis, the load balancer, the auto-scaling module, the image pipeline and the AI summary of each plan.</li>
          <li>My design for one secret per service stayed on a branch. The team chose one shared secret for each environment.</li>
          <li>My fix that makes a new auto-scaled server fetch the current app at boot never merged.</li>
        </ul>
      </Part>

      <Part label="02 · Kubernetes">
        <h2>Three clusters, one set of manifests</h2>
        <p>Each of the three of us built a separate deployment. Mine went through three clusters.</p>
        <ol className="flow">
          <li><b>Compose</b>Nine services from two images.</li>
          <li><b>kind</b>On a laptop, with autoscaling.</li>
          <li><b>kubeadm</b>Three virtual machines on the group’s Mac mini.</li>
          <li className="hi"><b>Amazon EKS</b>A load balancer, a managed database, secrets from AWS, my Helm chart and Argo CD.</li>
        </ol>
        <p>
          The app’s own configuration survived the move to EKS almost unchanged. What changed was every place the
          platform touches the outside, such as traffic, storage, identity, secrets and images.
        </p>
        <Figure
          src={eks}
          alt="AWS architecture diagram. A load balancer sits in public subnets, cluster servers and a CI server in private subnets, and a database in subnets with no internet route, across three zones."
          caption="My EKS deployment. Three zones, the load balancer in public subnets, servers in private ones, and a database with no route to the internet."
        />

        <h3>How a change ships</h3>
        <p>
          CI never touches the cluster. It builds an image, tags it with the commit, pushes it to the registry,
          records that tag in a Git repository, and stops. Argo CD sees the new tag and applies it. Argo Rollouts
          starts one new pod beside the old ones and waits for me to promote it.
        </p>
        <ol className="flow">
          <li><b>Merge</b>To main, in GitLab.</li>
          <li><b>Build</b>Tests and binaries in one job.</li>
          <li><b>Image</b>Pushed to the registry, tagged by commit.</li>
          <li><b>Promote</b>CI records the tag in Git.</li>
          <li><b>Sync</b>Argo CD applies it.</li>
          <li className="hi"><b>Canary</b>One new pod, paused until I promote.</li>
        </ol>

        <h3>On EKS</h3>
        <ul>
          <li>Secrets come from AWS Secrets Manager, so Git holds pointers and never values.</li>
          <li>Pods get AWS credentials without stored keys, through IRSA and EKS Pod Identity.</li>
          <li>One backend image holds all five Rust programs. Each workload picks one.</li>
        </ul>
      </Part>

      <section className="scene" data-scene="" aria-labelledby="s-pipeline">
        <div className="pin solo">
          <h2 className="label scene-head" id="s-pipeline"><b>Backend pipeline</b> · minutes from scratch</h2>
          <p className="numeral" aria-hidden="true">
            <span data-scrub="mmss" data-from="2844" data-to="1080" data-at="0.06,0.66">18:00</span>
          </p>
          <p className="numeral-note"><span className="sr-only">18 </span>minutes to test and build the backend from scratch, down from 47</p>
          <div className="rule"><i /></div>
          <div className="cols">
            <div data-at="0.1,0.26">
              <h3 className="label">Where the time went</h3>
              <p>88% of the 47 minutes was compiling. One job built about 590 crates for the tests and another built them again for the release, on a 2-core machine.</p>
            </div>
            <div data-at="0.3,0.46">
              <h3 className="label">What I changed</h3>
              <p>One job that compiles once, on a larger spot machine. The image step packages the result instead of compiling again.</p>
            </div>
            <div data-at="0.5,0.66">
              <h3 className="label">The caveat</h3>
              <p>Part of the gain is a machine with twice the CPUs. The timings are from my review deck, not a saved log.</p>
            </div>
          </div>
        </div>
      </section>

      <Part label="Result">
        <h2>Faster builds, and an app that scales itself</h2>
        <ul>
          <li>The backend pipeline takes 18 minutes from scratch, down from 47. The frontend’s went from just over 4 minutes to just over 1.</li>
          <li>Under a load test of 25 users logging in, the API scaled from 2 pods to its cap of 5 with no restarts. The first run had exposed a memory problem, which I fixed.</li>
          <li>CI promoted ten images to the cluster in five days.</li>
        </ul>

        <h3>Cost</h3>
        <p>
          About $330 a month at list price, worked out and not billed. Moving CI to a spot machine took that machine
          from about $38 to $22 a month, with twice the CPU.
        </p>

        <h3>What it doesn’t do</h3>
        <ul>
          <li>Only a production environment exists.</li>
          <li>The cluster was created in the console, and its servers are sized by hand.</li>
          <li>A person decides when a canary is promoted. Nothing measures the new version first.</li>
          <li>The API reports itself healthy even when its database is down, so Kubernetes won’t take that pod out of service.</li>
          <li>A teammate wrote the CI checks for commit style, leaked secrets and dependency audits. I built the delivery half.</li>
        </ul>
      </Part>

      <Next href="/work/aform" title="aform" />
    </Page>
  );
}
