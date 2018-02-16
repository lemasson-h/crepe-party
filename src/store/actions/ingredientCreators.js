import * as actionTypes from './actionTypes';
import axios from 'axios';

export const loadIngredients = () => {
  return dispatch => {
    dispatch(loadIngredientsStart());

    axios.get('https://crepe-party.firebaseio.com/ingredients.json')
      .then(response => {
        let ingredients = [];

        if (null !== response.data) {
          ingredients = Object.keys(response.data)
            .map(ingredientId => {
              return {
                ...response.data[ingredientId],
                id: ingredientId,
              };
            });
        }

        dispatch(loadIngredientsSuccess(ingredients));
      })
      .catch(error => {
          dispatch(loadIngredientsFail());
      });
  }
}

const loadIngredientsStart = () => {
  return {
    type: actionTypes.LOAD_INGREDIENTS_START,
  };
}

const loadIngredientsSuccess = (ingredients) => {
  return {
    type: actionTypes.LOAD_INGREDIENTS_SUCCESS,
    ingredients: ingredients,
  };
}

const loadIngredientsFail = () => {
  return {
    type: actionTypes.LOAD_INGREDIENTS_FAIL,
  };
}
