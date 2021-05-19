import { useSelector, useDispatch } from 'react-redux';
import { ChevronRightIcon } from '@heroicons/react/outline';
import { Link, useHistory } from 'react-router-dom';

import ProfilePhoto from '../../components/ProfilePhoto';
import { startLogout } from '../../redux/actions/auth';
import 'sweetalert2/src/sweetalert2.scss';

const Profile = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const history = useHistory();

  const handleLogout = () => {
    dispatch(startLogout());
    history.push('/');
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
          <strong>{`${auth.userData.name} ${auth.userData.surname}`}</strong>
          <span className="text-muted">{auth.email}</span>
        </div>

        <div className="ms-md-3 mt-3 mt-md-0 flex-grow-1">
          <div className="list-group shadow-sm mb-3">
            {/*  This could be a component (ProfileOption ?) */}
            <Link
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
              to="/perfil/nombre-apellidos"
            >
              Editar nombre y apellido
              <ChevronRightIcon width={20} height={20} />
            </Link>

            <Link
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
              to="/perfil/correo"
            >
              Editar correo
              <ChevronRightIcon width={20} height={20} />
            </Link>

            <Link
              to="/perfil/clave"
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            >
              Cambiar contraseña <ChevronRightIcon width={20} height={20} />
            </Link>
          </div>

          <div className="list-group shadow-sm mb-3">
            <Link
              to="/perfil/borrar"
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            >
              Borrar cuenta
              <ChevronRightIcon width={20} height={20} />
            </Link>
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
