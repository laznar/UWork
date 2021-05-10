import {
  OfficeBuildingIcon,
  LocationMarkerIcon,
  ChevronDoubleRightIcon
} from '@heroicons/react/outline';

const iconsConfig = {
  width: 20,
  height: 20,
  className: 'text-secondary me-2'
};

const ProCard = ({ titulo, ciudad, barrio, descripcion }) => {
  return (
    <div className="px-4 py-3 border rounded shadow-sm bg-white mb-3 d-flex align-items-center justify-content-between cursor-pointer">
      <div>
        <strong>{titulo}</strong>
        <ul className="list-unstyled m-0">
          <li>
            <OfficeBuildingIcon {...iconsConfig} />
            {ciudad}
          </li>
          <li>
            <LocationMarkerIcon {...iconsConfig} />
            {barrio}
          </li>
        </ul>
      </div>
      <div>
        <ChevronDoubleRightIcon {...iconsConfig} />
      </div>
    </div>
  );
};

export default ProCard;
