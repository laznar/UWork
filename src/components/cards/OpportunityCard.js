import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  CurrencyDollarIcon,
  OfficeBuildingIcon,
  CalendarIcon,
  PencilIcon,
  LocationMarkerIcon,
  StatusOnlineIcon,
  CheckIcon
} from '@heroicons/react/outline';
import { UserIcon } from '@heroicons/react/solid';
import NumberFormat from 'react-number-format';
import { useMediaQuery } from 'react-responsive';
import ClampLines from 'react-clamp-lines';

import { renderNameAndSurnameInitial } from '../../utils/misc';
import { startUpdateOpportunity } from '../../redux/actions/opportunities';
import CustomButton from '../form-controls/CustomButton';

const iconsConfig = {
  width: 20,
  height: 20,
  className: 'text-secondary me-2 flex-shrink-0'
};

const inProgressIconConfig = {
  width: 20,
  height: 20,
  className: 'text-primary me-2 flex-shrink-0 scale-anim'
};

const completedIconConfig = {
  width: 20,
  height: 20,
  className: 'me-2 flex-shrink-0',
  color: 'rgb(136, 191, 77)'
};

const OpportunityCard = ({
  id,
  title,
  customerName,
  customerSurname,
  price,
  date,
  city,
  completed,
  inProgress,
  neighborhood,
  skill,
  description
}) => {
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [completeLoading, setCompleteLoading] = useState(false);

  const smallScreen = useMediaQuery({ query: '(max-width: 700px)' });

  const dispatch = useDispatch();

  const handleAcceptClick = () => {
    if (!acceptLoading) {
      const data = { inProgress: true };
      dispatch(startUpdateOpportunity(id, data, setAcceptLoading));
    }
  };

  const handleCompleteClick = () => {
    if (!completeLoading) {
      const data = { completed: true, inProgress: false };
      dispatch(startUpdateOpportunity(id, data, setCompleteLoading));
    }
  };

  const handleRejectClick = () => {
    if (!rejectLoading) {
      const data = { rejected: true };
      dispatch(startUpdateOpportunity(id, data, setRejectLoading));
    }
  };

  return (
    <div className="border rounded shadow-sm bg-white mb-3">
      <div className="px-4 py-3 border-bottom d-flex justify-content-between align-items-center">
        <div className="d-flex-flex-column">
          <strong className="pe-3 lh-1">{title}</strong>
          {inProgress ? (
            <div>
              <StatusOnlineIcon {...inProgressIconConfig} />
              En progreso
            </div>
          ) : (
            completed && (
              <div>
                <CheckIcon {...completedIconConfig} />
                Completado
              </div>
            )
          )}
        </div>
        {!smallScreen && !completed && (
          <div className="d-inline-block flex-shrink-0">
            <CustomButton
              wrapperClassName="d-inline-block"
              loading={rejectLoading}
              onClick={handleRejectClick}
              className="btn btn-light border me-2"
            >
              Rechazar
            </CustomButton>
            <CustomButton
              wrapperClassName="d-inline-block"
              loading={inProgress ? completeLoading : acceptLoading}
              onClick={inProgress ? handleCompleteClick : handleAcceptClick}
              className="btn btn-primary text-white border-primary ms-2"
            >
              {inProgress ? 'Completar' : 'Aceptar'}
            </CustomButton>
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
      {smallScreen && !completed && (
        <div className="row gx-0">
          <CustomButton
            loading={rejectLoading}
            wrapperClassName="col-6"
            className="btn btn-light rounded-0 rounded-start col-6 border w-100"
          >
            Rechazar
          </CustomButton>
          <CustomButton
            loading={inProgress ? completeLoading : acceptLoading}
            wrapperClassName="col-6"
            onClick={inProgress ? handleCompleteClick : handleAcceptClick}
            className="btn btn-primary rounded-0 rounded-end text-white w-100"
          >
            {inProgress ? 'Completar' : 'Aceptar'}
          </CustomButton>
        </div>
      )}
    </div>
  );
};

export default OpportunityCard;
