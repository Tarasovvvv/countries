export default interface ICountry {
  name: {
    common: string;
    official: string;
  };
  flags: {
    svg: string;
    png: string;
  };
  translations: {
    rus: {
      common: string;
      official: string;
    };
  };
  population: number;
  cca3: string;
}
