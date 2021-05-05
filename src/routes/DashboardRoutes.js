import { Switch, Route, Redirect } from 'react-router-dom';
import Oportunidades from '../views/dashboard/Oportunidades';
import Mensajes from '../views/dashboard/Mensajes';
import Servicios from '../views/dashboard/Servicios';
import Proyectos from '../views/dashboard/Proyectos';

const AuthRoutes = () => {
  return (
    <div className="bg-light">
      <div
        className="container"
        style={{ paddingTop: 150, paddingBottom: 150 }}
      >
        <div
          style={{ maxWidth: 400 }}
          className="mx-auto border rounded-3 p-4 shadow-sm bg-white"
        >
          <Switch>
            <Route
              exact
              path="/dashboard/oportunidades"
              component={Oportunidades}
            />
            <Route
              exact
              path="/dashboard/mis-servicios"
              component={Servicios}
            />
            <Route exact path="/dashboard/mensajes" component={Mensajes} />
            <Route exact path="/dashboard/proyectos" component={Proyectos} />
            <Redirect to="/dashboard" />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default AuthRoutes;
