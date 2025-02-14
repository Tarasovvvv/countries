import { ICountry } from "shared/types";
import styles from "./CountryPreview.module.scss";
import { Link } from "react-router-dom";

interface IProps {
  data: ICountry;
}

function CountryPreview({ data }: IProps) {
  return (
    <Link to={data.name.common.replace(" ", "_")} className={styles.country}>
      <img src={data.flags.svg} loading="lazy" className={styles.img} />
      <p>{data.translations.rus.official}</p>
    </Link>
  );
}

export default CountryPreview;
