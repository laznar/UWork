import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import NavBar from '../components/NavBar';
import AuthRoutes from './AuthRoutes';

import Home from '../components/Home';

const AppRouter = () => {
  return (
    <Router>
      <NavBar />
      <div className="container">
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
