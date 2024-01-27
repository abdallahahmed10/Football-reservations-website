import React from "react";

function Navbar() {
  return (
        <div>
          <nav class="navbar navbar-expand-lg navbar-light navbar-custom">  
          <a class="navbar-brand ml-5" href="/">EPL</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                {/* <Link to="/">Home</Link> */}
                <a class="nav-link" href="/">Home <span class="sr-only" >(current)</span></a>
              </li>
              <li class="nav-item active">
                <a class="nav-link" href="/login">LogIn</a>
              </li>
              <li class="nav-item active">
                <a class="nav-link" href="/signup">SignUp</a>
              </li>
            </ul>
            <form class="form-inline">
            <div  class="navbar">
          </div>
        </form>
          </div>
        </nav>
        </div>

  );



}
export default Navbar;

