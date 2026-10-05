import { Outlet } from "react-router-dom";
import Headers from "./Headers";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Headers />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
