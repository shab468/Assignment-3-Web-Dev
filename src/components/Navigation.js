/*==================================================
src/components/Navigation.js

This is the navigation bar file. It creates a navigation bar up top
==================================================*/

import { Link } from 'react-router-dom';

const navStyle = {
  backgroundColor: '#DAA1FF', 
  padding: '12px',
  display: 'flex',
  justifyContent: 'right',
  gap: '20px',
  fontWeight: 'bold',
  fontSize: '16px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
};

const linkStyle = {
  color: '#323',
  textDecoration: 'none'
};

const Navigation = () => {
  return (
    <div style={navStyle}>
      <Link to="/" style={linkStyle}> Home</Link>
      <Link to="/userProfile" style={linkStyle}>User Profile</Link>
      <Link to="/credits" style={linkStyle}>Credits</Link>
      <Link to="/debits" style={linkStyle}>Debits</Link>
      <Link to="/login" style={linkStyle}>Login</Link>
    </div>
  );
};

export default Navigation;