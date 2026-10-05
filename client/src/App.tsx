import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import InformationsPage from "./pages/InformationsPage";
import CurrentInformation from "./pages/CurrentInformation";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/informations" element={<InformationsPage />} />
          <Route path="/alert/:id" element={<CurrentInformation />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
