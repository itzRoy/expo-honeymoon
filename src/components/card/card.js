import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import colors from '../../styles/colors';
import { addItem } from '../../../api';
import { ActivityIndicator } from 'react-native';
import { Image } from '@rneui/base';
const state = 'sold'
const Card = ({item: {data, id}}) => {
const { status, owner, phone, category, gallery } = data
  const styles = StyleSheet.create({
    container: {
      width: 160,
      marginLeft: 25,
      aspectRatio: 9 / 14,
      borderRadius: 10,
      overflow: 'hidden',
      position: 'relative',
      marginBottom: 15,
      backgroundColor: colors.bluey 
    },
    indicator: {
      padding: 5,
      backgroundColor: status === 'sold' || status === 'rent'? colors.green: status === 'on hold' ? colors.orange : colors.red,
      borderRadius: 50,
      position: 'absolute',
      top: 10,
      left: 10,
      zIndex: 3,
    },
    insideView: {
      position: 'absolute',
      whidth: '100%',
    },
    insideContainer: {
      justifyContent: 'space-between',
      height: '100%',
      padding: 5,
    },
    topContainer: {
      width: '100%',
      alignItems: 'flex-end',
    },
    imageStyle: {
      width: '100%',
      height: '100%',
    },
    marginTop: {
      marginTop: 5,
    },
  });
console.log('galle', gallery);
  return (
    <TouchableOpacity onPress={addItem}>
      
      <View style={styles.container}>
        <Image
          source={{uri: gallery[gallery.length-1] }}
          style={styles.imageStyle}
          PlaceholderContent={<ActivityIndicator color={colors.bluey} />}
          />
        {data.status && <View style={styles.indicator} />}
        <View style={{width: '100%', position: 'absolute', padding: 10, bottom: 0, left: 0, backgroundColor: 'grey', opacity: .5}}>
          <Text style={{color: 'white'}}>{owner}</Text>
          <Text>{phone}</Text>
          <Text>{category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  
};

export default Card;


