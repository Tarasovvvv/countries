import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICountry } from "shared/types";

const CountriesApi = createApi({
  reducerPath: "countries",
  baseQuery: fetchBaseQuery({ baseUrl: "https://restcountries.com/v3.1" }),
  endpoints: (build) => ({
    getAllCountries: build.query<ICountry[], void>({
      query: () => "all?fields=name,flags,translations",
    }),
  }),
});

export default CountriesApi;

export const { useGetAllCountriesQuery } = CountriesApi;
