import React from 'react';
import soccerBallImage from '../soccer-ball.png'; // Import your soccer ball image

const Footer = () => {
  return (
    <footer className="footer">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={soccerBallImage} alt="Soccer Ball" style={{ width: '30px', marginRight: '10px' }} />
        <p>
            &copy; {new Date().getFullYear()} EPL. All rights reserved.
         
        </p>
      </div>
    </footer>
  );
};

export default Footer;
