import { Redirect, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import {auth} from '../configs/fireBaseConfig'
import Login from "../components/Login"
export default function Index() {
  const route=useRouter();
  const user=auth.currentUser;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
{user? <Redirect href={'/MyBanking'}/>:<Login/>}
    </View>
  );
}
