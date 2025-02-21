import { ICountry } from "shared/types";

const getTranlsatedName = (country: Pick<ICountry, "name" | "translations">, currentLanguage: string): string => {
  switch (currentLanguage) {
    case "ru-RU":
      return country.translations.rus.official || country.translations.rus.common;
      break;
    default:
      return country.name.official || country.name.common;
  }
};
export default getTranlsatedName;
