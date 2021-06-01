import { useEffect, useRef } from 'react';
import { XIcon, PaperAirplaneIcon } from '@heroicons/react/outline';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { compareAsc } from 'date-fns';
import ScrollToBottom from 'react-scroll-to-bottom';

import {
  detachMessagesListener,
  attachMessagesListener,
  startSearchChatData,
  startSendMessage
} from '../redux/actions/chat';
import ProfilePhoto from './ProfilePhoto';
import { renderName } from '../utils/misc';
import Message from './Message';

const iconsConfig = {
  width: 20,
  height: 20,
  className: 'flex-shrink text-primary'
};

const Chat = ({ closeModal, id, workerUid, customerUid }) => {
  const { register, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues: { content: '' }
  });
  const dispatch = useDispatch();
  const chat = useSelector((state) => state.chat);
  const auth = useSelector((state) => state.auth);

  const lastDate = useRef(new Date());

  useEffect(() => {
    dispatch(attachMessagesListener(id));
    return () => {
      dispatch(detachMessagesListener());
    };
  }, [dispatch, id]);

  const sendIconConfig = {
    ...iconsConfig,
    className: `${iconsConfig.className} ${chat.sendingLoading && 'invisible'}`
  };

  useEffect(() => {
    dispatch(startSearchChatData({ id, customerUid, workerUid }));
  }, [dispatch, id, customerUid, workerUid]);

  const onSubmit = ({ content }) => {
    if (!chat.sendingLoading) {
      const sentAt = new Date();
      dispatch(startSendMessage({ chatId: id, content, sentAt, reset }));
    }
  };

  return (
    <div className="w-100 h-100">
      {chat.loading ? (
        <div className="d-flex h-100 align-items-center justify-content-center">
          <div
            className="spinner-border text-primary"
            style={{ width: 50, height: 50 }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="fade-anim h-100 d-flex flex-column bg-light">
          <div
            className="d-flex justify-content-between align-items-center position-sticky top-0 p-3 bg-white border-bottom"
            style={{ zIndex: 2 }}
          >
            <ProfilePhoto
              width={40}
              height={40}
              photoURL={chat.receiverData.photoURL}
            />
            <div className="ms-2 me-auto d-flex flex-column justify-content-center">
              <strong>
                {renderName(chat.receiverData.name)}{' '}
                {renderName(chat.receiverData.surname)}
              </strong>
              <span className="small text-secondary">
                ({chat.receiverData.isWorker ? 'Worker' : 'Cliente'})
              </span>
            </div>
            <button
              onClick={closeModal}
              className="btn btn-outline-danger p-1 d-flex"
            >
              <XIcon width={20} height={20} />
            </button>
          </div>

          <ScrollToBottom className="flex-grow-1 overflow-auto">
            <div className="d-flex flex-column px-3 py-2">
              {chat.messages.map(({ content, id, senderUid, sentAt }) => {
                const messageDate = sentAt.toDate();
                const messageDateWithoutHour = new Date(
                  messageDate.getFullYear(),
                  messageDate.getMonth(),
                  messageDate.getDate()
                );

                const dateComparison = compareAsc(
                  lastDate.current,
                  messageDateWithoutHour
                );

                if (dateComparison !== 0) {
                  lastDate.current = messageDateWithoutHour;
                }

                return (
                  <Message
                    showDate={dateComparison !== 0}
                    key={id}
                    content={content}
                    messageDate={messageDate}
                    ownMessage={auth.uid === senderUid}
                  />
                );
              })}
            </div>
          </ScrollToBottom>

          <form
            className="d-flex justify-content-between align-items-center position-sticky bottom-0 p-3 bg-white border-top"
            style={{ zIndex: 2 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              {...register('content', { required: true })}
              className="form-control rounded-pill"
              placeholder="Escribe un mensaje"
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={chat.sendingLoading}
              className="d-flex align-items-center justify-content-center btn p-2 rounded-circle ms-2 border-primary send-message-icon position-relative"
            >
              {chat.sendingLoading && (
                <div
                  className="spinner-border spinner-border-sm position-absolute text-primary"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}

              <PaperAirplaneIcon {...sendIconConfig} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;
