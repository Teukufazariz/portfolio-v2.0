import Link from "next/link";
import Clock from "./Clock";
import Modes from "./Modes";

export default function Header() {
  return (
    <header className="top grid">
      <p>
        <Link href="/" style={{ textDecoration: "none" }}>
          <b>Teuku Fazariz Basya</b>
        </Link>
        <br />
        DevOps engineer
      </p>
      <p>
        Open to DevOps, platform,
        <br />
        cloud and SRE roles
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
          <Modes />
        </li>
      </ul>
      <Clock />
    </header>
  );
}
