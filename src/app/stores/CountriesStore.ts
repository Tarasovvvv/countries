import { configureStore } from "@reduxjs/toolkit";
import { CountriesApi, CountriesSlice } from "entities/country";

const CountriesStore = configureStore({
  reducer: {
    ["coutriesSlice"]: CountriesSlice.reducer,
    ["countriesApi"]: CountriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(CountriesApi.middleware),
});

export type RootState = ReturnType<typeof CountriesStore.getState>;
 export type AppDispatch = typeof CountriesStore.dispatch;

export default CountriesStore;
