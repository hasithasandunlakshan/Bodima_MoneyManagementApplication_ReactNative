import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

export default function UserCard({ user }) {
const router =useRouter();
  const handleGiveMoney = () => {
    // Call the passed function for handling the Give Money action
   router.push({


    pathname:'/money/PaymentUpdate',
    params:{user
        :user.name,email:user.email},
   })
    //   Alert.alert('Action', `Give Money button pressed for `);
    
  };

  return (
    <View style={styles.card}>
      <Text style={styles.username}>{user.name}</Text>
      <Button 
        title="Give Money/Pay" 
        onPress={handleGiveMoney} 
        color="#007BFF" // Optional: Customize the button color
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    maxWidth: 400,
    marginVertical: 10,
    elevation: 3, // Adds shadow for Android
    shadowColor: '#000', // Adds shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center', // Center items horizontally
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});
