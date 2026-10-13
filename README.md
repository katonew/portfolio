# Java/Spring Developer Portfolio

SI 4년차 Java/Spring 개발자 경력기술서 기반 개인 포트폴리오 사이트입니다.

## Stack

- Next.js App Router
- TypeScript
- Static export
- CSS Modules 없이 전역 CSS 기반의 문서형 UI

## Local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

정적 결과물은 `out/` 폴더에 생성됩니다.

## Deploy

### Docker/Nginx 배포 파일 생성 (Windows)

프로젝트 루트의 터미널에서 실행합니다.

```powershell
npm run package:deploy
```

최신 정적 빌드와 기존 Nginx 설정을 포함한 `portfolio-deploy-날짜-번호.tar.gz` 및 SHA256 파일을 생성합니다.
같은 날짜에 다시 실행하면 번호를 증가시켜 기존 파일을 보존합니다.
압축파일에 포함된 `README.md`의 서버 배포 절차를 사용합니다.

### Vercel

Vercel에서 이 `portfolio` 폴더를 프로젝트 루트로 지정하면 됩니다. `vercel.json`은 `out/` 정적 결과물을 배포하도록 설정되어 있습니다.

### GitHub Pages

`.github/workflows/pages.yml` 파일을 포함했습니다. 저장소 루트가 `portfolio` 폴더가 아니라면 Actions의 working directory를 `portfolio`로 조정하세요.

민감정보, 고객사명, 내부 URL, DB/API Key는 포함하지 않았습니다.
