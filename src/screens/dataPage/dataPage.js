import {ActivityIndicator, BackHandler, FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../styles/colors';
import Header from '../../components/header/header';
import Card from '../../components/card/card';
import Filter from '../../components/filter/filter';
import styles from './dataPage.styles';
import { getHeader, getPageData } from '../../../api';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
const DataPage = ({navigation}) => {
  const [isActive, setIsActive] = useState();
  const [{data, resultCount}, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [headerElements, setHeaderElements] = useState([])
  const [categories, setCategories] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [filteredData, setFilteredData] = useState()
  const [refresh, setRefresh] = useState(false)
  const [search, setSearch] = useState('')
  const statuses = ['Rent', 'Not Rent', 'On hold', 'Sold', 'Not sold']

  useEffect(() => {
    getHeader(setHeaderElements, setCategories)
    getPageData(setData, setIsLoading, () =>{}, isActive)
    setRefresh(false)
    return () => setData([{data: [], resultCount: null}]);
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
        navigation={navigation}
        categories={categories}
        statuses={statuses}
        search={search}
        setSearch={setSearch}
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
          keyExtractor={(item) => item.id}
        />
        </View>
      )}
    </SafeAreaView>
  );
};

export default DataPage;
