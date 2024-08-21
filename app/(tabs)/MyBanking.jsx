import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { router, useRouter } from 'expo-router';
import Balances from '../../components/MoneyHandle/Balances'
export default function MyMoney() {
  const route = useRouter();

  const handlePayMoney = () => {
    route.push('money/pay'); // Navigate to the Pay Money screen
  };
  const handleGiveMoney = () => {
    route.push('money/GiveMoney'); // Navigate to the Pay Money screen
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/images/Balance.jpg')} // Replace with your actual image
        style={{
          width: "80%",
          height: "40%",
          objectFit:'contain',
          borderRadius:50,borderColor:'white'
         
          
          
        }}/>
   <Balances/>
   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    width:'100%',
      backgroundColor:'#000'
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
