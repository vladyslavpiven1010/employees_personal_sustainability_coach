import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  LoginScreen
} from './src/screens'
// import BottomTabNavigation from './navigation/BottomTabNavigation';
// import { useFonts } from 'expo-font';
// import { useCallback } from 'react';

const Stack = createNativeStackNavigator();

function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen" screenOptions = {{headerShown: false}}>
        <Stack.Screen name = "LoginScreen" component = {LoginScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;