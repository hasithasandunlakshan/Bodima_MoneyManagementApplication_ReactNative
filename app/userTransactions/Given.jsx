import { View, Text, Button, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore"; 
import { auth, db } from '../../configs/fireBaseConfig'; // Ensure db is imported

export default function Given() {
    const [receiverAmounts, setReceiverAmounts] = useState([]);
    const currentUser = auth.currentUser;

    const getReceiversList = async () => {
        if (!currentUser) {
            console.error("No user is currently signed in.");
            return;
        }

        try {
            // Step 1: Get the list of all receivers for the current user
            const q = query(
                collection(db, "Transactions"), 
                where("Sender", "==", currentUser.email)
            );

            const querySnapshot = await getDocs(q);
            const receiverAmountsMap = {};

            // Step 2: Collect unique receivers and prepare amounts map
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const receiverEmail = data.Receiver;
                const receiverName = data.ReceiverName;

                // Convert amount to a number using parseFloat for accuracy
                const amount = parseFloat(data.Amount) || 0;

                if (receiverEmail) {
                    if (!receiverAmountsMap[receiverEmail]) {
                        receiverAmountsMap[receiverEmail] = { name: receiverName, amount: 0 };
                    }
                    receiverAmountsMap[receiverEmail].amount += amount;
                    console.log(amount);
                }
            });

            // Convert receiverAmountsMap to an array of objects for easier display
            const receiverAmountsArray = Object.entries(receiverAmountsMap).map(([email, { name, amount }]) => ({
                receiverName: name,
                amount: amount.toFixed(2), // Optional: Format the amount to 2 decimal places
            }));

            setReceiverAmounts(receiverAmountsArray);
            console.log("Receiver amounts:", receiverAmountsArray);
        } catch (error) {
            console.error("Error getting transactions:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Total Amounts Given to Each Receiver</Text>
            <Button 
                title="Fetch Receiver Amounts" 
                onPress={getReceiversList} 
            />
            {receiverAmounts.length > 0 ? (
                <View>
                    {receiverAmounts.map(({ receiverName, amount }, index) => (
                        <Text key={index} style={styles.amount}>
                            {receiverName}: RS: {amount}
                        </Text>
                    ))}
                </View>
            ) : (
                <Text>No data available.</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    amount: {
        fontSize: 18,
        marginVertical: 5,
    },
});
