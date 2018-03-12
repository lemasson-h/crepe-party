import * as actionTypes from './actionTypes';
import axios from 'axios';

export const loadCrepes = () => {
  return (dispatch, getState) => {
    const state = getState();

    if (state.crepes.crepes.length > 0 && state.crepes.loadedAt + 600  < Date.now()) {
      return ;
    }

    dispatch(loadCrepesStart());

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
          );
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
  return {
    type: actionTypes.LOAD_ORDER_CREPE,
    crepe: crepe,
    ingredients: ingredients,
  };
}
