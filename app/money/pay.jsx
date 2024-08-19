import { View, Text, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { FriendsList } from '../../context/createFriendList';
import UserCard from '../../components/MoneyHandle/GiveMoney';

export default function Pay() {
  const { friends } = useContext(FriendsList);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Friend List</Text>
      {friends.length > 0 ? (
        friends.map((friend, index) => (
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
