import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { IFilterParameter } from "shared/types";
import { useEffect, useState } from "react";
import styles from "./FilterMenu.module.scss";
import { useDebounce } from "shared/lib/hooks";
import { useTranslation } from "react-i18next";

interface IProps {
  fields: IFilterParameter[] | undefined;
}

const FilterMenu = ({ fields }: IProps) => {
  if (!Array.isArray(fields) || fields.length === 0) return null;

  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] | null }>(
    Object.fromEntries(
      fields.map((field) => {
        return [field.queryParam, params.get(field.queryParam)?.split(",") ?? null];
      })
    )
  );
  const debouncedFilters = useDebounce(selectedFilters, 200);

  useEffect(() => {
    Object.keys(debouncedFilters).forEach((filterQueryParam) => {
      const values = debouncedFilters[filterQueryParam] || [];
      if (values.length > 0) {
        params.set(filterQueryParam, values.join(","));
      } else {
        params.delete(filterQueryParam);
      }
    });
    navigate(`${location.pathname}?${params.toString()}`);
  }, [debouncedFilters]);

  const handleFilterChange = (filterQueryParam: string, value: string) => {
    const newSelectedFilters = { ...selectedFilters };

    if (newSelectedFilters[filterQueryParam]?.includes(value)) {
      newSelectedFilters[filterQueryParam] = newSelectedFilters[filterQueryParam].filter((item) => item !== value);
    } else {
      newSelectedFilters[filterQueryParam] = [...(newSelectedFilters[filterQueryParam] || []), value];
    }

    setSelectedFilters(newSelectedFilters);
  };

  return (
    <div className={styles.filterMenu}>
      <fieldset>
        <legend className={styles.legend}>{t("main.filter.legend")}</legend>
        {fields.map((field) => (
          <details key={field.queryParam} open>
            <summary>{t(`main.filter.fields.${field.queryParam}.name`)}</summary>
            <div className={styles.filtersWrapper}>
              {field.paramValues.map((value) => (
                <label key={field.queryParam + value.value} className={styles.filterLabel}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    onChange={() => handleFilterChange(field.queryParam, value.value)}
                    checked={selectedFilters[field.queryParam]?.includes(value.value) || false}
                  />
                  {t(`main.filter.fields.${field.queryParam}.values.${value.value}`)}
                </label>
              ))}
            </div>
          </details>
        ))}
      </fieldset>
    </div>
  );
};

export default FilterMenu;
