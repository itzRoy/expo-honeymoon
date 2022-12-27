import {ActivityIndicator, BackHandler, FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../styles/colors';
import Header from '../../components/header/header';
import Card from '../../components/card/card';
import Filter from '../../components/filter/filter';
import styles from './dataPage.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/core';
const DataPage = ({ data, isLoading, resultCount, headerElements, categories, statuses, isActive, setIsActive, refresh, setRefresh}) => {
  const [filteredData, setFilteredData] = useState()
  const [modalVisible, setModalVisible] = useState(false);
  const navigation= useNavigation()
  const [search, setSearch] = useState('')

  useEffect(() => {
    setRefresh(false)
  }, [isActive, refresh]);
const backAction = () => {
  if(search) setSearch('')
}

  useEffect(() => {
    if(search){
      BackHandler.addEventListener('hardwareBackPress', backAction)
      return () => BackHandler.removeEventListener(backAction)
    }
  }, [])
  return (
    <SafeAreaView>
      <Header
        isActive={isActive}
        setIsActive={setIsActive}
        count={resultCount}
        headerElements={headerElements}
        onFilterPress={() => setModalVisible(true)}
        categories={categories}
        statuses={statuses}
        search={search}
        setSearch={setSearch}
        navigation={navigation}
      />
      <Filter
      modalVisible={modalVisible} 
      setModalVisible={setModalVisible} 
      categories={categories} statuses={statuses} 
      setFilteredData={setFilteredData}
      data={data}
      isActive={isActive}
      addresses={headerElements}
      search={search}

       />
      {isLoading ? (
        <View>
          <ActivityIndicator
            color={colors.bluey}
            size="large"
            style={{marginVertical: 300}}
          />
        </View>
      ) : (
        <View >
        <FlatList
          data={filteredData || search ? filteredData : data} 
          numColumns={2}
          contentContainerStyle={styles.list}
          renderItem={obj => <Card {...obj} navigation={navigation} />}
          onRefresh={() => setRefresh(true)}
          refreshing={refresh}
          keyExtractor={obj => obj.id}
        />
        </View>
      )}
    </SafeAreaView>
  );
};

export default DataPage;
