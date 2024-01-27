import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignUpNavbar from "./SignUpNavbar";
import Footer from "./Footer";
//cities should  not be hardcoded
function SignUp(props) {
  let usersData = [];
  let response;
  let check;
  // Styles
  let font = { fontFamily: "Montserrat", color: "white" };

  // State variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [validationError, setValidationError] = useState("");
  const navigate = useNavigate();
  const [role, setRole] = useState("fan");

  const egyptianCities = [
    "Cairo",
    "Alexandria",
    "Giza",
    "Shubra El Kheima",
    "Port Said",
    "Suez",
    "Luxor",
    "Asyut",
    "Ismailia",
    "Fayoum",
    "Zagazig",
    "Aswan",
    "Damietta",
    "Mansoura",
    "Tanta",
    "Beni Suef",
    "Hurghada",
    "Qena",
    "Sohag",
    "Minya",
    "Banha",
    "Damanhur",
    "El Mahalla El Kubra",
    "Kafr El Sheikh",
    "Marsa Matruh",
    "El Arish",
    "other"
  ];
  function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
  function isValidPassword(password) {
    // Password should be at least 8 characters long
    // and include at least one uppercase letter, one lowercase letter, and one digit
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  }
  function isValidUsername(username) {
    // Length restrictions (between 3 and 20 characters)
    const isValidLength = username.length >= 3 && username.length <= 20;

    // Character set (letters, numbers, underscores)
    const isValidCharacterSet = /^[a-zA-Z0-9_]+$/.test(username);

    // No spaces
    const hasNoSpaces = !/\s/.test(username);

    // Combine all conditions
    return isValidLength && isValidCharacterSet && hasNoSpaces;
  }
  async function checkuserexists() {

    const response = await fetch(`http://localhost:8080/v1/users/${username}`);
    if (!response.ok) {
      console.error("Failed to fetch data:", response.statusText);
      return;
    }

    const data = await response.json();
    if (data.length !== 0) {
      setFormValid(false);
      window.alert("user already exists, try another username");
      return;
    }

  }


  const fetchData = async () => {
    await checkuserexists();
    try {
      response = await fetch("http://localhost:8080/v1/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          first_name: firstName,
          last_name: lastName,
          birth_date: birthDate,
          gender: gender === 'Female',
          city: city,
          address: address,
          email_address: email,
          fan: role === 'fan', // Convert role to boolean ('fan' => true, 'Manager' => false)
        }),
      });
      console.log(response);
      if (response.status !== 404 && response.status !== 400) {
        usersData = await response.json();
        console.log("Data received after signup:", usersData);

      }
      check = response.status;
    } catch (error) {
      console.error("Error during signup:", error);
      // Handle errors here, e.g., setFormValid(false) and display an error message
    }
  };

  // Validation function
  async function validateSignup(event) {

    event.preventDefault();
    setFormSubmitted(true);

    // Check if any required field is empty
    if (
      username.trim() === "" ||
      password.trim() === "" ||
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      birthDate === "" ||
      email === ""
    ) {
      setFormValid(false);
      setValidationError("Please fill in all required fields.");
      return;
    }

    else if (password.length < 8) {
      setFormValid(false);
      setValidationError("Password should be at least 8 characters long.");
      return;
    }
    else if (!isValidUsername(username)) {
      setFormValid(false);
      setValidationError("Please enter a valid username. It should be between 3 and 20 characters, contain only letters, numbers, and underscores, and should not have spaces.");
      return;
    }
    else if (!isValidEmail(email)) {
      setFormValid(false);
      setValidationError("Please enter a valid email address.");
      return;
    }

    else if (!isValidPassword(password)) {
      setFormValid(false);
      setValidationError(
        "Password should be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit."
      );
      return;
    }
  
    else {

      const wait = await fetchData();
      window.alert("Sucessfull sign up , pending admin approval");
      navigate('/');

      console.log(usersData);
      console.log(response);
    

    }

  }

  const handleFanChange = () => {
    setRole("fan");
  };
  
  const handleManagerChange = () => {
    setRole("Manager");
  };
  // if (formValid) {
  //   navigate('/login');
  // }
  if (formValid) {

    navigate('/login');

  }

  return (
    <div>
    <SignUpNavbar/>
      <div className="container">
        <h1 style={font}>Sign Up</h1>
        <form className="form" onSubmit={validateSignup}>
          <input
            type="text"
            placeholder="Username"
            className="inp_class"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          // required
          />
          <input
            type="password"
            placeholder="Password"
            className="inp_class"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          // required
          />
          <input
            type="text"
            placeholder="First Name"
            className="inp_class"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          //required
          />
          <input
            type="text"
            placeholder="Last Name"
            className="inp_class"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          //required
          />
          <input
            type="date"
            placeholder="Birth Date"
            className="inp_class"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          //required
          />
          <label className="label-signUp" htmlFor="city">
            City:
          </label>
          <select
            name="city"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            {egyptianCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {/* <input type="text" placeholder="City" className="inp_class" /> */}
          <input
            type="text"
            placeholder="Address"
            className="inp_class"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email Address"
            className="inp_class"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          //  required
          />
          <div class="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="inlineRadio1"
              value="Male"
              checked={gender === "Male"}
              onChange={(e) => setGender(e.target.value)}
            />
            <label class="form-check-label" for="inlineRadio1">
              Male
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="inlineRadio2"
              value="Female"
              checked={gender === "Female"}
              onChange={(e) => setGender(e.target.value)}
            />
            <label class="form-check-label" for="inlineRadio2">
              Female
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              id="fanRadio"
              value="Fan"
              checked={role === "fan"}
              // onChange={(e) => setRole(e.target.value)}
              onChange={handleFanChange}
            />
            <label className="form-check-label" htmlFor="fanRadio">
              Fan
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              id="managerRadio"
              value="Manager"
              checked={role === "Manager"}
              // onChange={(e) => setRole(e.target.value)}
              onChange={handleManagerChange}
            />
            <label className="form-check-label" htmlFor="managerRadio">
              Manager
            </label>
          </div>

          <br />
          <button type="submit" className="btn_class">
            Sign Up
          </button>
          <br /> <br />
          <p align="center" margin="0 0 0 0" padding="0" className="loginMsg">
            Already have an account? <a href="./Login">Log in</a>
          </p>
        </form>
        {formSubmitted && !formValid && (

          <p className="loginMsg">{validationError}</p>
        )}
      </div>
      <Footer/>
    </div>
  );
}


export default SignUp;
