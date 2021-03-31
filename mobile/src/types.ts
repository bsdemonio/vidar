import {NavigatorScreenParams} from '@react-navigation/native';

/**Navigation types */
export type HomeNonModalStackParamList = {
  Home: undefined;
  Details: {installment: Installment};
};

export type SettingsStackParamList = {
  Settings: undefined;
};

export type HomeStackParamList = {
  HomeNonModalStack: NavigatorScreenParams<HomeNonModalStackParamList>;
  CreateBill: undefined;
};

export type RootTabParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  SettingsStack: NavigatorScreenParams<SettingsStackParamList>;
};

export type RootStackParamList = {
  Login: undefined;
  RootTab: NavigatorScreenParams<RootTabParamList>;
};

/**End Navigation types */

export type SignInData = {
  login: {
    token: string;
    tokenExpiration: string;
    user: {
      email: string;
    };
  };
};

export type Bill = {
  id: string;
  name: string;
  installmentsNumber: number;
  total: number;
  balance: number;
};

export type Installment = {
  id: string;
  number: number;
  isPaid: boolean;
  dueDate: string;
  amount: number;
  bill: Bill;
};
