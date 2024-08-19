import { View, Text, Button, StyleSheet, ActivityIndicator, ToastAndroid } from 'react-native';
import React, { useContext, useState } from 'react';
import { auth, db } from '../../configs/fireBaseConfig'; // Adjust the import path as needed
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import MyFriendCard from '../../components/MyFriendCard';
import Friend from '../../components/Friend';
import { FriendsList } from '../../context/createFriendList';

export default function FriendList() {
  const [loading, setLoading] = useState(false);
  const [friendList, setFriendList] = useState([]);
  const [friendsData, setFriendsData] = useState([]);
  const {friends,setFriends}=useContext(FriendsList);
  // Get the current user
  const currentUser = auth.currentUser;

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
          setFriends(userData.friendList)
          console.log("Friend List:", friends);
          
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

  // const fetchFriendsData = async (friendList) => {
  //   try {
  //     setLoading(true);
  //     const friendsDataArray = [];

  //     for (const friend of friendList) {
  //       // If you are storing emails as document IDs
  //       const friendRef = doc(db, "users", friend.email);
  //       const friendDoc = await getDoc(friendRef);

  //       if (friendDoc.exists()) {
  //         friendsDataArray.push(friendDoc.data());
  //         console.log("Friend Data:", friendDoc.data());
  //       } else {
  //         console.log("No such document for friend:", friend.email);
  //       }
  //     }

  //     setFriendsData(friendsDataArray);
  //   } catch (error) {
  //     console.error("Error fetching friend data:", error);
  //     ToastAndroid.show("Failed to fetch friend data", ToastAndroid.BOTTOM);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Friend List</Text>
      <View style={styles.buttonContainer}>
        <Button title="Fetch Friends" onPress={fetchUsers} />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          {friendList.length > 0 ? (
            friendList.map((friend, index) => (
              <MyFriendCard friend={friend} key={index} />

           
            ))
          ) : (
            <Text>No friends found.</Text>
          )}
        </View>
      )}
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
  buttonContainer: {
    marginBottom: 20,
    width: '50%', 
  },
  friendCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '100%',
  },
  friendText: {
    fontSize: 16,
    marginVertical: 2,
  },
});
