import { db, firebase } from '../../firebase';
import toast from 'react-hot-toast';
import { renderError } from '../../utils/misc';
import { authUiLoading } from './auth';
import { opportunitiesTypes } from '../types/types';

export const setOpportunitiesLoading = (loading) => ({
  type: opportunitiesTypes.setOpportunitiesLoading,
  payload: loading
});

export const setOpportunities = (opportunities) => {
  return {
    type: opportunitiesTypes.setOpportunities,
    payload: opportunities
  };
};

export const startSearchOpportunities = (proyects = false) => {
  return async (dispatch, getState) => {
    dispatch(setOpportunitiesLoading(true));
    try {
      const isWorker = getState().auth.userData.isWorker;
      const opportunitiesRef = db.collection('opportunities');
      let query;

      if (isWorker) {
        query = proyects
          ? opportunitiesRef
              .where('workerUid', '==', getState().auth.uid)
              .where('rejected', '==', false)
          : opportunitiesRef
              .where('workerUid', '==', getState().auth.uid)
              .where('rejected', '==', false)
              .where('inProgress', '==', false)
              .where('completed', '==', false);
      } else {
        query = opportunitiesRef.where(
          'customerUid',
          '==',
          getState().auth.uid
        );
      }

      const querySnapshot = await query.get();
      const opportunities = [];

      for (const doc of querySnapshot.docs) {
        const customerRef = db.collection('users').doc(doc.data().customerUid);

        const customerSnap = await customerRef.get();

        opportunities.push({
          ...doc.data(),
          id: doc.id,
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

export const startSearchOpportunitiesChats = () => {
  return async (dispatch, getState) => {
    dispatch(setOpportunitiesLoading(true));
    try {
      const opportunitiesRef = db.collection('opportunities');
      const currentUid = getState().auth.uid;
      const customerQuery = opportunitiesRef.where(
        'customerUid',
        '==',
        currentUid
      );
      const workerQuery = opportunitiesRef.where('workerUid', '==', currentUid);

      const customerSnap = await customerQuery.get();
      const workerSnap = await workerQuery.get();

      const opportunities = customerSnap.docs
        .map((doc) => doc.data())
        .concat(workerSnap.docs.map((doc) => doc.data()));
      dispatch(setOpportunities(opportunities));
    } catch (error) {
      console.error(error);
    }
    dispatch(setOpportunitiesLoading(false));
  };
};

export const startCreateOpportunity = (data, workerUid, closeModal, reset) => {
  return async (dispatch) => {
    dispatch(authUiLoading(true));
    try {
      const collectionRef = db.collection('opportunities');
      const customerUid = firebase.auth().currentUser.uid;
      await collectionRef.add({
        customerUid,
        workerUid,
        ...data,
        completed: false,
        inProgress: false,
        rejected: false
      });
      reset();
      toast.success('Solicitud exitosa');
      closeModal();
    } catch (error) {
      toast.error(renderError(error.code));
      console.error(error);
    }
    dispatch(authUiLoading(false));
  };
};

export const updateOpportunity = (id, data) => ({
  type: opportunitiesTypes.updateOpportunity,
  payload: { id, data }
});

export const startUpdateOpportunity = (id, data, setLoading) => {
  return async (dispatch) => {
    setLoading(true);
    try {
      const opportunityRef = db.collection('opportunities').doc(id);
      await opportunityRef.update(data);
      dispatch(updateOpportunity(id, data));
      toast.success('Oportunidad actualizada');
    } catch (error) {
      toast.error('Oportunidad actualizada');
      console.error(error);
    }
    setLoading(false);
  };
};
