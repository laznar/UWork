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
import { firebase, db } from '../firebase';
import Home from '../views/home/Home';
import AppLoading from '../components/AppLoading';
import Footer from '../views/home/Footer';
import DashboardRoutes from './DashboardRoutes';
import ProfileRoutes from './ProfileRoutes';
import Worker from '../views/worker/Worker';
import Reviews from '../views/profile/Reviews';
import Resultados from '../views/results/Resultados';

const AppRouter = () => {
  const dispatch = useDispatch();
  const authUi = useSelector((state) => state.authUi);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      try {
        if (user?.uid && !authUi.loading) {
          const userRef = db.collection('users').doc(user.uid);
          const doc = await userRef.get();

          dispatch(
            login(
              user.uid,
              user.email,
              doc.data().name,
              doc.data().surname,
              user.displayName,
              user.photoURL
            )
          );
          setIsAuthenticated(true);
        } else if (!authUi.loading) {
          setIsAuthenticated(false);
        }

        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        setIsAuthenticated(false);
      }
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

          <Route path="/worker" exact component={Worker} />
          <Route path="/reviews" exact component={Reviews} />

          <Route path="/resultados" exact component={Resultados} />
          <Route exact path="/" component={Home} />

          <Redirect to="/" />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
};

export default AppRouter;
