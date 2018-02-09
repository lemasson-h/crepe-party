import React from 'react';
import { NavLink } from 'react-router-dom';
import './NotFound.css';

const notFound = () => (
  <div className="NotFound">
    <h1>Not Found</h1>
    <p>It looks like you're trying to go above the border of the website.</p>
  </div>
);

export default notFound;
