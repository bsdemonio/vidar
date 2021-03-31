import React, {FC, ReactNode} from 'react';

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {onError} from '@apollo/client/link/error';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useAuth} from './AuthContext';

type Props = {
  children: ReactNode;
};

const CustomApolloProvider: FC<Props> = ({children}) => {
  const {dispatch} = useAuth();

  const httpLink = createHttpLink({
    //uri: 'https://bill-calendar.herokuapp.com/',
    uri: 'http://localhost:4000',
  });

  const logoutLink: ApolloLink = onError(({networkError}) => {
    if (
      networkError &&
      'statusCode' in networkError &&
      networkError.statusCode === 401
    ) {
      AsyncStorage.removeItem('@auth_token')
        .then(() => dispatch({type: 'SIGN_OUT'}))
        .catch(() =>
          console.error('AsyncStorage: unable to remove user token'),
        );
    }
  });

  const authLink: ApolloLink = setContext(async (_, {headers}) => {
    let token;
    try {
      token = await AsyncStorage.getItem('@auth_token');
    } catch (e) {
      console.error('AsyncStorage: unable to retrieve user token');
    }
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const client = new ApolloClient({
    link: logoutLink.concat(authLink).concat(httpLink),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client} children={children} />;
};

export default CustomApolloProvider;
