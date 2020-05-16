import React, { useCallback, useEffect } from 'react';

import { Map } from './components/map';
import { Placemark } from './components/placemark';
import { ListBox } from './components/ListBox';
import { ListBoxItem } from './components/listBoxItem';
import { geocode } from './httpGeocoding/geocode';
import './app.scss';

export const App: React.FC = () => {
  const mapState: ymaps.MapState = { center: [56, 43], zoom: 8, controls: ['smallMapDefaultSet'] };
  const mapOptions: ymaps.MapOptions = {};
  const placemarkGeometry: number[] = [56, 43];
  const placemarkGeometry2: number[] = [56, 43.5];
  const placemarkPropeties: ymaps.PlacemarkProperties = {
    balloonContentBody: '<div id="myId"><button class="test" name="test">Button</button></div>',
    balloonContentFooter: `<div class='footer'>Footer</div>`,
  };
  const mapParametrsApi: ymaps.ParametrsApi = {
    apikey: 'def62d81-e99f-4395-8b66-dbf1a1d64c1a',
    lang: 'ru_RU',
  };
  const placemarkOptions: ymaps.PlacemarkOptions = {
    preset: 'islands#circleDotIcon',
  };

  useEffect(() => {
    geocode({ apikey: 'def62d81-e99f-4395-8b66-dbf1a1d64c1a', geocode: 'Нижний Новгород', format: 'json' });
  }, []);

  return (
    <Map
      parametrsApi={mapParametrsApi}
      className="map"
      state={mapState}
      options={mapOptions}
      templateNewGeoObject={{
        data: { contentBody: '<button>Hello</button>' },
      }}>
      <Placemark
        geometry={placemarkGeometry}
        properties={placemarkPropeties}
        options={placemarkOptions}
        open></Placemark>
      <Placemark geometry={placemarkGeometry2} properties={placemarkPropeties}></Placemark>
      <ListBox onChange={() => {}} data={{ content: 'Выберите город' }}>
        <ListBoxItem parameters="Москва"></ListBoxItem>
        <ListBoxItem parameters="Нижний Новгород"></ListBoxItem>
      </ListBox>
    </Map>
  );
};
