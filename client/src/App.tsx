import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import InformationsPage from "./pages/InformationsPage";
import CurrentInformation from "./pages/CurrentInformation";
import Layout from "./components/Layout";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoutes />}>
            <Route element={<Layout />}>
              <Route path="/admin-page" element={<AdminPage />} />

              <Route path="/" element={<HomePage />} />
              <Route path="/informations" element={<InformationsPage />} />
              <Route path="/alert/:id" element={<CurrentInformation />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
