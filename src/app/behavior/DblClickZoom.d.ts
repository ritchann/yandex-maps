namespace ymaps.behavior {
  interface DblClickZoomStatic {
    new (options?: DblClickZoomOptions = defaultDblClickZoomOptions): DblClickZoom;
  }

  interface DblClickZoom extends ymaps.interfaces.IBehavior {}

  interface DblClickZoomOptions {
    centering?: boolean;
    duration?: number;
    useMapMargin?: boolean;
  }

  declare var DblClickZoom: DblClickZoomStatic;
  declare var defaultDblClickZoomOptions: DblClickZoomOptions = {
    centering: true,
    duration: 200,
    useMapMargin: true,
  };
}
