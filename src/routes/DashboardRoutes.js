import { Switch, Route, Redirect } from 'react-router-dom';
import Oportunidades from '../views/dashboard/Oportunidades';
import Mensajes from '../views/dashboard/Mensajes';
import Servicios from '../views/dashboard/Servicios';
import Proyectos from '../views/dashboard/Proyectos';
import Dashboard from '../views/dashboard/Dashboard';

const DashboardRoutes = () => {
  return (
    <div>
      <div
        className="container"
        style={{ paddingTop: 100, paddingBottom: 100 }}
      >
        <Switch>
          <Route
            exact
            path="/dashboard/oportunidades"
            component={Oportunidades}
          />
          <Route exact path="/dashboard/mis-servicios" component={Servicios} />
          <Route exact path="/dashboard/mensajes" component={Mensajes} />
          <Route exact path="/dashboard/proyectos" component={Proyectos} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Redirect to="/dashboard" />
        </Switch>
      </div>
    </div>
  );
};

export default DashboardRoutes;
