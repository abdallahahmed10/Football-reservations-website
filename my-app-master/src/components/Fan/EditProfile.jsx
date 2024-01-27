import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import FanNavBar from "./FanNavBar"
import AdminNavBar from "../Administrator/AdminNavBar";
function EditProfile()
{
  const [userData, setUserData] = useState({
    username: "", // Cannot be changed
    password:"",//can be changed
    firstName: "", // Can be changed
    lastName: "", // Can be changed
    gender: "", // Cannot be changed
    city: "", // Can be changed
    address:"",
    birth_date:"",
    email_address:""
  });
  // Fetch user data on component mount (useEffect)
  useEffect(() => {
    async function fetchUserData() {
      try {
        const username = localStorage.getItem("user");
        const response = await fetch(`http://localhost:8080/v1/users/${username}`);
        if (response.ok) {
          const data = await response.json();
          console.log("fetched user data :"+data);
          // Set user data in state
          setUserData({
            username: data.username,
            firstName: data.first_name,
            lastName: data.last_name,
            gender: data.gender,
            city: data.city,
            address:data.address,
            password:data.password,
            birth_date:data.birth_date,
            email_address:data.email_address,
            fan:data.fan,
            approval:data.approval
           
          });
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

   //getting the userdata to be the default values of the form 

    fetchUserData();
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    // Here you can use the userData state to update the profile details on the server-side
    // For example:
    try {
      const response = await fetch(`http://localhost:8080/v1/users`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username:userData.username,
          password: userData.password,
          first_name: userData.firstName,
          last_name: userData.lastName,
          city: userData.city,
          address: userData.address,
          birth_date: userData.birth_date,
          gender:userData.gender,
          fan:userData.fan,
          approval:userData.approval
        })
      });
      if (response.ok) {
        console.log("User profile updated successfully");
      } else {
        console.error("Failed to update user profile");
      }
      console.log("update response");
      console.log(response);
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
    console.log("fetched user data :"+userData);
  
  };

  return (
    <div>
      <FanNavBar />
      <div className="container">
        <h1 style={{ fontFamily: "Montserrat", color: "white" }}>Edit Profile</h1>
        <form className="form" onSubmit={updateProfile}>
          <input
            type="text"
            placeholder={userData.username}
            className="inp_class"
            name="username"
            disabled
          />
          <input
            type="password"
            placeholder={userData.password}
            className="inp_class"
            name="password"
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder={userData.firstName}
            className="inp_class"
            name="firstName"
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder={userData.lastName}
            className="inp_class"
            name="lastName"
            onChange={handleInputChange}
          />
          {/* Other input fields with similar onChange handlers */}
          <button type="submit" className="btn_class">
            Edit profile
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default EditProfile;