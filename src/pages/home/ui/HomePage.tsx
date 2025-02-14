import React from "react";
import { useCountries } from "entities/country";
import { Loader, Errorer } from "features";
import styles from "./HomePage.module.scss";
import { Suspense } from "react";

const LazyCountryPreview = React.lazy(() => import("entities/country/ui/country-preview/CountryPreview"));

function HomePage() {
  const { data, isLoading, error } = useCountries();
  return (
    <>
      <Loader isOpen={isLoading} />
      <Errorer isOpen={error !== undefined} error={JSON.stringify(error)} />
      <Suspense fallback={<Loader />}>
        {data?.map((item, i) => (
          <LazyCountryPreview key={i} data={item} />
        ))}
      </Suspense>
    </>
  );
}

export default HomePage;
