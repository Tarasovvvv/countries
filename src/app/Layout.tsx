import { Outlet, useParams } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import styles from "./Layout.module.scss";
import { Link } from "react-router-dom";

function Layout() {
  const { country } = useParams();

  return (
    <div className={styles.layout}>
      <HelmetProvider>
        <Helmet>
          <title>{`Countries${country ? ` - ${country.replace("_", " ") ?? ""}` : ""}`}</title>
        </Helmet>
      </HelmetProvider>

      <header>
        <h1>
          <Link className={styles.homeLink} to="/">
            Countries - всё о странах в одном месте
          </Link>
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
          <h3>Используемое API</h3>
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
