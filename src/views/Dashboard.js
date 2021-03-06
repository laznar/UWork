import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';
import {
  UserGroupIcon,
  UserIcon,
  BriefcaseIcon,
  SpeakerphoneIcon
} from '@heroicons/react/outline';

import {
  startFetchOpportunitiesCount,
  startFetchUsersCounts
} from '../redux/actions/dashboard';

const iconsConfig = {
  className: 'flex-shrink-0 fade-anim',
  width: '65%',
  height: '65%'
};

const Dashboard = ({ history }) => {
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const dashboard = useSelector((state) => state.dashboard);

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
          history.push('/completar');
        }
      });
    }
  }, [auth.userData.pendingWorker, history]);

  useEffect(() => {
    dispatch(startFetchUsersCounts());
    dispatch(startFetchOpportunitiesCount());
  }, [dispatch]);

  return (
    <div
      className="container custom-container fade-anim"
      style={{ width: '90%' }}
    >
      <h2>Dashboard</h2>

      {/* Users count */}
      <div className="row g-2 g-sm-3">
        <div className="col-sm-6 col-lg-3">
          <div
            className="bg-white rounded border shadow-sm p-3 d-flex align-items-center h-100"
            style={{ minHeight: 82 }}
          >
            <div
              className="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0"
              style={{
                backgroundColor: 'rgba(169, 137, 197, 0.2)',
                width: 40,
                height: 40
              }}
            >
              <UserGroupIcon {...iconsConfig} color="rgb(169, 137, 197)" />
            </div>

            {dashboard.usersCountsLoading ? (
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <div className="d-flex flex-column fade-anim">
                <strong className="fs-2 lh-1">{dashboard.usersCount}</strong>
                <span className="small lh-sm">
                  {dashboard.usersCount > 1
                    ? 'Usuarios registrados'
                    : 'Usuario registrado'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Workers count */}
        <div className="col-sm-6 col-lg-3">
          <div
            className="bg-white rounded border shadow-sm p-3 d-flex align-items-center h-100"
            style={{ minHeight: 82 }}
          >
            <div
              className="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0"
              style={{
                backgroundColor: 'rgba(136, 191, 77, 0.2)',
                width: 40,
                height: 40
              }}
            >
              <BriefcaseIcon {...iconsConfig} color="rgb(136, 191, 77)" />
            </div>

            {dashboard.usersCountsLoading ? (
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <div className="d-flex flex-column fade-anim">
                <strong className="fs-2 lh-1">{dashboard.workersCount}</strong>
                <span className="small lh-sm">
                  {dashboard.workersCount > 1 ? 'Workers' : 'Worker'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Customers count */}
        <div className="col-sm-6 col-lg-3">
          <div
            className="bg-white rounded border shadow-sm p-3 d-flex align-items-center h-100"
            style={{ minHeight: 82 }}
          >
            <div
              className="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0"
              style={{
                backgroundColor: 'rgba(242, 168, 111, 0.2)',
                width: 40,
                height: 40
              }}
            >
              <UserIcon {...iconsConfig} color="rgb(242, 168, 111)" />
            </div>

            {dashboard.usersCountsLoading ? (
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <div className="d-flex flex-column fade-anim">
                <strong className="fs-2 lh-1">
                  {dashboard.customersCount}
                </strong>
                <span className="small lh-sm">
                  {dashboard.customersCount > 1 ? 'Clientes' : 'Cliente'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Opportunities count */}
        <div className="col-sm-6 col-lg-3">
          <div
            className="bg-white rounded border shadow-sm p-3 d-flex align-items-center h-100"
            style={{ minHeight: 82 }}
          >
            <div
              className="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0"
              style={{
                backgroundColor: 'rgba(239, 140, 140, 0.2)',
                width: 40,
                height: 40
              }}
            >
              <SpeakerphoneIcon {...iconsConfig} color="rgb(239, 140, 140)" />
            </div>

            {dashboard.opportunitiesCountLoading ? (
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <div className="d-flex flex-column fade-anim">
                <strong className="fs-2 lh-1">
                  {dashboard.opportunitiesCount}
                </strong>
                <span className="small lh-sm">
                  {dashboard.opportunitiesCount > 1
                    ? 'Oportunidades creadas'
                    : 'Oportunidad creada'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
