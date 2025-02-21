import { Outlet, useParams } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import styles from "./Layout.module.scss";
import { useTranslation } from "react-i18next";

function Layout() {
  const { country } = useParams();
  const { t } = useTranslation();

  return (
    <div className={styles.layout}>
      <HelmetProvider>
        <Helmet>
          <title>{`Countries${country ? ` - ${country.replace("_", " ") ?? ""}` : ""}`}</title>
        </Helmet>
      </HelmetProvider>

      <header>
        <h1>
          <button className={styles.homeButton} onClick={() => (window.location.href = "/")}>
            Countries
            <span className={styles.slogan}>{` - ${t("header.slogan")}`}</span>
          </button>
        </h1>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <div className={styles.footerItem}>
          <a className={styles.a} href="https://ufuture.uitm.edu.my/home/" target="_blank">
            TOO U-FUTURE
          </a>
        </div>
        <div className={styles.footerItem}>
          <h3>{`${t(`footer.api`)} API`}</h3>
          <ul>
            <li>
              <a href="https://restcountries.com" target="_blank">
                REST Countries
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
