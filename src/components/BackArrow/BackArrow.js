import React from 'react';
import {View} from 'react-native';
import BackArrowIcon from '../../assets/images/globals/iconsArrowsRight.svg';
import PropTypes from 'prop-types';
import {ms} from 'react-native-size-matters';
import TouchableComp from '..//touchableComp/TouchableComp';
import AppText from '../appText/AppText';
import colors from '../../styles/colors';
import styles from './styles';

const BackArrow = ({text, extraStyles, onPress, shownButton}) => (
  <View style={[styles.container, extraStyles]}>
    {shownButton && (
      <TouchableComp style={[styles.arrowContainer]} onPress={onPress}>
        <BackArrowIcon height={ms(20)} width={ms(20)} viewBox="0 0 20 20" />
      </TouchableComp>
    )}
    {text ? (
      <View style={styles.titleContainer}>
        <AppText
          color={colors.spaceCadet}
          style={styles.extraStyles}
          typography="title">
          {text}
        </AppText>
      </View>
    ) : null}
  </View>
);

export default BackArrow;
