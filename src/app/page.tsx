import Header from "@/components/Header";
import ThemeToggle from "@/components/ThemeToggle";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { experiences } from "@/data/portfolio";

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
