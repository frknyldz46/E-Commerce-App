import React from 'react'
import { SafeAreaView, Text, Image, StyleSheet, View, TouchableOpacity } from 'react-native'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../firebase-config';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
export default function UserPage() {

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app)

    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.usersPageContainer}>
            <View style={{ backgroundColor: '#A3B763', width: '100%', alignItems: 'center', padding: 40 }}>
                <Image
                    source={require('../images/usersPage.png')}
                    style={{ width: 130, height: 130 }}
                />
                <Text style={{ fontSize: 25, fontWeight: 'bold',color:'white',marginTop:10 }}>{auth.currentUser.email.split('@')[0]}</Text>
            </View>
            <View >

                <View style={{ flexDirection: 'row', marginTop: 30 }}>
                    <Image
                        source={require('../images/heartuser.png')}
                        style={{ width: 20, height: 20 }}
                    />
                    <TouchableOpacity style={{ width: 300, padding: 8, borderRadius: 10 }}
                        onPress={() => navigation.navigate('Favoriler')}>
                        <Text style={{ fontSize: 17, fontWeight: '500', color: 'black' }}>Favoriler</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 30 }}>

                    <Image
                        source={require('../images/purchase.png')}
                        style={{ width: 20, height: 20 }}
                    />
                    <TouchableOpacity style={{ width: 300, padding: 8, borderRadius: 10 }}
                        onPress={() => navigation.navigate('Sepet')}>
                        <Text style={{ fontSize: 17, fontWeight: '500' }}>Sepetiniz</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 30 }}>

                    <Image
                        source={require('../images/padlock.png')}
                        style={{ width: 20, height: 20 }}
                    />

                    <TouchableOpacity style={{ width: 300, padding: 8, borderRadius: 10 }}
                        onPress={() => navigation.navigate('PasswordResetScreen')}>
                        <Text style={{ fontSize: 17, fontWeight: '500' }}>Şifre Sıfırla</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 30 }}>

                    <Image
                        source={require('../images/box.png')}
                        style={{ width: 20, height: 20 }}
                    />


                <TouchableOpacity style={{  width: 300, padding: 8, borderRadius: 10 }}>
                    <Text style={{ fontSize: 17, fontWeight: '500' }}>Siparişlerim</Text>
                </TouchableOpacity>

                </View>
            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    usersPageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEEEEE',

    }
})
