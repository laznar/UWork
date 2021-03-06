import { Switch, Route, Redirect } from 'react-router-dom';
import Profile from '../views/profile/Profile';
import Password from '../views/profile/Password';
import NameSurname from '../views/profile/EditNameSurname';
import EditEmail from '../views/profile/EditEmail';
import EditPersonalData from '../views/profile/EditPersonalData';
import EditServicesData from '../views/profile/EditServicesData';
import EditProfilePhoto from '../views/profile/EditProfilePhoto';

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
          <Route exact path="/perfil/correo" component={EditEmail} />
          <Route exact path="/perfil/personal" component={EditPersonalData} />
          <Route exact path="/perfil/servicio" component={EditServicesData} />
          <Route exact path="/perfil/foto" component={EditProfilePhoto} />
          <Route exact path="/perfil/clave" component={Password} />
          <Route exact path="/perfil" component={Profile} />
          <Redirect to="/perfil" />
        </Switch>
      </div>
    </div>
  );
};

export default ProfileRoutes;
