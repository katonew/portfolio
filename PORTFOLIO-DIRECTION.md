# Portfolio Content Direction

이 문서는 Portfolio 콘텐츠와 연결 구조의 기준이다. 사용자 지시와 AGENTS.md를 따른다. 원칙을 바꿔야 한다면 이유와 영향을 먼저 사용자에게 보고한다.

## 네 가지 역할

- **Project = Breadth:** 어떤 시스템에서 어떤 기능·업무·역할·기술을 다뤘는지 보여준다.
- **Problem Solving = Depth:** 특정 문제의 상황·판단·행동·결과·검증을 깊게 설명한다.
- **Demo = Evidence:** 실제로 다룬 기능을 직접 확인하는 증거다.
- **AI Workflow = Supporting Evidence:** 개발자의 결정과 AI의 수행·검토·검증 범위를 구분한 보조 증거다.

Project를 하나의 Problem Solving으로 축소하지 않는다. 실무 기능 → 기능 증거 → 재검토 → 후속 개선 → AI 기록 순서를 지킨다. AI를 빼도 프로젝트와 담당 업무가 이해되어야 한다.

## 콘텐츠 소유권과 연결

- `src/data/profile.ts`: 프로필·회사별 경력·Project의 업무 범위와 대표 기능을 소유한다. Home용 요약은 소개 길이만 다르게 하며 기술 문제를 Project 전체로 바꾸지 않는다.
- `src/data/problem-solving.ts`: Problem Solving 본문과 `projectSlug` 관계의 기준이다. Project의 연결 목록과 Home Preview는 이 관계로 조회한다. 같은 본문을 Home·Project 데이터에 다시 작성하지 않는다.
- `src/lib/projects.ts`: Project·경력 아카이브 조회를 담당한다. 회사 재직 기간을 프로젝트 수행 기간으로 대신하지 않는다.
- `/projects/[slug]/`: 시스템 개요 → 담당 범위 → 실제 기능 → 대표 기능·Evidence → 연결된 Problem Solving → 기술·운영 맥락.
- `/problem-solving/[slug]/`: Summary → Problem → Decision → Implementation/Action → Result → Evidence/Verification. Decision이 선택 이유를 설명해야 한다.
- Demo 링크는 해당 Project의 `demo`가 소유한다. 확인 가능한 주소가 있을 때만 추가한다. 배포하지 않은 localhost·가짜 Coming Soon·검증되지 않은 주소를 공개 링크로 쓰지 않는다.

기능에 맞는 전용 표현은 유지한다. 모든 Project를 같은 Case Study나 2-column 박스로 만들지 않는다. 기존 Editorial 스타일과 컴포넌트·CSS를 우선 사용한다.

## 사실과 공개 범위

- 측정하지 않은 성과·수치·정확도·운영 장애를 만들지 않는다. 실행 결과와 정적 코드 확인을 구분한다.
- 실제 담당 범위와 기존·공통 코드의 사용·수정·연계를 구분한다. 기존 시스템 전체를 단독 설계했다고 표현하지 않는다.
- 회사 원본 Source는 공개하지 않는다. Public Reconstruction만 공개하고 회사 종속 코드·데이터를 제거한 재구현임을 밝힌다.
- 모델 호출 경험을 모델 학습·알고리즘 개발 경험으로 바꾸지 않는다. QueryDSL은 구체 사례가 확인될 때만 대표 판단으로 사용한다.
- 증거 순서는 Live Demo → 실제 화면 → Public Source → 검증 → PRD/Technical Spec → AI Workflow다. 존재하지 않는 증거를 채우지 않는다.
- 부동산 지도·필지 Demo를 품질 기준점으로 삼는다. 조작만으로 기능과 결과가 보이는지 평가한다.
- Career는 회사 History, Project는 작업 단위, Problem Solving은 문제 해결 단위다. 각 본문을 복제하지 않는다.

## 확장 점검

새 Project는 업무 범위와 담당 근거부터 추가한다. Problem Solving은 특정 문제·판단·검증이 있을 때만 연결한다. Demo는 설명을 줄이고 기능을 증명할 때만 만든다. AI 기록에는 실제 사용한 도구와 개발자 결정만 남긴다.

Home Hero의 `권태형 · 4년차 웹 개발자`와 `신규 개발 · 레거시 유지보수 / 운영 · 배포` 방향을 유지한다. Selected Work는 Project 소개, 문제 해결 영역은 상세로 이동하는 Preview로 사용한다.
