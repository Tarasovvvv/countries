import React, { Suspense } from "react";
import { useSearch, useSort, useFilter } from "entities/country";
import { Loader, Errorer, SearchInput, SortMenu, FilterMenu, LanguageSelect } from "features";
import { ISortParameter, IFilterParameter } from "shared/types";
import styles from "./HomePage.module.scss";

const LazyCountryPreview = React.lazy(() => import("entities/country/ui/country-preview/CountryPreview"));

function HomePage() {
  const sortFields: ISortParameter[] = [
    {
      name: "Населению",
      queryParam: "population",
    },
  ];

  // Нет ендпоинта, чтобы подтянуть регионы из бд, поэтому хардкод любимый
  const filterFields: IFilterParameter[] = [
    {
      name: "Регион",
      queryParam: "region",
      paramValues: [
        { name: "Азия", value: "asia" },
        { name: "Африка", value: "africa" },
        { name: "Европа", value: "europe" },
        { name: "Океания", value: "oceania" },
        { name: "Америка", value: "americas" },
        { name: "Антарктика", value: "antarctic" },
      ],
    },
  ];

  const { sortCountries } = useSort(sortFields);
  const { getFiltersQueryValues } = useFilter(filterFields);
  const { data, isLoading, error } = useSearch(getFiltersQueryValues());

  const finalData = data ? sortCountries(data) : null;

  return (
    <>
      <div className={styles.searhWrapper}>
        <div></div>
        <SearchInput />
        <LanguageSelect />
      </div>
      <SortMenu fields={sortFields} />
      <div className={styles.filterWrapper}>
        <div className={styles.previewsWrapper}>
          <Loader isOpen={isLoading} />
          <Errorer isOpen={!!error} error={error} />
          {!isLoading && !error && (
            <Suspense fallback={<Loader />}>
              {finalData?.map((item) => (
                <LazyCountryPreview key={item.cca3} data={item} />
              ))}
            </Suspense>
          )}
        </div>
        <FilterMenu fields={filterFields} />
      </div>
    </>
  );
}

export default HomePage;
