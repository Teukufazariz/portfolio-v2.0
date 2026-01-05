export default function Header() {
  return (
    <header className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mb-20 pb-16 border-b-2 border-black dark:border-white">
      {/* Left Side */}
      <div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none mb-6">
          Hi, I'm Riz!
        </h1>
        <p className="text-2xl md:text-3xl text-gray-600 dark:text-gray-400 font-semibold mb-4">
          Teuku Fazariz Basya · iOS Developer
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          📍 Jakarta, Indonesia
        </p>
        <nav aria-label="Quick navigation">
          <div className="flex gap-3 flex-wrap">
            <a
              href="#projects"
              className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold border-2 border-black dark:border-white hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white transition-all duration-200"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold border-2 border-black dark:border-white hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white transition-all duration-200"
            >
              Contact
            </a>
            <a
              href="https://github.com/teukufazariz"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold border-2 border-black dark:border-white hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white transition-all duration-200"
            >
              GitHub
            </a>
          </div>
        </nav>
      </div>

      {/* Right Side */}
      <div className="flex flex-col justify-center">
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-3">About</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Apple Developer Academy 2025 mentee specializing in multiplatform iOS
            and macOS development. Building clean, scalable, and user-friendly
            experiences with Swift, SwiftUI, and UIKit.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-3">Education</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Computer Science student at Multimedia Nusantara University with a GPA
            of 3.57/4. Currently focused on advancing iOS development skills
            through hands-on project work.
          </p>
        </div>
      </div>
    </header>
  );
}