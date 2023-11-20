import React from 'react';

const Dropdown = ({ label, options, id, name, onChange }) => {
  return (
    <div className='dropdown'>
      <label htmlFor={id}>{label}:</label>
      <select id={id} name={name} onChange={onChange}>
        {options?.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;