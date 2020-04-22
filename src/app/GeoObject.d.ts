module ymaps {
    export class GeoObject extends interfaces.IGeoObject {
        constructor(feature?:GeoObjectFeature, options?:GeoObjectOptions);
    }

    export class GeoObjectFeature {
        geometry  :interfaces.IGeometry|interfaces.IGeometryJson;
        properties:interfaces.IDataManager|GeoObjectFeatureProperties;
    }

    export class GeoObjectFeatureProperties { //check
        iconContent:string;
        iconCaption:string;
        hintContent:string;
        balloonContent:string;
        balloonContentHeader:string;
        balloonContentBody:string;
        balloonContentFooter:string;
    }
}