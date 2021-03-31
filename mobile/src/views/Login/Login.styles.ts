import {StyleSheet} from 'react-native';

import colors from '../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'space-between',
  },
  data: {
    paddingVertical: 16,
    paddingLeft: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    alignSelf: 'baseline', // hack to wrap content
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 0.5,
    borderTopColor: colors.inputBottomBorder,
  },
  error: {
    marginTop: 16,
    color: colors.overdueTenDays,
  },
});
