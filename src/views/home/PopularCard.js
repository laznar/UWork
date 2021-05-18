import { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

const PopularCard = ({ name, image }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={`/resultados?servicio=${name}`}
      onMouseOver={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      className="col-sm-6 col-lg-4 text-decoration-none text-dark"
    >
      <figure>
        <div
          style={{
            transition: 'box-shadow 300ms ease',
            backgroundColor: '#212121'
          }}
          className={clsx(
            'rounded overflow-hidden',
            hovered ? 'shadow' : 'shadow-sm'
          )}
        >
          <img
            style={{
              transition: 'opacity 400ms ease',
              opacity: hovered ? 0.95 : 1,
              backgroundColor: 'black'
            }}
            className="w-100 object-position-center object-fit-cover"
            height={200}
            src={image}
            alt={name}
          />
        </div>
        <figcaption className="mt-2">
          <h6>
            <strong>{name}</strong>
          </h6>
        </figcaption>
      </figure>
    </Link>
  );
};

export default PopularCard;
