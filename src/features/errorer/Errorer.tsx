import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import styles from "./Errorer.module.scss";
import i18next from "i18next";

interface IProps {
  isOpen: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
}

function Errorer({ isOpen, error }: IProps) {
  const { t } = i18next;
  let errorMessage;
  try {
    if (error && typeof error === "object") {
      if ("status" in error) {
        switch (error.status) {
          case 400:
          case 404:
            throw t("errors:nothingFound");
            break;
          default:
            throw t("errors:unknownError");
        }
      } else if ("message" in error) {
        throw t("errors:noDescription");
      }
    }
  } catch (e) {
    errorMessage = e;
  }

  return (
    isOpen && (
      <p className={styles.errorMessage}>
        {errorMessage as string}
        <br />
        🤔
      </p>
    )
  );
}

export default Errorer;
