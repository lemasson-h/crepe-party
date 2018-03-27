import * as actionTypes from './actionTypes';
import axios from 'axios';

export const adminLoadUsers = (token) => {
  return dispatch => {
    dispatch(loadUsersStart());

    axios.get('https://crepe-party.firebaseio.com/users.json?auth=' + token)
      .then(response => {
        const users = Object.keys(response.data).map(
          userId => {
            return {
              ...response.data[userId],
              id: userId,
            };
          }
        );

        dispatch(loadUsersSuccess(users));
      })
      .catch(error => {
        dispatch(loadUsersFail());
      });
  }
}

const loadUsersStart = () => {
  return {
    type: actionTypes.ADMIN_LOAD_USERS_START,
  };
}

const loadUsersFail = () => {
  return {
    type: actionTypes.ADMIN_LOAD_USERS_FAIL,
  };
}

const loadUsersSuccess = (users) => {
    return {
      type: actionTypes.ADMIN_LOAD_USERS_SUCCESS,
      users: users,
    };
}
