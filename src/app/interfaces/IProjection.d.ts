namespace ymaps.interfaces {
  interface IProjectionStatic {
    new (): IProjection;
  }

  interface IProjection {
    fromGlobalPixels(globalPixelPoint: number[], zoom: number): number[];

    getCoordSystem(): ymaps.interfaces.ICoordSystem;

    isCycled(): boolean[];
    
    toGlobalPixels(coordPoint: number[], zoom: number): number[];
  }
}
