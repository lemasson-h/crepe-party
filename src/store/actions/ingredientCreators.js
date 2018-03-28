import * as actionTypes from './actionTypes';
import axios from 'axios';

export const loadIngredients = () => {
  return (dispatch, getState) => {
    dispatch(loadIngredientsStart());

    const state = getState();

    if (state.ingredients.ingredients.length > 0 && state.ingredients.loadedAt + 600000  > Date.now()) {
        /*
         * We need to change redux state even if we don't really load the data
         * As some actions from component depends on it to finish to properly be mounted
         * But do that on the componentDidUpdate as some action are asynchrone on componentDidMount
         * And make sure componentDidUpdate is trigger, we need to change the state even when loaded does nothing.
         *
         * Additionally, we need to dispatch the SUCCESS action as a promise
         * Else redux will operate too fast the start and success
         * And not considerates that there was a change
         * And components depending on this operation won't be re-rendered
         */
        const triggerLoadLater = new Promise((resolve, reject) => {
          setTimeout(resolve, 100);
        })

        triggerLoadLater.then(() => dispatch(loadIngredientsSuccess(state.ingredients.ingredients)));

      return ;
    }

    axios.get('https://crepe-party.firebaseio.com/ingredients.json')
      .then(response => {
        let ingredients = [];

        if (null !== response.data) {
          ingredients = Object.keys(response.data)
            .map(ingredientId => {
              return {
                ...response.data[ingredientId],
                id: ingredientId,
              };
            });
        }

        dispatch(loadIngredientsSuccess(ingredients));
      })
      .catch(error => {
          dispatch(loadIngredientsFail());
      });
  }
}

export const loadIngredientsExpires = () => {
  return {
    type: actionTypes.LOAD_INGREDIENTS_EXPIRES,
  }
}

const loadIngredientsStart = () => {
  return {
    type: actionTypes.LOAD_INGREDIENTS_START,
  };
}

const loadIngredientsSuccess = (ingredients) => {
  return {
    type: actionTypes.LOAD_INGREDIENTS_SUCCESS,
    ingredients: ingredients,
    loadedAt: Date.now(),
  };
}

const loadIngredientsFail = () => {
  return {
    type: actionTypes.LOAD_INGREDIENTS_FAIL,
  };
}
