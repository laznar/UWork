import ReactStars from 'react-rating-stars-component';
import NumberFormat from 'react-number-format';
import {
  CurrencyDollarIcon,
  OfficeBuildingIcon,
  PencilIcon,
  LightBulbIcon
} from '@heroicons/react/outline';

const iconsConfig = {
  width: 20,
  height: 20,
  className: 'text-secondary me-2'
};

const ResCard = ({
  name,
  surname,
  value,
  precio,
  ciudad,
  skill,
  descripcion
}) => {
  const scoreReview = {
    size: 30,
    value,
    edit: false,
    color: ' #D3D3D3',
    activeColor: '#45a8d8',
    isHalf: true
  };

  return (
    <div className="border rounded shadow-sm bg-white mb-3">
      <div
        className="px-4 py-3 border-bottom d-flex justify-content-between align-items-center"
        style={{ color: '#6c757d' }}
      >
        <strong>{name + ' ' + surname.charAt(0) + '.'}</strong>
        <div className="d-flex align-items-center">
          <span className="fs-5 me-2">{value}</span>
          <ReactStars {...scoreReview} />
        </div>
        <div className="d-none d-md-inline-block text-center">
          <button className="btn btn-primary text-white border-primary ms-2">
            Consultar
          </button>
        </div>
      </div>

      <div className="px-4 py-3">
        <ul className="list-unstyled">
          <li>
            <CurrencyDollarIcon {...iconsConfig} />
            <NumberFormat
              decimalSeparator={','}
              thousandSeparator={'.'}
              prefix={'$'}
              value={precio}
              displayType="text"
            />
          </li>
          <li>
            <OfficeBuildingIcon {...iconsConfig} />
            {ciudad}
          </li>
          <li>
            <LightBulbIcon {...iconsConfig} />
            {skill}
          </li>
          <li>
            <PencilIcon {...iconsConfig} />
            {descripcion}
          </li>
        </ul>
      </div>
      <div className="d-md-none">
        <button className="btn border-primary w-100 btn-primary text-white rounded-0 rounded-bottom">
          Consultar
        </button>
      </div>
    </div>
  );
};

export default ResCard;
