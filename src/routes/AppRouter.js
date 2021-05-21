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

import { login, setUserData } from '../redux/actions/auth';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { firebase, db } from '../firebase';
import Home from '../views/home/Home';
import AppLoading from '../components/AppLoading';
import Footer from '../views/home/Footer';
import DashboardRoutes from './DashboardRoutes';
import ProfileRoutes from './ProfileRoutes';
import Reviews from '../views/profile/Reviews';
import Resultados from '../views/results/Resultados';
import Pagos from '../views/payments/Pagos';
import MultiStepForm from '../views/worker/MultiStepForm';
import ScrollToTop from '../components/ScrollToTop';

const AppRouter = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const authUi = useSelector((state) => state.authUi);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      try {
        if (user?.uid && !authUi.loading) {
          // Reference to user document
          const userRef = db.collection('users').doc(user.uid);
          // Get data
          const doc = await userRef.get();

          dispatch(
            login(
              user.uid,
              user.email,
              user.photoURL,
              user.providerData[0].providerId
            )
          );
          dispatch(setUserData(doc.data()));
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
      <ScrollToTop />
      <Toaster />
      <NavBar />
      <div className="bg-light">
        <Switch>
          <PublicRoute
            path="/auth"
            isAuthenticated={isAuthenticated}
            component={AuthRoutes}
          />
          {!auth?.userData?.isWorker && (
            <PrivateRoute
              path="/complete"
              isAuthenticated={isAuthenticated}
              exact
              component={MultiStepForm}
            />
          )}
          <PrivateRoute
            path="/dashboard"
            isAuthenticated={isAuthenticated}
            component={DashboardRoutes}
          />
          <PrivateRoute
            path="/perfil"
            isAuthenticated={isAuthenticated}
            component={ProfileRoutes}
          />

          {auth?.userData?.isWorker && (
            <PrivateRoute
              path="/reviews"
              exact
              isAuthenticated={isAuthenticated}
              component={Reviews}
            />
          )}
          <Route path="/resultados" exact component={Resultados} />
          <PrivateRoute
            path="/payment-gateway"
            exact
            isAuthenticated={isAuthenticated}
            component={Pagos}
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
