import React from "react";
import { Link, useNavigate } from "react-router-dom"; 

const Navbar = ({ isLoggedIn, handleLogout }) => {
  const navigate = useNavigate(); 

  const handleLogoutClick = () => {
    handleLogout(); 
    navigate("/"); 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <h3>Invoicify</h3>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <Link className="nav-link" to="/about">
              About
            </Link>
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/home">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/create-invoice">
                    InvoiceForm
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link"
                    onClick={handleLogoutClick}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
            {!isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
