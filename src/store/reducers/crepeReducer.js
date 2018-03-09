import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: null,
  crepes: [],
  currentCrepe: undefined,
  additionalIngredients: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_CREPES_START:
      return loadCrepesStart(state, action);
    case actionTypes.LOAD_CREPES_SUCCESS:
      return loadCrepesSuccess(state, action);
    case actionTypes.LOAD_CREPES_FAIL:
      return loadCrepesFail(state, action);
    case actionTypes.LOAD_CUSTOMIZED_CREPE:
      return loadCustomizedCrepe(state, action);
    case actionTypes.RESET_CUSTOMIZED_CREPE:
      return resetCustomizedCrepe(state, action);
    default:
      return state;
  }
}

const loadCrepesStart = (state, action) => {
  return {
    ...state,
    loading: true,
    error: null,
    flashMessage: null,
  };
}

const loadCrepesSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    crepes: action.crepes,
  };
}

const loadCrepesFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: true,
  };
}

const loadCustomizedCrepe = (state, action) => {
  const ingredientIds = Object.keys(action.crepe.ingredients);
  const additionalIngredients = action.ingredients
    .filter(ingredient => {
      const exists = ingredientIds.find(id => {
        return id === ingredient.id;
      });

      return !exists;
    })
    .map(ingredient => {
      //Clone it to stay immutable
      return {
        ...ingredient
      };
    });

  return {
    ...state,
    currentCrepe: {
      ...action.crepe,
      ingredients: {
        ...action.crepe.ingredients,
      },
    },
    additionalIngredients: [
      ...additionalIngredients,
    ]
  };
}

const resetCustomizedCrepe = (state, action) => {
  return {
    ...state,
    currentCrepe: undefined,
    additionalIngredients: [],
  };
}

export default reducer;
