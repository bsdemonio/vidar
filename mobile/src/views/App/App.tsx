import React, {FC} from 'react';

import FlashMessage from 'react-native-flash-message';

import ApolloProvider from '../../ApolloProvider';
import AuthProvider from '../../AuthContext';
import Navigator from '../../Navigator';

const App: FC = () => {
  return (
    <AuthProvider>
      <ApolloProvider>
        <Navigator />
        <FlashMessage position="top" />
      </ApolloProvider>
    </AuthProvider>
  );
};

export default App;
