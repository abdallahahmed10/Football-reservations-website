
// export default Row;

import React from 'react';
import Seat from './seat';

const Row = ({ rowId, seats, onSelect, reservedSeats ,isManager}) => {
  return (
    <div className="row">
      {seats.map((seat, i) => {
        console.log("rowID", rowId);
        console.log('i', i); 
        console.log("seat", reservedSeats[rowId][i]);
        const isReserved = reservedSeats[rowId][i];
        return (
          <Seat key={seat.id} id={seat.id} isReserved={isReserved} onSelect={onSelect} isManager={isManager}/>
        );
      })}
    </div>
  );
};

export default Row;