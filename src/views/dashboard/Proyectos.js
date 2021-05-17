import ProCard from '../../components/cards/ProCard';

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
    <div style={{ maxWidth: 600 }} className="mx-auto">
      <h2 className="mb-4">Proyectos</h2>
      {proyectos.map((proyecto, idx) => {
        return <ProCard key={idx} {...proyecto} />;
      })}
    </div>
  );
};

export default Proyectos;
