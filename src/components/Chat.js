import { useEffect } from 'react';
import OverlayScrollbars from 'overlayscrollbars';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { XIcon, PaperAirplaneIcon } from '@heroicons/react/outline';
import { useDispatch, useSelector } from 'react-redux';
import { startSearchChatData } from '../redux/actions/chat';

const iconsConfig = {
  width: 20,
  height: 20,
  className: 'flex-shrink text-primary'
};

const Chat = ({ closeModal, id, workerUid, customerUid }) => {
  const dispatch = useDispatch();
  const chat = useSelector((state) => state.chat);

  useEffect(() => {
    const instance = OverlayScrollbars(document.body);
    instance.options('className', null);
    return () => {
      instance.options('className', 'os-theme-dark');
    };
  }, []);

  useEffect(() => {
    dispatch(startSearchChatData({ id, customerUid, workerUid }));
  }, [dispatch, id, customerUid, workerUid]);

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
        <div className="fade-anim h-100 d-flex flex-column">
          <div
            className="d-flex justify-content-between align-items-center position-sticky top-0 p-3 bg-white border-bottom"
            style={{ zIndex: 2 }}
          >
            <h4 className="mb-0">Chat</h4>
            <button onClick={closeModal} className="btn p-1">
              <XIcon width={20} height={20} />
            </button>
          </div>

          <OverlayScrollbarsComponent className="flex-grow-1">
            <div className="row flex-colum gx-0 p-3"></div>
          </OverlayScrollbarsComponent>

          <div
            className="d-flex justify-content-between align-items-center position-sticky bottom-0 p-3 bg-white border-top"
            style={{ zIndex: 2 }}
          >
            <input
              type="text"
              className="form-control rounded-pill"
              placeholder="Escribe un mensaje"
            />
            <button
              onClick={closeModal}
              className="d-flex align-items-center justify-content-center btn p-2 rounded-circle ms-2 border-primary"
            >
              <PaperAirplaneIcon {...iconsConfig} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
