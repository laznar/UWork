import PayCard from '../../components/cards/PayCard';

let pagos = [
  {
    name: 'Jesús',
    surname: 'Santiago',
    value: 4.5,
    precio: 50000,
    ciudad: 'Baranoa',
    skill: 'Plomería',
    descripcion:
      'Reparo fugas, limpio y destapo desagües, inspecciono tuberías.',
    urlPayment: 'https://checkout.wompi.co/l/test_GL6HEo'
  },
  {
    name: 'Gerardo',
    surname: 'Ramirez',
    value: 3,
    precio: 80000,
    ciudad: 'Valledupar',
    skill: 'Electricidad',
    descripcion:
      'Se realizan instalaciones y mantenimiento de instalaciones eléctricas y ensamble de tableros de potencia',
    urlPayment: 'https://checkout.wompi.co/l/test_faXpwN'
  }
];

const Pagos = () => {
  return (
    <div
      style={{ maxWidth: 600, paddingTop: 30 }}
      className="mx-auto container"
    >
      <h2 className="mb-4">Pagos</h2>
      {pagos.map((pago) => {
        return <PayCard {...pago} />;
      })}
    </div>
  );
};

export default Pagos;
