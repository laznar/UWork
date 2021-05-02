import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { startLogout } from '../redux/actions/auth';
import { ChevronDownIcon } from '@heroicons/react/outline';
import ProfilePhoto from './ProfilePhoto';
import { renderName } from '../utils/misc';

const ProfileMenu = ({ photoURL, displayName }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout());
  };

  return (
    <div className="dropdown">
      <button
        id="dropdown"
        data-bs-toggle="dropdown"
        className="cursor-pointer p-1 btn d-flex align-items-center"
      >
        <ProfilePhoto
          width={40}
          height={40}
          photoURL={photoURL}
          displayName={displayName}
        />

        <span className="mx-1">{renderName(displayName)}</span>

        <ChevronDownIcon width={20} height={20} />
      </button>

      <ul
        className="dropdown-menu dropdown-menu-end shadow-sm position-absolute"
        aria-labelledby="dropdown"
      >
        <li>
          <Link className="dropdown-item" to="/profile">
            Perfil
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
