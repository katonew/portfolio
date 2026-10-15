# 포트폴리오 Docker 배포

MobaXterm으로 배포 압축파일을 업로드하고, 서버에서 `web` 폴더를 교체합니다.
현재 배포 파일은 `portfolio-deploy-20261008-2.tar.gz`입니다.
다음 배포에서는 아래 명령의 `release` 값만 실제 압축파일 이름에 맞게 바꿉니다.
확장자 `.tar.gz`는 `release` 값에 넣지 않습니다.

## 배포 구성

- 서버 작업 폴더: `/home/ubuntu/portfolio`
- `compose.yaml`: 정적 사이트를 제공하는 Nginx 컨테이너 설정
- `nginx.conf`: 메인 페이지, 상세 경로와 404 응답 설정
- `web/`: Next.js 정적 빌드 결과물인 `out/`의 내용
- 압축 해제 폴더: `portfolio-deploy-20261008-2/`

Docker Compose V2와 기존 외부 네트워크 `npm_default`를 사용합니다.
Nginx Proxy Manager가 같은 네트워크의 `portfolio:80`으로 요청을 전달하고 HTTPS를 처리합니다.
호스트에 별도 포트를 공개하지 않습니다. 서버에서 Node.js 빌드를 실행할 필요는 없습니다.

## 현재 서버에 업데이트 배포

이미 `/home/ubuntu/portfolio`에 `compose.yaml`, `nginx.conf`, `web/`이 있는 경우입니다.

### 1. MobaXterm 업로드

SSH로 서버에 접속한 뒤, 왼쪽 SFTP 패널에서 `/home/ubuntu/portfolio`를 엽니다.
`portfolio-deploy-20261008-2.tar.gz`를 이 폴더에 업로드합니다.

### 2. 압축 해제, 백업, web 교체

아래 블록을 서버 터미널에서 실행합니다.
`&&`로 연결되어 있어 앞 단계가 실패하면 다음 단계는 실행되지 않습니다.

```bash
cd /home/ubuntu/portfolio &&
release="portfolio-deploy-20261014-1" &&
tar -xzf "${release}.tar.gz" &&
test -f "${release}/web/index.html" &&
test -f "${release}/web/projects/enterprise-cms-erp/index.html" &&
test -f "${release}/web/projects/data-market-platform/index.html" &&
test -f "${release}/web/projects/real-estate-admin-map/index.html" &&
test -d web &&
sudo docker compose config --quiet &&
backup_dir="web_backup_$(date +%Y%m%d_%H%M%S)" &&
test ! -e "$backup_dir" &&
printf '백업 폴더: %s\n' "$backup_dir" &&
sudo mv web "$backup_dir" &&
sudo cp -a "${release}/web" ./web &&
sudo docker compose up -d --force-recreate --wait --wait-timeout 60 &&
sudo docker compose ps
```

기존 `web/`은 `web_backup_날짜_시간/`으로 보관됩니다.
기존 서버의 `compose.yaml`과 `nginx.conf`는 그대로 사용합니다.
`web` 폴더를 교체하면 실행 중인 컨테이너가 이전 폴더를 계속 참조할 수 있으므로
`--force-recreate`로 컨테이너를 다시 생성합니다.
`rsync` 설치나 별도의 중복 백업은 필요하지 않습니다.

명령이 실패하면 다음 블록을 이어서 실행하지 말고, 실패한 단계와 출력된 백업 폴더명을 확인합니다.
`web` 교체 후 실행이 실패했다면 아래 복구 절차를 사용합니다.

### 3. 배포 확인

```bash
cd /home/ubuntu/portfolio &&
sudo docker compose ps &&
sudo docker compose exec -T portfolio nginx -t &&
sudo docker compose exec -T portfolio wget -S --spider http://127.0.0.1/ &&
sudo docker compose exec -T portfolio wget -S --spider http://127.0.0.1/projects/enterprise-cms-erp/ &&
sudo docker compose exec -T portfolio wget -S --spider http://127.0.0.1/projects/data-market-platform/ &&
sudo docker compose exec -T portfolio wget -S --spider http://127.0.0.1/projects/real-estate-admin-map/
```

컨테이너 상태가 `healthy`, Nginx 설정 검사가 성공, 페이지 응답이 `200 OK`인지 확인합니다.
이후 `https://katonew.kro.kr`에서 메인과 대표 상세 3개를 직접 확인합니다.
이전 화면이 보이면 브라우저에서 강력 새로고침합니다.

## 문제 발생 시 복구

백업 폴더명을 먼저 확인합니다.

```bash
cd /home/ubuntu/portfolio &&
ls -dt web_backup_*
```

아래 `restore_dir`를 실제 복구할 백업 폴더명으로 바꾼 뒤 실행합니다.
현재 `web/`이 있다면 삭제하지 않고 별도 이름으로 보관합니다.

```bash
cd /home/ubuntu/portfolio &&
restore_dir="web_backup_YYYYMMDD_HHMMSS" &&
test -d "$restore_dir" &&
test -f "$restore_dir/index.html" &&
failed_dir="web_failed_$(date +%Y%m%d_%H%M%S)" &&
test ! -e "$failed_dir" &&
if [ -e web ]; then sudo mv web "$failed_dir"; fi &&
sudo cp -a "$restore_dir" ./web &&
sudo docker compose up -d --force-recreate --wait --wait-timeout 60 &&
sudo docker compose ps
```

복구 후 위의 배포 확인 명령을 다시 실행합니다.

## 첫 배포인 경우

기존 `web/`이 없는 새 서버 폴더에서만 사용합니다.
먼저 MobaXterm SFTP에서 `/home/ubuntu/portfolio`를 만들고 압축파일을 업로드합니다.
기존 Nginx Proxy Manager의 `npm_default` 네트워크가 있어야 합니다.

```bash
cd /home/ubuntu/portfolio &&
release="portfolio-deploy-20261008-2" &&
tar -xzf "${release}.tar.gz" &&
test ! -e web &&
test ! -e compose.yaml &&
test ! -e nginx.conf &&
test -f "${release}/web/index.html" &&
sudo docker network inspect npm_default >/dev/null &&
cp "${release}/compose.yaml" ./compose.yaml &&
cp "${release}/nginx.conf" ./nginx.conf &&
cp -a "${release}/web" ./web &&
sudo docker compose config --quiet &&
sudo docker compose up -d --wait --wait-timeout 60 &&
sudo docker compose ps
```

이후 배포 확인 명령을 실행하고, Nginx Proxy Manager의 기존 `katonew.kro.kr` 항목을 확인합니다.
같은 도메인으로 Proxy Host를 중복 생성하지 않습니다.

| 항목 | 값 |
| --- | --- |
| Domain Names | katonew.kro.kr |
| Scheme | http |
| Forward Hostname / IP | portfolio |
| Forward Port | 80 |
| SSL | 기존 인증서와 Force SSL 유지 |

기존 `soccer` 컨테이너와 파일은 변경하지 않습니다.

## 빌드 및 API 설정

페이지 변경 후에는 개발 PC에서 새 정적 빌드를 만들고 전체 `out/`을 `web/`에 포함해 다시 압축합니다.
Nginx 배포용 빌드는 `DEPLOY_TARGET`을 `github-pages`로 설정하지 않은 상태에서 생성합니다.
지도 API의 공개 클라이언트 설정은 빌드 시 반영되므로, 서버에서 환경파일만 바꿔서는 갱신되지 않습니다.
카카오 JavaScript SDK 허용 도메인과 VWorld 서비스 URL에 `https://katonew.kro.kr`이 등록되어 있는지 확인합니다.
