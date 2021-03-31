import React, {FC} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
  TransitionPresets,
} from '@react-navigation/stack';

import {useAuth} from './AuthContext';
import Loading from './components/Loading';
import {
  HomeNonModalStackParamList,
  SettingsStackParamList,
  HomeStackParamList,
  RootTabParamList,
  RootStackParamList,
} from './types';
import CreateBill from './views/CreateBill';
import Home from './views/Home';
import InstallmentDetails from './views/InstallmentDetails';
import Login from './views/Login';
import Settings from './views/Settings';

const Navigator: FC = () => {
  const {state} = useAuth();
  const RootStack = createStackNavigator<RootStackParamList>();
  const HomeStack = createStackNavigator<HomeStackParamList>();
  const SettingsStack = createStackNavigator<SettingsStackParamList>();
  const HomeNonModalStack = createStackNavigator<HomeNonModalStackParamList>();
  const RootTab = createBottomTabNavigator<RootTabParamList>();

  const RootTabScreens = () => (
    <RootTab.Navigator>
      <RootTab.Screen
        name="HomeStack"
        component={HomeStackScreens}
        options={{title: 'Bills'}}
      />
      <RootTab.Screen
        name="SettingsStack"
        component={SettingsStackScreens}
        options={{title: 'Settings'}}
      />
    </RootTab.Navigator>
  );

  const SettingsStackScreens = () => (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={Settings} />
    </SettingsStack.Navigator>
  );

  const HomeStackScreens = () => (
    <HomeStack.Navigator
      mode="modal"
      screenOptions={({
        route,
        navigation,
      }: {
        route: RouteProp<
          HomeStackParamList,
          'HomeNonModalStack' | 'CreateBill'
        >;
        navigation: StackNavigationProp<HomeStackParamList>;
      }) => ({
        gestureEnabled: true,
        cardOverlayEnabled: true,
        headerStatusBarHeight:
          navigation
            .dangerouslyGetState()
            .routes.findIndex((r) => r.key === route.key) > 0
            ? 0
            : undefined,
        ...TransitionPresets.ModalPresentationIOS,
      })}>
      <HomeStack.Screen
        name="HomeNonModalStack"
        component={HomeNonModalStackScreens}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="CreateBill"
        component={CreateBill}
        options={{title: 'New Bill'}}
      />
    </HomeStack.Navigator>
  );

  const HomeNonModalStackScreens = () => (
    <HomeNonModalStack.Navigator>
      <HomeNonModalStack.Screen
        name="Home"
        component={Home}
        options={{title: 'Bills'}}
      />
      <HomeNonModalStack.Screen
        name="Details"
        component={InstallmentDetails}
        options={{title: 'Installment'}}
      />
    </HomeNonModalStack.Navigator>
  );

  if (state.isLoading) {
    return <Loading />;
  }
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {state.userToken ? (
          <RootStack.Screen
            name="RootTab"
            component={RootTabScreens}
            options={{headerShown: false}}
          />
        ) : (
          <RootStack.Screen
            name="Login"
            component={Login}
            options={{title: 'Billy'}}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
