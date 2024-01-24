import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../firebase-config';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth'
import { ref, push, set, onValue, off } from 'firebase/database';

import Card from './Card/Card';


export default function Like() {

    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const auth = getAuth(app)
    const [cartItems, setCartItems] = React.useState([]);
    
    const userId = auth.currentUser.uid;

    useEffect(() => {
        const cartRef = ref(database, `likes/${userId}`);
        onValue(cartRef, (snapshot) => {
            const cartData = snapshot.val() || [];
            setCartItems(Object.values(cartData));

            
        });

        return () => {

        };
    }, [userId]);



    return (
        <SafeAreaView style={styles.like_container} >
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Favoriler</Text>


            {cartItems.length > 0 ? (
                <View style={{flex:1}}>
                    <FlatList
                        data={cartItems}
                        renderItem={({ item }) => <Card message={item} isInCart={true} />}
                        //numColumns={2}
                        //columnWrapperStyle={styles.columnWrapper}

                    />
                
                </View>
            ) : (
                <Text>Favoriler Boş</Text>
            )}



        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    like_container: {
        backgroundColor: '#EEEEEE',
        flex: 1,

    },
    columnWrapper: {
        justifyContent: 'space-evenly',
        marginTop: 10,

    },
})