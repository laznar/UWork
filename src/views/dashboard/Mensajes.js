import MessCard from '../../components/cards/MessCard';

let mensajes = [
  {
    titulo: 'Necesito arreglar mi aire acondicionado',
    skill: 'Mantenimiento de aire acondicionado',
    precio: '$80.000',
    mensaje:
      'Me encuentro interesado en que me vengan a arreglar el aire el día de hoy'
  },
  {
    titulo: 'Necesito plomero urgente!',
    skill: 'Plomería',
    precio: '$74.000',
    mensaje: 'Se necesita plomero urgente para Villa Santos'
  }
];

const Mensajes = () => {
  return (
    <div style={{ maxWidth: 600 }} className="mx-auto">
      <h2 className="mb-4">Mensajes</h2>
      {mensajes.map((mensaje) => {
        return <MessCard {...mensaje} />;
      })}
    </div>
  );
};

export default Mensajes;
