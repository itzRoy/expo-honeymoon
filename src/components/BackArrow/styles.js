import {StyleSheet} from 'react-native';
import {ms} from 'react-native-size-matters';
import colors from '../../styles/colors';
import Typography from '../../utils/typography';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowContainer: {
    padding: ms(8),
  },
  text: {
    lineHeight: ms(45),
    textAlign: 'left',
    ...Typography.settingsHeaderTitle,
    color: colors.white,
  },
  extraStyles: {
    fontSize: 24,
    alignSelf: 'center',
  },
  titleContainer: {
    position: 'absolute',
    width: '100%',
    zIndex: -10,
    alignSelf: 'center',
    alignItems: 'center',
  },
});

export default styles;
