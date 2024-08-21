import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { auth, db } from '../../configs/fireBaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import UserCard from '../../components/MoneyHandle/GiveMoney';

export default function Pay() {
  const [loading, setLoading] = useState(false);
  const [friendList, setFriendList] = useState([]);
  
  const currentUser = auth.currentUser;

  const fetchUsers = async () => {
    try {
      setLoading(true);

      if (currentUser) {
        const q = query(
          collection(db, "users"),
          where("email", "==", currentUser.email)
        );

        const querySnapshot = await getDocs(q);
        let userData = null;

        querySnapshot.forEach((doc) => {
          userData = doc.data();
        });

        if (userData && userData.friendList) {
          setFriendList(userData.friendList);
        } else {
          console.log("No friend list found for the current user.");
        }
      } else {
        console.log("No user is currently signed in.");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Use useFocusEffect to trigger fetchUsers when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchUsers();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Friend List</Text>
      {friendList.length > 0 ? (
        friendList.map((friend, index) => (
          <UserCard key={index} user={friend} />
        ))
      ) : (
        <Text>No friends available.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  friendCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  friendText: {
    fontSize: 16,
    marginVertical: 2,
  },
});
