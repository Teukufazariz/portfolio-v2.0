// Every fact here is taken from ~/Riz/archive (chapters, study guide, and the
// 21 Nov 2026 update to the Nanovest chapter). Don’t add a claim without a source there.

export const site = {
  url: "https://teukufazariz.vercel.app",
  name: "Teuku Fazariz Basya",
  short: "Riz",
  role: "DevOps engineer",
  place: "Jakarta, Indonesia",
  email: "teukufazarizbasya@gmail.com",
  cv: "/resume.pdf",
  github: "https://github.com/Teukufazariz",
  linkedin: "https://www.linkedin.com/in/teukufazarizbasya/",
  description:
    "Teuku Fazariz Basya is a DevOps engineer in Jakarta who builds CI/CD pipelines, Kubernetes deployments on AWS EKS with GitOps and canary releases, and Terraform infrastructure.",
};

export const work = [
  { slug: "nanovest", title: "Nanovest", dates: "Sep – Nov 2026", line: "A Backstage developer portal, as the capstone" },
  { slug: "planpal", title: "PlanPal", dates: "Jun – Sep 2026", line: "Terraform and Ansible, then Kubernetes on EKS" },
  { slug: "aform", title: "aform", dates: "Apr – Jun 2026", line: "A Go app on EC2, then a team’s CI/CD pipeline" },
] as const;

export type Entry = {
  name: string;
  dates: string;
  role: string;
  text: string;
  stack: string;
  print?: { src: string; caption: string };
  link?: { href: string; label: string };
};

export const earlier: Entry[] = [
  {
    name: "RiSTOCK",
    dates: "Sep – Dec 2025",
    role: "iOS and macOS developer, team of five",
    text: "Mac and iPhone apps that tell online sellers which products to count and restock first, from their Shopee, Tokopedia and Lazada sales exports. Both are on the App Store. I built the Mac onboarding that walks a seller through exporting and uploading those files, the iPhone stock-input sheet, and the backend’s auth endpoints with tests. The shipped apps pair by device ID, so those endpoints go unused.",
    stack: "SwiftUI, Flask",
    print: { src: "/prints/ristock.jpg", caption: "RiSTOCK · Mac and iPhone" },
    link: { href: "https://apps.apple.com/id/app/ristock-always-in-stock/id6755036106?mt=12", label: "App Store" },
  },
  {
    name: "COCO.CO",
    dates: "Aug 2025",
    role: "iOS developer, team of six",
    text: "Group trip planning added to an existing snorkeling-trip booking app in a three-week challenge. I built the trip plan page, package voting, edit mode and booking into My Trip. The brief ruled out multi-user features, so the group is simulated on one phone.",
    stack: "UIKit, SwiftUI",
    print: { src: "/prints/coco.jpg", caption: "COCO.CO · team deck cover" },
  },
  {
    name: "Nusa Indah",
    dates: "Jul 2025",
    role: "Computer vision, industry challenge",
    text: "A proof of concept with Nusantara Infrastructure for classifying vehicles at toll gates. I trained and compared YOLOv12n bus/no-bus detectors. A model trained on a general vehicle dataset scored mAP50 0.81 on its own validation set and 0.20 on footage from the gate camera. No app was built.",
    stack: "Python, YOLOv12n, Roboflow",
  },
  {
    name: "PercaTalk",
    dates: "Jun 2025",
    role: "macOS developer, team of six",
    text: "A Mac app for practising a speech: read from a prompter while the Mac records, then get a fluency score and a tone breakdown from an on-device Core ML emotion classifier a teammate trained. I created the project and built recording, speech transcription, the prompter and the fluency score, then wired the model’s output into the results.",
    stack: "SwiftUI, AVFoundation, Speech, Core ML",
    print: { src: "/prints/percatalk.jpg", caption: "PercaTalk · team deck" },
    link: { href: "https://github.com/reinhart-c/project-kevin-speech-trainer", label: "GitHub" },
  },
  {
    name: "Swifter",
    dates: "Mar – Jun 2025",
    role: "iOS developer, team of three",
    text: "An iPhone app that schedules jogs into free time in your Apple Calendar. I built the Calendar tab: a zoomable day timeline of your events, and tap-to-reschedule that moves a jog together with its warm-up and cool-down. Afterwards, in my own fork, I added Siri and Shortcuts support with App Intents.",
    stack: "SwiftUI, SwiftData, EventKit, App Intents",
    print: { src: "/prints/swifter.jpg", caption: "Swifter · sessions and calendar" },
    link: { href: "https://github.com/teukufazariz/swifter", label: "GitHub" },
  },
  {
    name: "Minyma",
    dates: "Jan – Jul 2025",
    role: "Frontend intern, PT. Jaya Santoso Teknologi",
    text: "Digital wedding invitations in Next.js and Tailwind CSS. I built the company’s first template and, with another developer, a client invitation’s RSVP flow, where the guest’s phone number is their identity. I also wrote the QR scanner and API calls of the venue check-in dashboard, which I finished after the internship ended.",
    stack: "Next.js, Tailwind CSS, jsQR",
    print: { src: "/prints/minyma.jpg", caption: "Minyma · client invitation, faces blurred" },
  },
];

export const experience = [
  {
    org: "Nanovest",
    role: "Platform engineer (capstone via the Institute)",
    dates: "Sep – Nov 2026",
    place: "",
    text: "On a team of four, built an internal Backstage developer portal that reads dev, QA, staging and production, read-only. I wrote its Datadog, Database, Scheduler and Logs tabs and the production config that first ran on GKE, and fixed its Jenkins build and Argo CD connection.",
    href: "/work/nanovest",
  },
  {
    org: "Apple Developer Institute for DevOps",
    role: "DevOps engineer",
    dates: "Mar – Nov 2026",
    place: "Tangerang",
    text: "Four deployment challenges before the capstone, in small teams that changed each time: Bash on EC2, a CI/CD pipeline in Bitbucket Pipelines, Terraform with Ansible and Packer, then my own deployment on Amazon EKS with Helm, Argo CD and canary releases.",
    href: "/#work",
  },
  {
    org: "Apple Developer Academy @ BINUS",
    role: "iOS developer",
    dates: "Mar – Dec 2025",
    place: "Tangerang",
    text: "Built four iOS and macOS apps in teams. One of them, RiSTOCK, is on the App Store.",
    href: "/#earlier",
  },
  {
    org: "PT. Jaya Santoso Teknologi",
    role: "Frontend developer intern",
    dates: "Jan – Jul 2025",
    place: "Remote",
    text: "Wedding invitation templates in Next.js, a phone-number RSVP flow and a QR check-in scanner for Minyma, the company’s digital invitation product.",
    href: "/#earlier",
  },
];

export const tools = [
  ["Cloud", "AWS (EC2, EKS, ECR, RDS, S3, IAM, Route 53, Secrets Manager, CloudWatch), GCP (GKE)"],
  ["Containers and platform", "Docker, Kubernetes (EKS, kubeadm, kind), Helm, Backstage"],
  ["GitOps and CI/CD", "Argo CD, Argo Rollouts, GitLab CI, Bitbucket Pipelines, Jenkins, SonarQube"],
  ["Infrastructure as code", "Terraform, Ansible, Packer"],
  ["Observability and testing", "Prometheus, Grafana, Grafana Alloy, Loki, Tempo, Datadog, k6"],
  ["Linux and networking", "Ubuntu, systemd, Nginx, TLS, DNS"],
  ["Languages and data", "Bash, Go, Python, Swift, PostgreSQL, Redis, RabbitMQ"],
] as const;
