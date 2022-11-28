import React, { useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Filter from '../../assets/images/globals/filter.svg'
import PlusBtn from '../plusBtn/plusBtn';
import styles from './header.styles';
import HeaderBtn from '../headerBtn/headerBtn';
import { TextInput } from 'react-native-gesture-handler';
import colors from '../../styles/colors';

const Header = ({ isActive, setIsActive, count, headerElements, categories, statuses, onFilterPress, navigation, search, setSearch }) => {
  const onPressHandler = name => () => {
    setIsActive(name)
  }

  useEffect(() => {
    setIsActive('all')

  }, [])
  return (
    <>
    <View style={styles.outerContainer}>
      <TouchableOpacity style={styles.filter} onPress={onFilterPress}>
        <Filter />
      </TouchableOpacity>
      <TextInput cursorColor={colors.blueyLight} clearButtonMode='always' on value={search} onChange={(e) => setSearch(e.nativeEvent.text)} placeholder='Search by owner or ref' style={{ flex: 1, backgroundColor: colors.veryLightGrey, paddingHorizontal: 5 }} />
      <TouchableOpacity style={styles.add} onPress={() => navigation.navigate('formPage', { address: headerElements, categories, statuses })}>
        <PlusBtn />
      </TouchableOpacity>

    </View>
      <View>
        <ScrollView showsHorizontalScrollIndicator={false} style={styles.wraper} horizontal>
          {headerElements.length ? headerElements.map((name, i) => {
            return (
              <HeaderBtn
                key={i}
                name={name}
                onPressHandler={onPressHandler}
                isActive={isActive}
                number={count} />
            );
          }) : null}
        </ScrollView>
      </View>
    </>
  );
};

export default Header;

