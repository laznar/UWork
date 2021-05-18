import { useEffect } from 'react';
import ResCard from '../../components/cards/ResCard';
import useQuery from '../../hooks/useQuery';
import tasks from '../../utils/tasks';

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

const Resultados = ({ history }) => {
  const query = useQuery();
  const term = query.get('termino');

  useEffect(() => {
    if (term) {
      if (!tasks.find((task) => task.value === term)) {
        history.replace('/');
      }
    } else {
      history.replace('/');
    }
  }, [term, history]);

  return (
    <div
      style={{ maxWidth: 600, paddingTop: 30, paddingBottom: 100 }}
      className="mx-auto container"
    >
      <h2 className="mb-4">{query.get('termino')}</h2>
      {resultados.map((resultado, idx) => {
        return <ResCard key={idx} {...resultado} />;
      })}
    </div>
  );
};

export default Resultados;
