import React from 'react';

import ProductList from '../pages/ProductList'
import Like from '../pages/Like'
import Sepet from './Sepet';
import UserPage from './UserPage'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Image } from 'react-native';

const Tab = createBottomTabNavigator();
export default function HomeScreenUsers() {
  return (
    <Tab.Navigator

      screenOptions={{
        tabBarStyle: { backgroundColor: '#A3B763', borderRadius: 20, margin: 10 }
      }}
    >
      <Tab.Screen name='Ürünler' component={ProductList} options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              top: 3,
              backgroundColor: 'white',
              padding: 5,
              borderRadius: 20
            }}
          >
            <Image
              source={require("../images/bag.png")}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? "#A3B763" : "#111",
              }}
            />
          </View>
        ),
      }} />


      <Tab.Screen name='Favoriler' component={Like} options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              top: 3,
              backgroundColor: 'white',
              padding: 5,
              borderRadius: 20
            }}
          >
            <Image
              source={require("../images/like.png")}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? "#A3B763" : "#111",
              }}
            />
          </View>
        ),
      }} />

<Tab.Screen name='Sepet' component={Sepet} options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              top: 3,
              backgroundColor: 'white',
              padding: 5,
              borderRadius: 20
            }}
          >
            <Image
              source={require("../images/sepet.png")}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? "#A3B763" : "#111",
              }}
            />
          </View>
        ),
      }} />

<Tab.Screen name='Kullanıcı' component={UserPage} options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              top: 3,
              backgroundColor: 'white',
              padding: 5,
              borderRadius: 20
            }}
          >
            <Image
              source={require("../images/usersPage.png")}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? "#A3B763" : "#111",
              }}
            />
          </View>
        ),
      }} />
    </Tab.Navigator>
  )
}
