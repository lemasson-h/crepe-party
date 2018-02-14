import * as actionTypes from '../actions/actionTypes';

const initialState = {
  add_loading: false,
  add_error: null,
  add_finished: false,
  delete_loading: false,
  delete_error: null,
  delete_finished: false,
  flashMessage: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADMIN_ADD_CREPE_START:
      return addCrepeStart(state, action);
    case actionTypes.ADMIN_ADD_CREPE_SUCCESS:
      return addCrepeSuccess(state, action);
    case actionTypes.ADMIN_ADD_CREPE_FAIL:
      return addCrepeFail(state, action);
    case actionTypes.ADMIN_ADD_CREPE_RESET:
      return addCrepeReset(state, action);
    case actionTypes.ADMIN_DELETE_CREPE_START:
      return deleteCrepeStart(state, action);
    case actionTypes.ADMIN_DELETE_CREPE_SUCCESS:
      return deleteCrepeSuccess(state, action);
    case actionTypes.ADMIN_DELETE_CREPE_FAIL:
      return deleteCrepeFail(state, action);
    case actionTypes.ADMIN_DELETE_CREPE_RESET:
      return deleteCrepeReset(state, action);
    default:
      return state;
  }
}

const addCrepeStart = (state, action) => {
  return {
    ...state,
    add_loading: true,
    add_error: false,
    add_finished: false,
    flashMessage: null,
  };
}

const addCrepeSuccess = (state, action) => {
  return {
    ...state,
    add_loading: false,
    add_finished: true,
    flashMessage: action.flashMessage,
  };
};

const addCrepeFail = (state, action) => {
  return {
    ...state,
    add_loading: false,
    add_error: true,
  };
}

const addCrepeReset = (state, action) => {
  return {
    ...state,
    add_loading: false,
    add_finished: false,
    add_error: null,
    flashMessage: null,
  }
}

const deleteCrepeStart = (state, action) => {
  return {
    ...state,
    delete_loading: true,
    delete_error: false,
    delete_finished: false,
    flashMessage: null,
  };
}

const deleteCrepeSuccess = (state, action) => {
  return {
    ...state,
    delete_loading: false,
    delete_finished: true,
    flashMessage: action.flashMessage,
  };
}

const deleteCrepeFail = (state, action) => {
  return {
    ...state,
    delete_loading: false,
    delete_error: true,
  };
}

const deleteCrepeReset = (state, action) => {
  return {
    ...state,
    delete_loading: false,
    delete_finished: false,
    delete_error: null,
    flashMessage: null,
  }
}

export default reducer;
