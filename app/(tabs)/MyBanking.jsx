import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { router, useRouter } from 'expo-router';

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
   
      <Button title="Pay Money" onPress={handlePayMoney} />
      <Button title="Give Money" onPress={handleGiveMoney} />
      <Button title="Taken" onPress={()=>route.push('/userTransactions/Taken')} />
      <Button title="Given" onPress={()=>route.push('/userTransactions/Given')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
