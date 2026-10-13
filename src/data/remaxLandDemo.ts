export type LandPoint = {
  lat: number;
  lng: number;
};

export type LandPolygonPoint = {
  lat: number;
  lng: number;
};

export type LandDemoParcel = {
  id: string;
  pnu: string;
  lotNumber: string;
  address: string;
  district: string;
  zoning: string;
  officialLandPrice: number;
  officialLandPricePerSquareMeter: number;
  officialLandPriceDate: string;
  areaSquareMeter: number;
  point: LandPoint;
  polygon: LandPolygonPoint[];
};

export type LandDemoPayloadRow = {
  order: number;
  parcelId: string;
  pnu: string;
  lotNumber: string;
  address: string;
  areaSquareMeter: number;
  officialLandPrice: number;
  officialLandPricePerSquareMeter: number;
  district: string;
  zoning: string;
};

export const REMAX_DEFAULT_ADDRESS = "서울특별시 강남구 역삼동 201-14";

export function buildParcelPayload(selectedParcels: LandDemoParcel[]): LandDemoPayloadRow[] {
  return selectedParcels.map((parcel, index) => ({
    order: index + 1,
    parcelId: parcel.id,
    pnu: parcel.pnu,
    lotNumber: parcel.lotNumber,
    address: parcel.address,
    areaSquareMeter: parcel.areaSquareMeter,
    officialLandPrice: parcel.officialLandPrice,
    officialLandPricePerSquareMeter: parcel.officialLandPricePerSquareMeter,
    district: parcel.district,
    zoning: parcel.zoning
  }));
}

export function getParcelTotals(selectedParcels: LandDemoParcel[]) {
  return selectedParcels.reduce(
    (acc, parcel) => ({
      totalArea: acc.totalArea + parcel.areaSquareMeter,
      totalPrice: acc.totalPrice + parcel.officialLandPrice
    }),
    { totalArea: 0, totalPrice: 0 }
  );
}
