import React from 'react';

const adminIngredient = (props) => {
  return (
    <div>
      <h2>{props.ingredient.name}</h2>
      <p>Quantity: {props.ingredient.quantity}</p>
      <button onClick={() => props.deleteIngredient(props.ingredient.id) }>Delete</button>
    </div>
  );
}

export default adminIngredient;
