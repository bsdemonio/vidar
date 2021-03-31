import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthService from 'src/services/auth0Service';
import paths from 'src/constants/routes';

type Props = {
  component: any;
};

const ProtectedRoute = ({ component: Component, ...rest }: Props) => (
  <Route
    {...rest}
    render={() => {
      if (AuthService.isAuthenticated()) {
        return <Component {...rest} />;
      }

      return <Redirect to={paths.LOGIN_PATH} />;
    }}
  />
);

export default ProtectedRoute;
