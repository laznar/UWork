import { opportunitiesTypes } from '../types/types';

export const opportunitiesReducer = (
  state = { results: [], loading: true },
  action
) => {
  switch (action.type) {
    case opportunitiesTypes.setOpportunitiesLoading:
      return { ...state, loading: action.payload };
    case opportunitiesTypes.setOpportunities:
      return { ...state, results: action.payload };
    case opportunitiesTypes.updateOpportunity:
      return {
        ...state,
        results: state.results.map((result) => {
          if (result.id === action.payload.id) {
            return { ...result, ...action.payload.data };
          } else {
            return result;
          }
        })
      };
    default:
      return state;
  }
};
