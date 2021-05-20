import { Switch, Route, Redirect } from 'react-router-dom';
import Profile from '../views/profile/Profile';
import Password from '../views/profile/Password';
import NameSurname from '../views/profile/NameSurname';
import DeleteAccount from '../views/profile/DeleteAccount';
import EditEmail from '../views/profile/EditEmail';
import EditPersonalData from '../views/profile/EditPersonalData';
import EditServicesData from '../views/profile/EditServicesData';

const ProfileRoutes = () => {
  return (
    <div>
      <div className="container" style={{ paddingTop: 50, paddingBottom: 100 }}>
        <Switch>
          <Route
            exact
            path="/perfil/nombre-apellidos"
            component={NameSurname}
          />
          <Route exact path="/perfil/borrar" component={DeleteAccount} />
          <Route exact path="/perfil/correo" component={EditEmail} />
          <Route exact path="/perfil/personal" component={EditPersonalData} />
          <Route exact path="/perfil/servicio" component={EditServicesData} />
          <Route exact path="/perfil/clave" component={Password} />
          <Route exact path="/perfil" component={Profile} />
          <Redirect to="/perfil" />
        </Switch>
      </div>
    </div>
  );
};

export default ProfileRoutes;
