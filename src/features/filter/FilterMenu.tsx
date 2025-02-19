import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { IFilterParameter } from "shared/types";
import { useEffect, useState } from "react";
import styles from "./FilterMenu.module.scss";

interface IProps {
  fields: IFilterParameter[] | undefined;
}

const FilterMenu = ({ fields }: IProps) => {
  if (!Array.isArray(fields) || fields.length === 0) return null;

  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();

  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    const newSelectedFilters: { [key: string]: string[] } = {};

    fields.forEach((field) => {
      const param = params.get(field.queryParam);

      if (param) {
        newSelectedFilters[field.queryParam] = decodeURIComponent(param).split(",");
      } else {
        newSelectedFilters[field.queryParam] = [];
      }
    });

    setSelectedFilters(newSelectedFilters);
  }, [location.search, fields, params]);

  const handleFilterChange = (filterQueryParam: string, value: string) => {
    setSelectedFilters((prevSelectedFilters) => {
      const newSelectedFilters = { ...prevSelectedFilters };

      if (newSelectedFilters[filterQueryParam]?.includes(value)) {
        newSelectedFilters[filterQueryParam] = newSelectedFilters[filterQueryParam].filter((item) => item !== value);
      } else {
        newSelectedFilters[filterQueryParam] = [...(newSelectedFilters[filterQueryParam] || []), value];
      }

      const newParams = new URLSearchParams(params);
      newParams.delete(filterQueryParam);

      if (newSelectedFilters[filterQueryParam].length > 0) {
        newParams.set(filterQueryParam, newSelectedFilters[filterQueryParam].join(","));
      }

      navigate(`${location.pathname}?${newParams.toString()}`, { state: { clearCache: true } });

      return newSelectedFilters;
    });
  };

  return (
    <div className={styles.filterMenu}>
      <fieldset>
        <legend className={styles.legend}>Фильтры</legend>
        {fields.map((field) => (
          <details key={field.queryParam} open>
            <summary>{field.name}</summary>
            <div className={styles.filtersWrapper}>
              {field.paramValues.map((value) => (
                <label key={field.queryParam + value.value} className={styles.filterLabel}>
                  <input
                    type="checkbox"
                    checked={selectedFilters[field.queryParam]?.includes(value.value)}
                    className={styles.checkbox}
                    onChange={() => handleFilterChange(field.queryParam, value.value)}
                  />
                  {value.name}
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
