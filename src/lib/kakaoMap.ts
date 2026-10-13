const KAKAO_SDK_ID = "kakao-map-sdk";
const KAKAO_SDK_TIMEOUT_MS = 15000;
type KakaoSdk = NonNullable<Window["kakao"]>;

const SDK_ERROR_MESSAGES = {
  KEY_MISSING: "지도 서비스 설정을 확인하지 못했습니다.",
  SCRIPT_LOAD_FAILED: "지도 서비스를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.",
  SCRIPT_LOAD_TIMEOUT: "지도 서비스 연결이 지연되고 있습니다. 잠시 후 다시 시도해 주세요.",
  SDK_NOT_READY: "지도 서비스를 초기화하지 못했습니다. 잠시 후 다시 시도해 주세요.",
  SDK_READY_TIMEOUT: "지도 준비 응답이 지연되고 있습니다. 잠시 후 다시 시도해 주세요."
};

export class KakaoSdkError extends Error {
  readonly code: keyof typeof SDK_ERROR_MESSAGES;

  constructor(code: keyof typeof SDK_ERROR_MESSAGES) {
    super(SDK_ERROR_MESSAGES[code]);
    this.name = "KakaoSdkError";
    this.code = code;
  }
}

let kakaoSdkPromise: Promise<KakaoSdk> | null = null;

function getSdkUrl(appKey: string) {
  const params = new URLSearchParams({
    appkey: appKey,
    autoload: "false",
    libraries: "services"
  });

  return `https://dapi.kakao.com/v2/maps/sdk.js?${params.toString()}`;
}

function waitForKakaoLoad() {
  return new Promise<KakaoSdk>((resolve, reject) => {
    const sdk = window.kakao;
    if (typeof sdk?.maps?.load !== "function") {
      reject(new KakaoSdkError("SDK_NOT_READY"));
      return;
    }

    const timeout = window.setTimeout(() => {
      reject(new KakaoSdkError("SDK_READY_TIMEOUT"));
    }, KAKAO_SDK_TIMEOUT_MS);

    try {
      sdk.maps.load(() => {
        window.clearTimeout(timeout);
        const readySdk = window.kakao;
        if (
          typeof readySdk?.maps?.Map !== "function" ||
          typeof readySdk.maps.LatLng !== "function" ||
          typeof readySdk.maps.services?.Geocoder !== "function"
        ) {
          reject(new KakaoSdkError("SDK_NOT_READY"));
          return;
        }

        resolve(readySdk);
      });
    } catch {
      window.clearTimeout(timeout);
      reject(new KakaoSdkError("SDK_NOT_READY"));
    }
  });
}

export async function loadKakaoMapSdk(appKey: string | undefined) {
  const normalizedKey = appKey?.trim();
  if (!normalizedKey) {
    throw new KakaoSdkError("KEY_MISSING");
  }

  if (kakaoSdkPromise) {
    return kakaoSdkPromise;
  }

  const loading = window.kakao?.maps ? waitForKakaoLoad() : new Promise<KakaoSdk>((resolve, reject) => {
    const previousScript = document.getElementById(KAKAO_SDK_ID);
    if (previousScript) {
      previousScript.remove();
    }

    const script = document.createElement("script");
    script.id = KAKAO_SDK_ID;
    script.src = getSdkUrl(normalizedKey);
    script.async = true;

    function fail(code: "SCRIPT_LOAD_FAILED" | "SCRIPT_LOAD_TIMEOUT") {
      window.clearTimeout(timeout);
      script.onload = null;
      script.onerror = null;
      script.remove();
      reject(new KakaoSdkError(code));
    }

    const timeout = window.setTimeout(() => {
      fail("SCRIPT_LOAD_TIMEOUT");
    }, KAKAO_SDK_TIMEOUT_MS);

    script.onload = () => {
      window.clearTimeout(timeout);
      script.onload = null;
      script.onerror = null;
      waitForKakaoLoad()
        .then(resolve)
        .catch(reject);
    };

    script.onerror = () => {
      fail("SCRIPT_LOAD_FAILED");
    };

    document.head.appendChild(script);
  });

  kakaoSdkPromise = loading.catch((error) => {
    kakaoSdkPromise = null;
    throw error;
  });

  return kakaoSdkPromise;
}

export function getKakaoBaseMapType(mapType: "roadmap" | "skyview") {
  if (!window.kakao?.maps) {
    return null;
  }

  if (mapType === "roadmap") {
    return window.kakao.maps.MapTypeId.ROADMAP;
  }

  return window.kakao.maps.MapTypeId.HYBRID;
}

export function getKakaoDistrictOverlayType() {
  if (!window.kakao?.maps) {
    return null;
  }

  return window.kakao.maps.MapTypeId.USE_DISTRICT;
}
