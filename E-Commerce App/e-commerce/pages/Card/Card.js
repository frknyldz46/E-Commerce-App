import React from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../../firebase-config';
import { getDatabase, remove } from 'firebase/database';
import { getAuth } from 'firebase/auth'
import { ref, push, set, onValue, get, query, orderByChild, equalTo } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';


export default function Card({ message, onPressProductDetails, isInCart }) {

    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const auth = getAuth(app)
    const navigation = useNavigation();




    const deleteProductBasket = async () => {
        const userId = auth.currentUser.uid;
        const cartRef = ref(database, `sepet/${userId}`);
        const sepetIdToDelete = message.sepetId;

        if (sepetIdToDelete) {
            const productQuery = query(cartRef, orderByChild('sepetId'), equalTo(sepetIdToDelete));

            try {
                const snapshot = await get(productQuery);
                const productItems = snapshot.val();

                if (productItems) {
                    // Sepetteki ürünleri döngüye alarak silme işlemi
                    await Promise.all(
                        Object.keys(productItems).map(async (key) => {
                            const product = productItems[key];

                            // Ürünün sepetId'si kontrol ediliyor
                            if (product.sepetId) {
                                const productRef = ref(database, `sepet/${userId}/${key}`);

                                try {
                                    // Ürünü sepetten sil
                                    await remove(productRef);
                                    console.log('Ürün başarıyla silindi');
                                } catch (removeError) {
                                    console.error('Ürün silinirken bir hata oluştu', removeError);
                                }
                            } else {
                                console.warn('Ürünün sepetId özelliği eksik veya undefined');
                            }
                        })
                    );
                }

                // Silme işlemi tamamlandıktan sonra sepete ekle
                await addToBasket();
            } catch (error) {

            }
        }
    };


    

    


  



    const addToCart = () => {

        const newCartItem = {
            text: message.text,
            fiyat: message.fiyat,
            imageUri: message.imageUri,
            aciklama: message.aciklama,
            
        };


        const userId = auth.currentUser.uid;

        const cartRef = ref(database, `likes/${userId}`);

        const newCartRef = push(cartRef);
        const newCartData = newCartItem;

        set(newCartRef, newCartData);



    };

    const addToBasket = () => {

        const newCartItem = {
            text: message.text,
            fiyat: message.fiyat,
            imageUri: message.imageUri,
            aciklama: message.aciklama,
            sepetId: message.productId
        };


        const userId = auth.currentUser.uid;

        const cartRef = ref(database, `sepet/${userId}`);

        const newCartRef = push(cartRef);
        const newCartData = newCartItem;

        set(newCartRef, newCartData);



    };



    return (

        <View style={isInCart ? styles.card_container_in_cart : styles.card_container}>

            <TouchableOpacity onPress={onPressProductDetails}>

                <View style={isInCart ? styles.card_row_in_cart : styles.null}>
                    {message.imageUri && <Image source={{ uri: message.imageUri }} style={isInCart ? styles.card_row_image : styles.card_image} />}

                    <View style={{ backgroundColor: '#F3EEEA', borderRadius: 15, marginTop: 5 }}>
                        <View style={isInCart ? styles.card_row_header : styles.card_header}>
                            <View style={styles.card_title}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{message.text}</Text>
                                <Text style={{ color: 'red' }}>{message.aciklama}</Text>
                            </View>

                            <Text style={{ fontSize: 18, fontWeight: 'bold'}}>${message.fiyat}</Text>
                        </View>

                        <View style={styles.card_rating}>

                            <View style={styles.rating}>

                                <Image
                                    source={require('../../images/star.png')}
                                    style={styles.rating_icon}
                                />

                                <Text>4,5</Text>

                            </View>

                            <View style={styles.rating}>

                                <Text>16k</Text>



                                <TouchableOpacity onPress={addToCart}>
                                    <Image
                                        source={require('../../images/heart.png')}
                                        style={styles.rating_icon}
                                    />

                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>
                </View>



                <View>
                    {isInCart ? (
                        <TouchableOpacity style={styles.delete_basket} onPress={deleteProductBasket} >
                            <Text style={{ textAlign: 'center', color: 'white', fontWeight: '600' }}>Sil</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.add_basket} onPress={addToBasket}>
                            <Text style={{ textAlign: 'center', color: 'white', fontWeight: '600' }}>Sepete Ekle</Text>
                        </TouchableOpacity>
                    )}


                </View>

            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    card_row_in_cart: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    card_container: {
        width: 170,
        backgroundColor: '#FFFBF5',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#FFFBF5',
        padding: 8
    },
    card_container_in_cart: {
        width: '100%',
        backgroundColor: '#FFFBF5',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#FFFBF5',
        padding: 8,
        marginTop: 15
    },

    card_image: {
        width: 'auto',
        height: 200,
        borderRadius: 15,

    },
    card_row_image: {
        width: 100,
        height: 100,
        borderRadius: 15,
    },
    card_header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        maxWidth: 170,


    },
    card_row_header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        maxWidth: 170,
        backgroundColor: '#FFFBF5'
    },
    card_title: {},

    card_rating: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },

    rating_icon: {
        width: 20,
        height: 20
    },
    rating: {
        flexDirection: 'row'
    },
    add_basket: {
        backgroundColor: '#A3B763',
        padding: 10,
        borderRadius: 10,
        marginTop: 10
    },
    delete_basket: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 10,
        marginTop: 10
    }
})