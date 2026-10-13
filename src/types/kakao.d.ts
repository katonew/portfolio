declare global {
  interface Window {
    kakao?: typeof kakao;
  }

  namespace kakao.maps {
    class LatLng {
      constructor(lat: number, lng: number);
      getLat(): number;
      getLng(): number;
    }

    class Map {
      constructor(container: HTMLElement, options: { center: LatLng; level: number });
      setCenter(position: LatLng): void;
      setMapTypeId(type: MapTypeId): void;
      addOverlayMapTypeId(type: MapTypeId): void;
      removeOverlayMapTypeId(type: MapTypeId): void;
    }

    class Polygon {
      constructor(options: {
        map?: Map;
        path: LatLng[];
        strokeWeight?: number;
        strokeColor?: string;
        strokeOpacity?: number;
        fillColor?: string;
        fillOpacity?: number;
      });
      setMap(map: Map | null): void;
    }

    class CustomOverlay {
      constructor(options: { position: LatLng; content: string | HTMLElement; yAnchor?: number });
      setMap(map: Map | null): void;
      setContent(content: string | HTMLElement): void;
    }

    namespace event {
      function addListener(
        target: Map,
        type: "click",
        handler: (mouseEvent: { latLng: LatLng }) => void
      ): void;
    }

    namespace services {
      class Geocoder {
        addressSearch(
          address: string,
          callback: (
            result: Array<{
              address: {
                address_name: string;
                main_address_no: string;
                sub_address_no: string;
              };
              road_address?: {
                address_name: string;
              };
              x: string;
              y: string;
            }>,
            status: Status
          ) => void
        ): void;

        coord2Address(
          lng: number,
          lat: number,
          callback: (
            result: Array<{
              address: {
                address_name: string;
                main_address_no: string;
                sub_address_no: string;
              };
            }>,
            status: Status
          ) => void
        ): void;
      }

      enum Status {
        OK = "OK"
      }
    }

    enum MapTypeId {
      ROADMAP = 1,
      HYBRID = 3,
      USE_DISTRICT = 6
    }

    function load(callback: () => void): void;
  }
}

export {};
