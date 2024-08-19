import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function MyMoney() {
  const route = useRouter();

  const handleAddFriends = () => {
    route.push('userFriendsManage/showUsers'); // Navigate to the Add Friends screen
  };

  const handleMyFriends = () => {
    route.push('userFriendsManage/friendlist'); // Navigate to the My Friends screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Money</Text>
      <Button title="Add Friends" onPress={handleAddFriends} />
      <Button title="My Friends" onPress={handleMyFriends} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    marginTop: 10, // Add spacing between buttons
  },
});
