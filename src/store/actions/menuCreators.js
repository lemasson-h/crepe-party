import * as actionTypes from './actionTypes';
import axios from 'axios';

export const loadMenu = () => {
  return dispatch => {
    dispatch(loadMenuStart());

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

        dispatch(loadMenuSuccess(data));
      })
      .catch(error => {
        console.log(error);
        dispatch(loadMenuFail());
      });
  }
}

const loadMenuStart = () => {
  return {
    type: actionTypes.LOAD_MENU_START,
  };
}

const loadMenuSuccess = (menu) => {
  return {
    type: actionTypes.LOAD_MENU_SUCCESS,
    menu: menu,
  };
}

const loadMenuFail = () => {
  return {
    type: actionTypes.LOAD_MENU_FAIL,
  };
}
