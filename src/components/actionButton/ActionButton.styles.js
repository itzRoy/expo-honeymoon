import {StyleSheet} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';
// import colors from 'styles/colors';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: mvs(10),
    flexDirection: 'row',
    width: '100%',
  },

  label: {
    marginRight: ms(3),
    color: 'white',
    fontFamily: 'Helvetica-Bold',
  },
  linearGradient: {
    borderRadius: 10,
  },
});
