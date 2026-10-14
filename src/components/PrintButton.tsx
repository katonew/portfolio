"use client";

import { usePathname } from "next/navigation";

type PrintButtonProps = {
  hideOnResume?: boolean;
};

export function PrintButton({ hideOnResume = false }: PrintButtonProps) {
  const pathname = usePathname();

  if (hideOnResume && (pathname === "/resume" || pathname === "/resume/")) {
    return null;
  }

  return (
    <button className="print-button" type="button" onClick={() => window.print()}>
      인쇄 · PDF로 저장
    </button>
  );
}
