import ClampLines from 'react-clamp-lines';
import NumberFormat from 'react-number-format';
import { ChatIcon } from '@heroicons/react/outline';

const iconsConfig = {
  width: 20,
  height: 20,
  className: 'text-secondary flex-shrink-0'
};

const MessageCard = ({ title, skill, price, description }) => {
  const handleClick = () => {
    console.log('Hola');
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
            innerElement="li"
          />
        </ul>
      </div>
      <div className="rounded-circle d-flex justify-content-center align-content-center p-2 border ms-2 cursor-pointer shadow-sm message-icon">
        <ChatIcon {...iconsConfig} onClick={handleClick} />
      </div>
    </div>
  );
};

export default MessageCard;
