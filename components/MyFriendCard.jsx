import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

export default function MyFriendCard({ friend }) {
  if (!friend) {
    console.log("No friend data available.");
    return null;
  }
  
  console.log("Friend data:", friend.name);

  return (
    <TouchableOpacity style={styles.card} onPress={() => console.log(`Tapped on ${friend.name}`)}>
      <View style={styles.info}>
        <Text style={styles.name}>{friend.name}</Text>
        <Text style={styles.email}>{friend.email}</Text>
        {/* <Button 
          title="View Profile" 
          onPress={() => console.log(`View Profile of ${friend.name}`)} 
          color="#007BFF" // Optional: Customize the button color
        /> */}
      </View>
    </TouchableOpacity>
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
    backgroundColor: '#bbbb',
    display: 'flex',
    flexDirection: 'column',
    maxHeight:100,
    justifyContent:'center'
  },
  avatar: {
    width: 60, 
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  email: {
    fontSize: 14,
    color: '#000',
    marginVertical: 4,
  },
});
