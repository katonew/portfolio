import Link from "next/link";
import { PrintButton } from "@/components/PrintButton";

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
          <PrintButton hideOnResume />
        </nav>
      </div>
    </header>
  );
}
