import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import styles from './viewPage.styles'

const ViewPage = ({route}) => {
  const id = route.params.id
  console.log(id);
  return (
    <View>
      <Text>ViewPage</Text>
    </View>
  )
}

export default ViewPage
