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

export const adminAddCrepe = (crepe, token) => {
  return dispatch => {
    dispatch(adminAddCrepeStart());

    axios.post(
      'https://crepe-party.firebaseio.com/menu.json?auth=' + token,
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

export const adminDeleteCrepe = (crepeId, token) => {
    return dispatch => {
      dispatch(adminDeleteCrepeStart());

      axios.delete('https://crepe-party.firebaseio.com/menu/' + crepeId + '.json?auth=' + token)
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
