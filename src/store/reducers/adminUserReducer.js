import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  users: [],
  resetLoading: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADMIN_LOAD_USERS_START:
      return loadUsersStart(state, action);
    case actionTypes.ADMIN_LOAD_USERS_FAIL:
      return loadUsersFail(state, action);
    case actionTypes.ADMIN_LOAD_USERS_SUCCESS:
      return loadUsersSuccess(state, action);
    case actionTypes.ADMIN_RESET_ORDERS_START:
      return resetOrdersStart(state, action);
    case actionTypes.ADMIN_RESET_ORDERS_FINISH:
      return resetOrdersFinish(state, action);
    default:
      return state;
  }
}

const loadUsersStart = (state, action) => {
  return {
    ...state,
    loading: true,
    users: [],
  };
}

const loadUsersFail = (state, action) => {
  return {
    ...state,
    loading: false,
  };
}

const loadUsersSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    users: action.users,
  };
}

const resetOrdersStart = (state, action) => {
  return {
    ...state,
    resetLoading: true,
  };
}

const resetOrdersFinish = (state, action) => {
  return {
    ...state,
    resetLoading: false,
  };
}

export default reducer;
