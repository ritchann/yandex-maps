import { useEffect, useCallback } from 'react';

export interface Props {
  geocode: string | number[];
  apikey: string;
  sco?: 'longlat' | 'latlong';
  kind?: 'house' | 'street' | 'metro' | 'district' | 'locality';
  rspn?: '0' | '1';
  ll?: number[];
  spn?: number[];
  bbox?: number[];
  format?: 'xml' | 'json';
  results?: number;
  skip?: number;
  lang?: 'ru_RU' | 'uk_UA' | 'be_BY' | 'en_RU' | 'en_US' | 'tr_TR';
}

export const geocode = ({
  geocode,
  apikey,
  sco = 'longlat',
  kind,
  rspn = '0',
  ll,
  spn,
  format = 'xml',
  results = 10,
  skip = 0,
}: Props) => {
  const result = `https://geocode-maps.yandex.ru/1.x/?apikey=${apikey}&geocode=${geocode}&format=${format}`;
  let obj: httpGeocodeObject;

  fetch(result)
    .then((response) => response.json())
    .then((responseData) => responseData)
    .then((data) => (obj = data.response));
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
