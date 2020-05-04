import React from 'react';

import './map.scss';

interface Props {
  geometry?:number[];
  propeties?: ymaps.PlacemarkProperties;
}

export const Placemark: React.FC<Props> = ({ geometry, propeties }) => {
  return (
    <div key='placemark' >
      
    </div>
  );
};
