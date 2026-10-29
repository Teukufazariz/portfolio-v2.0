import CopyEmail from "./CopyEmail";

const EMAIL = "teukufazarizbasya@gmail.com";

export default function ContactSection() {
  return (
    <section className="section grid" id="contact" aria-labelledby="contact-heading">
      <h2 id="contact-heading">Contact</h2>
      <div className="content">
        <a className="email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
        <div className="links">
          <CopyEmail email={EMAIL} />
          <a href="https://www.linkedin.com/in/teukufazarizbasya/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/teukufazariz" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Resume (PDF)</a>
        </div>
      </div>
    </section>
  );
}
