import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import paths from 'src/constants/routes';
import { Container } from './App.styled';

import ProtectedRoute from 'src/components/ProtectedRoute';
import Callback from 'src/views/Callback';

const Login = lazy(() => import('src/views/Login'));
const Home = lazy(() => import('src/views/Home'));

const ProtectedViews = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Switch>
      <Route exact path={`${paths.HOME_PATH}`} component={Home} />
    </Switch>
  </Suspense>
);

const App: React.FC = () => {
  return (
    <Container>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path={paths.LOGIN_PATH} component={Login} />
          <Route path={paths.CALLBACK} component={Callback} />
          <ProtectedRoute component={ProtectedViews} />
        </Switch>
      </Suspense>
    </Container>
  );
};

export default App;
