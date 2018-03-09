import * as actionTypes from '../store/actions/actionTypes';

export const calculateCrepeChanges = (state, ingredientId, type) => {
  switch (type) {
    case actionTypes.MORE_INGREDIENT_FOR_CREPE:
      return calculateChangesForMore(state, ingredientId);
    case actionTypes.LESS_INGREDIENT_FOR_CREPE:
      return calculateChangesForLess(state, ingredientId);
    case actionTypes.REMOVE_INGREDIENT_FOR_CREPE:
      return calculateChangesForRemove(state, ingredientId);
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

  if (currentQuantity >= initialQuantity) {
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

    /**
     * We reinitialize all changes done by add
     * But remove is still a change, so make sure we count it as a change
     */
    return (state.crepeChanges - Math.abs(initialQuantity - currentQuantity) + 1);
}
