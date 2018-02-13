import * as actionTypes from './actionTypes';
import axios from 'axios';

export const loadMenu = () => {
  return dispatch => {
    dispatch(loadMenuStart());

    axios.get(
      'https://crepe-party.firebaseio.com/menu.json'
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

export const addCrepeToMenu = (crepe, token) => {
  return dispatch => {
    dispatch(addCrepeToMenuStart());

    axios.post(
      'https://crepe-party.firebaseio.com/menu.json?auth=' + token,
      crepe
    ).then(response => {
        dispatch(addCrepeToMenuSuccess('New crepe added!'));
    })
    .catch(error => {
      dispatch(addCrepeToMenuFail());
    });
  }
}

const addCrepeToMenuStart = () => {
  return {
    type: actionTypes.ADD_CREPE_TO_MENU_START,
  };
}

const addCrepeToMenuSuccess = (flashMessage) => {
  return {
    type: actionTypes.ADD_CREPE_TO_MENU_SUCCESS,
    flashMessage: flashMessage,
  };
}

const addCrepeToMenuFail = () => {
  return {
    type: actionTypes.ADD_CREPE_TO_MENU_FAIL,
  };
}

export const deleteCrepeFromMenu = (crepeId, token) => {
    return dispatch => {
      dispatch(deleteCrepeFromMenuStart());

      axios.delete('https://crepe-party.firebaseio.com/menu/' + crepeId + '.json?auth=' + token)
        .then(response => {
            dispatch(deleteCrepeFromMenuSuccess());
        })
        .catch(error => {
          dispatch(deleteCrepeFromMenuFail());
        });
    }
}

const deleteCrepeFromMenuStart = () => {
  return {
    type: actionTypes.DELETE_CREPE_FROM_MENU_START,
  };
}

const deleteCrepeFromMenuSuccess = (flashMessage) => {
  return {
    type: actionTypes.DELETE_CREPE_FROM_MENU_SUCCESS,
    flashMessage: flashMessage,
  };
}

const deleteCrepeFromMenuFail = () => {
  return {
    type: actionTypes.DELETE_CREPE_FROM_MENU_FAIL,
  };
}
