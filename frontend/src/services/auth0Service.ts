import auth0 from 'auth0-js';
import env from 'src/config';
import { Auth0DecodedHash } from 'auth0-js';

type HandleAuthentication = {
  onSuccess: (authResult: Auth0DecodedHash) => void;
  onFail: (err: any) => void;
};

const {
  REACT_APP_HOST,
  REACT_APP_AUTH0_AUDIENCE,
  REACT_APP_AUTH0_CLIENT_ID,
  REACT_APP_AUTH0_CLIENT_DOMAIN,
} = env;

console.log(env);

const callbackUri = (fragment: string) => `${REACT_APP_HOST}/${fragment}`;

class AuthService {
  auth0 = new auth0.WebAuth({
    audience: REACT_APP_AUTH0_AUDIENCE,
    clientID: REACT_APP_AUTH0_CLIENT_ID || '',
    domain: REACT_APP_AUTH0_CLIENT_DOMAIN || '',
    redirectUri: callbackUri('callback'),
    responseType: 'token id_token',
    scope: 'openid profile email',
  });

  loginWithGoogle = () => {
    this.auth0.authorize({
      connection: 'google-oauth2',
    });
  };

  handleAuthentication = ({ onSuccess, onFail }: HandleAuthentication): void => {
    this.auth0.parseHash((err, authResult) => {
      if (err) {
        return onFail(err);
      }

      if (!authResult) {
        return onFail('Authentication error');
      }

      this.setSession(authResult);
      onSuccess(authResult);
    });
  };

  setSession = (authResult: Auth0DecodedHash) => {
    const { accessToken, idToken, expiresIn } = authResult;

    if (!accessToken || !idToken || !expiresIn) {
      return;
    }

    const expiresAt = JSON.stringify(expiresIn * 1000 + new Date().getTime());
    localStorage.setItem('access_token', `${accessToken}|${idToken}`);
    localStorage.setItem('id_token', idToken);
    localStorage.setItem('expires_at', expiresAt);
  };

  logout = () => {
    this.auth0.logout({
      returnTo: callbackUri(''),
    });

    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  };

  isAuthenticated = () => {
    const expiresAt = localStorage.getItem('expires_at');
    if (expiresAt) {
      const expiresAtDate = JSON.parse(expiresAt);
      return new Date().getTime() < expiresAtDate;
    }
  };
}

export default new AuthService();
