import { collection, getDocs } from "firebase/firestore"; 
import { db, auth } from '../../configs/fireBaseConfig'; 
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, ToastAndroid } from 'react-native';
import { useEffect, useState } from "react";
import { query } from "firebase/firestore";
import Friend from "../../components/Friend";
import NonFriend from "../../components/NonFriend";
import { useNavigation } from "expo-router";

export default function ShowUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userFriend, setUserFriend] = useState([]);
  const navigation=useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTranseparent: true,
      headerTitle: 'Add Friends'
    });
  }, []);
  // Get the current user
  const currentUser = auth.currentUser;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      const usersList = [];
      let friendEmails = [];

      querySnapshot.forEach((doc) => {
        const userData = doc.data();

        // Add all users except the current user to the list
        if (userData.email !== currentUser.email) {
          usersList.push(userData);
        } else {
          // If the user is the current user, collect their friends' emails
          if (userData.friendList) {
            friendEmails = userData.friendList.map(friend => friend.email);
          }
        }
      });

      setUserFriend(friendEmails);
      setUsers(usersList);

      console.log("userFriends:", friendEmails);
    } catch (error) {
      console.error(error);
      ToastAndroid.show("Failed to fetch users", ToastAndroid.BOTTOM);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Show Users</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView style={styles.scrollView}>
          {users.map((user, index) => {
            if (userFriend.includes(user.email)) {
              return <NonFriend key={index} user={user}/>;
            } else {
              return <Friend key={index} user={user} /> ; // Don't render anything if the user is not a friend
            }
          })}
        </ScrollView>
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
  scrollView: {
    width: '100%',
    marginTop: 10,
  },
});
