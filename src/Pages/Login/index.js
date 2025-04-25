import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    navigate("/register");
  };

  const handleHome = () => {
    navigate("/");
  };

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:8081/login", { username, password })
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          navigate("/profile");
        } else {
          alert("Invalid credentials!");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div className="login-container">
        <div className="d-flex justify-content-between mb-3">
          <button onClick={handleHome} className="btn btn-outline-secondary">
            <i className="bi bi-house-door"></i> Home
          </button>
        </div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Email</label>
            <input
              type="email"
              id="username"
              placeholder="Enter Email"
              className="form-control"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Login
          </button>
        </form>
        <button onClick={handleRegister} className="btn btn-primary mt-3">
          Register
        </button>
      </div>
    </div>
  );
}
