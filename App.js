import { StyleSheet, View } from 'react-native';
import DataPage from './src/screens/dataPage/dataPage';
import ViewPage from './src/screens/viewPage/viewPage'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FormPage from './src/screens/formPage/formPage';
import { StatusBar } from 'expo-status-bar';
import colors from './src/styles/colors';
import { useEffect, useState } from 'react';
import { getHeader, getPageData } from './api';

    export default function App() {

      const Stack = createNativeStackNavigator();

      const [isActive, setIsActive] = useState();
      const [{data, resultCount}, setData] = useState({});
      const [isLoading, setIsLoading] = useState(false);
      const [refresh, setRefresh] = useState(false);
      const [headerElements, setHeaderElements] = useState([])
      const [categories, setCategories] = useState([])
      const statuses = ['Rent', 'Not Rent', 'On hold', 'Sold', 'Not sold']

      useEffect(() => {
        getHeader(setHeaderElements, setCategories)
        getPageData(setData, setIsLoading, () =>{}, isActive)
        setRefresh(false)
        return () => setData([{data: [], resultCount: null}]);
      }, [isActive, refresh,]);
  
      return (
        <NavigationContainer>
            <StatusBar backgroundColor='#f2f2f2' />
      <Stack.Navigator >
        <Stack.Screen name="dataPage" children={() => <DataPage setHeaderElements={setHeaderElements} setCategories={setCategories} setData={setData} data={data} setIsLoading={setIsLoading} isLoading={isLoading} resultCount={resultCount} headerElements={headerElements} categories={categories} statuses={statuses} isActive={isActive} setIsActive={setIsActive} refresh={refresh} setRefresh={setRefresh} />} options={{headerShown: false}}/>
        <Stack.Screen name="viewPage" children={() => <ViewPage />} options={{animation: 'slide_from_right', headerShown: true, headerTitle: '', headerBackground: () => (<View style={{width: '100%', height: '100%', backgroundColor: '#f2f2f2'}} />) }} />
        <Stack.Screen name="formPage" children={() => <FormPage address={headerElements} categories={categories} statuses={statuses} />} options={{animation: 'slide_from_right', headerShown: true, headerTitle: '', headerBackground: () => (<View style={{width: '100%', height: '100%', backgroundColor: '#f2f2f2'}} />) }} />
            
      </Stack.Navigator>
          
          </NavigationContainer>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
