import React from 'react';

import { Map } from './components/map';
import { Placemark } from './components/placemark';

import './app.scss';

export const App: React.FC = () => {
  const mapState: ymaps.MapState = { center: [56, 43], zoom: 8 };
  const mapOptions: ymaps.MapOptions = {};
  const placemarkGeometry: number[] = [56, 43];
  const placemarkGeometry2: number[] = [56, 43.5];
  const placemarkPropeties: ymaps.PlacemarkProperties = {
    balloonContentFooter: `<div class='footer'>Footer</div>`,
  };

  const placemarkOptions: ymaps.PlacemarkOptions = {
    preset: 'islands#circleDotIcon',
  };

  return (
    <Map className="map" state={mapState} options={mapOptions}>
      <Placemark
        geometry={placemarkGeometry}
        properties={placemarkPropeties}
        options={placemarkOptions}
        open></Placemark>
      <Placemark geometry={placemarkGeometry2} properties={placemarkPropeties}></Placemark>
    </Map>
  );
};
