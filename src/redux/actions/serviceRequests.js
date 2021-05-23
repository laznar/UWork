import { authUiLoading } from './auth';
import { db, firebase } from '../../firebase';
import toast from 'react-hot-toast';
import { renderError } from '../../utils/misc';
export const startCreateServiceRequest = (
  data,
  workerUid,
  closeModal,
  reset
) => {
  return async (dispatch) => {
    dispatch(authUiLoading(true));
    try {
      const collectionRef = db.collection('serviceRequests');
      const customerUid = firebase.auth().currentUser.uid;
      await collectionRef.add({
        customerUid,
        workerUid,
        data,
        completed: false
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
