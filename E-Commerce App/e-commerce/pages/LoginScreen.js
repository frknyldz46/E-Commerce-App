
import { StyleSheet, Text, View, TextInput, Button, Alert, Image, TouchableOpacity, SafeAreaView, ImageBackground, KeyboardAvoidingView } from 'react-native';
import IconEye from 'react-native-vector-icons/FontAwesome';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../firebase-config';
import React from 'react';
import { useNavigation } from '@react-navigation/native';




export default function LoginScreen() {  
    const admin = 'admin@gmail.com'
    const adminpassword = '123456789'

    const navigation = useNavigation();

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const [passwordvisibility, setPasswordvisibility] = React.useState('')

    const togglePasswordVisibility = () => {

        setPasswordvisibility((prevPassword) => !prevPassword);
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);


    const resetPasswordNavigate = () => {
        navigation.navigate('PasswordResetScreen') 
    }

    const handleCreateAccount = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('Account created!')
                const user = userCredential.user
                console.log(user)
                Alert.alert('Kayıt Oluşturuldu')


            })
            .catch(error => {
                console.log(error)
                Alert.alert(error.message)
            })
    }

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)

            .then((userCredential) => {
                console.log('Signed In')
                const user = userCredential.user
                console.log(user)

                if (email == admin && password == adminpassword) {
                    console.log('admin girisi basarılı')
                    navigation.navigate('HomeAdmin')
                } else {
                    console.log('admin girisi hatalı')
                    navigation.navigate('HomeUsers')
                }

            })
            .catch(error => {
                console.log(error)
                Alert.alert(error.message)
            })
    }
    return (
        <View style={styles.container}>

            <View style={styles.login_icon}>
                <Image
                    source={require('../images/login_screen_logo.png')}
                />
                

            </View>



            <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 20, color: '#A3B763' }}>Giriş</Text>



            <View>
                <Text style={{ fontSize: 17, marginTop: 10, color: '#A3B763', fontWeight: '700' }}>E-mail</Text>

                <TextInput
                    style={[styles.input, { color: 'black' }]}
                    placeholder="E-mailinizi Giriniz"
                    placeholderTextColor="gray"
                    keyboardType="email-address"
                    onChangeText={(text) => setEmail(text)}
                />

            </View>

            <View>
                <Text style={{ fontSize: 17, marginTop: 10, color: '#A3B763', fontWeight: '700' }}>Parola</Text>

                <View style={{flexDirection:'row',maxWidth:200}}>

                    <TextInput
                        style={[styles.input, { color: 'black' }]}
                        placeholder="Parolanızı Giriniz"
                        placeholderTextColor="gray"

                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={!passwordvisibility}

                    />

                    <TouchableOpacity onPress={togglePasswordVisibility} style={{ padding: 5, backgroundColor: '#A3B763', borderRadius: 20, marginTop: 10,marginLeft:5,width:30,height:30 }}>
                        <IconEye name={passwordvisibility ? 'eye-slash' : 'eye'} size={20} color="black" />
                    </TouchableOpacity>
                </View>
            </View>





            <TouchableOpacity
                style={{
                    backgroundColor: '#A3B763',
                    padding: 10,
                    borderRadius: 25,
                    marginTop: 10,
                    width: 200,
                    height: 45
                }}
                onPress={handleSignIn}

            >
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 19, fontWeight: '700' }}>Giriş</Text>

            </TouchableOpacity>


            <TouchableOpacity
                style={{
                    backgroundColor: '#A3B763',
                    padding: 10,
                    borderRadius: 25,
                    marginTop: 10,
                    width: 200,
                    height: 45
                }}
                onPress={handleCreateAccount}

            >
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 19, fontWeight: '700' }}>Kayıt Ol</Text>

            </TouchableOpacity>


            <TouchableOpacity

                onPress={resetPasswordNavigate}
            >
                <Text style={{ color: 'black', marginTop: 20 }}>Şifremi Unuttum</Text>
            </TouchableOpacity>


        </View>




    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EEEEEE'
    },

    input: {
        height: 40,
        borderColor: '#A3B763',
        borderWidth: 1,
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
        maxWidth: 200,
        width: 200

    },

    login_icon: {
       
    }

});
