import React, { useEffect } from 'react'
import { Button, SafeAreaView, Text, StyleSheet, View, FlatList, TouchableOpacity, Image } from 'react-native'
import InputModal from './InputModal'
import Card from './Card/Card'
import parseContentData from '../utils/parseContentData'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../firebase-config';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth'
import { ref, push, set, onValue, off } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
export default function UrunEkle() {

  const [inputModalVisible, setInputModalVisible] = React.useState(false);
  const [contentList, setContentList] = React.useState([])

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const auth = getAuth(app)
  const navigation = useNavigation();
  const dataRef = ref(database, '/exampleData');


  useEffect(() => {

    const onDataChange = (snapshot) => {
      const contentData = snapshot.val()
      const parsedData = parseContentData(contentData)
      setContentList(parsedData)

    }

    onValue(dataRef, onDataChange);

    return () => {
      off(dataRef)

    }

  }, [])

  function handleInputToggle() {
    setInputModalVisible(!inputModalVisible)
  }

  function handleSendContent(content1, content2, imageUri, fiyat, detayAciklama,productId) {
    handleInputToggle()
    sendContent(content1, content2, imageUri, fiyat, detayAciklama,productId)

  }



  function sendContent(content1, content2, imageUri, fiyat, detayAciklama,productId) {
    const userMail = auth.currentUser.email
    const sendObject = {
      text: content1,
      aciklama: content2,
      imageUri: imageUri,
      fiyat: fiyat,
      detayAciklama: detayAciklama, 
      username: userMail.split('@')[0],
      productId:productId
      
      

    }


    const newRef = push(dataRef);
    const newData = sendObject;
    set(newRef, newData);
  }




  const renderContent = ({ item }) => <Card message={item} onPress={() => navigateToProductDetails(item)} />
  const navigateToProductDetails = (productDetails) => {
    navigation.navigate('ProductDetails', { productDetails });
  };
  return (

    <SafeAreaView style={styles.urunEkleContainer}>

      <View style={{ padding: 15 }}>


        <Text style={{ textAlign: 'left', fontSize: 25, fontWeight: 'bold', color: '#A3B763', marginTop: 10 }}>EKLENEN ÜRÜNLER</Text>
        <Text style={{ textAlign: 'left', fontSize: 15, fontWeight: '400', color: 'gray', marginTop: 10 }}>Ürünlerinizi Müşteriler ile Buluşturmak İçin Ürünlerinizi Ekleyiniz</Text>

        <TouchableOpacity style={styles.buttonUrunEkle} onPress={handleInputToggle}>
          <Text style={{ color: 'white', fontWeight: '700' }}>Ürün Ekle</Text>
        </TouchableOpacity>


      </View>



      <FlatList
        data={contentList}
        renderItem={renderContent}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />



      <InputModal
        visible={inputModalVisible}
        onClose={handleInputToggle}
        onSend={handleSendContent}

      />

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  columnWrapper: {
    justifyContent: 'space-evenly',
    marginTop: 10
  },
  urunEkleContainer: {
    backgroundColor: '#EEEEEE',
    flex:1
  },
  buttonUrunEkle: {
    alignItems: 'center',
    backgroundColor: '#A3B763',
    width: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 10,
    borderRadius: 13,
    marginTop: 15
  }

})
