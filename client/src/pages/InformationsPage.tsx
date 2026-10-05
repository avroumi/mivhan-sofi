import useAlertStore from "../store/useAlertStore";
import { useEffect, useState } from "react";
import useALertApi from "../hook/useAlertApi";
import { useNavigate } from "react-router-dom";
import type { createMapAlert } from "../types/MapTypes";

const InformationsPage = () => {
  const [search, setSearch] = useState("");
  const setDelete = useAlertStore((state) => state.delete);
  const add = useAlertStore((state) => state.add);
  const update = useAlertStore((state) => state.update);
  const alerts = useAlertStore((state) => state.alerts);

  const [description, setDescription] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [priority, setPriority] = useState("Low");
  const [arena, setArena] = useState("North");
  const [status, setStatus] = useState("Active");
  const [lon, setLon] = useState<number | null>(null);
  const [lat, setLat] = useState<number | null>(null);

  const { loading, error, getAllData, createAlert } = useALertApi();

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

  const handleCreate = async (data: createMapAlert) => {
    await createAlert(data);
    if (error) {
      return <p>{error}</p>;
    }
    await getAllData();
  };

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
      <div>
        {addButton && (
          <form
            className="from-create"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              padding: "12px",
            }}
            onSubmit={(e) => {
              e.preventDefault();
              handleCreate({
                displayName,
                description,
                priority,
                arena,
                status,
                lon,
                lat,
              });
            }}
          >
            <label>Name</label>
            <input
              type="text"
              value={displayName}
              placeholder="Name"
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
            <label>descritpion</label>
            <textarea
              value={description}
              placeholder="...."
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <label>Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>

            <label>Arena</label>
            <select value={arena} onChange={(e) => setArena(e.target.value)}>
              <option value="North">North</option>
              <option value="South">South</option>
              <option value="Center">Center</option>
            </select>

            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Active">Active</option>
              <option value="Handled">Handled</option>
            </select>

            <label>Latitude</label>
            <input
              type="number"
              value={lat}
              placeholder="56.675"
              onChange={(e) => setLat(e.target.valueAsNumber)}
              required
            />

            <label>Longuitude</label>
            <input
              type="number"
              value={lon}
              placeholder="59.900"
              onChange={(e) => setLon(e.target.valueAsNumber)}
              required
            />

            <button type="submit">Send</button>
          </form>
        )}
      </div>

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
