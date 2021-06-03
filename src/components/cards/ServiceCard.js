import {
  LightBulbIcon,
  ChevronDoubleRightIcon
} from '@heroicons/react/outline';

const iconsConfig = {
  width: 20,
  height: 20,
  className: 'text-secondary me-2'
};

const ServiceCard = ({ skill }) => {
  return (
    <div className="px-4 py-3 border rounded shadow-sm bg-white mb-1 d-flex align-items-center justify-content-between">
      <div>
        <ul className="list-unstyled m-0">
          <li>
            <LightBulbIcon {...iconsConfig} />
            {skill}
          </li>
        </ul>
      </div>
      <div>
        <ChevronDoubleRightIcon {...iconsConfig} />
      </div>
    </div>
  );
};

export default ServiceCard;
