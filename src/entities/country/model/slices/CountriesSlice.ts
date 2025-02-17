import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CountriesApi } from "entities/country";
import { ICountry } from "shared/types";

interface CountriesState {
  countries: ICountry[];
}

const initialState: CountriesState = {
  countries: [],
};

const CountriesSlice = createSlice({
  name: "countriesSlice",
  initialState,
  reducers: {
    setCountries: (state, action: PayloadAction<ICountry[]>) => {
      state.countries = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(CountriesApi.endpoints.getCountriesByNames.matchFulfilled, (state, action) => {
      state.countries = action.payload;
    });
  },
});

export default CountriesSlice;
export const { setCountries } = CountriesSlice.actions;
