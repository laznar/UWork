import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ResultCard from '../../components/cards/ResultCard';
import useQuery from '../../hooks/useQuery';
import tasks from '../../utils/tasks';
import { useDispatch } from 'react-redux';
import { startSearchResults } from '../../redux/actions/results';

const Resultados = ({ history }) => {
  const query = useQuery();
  const term = query.get('servicio');
  const dispatch = useDispatch();
  const results = useSelector((state) => state.results);

  useEffect(() => {
    if (term) {
      if (!tasks.find((task) => task.value === term)) {
        history.replace('/');
      } else {
        dispatch(startSearchResults(term));
      }
    } else {
      history.replace('/');
    }
  }, [term, history, dispatch]);

  return (
    <div
      style={{
        maxWidth: 600,
        paddingTop: 30,
        paddingBottom: 50
      }}
      className="container custom-container"
    >
      {results.loading ? (
        <div className="d-flex">
          <div
            className="spinner-border mx-auto mt-5 text-primary"
            style={{ width: 50, height: 50 }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : results.results.length > 0 ? (
        <>
          <h2 className="mb-3">{query.get('servicio')}</h2>
          {results.results.map((result, idx) => {
            return <ResultCard key={idx} {...result} />;
          })}
        </>
      ) : (
        <h3>No se encontraron resultados</h3>
      )}
    </div>
  );
};

export default Resultados;
