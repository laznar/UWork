import Card from '../../components/cards/Card';
import Ratings from '../../components/Ratings';

const Reviews = () => {
  return (
    <div className="container mt-5 pt-4 mx-auto" style={{ maxWidth: 600 }}>
      <h3 className="mt-3">Mis Reviews</h3>
      <Card>
        <h5>Reviews</h5>
        <p>4.5</p>
        <Ratings />
      </Card>
    </div>
  );
};

export default Reviews;
