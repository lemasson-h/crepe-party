import * as actionTypes from '../actions/actionTypes';

const initialState = {
  crepe: {
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
      add: {
        ...state.crepe.add,
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
      add: {
        ...state.crepe.add,
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
      add: {
        ...state.crepe.add,
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
      add: {
        ...state.crepe.add,
        loading: false,
        finished: false,
        error: null,
      }
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

export default reducer;
