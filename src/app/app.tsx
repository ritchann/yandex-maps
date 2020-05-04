import React from 'react';

import { Map } from './components/map';
import { Placemark } from './components/placemark';

export const App: React.FC = () => {
  const mapState: ymaps.MapState = { center: [56, 43], zoom: 8 };
  const mapOptions: ymaps.MapOptions = {};
  const placemarkGeometry: number[] = [56, 43];
  const placemarkGeometry2: number[] = [56, 43.5];
  const placemarkPropeties: ymaps.PlacemarkProperties = { hintContent: 'Hi' };

  return (
    <Map state={mapState} options={mapOptions}>
     <Placemark geometry={placemarkGeometry} propeties={placemarkPropeties}></Placemark>
      {/* <Placemark geometry={placemarkGeometry2} propeties={placemarkPropeties}></Placemark> */}
    </Map>
  );
};
