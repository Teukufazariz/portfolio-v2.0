import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { Children, cloneElement, isValidElement, ViewTransition, type CSSProperties, type ReactNode } from "react";

// Server-rendered building blocks. They only add markup and data attributes;
// components/Motion.tsx is what animates them.

/** Page shell: the mood picks the background palette, the wrapper gives the page its transition. */
export function Page({ mood, children }: { mood: string; children: ReactNode }) {
  return (
    <ViewTransition enter="develop" exit="expose" default="none">
      <main id="main" data-mood={mood}>{children}</main>
    </ViewTransition>
  );
}

function split(node: ReactNode, count: { n: number }): ReactNode {
  return Children.map(node, (child) => {
    if (typeof child === "string") {
      return child.split(/(\s+)/).map((token, i) =>
        token.trim() ? <span className="w" key={i} style={{ "--i": count.n++ } as CSSProperties}>{token}</span> : token,
      );
    }
    if (isValidElement<{ children?: ReactNode }>(child)) return cloneElement(child, undefined, split(child.props.children, count));
    return child;
  });
}

/** Wraps each word in a span, keeping links and emphasis. Words stay inline, so screen readers read the sentence whole. */
export function Words({ children }: { children: ReactNode }) {
  return <>{split(children, { n: 0 })}</>;
}

/** A paragraph whose words resolve as it scrolls into view, or over `at` of its pinned scene. */
export function Reveal({ children, className, at }: { children: ReactNode; className?: string; at?: string }) {
  return <p className={className} data-reveal="" data-at={at}><Words>{children}</Words></p>;
}

/** Oversized type split into letters that gain weight near the pointer. */
export function Kinetic({ text }: { text: string }) {
  return (
    <span data-kinetic="" aria-hidden="true">
      {[...text].map((c, i) => <span className="ch" key={i} style={{ "--i": i } as CSSProperties}>{c}</span>)}
    </span>
  );
}

/** An image on paper. It develops as it scrolls in; the link opens the full-size file. */
export function Figure({ src, alt, caption, at }: { src: StaticImageData; alt: string; caption: ReactNode; at?: string }) {
  return (
    <figure className="fig" data-develop="" data-at={at}>
      <a href={src.src} target="_blank" rel="noreferrer">
        <Image src={src} alt={alt} sizes="(max-width: 760px) 100vw, (max-width: 1500px) 70vw, 1040px" />
        <span className="sr-only"> (opens full size in a new tab)</span>
      </a>
      <figcaption className="label">{caption}</figcaption>
    </figure>
  );
}

export function CaseHead({ kicker, title, lede, facts }: { kicker: string; title: string; lede: ReactNode; facts: [string, string][] }) {
  return (
    <header className="case-head">
      <p className="label">{kicker}</p>
      <h1 className="title" aria-label={title}><Kinetic text={title} /></h1>
      <p className="lede"><Words>{lede}</Words></p>
      <dl className="facts">
        {facts.map(([k, v]) => <div key={k}><dt className="label">{k}</dt><dd>{v}</dd></div>)}
      </dl>
    </header>
  );
}

export function Part({ label, id, children }: { label: string; id?: string; children: ReactNode }) {
  return (
    <section className="part" id={id}>
      <p className="label">{label}</p>
      <div className="part-body">{children}</div>
    </section>
  );
}

export function Next({ href, title }: { href: string; title: string }) {
  return (
    <Link className="next" href={href}>
      <span className="label">Next case study</span>
      <strong>{title}</strong>
    </Link>
  );
}
