import * as actionTypes from './actionTypes';
import axios from 'axios';

//Actions to add an ingredient

export const adminAddIngredient = (ingredient, token) => {
  return dispatch => {
    dispatch(adminAddIngredientStart());

    axios.post(
      'https://crepe-party.firebaseio.com/ingredients.json?auth=' + token,
      ingredient
    ).then(response => {
        dispatch(adminAddIngredientSuccess('New ingredient added!'));
    })
    .catch(error => {
      dispatch(adminAddIngredientFail());
    });
  }
}

const adminAddIngredientStart = () => {
  return {
    type: actionTypes.ADMIN_ADD_INGREDIENT_START,
  };
}

const adminAddIngredientSuccess = (flashMessage) => {
  return {
    type: actionTypes.ADMIN_ADD_INGREDIENT_SUCCESS,
    flashMessage: flashMessage,
  };
}

const adminAddIngredientFail = () => {
  return {
    type: actionTypes.ADMIN_ADD_INGREDIENT_FAIL,
  };
}

export const adminAddIngredientReset = () => {
  return {
    type: actionTypes.ADMIN_ADD_INGREDIENT_RESET,
  };
}

//Actions to load an ingredient

export const adminLoadIngredient = (ingredientId) => {
  return dispatch => {
    dispatch(adminLoadIngredientStart());

    axios.get(
      'https://crepe-party.firebaseio.com/ingredients/' + ingredientId + '.json?'
    ).then(response => {
        dispatch(
          adminLoadIngredientSuccess({
            ...response.data,
            id: ingredientId,
          })
        );
    })
    .catch(error => {
      dispatch(adminLoadIngredientFail());
    });
  }
}

const adminLoadIngredientStart = () => {
  return {
    type: actionTypes.ADMIN_LOAD_INGREDIENT_START,
  };
}

const adminLoadIngredientSuccess = (crepe) => {
  return {
    type: actionTypes.ADMIN_LOAD_INGREDIENT_SUCCESS,
    crepe: crepe,
  };
}

const adminLoadIngredientFail = () => {
  return {
    type: actionTypes.ADMIN_LOAD_INGREDIENT_FAIL,
  };
}

//Actions to edit an ingredient

export const adminEditIngredient = (ingredient, token) => {
  return dispatch => {
    dispatch(adminEditIngredientStart());

    axios.put(
      'https://crepe-party.firebaseio.com/ingredients/' + ingredient.id + '.json?auth=' + token,
      ingredient
    ).then(response => {
        dispatch(adminEditIngredientSuccess('Ingredient "' + ingredient.name +  '" saved!'));
    })
    .catch(error => {
      dispatch(adminEditIngredientFail());
    });
  }
}

const adminEditIngredientStart = () => {
  return {
    type: actionTypes.ADMIN_EDIT_INGREDIENT_START,
  };
}

const adminEditIngredientSuccess = (flashMessage) => {
  return {
    type: actionTypes.ADMIN_EDIT_INGREDIENT_SUCCESS,
    flashMessage: flashMessage,
  };
}

const adminEditIngredientFail = () => {
  return {
    type: actionTypes.ADMIN_EDIT_INGREDIENT_FAIL,
  };
}

//Actions to delete an ingredient

export const adminDeleteIngredient = (crepeId, token) => {
    return dispatch => {
      dispatch(adminDeleteIngredientStart());

      axios.delete('https://crepe-party.firebaseio.com/ingredients/' + crepeId + '.json?auth=' + token)
        .then(response => {
            dispatch(adminDeleteIngredientSuccess());
        })
        .catch(error => {
          dispatch(adminDeleteIngredientFail());
        });
    }
}

const adminDeleteIngredientStart = () => {
  return {
    type: actionTypes.ADMIN_DELETE_INGREDIENT_START,
  };
}

const adminDeleteIngredientSuccess = (flashMessage) => {
  return {
    type: actionTypes.ADMIN_DELETE_INGREDIENT_SUCCESS,
    flashMessage: flashMessage,
  };
}

const adminDeleteIngredientFail = () => {
  return {
    type: actionTypes.ADMIN_DELETE_INGREDIENT_FAIL,
  };
}

export const adminDeleteIngredientReset = () => {
  return {
    type: actionTypes.ADMIN_DELETE_INGREDIENT_RESET,
  };
}

//Actions on the form of an ingredient

export const adminIngredientNameChanged = (name) => {
  return {
    type: actionTypes.ADMIN_INGREDIENT_NAME_CHANGED,
    name: name,
  };
}

export const adminIngredientQuantityChanged = (quantity) => {
  return {
    type: actionTypes.ADMIN_INGREDIENT_QUANTITY_CHANGED,
    quantity: quantity,
  };
}
