import Logo from '../assets/img/logo.png';
import { NavLink, Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img
            className="ms-5"
            src={Logo}
            alt="UWork logo"
            style={{ height: '80px', width: '80px' }}
          ></img>
        </Link>
        <button
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
        <div className="collapse navbar-collapse" id="navbarNav">
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

            <li className="nav-item mx-lg-2">
              <NavLink
                to="/auth/register"
                className="nav-link"
                activeClassName="active"
              >
                Crear cuenta
              </NavLink>
            </li>

            <li className="nav-item mx-lg-2">
              <NavLink
                to="/auth/login"
                className="nav-link"
                activeClassName="active"
              >
                Iniciar sesión
              </NavLink>
            </li>

            <li className="nav-item mx-lg-2">
              <button className="btn btn-primary text-white">
                Sé un Worker
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
