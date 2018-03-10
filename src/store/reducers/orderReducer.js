import uuid from 'uuid/v1';

import * as actionTypes from '../actions/actionTypes';
import { removeOrderFromOrders } from '../../helpers/crepeOrderHelper';

const initialState = {
  orders: [],
  flashMessage: undefined,
  timer: undefined,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_CREPE_TO_ORDER:
      return addCrepe(state, action);
    case actionTypes.REMOVE_CREPE_TO_ORDER:
      return removeCrepe(state, action);
    case actionTypes.RESET_FLASH_MESSAGE_FOR_ORDER:
      return resetFlashMessage(state, action);
    case actionTypes.TIMER_FLASH_MESSAGE_FOR_ORDER:
      return setTimer(state, action);
    default:
      return state;
  }
}

const addCrepe = (state, action) => {
  const updatedCrepe = {
    ...action.crepe,
    uniqueId: uuid(),
    ingredients: {
      ...action.crepe.ingredients
    },
  };
  const updatedOrders = [
    ...state.orders
  ];

  updatedOrders.push(updatedCrepe);

  if (clearTimeout !== undefined) {
    clearTimeout(state.timer);
  }

  return {
    ...state,
    error: undefined,
    orders: updatedOrders,
    flashMessage: {
      type: 'success',
      message: 'Crepe ' + updatedCrepe.name +  ' added',
    },
    timer: undefined,
  };
}

const removeCrepe = (state, action) => {
  const updatedOrders = removeOrderFromOrders(action.uniqueId, state.orders);

  if (clearTimeout !== undefined) {
    clearTimeout(state.timer);
  }

  return {
    ...state,
    orders: [
      ...updatedOrders,
    ],
    flashMessage: {
      type: 'success',
      message: 'Crepe removed',
    },
    timer: undefined,
  }
}

const resetFlashMessage = (state, action) => {
  return {
    ...state,
    flashMessage: undefined,
  };
}

const setTimer = (state, action) => {
  return {
    ...state,
    timer: action.timer,
  };
}

export default reducer;
