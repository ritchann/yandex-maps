import React, { useCallback, useEffect, useState, useMemo } from 'react';

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
    balloonContentBody: '<div name="test"><button id="test">Button</button></div>',
    balloonContentFooter: `<div class='footer'>Footer</div>`,
  };
  const mapParametrsApi: ymaps.ParametrsApi = {
    apikey: 'def62d81-e99f-4395-8b66-dbf1a1d64c1a',
    lang: 'ru_RU',
  };
  const placemarkOptions: ymaps.PlacemarkOptions = {
    preset: 'islands#circleDotIcon',
    balloonContentLayoutTemplate: "<div><button id='counter-button'>+1</button><div id='label'>Нажми</div></div>",
    onClickIds: ['counter-button', 'label'],
  };

  return (
    <Map parametrsApi={mapParametrsApi} className="map" state={mapState} options={mapOptions}>
      <Placemark
        onClick={()=>{}}
        geometry={placemarkGeometry}
        properties={placemarkPropeties}
        options={placemarkOptions}></Placemark>
      <Placemark geometry={placemarkGeometry2} properties={placemarkPropeties} options={placemarkOptions}></Placemark>
      <ListBox onChange={() => {}} data={{ content: 'Выберите город' }}>
        <ListBoxItem parameters="Москва"></ListBoxItem>
        <ListBoxItem parameters="Нижний Новгород"></ListBoxItem>
      </ListBox>
    </Map>
  );
};
