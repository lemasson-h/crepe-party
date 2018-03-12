import React from 'react';
import './Spinner.css';

const spinner = (props) => {
  const classes = ["loader" , props.small ? 'loaderSmall' : null].join(' ');
  
  return (
    <div className={classes}>Loading...</div>
  );
}

export default spinner;
