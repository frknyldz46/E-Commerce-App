import React from 'react'
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../firebase-config';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth'
import { ref, push, set, onValue, off } from 'firebase/database';
export default function AdressInfo({ route }) {

    const [ad, setAd] = React.useState(null)
    const [soyad, setSoyad] = React.useState(null)
    const [sehir, setSehir] = React.useState(null)
    const [ilce, setIlce] = React.useState(null)
    const [adres, setAdres] = React.useState(null)
    const [tel, setTel] = React.useState(null)
    const [cadde, setCadde] = React.useState(null)
    const [posta, setPosta] = React.useState(null)

    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const auth = getAuth(app)

    const dataRefAdres = ref(database, '/adressinfo');

    const navigation = useNavigation();
    const { totalprice } = route.params

    function gotoPayment() {
        navigation.navigate('PaymentScreen', { totalprice })
    }

    const handlePress = () => {
        // Perform any actions needed before dismissing the keyboard
        // For example, you might want to save the entered data or perform validations

        // Dismiss the keyboard
        Keyboard.dismiss();
    };

    function combineAdres(){
        handleSendAdres();
        gotoPayment()
    }

    function handleSendAdres() {
        if (!ad && !soyad && !sehir && !ilce && !adres && !tel && !cadde && !posta) {
            return;
        }

        onSendAdres(ad, soyad, sehir, ilce, adres, tel, cadde, posta);
        setAd(null)
        setSoyad(null)
        setSehir(null)
        setIlce(null)
        setAdres(null)
        setTel(null)
        setCadde(null)
        setPosta(null)
    }

    function onSendAdres(ad, soyad, sehir, ilce, adres, tel, cadde, posta) {
        const userMail = auth.currentUser.email
        const sendObjectAdres = {
            ad: ad,
            soyad: soyad,
            
            sehir: sehir,
            ilce: ilce,
            username: userMail.split('@')[0],
            adres: adres,
            tel: tel,
            cadde: cadde,
            posta: posta



        }

        const newRefAdres = push(dataRefAdres);
        const newDataAdres = sendObjectAdres;
        set(newRefAdres, newDataAdres);

    }
    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <SafeAreaView style={styles.adrescontainer}>

                <View style={{ padding: 25 }}>
                    <Text style={{ fontSize: 24, fontWeight: '600' }}>
                        Teslimat Bilgileri
                    </Text>

                    <View>
                        <View style={styles.name}>
                            <TextInput
                                style={styles.inputname}
                                placeholder='Ad'
                                onChangeText={setAd}
                            />
                            <TextInput
                                style={styles.inputname}
                                placeholder='SoyAd'
                                onChangeText={setSoyad}
                            />
                        </View>

                        <TextInput
                            style={styles.input}
                            placeholder='Şehir'
                            onChangeText={setSehir}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='İlçe'
                            onChangeText={setIlce}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder='Açık Adres'
                            onChangeText={setAdres}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder='Telefon Numarası'
                            keyboardType='number-pad'
                            onChangeText={setTel}
                        />

                        <View style={styles.name}>
                            <TextInput
                                style={styles.inputname}
                                placeholder='Cadde'
                                onChangeText={setCadde}
                            />
                            <TextInput
                                style={styles.inputname}
                                placeholder='Posta Kodu'
                                onChangeText={setPosta}
                            />
                        </View>

                    </View>
                    <TouchableOpacity style={styles.odeme} onPress={combineAdres}>
                        <Text style={{ color: 'white', fontSize: 15, fontWeight: '700' }}>Ödemeye Geç</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    name: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    inputname: {
        borderWidth: 1,
        width: 155,
        padding: 15,
        borderRadius: 15,
        borderColor: 'gray',
        marginTop: 30

    },
    input: {
        borderWidth: 1,
        padding: 15,
        borderRadius: 15,
        borderColor: 'gray',
        marginTop: 30

    },
    odeme: {
        backgroundColor: '#A3B763',
        padding: 15,
        borderRadius: 20,
        marginTop: 30,
        alignItems: 'center',

    },
    adrescontainer: {
        backgroundColor: '#EEEEEE',

    }
})