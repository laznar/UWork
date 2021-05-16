import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ChevronRightIcon } from '@heroicons/react/outline';
import { Link, useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';

import ProfilePhoto from '../../components/ProfilePhoto';
import { startLogout, startAccountDeletion } from '../../redux/actions/auth';
import CustomButton from '../../components/form-controls/CustomButton';

const Profile = () => {
  const dispatch = useDispatch();
  const [toastId, setToastId] = useState(null);
  const auth = useSelector((state) => state.auth);
  const authUi = useSelector((state) => state.authUi);

  const history = useHistory();

  const handleLogout = () => {
    dispatch(startLogout());
    history.push('/');
  };

  const handleDeleteClick = () => {
    if (!authUi.loading) {
      dispatch(startAccountDeletion());
    }
  };

  const handleDeleteOptionClick = () => {
    if (toastId) {
      toast.dismiss(toastId);
    }
    setToastId(
      toast(
        <div className="d-flex align-items-center">
          ¿Deseas borrar tu cuenta?
          <CustomButton
            onClick={handleDeleteClick}
            className="ms-2 btn btn-danger btn-sm"
            loading={authUi.loading}
          >
            Borrar
          </CustomButton>
        </div>,
        {
          icon: '⚠️'
        }
      )
    );
  };

  return (
    <div className="fade-anim">
      <div className="d-flex flex-md-row flex-column flex-grow-1">
        <div
          style={{ minWidth: 290 }}
          className="border rounded shadow-sm p-4 bg-white d-flex flex-column align-items-center"
        >
          <ProfilePhoto
            height={124}
            width={124}
            displayName={auth.fullName}
            photoURL={auth.photoURL}
            className="mb-3"
          />
          <strong>{auth.name}</strong>
          <span className="text-muted">{auth.email}</span>
        </div>

        <div className="ms-md-3 mt-3 mt-md-0 flex-grow-1">
          <div className="list-group shadow-sm mb-3">
            <Link
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
              to="/profile/edit"
            >
              Editar información <ChevronRightIcon width={20} height={20} />
            </Link>
            <Link
              to="/profile/password"
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            >
              Cambiar contraseña <ChevronRightIcon width={20} height={20} />
            </Link>
          </div>

          <div className="list-group shadow-sm mb-3">
            <button
              onClick={handleDeleteOptionClick}
              className="list-group-item list-group-item-action"
            >
              Borrar cuenta
            </button>
          </div>

          <div className="list-group shadow-sm">
            <button
              onClick={handleLogout}
              className="list-group-item list-group-item-action"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
