import useAlertStore from "../store/useAlertStore";
import { useEffect, useState } from "react";
import useALertApi from "../hook/useAlertApi";
import { useNavigate } from "react-router-dom";

const InformationsPage = () => {
  const [search, setSearch] = useState("");
  const setDelete = useAlertStore((state) => state.delete);
  const add = useAlertStore((state) => state.add);
  const update = useAlertStore((state) => state.update);
  const alerts = useAlertStore((state) => state.alerts);

  const { loading, error, getAllData } = useALertApi();

  const navigate = useNavigate();

  const [addButton, setAddButton] = useState<boolean>(false);

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
    <div
      className="informations"
      style={{
        display: "flex",
        gap: "12px",
        padding: "12px",
        flexDirection: "column",
      }}
    >
      <h1>Informations pages</h1>
      <p>Here you can add alert and see information</p>

      <p>For delete and update click to see more</p>

      <button onClick={() => setAddButton((prev) => !prev)}>
        {addButton === false ? "Add a alert" : "Close Add"}
      </button>
      <div className="informations-alert">
        {filteredAlerts.map((alert) => (
          <div>
            <article key={alert._id}>
              <p>name: {alert.displayName}</p>
              <p>Description: {alert.description}</p>
              <p>Priority: {alert.priority}</p>
              <p>Arena: {alert.arena}</p>
              <p>status: {alert.status}</p>
              <p>
                longuitude: {alert.lon} | latitude : {alert.lat}{" "}
              </p>
            </article>
            <button onClick={() => navigate(`/alert/${alert._id}`)}>
              See more
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InformationsPage;
