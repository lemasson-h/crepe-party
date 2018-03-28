import React from 'react';
import { transformObjectToIngredientQuantity } from '../../../helpers/ingredientValidationHelper';

import Aux from '../../../hoc/Aux';

const adminIngredient = (props) => {
  return (
    <Aux>
      <p>Quantity: {transformObjectToIngredientQuantity(props.ingredient.quantity)}</p>
    </Aux>
  );
}

export default adminIngredient;
