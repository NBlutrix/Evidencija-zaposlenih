import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={{ display: 'flex', gap: '12px', padding: '12px', background: '#f0f0f0' }}>
    <Link to="/">Home</Link>
    <Link to="/attendances">Attendances</Link>
    <Link to="/export">Export ICS</Link>
  </nav>
);

export default Navbar;