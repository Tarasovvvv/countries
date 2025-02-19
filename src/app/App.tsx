import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage, CountryPage } from "pages";
import Layout from "./Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/:cca3" element={<CountryPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
