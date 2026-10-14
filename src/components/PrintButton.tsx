"use client";

export function PrintButton() {
  return (
    <button className="print-button" type="button" onClick={() => window.print()}>
      인쇄 · PDF로 저장
    </button>
  );
}
