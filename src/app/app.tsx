import React from 'react';

import { Map } from './components/map';

export const App: React.FC = () => {
  const mapState: ymaps.MapState = { center: [56, 43], zoom: 8 };
  const mapOptions: ymaps.MapOptions = {};

  return <Map state={mapState} options={mapOptions}></Map>;
};
