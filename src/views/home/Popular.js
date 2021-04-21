import cleaning from '../../assets/img/services/cleaning.jpg';
import delivery from '../../assets/img/services/delivery.jpg';
import gardening from '../../assets/img/services/gardening.jpg';
import plumbing from '../../assets/img/services/plumbing.jpg';
import electric from '../../assets/img/services/electric.jpg';
import repair from '../../assets/img/services/repair.jpg';

const services = [
  { name: 'Limpieza', image: cleaning },
  { name: 'Mensajería', image: delivery },
  { name: 'Jardinería', image: gardening },
  { name: 'Plomería', image: plumbing },
  { name: 'Electricidad', image: electric },
  { name: 'Reparaciones', image: repair },
];

export const Popular = () => {
  return (
    <div className="bg-light border-bottom">
      <div className="container p-5">
        <h2 className="mb-5">Servicios populares</h2>

        <div className="row g-3">
          {services.map((service) => (
            <figure key={service.name} className="col-sm-6 col-lg-4">
              <img
                className="w-100 rounded shadow"
                style={{
                  height: 200,
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                src={service.image}
                alt={service.name}
              />
              <figcaption className="mt-3">
                <h5>
                  <strong>{service.name}</strong>
                </h5>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
};
