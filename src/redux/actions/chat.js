import { db } from '../../firebase';
import { chatTypes } from '../types/types';

const setChatLoading = (chatLoading) => ({
  type: chatTypes.setChatLoading,
  payload: chatLoading
});

export const startSearchChatData = ({ id, workerUid, customerUid }) => {
  return async (dispatch) => {
    dispatch(setChatLoading(true));
    try {
      const chatsRef = db.collection('chat');
      const chatRef = chatsRef.doc(id);
      const chatSnap = await chatRef.get();

      if (chatSnap.exist) {
      } else {
        chatRef.set({
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
