"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

/**
 * Presents a case study the way iOS presents a sheet: it slides up, the page behind shrinks back,
 * and Done, Esc, a click outside or dragging the top bar down dismisses it. ← and → page between projects.
 * Rendered by the intercepted /projects/[slug] route, so a direct visit still gets the full page.
 */
export default function Sheet({ children }: { children: React.ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const closing = useRef(false);
  const opener = useRef<HTMLElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const close = useCallback(() => {
    const d = dialog.current;
    if (!d || closing.current) return;
    closing.current = true;
    document.documentElement.classList.remove("sheet-in");
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      // Close the dialog first so the page is no longer inert, then hand focus back: to whatever
      // opened the sheet, or (Safari doesn't focus links on click) the timeline bar of the last project shown.
      d.close();
      const back = opener.current?.isConnected && opener.current !== document.body
        ? opener.current
        : document.querySelector<HTMLElement>(`.bar[data-slug="${location.pathname.split("/").pop()}"]`);
      back?.focus({ preventScroll: true });
      router.back();
    };
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return finish();
    d.addEventListener("transitionend", (e) => e.target === d && finish());
    setTimeout(finish, 650);
  }, [router]);

  // Present on mount.
  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const root = document.documentElement;
    const title = document.title;
    opener.current = document.activeElement as HTMLElement | null;
    root.style.setProperty("--sy", `${window.scrollY}px`);
    if (!d.open) d.showModal();
    void d.offsetHeight; // start the slide from below
    root.classList.add("sheet-in");

    const onCancel = (e: Event) => {
      e.preventDefault();
      close();
    };
    const onClick = (e: MouseEvent) => {
      if (e.target === d) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      d.querySelector<HTMLAnchorElement>(`[data-pager="${e.key === "ArrowLeft" ? "prev" : "next"}"]`)?.click();
    };
    d.addEventListener("cancel", onCancel);
    d.addEventListener("click", onClick);
    d.addEventListener("keydown", onKey);
    return () => {
      root.classList.remove("sheet-in");
      document.title = title;
      d.removeEventListener("cancel", onCancel);
      d.removeEventListener("click", onClick);
      d.removeEventListener("keydown", onKey);
    };
  }, [close]);

  // Drag the top bar down to dismiss.
  useEffect(() => {
    const d = dialog.current, b = bar.current;
    if (!d || !b) return;
    let y0: number | null = null, t0 = 0;
    const down = (e: PointerEvent) => {
      if ((e.target as Element).closest("button")) return;
      y0 = e.clientY;
      t0 = performance.now();
      d.style.transition = "none";
      b.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (y0 !== null) d.style.transform = `translateY(${Math.max(0, e.clientY - y0)}px)`;
    };
    const up = (e: PointerEvent) => {
      if (y0 === null) return;
      const dy = e.clientY - y0, speed = dy / (performance.now() - t0);
      y0 = null;
      d.style.transition = "";
      d.style.transform = "";
      if (dy > 120 || speed > 0.6) close();
    };
    b.addEventListener("pointerdown", down);
    b.addEventListener("pointermove", move);
    b.addEventListener("pointerup", up);
    b.addEventListener("pointercancel", up);
    return () => {
      b.removeEventListener("pointerdown", down);
      b.removeEventListener("pointermove", move);
      b.removeEventListener("pointerup", up);
      b.removeEventListener("pointercancel", up);
    };
  }, [close]);

  // Each project starts at the top, with focus on its title and the title in the tab.
  useEffect(() => {
    const d = dialog.current;
    const h1 = d?.querySelector<HTMLElement>("h1");
    if (!d || !h1) return;
    d.scrollTop = 0;
    h1.focus({ preventScroll: true });
    document.title = `${h1.textContent} | Teuku Fazariz Basya`;
  }, [pathname]);

  return (
    <dialog ref={dialog} className="sheet" aria-labelledby="case-title">
      <div className="sheet-inner">
        <div className="sheetbar" ref={bar}>
          <span className="grabber" aria-hidden="true" />
          <button className="done" type="button" onClick={close}>
            Done
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
