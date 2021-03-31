import React, {FC} from 'react';

import {useMutation} from '@apollo/client';
import {showMessage} from 'react-native-flash-message';

import {useAuth} from '../../AuthContext';

import Login from './Login';
import {LOGIN} from './Login.query';

const LoginCompound: FC = () => {
  const {signIn} = useAuth();

  const [login, {loading, error}] = useMutation(LOGIN, {
    onCompleted: async (data) => {
      signIn(data);
    },
    onError: (e) => {
      console.error(JSON.stringify(e, null, 4));
      showMessage({
        message: error?.message || 'Unexpected error, try again',
        type: 'danger',
        duration: 5000,
        icon: 'danger',
      });
    },
  });
  const handleLoginButtonClick = (email: string, password: string) => {
    login({
      variables: {
        email,
        password,
      },
    });
  };

  return (
    <Login loading={loading} onLoginButtonClick={handleLoginButtonClick} />
  );
};

export default LoginCompound;
