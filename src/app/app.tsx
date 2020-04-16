import React from 'react';

import { Map } from './map';

export const App: React.FC = () => {
  return <Map center={[56, 43]} zoom={9}></Map>;
};
