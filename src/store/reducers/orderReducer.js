import uuid from 'uuid/v1';

import * as actionTypes from '../actions/actionTypes';
import { findKeyCrepeInOrder, removeOrderFromOrders } from '../../helpers/crepeOrderHelper';

const initialState = {
  orderId: undefined,
  orders: [],
  loadingSend: false,
  loadingOrder: false,
  submitRequested: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_CREPE_TO_ORDER:
      return addCrepe(state, action);
    case actionTypes.REMOVE_CREPE_TO_ORDER:
      return removeCrepe(state, action);
    case actionTypes.ORDER_REQUEST_SEND_ORDER:
      return requestSendOrder(state, action);
    case actionTypes.ORDER_RESET_REQUEST_SEND_ORDER:
      return resetRequestSendOrder(state, action);
    case actionTypes.ORDER_SEND_ORDER_START:
      return sendOrderStart(state, action);
    case actionTypes.ORDER_SEND_ORDER_SUCCESS:
      return sendOrderSuccess(state, action);
    case actionTypes.ORDER_SEND_ORDER_FAIL:
      return sendOrderFail(state, action);
    case actionTypes.ORDER_RESET_ON_LOGOUT:
      return resetOnLogout(state, action);
    case actionTypes.LOAD_ORDER_START:
      return loadOrderStart(state, action);
    case actionTypes.LOAD_ORDER_SUCCESS:
      return loadOrderSuccess(state, action);
    case actionTypes.LOAD_ORDER_FAIL:
      return loadOrderFail(state, action);
    default:
      return state;
  }
}

const addCrepe = (state, action) => {
  let uniqueId = action.crepe.uniqueId;

  if (undefined === uniqueId) {
    uniqueId = uuid();
  }

  const updatedCrepe = {
    ...action.crepe,
    uniqueId: uniqueId,
    ingredients: {
      ...action.crepe.ingredients
    },
  };
  const updatedOrders = [
    ...state.orders
  ];

  if (undefined !== action.crepe.uniqueId) {
    const key = findKeyCrepeInOrder(action.crepe.uniqueId, state.orders);

    updatedOrders[key] = updatedCrepe;
  } else {
    updatedOrders.push(updatedCrepe);
  }

  return {
    ...state,
    orders: updatedOrders,
  };
}

const removeCrepe = (state, action) => {
  const updatedOrders = removeOrderFromOrders(action.uniqueId, state.orders);

  return {
    ...state,
    orders: [
      ...updatedOrders,
    ],
  }
}

const requestSendOrder = (state, action) => {
  return {
    ...state,
    submitRequested: true,
  };
}

const resetRequestSendOrder = (state, action) => {
  return {
    ...state,
    submitRequested: false,
  };
}

const sendOrderStart = (state, action) => {
  return {
    ...state,
    loadingSend: true,
    submitRequested: false,
  };
}

const sendOrderSuccess = (state, action) => {
  return {
    ...state,
    loadingSend: false,
    orderId: action.orderId,
  };
}

const sendOrderFail = (state, action) => {
  return {
    ...state,
    loadingSend: false,
  };
}

const resetOnLogout = (state, action) => {
  return {
    orderId: undefined,
    orders: [],
    loadingSend: false,
    submitRequested: false,
  }
}

//Done inside the login
//It will be done during the spinner of the login
//So no additional UI needed
const loadOrderStart = (state, action) => {
  return {
    ...state,
    loadingOrder: true,
  };
}

const loadOrderSuccess = (state, action) => {
  let updatedOrders = state.orders;

  if (action.orderId !== undefined) {
    updatedOrders = action.orders;
  }

  return {
    ...state,
    orderId: action.orderId,
    orders: updatedOrders,
    loadingOrder: false,
  };
}

const loadOrderFail = (state, action) => {
  return {
    ...state,
    loadingOrder: false,
  };
}

export default reducer;
