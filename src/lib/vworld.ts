import { LandDemoParcel, LandPolygonPoint } from "@/data/remaxLandDemo";

type VWorldSearchResponse = {
  response?: {
    status?: string;
    result?: {
      items?: Array<{
        id: string;
        title?: string;
        address?: {
          parcel?: string;
        };
        point?: {
          x: string;
          y: string;
        };
      }>;
    };
    error?: {
      text?: string;
    };
  };
};

type VWorldLadfrlResponse = {
  ladfrlVOList?: {
    error?: string;
    message?: string;
    ladfrlVOList?: Array<{
      lndpclAr?: number | string;
      lndcgrCodeNm?: string;
    }>;
  };
};

type VWorldLandUseResponse = {
  landUses?: {
    field?: Array<{
      prposAreaDstrcCodeNm?: string;
      cnflcAt?: string;
    }>;
  };
};

type VWorldIndvdLandPriceResponse = {
  indvdLandPrices?: {
    field?: Array<{
      pblntfPclnd?: number | string;
      pblntfDe?: string;
    }>;
  };
};

type VWorldFeatureResponse = {
  response?: {
    status?: string;
    result?: {
      featureCollection?: {
        features?: Array<{
          geometry?: {
            type?: string;
            coordinates?: unknown;
          };
        }>;
      };
    };
    error?: {
      text?: string;
    };
  };
};

function getRequiredKey() {
  const key = process.env.NEXT_PUBLIC_VWORLD_KEY;

  if (!key) {
    throw new Error("VWorld 키가 설정되어 있지 않습니다.");
  }

  return key;
}

function getDomain() {
  return window.location.origin;
}

function buildUrl(path: string, params: Record<string, string>) {
  const searchParams = new URLSearchParams(params);
  return `https://api.vworld.kr${path}?${searchParams.toString()}`;
}

function jsonpRequest<T>(url: string) {
  return new Promise<T>((resolve, reject) => {
    const callbackName = `__vworld_jsonp_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement("script");
    const jsonpWindow = window as unknown as Window & Record<string, unknown>;
    const cleanup = () => {
      delete jsonpWindow[callbackName];
      script.remove();
    };

    jsonpWindow[callbackName] = (data: T) => {
      cleanup();
      resolve(data);
    };

    script.onerror = () => {
      cleanup();
      reject(new Error("VWorld JSONP 요청에 실패했습니다."));
    };

    script.src = `${url}&callback=${callbackName}`;
    document.body.appendChild(script);
  });
}

function normalizeDistrictNames(fields: Array<{ prposAreaDstrcCodeNm?: string; cnflcAt?: string }> = []) {
  const primary: string[] = [];
  const secondary: string[] = [];

  for (const field of fields) {
    const name = field.prposAreaDstrcCodeNm?.trim();

    if (!name) {
      continue;
    }

    if (field.cnflcAt && field.cnflcAt !== "3") {
      if (!primary.includes(name)) {
        primary.push(name);
      }
      continue;
    }

    if (!secondary.includes(name)) {
      secondary.push(name);
    }
  }

  return {
    district: primary.join(", ") || secondary[0] || "정보 없음",
    zoning: secondary.join(", ") || primary.join(", ") || "정보 없음"
  };
}

function extractPolygon(geometry: { type?: string; coordinates?: unknown } | undefined): LandPolygonPoint[] {
  if (!geometry?.coordinates) {
    return [];
  }

  const coordinates = geometry.coordinates;
  let target: unknown[] = [];

  if (geometry.type === "Polygon") {
    target = Array.isArray(coordinates) ? (((coordinates as unknown[])[0] as unknown[]) ?? []) : [];
  } else if (geometry.type === "MultiPolygon") {
    target = Array.isArray(coordinates)
      ? (((((coordinates as unknown[])[0] as unknown[])[0] as unknown[]) ?? []) as unknown[])
      : [];
  }

  return target
    .filter((point): point is [number, number] => Array.isArray(point) && point.length >= 2)
    .map((point) => ({
      lng: Number(point[0]),
      lat: Number(point[1])
    }));
}

function parseNumber(value: number | string | undefined) {
  if (typeof value === "number") {
    return value;
  }

  if (!value) {
    return 0;
  }

  return Number(String(value).replace(/,/g, ""));
}

export async function searchParcelByAddress(query: string) {
  const key = getRequiredKey();
  const url = buildUrl("/req/search", {
    service: "search",
    version: "2.0",
    request: "search",
    format: "json",
    size: "1",
    page: "1",
    type: "ADDRESS",
    category: "PARCEL",
    query,
    key
  });

  const data = await jsonpRequest<VWorldSearchResponse>(url);

  if (data.response?.status !== "OK") {
    throw new Error(data.response?.error?.text || "VWorld 주소 검색 결과가 없습니다.");
  }

  const item = data.response.result?.items?.[0];

  if (!item?.point?.x || !item.point?.y) {
    throw new Error("VWorld 주소 검색 좌표가 비어 있습니다.");
  }

  return {
    pnu: item.id,
    point: {
      lng: Number(item.point.x),
      lat: Number(item.point.y)
    },
    lotNumber: item.address?.parcel || item.title || ""
  };
}

export async function getParcelDetails(params: {
  pnu: string;
  lat: number;
  lng: number;
  address: string;
  lotNumber: string;
}): Promise<LandDemoParcel> {
  const key = getRequiredKey();
  const domain = getDomain();

  const [landInfo, landUse, landPrice, feature] = await Promise.all([
    jsonpRequest<VWorldLadfrlResponse>(
      buildUrl("/ned/data/ladfrlList", {
        key,
        domain,
        pnu: params.pnu,
        numOfRows: "30",
        pageNo: "1"
      })
    ),
    jsonpRequest<VWorldLandUseResponse>(
      buildUrl("/ned/data/getLandUseAttr", {
        key,
        domain,
        pnu: params.pnu,
        numOfRows: "30",
        pageNo: "1"
      })
    ),
    jsonpRequest<VWorldIndvdLandPriceResponse>(
      buildUrl("/ned/data/getIndvdLandPriceAttr", {
        key,
        domain,
        pnu: params.pnu,
        numOfRows: "30",
        pageNo: "1"
      })
    ),
    jsonpRequest<VWorldFeatureResponse>(
      buildUrl("/req/data", {
        service: "data",
        request: "GetFeature",
        data: "LP_PA_CBND_BUBUN",
        geomfilter: `POINT(${params.lng} ${params.lat})`,
        format: "json",
        size: "1",
        page: "1",
        domain,
        key
      })
    )
  ]);

  if (landInfo.ladfrlVOList?.error) {
    throw new Error(landInfo.ladfrlVOList.message || landInfo.ladfrlVOList.error);
  }

  if (feature.response?.status !== "OK") {
    throw new Error(feature.response?.error?.text || "VWorld polygon 조회에 실패했습니다.");
  }

  const landInfoItem = landInfo.ladfrlVOList?.ladfrlVOList?.[0];
  const landUseFields = landUse.landUses?.field ?? [];
  const priceFields = landPrice.indvdLandPrices?.field ?? [];
  const latestPrice = priceFields.at(-1);
  const polygonFeature = feature.response?.result?.featureCollection?.features?.[0];
  const polygon = extractPolygon(polygonFeature?.geometry);
  const areaSquareMeter = parseNumber(landInfoItem?.lndpclAr);
  const officialLandPricePerSquareMeter = parseNumber(latestPrice?.pblntfPclnd);
  const districtInfo = normalizeDistrictNames(landUseFields);

  return {
    id: params.pnu,
    pnu: params.pnu,
    lotNumber: params.lotNumber || params.address.split(" ").at(-1) || params.pnu,
    address: params.address,
    district: districtInfo.district,
    zoning: districtInfo.zoning,
    officialLandPrice: Math.round(areaSquareMeter * officialLandPricePerSquareMeter),
    officialLandPricePerSquareMeter,
    officialLandPriceDate: latestPrice?.pblntfDe || "",
    areaSquareMeter,
    point: {
      lat: params.lat,
      lng: params.lng
    },
    polygon
  };
}
