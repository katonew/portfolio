# Java/Spring Developer Portfolio

SI 4년차 Java/Spring 개발자 경력기술서 기반 개인 포트폴리오 사이트입니다.

## Stack

- Next.js App Router
- TypeScript
- Static export
- 전역 CSS와 페이지별 CSS Modules 기반의 문서형 UI

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

배포 파일 생성 명령어는 `npm run package:deploy`입니다. `npm run deploy` 스크립트는 등록되어 있지 않습니다.
프로젝트 루트의 터미널에서 실행합니다.

```powershell
npm run package:deploy
```

이 명령어는 `npm run build`를 먼저 실행한 뒤 최신 정적 결과물과 기존 Nginx 설정을 묶습니다.
생성 파일은 `portfolio-deploy-YYYYMMDD-번호.tar.gz`와 `portfolio-deploy-YYYYMMDD-번호.tar.gz.sha256`입니다.
같은 날짜에 다시 실행하면 번호를 증가시켜 기존 파일을 보존합니다.
파일 생성 후 압축파일을 서버에 전달하고, 압축파일에 포함된 `README.md`의 서버 배포 절차를 따릅니다.
이 npm 명령어는 서버 업로드나 서버 배포까지 자동으로 실행하지 않습니다.

### Vercel

Vercel에서 이 `portfolio` 폴더를 프로젝트 루트로 지정하면 됩니다. `vercel.json`은 `out/` 정적 결과물을 배포하도록 설정되어 있습니다.

### GitHub Pages

`.github/workflows/pages.yml` 파일을 포함했습니다. 저장소 루트가 `portfolio` 폴더가 아니라면 Actions의 working directory를 `portfolio`로 조정하세요.

민감정보, 고객사명, 내부 URL, DB/API Key는 포함하지 않았습니다.
