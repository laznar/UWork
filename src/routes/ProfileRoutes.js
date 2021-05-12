import { Switch, Route, Redirect } from 'react-router-dom';
import Profile from '../views/profile/Profile';
import Password from '../views/profile/Password';
import Edit from '../views/profile/Edit';

const ProfileRoutes = () => {
  return (
    <div>
      <div
        className="container"
        style={{ paddingTop: 100, paddingBottom: 100 }}
      >
        <Switch>
          <Route exact path="/profile/password" component={Password} />
          <Route exact path="/profile/edit" component={Edit} />
          <Route exact path="/profile" component={Profile} />
          <Redirect to="/profile" />
        </Switch>
      </div>
    </div>
  );
};

export default ProfileRoutes;
