import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

import { auth } from '../../../configs/fireBaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  const onSignIn = () => {
    if (!email || !password) {
      ToastAndroid.show("Please enter valid Email and password", ToastAndroid.BOTTOM);
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      
        console.log("User signed in");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
        if (errorCode === 'auth/invalid-email') {
          ToastAndroid.show("Invalid Email", ToastAndroid.BOTTOM);
        }
      });
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.heading}>Let's Sign You in</Text>

      <View>
        <Text style={styles.subheading}>Welcome Back</Text>
      </View>

      <View>
        <Text style={styles.subheading}>You've been missed!</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          placeholder='Enter email'
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          secureTextEntry={true}
          placeholder='Enter Password'
        />
      </View>

      <TouchableOpacity
        style={styles.signInButton}
       onPress={onSignIn()}
      >
        <Text style={styles.signInButtonText}>Sign in</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.createAccountButton}
         onPress={() => router.replace('auth/sign-up')}
      >
        <Text style={styles.createAccountButtonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: 'white',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 15,
  },
  heading: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 70,
   
    marginBottom: 20,
  },
  subheading: {
    fontSize: 18,
    color: "gray",
    textAlign: "justify",

  },
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 14,

  },
  input: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
 
  },
  signInButton: {
    padding: 15,
    backgroundColor: 'blue',
    borderRadius: 10,
    marginTop: 20,
  },
  signInButtonText: {
    color: 'white',
    textAlign: "center",
    fontSize: 16,

  },
  createAccountButton: {
    padding: 15,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 15,
  },
  createAccountButtonText: {
    color: 'blue',
    textAlign: "center",
    fontSize: 16,
  
  },
});
