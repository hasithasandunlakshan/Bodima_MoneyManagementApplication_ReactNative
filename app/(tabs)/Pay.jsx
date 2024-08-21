import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import FriendList from '../userFriendsManage/friendlist';
import Pay from '../money/pay';
import { useNavigation } from 'expo-router';


export default function PayFriends() {
  
   
  
  return (
    <View style={styles.container}>
     
<Text  style={{color:'#fff',fontSize: 30,
    fontWeight: 'bold',
    marginTop:40
    }}>Pay your friends</Text>
      <Image 
        source={require('../../assets/images/Coins.jpg')} // Replace with your actual image
        style={{
          width: "80%",
          height: "40%",
          objectFit:'contain',
         
          
          
        }}
      />
        <Pay/>
        
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes up the full height of the parent
    justifyContent: 'center', // Center items vertically
    alignItems: 'center',
    backgroundColor:'#000' // Center items horizontally
  },
});
