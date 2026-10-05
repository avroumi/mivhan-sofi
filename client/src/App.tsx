import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import InformationsPage from "./pages/InformationsPage";
import CurrentInformation from "./pages/CurrentInformation";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/informations" element={<InformationsPage />} />
            <Route path="/alert/:id" element={<CurrentInformation />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
