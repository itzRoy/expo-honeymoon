import {ActivityIndicator, FlatList, View} from 'react-native';
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
  const statuses = ['Rent', 'Not Rent', 'On hold', 'Sold', 'Not sold']
  useEffect(() => {
    getHeader(setHeaderElements, setCategories)
    getPageData(setData, setIsLoading, () =>{}, isActive)
    setRefresh(false)
    return () => setData([{data: [], resultCount: null}]);
  }, [isActive, refresh]);
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
      />
      <Filter
      modalVisible={modalVisible} 
      setModalVisible={setModalVisible} 
      categories={categories} statuses={statuses} 
      setFilteredData={setFilteredData}
      data={data}
      isActive={isActive}

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
        <View style={{alignContent: 'center', width: '100%', paddingBottom: 160}}>
        <FlatList
          data={filteredData ? filteredData : data} 
          numColumns={2}
          contentContainerStyle={styles.list}
          renderItem={obj => <Card {...obj} navigation={navigation} />}
          onRefresh={() => setRefresh(true)}
          refreshing={refresh}
        />
        </View>
      )}
    </SafeAreaView>
  );
};

export default DataPage;
