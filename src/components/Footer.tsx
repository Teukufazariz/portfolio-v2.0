export default function Footer() {
  return (
    <footer className="colophon grid cap muted">
      <p>© {new Date().getFullYear()} Teuku Fazariz Basya</p>
      <p>
        Grain and frame after{" "}
        <a href="https://p5aholic.me" target="_blank" rel="noopener noreferrer">
          Keita Yamada’s p5aholic.me
        </a>
        .
      </p>
    </footer>
  );
}
