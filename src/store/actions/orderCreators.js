import * as actionTypes from './actionTypes';
import * as authCreators from './authCreators';
import * as redirectCreators from './redirectCreators';
import Axios from 'axios';

const resetFlashMessage = (dispatch, time) => {
  dispatch(
    setTimerFlashMessageForOrder(
      setTimeout(() => {
        dispatch(resetFlashMessageForOrder())
      }, time)
    )
  );
}

export const addCrepeToOrder = (crepe) => {
  return dispatch => {
    dispatch(internalAddCrepeToOrder(crepe));

    resetFlashMessage(dispatch, 5000);
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

    resetFlashMessage(dispatch, 5000);
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

const requestSendOrder = () => {
  return {
    type: actionTypes.ORDER_REQUEST_SEND_ORDER,
  };
}

export const sendOrder = (token, userId, orderId, orders) => {
  return dispatch => {
    if (null === token) {
      dispatch(requestSendOrder());
      dispatch(authCreators.setRedirectToAfterLogin('/'));
      dispatch(redirectCreators.setGlobalRedirectTo('/login'));

      return ;
    }

    dispatch(sendOrderStart());

    const updatedOrders = {
      crepes: [
        ...orders,
      ],
      userId: userId,
    };

    let promise = undefined;
    if (undefined !== orderId) {
      promise = Axios.put(
        'https://crepe-party.firebaseio.com/orders/' + orderId +'.json?auth=' + token,
        updatedOrders
      );
    } else {
      promise = Axios.post(
        'https://crepe-party.firebaseio.com/orders.json?auth=' + token,
        updatedOrders
      );
    }

    promise.then(response => {
        dispatch(sendOrderSuccess(undefined !== orderId ? orderId : response.data.name));
        resetFlashMessage(dispatch, 5000);
      })
      .catch(error => {
        dispatch(sendOrderFail());
        resetFlashMessage(dispatch, 5000);
      })
  }
}

const sendOrderStart = () => {
  return {
    type: actionTypes.ORDER_SEND_ORDER_START,
  };
}

const sendOrderSuccess = (orderId) => {
  return {
    type: actionTypes.ORDER_SEND_ORDER_SUCCESS,
    orderId: orderId,
  };
}

const sendOrderFail = () => {
  return {
    type: actionTypes.ORDER_SEND_ORDER_FAIL,
  };
}

export const resetOrderOnLogout = () => {
  return {
    type: actionTypes.ORDER_RESET_ON_LOGOUT,
  };
}
