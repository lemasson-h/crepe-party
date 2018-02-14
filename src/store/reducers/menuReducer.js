import * as actionTypes from '../actions/actionTypes';

const initialState = {
  menu_loading: false,
  menu_error: null,
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
    menu_loading: true,
    menu_error: null,
    flashMessage: null,
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
    menu_loading: false,
    menu_error: true,
  };
}

export default reducer;
