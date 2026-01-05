import Header from "@/components/Header";
import ThemeToggle from "@/components/ThemeToggle";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const experiences = [
	{
		title: "Apple Developer Academy",
		role: "iOS Developer Mentee",
		dateRange: "March 2025 - December 2025",
		description:
			"Intensive 10-month program focused on multiplatform iOS and macOS development. Built 4 production-ready applications using Swift, SwiftUI, and UIKit with emphasis on clean architecture and user experience.",
		keyProjects: ["RiSTOCK", "COCO.CO", "Kevin", "Swifter"],
		projects: [
			{
				number: "01",
				title: "RiSTOCK",
				role: "Software Engineer",
				description:
					"Multiplatform stock management app for iOS and macOS with priority-based recommendations and CSV integration.",
				technologies: "SwiftUI · UIKit · AppKit",
				year: "2025",
				imageAlt: "RiSTOCK application interface",
			},
			{
				number: "02",
				title: "COCO.CO",
				role: "iOS Developer",
				description:
					"Snorkeling trip booking app with collaborative features for smarter group-based travel planning.",
				technologies: "SwiftUI · UIKit · Swift Testing · SwiftLint",
				year: "2025",
				imageAlt: "COCO.CO booking interface",
			},
			{
				number: "03",
				title: "Kevin",
				role: "macOS Developer",
				description:
					"Speech training app that analyzes delivery and provides immediate improvement feedback using ML.",
				technologies: "SwiftUI · CoreML · AVFoundation · SwiftData",
				year: "2025",
				imageAlt: "Kevin speech analysis interface",
			},
			{
				number: "04",
				title: "Swifter",
				role: "iOS Developer",
				description:
					"Jogging routine planner that intelligently schedules workouts around calendar commitments.",
				technologies: "SwiftUI · SwiftData · EventKit",
				year: "2025",
				imageAlt: "Swifter workout schedule",
			},
		],
	},
	{
		title: "PT. Jaya Santoso Teknologi",
		role: "Frontend Developer",
		dateRange: "January 2025 - July 2025",
		description:
			"Developed responsive web applications for client projects, focusing on wedding invitation platforms with modern UI/UX and integrated guest management systems.",
		keyProjects: ["Wedding Invitation Platform"],
		projects: [
			{
				number: "05",
				title: "Wedding Platform",
				role: "Frontend Developer",
				description:
					"Responsive wedding invitation websites with QR-based guest management ensuring optimal cross-device performance.",
				technologies: "React.js · Tailwind CSS · REST APIs",
				year: "2025",
				imageAlt: "Wedding invitation website",
			},
		],
	},
];

export default function Home() {
	return (
		<>
			<ThemeToggle />
			<a
				href="#main-content"
				className="absolute top-[-40px] left-0 bg-black text-white px-4 py-2 no-underline z-50 focus:top-0"
			>
				Skip to main content
			</a>

			<div className="max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-16">
				<Header />

				<main id="main-content">
					<ExperienceSection experiences={experiences} />
					<ContactSection />
				</main>

				<Footer />
			</div>
		</>
	);
}
