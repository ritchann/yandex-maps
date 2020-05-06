import React, { ReactElement } from 'react';

interface Props {
  state: ymaps.MapState;
  options?: ymaps.MapOptions;
  children?: ReactElement[];
  className?: string;
  addNewGeoObject?: (coords: number[]) => void;
  templateNewGeoObject?: {
    data: object | ymaps.map.BallonProperties | string | HTMLElement;
    options?: object;
  };
}

export const Map: React.FC<Props> = ({
  state,
  options,
  children,
  className,
  addNewGeoObject,
  templateNewGeoObject,
}) => {
  let myMap: ymaps.Map;

  ymaps.ready(function () {
    myMap = new ymaps.Map('map', state, options);

    React.Children.toArray(children).forEach((x) => {
      if (x.type['name'] === 'Placemark') {
        let placemark = new ymaps.Placemark(x.props['geometry'], x.props['properties'], x.props['options']);
        myMap.geoObjects.add(placemark);
        if (x.props['open']) placemark.balloon.open();
      }

      if (x.type['name'] === 'ListBox') {
        let items: ymaps.control.ListBoxItem[] = [];
        React.Children.toArray(x.props['children']).forEach((item) =>
          items.push(new ymaps.control.ListBoxItem(item.props['parameters']))
        );
        let listBox = new ymaps.control.ListBox({ data: x.props['data'], items: items });
        myMap.controls.add(listBox);
      }
    });

    myMap.events.add('click', (e) => {
      const coords = e.get('coords');
      addNewGeoObject(coords);
      myMap.ballon = new ymaps.map.Balloon(myMap);
      myMap.ballon.open(coords, templateNewGeoObject.data, templateNewGeoObject.options);
    });
  });

  return (
    <div className={className} id="map">
      {myMap}
    </div>
  );
};
