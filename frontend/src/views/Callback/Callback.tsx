import React, { useEffect } from 'react';
import { RouterProps } from 'react-router';
import AuthService from 'src/services/auth0Service';
import routes from 'src/constants/routes';

const Callback: React.FC<RouterProps> = ({ history }) => {
  useEffect(() => {
    AuthService.handleAuthentication({
      onFail: () => history.push(routes.LOGIN_PATH),
      onSuccess: () => {
        history.push(routes.HOME_PATH);
      },
    });
  }, []);

  return null;
};

export default Callback;
