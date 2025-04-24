import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleHome = () => {
    navigate("/");
  };

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
        <h2>Register</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">Email</label>
            <input
              type="email"
              id="username"
              placeholder="Enter Email"
              className="form-control"
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
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Register
          </button>
        </form>
        <button onClick={handleLogin} className="btn btn-primary mt-3">
          Login
        </button>
      </div>
    </div>
  );
}
