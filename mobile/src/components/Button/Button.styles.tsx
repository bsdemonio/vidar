import {StyleSheet} from 'react-native';

import colors from '../../constants/colors';

export default StyleSheet.create({
  container: {
    borderRadius: 32,
    backgroundColor: colors.overdueFiveDays,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  title: {
    fontSize: 16,
    color: colors.white,
  },
  disabled: {
    backgroundColor: colors.listHeaderBackground,
  },
  disabledTitle: {
    color: colors.inputBottomBorder,
  },
});
