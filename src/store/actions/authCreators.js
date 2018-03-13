import * as actionTypes from './actionTypes';
import axios from 'axios';
import * as orderCreators from './orderCreators';

const ERROR_MAP = [
  'EMAIL_EXISTS': '',
  'OPERATION_NOT_ALLOWED': '',
  'TOO_MANY_ATTEMPTS_TRY_LATER': '',
  'WEAK_PASSWORD': '',
  'EMAIL_NOT_FOUND': '',
  'INVALID_PASSWORD': '',
  'USER_DISABLED': '',
];

export const authenticate = (isLogin, formData) => {
  if (isLogin) {
    return authLogin(formData.email, formData.password);
  }

  return authSignUp(formData);
}

const authSignUp = (formData) => {
  return dispatch => {
    dispatch(authLoginStart());

    axios.post(
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDJeHNhLP5fa1Yhsv3ArcURxRhnvBFIWdw',
      {
        email: formData.email,
        password: formData.password,
        returnSecureToken: true,
      }
    )
    .then(loginResponse => {
      postUserNameOnSignUp(loginResponse, formData, dispatch);
    })
    .catch(error => {
      console.log(error.response);
      dispatch(authLoginFail());
    });
  }
}

const postUserNameOnSignUp = (loginResponse, formData, dispatch) => {
  axios.put(
    'https://crepe-party.firebaseio.com/users/'
      + loginResponse.data.localId
      + '.json?auth='
      + loginResponse.data.idToken,
    {
        'name': formData.name,
    }
  )
  .then(userResponse => {
    console.log(userResponse);

    dispatch(authLoginSuccess(
      loginResponse.data.idToken,
      loginResponse.data.localId,
      new Date((new Date()).getTime() + (loginResponse.data.expiresIn * 1000))
    ));
  })
  .catch(error => {
    deleteAccountWhenErrorOnSignUp(loginResponse.data.idToken, dispatch, error);
  });
}

const deleteAccountWhenErrorOnSignUp = (token, dispatch, error) => {
  axios.post(
    'https://www.googleapis.com/identitytoolkit/v3/relyingparty/deleteAccount?key=AIzaSyDJeHNhLP5fa1Yhsv3ArcURxRhnvBFIWdw',
    {
      idToken: token,
    }
  )
  .then(deleteResponse => {
      console.log(error);
      dispatch(authLoginFail());
  })
  .catch(deleteError => {
      console.log(error);
      dispatch(authLoginFail());
  });
}

const authLogin = (formData) => {
  return dispatch => {
    dispatch(authLoginStart());

    /**
     * Key to be deleted later as it will for now be pushed to github
     */
    axios.post(
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDJeHNhLP5fa1Yhsv3ArcURxRhnvBFIWdw',
      {
        email: formData.email,
        password: formData.password,
        returnSecureToken: true,
      }
    )
      .then(response => {
        dispatch(authLoginSuccess(
          response.data.idToken,
          response.data.localId,
          new Date((new Date()).getTime() + (response.data.expiresIn * 1000))
        ));
      })
      .catch(error => {
        dispatch(authLoginFail());
      });
  }
}

export const authLogout = () => {
  return dispatch => {
    dispatch(orderCreators.resetOrderOnLogout());
    dispatch(internalLogout());
  };
}

const internalLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
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
  }
}

const authLoginStart = () => {
  return {
    type: actionTypes.AUTH_LOGIN_START,
  };
}

const authLoginSuccess = (token, userId, expiresAt) => {
  return dispatch => {
    dispatch(orderCreators.loadOrder(token, userId));
    dispatch(internalAuthLoginSuccess(token, userId, expiresAt));
    dispatch(authSetLogout(expiresAt.getTime() - (new Date()).getTime()));
  };
}

const internalAuthLoginSuccess = (token, userId, expiresAt) => {
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

export const setRedirectToAfterLogin = (redirectTo) => {
  return {
    type: actionTypes.AUTH_REDIRECT_TO_AFTER_LOGIN,
    redirectTo: redirectTo,
  };
}

export const switchLogin = () => {
  return {
    type: actionTypes.AUTH_SWITCH_LOGIN,
  };
}

export const authResetError = () => {
  return {
    type: actionTypes.AUTH_RESET_ERROR,
  };
}
