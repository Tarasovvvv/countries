import { useSearchParams } from "react-router-dom";
import { ICountry, ISortParameter } from "shared/types";

const useSort = (fields: ISortParameter[]) => {
  const [params] = useSearchParams();
  const sortParam = params.get("sort");
  const sortParamName = (sortParam?.slice(0, sortParam.indexOf("_")) || "population") as keyof Pick<ICountry, "population">;
  const sortParamOrder = (sortParam?.slice(sortParam.indexOf("_") + 1) || "asc") as "asc" | "desc";

  fields.forEach((field) => (field.order = sortParamName === "population" ? sortParamOrder : "asc"));

  const sortCountries = (countries: ICountry[]) => {
    if (!countries) return null;

    let sortedCountries = [...countries];
    const sortField = fields.find((field) => field.queryParam === sortParamName);

    if (!sortField?.isLexical) {
      sortedCountries.sort((a, b) => {
        const valueA = a[sortParamName];
        const valueB = b[sortParamName];
        return sortParamOrder === "desc" ? valueB - valueA : valueA - valueB;
      });
    }

    return sortedCountries;
  };

  return { sortCountries };
};

export default useSort;
