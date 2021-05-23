import {
  CurrencyDollarIcon,
  OfficeBuildingIcon,
  CalendarIcon,
  PencilIcon,
  LocationMarkerIcon
} from '@heroicons/react/outline';
import { UserIcon } from '@heroicons/react/solid';
import NumberFormat from 'react-number-format';
import { useMediaQuery } from 'react-responsive';
import ClampLines from 'react-clamp-lines';

import { renderNameAndSurnameInitial } from '../../utils/misc';

const iconsConfig = {
  width: 20,
  height: 20,
  className: 'text-secondary me-2 flex-shrink-0'
};

const OpportunityCard = ({
  title,
  customerName,
  customerSurname,
  price,
  date,
  city,
  neighborhood,
  skill,
  description
}) => {
  const smallScreen = useMediaQuery({ query: '(max-width: 700px)' });

  return (
    <div className="border rounded shadow-sm bg-white mb-3">
      <div className="px-4 py-3 border-bottom d-flex justify-content-between align-items-center">
        <strong className="pe-3 lh-1">{title}</strong>
        {!smallScreen && (
          <div className="d-inline-block flex-shrink-0">
            <button className="btn btn-light border me-2">Rechazar</button>
            <button className="btn btn-primary text-white border-primary ms-2">
              Aceptar
            </button>
          </div>
        )}
      </div>

      <div className="px-4 py-3">
        <ul className="list-unstyled mb-0">
          <li>
            <UserIcon {...iconsConfig} />
            {renderNameAndSurnameInitial(customerName, customerSurname)}
          </li>
          <li>
            <CurrencyDollarIcon {...iconsConfig} />
            <NumberFormat
              prefix="$"
              displayType="text"
              value={price}
              thousandSeparator="."
              decimalSeparator=","
            />
          </li>
          <li>
            <CalendarIcon {...iconsConfig} />
            {date.toDate().toLocaleDateString()}
          </li>
          <li>
            <OfficeBuildingIcon {...iconsConfig} />
            {city}
          </li>
          {neighborhood && (
            <li>
              <LocationMarkerIcon {...iconsConfig} />
              {neighborhood}
            </li>
          )}
          <li className="d-flex">
            <PencilIcon {...iconsConfig} />

            <ClampLines
              text={description}
              id="description"
              lines={1}
              ellipsis="..."
              moreText="Ver más"
              lessText="Ver menos"
              innerElement="p"
            />
          </li>
        </ul>
      </div>
      {smallScreen && (
        <div className="row gx-0">
          <button className="btn btn-light rounded-0 rounded-start col-6 border">
            Rechazar
          </button>
          <button className="btn btn-primary rounded-0 rounded-end col-6 text-white">
            Aceptar
          </button>
        </div>
      )}
    </div>
  );
};

export default OpportunityCard;
