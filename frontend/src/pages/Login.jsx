import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Login.css";
import { useNavigate } from "react-router";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        }
      );
      if (response.data.success) {
        await login(response.data.user, response.data.token);
        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/customer/dashboard");
        }
      } else {
        alert(response.data.message || "Erro desconhecido!");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {error && (
          <div className="bg-red-200 text-red-700 p-2 mb-4 rounded">
            {error}
          </div>
        )}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            placeholder="Insira seu email"
            type="text"
            name="email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            placeholder="Insira sua senha"
            type="password"
            name="password"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">{loading ? "Loading..." : "Login"}</button>
      </form>
    </div>
  );
};
export default Login;
