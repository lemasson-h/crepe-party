import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authLogin = (email, password) => {
  return dispatch => {
    dispatch(authLoginStart());

    /**
     * Key to be deleted later as it will for now be pushed to github
     */
    axios.post(
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDJeHNhLP5fa1Yhsv3ArcURxRhnvBFIWdw',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    )
      .then(response => {
        dispatch(authLoginSuccess(
          response.data.idToken,
          response.data.localId,
          new Date((new Date()).getTime() + (response.data.expiresIn * 1000))
        ));
        dispatch(authSetLogout(response.data.expiresIn * 1000)); //Transform in milliseconds
      })
      .catch(error => {
        dispatch(authLoginFail());
      });
  }
}

export const authLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
}

export const authAutoLogin = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const expiresAt = new Date(localStorage.getItem('expiresAt'));

    if (token === null) {
      return;
    }

    if (expiresAt < new Date()) {
      return dispatch(authLogout());
    }

    dispatch(authLoginSuccess(token, userId, expiresAt));
    dispatch(authSetLogout(expiresAt.getTime() - (new Date()).getTime()));
  }
}

const authLoginStart = () => {
  return {
    type: actionTypes.AUTH_LOGIN_START,
  };
}

const authLoginSuccess = (token, userId, expiresAt) => {
  return {
    type: actionTypes.AUTH_LOGIN_SUCCESS,
    token: token,
    userId: userId,
    expiresAt: expiresAt,
  };
}

const authLoginFail = () => {
  return {
    type: actionTypes.AUTH_LOGIN_FAIL,
  };
}

const authSetLogout = (timeout) => {
  return dispatch => {
    const logoutTimer = setTimeout(
      () => {
        dispatch(authLogout());
      },
      timeout
    );

    dispatch(authLogoutTimer(logoutTimer));
  };
}

const authLogoutTimer = (logoutTimer) => {
  return {
    type: actionTypes.AUTH_LOGOUT_TIMER,
    logoutTimer: logoutTimer,
  };
}
