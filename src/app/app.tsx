import React, { useCallback, useEffect } from 'react';

import { Map } from './components/map';
import { Placemark } from './components/placemark';
import { ListBox } from './components/ListBox';
import { ListBoxItem } from './components/listBoxItem';
import './app.scss';

export const App: React.FC = () => {
  const mapState: ymaps.MapState = { center: [56, 43], zoom: 8, controls: ['smallMapDefaultSet'] };
  const mapOptions: ymaps.MapOptions = {};
  const placemarkGeometry: number[] = [56, 43];
  const placemarkGeometry2: number[] = [56, 43.5];
  const placemarkPropeties: ymaps.PlacemarkProperties = {
    balloonContentBody: '<div><button id="buttonId" onclick="testClick()">Button</button></div>',
    balloonContentFooter: `<div class='footer'>Footer</div>`,
  };
  const mapParametrsApi: ymaps.ParametrsApi = {
    apikey: 'key',
    lang: 'ru_RU',
  };

  const placemarkOptions: ymaps.PlacemarkOptions = {
    preset: 'islands#circleDotIcon',
  };

  return (
    <Map
      parametrsApi={mapParametrsApi}
      className="map"
      state={mapState}
      options={mapOptions}
      templateNewGeoObject={{
        data: { contentBody: '<button id="test" onClick={()=>myFunction()} onclick="myFunction();">Hello</button>' },
      }}>
      <Placemark
        geometry={placemarkGeometry}
        properties={placemarkPropeties}
        options={placemarkOptions}
        open></Placemark>
      <Placemark geometry={placemarkGeometry2} properties={placemarkPropeties}></Placemark>
      <ListBox onChange={()=>{}} data={{ content: 'Выберите город' }}>
        <ListBoxItem parameters="Москва"></ListBoxItem>
        <ListBoxItem parameters="Нижний Новгород"></ListBoxItem>
      </ListBox>
    </Map>
  );
};
