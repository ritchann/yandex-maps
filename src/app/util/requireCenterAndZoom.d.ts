module ymaps {
  export module util {
    export function requireCenterAndZoom(
      mapType: string | MapType | map.ZoomRange,
      bounds: number[][],
      containerSize: number[],
      params?: RequireCenterAndZoomParams
    ): vow.Promise;

    export class RequireCenterAndZoomParams {
      inscribe: boolean = true;
      margin: number | number[] = 0;
      preciseZoom: boolean = false;
    }
  }
}
