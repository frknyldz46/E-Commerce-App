import React from 'react'
import { ImageBackground, SafeAreaView, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';


const deviceSize = Dimensions.get('window')



export default function AcilisEkrani() {
  const navigation = useNavigation();

  const loginScreenGo = () => {
    navigation.navigate('Login')

  }
  return (
    <ImageBackground
      source={require('../images/acilis_ekrani.jpg')}
      style={styles.background}
    >
      <SafeAreaView style={{ justifyContent: 'flex-end', flex: 1 }}>
        <View style={styles.karsilama}>
          <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold', margin: 10, color: 'white' }}>E-ticaret Dünyamıza Hoş Geldiniz.</Text>
          <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold', color: 'gray', margin: 10 }}>Hemen alışverişe başlayın ve avantajlı kampanyalardan yararlanın!</Text>
          <TouchableOpacity style={styles.buttonAcilis} onPress={loginScreenGo} >
            <Text style={{ color: 'black', fontWeight: '700' }}>Şimdi Başlayın</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  karsilama: {
    backgroundColor: '#A3B763',
    height: deviceSize.height / 3,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  buttonAcilis: {
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    width: 150,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 10,
    borderRadius: 13,
    marginTop: 15
  }
})