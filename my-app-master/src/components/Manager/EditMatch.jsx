import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ManagerNavBar from "./ManagerNavBar";
import Footer from "../Footer";

function EditMatch() {
  const location = useLocation();
  const home_team = location.state.homeTeam;
  const date_and_time = location.state.dateAndTime;


  console.log(home_team);
  console.log(date_and_time);
  const [oldMatchData, setOldMatchData] = useState(null);
  const [error, setError] = useState(null);
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [mainReferee, setMainReferee] = useState("");
  const [linesman1, setLinesman1] = useState("");
  const [linesman2, setLinesman2] = useState("");
  const [vipTicketPrice, setVipTicketPrice] = useState(0);
  const [venue, setVenue] = useState("");
  const [dateAndTime, setDateAndTime] = useState("");
  const [formData, setFormData] = useState({
    // home_team: "",
    away_team: "",
    match_venue: "",
    // date_and_time: "",
    vip_ticket_price: 0,
    main_referee: "",
    linesmen_1: "",
    linesmen_2: "",
  });

  const [allTeams, setAllTeams] = useState([]);
  const [referees, setReferees] = useState([]);
  const [linesmen, setLinesmen] = useState([]);
  const [venues, setStadiums] = useState([]);
  //let oldMatchData;

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

        const oldMatchDataResponse = await fetch(
          `http://localhost:8080/v1/matches/${home_team}/${date_and_time}`
        );

        const MatchVenues = await fetch(
          ` http://localhost:8080/v1/stadiums`
        );



        const allTeamsData = await allTeamsResponse.json();
        const refereesData = await refereesResponse.json();
        const linesmenData = await linesmenResponse.json();
        const AllStadiums = await MatchVenues.json();
        // console.log("habhooba:");
        // console.log(MatchVenues);
        // console.log(AllStadiums);
        //this console.log here
        console.log("logging response");
        console.log(oldMatchDataResponse);


        const fetchedOldMatchData = await oldMatchDataResponse.json();
        console.log("logging response body")
        console.log(fetchedOldMatchData);
        setOldMatchData(fetchedOldMatchData);
        console.log("old match data is begin");
        console.log(oldMatchData);         //mark X

        console.log("old match data is end");


        const backendDate = new Date(fetchedOldMatchData.date_and_time);
        const adjustedDate = new Date(
          backendDate.getTime() - backendDate.getTimezoneOffset() * 60000
        );
        const formattedDate = adjustedDate.toISOString().slice(0, 16);
        const backendDate_as_string = backendDate.toISOString();
        console.log("Im outing date");
        console.log(backendDate_as_string);

        // Fetch details for main referee
        const mainRefereeDetails = await fetch(`http://localhost:8080/v1/persons/${fetchedOldMatchData.main_referee}`);
        const mainRefereeData = await mainRefereeDetails.json();

        // Fetch details for linesman 1
        const linesman1Details = await fetch(`http://localhost:8080/v1/persons/${fetchedOldMatchData.linesmen_1}`);
        const linesman1Data = await linesman1Details.json();

        // Fetch details for linesman 2
        const linesman2Details = await fetch(`http://localhost:8080/v1/persons/${fetchedOldMatchData.linesmen_2}`);
        const linesman2Data = await linesman2Details.json();

        setFormData({
          home_team: fetchedOldMatchData.home_team,
          away_team: fetchedOldMatchData.away_team,
          match_venue: fetchedOldMatchData.match_venue,
          date_and_time: backendDate_as_string,
          vip_ticket_price: fetchedOldMatchData.vip_ticket_price,
          main_referee: `${mainRefereeData.first_name} ${mainRefereeData.middle_name} ${mainRefereeData.last_name}`,
          linesmen_1: `${linesman1Data.first_name} ${linesman1Data.middle_name} ${linesman1Data.last_name}`,
          linesmen_2: `${linesman2Data.first_name} ${linesman2Data.middle_name} ${linesman2Data.last_name}`,
        });

        setHomeTeam(fetchedOldMatchData.home_team);
        setAwayTeam(fetchedOldMatchData.away_team);
        setVenue(fetchedOldMatchData.match_venue);
        setDateAndTime(backendDate_as_string);
        setVipTicketPrice(fetchedOldMatchData.vip_ticket_price);
        setMainReferee(`${mainRefereeData.first_name} ${mainRefereeData.middle_name} ${mainRefereeData.last_name}`);
        setLinesman1(`${linesman1Data.first_name} ${linesman1Data.middle_name} ${linesman1Data.last_name}`);
        setLinesman2(`${linesman2Data.first_name} ${linesman2Data.middle_name} ${linesman2Data.last_name}`);

        setAllTeams(allTeamsData);
        setReferees(refereesData);
        setLinesmen(linesmenData);
        setStadiums(AllStadiums);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllData();
  }, [home_team, date_and_time]);

  useEffect(() => {
    // This useEffect runs whenever oldMatchData changes
    console.log("old match data is begin");
    console.log(oldMatchData);
    console.log("old match data is end");
  }, [oldMatchData]);


  const handleEditMatchSubmit = async (event) => {
    event.preventDefault();

    const parsedVipTicketPrice = parseFloat(vipTicketPrice);
    if (isNaN(parsedVipTicketPrice) || parsedVipTicketPrice <= 0) {
      window.alert("Please enter a valid VIP ticket price.");
      return;
    }

    if (mainReferee === linesman1 || mainReferee === linesman2 || linesman1 === linesman2) {
      window.alert("Main Referee and Linesmen cannot have the same value.");
      return;
    }

    if (homeTeam === awayTeam) {
      window.alert("Home Team and Away Team cannot be the same.");
      return;
    }
    const currentTime = new Date();
    const selectedTime = new Date(dateAndTime);

    if (selectedTime < currentTime) {
      window.alert("Selected time should not be earlier than the current date and time.");
      return;
    }





    try {
      // console.log("referee first name "+mainReferee.split(" ")[0]);
      // console.log("referee last name "+mainReferee.split(" ")[2]);
      // console.log("home team "+homeTeam);
      console.log("old match data is begin(inside handle submit)");
      console.log(oldMatchData);
      console.log("old match data is end(inside handle submit)");
      const dateAndTime_as_obj = new Date(dateAndTime);
      const response = await fetch("http://localhost:8080/v1/matches", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          old_home_team: oldMatchData.home_team,
          old_date_and_time: oldMatchData.date_and_time,
          home_team: homeTeam,
          away_team: awayTeam,
          match_venue: venue,
          date_and_time: dateAndTime,
          vip_ticket_price: vipTicketPrice,
          main_referee_first_name: mainReferee.split(" ")[0],
          main_referee_middle_name: mainReferee.split(" ")[1],
          main_referee_last_name: mainReferee.split(" ")[2],
          linesmen_1_first_name: linesman1.split(" ")[0],
          linesmen_1_middle_name: linesman1.split(" ")[1],
          linesmen_1_last_name: linesman1.split(" ")[2],
          linesmen_2_first_name: linesman2.split(" ")[0],
          linesmen_2_middle_name: linesman2.split(" ")[1],
          linesmen_2_last_name: linesman2.split(" ")[2],
        }),
      });
      const sent = JSON.stringify({
        old_home_team: oldMatchData.home_team,
        old_date_and_time: oldMatchData.date_and_time,
        home_team: homeTeam,
        away_team: awayTeam,
        match_venue: venue,
        date_and_time: dateAndTime_as_obj.toISOString(),
        vip_ticket_price: vipTicketPrice,
        main_referee_first_name: mainReferee.split(" ")[0],
        main_referee_middle_name: mainReferee.split(" ")[1],
        main_referee_last_name: mainReferee.split(" ")[2],
        linesmen_1_first_name: linesman1.split(" ")[0],
        linesmen_1_middle_name: linesman1.split(" ")[1],
        linesmen_1_last_name: linesman1.split(" ")[2],
        linesmen_2_first_name: linesman2.split(" ")[0],
        linesmen_2_middle_name: linesman2.split(" ")[1],
        linesmen_2_last_name: linesman2.split(" ")[2],
      });

      console.log("what I sent");
      console.log(sent);
      console.log("what I received");
      console.log(response);
      console.log("normal date");
      console.log(dateAndTime);
      console.log("new date")
      const dateAndTime_as_obj_2 = new Date(dateAndTime);
      console.log(dateAndTime_as_obj_2.toISOString());
      if (!response.ok) {
        const badResponse = response.json;
        console.error("Failed to update match details:", response.statusText);
        console.log("error message is");
        console.log(response.json);
        console.log(badResponse.error);
        // setError("Failed to update match details. Please try again.");
        // return;
      }

      const updatedMatchData = await response.json();
      console.log(response);
      if (response.status === 202) {
        window.alert("Fail: referee has match on same day ");
        return;

      }

      else if (response.status === 203) {
        window.alert(" linesmen1 has match on same day ");
        return;
      }

      else if (response.status === 204) {
        window.alert(" linesmen2 has match on same day ");
        return;
      }

      else if (response.status == 205) {
        window.alert("home_team has match on same day ");
        return;
      }
      else if (response.status == 206) {
        window.alert(" away team has match on same day ");
        return;

      }
      else if (response.status == 207) {
        window.alert("//207: stadium used within 3 +/- hours");
        return;
      }
      window.alert("Updated Sucessfully!");
       navigate("/Manager/ManagerDashboard");
    } catch (error) {
      // console.error("Error updating match details:", error);
      // setError("Failed to update match details. Please try again.");
    }

  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
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
        <h1 style={font}>Edit Match Details</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form className="form" onSubmit={handleEditMatchSubmit}>
          <div className="form-group">
            <label htmlFor="home_team">Home Team:</label>
            <select
              id="home_team"
              className="form-control"
              value={homeTeam}
              onChange={(e) => setHomeTeam(e.target.value)}
              required
            >
              <option value="" style={font} disabled>
                Select Home Team
              </option>
              {allTeams.map((team) => (
                <option key={team.id} value={team.team_name}>
                  {team.team_name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="away_team">Away Team:</label>
            <select
              id="away_team"
              className="form-control"
              value={awayTeam}
              onChange={(e) => setAwayTeam(e.target.value)}
              required
            >
              <option value="" style={font} disabled>
                Select Away Team
              </option>
              {allTeams.map((team) => (
                <option key={team.id} value={team.team_name}>
                  {team.team_name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="match_venue">Match Venue:</label>
            <select
              id="match_venue"
              className="form-control"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
            >
              <option value="" style={font} disabled>
                Select Match Venue
              </option>
              {venues.map((venueOption) => (
                <option key={venueOption.id} value={venueOption.stadium_name}>
                  {venueOption.stadium_name}
                </option>
              ))}
            </select>
          </div>



          <div className="form-group">
            <label htmlFor="date_and_time">Date and Time:</label>
            <input
              type="datetime-local"
              id="date_and_time"
              className="form-control"
              required
              name="date_and_time"
              value={dateAndTime}
              onChange={(e) => setDateAndTime(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="vip_ticket_price">VIP Ticket Price:</label>
            <input
              type="text"
              id="vip_ticket_price"
              className="form-control"
              value={vipTicketPrice}
              onChange={(e) => setVipTicketPrice(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="main_referee">Main Referee:</label>
            <select
              id="main_referee"
              className="form-control"
              value={mainReferee}
              onChange={(e) => setMainReferee(e.target.value)}
              required
            >
              <option value="" style={font} disabled>
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
          </div>
          <div className="form-group">
            <label htmlFor="linesmen_1">Linesmen 1:</label>
            <select
              id="linesmen_1"
              className="form-control"
              value={linesman1}
              onChange={(e) => setLinesman1(e.target.value)}
              required
            >
              <option value="" style={font} disabled>
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
          </div>
          <div className="form-group">
            <label htmlFor="linesmen_2">Linesmen 2:</label>
            <select
              id="linesmen_2"
              className="form-control"
              value={linesman2}
              onChange={(e) => setLinesman2(e.target.value)}
              required
            >
              <option value="" style={font} disabled>
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
          </div>
          <button className="btn_class" type="submit" >Save Changes</button>
        </form>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default EditMatch;
