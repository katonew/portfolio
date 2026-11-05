"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { PrintButton } from "@/components/PrintButton";

export function Header() {
  const headerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    // Keep anchor offsets independent of the header's own minimum height.
    const updateHeight = () => {
      document.documentElement.style.setProperty("--header-offset", `${header.getBoundingClientRect().height}px`);
    };
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(header);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--header-offset");
    };
  }, []);

  return (
    <header className="site-header" ref={headerRef}>
      <div className="container header-inner">
        <Link className="brand" href="/">
          Kwon Taehyung
        </Link>
        <nav className="nav" aria-label="Primary navigation">
          <Link href="/projects/">Projects</Link>
          <Link href="/resume/">Resume</Link>
          <Link href="/#contact">연락처</Link>
          <PrintButton hideOnResume />
        </nav>
      </div>
    </header>
  );
}
