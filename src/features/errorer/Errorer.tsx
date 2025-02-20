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
      switch (error.status) {
        case 400:
          message = "Ничего не найдено";
          break;
        case 404:
          message = "Неверный запрос";
          break;
        default:
          message = "Неизвестная ошибка";
      }
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
