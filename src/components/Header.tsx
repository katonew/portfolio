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
          <Link href="/#selected-projects">프로젝트</Link>
          <Link href="/#problem-solving">문제 해결</Link>
          <Link href="/#ai-collaboration">AI 개발 도구</Link>
          <Link href="/#career-timeline">경력</Link>
          <Link href="/#tech-stack">기술</Link>
          <Link href="/#contact">연락처</Link>
          <PrintButton />
        </nav>
      </div>
    </header>
  );
}
