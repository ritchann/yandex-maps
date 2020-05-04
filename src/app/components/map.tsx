import React, { useEffect } from 'react';

import './map.scss';

interface Props {
  state: ymaps.MapState;
  options?: ymaps.MapOptions;
  placemarkGeometry?: number[];
  placemarkPropeties?: ymaps.PlacemarkProperties;
  children?: {
    props?: any[];
  }[];
}

export const Map: React.FC<Props> = ({ state, options, placemarkGeometry, placemarkPropeties, children }) => {
  let myMap: ymaps.Map;

  ymaps.ready(function () {
    myMap = new ymaps.Map('map', state, options);
    //let test = new ymaps.Placemark(children['props']['geometry']);
   // myMap.geoObjects.add(test);
   console.log(children);
  });

  return (
    <div className="map" id="map">
      {myMap}
    </div>
  );
};
