import { db } from '../../firebase';
import { chatTypes } from '../types/types';

const setChatLoading = (chatLoading) => ({
  type: chatTypes.setChatLoading,
  payload: chatLoading
});

const setSendingLoading = (sendingLoading) => ({
  type: chatTypes.setSendingLoading,
  payload: sendingLoading
});

const setChatData = (data) => ({
  type: chatTypes.setChatData,
  payload: data
});

export const startSearchChatData = ({ id, workerUid, customerUid }) => {
  return async (dispatch, getState) => {
    dispatch(setChatLoading(true));
    try {
      const chatsRef = db.collection('chats');
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

export const startSendMessage = ({ chatId, content, sentAt, reset }) => {
  return async (dispatch, getState) => {
    dispatch(setSendingLoading(true));
    try {
      const messagesRef = db
        .collection('chats')
        .doc(chatId)
        .collection('messages');
      await messagesRef.add({
        content,
        sentAt,
        senderUid: getState().auth.uid
      });
      reset();
    } catch (error) {
      console.error(error);
    }
    dispatch(setSendingLoading(false));
  };
};

let unsubscribe;

export const attachMessagesListener = (chatId) => {
  return (dispatch) => {
    const messagesRef = db
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('sentAt');
    unsubscribe = messagesRef.onSnapshot((querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      dispatch(setChatData({ messages }));
    });
  };
};

export const detachMessagesListener = () => {
  return (dispatch) => {
    if (unsubscribe) {
      unsubscribe();
      dispatch(setChatData({ messages: [] }));
    }
  };
};
