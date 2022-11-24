import React from 'react';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../styles/colors';
import AppText from '../appText/AppText';
import {CircleSnail} from 'react-native-progress';
import {ms} from 'react-native-size-matters';
import TouchableComp from '../touchableComp/TouchableComp';
import styles from './ActionButton.styles';

const ActionButton = ({
  handlePressActionButton,
  disabled,
  extraStyles,
  title,
  primaryColor,
  secondaryColor,
  isLoading,
}) => (
  <TouchableComp
    onPress={handlePressActionButton}
    disabled={disabled}
    style={[styles.container]}>
    <LinearGradient
      style={[styles.container, extraStyles]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={[
        !disabled ? primaryColor : colors.darkgreyHex,
        !disabled ? secondaryColor : colors.darkgreyHex,
      ]}>
      <AppText typography="actionButtonText" style={styles.label}>
        {title}
      </AppText>

      {isLoading && (
        <CircleSnail
          thickness={2}
          color={colors.black}
          size={ms(15)}
          style={{marginLeft: ms(10)}}
        />
      )}
    </LinearGradient>
  </TouchableComp>
);

export default ActionButton;
