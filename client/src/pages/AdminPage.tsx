import { useEffect, useState } from "react";

import useUserApi from "../hook/useUserApi";
import type { Register, User } from "../types/UsersTypes";
import authStore from "../store/useUserStore";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [assignedArea, setAssignedArea] = useState<
    "North" | "South" | "Center" | "All"
  >("North");
  const [role, setRole] = useState<"arena_user" | "general_user" | "admin">(
    "arena_user",
  );

  const [users, setUsers] = useState<User[] | null>(null);

  const navigate = useNavigate();

  const [add, setAdd] = useState<boolean>(false);

  const { loading, error, registerUser, getAllUser, deleteUser } = useUserApi();

  const handleRegister = async (data: Register) => {
    await registerUser(data);
  };

  const handleDelete = async (userId: string) => {
    await deleteUser(userId);
  };
  const user = authStore((state) => state.user);

  useEffect(() => {
    const getAllUsers = async () => {
      const result = await getAllUser();
      setUsers(result.data);
    };
    getAllUsers();
  }, []);

  if (user.role !== "admin") {
    navigate("/login");
  }
  return (
    <div
      className="register-page"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        padding: "12px",
      }}
    >
      <button onClick={() => setAdd((prev) => !prev)}>
        {add === false ? "Add a user" : "Close Add"}
      </button>
      <div
        className="add-user"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          padding: "12px",
        }}
      >
        {add && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister({ email, password, assignedArea, role, username });
            }}
          >
            <article>
              <label>Name</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="David"
              />

              <label>Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
              />
              <label>Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="***********"
              />

              <select
                value={assignedArea}
                onChange={(e) => setAssignedArea(e.target.value)}
              >
                <option value="North">North</option>
                <option value="South">South</option>
                <option value="Center">Center</option>
                <option value="All">All</option>
              </select>

              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="arena_user">Arena User </option>
                <option value="general_user">General User</option>
                <option value="admin">Admin</option>
              </select>

              <button type="submit">add</button>
            </article>
          </form>
        )}
      </div>
      {users &&
        users.map((userP) => (
          <article className="user-card" key={userP.id}>
            <p>Name: {userP.user.username}</p>
            <p>email: {userP.user.email}</p>
            <p>Assigned Area: {userP.user.assignedArea}</p>
            <p>Role: {userP.user.role}</p>
            <br />

            <button onClick={() => handleDelete(userP.user.id)}>Delete</button>
          </article>
        ))}

      {error && <p>{error}</p>}
    </div>
  );
};

export default AdminPage;
