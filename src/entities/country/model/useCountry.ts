import { useGetBordersQuery, useGetCountryQuery } from "entities/country";

interface IProps {
  name: string | null | undefined;
}

const useCountry = ({ name }: IProps) => {
  const { data, isLoading, error } = useGetCountryQuery({ name: name || "" });
  const { data: bordersData } = useGetBordersQuery({ bordersCodes: data?.[0].borders || [] });
  return { countryData: data?.[0], bordersData, isLoading, error };
};
export default useCountry;
