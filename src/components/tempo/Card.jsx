import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ title, description, to, icon }) => {
  return (
    <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="card-tempo">
        <div className="circle" >
          <i className={`fa ${icon} card-icon`}></i>
        </div>
        <h3 className='title'>{title}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
};

export default Card;
