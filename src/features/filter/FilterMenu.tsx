import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { ISortParameter } from "shared/types";
import styles from "./FilterMenu.module.scss";

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

  return <div className={styles.sortForm}></div>;
};

export default FilterMenu;
