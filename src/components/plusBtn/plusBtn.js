import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import styles from './plusBtn.styles'

const PlusBtn = () => {
  return (
    <View style={styles.parent}>
      <View style={styles.hor}/>
      <View style={styles.ver}/>
    </View>
  )
}

export default PlusBtn

