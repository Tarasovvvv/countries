import { ICountry } from "shared/types";
import styles from "./CountryPreview.module.scss";
import { Link } from "react-router-dom";
import { getTranlsatedName } from "shared/lib/functions";
import { useTranslation } from "react-i18next";

interface IProps {
  data: ICountry;
}

function CountryPreview({ data }: IProps) {
  const { i18n } = useTranslation();

  const translatedName = getTranlsatedName(data, i18n.language);
  return (
    <Link to={`${data.cca3}`} className={styles.country}>
      <img src={data.flags.svg || data.flags.png} loading="lazy" className={styles.img} />
      <p>{translatedName}</p>
    </Link>
  );
}

export default CountryPreview;
