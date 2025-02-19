import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import styles from "./Errorer.module.scss";

interface IProps {
  isOpen: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
}

function Errorer({ isOpen, error }: IProps) {
  let message = "Неизвестная ошибка";

  if (error && typeof error === "object") {
    if ("status" in error) {
      message = error.status === 400 ? "Ничего не найдено" : "Другая ошибка";
    } else if ("message" in error) {
      message = error.message ?? "Ошибка без описания";
    }
  }

  return (
    isOpen && (
      <p className={styles.errorMessage}>
        {message}
        <br />
        🤔
      </p>
    )
  );
}

export default Errorer;
