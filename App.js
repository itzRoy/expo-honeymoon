import { StyleSheet } from 'react-native';
import DataPage from './src/screens/dataPage/dataPage';
import ViewPage from './src/screens/viewPage/viewPage'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FormPage from './src/screens/formPage/formPage';

    export default function App() {

      const Stack = createNativeStackNavigator();
  
  
      
      return (
          <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="dataPage" component={DataPage} options={{headerShown: false}}/>
        <Stack.Screen name="viewPage" component={ViewPage} options={{headerShown: false}}/>
        <Stack.Screen name="formPage" component={FormPage} options={{animation: 'slide_from_right', headerShown: true, headerTitle: ''}} />
            
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
