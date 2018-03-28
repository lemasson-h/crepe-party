import { cleanUnexistingIngredientsFromCrepe } from '../../helpers/crepeIngredientHelper';

import * as actionTypes from './actionTypes';
import axios from 'axios';

//Actions to add a crepe

export const adminAddCrepe = (crepe, token) => {
  return dispatch => {
    dispatch(adminAddCrepeStart());

    const cleanIngredients = {};
    Object.keys(crepe.ingredients).forEach(
      ingredientId => {
        if (crepe.ingredients[ingredientId] > 0) {
          cleanIngredients[ingredientId] = crepe.ingredients[ingredientId];
        }
      }
    );

    const updatedCrepe = {
      ...crepe,
      ingredients: cleanIngredients,
    };

    axios.post(
      'https://crepe-party.firebaseio.com/crepes.json?auth=' + token,
      updatedCrepe
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

//Actions to load a crepe

export const adminLoadCrepe = (crepeId) => {
  return dispatch => {
    dispatch(adminLoadCrepeStart());

    axios.get(
      'https://crepe-party.firebaseio.com/crepes/' + crepeId + '.json?'
    ).then(response => {
        dispatch(
          adminLoadCrepeSuccess({
            ...response.data,
            id: crepeId,
          })
        );
    })
    .catch(error => {
      dispatch(adminLoadCrepeFail());
    });
  }
}

const adminLoadCrepeStart = () => {
  return {
    type: actionTypes.ADMIN_LOAD_CREPE_START,
  };
}

const adminLoadCrepeSuccess = (crepe) => {
  return {
    type: actionTypes.ADMIN_LOAD_CREPE_SUCCESS,
    crepe: crepe,
  };
}

const adminLoadCrepeFail = () => {
  return {
    type: actionTypes.ADMIN_LOAD_CREPE_FAIL,
  };
}

export const adminSynchroIngredientsToCrepe = (crepe, ingredients) => {
  let crepeIngredients = cleanUnexistingIngredientsFromCrepe(crepe, ingredients, true);

  return {
    type: actionTypes.ADMIN_SYNCHRO_INGREDIENTS_TO_CREPE,
    ingredients: crepeIngredients,
  };
}

//Actions to edit a crepe

export const adminEditCrepe = (crepe, token) => {
  return dispatch => {
    dispatch(adminEditCrepeStart());

    const cleanIngredients = {};
    Object.keys(crepe.ingredients).forEach(
      ingredientId => {
        if (crepe.ingredients[ingredientId] > 0) {
          cleanIngredients[ingredientId] = crepe.ingredients[ingredientId];
        }
      }
    );

    const updatedCrepe = {
      ...crepe,
      ingredients: cleanIngredients,
    };

    axios.put(
      'https://crepe-party.firebaseio.com/crepes/' + crepe.id + '.json?auth=' + token,
      updatedCrepe
    ).then(response => {
        dispatch(adminEditCrepeSuccess('Crepe "' + crepe.name +  '" saved!'));
    })
    .catch(error => {
      dispatch(adminEditCrepeFail());
    });
  }
}

const adminEditCrepeStart = () => {
  return {
    type: actionTypes.ADMIN_EDIT_CREPE_START,
  };
}

const adminEditCrepeSuccess = (flashMessage) => {
  return {
    type: actionTypes.ADMIN_EDIT_CREPE_SUCCESS,
    flashMessage: flashMessage,
  };
}

const adminEditCrepeFail = () => {
  return {
    type: actionTypes.ADMIN_EDIT_CREPE_FAIL,
  };
}

//Actions to delete a crepe

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

//Actions on the form of a crepe

export const adminCrepeNameChanged = (name) => {
  return {
    type: actionTypes.ADMIN_CREPE_NAME_CHANGED,
    name: name,
  };
}

export const adminAddIngredientToCrepe = (ingredientId) => {
  return {
    type: actionTypes.ADMIN_ADD_INGREDIENT_TO_CREPE,
    ingredientId: ingredientId,
  };
}

export const adminRemoveIngredientToCrepe = (ingredientId) => {
  return {
    type: actionTypes.ADMIN_REMOVE_INGREDIENT_TO_CREPE,
    ingredientId: ingredientId,
  };
}

export const adminInitIngredientsToCrepe = (ingredients) => {
  return {
    type: actionTypes.ADMIN_INIT_INGREDIENTS_TO_CREPE,
    ingredients: ingredients,
  };
}
