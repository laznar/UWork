import GlobalRating from '../../components/GlobalRating';
import RevCard from '../../components/cards/RevCard';

let reviews = [
  {
    name: 'Luis',
    surname: 'Aznar',
    value: 5,
    comment: 'Excelente trabajo'
  },
  {
    name: 'Jose',
    surname: 'Pérez',
    value: 4.5,
    comment: 'Buen trabajo'
  },
  {
    name: 'Juan',
    surname: 'Gonzalez',
    value: 3.5,
    comment: 'Buen trabajo'
  }
];

const averageScore = () => {
  let suma = 0;
  reviews.forEach((review) => {
    suma += review.value;
  });
  let res = suma / reviews.length;
  let rounded = Math.round(res * 10) / 10;
  return rounded;
};

const Reviews = () => {
  return (
    <div
      className="container mx-auto"
      style={{ paddingTop: 30, maxWidth: 600 }}
    >
      <h3>Mis Reviews</h3>
      <GlobalRating value={averageScore()} />
      <h3 className="mt-0">Comentarios</h3>
      {reviews.map((review) => {
        return <RevCard {...review} />;
      })}
    </div>
  );
};

export default Reviews;
