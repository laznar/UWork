import ProCard from '../components/cards/ProCard';

let proyectos = [
  {
    titulo: 'Servicio de Limpieza en hogar',
    ciudad: 'Bogotá',
    barrio: 'El Nogal'
  },
  {
    titulo: 'Servicio de mensajería exprés',
    ciudad: 'Barranquilla',
    barrio: 'Alto Prado'
  }
];

const Proyectos = () => {
  return (
    <div className="container custom-container">
      <div style={{ maxWidth: 600 }} className="mx-auto">
        <h2 className="mb-4">Proyectos</h2>
        {proyectos.map((proyecto, idx) => {
          return <ProCard key={idx} {...proyecto} />;
        })}
      </div>
    </div>
  );
};

export default Proyectos;
