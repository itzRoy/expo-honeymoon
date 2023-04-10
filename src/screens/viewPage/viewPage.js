import { ActivityIndicator, Linking, Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './viewPage.styles'
import { deleteById, getOneById, toDateTime } from '../../../api';
import AppIntroSlider from 'react-native-app-intro-slider';
import colors from '../../styles/colors';
import { Image } from '@rneui/themed';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from '@rneui/base';
import { useNavigation, useRoute } from '@react-navigation/core';

const ViewPage = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const id = route.params.id
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [slides, setSlides] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  useEffect(() => {
    if(id){
    getOneById(id, setData, setSlides, setIsLoading)
    }
  }, [])

  useEffect(() => {
    navigation.addListener('focus', async () => {
      try{
      if(id)  await getOneById(id, setData, setSlides, setIsLoading)
    }
  catch(e) {
    console.log('eeeeeeee', e);
  }})
    return navigation.removeListener('focus', async () => {
      try{
      if(id)  await getOneById(id, setData, setSlides, setIsLoading)
    }
  catch(e) {
    console.log(e);
  }})
  }, [id, navigation])

  const locationArr = data?.data?.location?.split(',')
  const onLoactionPress = () => {
  const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
  const latLng = `${locationArr[0]},${locationArr[1]}`;
  const label = data?.data?.owner + ', ' + data?.data?.address;
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`
  });
      
  Linking.openURL(url);
  }
  const onEditPress = () => {
    navigation.navigate('formPage', {id})
  }

  const renderItem = ({ item }) => {
    return (
      <Image
        source={{ uri: item.image}}
        style={styles.imageStyle}
        resizeMode='center'
        PlaceholderContent={<ActivityIndicator color={colors.lightGreyHex} />}
      />
    );
  }

  const renderInfo = () => {
    if(data){
      delete data.data.gallery
      data.data.created = toDateTime(data.data?.created)
      data.data.updated = toDateTime(data.data?.updated)
      const result = Object.keys(data.data).sort().map((key) => {
      if(key === 'size' && data.data[key].split(' ').length === 1) data.data[key] = data.data[key] + ' m²'
      if(key === 'location') {
        return (
          <TouchableOpacity onPress={onLoactionPress} key={key} style={styles.infoContainer}>
        <Text style={{fontWeight: 'bold'}}>{key} : </Text>
        <View style={{backgroundColor: '#f0f0f0', padding: 5, borderRadius: 20}}>
        <Text style={{paddingRight: 10, textAlign: 'center'}}>{data.data[key]}</Text>
        </View>
      </TouchableOpacity>
        )
      }
      return (<View key={key} style={styles.infoContainer}>
        <Text style={{fontWeight: 'bold'}}>{key} : </Text>
        <Text style={{paddingRight: 10}}>{data.data[key]}</Text>
      </View>)
     })
     return result
    }
  }

  return (
    <>
        <View style={styles.centeredView}>
        <Modal
        animationType="fade"
        transparent={true}

        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <View style={styles.optionsContainer}>
            <Text style={styles.modalText}>Are you sure you want to delete this</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <Button title='Cancel' onPress={() => setModalVisible(false)} color={colors.green} />
              <Button title='Delete' onPress={() => deleteById(id, setIsLoading, setModalVisible, navigation)} color={colors.red} />
            </View>
            </View>
            </View>
        </Modal>
            </View>

    {!isLoading ? (<><View style={styles.container}>
        <AppIntroSlider renderItem={renderItem} data={slides} nextLabel='' doneLabel='' />
      </View><ScrollView>
          {renderInfo()}
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 20}}>
            <Button color={colors.bluey} containerStyle={{width: 100}} title='Edit' onPress={onEditPress} />
            <Button color={colors.red} containerStyle={{width: 100}}  onPress={() => setModalVisible(true)} title='Delete' />
          </View>


        </ScrollView></>) : <ActivityIndicator size='large' color={colors.bluey} style={{marginBottom: '100%'}} />}
    </>
      
     
  )
}

export default ViewPage
