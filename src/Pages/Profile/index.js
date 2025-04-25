import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const handleHome = () => {
    navigate("/");
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-sm-12 d-flex justify-content-between align-items-center">
          <h1>Profile</h1>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div className="col-sm-12 mt-3">
          <p>
            There will be ad posted, and options like delete, edit, sold for the
            ads, and also show email, date joined, home button that will
            redirect to the home page
          </p>
        </div>
        <button onClick={handleHome}>home</button>
      </div>
    </div>
  );
}
