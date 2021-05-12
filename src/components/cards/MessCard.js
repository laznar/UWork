import { ChatIcon } from '@heroicons/react/outline';

const iconsConfig = {
  width: 20,
  height: 20,
  className: 'text-secondary me-2'
};

const MessCard = ({ titulo, skill, precio, mensaje }) => {
  return (
    <div className="px-4 py-3 border rounded shadow-sm bg-white mb-3 d-flex align-items-center justify-content-between cursor-pointer">
      <div>
        <strong>{titulo}</strong>
        <ul className="list-unstyled m-0">
          <li style={{ color: '#6f6f6f', fontSize: '12px' }}>
            {skill + ' • ' + precio}
          </li>
          <li className="mt-2">{mensaje}</li>
        </ul>
      </div>
      <div>
        <ChatIcon {...iconsConfig} />
      </div>
    </div>
  );
};

export default MessCard;
