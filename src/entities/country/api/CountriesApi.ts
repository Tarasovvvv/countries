import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICountry, IDetailedCountry } from "shared/types";

const CountriesApi = createApi({
  reducerPath: "countriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://restcountries.com/v3.1" }),
  endpoints: (build) => ({
    getAllCountries: build.query<ICountry[], { cca3Codes: string | undefined | null }>({
      query: ({ cca3Codes }) => {
        return !cca3Codes
          ? {
              url: "all",
              params: {
                fields: ["name", "flags", "translations", "population", "cca3"],
              },
            }
          : {
              url: "alpha",
              params: {
                codes: cca3Codes,
                fields: ["name", "flags", "translations", "population", "cca3"],
              },
            };
      },
    }),
    getCountry: build.query<IDetailedCountry[], { cca3: string | null | undefined }>({
      query: ({ cca3 }) => {
        return {
          url: `alpha`,
          params: {
            codes: cca3,
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
    getBorders: build.query<Pick<ICountry, "name" | "translations" | "cca3">[], { bordersCodes: string[] }>({
      query: ({ bordersCodes }) => {
        return {
          url: `alpha`,
          params: {
            codes: bordersCodes,
            fields: ["name", "translations", "cca3"],
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
    getCca3ByRegion: build.query<{ cca3: string }[], { regions: (string | null)[] }>({
      queryFn: async ({ regions }, _queryApi, _extraOptions, baseQuery) => {
        const filteredRegions = regions.filter((region) => region != null && region.trim() !== "");

        if (filteredRegions.length === 0) {
          return { data: [] };
        }

        const promises = filteredRegions.map((region) => {
          return baseQuery({
            url: `region/${region}`,
            params: { fields: ["cca3"] },
          });
        });

        try {
          const responses = await Promise.all(promises);
          const data = responses.map((response) => response?.data).flat();
          return { data: data as { cca3: string }[] };
        } catch (error) {
          return {
            error: {
              status: 500,
              statusText: "Ошибка сервера",
              data: "Один или несколько запросов прошли неудачно",
            },
          };
        }
      },
    }),
  }),
});

export default CountriesApi;
export const { useGetAllCountriesQuery, useGetCountryQuery, useGetBordersQuery, useGetSuggestionsQuery, useGetCca3ByRegionQuery } = CountriesApi;
