export default function ContactSection() {
  return (
    <section
      className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 pt-16 border-t-2 border-black dark:border-white"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div>
        <h2
          id="contact-heading"
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-none"
        >
          Let&apos;s work together
        </h2>
      </div>
      <div className="flex flex-col justify-center">
        <div className="mb-8">
          <h3 className="text-sm font-bold mb-3">Email</h3>
          <div className="mb-3">
            <a
              href="mailto:teukufazarizbasya@gmail.com"
              className="text-lg underline underline-offset-4 decoration-2 hover:text-blue-600 dark:hover:text-blue-400 hover:decoration-[3px] transition-all duration-200 font-medium"
            >
              teukufazarizbasya@gmail.com
            </a>
          </div>
        </div>
        <div className="mb-8">
          <h3 className="text-sm font-bold mb-3">Professional Links</h3>
          <div className="mb-3">
            <a
              href="https://linkedin.com/in/teukufazarizbasya"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg underline underline-offset-4 decoration-2 hover:text-blue-600 dark:hover:text-blue-400 hover:decoration-[3px] transition-all duration-200 font-medium"
            >
              LinkedIn Profile
            </a>
          </div>
          <div className="mb-3">
            <a
              href="https://github.com/teukufazariz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg underline underline-offset-4 decoration-2 hover:text-blue-600 dark:hover:text-blue-400 hover:decoration-[3px] transition-all duration-200 font-medium"
            >
              GitHub Profile
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-bold mb-3">Currently Open To:</h3>
          <div className="mb-3">
            <span className="text-lg text-gray-600 dark:text-gray-400">
              - iOS Development Opportunities
            </span>
          </div>
          <div className="mb-3">
            <span className="text-lg text-gray-600 dark:text-gray-400">
              - Collaborations and Projects
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}