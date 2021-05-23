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
import ProfileRoutes from './ProfileRoutes';
import Reviews from '../views/profile/Reviews';
import Resultados from '../views/results/Resultados';
import Pagos from '../views/payments/Pagos';
import MultiStepForm from '../views/worker/MultiStepForm';
import ScrollToTop from '../components/ScrollToTop';
import Oportunidades from '../views/Oportunidades';
import Servicios from '../views/Servicios';
import Dashboard from '../views/Dashboard';
import Mensajes from '../views/Mensajes';
import Proyectos from '../views/Proyectos';

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
            isAuthenticated={isAuthenticated}
            component={AuthRoutes}
            path="/auth"
          />
          {!auth?.userData?.isWorker && (
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              component={MultiStepForm}
              path="/complete"
              exact
            />
          )}

          {auth?.userData?.isWorker && (
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              component={Oportunidades}
              path="/oportunidades"
              exact
            />
          )}

          {auth?.userData?.isWorker && (
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              component={Servicios}
              path="/mis-servicios"
              exact
            />
          )}

          <PrivateRoute
            isAuthenticated={isAuthenticated}
            component={Dashboard}
            path="/dashboard"
            exact
          />

          <PrivateRoute
            isAuthenticated={isAuthenticated}
            component={Mensajes}
            path="/mensajes"
            exact
          />
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            component={Proyectos}
            path="/proyectos"
            exact
          />

          <PrivateRoute
            isAuthenticated={isAuthenticated}
            component={ProfileRoutes}
            path="/perfil"
          />

          {auth?.userData?.isWorker && (
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              component={Reviews}
              path="/reviews"
              exact
            />
          )}

          <Route path="/resultados" component={Resultados} exact />

          <PrivateRoute
            isAuthenticated={isAuthenticated}
            component={Pagos}
            path="/payment-gateway"
            exact
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
