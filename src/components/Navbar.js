import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { FiLogIn, FiHome, FiFilePlus, FiList, FiCheckSquare } from "react-icons/fi";
import { MdAccountCircle } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Navbar() {
  const [dropdown, setDropdown] = useState(false);
  const { isAuthenticated, userRole, userName, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src="/logo.png" alt="Logo" height={40} className="me-2" />
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
              <li className="nav-item">
                <Link className="nav-link active d-flex align-items-center" to="/">
                  <FiHome className="me-1" />
                  Home
                </Link>
              </li>
              {isAuthenticated && userRole === "admin" && (
                <li className="nav-item">
                  <Link className="nav-link active d-flex align-items-center" to="/admin">
                    <FiList className="me-1" />
                    Queries
                  </Link>
                </li>
              )}
              {isAuthenticated && userRole === "user" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link active d-flex align-items-center" to="/userraiseticket">
                      <FiFilePlus className="me-1" />
                      Create Ticket
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active d-flex align-items-center" to="/UserAllTicket">
                      <FiList className="me-1" />
                      View Tickets
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active d-flex align-items-center" to="/allqueries">
                      <FiCheckSquare className="me-1" />
                      Resolved Tickets
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <span className="nav-link active">@{userName}</span>
                  </li>
                  <li
                    className="nav-item dropdown position-relative mt-1"
                    onMouseOver={() => setDropdown(true)}
                    onMouseLeave={() => setDropdown(false)}
                  >
                    <MdAccountCircle
                      className="text-light"
                      style={{ fontSize: "2rem", cursor: "pointer" }}
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    />
                    <ul
                      className={`dropdown-menu ${dropdown ? 'show' : ''} ${window.innerWidth < 768 ? 'dropdown-small' : 'dropdown-large'}`}
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <span
                          onClick={handleLogout}
                          className="dropdown-item"
                          style={{ cursor: "pointer" }}
                        >
                          <FiLogIn className="me-2" />
                          Logout
                        </span>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link to="/login" className="nav-link text-light fw-bold">
                    <FiLogIn className="me-2" />
                    Sign In
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <style>{`
        .dropdown-large {
          right: 0px;
          width: 150px;
          z-index: 30;
          position: absolute;
          background-color: white;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          border-radius: 0.25rem;
        }
        .dropdown-small {
          left: 0px;
          top: 50px;
          width: 150px;
          z-index: 30;
          position: absolute;
          background-color: white;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          border-radius: 0.25rem;
        }
        .dropdown-menu {
          padding: 0.5rem;
        }
      `}</style>
    </>
  );
}
