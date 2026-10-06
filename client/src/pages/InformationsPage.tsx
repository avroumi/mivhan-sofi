import useAlertStore from "../store/useAlertStore";
import { useEffect, useRef, useState } from "react";
import useALertApi from "../hook/useAlertApi";
import { useNavigate } from "react-router-dom";
import type { createMapAlert } from "../types/MapTypes";
import type { AlertPriority } from "../components/AlertsMap";
import authStore from "../store/useUserStore";

const InformationsPage = () => {
  const [search, setSearch] = useState<AlertPriority | string>("");
  const alerts = useAlertStore((state) => state.alerts);

  const [description, setDescription] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [priority, setPriority] = useState("Low");
  const [arena, setArena] = useState("North");
  const [status, setStatus] = useState("Active");
  const [lon, setLon] = useState<number>(0);
  const [lat, setLat] = useState<number>(0);

  const [alertGeneral, setALertGeneral] = useState<boolean>(false);

  const user = authStore((state) => state.user);

  const { loading, error, getAllData, createAlert } = useALertApi();

  const navigate = useNavigate();

  const [addButton, setAddButton] = useState<boolean>(false);

  useEffect(() => {
    const getAll = async () => {
      await getAllData();
    };
    getAll();
  }, []);

  const filteredAlerts =
    user?.role === "arena_user" && user?.assignedArea !== "All"
      ? alerts
          .filter((alert) =>
            alert.priority.toLowerCase().includes(search.toLowerCase()),
          )
          .filter((alert) => alert.arena === user?.assignedArea)
      : alerts.filter((alert) =>
          alert.priority.toLowerCase().includes(search.toLowerCase()),
        );

  const handleCreate = async (data: createMapAlert) => {
    // const hour = Number(new Date()) - 60 * 60 * 1000;

    // const [critique, setCritique] = useState([]);
    const result = await createAlert(data);

    if (error) {
      return <p>{error}</p>;
    }
    // if (result.data.priority === "Critical") {
      // setCritique((prev) => ({...prev, Number(new Date())})); don't work from mistycal reason
    // }
    // let critical = 0;
    // for (const date of critique) {
    //   console.log(critique); // don't time to fix hit
    //   if (date >= hour) {
    //     critical++;
    //     if (critical >= 3) {
    //       setALertGeneral((prev) => !prev);
    //     }
    //   }
    }
    await getAllData();
  };

  // const element = useRef(alertGeneral);
  // useEffect(() => {
  //   element.current.focus()
  // }, [])
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
      {/* /* {alertGeneral && (
        <div>
          <h1>ALLERTTTTT FLYDUBAI INCOMMING</h1>
          <button onClick={() => setALertGeneral((prev) => !prev)}>
            Evanti
          </button>
        </div>
      )} */ }

      <h1>Informations pages</h1>
      <p>Here you can add alert and see information</p>

      <p>For delete and update click to see more</p>

      <article
        className="search"
        style={{ display: "flex", gap: "12px", padding: "12px" }}
      >
        <label>Search by priority</label>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </article>

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

            {user?.assignedArea !== "All" && user?.role === "arena_user" && (
              <input
                type="text"
                value={user.assignedArea}
                onChange={() => setArena(user.assignedArea)}
              />
            )}

            {user?.assignedArea === "All" ||
              (user?.role !== "arena_user" && (
                <select
                  value={arena}
                  onChange={(e) => setArena(e.target.value)}
                >
                  <label>Arena</label>
                  <option value="North">North</option>
                  <option value="South">South</option>
                  <option value="Center">Center</option>
                </select>
              ))}

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
          <div key={alert._id} className="div-card">
            <article className="alert-card">
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
