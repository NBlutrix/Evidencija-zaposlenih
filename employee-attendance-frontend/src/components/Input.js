import React from 'react';

const Input = ({ label, value, onChange, type = 'text', placeholder }) => (
  <div style={{ marginBottom: '12px' }}>
    <label>{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{ padding: '8px', width: '100%', marginTop: '4px' }}
    />
  </div>
);

export default Input;