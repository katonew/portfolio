import Link from "next/link";
import type { Metadata } from "next";
import { REMAX_DEFAULT_ADDRESS } from "@/data/remaxLandDemo";
import LandDemoClient from "./LandDemoClient";
import styles from "./remax-land-demo.module.css";

export const metadata: Metadata = {
  title: "지도 클릭 기반 관련지번 데모 | Portfolio",
  description: "remax-master에서 구현했던 카카오맵, VWorld 기반 관련지번 선택과 Polygon 렌더링 흐름을 포트폴리오용으로 재구성한 데모"
};

export default function RemaxLandDemoPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>Feature Reconstruction</p>
          <h1>지도 클릭 기반 관련지번 선택 기능</h1>
          <p className={styles.lead}>
            `remax-master`에서 작업했던 카카오맵 클릭, VWorld 필지조회, polygon 렌더링,
            면적 및 공시지가 합계 계산 흐름을 Next.js 환경에 맞춰 다시 구성한 데모입니다.
          </p>
          <p className={styles.lead}>
            <Link href="/" style={{ color: "#183b67", fontWeight: 700 }}>
              메인으로 돌아가기
            </Link>
          </p>
        </section>

        <LandDemoClient />

        <section className={styles.note}>
          <h2>재현 범위</h2>
          <p>
            실제 API를 연결했기 때문에 카카오맵의 지도 인터랙션과 VWorld의 필지/경계 조회를 함께 확인할 수 있습니다.
            다만 응답 가능 여부는 현재 발급된 키 권한 상태에 따라 달라질 수 있습니다.
          </p>
          <ul>
            <li>대표 주소: {REMAX_DEFAULT_ADDRESS}</li>
            <li>카카오맵 지적편집도 토글</li>
            <li>지도 클릭 기반 VWorld 필지 조회</li>
            <li>실제 polygon 렌더링 및 총 면적 / 총 공시지가 계산</li>
            <li>저장용 payload 미리보기</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
