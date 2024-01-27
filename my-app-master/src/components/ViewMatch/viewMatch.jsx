import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button } from "react-bootstrap";
import "./viewMatch.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from '@mui/material/Container';

const View = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const team = location.state;
  console.log("line 12 ",team);
  const [matchData, setMatchData] = useState(null);
  const [refereeName, setMainReferee] = useState(null);
  const [linesmen1Name, setLinesmen1Name] = useState(null);
  const [linesmen2Name, setLinesmen2Name] = useState(null);
  console.log("hi");
  console.log(team);
  const teamStadium = team.stadium; // renamed this 
  console.log("team:");
  console.log(team);
  const reservedSeats = team.reservedSeats;
  const price = team.price;
  const homeTeam = team.homeTeam;
  const dateAndTime = team.dateAndTime;
  const isLoggedIn = localStorage.getItem("user");

  const [stadium, setStadium] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/v1/matches/${team.homeTeam}/${team.dateAndTime}`);

        if (!response.ok) {
          console.error("Failed to fetch matches:", response.statusText);
          return;
        }
        const data = await response.json();
        setMatchData(data);
        console.log("fetching data :");
        console.log(response);
        console.log(data);

        if (data && data.main_referee) {
          const responseMainReferee = await fetch(`http://localhost:8080/v1/persons/${data.main_referee}`);
          const dataMainReferee = await responseMainReferee.json();
          const refereeName = `${dataMainReferee.first_name} ${dataMainReferee.middle_name} ${dataMainReferee.last_name}`;
          setMainReferee(refereeName);
        }

        if (data && data.linesmen_1) {
          const responseLinesmen1 = await fetch(`http://localhost:8080/v1/persons/${data.linesmen_1}`);
          const dataLinesmen1 = await responseLinesmen1.json();
          const linesmen1Name = `${dataLinesmen1.first_name} ${dataLinesmen1.middle_name} ${dataLinesmen1.last_name}`;
          setLinesmen1Name(linesmen1Name);
        }

        if (data && data.linesmen_2) {
          const responseLinesmen2 = await fetch(`http://localhost:8080/v1/persons/${data.linesmen_2}`);
          const dataLinesmen2 = await responseLinesmen2.json();
          const linesmen2Name = `${dataLinesmen2.first_name} ${dataLinesmen2.middle_name} ${dataLinesmen2.last_name}`;
          setLinesmen2Name(linesmen2Name);
        }

        //  const h=await fetch(`http://localhost:8080/v1/stadiums/${teamStadium}`) // use teamStadium here
        //     .then(response => response.json())
        //     .then(data => setStadium(data))
        //     .catch(error => console.error('Error:', error));
        console.log(teamStadium);
        const responseStadium = await fetch(`http://localhost:8080/v1/stadiums/${teamStadium}`);
        console.log(teamStadium);
        if (!responseStadium.ok) {
          console.error("Failed to fetch stadium:", responseStadium.statusText);
          return;
        }

        const stadiumData = await responseStadium.json();
        console.log("Stadium data:", stadiumData);
        setStadium(stadiumData);




      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchData();
  }, [team.homeTeam, team.dateAndTime]);
  //|| 
  if (!team || !matchData || !stadium) {
    return (
      <div className="container text-center">
        <h2>No match data available. Please select a match from the Home page.</h2>
        <Link to="/" className="btn btn-primary">Go Back</Link>
      </div>
    );
  }

  function handleReserve() {
    if (!isLoggedIn&&!team.isManager) {
      window.alert('Please login first to reserve a seat :)');
      navigate('/login'); // replace '/login' with your actual login route
    } else {
      navigate('/reserve', {
        state: {
          stadium: stadium,
          reservedSeats: reservedSeats,
          price: price,
          homeTeam: homeTeam,
          dateAndTime: dateAndTime,
          isManager:team.isManager
        }
      });
    }
  }

  return (
    <div>
      <Container style={{ maxWidth: '900px' }} className="container-design">
        <div className="card">
          <img
            src="https://th.bing.com/th/id/OIP.bXcD5ay41IMRZ338_vl_kwHaEU?w=305&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body match-info">
            <div className="team home-team">
              {team && (
                <>
                  <img src={team.homeTeamLogo} alt={`${team.homeTeam} Logo`} className="team-logo" />
                  <span className="team-name">{team.homeTeam}</span>
                </>
              )}
            </div>
            {matchData && (
              <>
                <div className="match-details">
                  VS
                  <div className="match-time">{matchData.date_and_time}</div>
                </div>
                <div className="team away-team">
                  {team && (
                    <>
                      <img src={team.awayTeamLogo} alt={`${team.awayTeam} Logo`} className="team-logo" />
                      <span className="team-name">{team.awayTeam}</span>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
      <Container style={{ maxWidth: '900px' }} className="container-design">
        <div className="card">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th><b>line man 1</b></th>
                <th><b>line man 2</b></th>
                <th><b>main referee</b></th>
                <th><b>match venue</b></th>
                <th><b>Actions</b></th>

              </tr>
            </thead>
            <tbody>
              <tr key={0}>
                <td>{linesmen1Name || ""}</td>
                <td>{linesmen2Name || ""}</td>
                <td>{refereeName || ""}</td>
                <td>{matchData.match_venue}</td>

                {!team.isManager && <td>
                  <Button variant="danger" onClick={handleReserve}>
                    Reserve
                  </Button>
                </td>}

                {team.isManager && <td>
                  <Button variant="danger" onClick={handleReserve}>
                    view Seats
                  </Button>
                </td>}


              </tr>
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
};

export default View;
