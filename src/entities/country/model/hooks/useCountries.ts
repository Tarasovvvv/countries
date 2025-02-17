import { useGetAllCountriesQuery } from "entities/country";

interface IProps {
  search: string | null;
}

const useCountries = ({ search }: IProps) => {
  const { data, isLoading, error } = useGetAllCountriesQuery({ cca2Codes: search || null });
  return { data, isLoading, error };
};

export default useCountries;
