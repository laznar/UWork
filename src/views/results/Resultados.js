import ResCard from '../../components/cards/ResCard';

let resultados = [
  {
    name: 'Jesús',
    surname: 'Santiago',
    value: 4.5,
    precio: 50000,
    ciudad: 'Baranoa',
    skill: 'Plomería',
    descripcion:
      'Reparo fugas, limpio y destapo desagües, inspecciono tuberías.'
  },
  {
    name: 'Gerardo',
    surname: 'Ramirez',
    value: 3,
    precio: 80000,
    ciudad: 'Valledupar',
    skill: 'Electricidad',
    descripcion:
      'Se realizan instalaciones y mantenimiento de instalaciones eléctricas y ensamble de tableros de potencia'
  }
];

const Resultados = () => {
  return (
    <div
      style={{ maxWidth: 600, paddingTop: 100 }}
      className="mx-auto container"
    >
      <h2 className="mb-4">Resultado de Servicios</h2>
      {resultados.map((resultado) => {
        return <ResCard {...resultado} />;
      })}
    </div>
  );
};

export default Resultados;
