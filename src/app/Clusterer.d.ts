module ymaps {
  export class Clusterer
    implements interfaces.IChildOnMap, interfaces.ICustomizable, interfaces.IEventEmitter, interfaces.IParentOnMap {
    constructor(options?: ClustererOptions);

    balloon: clusterer.Balloon;
    balloonclose: any;
    balloonopen: any;
    hint: any;
    add(objects: interfaces.IGeoObject | interfaces.IGeoObject[]);
    createCluster(center: number[], geoObjects: interfaces.IGeoObject[]);
    getBounds(): number[][] | null;
    getClusters(): interfaces.IGeoObject[];
    getGeoObjects(): interfaces.IGeoObject;
    getObjectState(geoObject: interfaces.IGeoObject): object;
    remove(objects: interfaces.IGeoObject | interfaces.IGeoObject[]);
    removeAll(): Clusterer;
  }

  export class ClustererOptions {
    gridSize: number = 64;
    groupByCoordinates: boolean = false;
    hasBalloon: boolean = true;
    hasHint: boolean = true;
    margin: number | number[] = 10;
    maxZoom: number[] = Infinity;
    minClusterSize: number = 2;
    preset: string;
    showInAlphabeticalOrder: boolean = false;
    useMapMargin: boolean = true;
    viewportMargin: number | number[] = 128;
    zoomMargin: number | number[] = 0;
  }
}
