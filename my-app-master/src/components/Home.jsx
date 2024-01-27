import { React,useState,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Logo.css";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import Match from "./Match";
import Navbar from "./Navbar";

const Home = (probs) => {
 // localStorage.removeItem('user');
  const isBoolean = probs.isBoolean;
  const [matches, setMatches] = useState([]);
  let matchesData;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/v1/matches");
        if (!response.ok) {
          console.error("Failed to fetch matches:", response.statusText);
          return;
        }
         matchesData = await response.json();
        console.log("inside home:");
        console.log(matchesData);
        setMatches(matchesData);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
console.log("inside home:");
    console.log(matchesData[0].match_venue)
    console.log(matchesData[0].seats.reservations)
      console.log(matchesData[0].vip_ticket_price)
    };
  
    fetchData();
  }, []);
  
  return (
    <div>
      {isBoolean&&<Navbar></Navbar>}
     
      <div className="container">
        <h1>Egyptian Premier League Matches</h1>
        {matches.length > 0 ? (
          matches.map((match) => (
            <Match
              key={match.id}
              homeTeam={match.home_team}
              homeTeamLogo={match.home_team_logo_path}
              awayTeam={match.away_team}
              awayTeamLogo={match.away_team_logo_path}
              dateAndTime={match.date_and_time}
              isManager={false}
              stadium={match.match_venue}
              reservedSeats={match.seats.reservations}
              price={match.vip_ticket_price}
            />
          ))
        ) : (
          <p>No matches available</p>
        )}
      
      </div>
      <Footer />
    </div>
  );
};

export default Home;

