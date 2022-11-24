import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { SvgXml } from 'react-native-svg';
// import { getOnlyheaderElements } from '../../../api';
import Filter from '../../assets/images/globals/filter.svg'
import Plus from '../../assets/images/globals/plus.svg'
import PlusBtn from '../plusBtn/plusBtn';
import { getHeader } from '../../../api';
import styles from './header.styles';
import HeaderBtn from '../headerBtn/headerBtn';

const Header = ({ isActive, setIsActive, count, headerElements,categories, statuses, onFilterPress, navigation }) => {
  const onPressHandler = name => () => {
    setIsActive(name)
  }

  useEffect(() => {
    setIsActive('all')

  }, [])
  return (
    <View style={styles.outerContainer}>
      <TouchableOpacity style={styles.filter} onPress={onFilterPress}>
        <Filter />
      </TouchableOpacity>
      <ScrollView showsHorizontalScrollIndicator={false} style={styles.wraper} horizontal>
        {headerElements.length ? headerElements.map((name, i) => {
          return (
            <HeaderBtn
              key={i}
              name={name}
              onPressHandler={onPressHandler}
              isActive={isActive}
              number={count}
            />
          );
        }) : null}
      </ScrollView>
      <TouchableOpacity style={styles.add} onPress={() => navigation.navigate('formPage', {address: headerElements, categories, statuses})}>
        <PlusBtn />
      </TouchableOpacity>

    </View>
  );
};

export default Header;

