import { Stack } from "expo-router";
import { useState } from "react";
import {FriendsList} from "../context/createFriendList"
export default function RootLayout() {



  const [friends,setFriends]=useState([]);
  return (
<FriendsList.Provider  value={{friends,setFriends}}>
<Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name="(tabs)" />
  </Stack>
</FriendsList.Provider>

   
  );
}
