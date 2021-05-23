import ReactStars from 'react-rating-stars-component';
import { renderNameAndSurnameInitial } from '../../utils/misc';

const RevCard = ({ name, surname, value, comment }) => {
  const scoreReview = {
    size: 30,
    value,
    edit: false,
    color: ' #D3D3D3',
    activeColor: '#45a8d8',
    isHalf: true
  };
  return (
    <div className="px-4 py-3 border rounded shadow-sm bg-white mb-3 d-flex align-items-center justify-content-between cursor-pointer">
      <div>
        <strong>{renderNameAndSurnameInitial(name, surname)}</strong>
        <ul className="list-unstyled m-0">
          <li>
            <ReactStars {...scoreReview} />
          </li>
          <li className="mb-2" style={{ fontSize: 18 }}>
            {comment}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RevCard;
