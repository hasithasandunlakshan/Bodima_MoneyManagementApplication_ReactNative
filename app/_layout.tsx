import { Stack } from "expo-router";
import { useState } from "react";

export default function RootLayout() {




  return (

<Stack screenOptions={{ headerShown: false }} >
    <Stack.Screen name="(tabs)" />
  </Stack>


   
  );
}
