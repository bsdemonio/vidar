import React from 'react';

import {View, Text, Button} from 'react-native';

import {useAuth} from '../../AuthContext';

const Settings = () => {
  const {signOut} = useAuth();
  return (
    <View>
      <Text>Settings</Text>
      <Button title="Log Out" onPress={signOut} />
    </View>
  );
};

export default Settings;
