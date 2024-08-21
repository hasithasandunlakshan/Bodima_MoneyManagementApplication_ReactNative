import { Tabs } from 'expo-router';
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

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
            tabBarIcon:({color})=><MaterialIcons name="account-balance" size={24} color={color} />

            
        }}
        
        
        />
                <Tabs.Screen name='Pay'
        options={{
            tabBarLabel:"Pay",
            tabBarActiveTintColor:'black',
            tabBarLabelStyle: {
            // Use the font family name you registered with useFonts
              fontSize: 10, // You can adjust the size if needed
            },
            tabBarIcon:({color})=><MaterialIcons name="paypal" size={24} color={color} />

            
        }}
        
        
        />
          

<Tabs.Screen name='History'
        options={{
            tabBarLabel:"History",
            tabBarActiveTintColor:'black',
            tabBarLabelStyle: {
            // Use the font family name you registered with useFonts
              fontSize: 10, // You can adjust the size if needed
            },
            tabBarIcon:({color})=><FontAwesome6 name="money-bill-trend-up" size={24} color={color} />,


            
        }}/>
        <Tabs.Screen name='Notifications'
        options={{
            tabBarLabel:"Notifications",
            tabBarActiveTintColor:'black',
            tabBarLabelStyle: {
            // Use the font family name you registered with useFonts
              fontSize: 10, // You can adjust the size if needed
            },
            tabBarIcon:({color})=><MaterialIcons name="notifications" size={24} color={color} />,


            
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