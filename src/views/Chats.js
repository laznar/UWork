import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChatCard from '../components/cards/ChatCard';
import { startSearchOpportunitiesChats } from '../redux/actions/opportunities';

const Chats = () => {
  const dispatch = useDispatch();

  const opportunities = useSelector((state) => state.opportunities);

  useEffect(() => {
    dispatch(startSearchOpportunitiesChats());
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
            <h2 className="mb-4">Mensajes</h2>
            {opportunities.results.map((mensaje, idx) => {
              return <ChatCard key={idx} {...mensaje} />;
            })}
          </div>
        ) : (
          <h3>No se encontraron chats</h3>
        )}
      </div>
    </div>
  );
};

export default Chats;
