import * as actionCreators from '../actions';
import * as actionTypes from '../actions/actionTypes';
import { calculateCrepeChanges } from '../../helpers/crepeIngredientHelper';

const authorizedCrepeChanges = 3;

const initialState = {
  loading: false,
  error: null,
  crepes: [],
  initialCrepe: undefined,
  currentCrepe: undefined,
  additionalIngredients: [],
  errorModal: undefined,
  crepeChanges: 0,
  currentAdditonalIngredient: undefined,
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
    case actionTypes.MORE_INGREDIENT_FOR_CREPE:
      return moreIngredient(state, action);
    case actionTypes.LESS_INGREDIENT_FOR_CREPE:
      return lessIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT_FOR_CREPE:
      return removeIngredient(state, action);
    case actionTypes.ADD_INGREDIENT_FOR_CREPE:
      return addIngredient(state, action);
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

  const updateState = {
    ...state,
    errorModal: undefined,
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

  if (action.isInit) {
    updateState.initialCrepe = {
      ...action.crepe,
      ingredients: {
        ...action.crepe.ingredients,
      },
    };
  }

  return updateState;
}

const resetCustomizedCrepe = (state, action) => {
  return {
    ...state,
    currentCrepe: undefined,
    initialCrepe: undefined,
    additionalIngredients: [],
    errorModal: undefined,
    crepeChanges: 0,
    currentAdditonalIngredient: undefined,
  };
}

const moreIngredient = (state, action) => {
  let currentQuantity = state.currentCrepe.ingredients[action.ingredientId];

  if (currentQuantity === undefined) {
    return {
      ...state,
      errorModal: 'Unable to interact with this ingredient (Invalid one).',
    };
  }

  const changes = calculateCrepeChanges(state, action.ingredientId, actionTypes.MORE_INGREDIENT_FOR_CREPE);

  if (changes > authorizedCrepeChanges) {
    return {
      ...state,
      errorModal: 'You can\'t customize more your crepe.',
    };
  }

  const updatedIngredients = {
    ...state.currentCrepe.ingredients,
    [action.ingredientId]: currentQuantity + 1,
  };

  return {
    ...state,
    errorModal: undefined,
    currentCrepe: {
      ...state.currentCrepe,
      ingredients: {
        ...updatedIngredients,
      },
    },
    crepeChanges: changes,
  };
}

const lessIngredient = (state, action) => {
  let currentQuantity = state.currentCrepe.ingredients[action.ingredientId];

  if (currentQuantity === undefined) {
    return {
      ...state,
      errorModal: 'Unable to interact with this ingredient (Invalid one).',
    };
  }

  if (currentQuantity === 1) {
    return removeIngredient(state, action);
  }

  const changes = calculateCrepeChanges(state, action.ingredientId, actionTypes.LESS_INGREDIENT_FOR_CREPE);

  if (changes > authorizedCrepeChanges) {
    return {
      ...state,
      errorModal: 'You can\'t customize more your crepe.',
    };
  }

  const updatedIngredients = {
    ...state.currentCrepe.ingredients,
    [action.ingredientId]: currentQuantity - 1,
  };

  return {
    ...state,
    errorModal: undefined,
    currentCrepe: {
      ...state.currentCrepe,
      ingredients: {
        ...updatedIngredients,
      },
    },
    crepeChanges: changes,
  };
}

const removeIngredient = (state, action) => {
  let currentQuantity = state.currentCrepe.ingredients[action.ingredientId];

  if (currentQuantity === undefined) {
    return {
      ...state,
      errorModal: 'Unable to interact with this ingredient (Invalid one).',
    };
  }

  const changes = calculateCrepeChanges(state, action.ingredientId, action.type);

  if (changes > authorizedCrepeChanges) {
    return {
      ...state,
      errorModal: 'You can\'t customize more your crepe.',
    };
  }

  const updatedIngredients = {
    ...state.currentCrepe.ingredients
  };

  delete updatedIngredients[action.ingredientId];

  const updatedCrepe = {
    ...state.currentCrepe,
    ingredients: {
      ...updatedIngredients,
    },
  };

  return {
    ...loadCustomizedCrepe(
      state,
      actionCreators.loadCustomizedCrepe(updatedCrepe, action.ingredients, false)
    ),
    crepeChanges: changes,
  };
}

const addIngredient = (state, action) => {
  const ingredientExist = action.ingredients[action.ingredientId];

  if (ingredientExist === undefined) {
    return {
      ...state,
      errorModal: 'Unable to interact with this ingredient (Invalid one).',
    };
  }

  const changes = calculateCrepeChanges(state, action.ingredientId, action.type);

  if (changes > authorizedCrepeChanges) {
    return {
      ...state,
      errorModal: 'You can\'t customize more your crepe.',
    };
  }

  let currentQuantity = 1;

  if (state.initialCrepe.ingredients[action.ingredientId] !== undefined) {
    currentQuantity = state.initialCrepe.ingredients[action.ingredientId];
  }

  const updatedCrepe = {
    ...state.currentCrepe,
    ingredients: {
      ...state.currentCrepe.ingredients,
      [action.ingredientId]: currentQuantity,
    },
  };

  return {
    ...loadCustomizedCrepe(
      state,
      actionCreators.loadCustomizedCrepe(updatedCrepe, action.ingredients, false)
    ),
    crepeChanges: changes,
    currentAdditonalIngredient: undefined,
  };
}

export default reducer;
