import * as actionTypes from './actionTypes';

export const addCrepeToOrder = (crepe) => {
  return {
    type: actionTypes.ADD_CREPE_TO_ORDER,
    crepe: crepe,
  };
}

export const removeCrepeToOrder = (uniqueId) => {
  return {
    type: actionTypes.REMOVE_CREPE_TO_ORDER,
    uniqueId: uniqueId,
  };
}

export const resetFlashMessageForOrder = () => {
  return {
    type: actionTypes.RESET_FLASH_MESSAGE_FOR_ORDER,
  };
}

export const setTimerFlashMessageForOrder = (timer) => {
  return {
    type: actionTypes.TIMER_FLASH_MESSAGE_FOR_ORDER,
    timer: timer,
  };
}
