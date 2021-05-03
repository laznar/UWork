import ReactStars from 'react-rating-stars-component';

const Ratings = () => {
  const firstExample = {
    size: 30,
    value: 4.5,
    edit: false,
    color: ' #D3D3D3',
    activeColor: '#45a8d8'
  };

  return (
    <div>
      <ReactStars {...firstExample} />
    </div>
  );
};

export default Ratings;
