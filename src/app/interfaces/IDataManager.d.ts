namespace ymaps.interfaces {
  interface IDataManager extends IEventEmitter {
    get(path: string, defaultValue: object): object;
  }
}
