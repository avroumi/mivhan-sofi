import { useEffect, useState } from "react";
import useALertApi from "../hook/useAlertApi";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import type { MapAlert, UpdateMapAlert } from "../types/MapTypes";

const CurrentInformation = () => {
  const [alert, setAlert] = useState<MapAlert | null>(null);
  const [updateButton, setUpdateButton] = useState<boolean>(false);

  const navigate = useNavigate();

  const { id } = useParams();

  const { loading, error, getAlertById, update, deleteAlert } = useALertApi();

  const [description, setDescription] = useState(alert?.description);
  const [displayName, setDisplayName] = useState(alert?.displayName);
  const [priority, setPriority] = useState(alert?.priority);
  const [arena, setArena] = useState(alert?.arena);
  const [status, setStatus] = useState(alert?.status);
  const [lon, setLon] = useState(alert?.lon);
  const [lat, setLat] = useState(alert?.lat);

  const handleDelete = async (id: string) => {
    await deleteAlert(id);
    if (!error) {
      navigate("/informations");
    }
  };

  const handleUpdate = async (id: string, data: UpdateMapAlert) => {
    const response = await update(id, data);
    if (error) {
      <p>{error}</p>;
    }

    setAlert(response.data);
  };

  useEffect(() => {
    const getById = async () => {
      if (!id) {
        return <Navigate to="/" />;
      }
      const result = await getAlertById(id);
      setAlert(result.data);
    };
    getById();
  }, []);

  
  return (
    <div>
      {loading && <p>Loading ...</p>}
      {error && <p>{error}</p>}
      {alert && (
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
          <button onClick={() => handleDelete(alert._id)}>
            Delete this alert
          </button>
          <button onClick={() => setUpdateButton((prev) => !prev)}>
            {updateButton === true ? "CloseAdd" : "Update alert"}
          </button>
          {updateButton && (
            <form
              className="from-update"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                padding: "12px",
              }}
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(alert._id, {
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
              />
              <label>descritpion</label>
              <textarea
                value={description}
                placeholder="...."
                onChange={(e) => setDescription(e.target.value)}
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
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Active">Active</option>
                <option value="Handled">Handled</option>
              </select>

              <label>Latitude</label>
              <input
                type="number"
                value={lat}
                placeholder="56.675"
                onChange={(e) => setLat(e.target.valueAsNumber)}
              />

              <label>Longuitude</label>
              <input
                type="number"
                value={lon}
                placeholder="59.900"
                onChange={(e) => setLon(e.target.valueAsNumber)}
              />

              <button type="submit">Send</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default CurrentInformation;
