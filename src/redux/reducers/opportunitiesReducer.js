import { types } from '../types/types';

export const opportunitiesReducer = (
  state = { results: [], loading: true },
  action
) => {
  switch (action.type) {
    case types.setOpportunitiesLoading:
      return { ...state, loading: action.payload };
    case types.setOpportunities:
      return { ...state, results: action.payload };
    default:
      return state;
  }
};
