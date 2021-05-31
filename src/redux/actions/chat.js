import { db } from '../../firebase';
import { chatTypes } from '../types/types';

const setChatLoading = (chatLoading) => ({
  type: chatTypes.setChatLoading,
  payload: chatLoading
});

const setChatData = (data) => ({
  type: chatTypes.setChatData,
  payload: data
});

export const startSearchChatData = ({ id, workerUid, customerUid }) => {
  return async (dispatch, getState) => {
    dispatch(setChatLoading(true));
    try {
      const chatsRef = db.collection('chat');
      const chatRef = chatsRef.doc(id);
      const chatSnap = await chatRef.get();
      const usersRef = db.collection('users');
      const currentUid = getState().auth.uid;
      if (chatSnap.exists) {
        let userRef;
        if (currentUid === workerUid) {
          userRef = usersRef.doc(customerUid);
        } else {
          userRef = usersRef.doc(workerUid);
        }
        const userSnap = await userRef.get();
        dispatch(setChatData({ receiverData: userSnap.data() }));
      } else {
        await chatRef.set({
          customerUid,
          workerUid
        });
      }
    } catch (error) {
      console.error(error);
    }
    dispatch(setChatLoading(false));
  };
};
