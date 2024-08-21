import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { doc, updateDoc,addDoc,collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { auth, db } from '../../configs/fireBaseConfig';
import { Alert } from 'react-native';
export default function PaymentUpdate() {
  const [amount, setAmount] = useState('');
  const { user, email } = useLocalSearchParams(); 
  const router=useRouter();

  const navigation=useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTranseparent: true,
      headerTitle: 'Pay Money'
    });
  }, []);
 // const [username, setUsername] = useState('');
const currentuserEmail=auth.currentUser.email;
const currentUserName=auth.currentUser.displayName;
 const updateTransaction = async (currentUserEmail, friendEmail, amount) => {
    try {
      // Reference to the 'Transactions' collection
      const transactionRef = collection(db, 'Transactions');
  
      // Create a new document in the 'Transactions' collection
      const newTransaction = await addDoc(transactionRef, {
        Sender: currentUserEmail,
        SenderName:currentUserName,
        Receiver: friendEmail,
        ReceiverName:user,
        Amount: amount,
        Timestamp: new Date(), // Optional: Add a timestamp
      });
  
      console.log('Transaction successfully added with ID:', newTransaction.id);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };


  const handleSubmit = () => {
    // Add an alert to confirm the transaction
    Alert.alert(
      "Confirm Transaction",
      `Are you sure you want to send Rs. ${amount} to ${user}?`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Transaction canceled"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            // Proceed with the transaction if OK is pressed
            updateTransaction(currentuserEmail, email, amount);
            console.log(`Amount: ${amount}, Username: ${user}`);
            router.replace({
              pathname: '(tabs)/MyBanking', // Navigate back to home (or another screen)
            });
          }
        }
      ],
      { cancelable: false }
    );
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
