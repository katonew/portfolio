import Link from "next/link";

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/">
          Kwon Taehyung
        </Link>
        <nav className="nav" aria-label="Primary navigation">
          <Link href="/projects/">Projects</Link>
          <Link href="/resume/">Resume</Link>
          <Link href="/#contact">연락처</Link>
        </nav>
      </div>
    </header>
  );
}
