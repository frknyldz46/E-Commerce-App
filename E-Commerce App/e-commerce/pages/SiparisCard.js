import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'

export default function SiparisCard({ paymentinfo ,paymentId}) {
    
    return (
        <SafeAreaView>
        
            <View style={styles.infoContainer}>
                <Text style={styles.siparisinfo}>İsim: {paymentinfo.ad}</Text>
                <Text style={styles.siparisinfo}>Soyad: {paymentinfo.soyad}</Text>
                <Text style={styles.siparisinfo}>Adres: {paymentinfo.adres}</Text>
                <Text style={styles.siparisinfo}>Cadde: {paymentinfo.cadde}</Text>
                <Text style={styles.siparisinfo}>İlçe: {paymentinfo.ilce}</Text>
                <Text style={styles.siparisinfo}>Posta Kodu: {paymentinfo.posta}</Text>
                <Text style={styles.siparisinfo}>Şehir: {paymentinfo.sehir}</Text>
                <Text style={styles.siparisinfo}>İletişim Numarası: {paymentinfo.tel}</Text>
                <Text style={styles.siparisinfo}>Kullanıcı Adı: {paymentinfo.username}</Text>
                <Text style={styles.siparisinfo}>Sipariş Numarası:{paymentId} </Text>

            </View>
        </SafeAreaView>
    )
}
const styles=StyleSheet.create({
    infoContainer:{
        backgroundColor: '#A3B763',
        marginTop:20,
        padding:10,
        borderRadius:15,
        
    },
    siparisinfo:{
        color:'white',
        fontSize:18
    }
})