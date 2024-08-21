import React from 'react';
import { auth, db } from '../configs/fireBaseConfig';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

export default function NonFriend({ user }) {
  const currentUser = auth.currentUser;

  const updateUserDoc = async (email, updateData) => {
    try {
      const userRef = doc(db, 'users', email); // Using email as the document ID
      await updateDoc(userRef, updateData);
      console.log('Document successfully updated!');
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const handleAddFriend = async (currentUser1, friend) => {
    if (currentUser1 && friend) {
      const userEmail = currentUser1.email;
      
    const userRef = doc(db, 'users', userEmail);
   

      // Fetch current user data
      const userDoc = await getDoc(userRef);
   
      if (userDoc.exists()) {
        const userData = userDoc.data();

        // Update friend list
        const newFriend = {
          name:friend.UserName || friend.displayName,
          email: friend.email,
          // Handling UserName or displayName
        };
        
        const updatedFriendList = [...userData.friendList, newFriend];
        const updateData = {
          friendList: updatedFriendList,
        };
        console.log(updateData);
     
        try {
          await updateUserDoc(userEmail, updateData);
          console.log(currentUser1.email ,"add friend", friend.email)
        } catch (error) {
          console.log('No such document!');
        }
      } else {
        console.log('No such document!');
      }
    }
  };

  const addfriendButton = async (currentUser1, user) => {
    await handleAddFriend(currentUser1, user);  // Update current user's friend list
    await handleAddFriend(user, currentUser1);  // Update friend's friend list
  };

  return (
    <View style={styles.card}>
      <Image
        source={require('../assets/images/profile.png')} // Replace with actual avatar URL
        style={styles.avatar}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{user.UserName}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Button 
  title="Friends" 
  disabled={true}  // Set this to `true` to disable the button
/>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
});
