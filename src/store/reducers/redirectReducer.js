import * as actionTypes from '../actions/actionTypes';

const initialState = {
  redirectTo: undefined,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GLOBAL_REDIRECT_TO:
      return setRedirectTo(state, action);
    default:
      return state;
  }
}

const setRedirectTo = (state, action) => {
  return {
    ...state,
    redirectTo: action.redirectTo,
  };
}

export default reducer;
