import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
  isAuthenticated: false,
  loading: false,
  logoutTimer: null,
  error: false,
}

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.AUTH_LOGIN_START:
      return loginStart(state, action);
    case actionTypes.AUTH_LOGIN_SUCCESS:
      return loginSuccess(state, action);
    case actionTypes.AUTH_LOGIN_FAIL:
      return loginFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return logout(state, action);
    case actionTypes.AUTH_LOGOUT_TIMER:
      return logoutTimer(state, action);
    default:
      return state;
  }
}

const loginStart = (state, action) => {
  if (state.logoutTimer) {
    clearTimeout(state.logoutTimer);
  }

  return {
    ...state,
    token: null,
    userId: null,
    isAuthenticated: false,
    loading: true,
    logoutTimer: null,
    error: false,
  };
}

const loginSuccess = (state, action) => {
  localStorage.setItem('token', action.token);
  localStorage.setItem('userId', action.userId);
  localStorage.setItem('expiresAt', action.expiresAt);

  return {
    ...state,
    token: action.token,
    userId: action.userId,
    loading: false,
    isAuthenticated: true,
    error: false,
  }
}

const loginFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: true,
  }
}

const logout = (state, action) => {
  if (state.logoutTimer) {
    clearTimeout(state.logoutTimer);
  }

  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expiresAt');

  return {
    ...state,
    token: null,
    userId: null,
    isAuthenticated: false,
    logoutTimer: null,
  }
}

const logoutTimer = (state, action) => {
  return {
    ...state,
    logoutTimer: action.logoutTimer,
  };
}

export default authReducer;
