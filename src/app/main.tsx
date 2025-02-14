import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { CountriesStore } from "./stores";
import App from "./App.tsx";
import "./index.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={CountriesStore}>
      <App />
    </Provider>
  </StrictMode>
);
