export default function Header() {
  return (
    <header className="mb-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 px-0 py-16 border-b border-black/20 dark:border-white/20">

        {/* Left Side — Identity */}
        <div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none mb-6">
            Hi, I&apos;m Riz!
          </h1>

          <div className="mb-6">
            <p className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300">
              Teuku Fazariz Basya · iOS Developer
            </p>
            <p className="text-base text-gray-500 dark:text-gray-400 mt-1">
              Jakarta, Indonesia
            </p>
          </div>

          <nav aria-label="Quick navigation">
            <div className="flex gap-3 flex-wrap">
              {[
                { label: "Projects", href: "#projects" },
                { label: "Contact", href: "#contact" },
                { label: "GitHub", href: "https://github.com/teukufazariz", external: true },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold border-2 border-black dark:border-white hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white transition-all duration-200"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        </div>

        {/* Right Side — Context */}
        <div className="flex flex-col justify-center gap-10 max-w-xl">
          <div>
            <h2 className="text-sm font-bold tracking-wide uppercase mb-3">
              About
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Apple Developer Academy 2025 mentee specializing in multiplatform iOS
              and macOS development. Focused on building clean, scalable, and
              user-friendly experiences with Swift, SwiftUI, and UIKit.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold tracking-wide uppercase mb-3">
              Education
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Computer Science student at Multimedia Nusantara University (GPA
              3.57/4), currently advancing iOS development skills through hands-on
              project work.
            </p>
          </div>
        </div>

      </div>
    </header>
  );
}
