import React from "react";
import { Link } from "react-router-dom";

function ManagerNavBar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light navbar-custom">
        <Link className="navbar-brand ml-5" to="/Manager/ManagerDashBoard">
          EPL
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/login">
                Log Out <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/Manager/AddStadium">
                Add Stadium
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/Manager/AddNewMatch">
                Add New Match
              </Link>
            </li>
          </ul>
          <form className="form-inline">
            <div className="navbar">
            </div>
          </form>
        </div>
      </nav>
    </div>
  );
}

export default ManagerNavBar;
