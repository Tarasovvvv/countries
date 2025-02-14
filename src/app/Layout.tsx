import { Outlet, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import styles from "./Layout.module.scss";

function Layout() {
  const { country } = useParams();

  return (
    <div className={styles.layout}>
      <Helmet>
        <title>{`Countries - ${country}`}</title>
      </Helmet>

      <header>
        <h1>Countries - всё о странах в одном месте</h1>
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
