import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: null,
  menu: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_MENU_START:
      return loadMenuStart(state, action);
    case actionTypes.LOAD_MENU_SUCCESS:
      return loadMenuSuccess(state, action);
    case actionTypes.LOAD_MENU_FAIL:
      return loadMenuFail(state, action);
    default:
      return state;
  }
}

const loadMenuStart = (state, action) => {
  return {
    ...state,
    loading: true,
    error: null,
  };
}

const loadMenuSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    menu: action.menu,
  };
}

const loadMenuFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: true,
  };
}

export default reducer;
