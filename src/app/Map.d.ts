declare module ymaps {
  export class Map {
    constructor(parentElement: object | string, state: MapState, options?: MapOptions);
  }

  export class MapState {
    behaviors?: string[];
    bounds?: number[][];
    center?: number[];
    controls?: string[] = ['default'];
    margin?: number | number[];
    type?: string | 'yandex#map' | 'yandex#satellite' | 'yandex#hybrid' | ymaps.MapType = 'yandex#map';
    zoom?: number;
  }

  export class MapOptions {
    autoFitToViewport: 'none' | 'ifNull' | 'always';
    avoidFractionalZoom: boolean;
    exitFullscreenByEsc: boolean;
    fullscreenZIndex: number;
    mapAutoFocus: boolean;
    maxAnimationZoomDifference: number;
    maxZoom: number;
    minZoom: number;
    nativeFullscreen: boolean;
    projection: ymaps.interfaces.IProjection;
    restrictMapArea: boolean | number[][];
    suppressObsoleteBrowserNotifier: boolean;
    yandexMapAutoSwitch: boolean;
  }
}
