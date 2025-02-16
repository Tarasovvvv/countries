import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICountry, IDetailedCountry } from "shared/types";

const CountriesApi = createApi({
  reducerPath: "countries",
  baseQuery: fetchBaseQuery({ baseUrl: "https://restcountries.com/v3.1" }),
  endpoints: (build) => ({
    getAllCountries: build.query<ICountry[], void>({
      query: () => {
        return {
          url: "all",
          params: {
            fields: ["name", "flags", "translations"],
          },
        };
      },
    }),
    getCountry: build.query<IDetailedCountry[], { name: string }>({
      query: ({ name }) => {
        return {
          url: `name/${encodeURIComponent(name)}`,
          params: {
            fields: [
              "name",
              "cca3",
              "area",
              "maps",
              "flags",
              "region",
              "capital",
              "borders",
              "languages",
              "timezones",
              "continents",
              "population",
              "currencies",
              "translations",
            ],
          },
        };
      },
    }),
    getBorders: build.query<Pick<ICountry, "name" | "translations">[], { bordersCodes: string[] }>({
      query: ({ bordersCodes }) => {
        return {
          url: `alpha`,
          params: {
            codes: bordersCodes,
            fields: ["name", "translations"],
          },
        };
      },
    }),
  }),
});

export default CountriesApi;
export const { useGetAllCountriesQuery, useGetCountryQuery, useGetBordersQuery } = CountriesApi;
