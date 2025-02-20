import { useSearchParams } from "react-router-dom";
import { IFilterParameter, IQueryFilter } from "shared/types";

const useFilter = (fields: IFilterParameter[]) => {
  const [params] = useSearchParams();

  const getFiltersQueryValues = (): IQueryFilter[] => {
    let filtersQueryValues: IQueryFilter[] = [];

    fields.forEach((field) => {
      const filterValues = params.get(field.queryParam)?.split(",");

      if (filterValues) {
        const existingValues = filterValues.filter((value) => field.paramValues.some((paramValue) => paramValue.value === value));

        if (existingValues) {
          let newValues: string = "";
          switch (field.queryParam) {
            case "region":
              newValues = existingValues.join(",");
              filtersQueryValues.push({ name: "region", values: newValues });
              break;
          }
        }
      }
    });

    return filtersQueryValues;
  };

  return { getFiltersQueryValues };
};

export default useFilter;
