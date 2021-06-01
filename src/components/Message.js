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
          'pt-2 pb-1 px-2 small message lh-1 border d-flex flex-column',
          ownMessage
            ? 'align-self-end message--own'
            : 'align-self-start message--not-own'
        )}
      >
        {content}
        <span className="small text-secondary align-self-end">
          {format(messageDate, 'p', { locale: es })}
        </span>
      </div>
    </>
  );
};

export default Message;
