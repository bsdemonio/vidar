import React from 'react';
import AuthService from 'src/services/auth0Service';

const Login = () => {
  return (
    <div>
      <button onClick={AuthService.loginWithGoogle}>Log in with Google</button>
    </div>
  );
};

export default Login;
