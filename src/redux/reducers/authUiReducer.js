import { types } from '../types/types';

export const authUiReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case types.loading:
      return { loading: action.payload };

    default:
      return state;
  }
};
