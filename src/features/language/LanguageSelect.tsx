import { useTranslation } from "react-i18next";
import styles from "./LanguageSelect.module.scss";
import i18next, { changeLanguage } from "i18next";

const LanguageSelect = () => {
  const { language, options } = i18next;
  const { t } = useTranslation();

  const languageKey = `home:language.${language}`;
  const fallbackKey = `home:language.${options.fallbackLng?.toString()}`;

  const switchLanguage = () => {
    changeLanguage(language === "en-US" ? "ru-RU" : "en-US");
  };

  return (
    <button onClick={switchLanguage} className={styles.switchButton}>
      <span className={styles.savedLanguage}>{t(languageKey, { defaultValue: t(fallbackKey) })}</span>
      <svg width="2em" height="2em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeLinejoin="round" />
        <path d="M12 3C12 3 8.5 6 8.5 12C8.5 18 12 21 12 21" stroke="currentColor" strokeLinejoin="round" />
        <path d="M12 3C12 3 15.5 6 15.5 12C15.5 18 12 21 12 21" stroke="currentColor" strokeLinejoin="round" />
        <path d="M3 12H21" stroke="currentColor" strokeLinejoin="round" />
        <path d="M19.5 7.5H4.5" stroke="currentColor" strokeLinejoin="round" />
        <path d="M19.5 16.5H4.5" stroke="currentColor" strokeLinejoin="round" />
      </svg>
    </button>
  );
};

export default LanguageSelect;
