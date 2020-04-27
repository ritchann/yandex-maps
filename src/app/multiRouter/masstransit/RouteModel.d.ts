namespace ymaps.multiRouter.masstransit {

    interface RouteModel extends interfaces.IEventEmitter {
        multiRoute:multiRouter.MultiRouteModel;
        properties: data.Manager;

        destroy(): void;
        getPaths():multiRouter.masstransit.PathModel[];
        getType():string; // todo determine?
        update(routeJson:any):any;
    }
}