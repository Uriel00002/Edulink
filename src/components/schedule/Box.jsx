import React from 'react';

const Box = ({ title, description, link }) => {
  return (
    <div style={cardStyle}>
      <h3>{title}</h3>
      <p>{description}</p>
      <a href={link}>Ver más</a>
    </div>
  );
};

const cardStyle = {
  border: '1px solid #ccc',
  borderRadius: '5px',
  padding: '20px',
  margin: '10px',
  width: '400px',
  height: '500px',
};

export default Box;