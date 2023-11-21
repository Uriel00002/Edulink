import React from 'react';

export const HeaderSchedule = ({name,...props}) => {
  return (
    <header {...props}>
      <h1>{name}</h1>
    </header>
  );
}

export default HeaderSchedule;