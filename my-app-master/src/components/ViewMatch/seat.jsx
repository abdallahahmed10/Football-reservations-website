import React, { useState } from 'react';

const Seat = ({ id, isReserved, onSelect,isManager }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    if (!isReserved) {
      setIsSelected(!isSelected);
      onSelect(id);
    }
  };

  return (
    <div className="col">
      <button
        onClick={handleClick}
        disabled={isReserved||isManager}
        className={`btn ${isReserved ? 'btn-danger' : isSelected ? 'btn-warning' : 'btn-success'}`}
        style={{
          width: '100px',
          height: '30px',
          margin: '5px'
        }}
      >
        {id}
      </button>
    </div>
  );
};

export default Seat;