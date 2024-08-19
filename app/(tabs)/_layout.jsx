import { Tabs } from 'expo-router';
import React from 'react'


import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
function Tablayout() {
  return (
    <Tabs screenOptions={{headerShown:false}}>
        <Tabs.Screen name='MyBanking'
        options={{
            tabBarLabel:"My Banking",
            tabBarActiveTintColor:'black',
            tabBarLabelStyle: {
            // Use the font family name you registered with useFonts
              fontSize: 10, // You can adjust the size if needed
            },
            tabBarIcon:({color})=><MaterialIcons name="location-on" size={24} color={color} />,


            
        }}
        
        
        />
          <Tabs.Screen name='Friends'
        options={{
            tabBarLabel:"My Friends",
            tabBarActiveTintColor:'black',
            tabBarLabelStyle: {
            // Use the font family name you registered with useFonts
              fontSize: 10, // You can adjust the size if needed
            },
            tabBarIcon:({color})=><MaterialIcons name="location-on" size={24} color={color} />,


            
        }}/>
        
        {/* <Tabs.Screen name='discover' 
        
        options={{
            tabBarLabel:"Discover",
            tabBarActiveTintColor:Colors.PRIMARY,
            tabBarLabelStyle: {
              fontFamily: 'poppins', // Use the font family name you registered with useFonts
              fontSize: 10, // You can adjust the size if needed
            },
            tabBarIcon:({color})=><FontAwesome5 name="globe-americas" size={24} color={color} />,


            
        }}/> */}
        <Tabs.Screen name='Profile'
        options={{
            tabBarLabel:"Profile",
            tabBarActiveTintColor:'black',
            tabBarLabelStyle: {
            //   fontFamily: 'poppins', // Use the font family name you registered with useFonts
              fontSize: 10, // You can adjust the size if needed
            },
            tabBarIcon:({color})=><FontAwesome name="user" size={24} color={color} />,


            
        }}
        />
    </Tabs>
  
  )
}

export default Tablayout;