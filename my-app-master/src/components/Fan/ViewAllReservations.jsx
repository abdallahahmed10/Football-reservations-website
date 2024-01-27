import React, { useState, useEffect } from "react";
import FanNavBar from "./FanNavBar";
import { useNavigate, } from "react-router-dom";
import Match from "../Match"; // Import the Match component or use your own component

function ViewAllReservations() {
    const [reservations, setReservations] = useState([]);
    const [matchDataList, setMatchDataList] = useState([]);
    const navigate = useNavigate();
    const username = localStorage.getItem("user");
   let flag_For_No_Reservations=false;

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                console.log(username);
                const response = await fetch(`http://localhost:8080/v1/reservations/${username}`);
                if (!response.ok) {
                     throw new Error('Network response was not ok.');
                   
                }

                const data = await response.json();
                setReservations(data);
                if(data.length==0)
                {
                    window.alert("no current reservations");
                    flag_For_No_Reservations=true;
                 //   navigate("../Fan/FanDashBoard");
                    return;
                }

                if (data && data.length > 0) {
                    const matchPromises = data.map(async (reservation) => {
                        const matchResponse = await fetch(`http://localhost:8080/v1/matches/${reservation.match_home_team}/${reservation.match_date_and_time}`);
                        if (matchResponse.ok) {
                            return matchResponse.json();
                        } else {
                            throw new Error('Match data request failed.');
                        }
                    });

                    const matchDataResults = await Promise.all(matchPromises);
                    setMatchDataList(matchDataResults);
                } else {
                    setMatchDataList([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle error, show error message, etc.
            }
            
        };

        fetchReservations();
    }, [username]); // Only rerun the effect if apiUrl changes

    // Log matchDataList whenever it changes
    useEffect(() => {
        console.log("matchDataList updated:", matchDataList);
    }, [matchDataList]);

    return (
        <div>
            <FanNavBar />
            {flag_For_No_Reservations&&<p>No reservations to Show</p>}
            {matchDataList.map((matchData, index) => (
                <Match
                    key={index}
                    homeTeam={matchData.home_team}
                    awayTeam={matchData.away_team}
                    dateAndTime={matchData.date_and_time}
                    isManager={false}
                    isCancelReservation={true}
                    

                />
            ))}
        </div>
    );
}

export default ViewAllReservations;
