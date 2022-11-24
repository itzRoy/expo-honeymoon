import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useState } from 'react'
import styles from './formPage.styles'
import { Input } from '@rneui/themed';
import { Alert, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ActionButton from '../../components/actionButton/ActionButton';
import colors from '../../styles/colors';
import { Button } from '@rneui/base';
import ImagePickerComp from '../../components/imagePicker/imagePicker';
import { addItem, uploadImage } from '../../../api';
import HeaderBtn from '../../components/headerBtn/headerBtn';

const FormPage = ({ route, navigation }) => {
  const { address, categories, statuses } = route.params
  const [image, setImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const initialValues = {
    owner: '',
    phone: null,
    address: '',
    category: '',
    type: '',
    status: '',
    price: null,

  }
  const [formValues, setFormValues] = useState(initialValues)

  const submitHandler = async() => {
    const arr = Object.values(formValues)
    if(arr.some( el => el == '' || image.length <= 0)){
      return Alert.alert('You missed something')
    }
    try{

      addItem(formValues, image, setIsLoading, navigation)
    }catch{}

  }

  return (

    <ScrollView>
      <Input
        placeholder='OWNER'
        keyboardType='name-phone-pad'
        onChangeText={value => setFormValues((prev) => ({ ...prev, owner: value }))}
      />
      <Input
        placeholder='PHONE'
        keyboardType='phone-pad'
        onChangeText={value => setFormValues((prev) => ({ ...prev, phone: value }))}
      />
      <Input
        placeholder='PROPERTY SIZE'
        keyboardType='number-pad'
        onChangeText={value => setFormValues((prev) => ({ ...prev, size: value }))}
      />
      <Input
        placeholder='PRICE'
        keyboardType='number-pad'
        onChangeText={value => setFormValues((prev) => ({ ...prev, price: value }))}
      />
      <View style={styles.inputContainer}>
        <Text style={styles.textLabel}>TYPE:</Text>
        <HeaderBtn name='Rental' isActive={formValues.type} onPressHandler={() => () => setFormValues(prev => ({ ...prev, type: 'Rental' }))} />
        <HeaderBtn name='For Sale' isActive={formValues.type} onPressHandler={() => () => setFormValues(prev => ({ ...prev, type: 'For Sale' }))} />
      </View>

      {/* <View style={styles.inputContainer}>
        <Text style={styles.textLabel}>STATUS:</Text>
        <HeaderBtn name='Rent' isActive={formValues.status} onPressHandler={() => () => setFormValues(prev => ({ ...prev, status: 'Rent' }))} />
        <HeaderBtn name='Not Rent' isActive={formValues.status} onPressHandler={() => () => setFormValues(prev => ({ ...prev, status: 'Not Rent' }))} />
        <HeaderBtn name='On Hold' isActive={formValues.status} onPressHandler={() => () => setFormValues(prev => ({ ...prev, status: 'On Hold' }))} />
        <HeaderBtn name='Sold' isActive={formValues.status} onPressHandler={() => () => setFormValues(prev => ({ ...prev, status: 'Sold' }))} />
        <HeaderBtn name='Not Sold' isActive={formValues.status} onPressHandler={() => () => setFormValues(prev => ({ ...prev, status: 'Not Sold' }))} />
      </View> */}

      <View style={styles.inputContainer}>
      <Text style={styles.textLabel}>STATUS:</Text>
      <View style={[{ flexDirection: 'row', marginHorizontal: 10, marginTop: -10, paddingBottom: 20, flexWrap: 'wrap' }]}>
        {statuses.map((name, i) => {
          return <HeaderBtn key={i} name={name} isActive={formValues.status} onPressHandler={() => () => setFormValues(prev => {
            if (formValues.status === name) return ({ ...prev, status: '' })
            return { ...prev, status: name }
          })} />
        })}
      </View>
      </View>
      <Input
        placeholder='CATEGORY'
        onFocus={() => setFormValues(prev => ({ ...prev, category: '' }))}
        value={formValues.category}
        keyboardType='name-phone-pad'
        onChangeText={value => setFormValues((prev) => ({ ...prev, category: value }))}
      />

      <View style={[{ flexDirection: 'row', marginHorizontal: 20, marginTop: -10, paddingBottom: 20, flexWrap: 'wrap' }]}>
        {categories.map((name, i) => {
          return <HeaderBtn key={i} name={name} isActive={formValues.category} onPressHandler={() => () => setFormValues(prev => {
            if (formValues.category === name) return ({ ...prev, category: '' })
            return { ...prev, category: name }
          })} />
        })}
      </View>

      <Input
        placeholder='ADDRESS'
        keyboardType='name-phone-pad'
        onFocus={() => setFormValues((prev) => ({ ...prev, address: '' }))}
        onChangeText={value => setFormValues((prev) => ({ ...prev, address: value }))}
        value={formValues.address}
      />
      <View style={[{ flexDirection: 'row', marginHorizontal: 20, marginTop: -10, paddingBottom: 20, flexWrap: 'wrap' }]}>
        {address.filter(i => i !== 'all').map((name, i) => {
          return <HeaderBtn key={i}  name={name} isActive={formValues.address} onPressHandler={() => () => setFormValues(prev => {
            if (formValues.address === name) return ({ ...prev, category: '' })
            return { ...prev, address: name }
          })} />
        })}
      </View>
        <Input
          placeholder='Note'
          onChangeText={value => setFormValues((prev) => ({ ...prev, note: value }))}
          value={formValues.note}
        />
      <ImagePickerComp image={image} setImage={setImage}  />
      <Button type='solid' color={colors.blueyLight} title='Submit' disabled={isLoading} onPress={submitHandler} />
    </ScrollView>
  );
}
export default FormPage
