import Header from "@/components/Header";
import ThemeToggle from "@/components/ThemeToggle";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const academyProjects = [
	{
		number: "01",
		title: "RiSTOCK",
		role: "Software Engineer",
		description:
			"Multiplatform stock management application for iOS and macOS that prevents inventory problems through priority-based recommendations and CSV integration.",
		technologies: "Technologies: SwiftUI, UIKit, AppKit",
		year: "2025",
		imageAlt: "RiSTOCK application interface showing stock management dashboard",
	},
	{
		number: "02",
		title: "COCO.CO",
		role: "iOS Developer",
		description:
			"Snorkeling trip booking application with collaborative features that drive user acquisition through smarter group-based travel planning.",
		technologies: "Technologies: SwiftUI, UIKit, Swift Testing, SwiftLint",
		year: "2025",
		imageAlt: "COCO.CO snorkeling booking app showing trip selection interface",
	},
	{
		number: "03",
		title: "Kevin",
		role: "macOS Developer",
		description:
			"macOS speech training application that analyzes user speech delivery and provides immediate improvement feedback using machine learning.",
		technologies: "Technologies: SwiftUI, CoreML, AVFoundation, SwiftData",
		year: "2025",
		imageAlt: "Kevin speech training app showing speech analysis and feedback interface",
	},
	{
		number: "04",
		title: "Swifter",
		role: "iOS Developer",
		description:
			"iOS jogging routine planner that intelligently schedules workouts around calendar commitments with EventKit integration.",
		technologies: "Technologies: SwiftUI, SwiftData, EventKit",
		year: "2025",
		imageAlt: "Swifter jogging app showing calendar integration and workout schedule",
	},
];

const frontendProjects = [
	{
		number: "05",
		title: "Wedding Platform",
		role: "Frontend Developer at PT. Jaya Santoso Teknologi",
		description:
			"Developed responsive wedding invitation websites with QR-based guest management system ensuring optimal performance across all devices.",
		technologies: "Technologies: React.js, Tailwind CSS, REST APIs",
		year: "2025",
		imageAlt: "Wedding invitation website showing responsive design and QR code guest management",
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
					<ProjectsSection
						title="Apple Developer Academy"
						meta="March 2025 - December 2025 | 4 Projects"
						projects={academyProjects}
						headingId="academy-heading"
					/>

					<ProjectsSection
						title="Frontend Development"
						meta="January 2025 - July 2025 | Client Work"
						projects={frontendProjects}
						headingId="frontend-heading"
					/>

					<ContactSection />
				</main>

				<Footer />
			</div>
		</>
	);
}
