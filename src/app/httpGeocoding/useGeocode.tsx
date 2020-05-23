import { useCallback } from 'react';

export const useGeocode = () => {
  async function fetchData(url: string) {
    const res = await fetch(url);
    return res
      .json()
      .then((res) => res)
      .then((data) => data.response as httpGeocodeObject);
  }

  const getGeocode = useCallback(
    (
      geocode: string | number[],
      apikey: string,
      format?: 'xml' | 'json',
      sco?: 'longlat' | 'latlong',
      kind?: 'house' | 'street' | 'metro' | 'district' | 'locality',
      rspn?: '0' | '1',
      ll?: number[],
      spn?: number[],
      bbox?: number[],
      results?: number,
      skip?: number,
      lang?: 'ru_RU' | 'uk_UA' | 'be_BY' | 'en_RU' | 'en_US' | 'tr_TR'
    ) => {
      const url = `https://geocode-maps.yandex.ru/1.x/?apikey=${apikey}&geocode=${geocode}&format=${format}`;
      return fetchData(url);
    },
    []
  );

  return getGeocode;
};

export class httpGeocodeObject {
  GeoObjectCollection: GeoObjectCollection;
}

export class GeoObjectCollection {
  featureMember: FeatureMember[];
  metaDataProperty: DataProperty;
}

export class DataProperty {
  GeocoderResponseMetaData: GeocoderResponseMetaData;
}

export class GeocoderResponseMetaData {
  found: string;
  request: string;
  results: string;
}

export class FeatureMember {
  GeoObject: GeoObject;
}

export class GeoObject {
  Point: Point;
  boundedBy: BoundedBy;
  description: string;
  metaDataProperty: MetaDataProperty;
  name: string;
}

export class Point {
  pos: string;
}

export class BoundedBy {
  Envelope: Envelope;
}

export class Envelope {
  lowerCorner: string;
  upperCorner: string;
}

export class MetaDataProperty {
  GeocoderMetaData: GeocoderMetaData;
}

export class GeocoderMetaData {
  kind: string;
  precision: string;
  text: string;
  Address: Address;
  AddressDetails: AddressDetails;
}

export class Address {
  Components: Components[];
  country_code: string;
  formatted: string;
}

export class Components {
  kind: string;
  name: string;
}

export class AddressDetails {
  Country: Country;
}

export class Country {
  AddressLine: string;
  CountryName: string;
  CountryNameCode: string;
  AdministrativeArea: AdministrativeArea;
}

export class AdministrativeArea {
  AdministrativeAreaName: string;
  SubAdministrativeArea: SubAdministrativeArea;
}

export class SubAdministrativeArea {
  SubAdministrativeAreaName: string;
  Locality: Locality;
}

export class Locality {
  LocalityName: string;
  Thoroughfare: Thoroughfare;
}

export class Thoroughfare {
  ThoroughfareName: string;
}
