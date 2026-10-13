import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container not-found">
      <h1>페이지를 찾을 수 없습니다</h1>
      <p>요청한 프로젝트가 없거나 주소가 변경되었습니다.</p>
      <Link className="text-link" href="/">
        홈으로 이동
      </Link>
    </main>
  );
}
