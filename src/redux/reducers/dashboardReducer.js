import { dashboardTypes } from '../types/types';

export const dashboardReducer = (
  state = { usersCount: null, workersCount: null, usersCountsLoading: true },
  action
) => {
  switch (action.type) {
    case dashboardTypes.setUsersCount:
      return { ...state, usersCount: action.payload };
    case dashboardTypes.setWorkersCount:
      return { ...state, workersCount: action.payload };
    case dashboardTypes.setCustomersCount:
      return { ...state, customersCount: action.payload };
    case dashboardTypes.setUsersCountsLoading:
      return { ...state, usersCountsLoading: action.payload };
    case dashboardTypes.setOpportunitiesCount:
      return { ...state, opportunitiesCount: action.payload };
    case dashboardTypes.setOpportunitiesCountLoading:
      return { ...state, opportunitiesCountLoading: action.payload };
    default:
      return state;
  }
};
