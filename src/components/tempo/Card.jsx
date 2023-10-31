import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ title, description, to, icon }) => {
  return (
    <Link to={to} style={{ textDecoration: 'none', color: 'inherit'}}> 
      <div className="card">
        <h3 className='title'>{title}</h3>
        <p>{description}</p>
        <i className={`fa ${icon} card-icon`}></i>
      </div>
    </Link>
  );
};

export default Card;
