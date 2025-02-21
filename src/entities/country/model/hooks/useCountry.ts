import { useGetBordersQuery, useGetCountryQuery } from "entities/country";

interface IProps {
  cca3: string | null | undefined;
}

const useCountry = ({ cca3 }: IProps) => {
  const { data, isLoading, error } = useGetCountryQuery({ cca3: cca3 });
  const { data: bordersData } = useGetBordersQuery({ bordersCodes: data?.[0].borders || [] }, { skip: !data || !data[0]?.borders?.length });
  return { countryData: data?.[0], bordersData, isLoading, error };
};
export default useCountry;
