import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore"; 
import { auth, db } from '../../configs/fireBaseConfig';
import Incomecard from './Incomecard';
import Outcomecard from './outcomecard';

export default function Balances() {
    const [friendsBalances, setFriendsBalances] = useState([]);
    const currentUser = auth.currentUser;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        calculateBalances();
    }, []);

    const calculateBalances = async () => {
        if (!currentUser) {
            console.error("No user is currently signed in.");
            return;
        }
        setLoading(true);

        try {
            const balanceMap = {};

            // Step 1: Fetch amounts the current user has sent
            const sentQuery = query(
                collection(db, "Transactions"), 
                where("Sender", "==", currentUser.email)
            );

            const sentSnapshot = await getDocs(sentQuery);

            sentSnapshot.forEach((doc) => {
                const data = doc.data();
                const receiverEmail = data.Receiver;
                const receiverName = data.ReceiverName;
                const amountSent = parseFloat(data.Amount) || 0;

                if (receiverEmail) {
                    if (!balanceMap[receiverEmail]) {
                        balanceMap[receiverEmail] = { name: receiverName, sent: 0, received: 0 };
                    }
                    balanceMap[receiverEmail].sent += amountSent;
                }
            });

            // Step 2: Fetch amounts the current user has received
            const receivedQuery = query(
                collection(db, "Transactions"), 
                where("Receiver", "==", currentUser.email)
            );

            const receivedSnapshot = await getDocs(receivedQuery);

            receivedSnapshot.forEach((doc) => {
                const data = doc.data();
                const senderEmail = data.Sender;
                const senderName = data.SenderName;
                const amountReceived = parseFloat(data.Amount) || 0;

                if (senderEmail) {
                    if (!balanceMap[senderEmail]) {
                        balanceMap[senderEmail] = { name: senderName, sent: 0, received: 0 };
                    }
                    balanceMap[senderEmail].received += amountReceived;
                }
            });

            // Step 3: Calculate the difference between received and sent for each friend
            const balancesArray = Object.entries(balanceMap).map(([email, { name, sent, received }]) => ({
                friendEmail: email,
                friendName: name,
                balance: (received - sent).toFixed(2),
            }));

            setFriendsBalances(balancesArray);
            console.log("Friends balances:", balancesArray);
        } catch (error) {
            console.error("Error calculating balances:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>



            <Text style={styles.title}>Balances with Friends</Text>
            {loading && <ActivityIndicator size={'large'} color={"#fff"} />}
            {friendsBalances.length > 0 ? (
                <View>
                    {friendsBalances.map(({ friendEmail, friendName, balance }, index) => {
                        if (balance > 0) {
                            return (
                                <Incomecard userName={friendName} userEmail={friendEmail} amount={balance} key={index} />
                            );
                        }
                        if (balance < 0) {
                            return (
                                <Outcomecard userName={friendName} userEmail={friendEmail} amount={balance} key={index} />
                            );
                        }
                        return null; // Return null if the condition is not met
                    })}
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
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        backgroundColor:'#000'
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color:'#ffff'
    },
    amount: {
        fontSize: 18,
        marginVertical: 5,
    },
});
