import React from 'react';

import Aux from '../../../hoc/Aux';

const adminIngredient = (props) => {
  return (
    <Aux>
      <p>Quantity: {props.ingredient.quantity}</p>
    </Aux>
  );
}

export default adminIngredient;
