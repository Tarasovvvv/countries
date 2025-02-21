import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { CountriesStore } from "./stores";
import App from "./App.tsx";
import "./i18next";
import "./index.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={CountriesStore}>
      <App />
    </Provider>
  </StrictMode>
);
