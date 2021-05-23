import { db } from '../../firebase';
import toast from 'react-hot-toast';
import { renderError } from '../../utils/misc';
import { types } from '../types/types';

export const setOpportunitiesLoading = (loading) => ({
  type: types.setOpportunitiesLoading,
  payload: loading
});

export const setOpportunities = (opportunities) => {
  return {
    type: types.setOpportunities,
    payload: opportunities
  };
};

export const startSearchOpportunities = () => {
  return async (dispatch, getState) => {
    dispatch(setOpportunitiesLoading(true));
    try {
      const opportunitiesRef = db.collection('opportunities');
      const query = opportunitiesRef.where(
        'workerUid',
        '==',
        getState().auth.uid
      );

      const querySnapshot = await query.get();
      const opportunities = [];

      for (const doc of querySnapshot.docs) {
        const customerRef = db.collection('users').doc(doc.data().customerUid);

        const customerSnap = await customerRef.get();

        opportunities.push({
          ...doc.data(),
          customerName: customerSnap.data().name,
          customerSurname: customerSnap.data().surname
        });
      }

      dispatch(setOpportunities(opportunities));
    } catch (error) {
      console.error(error);
      toast.error(renderError(error.code));
    }
    dispatch(setOpportunitiesLoading(false));
  };
};
