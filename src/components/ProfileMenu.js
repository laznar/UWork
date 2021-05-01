import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { startLogout } from '../redux/actions/auth';
import { ChevronDownIcon } from '@heroicons/react/outline';
import user from '../assets/img/user.svg';

const ProfileMenu = ({ photoURL, displayName }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout());
  };

  const renderName = (name) => {
    return name.split(' ')[0];
  };

  return (
    <div className="dropdown">
      <button
        id="dropdown"
        data-bs-toggle="dropdown"
        className="cursor-pointer p-1 btn"
      >
        <img
          className="border border-2 rounded-circle object-position-center object-fit-cover"
          width={40}
          height={40}
          src={photoURL ? photoURL : user}
          alt="Profile pic"
        />

        <span className="mx-1">{renderName(displayName)}</span>

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
          <button className="dropdown-item" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileMenu;
