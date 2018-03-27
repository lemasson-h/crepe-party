import * as actionTypes from './actionTypes';

export const setFlashMessage = (messageType, messageValue, time) => {
  return dispatch => {
    dispatch(
      internalSetFlashMessage(
        messageType,
        messageValue,
        setTimeout(() => {
          dispatch(resetFlashMessage())
        }, time)
      )
    );
  }
}

export const resetFlashMessage = () => {
  return {
    type: actionTypes.RESET_FLASH_MESSAGE,
  };
}

const internalSetFlashMessage = (messageType, messageValue, messageTimer) => {
  return {
    type: actionTypes.SET_FLASH_MESSAGE,
    messageType: messageType,
    messageValue: messageValue,
    messageTimer: messageTimer,
  };
}
