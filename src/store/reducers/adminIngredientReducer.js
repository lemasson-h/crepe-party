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
    //--------------------------------------------------
    case actionTypes.ADMIN_INGREDIENT_NAME_CHANGED:
      return ingredientNameChanged(state, action);
    case actionTypes.ADMIN_INGREDIENT_QUANTITY_CHANGED:
      return ingredientQuantityChanged(state, action);
    case actionTypes.ADMIN_LOAD_INGREDIENT_START:
      return loadIngredientStart(state, action);
    case actionTypes.ADMIN_LOAD_INGREDIENT_SUCCESS:
      return loadIngredientSuccess(state, action);
    case actionTypes.ADMIN_LOAD_INGREDIENT_FAIL:
      return loadIngredientFail(state, action);
    case actionTypes.ADMIN_EDIT_INGREDIENT_START:
      return editIngredientStart(state, action);
    case actionTypes.ADMIN_EDIT_INGREDIENT_SUCCESS:
      return editIngredientSuccess(state, action);
    case actionTypes.ADMIN_EDIT_INGREDIENT_FAIL:
      return editIngredientFail(state, action);
    case actionTypes.ADMIN_DELETE_INGREDIENT_START:
      return deleteIngredientStart(state, action);
    case actionTypes.ADMIN_DELETE_INGREDIENT_SUCCESS:
      return deleteIngredientSuccess(state, action);
    case actionTypes.ADMIN_DELETE_INGREDIENT_FAIL:
      return deleteIngredientFail(state, action);
    case actionTypes.ADMIN_DELETE_INGREDIENT_RESET:
      return deleteIngredientReset(state, action);
    default:
      return state;
  }
}

// Add actions

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

// Delete actions

const deleteIngredientStart = (state, action) => {
  return {
    ...state,
    delete: {
      ...state.delete,
      loading: true,
      error: false,
      finished: false,
    },
    flashMessage: null,
  };
}

const deleteIngredientSuccess = (state, action) => {
  return {
    ...state,
    delete: {
      ...state.delete,
      loading: false,
      finished: true,
    },
    flashMessage: action.flashMessage,
  };
}

const deleteIngredientFail = (state, action) => {
  return {
    ...state,
    delete: {
      ...state.delete,
      loading: false,
      error: true,
    }
  };
}

const deleteIngredientReset = (state, action) => {
  return {
    ...state,
    delete: {
      ...state.delete,
      loading: false,
      finished: false,
      error: null,
    },
    flashMessage: null,
  }
}

// Load actions

const loadIngredientStart = (state, action) => {
  return {
    ...state,
    addOrEdit: {
      ...state.addOrEdit,
      loading: true,
    },
    flashMessage: null,
  };
}

const loadIngredientSuccess = (state, action) => {
  return {
    ...state,
    addOrEdit: {
      ...state.addOrEdit,
      loading: false,
      currentElement: action.crepe,
    }
  };
};

const loadIngredientFail = (state, action) => {
  return {
    ...state,
    addOrEdit: {
      ...state.addOrEdit,
      loading: false,
      error: true,
    }
  };
}

// Edit actions

const editIngredientStart = (state, action) => {
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

const editIngredientSuccess = (state, action) => {
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

const editIngredientFail = (state, action) => {
  return {
    ...state,
    addOrEdit: {
      ...state.addOrEdit,
      loading: false,
      error: true,
    }
  };
}

// Form actions

const ingredientNameChanged = (state, action) => {
  return {
    ...state,
    addOrEdit:{
      ...state.addOrEdit,
      currentElement: {
        ...state.addOrEdit.currentElement,
        name: action.name,
      },
    },
  };
}

const ingredientQuantityChanged = (state, action) => {
  return {
    ...state,
    addOrEdit:{
      ...state.addOrEdit,
      currentElement: {
        ...state.addOrEdit.currentElement,
        quantity: action.quantity,
      },
    },
  };
}

export default reducer;
