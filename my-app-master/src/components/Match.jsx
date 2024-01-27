import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { Container } from "@mui/material";
import { format } from "date-fns";
import EditMatch from "./Manager/EditMatch";
import { Table, Button } from "react-bootstrap";

function Match({
  isManager,
  homeTeam,
  awayTeam,
  dateAndTime,
  isCancelReservation,
  stadium,
  reservedSeats,
  price
}) {
  // console.log("inside match");
  // console.log(dateAndTime);
  // console.log(homeTeam);
  // console.log(awayTeam);
  // console.log(isManager);
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [homeTeamLogo, setHomeTeamLogo] = useState("");
  const [awayTeamLogo, setAwayTeamLogo] = useState("");

  useEffect(() => {
    const fetchTeamLogo = async () => {
      try {
        const homeTeamResponse = await fetch(`http://localhost:8080/v1/teams/${homeTeam}`);
        const awayTeamResponse = await fetch(`http://localhost:8080/v1/teams/${awayTeam}`);

        if (!homeTeamResponse.ok || !awayTeamResponse.ok) {
          console.error("Failed to fetch team logos");
          return;
        }

        const homeTeamData = await homeTeamResponse.json();
        const awayTeamData = await awayTeamResponse.json();
        console.log("hi away team path");
        console.log(awayTeamLogo);
        console.log("hi home team path");
        console.log(homeTeamLogo);

        setHomeTeamLogo(homeTeamData.team_logo_path);
        setAwayTeamLogo(awayTeamData.team_logo_path);
      } catch (error) {
        console.error("Error fetching team logos:", error);
      }
    };

    fetchTeamLogo();
  }, [homeTeam, awayTeam]);

  const gotoView = () => {
    console.log("stadium",stadium);
    navigate("/view", {
      state: {
        homeTeam,
        homeTeamLogo,
        awayTeam,
        awayTeamLogo,
        dateAndTime,
        isManager,
        stadium,
        reservedSeats,
        price
      },
    });
  };

  const handleEdit = () => {
    navigate("/Manager/EditMatch", { state: { homeTeam, dateAndTime } });
  };

  async function CancelReservation() {
    const currentDate = new Date();

    // Increase the current date by 3 days
    const increasedDate = new Date(currentDate);
    increasedDate.setDate(increasedDate.getDate() + 3);
    if (dateAndTime <= increasedDate)
      window.alert("Reservation cannot be canceled before 3 days of the event ");
    else {
      let response;
      let username = localStorage.getItem("user");
      console.log("inside cancel reservation");
      // console.log(username);
      // console.log(homeTeam);
      // console.log(dateAndTime);
      response = await fetch(`http://localhost:8080/v1/reservations/${username}/${homeTeam}/${dateAndTime}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log(response);


    }
    navigate("/Fan/ViewReservations");
    window.location.reload();
  }

  return (
    <div style={{ marginBottom: "16px" }}>
      <Container maxWidth="md" className="container-design">

        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              <div className="row">
                <div className="col">
                  <img className="Logo rounded" src={homeTeamLogo} alt="team A" />
                  <p>{homeTeam}</p>

                </div>
                <div className="col">
                  {isCancelReservation && !isManager && <pre>             VS</pre>}
                  {!isCancelReservation && <p>Vs</p>}


                  <p className="card-text mt-2 mb-2">
                    {/* {format(new Date(dateAndTime), "MMMM d, yyyy h:mm a")} */}
                    <p>{dateAndTime}</p>
                    {/* {isCancelReservation&&!isManager&&<p></p>}  */}
                  </p>
                </div>
                <div className="col">
                  <img className="Logo rounded float-end" src={awayTeamLogo} alt="team B" />
                  <p>{awayTeam}</p>
                </div>
              </div>
            </h5>
            {!isCancelReservation && <button className="btn btn-primary" onClick={gotoView}>
              View
            </button>}
            {isManager && (
              <button className="btn btn-primary ms-2" onClick={handleEdit}>
                Edit
              </button>
            )}


            {isCancelReservation && !isManager &&
              <div className="d-flex justify-content-center">
                <Button variant="danger" onClick={CancelReservation}>
                  Cancel
                </Button>
              </div>


            }
          </div>
        </div>



      </Container>
    </div>
  );
}

export default Match;
