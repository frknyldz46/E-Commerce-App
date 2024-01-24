import React from 'react';

import UrunEkle from './UrunEkle';
import InCommingMessage from './Comment/InCommingMessage';
import Siparisler from './Siparisler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Image } from 'react-native';

const Tab = createBottomTabNavigator();



export default function HomeScreenAdmin() {
  return (
    <Tab.Navigator

      screenOptions={{
        tabBarStyle: { backgroundColor: '#A3B763', borderRadius: 20, margin: 10 }
      }}
    >
      <Tab.Screen name='Ürün Ekle' component={UrunEkle} options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              top: 3,
            }}
          >
            <Image
              source={require("../images/bag.png")}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? "#fff" : "#fff",
              }}
            />
          </View>
        ),
      }} />

      <Tab.Screen name='Siparişler' component={Siparisler} options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              top: 3,
            }}
          >
            <Image
              source={require("../images/bag.png")}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? "#fff" : "#fff",
              }}
            />
          </View>
        ),
      }} />

      <Tab.Screen name='Mesajlar' component={InCommingMessage} options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              top: 3,
            }}
          >
            <Image
              source={require("../images/bag.png")}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? "#fff" : "#fff",
              }}
            />
          </View>
        ),
      }} />
    </Tab.Navigator>

  );
}