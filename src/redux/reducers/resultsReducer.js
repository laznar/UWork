import { types } from '../types/types';

export const resultsReducer = (
  state = { results: [], loading: true },
  action
) => {
  switch (action.type) {
    case types.setResultsLoading:
      return { ...state, loading: action.payload };
    case types.setResults:
      return { ...state, results: action.payload };
    default:
      return state;
  }
};
