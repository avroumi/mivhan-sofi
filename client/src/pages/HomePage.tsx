import { useEffect } from "react";
import useALertApi from "../hook/useAlertApi";
import useAlertStore from "../store/useAlertStore";
import AlertsMap from "../components/AlertsMap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { loading, error, getAllData } = useALertApi();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const alerts = useAlertStore((state) => state.alerts);

  useEffect(() => {
    const getAll = async () => {
      await getAllData();
    };
    getAll();
  }, []);

  const filteredAlerts = alerts.filter((alert) =>
    alert.displayName.includes(search),
  );
  return (
    <div>
      {loading && <p>Loading..</p>}
      <h1>Welcome to Tzofia-Eye</h1>
      <article
        className="search"
        style={{ display: "flex", gap: "12px", padding: "12px" }}
      >
        <label>Search by name</label>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => navigate("/informations")}>
          See more informations
        </button>
      </article>
      <AlertsMap alerts={filteredAlerts} className="alerts" />
      {error && <p>{error}</p>}
    </div>
  );
};

export default HomePage;
