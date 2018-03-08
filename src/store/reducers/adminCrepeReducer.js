import * as actionTypes from '../actions/actionTypes';

const initialState = {
  addOrEdit: {
    loading: false,
    error: null,
    finished: false,
    currentElement: {
      id: null,
      name: '',
      ingredients: {},
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
    case actionTypes.ADMIN_ADD_CREPE_START:
      return addCrepeStart(state, action);
    case actionTypes.ADMIN_ADD_CREPE_SUCCESS:
      return addCrepeSuccess(state, action);
    case actionTypes.ADMIN_ADD_CREPE_FAIL:
      return addCrepeFail(state, action);
    case actionTypes.ADMIN_ADD_CREPE_RESET:
      return addCrepeReset(state, action);
    case actionTypes.ADMIN_CREPE_NAME_CHANGED:
      return crepeNameChanged(state, action);
    case actionTypes.ADMIN_ADD_INGREDIENT_TO_CREPE:
      return addIngredientToCrepe(state, action);
    case actionTypes.ADMIN_REMOVE_INGREDIENT_TO_CREPE:
      return removeIngredientToCrepe(state, action);
    case actionTypes.ADMIN_INIT_INGREDIENTS_TO_CREPE:
      return initIngredientsToCrepe(state, action);
    case actionTypes.ADMIN_LOAD_CREPE_START:
      return loadCrepeStart(state, action);
    case actionTypes.ADMIN_LOAD_CREPE_SUCCESS:
      return loadCrepeSuccess(state, action);
    case actionTypes.ADMIN_LOAD_CREPE_FAIL:
      return loadCrepeFail(state, action);
    case actionTypes.ADMIN_SYNCHRO_INGREDIENTS_TO_CREPE:
      return synchroIngredientsToCrepe(state, action);
    case actionTypes.ADMIN_EDIT_CREPE_START:
      return editCrepeStart(state, action);
    case actionTypes.ADMIN_EDIT_CREPE_SUCCESS:
      return editCrepeSuccess(state, action);
    case actionTypes.ADMIN_EDIT_CREPE_FAIL:
      return editCrepeFail(state, action);
    case actionTypes.ADMIN_DELETE_CREPE_START:
      return deleteCrepeStart(state, action);
    case actionTypes.ADMIN_DELETE_CREPE_SUCCESS:
      return deleteCrepeSuccess(state, action);
    case actionTypes.ADMIN_DELETE_CREPE_FAIL:
      return deleteCrepeFail(state, action);
    case actionTypes.ADMIN_DELETE_CREPE_RESET:
      return deleteCrepeReset(state, action);
    default:
      return state;
  }
}

const addCrepeStart = (state, action) => {
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

const addCrepeSuccess = (state, action) => {
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

const addCrepeFail = (state, action) => {
  return {
    ...state,
    addOrEdit: {
      ...state.addOrEdit,
      loading: false,
      error: true,
    }
  };
}

const addCrepeReset = (state, action) => {
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
        ingredients: {},
      },
    },
    flashMessage: null,
  }
}

const deleteCrepeStart = (state, action) => {
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

const deleteCrepeSuccess = (state, action) => {
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

const deleteCrepeFail = (state, action) => {
  return {
    ...state,
    delete: {
      ...state.delete,
      loading: false,
      error: true,
    }
  };
}

const deleteCrepeReset = (state, action) => {
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

const loadCrepeStart = (state, action) => {
  return {
    ...state,
    addOrEdit: {
      ...state.addOrEdit,
      loading: true,
    },
    flashMessage: null,
  };
}

const loadCrepeSuccess = (state, action) => {
  return {
    ...state,
    addOrEdit: {
      ...state.addOrEdit,
      loading: false,
      currentElement: action.crepe,
    }
  };
};

const loadCrepeFail = (state, action) => {
  return {
    ...state,
    addOrEdit: {
      ...state.addOrEdit,
      loading: false,
      error: true,
    }
  };
}

const synchroIngredientsToCrepe = (state, action) => {
  return {
    ...state,
    addOrEdit: {
      ...state.addOrEdit,
      currentElement: {
        ...state.addOrEdit.currentElement,
        ingredients: action.ingredients,
      },
    },
  };
}

const editCrepeStart = (state, action) => {
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

const editCrepeSuccess = (state, action) => {
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

const editCrepeFail = (state, action) => {
  return {
    ...state,
    addOrEdit: {
      ...state.addOrEdit,
      loading: false,
      error: true,
    }
  };
}

const crepeNameChanged = (state, action) => {
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

const addIngredientToCrepe = (state, action) => {
    if (undefined === state.addOrEdit.currentElement.ingredients[action.ingredientId]) {
      return state;
    }

    return {
      ...state,
      addOrEdit:{
        ...state.addOrEdit,
        currentElement: {
          ...state.addOrEdit.currentElement,
          ingredients: {
            ...state.addOrEdit.currentElement.ingredients,
            [action.ingredientId]: state.addOrEdit.currentElement.ingredients[action.ingredientId] + 1,
          },
        },
      },
    };
}

const removeIngredientToCrepe = (state, action) => {
  let quantity = 0;

  if (undefined === state.addOrEdit.currentElement.ingredients[action.ingredientId]
    || state.addOrEdit.currentElement.ingredients[action.ingredientId] < 1
  ) {
    quantity = 0;
  } else {
    quantity = state.addOrEdit.currentElement.ingredients[action.ingredientId] - 1;
  }

  return {
    ...state,
    addOrEdit:{
      ...state.addOrEdit,
      currentElement: {
        ...state.addOrEdit.currentElement,
        ingredients: {
          ...state.addOrEdit.currentElement.ingredients,
          [action.ingredientId]: quantity,
        },
      },
    },
  };
}

const initIngredientsToCrepe = (state, action) => {
  const updatedIngredients = {};

  action.ingredients.forEach(
    ingredient => {
      updatedIngredients[ingredient.id] =  0;
    }
  );

  return {
    ...state,
    addOrEdit:{
      ...state.addOrEdit,
      currentElement: {
        ...state.addOrEdit.currentElement,
        ingredients: updatedIngredients,
      },
    },
  };
}

export default reducer;
