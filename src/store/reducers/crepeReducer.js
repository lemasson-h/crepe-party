import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: null,
  crepes: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_CREPES_START:
      return loadCrepesStart(state, action);
    case actionTypes.LOAD_CREPES_SUCCESS:
      return loadCrepesSuccess(state, action);
    case actionTypes.LOAD_CREPES_FAIL:
      return loadCrepesFail(state, action);
    default:
      return state;
  }
}

const loadCrepesStart = (state, action) => {
  return {
    ...state,
    loading: true,
    error: null,
    flashMessage: null,
  };
}

const loadCrepesSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    crepes: action.crepes,
  };
}

const loadCrepesFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: true,
  };
}

export default reducer;
