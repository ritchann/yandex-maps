module ymaps {
  export class ParametrsApi {
    apikey: string;
    lang: Lang;
    coordorder?: 'latlong' | 'longlat' = 'latlong';
    load?: string = 'package.full';
    mode?: 'release' | 'debug' = 'release';
    csp?: string;
    ns?: string = 'ymaps';
    onload?: string;
    onerror?: string;
  }

  export class Lang {
    language: 'ru' | 'en' | 'uk' | 'tr';
    region: 'RU' | 'US' | 'UA' | 'TR';
  }
}
