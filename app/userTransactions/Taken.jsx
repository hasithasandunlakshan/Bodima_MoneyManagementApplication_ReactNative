import { View, Text, Button, StyleSheet } from 'react-native';
import React from 'react';
import { collection, query, where, getDocs } from "firebase/firestore"; 
import { auth, db } from '../../configs/fireBaseConfig'; // Ensure db is imported

export default function Given() {
    const currentuser = auth.currentUser;

    const getTransactions = async () => {
        const q = query(collection(db, "Transactions"), where("Sender", "==", currentuser.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Given Transactions</Text>
            <Button title="Fetch Transactions" onPress={getTransactions} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
});
