import { NavLink } from 'react-router-dom';

const DashboardNav = () => {
  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
      <li className="nav-item mx-lg-2">
        <NavLink
          exact
          to="/dashboard/oportunidades"
          className="nav-link custom-navlink-border border-2 px-0 pb-0 pt-1"
          activeClassName="active text-primary border-primary"
        >
          Oportunidades
        </NavLink>
      </li>

      <li className="nav-item mx-lg-2">
        <NavLink
          to="/dashboard/mis-servicios"
          className="nav-link custom-navlink-border border-2 px-0 pb-0 pt-1"
          activeClassName="active text-primary border-primary"
        >
          Servicios/Habilidades
        </NavLink>
      </li>

      <li className="nav-item mx-lg-2">
        <NavLink
          to="/dashboard/mensajes"
          className="nav-link custom-navlink-border border-2 px-0 pb-0 pt-1"
          activeClassName="active text-primary border-primary"
        >
          Mensajes
        </NavLink>
      </li>

      <li className="nav-item mx-lg-2">
        <NavLink
          to="/dashboard/calendario"
          className="nav-link custom-navlink-border border-2 px-0 pb-0 pt-1"
          activeClassName="active text-primary border-primary"
        >
          Calendario
        </NavLink>
      </li>
    </ul>
  );
};

export default DashboardNav;
