export default function Header() {
  return (
    <header className="mb-8 md:mb-20">
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
            <div className="flex items-center gap-4 flex-wrap">

              <a
                href="/resume.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold border-2 border-black dark:border-white hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white transition-all duration-200"
                aria-label="Download Resume"
              >
                Resume
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                  />
                </svg>
              </a>

              {/* Social Icons */}
              <div className="flex items-center gap-4">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/teukufazarizbasya/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-6 h-6 flex items-center justify-center hover:opacity-70 transition-opacity duration-200"
                  aria-label="LinkedIn Profile"
                >
                  <svg 
                    className="w-full h-full" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/teukufazariz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center hover:opacity-70 transition-opacity duration-200"
                  aria-label="GitHub Profile"
                >
                  <svg 
                    className="w-full h-full" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                  </svg>
                </a>

                {/* Email - Now filled */}
                <a
                  href="mailto:teukufazarizbasya@gmail.com"
                  className="w-8 h-8 flex items-center justify-center hover:opacity-70 transition-opacity duration-200"
                  aria-label="Email Contact"
                >
                  <svg 
                    className="w-full h-full" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                  </svg>
                </a>
              </div>
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
