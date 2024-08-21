import { Tabs } from 'expo-router';
import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';

function Tablayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000', // Change this to your desired background color
        },
      }}
    >
      <Tabs.Screen
        name='MyBanking'
        options={{
          tabBarLabel: 'My Banking',
          tabBarActiveTintColor: 'gold',
          tabBarLabelStyle: {
            fontSize: 10,
          },
          tabBarIcon: ({ color }) => <MaterialIcons name="account-balance" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name='Pay'
        options={{
          tabBarLabel: 'Pay',
          tabBarActiveTintColor: 'gold',
          tabBarLabelStyle: {
            fontSize: 10,
          },
          tabBarIcon: ({ color }) => <MaterialIcons name="paypal" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name='History'
        options={{
          tabBarLabel: 'History',
          tabBarActiveTintColor: 'gold',
          tabBarLabelStyle: {
            fontSize: 10,
          },
          tabBarIcon: ({ color }) => <FontAwesome6 name="money-bill-trend-up" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name='Notifications'
        options={{
          tabBarLabel: 'Notifications',
          tabBarActiveTintColor: 'gold',
          tabBarLabelStyle: {
            fontSize: 10,
          },
          tabBarIcon: ({ color }) => <MaterialIcons name="notifications" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name='Profile'
        options={{
          tabBarLabel: 'Profile',
          tabBarActiveTintColor: 'gold',
          tabBarLabelStyle: {
            fontSize: 10,
          },
          tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

export default Tablayout;
