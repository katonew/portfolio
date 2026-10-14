"use client";

import { usePathname } from "next/navigation";

export function PrintButton() {
  const pathname = usePathname();

  if (pathname !== "/") {
    return null;
  }

  return (
    <button className="print-button" type="button" onClick={() => window.print()}>
      인쇄 · PDF로 저장
    </button>
  );
}
