import * as actionTypes from './actionTypes';

export const addCrepeToOrder = (crepe) => {
  return dispatch => {
    dispatch(internalAddCrepeToOrder(crepe));

    dispatch(
      setTimerFlashMessageForOrder(
        setTimeout(() => {
          dispatch(resetFlashMessageForOrder())
        }, 5000)
      )
    );
  };
}

const internalAddCrepeToOrder = (crepe) => {
  return {
    type: actionTypes.ADD_CREPE_TO_ORDER,
    crepe: crepe,
  };
}

export const removeCrepeToOrder = (uniqueId) => {
  return dispatch => {
    dispatch(internalRemoveCrepeToOrder(uniqueId));

    dispatch(
      setTimerFlashMessageForOrder(
        setTimeout(() => {
          dispatch(resetFlashMessageForOrder())
        }, 5000)
      )
    );
  };
}

const internalRemoveCrepeToOrder = (uniqueId) => {
  return {
    type: actionTypes.REMOVE_CREPE_TO_ORDER,
    uniqueId: uniqueId,
  };
}

const resetFlashMessageForOrder = () => {
  return {
    type: actionTypes.RESET_FLASH_MESSAGE_FOR_ORDER,
  };
}

const setTimerFlashMessageForOrder = (timer) => {
  return {
    type: actionTypes.TIMER_FLASH_MESSAGE_FOR_ORDER,
    timer: timer,
  };
}
