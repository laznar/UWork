import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../redux/actions/auth';
import { ChevronDownIcon } from '@heroicons/react/outline';
import ProfilePhoto from './ProfilePhoto';
import { renderName } from '../utils/misc';

const ProfileMenu = ({ photoURL }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const history = useHistory();
  const handleLogout = () => {
    dispatch(startLogout());
    history.push('/');
  };

  return (
    <div className="dropdown">
      <button
        id="dropdown"
        data-bs-toggle="dropdown"
        className="cursor-pointer p-1 btn d-flex align-items-center"
      >
        <ProfilePhoto
          width={50}
          height={50}
          photoURL={photoURL}
          name={auth.userData.name}
          surname={auth.userData.surname}
        />

        <span className="mx-2">{renderName(auth.userData.name)}</span>

        <ChevronDownIcon width={20} height={20} />
      </button>

      <ul
        className="dropdown-menu dropdown-menu-end shadow-sm position-absolute"
        aria-labelledby="dropdown"
      >
        <li>
          <Link className="dropdown-item" to="/perfil">
            Perfil
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to="/dashboard">
            Dashboard
          </Link>
        </li>
        {auth?.userData?.isWorker && (
          <li>
            <Link className="dropdown-item" to="/reviews">
              Reviews
            </Link>
          </li>
        )}
        <li>
          <Link className="dropdown-item" to="/payment-gateway">
            Pagos
          </Link>
        </li>
        <li>
          <button className="dropdown-item" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileMenu;
