import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors'; // Adjust the import path as needed
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  return (
    <View style={{alignItems:'center'
      , borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      padding: 20,
      borderWidth: 3,
      backgroundColor: Colors.WHITE,
    }}>
      <Image 
        source={require('../assets/images/Home.png')} // Replace with your actual image
        style={{
          width: "80%",
          height: "40%",
          objectFit:'contain',
          transform: [{ rotate: '-15deg' }], 
          
          
        }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>MyBank</Text>
        <Text style={styles.subtitle}>
          Manage your finances seamlessly. Access your accounts, track your spending, and stay in control.
        </Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('auth/sign-in')} // Adjust the route as needed
        >
          <Text style={styles.buttonText}>Start Banking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  
    marginTop: -20,
    height: '100%',
   
    shadowOffset: { width: 0, height: 20 },
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  title: {
    fontSize: 36,
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.PRIMARY,
  },
  subtitle: {
    marginVertical: '2%',
    fontSize: 18,
    textAlign: 'center',
    color: Colors.SECONDARY,
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
    marginTop: '10%',
  },
  buttonText: {
    color: Colors.WHITE,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});
