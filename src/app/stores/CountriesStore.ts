import { configureStore } from "@reduxjs/toolkit";
import { CountriesApi } from "entities/country";

const CountriesStore = configureStore({
  reducer: {
    [CountriesApi.reducerPath]: CountriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(CountriesApi.middleware),
});

export type RootState = ReturnType<typeof CountriesStore.getState>;
export type AppDispatch = typeof CountriesStore.dispatch;

export default CountriesStore;
