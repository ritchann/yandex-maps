module ymaps {
  export class Map {
    constructor(parentElement: object | string, state: MapState, options?: MapOptions);
  }

  export class MapState {
    behaviors?: string[] = ['default'];
    bounds?: number[][];
    center?: number[];
    controls?: string[] = ['default'];
    margin?: number | number[];
    type?: string | 'yandex#map' | 'yandex#satellite' | 'yandex#hybrid' | ymaps.MapType = 'yandex#map';
    zoom?: number;
  }

  export class MapOptions {
    autoFitToViewport: 'none' | 'ifNull' | 'always' = 'ifNull';
    avoidFractionalZoom: boolean = true;
    exitFullscreenByEsc: boolean = true;
    fullscreenZIndex: number = 10000;
    mapAutoFocus: boolean = true;
    maxAnimationZoomDifference: number = 5;
    maxZoom: number = 23;
    minZoom: number = 0;
    nativeFullscreen: boolean = false;
    projection: ymaps.interfaces.IProjection = ymaps.projection.wgs84Mercator;
    restrictMapArea: boolean | number[][] = false;
    suppressMapOpenBlock: boolean = false;
    suppressObsoleteBrowserNotifier: boolean = false;
    yandexMapAutoSwitch: boolean = true;
    yandexMapDisablePoiInteractivity: boolean = false;
  }
}
