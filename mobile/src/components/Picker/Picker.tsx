import React, {FC, ReactText} from 'react';

import {PickerIOS} from '@react-native-picker/picker';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

import styles from './Picker.styles';

export type PickerData = {[value: string]: string};

type Props = {
  onChangeText: (value: ReactText) => void;
  placeholder: string;
  borderless?: boolean;
  value: string;
  onPress?: () => void;
  open?: boolean;
  data: PickerData;
  name: string;
  extraText?: string;
};

const Picker: FC<Props> = ({
  onChangeText,
  placeholder,
  borderless,
  value,
  onPress,
  open,
  data,
  name,
  extraText = '',
}) => {
  return (
    <View style={borderless ? {} : styles.border}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.control}>
          <Text>{placeholder}</Text>
          <TextInput
            editable={false}
            onChangeText={onChangeText}
            value={data && `${data[value]} ${extraText}`}
          />
        </View>
      </TouchableOpacity>
      {open && (
        <PickerIOS selectedValue={value} onValueChange={onChangeText}>
          {Object.entries(data).map(([val, label]) => (
            <PickerIOS.Item key={`${name}-${val}`} label={label} value={val} />
          ))}
        </PickerIOS>
      )}
    </View>
  );
};

export default Picker;
