import React from 'react'
import { View, TextInput, Button, Alert, StyleSheet, Text,Image,TouchableOpacity } from 'react-native';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../firebase-config';





export default function PasswordResetScreen() {

    const [email, setEmail] = React.useState('');
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);


    const handleResetPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            Alert.alert('Şifre sıfırlama e-postası gönderildi.');
        } catch (error) {
            console.error('Şifre sıfırlama hatası:', error.message);
            Alert.alert('Şifre sıfırlama işlemi başarısız oldu.');
        }
    };
    return (

        <View style={styles.containerReset}>

            <Image
                source={require('../images/lock_icon.png')}
                style={{width:100,height:100}}
            />

            <Text style={{color:'#A3B763',fontSize:20,textAlign:'center',fontWeight:'700',marginTop:50}}>E-posta Adresinizi Girerek Şifrenizi Sıfırlayabilirsiniz</Text>
            <TextInput
                style={[styles.inputReset,{ color: 'black' }]}
                placeholder="E-posta adresinizi girin"
                placeholderTextColor="gray"
                onChangeText={(text) => setEmail(text)}
            />
            

            <TouchableOpacity style={styles.buttonReset} onPress={handleResetPassword}>
                    <Text style={{ color: 'white', fontWeight: '700' }}>Şifremi Sıfırla</Text>
                </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    containerReset: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#EEEEEE'
    },
    inputReset: {
        height: 40,
        width: 200,
        borderColor: '#A3B763',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        marginTop:20,
        borderRadius:50
    },
    buttonReset:{
        alignItems: 'center',
        backgroundColor: '#A3B763',
        width: 150,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 10,
        borderRadius: 13,
        marginTop: 15

    }
});
