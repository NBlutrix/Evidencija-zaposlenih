import React from 'react';

const Button = ({ children, onClick, type = 'button' }) => (
  <button
    type={type}
    onClick={onClick}
    style={{
      padding: '8px 16px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      margin: '4px',
    }}
  >
    {children}
  </button>
);

export default Button;
