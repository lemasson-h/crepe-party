import * as actionTypes from './actionTypes';
import axios from 'axios';

export const loadCrepes = () => {
  return dispatch => {
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
              return {
                ...response.data[crepeId],
                id: crepeId,
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
  };
}

const loadCrepesFail = () => {
  return {
    type: actionTypes.LOAD_CREPES_FAIL,
  };
}

export const loadCustomizedCrepe = (crepe, ingredients) => {
    return {
      type: actionTypes.LOAD_CUSTOMIZED_CREPE,
      crepe: crepe,
      ingredients: ingredients,
    };
}

export const resetCustomizedCrepe = () => {
  return {
    type: actionTypes.RESET_CUSTOMIZED_CREPE,
  };
}
