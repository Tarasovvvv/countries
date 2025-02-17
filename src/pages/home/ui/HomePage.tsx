import React, { Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import { useCountries } from "entities/country";
import { Loader, Errorer, SearchInput } from "features";
import styles from "./HomePage.module.scss";

const LazyCountryPreview = React.lazy(() => import("entities/country/ui/country-preview/CountryPreview"));

function HomePage() {
  const [params] = useSearchParams();
  const { data, isLoading, error } = useCountries({ search: params.get("search") || null });

  return (
    <>
      <SearchInput />
      <Loader isOpen={isLoading} />
      <Errorer isOpen={error !== undefined} error={error && "data" in error ? error.data?.message : error?.message} />
      <Suspense fallback={<Loader />}>
        {data?.map((item, i) => (
          <LazyCountryPreview key={i} data={item} />
        ))}
      </Suspense>
    </>
  );
}

export default HomePage;
