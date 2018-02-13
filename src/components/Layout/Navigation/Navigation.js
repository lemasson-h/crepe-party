import React from 'react';
import { NavLink } from 'react-router-dom';

const navigation = (props) => {
  return (
    <div className="Navigation">
      <NavLink to="/" exact>Homepage</NavLink>
      <NavLink to="/menu">Menu</NavLink>
      {props.isAdmin ? <NavLink to="/admin">Admin</NavLink> : null }
      {props.isAuthenticated ? <NavLink to="/logout">Logout</NavLink> : <NavLink to="/login">Login</NavLink> }
    </div>
  );
}

export default navigation;
