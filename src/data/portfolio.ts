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
  role: string;
  /** "YYYY-MM", inclusive */
  start: string;
  end: string;
  description: string;
  achievements?: string[];
  projects: Project[];
}

export const experiences: Experience[] = [
  {
      title: "Apple Developer Academy",
      role: "iOS Developer",
      start: "2025-03",
      end: "2025-12",
      description:
        "A 10 months project-based program focused on building production-quality iOS and macOS applications. Worked in multidisciplinary teams to design, implement, and iterate on real-world products under tight timelines, user feedback, and technical constraints.",
      achievements: [
        "Built and shipped multiple iOS and macOS applications using SwiftUI, UIKit, and native Apple frameworks",
        "Applied Challenge-Based Learning (CBL) through rapid prototyping, user validation, and iterative refinement",
        "Collaborated in cross-functional teams with designers and engineers using Agile/Scrum workflows",
        "Maintained code quality through testing, linting, and architectural consistency across projects",
        "Presented product demos and technical decisions to mentors and peers, incorporating feedback into subsequent iterations"
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
          "Multiplatform inventory management app that helps business owners optimize stock opname.",
        longDescription: `RiSTOCK is a macOS and iOS application designed to help business owners perform stock opname more effectively. 
        
        Using sales data from marketplaces like Shopee, Tokopedia and Lazada, the app provides recommendations on which items to prioritize. It ensures high-demand items are checked first, reducing the risk of stockouts and optimizing the restocking process.`,
        
        problem: "Business owners often overlook their best-selling items during manual stock opname, leading to critical stockouts. Without data-driven prioritization, they waste time counting low-value inventory while high-demand products run out unnoticed.",
        
        solution: "We developed a cross-platform system that analyzes imported sales data to generate a 'Priority Check' list. This guides the user to verify high-velocity items first, ensuring the stock that matters most is always available. We also provided the restock quantity based on sales trends.",
        
        keyContributions: [
          "Implemented the CSV upload entry point on macOS to parse external marketplace data",
          "Built the tutorial system and custom UI components (Steppers) for the macOS",
          "In charge of developing and implementing macOS and iOS components such as stock input fields.",
          "Developed the authentication backend endpoint to support client applications"
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
        end: "2025-09",
        image: "/projects/Coco.jpg",
        description:
          "Snorkeling trip booking app enabling groups to collaborate in real-time.",
        longDescription: `COCO.CO is an iOS application that streamlines the booking process for snorkeling trips. 
        
        Unlike standard travel apps, it focuses on group dynamics, allowing users to create joint trips, vote on packages, and manage participant details in a single shared flow. The app supports solo travelers but shines in scaling user acquisition through group invites.`,
        
        problem: "Planning group snorkeling trips is fragmented; users struggle to coordinate destinations, handle payments, and manage passenger manifests across chat apps and booking platforms. This friction often causes potential bookings to fall through.",
        
        solution: "We engineered a collaborative booking flow where users can invite friends to a shared 'Trip Lobby.' The app syncs choices in real-time and generates a printable PDF itinerary for offline use, ensuring everyone is aligned from booking to diving.",
        
        keyContributions: [
          "In charge of developing and implementing the group booking flow and user invitation system",
          "Implemented PDF generation to convert SwiftUI views into printable itineraries",
          "Adhere to code quality standards using SwiftLint and rigorous Unit Testing",
        ],
        technologies: ["SwiftUI", "UIKit", "Swift Testing"],
        imageAlt: "COCO.CO booking interface",
      },
      {
        title: "PercaTalk",
        slug: "percatalk",
        tagline: "Scores how you speak, using on-device ML.",
        platform: "macOS",
        role: "macOS Developer",
        context: "Apple Developer Academy",
        start: "2025-05",
        end: "2025-06",
        image: "/projects/PercaTalk.jpg",
        description:
          "AI-powered speech training tool that analyzes vocal delivery and provides on-device feedback.",
        longDescription: `PercaTalk is a native macOS application designed to reduce public speaking anxiety. 
        
        Using on device machine learning, it analyzes a user's speech patterns focusing on emotion, pacing, and clarity without ever uploading audio to the cloud. It provides a safe, private environment for users to practice and improve their delivery.`,
        
        problem: "Improving public speaking is difficult without a human coach. Users often lack self-awareness regarding their emotional tone or pacing, and recording themselves feels unstructured and unhelpful without objective metrics.",
        
        solution: "We utilized CoreML and AVFoundation to build an offline audio analysis engine. The app records speech, classifies emotional delivery in real-time, and generates a scoring report to give users immediate, actionable feedback.",
        
        keyContributions: [
          "Integrated CoreML audio classification models for emotion detection",
          "Implemented local data persistence with SwiftData to track user progress",
          "Built the audio recording and playback pipeline using AVFoundation",
          "Implementing the design for the video recording and scoring interface",
        ],
        technologies: ["SwiftUI", "CoreML", "AVFoundation", "SwiftData"],
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
        end: "2025-04",
        image: "/projects/Swifter.png",
        description:
          "Smart jogging planner that integrates with Apple Calendar to automatically schedule jogs.",
        longDescription: `Swifter is an intelligent routine planner that removes the mental load of scheduling exercise.
        
        Instead of forcing users to manually set times, Swifter reads the user's existing calendar events and identifies optimal time slots for jogging. It adapts to the user's changing schedule, ensuring fitness goals are met without conflicting with work or social commitments.`,
        
        problem: "Many people fail to maintain a jogging routine because they struggle to find time in their busy schedules. Manual planning is tedious, and rigid fitness apps don't account for fluctuating daily commitments.",
        
        solution: "We leveraged EventKit to scan the user's real-time availability. The app algorithmically inserts jogging sessions into free time slots and persists workout history locally, creating a friction-free fitness plan.",
        
        keyContributions: [
          "Implementing the user onboarding flow to capture fitness goals and constraints",
          "In charge of developing the calendar page, integrating EventKit for real-time availability",
        ],
        technologies: ["SwiftUI", "SwiftData", "EventKit"],
        imageAlt: "Swifter workout schedule",
        githubUrl: "https://github.com/teukufazariz/swifter",
      },
    ],
  },
  {
    title: "PT. Jaya Santoso Teknologi",
    role: "Frontend Developer",
    start: "2025-01",
    end: "2025-07",
    description:
      "Developed responsive wedding invitation platforms with modern UI/UX and integrated guest management systems.",
    achievements: [
      "Developed responsive wedding websites using React.js, Tailwind CSS, and REST APIs",
      "Built QR code-based guest management system enabling real-time attendance tracking",
      "Collaborated with design and backend teams ensuring seamless user experience across all devices",
    ],
    projects: [
      {
        title: "Wedding Invitation",
        slug: "wedding-invitation",
        tagline: "Wedding invitations with QR code check-in.",
        platform: "Web",
        role: "Frontend Developer",
        context: "PT. Jaya Santoso Teknologi",
        start: "2025-01",
        end: "2025-07",
        image: "/projects/Minymablur.jpg",
        description:
          "A Digital wedding invitation featuring responsive invitations and a QR-based check-in system.",
        longDescription: `A digital wedding invitation platform designed to modernize the wedding experience for couples and guests.
        
        The project involved building bespoke invitation and a backend-integrated guest management tool. The system handles everything from initial RSVP collection to physical attendance tracking on the big day.`,
        keyContributions: [
          "Developed responsive invitation pages using React.js and Tailwind CSS",
          "Implemented the QR Code and scanning logic for guest verification",
          "Optimized asset loading to ensure fast load times",
          "Integrated REST APIs to sync RSVP data with the guest management dashboard"
        ],
        technologies: ["React.js", "Tailwind CSS", "REST APIs"],
        imageAlt: "Wedding invitation website",
        // githubUrl: "https://github.com/teukufazariz/wedding-platform",
        // demoUrl: "https://wedding-demo.example.com",
      },
    ],
  },
];

/** The months the home timeline covers, "YYYY-MM", inclusive. Extend `end` as time passes. */
export const timeline = { start: "2025-01", end: "2026-12" };

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

/** "Sep–Dec 2025", or "Nov 2025–Feb 2026" across years. */
export function formatRange(start: string, end: string) {
  const [ys, ms] = parse(start), [ye, me] = parse(end);
  return ys === ye
    ? `${MONTHS[ms - 1]}–${MONTHS[me - 1]} ${ye}`
    : `${MONTHS[ms - 1]} ${ys}–${MONTHS[me - 1]} ${ye}`;
}

/** Splits a template-string description into its paragraphs. */
export const paragraphs = (text?: string) =>
  text ? text.split(/\n\s*\n/).map((t) => t.trim()).filter(Boolean) : [];

/** Jakarta is UTC+7 all year (no daylight saving), so a fixed offset is exact. Read with getUTC*. */
export const jakartaNow = () => new Date(Date.now() + 7 * 36e5);
