import React, { ReactElement, useEffect } from 'react';

interface Props {
  parametrsApi: ymaps.ParametrsApi;
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
  parametrsApi,
  state,
  options,
  children,
  className,
  addNewGeoObject,
  templateNewGeoObject,
}) => {
  let myMap: ymaps.Map;
  useEffect(() => {
    var elem = document.createElement('script');
    elem.type = 'text/javascript';
    const src = `https://api-maps.yandex.ru/2.1/?apikey=${parametrsApi.apikey}&lang=${parametrsApi.lang}`;
    if (parametrsApi.coordorder) src.concat(`&coordorder=${parametrsApi.coordorder}`);
    if (parametrsApi.load) src.concat(`&load=${parametrsApi.load}`);
    if (parametrsApi.mode) src.concat(`&mode=${parametrsApi.mode}`);
    if (parametrsApi.csp) src.concat(`&csp=${parametrsApi.csp}`);
    if (parametrsApi.ns) src.concat(`&ns=${parametrsApi.ns}`);
    if (parametrsApi.onload) src.concat(`&onload=${parametrsApi.onload}`);
    if (parametrsApi.onerror) src.concat(`&onerror=${parametrsApi.onerror}`);
    elem.src = src;
    document.getElementsByTagName('body')[0].appendChild(elem);
  }, []);

  setTimeout(() => {
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
          React.Children.toArray(x.props['children']).forEach((item) => {
            const listBoxItem = new ymaps.control.ListBoxItem(item.props['parameters']);
            items.push(listBoxItem);
          });
          let listBox = new ymaps.control.ListBox({ data: x.props['data'], items: items });
          myMap.controls.add(listBox);

          listBox.events.add(['select', 'deselect'], (e) => {
            let listBoxItem = e.get('target');
            x.props.onChange({ field: listBoxItem.data.get('content'), selected: listBoxItem.isSelected() });
          });
        }
      });

      if (addNewGeoObject)
        myMap.events.add('click', (e) => {
          const coords = e.get('coords');
          addNewGeoObject(coords);
          myMap.ballon = new ymaps.map.Balloon(myMap);
          myMap.ballon.open(coords, templateNewGeoObject.data, templateNewGeoObject.options);
        });
    });
  }, 1000);

  return (
    <div className={className} id="map">
      {myMap}
    </div>
  );
};
