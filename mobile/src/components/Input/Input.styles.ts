import {StyleSheet} from 'react-native';

import colors from '../../constants/colors';

export default StyleSheet.create({
  input: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  border: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.inputBottomBorder,
  },
});
