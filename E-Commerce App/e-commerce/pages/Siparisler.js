import React, { useEffect } from 'react'
import { Text, View, FlatList, SafeAreaView } from 'react-native'
import { ref, push, set, onValue, off } from 'firebase/database';
import { getPaymentInfo } from './GlobalState';
import { getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../firebase-config';
import { getDatabase } from 'firebase/database';
import SiparisCard from './SiparisCard';
export default function Siparisler() {

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const auth = getAuth(app)
  const [paymentInfo, setPaymentInfo] = React.useState(null);
  const [cartItemsPayment, setCartItemsPayment] = React.useState([]);
  const userId = auth.currentUser.uid;

  useEffect(() => {

    const info = getPaymentInfo();
    if (info) {
      setPaymentInfo(info);
    }
  }, []);

  useEffect(() => {
    const cartRef = ref(database, '/adressinfo');
    onValue(cartRef, (snapshot) => {
      const cartData = snapshot.val() || [];
      setCartItemsPayment(Object.values(cartData));




    });

    return () => {

    };
  }, []);

  


  console.log('Cart Items:', cartItemsPayment); // Add this line

  return (
    <SafeAreaView>
      <View>
        <Text style={{fontSize:30,fontWeight:'bold',textAlign:'center'}}>Siparişler</Text>
        {paymentInfo && (
          <>
          

            {cartItemsPayment.length > 0 ? (
              <View >
                <FlatList
                  data={cartItemsPayment}

                  renderItem={({ item }) => <SiparisCard paymentinfo={item} paymentId={paymentInfo.paymentId}/>}


                />


              </View>
            ) : (
              <Text>Sepetiniz Boş</Text>
            )}

          </>
        )}
      </View>
    </SafeAreaView>
  )
}
