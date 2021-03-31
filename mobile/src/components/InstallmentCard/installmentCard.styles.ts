import {StyleSheet} from 'react-native';

import colors from '../../constants/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  left: {
    flex: 1,
    flexDirection: 'row',
  },
  right: {alignItems: 'flex-end', justifyContent: 'flex-start'},
  name: {
    fontSize: 19,
    fontWeight: '500',
    marginBottom: 4,
  },
  info: {
    fontSize: 13,
    marginBottom: 2,
  },
  amount: {
    fontSize: 19,
  },
  status: {
    marginTop: 4,
    width: 50,
    height: 6,
  },
});
