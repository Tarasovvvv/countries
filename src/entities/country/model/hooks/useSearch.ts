import { useGetAllCountriesQuery } from "entities/country";
import { useSearchParams } from "react-router-dom";

const useSearch = () => {
  const [params] = useSearchParams();
  const { data, isLoading, error } = useGetAllCountriesQuery({ cca2Codes: params.get("search") || null });

  return { data, isLoading, error };
};

export default useSearch;
