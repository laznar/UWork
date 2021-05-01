import Logo from '../assets/img/logo.png';
import Text from '../assets/img/text.png';
import { useRef, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileMenu from './ProfileMenu';

const NavBar = () => {
  const location = useLocation();

  const state = useSelector((state) => state.auth);

  useEffect(() => {
    hideNavBar();
  }, [location]);

  const toggler = useRef(null);

  const collapseTarget = useRef(null);

  const hideNavBar = () => {
    if (collapseTarget.current.classList.contains('show')) {
      toggler.current.click();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom custom-navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img
            className="ms-5"
            src={Logo}
            alt="UWork logo"
            style={{ height: '85px', width: '85px' }}
          ></img>
          <img
            src={Text}
            alt="UWork"
            style={{ height: '85px', width: '85px', padding: 0, margin: 0 }}
          ></img>
        </Link>
        <button
          ref={toggler}
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          ref={collapseTarget}
          className="collapse navbar-collapse"
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
            <li className="nav-item mx-lg-2">
              <NavLink
                exact
                to="/"
                className="nav-link"
                activeClassName="active"
              >
                Inicio
              </NavLink>
            </li>

            {!state.uid && (
              <li className="nav-item mx-lg-2">
                <NavLink
                  to="/auth/register"
                  className="nav-link"
                  activeClassName="active"
                >
                  Crear cuenta
                </NavLink>
              </li>
            )}

            {!state.uid && (
              <li className="nav-item mx-lg-2">
                <NavLink
                  to="/auth/login"
                  className="nav-link"
                  activeClassName="active"
                >
                  Iniciar sesión
                </NavLink>
              </li>
            )}

            <li className="nav-item mx-lg-2">
              <button className="btn btn-primary text-white">
                Sé un Worker
              </button>
            </li>

            {state.uid && (
              <li className="nav-item mx-lg-2">
                <ProfileMenu
                  photoURL={state.photoURL}
                  displayName={state.name}
                />
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
