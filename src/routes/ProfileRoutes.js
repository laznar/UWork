import { Switch, Route, Redirect } from 'react-router-dom';
import Profile from '../views/profile/Profile';
import Password from '../views/profile/Password';
import Edit from '../views/profile/Edit';

const ProfileRoutes = () => {
  return (
    <div>
      <div className="container" style={{ paddingTop: 50, paddingBottom: 100 }}>
        <Switch>
          <Route exact path="/perfil/clave" component={Password} />
          <Route exact path="/perfil/editar" component={Edit} />
          <Route exact path="/perfil" component={Profile} />
          <Redirect to="/perfil" />
        </Switch>
      </div>
    </div>
  );
};

export default ProfileRoutes;
