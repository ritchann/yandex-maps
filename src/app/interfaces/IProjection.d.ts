namespace ymaps.interfaces {
  interface IProjection {
    fromGlobalPixels(globalPixelPoint: number[], zoom: number): number[];
    getCoordSystem(): ICoordSystem;
    isCycled(): boolean[];
    toGlobalPixels(coordPoint: number[], zoom: number): number[];
  }
}
