

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Row from './Row'; // Ensure Row is styled with Material-UI
import { Container, Grid, Button, Card, TextField, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ManagerNavBar from '../Manager/ManagerNavBar';
import FanNavBar from '../Fan/FanNavBar';
import Footer from '../Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    // backgroundColor: theme.palette.background.default,
  },
  card: {
    maxWidth: 500,
    marginTop: theme.spacing(3),
    padding: theme.spacing(3),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  totalPrice: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(3),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
}));

const SeatGrid = () => {
  const classes = useStyles();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [creditCard, setCreditCard] = useState('');
  const [pin, setPin] = useState('');

  if (!state) {
    navigate('/error');
    return null;
  }

  const { stadium, reservedSeats, price, homeTeam, dateAndTime, isManager } = state;

  const handleSelect = (id) => {
    setSelectedSeats(selectedSeats.includes(id) ? selectedSeats.filter(seat => seat !== id) : [...selectedSeats, id]);
  };

  const handleConfirmReservation = async () => {
    console.log("inside handle ");
    const reservationData = selectedSeats.map(seatId => {
      const row_no = seatId.charCodeAt(0) - 65; // Convert 'A' to 0, 'B' to 1, etc.
      const column_no = parseInt(seatId.slice(1)) - 1; // Convert '1' to 0, '2' to 1, etc.

      return {
        user_username: localStorage.getItem('user'), // replace with actual username
        match_home_team: homeTeam,
        match_date_and_time: dateAndTime, // format dateAndTime
        credit_card_number: creditCard, // replace with actual credit card number
        pin_number: pin, // replace with actual PIN number
        row_no,
        column_no
      };
    });

    try {
      for (const data of reservationData) {
        console.log("data", data);
        const response = await axios.post('http://localhost:8080/v1/reservations', data);
        console.log(response);

        if (response.status !== 200) {
          alert('Failed to confirm a reservation.');
          return; // Stop if a request fails
        }
      }

      alert('All reservations confirmed!');
      setSelectedSeats([]); // Clear selected seats
      setCreditCard(''); // Clear credit card input
      setPin(''); // Clear pin input
      navigate('/Fan/FanDashBoard');
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = (event) => {
    event.preventDefault();
    handleConfirmReservation();

  };

  const seatRows = Array.from({ length: stadium.row_no }, (_, i) => i);
  const totalPrice = selectedSeats.length * price;

  return (
    <div>

    {isManager&&<ManagerNavBar></ManagerNavBar>}
      {!isManager&&<FanNavBar></FanNavBar>}
    <Box display="flex" justifyContent="center" alignItems="center" className={classes.root} style={{ marginTop: '100px',marginBottom: '200px' }}>
      <Container>
        <Grid container direction="column" alignItems="center" spacing={3}>
          {seatRows.map((rowId) => {
            const seats = Array.from({ length: stadium.seats_per_row }, (_, i) => ({
              id: `${String.fromCharCode(65 + rowId)}${i + 1}`,
            }));
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={rowId}>
                <Row rowId={rowId} seats={seats} onSelect={handleSelect} reservedSeats={reservedSeats} isManager={isManager}/>
              </Grid>
            );
          })}

          {selectedSeats.length > 0 &&!isManager&& (
            <Card className={classes.card}>
              <Typography variant="h5" className={classes.title}>Selected seats:</Typography>
              <Grid container spacing={2}>
                {selectedSeats.map(seatId => (
                  <Grid item key={seatId}>
                    <Typography variant="body1">{seatId}</Typography>
                  </Grid>
                ))}
              </Grid>
              <Typography variant="h5" className={classes.totalPrice}>Total price: {totalPrice} L.E.</Typography>
            </Card>
          )}

          {!isManager && <Card className={classes.card}>
            <form noValidate autoComplete="off" onSubmit={handleRegister}>
              <TextField
                label="Credit Card Number"
                value={creditCard}
                onChange={e => setCreditCard(e.target.value)}
                required
                fullWidth
                className={classes.textField}
              />
              <TextField
                label="Pin Number"
                type="password"
                value={pin}
                onChange={e => setPin(e.target.value)}
                required
                fullWidth
                className={classes.textField}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                disabled={selectedSeats.length === 0 || !(creditCard && pin)}
              >
                Confirm Reservation
              </Button>

            </form>
          </Card>}
          {isManager && (
          
              <form noValidate autoComplete="off" onLoad={handleConfirmReservation}>
               
              </form>
          
          )}

        </Grid>
      </Container>
    </Box>
    <Footer></Footer>
    </div>
  );
};

export default SeatGrid;
