import ReactStars from 'react-rating-stars-component';
import Card from '../components/cards/Card';

const GlobalRating = ({ value }) => {
  const scoreReview = {
    size: 30,
    value,
    edit: false,
    color: ' #D3D3D3',
    activeColor: '#45a8d8',
    isHalf: true
  };

  return (
    <Card className="mb-0">
      <h4>Puntaje global</h4>
      <div className="d-flex align-items-center">
        <strong>
          <span className="fs-4 me-2">{scoreReview.value}</span>
        </strong>
        <ReactStars {...scoreReview} />
      </div>
    </Card>
  );
};

export default GlobalRating;
