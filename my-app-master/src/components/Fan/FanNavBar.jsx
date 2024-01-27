import React from "react";

import './styles.css';
function FanNavBar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light navbar-custom ">
                <a className="navbar-brand ml-5" href="/Fan/FanDashBoard">EPL</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                        
                            <a className="nav-link" href="/login">Log Out <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/Fan/EditProfile"> My Profile</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/Fan/ViewReservations"> My reservations</a>
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
export default FanNavBar;

