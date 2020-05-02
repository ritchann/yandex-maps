import React from 'react';

import './map.scss';

interface Props {
 state: ymaps.MapState;
 options?: ymaps.MapOptions;
}

export const Map: React.FC<Props> = ({ state ,options }) => {
  let myMap:ymaps.Map;
  
  ymaps.ready(function () {
    myMap = new ymaps.Map('map', state, options);
  });

  return (
    <div className="map" id="map">
      {myMap}
    </div>
  );
};
