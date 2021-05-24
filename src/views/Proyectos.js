import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OpportunityCard from '../components/cards/OpportunityCard';
import { startSearchOpportunities } from '../redux/actions/opportunities';

const Proyectos = () => {
  const dispatch = useDispatch();

  const opportunities = useSelector((state) => state.opportunities);

  useEffect(() => {
    dispatch(startSearchOpportunities(true));
  }, [dispatch]);

  return (
    <div className="container custom-container">
      <div style={{ maxWidth: 600 }} className="mx-auto">
        {opportunities.loading ? (
          <div className="d-flex">
            <div
              className="spinner-border mx-auto mt-5 text-primary"
              style={{ width: 50, height: 50 }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : opportunities.results.length > 0 ? (
          <>
            <h2 className="mb-4">Proyectos</h2>
            {opportunities.results.map((proyect, idx) => {
              if (proyect.inProgress || proyect.completed) {
                return <OpportunityCard {...proyect} key={idx} />;
              }
              return null;
            })}
          </>
        ) : (
          <h3>No se encontraron oportunidades</h3>
        )}
      </div>
    </div>
  );
};

export default Proyectos;
