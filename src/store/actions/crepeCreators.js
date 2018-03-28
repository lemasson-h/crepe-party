import { cleanUnexistingIngredientsFromCrepe } from '../../helpers/crepeIngredientHelper';

import * as actionTypes from './actionTypes';
import axios from 'axios';

export const loadCrepesExpires = () => {
  return {
      type: actionTypes.LOAD_CREPES_EXPIRES,
  };
}

export const loadCrepes = (dbIngredients) => {
  return (dispatch, getState) => {
    dispatch(loadCrepesStart());

    const state = getState();

    if (state.crepes.crepes.length > 0 && state.crepes.loadedAt + 600000  > Date.now()) {
      const triggerLoadLater = new Promise((resolve, reject) => {
        setTimeout(resolve, 100);
      })

      triggerLoadLater.then(() => dispatch(loadCrepesSuccess(state.crepes.crepes)));

      return ;
    }

    axios.get(
      'https://crepe-party.firebaseio.com/crepes.json'
    )
      .then(response => {
        let data = response.data;

        if (null === data) {
          data = [];
        } else {
          data = Object.keys(response.data).map(
            crepeId => {
              let ingredients = response.data[crepeId].ingredients;

              if (undefined === ingredients) {
                ingredients = {};
              }

              return {
                ...response.data[crepeId],
                id: crepeId,
                ingredients: ingredients,
              };
            }
          ).map(crepe => {
            return {
              ...crepe,
              ingredients: cleanUnexistingIngredientsFromCrepe(crepe, dbIngredients),
            };
          });
        }

        dispatch(loadCrepesSuccess(data));
      })
      .catch(error => {
        console.log(error);
        dispatch(loadCrepesFail());
      });
  }
}

const loadCrepesStart = () => {
  return {
    type: actionTypes.LOAD_CREPES_START,
  };
}

const loadCrepesSuccess = (crepes) => {
  return {
    type: actionTypes.LOAD_CREPES_SUCCESS,
    crepes: crepes,
    loadedAt: Date.now(),
  };
}

const loadCrepesFail = () => {
  return {
    type: actionTypes.LOAD_CREPES_FAIL,
  };
}

export const loadCustomizedCrepe = (crepe, ingredients, isInit = true) => {
    return {
      type: actionTypes.LOAD_CUSTOMIZED_CREPE,
      crepe: crepe,
      ingredients: ingredients,
      isInit: isInit,
    };
}

export const resetCustomizedCrepe = () => {
  return {
    type: actionTypes.RESET_CUSTOMIZED_CREPE,
  };
}

export const moreIngredientForCrepe = (ingredientId) => {
  return {
    type: actionTypes.MORE_INGREDIENT_FOR_CREPE,
    ingredientId: ingredientId,
  };
}

export const lessIngredientForCrepe = (ingredientId, ingredients) => {
  return {
    type: actionTypes.LESS_INGREDIENT_FOR_CREPE,
    ingredientId: ingredientId,
    ingredients: ingredients,
  };
}

export const removeIngredientForCrepe = (ingredientId, ingredients) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT_FOR_CREPE,
    ingredientId: ingredientId,
    ingredients: ingredients,
  };
}

export const addIngredientForCrepe = (ingredientId, ingredients) => {
  return {
    type: actionTypes.ADD_INGREDIENT_FOR_CREPE,
    ingredientId: ingredientId,
    ingredients: ingredients,
  };
}

export const changeCurrentAdditionalIngredient = (ingredientId) => {
  return {
    type: actionTypes.CHANGE_CURRENT_ADDITIONAL_INGREDIENT,
    ingredientId: ingredientId,
  };
}

export const loadOrderCrepe = (crepe, ingredients) => {
  return dispatch => {
    const updatedCrepe = {
      ...crepe,
      ingredients: {
        ...cleanUnexistingIngredientsFromCrepe(crepe, ingredients),
      }
    };

    dispatch(internalLoadOrderCrepe(updatedCrepe, ingredients));
  };
}

const internalLoadOrderCrepe = (crepe, ingredients) => {
  return {
    type: actionTypes.LOAD_ORDER_CREPE,
    crepe: crepe,
    ingredients: ingredients,
  };
}
