import { Switch, Route, Redirect } from 'react-router-dom';
import LogIn from '../components/auth/LogIn';
import SignUp from '../components/auth/SignUp';

const AuthRoutes = () => {
  return (
    <div
      style={{ maxWidth: 500 }}
      className="mx-auto mt-4 border rounded-3 p-4 shadow-sm"
    >
      <Switch>
        <Route exact path="/auth/register" component={SignUp} />
        <Route exact path="/auth/login" component={LogIn} />

        <Redirect to="/auth/login" />
      </Switch>
    </div>
  );
};

export default AuthRoutes;
