import { useCountry } from "entities/country";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Loader, Errorer } from "features";
import styles from "./CountryPage.module.scss";

function CountryPage() {
  const { country } = useParams();
  const { countryData, bordersData, isLoading, error } = useCountry({ name: country!.replace("_", " ") });
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        <svg fill="currentColor" width="2em" height="2em" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
          <path d="M50,24H6.83L27.41,3.41a2,2,0,0,0,0-2.82,2,2,0,0,0-2.82,0l-24,24a1.79,1.79,0,0,0-.25.31A1.19,1.19,0,0,0,.25,25c0,.07-.07.13-.1.2l-.06.2a.84.84,0,0,0,0,.17,2,2,0,0,0,0,.78.84.84,0,0,0,0,.17l.06.2c0,.07.07.13.1.2a1.19,1.19,0,0,0,.09.15,1.79,1.79,0,0,0,.25.31l24,24a2,2,0,1,0,2.82-2.82L6.83,28H50a2,2,0,0,0,0-4Z" />
        </svg>
      </button>
      <Loader isOpen={isLoading} />
      <Errorer isOpen={error !== undefined} error={error && "data" in error ? `${country} - ${error.data?.message}` : error?.message} />
      <img className={styles.img} src={countryData?.flags.svg} alt={countryData?.flags.alt} />
      <h2>
        <span className={styles.cca3}>{countryData?.cca3}</span>
        {countryData?.name.official}
      </h2>
      <Link to={countryData?.maps.googleMaps || countryData?.maps.openStreetMaps || "/"} target="_blank" className={styles.mapLink}>
        <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.05025 1.53553C8.03344 0.552348 9.36692 0 10.7574 0C13.6528 0 16 2.34721 16 5.24264C16 6.63308 15.4477 7.96656 14.4645 8.94975L12.4142 11L11 9.58579L13.0503 7.53553C13.6584 6.92742 14 6.10264 14 5.24264C14 3.45178 12.5482 2 10.7574 2C9.89736 2 9.07258 2.34163 8.46447 2.94975L6.41421 5L5 3.58579L7.05025 1.53553Z" />
          <path d="M7.53553 13.0503L9.58579 11L11 12.4142L8.94975 14.4645C7.96656 15.4477 6.63308 16 5.24264 16C2.34721 16 0 13.6528 0 10.7574C0 9.36693 0.552347 8.03344 1.53553 7.05025L3.58579 5L5 6.41421L2.94975 8.46447C2.34163 9.07258 2 9.89736 2 10.7574C2 12.5482 3.45178 14 5.24264 14C6.10264 14 6.92742 13.6584 7.53553 13.0503Z" />
          <path d="M5.70711 11.7071L11.7071 5.70711L10.2929 4.29289L4.29289 10.2929L5.70711 11.7071Z" />
        </svg>
        <span>Страна на карте</span>
      </Link>
      <div style={{ display: "flex", justifyContent: "space-between", width: "40em" }}>
        <div className={styles.countryData} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <div className={styles.borders}>{bordersData ? "Страны соседи" : "Нет стран соседей"}</div>
          {bordersData?.map((item) => (
            <Link to={`/${item.name.common}`} key={`${item.name.common}`} className={`${styles.dataItem} ${styles.dataItemHoverable}`} style={{ alignItems: "center" }}>
              <svg
                key={`svg${item.name.common}`}
                style={{ marginRight: "0.4em" }}
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 17H20M20 17L16 13M20 17L16 21M20 7H4M4 7L8 3M4 7L8 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {item.name.common}
            </Link>
          ))}
        </div>
        <div className={styles.separator} />
        <div className={styles.countryData}>
          <div className={styles.dataItem}>
            <span className={styles.dataItemKey}>Столица:</span>
            {countryData?.capital}
          </div>
          <div className={styles.dataItem}>
            <span className={styles.dataItemKey}>Население:</span>
            {`${countryData?.population} чел.`}
          </div>
          <div className={styles.dataItem}>
            <span className={styles.dataItemKey}>Площадь:</span>
            {`${countryData?.area} км`}
            <sup style={{ fontSize: "0.8rem" }}>2</sup>
          </div>
          <div className={styles.dataItem}>
            <span className={styles.dataItemKey}>Континенты:</span>
            {countryData?.continents.join(", ")}
          </div>
          <div className={styles.dataItem}>
            <span className={styles.dataItemKey}>Регионы:</span>
            {countryData?.region}
          </div>
          <div className={styles.dataItem}>
            <span className={styles.dataItemKey}>Языки:</span>
            {Object.values(countryData?.languages || []).join(", ")}
          </div>
          <div className={styles.dataItem}>
            <span className={styles.dataItemKey}>Валюта:</span>
            {Object.entries(countryData?.currencies || []).map(([key, value]) => (
              <div key={`${key}${value.symbol}`} title={value.name} style={{ display: "flex" }}>
                <span className={styles.currencySymbol}>{value.symbol}</span>
                {key}
              </div>
            ))}
          </div>
          <div className={styles.dataItem} style={{ textAlign: "left", display: "flex", flexDirection: "column" }}>
            <span className={styles.dataItemKey}>Часовые пояса:</span>
            {countryData?.timezones.join(", ")}
          </div>
        </div>
      </div>
    </>
  );
}

export default CountryPage;
