import React, {FC} from 'react';

import DateTimePicker, {Event} from '@react-native-community/datetimepicker';
import {format} from 'date-fns';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

import styles from './DatePicker.styles';

type Props = {
  onChangeText: (event: Event, value?: Date) => void;
  placeholder: string;
  borderless?: boolean;
  value: string;
  onPress?: () => void;
  open?: boolean;
  name: string;
};

const DatePicker: FC<Props> = ({
  onChangeText,
  placeholder,
  borderless,
  value,
  onPress,
  open,
}) => {
  return (
    <View style={borderless ? {} : styles.border}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.control}>
          <Text>{placeholder}</Text>
          <TextInput
            editable={false}
            value={format(new Date(value), 'MMM d, yyyy')}
          />
        </View>
      </TouchableOpacity>
      {open && (
        <DateTimePicker
          value={new Date(value)}
          mode="date"
          display="inline"
          onChange={onChangeText}
        />
      )}
    </View>
  );
};

export default DatePicker;
