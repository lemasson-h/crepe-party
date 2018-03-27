import * as actionTypes from '../actions/actionTypes';

const initialState = {
  message: undefined,
  timer: undefined,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_FLASH_MESSAGE:
      return setFlashMessage(state, action);
    case actionTypes.RESET_FLASH_MESSAGE:
      return resetFlashMessage(state, action);
    default:
      return state;
  }
}

const clearTimer = (state) => {
    if (undefined !== state.timer) {
      clearTimeout(state.timer);
    }
}

const setFlashMessage = (state, action) => {
  clearTimer(state);

  return {
    ...state,
    message: {
      type: action.messageType,
      value: action.messageValue,
    },
    timer: action.messageTimer
  };
}

const resetFlashMessage = (state, action) => {
  clearTimer(state);

  return {
    ...state,
    message: undefined,
    timer: undefined
  };
}

export default reducer;
