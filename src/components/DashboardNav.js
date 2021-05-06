import { NavLink } from 'react-router-dom';

const DashboardNav = () => {
  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
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

      <li className="nav-item mx-lg-2">
        <NavLink
          to="/dashboard/mis-servicios"
          className="nav-link"
          activeClassName="active"
        >
          Mis Servicios
        </NavLink>
      </li>

      <li className="nav-item mx-lg-2">
        <NavLink
          to="/dashboard/mensajes"
          className="nav-link"
          activeClassName="active"
        >
          Mensajes
        </NavLink>
      </li>

      <li className="nav-item mx-lg-2">
        <NavLink
          to="/dashboard/proyectos"
          className="nav-link"
          activeClassName="active"
        >
          Proyectos
        </NavLink>
      </li>
    </ul>
  );
};

export default DashboardNav;
