import OpCard from '../components/cards/OpCard';

let oportunidades = [
  {
    titulo: 'Se necesita limpiar ventanas',
    usuario: 'Aznar',
    precio: '50.000',
    fecha: '5/05/2021',
    ciudad: 'Medellín',
    barrio: 'Conquistadores',
    skill: 'Limpieza',
    descripcion: 'Necesito limpiar los ventanales'
  },
  {
    titulo: 'Se necesita pasear perro a las 8 a. m.',
    usuario: 'Jose',
    precio: '20.000',
    fecha: '6/05/2021',
    ciudad: 'Barranquilla',
    barrio: 'Villa Carolina',
    skill: 'Pasear Mascota',
    descripcion: 'Necesito pasear a mi perro durante las mañanas'
  }
];
const Oportunidades = () => {
  return (
    <div className="container custom-container">
      <div style={{ maxWidth: 600 }} className="mx-auto">
        <h2 className="mb-4">Oportunidades</h2>
        {oportunidades.map((oportunidad, idx) => {
          return <OpCard {...oportunidad} key={idx} />;
        })}
      </div>
    </div>
  );
};

export default Oportunidades;