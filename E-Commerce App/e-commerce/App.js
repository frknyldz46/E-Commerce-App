import React from 'react';
import LoginScreen from './pages/LoginScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreenUsers from './pages/HomeScreenUsers'
import HomeScreenAdmin from './pages/HomeScreenAdmin';
import PasswordResetScreen from './pages/PasswordResetScreen';
import AcilisEkrani from './pages/AcilisEkrani';
import ProductDetails from './pages/ProductDetails';
import AdressInfo from './pages/AdressInfo';
import PaymentScreen from './pages/PaymentScreen';


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    
      <NavigationContainer>
      
        <Stack.Navigator initialRouteName="AcilisEkrani">
          <Stack.Screen name="AcilisEkrani" component={AcilisEkrani} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="HomeUsers" component={HomeScreenUsers} options={{ headerShown: false }} />
          <Stack.Screen name="HomeAdmin" component={HomeScreenAdmin} options={{ headerShown: false }} />
          <Stack.Screen name="PasswordResetScreen" component={PasswordResetScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ headerShown: false }} />
          <Stack.Screen name="AdressInfo" component={AdressInfo} options={{ headerShown: false }} />
          <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{ headerShown: false }} />
         
          
          

        </Stack.Navigator>
        
      </NavigationContainer>
    

  );
}

