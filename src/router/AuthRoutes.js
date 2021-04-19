import { Switch, Route, Redirect } from 'react-router-dom';
import LogIn from '../views/auth/LogIn';
import SignUp from '../views/auth/SignUp';

const AuthRoutes = () => {
  return (
    <div className="container">
      <div
        style={{ maxWidth: 400, marginTop: 150 }}
        className="mx-auto border rounded-3 p-4 shadow-sm"
      >
        <Switch>
          <Route exact path="/auth/register" component={SignUp} />
          <Route exact path="/auth/login" component={LogIn} />
          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </div>
  );
};

export default AuthRoutes;
