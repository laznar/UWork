import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routeProps) => {
        return isAuthenticated ? (
          <Component {...routeProps} />
        ) : (
          <Redirect to="/auth/login" />
        );
      }}
    />
  );
};

export default PrivateRoute;
