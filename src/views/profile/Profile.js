import { useSelector, useDispatch } from 'react-redux';
import { ChevronRightIcon } from '@heroicons/react/outline';
import ProfilePhoto from '../../components/ProfilePhoto';
import { Link } from 'react-router-dom';
import { startLogout } from '../../redux/actions/auth';

const Profile = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  return (
    <div className="fade-anim">
      <h1>Perfil</h1>

      <div className="d-flex flex-md-row flex-column flex-grow-1">
        <div
          style={{ minWidth: 290 }}
          className="border rounded shadow-sm p-4 bg-white d-flex flex-column align-items-center"
        >
          <ProfilePhoto
            height={124}
            width={124}
            displayName={auth.name}
            photoURL={auth.photoURL}
            className="mb-3"
          />
          <strong>{auth.name}</strong>
          <span className="text-muted">{auth.email}</span>
        </div>

        <div className="ms-md-3 mt-3 mt-md-0 flex-grow-1">
          <div className="list-group mb-3 shadow-sm">
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
          <div className="list-group shadow-sm">
            <button
              onClick={() => dispatch(startLogout())}
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
