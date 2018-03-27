import * as actionTypes from './actionTypes';
import * as authCreators from './authCreators';
import Axios from 'axios';
import * as flashMessageCreators from './flashMessageCreators';
import * as redirectCreators from './redirectCreators';

export const addCrepeToOrder = (crepe) => {
  return dispatch => {
    dispatch(internalAddCrepeToOrder(crepe));
    dispatch(flashMessageCreators.setFlashMessage(
        'success',
        'Crepe ' + crepe.name +  (undefined !== crepe.uniqueId ? ' edited.' : ' added.'),
        5000
    ));
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
    dispatch(flashMessageCreators.setFlashMessage(
        'success',
        'Crepe removed.',
        5000
    ));
  };
}

const internalRemoveCrepeToOrder = (uniqueId) => {
  return {
    type: actionTypes.REMOVE_CREPE_TO_ORDER,
    uniqueId: uniqueId,
  };
}

export const resetRequestSendOrder = () => {
  return {
    type: actionTypes.ORDER_RESET_REQUEST_SEND_ORDER,
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

    const crepesWithUniqueId = {};

    orders.forEach(order => {
      crepesWithUniqueId[order.uniqueId] = order;
    });

    const updatedOrders = {
      crepes: crepesWithUniqueId,
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
        dispatch(flashMessageCreators.setFlashMessage(
          'success',
          'Order submitted.',
          5000
        ));
      })
      .catch(error => {
        dispatch(sendOrderFail());
        dispatch(flashMessageCreators.setFlashMessage(
          'error',
          'Unable to submit the order.',
          5000
        ));
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

export const loadOrder = (token, userId) => {
  return dispatch => {
    dispatch(loadOrderStart());

    Axios.get(
      'https://crepe-party.firebaseio.com/orders.json?auth='
      + token
      + '&orderBy="userId"&equalTo="'
      + userId
      + '"'
    )
      .then(response => {
        const firstKey = Object.keys(response.data).shift();
        let orders = [];
        let orderId = undefined;

        if (firstKey !== undefined) {
          orderId = firstKey;
          orders = Object.keys(response.data[orderId].crepes).map(crepeUniqueId => {
            return response.data[orderId].crepes[crepeUniqueId];
          });
        }

        dispatch(loadOrderSuccess(orderId, orders));
      })
      .catch(error => {
        dispatch(loadOrderFail());
        dispatch(flashMessageCreators.setFlashMessage(
          'error',
          'Unable to load your orders.',
          5000
        ));
      });
  }
}

const loadOrderStart = () => {
  return {
    type: actionTypes.LOAD_ORDER_START,
  };
}

const loadOrderSuccess = (orderId, orders) => {
  return {
    type: actionTypes.LOAD_ORDER_SUCCESS,
    orderId: orderId,
    orders: orders,
  };
}

const loadOrderFail = () => {
  return {
    type: actionTypes.LOAD_ORDER_FAIL,
  };
}
