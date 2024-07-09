import React, {useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function Navbar() {
  const { isAuthenticated, userRole, userName, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="/logo.png" alt="Logo" height={40} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {isAuthenticated && userRole === "admin" && (
              <li className="nav-item">
                <Link className="nav-link active" to="/admin">
                  Admin
                </Link>
              </li>
            )}
            {isAuthenticated && userRole === "user" && (
              <li className="nav-item">
                <Link className="nav-link active" to="/userraiseticket">
                  User
                </Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <span className="nav-link active">@{userName}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-danger text-light" type="button" onClick={handleLogout}>
                    Log Out
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  <button className="btn btn-success text-light" type="button">
                    Sign In
                  </button>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
    </div>
  );
}
