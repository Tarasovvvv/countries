import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { ISortParameter } from "shared/types";
import styles from "./SortMenu.module.scss";

interface IProps {
  fields: ISortParameter[] | undefined;
}

const FilterMenu = ({ fields }: IProps) => {
  if (!Array.isArray(fields) || fields.length === 0) return null;

  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const sortParam = params.get("sort");

  useEffect(() => {
    if (sortParam) {
      const sortParamOrder = sortParam.slice(sortParam.indexOf("_") + 1);
      if (sortParamOrder === "asc" || sortParamOrder === "desc") {
        const sortParamName = sortParam.slice(0, sortParam.indexOf("_"));
        for (let i = 0; i < fields.length; i++) {
          if (fields[i].queryParam === sortParamName) {
            fields[i].order = sortParamOrder;
            break;
          }
        }
      }
    }
  }, []);

  const handleSubmmit = (index: number) => {
    const sortOrder = fields[index].order === "asc" ? "desc" : "asc";
    if (sortOrder === "asc") {
      params.delete("sort");
    } else {
      params.set("sort", `${fields[index].queryParam}_desc`);
    }
    navigate(`${location.pathname}?${params.toString()}`);
  };

  return (
    <div className={styles.sortForm}>
      <fieldset className={styles.sortFieldset}>
        <legend className={styles.sortLabel}>Сортировать по</legend>
        {fields &&
          fields.map((field, i) => (
            <button
              key={field.queryParam}
              onClick={() => handleSubmmit(i)}
              className={clsx(styles.submitButton, {
                [styles.selected]: field.queryParam === fields[i].queryParam,
              })}
            >
              {field.name}
              {field.queryParam === fields[i].queryParam &&
                (field.order === "asc" ? (
                  field.isLexical ? (
                    <svg width="1.5em" height="1.5em" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7 3V21M7 3L11 7M7 3L3 7M15.5 3H20.5L15.5 10H20.5M16 20H20M15 21L18 14L21 21"
                        stroke="currentColor"
                        strokeWidth="0.1em"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg width="1.5em" height="1.5em" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7 3V21M7 3L11 7M7 3L3 7M14 3H15M14 9H17M14 15H19M14 21H21"
                        stroke="currentColor"
                        strokeWidth="0.1em"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )
                ) : field.isLexical ? (
                  <svg width="1.5em" height="1.5em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7 3V21M7 3L11 7M7 3L3 7M15.5 14H20.5L15.5 21H20.5M16 9H20M15 10L18 3L21 10"
                      stroke="currentColor"
                      strokeWidth="0.1em"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg width="1.5em" height="1.5em" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7 3V21M7 3L11 7M7 3L3 7M14 3H21M14 9H19M14 15H17M14 21H15"
                      stroke="currentColor"
                      strokeWidth="0.1em"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ))}
            </button>
          ))}
      </fieldset>
    </div>
  );
};

export default FilterMenu;
