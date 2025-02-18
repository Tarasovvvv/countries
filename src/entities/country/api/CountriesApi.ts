import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICountry, IDetailedCountry } from "shared/types";

const CountriesApi = createApi({
  reducerPath: "countriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://restcountries.com/v3.1" }),
  endpoints: (build) => ({
    getAllCountries: build.query<ICountry[], { cca3Codes: string | undefined | null }>({
      query: ({ cca3Codes }) => {
        return cca3Codes
          ? {
              url: "alpha",
              params: {
                codes: cca3Codes,
                fields: ["name", "flags", "translations", "population"],
              },
            }
          : {
              url: "all",
              params: {
                fields: ["name", "flags", "translations", "population"],
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
    getSuggestions: build.query<(Omit<ICountry, "flags"> & { cca3: string })[], void>({
      query: () => {
        return {
          url: "all",
          params: {
            fields: ["name", "translations", "cca3"],
          },
        };
      },
    }),
    getCountriesByNames: build.query<ICountry[], { codes: string[] }>({
      query: ({ codes }) => {
        return {
          url: "alpha",
          params: {
            codes: codes,
          },
        };
      },
    }),
    getCca3ByRegion: build.query<{ cca3: string }[], { region: string }>({
      query: ({ region }) => {
        console.log();
        return {
          url: `region/${region}`,
          params: {
            fields: ["cca3"],
          },
        };
      },
    }),
  }),
});

export default CountriesApi;
export const { useGetAllCountriesQuery, useGetCountryQuery, useGetBordersQuery, useGetSuggestionsQuery, useGetCca3ByRegionQuery } = CountriesApi;
