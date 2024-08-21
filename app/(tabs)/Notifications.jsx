import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function Notifications() {
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8', // Example background color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Example text color
  },
});
