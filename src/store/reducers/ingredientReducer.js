import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
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
    case actionTypes.LOAD_INGREDIENTS_EXPIRES:
      return loadIngredientsExpires(state, action);
    default:
      return state;
  }
}

const loadIngredientsStart = (state, action) => {
  return {
    ...state,
    loading: true,
    ingredientsError: null,
  };
}

const loadIngredientsSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    ingredients: action.ingredients,
    loadedAt: action.loadedAt,
  };
}

const loadIngredientsFail = (state, action) => {
  return {
    ...state,
    loading: false,
    ingredientsError: true,
  };
}

const loadIngredientsExpires = (state, action) => {
  return {
    ...state,
    loadedAt: 0,
  };
}

export default reducer;
