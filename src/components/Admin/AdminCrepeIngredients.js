import React from 'react';
import { transformObjectToIngredientQuantity } from '../../helpers/ingredientValidationHelper';

const adminCrepeIngredients = (props) => {
  const ingredients = props.adminIngredients.map(ingredient => {
    let quantity = 0;

    if (props.crepe.ingredients[ingredient.id]) {
      quantity = props.crepe.ingredients[ingredient.id];
    }

    return (
      <div className="Ingredient" key={ingredient.id}>
        <div className="IngredientName">{ingredient.name} <span>({transformObjectToIngredientQuantity(ingredient.quantity)})</span></div>
        <div className="ingredientQuantity">{quantity}</div>
        <button className="QuantityButton Less"
          disabled={quantity < 1}
          onClick={e => props.removeIngredient(e, ingredient.id)}>-</button>
        <button className="QuantityButton Plus"
          onClick={e => props.addIngredient(e, ingredient.id)}>+</button>
      </div>
    );
  });

  return (
    <div className="Ingredients">
      {ingredients}
    </div>
  );
}

export default adminCrepeIngredients;
