import React from 'react';

import './map.scss';

interface Props {
  mapState: ymaps.MapState;
}

export const Map: React.FC<Props> = ({ mapState }) => {
  let myMap:ymaps.Map;
  
  ymaps.ready(function () {
    myMap = new ymaps.Map('map', mapState);
  });


  return (
    <div className="map" id="map">
      {myMap}
    </div>
  );
};
