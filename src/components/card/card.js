import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import * as Clipboard from 'expo-clipboard';
import colors from '../../styles/colors';
import { addItem, toDateTime } from '../../../api';
import { ActivityIndicator } from 'react-native';
import { Image } from '@rneui/base';
import styles from './card.styles';

const Card = ({ item: { data, id }, navigation }) => {
  const { status, owner, phone, category, gallery, createdAt } = data
  const lowercaseStatus = status.toLowerCase()



const copyToClipboard = async () => {
  await Clipboard.setStringAsync(phone);
};

 const date = toDateTime(createdAt.seconds)
  return (
    
    <TouchableOpacity onLongPress={copyToClipboard} onPress={() => navigation.navigate('viewPage', {id})}>

      <View style={styles.container}>
        <Image
          source={{ uri: gallery[gallery.length - 1] }}
          style={styles.imageStyle}
          PlaceholderContent={<ActivityIndicator color={colors.lightGreyHex} />}
        />
        {data.status && <View style={styles.indicator}>

          <View style={[styles.bgColor, { backgroundColor: lowercaseStatus === 'sold' || lowercaseStatus === 'rent' ? colors.green : lowercaseStatus === 'on hold' ? colors.orange : colors.red }]} />
          <Text>{status}</Text>
          <Text style={styles.category}>{category}</Text>
        </View>}
          <View style={styles.textParent} />
        <View style={{ width: '100%', position: 'absolute', bottom: 0, left: 0, justifyContent: 'space-between', paddingLeft: 10}}>
          <Text style={styles.text}>{owner}</Text>
          <Text style={styles.text}>{phone}</Text>
        </View>
      </View>
      <Text style={styles.date}>{date}</Text>
    </TouchableOpacity>
  );


};

export default Card;


