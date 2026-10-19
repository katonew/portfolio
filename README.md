# Java/Spring Developer Portfolio

SI 4년차 Java/Spring 개발자 경력기술서 기반 개인 포트폴리오 사이트입니다.

## 콘텐츠 구조

[PORTFOLIO-DIRECTION.md](PORTFOLIO-DIRECTION.md)를 콘텐츠 변경의 기준으로 사용합니다.

- Project는 시스템·담당 업무의 폭을, Problem Solving은 특정 문제의 판단·구현 깊이를 설명합니다.
- Demo는 기능 증거이며 AI Workflow는 판단과 작업 과정의 보조 증거입니다.
- Project는 `src/data/profile.ts`, Problem Solving과 Project 관계는 `src/data/problem-solving.ts`가 소유합니다.
- Home과 Project는 같은 Problem Solving을 조회해 `/problem-solving/[slug]/`로 연결합니다. 본문을 복제하지 않습니다.
- 부동산 Demo는 기존 경로를 유지합니다. CMS 공개 재구현은 로컬 검증 기록만 확인됐고 배포 주소가 없어 Live Demo 링크를 추가하지 않았습니다.

회사별 경력 기록과 Project 수행 기간을 구분합니다. 서버 이전 작업은 기존 경력 기록을 상세로 연결하되 수행 기간이 확인되지 않아 기간을 표시하지 않습니다. Data Platform의 `/predict` 연계·외부 주문 수집은 이번에 읽은 Portfolio 자료에서 구체 근거를 확인하지 못해 담당 기능으로 추가하지 않았습니다. 모델 학습이나 QueryDSL 대표 사례를 추정해서 만들지 않습니다.

### 구조 정리 및 검증 — 2026-10-19

- 유지: Home Hero·Editorial CSS·부동산 Demo 경로와 기능·Career 회사 단위 History.
- 재구성: CMS·Data Platform의 Project 소개를 업무 범위 중심으로 변경. 서버 이전은 기존 경력 기록을 Project 상세로 연결.
- 이동: 변경 행·마스킹 검사, 최신 상태 개선, 구매 조건 중복 판별, PNU 선택 상태 판단을 독립 Problem Solving으로 연결.
- 제거: 같은 사례를 여러 Project/상세/Home 데이터에 중복 보관하던 사용되지 않는 caseStudy·troubleshooting 표현과 Home의 단순 AI 도구 나열.
- Architecture Review: `architecture-review` 지침으로 데이터 소유권·역참조·직접 소비자·중복 본문을 검토했다. Project와 Problem Solving은 서로 다른 콘텐츠 소유자이며, 둘 사이의 `projectSlug` 관계만 한 곳에서 관리한다. 짧은 Home 소개와 기능 설명의 반복은 서로 다른 독자를 위한 요약이므로 본문 중복과 구분했다.
- 서버 이전은 업무 범위만으로 기술적 Decision을 추정하지 않고 대표 Problem Solving에서 제외했다. 원본 시스템의 실제 담당 범위·성과를 새로 추정하지 않았다.
- `npm run lint`: 오류 0개, 기존 부동산 Demo의 Hook dependency 경고 2개. Demo 기능 수정 금지 범위이므로 자동 변경하지 않았다.
- `npm run build`: 성공. TypeScript 검사와 정적 페이지 생성 16개 완료.
- 정적 결과물 검사: Project 6개·Problem Solving 4개·내부 연결 대상 10개 확인. Hero 유지, Project/Problem Solving 섹션, 미배포 CMS Demo 미노출, Evidence 뒤 AI Workflow 배치를 확인했다. 최초 보조 검사에서 Next 내부 산출물 디렉터리까지 경로로 취급한 오류는 실제 index.html이 있는 경로만 대상으로 수정해 재확인했다.
- `git diff --check`: 공백 오류 없음. Windows 줄바꿈 변환 안내는 발생했다.
- 브라우저·개발 서버·화면 렌더링·Screenshot은 AGENTS.md에 따라 실행하지 않았다. 정적 검사 결과를 시각적·사용성 검증으로 표현하지 않는다.

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

## 정적 검증

```bash
npm run lint
```

기존 Next.js ESLint 규칙으로 `src`를 검사합니다. TypeScript 검사는 `npm run build`에 포함됩니다. 빌드 성공과 실제 브라우저 동작 확인은 구분합니다.

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
