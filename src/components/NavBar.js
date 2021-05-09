import Logo from '../assets/img/logo.png';
import Text from '../assets/img/text.png';
import { useRef, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileMenu from './ProfileMenu';
import DashboardNav from './DashboardNav';

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
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom custom-navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img
            className="ms-lg-5 ms-3"
            src={Logo}
            alt="UWork logo"
            style={{ height: '85px', width: '85px' }}
          ></img>
          <img src={Text} alt="UWork" style={{ width: '85px' }}></img>
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
          {state.uid && <DashboardNav />}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
            <li className="nav-item my-1 my-lg-0 mx-lg-2">
              <NavLink
                exact
                to="/"
                className="nav-link custom-navlink-border border-2 px-0 pb-0 pt-1"
                activeClassName="active border-primary text-primary"
              >
                Inicio
              </NavLink>
            </li>

            {!state.uid && (
              <li className="nav-item my-1 my-lg-0 mx-lg-2">
                <NavLink
                  to="/auth/register"
                  className="nav-link custom-navlink-border border-2 px-0 pb-0 pt-1"
                  activeClassName="active border-primary text-primary"
                >
                  Sé un cliente
                </NavLink>
              </li>
            )}

            {!state.uid && (
              <li className="nav-item my-1 my-lg-0 mx-lg-2">
                <NavLink
                  to="/auth/login"
                  className="nav-link custom-navlink-border border-2 px-0 pb-0 pt-1"
                  activeClassName="active border-primary text-primary"
                >
                  Iniciar sesión
                </NavLink>
              </li>
            )}

            <li className="nav-item my-1 my-lg-0 mx-lg-2">
              <NavLink to={!state.uid ? '/worker' : '/worker/to-be-worker'}>
                <button className="btn btn-primary text-white">
                  Sé un Worker
                </button>
              </NavLink>
            </li>

            {state.uid && (
              <li className="nav-item mx-lg-3">
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
