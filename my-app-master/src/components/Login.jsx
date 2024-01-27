import React, { Component, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const navigate = useNavigate();

  let usersData = [];

  

  let response;
  let userData;
  let statusCode;
  let Role;
  let msg;
  async function fetchData() {
    try {
      response = await fetch("http://localhost:8080/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      console.log("user data in fetch :"+userData);
      console.log("response in fetch :"+response);

      if (!response.ok) {
        // Handle non-successful responses, e.g., show an error message
        console.error("Failed to authenticate:", response.statusText);
        return;
      }

      // Assuming the response contains user data in JSON format
      if(response.status!==404)
      {
        userData = await response.json();
        Role=userData.fan;
        statusCode = response.status;
        console.log(statusCode);
        console.log(userData);

      }
    

      // Handle the user data as needed

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  //modified: 404 : usernot found at all:incorrect username or pass
  //modified:201 : user found but yet pending 
  //modified:200:user found and approved , sucess 

  async function handleSubmit(event) {
    event.preventDefault();
    if(password==="admin"&&username==="admin")
    {
      navigate("/Administrator/ViewPendingUsers");
      return;

    }
    const wait = await fetchData();
    if (statusCode === 404)
    {
      msg = "incorrect username or password";
        // Login failed
        setLoginSuccess(false);
        setUsername("");
        setPassword("");
        window.alert(msg);
    }
     
     
     else if (statusCode === 200) {
      msg = "Sucessful login";
      setLoginSuccess(true);
      if (Role === 0)
        navigate("/Manager/ManagerDashboard"); // Change '/dashboard' to the route you want to redirect to
      else
      {
        navigate("/Fan/FanDashBoard");
        localStorage.setItem('user', userData.username); // Store username in localStorage
 
      }


      }
      
    else if (statusCode === 201)
    {
         console.log("inside coreect if");
         setLoginSuccess(false);
         setUsername("");
         setPassword("");
    
      msg = "The admin did not approved yet";
     console.log("form sybmitted"+formSubmitted);
     console.log("login sucess"+loginSuccess);
     window.alert(msg);
     
    }
  }


  return (
    <div>
      <Navbar></Navbar>
      <div className="container">
      <h1 style={{ color: "white" }}>Login</h1>
        <form className="form" onSubmit={handleSubmit} action>
          <input
            type="text"
            placeholder="Username"
            className="inp_class"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="inp_class"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="btn_class">
            Login
          </button>
          <p align="center" margin="0 0 0 0" padding="0" className="loginMsg">
            Create an account? <a href="./SignUp">Sign Up</a>
          </p>
        </form>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Login;
