import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DashboardNav = () => {
  const auth = useSelector((state) => state.auth);
  return (
    <ul className="navbar-nav ms-auto d-flex align-items-center">
      {auth?.userData?.isWorker && (
        <>
          <li className="nav-item my-1 my-lg-0 mx-lg-2">
            <NavLink
              exact
              to="/dashboard/oportunidades"
              className="nav-link custom-navlink-border border-2 px-0 pb-0 pt-1"
              activeClassName="active text-primary border-primary"
            >
              Oportunidades
            </NavLink>
          </li>
          <li className="nav-item my-1 my-lg-0 mx-lg-2">
            <NavLink
              to="/dashboard/mis-servicios"
              className="nav-link custom-navlink-border border-2 px-0 pb-0 pt-1"
              activeClassName="active text-primary border-primary"
            >
              Mis Servicios
            </NavLink>
          </li>
        </>
      )}

      <li className="nav-item my-1 my-lg-0 mx-lg-2">
        <NavLink
          to="/dashboard/mensajes"
          className="nav-link custom-navlink-border border-2 px-0 pb-0 pt-1"
          activeClassName="active text-primary border-primary"
        >
          Mensajes
        </NavLink>
      </li>

      <li className="nav-item my-1 my-lg-0 mx-lg-2">
        <NavLink
          to="/dashboard/proyectos"
          className="nav-link custom-navlink-border border-2 px-0 pb-0 pt-1"
          activeClassName="active text-primary border-primary"
        >
          Proyectos
        </NavLink>
      </li>
    </ul>
  );
};

export default DashboardNav;
