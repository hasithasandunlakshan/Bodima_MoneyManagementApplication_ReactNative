import { collection, getDocs } from "firebase/firestore"; 
import { db, auth } from '../../configs/fireBaseConfig'; // Import auth to get the current user
import { View, Text, StyleSheet, Button, ActivityIndicator, ScrollView, ToastAndroid } from 'react-native';
import { useState } from "react";
import { query } from "firebase/firestore";
import Friend from "../../components/Friend";

export default function ShowUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Get the current user
  const currentUser = auth.currentUser;

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      const usersList = [];
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.email !== currentUser.email) {
          usersList.push(userData);
        }
      });
      setUsers(usersList);
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
      <Button title="Fetch Users" onPress={fetchUsers} />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView style={styles.scrollView}>
          {users.map((user, index) => (
            <Friend key={index} user={user} />
          ))}
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
