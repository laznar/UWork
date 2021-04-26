import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import NavBar from '../components/NavBar';
import AuthRoutes from './AuthRoutes';
import { Toaster } from 'react-hot-toast';

import Home from '../views/home/Home';

const AppRouter = () => {
  return (
    <Router>
      <Toaster />
      <NavBar />
      <div>
        <Switch>
          <Route path="/auth" component={AuthRoutes} />
          <Route exact path="/" component={Home} />

          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
