import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ingredientsLoading: false,
  ingredientsError: null,
  ingredients: [],
  loadedAt: undefined,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_INGREDIENTS_START:
      return loadIngredientsStart(state, action);
    case actionTypes.LOAD_INGREDIENTS_SUCCESS:
      return loadIngredientsSuccess(state, action);
    case actionTypes.LOAD_INGREDIENTS_FAIL:
      return loadIngredientsFail(state, action);
    default:
      return state;
  }
}

const loadIngredientsStart = (state, action) => {
  return {
    ...state,
    ingredientsLoading: true,
    ingredientsError: null,
    flashMessage: null,
  };
}

const loadIngredientsSuccess = (state, action) => {
  return {
    ...state,
    ingredientsLoading: false,
    ingredients: action.ingredients,
    loadedAt: action.loadedAt,
  };
}

const loadIngredientsFail = (state, action) => {
  return {
    ...state,
    ingredientsLoading: false,
    ingredientsError: true,
  };
}

export default reducer;
