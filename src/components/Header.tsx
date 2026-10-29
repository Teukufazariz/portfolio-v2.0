import Link from "next/link";
import Clock from "./Clock";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="top grid">
      <p>
        <Link href="/" style={{ textDecoration: "none" }}>
          <b>Teuku Fazariz Basya</b>
        </Link>
        <br />
        iOS and macOS engineer
      </p>
      <p>
        Open to iOS roles
        <br />
        and collaborations
      </p>
      <ul className="nav">
        <li>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Resume (PDF)</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/teukufazarizbasya/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </li>
        <li>
          <a href="https://github.com/teukufazariz" target="_blank" rel="noopener noreferrer">GitHub</a>
        </li>
        <li>
          <ThemeToggle />
        </li>
      </ul>
      <Clock />
    </header>
  );
}
