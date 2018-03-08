import * as actionTypes from '../actions/actionTypes';

const initialState = {
  addOrEdit: {
    loading: false,
    error: null,
    finished: false,
    currentElement: {
      id: null,
      name: '',
      quantity: '',
    },
  },
  delete: {
    loading: false,
    error: null,
    finished: false,
  },
  flashMessage: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADMIN_ADD_INGREDIENT_START:
      return addIngredientStart(state, action);
    case actionTypes.ADMIN_ADD_INGREDIENT_SUCCESS:
      return addIngredientSuccess(state, action);
    case actionTypes.ADMIN_ADD_INGREDIENT_FAIL:
      return addIngredientFail(state, action);
    case actionTypes.ADMIN_ADD_INGREDIENT_RESET:
      return addIngredientReset(state, action);
    default:
      return state;
  }
}

const addIngredientStart = (state, action) => {
  return {
    ...state,
    addOrEdit: {
      ...state.addOrEdit,
      loading: true,
      error: false,
      finished: false,
    },
    flashMessage: null,
  };
}

const addIngredientSuccess = (state, action) => {
  return {
    ...state,
    addOrEdit: {
      ...state.addOrEdit,
      loading: false,
      finished: true,
    },
    flashMessage: action.flashMessage,
  };
};

const addIngredientFail = (state, action) => {
  return {
    ...state,
    addOrEdit: {
      ...state.addOrEdit,
      loading: false,
      error: true,
    },
  };
}

const addIngredientReset = (state, action) => {
  return {
    ...state,
    addOrEdit: {
      ...state.addOrEdit,
      loading: false,
      finished: false,
      error: null,
      currentElement: {
        id: null,
        name: '',
        quantity: '',
      },
    },
    flashMessage: null,
  };
}

export default reducer;
