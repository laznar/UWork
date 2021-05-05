import { NavLink, Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DashBoardNav = () => {
  const location = useLocation();

  const state = useSelector((state) => state.auth);

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom">
      <div class="container">
        <ul className="navbar-nav mr-auto mb-2 mb-lg-0 d-flex align-items-center custom-dashnav">
          {state.uid && (
            <li className="nav-item mx-lg-2">
              <NavLink
                exact
                to="/dashboard/oportunidades"
                className="nav-link"
                activeClassName="active"
              >
                Oportunidades
              </NavLink>
            </li>
          )}
          {state.uid && (
            <li className="nav-item mx-lg-2">
              <NavLink
                to="/dashboard/mis-servicios"
                className="nav-link"
                activeClassName="active"
              >
                Mis Servicios
              </NavLink>
            </li>
          )}
          {state.uid && (
            <li className="nav-item mx-lg-2">
              <NavLink
                to="/dashboard/mensajes"
                className="nav-link"
                activeClassName="active"
              >
                Mensajes
              </NavLink>
            </li>
          )}
          {state.uid && (
            <li className="nav-item mx-lg-2">
              <NavLink
                to="/dashboard/proyectos"
                className="nav-link"
                activeClassName="active"
              >
                Proyectos
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default DashBoardNav;
