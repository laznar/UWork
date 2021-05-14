import { Switch, Route, Redirect } from 'react-router-dom';
import LogIn from '../views/auth/LogIn';
import SignUp from '../views/auth/SignUp';
import ResetPassword from '../views/auth/ResetPassword';

const AuthRoutes = () => {
  return (
    <div>
      <div className="container" style={{ paddingTop: 50, paddingBottom: 100 }}>
        <div
          style={{ maxWidth: 400 }}
          className="mx-auto border rounded-3 p-4 shadow-sm bg-white"
        >
          <Switch>
            <Route exact path="/auth/register" component={SignUp} />
            <Route exact path="/auth/login" component={LogIn} />
            <Route exact path="/auth/reset" component={ResetPassword} />
            <Redirect to="/auth/login" />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default AuthRoutes;
