import { useEffect } from 'react';
import { useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import NumberFormat from 'react-number-format';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import {
  CurrencyDollarIcon,
  OfficeBuildingIcon,
  PencilIcon,
  LightBulbIcon
} from '@heroicons/react/outline';
import ClampLines from 'react-clamp-lines';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import Ofertar from '../Ofertar';
import { renderNameAndSurnameInitial } from '../../utils/misc';

Modal.setAppElement('#root');

const iconsConfig = {
  width: 20,
  height: 20,
  className: 'text-secondary me-2 flex-shrink-0'
};

const ResultCard = ({
  workerUid,
  name,
  surname,
  value = 5,
  precio = 100,
  city,
  skills,
  aboutMe,
  photoURL = 'https://picsum.photos/200/200'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const smallScreen = useMediaQuery({ query: '(max-width: 700px)' });

  const customStyles = {
    overlay: { backgroundColor: 'rgba(0,0,0,0.3)' },

    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      padding: 0,
      transform: 'translate(-50%, -50%)',
      maxWidth: !smallScreen && 500,
      width: smallScreen && '100%',
      height: smallScreen && '100%',
      maxHeight: '100%',
      overflow: 'auto'
    }
  };

  const scoreReview = {
    size: 25,
    value,
    edit: false,
    color: '#D3D3D3',
    activeColor: '#45a8d8',
    isHalf: true
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  // To prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const auth = useSelector((state) => state.auth);

  return (
    <div className="border rounded shadow-sm bg-white mb-3">
      <div
        className="px-4 py-3 border-bottom d-flex justify-content-between align-items-center"
        style={{ color: '#6c757d' }}
      >
        <div className="d-flex align-items-center">
          <img
            src={photoURL}
            height={80}
            width={80}
            alt=""
            className="rounded-circle border me-2 object-fit-cover object-position-center"
          />
          <div>
            <strong>{renderNameAndSurnameInitial(name, surname)}</strong>
            <div className="d-flex align-items-center">
              <span className="fs-5 me-2">{value}</span>
              <ReactStars {...scoreReview} />
            </div>
          </div>
        </div>
        {!smallScreen && auth.uid && auth.uid !== workerUid && (
          <button
            onClick={openModal}
            className="btn btn-primary text-white border-primary ms-2"
          >
            Ofertar
          </button>
        )}
      </div>

      <div className="p-4 pt-3">
        <ul className="list-unstyled m-0">
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
            {city}
          </li>
          <li>
            <LightBulbIcon {...iconsConfig} />

            {skills.map((skill) => (
              <Link
                key={skill}
                to={`/resultados?servicio=${skill}`}
                className="badge rounded-pill border border me-1 mb-1 text-decoration-none text-primary custom-badge"
              >
                {skill}
              </Link>
            ))}
          </li>
          <li className="d-flex">
            <PencilIcon {...iconsConfig} />
            <ClampLines
              text={aboutMe}
              id="aboutMe"
              lines={1}
              ellipsis="..."
              moreText="Ver más"
              lessText="Ver menos"
              innerElement="p"
            />
          </li>
        </ul>
      </div>

      {smallScreen && auth.uid && auth.uid !== workerUid && (
        <button
          onClick={() => {
            setIsOpen(true);
          }}
          className="btn border-primary w-100 btn-primary text-white rounded-0 rounded-bottom"
        >
          Ofertar
        </button>
      )}

      <Modal
        isOpen={isOpen}
        // onAfterOpen={afterOpenModal}
        closeTimeoutMS={250}
        onRequestClose={closeModal}
        style={customStyles}
        shouldCloseOnEsc={false}
        shouldCloseOnOverlayClick={false}
      >
        <Ofertar closeModal={closeModal} workerUid={workerUid} />
      </Modal>
    </div>
  );
};

export default ResultCard;
