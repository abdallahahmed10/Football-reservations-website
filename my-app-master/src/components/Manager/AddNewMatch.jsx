import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Footer from "../Footer";
import ManagerNavBar from "./ManagerNavBar";

function AddNewMatch() {
  const [error, setError] = useState(null);
  const [homeTeamLogo, setHomeTeamLogo] = useState(null);
  const [awayTeamLogo, setAwayTeamLogo] = useState(null);
  const [AllTeams, setAllTeams] = useState([]);
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [availableAwayTeams, setAvailableAwayTeams] = useState([]);
  const [mainReferee, setMainReferee] = useState("");
  const [linesmen1, setLinesmen1] = useState("");
  const [linesmen2, setLinesmen2] = useState("");
  const [vipTicketPrice, setVipTicketPrice] = useState(0);
  const [referees, setReferees] = useState([]);
  const [linesmen, setLinesmen] = useState([]);
  const [stadiums, setStadiums] = useState([]);
  const [selectedStadium, setSelectedStadium] = useState("");

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const allTeamsResponse = await fetch("http://localhost:8080/v1/teams");
        const refereesResponse = await fetch(
          "http://localhost:8080/v1/persons/referees"
        );
        const linesmenResponse = await fetch(
          "http://localhost:8080/v1/persons/linesmen"
        );

        const stadiumsResponse = await fetch(
          "http://localhost:8080/v1/stadiums"
        );

        const allTeamsData = await allTeamsResponse.json();
        const refereesData = await refereesResponse.json();
        const linesmenData = await linesmenResponse.json();
        const stadiumsData = await stadiumsResponse.json();
        console.log("all teams data :");
        console.log(allTeamsData);

        setAllTeams(allTeamsData);
        setReferees(refereesData);
        setLinesmen(linesmenData);
        setStadiums(stadiumsData);

        console.log("stadiums are");
        console.log(stadiumsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllData();
  }, []);

  let matchData;
  let response;
  const fetchData = async () => {
    try {
      // Extracting referee names
      const mainRefereeName = mainReferee.split(" ");
      const linesmen1Name = linesmen1.split(" ");
      const linesmen2Name = linesmen2.split(" ");
      console.log(mainRefereeName, linesmen1Name, linesmen2Name);
      response = await fetch("http://localhost:8080/v1/matches", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          home_team: homeTeam,
          away_team: awayTeam,
          match_venue: document.getElementsByName("matchVenue")[0].value,
          date_and_time: `${document.getElementsByName("date")[0].value}T${
            document.getElementsByName("time")[0].value
          }:00.000Z`,
          vip_ticket_price: vipTicketPrice,
          main_referee_first_name: mainRefereeName[0],
          main_referee_middle_name: mainRefereeName[1],
          main_referee_last_name: mainRefereeName[2],
          linesmen_1_first_name: linesmen1Name[0],
          linesmen_1_middle_name: linesmen1Name[1],
          linesmen_1_last_name: linesmen1Name[2],
          linesmen_2_first_name: linesmen2Name[0],
          linesmen_2_middle_name: linesmen2Name[1],
          linesmen_2_last_name: linesmen2Name[2],
        }),
      });
      const obj = {
        home_team: homeTeam,
        away_team: awayTeam,
        match_venue: document.getElementsByName("matchVenue")[0].value,
        date_and_time: `${document.getElementsByName("date")[0].value}T${
          document.getElementsByName("time")[0].value
        }:00.000Z`,
        vip_ticket_price: vipTicketPrice,
        main_referee_first_name: mainRefereeName[0],
        main_referee_middle_name: mainRefereeName[1],
        main_referee_last_name: mainRefereeName[2],
        linesmen_1_first_name: linesmen1Name[0],
        linesmen_1_middle_name: linesmen1Name[1],
        linesmen_1_last_name: linesmen1Name[2],
        linesmen_2_first_name: linesmen2Name[0],
        linesmen_2_middle_name: linesmen2Name[1],
        linesmen_2_last_name: linesmen2Name[2],
      };
      console.log("obj:");
      console.log(obj);
      // console.log("match data:");
      // console.log(matchData);
      console.log("response:");
      console.log(response);

      if (!response.ok) {
        console.error("Failed to authenticate:", response.statusText);
        return;
      }
      //202: referee has match on same day
      //203: linesmen1 has match on same day
      //204: linesmen2 has match on same day
      //205: home_team has match on same day
      //206: away_team has match on same day
      //207: stadium used within 3 +/- hours
      console.log(response);
      console.log("response is " ,response);
      if (response.status === 202) {
        window.alert("Fail: referee has match on same day ");
        return;
      } else if (response.status === 203) {
        window.alert(" linesmen1 has match on same day ");
        return;
      } else if (response.status === 204) {
        window.alert(" linesmen2 has match on same day ");
        return;
      } else if (response.status == 205) {
        window.alert("home_team has match on same day ");
        return;
      } else if (response.status == 206) {
        window.alert(" away team has match on same day ");
        return;
      } else if (response.status == 207) {
        window.alert("//207: stadium used within 3 +/- hours");
        return;
      }

      matchData = await response.json();
   
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    window.alert("Added Sucessfully");
    navigate("../Manager/ManagerDashboard");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validate date and time
    const selectedDate = document.getElementsByName("date")[0].value;
    const selectedTime = document.getElementsByName("time")[0].value;
    const selectedDateTime = new Date(
      `${selectedDate}T${selectedTime}:00.000Z`
    );
    const currentDateTime = new Date();

    const parsedVipTicketPrice = parseFloat(vipTicketPrice);
    if (isNaN(parsedVipTicketPrice) || parsedVipTicketPrice <= 0) {
      window.alert("Please enter a valid VIP ticket price.");
      return;
    }

    if (
      linesmen1 === linesmen2 ||
      linesmen1 === mainReferee ||
      linesmen2 === mainReferee
    ) {
      window.alert("Main Referee and Linesmen cannot have the same value.");
      return;
    }

    if (selectedDateTime <= currentDateTime) {
      window.alert(
        "Please select a date and time greater than the current date and time."
      );
      return;
    }
    await fetchData();

    console.log(matchData);
    if (
      homeTeam === "" ||
      awayTeam === "" ||
      mainReferee === "" ||
      linesmen1 === ""
    ) {
      setError("Please fill in all required fields");
      return;
    }
    if (homeTeam === awayTeam) {
      setError("Home and Away teams cannot be the same");
      return;
    }
  };

  const handleHomeTeamChange = (event) => {
    const selectedHomeTeam = event.target.value;
    setHomeTeam(selectedHomeTeam);

    const filteredTeams = AllTeams.filter(
      (team) => team.team_name !== selectedHomeTeam
    );
    setAvailableAwayTeams(filteredTeams);
    setAwayTeam("");
    setAwayTeamLogo(null);

    setHomeTeamLogo(
      AllTeams.find(
        (allTeamsData) => allTeamsData.team_name === selectedHomeTeam
      )?.team_logo_path || null
    );
    if (homeTeamLogo == awayTeamLogo) setAwayTeamLogo(null);
  };

  const handleAwayTeamChange = (event) => {
    const selectedAwayTeam = event.target.value;
    if (selectedAwayTeam === "Select Away Team") setAwayTeamLogo(null);
    else {
      setAwayTeam(selectedAwayTeam);
      setAwayTeamLogo(
        AllTeams.find(
          (allTeamsData) => allTeamsData.team_name === selectedAwayTeam
        )?.team_logo_path || null
      );
    }
  };

  const handleRefereeChange = (event) => {
    setMainReferee(event.target.value);
  };

  const handleLinesmen1Change = (event) => {
    setLinesmen1(event.target.value);
  };

  const handleLinesmen2Change = (event) => {
    setLinesmen2(event.target.value);
  };

  const navigate = useNavigate();
  let font = {
    fontFamily: "Montserrat",
    color: "white",
    fontWeight: "bold",
  };

  return (
    <div>
      <ManagerNavBar />
      <div className="container">
        <h1 style={font}>New Match</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="team-select-container-2">
            <div className="team-select-2">
              <div className="select-logo-container-2">
                {homeTeamLogo && (
                  <img
                    src={homeTeamLogo}
                    alt="Home Team Logo"
                    className="team-logo-2"
                  />
                )}
                <select
                  className="select-input-2"
                  value={homeTeam}
                  onChange={handleHomeTeamChange}
                  required
                >
                  <option className="select-input-2" value="">
                    Select Home Team
                  </option>
                  {AllTeams.map((team) => (
                    <option key={team.id} value={team.team_name}>
                      {team.team_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="team-select-2">
              <div className="select-logo-container-2">
                {awayTeamLogo && (
                  <img
                    src={awayTeamLogo}
                    alt="Away Team Logo"
                    className="team-logo-2"
                  />
                )}
                <select
                  className="select-input-2"
                  value={awayTeam}
                  onChange={handleAwayTeamChange}
                  required
                >
                  <option value="" style={font}>
                    Select Away Team
                  </option>
                  {availableAwayTeams.map((team) => (
                    <option key={team.id} value={team.team_name}>
                      {team.team_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <select
            className="select-input-2"
            value={selectedStadium}
            onChange={(e) => setSelectedStadium(e.target.value)}
            required
            name="matchVenue"
          >
            <option value="" style={font}>
              Select Match Venue
            </option>
            {stadiums.map((stadium) => (
              <option key={stadium.stadium_name} value={stadium.stadium_name}>
                {stadium.stadium_name}
              </option>
            ))}
          </select>

          <select
            className="select-input-2"
            value={mainReferee}
            onChange={handleRefereeChange}
            required
          >
            <option value="" style={font}>
              Select Main Referee
            </option>
            {referees.map((referee) => (
              <option
                key={referee.id}
                value={`${referee.first_name} ${referee.middle_name} ${referee.last_name}`}
              >
                {`${referee.first_name} ${referee.middle_name} ${referee.last_name}`}
              </option>
            ))}
          </select>
          <select
            className="select-input-2"
            value={linesmen1}
            onChange={handleLinesmen1Change}
            required
          >
            <option value="" style={font}>
              Select Linesmen 1
            </option>
            {linesmen.map((linesman) => (
              <option
                key={linesman.id}
                value={`${linesman.first_name} ${linesman.middle_name} ${linesman.last_name}`}
              >
                {`${linesman.first_name} ${linesman.middle_name} ${linesman.last_name}`}
              </option>
            ))}
          </select>
          <select
            className="select-input-2"
            value={linesmen2}
            onChange={handleLinesmen2Change}
            required
          >
            <option value="" style={font}>
              Select Linesmen 2
            </option>
            {linesmen.map((linesman) => (
              <option
                key={linesman.id}
                value={`${linesman.first_name} ${linesman.middle_name} ${linesman.last_name}`}
              >
                {`${linesman.first_name} ${linesman.middle_name} ${linesman.last_name}`}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="VIP Ticket Price"
            className="inp_class"
            value={vipTicketPrice === 0 ? "" : vipTicketPrice}
            onChange={(e) => setVipTicketPrice(e.target.value)}
          />
          <input
            type="date"
            placeholder="Date"
            className="inp_class"
            required
            name="date"
          />
          <input
            type="time"
            placeholder="Time"
            className="inp_class"
            required
            name="time"
          />
          <button className="btn_class">Add</button>
        </form>
        <div>
          {error && (
            <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AddNewMatch;
