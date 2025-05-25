import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:8081/api/profile")
      .then((response) => {
        if (response.data.status === "success") {
          setProfile(response.data.data);
        } else {
          console.error("Failed to fetch profile");
        }
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const handleHome = () => {
    navigate("/");
  };

  const userData = profile || {
    username: "Loading...",
    email: "Loading...",
    adsPosted: 0,
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-between align-items-center mb-4">
        <div className="col-auto">
          <button className="btn btn-outline-primary" onClick={handleHome}>
            <i className="bi bi-house-door"></i> Home
          </button>
        </div>
        <div className="col-auto">
          <h1 className="mb-0">My Profile</h1>
        </div>
        <div className="col-auto">
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right"></i> Logout
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">User Information</h5>
            </div>
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-light rounded-circle p-3 me-3">
                  <i
                    className="bi bi-person-fill"
                    style={{ fontSize: "2rem" }}
                  ></i>
                </div>
                <div>
                  <h4 className="mb-0">{profile?.fname || "Loading..."}</h4>

                </div>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span>
                    <i className="bi bi-envelope me-2"></i>Email
                  </span>
                  <span>{userData.email}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span>
                    <i className="bi bi-megaphone me-2"></i>Ads Posted
                  </span>
                  <span className="badge bg-primary rounded-pill">
                    {userData.adsPosted}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">My Ads</h5>
            </div>
            <div className="card-body">
              <p className="text-muted">
                Your posted ads will appear here. You'll be able to edit,
                delete, or mark them as sold.
              </p>
              <div className="alert alert-info">
                <i className="bi bi-info-circle me-2"></i>
                You haven't posted any ads yet. Start by creating your first ad!
              </div>
              <Link to="/post" className="btn btn-primary">
                <i className="bi bi-plus-circle"></i> Create New Ad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
