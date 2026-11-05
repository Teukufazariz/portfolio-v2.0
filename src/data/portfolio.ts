export interface Project {
  slug: string;
  title: string;
  /** One short line for the timeline, e.g. "Group booking for snorkeling trips." */
  tagline: string;
  platform: string;
  role: string;
  /** "YYYY-MM", inclusive */
  start: string;
  end: string;
  description: string;
  longDescription?: string;
  problem?: string;
  solution?: string;
  keyContributions?: string[];
  /** Shown after "What I built": limits I know about and what each choice cost */
  tradeoffs?: string[];
  /** Steps from commit to production, drawn as a row of boxes under the case study's summary */
  pipeline?: string[];
  technologies: string[];
  image?: string;
  imageAlt: string;
  context?: string;
  githubUrl?: string;
  demoUrl?: string;
  appStoreUrl?: string;
}

export interface Experience {
  title: string;
  /** Who runs it, as on the CV: shown as "title @ host" in the Experience section, left off the timeline to keep its labels short */
  host?: string;
  role: string;
  /** "YYYY-MM", inclusive */
  start: string;
  end: string;
  description: string;
  achievements?: string[];
  projects: Project[];
}

// Every claim here is checked against ~/Riz/archive (see each chapter's "Don't claim" list) before it goes in.
export const experiences: Experience[] = [
  {
    title: "Apple Developer Institute for DevOps",
    host: "S-Quantum Engine",
    role: "DevOps Engineer",
    start: "2026-03",
    end: "2026-11", // the capstone is planned to end on 27 Nov 2026
    description:
      "A DevOps program run by S-Quantum Engine where small groups work through startup scenarios with Challenge-Based Learning, going from scripted EC2 deployments to CI/CD, Terraform and Kubernetes on Amazon EKS, then a capstone at a real company.",
    achievements: [
      "Moved from Bash deployments on two EC2 instances to CI/CD across three environments, Terraform, and Kubernetes on Amazon EKS with GitOps",
      "Wrote a post-mortem of Slack's 12 May 2020 outage with a group of four",
    ],
    projects: [
      {
        title: "Nanovest portal",
        slug: "nanovest-developer-portal",
        tagline: "Live internally, deployed through GitOps.",
        platform: "Backstage on Kubernetes",
        role: "DevOps Engineer",
        context: "Apple Developer Institute for DevOps",
        start: "2026-09",
        end: "2026-11",
        description:
          "With a team of four, building a Backstage developer portal at Nanovest so developers can look up the company's services in one place instead of across five separate tools.",
        // Nanovest's stack, cluster, service count and hostnames are confidential: keep vendor names and numbers out of this entry.
        longDescription: `Developers kept asking the DevOps team two questions: is my service healthy, and did this pipeline fail in the build or the deploy? The answers were spread across five tools, and none of them recorded who owns each service.

        The portal is live internally and deploys through GitOps. It is the program's capstone and runs until late November 2026; it is not yet in production use.`,
        keyContributions: [
          "Wrote the production app config: hostname, database schema mode and company sign-in",
          "Switched the source-control integration to an API token, wired its secrets, and fixed the image build's agent pod so it could be scheduled",
          "Pointed the portal's GitOps integration at an in-cluster address so its links and data work from inside the cluster, and removed the demo data",
          "On my own initiative, turned a teammate's first monitoring card into a tested module showing each service's metrics and alerts",
        ],
        technologies: ["Backstage", "TypeScript", "Kubernetes", "GitOps"],
        image: "/projects/Nanovest.png",
        imageAlt: "Nanovest developer portal, built on Backstage",
      },
      {
        title: "PlanPal on EKS",
        slug: "planpal-kubernetes",
        tagline: "On Amazon EKS, the API scaled from 2 to 5 pods under a 25-user load test, with 0 restarts.",
        platform: "AWS EKS",
        role: "DevOps Engineer",
        context: "Apple Developer Institute for DevOps",
        start: "2026-07",
        end: "2026-09",
        description:
          "Took PlanPal's Rust API, NATS workers and Next.js web client from a local kind cluster to a kubeadm cluster on a Mac mini, then to Amazon EKS with GitOps and canary releases.",
        longDescription: `In a group of three, each member built their own deployment of the same app; this is one of the three. CI never touches the cluster. GitLab CI builds an image, pushes it to Amazon ECR with a commit-SHA tag, and commits that tag to a Git repo that Argo CD watches.

        Argo CD deploys the new tag through a Helm chart. Argo Rollouts replaces half the pods first and waits for a manual go-ahead before replacing the rest.`,
        problem:
          "On EC2 with Ansible, a crashed service stayed down until someone logged in to restart it, staging and production drifted apart, and idle servers kept costing money.",
        solution:
          "Kubernetes restarts failed pods and scales the API with a HorizontalPodAutoscaler. Git holds the desired state, and Argo CD keeps the cluster in line with it.",
        keyContributions: [
          "Cut the cold backend pipeline from 47:24 to 18:00 by merging the debug test build and the release build into one job, so about 590 Rust crates compile once, with four parallel compile jobs on a spot t3.xlarge. Cut the frontend pipeline from 4:11 to 1:18",
          "Moved the CI node to spot instances ($38 to $22 a month)",
          "Under a 25-user k6 login test on EKS, the HPA scaled the API from 2 to 5 pods with 0 restarts",
          "Wrote the Dockerfiles and ran the app on kind, then on a kubeadm cluster on VMs on the group's Mac mini",
          "Set up the EKS platform: AWS Load Balancer Controller, ACM, External Secrets Operator, IRSA and EKS Pod Identity, and RDS",
          "Wrote the Helm chart (HPA, PodDisruptionBudget, ExternalSecrets) and the Argo CD app-of-apps, with canary releases through Argo Rollouts: 50% first, then a manual go-ahead",
          "Built the delivery half of GitLab CI: an in-cluster GitLab Runner with an S3 cache, the image build, the push to ECR, and tag promotion to Git. 10 promotions reached production in five days",
        ],
        // Checked against archive/devops/04-ch4-planpal-k8s-eks.md (§12, the canary notes and "Your answers"). Kaniko stays off on purpose.
        tradeoffs: [
          "The canary splits by pod count. Old and new pods sit behind one Service with no traffic router, so the 50% step means one new pod beside one old one, not a set share of requests",
          "The readiness probe hits /api/v1/health, which reports a database outage as \"degraded\" but still returns 200, so the pod stays in service. The fix is to return 503 when a dependency check fails",
          "The first 25-user k6 login test OOMKilled both API pods at their 256 Mi limit: each Argon2 password check allocates 19 MiB, and glibc kept those buffers instead of returning them. Setting MALLOC_MMAP_THRESHOLD_=131072 makes it hand them back after every login. Each login now pays to map and unmap 19 MiB, which is small next to Argon2's own CPU cost. The 2 to 5 pods result came after this fix",
        ],
        pipeline: [
          "git push",
          "GitLab CI builds the image",
          "Amazon ECR, commit-SHA tag",
          "Tag committed to Git",
          "Argo CD syncs the Helm chart",
          "Argo Rollouts: 50% of pods",
          "Manual go-ahead",
          "100%",
        ],
        technologies: ["Docker", "Kubernetes", "kind", "kubeadm", "Amazon EKS", "Helm", "Argo CD", "Argo Rollouts", "GitLab CI", "Amazon ECR", "k6"],
        image: "/projects/PlanPal-EKS.jpg",
        imageAlt: "My AWS architecture for PlanPal: EKS across three availability zones, a spot CI node group, RDS, ECR and Secrets Manager",
      },
      {
        title: "PlanPal IaC",
        slug: "planpal-iac",
        tagline: "Production database on RDS with Multi-AZ, 7-day backups and deletion protection, plus the Grafana server image and its Ansible roles.",
        platform: "AWS",
        role: "DevOps Engineer",
        context: "Apple Developer Institute for DevOps",
        start: "2026-06",
        end: "2026-07",
        description:
          "With a team of three, defined the AWS infrastructure for PlanPal, an AI meeting scheduler with a Rust backend, a Next.js web client and an iOS app, in Terraform, Ansible and Packer.",
        longDescription: `Infrastructure changes went through pull requests: Atlantis ran Terraform plan and apply, Packer built the server images, and Ansible configured them. The images carry no secrets, and each instance fetches or generates its own when it first boots.

        My part was the data tier, the observability stack and iOS CI. Teammates built the bootstrap stack, networking, the edge layer and the deploy pipelines.`,
        keyContributions: [
          "Wrote the Terraform RDS module and the staging and production databases (encrypted storage, 7-day backups, Multi-AZ and deletion protection in production), and wired in ElastiCache",
          "Wrote the first security-group module, the Route 53 zones and the lookup of the existing VPC",
          "Wrote seven Ansible roles (Grafana, Grafana Alloy, Prometheus, Loki, Tempo, a NATS exporter and OpenVPN) and the Packer templates for the Grafana and OpenVPN images",
          "Covered those pieces with Terraform tests and Python template tests",
          "Set up iOS CI: per-environment build settings, an Xcode Cloud staging workflow, SwiftLint, 91 XCTest methods and a local 80% coverage check",
        ],
        technologies: ["Terraform", "Ansible", "Packer", "Atlantis", "Amazon RDS", "Amazon ElastiCache", "Route 53", "Grafana", "Prometheus", "Loki", "Tempo", "Xcode Cloud"],
        image: "/projects/PlanPal-IaC.png",
        imageAlt: "PlanPal on AWS, staging and production, with the parts I built marked in red: the RDS and ElastiCache data tier, the Grafana observability host and OpenVPN",
      },
      {
        title: "aform CI/CD",
        slug: "aform",
        tagline: "One Go binary promoted from dev to production, reverted automatically if its health check fails.",
        platform: "AWS EC2",
        role: "DevOps Engineer",
        context: "Apple Developer Institute for DevOps",
        start: "2026-04",
        end: "2026-06",
        description:
          "Took a Go form-builder app from Bash-scripted deployment on two EC2 instances to a Bitbucket pipeline that builds once and promotes the same binary through dev, staging and production.",
        longDescription: `In Challenge 1, each member of a group of three deployed aform (Go, PostgreSQL, Redis, RabbitMQ) separately. In my deployment, the app and Nginx ran in a public subnet and the data services in a private subnet with no public IP. Services talked over internal TLS from a private CA, and secrets were read from Secrets Manager through an IAM role.

        In Challenge 2, a new group of three ran aform across dev, staging and production, and I ran staging. The pipeline builds one arm64 binary, stores it in S3 by environment and version, and copies it to the next environment without rebuilding. The deploy script checks the new version's health and reverts if the check fails.`,
        keyContributions: [
          "Team results: the service held a p95 of 32 ms under 50 concurrent users in k6 tests, and the team reused my setup script to take a fresh EC2 instance to live HTTPS in about 9 minutes",
          "Wrote seven Bash scripts that deploy aform onto two EC2 instances, with PostgreSQL, Redis and RabbitMQ in a private subnet, internal TLS, and secrets from Secrets Manager",
          "Wrote most of the team's Bitbucket Pipelines file: golangci-lint, a SonarQube step, a 90% coverage gate, the build, the S3 upload and tag-based deploys",
          "Extended the deploy script with a health check, automatic revert and S3 version pointers, and wrote the promote and rollback scripts and pipelines",
          "Planned the unit-test coverage work and used Claude Code to write the Go tests (94.4% coverage)",
          "Configured Grafana Alloy on staging to send metrics to the team's Grafana",
          "Co-wrote the cost audit that found the proposal had left out the NAT Gateway ($52.54 a month)",
        ],
        technologies: ["Bash", "AWS EC2", "AWS Secrets Manager", "Amazon S3", "Nginx", "Bitbucket Pipelines", "golangci-lint", "SonarQube", "Grafana Alloy", "k6"],
        image: "/projects/aform.png",
        imageAlt: "The team's aform architecture: Nginx and the Go app in a public subnet, RabbitMQ, PostgreSQL and Redis in a private one",
      },
    ],
  },
  {
    title: "Apple Developer Academy",
    host: "BINUS",
    role: "iOS Developer",
    start: "2025-03",
    end: "2025-12",
    description:
      "A 10-month program at Apple Developer Academy @ BINUS where teams build iOS and macOS apps through Challenge-Based Learning, including one challenge with an industry partner.",
    achievements: [
      "Worked on four iOS and macOS apps in teams; RiSTOCK shipped to the App Store",
      "Worked in teams of three to six with developers, designers and product managers",
      "Presented work to mentors, peers and outside reviewers, and changed it based on their feedback",
    ],
    projects: [
      {
        title: "RiSTOCK",
        slug: "ristock",
        tagline: "Tells shop owners which stock to count first.",
        platform: "macOS, iOS",
        role: "Software Engineer",
        context: "Apple Developer Academy",
        start: "2025-09",
        end: "2025-12",
        image: "/projects/RiSTOCK.jpg",
        description:
          "Mac and iPhone apps that turn marketplace sales exports into a list of which products to count and restock first.",
        longDescription: `Sellers export their sales from Shopee, Tokopedia and Lazada and upload them in the Mac app. A Flask backend merges the files and gives each product a check priority (check now, check soon, check periodically) and a weekly minimum stock.

        The iPhone app pairs with the Mac by scanning a QR code and is used in the storeroom to enter counted stock. Both apps are on the App Store. A team of five built them.`,
        problem:
          "Small online sellers sell on several marketplaces and count stock by hand. They can't tell which products to count first, so fast sellers run out.",
        solution:
          "The backend classifies products by sales volume and how much sales vary, then sets a check priority and a weekly minimum stock for each. The Mac app shows the ranked list, and the iPhone app records counts on the shop floor.",
        keyContributions: [
          "Built the macOS onboarding flow that shows sellers how to export their Shopee, Tokopedia and Lazada sales files, uploads them, and starts the backend analysis",
          "Built the onboarding tutorials, the three-step progress stepper, and the re-upload flow for stale data on macOS",
          "Built the iPhone stock-input sheet (press and hold to step by 10, negative adjustments, saves to the API) and the stock fields on the macOS product detail page",
          "Built the iPhone main screen's summary cards and landing state, with Reduce Motion support",
          "Built the backend's email/password auth endpoints (Flask, bcrypt, server-side sessions) with unit tests; the shipped apps pair by device ID instead",
        ],
        technologies: ["SwiftUI", "UIKit", "AppKit", "Flask", "MySQL"],
        imageAlt: "RiSTOCK inventory dashboard",
        githubUrl: "https://github.com/ristock-id",
        appStoreUrl: "https://apps.apple.com/id/app/ristock-always-in-stock/id6755036106?mt=12",
      },
      {
        title: "COCO.CO",
        slug: "coco-co",
        tagline: "Group booking for snorkeling trips.",
        platform: "iOS",
        role: "iOS Developer",
        context: "Apple Developer Academy",
        start: "2025-08",
        end: "2025-08",
        image: "/projects/Coco.jpg",
        description:
          "Group trip planning added to an existing snorkeling-booking app: a planner creates a trip, adds friends, and the group votes on packages before booking.",
        longDescription: `COCO.CO was an existing Academy iOS app for booking snorkeling trips. In a three-week challenge, our team of six added group trip planning to it.

        The brief ruled out multi-user features, so the group runs on one phone: members come from a fixed list and votes stay on the device. The team expected group planning to bring in new users, but this was never measured.`,
        problem:
          "When friends plan a snorkeling trip, the planner answers the same questions again and again, and the group argues over which activities to pick. Plans often stall in the group chat.",
        solution:
          "A group trip page where the planner sets trip details and members, the group votes on packages, and the planner books the chosen one. The booked trip appears in My Trip and can be shared as a screenshot with a summary.",
        keyContributions: [
          "Built the group trip plan page: trip details, members, package voting and Book Now",
          "Added an edit mode that reopens the group form to change a plan",
          "Built the booking confirmation and success popups, and the group booking that appears in My Trip",
          "Built the Solo/Group choice at Create Trip, the invite popup UI and the share-trip action",
          "Prototyped exporting a trip as an image by rendering UIKit views off-screen (not merged)",
        ],
        technologies: ["SwiftUI", "UIKit"],
        imageAlt: "COCO.CO booking interface",
      },
      {
        title: "PercaTalk",
        slug: "percatalk",
        tagline: "Scores a practice speech on script accuracy and tone.",
        platform: "macOS",
        role: "macOS Developer",
        context: "Apple Developer Academy",
        start: "2025-06",
        end: "2025-06",
        image: "/projects/PercaTalk.jpg",
        description:
          "macOS app that records you reading a script, then scores how closely you followed it and rates the tone of your voice.",
        longDescription: `You read a script from an on-screen prompter while the Mac records video. When you stop, the app transcribes the recording and compares it with the script to give a fluency score. An on-device Core ML classifier rates your tone of voice across six emotions.

        A six-person team built it in the three-week Machine Learning Challenge. Each recording is saved with its title and score, so past takes appear on the home screen.`,
        problem:
          "People who present and sell products want to persuade with confidence, but after a practice run they can't tell whether it went well.",
        solution:
          "After each take, the app shows a fluency score with missed and extra words, and a breakdown of the emotions in your voice with the main one explained. Emotion analysis runs on the Mac with Core ML.",
        keyContributions: [
          "Created the Xcode project and built the recording screen: camera and microphone capture to a video file with AVFoundation, a countdown, and playback",
          "Built speech transcription with the Speech framework and an F1 fluency score that compares the transcript with the script",
          "Built the word-highlighting prompter that scrolls through the script and ends the take",
          "Moved the Core ML emotion model (trained by a teammate) off the main thread, averaged its output across audio windows, and connected the results to the Tone tab",
          "Built local progress tracking: recordings on disk, titles and scores in UserDefaults, and a history list on the home screen",
        ],
        technologies: ["SwiftUI", "Core ML", "AVFoundation", "Speech"],
        imageAlt: "PercaTalk speech analysis interface",
        githubUrl: "https://github.com/reinhart-c/project-kevin-speech-trainer",
      },
      {
        title: "Swifter",
        slug: "swifter",
        tagline: "Schedules jogs into free time in your calendar.",
        platform: "iOS",
        role: "iOS Developer",
        context: "Apple Developer Academy",
        start: "2025-03",
        end: "2025-05",
        image: "/projects/Swifter.png",
        description:
          "iPhone app that finds a free slot in your Apple Calendar and adds your next jog there, with warm-up and cool-down.",
        longDescription: `You set your jog length, warm-up and cool-down, preferred days and times, and a goal such as three jogs between two dates. Swifter reads your calendar through EventKit, finds the first free slot that fits, and adds the jog as calendar events. After each jog it plans the next one, and you can re-plan with one tap when your day changes.

        A team of three built it in the Core Challenge. The linked fork adds Siri and Shortcuts support from the Experience Challenge.`,
        problem:
          "People who jog to clear their head have to fit runs around changing workloads, and re-planning each jog in a calendar takes extra effort.",
        solution:
          "Swifter uses EventKit to find the first free slot that matches your preferred days and times and writes the jog into your calendar. Sessions and goal progress are saved with SwiftData.",
        keyContributions: [
          "Built the Calendar tab: reads events through EventKit and shows them on a month grid and a zoomable day timeline",
          "Built rescheduling from the calendar: moving a jog also moves its warm-up and cool-down, and the app warns when the new date falls outside the goal period",
          "Built the preferences data model and the first SwiftData save for onboarding, and connected the Edit Preferences and Edit Goal screens to SwiftData",
          "Added Siri and Shortcuts support in a personal fork: five App Intents in an extension that edit jog preferences in a SwiftData store shared with the app through an App Group",
        ],
        technologies: ["SwiftUI", "SwiftData", "EventKit", "App Intents"],
        imageAlt: "Swifter workout schedule",
        githubUrl: "https://github.com/teukufazariz/swifter",
      },
    ],
  },
  {
    title: "PT. Jaya Santoso Teknologi",
    role: "Frontend Developer Intern",
    start: "2025-01",
    end: "2025-07",
    description:
      "Built wedding invitation templates and a venue check-in dashboard for Minyma, the company's digital invitation product.",
    achievements: [
      "Built a client wedding invitation and the company's first template in Next.js and Tailwind CSS",
      "Built the QR scanner and API layer of the venue check-in dashboard",
      "Built screens from the UI/UX team's Figma designs and agreed the API fields with the backend developer",
    ],
    projects: [
      {
        title: "Minyma",
        slug: "wedding-invitation",
        tagline: "Wedding invitations with QR code check-in.",
        platform: "Web",
        role: "Frontend Developer Intern",
        context: "PT. Jaya Santoso Teknologi",
        start: "2025-01",
        end: "2025-07",
        image: "/projects/Minymablur.jpg",
        description:
          "Minyma is the company's digital wedding invitation product. I built its first template, a client's invitation with phone-number RSVP, and the QR scanner that checks guests in at the venue.",
        longDescription: `Minyma is PT. Jaya Santoso Teknologi's digital invitation product. Guests open one shared invitation link, RSVP with their phone number, and receive a QR code generated by the backend.

        At the venue, ushers log in with an event key and scan guests' QR codes to check them in, and the guest list shows who has arrived. The scanner was finished after the internship ended, before the client's wedding in November 2025.`,
        keyContributions: [
          "Built the company's first invitation template from scratch in Next.js and Tailwind CSS",
          "Built the client invitation's RSVP flow: the phone number identifies the guest, returning guests get their existing QR, and repeated taps can't submit twice",
          "Built the venue QR scanner (camera and jsQR) and the event-key login for ushers",
          "Connected the RSVP form and the check-in dashboard to the company's REST API",
          "Added a YouTube music player that starts when the guest opens the invitation",
        ],
        technologies: ["Next.js", "React", "Tailwind CSS", "REST APIs", "jsQR"],
        imageAlt: "Wedding invitation website",
      },
    ],
  },
];

/** Where the home timeline starts counting months, "YYYY-MM". It grows a row per year on its own. */
export const timeline = { start: "2025-01" };

/** Newest first, in the order the experiences and projects are listed above. */
export const allProjects = experiences.flatMap((exp) => exp.projects);

export const getProject = (slug: string) => allProjects.find((p) => p.slug === slug);

const parse = (ym: string) => ym.split("-").map(Number) as [number, number];

/** Months from `timeline.start` to a "YYYY-MM" date. */
export function monthIndex(ym: string) {
  const [y, m] = parse(ym), [y0, m0] = parse(timeline.start);
  return (y - y0) * 12 + (m - m0);
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "Jun 2025", "Sep–Dec 2025", or "Nov 2025–Feb 2026" across years. */
export function formatRange(start: string, end: string) {
  const [ys, ms] = parse(start), [ye, me] = parse(end);
  if (start === end) return `${MONTHS[ms - 1]} ${ys}`;
  return ys === ye
    ? `${MONTHS[ms - 1]}–${MONTHS[me - 1]} ${ye}`
    : `${MONTHS[ms - 1]} ${ys}–${MONTHS[me - 1]} ${ye}`;
}

/** Splits a template-string description into its paragraphs. */
export const paragraphs = (text?: string) =>
  text ? text.split(/\n\s*\n/).map((t) => t.trim()).filter(Boolean) : [];

/** Jakarta is UTC+7 all year (no daylight saving), so a fixed offset is exact. Read with getUTC*. */
export const jakartaNow = () => new Date(Date.now() + 7 * 36e5);
