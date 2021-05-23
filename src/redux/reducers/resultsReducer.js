import { types } from '../types/types';

export const resultsReducer = (
  state = { results: [], loading: true, currentService: null },
  action
) => {
  switch (action.type) {
    case types.setResultsLoading:
      return { ...state, loading: action.payload };
    case types.setResults:
      return {
        ...state,
        results: action.payload.results,
        currentService: action.payload.currentService
      };
    default:
      return state;
  }
};
