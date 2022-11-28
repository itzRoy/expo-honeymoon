import { StyleSheet, View } from 'react-native';
import DataPage from './src/screens/dataPage/dataPage';
import ViewPage from './src/screens/viewPage/viewPage'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FormPage from './src/screens/formPage/formPage';
import { StatusBar } from 'expo-status-bar';
import colors from './src/styles/colors';

    export default function App() {

      const Stack = createNativeStackNavigator();

  
      
      return (
        <NavigationContainer>
            <StatusBar backgroundColor='#f2f2f2' />
      <Stack.Navigator >
        <Stack.Screen name="dataPage" component={DataPage} options={{headerShown: false}}/>
        <Stack.Screen name="viewPage" component={ViewPage} options={{animation: 'slide_from_right', headerShown: true, headerTitle: '', headerBackground: () => (<View style={{width: '100%', height: '100%', backgroundColor: '#f2f2f2'}} />) }} />
        <Stack.Screen name="formPage" component={FormPage} options={{animation: 'slide_from_right', headerShown: true, headerTitle: '', headerBackground: () => (<View style={{width: '100%', height: '100%', backgroundColor: '#f2f2f2'}} />) }} />
            
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
