import React, {
  FC,
  createContext,
  useContext,
  useReducer,
  useMemo,
  useEffect,
  ReactNode,
  Dispatch,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {SignInData} from './types';

type State = {
  userToken?: string | null;
  isLoading: boolean;
  isSignOut: boolean;
};

type Action =
  | {type: 'RESTORE_TOKEN'; token?: string | null}
  | {type: 'SIGN_IN'; token?: string | null}
  | {type: 'SIGN_OUT'};

type Context = {
  signIn: (data: SignInData) => void;
  signOut: () => void;
  state: State;
  dispatch: Dispatch<Action>;
};

export const AuthContext = createContext<Context>({
  state: {isLoading: false, isSignOut: false},
  dispatch: () => console.warn('no auth provider'),
  signIn: (_: SignInData) => console.warn('no auth provider'),
  signOut: () => console.warn('no auth provider'),
});

type Props = {
  children: ReactNode;
};

const AuthProvider: FC<Props> = ({children}) => {
  const [state, dispatch] = useReducer(
    (prevState: State, action: Action): State => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignOut: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignOut: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignOut: false,
      userToken: null,
    },
  );
  const authContext = useMemo(
    () => ({
      signIn: (data: SignInData) => {
        AsyncStorage.setItem('@auth_token', data.login.token)
          .then(() => dispatch({type: 'SIGN_IN', token: data.login.token}))
          .catch(() => {
            console.error('AsyncStorage: unable to save user token');
          });
      },
      signOut: async () => {
        AsyncStorage.removeItem('@auth_token')
          .then(() => dispatch({type: 'SIGN_OUT'}))
          .catch(() => {
            console.error('AsyncStorage: unable to remove user token');
          });
      },
    }),
    [],
  );
  useEffect(() => {
    const restoreToken = () => {
      //await AsyncStorage.clear();
      AsyncStorage.getItem('@auth_token')
        .then((token) => dispatch({type: 'RESTORE_TOKEN', token}))
        .catch(() => {
          console.error('AsyncStorage: unable to retrieve user token');
        });
    };

    restoreToken();
  }, []);
  return (
    <AuthContext.Provider value={{...authContext, state, dispatch}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
