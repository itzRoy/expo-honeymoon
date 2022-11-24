import React from 'react';
import {Text} from 'react-native';

import Typography, {Typographies} from '../../utils/typography';

import colors from '../../styles/colors';

const AppText = ({
  style,
  color,
  children,
  textAlign,
  typography,
  lineHeight,
  numberLines,
  modifyFontBy,
}) => (
  <Text
    numberOfLines={numberLines}
    style={{
      color,
      textAlign,
      ...Typography[typography],
      lineHeight: Typography[typography].fontSize + lineHeight,
      fontSize: Typography[typography].fontSize + modifyFontBy,
      ...style,
    }}>
    {children}
  </Text>
);


export default AppText;
