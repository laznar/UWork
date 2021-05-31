import { useEffect, useState } from 'react';
import ClampLines from 'react-clamp-lines';
import NumberFormat from 'react-number-format';
import { ChatIcon } from '@heroicons/react/outline';
import { useMediaQuery } from 'react-responsive';
import Modal from 'react-modal';
import Chat from '../Chat';

Modal.setAppElement('#root');

const iconsConfig = {
  width: 20,
  height: 20,
  className: 'text-secondary flex-shrink-0'
};

const MessageCard = ({
  id,
  workerUid,
  customerUid,
  title,
  skill,
  price,
  description
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const smallScreen = useMediaQuery({ query: '(max-width: 600px)' });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const handleClick = () => {
    openModal();
  };

  const customStyles = {
    overlay: { backgroundColor: 'rgba(0,0,0,0.3)' },

    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      padding: 0,
      transform: 'translate(-50%, -50%)',
      maxWidth: !smallScreen && 500,
      width: '100%',
      height: '100%',
      maxHeight: !smallScreen && 300,
      overflow: 'auto'
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <div className="px-4 py-3 border rounded shadow-sm mb-3 bg-white d-flex align-items-center justify-content-between">
      <div>
        <strong>{title}</strong>
        <ul className="list-unstyled m-0">
          <li className="small text-muted">
            {`${skill ? `${skill} • ` : ''}`}
            <NumberFormat
              prefix="$"
              displayType="text"
              value={price}
              thousandSeparator="."
              decimalSeparator=","
            />
          </li>

          <ClampLines
            text={description}
            id="description"
            lines={1}
            ellipsis="..."
            moreText="Ver más"
            lessText="Ver menos"
            className="lh-sm"
            innerElement="li"
          />
        </ul>
      </div>
      <div
        className="rounded-circle d-flex justify-content-center align-content-center p-2 border ms-2 cursor-pointer shadow-sm message-icon"
        onClick={handleClick}
      >
        <ChatIcon {...iconsConfig} />
      </div>

      <Modal
        isOpen={isOpen}
        closeTimeoutMS={250}
        onRequestClose={closeModal}
        style={customStyles}
        shouldCloseOnEsc={false}
        shouldCloseOnOverlayClick={false}
      >
        <Chat
          closeModal={closeModal}
          id={id}
          customerUid={customerUid}
          workerUid={workerUid}
        />
      </Modal>
    </div>
  );
};

export default MessageCard;
