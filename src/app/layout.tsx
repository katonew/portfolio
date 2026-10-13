import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import "./styles.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "권태형 | Java/Spring 업무 시스템 개발자",
  description: "SI 4년차 Java/Spring 기반 업무 시스템 개발자 포트폴리오"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" data-scroll-behavior="smooth">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
