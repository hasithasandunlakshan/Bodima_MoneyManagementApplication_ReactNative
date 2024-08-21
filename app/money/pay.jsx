import { View, Text, StyleSheet } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { FriendsList } from '../../context/createFriendList';
import UserCard from '../../components/MoneyHandle/GiveMoney';
import { auth,db } from '../../configs/fireBaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
export default function Pay() {
  const [loading, setLoading] = useState(false);
    const [friendList, setFriendList] = useState([]);
    const [friendsData, setFriendsData] = useState([]);
    
    // Get the current user
    const currentUser = auth.currentUser;
  useEffect(()=>{
  
    fetchUsers();
  },[])
    const fetchUsers = async () => {
      try {
        setLoading(true);
  
        if (currentUser) {
          const q = query(
            collection(db, "users"),
            where("email", "==", currentUser.email) // You can also use UID if it's stored
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
        ToastAndroid.show("Failed to fetch users", ToastAndroid.BOTTOM);
      } finally {
        setLoading(false);
      }
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Friend List</Text>
      {friendList.length > 0 ? (
        friendList.map((friend, index) => (
        <UserCard user={friend}/>
        ))
      ) : (
        <Text>No friends available.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
