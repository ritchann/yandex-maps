namespace ymaps.map {
  interface BalloonStatic {
    new (map: ymaps.Map): Balloon;
  }
  interface Balloon extends interfaces.IBalloonManager {}

  declare var Balloon: BalloonStatic;
}
