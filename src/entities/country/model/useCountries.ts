import { useGetAllCountriesQuery } from "entities/country";

const useCountries = () => {
  const { data, isLoading, error } = useGetAllCountriesQuery();
  return { data, isLoading, error };
};

export default useCountries;
