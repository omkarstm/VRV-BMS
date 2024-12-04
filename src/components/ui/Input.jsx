import React from 'react';

const Input = ({ id, name, type, value, onChange, label, required }) => {
  return (
    <div className='form-group'>
      <input
        type={type}
        id={id}
        name={name}
        placeholder=" "
        value={value}
        onChange={onChange}
        required={required}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Input;
