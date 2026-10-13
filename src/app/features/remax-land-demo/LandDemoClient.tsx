"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  buildParcelPayload,
  getParcelTotals,
  LandDemoParcel,
  REMAX_DEFAULT_ADDRESS
} from "@/data/remaxLandDemo";
import { getKakaoBaseMapType, getKakaoDistrictOverlayType, KakaoSdkError, loadKakaoMapSdk } from "@/lib/kakaoMap";
import { getParcelDetails, searchParcelByAddress } from "@/lib/vworld";
import styles from "./remax-land-demo.module.css";

type StatusTone = "neutral" | "error" | "success";
type MapViewType = "roadmap" | "skyview" | "use_district";

type StatusMessage = {
  tone: StatusTone;
  text: string;
};

const koreanNumberFormatter = new Intl.NumberFormat("ko-KR");
const KOREAN_MONEY_UNITS = [
  { value: 1000000000000, label: "조" },
  { value: 100000000, label: "억" },
  { value: 10000, label: "만" }
];

function formatKoreanMoney(value: number) {
  const roundedValue = Math.round(value);
  const sign = roundedValue < 0 ? "-" : "";
  let remainingValue = Math.abs(roundedValue);
  const parts: string[] = [];

  for (const unit of KOREAN_MONEY_UNITS) {
    const unitValue = Math.floor(remainingValue / unit.value);

    if (unitValue > 0) {
      parts.push(`${koreanNumberFormatter.format(unitValue)}${unit.label}`);
      remainingValue %= unit.value;
    }
  }

  if (parts.length > 0) {
    return `${sign}${parts.join(" ")}`;
  }

  return `${sign}${koreanNumberFormatter.format(remainingValue)}원`;
}

function formatArea(value: number) {
  return new Intl.NumberFormat("ko-KR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(value);
}

function createOverlayContent(order: number, areaSquareMeter: number) {
  return `
    <div class="${styles.overlayChip}">
      <span class="${styles.overlayIndex}">${order}</span>
      <span class="${styles.overlayArea}">${formatArea(areaSquareMeter)}㎡</span>
    </div>
  `;
}

export default function LandDemoClient({ embedded = false }: { embedded?: boolean }) {
  const PanelHeading = embedded ? "h4" : "h2";
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const geocoderRef = useRef<kakao.maps.services.Geocoder | null>(null);
  const polygonsRef = useRef<Record<string, kakao.maps.Polygon>>({});
  const overlaysRef = useRef<Record<string, kakao.maps.CustomOverlay>>({});
  const currentOverlayTypeRef = useRef<kakao.maps.MapTypeId | null>(null);
  const isProcessingRef = useRef(false);

  const [searchKeyword, setSearchKeyword] = useState(REMAX_DEFAULT_ADDRESS);
  const [selectedParcels, setSelectedParcels] = useState<LandDemoParcel[]>([]);
  const [isMapReady, setIsMapReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mapViewType, setMapViewType] = useState<MapViewType>("roadmap");
  const [status, setStatus] = useState<StatusMessage>({
    tone: "neutral",
    text: "카카오맵을 로드하고 있습니다."
  });

  const payload = useMemo(() => buildParcelPayload(selectedParcels), [selectedParcels]);
  const totals = useMemo(() => getParcelTotals(selectedParcels), [selectedParcels]);

  useEffect(() => {
    const appKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;

    async function initializeMap() {
      try {
        setIsLoading(true);
        setStatus({
          tone: "neutral",
          text: "카카오맵 SDK와 지오코더를 초기화하고 있습니다."
        });

        const kakaoSdk = await loadKakaoMapSdk(appKey);

        if (!mapElementRef.current) {
          return;
        }

        const map = new kakaoSdk.maps.Map(mapElementRef.current, {
          center: new kakaoSdk.maps.LatLng(37.566826, 126.9786567),
          level: 2
        });

        mapRef.current = map;
        geocoderRef.current = new kakaoSdk.maps.services.Geocoder();
        setIsMapReady(true);
        applyMapType("roadmap");

        kakaoSdk.maps.event.addListener(map, "click", (mouseEvent) => {
          void handleMapClick(mouseEvent.latLng);
        });

        setStatus({
          tone: "success",
          text: "지도 준비가 완료되었습니다. 지도를 클릭하면 해당 필지의 polygon과 합계가 표시됩니다."
        });
      } catch (error) {
        console.error("[Kakao Maps]", {
          code: error instanceof KakaoSdkError ? error.code : "MAP_INITIALIZATION_FAILED"
        });
        setStatus({
          tone: "error",
          text: error instanceof KakaoSdkError
            ? error.message
            : "지도를 초기화하지 못했습니다. 잠시 후 다시 시도해 주세요."
        });
      } finally {
        setIsLoading(false);
      }
    }

    void initializeMap();
  }, []);

  useEffect(() => {
    if (!isMapReady) {
      return;
    }

    redrawMapObjects(selectedParcels);
  }, [isMapReady, selectedParcels]);

  function clearMapObjects() {
    for (const polygon of Object.values(polygonsRef.current)) {
      polygon.setMap(null);
    }

    for (const overlay of Object.values(overlaysRef.current)) {
      overlay.setMap(null);
    }

    polygonsRef.current = {};
    overlaysRef.current = {};
  }

  function redrawMapObjects(parcels: LandDemoParcel[]) {
    clearMapObjects();

    const map = mapRef.current;

    if (!map || !window.kakao?.maps) {
      return;
    }

    for (const [index, parcel] of parcels.entries()) {
      const polygonPath = parcel.polygon.map(
        (point) => new window.kakao!.maps.LatLng(point.lat, point.lng)
      );

      if (polygonPath.length < 3) {
        continue;
      }

      const polygon = new window.kakao.maps.Polygon({
        path: polygonPath,
        strokeWeight: 1.2,
        strokeColor: "#0e4f8f",
        strokeOpacity: 0.9,
        fillColor: "#2c7cd6",
        fillOpacity: 0.38
      });

      polygon.setMap(map);
      polygonsRef.current[parcel.pnu] = polygon;

      const overlay = new window.kakao.maps.CustomOverlay({
        position: new window.kakao.maps.LatLng(parcel.point.lat, parcel.point.lng),
        content: createOverlayContent(index + 1, parcel.areaSquareMeter),
        yAnchor: 1.2
      });

      overlay.setMap(map);
      overlaysRef.current[parcel.pnu] = overlay;
    }
  }

  function applyMapType(type: MapViewType) {
    const map = mapRef.current;

    if (!map) {
      return;
    }

    if (currentOverlayTypeRef.current) {
      map.removeOverlayMapTypeId(currentOverlayTypeRef.current);
      currentOverlayTypeRef.current = null;
    }

    if (type === "use_district") {
      const districtOverlayType = getKakaoDistrictOverlayType();

      if (!districtOverlayType) {
        return;
      }

      map.setMapTypeId(getKakaoBaseMapType("roadmap") ?? window.kakao.maps.MapTypeId.ROADMAP);
      map.addOverlayMapTypeId(districtOverlayType);
      currentOverlayTypeRef.current = districtOverlayType;
      setMapViewType(type);
      return;
    }

    const baseMapType = getKakaoBaseMapType(type);

    if (!baseMapType) {
      return;
    }

    map.setMapTypeId(baseMapType);
    setMapViewType(type);
  }

  function toggleParcelSelection(parcel: LandDemoParcel) {
    setSelectedParcels((current) => {
      const exists = current.some((item) => item.pnu === parcel.pnu);

      if (exists) {
        return current.filter((item) => item.pnu !== parcel.pnu);
      }

      return [...current, parcel];
    });
  }

  function resetSelection() {
    setSelectedParcels([]);
    setStatus({
      tone: "neutral",
      text: "선택된 필지를 초기화했습니다."
    });
  }

  async function moveToKeyword() {
    const geocoder = geocoderRef.current;
    const map = mapRef.current;

    if (!geocoder || !map) {
      return;
    }

    const keyword = searchKeyword.trim();

    if (!keyword) {
      setStatus({
        tone: "error",
        text: "이동할 주소를 입력해 주세요."
      });
      return;
    }

    setStatus({
      tone: "neutral",
      text: "입력한 주소로 지도를 이동하고 있습니다."
    });

    geocoder.addressSearch(keyword, (result, geoStatus) => {
      if (geoStatus !== window.kakao?.maps.services.Status.OK || !result[0]) {
        setStatus({
          tone: "error",
          text: "카카오 주소 검색 결과가 없습니다."
        });
        return;
      }

      const lat = Number(result[0].y);
      const lng = Number(result[0].x);
      map.setCenter(new window.kakao!.maps.LatLng(lat, lng));

      setStatus({
        tone: "success",
        text: "지도 위치를 이동했습니다. 이제 원하는 필지를 클릭해 보시면 됩니다."
      });
    });
  }

  async function resolveParcel(lat: number, lng: number, address: string) {
    const search = await searchParcelByAddress(address);

    return getParcelDetails({
      pnu: search.pnu,
      lat: search.point.lat,
      lng: search.point.lng,
      address,
      lotNumber: search.lotNumber
    });
  }

  async function handleMapClick(latLng: kakao.maps.LatLng) {
    const geocoder = geocoderRef.current;

    if (!geocoder || isProcessingRef.current) {
      return;
    }

    isProcessingRef.current = true;
    setStatus({
      tone: "neutral",
      text: "클릭한 위치의 주소와 필지 정보를 조회하고 있습니다."
    });

    try {
      const lat = latLng.getLat();
      const lng = latLng.getLng();

      const address = await new Promise<string>((resolve, reject) => {
        geocoder.coord2Address(lng, lat, (result, geoStatus) => {
          if (geoStatus !== window.kakao?.maps.services.Status.OK || !result[0]?.address?.address_name) {
            reject(new Error("클릭한 위치의 주소를 확인하지 못했습니다."));
            return;
          }

          resolve(result[0].address.address_name);
        });
      });

      const parcel = await resolveParcel(lat, lng, address);
      const exists = selectedParcels.some((item) => item.pnu === parcel.pnu);

      toggleParcelSelection(parcel);
      setStatus({
        tone: "success",
        text: exists
          ? "이미 선택된 필지를 다시 클릭해 해제했습니다."
          : "필지 polygon, 면적, 공시지가를 가져와 목록에 추가했습니다."
      });
    } catch (error) {
      setStatus({
        tone: "error",
        text:
          error instanceof Error
            ? error.message
            : "필지 정보를 가져오는 중 오류가 발생했습니다."
      });
    } finally {
      isProcessingRef.current = false;
    }
  }

  async function copyPayload() {
    await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setStatus({
      tone: "success",
      text: "저장 payload를 클립보드에 복사했습니다."
    });
  }

  return (
    <>
      <section className={`${styles.layout}${embedded ? ` ${styles.embeddedLayout}` : ""}`}>
        <article className={styles.panel}>
          <div className={styles.mapHeader}>
            <div>
              <PanelHeading>실지도 기반 관련지번 선택</PanelHeading>
              {!embedded && <p>카카오맵 클릭과 VWorld 필지 조회를 연결해 실제 polygon과 합계 계산 흐름을 재구성했습니다.</p>}
            </div>
            <button type="button" onClick={resetSelection}>
              선택 초기화
            </button>
          </div>

          <div className={styles.toolbar}>
            <label className={styles.searchBox}>
              <span>대표 주소 이동</span>
              <input
                value={searchKeyword}
                onChange={(event) => setSearchKeyword(event.target.value)}
                placeholder="예: 서울특별시 강남구 역삼동 201-14"
              />
            </label>
            <button type="button" onClick={moveToKeyword}>
              지도 이동
            </button>
          </div>

          <div className={styles.mapTypeButtons}>
            <button
              type="button"
              className={mapViewType === "roadmap" ? styles.mapTypeActive : ""}
              onClick={() => applyMapType("roadmap")}
            >
              지도
            </button>
            <button
              type="button"
              className={mapViewType === "skyview" ? styles.mapTypeActive : ""}
              onClick={() => applyMapType("skyview")}
            >
              스카이뷰
            </button>
            <button
              type="button"
              className={mapViewType === "use_district" ? styles.mapTypeActive : ""}
              onClick={() => applyMapType("use_district")}
            >
              지적편집도
            </button>
          </div>

          <div className={styles.mapStage}>
            <div className={styles.mapCanvasWrap}>
              <div ref={mapElementRef} className={styles.mapCanvas} />
              {isLoading ? <div className={styles.mapLoading}>지도를 준비하고 있습니다.</div> : null}
            </div>
            <div className={styles.parcelHint}>
              <span>선택된 필지 수: {selectedParcels.length}건</span>
              <span>대표 주소로 이동한 뒤 지도를 클릭하면 실제 필지 polygon 조회를 시도합니다.</span>
            </div>
            <div
              className={`${styles.statusBox} ${
                status.tone === "error"
                  ? styles.statusError
                  : status.tone === "success"
                    ? styles.statusSuccess
                    : ""
              }`}
            >
              {status.text}
            </div>
          </div>
        </article>

        <aside className={styles.summaryPanel}>
          <div>
            <PanelHeading>선택 결과</PanelHeading>
            {!embedded && <p>기존 실무처럼 필지 단위 정보와 저장용 데이터를 동시에 확인할 수 있게 구성했습니다.</p>}
          </div>

          <div className={styles.metrics}>
            <div className={styles.metricCard}>
              <span>선택 필지 수</span>
              <strong>{selectedParcels.length}건</strong>
            </div>
            <div className={styles.metricCard}>
              <span>총 면적</span>
              <strong>{formatArea(totals.totalArea)}㎡</strong>
            </div>
            <div className={styles.metricCard}>
              <span>총 공시지가</span>
              <strong>{formatKoreanMoney(totals.totalPrice)}</strong>
            </div>
            <div className={styles.metricCard}>
              <span>저장 payload 행 수</span>
              <strong>{payload.length}건</strong>
            </div>
          </div>

          <div className={styles.selectedList}>
            {selectedParcels.length === 0 ? (
              <div className={styles.empty}>아직 선택된 필지가 없습니다.</div>
            ) : (
              selectedParcels.map((parcel, index) => (
                <article className={styles.selectedItem} key={parcel.pnu}>
                  <div className={styles.selectedItemHeader}>
                    <strong>
                      {index + 1}. {parcel.lotNumber}
                    </strong>
                    <button type="button" onClick={() => toggleParcelSelection(parcel)}>
                      선택 해제
                    </button>
                  </div>
                  <p>{parcel.address}</p>
                  <p>PNU: {parcel.pnu}</p>
                  <p>면적: {formatArea(parcel.areaSquareMeter)}㎡</p>
                  <p>공시지가 합계: {formatKoreanMoney(parcel.officialLandPrice)}</p>
                  <p>공시지가(원/㎡): {formatKoreanMoney(parcel.officialLandPricePerSquareMeter)}</p>
                  <p>용도지역: {parcel.district}</p>
                  <p>이용계획: {parcel.zoning}</p>
                  <p>공시일자: {parcel.officialLandPriceDate || "정보 없음"}</p>
                </article>
              ))
            )}
          </div>
        </aside>
      </section>

      <section className={`${styles.payloadPanel}${embedded ? ` ${styles.embeddedPayload}` : ""}`}>
        <div className={styles.payloadHeader}>
          <div>
            <PanelHeading>저장 payload 미리보기</PanelHeading>
            {!embedded && <p>선택 결과를 포트폴리오용 저장 payload 형태로 정리해 바로 볼 수 있게 했습니다.</p>}
          </div>
          <button type="button" onClick={copyPayload} disabled={payload.length === 0}>
            payload 복사
          </button>
        </div>
        <pre className={styles.payloadPreview}>{JSON.stringify(payload, null, 2)}</pre>
      </section>
    </>
  );
}
