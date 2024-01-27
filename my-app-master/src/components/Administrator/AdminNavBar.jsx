import React from "react";








function AdminNavBar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light navbar-custom ">
                <a className="navbar-brand ml-5" href="/Administrator/ViewPendingUsers">EPL</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                        
                            <a className="nav-link" href="/login">Log Out <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/Administrator/ShowAllUsers">Show All Users</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/Administrator/ViewPendingUsers">Pending Users</a>
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
export default AdminNavBar;

