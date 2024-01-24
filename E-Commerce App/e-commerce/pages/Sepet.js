import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../firebase-config';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth'
import { ref, push, set, onValue, off } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import Card from './Card/Card';


export default function Sepet() {

    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const auth = getAuth(app)
    const navigation = useNavigation();
    const [cartItems, setCartItems] = React.useState([]);
    const [totalPrice, setTotalPrice] = React.useState(0);
    const userId = auth.currentUser.uid;
    
    const adressınfo = () => {
        navigation.navigate('AdressInfo',{ totalprice: totalPrice.toFixed(2) }) 
    }

    useEffect(() => {
        const cartRef = ref(database, `sepet/${userId}`);
        onValue(cartRef, (snapshot) => {
            const cartData = snapshot.val() || [];
            setCartItems(Object.values(cartData));

            const total = Object.values(cartData).reduce((sum, item) => sum + parseFloat(item.fiyat), 0);
            setTotalPrice(total);

            
        });

        return () => {

        };
    }, [userId]);



    return (
        <SafeAreaView style={styles.like_container} >
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Sepetiniz</Text>


            {cartItems.length > 0 ? (
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={cartItems}
                        renderItem={({ item }) => <Card message={item} isInCart={true} />}
                        //numColumns={2}
                        //columnWrapperStyle={styles.columnWrapper}

                    />
                    <View style={styles.toplamFiyat}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold'}}>Toplam Fiyat: ${totalPrice.toFixed(2)}</Text>
                        <TouchableOpacity style={styles.buttonDetailsAl} onPress={adressınfo}>
                            <Text style={{ color: 'black', fontWeight: '700' }}>Ödemeye Geç</Text>
                        </TouchableOpacity>

                    </View>

                </View>
            ) : (
                <Text>Sepetiniz Boş</Text>
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

    toplamFiyat: {
        flexDirection:'row',
        padding: 5,
        justifyContent:'space-between',
        alignItems:'center'
    },
    buttonDetailsAl: {
        alignItems: 'center',
        width: 100,
        justifyContent: 'center',
        padding: 10,
        borderRadius: 13,
        marginTop: 15,
        width: 130,
        height: 50,
        borderWidth: 2,
        borderColor: '#A3B763'
    },
})