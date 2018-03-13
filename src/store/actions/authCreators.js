import * as actionTypes from './actionTypes';
import axios from 'axios';
import * as orderCreators from './orderCreators';

const errorMap = {
  EMAIL_EXISTS: 'The email address is already in use by another account.',
  OPERATION_NOT_ALLOWED: 'Password sign-in is disabled for this project.',
  TOO_MANY_ATTEMPTS_TRY_LATER: 'All requests from this device are currently blocked due to unusual activity. Try again later.',
  WEAK_PASSWORD: 'You need to provide a password of at least 6 characters.',
  EMAIL_NOT_FOUND: 'There is no user record corresponding to this identifier.',
  INVALID_PASSWORD: 'The password is invalid or the user does not have a password.',
  USER_DISABLED: 'The user account has been disabled by an administrator.',
};

const getAuthenticateError = (isLogin, error)  => {
  let errorKey = undefined;

  try {
    errorKey = error.response.data.error.message;
  } catch (e) {
  }

  const errorMessage = errorKey ? errorMap[errorKey] : undefined;

  if (undefined !== errorMessage) {
    return errorMessage;
  }

  return 'Unable to ' + (isLogin ? 'login.' : 'signUp.');
}

export const authenticate = (isLogin, formData) => {
  if (isLogin) {
    return authLogin(formData);
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
      dispatch(authLoginFail(getAuthenticateError(false, error)));
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
      new Date((new Date()).getTime() + (loginResponse.data.expiresIn * 1000)),
      formData.name
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
      dispatch(authLoginFail(getAuthenticateError(false, error)));
  })
  .catch(deleteError => {
      dispatch(authLoginFail(getAuthenticateError(false, error)));
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
        dispatch(authLoginFail(getAuthenticateError(true, error)));
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

const authLoginSuccess = (token, userId, expiresAt, username = undefined) => {
  return dispatch => {
    if (undefined === username) {
      axios.get(
        'https://crepe-party.firebaseio.com/users/'
        + userId
        + '.json?auth='
        + token
      ).then(response => {
        dispatch(
          dispatchActionsAfterLoginSuccess(
            token,
            userId,
            expiresAt,
            response.data.name
          )
        );
      })
      .catch(err => {
        dispatch(
          dispatchActionsAfterLoginSuccess(
            token,
            userId,
            expiresAt,
            'John Doe'
          )
        );
      });
    } else {
      dispatch(
        dispatchActionsAfterLoginSuccess(
          token,
          userId,
          expiresAt,
          username
        )
      );
    }
  };
}

const dispatchActionsAfterLoginSuccess = (token, userId, expiresAt, username) => {
  return dispatch => {
    dispatch(orderCreators.loadOrder(token, userId));
    dispatch(internalAuthLoginSuccess(token, userId, expiresAt, username));
    dispatch(authSetLogout(expiresAt.getTime() - (new Date()).getTime()));
  }
}

const internalAuthLoginSuccess = (token, userId, expiresAt, username) => {
  return {
    type: actionTypes.AUTH_LOGIN_SUCCESS,
    token: token,
    userId: userId,
    expiresAt: expiresAt,
    username: username,
  };
}

const authLoginFail = (error) => {
  return {
    type: actionTypes.AUTH_LOGIN_FAIL,
    error: error,
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
