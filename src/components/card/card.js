import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import colors from '../../styles/colors';
import { addItem } from '../../../api';
import { ActivityIndicator } from 'react-native';
import { Image } from '@rneui/base';
import styles from './card.styles';

const Card = ({ item: { data, id }, navigation }) => {
  const { status, owner, phone, category, gallery, createdAt } = data
  const lowercaseStatus = status.toLowerCase()
  function toDateTime(secs) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs)
   return t
}
 const date = toDateTime(createdAt.seconds).toString().split(' ').splice(1, 4).join('-')
 console.log(date);
  // console.log(toDateTime(createdAt.seconds));
  return (
    
    <TouchableOpacity onPress={() => navigation.navigate('viewPage', {id})}>

      <View style={styles.container}>
        <Image
          source={{ uri: gallery[gallery.length - 1] }}
          style={styles.imageStyle}
          PlaceholderContent={<ActivityIndicator color={colors.lightGreyHex} />}
        />
        {data.status && <View style={styles.indicator}>

          <View style={[styles.bgColor, { backgroundColor: lowercaseStatus === 'sold' || lowercaseStatus === 'rent' ? colors.green : lowercaseStatus === 'on hold' ? colors.orange : colors.red }]} />
          <Text>{status}</Text>
        </View>}
        <View style={{ width: '100%', position: 'absolute', padding: 10, bottom: 0, left: 0, backgroundColor: 'grey', opacity: .5 }}>
          <Text style={{ color: 'white' }}>{owner}</Text>
          <Text>{phone}</Text>
          <Text>{category}</Text>
        </View>
      </View>
      <Text style={styles.date}>{date}</Text>
    </TouchableOpacity>
  );


};

export default Card;


