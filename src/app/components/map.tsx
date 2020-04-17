import React from 'react';

import './map.scss';

interface Props {
  center: number[];
  zoom: number;
}

export const Map: React.FC<Props> = ({ center, zoom }) => {
  let myMap;
  ymaps.ready(function () {
    myMap = new ymaps.Map('map', {
      center: center,
      zoom: zoom,
    
    });
  });

  return (
    <div className="map" id="map">
      {myMap}
    </div>
  );
};
