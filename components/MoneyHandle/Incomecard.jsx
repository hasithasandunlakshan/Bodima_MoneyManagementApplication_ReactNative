import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function Incomecard({ userName, amount }) {
  return (
    <View style={styles.card}>
      <Text style={styles.userName}>{userName}</Text>
      <Text style={styles.amount}>RS: {amount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#4CAF50', // Green color
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  amount: {
    fontSize: 18,
    color: '#fff',
  },
});
