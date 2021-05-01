import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import NavBar from '../components/NavBar';
import AuthRoutes from './AuthRoutes';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';

import { login } from '../redux/actions/auth';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { firebase } from '../firebase';
import Home from '../views/home/Home';
import Dashboard from '../views/dashboard/Dashboard';
import AppLoading from '../components/AppLoading';
import Profile from '../views/profile/Profile';

const AppRouter = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName, user.photoURL));
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }

      setLoading(false);
    });
  }, [dispatch]);

  if (loading) {
    return <AppLoading />;
  }

  return (
    <Router>
      <Toaster />
      <NavBar />
      <div>
        <Switch>
          <PublicRoute
            path="/auth"
            isAuthenticated={isAuthenticated}
            component={AuthRoutes}
          />
          <PrivateRoute
            path="/dashboard"
            isAuthenticated={isAuthenticated}
            component={Dashboard}
          />
          <PrivateRoute
            path="/perfil"
            isAuthenticated={isAuthenticated}
            component={Profile}
          />
          <Route exact path="/" component={Home} />

          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
