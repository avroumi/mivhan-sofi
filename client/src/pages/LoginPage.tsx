import { useState } from "react";

import useUserApi from "../hook/useUserApi";
import { Navigate, useNavigate } from "react-router-dom";
import type { Login } from "../types/UsersTypes";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { loading, error, loginUser } = useUserApi();

  const handleLogin = async (data: Login) => {
    await loginUser(data);
    if (error) {
      <p>{error}</p>;
    }
    navigate("/");
  };
  return (
    <div className="login-page">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin({ email, password });
        }}
      >
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
        <button type="submit">Send</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;
