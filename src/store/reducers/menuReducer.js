import * as actionTypes from '../actions/actionTypes';

const initialState = {
  menu_loading: false,
  menu_error: null,
  add_loading: false,
  add_error: null,
  add_finished: false,
  delete_loading: false,
  delete_error: null,
  delete_finished: false,
  menu: [],
  flashMessage: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_MENU_START:
      return loadMenuStart(state, action);
    case actionTypes.LOAD_MENU_SUCCESS:
      return loadMenuSuccess(state, action);
    case actionTypes.LOAD_MENU_FAIL:
      return loadMenuFail(state, action);
    case actionTypes.ADD_CREPE_TO_MENU_START:
      return addCrepeToMenuStart(state, action);
    case actionTypes.ADD_CREPE_TO_MENU_SUCCESS:
      return addCrepeToMenuSuccess(state, action);
    case actionTypes.ADD_CREPE_TO_MENU_FAIL:
      return addCrepeToMenuFail(state, action);
    case actionTypes.DELETE_CREPE_FROM_MENU_START:
      return deleteCrepeFromMenuStart(state, action);
    case actionTypes.DELETE_CREPE_FROM_MENU_SUCCESS:
      return deleteCrepeFromMenuSuccess(state, action);
    case actionTypes.DELETE_CREPE_FROM_MENU_FAIL:
      return deleteCrepeFromMenuFail(state, action);
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

const addCrepeToMenuStart = (state, action) => {
  return {
    ...state,
    add_loading: true,
    add_error: false,
    add_finished: false,
    flashMessage: null,
  };
}

const addCrepeToMenuSuccess = (state, action) => {
  return {
    ...state,
    add_loading: false,
    add_finished: true,
    flashMessage: action.flashMessage,
  };
};

const addCrepeToMenuFail = (state, action) => {
  return {
    ...state,
    add_loading: false,
    add_error: true,
  };
}

const deleteCrepeFromMenuStart = (state, action) => {
  return {
    ...state,
    delete_loading: true,
    delete_error: false,
    delete_finished: false,
    flashMessage: null,
  };
}

const deleteCrepeFromMenuSuccess = (state, action) => {
  return {
    ...state,
    delete_loading: false,
    delete_finished: true,
    flashMessage: action.flashMessage,
  };
}

const deleteCrepeFromMenuFail = (state, action) => {
  return {
    ...state,
    delete_loading: false,
    delete_error: true,
  };
}

export default reducer;
