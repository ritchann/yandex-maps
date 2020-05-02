module ymaps {
  export class LoadingObjectManager
    implements interfaces.ICustomizable, interfaces.IEventEmitter, interfaces.IGeoObject, interfaces.IParentOnMap {
    constructor(urlTemplate: string, options?: LoadingObjectManagerOptions);

    clusters: objectManager.ClusterCollection;
    objects: objectManager.ObjectCollection;

    getBounds(): number[][] | null;
    getObjectState(id: object): LoadingObjectManagerObjectState;
    getPixelBounds(): number[][] | null;
    getTileUrl(): string | null;
    getUrlTemplate(): string;
    reloadData(): void;
    setUrlTemplate(urlTemplate: string): void;
  }
  
  export class LoadingObjectManagerOptions {
    clusterize: boolean = false;
    loadTileSize: number = 256;
    paddingParamName: boolean | string = 'callback';
    paddingTemplate: string = null;
    splitRequests: boolean = false;
    syncOverlayInit: boolean = false;
    viewportMargin: number | number[] = 128;
  }

  export class LoadingObjectManagerObjectState {
    found: boolean;
    isShown: boolean;
    cluster: any;
    isClustered: boolean;
    isFilteredOut: boolean;
  }
}
