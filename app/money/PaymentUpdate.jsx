import { useLocalSearchParams } from 'expo-router';
import { doc, updateDoc,addDoc,collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { auth, db } from '../../configs/fireBaseConfig';

export default function PaymentUpdate() {
  const [amount, setAmount] = useState('');
  const { user, email } = useLocalSearchParams(); 
 // const [username, setUsername] = useState('');
const currentuserEmail=auth.currentUser.email;
 const updateTransaction = async (currentUserEmail, friendEmail, amount) => {
    try {
      // Reference to the 'Transactions' collection
      const transactionRef = collection(db, 'Transactions');
  
      // Create a new document in the 'Transactions' collection
      const newTransaction = await addDoc(transactionRef, {
        Sender: currentUserEmail,
        Receiver: friendEmail,
        Amount: amount,
        Timestamp: new Date(), // Optional: Add a timestamp
      });
  
      console.log('Transaction successfully added with ID:', newTransaction.id);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };


  const handleSubmit = () => {

    updateTransaction(currentuserEmail,email,amount);
    console.log(`Amount: ${amount}, Username: ${user}`);
    // Add logic for handling the payment update
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Update</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      
      <TextInput
        style={styles.input}
        placeholder={user}
        value={user}
        editable={false}
        
      />
      
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    width: '80%',
    borderRadius: 5,
  },
});
