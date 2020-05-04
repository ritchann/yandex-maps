import React, { useEffect, ReactElement } from 'react';

import './map.scss';

interface Props {
  state: ymaps.MapState;
  options?: ymaps.MapOptions;
  children?: ReactElement[];
}

export const Map: React.FC<Props> = ({ state, options, children }) => {
  let myMap: ymaps.Map;

  ymaps.ready(function () {
    myMap = new ymaps.Map('map', state, options);
    React.Children.toArray(children).forEach((x) => {
      if (x.type['name'] === 'Placemark')
        myMap.geoObjects.add(new ymaps.Placemark(x.props['geometry'], x.props['properties'],x.props['options']));
    });
  });

  return (
    <div className="map" id="map">
      {myMap}
    </div>
  );
};
