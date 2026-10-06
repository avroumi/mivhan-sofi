import { Link, useNavigate } from "react-router-dom";
import authStore from "../store/useUserStore";

const Headers = () => {
  const logout = authStore((state) => state.logout);
  const user = authStore((state) => state.user);
  const navigate = useNavigate();
  return (
    <header className="header">
      <div>
        <h1>welcome back {user?.username}</h1>
        <p>Role: {user?.role}</p>
      </div>

      <div className="navbar">
        <Link to={"/"}>Home</Link>
        <Link to="/informations">Informations</Link>
        <button onClick={logout}>Logout</button>
        {user.role === "admin" && (
          <button onClick={() => navigate("/admin-page")}>
            AdminPrivilege
          </button>
        )}
      </div>
    </header>
  );
};

export default Headers;
