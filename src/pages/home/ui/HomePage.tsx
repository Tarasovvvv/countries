import React, { Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import { useCountries } from "entities/country";
import { Loader, Errorer, SearchInput, SortMenu } from "features";
import styles from "./HomePage.module.scss";
import { ICountry, IDetailedCountry, ISortParameter } from "shared/types";

const LazyCountryPreview = React.lazy(() => import("entities/country/ui/country-preview/CountryPreview"));

function HomePage() {
  const [params] = useSearchParams();
  const sortParam = params.get("sort");
  const sortParamName = (sortParam?.slice(0, sortParam.indexOf("_")) || "population") as keyof Pick<ICountry, "population">;
  const sortParamOrder = (sortParam?.slice(sortParam.indexOf("_") + 1) || "asc") as "asc" | "desc";
  const sortFields: ISortParameter[] = [{ name: "Населению", queryParam: "population", order: sortParamName === "population" ? sortParamOrder : "asc" }];
  const sortCountries = (countries: ICountry[] | null | undefined) => {
    if (!countries) return null;

    let sortedCountries = [...countries];
    const sortField = sortFields.find((field) => field.queryParam === sortParamName);

    if (!sortField?.isLexical) {
      sortedCountries.sort((a, b) => {
        const valueA = a[sortParamName];
        const valueB = b[sortParamName];
        return sortParamOrder === "desc" ? valueB - valueA : valueA - valueB;
      });
    }

    return sortedCountries;
  };

  const { data, isLoading, error } = useCountries({ search: params.get("search") || null });

  return (
    <>
      <SearchInput />
      <SortMenu fields={sortFields} />
      <Loader isOpen={isLoading} />
      <Errorer isOpen={error !== undefined} error={error && "data" in error ? error.data?.message : error?.message} />
      <Suspense fallback={<Loader />}>
        {sortCountries(data)?.map((item, i) => (
          <LazyCountryPreview key={i} data={item} />
        ))}
      </Suspense>
    </>
  );
}

export default HomePage;
