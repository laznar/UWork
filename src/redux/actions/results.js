import { db } from '../../firebase';
import { types } from '../types/types';

export const setResults = (results) => ({
  type: types.setResults,
  payload: results
});

export const setResultsLoading = (loading) => ({
  type: types.setResultsLoading,
  payload: loading
});

export const startSearchResults = (term) => {
  return async (dispatch) => {
    try {
      const usersRef = db.collection('users');

      const query = usersRef
        .where('isWorker', '==', true)
        .where('skills', 'array-contains', term);
      const querySnapshot = await query.get();

      dispatch(setResults(querySnapshot.docs.map((doc) => doc.data())));
    } catch (error) {
      console.error(error);
    }
    dispatch(setResultsLoading(false));
  };
};
