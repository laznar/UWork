import {
  CurrencyDollarIcon,
  OfficeBuildingIcon,
  CalendarIcon,
  PencilIcon,
  LocationMarkerIcon
} from '@heroicons/react/outline';

import { UserIcon } from '@heroicons/react/solid';

const iconsConfig = {
  width: 20,
  height: 20,
  className: 'text-secondary me-2'
};

const OpCard = ({
  titulo,
  usuario,
  precio,
  fecha,
  ciudad,
  barrio,
  skill,
  descripcion
}) => {
  return (
    <div className="border rounded shadow-sm bg-white mb-3">
      <div className="px-4 py-3 border-bottom d-flex justify-content-between align-items-center">
        <strong>{titulo}</strong>
        <div className="d-none d-md-inline-block">
          <button className="btn btn-light border me-2">Rechazar</button>
          <button className="btn btn-primary text-white border-primary ms-2">
            Aplicar
          </button>
        </div>
      </div>

      <div className="px-4 py-3">
        <ul className="list-unstyled">
          <li>
            <UserIcon {...iconsConfig} />
            {usuario}
          </li>
          <li>
            <CurrencyDollarIcon {...iconsConfig} />
            {precio}
          </li>
          <li>
            <CalendarIcon {...iconsConfig} />
            {fecha}
          </li>
          <li>
            <OfficeBuildingIcon {...iconsConfig} />
            {ciudad}
          </li>
          <li>
            <LocationMarkerIcon {...iconsConfig} />
            {barrio}
          </li>
          <li>
            <PencilIcon {...iconsConfig} />
            {descripcion}
          </li>
        </ul>
      </div>
      <div className="row gx-0 d-md-none">
        <button className="btn col-6 rounded-0 border">Rechazar</button>
        <button className="btn col-6 rounded-0 text-primary border-primary">
          Aplicar
        </button>
      </div>
    </div>
  );
};

export default OpCard;
