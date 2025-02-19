import { useGetAllCountriesQuery, useGetCca3ByRegionQuery } from "entities/country";
import { useSearchParams } from "react-router-dom";
import { IQueryFilter } from "shared/types";

const useSearch = (queryFilters: IQueryFilter[]) => {
  const [params] = useSearchParams();
  let filteredCca3: string[] = [];

  const notInQuery = (param: string) => {
    return queryFilters.every((item) => item.name !== param);
  };

  const getValues = (filterName: string) => {
    const paramValue = params.get(filterName);
    return paramValue ? decodeURIComponent(paramValue).split(",") : [];
  };

  const regions = getValues("region").filter((region) => region && region.trim() !== "");

  const { data: regionData, isLoading: isLoading1 } = useGetCca3ByRegionQuery({ regions }, { skip: notInQuery("region") || regions.length === 0 });

  filteredCca3 = filteredCca3.concat(regionData?.map((item) => item.cca3) || []);

  const searchedCca3 = params.get("search")?.split(",");

  let finalCca3: string[] = [];
  if (filteredCca3.length > 0) {
    if (searchedCca3?.length && searchedCca3?.length > 0) {
      finalCca3 = filteredCca3.filter((item) => searchedCca3.includes(item));
    } else {
      finalCca3 = filteredCca3;
    }
  } else {
    if (searchedCca3?.length && searchedCca3?.length > 0) {
      finalCca3 = searchedCca3;
    }
  }

  if (finalCca3.length === 0 && ((searchedCca3?.length && searchedCca3.length > 0) || filteredCca3.length > 0)) {
    finalCca3 = ["nothing"];
  }

  const { data, isLoading, error } = useGetAllCountriesQuery({ cca3Codes: finalCca3.join(",") }, { skip: isLoading1 });

  return { data, isLoading, error };
};

export default useSearch;
