import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';

export default function MyFriendCard({ friend }) {
  if (!friend) {
    console.log("No friend data available.");
    return null;
  }
  
  console.log("Friend data:", friend.name);

  return (
    <TouchableOpacity style={styles.card} onPress={() => console.log(`Tapped on ${friend.name}`)}>
      <View style={styles.info}>
      <Image
        style={styles.avatar} 
        source={ require("../assets/images/profile.png")} 
      />
<View   style={styles.userinfo}>
<Text style={styles.name}>{friend.name}</Text>
<Text style={styles.email}>{friend.email}</Text>

</View>
       
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
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#000',
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
    backgroundColor: 'rgb(250, 213, 29)', // Placeholder color
  },
  info: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'flex-start',
  
  },
  userinfo: {
    display:'flex',
    flexDirection:'column',
    alignItems:'flex-start',
      width:'60%'
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  email: {
    fontSize: 14,
    color: '#fff',
    marginVertical: 4,
  },
});
