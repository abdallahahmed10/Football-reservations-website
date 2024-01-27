import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./viewMatch.css";
import { Link, useLocation } from "react-router-dom";
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../Navbar'


const View = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const team = location.state;
  const teamStadium = team.stadium; // renamed this variable
  const reservedSeats = team.reservedSeats; 
  const price = team.price;
  const homeTeam = team.homeTeam;
  const dateAndTime = team.dateAndTime;
  const isLoggedIn = localStorage.getItem("user"); 

  const [stadium, setStadium] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/v1/stadiums/${teamStadium}`) // use teamStadium here
      .then(response => response.json())
      .then(data => setStadium(data))
      .catch(error => console.error('Error:', error));
  }, []);

  if (!stadium) {
    return <div>Loading...</div>;
  }
  console.log(stadium);
  if (!team) {
    // You could redirect back or display a message
    return (
      <div className="container text-center">
        <h2>No match data available. Please select a match from the Home page.</h2>
        <Link to="/" className="btn btn-primary">Go Back</Link>
      </div>
    );
  }
  

  return (
    // <div className="container text-center container-design">
    <>
     <Navbar />
    <Container maxWidth="sm" className="container-design">
      <div className="card">
      <img
        src={"https://th.bing.com/th/id/OIP.bXcD5ay41IMRZ338_vl_kwHaEU?w=305&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"}
        class="card-img-top"
        alt="Stadium"
      />
        <div className="card-body match-info">
        <div className="team home-team">
        <img src={team.homeTeamLogo} alt={`${team.homeTeam} Logo`} className="team-logo" />
        <span className="team-name">{team.homeTeam}</span>
      </div>
      <div className="match-details">
        VS
        <div className="match-time">EST: 1:00PM</div>
      </div>
      <div className="team away-team">
        <img src={team.awayTeamLogo} alt={`${team.awayTeam} Logo`} className="team-logo" />
        <span className="team-name">{team.awayTeam}</span>
      </div>

          
        </div>
        <div>
        <p className="card-text ml-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, hic
            officia enim molestias laborum praesentium sequi blanditiis fugiat
            odio corporis excepturi. Animi, assumenda natus at ut laboriosam
            dolorem corporis possimus.
          </p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Refree</li>
          <li className="list-group-item">Location</li>
          <li className="list-group-item">12/12/2023</li>
        </ul>
        <div className="card-body">
          <div className="button-container">
          <button className="btn btn-primary card-link" onClick={() => {
            if (!isLoggedIn) {
              window.alert('Please login first to reserve a seat :)');
              navigate('/login'); // replace '/login' with your actual login route
            } else {
              navigate('/reserve', { 
                state: { 
                  stadium: stadium,
                  reservedSeats: reservedSeats,
                  price: price,
                  homeTeam: homeTeam,
                  dateAndTime: dateAndTime
                }
              });
            }
          }}>
            Reserve
          </button>
            <Link to="/" className="btn btn-primary card-link">
              Back
            </Link>
            </div>
        </div>
      </div>
      </Container>
    </>
  );
};

export default View;

