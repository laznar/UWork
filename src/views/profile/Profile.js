import { useSelector, useDispatch } from 'react-redux';
import { ChevronRightIcon } from '@heroicons/react/outline';
import { Link, useHistory } from 'react-router-dom';

import ProfilePhoto from '../../components/ProfilePhoto';
import { startLogout, startAccountDeletion } from '../../redux/actions/auth';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

const Profile = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const history = useHistory();

  const handleLogout = () => {
    dispatch(startLogout());
    history.push('/');
  };

  const handleDeleteOptionClick = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Recuerda: no podrás recuperar la cuenta después',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#45a8d8',
      cancelButtonColor: '#d84545',
      confirmButtonText: 'Borrar cuenta',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startAccountDeletion());
      }
    });
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
            name={auth.userData.name}
            surname={auth.userData.surname}
            photoURL={auth.photoURL}
            className="mb-3"
          />
          <strong>{auth.fullName}</strong>
          <span className="text-muted">{auth.email}</span>
        </div>

        <div className="ms-md-3 mt-3 mt-md-0 flex-grow-1">
          <div className="list-group shadow-sm mb-3">
            <Link
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
              to="/perfil/editar"
            >
              Editar información <ChevronRightIcon width={20} height={20} />
            </Link>
            {
              <Link
                to="/perfil/clave"
                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
              >
                Cambiar contraseña <ChevronRightIcon width={20} height={20} />
              </Link>
            }
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
