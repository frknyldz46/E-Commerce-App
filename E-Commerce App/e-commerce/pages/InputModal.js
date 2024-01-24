
import React, { useEffect } from 'react'
import { StyleSheet, TextInput, View, Dimensions, Button, Text, Image, Keyboard, TouchableOpacity, ScrollView } from 'react-native'
import Modal from 'react-native-modal'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../firebase-config';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { launchImageLibraryAsync } from 'expo-image-picker';
import uuid from 'react-native-uuid';

const deviceSize = Dimensions.get('window')
export default function InputModal({ visible, onClose, onSend }) {

    
    const productId=uuid.v4()
    const [text, setText] = React.useState(null)
    const [aciklama, setAciklama] = React.useState(null)
    const [fiyat, setFiyat] = React.useState(null)
    const [imageUri, setImageUri] = React.useState(null);
    const [detayAciklama, setDetayAciklama] = React.useState(null);
    const [keyboardHeight, setKeyboardHeight] = React.useState(0);



    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);




    const pickMultipleImages = async () => {
        const result = await launchImageLibraryAsync({
            allowsMultipleSelection: true,
        });
        if (!result.canceled) {
            for (const image of result.assets) {
                uploadImage(image.uri);
            }
        }
    };

    const uploadImage = async (uri) => {
        try {
            const response = await fetch(uri);
            const blob = await response.blob();

            const imageName = `images/${Date.now()}.jpg`;
            const imageRef = ref(storage, imageName);


            await uploadBytes(imageRef, blob);


            const downloadURL = await getDownloadURL(imageRef);
            console.log('Resim başarıyla yüklendi. Resim URL:', downloadURL);
            setImageUri(downloadURL);
        } catch (error) {
            console.error('Resim yükleme hatası:', error);
        }
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
            setKeyboardHeight(event.endCoordinates.height);
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardHeight(0);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);







    function handleSend() {
        if (!text && !aciklama && !imageUri && !fiyat && !detayAciklama) {
            return;
        }

        onSend(text, aciklama, imageUri, fiyat,detayAciklama,productId);
        setText(null)
        setAciklama(null)
        setImageUri(null)
        setFiyat(null)
        setDetayAciklama(null)
    }


    return (
        <Modal
            style={[styles.modal, { marginTop: -keyboardHeight }]}
            isVisible={visible}
            onSwipeComplete={onClose}
            onBackdropPress={onClose}
            onBackButtonPress={onClose}


        >


            <View style={styles.containerModal} >
                <ScrollView>
                    <View>

                        {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}

                        <TouchableOpacity style={styles.buttonModal} onPress={pickMultipleImages}>
                            <Text style={{ color: 'white', fontWeight: '700' }}>Görsel Seç</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={{ marginTop: 10, fontSize: 20, fontWeight: '700' }}>Ürün Başlığı Giriniz</Text>
                    <TextInput
                        style={[styles.input, { color: 'black' }]}
                        placeholder='Ürün Başlığını Giriniz'
                        placeholderTextColor="#A3B763"
                        onChangeText={setText}
                        multiline
                    />

                    <Text style={{ marginTop: 10, fontSize: 20, fontWeight: '700' }}>Ürün Açıklamasını Giriniz</Text>
                    <TextInput
                        style={[styles.input, { color: 'black' }]}
                        placeholder='Ürün Açıklamasını Giriniz'
                        placeholderTextColor="#A3B763"
                        onChangeText={setAciklama}
                        multiline
                    />

                    <Text style={{ marginTop: 10, fontSize: 20, fontWeight: '700' }}>Fiyat Giriniz</Text>
                    <TextInput
                        style={[styles.input, { color: 'black' }]}
                        placeholder='Ürünün Fiyatını Giriniz'
                        placeholderTextColor="#A3B763"
                        onChangeText={setFiyat}
                        multiline
                    />

                    <Text style={{ marginTop: 10, fontSize: 20, fontWeight: '700' }}>Ürün Özelliklerini Giriniz </Text>
                    <TextInput
                        style={[styles.input, { color: 'black' }]}
                        placeholder='Ürünün Fiyatını Giriniz'
                        placeholderTextColor="#A3B763"
                        onChangeText={setDetayAciklama}
                        multiline
                    />


                    <TouchableOpacity style={styles.buttonModal} onPress={handleSend}>
                        <Text style={{ color: 'white', fontWeight: '700' }}>Gönder</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({
    containerModal: {
        backgroundColor: '#EEEEEE',
        padding: 15,
        margin: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        height: deviceSize.height / 2

    },
    modal: {
        margin: 0
    },
    buttonModal: {
        alignItems: 'center',
        backgroundColor: '#A3B763',
        width: 100,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 10,
        borderRadius: 13,
        marginTop: 15

    },
    input: {
        height: 40,
        borderColor: '#A3B763',
        borderWidth: 1,
        padding: 10,
        marginTop: 10,
        borderRadius: 10,



    },
})
