import { extractError } from '../../helpers/errorHelper';
import { transformObjectToIngredientQuantity } from '../../helpers/ingredientValidationHelper';

import * as actionTypes from './actionTypes';
import axios from 'axios';
import * as flashMessageCreators from './flashMessageCreators';

export const loadShopping = (token) => {
  return dispatch => {
    dispatch(loadShoppingStart());

    axios.get('https://crepe-party.firebaseio.com/orders.json?auth=' + token)
      .then(ordersResponse => {
        axios.get('https://crepe-party.firebaseio.com/ingredients.json')
          .then(ingredientsResponse => {
              let orderIds = [];

              if (null !== ordersResponse.data) {
                orderIds = Object.keys(ordersResponse.data);
              }

              let quantities = {};

              orderIds.forEach(orderId => {
                const crepes = ordersResponse.data[orderId].crepes;
                if (undefined !== crepes) {
                  Object.keys(crepes).forEach(crepeUniqueId => {
                    const ingredients = crepes[crepeUniqueId].ingredients;

                    if (undefined !== ingredients) {
                      Object.keys(ingredients).forEach(ingredientId => {
                        if (undefined !== quantities[ingredientId]) {
                          quantities[ingredientId] += parseInt(ingredients[ingredientId], 10);
                        } else {
                          quantities[ingredientId] = parseInt(ingredients[ingredientId], 10);
                        }
                      });
                    }
                  });
                }
              });

              let realQuantities = {};

              Object.keys(quantities).forEach(ingredientId => {
                if (undefined !== ingredientsResponse.data[ingredientId]) {
                  const ingredient = ingredientsResponse.data[ingredientId];
                  realQuantities[ingredient.name] = transformObjectToIngredientQuantity({
                    type: ingredient.quantity.type,
                    value: ingredient.quantity.value * quantities[ingredientId]
                  });
                }
              });

              dispatch(loadShoppingSuccess(realQuantities));
          })
          .catch(error => {
            dispatch(loadShoppingFail());
            dispatch(flashMessageCreators.setFlashMessage(
              'error',
              'Unable to load ingredients.' + extractError(error)
            ));
          })
      })
      .catch(error => {
        dispatch(loadShoppingFail());
        dispatch(flashMessageCreators.setFlashMessage(
          'error',
          'Unable to load orders.' + extractError(error)
        ));
      });
  }
}

const loadShoppingStart = () => {
  return {
    type: actionTypes.ADMIN_LOAD_SHOPPING_START,
  };
}

const loadShoppingSuccess = (shoppingList) => {
  return {
    type: actionTypes.ADMIN_LOAD_SHOPPING_SUCCESS,
    shoppingList: shoppingList
  };
}

const loadShoppingFail = () => {
  return {
    type: actionTypes.ADMIN_LOAD_SHOPPING_FAIL,
  };
}
