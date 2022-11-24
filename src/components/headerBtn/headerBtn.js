import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
 import colors from '../../styles/colors';

const HeaderBtn = ({name, number, isActive, onPressHandler, filterTitle}) => {
  const [active, setActive] = useState(false);
  useEffect(() => {
    if(typeof isActive === 'string'){
      name?.toLowerCase() === isActive?.toLowerCase()
      ? setActive(true)
      : setActive(false);
    }else {
      const res = isActive[filterTitle].some(el => el === name)
      setActive(res)
    }
  }, [active, isActive, name]);
  const styles = StyleSheet.create({
    wraper: {
      backgroundColor: active ? colors.blueyLight : 'transparent',
      borderWidth: active ? 0 : 1,
      borderColor: colors.blueyLight,
      flexDirection: 'row',
      paddingVertical: 5,
      paddingHorizontal: 8,
      borderRadius: 99,
      alignItems: 'center',
      textAlign: 'center',
      marginRight: 10,
      marginBottom: 5
    },
    text: {
      color: active ? colors.white : colors.blueyLight,
      fontWeight: 'bold'
    },
    badge: {
      marginLeft: 5,
      backgroundColor: colors.caption,
      borderRadius: 99,
      alignSelf: 'flex-start',
      paddingHorizontal: 7,
      heigth: 5,
      paddingVertical: 0,
    },
  });

  return (
    <Pressable onPress={onPressHandler(name, filterTitle)}>
      <View style={styles.wraper}>
        <Text style={styles.text} >
          {name}
        </Text>
        {active && number >= 0 && (
          <View style={[styles.badge]}>
            <Text style={styles.text}>{number}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default HeaderBtn;
