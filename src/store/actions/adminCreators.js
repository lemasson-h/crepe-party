import * as actionTypes from './actionTypes';
import axios from 'axios';

//ADMIN CREPE

export const adminAddCrepe = (crepe, token) => {
  return dispatch => {
    dispatch(adminAddCrepeStart());

    axios.post(
      'https://crepe-party.firebaseio.com/crepes.json?auth=' + token,
      crepe
    ).then(response => {
        dispatch(adminAddCrepeSuccess('New crepe added!'));
    })
    .catch(error => {
      dispatch(adminAddCrepeFail());
    });
  }
}

const adminAddCrepeStart = () => {
  return {
    type: actionTypes.ADMIN_ADD_CREPE_START,
  };
}

const adminAddCrepeSuccess = (flashMessage) => {
  return {
    type: actionTypes.ADMIN_ADD_CREPE_SUCCESS,
    flashMessage: flashMessage,
  };
}

const adminAddCrepeFail = () => {
  return {
    type: actionTypes.ADMIN_ADD_CREPE_FAIL,
  };
}

export const adminAddCrepeReset = () => {
  return {
    type: actionTypes.ADMIN_ADD_CREPE_RESET,
  };
}

export const adminDeleteCrepe = (crepeId, token) => {
    return dispatch => {
      dispatch(adminDeleteCrepeStart());

      axios.delete('https://crepe-party.firebaseio.com/crepes/' + crepeId + '.json?auth=' + token)
        .then(response => {
            dispatch(adminDeleteCrepeSuccess());
        })
        .catch(error => {
          dispatch(adminDeleteCrepeFail());
        });
    }
}

const adminDeleteCrepeStart = () => {
  return {
    type: actionTypes.ADMIN_DELETE_CREPE_START,
  };
}

const adminDeleteCrepeSuccess = (flashMessage) => {
  return {
    type: actionTypes.ADMIN_DELETE_CREPE_SUCCESS,
    flashMessage: flashMessage,
  };
}

const adminDeleteCrepeFail = () => {
  return {
    type: actionTypes.ADMIN_DELETE_CREPE_FAIL,
  };
}

export const adminDeleteCrepeReset = () => {
  return {
    type: actionTypes.ADMIN_DELETE_CREPE_RESET,
  };
}

//ADMIN INGREDIENT

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
