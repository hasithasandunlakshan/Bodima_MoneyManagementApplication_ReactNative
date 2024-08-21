import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import FriendList from '../userFriendsManage/friendlist';
import Pay from '../money/pay';


export default function PayFriends() {
  
  
  return (
    <View style={styles.container}>
     

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
