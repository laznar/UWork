import clsx from 'clsx';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const Message = ({ content, ownMessage, messageDate, showDate }) => {
  return (
    <>
      {showDate && (
        <span className="align-self-center pb-2 pt-1 small">
          {format(messageDate, "d 'de' MMMM yyyy", { locale: es })}
        </span>
      )}

      <div
        className={clsx(
          'py-2 px-2 small message lh-1 border d-flex flex-wrap',
          ownMessage
            ? 'align-self-end message--own'
            : 'align-self-start message--not-own'
        )}
      >
        <span className="me-1">{content}</span>
        <span className="small ms-auto lh-sm hour">
          {format(messageDate, 'p', { locale: es })}
        </span>
      </div>
    </>
  );
};

export default Message;
