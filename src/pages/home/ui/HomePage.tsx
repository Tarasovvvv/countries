import React, { Suspense } from "react";
import { useSearch, useSort } from "entities/country";
import { Loader, Errorer, SearchInput, SortMenu } from "features";
import { ISortParameter } from "shared/types";
import styles from "./HomePage.module.scss";

const LazyCountryPreview = React.lazy(() => import("entities/country/ui/country-preview/CountryPreview"));

function HomePage() {
  const sortFields: ISortParameter[] = [{ name: "Населению", queryParam: "population" }];
  const filterFields: ISortParameter[] = [{ name: "Населению", queryParam: "population" }];

  const { data, isLoading, error } = useSearch();
  const { sortCountries } = useSort(sortFields);

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
