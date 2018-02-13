import React from 'react';

const adminCrepe = (props) => {
  return (
    <div>
      <h2>{props.crepe.name}</h2>
      <p>Details</p>
      <button onClick={() => props.deleteCrepe(props.crepe.id) }>Delete</button>
    </div>
  );
}

export default adminCrepe;
