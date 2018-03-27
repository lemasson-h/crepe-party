import * as actionTypes from './actionTypes';
import axios from 'axios';
import * as flashMessageCreators from './flashMessageCreators';

export const adminResetOrders = (token) => {
  return dispatch => {
    dispatch(resetOrdersStart());

    axios.delete('https://crepe-party.firebaseio.com/orders.json?auth=' + token)
      .then(response => {
        dispatch(flashMessageCreators.setFlashMessage(
          'success',
          'All orders has been reset.'
        ));

        dispatch(resetOrdersFinish());
        dispatch(adminLoadUsers(token));
      })
      .catch(error => {
        let message = '';

        if (error.response !== undefined) {
          message = ' Error: ' + error.response.data.error + '.';
        }

        dispatch(flashMessageCreators.setFlashMessage(
          'error',
          'Unable to reset all orders.' + message
        ));
        dispatch(resetOrdersFinish());
      });
  }
}

export const adminLoadUsers = (token) => {
  return dispatch => {
    dispatch(loadUsersStart());

    axios.get('https://crepe-party.firebaseio.com/users.json?auth=' + token)
      .then(response => {
        axios.get('https://crepe-party.firebaseio.com/orders.json?auth=' + token)
          .then(ordersResponse => {
            let orderIds = [];

            if (ordersResponse.data !== null) {
              orderIds = Object.keys(ordersResponse.data);
            }

            let users = [];
            if (response.data !== null) {
              users = Object.keys(response.data).map(
                userId => {
                  const orderIdx = orderIds.find(orderId => {
                    return ordersResponse.data[orderId].userId === userId;
                  });

                  return {
                    ...response.data[userId],
                    id: userId,
                    crepes: (orderIdx !== undefined ? Object.keys(ordersResponse.data[orderIdx].crepes).length : 0),
                  };
                }
              );
            }

            dispatch(loadUsersSuccess(users));
          })
          .catch(error => {
            dispatch(loadUsersFail());
            dispatch(flashMessageCreators.setFlashMessage(
              'error',
              'Fail to load users\' orders.'
            ));
          });
      })
      .catch(error => {
        dispatch(loadUsersFail());
        dispatch(flashMessageCreators.setFlashMessage(
          'error',
          'Fail to load users.'
        ));
      });
  }
}

const loadUsersStart = () => {
  return {
    type: actionTypes.ADMIN_LOAD_USERS_START,
  };
}

const loadUsersFail = () => {
  return {
    type: actionTypes.ADMIN_LOAD_USERS_FAIL
  };
}

const loadUsersSuccess = (users) => {
    return {
      type: actionTypes.ADMIN_LOAD_USERS_SUCCESS,
      users: users,
    };
}

const resetOrdersStart = () => {
  return {
    type: actionTypes.ADMIN_RESET_ORDERS_START,
  };
}

const resetOrdersFinish = () => {
  return {
    type: actionTypes.ADMIN_RESET_ORDERS_FINISH,
  };
}
