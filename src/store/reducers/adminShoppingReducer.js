import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  list: {},
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADMIN_LOAD_SHOPPING_START:
      return loadShoppingStart(state, action);
    case actionTypes.ADMIN_LOAD_SHOPPING_SUCCESS:
      return loadShoppingSuccess(state, action);
    case actionTypes.ADMIN_LOAD_SHOPPING_FAIL:
      return loadShoppingFail(state, action);
    default:
      return state;
  }
}

const loadShoppingStart = (state, action) => {
  return {
    ...state,
    loading: true,
    list: {},
  };
}

const loadShoppingSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    list: action.shoppingList,
  };
}

const loadShoppingFail = (state, action) => {
  return {
    ...state,
    loading: false,
  };
}

export default reducer;
