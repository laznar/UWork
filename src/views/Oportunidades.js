import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OpportunityCard from '../components/cards/OpportunityCard';
import {
  setOpportunities,
  setOpportunitiesLoading,
  startSearchOpportunities
} from '../redux/actions/opportunities';

const Oportunidades = () => {
  const dispatch = useDispatch();

  const opportunities = useSelector((state) => state.opportunities);

  useEffect(() => {
    dispatch(startSearchOpportunities());
    return () => {
      dispatch(setOpportunities([]));
      dispatch(setOpportunitiesLoading(true));
    };
  }, [dispatch]);

  return (
    <div className="container custom-container fade-anim">
      <div style={{ maxWidth: 600, width: '90%' }} className="mx-auto">
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
          <div className="fade-anim">
            <h2 className="mb-4">Oportunidades</h2>
            {opportunities.results.map((opportunity, idx) => {
              if (
                !opportunity.completed &&
                !opportunity.rejected &&
                !opportunity.inProgress
              ) {
                return <OpportunityCard {...opportunity} key={idx} />;
              }
              return null;
            })}
          </div>
        ) : (
          <h3>No se encontraron oportunidades</h3>
        )}
      </div>
    </div>
  );
};

export default Oportunidades;
