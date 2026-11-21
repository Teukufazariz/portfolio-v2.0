import Link from "next/link";
import { Page } from "@/components/parts";

export default function NotFound() {
  return (
    <Page mood="home">
      <section className="hero">
        <p className="label hero-kicker">404</p>
        <h1 className="display">Nothing at this address.</h1>
        <div className="hero-sub">
          <p className="links label">
            <Link href="/">Home</Link>
            <Link href="/#work">Work</Link>
            <Link href="/#contact">Contact</Link>
          </p>
        </div>
      </section>
    </Page>
  );
}
