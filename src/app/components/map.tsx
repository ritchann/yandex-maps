import React, { ReactElement, useEffect } from 'react';

interface Props {
  parametrsApi: ymaps.ParametrsApi;
  state: ymaps.MapState;
  options?: ymaps.MapOptions;
  children?: (ReactElement | ReactElement[])[];
  className?: string;
  addNewGeoObject?: (coords: number[]) => void;
  templateNewPlacemark?: {
    properties: ymaps.PlacemarkProperties,
    options: ymaps.PlacemarkOptions,
  };
  onClickNewPlacemark?: (id: string) => void;
}

export const Map: React.FC<Props> = ({
  parametrsApi,
  state,
  options,
  children,
  className,
  addNewGeoObject,
  templateNewPlacemark,
  onClickNewPlacemark,
}) => {
  let myMap: ymaps.Map;
  useEffect(() => {
    var elem = document.createElement('script');
    elem.type = 'text/javascript';
    const src = `https://api-maps.yandex.ru/2.1/?apikey=${parametrsApi.apikey}&lang=${parametrsApi.lang}`;
    if (parametrsApi.coordorder)
      src.concat(`&coordorder=${parametrsApi.coordorder}`);
    if (parametrsApi.load) src.concat(`&load=${parametrsApi.load}`);
    if (parametrsApi.mode) src.concat(`&mode=${parametrsApi.mode}`);
    if (parametrsApi.csp) src.concat(`&csp=${parametrsApi.csp}`);
    if (parametrsApi.ns) src.concat(`&ns=${parametrsApi.ns}`);
    if (parametrsApi.onload) src.concat(`&onload=${parametrsApi.onload}`);
    if (parametrsApi.onerror) src.concat(`&onerror=${parametrsApi.onerror}`);
    elem.src = src;
    document.getElementsByTagName('body')[0].appendChild(elem);
  }, [parametrsApi]);

  setTimeout(() => {
    let allChildren: ReactElement[] = [];
    children.forEach((x) => {
      if (x instanceof Array) x.forEach((itemX) => allChildren.push(itemX));
      else allChildren.push(x);
    });
    ymaps.ready(function () {
      myMap = new ymaps.Map('map', state, options);
      const placemarks: { type: string, placemark: ymaps.Placemark }[] = [];
      let clusterer: ymaps.Clusterer;
      const getBalloonContentLayout = (
        template: string,
        onClick: (id: string) => void,
        onClickIds: string[]
      ): Function => {
        return ymaps.templateLayoutFactory.createClass(template, {
          build: function () {
            this.constructor.superclass.build.call(this);
            if (onClick && onClickIds?.length > 0)
              onClickIds?.forEach((id) => {
                document.getElementById(id).addEventListener('click', () => {
                  onClick(id);
                });
              });
          },
        });
      };

      const getPlacemark = (
        geometry: number[],
        properties: ymaps.PlacemarkProperties,
        options: ymaps.PlacemarkOptions,
        onClick: (id: string) => void
      ): ymaps.Placemark => {
        let placemark: ymaps.Placemark;
        if (options?.balloonContentLayoutTemplate) {
          const template = options.balloonContentLayoutTemplate;
          let balloonContentLayout = getBalloonContentLayout(
            template,
            onClick,
            options.onClickIds
          );
          placemark = new ymaps.Placemark(geometry, properties, {
            ...options,
            balloonContentLayout,
          });
        } else placemark = new ymaps.Placemark(geometry, properties, options);
        return placemark;
      };

      let getTemplateCustomItemContentLayout = (
        options: ymaps.ClustererOptions,
        onClick: (v: number) => void
      ) => {
        return ymaps.templateLayoutFactory.createClass(
          options.clusterBalloonItemContentLayoutTemplate,
          {
            build: function () {
              this.constructor.superclass.build.call(this);
              if (onClick && options.onClickIds?.length > 0)
                options.onClickIds?.forEach((id) => {
                  document.getElementById(id).addEventListener('click', () => {
                    onClick(this._data.properties._data?.id);
                  });
                });
            },
          }
        );
      };
      React.Children.toArray(allChildren).forEach((x) => {
        if (x.key.toString().includes('Clusterer')) {
          const options: ymaps.ClustererOptions = x.props['options'];
          if (options.clusterBalloonItemContentLayoutTemplate)
            clusterer = new ymaps.Clusterer({
              ...options,
              clusterBalloonItemContentLayout: getTemplateCustomItemContentLayout(
                options,
                x.props.onClick
              ),
            });
          else clusterer = new ymaps.Clusterer(options);
          React.Children.toArray(x.props['children']).forEach((item) => {
            let placemark = getPlacemark(
              item.props?.geometry,
              item.props?.properties,
              item.props?.options,
              item.props?.onClick
            );
            placemarks.push({
              type: item.props.options.typeForFilter,
              placemark,
            });
            clusterer.add(placemark);
            myMap.geoObjects.add(clusterer);
          });
        }

        if (x.key.toString().includes('Placemark')) {
          const options: ymaps.PlacemarkOptions = x.props['options'];
          let placemark = getPlacemark(
            x.props['geometry'],
            x.props['properties'],
            x.props['options'],
            x.props.onClick
          );
          myMap.geoObjects.add(placemark);
          placemarks.push({ type: options.typeForFilter, placemark });
          if (x.props['open']) placemark.balloon.open();
        }

        if (x.key.toString().includes('ListBox')) {
          let items: ymaps.control.ListBoxItem[] = [];
          React.Children.toArray(x.props['children']).forEach((item) => {
            const listBoxItem = new ymaps.control.ListBoxItem(
              item.props['parameters']
            );
            items.push(listBoxItem);
          });
          let listBox = new ymaps.control.ListBox({
            data: x.props['data'],
            items: items,
          });
          myMap.controls.add(listBox);
          listBox.events.add(['select', 'deselect'], () => {
            const selectedFilters: string[] = [];
            items.forEach((x) => {
              if (x.data.get('content') && x.state.get('selected'))
                selectedFilters.push(String(x.data.get('content')));
            });
            listBox.state.set('filters', selectedFilters);
            if (x.props.onChange) x.props.onChange(selectedFilters);
          });
          var filterMonitor = new ymaps.Monitor(listBox.state);
          filterMonitor.add('filters', function (filters: string[]) {
            getFilterFunctions(filters);
          });

          const getFilterFunctions = function (filters: string[]) {
            const list: ymaps.Placemark[] = [];
            placemarks.forEach((x) => {
              if (filters.includes(x.type)) list.push(x.placemark);
            });
            if (clusterer) {
              clusterer.removeAll();
              clusterer.add(list);
              myMap.geoObjects.add(clusterer);
            } else {
              myMap.geoObjects.removeAll();
              list.forEach((x) => myMap.geoObjects.add(x));
            }
          };
        }

        if (x.key.toString().includes('SearchControl')) {
          const templateNewPlacemark: {
            properties: ymaps.PlacemarkProperties,
            options: ymaps.PlacemarkOptions,
          } = x.props['templateNewPlacemark'];
          let mySearchControl = new ymaps.control.SearchControl({
            data: x.props['data'],
            options: x.props['options'],
            state: x.props['state'],
          });
          let mySearchResults = new ymaps.GeoObjectCollection();
          myMap.controls.add(mySearchControl);
          myMap.geoObjects.add(mySearchResults);

          mySearchControl.events
            .add('resultselect', function (e) {
              var index = e.get('index');
              mySearchControl.getResult(index).then(function (res) {
                let myPlacemark: ymaps.Placemark;
                addNewGeoObject(res?.geometry?._coordinates);
                if (myPlacemark) {
                  myPlacemark.geometry.setCoordinates(
                    res?.geometry?._coordinates
                  );
                } else {
                  myPlacemark = getPlacemark(
                    res?.geometry?._coordinates,
                    templateNewPlacemark.properties,
                    templateNewPlacemark.options,
                    onClickNewPlacemark
                  );
                }
                myMap.geoObjects.add(myPlacemark);
                myMap.events.add('balloonclose', () => {
                  myMap.geoObjects.remove(myPlacemark);
                });
                if (!myPlacemark.balloon.isOpen()) myPlacemark.balloon.open();
              });
            })
            .add('submit', function () {
              mySearchResults.removeAll();
            });
        }
      });

      if (addNewGeoObject && templateNewPlacemark) {
        let myPlacemark: ymaps.Placemark = undefined;
        myMap.events.add('contextmenu', (e) => {
          const coords = e.get('coords');
          addNewGeoObject(coords);
          if (myPlacemark) {
            myPlacemark.geometry.setCoordinates(coords);
          } else {
            myPlacemark = getPlacemark(
              coords,
              templateNewPlacemark.properties,
              templateNewPlacemark.options,
              onClickNewPlacemark
            );
          }
          myMap.geoObjects.add(myPlacemark);
          myMap.events.add('balloonclose', () => {
            myMap.geoObjects.remove(myPlacemark);
          });
          myPlacemark.balloon.open();
        });
      }
    });
  }, 1000);

  return (
    <div className={className} id="map">
      {myMap}
    </div>
  );
};
