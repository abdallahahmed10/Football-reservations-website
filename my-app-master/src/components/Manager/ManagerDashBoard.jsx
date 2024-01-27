import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Footer from "../Footer";
import ManagerNavBar from "./ManagerNavBar";
import AddNewMatch from "./AddNewMatch";
import Match from "../Match";

function ManagerDashboard() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);

  const EnterMatchDetails = () => {
    navigate("/Manager/AddNewMatch");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/v1/matches");
        if (!response.ok) {
          console.error("Failed to fetch matches:", response.statusText);
          return;
        }
        const matchesData = await response.json();
        setMatches(matchesData);
        console.log(matchesData);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
     
    };

    fetchData();
  }, []);

  return (
    <div>
      <ManagerNavBar />
      <div className="container">
        <h1>Egyptian Premier League Match Reservation System</h1>
        {matches.length > 0 ? (
          matches.map((match) => (
            <Match
              key={match.id}
              homeTeam={match.home_team}
              homeTeamLogo={match.home_team_logo_path}
              awayTeam={match.away_team}
              awayTeamLogo={match.away_team_logo_path}
              dateAndTime={match.date_and_time}
              isManager={true}
              isCancelReservation={false}
              stadium={match.match_venue}
              reservedSeats={match.seats.reservations}
              price={match.vip_ticket_price}
            />
           
          ))
        ) : (
          <p>No matches available</p>
        )}
        <button className="btn_class" onClick={EnterMatchDetails}>
          Add Match
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ManagerDashboard;
