import * as actionTypes from '../actions/actionTypes';

const initialState = {
  crepe: {
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
    }
  },
  ingredient: {
    add: {
      loading: false,
      error: null,
      finished: false,
    },
    delete: {
      loading: false,
      error: null,
      finished: false,
    }
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
    case actionTypes.ADMIN_DELETE_CREPE_START:
      return deleteCrepeStart(state, action);
    case actionTypes.ADMIN_DELETE_CREPE_SUCCESS:
      return deleteCrepeSuccess(state, action);
    case actionTypes.ADMIN_DELETE_CREPE_FAIL:
      return deleteCrepeFail(state, action);
    case actionTypes.ADMIN_DELETE_CREPE_RESET:
      return deleteCrepeReset(state, action);
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

const addCrepeStart = (state, action) => {
  return {
    ...state,
    crepe: {
      ...state.crepe,
      addOrEdit: {
        ...state.crepe.addOrEdit,
        loading: true,
        error: false,
        finished: false,
      }
    },
    flashMessage: null,
  };
}

const addCrepeSuccess = (state, action) => {
  return {
    ...state,
    crepe: {
      ...state.crepe,
      addOrEdit: {
        ...state.crepe.addOrEdit,
        loading: false,
        finished: true,
      }
    },
    flashMessage: action.flashMessage,
  };
};

const addCrepeFail = (state, action) => {
  return {
    ...state,
    crepe: {
      ...state.crepe,
      addOrEdit: {
        ...state.crepe.addOrEdit,
        loading: false,
        error: true,
      }
    }
  };
}

const addCrepeReset = (state, action) => {
  return {
    ...state,
    crepe: {
      ...state.crepe,
      addOrEdit: {
        ...state.crepe.addOrEdit,
        loading: false,
        finished: false,
        error: null,
        currentElement: {
          id: null,
          name: '',
          ingredients: {},
        },
      },
    },
    flashMessage: null,
  }
}

const deleteCrepeStart = (state, action) => {
  return {
    ...state,
    crepe: {
      ...state.crepe,
      delete: {
        ...state.crepe.delete,
        loading: true,
        error: false,
        finished: false,
      }
    },
    flashMessage: null,
  };
}

const deleteCrepeSuccess = (state, action) => {
  return {
    ...state,
    crepe: {
      ...state.crepe,
      delete: {
        ...state.crepe.delete,
        loading: false,
        finished: true,
      }
    },
    flashMessage: action.flashMessage,
  };
}

const deleteCrepeFail = (state, action) => {
  return {
    ...state,
    crepe: {
      ...state.crepe,
      delete: {
        ...state.crepe.delete,
        loading: false,
        error: true,
      }
    }
  };
}

const deleteCrepeReset = (state, action) => {
  return {
    ...state,
    crepe: {
      ...state.crepe,
      delete: {
        ...state.crepe.delete,
        loading: false,
        finished: false,
        error: null,
      }
    },
    flashMessage: null,
  }
}

const addIngredientStart = (state, action) => {
  return {
    ...state,
    ingredient: {
      ...state.ingredient,
      add: {
        ...state.ingredient.add,
        loading: true,
        error: false,
        finished: false,
      },
    },
    flashMessage: null,
  };
}

const addIngredientSuccess = (state, action) => {
  return {
    ...state,
    ingredient: {
      ...state.ingredient,
      add: {
        ...state.ingredient.add,
        loading: false,
        finished: true,
      },
    },
    flashMessage: action.flashMessage,
  };
};

const addIngredientFail = (state, action) => {
  return {
    ...state,
    ingredient: {
      ...state.ingredient,
      add: {
        ...state.ingredient.add,
        loading: false,
        error: true,
      },
    },
  };
}

const addIngredientReset = (state, action) => {
  return {
    ...state,
    ingredient: {
      ...state.ingredient,
      add: {
        ...state.ingredient.add,
        loading: false,
        finished: false,
        error: null,
      },
    },
    flashMessage: null,
  }
}

const crepeNameChanged = (state, action) => {
  return {
    ...state,
    crepe: {
      ...state.crepe,
      addOrEdit:{
        ...state.crepe.addOrEdit,
        currentElement: {
          ...state.crepe.addOrEdit.currentElement,
          name: action.name,
        },
      },
    },
  };
}

const addIngredientToCrepe = (state, action) => {
    if (undefined === state.crepe.addOrEdit.currentElement.ingredients[action.ingredientId]) {
      return state;
    }

    return {
      ...state,
      crepe: {
        ...state.crepe,
        addOrEdit:{
          ...state.crepe.addOrEdit,
          currentElement: {
            ...state.crepe.addOrEdit.currentElement,
            ingredients: {
              ...state.crepe.addOrEdit.currentElement.ingredients,
              [action.ingredientId]: state.crepe.addOrEdit.currentElement.ingredients[action.ingredientId] + 1,
            },
          },
        },
      },
    };
}

const removeIngredientToCrepe = (state, action) => {
  let quantity = 0;

  if (undefined === state.crepe.addOrEdit.currentElement.ingredients[action.ingredientId]
    || state.crepe.addOrEdit.currentElement.ingredients[action.ingredientId] < 1
  ) {
    quantity = 0;
  } else {
    quantity = state.crepe.addOrEdit.currentElement.ingredients[action.ingredientId] - 1;
  }

  return {
    ...state,
    crepe: {
      ...state.crepe,
      addOrEdit:{
        ...state.crepe.addOrEdit,
        currentElement: {
          ...state.crepe.addOrEdit.currentElement,
          ingredients: {
            ...state.crepe.addOrEdit.currentElement.ingredients,
            [action.ingredientId]: quantity,
          },
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
    crepe: {
      ...state.crepe,
      addOrEdit:{
        ...state.crepe.addOrEdit,
        currentElement: {
          ...state.crepe.addOrEdit.currentElement,
          ingredients: updatedIngredients,
        },
      },
    },
  };
}

export default reducer;
