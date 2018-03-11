import * as actionTypes from './actionTypes';

export const setGlobalRedirectTo = (redirectTo = undefined) => {
  return {
    type: actionTypes.GLOBAL_REDIRECT_TO,
    redirectTo: redirectTo,
  };
}
