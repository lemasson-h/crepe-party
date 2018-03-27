import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: undefined,
  users: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADMIN_LOAD_USERS_START:
      return loadUsersStart(state, action);
    case actionTypes.ADMIN_LOAD_USERS_FAIL:
      return loadUsersFail(state, action);
    case actionTypes.ADMIN_LOAD_USERS_SUCCESS:
      return loadUsersSuccess(state, action);
    default:
      return state;
  }
}

const loadUsersStart = (state, action) => {
  return {
    ...state,
    loading: true,
    error: undefined,
    users: [],
  };
}

const loadUsersFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error,
  };
}

const loadUsersSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    users: action.users,
  };
}

export default reducer;
