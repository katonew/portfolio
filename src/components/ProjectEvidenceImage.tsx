import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

// Source-pixel bounds select the evidence; the original PNG stays unchanged.
const crops = {
  dashboard: { top: 0, height: 990 },
  trace: { top: 0, height: 1260 },
  material: { top: 0, height: 965 },
  bom: { top: 965, height: 943 },
  quality: { top: 150, height: 591 }
};

type ProjectEvidenceImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  variant: keyof typeof crops;
  caption: string;
  title?: string;
  href?: string;
  home?: boolean;
  priority?: boolean;
};

export function ProjectEvidenceImage({ src, alt, width, height, variant, caption, title, href = src, home = false, priority = false }: ProjectEvidenceImageProps) {
  const crop = crops[variant];
  const frameStyle = {
    "--evidence-ratio": `${width} / ${crop.height}`,
    "--evidence-offset": `${-crop.top / height * 100}%`
  } as CSSProperties;

  return (
    <figure className={`mes-evidence mes-evidence-${variant}${home ? " mes-home-screen" : ""}`}>
      <Link className="mes-evidence-frame" href={href} style={frameStyle} aria-label={`${alt} · ${home ? "프로젝트 상세 보기" : "원본 이미지 보기"}`}>
        <Image src={src} alt={alt} width={width} height={height} sizes={home ? "(max-width: 860px) 100vw, 620px" : "(max-width: 860px) 100vw, 960px"} priority={priority} />
      </Link>
      <figcaption>{title && <strong>{title}</strong>}{caption}{!home && <Link className="mes-evidence-original text-link" href={src}>원본 보기 ↗</Link>}</figcaption>
    </figure>
  );
}
