import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ isAuthenticated, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routeProps) => {
        return isAuthenticated ? (
          <Redirect to="/dashboard" />
        ) : (
          <Component {...routeProps} />
        );
      }}
    />
  );
};

export default PublicRoute;
