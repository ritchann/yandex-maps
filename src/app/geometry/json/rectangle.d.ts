namespace ymaps.geometry.json {
  interface rectangle extends interfaces.IGeometryJson {
    coordinates: number[][] | null;
    type: string = 'Rectangle';
  }
}
