import { useGetAllCountriesQuery, useGetCca3ByRegionQuery } from "entities/country";
import { useSearchParams } from "react-router-dom";
import { IQueryFilter } from "shared/types";

const useSearch = (queryFilters: IQueryFilter[]) => {
  const [params] = useSearchParams();
  let filteredCca3: string[] = [];

  queryFilters.forEach((filter) => {
    switch (filter.name) {
      case "region":
        const { data } = useGetCca3ByRegionQuery({ region: filter.values });
        filteredCca3 = filteredCca3.concat(data?.map((item) => item.cca3) || []);
        break;
    }
  });

  const searchedCca3 = params.get("search")?.split(",") || null;
  let finalCca3 = filteredCca3.filter((item) => searchedCca3?.includes(item)).join(",") || null;

  const { data, isLoading, error } = useGetAllCountriesQuery({
    cca3Codes: finalCca3,
  });

  return { data, isLoading, error };
};

export default useSearch;
