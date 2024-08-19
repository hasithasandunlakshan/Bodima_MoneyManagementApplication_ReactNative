import { View, Text, StyleSheet, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../../../constants/Colors';
import { createUserWithEmailAndPassword,updateProfile } from 'firebase/auth';
import { auth, db } from "../../../configs/fireBaseConfig"; // Ensure these are correctly imported
import { useRouter } from 'expo-router';
import { doc, setDoc } from "firebase/firestore"; 
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CreateAccount() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    
    const onCreateAccount = () => {
        if (!email || !password || !fullname) {
            ToastAndroid.show("Please enter all details", ToastAndroid.BOTTOM);
            return;
        }
        
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                console.log(user);

                const docData = {
                    UserName: fullname,
                    email: email,
                    createdAt: new Date().toISOString(), // Corrected function call
                    friendList: [],
                    LoanAmount: null,
                    GivenMoney: [],
                    TakenMoney:[]
                };
                updateProfile(user, {
                    displayName: fullname
                  })
                await setDoc(doc(db, "users", user.email), docData); // Save with user.uid as document ID
                console.log("Account created successfully!");
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.heading}>Create your Account</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Enter Full Name'
                    onChangeText={setFullname}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Enter email'
                    onChangeText={setEmail}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Enter Password'
                    secureTextEntry={true}
                    onChangeText={setPassword}
                />
            </View>

            <TouchableOpacity
                style={styles.createAccountButton}
                onPress={onCreateAccount}
            >
                <Text style={styles.createAccountButtonText}>Create Account</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.signInButton}
                onPress={() => router.push('auth/sign-in')}
            >
                <Text style={styles.signInButtonText}>Sign in</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
        backgroundColor: Colors.WHITE,
        height: '100%',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 10,
    },
    heading: {
        color: Colors.PRIMARY,
        textAlign: "center",
        marginTop: 80,
        fontSize: 30,
        //fontFamily: 'poppins', // Poppins Medium
    },
    inputContainer: {
        marginTop: 5,
        marginBottom: 5,
    },
    label: {
        fontSize: 15,
        //fontFamily: 'poppinsmedium', // Poppins Regular
    },
    input: {
        padding: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "gray",
        //fontFamily: 'poppinsmedium', // Poppins Regular
    },
    createAccountButton: {
        padding: 15,
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        marginTop: '15%',
    },
    createAccountButtonText: {
        color: Colors.PRIMARY,
        textAlign: "center",
        fontSize: 12,
        //fontFamily: 'poppinsmedium', // Poppins Medium
    },
    signInButton: {
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 10,
        marginTop: '5%',
    },
    signInButtonText: {
        color: Colors.WHITE,
        textAlign: "center",
        fontSize: 12,
        // fontFamily: 'poppinsmedium', // Poppins Medium
    },
});
