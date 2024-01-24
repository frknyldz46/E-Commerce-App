import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView
} from 'react-native';
import { CreditCardInput } from "react-native-credit-card-input";
import { Secret_key, STRIPE_PUBLISHABLE_KEY } from './keys';
import { useNavigation } from '@react-navigation/native';
import { setPaymentInfo } from './GlobalState';
import uuid from 'react-native-uuid';
const paymentId = uuid.v4()


// create a component
const CURRENCY = 'USD';
var CARD_TOKEN = null;

const handlePress = () => {
  // Perform any actions needed before dismissing the keyboard
  // For example, you might want to save the entered data or perform validations

  // Dismiss the keyboard
  Keyboard.dismiss();
};


function getCreditCardToken(creditCardData) {
  // alert()
  const card = {
    'card[number]': creditCardData.values.number.replace(/ /g, ''),
    'card[exp_month]': creditCardData.values.expiry.split('/')[0],
    'card[exp_year]': creditCardData.values.expiry.split('/')[1],
    'card[cvc]': creditCardData.values.cvc
  };
  return fetch('https://api.stripe.com/v1/tokens', {
    headers: {
      // Use the correct MIME type for your server
      Accept: 'application/json',
      // Use the correct Content Type to send data to Stripe
      'Content-Type': 'application/x-www-form-urlencoded',
      // Use the Stripe publishable key as Bearer
      Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`
    },
    // Use a proper HTTP method
    method: 'post',
    // Format the credit card data to a string of key-value pairs
    // divided by &
    body: Object.keys(card)
      .map(key => key + '=' + card[key])
      .join('&')
  }).
    then(response => response.json())
    .catch((error) => console.log(error))
};
/**
 * The method imitates a request to our server.
 *
 * @param creditCardToken
 * @return {Promise<Response>}
 */
function subscribeUser(creditCardToken) {
  return new Promise((resolve) => {
    console.log('Credit card token\n', creditCardToken);
    CARD_TOKEN = creditCardToken.id;
    setTimeout(() => {
      resolve({ status: true });
    }, 1000);
  });
};

const StripeGateway = ({ route }) => {

  const navigation = useNavigation();
  const returnsepet = () => {
    navigation.navigate('Sepet')
  }


  const { totalprice } = route.params


  const [CardInput, setCardInput] = React.useState({})

  const onSubmit = async () => {

    if (CardInput.valid == false || typeof CardInput.valid == "undefined") {
      alert('Invalid Credit Card');
      return false;
    }

    let creditCardToken;
    try {
      // Create a credit card token
      creditCardToken = await getCreditCardToken(CardInput);
      // console.log("creditCardToken", creditCardToken)
      if (creditCardToken.error) {
        alert("creditCardToken error");
        return;
      }
    } catch (e) {
      console.log("e", e);
      return;
    }
    // Send a request to your server with the received credit card token
    const { error } = await subscribeUser(creditCardToken);
    // Handle any errors from your server
    if (error) {
      alert(error)
    } else {

      let pament_data = await charges();
      console.log('pament_data', pament_data);
      if (pament_data.status == 'succeeded') {

        alert("Payment Successfully");
        setPaymentInfo({
          paymentStatus: 'success',
          totalprice: totalprice,
          paymentId: paymentId
        });

      }
      else {
        alert('Payment failed');
      }
    }
  };



  const charges = async () => {

    const card = {
      'amount': totalprice * 100,
      'currency': CURRENCY,
      'source': CARD_TOKEN,
      'description': "Developers Sin Subscription"
    };

    return fetch('https://api.stripe.com/v1/charges', {
      headers: {
        // Use the correct MIME type for your server
        Accept: 'application/json',
        // Use the correct Content Type to send data to Stripe
        'Content-Type': 'application/x-www-form-urlencoded',
        // Use the Stripe publishable key as Bearer
        Authorization: `Bearer ${Secret_key}`
      },
      // Use a proper HTTP method
      method: 'post',
      // Format the credit card data to a string of key-value pairs
      // divided by &
      body: Object.keys(card)
        .map(key => key + '=' + card[key])
        .join('&')
    }).then(response => response.json());
  };



  const _onChange = (data) => {
    setCardInput(data)
  }

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#2471A3" />
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>TOPLAM TUTAR:${totalprice}</Text>
        </View>
        <Image
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Stripe_logo%2C_revised_2016.png/1200px-Stripe_logo%2C_revised_2016.png' }}
          style={styles.ImgStyle}
        />
        <CreditCardInput
          inputContainerStyle={styles.inputContainerStyle}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          validColor="#fff"
          placeholderColor="#ccc"
          onChange={_onChange} />

        <TouchableOpacity
          onPress={onSubmit}
          style={styles.button}>
          <Text
            style={styles.buttonText}>
            Şimdi Öde
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={returnsepet}
          style={styles.buttoniptal}>
          <Text
            style={styles.buttonText}>
            İPTAL
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',

  },
  ImgStyle: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#A3B763',
    width: 150,
    height: 45,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 5
  },
  buttoniptal: {
    backgroundColor: 'red',
    width: 150,
    height: 45,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 15,
    color: '#f4f4f4',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  inputContainerStyle: {
    backgroundColor: '#fff',
    borderRadius: 5
  },
  inputStyle: {
    backgroundColor: '#222242',
    paddingLeft: 15,
    borderRadius: 5,
    color: '#fff'
  },
  labelStyle: {
    marginBottom: 5,
    fontSize: 12
  }

});

//make this component available to the app
export default StripeGateway;