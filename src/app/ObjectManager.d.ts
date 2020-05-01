module ymaps {
  export class ObjectManager
    implements interfaces.ICustomizable, interfaces.IEventEmitter, interfaces.IGeoObject, interfaces.IParentOnMap {
    constructor(options?: ObjectManagerOptions);

    clusters: objectManager.ClusterCollection;
    objects: objectManager.ObjectCollection;

    add(objects: object | object[] | string): ObjectManager;
    getBounds(): number[][] | null;
    getFilter(): string | Function | null;
    getObjectState(id: object): ObjectManagerObjectState;
    getPixelBounds(): number[][] | null;
    remove(objects: object | object[] | string): ObjectManager;
    removeAll(): ObjectManager;
    setFilter(filterFunction: Function | string): void;
  }

  export class ObjectManagerOptions {
    clusterize?: boolean = false;
    syncOverlayInit?: boolean = false;
    viewportMargin: number | number[] = 128;
  }

  export interface ObjectManagerObjectState {
    found: boolean;
    isShown: boolean;
    cluster: any;
    isClustered: boolean;
    isFilteredOut: boolean;
  }
}
