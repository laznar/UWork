import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import NavBar from '../components/NavBar';
import AuthRoutes from './AuthRoutes';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../redux/actions/auth';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { firebase } from '../firebase';
import Home from '../views/home/Home';
import AppLoading from '../components/AppLoading';
import Footer from '../views/home/Footer';
import DashboardRoutes from './DashboardRoutes';
import ProfileRoutes from './ProfileRoutes';

const AppRouter = () => {
  const dispatch = useDispatch();
  const authUi = useSelector((state) => state.authUi);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid && user?.email && user?.displayName && !authUi.loading) {
        dispatch(login(user.uid, user?.email, user.displayName, user.photoURL));
        setIsAuthenticated(true);
      } else if (!authUi.loading) {
        setIsAuthenticated(false);
      }

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    });
  }, [dispatch, authUi.loading]);

  if (loading) {
    return <AppLoading />;
  }

  return (
    <Router>
      <Toaster />
      <NavBar />
      <div className="bg-light">
        <Switch>
          <PublicRoute
            path="/auth"
            isAuthenticated={isAuthenticated}
            component={AuthRoutes}
          />
          <PrivateRoute
            path="/dashboard"
            isAuthenticated={isAuthenticated}
            component={DashboardRoutes}
          />
          <PrivateRoute
            path="/profile"
            isAuthenticated={isAuthenticated}
            component={ProfileRoutes}
          />

          <Route exact path="/" component={Home} />

          <Redirect to="/" />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
};

export default AppRouter;
