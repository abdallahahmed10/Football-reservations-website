import React, { useState } from "react";
import { useNavigate } from "react-router";
import Footer from "../Footer";
import ManagerNavBar from "./ManagerNavBar";

function AddStadium() {
  const [stadiumName, setStadiumName] = useState("");
  const [rowNo, setRowNo] = useState("");
  const [seatsPerRow, setSeatsPerRow] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Validation checks
    if (rowNo < 1 || rowNo > 10 || seatsPerRow < 1 || seatsPerRow > 10) {
      setError("Row Number and Seats Per Row must be numeric values between 1 and 10.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/v1/stadiums", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stadium_name: stadiumName,
          row_no: rowNo,
          seats_per_row: seatsPerRow,
        }),
      });

      if (!response.ok) {
        console.error("Failed to create stadium:", response.statusText);
        setError("Failed to create stadium. Please try again.");
        return;
      }

      const newStadium = await response.json();
      setSuccessMsg("Stadium added successfully!");
      setError("");
      // Clear form fields
      setStadiumName("");
      setRowNo("");
      setSeatsPerRow("");
      // Set a timeout to remove the success message after a few seconds
      setTimeout(() => setSuccessMsg(""), 5000);
    } catch (error) {
      console.error("Error creating stadium:", error);
      setError("Failed to create stadium. Please try again.");
      // Clear the success message if there was one
      setSuccessMsg("");
    }
    window.alert("Stadium Added sucessfully!");
    navigate("/Manager/ManagerDashBoard");
  };

  return (
    <div>
      <ManagerNavBar />
      <div className="container">
      <h1 style={{ color: "white" }}>Add Stadium</h1>
        <form className="form" onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Stadium Name"
            className="inp_class"
            value={stadiumName}
            onChange={(e) => setStadiumName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Row Number (1-10)"
            className="inp_class"
            value={rowNo}
            onChange={(e) => setRowNo(e.target.value)}
            min="1"
            max="10"
            required
          />
          <input
            type="number"
            placeholder="Seats Per Row (1-10)"
            className="inp_class"
            value={seatsPerRow}
            onChange={(e) => setSeatsPerRow(e.target.value)}
            min="1"
            max="10"
            required
          />
          <button type="submit" className="btn_class">
            Create Stadium
          </button>
        </form>
        {successMsg && (
          <p className="successMsg" style={{ color: "green" }}>
            {successMsg}
          </p>
        )}
        {error && <p className="errorMsg" style={{ color: "red" }}>{error}</p>}
      </div>
      <Footer />
    </div>
  );
}

export default AddStadium;
