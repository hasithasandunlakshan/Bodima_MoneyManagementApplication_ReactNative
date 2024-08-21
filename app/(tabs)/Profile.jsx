

import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { auth } from '../../configs/fireBaseConfig';
import { useRouter } from 'expo-router';
import { deleteUser, signOut } from "firebase/auth";

export default function Profile() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const signOutUser = () => {
    signOut(auth).then(() => {
      console.log("Logged out");
      router.push('auth/sign-in');
    }).catch((error) => {
      console.error("Error signing out:", error.message);
    });
  };

  useEffect(() => {
    const currentUser = auth.currentUser;
    setUser(currentUser);
  }, []);

  const handleDeleteUser = () => {
    deleteUser(user).then(() => {
      console.log("User Deleted");
      router.push('/auth/sign-in');
    }).catch((error) => {
      console.error("Error deleting user:", error.message);
    });
  };

  const handleAddFriends = () => {
    router.push('userFriendsManage/showUsers'); // Navigate to the Add Friends screen
  };

  const handleMyFriends = () => {
    router.push('userFriendsManage/friendlist'); // Navigate to the My Friends screen
  };
  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No user is logged in</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/auth/sign-in')}>
          <Text style={styles.buttonText}>Sign in please</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image style={styles.profileImage} source={user.photoURL ? { uri: user.photoURL } : require("../../assets/images/profile.png")} />
        <Text style={styles.title}>{user.displayName || 'Add Your name'}</Text>
      </View>
      
      <View style={styles.formField}>
        <Text style={styles.formLabel}>Full Name:</Text>
        <TextInput
          style={styles.input}
          value={user.displayName || 'Add Your name'}
          editable={false}
        />
      </View>

      <View style={styles.formField}>
        <Text style={styles.formLabel}>Email:</Text>
        <TextInput
          style={styles.input}
          value={user.email}
          editable={false}
        />
      </View>

      {/* Add Friend Button */}
      <TouchableOpacity style={[styles.button, styles.addButton]} onPress={handleAddFriends}>
        <Text style={styles.buttonText}>Add Friend</Text>
      </TouchableOpacity>

      {/* My Friends Button */}
      <TouchableOpacity style={[styles.button, styles.myFriendsButton]} onPress={handleMyFriends}>
        <Text style={styles.buttonText}>My Friends</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={signOutUser}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDeleteUser}>
        <Text style={[styles.buttonText, styles.deleteButtonText]}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    objectFit: 'contain',
  },
  title: {
    fontSize: 15,
    color: '#333',
    marginBottom: 10,
    marginHorizontal: 10,
    fontFamily: 'poppins',
  },
  formField: {
    width: '100%',
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
    fontFamily: 'poppinsmedium',
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    fontFamily: 'poppinsregular',
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginVertical: 7,
    width: '70%',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#4CAF50',
  },
  myFriendsButton: {
    backgroundColor: '#2196F3',
  },
  logoutButton: {
    backgroundColor: '#FFA726',
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'poppinsmedium',
  },
  deleteButtonText: {
    fontWeight: 'bold',
  },
});
