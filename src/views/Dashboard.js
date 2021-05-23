import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

const Dashboard = ({ history }) => {
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.userData.pendingWorker) {
      Swal.fire({
        title: 'Sé un Worker',
        text: 'Completa tu información para terminar tu registro como Worker',
        confirmButtonText: 'Completar información',
        showCancelButton: true,
        cancelButtonText: 'En otro momento',
        cancelButtonColor: '#aeaeae',
        confirmButtonColor: '#45a8d8'
      }).then((result) => {
        if (result.isConfirmed) {
          history.push('/complete');
        }
      });
    }
  }, [auth.userData.pendingWorker, history]);
  return (
    <div className="container custom-container">
      <div className="container mx-auto" style={{ maxWidth: 600 }}>
        <h1>Dashboard</h1>
      </div>
    </div>
  );
};

export default Dashboard;
