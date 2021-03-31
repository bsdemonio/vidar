import {StyleSheet} from 'react-native';

import colors from '../../constants/colors';

export default StyleSheet.create({
  border: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.inputBottomBorder,
  },
  control: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
