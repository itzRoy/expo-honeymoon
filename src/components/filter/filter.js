import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, ScrollView } from 'react-native';
import colors from '../../styles/colors';
import HeaderBtn from '../headerBtn/headerBtn';

const Filter = ({ modalVisible, setModalVisible, categories, statuses, data, setFilteredData, addresses, isActive, search }) => {

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
    let result = data
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
      setFilteredData(result);
      setModalVisible(false)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [data, search])

  const onPressClear = () => {
    setFilterValues(initialValues)
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
        transparent={true}

        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        {categories && statuses && <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView>
              <Text style={styles.modalText}>Filter</Text>
              {filterContent.map(({ title, options }) => {
                if (title == 'address' && isActive != 'all') return <View />
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
        </View>
        }
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
