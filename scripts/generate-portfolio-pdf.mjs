import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, mkdtemp, readFile, realpath, rm, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { dirname, extname, join, resolve, sep } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";

// npm run build && node scripts/generate-portfolio-pdf.mjs
const root = fileURLToPath(new URL("../", import.meta.url));
const exportRoot = resolve(root, "out");
const route = "/portfolio-pdf/";
const output = resolve(root, "docs/portfolio/권태형_웹개발자_포트폴리오_2026.pdf");
const expectedPages = 10;
const browserPath = [
  process.env.PORTFOLIO_CHROME,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium"
].find((candidate) => candidate && existsSync(candidate));

assert(browserPath, "Chrome 또는 Edge의 실행 파일 경로를 PORTFOLIO_CHROME에 지정하세요.");
assert(existsSync(join(exportRoot, route, "index.html")), "npm run build로 PDF 페이지의 정적 파일을 먼저 생성하세요.");

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".png": "image/png",
  ".woff2": "font/woff2"
};

const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://127.0.0.1").pathname);
    const filename = resolve(exportRoot, `.${pathname.endsWith("/") ? `${pathname}index.html` : pathname}`);
    if (!filename.startsWith(exportRoot + sep)) {
      response.writeHead(403).end();
      return;
    }
    const data = await readFile(filename);
    response.writeHead(200, { "Content-Type": contentTypes[extname(filename)] ?? "application/octet-stream" }).end(data);
  } catch {
    response.writeHead(404).end();
  }
});

function connect(browser) {
  const pending = new Map();
  let sequence = 0;
  let buffer = "";
  let failure;

  function fail(error) {
    failure = error;
    for (const { reject } of pending.values()) reject(error);
    pending.clear();
  }

  browser.once("error", fail);
  browser.once("exit", (code) => fail(new Error(`브라우저 종료 (${code})`)));
  browser.stdio[3].on("error", fail);
  browser.stdio[4].setEncoding("utf8").on("data", (chunk) => {
    const parts = (buffer + chunk).split("\0");
    buffer = parts.pop();
    for (const part of parts) {
      const message = JSON.parse(part);
      const callback = pending.get(message.id);
      if (callback) {
        pending.delete(message.id);
        if (message.error) callback.reject(new Error(message.error.message));
        else callback.resolve(message.result);
      }
    }
  });

  return function send(method, params = {}, sessionId) {
    return new Promise((resolve, reject) => {
      if (failure) {
        reject(failure);
        return;
      }
      const id = ++sequence;
      const timeout = setTimeout(() => {
        pending.delete(id);
        reject(new Error(`${method} 응답 시간 초과`));
      }, 30_000);
      pending.set(id, {
        resolve: (value) => { clearTimeout(timeout); resolve(value); },
        reject: (error) => { clearTimeout(timeout); reject(error); }
      });
      browser.stdio[3].write(JSON.stringify({ id, method, params, sessionId }) + "\0");
    });
  };
}

const tempRoot = await realpath(tmpdir());
const browserProfile = await mkdtemp(join(tempRoot, "portfolio-pdf-"));
let browser;
try {
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  browser = spawn(browserPath, [
    "--headless", "--remote-debugging-pipe", "--no-first-run", "--disable-extensions",
    "--disable-background-networking", `--user-data-dir=${browserProfile}`
  ], { windowsHide: true, stdio: ["ignore", "ignore", "ignore", "pipe", "pipe"] });

  const send = connect(browser);
  const { targetId } = await send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
  const page = (method, params) => send(method, params, sessionId);
  const url = `http://127.0.0.1:${server.address().port}${route}`;
  await page("Emulation.setEmulatedMedia", { media: "print" });
  const navigation = await page("Page.navigate", { url });
  assert(!navigation.errorText, navigation.errorText);

  let ready = false;
  for (let attempt = 0; attempt < 60 && !ready; attempt++) {
    const state = await page("Runtime.evaluate", {
      expression: 'document.readyState === "complete" && !!document.querySelector("[data-portfolio-pdf]")',
      returnByValue: true
    });
    ready = state.result.value === true;
    if (!ready) await delay(250);
  }
  assert(ready, "정적 PDF 페이지를 열 수 없습니다.");

  const { result, exceptionDetails } = await page("Runtime.evaluate", {
    expression: `(async () => {
      await document.fonts.ready;
      const documentNode = document.querySelector("[data-portfolio-pdf]");
      const images = Array.from(documentNode.querySelectorAll("img"));
      const decoded = await Promise.allSettled(images.map((image) => image.decode()));
      const sheets = Array.from(documentNode.querySelectorAll("[data-pdf-page]"));
      const overflow = sheets.filter((sheet) => {
        const content = sheet.querySelector("[data-pdf-content]");
        const footer = sheet.querySelector("footer").getBoundingClientRect();
        const bottom = sheet.getBoundingClientRect().bottom;
        return content.scrollWidth > content.clientWidth + 1 ||
          content.getBoundingClientRect().bottom > footer.top + 1 ||
          footer.bottom > bottom + 1;
      }).map((sheet) => sheet.dataset.pdfPage);
      return {
        pages: sheets.map((sheet) => Number(sheet.dataset.pdfPage)),
        failedImages: images.filter((image, index) => !image.naturalWidth || decoded[index].status === "rejected").map((image) => image.alt),
        imageCount: images.length,
        overflow,
        headerHidden: getComputedStyle(document.querySelector(".site-header")).display === "none"
      };
    })()`,
    awaitPromise: true,
    returnByValue: true
  });
  assert(!exceptionDetails, exceptionDetails?.exception?.description);
  const report = result.value;
  assert.deepEqual(report.pages, Array.from({ length: expectedPages }, (_, index) => index + 1), "PDF 문서의 페이지 순서가 올바르지 않습니다.");
  assert(report.imageCount > 0 && report.failedImages.length === 0, `스크린샷 로딩 실패: ${report.failedImages.join(", ")}`);
  assert(report.overflow.length === 0 && report.headerHidden, `인쇄 레이아웃 검사 실패: ${JSON.stringify(report)}`);

  const { data } = await page("Page.printToPDF", {
    preferCSSPageSize: true,
    printBackground: true,
    displayHeaderFooter: false,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0
  });
  const pdf = Buffer.from(data, "base64");
  const pageCount = (pdf.toString("latin1").match(/\/Type\s*\/Page\b/g) ?? []).length;
  assert.equal(pageCount, expectedPages, "Chrome이 생성한 PDF 페이지 수가 올바르지 않습니다.");
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, pdf);
  console.log(`${pageCount}쪽 · 이미지 ${report.imageCount}개 · ${output}`);
} finally {
  if (browser?.pid && browser.exitCode === null && browser.signalCode === null) {
    const exited = new Promise((resolve) => browser.once("exit", resolve));
    browser.kill();
    await exited;
  }
  server.closeAllConnections();
  server.close();
  assert.equal(dirname(browserProfile), tempRoot);
  await rm(browserProfile, { recursive: true, force: true, maxRetries: 8 });
}
