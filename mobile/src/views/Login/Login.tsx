import React, {FC, useState} from 'react';

import {useHeaderHeight} from '@react-navigation/stack';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Button as RNButton,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Button from '../../components/Button';
import Input from '../../components/Input';
import Loading from '../../components/Loading';

import styles from './Login.styles';

type Props = {
  onLoginButtonClick: (email: string, password: string) => void;
  loading: boolean;
};

const Login: FC<Props> = ({onLoginButtonClick, loading}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const headerHeight = useHeaderHeight();

  if (loading) {
    return <Loading />;
  }
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      //TODO use correct number for each device
      keyboardVerticalOffset={headerHeight - 36}>
      <SafeAreaView style={styles.inner}>
        <View style={styles.data}>
          <Text style={styles.header}>Log in to Billy</Text>
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoFocus
            autoCorrect={false}
          />
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <View style={styles.footer}>
          <RNButton title="Sign up" onPress={() => null} />
          <Button
            title="Log in"
            onPress={() => onLoginButtonClick(email, password)}
            disabled={!email || !password}
            style={styles.button}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Login;
