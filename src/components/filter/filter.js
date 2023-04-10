import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import colors from '../../styles/colors';
import HeaderBtn from '../headerBtn/headerBtn';

const Filter = ({ modalVisible, setModalVisible, categories, statuses, data, setFilteredData, addresses, isActive, search }) => {

  const [from, setFrom] = useState(0)
  const [to, setTo] = useState(9999999999)
  const initialValues = {
    category: [],
    status: [],
    address: [],
    type: [],
  }
  const [filterValues, setFilterValues] = useState(initialValues)
  useEffect(() => {
    setFilterValues(prev => ({ ...prev, address: [] }))
  }, [isActive])
  const filterContent = [
    {
      title: 'type',
      options: ['Rental', 'For Sale']
    },
    {
      title: 'category',
      options: categories
    },
    {
      title: 'status',
      options: statuses
    },
    {
      title: 'address',
      options: addresses.filter((i) => i != 'all')
    }
  ]

  const applyFilter = () => {
    let result = data && [...data]
    if (search && result) {
      const regexp = new RegExp(search, "gi");
      result = result?.filter(item => item.data.owner.match(regexp) || search == item.data.ref)
      return setFilteredData(result);
    } else if (result) {
      for (const [key, value] of Object.entries(filterValues)) {
        let shallowValue = value
        if (!value.length) {
          if (key === 'category') shallowValue = categories
          if (key === 'status') shallowValue = statuses
          if (key === 'type') shallowValue = ['Rental', 'For Sale']
          if (key === 'address') shallowValue = addresses
        }
        result = result.filter(({ data }) => shallowValue.includes(data[key]))
      }
      result = result.filter(({data}) => +data.price >= +from && +data.price <= +to)
      setFilteredData(result);
      setModalVisible(false)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [data, search])

  const onPressClear = () => {
    setFilterValues(initialValues)
    setFrom(0)
    setTo(9999999999)
    setFilteredData()
    setModalVisible(false)
  }

  const onBtnPress = (name, filterTitle) => () => {
    if (!filterValues[filterTitle].includes(name)) {
      setFilterValues(prev => ({ ...prev, [filterTitle]: [...filterValues[filterTitle], name] }))
    } else {
      setFilterValues(prev => ({ ...prev, [filterTitle]: [...filterValues[filterTitle].filter(i => i !== name)] }))
    }
  }
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <Pressable onPress={() => setModalVisible(!modalVisible)} style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView>
              <Pressable>
              <Text style={styles.modalText}>Filter</Text>
              <Text>Price</Text>
              <View >
                <TextInput placeholder='from' keyboardType='numeric' value={from} onChangeText={(t) => setFrom(t)} style={{backgroundColor: colors.veryLightGrey, flexGrow: 1, marginVertical: 5, paddingHorizontal: 5}} />
                <TextInput placeholder='to' keyboardType='numeric' value={to} onChangeText={(t) => setTo(t)} style={{backgroundColor: colors.veryLightGrey, flexGrow: 1, marginVertical: 5, paddingHorizontal: 5}} />
              </View>
              {filterContent.map(({ title, options }, i) => {
                if (title == 'address' && isActive != 'all') return <View key={title} />
                return (
                  <View key={title} style={styles.optionsTitle}>
                    <Text style={styles.textStyle}>{title}</Text>
                    <View style={styles.optionsContainer}>
                      {options.map((btn, i) => {
                        return (
                          <HeaderBtn filterTitle={title} isActive={filterValues} name={btn} key={i} onPressHandler={onBtnPress} />
                        )
                      })
                      }
                    </View>
                  </View>
                  
                )

              })}
              </Pressable>
            </ScrollView>
            
            <View style={styles.btnWraper}>
              <Pressable

                onPress={applyFilter}>
                <Text style={[styles.textStyle, styles.btn]}>Apply</Text>
              </Pressable>
              <Pressable
                style={[styles.btn, { marginLeft: 'auto' }]}
                onPress={onPressClear}>
                <Text style={[styles.textStyle, styles.btn]}>Clear</Text>
              </Pressable>
            </View>
          </View>
          </Pressable>

        
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .3)'
  },
  optionsContainer: {
    flexDirection: 'row',
    width: 250,
    marginVertical: 10,
    flexWrap: 'wrap',
    borderBottomColor: colors.primaryColor,
    borderBottomWidth: 0.5,
    paddingBottom: 15,
  },
  optionsTitle: {
    alignItems: 'flex-start',
  },
  btnWraper: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.lightGreyHex,
    borderRadius: 20,
    padding: 15,
    height: 450,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: colors.primaryColor,
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Filter;
