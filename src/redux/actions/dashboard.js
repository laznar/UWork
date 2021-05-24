import { db } from '../../firebase';
import { dashboardTypes } from '../types/types';

// * Users action creators
export const setUsersCount = (usersCount) => ({
  type: dashboardTypes.setUsersCount,
  payload: usersCount
});

export const setWorkersCount = (workersCount) => ({
  type: dashboardTypes.setWorkersCount,
  payload: workersCount
});

export const setCustomersCount = (workersCount) => ({
  type: dashboardTypes.setCustomersCount,
  payload: workersCount
});

export const setUsersCountsLoading = (usersCountloading) => ({
  type: dashboardTypes.setUsersCountsLoading,
  payload: usersCountloading
});

// * Opportunities action creators
export const setOpportunitiesCount = (opportunitiesCount) => ({
  type: dashboardTypes.setOpportunitiesCount,
  payload: opportunitiesCount
});

export const setOpportunitiesCountLoading = (opportunitiesCountLoading) => ({
  type: dashboardTypes.setOpportunitiesCountLoading,
  payload: opportunitiesCountLoading
});

export const startFetchUsersCounts = () => {
  return async (dispatch) => {
    dispatch(setUsersCountsLoading(true));

    try {
      const usersRef = db.collection('users');
      const usersSnap = await usersRef.get();
      const docs = usersSnap.docs;
      dispatch(setUsersCount(docs.length));
      const workersCount = docs.filter((doc) => doc.data().isWorker).length;
      dispatch(setWorkersCount(workersCount));
      const customersCount = docs.filter((doc) => !doc.data().isWorker).length;
      dispatch(setCustomersCount(customersCount));
    } catch (error) {
      console.error(error);
    }
    dispatch(setUsersCountsLoading(false));
  };
};

export const startFetchOpportunitiesCount = () => {
  return async (dispatch) => {
    dispatch(setOpportunitiesCountLoading(true));
    try {
      const opportunitiesRef = db.collection('opportunities');
      const opportunitiesSnap = await opportunitiesRef.get();
      const docs = opportunitiesSnap.docs;
      dispatch(setOpportunitiesCount(docs.length));
    } catch (error) {
      console.error(error);
    }
    dispatch(setOpportunitiesCountLoading(false));
  };
};
