import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useEffect, useState } from 'react'
import styles from './formPage.styles'
import { Input } from '@rneui/themed';
import { Alert, Text, View, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ActionButton from '../../components/actionButton/ActionButton';
import colors from '../../styles/colors';
import { Button } from '@rneui/base';
import ImagePickerComp from '../../components/imagePicker/imagePicker';
import { addItem, getOneById, updateItem, uploadImage } from '../../../api';
import HeaderBtn from '../../components/headerBtn/headerBtn';
import { useNavigation, useRoute } from '@react-navigation/core';

const FormPage = ({ address, categories, statuses }) => {
  const route = useRoute()
  const navigation = useNavigation()
  const { id } = route.params
  const [image, setImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [dataIsLoading, setDataIsLoading] = useState()

  const initialValues = {
    owner: '',
    phone: null,
    address: '',
    category: '',
    type: '',
    status: '',
    Ref: '',
    price: null,

  }
  const [formValues, setFormValues] = useState(initialValues)
  useEffect(() => {
    if (id) getOneById(id, setFormValues, undefined, setDataIsLoading, true, setImage)
  }, [id])

  const submitHandler = async () => {
    
    const arr = Object.values(formValues)
    if (arr.some(el => el == '' || image.length <= 0)) {
      return Alert.alert('You missed something')
    }
    try {
      if(id) {
        updateItem(formValues, image, setIsLoading, navigation, id)
      }else{
        addItem(formValues, image, setIsLoading, navigation)
      }
    } catch (e) {  Alert.alert(e)}

  }

  return (

    <ScrollView>
      {!dataIsLoading ? (
        <><KeyboardAvoidingView>
          <Input
            placeholder='OWNER'
            keyboardType='name-phone-pad'
            onChangeText={value => setFormValues((prev) => ({ ...prev, owner: value }))} 
            value={formValues.owner}
            />
          <Input
            placeholder='PHONE'
            keyboardType='phone-pad'
            onChangeText={value => setFormValues((prev) => ({ ...prev, phone: value }))} 
            value={formValues.phone}
            />
          <Input
            placeholder='PROPERTY SIZE'
            keyboardType='number-pad'
            onChangeText={value => setFormValues((prev) => ({ ...prev, size: value }))} 
            value={formValues.size}
            />
          <Input
            placeholder='PRICE'
            keyboardType='number-pad'
            onChangeText={value => setFormValues((prev) => ({ ...prev, price: value }))} 
            value={formValues.price}
            />
          <Input
            placeholder='REF.'
            keyboardType='name-phone-pad'
            onFocus={() => setFormValues((prev) => ({ ...prev, Ref: '' }))}
            onChangeText={value => setFormValues((prev) => ({ ...prev, Ref: value }))}
            value={formValues.Ref} 
            />
          <View style={styles.inputContainer}>
            <Text style={[styles.textLabel, { paddingRight: 10 }]}>TYPE:</Text>
            <HeaderBtn name='Rental' isActive={formValues.type} onPressHandler={() => () => setFormValues(prev => ({ ...prev, type: 'Rental' }))} />
            <HeaderBtn name='For Sale' isActive={formValues.type} onPressHandler={() => () => setFormValues(prev => ({ ...prev, type: 'For Sale' }))} />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>STATUS:</Text>
            <View style={[{ width: '75%', flexDirection: 'row', paddingHorizontal: 10, marginTop: -10, paddingBottom: 20, flexWrap: 'wrap' }]}>
              {statuses.map((name, i) => {
                return <HeaderBtn key={i} name={name} isActive={formValues.status} onPressHandler={() => () => setFormValues(prev => {
                  if (formValues.status === name)
                    return ({ ...prev, status: '' });
                  return { ...prev, status: name };
                })} />;
              })}
            </View>
          </View>
          <Input
            placeholder='CATEGORY'
            onFocus={() => setFormValues(prev => ({ ...prev, category: '' }))}
            value={formValues.category}
            keyboardType='name-phone-pad'
            onChangeText={value => setFormValues((prev) => ({ ...prev, category: value }))} />

          <View style={[{ flexDirection: 'row', marginHorizontal: 20, marginTop: -10, paddingBottom: 20, flexWrap: 'wrap' }]}>
            {categories.map((name, i) => {
              return <HeaderBtn key={i} name={name} isActive={formValues.category} onPressHandler={() => () => setFormValues(prev => {
                if (formValues.category === name)
                  return ({ ...prev, category: '' });
                return { ...prev, category: name };
              })} />;
            })}
          </View>

          <Input
            placeholder='ADDRESS'
            keyboardType='name-phone-pad'
            onFocus={() => setFormValues((prev) => ({ ...prev, address: '' }))}
            onChangeText={value => setFormValues((prev) => ({ ...prev, address: value }))}
            value={formValues.address} />
          <View style={[{ flexDirection: 'row', marginHorizontal: 20, marginTop: -10, paddingBottom: 20, flexWrap: 'wrap' }]}>
            {address.filter(i => i !== 'all').map((name, i) => {
              return <HeaderBtn key={i} name={name} isActive={formValues.address} onPressHandler={() => () => setFormValues(prev => {
                if (formValues.address === name)
                  return ({ ...prev, category: '' });
                return { ...prev, address: name };
              })} />;
            })}
          </View>
          <Input
            placeholder='Note'
            multiline={true}
            onChangeText={value => setFormValues((prev) => ({ ...prev, note: value }))}
            value={formValues.note} />
        </KeyboardAvoidingView>
        <ImagePickerComp image={image} setImage={setImage} /><Button type='solid' color={colors.blueyLight} title='Submit' disabled={isLoading} onPress={submitHandler} /></>
      ) : (<ActivityIndicator size='large' color={colors.bluey} style={{marginTop: '55%'}} />)}
    </ScrollView>
  );
}
export default FormPage
