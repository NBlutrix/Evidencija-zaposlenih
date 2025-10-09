import React from 'react';

const Card = ({ title, children }) => (
  <div style={{
    border: '1px solid #ccc',
    borderRadius: '6px',
    padding: '16px',
    margin: '12px 0'
  }}>
    <h3>{title}</h3>
    {children}
  </div>
);

export default Card;