export default interface IDetailedCountry {
  name: {
    common: string;
    official: string;
  };
  flags: {
    svg: string;
    alt: string;
  };
  translations: {
    rus: {
      common: string;
      official: string;
    };
  };
  languages: {
    [key: string]: string;
  };
  maps: {
    [key: string]: string;
  };
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };

  cca3: string;
  region: string;
  capital: string;

  area: number;
  population: number;

  borders: string[];
  timezones: string[];
  continents: string[];
}
