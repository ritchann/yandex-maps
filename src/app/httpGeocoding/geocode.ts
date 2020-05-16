export interface Props {
  geocode: string | number[];
  apikey: string;
  sco?: 'longlat' | 'latlong';
  kind?: 'house' | 'street' | 'metro' | 'district' | 'locality';
  rspn?: '0' | '1';
  ll?: number[];
  spn?: number[];
  bbox?: number[];
  format?: 'xml' | 'json';
  results?: number;
  skip?: number;
  lang?: 'ru_RU' | 'uk_UA' | 'be_BY' | 'en_RU' | 'en_US' | 'tr_TR';
}

export const geocode = ({
  geocode,
  apikey,
  sco = 'longlat',
  kind,
  rspn = '0',
  ll,
  spn,
  format = 'xml',
  results = 10,
  skip = 0,
}: Props) => {
  const result = `https://geocode-maps.yandex.ru/1.x/?apikey=${apikey}&geocode=${geocode}&format=${format}`;

  fetch(result)
    .then((response) => response.json())
    .then((responseData) => responseData)
    .then((data) => console.log(data.response));
};
