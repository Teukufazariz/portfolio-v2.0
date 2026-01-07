export interface Project {
  number: string;
  slug: string;
  title: string;
  role: string;
  description: string;
  longDescription?: string;
  problem?: string;
  solution?: string;
  keyContributions?: string[];
  technologies: string[];
  year: string;
  imageAlt: string;
  context?: string;
  dateRange?: string;
  githubUrl?: string;
  demoUrl?: string;
  appStoreUrl?: string; 
  featured?: boolean;
}

export interface Experience {
  title: string;
  role: string;
  dateRange: string;
  logoPlaceholder?: string;
  description: string;
  achievements?: string[];
  projects: Project[];
}

export const experiences: Experience[] = [
  {
    title: "Apple Developer Academy",
    role: "iOS Developer",
    dateRange: "February 2025 - December 2025",
    logoPlaceholder: "🍎",
    description:
      "Intensive 10-month program focused on iOS development, collaborative product design, and professional skills. Working in multidisciplinary teams to ship real-world apps using Apple's latest frameworks and Human Interface Guidelines.",
    achievements: [
      "Developed <span class='font-bold'>4 iOS applications</span> using SwiftUI, UIKit, and Apple frameworks including CoreML and ARKit",
      "Practiced <span class='font-bold'>Challenge-Based Learning (CBL)</span> methodology through iterative prototyping and user testing",
      "Collaborated in cross-functional teams with designers and developers using Agile/Scrum practices",
      "Presented app demos to mentors and peers, refining communication and storytelling skills",
    ],
    projects: [
      {
        number: "01",
        title: "RiSTOCK",
        slug: "ristock",
        role: "Software Engineer",
        context: "Apple Developer Academy",
        dateRange: "Sep 2025 - Dec 2025",
        description:
          "Award-winning dessert discovery app with AR menu preview, winning Nano 1 Challenge 2025.",
        longDescription: `RiSTOCK is a dessert discovery application that helps users find nearby dessert shops and preview menu items in augmented reality before ordering.

The app won the Nano 1 Challenge 2025 at Apple Developer Academy, recognized for its innovative use of AR technology and intuitive user experience.

Key features include location-based dessert shop discovery, AR menu previews that let users see 3D models of desserts, and personalized recommendations based on user preferences.`,
        problem: "Customers often struggle to visualize dessert portions and presentations before ordering, leading to unmet expectations and food waste. Traditional menus with static images don't convey the actual size or appearance of dishes.",
        solution: "We built an AR-powered preview system that lets users see life-sized 3D models of desserts on their table before ordering. Combined with location-based discovery, users can find nearby shops and make informed decisions.",
        keyContributions: [
        "Architected the AR preview system using ARKit, enabling realistic 3D dessert visualization",
        "Implemented location-based search with MapKit and CoreLocation for nearby shop discovery",
        "Led the UI/UX design following Apple Human Interface Guidelines",
        "Optimized 3D model loading for smooth performance on older devices",
        ],
        technologies: ["SwiftUI", "ARKit", "MapKit", "CoreLocation"],
        year: "2025",
        imageAlt: "RiSTOCK app interface",
        githubUrl: "https://github.com/teukufazariz/ristock",
        appStoreUrl: "https://apps.apple.com/app/ristock/id123456789",
        featured: true,
      },

      {
        number: "02",
        title: "COCO.CO",
        slug: "coco-co",
        role: "iOS Developer",
        context: "Apple Developer Academy",
        dateRange: "Aug 2025 - Sep 2025",
        description:
          "Snorkeling trip booking app with collaborative features for smarter group-based travel planning.",
        longDescription: `COCO.CO is a snorkeling trip booking application that enables group-based travel planning with collaborative features.

The app allows users to discover snorkeling destinations, create group trips, and coordinate logistics with friends and family. Built with a focus on code quality using Swift Testing and SwiftLint.

Key features include destination discovery, group trip creation, shared itineraries, and real-time collaboration.`,
        technologies: ["SwiftUI", "UIKit", "Swift Testing", "SwiftLint"],
        year: "2025",
        imageAlt: "COCO.CO booking interface",
        githubUrl: "https://github.com/teukufazariz/coco-co",
        appStoreUrl: "https://apps.apple.com/app/coco-co/id123456790",
        featured: true,
      },
      {
        number: "03",
        title: "PercaTalk",
        slug: "percatalk",
        role: "iOS Developer",
        context: "Apple Developer Academy",
        dateRange: "May 2025 - June 2025",
        description:
          "AI-powered speech analysis tool helping users improve public speaking skills.",
        longDescription: `PercaTalk is an AI-powered speech analysis tool designed to help users improve their public speaking skills through real-time feedback and personalized coaching.

The app uses CoreML models to analyze speech patterns, pacing, filler words, and vocal clarity. Users can record practice sessions and receive detailed analytics on their performance.

Features include speech-to-text transcription, filler word detection, pacing analysis, and progress tracking over time.`,
        technologies: ["SwiftUI", "CoreML", "AVFoundation", "SwiftData"],
        year: "2025",
        imageAlt: "PercaTalk speech analysis interface",
        githubUrl: "https://github.com/teukufazariz/percatalk",
        appStoreUrl: "https://apps.apple.com/app/percatalk/id123456791",
      },
      {
        number: "04",
        title: "Swifter",
        slug: "swifter",
        role: "iOS Developer",
        context: "Apple Developer Academy",
        dateRange: "August 2025 - September 2025",
        description:
          "Jogging routine planner that intelligently schedules workouts around calendar commitments.",
        longDescription: `Swifter is a jogging routine planner that intelligently schedules workouts around your existing calendar commitments.

The app integrates with your calendar to find optimal workout times, tracks your jogging sessions, and adapts recommendations based on your fitness progress.

Features include smart scheduling, calendar integration, workout tracking, and progress analytics.`,
        technologies: ["SwiftUI", "SwiftData", "EventKit"],
        year: "2025",
        imageAlt: "Swifter workout schedule",
        githubUrl: "https://github.com/teukufazariz/swifter",
        appStoreUrl: "https://apps.apple.com/app/swifter/id123456792",
      },
    ],
  },
  {
    title: "PT. Jaya Santoso Teknologi",
    role: "Frontend Developer",
    dateRange: "January 2025 - July 2025",
    logoPlaceholder: "💍",
    description:
      "Developed responsive web applications for client projects, focusing on wedding invitation platforms with modern UI/UX and integrated guest management systems.",
    achievements: [
      "Developed <span class='font-bold'>10+ responsive wedding websites</span> using React.js, Tailwind CSS, and REST APIs",
      "Built QR code-based guest management system enabling real-time attendance tracking",
      "Collaborated with design and backend teams ensuring seamless user experience across all devices",
      "Optimized web performance achieving 90+ Lighthouse scores through code splitting and lazy loading",
    ],
    projects: [
      {
        number: "05",
        title: "Wedding Platform",
        slug: "wedding-platform",
        role: "Frontend Developer",
        context: "PT. Jaya Santoso Teknologi",
        dateRange: "January 2025 - July 2025",
        description:
          "Responsive wedding invitation websites with QR-based guest management ensuring optimal cross-device performance.",
        longDescription: `A comprehensive wedding invitation platform that allows couples to create beautiful digital invitations and manage their guest list efficiently.

The platform features responsive design optimized for mobile viewing, QR code-based guest check-in at events, and real-time RSVP tracking.

Key achievements include developing 10+ responsive wedding websites, implementing QR code guest management, and achieving 90+ Lighthouse performance scores.`,
        technologies: ["React.js", "Tailwind CSS", "REST APIs"],
        year: "2025",
        imageAlt: "Wedding invitation website",
        githubUrl: "https://github.com/teukufazariz/wedding-platform",
        demoUrl: "https://wedding-demo.example.com",
      },
    ],
  },
];