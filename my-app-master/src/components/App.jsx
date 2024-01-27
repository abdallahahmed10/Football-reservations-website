import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";
import ViewPendingUsers from "./Administrator/ViewPendingUsers";
import View from "./ViewMatch/viewMatch";
import ManagerDashboard from "./Manager/ManagerDashBoard";
import AddNewMatch from "./Manager/AddNewMatch";
import EditMatch from "./Manager/EditMatch";
import ShowAllUsers from "./Administrator/ShowAllUsers";
import EditProfile from "./Fan/EditProfile";
import FanDashBoard from "./Fan/FanDashBoard";
import AddStadium from "./Manager/AddStadium";
import ViewAllReservations from "./Fan/ViewAllReservations";
import SeatGrid from "./ViewMatch/SeatGrid";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home isBoolean={true} />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/Fan/EditProfile" element={<EditProfile />} />
          <Route exact path="/view" element={<View />} />
          <Route exact path="/Manager/ManagerDashboard" element={<ManagerDashboard />} />
          <Route exact path="/Manager/AddNewMatch" element={<AddNewMatch />} />
          <Route exact path="/Manager/AddStadium" element={<AddStadium />} />
          <Route exact path="/Manager/EditMatch" element={<EditMatch />} />
          <Route exact path="/Administrator/ViewPendingUsers" element={<ViewPendingUsers />} />
          <Route exact path="/Administrator/ShowAllUsers" element={<ShowAllUsers />} />
          <Route exact path="/Fan/FanDashBoard" element={<FanDashBoard  />} />
          <Route exact path="/Fan/ViewReservations" element={<  ViewAllReservations/>} />
          <Route exact path="/reserve" element={<  SeatGrid/>} />
         
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;
