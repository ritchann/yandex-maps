import React from 'react';

interface Props {
  geometry?: number[];
  properties?: ymaps.PlacemarkProperties;
  options?: ymaps.PlacemarkOptions;
  open?: boolean;
  onClick?: (id: string) => void;
}

export const Placemark: React.FC<Props> = () => {
  return <Placemark />;
};
