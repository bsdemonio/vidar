/**
 * @format
 */
import React from 'react';

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';

import {name as appName} from './app.json';
import App from './src/views/App';

const Root = () => <App />;

AppRegistry.registerComponent(appName, () => Root);
