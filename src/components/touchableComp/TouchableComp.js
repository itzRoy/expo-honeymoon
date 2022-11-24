import React from 'react';
import {
  View,
  Platform,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

import colors from '../../styles/colors';
import { ms } from 'react-native-size-matters';
import { CircleSnail } from 'react-native-progress';

import styles from './touchableComp.styles';

let TouchableComponent = TouchableOpacity;

if (Platform.OS === 'android' && Platform.Version > 21) {
  TouchableComponent = TouchableHighlight;
}

const TouchableComp = ({
  style,
  onPress,
  disabled,
  children,
  isLoading,
  removeActiveOpacity,
}) => (
  <TouchableComponent
    tension={50}
    friction={7}
    style={style}
    activeScale={1}
    useNativeDriver
    onPress={onPress}
    disabled={disabled}
    underlayColor={colors.clear}
    activeOpacity={removeActiveOpacity ? 1 : 0.8}>
    <View style={isLoading ? styles.container : {}}>
      {children}
      {isLoading && (
        <CircleSnail
          thickness={2}
          color={colors.white}
          size={ms(15)}
          style={{ marginLeft: ms(10) }}
        />
      )}
    </View>
  </TouchableComponent>
);

export default TouchableComp;
