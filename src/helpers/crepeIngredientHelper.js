import * as actionTypes from '../store/actions/actionTypes';

export const getAdditionalIngredients = (crepe, ingredients) => {
  const ingredientIds = Object.keys(crepe.ingredients);

  return ingredients
    .filter(ingredient => {
      const exists = ingredientIds.find(id => {
        return id === ingredient.id;
      });

      return !exists;
    })
    .map(ingredient => {
      //Clone it to stay immutable
      return {
        ...ingredient
      };
    });
}

export const getNewCurrentAdditionalIngredientId = (state) => {
  let currentAdditonalIngredient = undefined;

  if (state.additionalIngredients.length > 0) {
    currentAdditonalIngredient = state.additionalIngredients[0].id;
  }

  return currentAdditonalIngredient;
}

export const calculateCrepeChanges = (state, ingredientId, type) => {
  switch (type) {
    case actionTypes.MORE_INGREDIENT_FOR_CREPE:
      return calculateChangesForMore(state, ingredientId);
    case actionTypes.LESS_INGREDIENT_FOR_CREPE:
      return calculateChangesForLess(state, ingredientId);
    case actionTypes.REMOVE_INGREDIENT_FOR_CREPE:
      return calculateChangesForRemove(state, ingredientId);
    case actionTypes.ADD_INGREDIENT_FOR_CREPE:
      return calculateChangesForAdd(state, ingredientId);
    default:
      return state.crepeChanges;
  }
}

const calculateChangesForMore = (state, ingredientId) => {
  return state.crepeChanges + 1;
}

const calculateChangesForLess = (state, ingredientId) => {
  const initialQuantity = state.initialCrepe.ingredients[ingredientId];
  const currentQuantity = state.currentCrepe.ingredients[ingredientId];

  if (initialQuantity === undefined || currentQuantity > initialQuantity) {
    return state.crepeChanges - 1;
  }

  return state.crepeChanges + 1;
}

const calculateChangesForRemove = (state, ingredientId) => {
    const initialQuantity = state.initialCrepe.ingredients[ingredientId];
    const currentQuantity = state.currentCrepe.ingredients[ingredientId];

    if (initialQuantity === undefined) {
      return state.crepeChanges - currentQuantity;
    }

    /*
     * We substract all changes done by add
     * But remove is still a change, so make sure we count it as a change
     */
    return (state.crepeChanges - Math.abs(initialQuantity - currentQuantity) + 1);
}

const calculateChangesForAdd = (state, ingredientId) => {
    const initialQuantity = state.initialCrepe.ingredients[ingredientId];

    if (initialQuantity === undefined) {
      return state.crepeChanges + 1;
    }

    //We reset an existing ingredient, so we undo a change
    return state.crepeChanges - 1;
}
